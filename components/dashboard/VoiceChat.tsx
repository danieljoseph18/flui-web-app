"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "@/app/lib/wavtools";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, X, Zap } from "lucide-react";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client";

const WS_BACKEND_URL =
  process.env.NEXT_PUBLIC_WS_BACKEND_URL || "ws://localhost:8081";

const VoiceChat = () => {
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
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Voice Chat</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Conversation Display */}
        <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-md">
          {items.map((item: any) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg ${
                item.role === "assistant"
                  ? "bg-secondary ml-4"
                  : "bg-primary text-primary-foreground mr-4"
              }`}
            >
              <div className="font-medium mb-1">
                {item.role === "assistant" ? "Assistant" : "You"}
              </div>
              <div>
                {item.formatted.transcript ||
                  item.formatted.text ||
                  (item.formatted.audio?.length ? "(processing...)" : "")}
              </div>
              {item.formatted.file && (
                <audio
                  className="mt-2 w-full"
                  src={item.formatted.file.url}
                  controls
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="space-x-4">
        {/* VAD Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="vad-mode"
            checked={useVAD}
            onCheckedChange={handleVADToggle}
            disabled={isConnected}
          />
          <Label htmlFor="vad-mode">Voice Activity Detection</Label>
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
