import React from 'react';
import sites from '../data/sites.json';
import HeroCarousel from '../components/HeroCarousel';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ExplorerMode() {
  return (
    <div className="pb-20">
      
      {/* 1. HERO SECTION (Behind the Glass Nav) */}
      <div className="relative">
        <HeroCarousel sites={sites} />
        
        {/* "Welcome Aayush" Overlay (As per sketch) */}
        <div className="absolute top-24 left-6 z-10">
          <p className="text-white/90 text-sm font-bold uppercase tracking-wider shadow-black drop-shadow-md">Good Evening,</p>
          <h1 className="text-white text-4xl font-serif font-black drop-shadow-lg">Aayush</h1>
        </div>
      </div>

      {/* 2. PLACES NEARBY (Horizontal Slider) */}
      <div className="mt-8 pl-6">
        <div className="flex justify-between items-end pr-6 mb-4">
          <h3 className="text-brand-dark text-xl font-bold font-serif">Places near by</h3>
          <span className="text-brand-accent text-xs font-bold uppercase cursor-pointer">View All</span>
        </div>
        
        {/* Horizontal Slider Container */}
        <div className="flex overflow-x-auto gap-5 pb-8 pr-6 snap-x hide-scrollbar">
          {sites.map((site) => (
            <div 
              key={site.id} 
              className="min-w-[220px] bg-brand-card rounded-2xl p-3 shadow-lg flex-shrink-0 snap-center border border-brand-dark/5"
            >
              {/* Card Image */}
              <div className="h-32 w-full rounded-xl overflow-hidden mb-3 relative">
                <img src={site.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-2 right-2 bg-brand-dark/70 text-brand-bg text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                  {site.distance}
                </div>
              </div>

              {/* Card Details */}
              <h4 className="font-bold text-brand-dark text-lg leading-tight font-serif">{site.name}</h4>
              <p className="text-xs text-brand-dark/60 mt-1 line-clamp-1">{site.description}</p>
              
              {/* Action Button */}
              <div className="mt-3 flex justify-between items-center">
                 <button className="bg-brand-accent text-white w-full py-2 rounded-lg text-sm font-bold shadow-md active:scale-95 transition flex justify-center items-center gap-2">
                    Start Quest <ArrowRight size={14} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Floating Chatbot (Keep this as per previous request) */}
       <div className="fixed bottom-6 right-6 z-40">
        <button className="w-14 h-14 bg-brand-dark text-brand-bg rounded-full shadow-2xl flex items-center justify-center border-2 border-brand-accent hover:scale-110 transition">
             <span className="text-2xl">🤖</span>
        </button>
      </div>

    </div>
  );
}