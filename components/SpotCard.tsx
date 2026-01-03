
import React from 'react';
import { Spot } from '../types';
import { MapPin, Users, Heart, Camera } from 'lucide-react';

interface Props {
  spot: Spot;
  onSelect: (spot: Spot) => void;
}

const SpotCard: React.FC<Props> = ({ spot, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(spot)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-500 ease-out cursor-pointer group border border-slate-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-cyan-deep flex items-center gap-1 z-10">
          <Camera size={12} /> 出片率 {spot.aestheticScore}
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex gap-1">
            {spot.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-lg">{spot.name}</h3>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin size={10} /> {spot.city}
          </span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {spot.description}
        </p>
        <div className="flex justify-between items-center border-top pt-3 border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase">拥挤度</span>
              <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${spot.crowdLevel > 50 ? 'bg-orange-400' : 'bg-teal-400'}`} 
                  style={{ width: `${spot.crowdLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
          <button className="bg-cyan-soft text-cyan-deep p-2 rounded-xl group-hover:bg-cyan-600 group-hover:text-white transition-all active:scale-90">
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
