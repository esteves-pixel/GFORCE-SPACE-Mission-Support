
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Terminal, Loader2, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const TacticalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'GFORCE - SPACE Intelligence Link established. Awaiting tactical query.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: input,
        config: {
          systemInstruction: "You are GFORCE - SPACE Intelligence, a high-speed tactical assistant. Provide extremely concise, data-driven, and space-age responses. Focus on human performance, astronaut science, and combat tactics. Use technical terminology where appropriate.",
        }
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text || 'Error: Signal lost.',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'CRITICAL ERROR: Intelligence uplink failed.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-black/50 border border-gray-700 rounded-lg flex flex-col h-[600px] relative overflow-hidden">
      {/* HUD Lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-blue"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-blue"></div>
      
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-brand-gray/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-blue" />
          <h3 className="text-xs font-display font-bold text-white tracking-widest uppercase">Tactical_Intelligence_Link</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-mono text-gray-500 uppercase">Secure Uplink</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-brand-blue/20"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`
                w-8 h-8 rounded shrink-0 flex items-center justify-center border
                ${msg.role === 'user' ? 'bg-brand-blue/20 border-brand-blue/50' : 'bg-brand-red/20 border-brand-red/50'}
              `}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-brand-blue" /> : <Bot className="w-4 h-4 text-brand-red" />}
              </div>
              <div className={`
                max-w-[80%] p-4 rounded-lg text-sm font-mono leading-relaxed
                ${msg.role === 'user' ? 'bg-brand-blue/10 text-white border border-brand-blue/20' : 'bg-brand-gray/80 text-gray-300 border border-gray-700'}
              `}>
                {msg.content}
                <div className="mt-2 text-[9px] opacity-30 text-right">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center border bg-brand-red/20 border-brand-red/50">
              <Loader2 className="w-4 h-4 text-brand-red animate-spin" />
            </div>
            <div className="bg-brand-gray/80 p-4 rounded-lg border border-gray-700">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-brand-gray/50 border-t border-gray-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter tactical query..."
            className="w-full bg-brand-black border border-gray-700 rounded-lg py-3 px-4 pr-12 text-sm font-mono text-white placeholder:text-gray-600 focus:border-brand-blue focus:outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-blue hover:text-white transition-colors disabled:opacity-30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Protocol: 3.1-Flash-Lite</span>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-yellow" />
            <span className="text-[9px] text-brand-yellow font-mono uppercase tracking-widest">Intelligence Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalChat;
