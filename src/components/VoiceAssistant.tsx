import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Volume2, Send } from 'lucide-react';
import { voiceConversation } from '@/services/mockData';

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState(voiceConversation);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { speaker: 'farmer' as const, text: input, telugu: '', translation: input };
    const reply = {
      speaker: 'assistant' as const,
      text: 'Meeku 72 ghantala risk forecast chudandi. Plot C lo high risk undi. Repu morning 6 ki irrigation cheyyandi.',
      telugu: 'మీకు 72 గంటల రిస్క్ ఫోర్‌కాస్ట్ చూడండి. ప్లాట్ C లో హై రిస్క్ ఉంది.',
      translation: 'Check your 72-hour risk forecast. Plot C has high risk. Irrigate tomorrow morning at 6 AM.',
    };
    setMessages((m) => [...m, userMsg, reply]);
    setInput('');
  };

  const toggleListening = () => {
    setListening(!listening);
    if (!listening) {
      setTimeout(() => {
        setListening(false);
        setInput('Ee roju neellu pettala?');
      }, 2000);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-green-700 to-brand-green-500 shadow-card-hover flex items-center justify-center group"
        aria-label="Voice Assistant"
      >
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-brand-green-400 animate-pulse-ring" />
            <Mic className="w-6 h-6 text-white relative z-10" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-card-hover border border-brand-green-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-brand-green-800 to-brand-green-600 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Telugu Voice Assistant</p>
                  <p className="text-brand-green-100 text-xs">తెలుగు వాయిస్ అసిస్టెంట్</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-3 bg-brand-green-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.speaker === 'farmer' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.speaker === 'farmer'
                        ? 'bg-brand-green-800 text-white rounded-br-sm'
                        : 'bg-white text-ink border border-brand-green-100 rounded-bl-sm shadow-soft'
                    }`}
                  >
                    <p className="font-medium">{msg.text}</p>
                    {msg.translation && msg.speaker === 'assistant' && (
                      <p className="text-xs text-muted mt-1 italic">{msg.translation}</p>
                    )}
                  </div>
                </div>
              ))}
              {listening && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-green-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-brand-green-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-brand-green-100 bg-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    listening ? 'bg-danger text-white' : 'bg-brand-green-100 text-brand-green-800 hover:bg-brand-green-200'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type or speak in Telugu..."
                  className="flex-1 px-3 py-2 rounded-lg bg-brand-green-50 border border-brand-green-100 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand-green-400"
                />
                <button onClick={handleSend} className="w-10 h-10 rounded-full bg-brand-green-800 text-white flex items-center justify-center hover:bg-brand-green-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted mt-2 text-center">Example: "Ee roju neellu pettala?"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
