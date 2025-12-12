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
    // CHANGE 1: Changed h-64 to h-[60vh] to make it BIG like your sketch
    <div className="relative w-full h-[60vh] overflow-hidden rounded-b-[3rem] shadow-2xl">
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
      
      {/* CHANGE 2: Darker gradient from Top so white text pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60 flex items-end p-8">
        <div className="mb-8">
            <span className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2 block bg-white/10 w-fit px-2 py-1 rounded backdrop-blur-md">
              Featured Site
            </span>
            <h2 className="text-white text-4xl font-serif font-bold leading-tight">{sites[index].name}</h2>
            <p className="text-white/80 text-sm mt-2 max-w-xs line-clamp-2">{sites[index].description}</p>
        </div>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {sites.map((_, i) => (
          <div 
            key={i} 
            className={`transition-all duration-300 rounded-full shadow-lg ${i === index ? 'bg-brand-accent w-8 h-2' : 'bg-white/50 w-2 h-2'}`} 
          />
        ))}
      </div>
    </div>
  );
}