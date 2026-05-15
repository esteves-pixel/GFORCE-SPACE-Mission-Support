
export interface Citation {
  title: string;
  link: string;
  authors: string;
  date: string;
}

export interface TrainingProtocol {
  title: string;
  rounds: Array<{
    name: string;
    duration: string;
    description: string;
    drill: string[];
  }>;
  coachNotes?: string;
}

export interface AppendixData {
  methodology: string;
  findings: string;
  implications: string;
  context: string;
}

export interface ScienceReview {
  id: string;
  spotlightTitle: string;
  scienceSummary: string;
  citation: Citation;
  whyWarriorsCare: string[];
  trainingApplication: TrainingProtocol;
  action: {
    text: string;
    link?: string;
    keyword?: string;
  };
  appendix: AppendixData;
  tags: string[];
}

export interface SpaceSignal {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  rawNews: string;
  deorbitedInsight: string;
  relevance: 'PERSONAL' | 'COMPANY' | 'DESIRES';
  isAnalyzedPRD?: boolean;
  analysis?: {
    processes: string[];
    gaps: string[];
    implementationEase: 'EASY' | 'MODERATE' | 'HARD';
    roadmap: string;
  };
  status: 'DRAFT' | 'VALIDATING' | 'DEPLOYED';
  protocol?: TrainingProtocol;
}

export interface BroadcastSegment {
  id: string;
  title: string;
  duration: string;
  copy: string;
  visualCue: string;
}

export interface BroadcastScript {
  showTitle: string;
  segments: BroadcastSegment[];
  closingProtocol: string;
}

export interface SocialAsset {
  platform: string;
  caption: string;
  visualIdea: string;
}

export interface ValidationReport {
  overallQuality: string;
  scientificVerification: string;
  biomechanicsCheck: string;
  brandVoiceCheck: string;
  correctedContent?: string;
  socialAssets: SocialAsset[];
}

export interface DailyMission {
  id: string;
  label: string;
  category: 'MIND' | 'BODY' | 'SKILL' | string;
  completed: boolean;
}

export interface LaunchAsset {
  platform: string;
  content: string;
  visualCue: string;
  hashtags: string[];
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  BROADCAST_CENTER = 'BROADCAST_CENTER',
  INGEST_SIGNAL = 'INGEST_SIGNAL',
  LAUNCH_KIT = 'LAUNCH_KIT',
  TACTICAL_CHAT = 'TACTICAL_CHAT',
  TRAINING_PROTOCOL = 'TRAINING_PROTOCOL',
  MISSION_BRIEFING = 'MISSION_BRIEFING',
  SYSTEM_ROADMAP = 'SYSTEM_ROADMAP',
  TRANSMISSION_HUB = 'TRANSMISSION_HUB',
}
