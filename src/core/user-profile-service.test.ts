import { UserProfileService } from './user-profile-service';
import { UserProfile, ConsciousnessDomain } from '../types/consciousness';
import { UserProfileUpdate } from '../types/partial-updates';
import { v4 as uuidv4 } from 'uuid';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let mockUserProfile: UserProfile;

  beforeEach(() => {
    service = new UserProfileService();
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
          peakPerformanceMetrics: { 'coding': 4.1, 'meditation': 3.8 },
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

  describe('createProfile', () => {
    it('should create a new user profile with default consciousness data', async () => {
      const email = 'newuser@example.com';
      const profile = await service.createProfile(email);
      
      expect(profile.email).toBe(email);
      expect(profile.id).toBeDefined();
      expect(profile.createdAt).toBeInstanceOf(Date);
      expect(profile.consciousnessData).toBeDefined();
      expect(profile.consciousnessData.symbolRecognition.meaningDevelopmentScore).toBe(0);
    });

    it('should throw error for invalid email', async () => {
      await expect(service.createProfile('invalid-email')).rejects.toThrow();
    });
  });

  describe('updateProfile', () => {
    it('should update existing user profile', async () => {
      const profileId = uuidv4();
      await service.createProfile('test@example.com', profileId);
      
      const updates: UserProfileUpdate = {
        consciousnessData: {
          symbolRecognition: {
            personalSymbolDictionary: { 'sun': 'energy' },
            meaningDevelopmentScore: 85,
            lastUpdated: new Date()
          }
        }
      };
      
      // Add a small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 1));
      
      const updatedProfile = await service.updateProfile(profileId, updates);
      expect(updatedProfile.consciousnessData.symbolRecognition.meaningDevelopmentScore).toBe(85);
      expect(updatedProfile.updatedAt.getTime()).toBeGreaterThan(updatedProfile.createdAt.getTime());
    });

    it('should throw error for non-existent profile', async () => {
      const nonExistentId = uuidv4();
      await expect(service.updateProfile(nonExistentId, {})).rejects.toThrow('Profile not found');
    });
  });

  describe('getProfile', () => {
    it('should retrieve existing user profile', async () => {
      const profileId = uuidv4();
      const createdProfile = await service.createProfile('test@example.com', profileId);
      
      const retrievedProfile = await service.getProfile(profileId);
      expect(retrievedProfile).not.toBeNull();
      expect(retrievedProfile!.id).toBe(createdProfile.id);
      expect(retrievedProfile!.email).toBe(createdProfile.email);
    });

    it('should return null for non-existent profile', async () => {
      const nonExistentId = uuidv4();
      const profile = await service.getProfile(nonExistentId);
      expect(profile).toBeNull();
    });
  });

  describe('syncIntegrationData', () => {
    it('should update profile with integration data from Symbol Quest', async () => {
      const profileId = uuidv4();
      await service.createProfile('test@example.com', profileId);
      
      const integrationData = {
        sourceSystem: 'symbol_quest' as const,
        dataType: 'symbol_interpretation',
        payload: {
          symbol: 'moon',
          interpretation: 'intuition and cycles',
          confidence: 0.9
        },
        timestamp: new Date(),
        userId: profileId,
        syncStatus: 'pending' as const
      };
      
      const updatedProfile = await service.syncIntegrationData(integrationData);
      expect(updatedProfile.consciousnessData.symbolRecognition.personalSymbolDictionary['moon']).toBe('intuition and cycles');
    });

    it('should update profile with dream analysis data', async () => {
      const profileId = uuidv4();
      await service.createProfile('test@example.com', profileId);
      
      const integrationData = {
        sourceSystem: 'dream_journal_pro' as const,
        dataType: 'dream_pattern',
        payload: {
          pattern: 'recurring_ocean_dreams',
          frequency: 5,
          emotional_tone: 'peaceful'
        },
        timestamp: new Date(),
        userId: profileId,
        syncStatus: 'pending' as const
      };
      
      const updatedProfile = await service.syncIntegrationData(integrationData);
      expect(updatedProfile.consciousnessData.dreamAnalysis.dreamPatterns).toContain('recurring_ocean_dreams');
    });

    it('should update profile with skill development data', async () => {
      const profileId = uuidv4();
      await service.createProfile('test@example.com', profileId);
      
      const integrationData = {
        sourceSystem: 'skilltree_platform' as const,
        dataType: 'skill_mastery',
        payload: {
          skill: 'typescript',
          level: 85,
          category: 'programming'
        },
        timestamp: new Date(),
        userId: profileId,
        syncStatus: 'pending' as const
      };
      
      const updatedProfile = await service.syncIntegrationData(integrationData);
      expect(updatedProfile.consciousnessData.skillDevelopment.masteryAreas).toContain('typescript');
    });
  });

  describe('getConsciousnessSummary', () => {
    it('should return comprehensive consciousness summary', async () => {
      const profileId = uuidv4();
      const profile = await service.createProfile('test@example.com', profileId);
      
      // Add some consciousness data
      await service.updateProfile(profileId, {
        consciousnessData: mockUserProfile.consciousnessData
      });
      
      const summary = await service.getConsciousnessSummary(profileId);
      
      expect(summary).toHaveProperty('overallScore');
      expect(summary).toHaveProperty('domainBreakdown');
      expect(summary).toHaveProperty('recentActivity');
      expect(summary).toHaveProperty('growthTrend');
      expect(summary.overallScore).toBeGreaterThan(0);
      expect(summary.domainBreakdown).toHaveProperty(ConsciousnessDomain.SYMBOL_RECOGNITION);
    });
  });

  describe('deleteProfile', () => {
    it('should delete existing profile', async () => {
      const profileId = uuidv4();
      await service.createProfile('test@example.com', profileId);
      
      await service.deleteProfile(profileId);
      const deletedProfile = await service.getProfile(profileId);
      expect(deletedProfile).toBeNull();
    });

    it('should handle deletion of non-existent profile gracefully', async () => {
      const nonExistentId = uuidv4();
      await expect(service.deleteProfile(nonExistentId)).resolves.toBeUndefined();
    });
  });
});