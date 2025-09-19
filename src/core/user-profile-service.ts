import { UserProfile, UserProfileSchema, IntegrationData, ConsciousnessDomain } from '../types/consciousness';
import { UserProfileUpdate } from '../types/partial-updates';
import { v4 as uuidv4 } from 'uuid';

export interface ConsciousnessSummary {
  overallScore: number;
  domainBreakdown: Record<ConsciousnessDomain, number>;
  recentActivity: {
    lastSymbolUpdate: Date | null;
    lastDreamEntry: Date | null;
    lastFlowSession: Date | null;
    meditationStreak: number;
  };
  growthTrend: 'ascending' | 'stable' | 'descending';
  keyInsights: string[];
}

/**
 * Service for managing unified user profiles across all consciousness development domains.
 * 
 * Implements the Unified Consciousness Dashboard requirements:
 * - Unified user profile combining all consciousness development data
 * - Cross-platform data synchronization and consolidation
 * - Personal consciousness timeline and milestone tracking
 * - Integration with all existing consciousness development tools
 */
export class UserProfileService {
  private profiles: Map<string, UserProfile> = new Map();

  /**
   * Creates a new user profile with default consciousness data structure
   */
  async createProfile(email: string, id?: string): Promise<UserProfile> {
    // Validate email format using Zod
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    const profileId = id || uuidv4();
    const now = new Date();

    const profile: UserProfile = {
      id: profileId,
      email,
      createdAt: now,
      updatedAt: now,
      consciousnessData: {
        symbolRecognition: {
          personalSymbolDictionary: {},
          meaningDevelopmentScore: 0,
          lastUpdated: now
        },
        dreamAnalysis: {
          dreamPatterns: [],
          subconsciousIntegrationScore: 0,
          lastDreamEntry: undefined
        },
        skillDevelopment: {
          masteryAreas: [],
          competenceLevel: 0,
          activeSkillTrees: []
        },
        flowStates: {
          optimalExperienceFrequency: 0,
          peakPerformanceMetrics: {},
          lastFlowSession: undefined
        },
        mindfulnessPractice: {
          presentMomentAwareness: 0,
          meditationStreak: 0,
          practiceHistory: []
        }
      },
      preferences: {
        privacyLevel: 'private',
        notificationSettings: {
          'daily_insights': true,
          'weekly_reports': true,
          'milestone_celebrations': true
        },
        integrationPreferences: []
      }
    };

    // Validate the profile structure
    const validatedProfile = UserProfileSchema.parse(profile);
    this.profiles.set(profileId, validatedProfile);
    
    return validatedProfile;
  }

  /**
   * Updates an existing user profile with partial data
   */
  async updateProfile(profileId: string, updates: UserProfileUpdate): Promise<UserProfile> {
    const existingProfile = this.profiles.get(profileId);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile: UserProfile = {
      ...existingProfile,
      ...updates,
      id: profileId, // Ensure ID cannot be changed
      updatedAt: new Date(),
      consciousnessData: {
        ...existingProfile.consciousnessData,
        ...(updates.consciousnessData && {
          symbolRecognition: {
            ...existingProfile.consciousnessData.symbolRecognition,
            ...updates.consciousnessData?.symbolRecognition
          },
          dreamAnalysis: {
            ...existingProfile.consciousnessData.dreamAnalysis,
            ...updates.consciousnessData?.dreamAnalysis
          },
          skillDevelopment: {
            ...existingProfile.consciousnessData.skillDevelopment,
            ...updates.consciousnessData?.skillDevelopment
          },
          flowStates: {
            ...existingProfile.consciousnessData.flowStates,
            ...updates.consciousnessData?.flowStates
          },
          mindfulnessPractice: {
            ...existingProfile.consciousnessData.mindfulnessPractice,
            ...updates.consciousnessData?.mindfulnessPractice
          }
        })
      }
    };

    // Validate the updated profile
    const validatedProfile = UserProfileSchema.parse(updatedProfile);
    this.profiles.set(profileId, validatedProfile);
    
    return validatedProfile;
  }

