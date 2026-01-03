
import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Users, 
  Map, 
  LayoutGrid, 
  UserCircle, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
  Camera,
  Wind,
  Filter
} from 'lucide-react';
import { MOCK_SPOTS } from './constants';
import Logo from './components/Logo';
import SpotCard from './components/SpotCard';
import MatchingInterface from './components/MatchingInterface';
import ItineraryPlanner from './components/ItineraryPlanner';
import MemoryAlbum from './components/MemoryAlbum';
import RewardsExchange from './components/RewardsExchange';
import AIChatAssistant from './components/AIChatAssistant';
import WeatherWidget from './components/WeatherWidget';
import VibeRadar from './components/VibeRadar';
import { Spot, RewardLevel, VibeType } from './types';

const Home: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <section className="relative h-[340px] rounded-[40px] overflow-hidden bg-emerald-50 text-emerald-900 flex flex-col justify-center items-center p-6 text-center shadow-xl shadow-emerald-100/30">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
          alt="Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-emerald-50/20 to-emerald-50/80"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-emerald-100 px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase text-emerald-600 shadow-sm">
            <Sparkles size={10} /> AI 情绪避世管家
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-slate-800">
            拒绝打卡 <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">在旷野找回自己</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 font-light max-w-lg mx-auto leading-relaxed">
            告别被社交媒体滤镜绑架的“网红地”。<br/>
            我们寻找真实的审美坐标，提供零压力的契合方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-1">
            <Link to="/explore" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-black text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2 active:scale-95">
              挖掘今日秘境 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "审美正义", desc: "拒绝路牌打卡，只去真正美到灵魂颤栗的地方。", icon: <Compass size={20} className="text-emerald-500" /> },
          { title: "松弛主义", desc: "不设死板闹钟。根据当地风力和你的心情动态调优。", icon: <Wind size={20} className="text-orange-400" /> },
          { title: "灵魂搭子", desc: "匹配机制基于审美偏好而非年龄，遇见另一种可能。", icon: <Users size={20} className="text-teal-500" /> }
        ].map((v, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm p-5 rounded-[30px] border border-emerald-50 shadow-lg shadow-emerald-50/30 flex items-start gap-4 hover:-translate-y-1 transition-all">
            <div className="p-2.5 bg-emerald-50 rounded-xl">{v.icon}</div>
            <div>
              <h3 className="text-base font-black text-slate-800 mb-0.5">{v.title}</h3>
              <p className="text-slate-500 text-[11px] leading-snug font-medium">{v.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: '秘境挖掘', path: '/explore', icon: <Compass size={20} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', desc: '发现真实之美' },
          { label: '搭子匹配', path: '/match', icon: <Users size={20} />, color: 'bg-teal-50 text-teal-600 border-teal-100', desc: '遇见灵魂同类' },
          { label: '轻量行程', path: '/itinerary', icon: <Wind size={20} />, color: 'bg-orange-50 text-orange-600 border-orange-100', desc: '拒绝计划焦虑' },
          { label: '情绪纪念', path: '/album', icon: <Camera size={20} />, color: 'bg-cyan-50 text-cyan-600 border-cyan-100', desc: '捕捉共鸣瞬间' },
          { label: '权益兑换', path: '/rewards', icon: <Award size={20} />, color: 'bg-blue-50 text-blue-600 border-blue-100', desc: '探索也有价值' },
        ].map((mod) => (
          <Link key={mod.path} to={mod.path} className="group">
            <div className={`p-5 rounded-[30px] ${mod.color} border flex flex-col items-center gap-2 transition-all group-hover:bg-white group-hover:shadow-xl shadow-sm relative overflow-hidden`}>
              <div className="p-2.5 bg-white rounded-xl shadow-sm">{mod.icon}</div>
              <div className="text-center">
                <span className="text-sm font-black block">{mod.label}</span>
                <span className="text-[8px] opacity-80 uppercase tracking-widest font-bold">{mod.desc}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-white/50 backdrop-blur-md rounded-[40px] p-8 border border-emerald-50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">反向避世：本周推荐</h2>
            <p className="text-emerald-600/60 font-medium text-sm">基于真实客流感知的低拥挤、高审美地标</p>
          </div>
          <Link to="/explore" className="text-emerald-700 font-black flex items-center gap-2 bg-emerald-50 px-5 py-2.5 rounded-full hover:bg-emerald-100 transition-all active:scale-95 shadow-sm text-xs">
            查看更多秘境 <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_SPOTS.slice(0, 3).map(spot => (
            <SpotCard key={spot.id} spot={spot} onSelect={() => {}} />
          ))}
        </div>
      </section>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  const [selectedVibe, setSelectedVibe] = useState<VibeType | null>(null);

  const filteredSpots = useMemo(() => {
    if (!selectedVibe) return MOCK_SPOTS;
    return MOCK_SPOTS.filter(spot => spot.vibe === selectedVibe);
  }, [selectedVibe]);

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">秘境挖掘</h2>
            <p className="text-slate-400 text-lg font-medium mt-1">跳过网红打卡点，去那些真实美到灵魂里的地方</p>
          </div>
          {selectedVibe && (
            <button 
              onClick={() => setSelectedVibe(null)}
              className="text-emerald-600 text-sm font-black flex items-center gap-1 hover:underline"
            >
              重置筛选 <Filter size={14} />
            </button>
          )}
        </div>
        
        {/* 情绪同频雷达 */}
        <VibeRadar selected={selectedVibe} onSelect={setSelectedVibe} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredSpots.length > 0 ? (
          filteredSpots.map(spot => (
            <SpotCard key={spot.id} spot={spot} onSelect={() => {}} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="text-6xl">🏜️</div>
            <p className="text-slate-400 font-bold">暂时没有找到契合此频率的秘境，要不换个心情试试？</p>
          </div>
        )}
      </div>
    </div>
  );
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: <LayoutGrid size={20} />, label: '首页' },
    { path: '/explore', icon: <Compass size={20} />, label: '挖掘' },
    { path: '/match', icon: <Users size={20} />, label: '匹配' },
    { path: '/itinerary', icon: <Wind size={20} />, label: '行程' },
    { path: '/album', icon: <Camera size={20} />, label: '纪念' },
    { path: '/rewards', icon: <Award size={20} />, label: '权益' },
  ];

  return (
    <>
      <nav className="hidden lg:flex flex-col w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-emerald-50 fixed left-0 top-0 p-6 z-50">
        <Logo className="mb-8 scale-[0.8] origin-left" />
        <div className="flex-1 space-y-2">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3 rounded-[20px] transition-all group ${location.pathname === item.path ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-100' : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'}`}
            >
              <span className={`transition-transform group-hover:scale-110 ${location.pathname === item.path ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 p-5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-[30px] border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-emerald-600" />
            <p className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.2em]">AI Agent Online</p>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed font-bold italic opacity-80">
            “探测到你当前更倾向于「避世感」，已自动为你校准推荐。”
          </p>
        </div>
      </nav>

      <nav className="lg:hidden fixed bottom-5 left-5 right-5 bg-white/90 backdrop-blur-2xl border border-emerald-100 flex justify-around p-3 z-50 rounded-[25px] shadow-2xl">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all ${location.pathname === item.path ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFDFF] lg:pl-64 relative">
        <Navbar />
        
        <div className="hidden lg:flex absolute top-0 right-0 left-64 p-6 justify-end z-40 pointer-events-none">
          <div className="pointer-events-auto">
             <WeatherWidget />
          </div>
        </div>

        <header className="lg:hidden flex justify-between items-center px-5 py-3 bg-white sticky top-0 z-40 border-b border-emerald-50">
          <Logo className="scale-[0.5] origin-left" />
          <div className="flex items-center gap-2">
            <WeatherWidget />
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
              <UserCircle size={20} className="text-emerald-600" />
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8 xl:p-10 max-w-[1600px] mx-auto pb-32 lg:pb-16 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/match" element={
              <div className="max-w-3xl mx-auto space-y-8">
                <header className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-800">寻找搭子</h2>
                  <p className="text-slate-400 text-base font-medium">在旷野里，遇见灵魂频率一致的同类</p>
                </header>
                <MatchingInterface />
              </div>
            } />
            <Route path="/itinerary" element={
              <div className="max-w-3xl mx-auto space-y-8">
                <header className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-800">轻量行程</h2>
                  <p className="text-slate-400 text-base font-medium">随风而动。AI 助手将根据天气和情绪动态建议</p>
                </header>
                <ItineraryPlanner />
              </div>
            } />
            <Route path="/album" element={
              <div className="max-w-5xl mx-auto space-y-8">
                <header className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-800">情绪纪念册</h2>
                  <p className="text-slate-400 text-base font-medium">捕捉共鸣瞬间。AI 会为你写下那些无法言说的文案</p>
                </header>
                <MemoryAlbum />
              </div>
            } />
            <Route path="/rewards" element={
              <div className="max-w-3xl mx-auto space-y-8">
                <header className="text-center space-y-2">
                  <h2 className="text-3xl font-black text-slate-800">权益兑换</h2>
                  <p className="text-slate-400 text-base font-medium">你的每一次探索，都在赋予世界新的价值</p>
                </header>
                <RewardsExchange />
              </div>
            } />
          </Routes>
        </main>

        <AIChatAssistant />
      </div>
    </Router>
  );
};

export default App;
