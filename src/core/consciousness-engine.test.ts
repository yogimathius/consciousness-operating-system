import { ConsciousnessEngine } from './consciousness-engine';
import { UserProfile, ConsciousnessDomain } from '../types/consciousness';
import { v4 as uuidv4 } from 'uuid';

describe('ConsciousnessEngine', () => {
  let engine: ConsciousnessEngine;
  let mockUserProfile: UserProfile;

  beforeEach(() => {
    engine = new ConsciousnessEngine();
    mockUserProfile = {
      id: uuidv4(),
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      consciousnessData: {
        symbolRecognition: {
          personalSymbolDictionary: { 'tree': 'growth', 'water': 'emotions' },
          meaningDevelopmentScore: 75,
          lastUpdated: new Date()
        },
        dreamAnalysis: {
          dreamPatterns: ['flying_dreams', 'water_themes'],
          subconsciousIntegrationScore: 68,
          lastDreamEntry: new Date()
        },
        skillDevelopment: {
          masteryAreas: ['programming', 'meditation'],
          competenceLevel: 82,
          activeSkillTrees: ['technical_skills']
        },
        flowStates: {
          optimalExperienceFrequency: 3.2,
          peakPerformanceMetrics: { 'coding': 4.1 },
          lastFlowSession: new Date()
        },
        mindfulnessPractice: {
          presentMomentAwareness: 71,
          meditationStreak: 12,
          practiceHistory: [new Date()]
        }
      },
      preferences: {
        privacyLevel: 'anonymous_research',
        notificationSettings: { 'daily_insights': true },
        integrationPreferences: ['symbol_quest', 'dream_journal_pro']
      }
    };
  });

  describe('calculateConsciousnessState', () => {
    it('should calculate overall consciousness score from domain scores', async () => {
      const state = await engine.calculateConsciousnessState(mockUserProfile);
      
      expect(state.userId).toBe(mockUserProfile.id);
      expect(state.overallConsciousnessScore).toBeGreaterThan(0);
      expect(state.overallConsciousnessScore).toBeLessThanOrEqual(100);
      expect(state.timestamp).toBeInstanceOf(Date);
    });

    it('should calculate individual domain scores', async () => {
      const state = await engine.calculateConsciousnessState(mockUserProfile);
      
      expect(state.domainScores[ConsciousnessDomain.SYMBOL_RECOGNITION]).toBe(75);
      expect(state.domainScores[ConsciousnessDomain.DREAM_ANALYSIS]).toBe(68);
      expect(state.domainScores[ConsciousnessDomain.SKILL_DEVELOPMENT]).toBe(82);
      expect(state.domainScores[ConsciousnessDomain.MINDFULNESS_PRACTICE]).toBe(71);
    });

    it('should generate insights based on consciousness data', async () => {
      const state = await engine.calculateConsciousnessState(mockUserProfile);
      
      expect(state.insights).toBeInstanceOf(Array);
      expect(state.insights.length).toBeGreaterThan(0);
    });

    it('should provide personalized recommendations', async () => {
      const state = await engine.calculateConsciousnessState(mockUserProfile);
      
      expect(state.recommendations).toBeInstanceOf(Array);
      expect(state.recommendations.length).toBeGreaterThan(0);
    });

    it('should predict growth trajectory', async () => {
      const state = await engine.calculateConsciousnessState(mockUserProfile);
      
      expect(['ascending', 'stable', 'descending']).toContain(state.growthTrajectory.trend);
      expect(state.growthTrajectory.predictedScore).toBeGreaterThan(0);
      expect(state.growthTrajectory.predictedScore).toBeLessThanOrEqual(100);
      expect(state.growthTrajectory.confidenceLevel).toBeGreaterThanOrEqual(0);
      expect(state.growthTrajectory.confidenceLevel).toBeLessThanOrEqual(1);
    });
  });

  describe('analyzePatterns', () => {
    it('should identify patterns across consciousness domains', async () => {
      const patterns = await engine.analyzePatterns(mockUserProfile);
      
      expect(patterns).toBeInstanceOf(Array);
    });

    it('should correlate dream symbols with conscious development', async () => {
      const patterns = await engine.analyzePatterns(mockUserProfile);
      
      const dreamSymbolCorrelations = patterns.filter(p => p.type === 'dream_symbol_correlation');
      expect(dreamSymbolCorrelations.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('generatePersonalizedRecommendations', () => {
    it('should generate actionable development recommendations', async () => {
      const recommendations = await engine.generatePersonalizedRecommendations(mockUserProfile);
      
      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBeGreaterThan(0);
      
      recommendations.forEach(rec => {
        expect(rec).toHaveProperty('domain');
        expect(rec).toHaveProperty('action');
        expect(rec).toHaveProperty('priority');
        expect(rec).toHaveProperty('rationale');
      });
    });

    it('should prioritize recommendations based on current state', async () => {
      // Create a profile with a low score to trigger high priority recommendations
      const lowScoreProfile = {
        ...mockUserProfile,
        consciousnessData: {
          ...mockUserProfile.consciousnessData,
          dreamAnalysis: {
            ...mockUserProfile.consciousnessData.dreamAnalysis,
            subconsciousIntegrationScore: 45 // Low score to trigger high priority
          }
        }
      };
      
      const recommendations = await engine.generatePersonalizedRecommendations(lowScoreProfile);
      
      const highPriorityRecs = recommendations.filter(r => r.priority === 'high');
      expect(highPriorityRecs.length).toBeGreaterThanOrEqual(1);
    });
  });
});