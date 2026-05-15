import React from 'react';
import { AppendixData } from '../types';
import { Microscope, FileText, Brain, Target } from 'lucide-react';

interface Props {
  data: AppendixData;
}

const AppendixView: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-2xl font-display text-gray-400 mb-6 flex items-center gap-2">
        <Microscope className="w-6 h-6" />
        APPENDIX: DEEP DIVE
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center gap-2 text-tactical-accent font-bold mb-2">
            <FileText className="w-4 h-4" /> Methodology
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">{data.methodology}</p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-tactical-success font-bold mb-2">
            <Target className="w-4 h-4" /> Findings
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">{data.findings}</p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-yellow-500 font-bold mb-2">
            <Brain className="w-4 h-4" /> Implications
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">{data.implications}</p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-purple-500 font-bold mb-2">
            Context
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">{data.context}</p>
        </div>
      </div>
    </div>
  );
};

export default AppendixView;
