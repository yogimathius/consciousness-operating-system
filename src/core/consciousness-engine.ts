import { UserProfile, ConsciousnessState, ConsciousnessDomain } from '../types/consciousness';

export interface ConsciousnessPattern {
  type: string;
  description: string;
  confidence: number;
  domains: ConsciousnessDomain[];
  correlations: Record<string, number>;
}

export interface PersonalizedRecommendation {
  domain: ConsciousnessDomain;
  action: string;
  priority: 'low' | 'medium' | 'high';
  rationale: string;
  estimatedImpact: number;
}

/**
 * Core consciousness analysis engine that processes multi-modal consciousness data
 * to provide insights, patterns, and personalized development recommendations.
 * 
 * Implements the AI-Powered Consciousness Engine requirements from MVP:
 * - Symbolic reasoning integration
 * - Consciousness pattern analysis  
 * - Multi-dimensional consciousness mapping
 * - Personalized development recommendations
 */
export class ConsciousnessEngine {
  
  /**
   * Calculates current consciousness state from integrated user profile data
   */
  async calculateConsciousnessState(userProfile: UserProfile): Promise<ConsciousnessState> {
    const domainScores = this.calculateDomainScores(userProfile);
    const overallScore = this.calculateOverallScore(domainScores);
    const insights = await this.generateInsights(userProfile, domainScores);
    const recommendations = await this.generateRecommendationsSummary(userProfile);
    const growthTrajectory = this.predictGrowthTrajectory(userProfile, domainScores);

    return {
      userId: userProfile.id,
      timestamp: new Date(),
      overallConsciousnessScore: overallScore,
      domainScores,
      insights,
      recommendations,
      growthTrajectory
    };
  }

  /**
   * Analyzes patterns across different consciousness domains
   */
  async analyzePatterns(userProfile: UserProfile): Promise<ConsciousnessPattern[]> {
    const patterns: ConsciousnessPattern[] = [];
    
    // Analyze dream-symbol correlations
    patterns.push(...this.analyzeDreamSymbolCorrelations(userProfile));
    
    // Analyze skill-flow state relationships
    patterns.push(...this.analyzeSkillFlowCorrelations(userProfile));
    
    // Analyze mindfulness-overall development correlations
    patterns.push(...this.analyzeMindfulnessDevelopmentCorrelations(userProfile));
    
    return patterns;
  }

