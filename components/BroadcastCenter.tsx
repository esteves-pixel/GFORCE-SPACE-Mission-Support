
import React, { useState } from 'react';
import { SpaceSignal, BroadcastScript } from '../types';
import { generateBroadcastScript } from '../services/geminiService';
import { Radio, Mic, Play, Terminal, Loader2, Share2, Clock, Eye } from 'lucide-react';

interface Props {
  signals: SpaceSignal[];
}

const BroadcastCenter: React.FC<Props> = ({ signals }) => {
  const [script, setScript] = useState<BroadcastScript | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await generateBroadcastScript(signals);
    setScript(data);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Production Stack */}
        <div className="lg:w-1/4">
          <div className="bg-brand-gray border border-gray-800 rounded-lg p-6 sticky top-24">
            <h3 className="text-sm font-mono font-bold text-brand-blue mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> PRODUCTION_STACK
            </h3>
            <div className="space-y-2 mb-6">
              {(signals || []).map(s => (
                <div key={s.id} className="p-2 bg-brand-black border-l-2 border-brand-blue text-[10px] font-mono text-gray-400">
                  {s.title}
                </div>
              ))}
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 rounded uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,122,255,0.3)]"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {script ? 'REFRESH SCRIPT' : 'INITIATE BROADCAST'}
            </button>
          </div>
        </div>

        {/* The Teleprompter */}
        <div className="lg:w-3/4">
          {script ? (
            <div className="space-y-6">
              <div className="bg-brand-black border border-brand-red/30 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-red rounded-full animate-pulse"></div>
                  <h2 className="text-xl font-display font-bold text-white tracking-widest">{script.showTitle}</h2>
                </div>
                <div className="text-xs font-mono text-gray-500 flex gap-4">
                  <span>SEGMENTS: {script.segments?.length || 0}</span>
                  <span>UPLINK: ACTIVE</span>
                </div>
              </div>

              {script.segments?.map((seg, idx) => (
                <div 
                  key={seg.id}
                  onClick={() => setActiveSegment(idx)}
                  className={`p-8 rounded-lg border transition-all cursor-pointer ${
                    activeSegment === idx 
                      ? 'bg-brand-gray border-brand-blue shadow-[0_0_30px_rgba(0,122,255,0.1)]' 
                      : 'bg-brand-gray/30 border-gray-800 opacity-50 grayscale hover:opacity-80'
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono text-brand-blue">SEGMENT {idx + 1} // {seg.duration}</span>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                      <Eye className="w-3 h-3" /> {seg.visualCue}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">{seg.title}</h3>
                  <div className="text-xl text-gray-300 leading-relaxed font-sans whitespace-pre-wrap italic">
                    {seg.copy}
                  </div>
                </div>
              ))}

              <div className="bg-brand-blue/10 border border-brand-blue/30 p-8 rounded-lg">
                <h4 className="text-brand-blue font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4" /> CLOSING PROTOCOL
                </h4>
                <p className="text-lg text-gray-300 italic">"{script.closingProtocol}"</p>
              </div>
            </div>
          ) : (
            <div className="h-[600px] border-2 border-dashed border-gray-800 rounded-lg flex flex-col items-center justify-center text-gray-600">
              <div className="relative mb-6">
                <Radio className="w-20 h-20 opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin opacity-40" />
                </div>
              </div>
              <p className="font-display font-bold uppercase tracking-widest animate-pulse">Waiting for Intel Stack to clear...</p>
              <p className="text-xs font-mono mt-2">Add signals to the dashboard to begin production.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BroadcastCenter;
