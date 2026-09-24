"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

const COLORS = [
  "rgba(155, 81, 224, ", // purple
  "rgba(255, 0, 122, ",  // magenta
  "rgba(255, 94, 0, ",   // orange
  "rgba(0, 210, 255, ",  // cyan
];

/**
 * HeroParticles Component
 * 
 * High-performance, lightweight 2D canvas particle & network field.
 * Responsively scales density and respects prefers-reduced-motion.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Responsive particle count: ~15 on mobile, ~35 on desktop
    const count = width < 768 ? 16 : width < 1200 ? 28 : 42;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() < 0.2 ? 2 + Math.random() * 1.5 : 1 + Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      // Draw subtle connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width < 768 ? 70 : 100;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(155, 81, 224, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha pulsing
        const currentAlpha = p.baseAlpha + Math.sin(t * 2 + i) * 0.15;

        // Outer glow
        ctx.fillStyle = `${p.color}${Math.max(0, currentAlpha * 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-75"
      aria-hidden="true"
    />
  );
}
