// Core consciousness types for the unified dashboard
export const ConsciousnessDomain = {
  SYMBOL_RECOGNITION: "symbol_recognition",
  DREAM_ANALYSIS: "dream_analysis",
  SKILL_DEVELOPMENT: "skill_development",
  FLOW_STATES: "flow_states",
  MINDFULNESS_PRACTICE: "mindfulness_practice"
} as const;

export type ConsciousnessDomain = typeof ConsciousnessDomain[keyof typeof ConsciousnessDomain];

export interface UserProfile {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  consciousnessData: {
    symbolRecognition: {
      personalSymbolDictionary: Record<string, string>;
      meaningDevelopmentScore: number;
      lastUpdated: Date;
    };
    dreamAnalysis: {
      dreamPatterns: string[];
      subconsciousIntegrationScore: number;
      lastDreamEntry?: Date;
    };
    skillDevelopment: {
      masteryAreas: string[];
      competenceLevel: number;
      activeSkillTrees: string[];
    };
    flowStates: {
      optimalExperienceFrequency: number;
      peakPerformanceMetrics: Record<string, number>;
      lastFlowSession?: Date;
    };
    mindfulnessPractice: {
      presentMomentAwareness: number;
      meditationStreak: number;
      practiceHistory: Date[];
    };
  };
  preferences: {
    privacyLevel: 'private' | 'anonymous_research' | 'public';
    notificationSettings: Record<string, boolean>;
    integrationPreferences: string[];
  };
}

export interface ConsciousnessState {
  userId: string;
  timestamp: Date;
  overallConsciousnessScore: number;
  domainScores: Record<ConsciousnessDomain, number>;
  insights: string[];
  recommendations: string[];
  growthTrajectory: {
    trend: 'ascending' | 'stable' | 'descending';
    predictedScore: number;
    confidenceLevel: number;
  };
}

export interface SacredVisualizationData {
  mandalaPattern: {
    centerPoint: { x: number; y: number };
    rings: Array<{
      radius: number;
      segments: number;
      color: string;
      opacity: number;
    }>;
    sacredGeometry: 'flower-of-life' | 'metatron' | 'sri-yantra' | 'custom';
  };
  breathingAnimation: {
    inhaleMs: number;
    exhaleMs: number;
    pauseMs: number;
    amplitude: number;
  };
  energeticFlow: {
    direction: 'clockwise' | 'counterclockwise' | 'spiral';
    speed: number;
    particles: Array<{
      x: number;
      y: number;
      energy: number;
      color: string;
    }>;
  };
}

export interface ApplicationIntegration {
  id: string;
  name: string;
  type: 'symbol-quest' | 'dream-journal' | 'skill-tree' | 'flow-tracker' | 'mindfulness';
  isConnected: boolean;
  lastSync: Date;
  data: {
    recentActivity: string[];
    currentState: Record<string, any>;
    metrics: Record<string, number>;
  };
  sacredTheme: {
    primaryColor: string;
    symbol: string;
    mantraText: string;
  };
}

export interface SacredDashboardState {
  consciousnessState: ConsciousnessState | null;
  applications: ApplicationIntegration[];
  visualization: SacredVisualizationData;
  isLoading: boolean;
  lastUpdate: Date | null;
  error: string | null;
  breathingSync: boolean;
  contemplativeMode: boolean;
}