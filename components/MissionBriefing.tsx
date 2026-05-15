import React from 'react';
import { Rocket, Target, Zap, ArrowRight, Shield, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onStart: () => void;
}

const MissionBriefing: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Security Clearance: Level 1
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-white">
            Welcome to <span className="text-blue-500">GFORCE - SPACE</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The Tactical Intelligence Pipeline for high-performance humans. 
            We de-orbit complex science into actionable daily protocols.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-6 h-6 text-blue-400" />,
              title: "1. Capture Signal",
              desc: "Feed the system any high-level source—podcasts, papers, or technical news."
            },
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: "2. De-orbit Intel",
              desc: "Gemini performs a Gap Analysis to find the hidden tactics in the technical noise."
            },
            {
              icon: <Activity className="w-6 h-6 text-green-400" />,
              title: "3. Launch Protocol",
              desc: "Receive a validated training drill and broadcast script to share your findings."
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
            >
              <div className="mb-4 p-3 rounded-xl bg-slate-800 w-fit group-hover:bg-blue-500/10 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">Ready for your first mission?</h2>
            <p className="text-slate-400">
              Your dashboard is currently empty. Start by ingesting a signal from the "High-Orbit" 
              to see the de-orbiting process in action.
            </p>
          </div>
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95 whitespace-nowrap"
          >
            Enter Command Center
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-12 border-t border-slate-800">
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
              <Rocket className="w-4 h-4" /> NASA_SPEC_V2
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
              <Shield className="w-4 h-4" /> PROTOCOL_SECURE
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm">
              <Zap className="w-4 h-4" /> GEMINI_POWERED
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionBriefing;
