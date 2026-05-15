import React, { useState } from 'react';
import { generateScienceReview } from '../services/geminiService';
import { ScienceReview } from '../types';
import { Cpu, Loader2, Save } from 'lucide-react';

interface Props {
  onReviewGenerated: (review: ScienceReview) => void;
  onCancel: () => void;
}

const Generator: React.FC<Props> = ({ onReviewGenerated, onCancel }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const review = await generateScienceReview(input);
      if (review) {
        onReviewGenerated(review);
      } else {
        setError('Failed to generate protocol. Please check your API Key or try a different topic.');
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6 text-tactical-accent">
        <Cpu className="w-8 h-8" />
        <h2 className="text-2xl font-display font-bold uppercase">Protocol Generator</h2>
      </div>

      <div className="bg-tactical-800 p-6 rounded-lg border border-gray-700 shadow-xl">
        <label className="block text-sm font-bold text-gray-300 mb-2">
          Research Source or Topic
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Paste a PubMed abstract, a study title, or a general topic (e.g., "Sleep deprivation effects on SWAT decision making").
        </p>
        <textarea
          className="w-full h-48 bg-tactical-900 border border-gray-700 rounded p-4 text-white focus:outline-none focus:border-tactical-accent transition-colors resize-none"
          placeholder="Enter research data here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 text-sm rounded">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !input}
            className={`flex items-center gap-2 px-6 py-2 rounded font-bold uppercase tracking-wider transition-all
              ${loading 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-tactical-accent text-white hover:bg-blue-600 shadow-lg shadow-blue-900/20'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Generate Protocol
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generator;
