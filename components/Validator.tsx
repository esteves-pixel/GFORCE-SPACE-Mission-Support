import React from 'react';
import { ValidationReport } from '../types';
import { CheckCircle, AlertTriangle, ShieldCheck, Share2, ClipboardCheck } from 'lucide-react';

interface Props {
  report: ValidationReport;
}

const Validator: React.FC<Props> = ({ report }) => {
  return (
    <div className="mt-8 bg-brand-gray/20 border border-brand-gray rounded-lg overflow-hidden animate-fadeIn">
      <div className="bg-brand-gray p-4 flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-yellow" />
          SCIENTIFIC VALIDATION REPORT
        </h3>
        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
          report.overallQuality === 'High' ? 'bg-green-600 text-white' : 'bg-brand-red text-white'
        }`}>
          Quality: {report.overallQuality}
        </span>
      </div>

      <div className="p-6 grid gap-6 md:grid-cols-2">
        {/* Verification Column */}
        <div className="space-y-6">
          <div className="bg-brand-black p-4 rounded border border-gray-700">
            <h4 className="flex items-center gap-2 text-brand-blue font-bold text-sm uppercase mb-2">
              <ClipboardCheck className="w-4 h-4" /> Science & Claims
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {report.scientificVerification}
            </p>
          </div>

          <div className="bg-brand-black p-4 rounded border border-gray-700">
            <h4 className="flex items-center gap-2 text-brand-yellow font-bold text-sm uppercase mb-2">
              <AlertTriangle className="w-4 h-4" /> Biomechanics Check
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {report.biomechanicsCheck}
            </p>
          </div>
          
           <div className="bg-brand-black p-4 rounded border border-gray-700">
            <h4 className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase mb-2">
              <CheckCircle className="w-4 h-4" /> Brand Voice
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {report.brandVoiceCheck}
            </p>
          </div>
        </div>

        {/* Social & Correction Column */}
        <div className="space-y-6">
          {report.correctedContent && (
            <div className="bg-blue-900/20 p-4 rounded border border-blue-800">
              <h4 className="text-blue-400 font-bold text-sm uppercase mb-2">Suggested Correction</h4>
              <p className="text-sm text-gray-300 italic">
                "{report.correctedContent}"
              </p>
            </div>
          )}

          <div>
             <h4 className="flex items-center gap-2 text-white font-display font-bold text-lg mb-4">
               <Share2 className="w-5 h-5" /> Repurpose Assets
             </h4>
             <div className="space-y-4">
               {(report.socialAssets || []).map((asset, idx) => (
                 <div key={idx} className="bg-brand-gray/50 p-4 rounded hover:bg-brand-gray transition-colors">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-brand-yellow uppercase">{asset.platform}</span>
                   </div>
                   <p className="text-sm text-white font-mono mb-3 p-2 bg-black/30 rounded">
                     {asset.caption}
                   </p>
                   <p className="text-xs text-gray-400">
                     <span className="font-bold text-gray-300">Visual:</span> {asset.visualIdea}
                   </p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validator;