import React from 'react';
import { MapPin, Lock, Unlock } from 'lucide-react';

export default function SiteCard({ site }) {
  return (
    <div className="bg-hampi-sand rounded-xl overflow-hidden shadow-lg border border-hampi-stone mb-4 relative">
      {/* Image Section */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={site.image} 
          alt={site.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
          {site.status === 'locked' ? <Lock size={12} className="mr-1" /> : <Unlock size={12} className="mr-1 text-green-400" />}
          {site.status.toUpperCase()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-hampi-stone font-serif">{site.name}</h3>
            <span className="text-xs text-hampi-terracotta font-semibold">{site.type}</span>
          </div>
          <div className="text-xs bg-hampi-parchment px-2 py-1 rounded border border-hampi-stone flex items-center">
            <MapPin size={12} className="mr-1" />
            {site.distance}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {site.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
            <span className="text-xs font-bold text-hampi-gold bg-hampi-stone px-2 py-1 rounded-full">
                +{site.xp} XP
            </span>
            <button className="text-sm bg-hampi-terracotta text-white px-4 py-1 rounded shadow hover:bg-red-600 transition">
                {site.status === 'locked' ? 'View Details' : 'Start Quest'}
            </button>
        </div>
      </div>
    </div>
  );
}