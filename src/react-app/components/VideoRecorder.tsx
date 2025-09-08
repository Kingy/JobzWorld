import { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Play, RotateCcw, AlertCircle, StopCircle } from 'lucide-react';

interface VideoRecorderProps {
  question: string;
  timeLimit: number;
  onRecordingComplete: (recording: { duration: number; status: string; videoBlob?: Blob }) => void;
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
  totalQuestions
}: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [showCaptions, setShowCaptions] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      
      setMediaStream(stream);
      setCameraPermission('granted');
      setMicPermission('granted');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraPermission('denied');
      setMicPermission('denied');
    }
  };

  const handleStartRecording = () => {
    if (!mediaStream) return;
    
    setIsRecording(true);
    setTimeRemaining(timeLimit);
    chunksRef.current = [];
    
    // Create MediaRecorder
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=vp9'
    });
    
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      
      // Create video URL for preview
      const videoUrl = URL.createObjectURL(blob);
      setRecordedVideoUrl(videoUrl);
      
      const duration = timeLimit - timeRemaining;
      onRecordingComplete({ duration, status: 'ready', videoBlob: blob });
    };
    
    mediaRecorder.start(250); // Collect data every 250ms
    
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleStopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleReRecord = () => {
    if (reRecordsLeft > 0) {
      setHasRecorded(false);
      setTimeRemaining(timeLimit);
      setRecordedBlob(null);
      
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
        setRecordedVideoUrl(null);
      }
      
      // Reset video preview to live stream
      if (videoRef.current && mediaStream) {
        videoRef.current.srcObject = mediaStream;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPermissionStatus = () => {
    if (cameraPermission === 'denied' || micPermission === 'denied') {
      return 'denied';
    }
    if (cameraPermission === 'granted' && micPermission === 'granted') {
      return 'granted';
    }
    return 'pending';
  };

  const permissionStatus = getPermissionStatus();

  if (permissionStatus === 'denied') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
        <div className="text-center py-8">
          <Camera className="w-16 h-16 mx-auto mb-4 text-grey-400" />
          <h3 className="text-lg font-semibold text-grey-900 mb-2">Camera Access Required</h3>
          <p className="text-grey-600 mb-4">
            Please enable camera and microphone access to record your video response.
          </p>
          <button
            onClick={initializeCamera}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Enable Camera Access
          </button>
        </div>
      </div>
    );
  }

  if (permissionStatus === 'pending') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-grey-600">Setting up camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-grey-900">Video Question {questionNumber} of {totalQuestions}</h3>
          <div className="text-sm text-grey-500">
            Time limit: {formatTime(timeLimit)}
          </div>
        </div>
        <p className="text-grey-600 bg-grey-50 p-4 rounded border-l-4 border-primary-500">
          {question}
        </p>
      </div>

      {/* Video Preview */}
      <div className="relative bg-grey-900 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          autoPlay
          muted={!hasRecorded}
          playsInline
          className="w-full h-full object-cover"
          src={hasRecorded && recordedVideoUrl ? recordedVideoUrl : undefined}
        />
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            REC {formatTime(timeRemaining)}
          </div>
        )}
        
        {/* Play indicator for recorded video */}
        {hasRecorded && !isRecording && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-2 opacity-80" />
              <p>Recording Complete - Click to play</p>
            </div>
          </div>
        )}
        
        {/* Live captions overlay */}
        {showCaptions && isRecording && (
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-sm">
            [Live captions would appear here...]
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-grey-600">
            <Mic className="w-4 h-4" />
            <span>Microphone</span>
            <div className={`w-2 h-2 rounded-full ${micPermission === 'granted' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-grey-600">
            <Camera className="w-4 h-4" />
            <span>Camera</span>
            <div className={`w-2 h-2 rounded-full ${cameraPermission === 'granted' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>
        
        <label className="flex items-center gap-2 text-sm text-grey-600">
          <input 
            type="checkbox" 
            checked={showCaptions}
            onChange={(e) => setShowCaptions(e.target.checked)}
            className="rounded"
          />
          Live captions
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-grey-500">
          {isRecording ? `Time remaining: ${formatTime(timeRemaining)}` : `Duration: ${formatTime(timeLimit)}`}
        </div>
        
        <div className="flex gap-2">
          {hasRecorded && !isRecording && (
            <button
              onClick={handleReRecord}
              disabled={reRecordsLeft === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                reRecordsLeft > 0
                  ? 'bg-grey-100 hover:bg-grey-200 text-grey-700'
                  : 'bg-grey-100 text-grey-400 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Re-record ({reRecordsLeft} left)
            </button>
          )}
          
          {!hasRecorded && !isRecording && (
            <button
              onClick={handleStartRecording}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Start Recording
            </button>
          )}
          
          {isRecording && (
            <button
              onClick={handleStopRecording}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <StopCircle className="w-4 h-4" />
              Stop Recording
            </button>
          )}
        </div>
      </div>

      {/* Plan limit warning */}
      {reRecordsLeft === 0 && hasRecorded && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-orange-700 font-medium">Recording limit reached</p>
            <p className="text-orange-600">
              Upgrade to {planName === 'Basic' ? 'Plus' : 'Pro'} plan for more recording attempts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
