"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "@/app/lib/wavtools";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, X, Zap } from "lucide-react";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FluiFrog from "@/app/assets/images/flui-frog.png";
import { MoreVertical } from "lucide-react";
import { useSettings } from "@/store/useSettings";
import { useTutorInstructions } from "@/hooks/useTutorInstructions";
import { useMode } from "@/store/useMode";

const WS_BACKEND_URL =
  `${process.env.NEXT_PUBLIC_WS_BACKEND_URL}/realtime` ||
  "ws://localhost:8081/realtime";

const VoiceChat = () => {
  const { selectedMode } = useMode();

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

  const { targetLanguage, nativeLanguage, skillLevel } = useSettings();

  const instructions = useTutorInstructions({
    targetLanguage,
    nativeLanguage,
    skillLevel,
    mode: selectedMode ? selectedMode.title : "Story Mode",
  });

  // Connect to conversation
  const connectConversation = useCallback(async () => {
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
  }, [useVAD]);

  // Disconnect conversation
  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    setItems([]);

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

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
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">
            {selectedMode.title}
          </h2>
        </div>
      </div>

      <CardContent className="space-y-4">
        {/* Conversation Display */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-4 p-4 rounded-md">
          {items.map((item: any) => (
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
          ))}
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
            Enable Push to Talk
          </Label>
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
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceChat;
