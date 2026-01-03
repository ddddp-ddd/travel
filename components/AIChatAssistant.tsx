
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Compass, Heart, Wind, ExternalLink, Search, Sparkles } from 'lucide-react';
import { getAssistantChatStream } from '../services/geminiService';

interface Source {
  uri: string;
  title: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
}

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      text: '嗨！我是Momo~ (。•ᴗ-)✧ 今天的杭州很有胶片质感，准备好开启你的避世之旅了吗？' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || input;
    if (!userMsg.trim() || isLoading) return;

    if (!customMsg) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: m.text 
      }));
      history.push({ role: 'user', parts: userMsg });

      const stream = await getAssistantChatStream(history);
      let assistantText = '';
      let allSources: Source[] = [];
      
      setMessages(prev => [...prev, { role: 'assistant', text: '', sources: [] }]);
      
      for await (const chunk of stream) {
        assistantText += (chunk.text || '').replace(/\*/g, ''); // 兜底过滤任何可能残留的星号
        
        // 提取并更新搜索来源
        const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
        const chunks = groundingMetadata?.groundingChunks;
        if (chunks) {
          chunks.forEach((c: any) => {
            if (c.web) {
              const source = { uri: c.web.uri, title: c.web.title };
              if (!allSources.find(s => s.uri === source.uri)) {
                allSources.push(source);
              }
            }
          });
        }

        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          lastMsg.text = assistantText;
          lastMsg.sources = [...allSources];
          return newMsgs;
        });
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg = error.message?.includes("API_KEY") 
        ? "哎呀，Momo的连接配置似乎有点问题，请检查密钥是否正确注入。(。•́︿•̀。)"
        : "信号在山谷里飘散了... 试着重新连接我吧？(。•́︿•̀。)";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const QuickActions = () => (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
      {[
        { text: '想去探索秘境', icon: <Compass size={14} /> },
        { text: '找个合拍搭子', icon: <Heart size={14} /> },
        { text: '规划今日行程', icon: <Wind size={14} /> }
      ].map((action, i) => (
        <button
          key={i}
          onClick={() => handleSend(action.text)}
          className="flex-shrink-0 flex items-center gap-2 bg-white border border-emerald-100 px-4 py-2.5 rounded-full text-[13px] font-bold text-emerald-700 shadow-sm hover:shadow-md hover:bg-emerald-50 transition-all active:scale-95"
        >
          <span className="text-emerald-400">{action.icon}</span>
          {action.text}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 z-[100]">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-2xl w-[400px] h-[650px] rounded-[48px] shadow-[0_40px_100px_-20px_rgba(16,185,129,0.2)] border border-emerald-50 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-8 pb-4 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-white/20 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                    className="w-full h-full object-cover"
                    alt="Momo Avatar"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2">Momo · 秘境向导</h3>
                  <div className="flex items-center gap-1.5 mt-0.5 opacity-80">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Real-time Curation</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"><X size={20} /></button>
            </div>
          </div>

          <div className="px-6 py-4 -mt-2 relative z-20">
            <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-emerald-900/5 border border-emerald-50/50">
              <QuickActions />
            </div>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[30px] text-[14px] leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-emerald-50/50 rounded-bl-none font-medium'
                }`}>
                  {msg.text}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 max-w-[85%] px-2">
                    {msg.sources.map((s, idx) => (
                      <a 
                        key={idx} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <Search size={10} /> {s.title.length > 20 ? s.title.substring(0, 18) + '...' : s.title} <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && !messages[messages.length-1].text && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-[28px] shadow-sm border border-emerald-50 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Momo 正在深处感知真实...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 pt-0 bg-white">
            <div className="flex gap-3 bg-slate-50 rounded-[30px] p-2 pr-2.5 items-center border border-slate-100 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="你想逃离到哪里？"
                className="flex-1 bg-transparent px-4 py-3.5 text-sm focus:outline-none font-medium text-slate-600"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-emerald-600 text-white p-3.5 rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95 shadow-md"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white p-4 rounded-[32px] shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border border-emerald-50 flex items-center gap-4 pr-6"
        >
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Momo" />
          </div>
          <div className="text-left">
             <span className="block text-xs font-black text-slate-400 uppercase tracking-widest">Aesthetic Guide</span>
             <span className="block text-sm font-black text-slate-800">和 Momo 开启真实探索</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;
