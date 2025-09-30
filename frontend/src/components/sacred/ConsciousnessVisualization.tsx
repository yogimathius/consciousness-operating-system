import React from 'react';
import { motion } from 'framer-motion';
import type { ConsciousnessState } from '../../types/consciousness';
import { ConsciousnessDomain } from '../../types/consciousness';

interface ConsciousnessVisualizationProps {
  consciousnessState: ConsciousnessState;
  breathingSync?: boolean;
  className?: string;
}

export const ConsciousnessVisualization: React.FC<ConsciousnessVisualizationProps> = ({
  consciousnessState,
  breathingSync = true,
  className = ''
}) => {
  const getDomainColor = (domain: ConsciousnessDomain): string => {
    const colors = {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: '#9932CC', // Purple
      [ConsciousnessDomain.DREAM_ANALYSIS]: '#2E8B57', // Sea Green
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: '#32CD32', // Lime Green
      [ConsciousnessDomain.FLOW_STATES]: '#4169E1', // Royal Blue
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: '#8B4513', // Saddle Brown
    };
    return colors[domain] || '#DAA520';
  };

  const getDomainName = (domain: ConsciousnessDomain): string => {
    const names = {
      [ConsciousnessDomain.SYMBOL_RECOGNITION]: 'Symbol Recognition',
      [ConsciousnessDomain.DREAM_ANALYSIS]: 'Dream Analysis',
      [ConsciousnessDomain.SKILL_DEVELOPMENT]: 'Skill Development',
      [ConsciousnessDomain.FLOW_STATES]: 'Flow States',
      [ConsciousnessDomain.MINDFULNESS_PRACTICE]: 'Mindfulness Practice',
    };
    return names[domain] || domain;
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'ascending': return '�';
      case 'descending': return '�';
      default: return '�';
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'ascending': return '#32CD32';
      case 'descending': return '#FF6347';
      default: return '#DAA520';
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Overall Consciousness Score */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white/90 mb-4">
          Consciousness State
        </h2>

        <div className="relative">
          {/* Sacred circle for overall score */}
          <motion.div
            className="mx-auto w-32 h-32 rounded-full border-4 border-white/20 relative"
            style={{
              background: `conic-gradient(from 0deg, #DAA520 0%, #DAA520 ${consciousnessState.overallConsciousnessScore * 360}deg, transparent ${consciousnessState.overallConsciousnessScore * 360}deg)`
            }}
            animate={breathingSync ? {
              scale: [1, 1.05, 1],
              borderWidth: [4, 6, 4]
            } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-black/80 to-black/60 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.round(consciousnessState.overallConsciousnessScore * 100)}
                </div>
                <div className="text-xs text-white/70">Overall</div>
              </div>
            </div>
          </motion.div>

          {/* Growth trajectory indicator */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: getTrendColor(consciousnessState.growthTrajectory.trend) + '40' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {getTrendIcon(consciousnessState.growthTrajectory.trend)}
          </motion.div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/70">
            Trending {consciousnessState.growthTrajectory.trend} with{' '}
            {Math.round(consciousnessState.growthTrajectory.confidenceLevel * 100)}% confidence
          </p>
          <p className="text-xs text-white/50 mt-1">
            Predicted: {Math.round(consciousnessState.growthTrajectory.predictedScore * 100)}%
          </p>
        </div>
      </motion.div>

      {/* Domain Scores */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-white/90 mb-6 text-center">
          Consciousness Domains
        </h3>

        <div className="space-y-4">
          {Object.entries(consciousnessState.domainScores).map(([domain, score], index) => (
            <motion.div
              key={domain}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white/80">
                  {getDomainName(domain as ConsciousnessDomain)}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: getDomainColor(domain as ConsciousnessDomain) }}
                >
                  {Math.round(score * 100)}%
                </span>
              </div>

              {/* Progress bar with sacred geometry */}
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    background: `linear-gradient(90deg, ${getDomainColor(domain as ConsciousnessDomain)}60 0%, ${getDomainColor(domain as ConsciousnessDomain)} 100%)`
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${score * 100}%`,
                    scale: breathingSync ? [1, 1.02, 1] : 1
                  }}
                  transition={{
                    width: { delay: 0.2 * index, duration: 1.2, ease: "easeOut" },
                    scale: breathingSync ? {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}
                  }}
                >
                  {/* Sacred pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)`
                    }}
                  />
                </motion.div>

                {/* Energetic glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${getDomainColor(domain as ConsciousnessDomain)}40 50%, transparent 100%)`,
                    width: `${score * 100}%`
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">
          Consciousness Insights
        </h3>

        <div className="space-y-3">
          {consciousnessState.insights.slice(0, 3).map((insight, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-white/80 leading-relaxed">
                {insight}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">
          Recommended Practices
        </h3>

        <div className="space-y-3">
          {consciousnessState.recommendations.slice(0, 3).map((recommendation, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(255, 193, 7, 0.2)"
              }}
            >
              <p className="text-sm text-amber-200 leading-relaxed">
                {recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Last updated */}
      <motion.div
        className="text-center text-xs text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Updated {consciousnessState.timestamp.toLocaleTimeString()}
      </motion.div>
    </div>
  );
};