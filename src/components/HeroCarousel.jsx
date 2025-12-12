import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroCarousel({ sites }) {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sites.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sites.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-b-3xl shadow-xl">
      <AnimatePresence mode='wait'>
        <motion.img
          key={index}
          src={sites[index].image}
          alt={sites[index].name}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-hampi-stone/90 to-transparent flex items-end p-6">
        <div>
            <span className="text-hampi-gold text-xs font-bold tracking-widest uppercase mb-1 block">Featured Site</span>
            <h2 className="text-white text-3xl font-serif font-bold">{sites[index].name}</h2>
        </div>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex space-x-1">
        {sites.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-hampi-gold w-4' : 'bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
}