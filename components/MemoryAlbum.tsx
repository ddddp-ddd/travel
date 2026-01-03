
import React, { useState } from 'react';
import { Camera, Heart, Share2, Sparkles, Download, Layout, Palette, Loader2, CheckCircle2, Scissors, Image as ImageIcon, Sticker, Zap, Smile, Flower2, Coffee, Star, Quote } from 'lucide-react';
import { recommendAlbumTemplate } from '../services/geminiService';
import AlbumStyleTuner from './AlbumStyleTuner';

interface Memory {
  id: string;
  url: string;
  caption: string;
  tags: string[];
  likes: number;
  template: 'film' | 'journal' | 'minimal';
  stickers?: string[];
  colorVibe?: string;
}

const MemoryAlbum: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
      caption: '在旷野里听风的声音，那是世界给我的私语。',
      tags: ['山野', '清晨', '呼吸'],
      likes: 156,
      template: 'minimal',
      colorVibe: 'Cool'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
      caption: '薄雾漫过山脊，我也漫过了焦虑。',
      tags: ['云海', '高山', '治愈'],
      likes: 210,
      template: 'film',
      colorVibe: 'Neutral'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
      caption: '每一片叶子都在阳光下闪闪发光，像极了此刻的心情。',
      tags: ['森林', '光影', '记录'],
      likes: 188,
      template: 'journal',
      colorVibe: 'Vibrant'
    }
  ]);

  const steps = [
    "解析照片光谱，锁定清新色调...",
    "AI 审美引擎捕捉自然元素...",
    "匹配 Z 世代高共鸣情感文案...",
    "渲染极简白边排版模版...",
    "合成 4K 高清可导出长图资产..."
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenStep(0);
    
    const interval = setInterval(() => {
      setGenStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const result = await recommendAlbumTemplate("在山间小屋看第一缕阳光。");
      
      setTimeout(() => {
        const newMemory: Memory = {
          id: Date.now().toString(),
          url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1200',
          caption: result.caption,
          tags: ['清新', '自然', '旷野'],
          likes: 0,
          template: result.template,
          stickers: result.stickers,
          colorVibe: 'Fresh'
        };
        setMemories(prev => [newMemory, ...prev]);
        setIsGenerating(false);
        clearInterval(interval);
      }, 6000);
    } catch (error) {
      setIsGenerating(false);
      clearInterval(interval);
    }
  };

  const renderTemplate = (mem: Memory) => {
    switch (mem.template) {
      case 'film':
        return (
          <div className="relative group overflow-hidden rounded-[32px] bg-white p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-500 hover:shadow-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
              <img src={mem.url} alt="Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                <div className="text-white/80 font-mono text-[10px] uppercase tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Fujicolor 400H</div>
                <div className="text-white font-mono text-sm tracking-tighter drop-shadow-md">OCT 2024</div>
              </div>
            </div>
            <div className="mt-6 space-y-4 px-1">
              <Quote size={16} className="text-emerald-500 opacity-30" />
              <p className="text-slate-700 text-lg font-medium leading-relaxed tracking-tight italic">
                {mem.caption}
              </p>
              <div className="flex gap-2 flex-wrap">
                {mem.tags.map(t => <span key={t} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 uppercase">#{t}</span>)}
              </div>
            </div>
          </div>
        );
      case 'journal':
        return (
          <div className="relative group overflow-hidden rounded-[40px] bg-[#FBFCFF] p-6 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.04)] border-2 border-emerald-50/50 border-dashed font-serif transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-2 right-10 w-16 h-16 opacity-10">
               <Sticker size={64} className="text-emerald-400 rotate-12" />
            </div>
            <div className="bg-white p-2 shadow-sm rounded-[28px] relative overflow-hidden group-hover:shadow-lg transition-all duration-500">
              <img src={mem.url} alt="Memory" className="w-full aspect-square object-cover rounded-[20px]" />
              <div className="absolute top-3 left-3 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-emerald-100"></div>
                <span className="text-[10px] font-black text-emerald-300 tracking-[0.3em] uppercase">Today's Mood</span>
              </div>
              <p className="text-slate-800 text-base font-serif italic leading-loose p-4 bg-emerald-50/30 rounded-[24px] border border-emerald-50">
                {mem.caption}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[8px] font-black text-emerald-400">🏷️</div>)}
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{mem.tags[0]}</div>
              </div>
            </div>
          </div>
        );
      default: // minimal
        return (
          <div className="relative group overflow-hidden rounded-[48px] bg-white p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.06)] border border-slate-50 hover:shadow-2xl transition-all duration-700 text-center">
            <div className="aspect-[3/4] mb-8 overflow-hidden rounded-[32px] bg-slate-50 border border-slate-100">
               <img src={mem.url} alt="Memory" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
            </div>
            <div className="space-y-6">
              <p className="text-slate-800 text-xl font-light tracking-widest leading-relaxed px-4">
                {mem.caption}
              </p>
              <div className="flex justify-center items-center gap-4 text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] pb-2">
                 {mem.tags.map((t, idx) => (
                   <React.Fragment key={t}>
                     <span>{t}</span>
                     {idx < mem.tags.length - 1 && <div className="w-1 h-1 rounded-full bg-slate-200"></div>}
                   </React.Fragment>
                 ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-16 pb-32 max-w-[1400px] mx-auto animate-in fade-in duration-1000 px-4">
      {/* 顶部中心 - 清新翡翠色调 */}
      <div className="bg-white/40 backdrop-blur-3xl rounded-[56px] p-12 shadow-[0_30px_70px_-20px_rgba(16,185,129,0.15)] border border-white/60 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white text-emerald-600 rounded-[40px] flex items-center justify-center shadow-2xl shadow-emerald-100 border border-emerald-50 animate-bounce-slow">
            <ImageIcon size={44} />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
              <Sparkles size={12} /> AI Aesthetic Capture
            </div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">情绪审美实验室</h3>
            <p className="text-base text-slate-400 font-medium">把那些无法言说的瞬间，渲染成永恒的清新画卷</p>
          </div>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-4 bg-emerald-600 text-white px-12 py-5 rounded-[32px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(5,150,105,0.3)] hover:scale-105 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 group"
        >
          {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Camera size={24} className="group-hover:rotate-12 transition-transform" />}
          {isGenerating ? "正在重构时空..." : "记录此刻的旷野"}
        </button>
      </div>

      {/* 样式微调控制模块 */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <AlbumStyleTuner />
      </div>

      {isGenerating && (
        <div className="fixed inset-0 z-[120] bg-white/60 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-xl rounded-[64px] p-16 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.1)] text-center space-y-12 border border-emerald-50">
            <div className="relative mx-auto w-44 h-44">
              <div className="absolute inset-0 border-[4px] border-emerald-50 rounded-full"></div>
              <div className="absolute inset-0 border-[4px] border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
                <Palette size={64} className="animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-4xl font-black text-slate-800 tracking-tight">AI 视觉重组中</h4>
              <p className="text-slate-400 text-base font-medium">正在校准色值、对比度与排版共鸣度</p>
            </div>

            <div className="space-y-4 px-12">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-center gap-5 text-sm transition-all duration-500 ${i === genStep ? 'text-emerald-600 font-black translate-x-3' : i < genStep ? 'text-emerald-300 opacity-60' : 'text-slate-200'}`}>
                  {i < genStep ? <CheckCircle2 size={20} /> : i === genStep ? <Loader2 size={20} className="animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-100"></div>}
                  <span className="tracking-tight">{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: `${((genStep + 1) / steps.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 纪念册网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {memories.map((mem) => (
          <div key={mem.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000 group">
             {renderTemplate(mem)}
             <div className="mt-8 flex justify-center gap-5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-3 group-hover:translate-y-0">
                <button 
                  className="flex items-center gap-3 bg-white text-slate-600 px-8 py-3.5 rounded-[24px] text-xs font-black shadow-lg border border-slate-50 hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                >
                  <Download size={18} /> 高清保存
                </button>
                <button 
                  className="flex items-center gap-3 bg-white text-slate-600 px-8 py-3.5 rounded-[24px] text-xs font-black shadow-lg border border-slate-50 hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                >
                  <Share2 size={18} /> 分享广场
                </button>
             </div>
          </div>
        ))}

        {/* 添加按钮 */}
        <button 
          onClick={handleGenerate}
          className="group relative flex flex-col items-center justify-center rounded-[48px] border-[4px] border-dashed border-emerald-50 bg-white/40 h-full min-h-[600px] hover:bg-white hover:border-emerald-100 transition-all duration-700 shadow-sm hover:shadow-2xl"
        >
          <div className="w-24 h-24 bg-emerald-50/50 text-emerald-300 rounded-[36px] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-12 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all shadow-sm">
             <ImageIcon size={48} />
          </div>
          <span className="text-3xl font-black text-slate-400 group-hover:text-emerald-600 tracking-tighter transition-colors">开启新的视觉冒险</span>
          <p className="text-sm text-slate-300 font-bold mt-4 px-16 text-center leading-relaxed max-w-xs">
            上传你的感官瞬间，AI 自动匹配最契合当前「调性」的模版。
          </p>
          
          <div className="absolute bottom-16 flex gap-3 opacity-20 group-hover:opacity-100 transition-all">
             {['Nature', 'Fresh', 'Aesthetic'].map(t => (
               <span key={t} className="px-4 py-2 bg-white rounded-xl shadow-sm text-[8px] font-black text-emerald-600 border border-emerald-50 tracking-[0.2em] uppercase">{t}</span>
             ))}
          </div>
        </button>
      </div>

      {/* 底部 AI 报告 */}
      <div className="bg-white/80 backdrop-blur-3xl rounded-[64px] p-16 border border-white shadow-[0_40px_80px_-20px_rgba(16,185,129,0.08)] overflow-hidden relative group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 blur-[100px] rounded-full transition-transform duration-1000 group-hover:scale-125"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-50/50 blur-[100px] rounded-full transition-transform duration-1000 group-hover:scale-125"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="shrink-0 relative">
            <div className="w-40 h-40 bg-white rounded-[48px] border border-emerald-50 flex items-center justify-center rotate-3 shadow-xl transition-transform group-hover:rotate-0">
               <Palette size={72} className="text-emerald-600 opacity-80" />
            </div>
            <div className="absolute -top-4 -right-4 bg-teal-400 text-white p-4 rounded-3xl shadow-xl animate-pulse">
               <Star size={24} className="fill-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-50/80 text-emerald-700 px-6 py-2 rounded-full text-[11px] font-black tracking-[0.3em] uppercase border border-emerald-100">
              AI Aesthetic Insight
            </div>
            <h4 className="text-4xl font-black tracking-tight leading-tight text-slate-800">当前系列视觉倾向：<span className="text-emerald-600">自然主义清冷感</span></h4>
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-3xl italic">
              “你的照片中大量出现了低饱和度的翠绿色系。为了保持这种极致的松弛美感，系统已为你锁定 <span className="text-emerald-600 font-bold underline decoration-emerald-200 underline-offset-8">#极简白边</span> 模版。建议文案配合「衬线体」并保持 30% 以上的画面留白。”
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
               {['呼吸感', '旷野诗意', '自然主义', '低对比度'].map(tag => (
                 <span key={tag} className="text-[10px] font-black bg-emerald-50/50 text-emerald-600 px-6 py-2.5 rounded-full border border-emerald-100/50 hover:bg-white hover:shadow-md transition-all cursor-default tracking-widest uppercase">#{tag}</span>
               ))}
            </div>
          </div>
          
          <button className="bg-emerald-600 text-white px-16 py-6 rounded-[32px] font-black text-lg shadow-2xl shadow-emerald-100 hover:scale-105 transition-all active:scale-95 shrink-0">
            应用此审美策略
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryAlbum;
