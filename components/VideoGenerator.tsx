import React, { useState, useEffect } from 'react';
import { TrainingProtocol } from '../types';
import { generateProtocolVideo } from '../services/geminiService';
import { Video, Loader2, AlertCircle, PlayCircle, Key } from 'lucide-react';

interface Props {
  protocol: TrainingProtocol;
}

const VideoGenerator: React.FC<Props> = ({ protocol }) => {
  const [roundStatuses, setRoundStatuses] = useState<Record<number, 'IDLE' | 'GENERATING' | 'COMPLETED' | 'ERROR' | 'NEED_KEY'>>({});
  const [roundVideos, setRoundVideos] = useState<Record<number, string>>({});
  const [errorMsgs, setErrorMsgs] = useState<Record<number, string>>({});

  const handleGenerateClick = async (roundIndex: number) => {
    const round = protocol.rounds[roundIndex];
    setRoundStatuses(prev => ({ ...prev, [roundIndex]: 'GENERATING' }));
    setErrorMsgs(prev => ({ ...prev, [roundIndex]: '' }));

    try {
      const uri = await generateProtocolVideo(protocol.title, `${round.name}: ${round.description}`);
      if (!uri) throw new Error('Failed to get video URI');

      const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'x-goog-api-key': process.env.API_KEY || '',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setRoundVideos(prev => ({ ...prev, [roundIndex]: url }));
      setRoundStatuses(prev => ({ ...prev, [roundIndex]: 'COMPLETED' }));
    } catch (error: any) {
      console.error("Generation error:", error);
      if (error.message === 'API_KEY_REQUIRED') {
        setRoundStatuses(prev => ({ ...prev, [roundIndex]: 'NEED_KEY' }));
      } else {
        setRoundStatuses(prev => ({ ...prev, [roundIndex]: 'ERROR' }));
        setErrorMsgs(prev => ({ ...prev, [roundIndex]: error.message || 'Failed to generate video.' }));
      }
    }
  };

  const handleSelectKey = async (roundIndex: number) => {
    try {
      if ((window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
        setRoundStatuses(prev => ({ ...prev, [roundIndex]: 'IDLE' }));
      }
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Video className="w-6 h-6 text-brand-blue" />
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
          Tactical Phase Demonstrations
        </h3>
      </div>

      <div className="grid gap-6">
        {protocol.rounds.map((round, idx) => {
          const status = roundStatuses[idx] || 'IDLE';
          const videoUrl = roundVideos[idx];
          const errorMsg = errorMsgs[idx];

          return (
            <div key={idx} className="bg-brand-gray/40 border border-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
              {/* Info Side */}
              <div className="p-6 md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-brand-blue/20 text-brand-blue text-[10px] font-bold px-2 py-0.5 rounded border border-brand-blue/30">
                      PHASE {idx + 1}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{round.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{round.name}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {round.description}
                  </p>
                  <div className="space-y-1">
                    {round.drill.map((d, i) => (
                      <div key={i} className="text-[11px] text-gray-500 flex gap-2">
                        <span className="text-brand-blue">•</span> {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  {status === 'IDLE' && (
                    <button
                      onClick={() => handleGenerateClick(idx)}
                      className="w-full bg-brand-blue hover:bg-blue-600 text-white text-[10px] font-bold py-3 px-4 rounded uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" /> Generate Phase Demo
                    </button>
                  )}
                  {status === 'NEED_KEY' && (
                    <button
                      onClick={() => handleSelectKey(idx)}
                      className="w-full bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-bold py-3 px-4 rounded uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Key className="w-4 h-4" /> Select API Key
                    </button>
                  )}
                  {status === 'GENERATING' && (
                    <div className="flex items-center gap-3 text-brand-blue animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Synthesizing Movement...</span>
                    </div>
                  )}
                  {status === 'ERROR' && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-red-400 font-mono">{errorMsg}</p>
                      <button
                        onClick={() => handleGenerateClick(idx)}
                        className="text-[10px] text-gray-400 hover:text-white underline uppercase tracking-widest"
                      >
                        Retry Generation
                      </button>
                    </div>
                  )}
                  {status === 'COMPLETED' && (
                    <button
                      onClick={() => handleGenerateClick(idx)}
                      className="text-[10px] text-gray-500 hover:text-brand-blue uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      <Video className="w-3 h-3" /> Regenerate Demo
                    </button>
                  )}
                </div>
              </div>

              {/* Video Side */}
              <div className="md:w-1/2 bg-brand-black/60 flex items-center justify-center min-h-[200px] relative">
                {status === 'COMPLETED' && videoUrl ? (
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                  />
                ) : (
                  <div className="text-center p-8">
                    <Video className="w-12 h-12 text-gray-800 mx-auto mb-2" />
                    <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                      {status === 'GENERATING' ? 'Processing...' : 'No Demo Generated'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoGenerator;