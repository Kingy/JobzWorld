import { useState, useRef, useEffect } from "react";
import { Camera, Square, RotateCcw, Play, Pause } from "lucide-react";

interface VideoRecorderProps {
  question: string;
  timeLimit: number; // in seconds
  onRecordingComplete: (recording: {
    duration: number;
    status: string;
    videoBlob?: Blob;
  }) => void;
  reRecordsLeft: number;
  planName: string;
  questionNumber: number;
  totalQuestions: number;
}

export default function VideoRecorder({
  question,
  timeLimit,
  onRecordingComplete,
  reRecordsLeft,
  planName,
  questionNumber,
  totalQuestions,
}: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Supported MIME types in order of preference
  const getSupportedMimeType = (): string => {
    const types = [
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp8",
      "video/webm;codecs=h264",
      "video/webm",
      "video/mp4;codecs=h264,aac",
      "video/mp4;codecs=h264",
      "video/mp4",
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log("Using MIME type:", type);
        return type;
      }
    }

    // Fallback - let MediaRecorder choose
    console.log("Using default MIME type");
    return "";
  };

  const requestCameraPermission = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: "user",
        },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Prevent feedback
        await videoRef.current.play();
        setIsPreviewReady(true);
        setHasPermission(true);
      }

      streamRef.current = stream;
    } catch (err) {
      console.error("Camera permission error:", err);
      setError(
        "Camera permission denied. Please allow camera access to record your video."
      );
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) {
      await requestCameraPermission();
      if (!streamRef.current) return;
    }

    try {
      setError(null);
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const options: MediaRecorderOptions = {};

      if (mimeType) {
        options.mimeType = mimeType;
      }

      const mediaRecorder = new MediaRecorder(streamRef.current, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "video/webm",
        });
        setRecordedBlob(blob);
        setHasRecording(true);

        // Call completion handler
        onRecordingComplete({
          duration: recordingTime,
          status: "ready",
          videoBlob: blob,
        });
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Recording failed. Please try again.");
        setIsRecording(false);
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= timeLimit) {
            stopRecording();
            return timeLimit;
          }
          return newTime;
        });
      }, 1000);
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError(
        "Failed to start recording. Your browser may not support video recording."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
  };

  const resetRecording = () => {
    setHasRecording(false);
    setRecordedBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];

    // Restart preview
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  };

  const playRecording = () => {
    if (recordedBlob && videoRef.current) {
      const videoUrl = URL.createObjectURL(recordedBlob);
      videoRef.current.srcObject = null;
      videoRef.current.src = videoUrl;
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  // Initialize camera on mount
  useEffect(() => {
    requestCameraPermission();

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const timeRemaining = timeLimit - recordingTime;
  const progressPercentage = (recordingTime / timeLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">
          Question {questionNumber} of {totalQuestions}
        </h3>
        <p className="text-blue-800">{question}</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={requestCameraPermission}
            className="mt-2 text-red-600 underline text-sm hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Video Container */}
      <div
        className="relative bg-black rounded-lg overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          autoPlay
          muted={!hasRecording}
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!hasPermission && !error && (
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-70">Requesting camera access...</p>
            </div>
          )}
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">REC</span>
          </div>
        )}

        {/* Timer */}
        {(isRecording || hasRecording) && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
            <span className="font-mono">{formatTime(recordingTime)}</span>
            {isRecording && (
              <span className="text-red-400 ml-2">
                / {formatTime(timeLimit)}
              </span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {isRecording && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50">
            <div
              className="h-1 bg-red-500 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        {!hasRecording && !isRecording && hasPermission && (
          <button
            onClick={startRecording}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2 transition-colors"
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Square className="w-4 h-4 fill-current" />
            Stop Recording
          </button>
        )}

        {hasRecording && (
          <div className="flex gap-4">
            <button
              onClick={playRecording}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Review
            </button>

            {reRecordsLeft > 0 && (
              <button
                onClick={resetRecording}
                className="bg-grey-500 hover:bg-grey-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Re-record ({reRecordsLeft} left)
              </button>
            )}
          </div>
        )}

        {/* Plan Info */}
        <div className="text-center text-sm text-grey-600">
          <p>
            Plan: <span className="font-medium">{planName}</span>
            {reRecordsLeft !== 999 && (
              <span>
                {" "}
                • Re-records remaining:{" "}
                <span className="font-medium">{reRecordsLeft}</span>
              </span>
            )}
          </p>
          <p>Time limit: {formatTime(timeLimit)}</p>
        </div>
      </div>
    </div>
  );
}
