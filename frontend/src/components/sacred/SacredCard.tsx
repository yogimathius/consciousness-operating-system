import React from 'react';
import { motion } from 'framer-motion';
import type { ApplicationIntegration } from '../../types/consciousness';

interface SacredCardProps {
  application: ApplicationIntegration;
  breathingSync?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SacredCard: React.FC<SacredCardProps> = ({
  application,
  breathingSync = false,
  onClick,
  className = ''
}) => {
  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const getStatusColor = (isConnected: boolean) => {
    return isConnected
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      : 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  };

  const getMetricDisplayValue = (value: any) => {
    if (typeof value === 'number') {
      return value > 1 ? Math.round(value) : (value * 100).toFixed(0) + '%';
    }
    return String(value);
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-sm border
        border-white/20 bg-gradient-to-br from-white/10 to-white/5
        hover:from-white/15 hover:to-white/10 transition-all duration-500
        group cursor-pointer ${className}
      `}
      style={{
        borderColor: application.sacredTheme.primaryColor + '40',
        boxShadow: `0 8px 32px ${application.sacredTheme.primaryColor}20`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: breathingSync ? [1, 1.02, 1] : 1
      }}
      transition={{
        duration: 0.6,
        scale: breathingSync ? {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}
      }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        boxShadow: `0 12px 40px ${application.sacredTheme.primaryColor}30`
      }}
      onClick={onClick}
    >
      {/* Sacred geometry background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${application.sacredTheme.primaryColor}40 0%, transparent 50%),
                       radial-gradient(circle at 70% 70%, ${application.sacredTheme.primaryColor}20 0%, transparent 50%)`
        }}
      />

      {/* Header with symbol and status */}
      <div className="relative p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className="text-2xl"
              animate={breathingSync ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {application.sacredTheme.symbol}
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg text-white/90">
                {application.name}
              </h3>
              <p className="text-sm text-white/60 capitalize">
                {application.type.replace('-', ' ')}
              </p>
            </div>
          </div>

          <div className={`
            px-3 py-1 rounded-full text-xs font-medium border
            ${getStatusColor(application.isConnected)}
          `}>
            {application.isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Mantra text */}
        <motion.p
          className="text-sm text-white/70 italic text-center"
          style={{ color: application.sacredTheme.primaryColor + 'CC' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "{application.sacredTheme.mantraText}"
        </motion.p>
      </div>

      {/* Recent activity */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-white/80 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {application.data.recentActivity.slice(0, 3).map((activity, index) => (
            <motion.div
              key={index}
              className="text-sm text-white/70 pl-3 border-l-2 border-white/20"
              style={{ borderLeftColor: application.sacredTheme.primaryColor + '60' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {activity}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-medium text-white/80 mb-3">Key Metrics</h4>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(application.data.metrics).slice(0, 3).map(([key, value], index) => (
            <motion.div
              key={key}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + 0.1 * index }}
            >
              <div
                className="text-lg font-bold"
                style={{ color: application.sacredTheme.primaryColor }}
              >
                {getMetricDisplayValue(value)}
              </div>
              <div className="text-xs text-white/60 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Last sync indicator */}
      <div className="absolute bottom-3 right-3">
        <div className="flex items-center space-x-1 text-xs text-white/50">
          <motion.div
            className={`w-2 h-2 rounded-full ${
              application.isConnected ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
            animate={application.isConnected ? {
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span>{formatLastSync(application.lastSync)}</span>
        </div>
      </div>

      {/* Sacred energy flow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r opacity-20"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${application.sacredTheme.primaryColor}40 50%, transparent 70%)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};