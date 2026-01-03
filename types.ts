
export enum SocialMode {
  SOCIAL_BUTTERFLY = 'SOCIAL_BUTTERFLY',
  SOCIAL_PHOBIA = 'SOCIAL_PHOBIA'
}

export type VibeType = 'SOLO' | 'ADVENTURE' | 'HEAL' | 'INSPIRE';

export enum RewardLevel {
  EXPLORER = 'EXPLORER', 
  TRACKER = 'TRACKER',   
  NAVIGATOR = 'NAVIGATOR' 
}

export interface Companion {
  id: string;
  name: string;
  avatar: string;
  matchScore: number;
  tags: string[];
  bio: string;
  recentSpot: string;
}

export interface Spot {
  id: string;
  name: string;
  city: string;
  description: string;
  tags: string[];
  imageUrl: string;
  crowdLevel: number; // 0-100
  aestheticScore: number; // 0-10
  vibe: VibeType;
  vibeLabel: string;
}

export interface ItineraryItem {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Dusk';
  title: string;
  location: string;
  activity: string;
}

export interface MemoryEntry {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  emotionTags: string[];
}
