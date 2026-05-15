
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Mic, MicOff, Radio, Terminal, Loader2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SAMPLE_RATE = 16000;

const VoiceCommand: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const startSession = async () => {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return;
    }

    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are GFORCE - SPACE AI, a high-performance tactical assistant for Gonçalo Esteves. You provide concise, data-driven advice on human performance, astronaut science, and combat tactics. Your tone is professional, space-age, and high-density. Keep responses brief and tactical.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log("Live session opened");
            setIsConnecting(false);
            setIsActive(true);
            startMic();
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const base64Audio = part.inlineData.data;
                  const binary = atob(base64Audio);
                  const bytes = new Int16Array(binary.length / 2);
                  for (let i = 0; i < bytes.length; i++) {
                    bytes[i] = (binary.charCodeAt(i * 2) & 0xff) | (binary.charCodeAt(i * 2 + 1) << 8);
                  }
                  audioQueueRef.current.push(bytes);
                  if (!isPlayingRef.current) {
                    playNextInQueue();
                  }
                }
              }
            }

            if (message.serverContent?.interrupted) {
              audioQueueRef.current = [];
              isPlayingRef.current = false;
              setIsAiSpeaking(false);
            }

            if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
              setAiResponse(prev => prev + " " + message.serverContent?.modelTurn?.parts?.[0]?.text);
            }

            // Handle transcriptions
            const inputTranscript = message.serverContent?.modelTurn?.parts?.find(p => p.text)?.text;
            if (inputTranscript) {
               // This is actually model output text, but we can use it
            }
          },
          onclose: () => {
            console.log("Live session closed");
            stopSession();
          },
          onerror: (err) => {
            console.error("Live session error:", err);
            stopSession();
          }
        }
      });

      sessionRef.current = session;
    } catch (error) {
      console.error("Failed to connect to Live API:", error);
      setIsConnecting(false);
    }
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: SAMPLE_RATE });
      }

      const source = audioContextRef.current.createMediaStreamSource(stream);
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (isMuted || !sessionRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
        }

        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        sessionRef.current.sendRealtimeInput({
          audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };

      source.connect(processor);
      processor.connect(audioContextRef.current.destination);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const playNextInQueue = () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setIsAiSpeaking(false);
      return;
    }

    isPlayingRef.current = true;
    setIsAiSpeaking(true);
    const pcmData = audioQueueRef.current.shift()!;
    
    if (!audioContextRef.current) return;

    const buffer = audioContextRef.current.createBuffer(1, pcmData.length, SAMPLE_RATE);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < pcmData.length; i++) {
      channelData[i] = pcmData[i] / 0x7fff;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      playNextInQueue();
    };
    source.start();
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    setIsAiSpeaking(false);
    
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    audioQueueRef.current = [];
    isPlayingRef.current = false;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-brand-black/90 border border-brand-blue/50 rounded-lg p-4 w-80 shadow-2xl backdrop-blur-xl mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isAiSpeaking ? 'text-brand-red animate-pulse' : 'text-brand-blue'}`} />
                <span className="text-[10px] font-mono font-bold text-brand-blue tracking-widest uppercase">Uplink: Active</span>
              </div>
              <button 
                onClick={toggleMute}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-brand-red" /> : <Volume2 className="w-4 h-4 text-gray-400" />}
              </button>
            </div>

            <div className="bg-black/50 rounded p-3 h-32 overflow-y-auto font-mono text-[11px] mb-4 border border-gray-800">
              {aiResponse ? (
                <p className="text-gray-300 leading-relaxed">{aiResponse}</p>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-600">
                  <Terminal className="w-6 h-6 mb-2 opacity-20" />
                  <p>Awaiting tactical input...</p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isAiSpeaking ? [4, 16, 4] : 4,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-1 bg-brand-blue rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90
          ${isActive 
            ? 'bg-brand-red hover:bg-red-600 text-white' 
            : 'bg-brand-blue hover:bg-blue-600 text-white'
          }
          ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isConnecting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : isActive ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default VoiceCommand;
