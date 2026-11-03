import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  type: 'leaf' | 'seed';
  color: string;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(16, 185, 129, ', // emerald
      'rgba(34, 197, 94, ',  // green
      'rgba(245, 158, 11, ', // golden amber
      'rgba(20, 184, 166, ', // teal
    ];

    const particleCount = Math.min(22, Math.max(12, Math.floor(window.innerWidth / 90)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: -(Math.random() * 0.45 + 0.15), // gently float upwards
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.35,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.25 + 0.08,
        type: Math.random() > 0.4 ? 'leaf' : 'seed',
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawLeaf = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.strokeStyle = `${p.color}${p.opacity * 1.3})`;
      ctx.lineWidth = 1;

      if (p.type === 'leaf') {
        // Draw elegant leaf shape with bezier curves
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
        ctx.fill();

        // Central vein
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.85);
        ctx.lineTo(0, p.size * 0.85);
        ctx.stroke();
      } else {
        // Bio spore / seed circle
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let step = 0;
    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(step * 0.02 + i) * 0.3;
        p.angle += p.angularSpeed;

        // Wrap around vertically & horizontally
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        drawLeaf(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.85,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};
