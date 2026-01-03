
import React from 'react';
import { Spot, Companion } from './types';

export const COLORS = {
  cyanLight: '#F0FDFA', 
  cyanMedium: '#99F6E4',
  cyanDeep: '#0D9488',
  orangeAccent: '#FB923C',
  bgSoft: '#F8FAFC',
};

export const MOCK_COMPANIONS: Companion[] = [
  {
    id: 'c1',
    name: '阿木 (A-Mu)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    matchScore: 98,
    tags: ['胶片摄影', '山系生活', '极度安静'],
    bio: '不喜欢说话，但想在落日下分享半边耳机。',
    recentSpot: '杭州·浴鹄湾'
  },
  {
    id: 'c2',
    name: '小禾',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    matchScore: 92,
    tags: ['宋韵美学', '茶道', '慢节奏'],
    bio: '想找个能一起在园林坐一下午的人，不看手机那种。',
    recentSpot: '苏州·艺圃'
  },
  {
    id: 'c3',
    name: 'Leo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    matchScore: 89,
    tags: ['数字游民', '设计狮', '日出追随者'],
    bio: '带上电脑去海边，工作完了就去冲浪。',
    recentSpot: '万宁·日月湾'
  }
];

export const MOCK_SPOTS: Spot[] = [
  {
    id: '1',
    name: '杭州·浴鹄湾',
    city: '杭州',
    description: '隐藏在西湖西岸静谧的湖湾深处，廊桥与水榭在晨雾中若隐现，是宋韵美学的无声留白。',
    tags: ['社恐友好', '宋韵美学', '避世感'],
    imageUrl: 'https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 8,
    aestheticScore: 9.8,
    vibe: 'SOLO',
    vibeLabel: '想独处'
  },
  {
    id: '2',
    name: '万宁·日月湾海边教堂',
    city: '万宁',
    description: '伫立在海南东部海岸线上的白色尖顶建筑。当椰林的海风穿过镂空的拱门，能听见太平洋最纯净的呼吸。',
    tags: ['极简主义', '海浪声', '出片神地'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 42,
    aestheticScore: 9.6,
    vibe: 'HEAL',
    vibeLabel: '求治愈'
  },
  {
    id: '3',
    name: '景德镇·三宝村',
    city: '景德镇',
    description: '散落在溪谷里的陶瓷策源地。废弃的窑炉在流水的环绕下重获新生，每一块碎瓷片都带有艺术的体温。',
    tags: ['匠人精神', '山野慢活', '自由灵魂'],
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 25,
    aestheticScore: 9.7,
    vibe: 'INSPIRE',
    vibeLabel: '想灵感'
  },
  {
    id: '4',
    name: '苏州·艺圃',
    city: '苏州',
    description: '躲在苏州古城西北角深处的隐秘园林。在这里可以坐拥一池残荷，听雨水敲打蕉叶，感受苏式生活的极致克制。',
    tags: ['园林遗珠', '怀旧时光', '清幽'],
    imageUrl: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 15,
    aestheticScore: 9.9,
    vibe: 'SOLO',
    vibeLabel: '想独处'
  },
  {
    id: '5',
    name: '弥勒·东风韵',
    city: '弥勒',
    description: '由红砖堆砌而成的后现代艺术庄园。那些像酒瓶又像火焰的建筑，在云南的烈日下呈现出魔幻现实主义的张力。',
    tags: ['异域风情', '红砖艺术', '视觉震撼'],
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 38,
    aestheticScore: 9.5,
    vibe: 'INSPIRE',
    vibeLabel: '想灵感'
  },
  {
    id: '6',
    name: '重庆·下浩里',
    city: '重庆',
    description: '在南岸层叠山体中复苏的老街区。看落日余晖洒在青石板和咖啡香里，体验山城独有的垂直空间美学。',
    tags: ['市井烟火', '山城肌理', '扫街胜地'],
    imageUrl: 'https://images.unsplash.com/photo-1542359649-31e03ad4d909?auto=format&fit=crop&q=80&w=800',
    crowdLevel: 30,
    aestheticScore: 9.2,
    vibe: 'HEAL',
    vibeLabel: '求治愈'
  }
];

export const LOGO_SVG = (
  <svg viewBox="0 0 200 120" className="w-40 h-auto">
    <path d="M40 80 C 60 70, 80 90, 100 75 S 140 60, 160 85" stroke="#0D9488" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 30 C 70 45, 100 20, 130 35 S 150 50, 170 25" stroke="#99F6E4" strokeWidth="2" fill="none" strokeLineDasharray="4 4" />
    <g transform="translate(85, 40) rotate(-10)">
       <path d="M0 20 L 0 40 M 10 15 L 10 40" stroke="#FB923C" strokeWidth="5" strokeLinecap="round" />
       <circle cx="5" cy="45" r="8" fill="#FB923C" />
    </g>
    <text x="50%" y="105" textAnchor="middle" fill="#0D9488" style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>秘境搭子</text>
  </svg>
);
