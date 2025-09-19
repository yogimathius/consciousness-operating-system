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
  sourceSystem: z.enum(['symbol_quest', 'dream_journal_pro', 'skilltree_platform', 'user_progression', 'mindful_code']),
  dataType: z.string(),
  payload: z.record(z.string(), z.unknown()),
  timestamp: z.date(),
  userId: z.string().uuid(),
  syncStatus: z.enum(['pending', 'synced', 'error'])
});

export type IntegrationData = z.infer<typeof IntegrationDataSchema>;