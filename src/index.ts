import { ConsciousnessEngine } from './core/consciousness-engine';
import { UserProfileService } from './core/user-profile-service';

/**
 * Consciousness Operating System - MVP Implementation
 * 
 * This demonstrates the core functionality of the unified consciousness platform
 * that integrates Symbol Quest, Dream Journal Pro, Skilltree Platform, 
 * User Progression, and Mindful Code tools.
 */
async function demonstrateConsciousnessOS(): Promise<void> {
  console.log('🧠 Consciousness Operating System - MVP Demo');
  console.log('============================================\n');

  // Initialize core services
  const profileService = new UserProfileService();
  const consciousnessEngine = new ConsciousnessEngine();

  // Create a demo user profile
  console.log('1. Creating unified user profile...');
  const profile = await profileService.createProfile('demo@consciousness-os.com');
  console.log(`✅ Created profile: ${profile.id}\n`);

  // Simulate integration data from different systems
  console.log('2. Syncing data from integrated consciousness tools...');
  
  // Symbol Quest data
  await profileService.syncIntegrationData({
    sourceSystem: 'symbol_quest',
    dataType: 'symbol_interpretation',
    payload: {
      symbol: 'tree',
      interpretation: 'growth, stability, and deep roots in consciousness',
      confidence: 0.9
    },
    timestamp: new Date(),
    userId: profile.id,
    syncStatus: 'synced'
  });

  // Dream Journal Pro data
  await profileService.syncIntegrationData({
    sourceSystem: 'dream_journal_pro',
    dataType: 'dream_pattern',
    payload: {
      pattern: 'flying_dreams',
      frequency: 4,
      emotional_tone: 'liberating'
    },
    timestamp: new Date(),
    userId: profile.id,
    syncStatus: 'synced'
  });

  // Skilltree Platform data
  await profileService.syncIntegrationData({
    sourceSystem: 'skilltree_platform',
    dataType: 'skill_mastery',
    payload: {
      skill: 'mindful_programming',
      level: 75,
      category: 'consciousness_integration'
    },
    timestamp: new Date(),
    userId: profile.id,
    syncStatus: 'synced'
  });

  console.log('✅ Synced data from Symbol Quest, Dream Journal Pro, and Skilltree Platform\n');

  // Generate consciousness analysis
  console.log('3. Analyzing consciousness state...');
  const updatedProfile = await profileService.getProfile(profile.id);
  if (updatedProfile) {
    const consciousnessState = await consciousnessEngine.calculateConsciousnessState(updatedProfile);
    
    console.log(`📊 Overall Consciousness Score: ${consciousnessState.overallConsciousnessScore}/100`);
    console.log('📈 Domain Scores:');
    Object.entries(consciousnessState.domainScores).forEach(([domain, score]) => {
      console.log(`   ${domain}: ${score}/100`);
    });
    
    console.log('\n💡 Key Insights:');
    consciousnessState.insights.forEach(insight => {
      console.log(`   • ${insight}`);
    });
    
    console.log('\n🎯 Personalized Recommendations:');
    consciousnessState.recommendations.forEach(rec => {
      console.log(`   • ${rec}`);
    });
    
    console.log(`\n🔮 Growth Trajectory: ${consciousnessState.growthTrajectory.trend} (${Math.round(consciousnessState.growthTrajectory.confidenceLevel * 100)}% confidence)`);
    
    // Get comprehensive consciousness summary
    console.log('\n4. Generating dashboard summary...');
    const summary = await profileService.getConsciousnessSummary(profile.id);
    
    console.log('📋 Consciousness Dashboard Summary:');
    console.log(`   Overall Development: ${summary.overallScore}/100`);
    console.log(`   Growth Trend: ${summary.growthTrend}`);
    console.log('   Recent Activity:');
    console.log(`     • Last Symbol Update: ${summary.recentActivity.lastSymbolUpdate?.toDateString() ?? 'No recent updates'}`);
    console.log(`     • Meditation Streak: ${summary.recentActivity.meditationStreak} days`);
    
    console.log('\n🌟 Consciousness Integration Successfully Demonstrated!');
    console.log('The MVP shows unified data from all consciousness development tools,');
    console.log('AI-powered insights, and personalized growth recommendations.\n');
  }
}

// Run the demonstration
demonstrateConsciousnessOS().catch(console.error);