import { UserProfileSchema, ConsciousnessStateSchema, IntegrationDataSchema, ConsciousnessDomain } from './consciousness';

describe('Consciousness Type Definitions', () => {
  describe('UserProfileSchema', () => {
    it('should validate a complete user profile', () => {
      const validProfile = {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        consciousnessData: {
          symbolRecognition: {
            personalSymbolDictionary: { 'tree': 'growth and stability' },
            meaningDevelopmentScore: 75,
            lastUpdated: new Date()
          },
          dreamAnalysis: {
            dreamPatterns: ['recurring_water_themes', 'flying_dreams'],
            subconsciousIntegrationScore: 60,
            lastDreamEntry: new Date()
          },
          skillDevelopment: {
            masteryAreas: ['programming', 'meditation'],
            competenceLevel: 85,
            activeSkillTrees: ['technical_skills', 'mindfulness']
          },
          flowStates: {
            optimalExperienceFrequency: 3.5,
            peakPerformanceMetrics: { 'coding_sessions': 4.2, 'meditation': 3.8 },
            lastFlowSession: new Date()
          },
          mindfulnessPractice: {
            presentMomentAwareness: 70,
            meditationStreak: 15,
            practiceHistory: [new Date(), new Date()]
          }
        },
        preferences: {
          privacyLevel: 'anonymous_research' as const,
          notificationSettings: { 'daily_insights': true, 'weekly_reports': false },
          integrationPreferences: ['symbol_quest', 'dream_journal_pro']
        }
      };

      const result = UserProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidProfile = {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        email: 'invalid-email',
        createdAt: new Date(),
        updatedAt: new Date(),
        consciousnessData: {
          symbolRecognition: { personalSymbolDictionary: {}, meaningDevelopmentScore: 50, lastUpdated: new Date() },
          dreamAnalysis: { dreamPatterns: [], subconsciousIntegrationScore: 50 },
          skillDevelopment: { masteryAreas: [], competenceLevel: 50, activeSkillTrees: [] },
          flowStates: { optimalExperienceFrequency: 2, peakPerformanceMetrics: {} },
          mindfulnessPractice: { presentMomentAwareness: 50, meditationStreak: 0, practiceHistory: [] }
        },
        preferences: {
          privacyLevel: 'private' as const,
          notificationSettings: {},
          integrationPreferences: []
        }
      };

      const result = UserProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it('should reject out-of-range consciousness scores', () => {
      const profileWithInvalidScore = {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        email: 'user@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        consciousnessData: {
          symbolRecognition: { personalSymbolDictionary: {}, meaningDevelopmentScore: 150, lastUpdated: new Date() },
          dreamAnalysis: { dreamPatterns: [], subconsciousIntegrationScore: 50 },
          skillDevelopment: { masteryAreas: [], competenceLevel: 50, activeSkillTrees: [] },
          flowStates: { optimalExperienceFrequency: 2, peakPerformanceMetrics: {} },
          mindfulnessPractice: { presentMomentAwareness: 50, meditationStreak: 0, practiceHistory: [] }
        },
        preferences: {
          privacyLevel: 'private' as const,
          notificationSettings: {},
          integrationPreferences: []
        }
      };

      const result = UserProfileSchema.safeParse(profileWithInvalidScore);
      expect(result.success).toBe(false);
    });
  });

  describe('ConsciousnessStateSchema', () => {
    it('should validate a complete consciousness state', () => {
      const validState = {
        userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        timestamp: new Date(),
        overallConsciousnessScore: 78,
        domainScores: {
          [ConsciousnessDomain.SYMBOL_RECOGNITION]: 85,
          [ConsciousnessDomain.DREAM_ANALYSIS]: 70,
          [ConsciousnessDomain.SKILL_DEVELOPMENT]: 90,
          [ConsciousnessDomain.FLOW_STATES]: 65,
          [ConsciousnessDomain.MINDFULNESS_PRACTICE]: 80
        },
        insights: ['Strong symbol integration this week', 'Flow states improving in technical work'],
        recommendations: ['Focus on dream recall techniques', 'Schedule more mindfulness sessions'],
        growthTrajectory: {
          trend: 'ascending' as const,
          predictedScore: 82,
          confidenceLevel: 0.85
        }
      };

      const result = ConsciousnessStateSchema.safeParse(validState);
      expect(result.success).toBe(true);
    });
  });

  describe('IntegrationDataSchema', () => {
    it('should validate integration data from different source systems', () => {
      const validIntegrationData = {
        sourceSystem: 'symbol_quest' as const,
        dataType: 'symbol_interpretation',
        payload: {
          symbol: 'tree',
          interpretation: 'growth and stability',
          confidence: 0.9
        },
        timestamp: new Date(),
        userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        syncStatus: 'synced' as const
      };

      const result = IntegrationDataSchema.safeParse(validIntegrationData);
      expect(result.success).toBe(true);
    });
  });
});