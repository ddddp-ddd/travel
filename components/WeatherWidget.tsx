
import React from 'react';
import { Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  // 模拟当前所在秘境的天气，实际应用中可接入真实API
  const weatherData = {
    city: '杭州·西湖区',
    temp: 22,
    condition: '微风',
    icon: <Sun size={14} className="text-orange-400" />
  };

  return (
    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-emerald-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-default">
      <div className="flex items-center gap-1.5">
        {weatherData.icon}
        <span className="text-[11px] font-black text-slate-700 tracking-tight">{weatherData.city}</span>
      </div>
      <div className="w-[1px] h-3 bg-emerald-100"></div>
      <div className="flex items-center gap-1">
        <Thermometer size={12} className="text-emerald-500" />
        <span className="text-[11px] font-black text-slate-700">{weatherData.temp}°C</span>
      </div>
      <div className="hidden sm:block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
        {weatherData.condition}
      </div>
    </div>
  );
};

export default WeatherWidget;
