import React from 'react';
import { DailyMission } from '../types';
import { CheckCircle2, Circle, Target, Brain, Activity, Shield } from 'lucide-react';

interface Props {
  missions: DailyMission[];
  onToggle: (id: string) => void;
}

const MissionLog: React.FC<Props> = ({ missions, onToggle }) => {
  const completedCount = (missions || []).filter(m => m.completed).length;
  const progress = (missions || []).length > 0 ? (completedCount / (missions || []).length) * 100 : 0;

  const getIcon = (category: string) => {
    switch(category) {
      case 'MIND': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'BODY': return <Activity className="w-4 h-4 text-brand-blue" />;
      case 'SKILL': return <Shield className="w-4 h-4 text-brand-yellow" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-brand-black/50 border border-gray-700 rounded-lg p-6 mb-8 relative overflow-hidden">
      {/* HUD Lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-blue"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-blue"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-blue"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-blue"></div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-widest flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-red animate-pulse" />
            FLIGHT STATUS: <span className={progress === 100 ? "text-green-500" : "text-brand-yellow"}>
              {progress === 100 ? "READY TO LAUNCH" : "PRE-FLIGHT CHECKS"}
            </span>
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">G-FORCE READINESS PROTOCOL</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-display font-bold text-white">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand-blue to-green-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-3">
        {(missions || []).map((mission) => (
          <div 
            key={mission.id}
            onClick={() => onToggle(mission.id)}
            className={`
              flex items-center justify-between p-4 rounded cursor-pointer transition-all border
              ${mission.completed 
                ? 'bg-green-900/10 border-green-800/30' 
                : 'bg-gray-900/50 border-gray-800 hover:bg-gray-800'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center border
                ${mission.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}
              `}>
                {mission.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <div>
                <span className={`text-sm font-bold uppercase tracking-wider block ${mission.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {mission.label}
                </span>
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1 mt-0.5">
                  {getIcon(mission.category)} {mission.category}
                </span>
              </div>
            </div>
            
            {mission.completed && (
              <span className="text-[10px] text-green-400 font-mono uppercase">Confirmed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionLog;