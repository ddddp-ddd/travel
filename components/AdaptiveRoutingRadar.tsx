
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Plus, Minus, LocateFixed, Search } from 'lucide-react';

export interface MapNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Props {
  nodes: MapNode[];
  onNodesChange?: (nodes: MapNode[]) => void;
}

const AdaptiveRoutingRadar: React.FC<Props> = ({ nodes, onNodesChange }) => {
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [mapPos, setMapPos] = useState({ x: -60, y: -40 });
  const [isPanningMap, setIsPanningMap] = useState(false);
  const [zoom, setZoom] = useState(1.6);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // 处理节点拖拽
  const handleNodeMouseDown = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingNode(id);
  };

  const handleMapMouseDown = (e: React.MouseEvent) => {
    if (isDraggingNode) return;
    setIsPanningMap(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingNode && svgRef.current) {
      const svg = svgRef.current;
      const CTM = svg.getScreenCTM();
      if (!CTM) return;
      const x = (e.clientX - CTM.e) / CTM.a;
      const y = (e.clientY - CTM.f) / CTM.d;

      const newNodes = nodes.map(node => 
        node.id === isDraggingNode ? { ...node, x, y } : node
      );
      onNodesChange?.(newNodes);
    } else if (isPanningMap) {
      setMapPos(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleGlobalMouseUp = () => {
    setIsDraggingNode(null);
    setIsPanningMap(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDraggingNode, isPanningMap]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-[#F9F7F4] rounded-[64px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border-[10px] border-white h-[480px] cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMapMouseDown}
      onMouseMove={handleMouseMove}
    >
      {/* 清新矢量城市地图底图 - 完美匹配截图色调 */}
      <div 
        className="absolute inset-0 transition-transform duration-75 ease-out"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1582208035222-77742055743c?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: '200% auto',
          backgroundPosition: 'center',
          transform: `translate(${mapPos.x}px, ${mapPos.y}px) scale(${zoom})`,
          filter: 'saturate(0.5) brightness(1.08) contrast(1.05)',
          opacity: 0.95
        }}
      >
        {/* 覆盖一层极浅的蒙层，使地图看起来更像平面矢量图 */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[0.5px]"></div>
      </div>

      {/* 城市街道标识 (如 外滩街道) */}
      <div 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 pointer-events-none transition-transform"
        style={{ transform: `translate(${mapPos.x}px, ${mapPos.y}px) scale(${zoom})` }}
      >
        <span className="text-3xl font-black text-slate-800/20 tracking-widest select-none pointer-events-none">外滩街道</span>
      </div>

      {/* SVG 路径与编号节点 */}
      <svg 
        ref={svgRef}
        viewBox="0 0 800 600" 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: `translate(${mapPos.x}px, ${mapPos.y}px) scale(${zoom})` }}
      >
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <filter id="shadowEffect">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* 紫色粗虚线路径 */}
        <polyline
          points={nodes.map(n => `${n.x},${n.y}`).join(' ')}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeDasharray="20 20"
          strokeLinecap="round"
          className="opacity-60"
        />

        {/* 依照截图设计的紫色编号节点 */}
        {nodes.map((node, index) => (
          <g 
            key={node.id} 
            onMouseDown={handleNodeMouseDown(node.id)}
            className="pointer-events-auto cursor-grab active:cursor-grabbing group"
          >
            {/* 外部柔和光环 */}
            <circle cx={node.x} cy={node.y} r="45" fill="white" fillOpacity="0.8" filter="url(#shadowEffect)" />
            
            {/* 核心渐变球 */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r="34" 
              fill="url(#purpleGrad)" 
              className="transition-all duration-300 group-hover:scale-110"
            />
            
            {/* 编号 */}
            <text 
              x={node.x} 
              y={node.y + 11} 
              textAnchor="middle" 
              fill="white" 
              fontSize="30" 
              fontWeight="900" 
              className="pointer-events-none select-none font-sans"
            >
              {index + 1}
            </text>

            {/* 拖动提示标签 */}
            <foreignObject x={node.x - 70} y={node.y + 50} width="140" height="50">
              <div className="flex justify-center">
                <div className={`px-4 py-1.5 bg-white/95 backdrop-blur rounded-2xl text-[11px] font-black text-slate-800 shadow-xl border border-white transition-opacity ${isDraggingNode === node.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                   {node.label}
                </div>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>

      {/* 底部悬浮控制面板 - 完美复现截图 UI */}
      <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-center z-50 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-3xl rounded-[40px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-white flex items-center justify-between gap-12 pointer-events-auto w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-6">
            <div className="w-18 h-18 bg-[#5F45FF] text-white rounded-[28px] flex items-center justify-center shadow-[0_12px_24px_rgba(95,69,255,0.3)]">
              <div className="relative">
                <Navigation size={38} fill="white" className="rotate-45 translate-x-0.5 -translate-y-0.5" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-4 h-4 bg-white rounded-full border-4 border-[#5F45FF]"></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">实时路径雷达</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">AI ADAPTIVE ROUTING</p>
            </div>
          </div>
          
          <button className="bg-[#F0F2FF] text-[#5F45FF] px-8 py-4.5 rounded-full text-sm font-black hover:bg-indigo-100 transition-all active:scale-95 border border-indigo-100/50">
            可拖动节点微调
          </button>
        </div>
      </div>

      {/* 辅助操作按钮 (Top Right) */}
      <div className="absolute top-8 right-8 flex flex-col gap-3 z-40">
        <button onClick={() => setZoom(z => Math.min(3, z + 0.2))} className="p-3.5 bg-white/90 rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><Plus size={20} /></button>
        <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="p-3.5 bg-white/90 rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><Minus size={20} /></button>
        <button onClick={() => {setMapPos({x:-60,y:-40}); setZoom(1.6);}} className="p-3.5 bg-[#5F45FF] rounded-2xl text-white shadow-lg hover:bg-indigo-700 transition-all"><LocateFixed size={20} /></button>
      </div>
    </div>
  );
};

export default AdaptiveRoutingRadar;
