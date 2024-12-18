"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "@/app/lib/wavtools";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, X, Zap, HelpCircle } from "lucide-react";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FluiFrog from "@/app/assets/images/flui-frog.png";
import { MoreVertical } from "lucide-react";
import { useSettings } from "@/store/useSettings";
import { useTutorInstructions } from "@/hooks/useTutorInstructions";
import { useMode } from "@/store/useMode";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import FluiTrace from "@/app/assets/images/flui-trace.png";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { getSecondsLimit } from "@/app/lib/pricing";
import { toast } from "react-hot-toast";

const WS_BACKEND_URL =
  `${process.env.NEXT_PUBLIC_WS_BACKEND_URL}/realtime` ||
  "ws://localhost:8081/realtime";

const VoiceChat = () => {
  const { selectedMode } = useMode();
  const { data: session } = useSession();
  const [secondsUsed, setSecondsUsed] = useState<number>(0);
  const [secondsLimit, setSecondsLimit] = useState<number>(0);

  const sessionEndedRef = useRef(false);

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch user's usage data
  useEffect(() => {
    const fetchUsageData = async () => {
      if (!session?.user?.email) return;

      const { data: userData, error } = await supabase
        .from("users")
        .select("seconds_used, subscription_price_id")
        .eq("email", session.user.email)
        .single();

      if (error) {
        console.error("Error fetching usage data:", error);
        return;
      }

      setSecondsUsed(userData.seconds_used || 0);
      setSecondsLimit(getSecondsLimit(userData.subscription_price_id));
    };

    fetchUsageData();
  }, [session]);

  // Function to update seconds used
  const updateSecondsUsed = async (additionalSeconds: number) => {
    if (!session?.user?.email) return;

    const { error } = await supabase
      .from("users")
      .update({ seconds_used: secondsUsed + additionalSeconds })
      .eq("email", session.user.email);

    if (error) {
      console.error("Error updating seconds used:", error);
      // continue regardless
    }

    setSecondsUsed((prev) => prev + additionalSeconds);
  };

  // State for connection and recording status
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [useVAD, setUseVAD] = useState(false);

  // State for conversation items
  const [items, setItems] = useState<ItemType[]>([]);

  // Refs for audio handling
  const wavRecorderRef = useRef(new WavRecorder({ sampleRate: 24000 }));
  const wavStreamPlayerRef = useRef(new WavStreamPlayer({ sampleRate: 24000 }));
  const clientRef = useRef(new RealtimeClient({ url: WS_BACKEND_URL }));

  const { targetLanguage, skillLevel } = useSettings();

  const instructions = useTutorInstructions({
    targetLanguage,
    skillLevel,
    mode: selectedMode ? selectedMode.title : "Story Mode",
  });

  // Add this ref near your other refs
  const conversationRef = useRef<HTMLDivElement>(null);

  // Add this with the other refs
  const sessionStartTimeRef = useRef<number>(0);

  // Add this near your other state variables
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Modify all time calculations in the component to use this helper function
  const calculateSeconds = (startTime: number): number => {
    const milliseconds = performance.now() - startTime;
    const seconds = Math.floor(milliseconds / 1000);
    return seconds;
  };

  // Connect to conversation
  const connectConversation = useCallback(async () => {
    if (secondsUsed >= secondsLimit) {
      toast.error(
        "You've reached your monthly minutes limit. Please upgrade your plan to continue."
      );
      return;
    }

    // Set the session start time (use precise timestamp)
    sessionStartTimeRef.current = performance.now();

    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Set state
    setIsConnected(true);
    setItems([]);

    // Connect audio devices
    await wavRecorder.begin();
    await wavStreamPlayer.connect();

    // Connect to WebSocket backend
    await client.connect();

    // Send initial message
    client.sendUserMessageContent([
      {
        type: "input_text",
        text: "Hello!",
      },
    ]);

    // Start recording if VAD is enabled
    if (useVAD) {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }

    // Start usage monitoring
    setIsMonitoring(true);
  }, [useVAD, secondsUsed, secondsLimit]);

  // Disconnect conversation
  const disconnectConversation = useCallback(async () => {
    setIsMonitoring(false);

    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Stop the session first
    client.disconnect();
    await wavRecorder.end();
    await wavStreamPlayer.interrupt();

    // Now update seconds used
    const seconds = calculateSeconds(sessionStartTimeRef.current);
    await updateSecondsUsed(seconds);

    // Mark session ended and disconnected
    sessionEndedRef.current = true;
    setIsConnected(false);
  }, [updateSecondsUsed]);

  // Push to talk handlers
  const startRecording = async () => {
    setIsRecording(true);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    const trackSampleOffset = await wavStreamPlayer.interrupt();
    if (trackSampleOffset?.trackId) {
      const { trackId, offset } = trackSampleOffset;
      await client.cancelResponse(trackId, offset);
    }

    await wavRecorder.record((data) => client.appendInputAudio(data.mono));
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.pause();
    client.createResponse();
  };

  // Handle VAD toggle
  const handleVADToggle = async (checked: boolean) => {
    setUseVAD(checked);
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;

    if (!checked && wavRecorder.getStatus() === "recording") {
      await wavRecorder.pause();
    }

    client.updateSession({
      turn_detection: checked ? { type: "server_vad" } : null,
    });

    if (checked && client.isConnected()) {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  };

  // Set up event listeners
  useEffect(() => {
    const client = clientRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Set instructions
    client.updateSession({ instructions: instructions });
    // Set up transcription
    client.updateSession({ input_audio_transcription: { model: "whisper-1" } });

    // Handle conversation updates
    client.on("conversation.updated", async ({ item, delta }: any) => {
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }

      if (item.status === "completed" && item.formatted.audio?.length) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        );
        item.formatted.file = wavFile;
      }

      setItems(client.conversation.getItems());
    });

    return () => {
      client.reset();
    };
  }, [instructions]);

  // Add this effect to handle auto-scrolling
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [items]); // Scroll when items change

  /**
   * @dev Crucial: Updates seconds used when page is unloaded to prevent malicious
   * users from trying to refresh without them registering.
   */
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (
        !sessionEndedRef.current &&
        isConnected &&
        sessionStartTimeRef.current
      ) {
        const seconds = calculateSeconds(sessionStartTimeRef.current);

        const formData = new FormData();
        formData.append("email", session?.user?.email || "");
        formData.append("seconds", seconds.toString());

        navigator.sendBeacon("/api/usage/update", formData);
      }
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isConnected, session?.user?.email, updateSecondsUsed]);

  // Add a monitoring effect
  useEffect(() => {
    let monitoringInterval: NodeJS.Timeout;

    if (isConnected && isMonitoring) {
      monitoringInterval = setInterval(() => {
        const currentMinutes = calculateSeconds(sessionStartTimeRef.current);
        const totalMinutes = secondsUsed + currentMinutes;

        if (totalMinutes >= secondsLimit) {
          toast.error("Monthly minutes limit reached. Session ended.");
          disconnectConversation();
        }
      }, 5000);
    }

    return () => {
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
      }
    };
  }, [
    isConnected,
    isMonitoring,
    secondsUsed,
    secondsLimit,
    disconnectConversation,
  ]);

  useEffect(() => {
    if (isConnected) {
      disconnectConversation();
    }
  }, [targetLanguage, skillLevel]);

  if (!selectedMode) {
    return (
      <Card className="flex flex-col justify-center items-center w-full h-full bg-transparent border-none shadow-none">
        <CardContent className="text-center space-y-4">
          <div className="rounded-full bg-gray-four p-6 w-fit mx-auto">
            <Zap className="w-8 h-8 text-gray-three" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Select a Mode to Start
          </h3>
          <p className="text-gray-three max-w-md">
            Choose a learning mode from the sidebar to begin your language
            learning journey with FLUI.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-between w-full h-full bg-transparent border-none shadow-none">
      <div className="p-4 border-b border-gray-four">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {selectedMode.title}
          </h2>
          <div className="text-sm text-gray-three">
            {Math.floor(secondsUsed / 60)} / {Math.floor(secondsLimit / 60)}{" "}
            minutes used
          </div>
        </div>
      </div>

      <CardContent className="space-y-4">
        {/* Conversation Display */}
        <div
          ref={conversationRef}
          className="h-[calc(100vh-200px)] overflow-y-auto space-y-4 p-4 rounded-md"
        >
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <Image
                src={FluiTrace}
                alt="Start conversation"
                className="w-32 mb-4"
              />
              <p className="text-gray-three text-lg">Start a Conversation</p>
            </div>
          ) : (
            items.map((item: any) => (
              <div
                key={item.id}
                className={`group relative flex gap-3 ${
                  item.role === "user" ? "justify-end" : ""
                }`}
              >
                {item.role === "assistant" && (
                  <div className="flex flex-col !min-h-full justify-end">
                    <Avatar className="h-8 w-8 bg-gray-four">
                      <AvatarImage src={FluiFrog.src} />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </div>
                )}
                {item.role === "user" && (
                  <div className="flex flex-col !min-h-full justify-end order-last">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div
                  className={`relative max-w-[85%] px-3 py-2 text-sm ${
                    item.role === "user"
                      ? "bg-pastel-blue rounded-xl rounded-br-md"
                      : "bg-gray-four text-gray-three rounded-xl rounded-bl-md"
                  }`}
                >
                  {item.formatted.transcript ||
                    item.formatted.text ||
                    (item.formatted.audio?.length ? "..." : "")}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-10 top-0 hidden h-8 w-8 group-hover:flex"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between space-x-4">
        {/* VAD Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="vad-mode"
            checked={useVAD}
            onCheckedChange={handleVADToggle}
            disabled={isConnected}
          />
          <Label htmlFor="vad-mode" className="text-white">
            Disable Push to Talk
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-one cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[250px]">
                <p>
                  With Push to Talk disabled, you can speak to Flui in real-time
                  having to press the button.
                  <span className="ml-1 text-yellow-500">
                    Warning: This may consume your minutes faster!
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Push to Talk Button */}
        {isConnected && !useVAD && (
          <Button
            variant={isRecording ? "destructive" : "default"}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            disabled={!isConnected || useVAD}
          >
            <Mic className="w-4 h-4 mr-2" />
            {isRecording ? "Release to Send" : "Push to Talk"}
          </Button>
        )}

        {/* Connect/Disconnect Button */}
        <Button
          variant={isConnected ? "outline" : "default"}
          onClick={isConnected ? disconnectConversation : connectConversation}
        >
          {isConnected ? (
            <X className="w-4 h-4 mr-2" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          {isConnected ? "End Session" : "Start Session"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceChat;
