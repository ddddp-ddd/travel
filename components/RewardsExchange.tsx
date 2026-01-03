
import React, { useState, useEffect } from 'react';
import { Award, Gift, Zap, Crown, ChevronRight, Loader2, CheckCircle2, X, Copy, Share2, Sparkles, PlusCircle, Star } from 'lucide-react';
import { RewardLevel } from '../types';

interface RewardItem {
  id: string;
  title: string;
  points: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const RewardsExchange: React.FC = () => {
  const [userPoints, setUserPoints] = useState(1280);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<{title: string, msg: string, type: string} | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const rewards: RewardItem[] = [
    { 
      id: '1', 
      title: 'AI 专属摄影构图指南', 
      points: 500, 
      icon: <Zap size={28} />,
      color: 'text-yellow-500',
      description: '基于视觉审美模型生成的 12 套秘境出片模版，包含黄金分割与光影参数。'
    },
    { 
      id: '2', 
      title: '秘境优先发现权 (7天)', 
      points: 1200, 
      icon: <Crown size={28} />,
      color: 'text-purple-500',
      description: '提前 7 天获取尚未公开的「避世点」坐标，避开首波人流高峰。'
    },
    { 
      id: '3', 
      title: '定制版情绪滤镜包', 
      points: 800, 
      icon: <Gift size={28} />,
      color: 'text-pink-500',
      description: '适配 Momo 审美的专属滤镜：低饱和、高胶片感，一键还原旷野色调。'
    },
  ];

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleRedeem = (reward: RewardItem) => {
    if (userPoints < reward.points) {
      triggerToast("积分余额不足，再去多探索几个地方吧！(。•́︿•̀。)");
      return;
    }

    setIsProcessing(reward.id);
    
    // 模拟复杂的审美核销过程
    setTimeout(() => {
      setUserPoints(prev => prev - reward.points);
      setIsProcessing(null);
      
      const successData = {
        '1': { title: '构图指南已解锁', msg: '攻略已通过“秘境助手”发送至你的私聊频道，请注意查收。', type: 'guide' },
        '2': { title: '优先权特权生效', msg: '你在“挖掘”页面的感知半径已扩大，现在可以看到 7 天后的预告秘境。', type: 'vip' },
        '3': { title: '滤镜包同步成功', msg: '专属 35mm 胶片滤镜已添加至你的“记录”工具箱，快去拍一张吧！', type: 'filter' }
      }[reward.id as '1' | '2' | '3'];

      setShowSuccess({ ...successData, type: reward.id });
    }, 2000);
  };

  const handleInvite = () => {
    setIsProcessing('invite');
    setTimeout(() => {
      setIsProcessing(null);
      navigator.clipboard.writeText("快来和我一起在秘境找回自己！链接：https://secret-companion.ai/invite/momo");
      triggerToast("专属邀请链接已复制！快去分享给你的审美同类吧 ✨");
    }, 1200);
  };

  const handleCheckIn = () => {
    if (checkedIn) return;
    setIsProcessing('checkin');
    setTimeout(() => {
      setIsProcessing(null);
      setCheckedIn(true);
      setUserPoints(prev => prev + 50);
      triggerToast("今日审美打卡成功！积分 +50 (。•ᴗ-)✧");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 pb-24 relative">
      {/* 积分状态顶栏 */}
      <div className="bg-gradient-to-br from-[#0D9488] to-[#14B8A6] rounded-[48px] p-10 text-white shadow-[0_40px_80px_-20px_rgba(13,148,136,0.3)] relative overflow-hidden group">
        {/* 背景动效装饰 */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-300/20 blur-[80px] rounded-full group-hover:translate-x-10 transition-transform duration-1000"></div>
        
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-100 opacity-80">Explorer Identity</span>
              <div className="h-[1px] w-12 bg-white/20"></div>
            </div>
            <h2 className="text-4xl font-black tracking-tight">寻踪人 · Tracker</h2>
            <p className="text-teal-50/70 text-sm font-medium">已在秘境中度过 128 个松弛小时</p>
          </div>
          
          <button 
            onClick={handleCheckIn}
            disabled={checkedIn || isProcessing === 'checkin'}
            className={`px-6 py-4 rounded-[24px] backdrop-blur-md border flex items-center gap-2 transition-all active:scale-95 ${
              checkedIn 
                ? 'bg-white/20 border-white/10 text-white/60 cursor-default' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            {isProcessing === 'checkin' ? <Loader2 size={18} className="animate-spin" /> : checkedIn ? <CheckCircle2 size={18} /> : <PlusCircle size={18} />}
            <span className="text-sm font-black">{checkedIn ? '今日已签' : '每日打卡'}</span>
          </button>
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <span className="text-teal-50/60 text-xs font-bold uppercase tracking-widest">Available Points</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tabular-nums tracking-tighter transition-all duration-500">{userPoints.toLocaleString()}</span>
                <span className="text-lg font-black opacity-40 italic">pts</span>
              </div>
            </div>
            <div className="bg-black/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 text-right">
              <span className="block text-[10px] font-black text-teal-200 uppercase tracking-widest mb-1">距离下一等级</span>
              <span className="text-sm font-black text-white">{2000 - userPoints > 0 ? 2000 - userPoints : 0} 积分</span>
            </div>
          </div>
          
          <div className="h-4 bg-black/10 rounded-full overflow-hidden p-1 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-200 to-white rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
              style={{ width: `${Math.min((userPoints / 2000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 兑换专区 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h3 className="font-black text-slate-800 text-2xl flex items-center gap-3">
            <Sparkles size={24} className="text-[#0D9488]" /> 审美特权核销
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aesthetic Redemption</span>
        </div>

        <div className="grid gap-4">
          {rewards.map(item => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
            >
              <div className="flex items-center gap-6 w-full">
                <div className={`w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-50 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="font-black text-slate-800 text-xl tracking-tight">{item.title}</p>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100">{item.points} PTS</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => handleRedeem(item)}
                disabled={isProcessing !== null}
                className={`w-full md:w-auto px-10 py-5 rounded-[28px] text-sm font-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl ${
                  isProcessing === item.id 
                    ? 'bg-slate-100 text-slate-400'
                    : userPoints < item.points
                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed shadow-none border border-slate-100'
                    : 'bg-[#1A1C1E] text-white hover:bg-black shadow-slate-200'
                }`}
              >
                {isProcessing === item.id ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    审美核销中...
                  </>
                ) : userPoints < item.points ? '积分不足' : '立即兑换'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 邀请激励卡片 */}
      <button 
        onClick={handleInvite}
        disabled={isProcessing === 'invite'}
        className="w-full bg-[#FB923C]/5 p-10 rounded-[48px] border-2 border-dashed border-[#FB923C]/20 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-white hover:border-[#FB923C] hover:shadow-2xl hover:shadow-[#FB923C]/10 transition-all duration-700 text-left active:scale-[0.98]"
      >
        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className={`w-24 h-24 bg-[#FB923C] text-white rounded-[36px] flex items-center justify-center shadow-2xl shadow-[#FB923C]/30 transition-all duration-500 group-hover:rotate-12 ${isProcessing === 'invite' ? 'animate-pulse' : ''}`}>
            {isProcessing === 'invite' ? <Loader2 size={40} className="animate-spin" /> : <Share2 size={40} />}
          </div>
          <div>
            <h4 className="font-black text-[#FB923C] text-2xl mb-1 tracking-tight">邀请新搭子</h4>
            <p className="text-base text-slate-500 font-medium">每成功邀请一位新成员，奖励 <span className="text-[#FB923C] font-black underline decoration-2 underline-offset-4">200 PTS</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-full shadow-lg border border-[#FB923C]/10 group-hover:translate-x-4 transition-transform">
          <span className="text-sm font-black text-slate-700">获取专属链接</span>
          <ChevronRight className="text-[#FB923C]" size={20} />
        </div>
      </button>

      {/* 兑换成功全屏反馈 */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowSuccess(null)}></div>
          <div className="bg-white w-full max-w-md rounded-[64px] p-12 text-center shadow-[0_60px_100px_-30px_rgba(0,0,0,0.3)] relative z-10 animate-in zoom-in-90 duration-500 border border-emerald-50">
            <div className="w-32 h-32 bg-emerald-50 text-[#0D9488] rounded-full mx-auto mb-10 flex items-center justify-center shadow-inner relative">
               <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-ping opacity-20"></div>
               <CheckCircle2 size={72} className="animate-in slide-in-from-bottom-4 duration-1000" />
            </div>
            <h4 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">{showSuccess.title}</h4>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 px-4">{showSuccess.msg}</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowSuccess(null)}
                className="w-full py-6 bg-[#0D9488] text-white rounded-[32px] font-black text-lg shadow-2xl shadow-emerald-200 hover:bg-[#14B8A6] transition-all active:scale-95"
              >
                我知道了
              </button>
              <button className="py-4 text-slate-400 font-bold text-sm hover:text-emerald-600 transition-colors flex items-center justify-center gap-2">
                 <Copy size={14} /> 复制核销凭证码
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 悬浮 Toast 提示 */}
      {showToast && (
        <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="bg-[#1A1C1E]/95 backdrop-blur-xl text-white px-10 py-5 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Star size={14} className="fill-white" />
            </div>
            <span className="text-base font-black tracking-tight">{showToast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsExchange;
