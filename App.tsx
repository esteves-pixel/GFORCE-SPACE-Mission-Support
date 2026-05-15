
import React, { useState, useEffect } from 'react';
import { INITIAL_SIGNALS } from './constants';
import { ViewMode, SpaceSignal } from './types';
import BroadcastCenter from './components/BroadcastCenter';
import SignalIngest from './components/SignalIngest';
import LaunchKit from './components/LaunchKit';
import TacticalChat from './components/TacticalChat';
import VoiceCommand from './components/VoiceCommand';
import ProtocolCard from './components/ProtocolCard';
import VideoGenerator from './components/VideoGenerator';
import MissionBriefing from './components/MissionBriefing';
import SystemRoadmap from './components/SystemRoadmap';
import TransmissionHub from './components/TransmissionHub';
import { 
  Rocket, Radio, Satellite, Plus, LayoutDashboard, Zap, AlertTriangle, CheckCircle2, ListChecks, ArrowRight, Shield, MessageSquare, Play, Map, Info, HelpCircle, ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const App: React.FC = () => {
  const [signals, setSignals] = useState<SpaceSignal[]>(INITIAL_SIGNALS || []);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [selectedSignal, setSelectedSignal] = useState<SpaceSignal | null>(null);
  const [hasSeenBriefing, setHasSeenBriefing] = useState<boolean>(() => {
    return localStorage.getItem('gforce_space_briefing_seen') === 'true';
  });
  
  useEffect(() => {
    if (!hasSeenBriefing) {
      setViewMode(ViewMode.MISSION_BRIEFING);
    }
  }, [hasSeenBriefing]);

  useEffect(() => {
    console.log("Initial signals:", signals);
  }, []);

  const handleSignalAdded = (newSignal: SpaceSignal) => {
    console.log("Signal added:", newSignal);
    setSignals([newSignal, ...(signals || [])]);
    setViewMode(ViewMode.DASHBOARD);
  };

  const updateSignalStatus = (id: string, newStatus: SpaceSignal['status']) => {
    setSignals((signals || []).map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setViewMode(ViewMode.DASHBOARD)}>
          <div className="bg-brand-blue p-1.5 rounded shadow-[0_0_15px_rgba(0,122,255,0.4)] group-hover:rotate-12 transition-all">
            <Rocket className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-widest">GFORCE - SPACE</h1>
            <p className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.2em] -mt-1">MISSION_CONTROL</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <button onClick={() => setViewMode(ViewMode.DASHBOARD)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.DASHBOARD ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <LayoutDashboard className="w-4 h-4" /> TERMINAL
          </button>
          <button onClick={() => setViewMode(ViewMode.BROADCAST_CENTER)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.BROADCAST_CENTER ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <Radio className="w-4 h-4" /> STUDIO
          </button>
          <button onClick={() => setViewMode(ViewMode.TACTICAL_CHAT)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.TACTICAL_CHAT ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <MessageSquare className="w-4 h-4" /> INTEL_CHAT
          </button>
          <button onClick={() => setViewMode(ViewMode.TRANSMISSION_HUB)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.TRANSMISSION_HUB ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <ShieldCheck className="w-4 h-4" /> TRANSMISSION
          </button>
          <button onClick={() => setViewMode(ViewMode.SYSTEM_ROADMAP)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.SYSTEM_ROADMAP ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <Map className="w-4 h-4" /> ROADMAP
          </button>
          <button onClick={() => setViewMode(ViewMode.MISSION_BRIEFING)} className={`text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${viewMode === ViewMode.MISSION_BRIEFING ? 'text-brand-blue' : 'text-gray-500 hover:text-white'}`}>
            <HelpCircle className="w-4 h-4" /> BRIEFING
          </button>
        </nav>

        <button 
          onClick={() => setViewMode(ViewMode.INGEST_SIGNAL)}
          className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> INGEST_INTEL
        </button>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Pipeline Status Overview */}
      <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'INGESTED', count: (signals || []).length, color: 'text-blue-400', icon: <Satellite className="w-4 h-4" /> },
          { label: 'DE-ORBITED', count: (signals || []).filter(s => s.analysis).length, color: 'text-yellow-400', icon: <Zap className="w-4 h-4" /> },
          { label: 'VALIDATED', count: (signals || []).filter(s => s.protocol).length, color: 'text-green-400', icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: 'DEPLOYED', count: (signals || []).filter(s => s.status === 'DEPLOYED').length, color: 'text-purple-400', icon: <Rocket className="w-4 h-4" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-brand-gray/50 border border-gray-800 p-4 rounded-xl flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-500 tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Left HUD: System Intelligence */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-gray border border-gray-800 rounded-lg p-6 relative overflow-hidden group">
             <div className="scan-line"></div>
             <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> SYSTEM_READY
             </h3>
             <div className="space-y-4 font-mono">
                <div className="flex justify-between text-[10px]">
                   <span className="text-gray-500">SIGNALS_IN_STACK</span>
                   <span className="text-white">{(signals || []).length}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                   <span className="text-gray-500">LIVE_ROADMAPS</span>
                   <span className="text-brand-blue">{(signals || []).filter(s => s.analysis?.roadmap).length}</span>
                </div>
             </div>
          </div>

          <div className="bg-brand-gray/30 border border-gray-800 rounded-lg p-6">
             <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">DEPLOYMENT_QUEUE</h3>
             <div className="space-y-3">
                {(signals || []).slice(0, 5).map(s => (
                   <div key={s.id} className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                      <span className="truncate w-32">{s.title}</span>
                      <span className={s.status === 'DEPLOYED' ? 'text-green-500' : 'text-brand-yellow'}>{s.status}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Intelligence Stream */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3 tracking-tighter">
              INTELLIGENCE_AUDIT_STREAM
            </h2>
            <div className="text-[10px] font-mono text-gray-600">FILTER: ALL_SIGNALS</div>
          </div>
          
          <div className="space-y-6">
            {(signals || []).map(signal => (
              <div 
                key={signal.id} 
                className="bg-brand-gray group hover:border-brand-blue transition-all border border-gray-800 rounded-lg p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden"
              >
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className="text-[10px] font-mono bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded border border-brand-blue/20">
                          {signal.source}
                        </span>
                        <span className="text-[10px] font-mono bg-brand-yellow/10 text-brand-yellow px-2 py-0.5 rounded border border-brand-yellow/20 uppercase">
                          {signal.relevance}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">{signal.status}</span>
                   </div>

                   <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-brand-blue transition-colors">
                     {signal.title}
                   </h3>

                   {/* Toggle Code View */}
                   <div className="mb-4">
                      <button 
                         onClick={() => setSelectedSignal(selectedSignal?.id === signal.id ? null : signal)}
                         className="text-[9px] font-mono text-gray-600 hover:text-brand-blue flex items-center gap-1 uppercase tracking-widest border border-gray-800 rounded px-2 py-1 bg-brand-black/30"
                      >
                         {selectedSignal?.id === signal.id ? '[-]' : '[+]'} VIEW_SIGNAL_CODE
                      </button>
                      {selectedSignal?.id === signal.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 bg-brand-black p-4 rounded border border-brand-blue/30 overflow-x-auto"
                        >
                           <pre className="text-[10px] text-brand-blue font-mono">
                             {JSON.stringify(signal, null, 2)}
                           </pre>
                        </motion.div>
                      )}
                   </div>

                   <div className="bg-brand-black/50 p-6 rounded border border-gray-800 mb-6 relative">
                      <div className="absolute top-2 right-2 opacity-10"><Shield className="w-12 h-12" /></div>
                      <h4 className="text-[10px] font-bold text-brand-yellow uppercase mb-3 flex items-center gap-2 tracking-widest">
                        <Zap className="w-3 h-3 animate-pulse" /> DE-ORBITED INSIGHT
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed italic">
                        "{signal.deorbitedInsight}"
                      </p>
                   </div>
                   
                   {signal.analysis && (
                     <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="p-5 bg-brand-black rounded border border-gray-800/50">
                           <h5 className="text-[9px] font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                             <ListChecks className="w-3 h-3 text-brand-blue" /> CORE_PROCESSES
                           </h5>
                           <ul className="text-[11px] text-gray-400 space-y-2">
                             {signal.analysis.processes.map((p, i) => (
                               <li key={i} className="flex gap-2"><span className="text-brand-blue">»</span> {p}</li>
                             ))}
                           </ul>
                        </div>
                        <div className="p-5 bg-brand-black rounded border border-red-900/20">
                           <h5 className="text-[9px] font-bold text-brand-red uppercase mb-3 flex items-center gap-2">
                             <AlertTriangle className="w-3 h-3" /> STRATEGIC_GAPS
                           </h5>
                           <ul className="text-[11px] text-red-400/70 space-y-2">
                             {signal.analysis.gaps.map((g, i) => (
                               <li key={i} className="flex gap-2"><span className="text-brand-red">!</span> {g}</li>
                             ))}
                           </ul>
                        </div>
                        <div className="md:col-span-2 p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-lg">
                           <h5 className="text-[10px] font-bold text-brand-blue uppercase mb-3 flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4" /> 12-WEEK DEPLOYMENT ROADMAP
                           </h5>
                           <p className="text-xs text-gray-400 leading-relaxed font-mono">
                             {signal.analysis.roadmap}
                           </p>
                        </div>
                     </div>
                   )}
                </div>

                <div className="md:w-60 flex flex-col justify-between items-center py-6 border-l border-gray-800 md:pl-8 mt-6 md:mt-0">
                   <div className="text-center w-full mb-8">
                      <p className="text-[10px] text-gray-600 font-mono uppercase mb-2 tracking-widest">IMPLEMENTATION</p>
                      <div className="inline-block px-4 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/10">
                        <span className={`text-[10px] font-bold tracking-widest ${signal.analysis?.implementationEase === 'EASY' ? 'text-green-500' : 'text-brand-yellow'}`}>
                           {signal.analysis?.implementationEase || 'MODERATE'}
                        </span>
                      </div>
                   </div>
                   
                   <div className="w-full space-y-3">
                      <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                         <Info className="w-2 h-2" /> Pipeline Sequence
                      </div>
                      
                     {signal.protocol && (
                       <button 
                          onClick={() => {
                            setSelectedSignal(signal);
                            setViewMode(ViewMode.TRAINING_PROTOCOL);
                          }}
                          className="w-full py-4 rounded text-[10px] font-bold uppercase tracking-[0.2em] bg-brand-blue text-white border border-brand-blue shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn"
                       >
                          <Play className="w-4 h-4" /> 1. VIEW_PROTOCOL
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                       </button>
                     )}
                     
                     <button 
                        onClick={() => updateSignalStatus(signal.id, 'DEPLOYED')}
                        className={`w-full py-4 rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                          signal.status === 'DEPLOYED' 
                            ? 'bg-green-600/20 text-green-500 border border-green-600/50 cursor-default' 
                            : 'bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 shadow-lg active:scale-95'
                        }`}
                     >
                        {signal.status === 'DEPLOYED' ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                        {signal.status === 'DEPLOYED' ? '2. MISSION_ACTIVE' : '2. DEPLOY_PROTOCOL'}
                     </button>
                     
                     <button 
                       onClick={() => setViewMode(ViewMode.BROADCAST_CENTER)}
                       className="w-full py-3 text-[9px] text-gray-500 hover:text-brand-blue uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-brand-blue/30 rounded"
                     >
                        3. ADD TO STUDIO <Radio className="w-3 h-3" />
                     </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-blue/30 selection:text-white">
      {renderHeader()}
      {viewMode === ViewMode.DASHBOARD && renderDashboard()}
      {viewMode === ViewMode.MISSION_BRIEFING && (
        <MissionBriefing onStart={() => {
          setHasSeenBriefing(true);
          localStorage.setItem('gforce_space_briefing_seen', 'true');
          setViewMode(ViewMode.DASHBOARD);
        }} />
      )}
      {viewMode === ViewMode.SYSTEM_ROADMAP && <SystemRoadmap />}
      {viewMode === ViewMode.TRANSMISSION_HUB && <TransmissionHub signals={signals} />}
      {viewMode === ViewMode.BROADCAST_CENTER && <BroadcastCenter signals={signals} />}
      {viewMode === ViewMode.INGEST_SIGNAL && <SignalIngest onSignalAdded={handleSignalAdded} />}
      {viewMode === ViewMode.LAUNCH_KIT && <LaunchKit />}
      {viewMode === ViewMode.TACTICAL_CHAT && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <TacticalChat />
        </div>
      )}
      
      {viewMode === ViewMode.TRAINING_PROTOCOL && selectedSignal?.protocol && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button 
            onClick={() => setViewMode(ViewMode.DASHBOARD)}
            className="mb-8 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest flex items-center gap-2"
          >
            ← BACK_TO_TERMINAL
          </button>
          <ProtocolCard protocol={selectedSignal.protocol} />
          <VideoGenerator protocol={selectedSignal.protocol} />
        </div>
      )}
      
      <VoiceCommand />
      
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-brand-black border border-gray-800 px-4 py-2 rounded-full flex items-center gap-4 shadow-2xl">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-mono text-gray-500">UPLINK_STABLE</span>
           </div>
           <div className="text-[9px] font-mono text-gray-400">GFORCE - SPACE_SYSTEM_V6.4</div>
        </div>
      </div>
    </div>
  );
};

export default App;
