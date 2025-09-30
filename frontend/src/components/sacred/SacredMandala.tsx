import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { SacredVisualizationData } from '../../types/consciousness';

interface SacredMandalaProps {
  visualization: SacredVisualizationData;
  breathingSync?: boolean;
  size?: number;
  className?: string;
}

export const SacredMandala: React.FC<SacredMandalaProps> = ({
  visualization,
  breathingSync = true,
  size = 200,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    let animationPhase = 0;

    const drawSacredGeometry = (breathingScale: number) => {
      ctx.clearRect(0, 0, size, size);
      ctx.save();

      // Set canvas center
      ctx.translate(centerX, centerY);

      const { mandalaPattern, energeticFlow } = visualization;

      // Draw mandala rings
      mandalaPattern.rings.forEach((ring) => {
        const adjustedRadius = ring.radius * breathingScale;

        // Create segments around the ring
        for (let i = 0; i < ring.segments; i++) {
          const angle = (i * 2 * Math.PI) / ring.segments;
          const x = Math.cos(angle) * adjustedRadius;
          const y = Math.sin(angle) * adjustedRadius;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + animationPhase * 0.001);

          // Draw sacred symbol based on geometry type
          switch (mandalaPattern.sacredGeometry) {
            case 'flower-of-life':
              drawFlowerOfLifeSegment(ctx, adjustedRadius / 4, ring.color, ring.opacity);
              break;
            case 'metatron':
              drawMetatronSegment(ctx, adjustedRadius / 4, ring.color, ring.opacity);
              break;
            case 'sri-yantra':
              drawSriYantraSegment(ctx, adjustedRadius / 4, ring.color, ring.opacity);
              break;
            default:
              drawDefaultSegment(ctx, adjustedRadius / 4, ring.color, ring.opacity);
          }

          ctx.restore();
        }
      });

      // Draw energetic particles
      energeticFlow.particles.forEach((particle, index) => {
        const particleAngle = animationPhase * energeticFlow.speed + (index * 2 * Math.PI) / energeticFlow.particles.length;
        const x = Math.cos(particleAngle) * particle.x * breathingScale;
        const y = Math.sin(particleAngle) * particle.y * breathingScale;

        ctx.save();
        ctx.translate(x, y);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8);
        gradient.addColorStop(0, particle.color + 'FF');
        gradient.addColorStop(1, particle.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 8 * particle.energy * breathingScale, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();
    };

    const drawFlowerOfLifeSegment = (ctx: CanvasRenderingContext2D, radius: number, color: string, opacity: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;

      // Draw overlapping circles
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        const x = Math.cos(angle) * radius * 0.5;
        const y = Math.sin(angle) * radius * 0.5;

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.5, 0, 2 * Math.PI);
        ctx.stroke();
      }
    };

    const drawMetatronSegment = (ctx: CanvasRenderingContext2D, radius: number, color: string, opacity: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;

      // Draw hexagram with internal structure
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // Draw connecting lines to center
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawSriYantraSegment = (ctx: CanvasRenderingContext2D, radius: number, color: string, opacity: number) => {
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1;

      // Draw triangular patterns
      for (let i = 0; i < 3; i++) {
        const scale = (i + 1) * 0.3;
        ctx.beginPath();
        for (let j = 0; j < 3; j++) {
          const angle = j * 2 * Math.PI / 3 + Math.PI / 6;
          const x = Math.cos(angle) * radius * scale;
          const y = Math.sin(angle) * radius * scale;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    };

    const drawDefaultSegment = (ctx: CanvasRenderingContext2D, radius: number, color: string, opacity: number) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.3, 0, 2 * Math.PI);
      ctx.fill();
    };

    const animate = () => {
      animationPhase += 16; // Roughly 60fps

      let breathingScale = 1;
      if (breathingSync) {
        const { inhaleMs, exhaleMs, pauseMs } = visualization.breathingAnimation;
        const totalCycle = inhaleMs + exhaleMs + pauseMs * 2;
        const cyclePosition = (animationPhase % totalCycle) / totalCycle;

        if (cyclePosition < inhaleMs / totalCycle) {
          // Inhale phase
          const inhaleProgress = (cyclePosition * totalCycle) / inhaleMs;
          breathingScale = 1 + (visualization.breathingAnimation.amplitude / 100) * inhaleProgress;
        } else if (cyclePosition < (inhaleMs + pauseMs) / totalCycle) {
          // Pause after inhale
          breathingScale = 1 + (visualization.breathingAnimation.amplitude / 100);
        } else if (cyclePosition < (inhaleMs + pauseMs + exhaleMs) / totalCycle) {
          // Exhale phase
          const exhaleProgress = ((cyclePosition * totalCycle) - inhaleMs - pauseMs) / exhaleMs;
          breathingScale = 1 + (visualization.breathingAnimation.amplitude / 100) * (1 - exhaleProgress);
        } else {
          // Pause after exhale
          breathingScale = 1;
        }
      }

      drawSacredGeometry(breathingScale);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [visualization, breathingSync, size]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="drop-shadow-lg"
      />

      {/* Sacred energy overlay */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)`
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: visualization.breathingAnimation.inhaleMs / 1000 + visualization.breathingAnimation.exhaleMs / 1000,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};