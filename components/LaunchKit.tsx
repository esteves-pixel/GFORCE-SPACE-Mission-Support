import React, { useState, useEffect } from 'react';
import { generateLaunchAssets } from '../services/geminiService';
import { LaunchAsset } from '../types';
import { Rocket, Linkedin, Instagram, Twitter, Mail, Copy, Check, Loader2 } from 'lucide-react';

const LaunchKit: React.FC = () => {
  const [assets, setAssets] = useState<LaunchAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      const generated = await generateLaunchAssets();
      setAssets(generated);
      setLoading(false);
    };
    loadAssets();
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'LINKEDIN': return <Linkedin className="w-5 h-5 text-blue-500" />;
      case 'INSTAGRAM': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'TWITTER': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'EMAIL': return <Mail className="w-5 h-5 text-yellow-500" />;
      default: return <Rocket className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-brand-blue animate-spin mb-4" />
        <h3 className="text-xl font-display font-bold text-white animate-pulse">INITIATING LAUNCH SEQUENCE</h3>
        <p className="text-gray-500 mt-2">Drafting official comms for all channels...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-blue p-2 rounded-full shadow-[0_0_20px_rgba(28,109,208,0.5)]">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-white">LAUNCH COMMAND</h2>
          <p className="text-gray-400">Official "Go Live" Assets • {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid gap-8">
        {assets.map((asset, idx) => (
          <div key={idx} className="bg-brand-gray/30 border border-gray-700 rounded-lg p-6 hover:border-brand-blue transition-colors">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {getIcon(asset.platform)}
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">{asset.platform}</h3>
              </div>
              <button
                onClick={() => handleCopy(asset.content, idx)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors bg-brand-black px-3 py-1.5 rounded border border-gray-700"
              >
                {copiedIndex === idx ? (
                  <> <Check className="w-3 h-3 text-green-500" /> Copied </>
                ) : (
                  <> <Copy className="w-3 h-3" /> Copy Text </>
                )}
              </button>
            </div>

            <div className="bg-brand-black/50 p-4 rounded border border-gray-800 font-mono text-sm text-gray-300 whitespace-pre-wrap mb-4">
              {asset.content}
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-xs text-gray-500">
              <div className="flex-1">
                <span className="text-brand-blue font-bold uppercase block mb-1">Visual Directive:</span>
                {asset.visualCue}
              </div>
              <div className="flex-1">
                <span className="text-brand-blue font-bold uppercase block mb-1">Hashtags:</span>
                {(asset.hashtags || []).join(" ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchKit;