
import React from 'react';
import { VibeType } from '../types';
import { Target, Mountain, Leaf, Zap, Smile } from 'lucide-react';

interface VibeOption {
  type: VibeType;
  label: string;
  english: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const VIBE_OPTIONS: VibeOption[] = [
  { 
    type: 'SOLO', 
    label: '想独处', 
    english: 'BE ALONE', 
    icon: <Smile size={28} className="text-white" />, 
    color: 'bg-indigo-500', 
    bgGradient: 'from-indigo-500 to-blue-400' 
  },
  { 
    type: 'ADVENTURE', 
    label: '想冒险', 
    english: 'ADVENTURE', 
    icon: <Mountain size={28} className="text-white" />, 
    color: 'bg-orange-500', 
    bgGradient: 'from-orange-500 to-rose-400' 
  },
  { 
    type: 'HEAL', 
    label: '求治愈', 
    english: 'HEALING', 
    icon: <Leaf size={28} className="text-white" />, 
    color: 'bg-emerald-500', 
    bgGradient: 'from-emerald-500 to-teal-400' 
  },
  { 
    type: 'INSPIRE', 
    label: '想灵感', 
    english: 'INSPIRING', 
    icon: <Zap size={28} className="text-white" />, 
    color: 'bg-cyan-500', 
    bgGradient: 'from-cyan-500 to-sky-400' 
  }
];

interface Props {
  selected: VibeType | null;
  onSelect: (type: VibeType) => void;
}

const VibeRadar: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-indigo-50 rounded-full">
          <Target size={20} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800">情绪同频雷达</h3>
          <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Vibe Match Frequency</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {VIBE_OPTIONS.map((v) => (
          <button
            key={v.type}
            onClick={() => onSelect(v.type)}
            className={`flex-shrink-0 group relative w-40 h-56 rounded-[50px] overflow-hidden transition-all duration-500 ${selected === v.type ? 'scale-105 shadow-2xl shadow-slate-200' : 'opacity-80 hover:opacity-100 hover:-translate-y-1'}`}
          >
            {/* 背景色层 */}
            <div className={`absolute inset-0 bg-gradient-to-b ${v.bgGradient}`}></div>
            
            {/* 装饰圆环 */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30">
                {v.icon}
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center">
              <span className="block text-white font-black text-xl mb-1">{v.label}</span>
              <span className="block text-white/50 text-[8px] font-bold tracking-widest">{v.english}</span>
            </div>

            {/* 选中时的光晕 */}
            {selected === v.type && (
              <div className="absolute inset-0 border-4 border-white/50 rounded-[50px]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeRadar;
