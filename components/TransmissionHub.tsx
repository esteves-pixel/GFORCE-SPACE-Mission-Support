
import React, { useState } from 'react';
import { SpaceSignal, BroadcastScript } from '../types';
import { Terminal, Radio, Zap, ArrowRight, Code, Layout, Share2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  signals: SpaceSignal[];
}

const TransmissionHub: React.FC<Props> = ({ signals }) => {
  const [selectedSignal, setSelectedSignal] = useState<SpaceSignal | null>(signals[0] || null);
  const [activeLayer, setActiveLayer] = useState<'CODE' | 'INTEL' | 'MEDIA'>('INTEL');

  if (!selectedSignal) return (
    <div className="h-96 flex items-center justify-center text-gray-500 font-mono italic">
      NO_SIGNALS_DETECTED // INITIATE_SCAN
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-white tracking-tighter flex items-center gap-4">
             <div className="p-2 bg-brand-blue rounded-lg shadow-[0_0_20px_rgba(0,122,255,0.4)]">
                <ShieldCheck className="w-8 h-8 text-white" />
             </div>
             TRANSMISSION_CONNECTOR
          </h2>
          <p className="text-brand-blue font-mono text-xs mt-3 tracking-[0.3em] uppercase">
             Connecting Technical Requirements to Human Implementation
          </p>
        </div>

        <div className="flex bg-brand-gray border border-gray-800 p-1 rounded-xl">
           {(['CODE', 'INTEL', 'MEDIA'] as const).map((layer) => (
             <button
               key={layer}
               onClick={() => setActiveLayer(layer)}
               className={`px-8 py-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                 activeLayer === layer 
                   ? 'bg-brand-blue text-white shadow-lg' 
                   : 'text-gray-500 hover:text-white'
               }`}
             >
               {layer === 'CODE' && <Code className="w-4 h-4" />}
               {layer === 'INTEL' && <Zap className="w-4 h-4" />}
               {layer === 'MEDIA' && <Radio className="w-4 h-4" />}
               {layer}
             </button>
           ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Signal Sidebar */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">ACTIVE_STREAM</h3>
           {signals.map((s) => (
             <div 
               key={s.id}
               onClick={() => setSelectedSignal(s)}
               className={`p-4 rounded-lg border transition-all cursor-pointer group ${
                 selectedSignal.id === s.id 
                   ? 'bg-brand-blue/10 border-brand-blue shadow-[0_0_15px_rgba(0,122,255,0.1)]' 
                   : 'bg-brand-gray/30 border-gray-800 hover:border-gray-600'
               }`}
             >
               <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    selectedSignal.id === s.id ? 'bg-brand-blue text-white' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {s.source}
                  </span>
                  <span className="text-[9px] text-gray-600 font-mono">{s.timestamp}</span>
               </div>
               <h4 className={`font-bold text-sm leading-tight transition-colors ${
                 selectedSignal.id === s.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
               }`}>
                 {s.title}
               </h4>
             </div>
           ))}
        </div>

        {/* Transmission Stage */}
        <div className="lg:col-span-2 min-h-[600px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer + selectedSignal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-brand-gray border border-gray-800 rounded-2xl p-8 h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 {activeLayer === 'CODE' && <Code className="w-64 h-64" />}
                 {activeLayer === 'INTEL' && <Zap className="w-64 h-64" />}
                 {activeLayer === 'MEDIA' && <Radio className="w-64 h-64" />}
              </div>

              {activeLayer === 'CODE' && (
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-blue animate-pulse rounded-full"></div>
                    <h3 className="text-xl font-display font-bold text-white tracking-widest uppercase">RAW_SIGNAL_STRUCTURE</h3>
                  </div>
                  <div className="bg-brand-black/80 rounded-lg p-6 border border-gray-800 font-mono text-sm overflow-x-auto">
                    <pre className="text-brand-blue">
                      {JSON.stringify({
                        signal_id: selectedSignal.id,
                        origin: selectedSignal.source,
                        technical_requirements: selectedSignal.analysis?.processes || [],
                        strategic_gaps: selectedSignal.analysis?.gaps || [],
                        roadmap_v1: selectedSignal.analysis?.roadmap
                      }, null, 2)}
                    </pre>
                  </div>
                  <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-lg">
                    <p className="text-xs text-gray-400 font-mono italic">
                      // PRD Extraction Complete: Translating technical constraints into baseline human performance metrics.
                    </p>
                  </div>
                </div>
              )}

              {activeLayer === 'INTEL' && (
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{selectedSignal.title}</h3>
                    <div className="flex gap-4">
                       <span className="text-xs font-mono text-brand-yellow uppercase tracking-widest">DE-ORBITED_INSIGHT</span>
                       <span className="text-xs font-mono text-gray-500">// AUDIT_COMPLETE</span>
                    </div>
                  </div>

                  <div className="bg-brand-black p-8 rounded-xl border border-brand-yellow/20 relative">
                     <span className="absolute top-2 left-4 text-[9px] font-bold text-brand-yellow/40">BRAND_VOICE_OVERRIDE</span>
                     <p className="text-xl text-gray-200 leading-relaxed italic">
                       "{selectedSignal.deorbitedInsight}"
                     </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                       <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Terminal className="w-3 h-3 text-brand-blue" /> CORE_CAPABILITIES
                       </h4>
                       <ul className="space-y-3">
                         {selectedSignal.analysis?.processes.map((p, i) => (
                           <li key={i} className="flex gap-3 text-sm text-gray-400">
                             <ArrowRight className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" /> {p}
                           </li>
                         ))}
                       </ul>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Layout className="w-3 h-3 text-brand-yellow" /> STRATEGIC_MAP
                       </h4>
                       <p className="text-sm text-gray-400 leading-relaxed bg-brand-black/30 p-4 rounded border border-gray-800">
                         {selectedSignal.analysis?.roadmap}
                       </p>
                    </div>
                  </div>
                </div>
              )}

              {activeLayer === 'MEDIA' && (
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white tracking-widest">BROADCAST_READY</h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">Converted from Signal: {selectedSignal.id}</p>
                    </div>
                    <button className="bg-brand-blue px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-brand-blue/20">
                      <Share2 className="w-4 h-4" /> EXPORT ASSETS
                    </button>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="p-6 bg-brand-black border border-brand-red/30 rounded-xl relative">
                       <div className="flex items-center gap-2 text-brand-red mb-3">
                          <Radio className="w-4 h-4 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Podcast Hook</span>
                       </div>
                       <p className="text-lg text-gray-300 italic">
                         "Welcome back to GFORCE - SPACE. I'm Gonçalo Esteves. Today we're de-orbiting ${selectedSignal.title}. Here's why your legacy systems won't survive this update..."
                       </p>
                    </div>

                    <div className="p-6 bg-brand-black border border-gray-800 rounded-xl">
                       <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4 block">Social Media Payload</span>
                       <div className="p-4 bg-brand-gray/50 rounded font-mono text-xs text-gray-400 border border-gray-800">
                          {selectedSignal.title} | New Space Intelligence Audit 🛰️ <br/><br/>
                          🚀 De-orbiting: {selectedSignal.deorbitedInsight.substring(0, 100)}...<br/><br/>
                          #GFORCE #SpaceIntelligence #HighPerformance
                       </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-brand-blue/10 rounded-lg flex items-center gap-4 border border-brand-blue/30">
                     <div className="w-10 h-10 bg-brand-blue flex items-center justify-center rounded-full text-white">
                        <Radio className="w-5 h-5" />
                     </div>
                     <div className="text-xs">
                        <p className="text-white font-bold">PRO-TIP</p>
                        <p className="text-gray-400">Use this script for your next LinkedIn Video or Podcast episode.</p>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TransmissionHub;
