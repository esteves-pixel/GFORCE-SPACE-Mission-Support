import React from 'react';
import { Map, CheckCircle2, Circle, Star, Cpu, Globe, Video, Database } from 'lucide-react';
import { motion } from 'motion/react';

const SystemRoadmap: React.FC = () => {
  const milestones = [
    {
      status: 'completed',
      title: 'Phase 1: The Core Engine',
      desc: 'Signal Ingest, Gap Analysis, and Training Protocol generation using Gemini 1.5 Pro.',
      icon: <Cpu className="w-5 h-5 text-green-400" />
    },
    {
      status: 'completed',
      title: 'Phase 2: Tactical Visualization',
      desc: 'Integration with Google Veo for cinematic training film generation.',
      icon: <Video className="w-5 h-5 text-green-400" />
    },
    {
      status: 'current',
      title: 'Phase 3: Multi-Source Synthesis',
      desc: 'Ability to ingest multiple signals simultaneously to find cross-domain intelligence.',
      icon: <Globe className="w-5 h-5 text-blue-400" />
    },
    {
      status: 'upcoming',
      title: 'Phase 4: Biometric Feedback Loop',
      desc: 'Syncing with wearable data (Whoop, Oura) to adjust protocols based on real-time recovery.',
      icon: <Star className="w-5 h-5 text-purple-400" />
    },
    {
      status: 'upcoming',
      title: 'Phase 5: Autonomous Intel Agents',
      desc: 'AI agents that proactively scan the web for signals relevant to your specific desires.',
      icon: <Database className="w-5 h-5 text-slate-500" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <Map className="w-8 h-8 text-blue-500" />
          System Roadmap
        </h1>
        <p className="text-slate-400 text-lg">
          The evolution of GFORCE - SPACE from a tactical tool to a personal intelligence agency.
        </p>
      </div>

      <div className="space-y-8">
        {milestones.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl border transition-all ${
              m.status === 'current' 
                ? 'bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/20' 
                : m.status === 'completed'
                ? 'bg-slate-900/30 border-slate-800 opacity-80'
                : 'bg-slate-900/10 border-slate-800/50 opacity-60'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {m.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : m.status === 'current' ? (
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-700" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{m.title}</h3>
                  {m.icon}
                </div>
                <p className="text-slate-400 leading-relaxed">{m.desc}</p>
                
                {m.status === 'current' && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                    ACTIVE DEVELOPMENT
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Have a feature request?</h3>
        <p className="text-slate-400 mb-6">
          The GFORCE - SPACE pipeline is built for the community. Use the Tactical Chat to submit 
          new feature ideas directly to the Intelligence Officer.
        </p>
        <div className="flex justify-center gap-4">
          <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-mono">
            v0.4.2-alpha
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-mono">
            BUILD_STABLE
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemRoadmap;
