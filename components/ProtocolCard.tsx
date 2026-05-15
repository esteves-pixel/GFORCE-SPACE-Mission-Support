import React from 'react';
import { TrainingProtocol } from '../types';
import { Timer, Activity, Dumbbell } from 'lucide-react';

interface Props {
  protocol: TrainingProtocol;
}

const ProtocolCard: React.FC<Props> = ({ protocol }) => {
  return (
    <div className="bg-tactical-800 border-l-4 border-tactical-accent p-6 rounded-r-lg shadow-lg my-6">
      <div className="flex items-center gap-3 mb-4">
        <Dumbbell className="text-tactical-accent w-6 h-6" />
        <h3 className="text-xl font-display uppercase tracking-wider text-white">
          {protocol.title}
        </h3>
      </div>

      <div className="space-y-6">
        {protocol.rounds.map((round, idx) => (
          <div key={idx} className="bg-tactical-900/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
              <h4 className="font-bold text-tactical-accent">{round.name}</h4>
              <div className="flex items-center text-xs text-gray-400 gap-1">
                <Timer className="w-3 h-3" />
                <span>{round.duration}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 italic mb-3">{round.description}</p>
            <ul className="space-y-2">
              {round.drill.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2 text-sm text-gray-200">
                  <Activity className="w-4 h-4 mt-1 text-tactical-success shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {protocol.coachNotes && (
        <div className="mt-4 pt-4 border-t border-gray-700 text-sm">
          <span className="text-tactical-accent font-bold uppercase">Coach's Eye: </span>
          <span className="text-gray-300">{protocol.coachNotes}</span>
        </div>
      )}
    </div>
  );
};

export default ProtocolCard;
