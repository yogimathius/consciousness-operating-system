import { z } from 'zod';

// Core consciousness domains as defined in MVP requirements
export enum ConsciousnessDomain {
  SYMBOL_RECOGNITION = 'symbol_recognition',
  DREAM_ANALYSIS = 'dream_analysis',
  SKILL_DEVELOPMENT = 'skill_development',
  FLOW_STATES = 'flow_states',
  MINDFULNESS_PRACTICE = 'mindfulness_practice'
}

// Unified user profile schema
export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  consciousnessData: z.object({
    symbolRecognition: z.object({
      personalSymbolDictionary: z.record(z.string(), z.string()),
      meaningDevelopmentScore: z.number().min(0).max(100),
      lastUpdated: z.date()
    }),
    dreamAnalysis: z.object({
      dreamPatterns: z.array(z.string()),
      subconsciousIntegrationScore: z.number().min(0).max(100),
      lastDreamEntry: z.date().optional()
    }),
    skillDevelopment: z.object({
      masteryAreas: z.array(z.string()),
      competenceLevel: z.number().min(0).max(100),
      activeSkillTrees: z.array(z.string())
    }),
    flowStates: z.object({
      optimalExperienceFrequency: z.number().min(0),
      peakPerformanceMetrics: z.record(z.string(), z.number()),
      lastFlowSession: z.date().optional()
    }),
    mindfulnessPractice: z.object({
      presentMomentAwareness: z.number().min(0).max(100),
      meditationStreak: z.number().min(0),
      practiceHistory: z.array(z.date())
    })
  }),
  preferences: z.object({
    privacyLevel: z.enum(['private', 'anonymous_research', 'public']),
    notificationSettings: z.record(z.string(), z.boolean()),
    integrationPreferences: z.array(z.string())
  })
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

// Consciousness state assessment
export const ConsciousnessStateSchema = z.object({
  userId: z.string().uuid(),
  timestamp: z.date(),
  overallConsciousnessScore: z.number().min(0).max(100),
  domainScores: z.record(z.nativeEnum(ConsciousnessDomain), z.number().min(0).max(100)),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
  growthTrajectory: z.object({
    trend: z.enum(['ascending', 'stable', 'descending']),
    predictedScore: z.number().min(0).max(100),
    confidenceLevel: z.number().min(0).max(1)
  })
});

export type ConsciousnessState = z.infer<typeof ConsciousnessStateSchema>;

// Cross-platform integration data
export const IntegrationDataSchema = z.object({
  sourceSystem: z.enum(['awakening_codex', 'symbol_quest', 'freeflow_reimagined', 'team_skill_orchestrator', 'consciousness_operating_system']),
  dataType: z.string(),
  payload: z.record(z.string(), z.unknown()),
  timestamp: z.date(),
  userId: z.string().uuid(),
  syncStatus: z.enum(['pending', 'synced', 'error'])
});

export type IntegrationData = z.infer<typeof IntegrationDataSchema>;

// Consciousness Events for real-time orchestration
export enum ConsciousnessEventType {
  SPIRITUAL_INSIGHT = 'spiritual_insight',
  SYMBOL_INTERPRETATION = 'symbol_interpretation',
  FLOW_STATE_ACHIEVED = 'flow_state_achieved',
  RITUAL_COMPLETED = 'ritual_completed',
  TEAM_CONSCIOUSNESS_SHIFT = 'team_consciousness_shift',
  SYNCHRONICITY_DETECTED = 'synchronicity_detected',
  GROWTH_MILESTONE = 'growth_milestone',
  WISDOM_SYNTHESIS = 'wisdom_synthesis'
}

export const ConsciousnessEventSchema = z.object({
  id: z.string().uuid(),
  type: z.nativeEnum(ConsciousnessEventType),
  userId: z.string().uuid(),
  teamId: z.string().uuid().optional(),
  sourceProject: z.enum(['awakening_codex', 'symbol_quest', 'freeflow_reimagined', 'team_skill_orchestrator', 'consciousness_operating_system']),
  timestamp: z.date(),
  data: z.record(z.string(), z.unknown()),
  significance: z.number().min(0).max(1),
  correlatedEvents: z.array(z.string().uuid()).optional(),
  propagatedTo: z.array(z.string()).optional(),
  metadata: z.object({
    spiritualRelevance: z.number().min(0).max(1),
    personalRelevance: z.number().min(0).max(1),
    actionable: z.boolean(),
    sharable: z.boolean()
  })
});

export type ConsciousnessEvent = z.infer<typeof ConsciousnessEventSchema>;

// Unified Consciousness Insight across all projects
export const UnifiedInsightSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(['symbolic', 'spiritual', 'flow', 'team', 'synthetic']),
  title: z.string(),
  content: z.string(),
  sourceProjects: z.array(z.string()),
  timestamp: z.date(),
  spiritualSignificance: z.number().min(0).max(1),
  personalRelevance: z.number().min(0).max(1),
  actionableSteps: z.array(z.object({
    project: z.string(),
    action: z.string(),
    priority: z.enum(['low', 'medium', 'high']),
    estimatedImpact: z.number().min(0).max(1)
  })),
  crossProjectIntegrations: z.array(z.object({
    targetProject: z.string(),
    integrationType: z.string(),
    data: z.record(z.string(), z.unknown())
  }))
});

export type UnifiedInsight = z.infer<typeof UnifiedInsightSchema>;

// Cross-Project User State for orchestration
export const CrossProjectUserStateSchema = z.object({
  userId: z.string().uuid(),
  timestamp: z.date(),
  awakeningCodexState: z.object({
    activeRituals: z.array(z.string()),
    completedRituals: z.number(),
    spiritualJourneyStage: z.string(),
    lastRitualDate: z.date().optional()
  }).optional(),
  symbolQuestState: z.object({
    cardsDrawnToday: z.number(),
    symbolicInsights: z.array(z.string()),
    symbolDictionary: z.record(z.string(), z.string()),
    lastCardDraw: z.date().optional()
  }).optional(),
  freeflowState: z.object({
    currentFlowScore: z.number().min(0).max(100),
    flowSessionsToday: z.number(),
    optimizationSettings: z.record(z.string(), z.unknown()),
    lastFlowSession: z.date().optional()
  }).optional(),
  teamOrchestratorState: z.object({
    teamRoles: z.array(z.string()),
    teamConsciousnessScore: z.number().min(0).max(100),
    contributionMetrics: z.record(z.string(), z.number()),
    lastTeamSession: z.date().optional()
  }).optional(),
  unifiedConsciousnessScore: z.number().min(0).max(100),
  activeIntegrations: z.array(z.string()),
  lastSyncTimestamp: z.date()
});

export type CrossProjectUserState = z.infer<typeof CrossProjectUserStateSchema>;

// Project Integration Capabilities
export interface ProjectIntegrationCapability {
  project: string;
  endpoint: string;
  port: number;
  dataTypes: string[];
  eventTypes: ConsciousnessEventType[];
  authRequired: boolean;
  realTimeCapable: boolean;
  syncMethods: ('push' | 'pull' | 'bidirectional')[];
}

// Sacred Technology Configuration
export interface SacredTechnologyConfig {
  reverentDataHandling: boolean;
  privacyFirstArchitecture: boolean;
  consentBasedIntegration: boolean;
  spiritualConfidentiality: boolean;
  meaningfulCoincidenceDetection: boolean;
  collectiveIntelligenceEnabled: boolean;
}