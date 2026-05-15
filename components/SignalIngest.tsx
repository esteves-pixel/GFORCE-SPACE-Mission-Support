
import React, { useState } from 'react';
import { deorbitSignal } from '../services/geminiService';
import { SpaceSignal } from '../types';
import { Satellite, Zap, Loader2, Link as LinkIcon, Clipboard, Info, Youtube } from 'lucide-react';

interface Props {
  onSignalAdded: (signal: SpaceSignal) => void;
}

const SignalIngest: React.FC<Props> = ({ onSignalAdded }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'TEXT' | 'URL'>('TEXT');

  const handleIngest = async () => {
    if (!input) return;
    setLoading(true);
    const data = await deorbitSignal(input, mode === 'URL');
    if (data) {
      onSignalAdded({
        id: `sig-${Date.now()}`,
        title: data.title || (mode === 'URL' ? 'Video Audit' : 'Intelligence Update'),
        source: mode === 'URL' ? 'External Link' : 'Direct Entry',
        timestamp: new Date().toISOString().split('T')[0],
        rawNews: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
        deorbitedInsight: data.deorbitedInsight || '',
        relevance: data.relevance || 'PERSONAL',
        analysis: data.analysis,
        status: 'DRAFT'
      });
      setInput('');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fadeIn">
      <div className="bg-brand-gray border border-gray-800 rounded-lg p-8 relative overflow-hidden">
        <div className="scan-line"></div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <Satellite className="text-brand-blue" /> INTEL_INGESTION
          </h2>
          <div className="flex bg-brand-black p-1 rounded-lg border border-gray-800">
            <button 
              onClick={() => setMode('TEXT')}
              className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${mode === 'TEXT' ? 'bg-brand-blue text-white' : 'text-gray-500'}`}
            >
              Raw Text
            </button>
            <button 
              onClick={() => setMode('URL')}
              className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${mode === 'URL' ? 'bg-brand-blue text-white' : 'text-gray-500'}`}
            >
              URL / Video
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
              {mode === 'URL' ? <LinkIcon className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
              {mode === 'URL' ? 'Source Intelligence Link' : 'Raw Data Feed'}
            </label>
          </div>
          {mode === 'URL' ? (
            <input 
              type="text"
              className="w-full bg-brand-black border border-gray-800 rounded p-4 text-brand-blue font-mono text-sm focus:outline-none focus:border-brand-blue transition-all"
              placeholder="https://www.youtube.com/watch?v=..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <textarea 
              className="w-full h-64 bg-brand-black border border-gray-800 rounded p-6 text-gray-300 font-mono text-sm focus:outline-none focus:border-brand-blue transition-all resize-none shadow-inner"
              placeholder="Paste research, newsletters, or technical docs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </div>

        <div className="bg-brand-blue/5 border border-brand-blue/20 p-4 rounded mb-6 flex gap-3 items-start">
          <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            {mode === 'URL' 
              ? "URL Mode: System will verify the link, extract content via Google Search grounding, and perform a Gap Analysis on the provided protocol."
              : "Text Mode: Direct de-orbiting of information into human tactics."}
          </p>
        </div>

        <button 
          onClick={handleIngest}
          disabled={loading || !input}
          className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />}
          {mode === 'URL' ? 'AUDIT VIDEO INTELLIGENCE' : 'PROCESS SIGNAL'}
        </button>
      </div>
    </div>
  );
};

export default SignalIngest;
