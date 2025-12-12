import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, Sparkles, Bot, Loader2, Calendar, Star, Route, Compass, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ⚠️ PASTE YOUR GEMINI API KEY HERE IF YOU HAVEN'T YET
const API_KEY = "AIzaSyBm3X7W2njci6cwa0UyN5KoBYIIFW-xgrA"; 

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // State to show/hide welcome screen
  const [input, setInput] = useState("");
  // Initial message history
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!showWelcome) {
        scrollToBottom();
    }
  }, [messages, showWelcome]);

  const handleSend = async (textInput = input) => {
    const messageText = textInput.trim();
    if (!messageText) return;

    // Transition to chat view
    if (showWelcome) setShowWelcome(false);

    // 1. Add User Message
    const userMessage = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
        // 2. Call Gemini API
        if (API_KEY === "AIzaSyBm3X7W2njci6cwa0UyN5KoBYIIFW-xgrA" || !API_KEY) {
            throw new Error("Please add your API Key in Chatbot.jsx");
        }
        
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        // Hampi Context for the AI
        const prompt = `You are Vyom, an expert AI travel companion for Hampi, Karnataka. 
        The user asks: "${messageText}". 
        Provide a helpful, engaging response about Hampi's heritage, sites, or travel tips. Keep it concise (around 50-75 words).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 3. Add AI Response
        setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
        console.error("Gemini Error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the Hampi network right now. Please check my API key setup!" }]);
    } finally {
        setIsLoading(false);
    }
  };

  // Quick Action Button Component
  const QuickActionButton = ({ icon: Icon, text, query }) => (
    <button 
      onClick={() => handleSend(query)}
      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-brand-accent/50 hover:shadow-md transition-all text-left group"
    >
      <div className="bg-brand-bg p-2 rounded-xl text-brand-accent group-hover:scale-110 transition">
        <Icon size={20} />
      </div>
      <span className="font-bold text-brand-dark text-sm">{text}</span>
    </button>
  );

  return (
    <>
      {/* 1. THE FLOATING PILL BUTTON */}
      <AnimatePresence>
        {!isOpen && (
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
            <button 
                onClick={() => setIsOpen(true)}
                className="pointer-events-auto bg-brand-dark text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
            >
                <div className="bg-brand-accent p-1.5 rounded-full group-hover:rotate-12 transition">
                    <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-serif font-bold text-sm tracking-wide">Clueless? Let's create your next trip...</span>
            </button>
            </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE CHAT WINDOW (Popup) */}
      <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/20 backdrop-blur-sm">
                
                {/* CLICK OUTSIDE TO CLOSE */}
                <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

                {/* POPUP CARD */}
                <motion.div 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white w-full max-w-md h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative z-10"
                >
                    
                    {/* HEADER */}
                    <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="text-brand-accent" size={20} />
                            <h3 className="font-bold text-brand-dark text-lg">Hampi Guide</h3>
                            <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">• Personalized</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-brand-dark hover:bg-gray-100 p-2 rounded-full transition">
                            <X size={20} />
                        </button>
                    </div>

                    {/* CONTENT AREA (Welcome Screen OR Chat History) */}
                    <div className="flex-1 overflow-y-auto p-6 bg-brand-bg/30">
                        {showWelcome ? (
                            // === WELCOME SCREEN ===
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                <div className="bg-brand-accent/10 p-4 rounded-full mb-2">
                                    <Sparkles size={32} className="text-brand-accent" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Welcome to Hampi Guide!</h2>
                                    <p className="text-gray-600">I'm your AI travel companion for Hampi.</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-brand-accent bg-white p-3 rounded-xl shadow-sm border border-brand-accent/20">
                                    <Sparkles size={16} />
                                    <p className="font-semibold">I can give personalized recommendations!</p>
                                </div>

                                {/* Quick Action Grid */}
                                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                                    <QuickActionButton icon={Calendar} text="2-Day Itinerary" query="Plan a 2-day itinerary for Hampi covering major sites." />
                                    <QuickActionButton icon={Star} text="Top 5 Sites" query="What are the top 5 must-visit sites in Hampi?" />
                                    <QuickActionButton icon={Route} text="Walking Route" query="Suggest a good walking route to explore Hampi ruins." />
                                    <QuickActionButton icon={Compass} text="Hidden Gems" query="Tell me about some lesser-known hidden gems in Hampi." />
                                </div>
                            </div>
                        ) : (
                            // === CHAT HISTORY ===
                            <div className="space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-accent text-white rounded-br-none shadow-md' : 'bg-white border border-gray-200 text-brand-dark rounded-bl-none shadow-sm'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-gray-500">
                                            <Loader2 size={16} className="animate-spin text-brand-accent" />
                                            Thinking...
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* INPUT AREA */}
                    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-3 border border-transparent focus-within:border-brand-accent/50 focus-within:bg-white transition-all">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about Hampi heritage sites..."
                                className="flex-1 bg-transparent focus:outline-none text-sm text-brand-dark placeholder-gray-400"
                            />
                        </div>
                        <button 
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="bg-brand-accent text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#ff8547] transition disabled:opacity-50 disabled:hover:bg-brand-accent shadow-md"
                        >
                            <Send size={20} className="-ml-0.5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
}