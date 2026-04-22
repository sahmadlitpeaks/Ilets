"use client";

import * as React from "react";
import { Mic, Square, Play } from "lucide-react";
import type { SpeakingQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { cn, formatDuration } from "@/lib/utils";

export interface SpeakingAnswer {
  transcript?: string;
  durationSeconds?: number;
  audioDataUrl?: string;
}

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    SpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

function useMediaRecorder() {
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  async function start(
    onStop: (blob: Blob, durationMs: number) => void
  ) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    chunksRef.current = [];
    const startedAt = performance.now();

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      onStop(blob, performance.now() - startedAt);
      stream.getTracks().forEach((t) => t.stop());
    };
    recorder.start();
  }

  function stop() {
    recorderRef.current?.stop();
  }

  return { start, stop };
}

export function Speaking({
  question,
  value,
  onChange,
}: {
  question: SpeakingQuestion;
  value: SpeakingAnswer | undefined;
  onChange: (value: SpeakingAnswer) => void;
}) {
  const [phase, setPhase] = React.useState<"idle" | "prep" | "recording" | "done">("idle");
  const [secondsLeft, setSecondsLeft] = React.useState(question.prepSeconds);
  const [transcript, setTranscript] = React.useState(value?.transcript ?? "");
  const [audioUrl, setAudioUrl] = React.useState<string | null>(
    value?.audioDataUrl ?? null
  );
  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);
  const recorder = useMediaRecorder();

  React.useEffect(() => {
    if (phase !== "prep" && phase !== "recording") return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          if (phase === "prep") {
            startRecording();
          } else {
            stopRecording();
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function beginPrep() {
    setPhase("prep");
    setSecondsLeft(question.prepSeconds);
  }

  async function startRecording() {
    setPhase("recording");
    setSecondsLeft(question.responseSeconds);
    try {
      await recorder.start((blob, durationMs) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          setAudioUrl(dataUrl);
          onChange({
            transcript,
            durationSeconds: Math.round(durationMs / 1000),
            audioDataUrl: dataUrl,
          });
        };
        reader.readAsDataURL(blob);
      });

      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        const rec = new SR();
        rec.lang = "en-US";
        rec.continuous = true;
        rec.interimResults = false;
        rec.onresult = (event) => {
          let full = "";
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript + " ";
          }
          setTranscript(full.trim());
          onChange({
            transcript: full.trim(),
            durationSeconds: question.responseSeconds - secondsLeft,
            audioDataUrl: audioUrl ?? undefined,
          });
        };
        rec.onerror = () => {
          /* silent */
        };
        recognitionRef.current = rec;
        rec.start();
      }
    } catch (err) {
      console.error("Microphone error", err);
      setPhase("idle");
    }
  }

  function stopRecording() {
    recorder.stop();
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    setPhase("done");
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium leading-relaxed whitespace-pre-line">
          {question.prompt}
        </p>
        {question.instructions && (
          <p className="text-sm text-muted-foreground mt-2">
            {question.instructions}
          </p>
        )}
      </div>

      <div className="rounded-md border bg-card p-6 flex flex-col items-center gap-3">
        <div
          className={cn(
            "h-16 w-16 rounded-full flex items-center justify-center transition-colors",
            phase === "recording"
              ? "bg-[hsl(var(--coral))] text-[hsl(var(--coral-foreground))] animate-pulse"
              : "bg-muted"
          )}
        >
          <Mic className="h-6 w-6" />
        </div>

        {phase === "idle" && (
          <Button onClick={beginPrep} size="lg">
            <Play className="h-4 w-4" /> Start preparation ({question.prepSeconds}s)
          </Button>
        )}
        {phase === "prep" && (
          <p className="text-sm text-muted-foreground">
            Preparation — recording starts in{" "}
            <span className="font-medium">{formatDuration(secondsLeft)}</span>
          </p>
        )}
        {phase === "recording" && (
          <>
            <p className="text-sm">
              Recording — {formatDuration(secondsLeft)} remaining
            </p>
            <Button onClick={stopRecording} variant="outline">
              <Square className="h-4 w-4" /> Stop early
            </Button>
          </>
        )}
        {phase === "done" && audioUrl && (
          <>
            <audio src={audioUrl} controls className="w-full max-w-md" />
            <p className="text-xs text-muted-foreground text-center">
              Transcript captured: {transcript.length || 0} characters
            </p>
          </>
        )}
      </div>
    </div>
  );
}