  /**
   * Generates personalized recommendations for consciousness development
   */
  async generatePersonalizedRecommendations(userProfile: UserProfile): Promise<PersonalizedRecommendation[]> {
    const recommendations: PersonalizedRecommendation[] = [];
    const domainScores = this.calculateDomainScores(userProfile);
    
    // Identify areas for improvement (scores below 70)
    Object.entries(domainScores).forEach(([domain, score]) => {
      if (score < 70) {
        recommendations.push(this.createDevelopmentRecommendation(domain as ConsciousnessDomain, score, userProfile));
      }
    });
    
    // Identify growth opportunities in strong areas
    Object.entries(domainScores).forEach(([domain, score]) => {
      if (score > 80) {
        recommendations.push(this.createAdvancementRecommendation(domain as ConsciousnessDomain, score, userProfile));
      }
    });
    
    // Sort by priority and impact
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return (priorityOrder[b.priority] * b.estimatedImpact) - (priorityOrder[a.priority] * a.estimatedImpact);
    });
  }

  private calculateDomainScores(userProfile: UserProfile): Record<ConsciousnessDomain, number> {
    const { consciousnessData } = userProfile;
    
    return {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: consciousnessData.symbolRecognition.meaningDevelopmentScore,
      [ConsciousnessDomain.DREAM_ANALYSIS]: consciousnessData.dreamAnalysis.subconsciousIntegrationScore,
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: consciousnessData.skillDevelopment.competenceLevel,
      [ConsciousnessDomain.FLOW_STATES]: this.calculateFlowStateScore(consciousnessData.flowStates),
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: consciousnessData.mindfulnessPractice.presentMomentAwareness
    };
  }

  private calculateFlowStateScore(flowData: UserProfile['consciousnessData']['flowStates']): number {
    // Convert frequency and performance metrics to a 0-100 score
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

  private async generateInsights(userProfile: UserProfile, domainScores: Record<ConsciousnessDomain, number>): Promise<string[]> {
    const insights: string[] = [];
    
    // Analyze strongest domain
    const strongestDomain = Object.entries(domainScores).reduce((max, [domain, score]) => 
      score > max.score ? { domain: domain as ConsciousnessDomain, score } : max,
      { domain: ConsciousnessDomain.SYMBOL_RECOGNITION, score: 0 }
    );
    
    insights.push(`Your strongest consciousness domain is ${this.formatDomainName(strongestDomain.domain)} with a score of ${strongestDomain.score}`);
    
    // Analyze growth patterns
    if (userProfile.consciousnessData.mindfulnessPractice.meditationStreak > 7) {
      insights.push(`Strong mindfulness practice with ${userProfile.consciousnessData.mindfulnessPractice.meditationStreak}-day meditation streak`);
    }
    
    // Symbol-dream correlations
    const symbolCount = Object.keys(userProfile.consciousnessData.symbolRecognition.personalSymbolDictionary).length;
    const dreamPatternCount = userProfile.consciousnessData.dreamAnalysis.dreamPatterns.length;
    if (symbolCount > 0 && dreamPatternCount > 0) {
      insights.push('Active integration between symbolic awareness and dream analysis detected');
    }
    
    return insights;
  }

  private async generateRecommendationsSummary(userProfile: UserProfile): Promise<string[]> {
    const recommendations = await this.generatePersonalizedRecommendations(userProfile);
    return recommendations.slice(0, 3).map(rec => `${rec.action} (${rec.domain})`);
  }

  private predictGrowthTrajectory(userProfile: UserProfile, domainScores: Record<ConsciousnessDomain, number>): ConsciousnessState['growthTrajectory'] {
    const overallScore = this.calculateOverallScore(domainScores);
    
    // Simple trajectory prediction based on current practices
    let trend: 'ascending' | 'stable' | 'descending' = 'stable';
    let predictedScore = overallScore;
    let confidenceLevel = 0.7;
    
    // Positive indicators
    if (userProfile.consciousnessData.mindfulnessPractice.meditationStreak > 10) {
      trend = 'ascending';
      predictedScore += 5;
      confidenceLevel = 0.85;
    }
    
    if (userProfile.consciousnessData.skillDevelopment.activeSkillTrees.length > 1) {
      predictedScore += 3;
      confidenceLevel += 0.05;
    }
    
    // Recent activity indicators
    const daysSinceLastDream = userProfile.consciousnessData.dreamAnalysis.lastDreamEntry
      ? Math.floor((Date.now() - userProfile.consciousnessData.dreamAnalysis.lastDreamEntry.getTime()) / (1000 * 60 * 60 * 24))
      : 30;
    
    if (daysSinceLastDream > 14) {
      trend = trend === 'ascending' ? 'stable' : 'descending';
      predictedScore -= 2;
      confidenceLevel -= 0.1;
    }
    
    return {
      trend,
      predictedScore: Math.max(0, Math.min(100, Math.round(predictedScore))),
      confidenceLevel: Math.max(0, Math.min(1, confidenceLevel))
    };
  }

  private analyzeDreamSymbolCorrelations(userProfile: UserProfile): ConsciousnessPattern[] {
    const patterns: ConsciousnessPattern[] = [];
    
    const symbols = Object.keys(userProfile.consciousnessData.symbolRecognition.personalSymbolDictionary);
    const dreamPatterns = userProfile.consciousnessData.dreamAnalysis.dreamPatterns;
    
    // Look for common themes
    symbols.forEach(symbol => {
      dreamPatterns.forEach(pattern => {
        const firstPatternWord = pattern.split('_')[0];
        if (pattern.toLowerCase().includes(symbol.toLowerCase()) || (firstPatternWord && symbol.toLowerCase().includes(firstPatternWord))) {
          patterns.push({
            type: 'dream_symbol_correlation',
            description: `Symbol "${symbol}" appears related to dream pattern "${pattern}"`,
            confidence: 0.75,
            domains: [ConsciousnessDomain.SYMBOL_RECOGNITION, ConsciousnessDomain.DREAM_ANALYSIS],
            correlations: { [symbol]: 0.75, [pattern]: 0.75 }
          });
        }
      });
    });
    
    return patterns;
  }

  private analyzeSkillFlowCorrelations(userProfile: UserProfile): ConsciousnessPattern[] {
    const patterns: ConsciousnessPattern[] = [];
    
    const masteryAreas = userProfile.consciousnessData.skillDevelopment.masteryAreas;
    const flowMetrics = Object.keys(userProfile.consciousnessData.flowStates.peakPerformanceMetrics);
    
    masteryAreas.forEach(skill => {
      flowMetrics.forEach(metric => {
        if (metric.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(metric.toLowerCase())) {
          patterns.push({
            type: 'skill_flow_correlation',
            description: `Skill mastery in "${skill}" correlates with flow state in "${metric}"`,
            confidence: 0.8,
            domains: [ConsciousnessDomain.SKILL_DEVELOPMENT, ConsciousnessDomain.FLOW_STATES],
            correlations: { [skill]: 0.8, [metric]: 0.8 }
          });
        }
      });
    });
    
    return patterns;
  }

  private analyzeMindfulnessDevelopmentCorrelations(userProfile: UserProfile): ConsciousnessPattern[] {
    const patterns: ConsciousnessPattern[] = [];
    
    const mindfulnessScore = userProfile.consciousnessData.mindfulnessPractice.presentMomentAwareness;
    const overallDevelopment = this.calculateOverallScore(this.calculateDomainScores(userProfile));
    
    if (Math.abs(mindfulnessScore - overallDevelopment) < 10) {
      patterns.push({
        type: 'mindfulness_development_correlation',
        description: 'Mindfulness practice strongly correlates with overall consciousness development',
        confidence: 0.9,
        domains: [ConsciousnessDomain.MINDFULNESS_PRACTICE],
        correlations: { mindfulness: mindfulnessScore / 100, overall: overallDevelopment / 100 }
      });
    }
    
    return patterns;
  }

  private createDevelopmentRecommendation(domain: ConsciousnessDomain, score: number, _userProfile: UserProfile): PersonalizedRecommendation {
    const recommendations = {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: {
        action: 'Expand personal symbol dictionary through daily symbolic awareness practice',
        rationale: 'Low symbol recognition score indicates need for increased symbolic awareness'
      },
      [ConsciousnessDomain.DREAM_ANALYSIS]: {
        action: 'Establish consistent dream journaling and recall practices',
        rationale: 'Strengthening dream analysis will enhance subconscious integration'
      },
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: {
        action: 'Focus on deliberate practice in identified skill areas',
        rationale: 'Structured skill development will improve competence levels'
      },
      [ConsciousnessDomain.FLOW_STATES]: {
        action: 'Create optimal conditions for flow state experiences',
        rationale: 'Increase frequency and quality of peak performance experiences'
      },
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: {
        action: 'Establish regular mindfulness meditation routine',
        rationale: 'Consistent practice will enhance present-moment awareness'
      }
    };
    
    return {
      domain,
      action: recommendations[domain].action,
      priority: score < 50 ? 'high' : 'medium',
      rationale: recommendations[domain].rationale,
      estimatedImpact: Math.round((70 - score) / 10) // Higher impact for lower scores
    };
  }

  private createAdvancementRecommendation(domain: ConsciousnessDomain, score: number, _userProfile: UserProfile): PersonalizedRecommendation {
    const recommendations = {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: {
        action: 'Explore cross-cultural symbolic interpretations and archetypal patterns',
        rationale: 'Deepen symbolic understanding through advanced interpretation techniques'
      },
      [ConsciousnessDomain.DREAM_ANALYSIS]: {
        action: 'Practice lucid dreaming and active dream engagement',
        rationale: 'Advanced dream work for enhanced subconscious integration'
      },
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: {
        action: 'Mentor others and teach your mastered skills',
        rationale: 'Teaching will deepen mastery and create new growth opportunities'
      },
      [ConsciousnessDomain.FLOW_STATES]: {
        action: 'Experiment with flow state triggers in new domains',
        rationale: 'Expand optimal experience to additional life areas'
      },
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: {
        action: 'Explore advanced meditation techniques and retreats',
        rationale: 'Deepen mindfulness practice through intensive training'
      }
    };
    
    return {
      domain,
      action: recommendations[domain].action,
      priority: 'low',
      rationale: recommendations[domain].rationale,
      estimatedImpact: Math.round((score - 80) / 5) // Moderate impact for optimization
    };
  }

  private formatDomainName(domain: ConsciousnessDomain): string {
    return domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}