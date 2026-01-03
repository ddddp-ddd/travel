
import React, { useState, useEffect } from 'react';
import { SocialMode, Companion } from '../types';
import { Users, UserMinus, ShieldCheck, MessageCircle, Sparkles, Heart, CheckCircle2, Navigation, Loader2 } from 'lucide-react';
import { MOCK_COMPANIONS } from '../constants';

const MatchingInterface: React.FC = () => {
  const [mode, setMode] = useState<SocialMode>(SocialMode.SOCIAL_PHOBIA);
  const [isMatching, setIsMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [matchedResults, setMatchedResults] = useState<Companion[] | null>(null);
  const [invitedIds, setInvitedIds] = useState<string[]>([]);

  const matchingSteps = [
    "正在同步你的审美频率...",
    "扫描 5KM 内的寻踪者...",
    "校准情感共鸣参数...",
    "正在锁定最优避世伙伴..."
  ];

  const startMatch = () => {
    setIsMatching(true);
    setMatchedResults(null);
    setInvitedIds([]);
    setMatchStep(0);
    
    const interval = setInterval(() => {
      setMatchStep(prev => (prev < matchingSteps.length - 1 ? prev + 1 : prev));
    }, 800);

    setTimeout(() => {
      setIsMatching(false);
      setMatchedResults(MOCK_COMPANIONS);
      clearInterval(interval);
    }, 3200);
  };

  const toggleInvite = (id: string) => {
    if (invitedIds.includes(id)) return;
    setInvitedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 模式切换器 */}
      {!matchedResults && !isMatching && (
        <div className="bg-white rounded-[48px] p-10 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
          <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
            <Users size={32} className="text-emerald-500" /> 选择你的社交面具
          </h2>
          
          <div className="flex bg-emerald-50 p-2 rounded-[36px] mb-10">
            <button 
              onClick={() => setMode(SocialMode.SOCIAL_PHOBIA)}
              className={`flex-1 py-5 rounded-[30px] flex items-center justify-center gap-3 transition-all duration-500 font-black text-lg ${mode === SocialMode.SOCIAL_PHOBIA ? 'bg-white shadow-xl text-emerald-600' : 'text-emerald-300 hover:text-emerald-400'}`}
            >
              <UserMinus size={22} /> 社恐模式
            </button>
            <button 
              onClick={() => setMode(SocialMode.SOCIAL_BUTTERFLY)}
              className={`flex-1 py-5 rounded-[30px] flex items-center justify-center gap-3 transition-all duration-500 font-black text-lg ${mode === SocialMode.SOCIAL_BUTTERFLY ? 'bg-white shadow-xl text-emerald-600' : 'text-emerald-300 hover:text-emerald-400'}`}
            >
              <Users size={22} /> 社牛模式
            </button>
          </div>

          <div className="space-y-6 mb-12">
            <div className={`p-8 rounded-[40px] transition-all duration-500 border-2 ${mode === SocialMode.SOCIAL_PHOBIA ? 'bg-emerald-50/50 border-emerald-100' : 'opacity-20 scale-95 border-transparent'}`}>
              <div className="flex items-center gap-3 mb-3 text-emerald-700 font-black text-lg">
                <Sparkles size={20} />
                <span>无压力同行：AI 充当中间人</span>
              </div>
              <p className="text-base text-slate-500 leading-relaxed font-medium">
                匹配后仅共享实时经纬度，无需开启对话。到达汇合点后，通过 AI 发送“我已就位”指令，享受零社交压力的并肩探索。
              </p>
            </div>
            
            <div className={`p-8 rounded-[40px] transition-all duration-500 border-2 ${mode === SocialMode.SOCIAL_BUTTERFLY ? 'bg-orange-50/50 border-orange-100' : 'hidden'}`}>
              <div className="flex items-center gap-3 mb-3 text-orange-600 font-black text-lg">
                <MessageCircle size={20} />
                <span>高频共振：开启实时语音</span>
              </div>
              <p className="text-base text-slate-500 leading-relaxed font-medium">
                即刻进入临时语音频道。AI 将作为主持人提取两人的审美共同点（如：都喜欢北野武、都是胶片党）进行破冰引导。
              </p>
            </div>
          </div>

          <button 
            onClick={startMatch}
            disabled={isMatching}
            className="w-full py-8 rounded-[36px] font-black text-2xl text-white transition-all transform active:scale-95 bg-emerald-600 shadow-2xl shadow-emerald-200 hover:bg-emerald-700 flex items-center justify-center gap-4"
          >
            开启审美共振匹配
          </button>

          <div className="mt-8 flex justify-center items-center gap-3 text-[11px] font-black text-slate-300 uppercase tracking-widest">
            <ShieldCheck size={16} /> 
            <span>AI 已自动过滤信用分低于 90 的潜在干扰者</span>
          </div>
        </div>
      )}

      {/* 匹配中的加载动画 */}
      {isMatching && (
        <div className="flex flex-col items-center justify-center py-32 space-y-12 animate-in fade-in duration-500">
          <div className="relative">
            <div className="w-60 h-60 rounded-full border-4 border-emerald-100 animate-ping absolute inset-0 opacity-20"></div>
            <div className="w-60 h-60 rounded-full border-[8px] border-emerald-500 flex items-center justify-center bg-white shadow-[0_40px_100px_-20px_rgba(16,185,129,0.4)] relative z-10 overflow-hidden">
               <div className="absolute inset-0 bg-emerald-50 animate-pulse opacity-50"></div>
               <Sparkles size={100} className="text-emerald-500 animate-bounce relative z-20" />
            </div>
          </div>
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">{matchingSteps[matchStep]}</h3>
            <div className="flex gap-2 justify-center">
               {[0,1,2,3].map(i => (
                 <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === matchStep ? 'bg-emerald-500 w-8' : 'bg-emerald-100'}`}></div>
               ))}
            </div>
            <p className="text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">AI 正在扫描方圆 5 公里内拥有相同审美标签的寻踪者</p>
          </div>
        </div>
      )}

      {/* 匹配结果展示 */}
      {matchedResults && !isMatching && (
        <div className="space-y-10 animate-in zoom-in-95 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end px-6 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                 Match Found
              </div>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">频率契合度极高</h3>
              <p className="text-emerald-600 font-bold text-lg">为您找到了 3 位志趣相投的秘境搭子</p>
            </div>
            <button 
              onClick={startMatch}
              className="px-8 py-4 bg-white border border-slate-100 rounded-3xl text-slate-400 text-sm font-black hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm"
            >
              重新扫描频率
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {matchedResults.map((companion) => (
              <div key={companion.id} className="bg-white rounded-[56px] overflow-hidden border border-emerald-50 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.08)] hover:-translate-y-3 transition-all duration-500 group">
                <div className="relative h-64">
                  <img src={companion.avatar} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt={companion.name} />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-6 py-2.5 rounded-[24px] shadow-xl border border-emerald-50">
                    <span className="text-emerald-600 font-black text-base">{companion.matchScore}% 契合</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-10 space-y-8">
                  <div>
                    <h4 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">{companion.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {companion.tags.map(t => (
                        <span key={t} className="text-[11px] font-black bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full border border-emerald-100/50 uppercase">#{t}</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-base text-slate-500 leading-relaxed font-medium italic h-18 overflow-hidden line-clamp-3">
                    “{companion.bio}”
                  </p>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-3xl">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                      <Navigation size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">最近出没于</span>
                      <span className="text-sm font-black text-slate-700">{companion.recentSpot}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleInvite(companion.id)}
                    className={`w-full py-6 rounded-[30px] font-black text-lg flex items-center justify-center gap-3 transition-all ${
                      invitedIds.includes(companion.id) 
                        ? 'bg-emerald-50 text-emerald-600 cursor-default border-2 border-emerald-100' 
                        : 'bg-emerald-600 text-white shadow-2xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 hover:scale-[1.02]'
                    }`}
                  >
                    {invitedIds.includes(companion.id) ? (
                      <>
                        <CheckCircle2 size={24} />
                        邀请已通过 AI 发出
                      </>
                    ) : (
                      <>
                        <Heart size={24} className="group-hover:fill-white" />
                        发起避世邀请
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingInterface;
