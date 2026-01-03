
import React, { useState } from 'react';
import { Layout as LayoutIcon, Sparkles, Palette, Type as FontIcon, Check } from 'lucide-react';

type TabType = 'layout' | 'texture' | 'tone';

const AlbumStyleTuner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('layout');
  const [selectedLayout, setSelectedLayout] = useState('经典胶片');
  const [selectedTexture, setSelectedTexture] = useState('原图');
  const [selectedFont, setSelectedFont] = useState('衬线体');
  const [selectedBg, setSelectedBg] = useState('#0A0B10');

  const tabs = [
    { id: 'layout', label: '布局', icon: <LayoutIcon size={20} /> },
    { id: 'texture', label: '质感', icon: <Sparkles size={20} /> },
    { id: 'tone', label: '色调', icon: <Palette size={20} /> },
  ];

  const layouts = ['经典胶片', '文艺明信片', '时尚杂志', '极简白边'];
  const textures = ['原图', '怀旧', '寂静', '鲜活'];
  const fonts = ['衬线体', '黑体', '等宽体'];
  const moodColors = ['#0A0B10', '#F5F1E9', '#E8F1EF', '#1E1B4B'];

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* 顶部导航 Tabs */}
      <div className="flex bg-white/80 backdrop-blur-xl p-2 rounded-[32px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-50 w-fit mx-auto lg:mx-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-8 py-3 rounded-[24px] transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105'
                : 'text-[#9EA3AE] hover:text-slate-600'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-white' : 'text-[#9EA3AE]'}>
              {tab.icon}
            </span>
            <span className="font-black text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 内容面板 */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-50 min-h-[220px] flex flex-col justify-center">
        {activeTab === 'layout' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-300">
            {layouts.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLayout(l)}
                className={`py-6 rounded-[24px] font-black text-sm transition-all ${
                  selectedLayout === l
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-50'
                    : 'bg-[#F8FAFC] text-[#5D6679] hover:bg-slate-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'texture' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-300">
            {textures.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTexture(t)}
                className={`py-6 rounded-[24px] font-black text-sm transition-all ${
                  selectedTexture === t
                    ? t === '原图' ? 'bg-[#FF4757] text-white shadow-xl shadow-rose-100' : 'bg-emerald-600 text-white shadow-xl shadow-emerald-50'
                    : 'bg-[#F8FAFC] text-[#5D6679] hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'tone' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-[#9EA3AE] tracking-[0.2em] uppercase flex items-center gap-2">
                TYPOGRAPHY / 字体
              </h4>
              <div className="flex flex-wrap gap-4">
                {fonts.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFont(f)}
                    className={`px-10 py-5 rounded-[20px] font-black text-sm transition-all ${
                      selectedFont === f
                        ? 'bg-[#1A1C1E] text-white shadow-xl'
                        : 'bg-[#F8FAFC] text-[#5D6679] hover:bg-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-[#9EA3AE] tracking-[0.2em] uppercase flex items-center gap-2">
                MOOD BASE / 背景底色
              </h4>
              <div className="flex items-center gap-5">
                {moodColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedBg(c)}
                    className={`w-14 h-14 rounded-[20px] transition-all relative group shadow-sm`}
                    style={{ backgroundColor: c }}
                  >
                    {selectedBg === c && (
                      <div className="absolute inset-0 rounded-[20px] border-4 border-white/30 ring-4 ring-emerald-100 ring-offset-2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumStyleTuner;