  /**
   * Retrieves a user profile by ID
   */
  async getProfile(profileId: string): Promise<UserProfile | null> {
    return this.profiles.get(profileId) || null;
  }

  /**
   * Synchronizes data from integrated consciousness development tools
   */
  async syncIntegrationData(integrationData: IntegrationData): Promise<UserProfile> {
    const profile = await this.getProfile(integrationData.userId);
    if (!profile) {
      throw new Error('Profile not found for integration data sync');
    }

    const updates = this.processIntegrationData(integrationData);
    return await this.updateProfile(integrationData.userId, updates);
  }

  /**
   * Gets a comprehensive consciousness summary for dashboard display
   */
  async getConsciousnessSummary(profileId: string): Promise<ConsciousnessSummary> {
    const profile = await this.getProfile(profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    const domainBreakdown = this.calculateDomainScores(profile);
    const overallScore = this.calculateOverallScore(domainBreakdown);
    const recentActivity = this.extractRecentActivity(profile);
    const growthTrend = this.calculateGrowthTrend(profile, domainBreakdown);
    const keyInsights = await this.generateKeyInsights(profile);

    return {
      overallScore,
      domainBreakdown,
      recentActivity,
      growthTrend,
      keyInsights
    };
  }

  /**
   * Deletes a user profile and all associated data
   */
  async deleteProfile(profileId: string): Promise<void> {
    this.profiles.delete(profileId);
  }

  /**
   * Processes integration data from different source systems into profile updates
   */
  private processIntegrationData(data: IntegrationData): UserProfileUpdate {
    const updates: UserProfileUpdate = {
      consciousnessData: {}
    };

    switch (data.sourceSystem) {
      case 'symbol_quest':
        if (data.dataType === 'symbol_interpretation' && data.payload.symbol && data.payload.interpretation) {
          updates.consciousnessData = {
            symbolRecognition: {
              personalSymbolDictionary: {
                [data.payload.symbol as string]: data.payload.interpretation as string
              },
              meaningDevelopmentScore: this.calculateSymbolScore(data.payload),
              lastUpdated: data.timestamp
            }
          };
        }
        break;

      case 'dream_journal_pro':
        if (data.dataType === 'dream_pattern' && data.payload.pattern) {
          updates.consciousnessData = {
            dreamAnalysis: {
              dreamPatterns: [data.payload.pattern as string],
              subconsciousIntegrationScore: this.calculateDreamScore(data.payload),
              lastDreamEntry: data.timestamp
            }
          };
        }
        break;

      case 'skilltree_platform':
        if (data.dataType === 'skill_mastery' && data.payload.skill) {
          updates.consciousnessData = {
            skillDevelopment: {
              masteryAreas: [data.payload.skill as string],
              competenceLevel: (data.payload.level as number) ?? 0,
              activeSkillTrees: [(data.payload.category as string) ?? 'general']
            }
          };
        }
        break;

      case 'mindful_code':
        if (data.dataType === 'flow_session' && data.payload.activity) {
          updates.consciousnessData = {
            flowStates: {
              optimalExperienceFrequency: (data.payload.frequency as number) ?? 1,
              peakPerformanceMetrics: {
                [data.payload.activity as string]: (data.payload.performance as number) ?? 3.0
              },
              lastFlowSession: data.timestamp
            }
          };
        }
        break;

      case 'user_progression':
        if (data.dataType === 'mindfulness_session') {
          updates.consciousnessData = {
            mindfulnessPractice: {
              presentMomentAwareness: (data.payload.awareness_score as number) ?? 0,
              meditationStreak: (data.payload.streak as number) ?? 0,
              practiceHistory: [data.timestamp]
            }
          };
        }
        break;
    }

    return updates;
  }

  private calculateSymbolScore(payload: Record<string, unknown>): number {
    const confidence = payload.confidence as number ?? 0.5;
    return Math.round(confidence * 100);
  }

  private calculateDreamScore(payload: Record<string, unknown>): number {
    const frequency = payload.frequency as number ?? 1;
    return Math.min(frequency * 15, 100);
  }

  private calculateDomainScores(profile: UserProfile): Record<ConsciousnessDomain, number> {
    const { consciousnessData } = profile;
    
    return {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: consciousnessData.symbolRecognition.meaningDevelopmentScore,
      [ConsciousnessDomain.DREAM_ANALYSIS]: consciousnessData.dreamAnalysis.subconsciousIntegrationScore,
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: consciousnessData.skillDevelopment.competenceLevel,
      [ConsciousnessDomain.FLOW_STATES]: this.calculateFlowStateScore(consciousnessData.flowStates),
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: consciousnessData.mindfulnessPractice.presentMomentAwareness
    };
  }

  private calculateFlowStateScore(flowData: UserProfile['consciousnessData']['flowStates']): number {
    const frequencyScore = Math.min(flowData.optimalExperienceFrequency * 20, 100);
    const performanceScores = Object.values(flowData.peakPerformanceMetrics);
    const avgPerformance = performanceScores.length > 0 
      ? performanceScores.reduce((sum, score) => sum + score, 0) / performanceScores.length * 20
      : 0;
    
    return Math.round((frequencyScore + avgPerformance) / 2);
  }

  private calculateOverallScore(domainScores: Record<ConsciousnessDomain, number>): number {
    const scores = Object.values(domainScores);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
  }

  private extractRecentActivity(profile: UserProfile): ConsciousnessSummary['recentActivity'] {
    return {
      lastSymbolUpdate: profile.consciousnessData.symbolRecognition.lastUpdated,
      lastDreamEntry: profile.consciousnessData.dreamAnalysis.lastDreamEntry || null,
      lastFlowSession: profile.consciousnessData.flowStates.lastFlowSession || null,
      meditationStreak: profile.consciousnessData.mindfulnessPractice.meditationStreak
    };
  }

  private calculateGrowthTrend(profile: UserProfile, domainScores: Record<ConsciousnessDomain, number>): ConsciousnessSummary['growthTrend'] {
    const overallScore = this.calculateOverallScore(domainScores);
    
    // Simple heuristic based on recent activity and scores
    if (profile.consciousnessData.mindfulnessPractice.meditationStreak > 7 && overallScore > 60) {
      return 'ascending';
    }
    
    const hasRecentActivity = profile.consciousnessData.dreamAnalysis.lastDreamEntry 
      && (Date.now() - profile.consciousnessData.dreamAnalysis.lastDreamEntry.getTime()) < 7 * 24 * 60 * 60 * 1000;
    
    if (hasRecentActivity && overallScore > 40) {
      return 'stable';
    }
    
    return 'descending';
  }

  private async generateKeyInsights(profile: UserProfile): Promise<string[]> {
    const insights: string[] = [];
    const domainScores = this.calculateDomainScores(profile);
    
    // Find strongest domain
    const strongestDomain = Object.entries(domainScores).reduce((max, [domain, score]) => 
      score > max.score ? { domain: domain as ConsciousnessDomain, score } : max,
      { domain: ConsciousnessDomain.SYMBOL_RECOGNITION, score: 0 }
    );
    
    insights.push(`Strongest development area: ${this.formatDomainName(strongestDomain.domain)} (${strongestDomain.score})`);
    
    // Meditation streak insight
    if (profile.consciousnessData.mindfulnessPractice.meditationStreak > 0) {
      insights.push(`Current mindfulness streak: ${profile.consciousnessData.mindfulnessPractice.meditationStreak} days`);
    }
    
    // Symbol development insight
    const symbolCount = Object.keys(profile.consciousnessData.symbolRecognition.personalSymbolDictionary).length;
    if (symbolCount > 0) {
      insights.push(`Personal symbol dictionary contains ${symbolCount} meaningful symbols`);
    }
    
    return insights;
  }

  private formatDomainName(domain: ConsciousnessDomain): string {
    return domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}