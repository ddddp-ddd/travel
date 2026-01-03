
import React, { useState } from 'react';
import { Clock, MapPin, Wind, CloudRain, Loader2, Sparkles, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  status: 'done' | 'current' | 'pending';
  tag?: string;
}

const ItineraryPlanner: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);

  const initialItems: ItineraryItem[] = [
    { id: '1', time: '上午', activity: '隐秘湖湾漫步', location: '杭州·浴鹄湾', status: 'done', tag: '自然美学' },
    { id: '2', time: '下午', activity: '园林写生体验', location: '杭州·郭庄', status: 'current', tag: '宋韵古风' },
    { id: '3', time: '黄昏', activity: '落日摄影', location: '杭州·茅家埠', status: 'pending', tag: '避世感' },
  ];

  const optimizedItems: ItineraryItem[] = [
    { id: '1', time: '上午', activity: '室内艺术策展', location: '杭州·中国茶叶博物馆', status: 'done', tag: '沉浸式体验' },
    { id: '2', time: '下午', activity: '独立书屋避雨', location: '杭州·晓风书屋', status: 'current', tag: '人文质感' },
    { id: '3', time: '黄昏', activity: '洞穴主题咖啡', location: '杭州·隐岩咖啡', status: 'pending', tag: '室内秘境' },
  ];

  const [items, setItems] = useState<ItineraryItem[]>(initialItems);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // 模拟 AI 复杂的路线重算逻辑
    setTimeout(() => {
      setItems(optimizedItems);
      setIsOptimizing(false);
      setHasOptimized(true);
    }, 2500);
  };

  const handleReset = () => {
    setItems(initialItems);
    setHasOptimized(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="bg-white rounded-[56px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter flex items-center gap-3">
              <Wind size={32} className="text-emerald-500" /> 轻量行程规划
            </h2>
            <p className="text-slate-400 font-medium text-sm">AI 已根据实时天气和人流完成动态校准</p>
          </div>
          
          <div className="flex items-center gap-3 bg-orange-50 px-5 py-2.5 rounded-full border border-orange-100">
            <CloudRain size={16} className="text-orange-500 animate-bounce" />
            <span className="text-[11px] font-black text-orange-700 uppercase tracking-widest">当前环境：局部微雨</span>
          </div>
        </div>

        {/* 行程列表 */}
        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-50 after:absolute after:left-[19px] after:top-4 after:bottom-4 after:w-[2px] after:bg-emerald-100 after:origin-top after:scale-y-0 after:transition-transform after:duration-[2s] group-hover:after:scale-y-100">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className={`relative pl-14 group/item animate-in fade-in slide-in-from-left-4 duration-500`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* 状态指示点 */}
              <div className={`absolute left-0 top-2.5 w-10 h-10 rounded-2xl border-4 border-white z-20 flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 shadow-lg ${
                item.status === 'done' ? 'bg-emerald-500' : 
                item.status === 'current' ? 'bg-orange-400 ring-4 ring-orange-100' : 
                'bg-slate-200'
              }`}>
                {item.status === 'done' ? <CheckCircle2 size={16} className="text-white" /> : 
                 item.status === 'current' ? <Loader2 size={16} className="text-white animate-spin" /> : 
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>}
              </div>

              {/* 卡片内容 */}
              <div className={`p-8 rounded-[40px] border transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                item.status === 'current' ? 'bg-orange-50/40 border-orange-100 shadow-2xl shadow-orange-900/5' : 
                'bg-white border-slate-50 hover:border-emerald-100'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] ${
                      item.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 
                      item.status === 'current' ? 'bg-orange-500 text-white' : 
                      'bg-slate-100 text-slate-400'
                    }`}>{item.time}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{item.activity}</h3>
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                    <MapPin size={16} className="text-emerald-400" /> {item.location}
                  </div>
                </div>
                
                {item.status === 'current' && (
                  <div className="flex items-center gap-3">
                    <button className="bg-white text-orange-600 px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-orange-900/5 hover:scale-105 transition-all">
                      查看现场直击
                    </button>
                    <ChevronRight size={20} className="text-orange-200" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AI 实时建议通知框 */}
        <div className={`mt-12 p-10 rounded-[48px] border-2 transition-all duration-700 ${
          hasOptimized ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'
        }`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center text-white shadow-2xl relative ${
              hasOptimized ? 'bg-emerald-600 shadow-emerald-200' : 'bg-orange-500 shadow-orange-200 animate-bounce-slow'
            }`}>
              {isOptimizing ? <Loader2 size={36} className="animate-spin" /> : hasOptimized ? <CheckCircle2 size={36} /> : <CloudRain size={36} />}
              {hasOptimized && <div className="absolute -top-2 -right-2 bg-emerald-200 text-emerald-800 p-2 rounded-full animate-ping"><Sparkles size={12} /></div>}
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <p className={`text-sm font-black uppercase tracking-widest mb-1 ${hasOptimized ? 'text-emerald-700' : 'text-orange-700'}`}>
                  {isOptimizing ? 'AI 行程管家正在计算最优解...' : hasOptimized ? '路线已完成雨天模式优化' : '检测到天气变动：局部细雨'}
                </p>
                <h4 className={`text-2xl font-black tracking-tight ${hasOptimized ? 'text-emerald-900' : 'text-orange-900'}`}>
                  {hasOptimized ? '已为你切换至“室内人文寻踪”模式' : '是否将原定户外写生优化为“室内避雨计划”？'}
                </h4>
              </div>
              
              <p className="text-slate-500 font-medium leading-relaxed max-w-xl text-sm">
                {hasOptimized 
                  ? '系统已自动筛选出附近三处评分 9.5 以上的室内审美秘境。虽然窗外有雨，但在书屋听雨翻书，或者去隐岩喝一杯手冲，松弛感反而更胜一筹。' 
                  : '虽然在雨中漫步也挺浪漫，但为了保护你的相机设备和审美心情，建议点击下方优化。AI 将为你锁定周边的“静谧室内坐标”。'}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                {!hasOptimized ? (
                  <>
                    <button 
                      onClick={handleOptimize}
                      disabled={isOptimizing}
                      className="bg-orange-500 text-white px-10 py-5 rounded-[28px] font-black text-sm shadow-2xl shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-3"
                    >
                      {isOptimizing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                      立即优化规划
                    </button>
                    <button className="bg-white text-orange-400 border border-orange-200 px-10 py-5 rounded-[28px] font-black text-sm hover:bg-orange-50 transition-all">
                      保持原样
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleReset}
                    className="bg-emerald-600 text-white px-10 py-5 rounded-[28px] font-black text-sm shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3"
                  >
                    <RefreshCw size={18} />
                    重置为原始路线
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
