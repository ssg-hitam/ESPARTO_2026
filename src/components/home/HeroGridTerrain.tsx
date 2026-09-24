"use client";

import React, { useEffect, useRef } from "react";

/**
 * HeroGridTerrain Component
 * 
 * High-performance fluid 3D cyber matrix grid terrain.
 * Renders pulsing, freely undulating perspective rows, columns, and intersection nodes
 * with electrical light pulses travelling dynamically across the grid matrix.
 */
export function HeroGridTerrain() {
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

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Grid configuration
    const cols = width < 768 ? 16 : width < 1200 ? 24 : 32;
    const rows = width < 768 ? 12 : 18;
    const horizonY = height * 0.42;

    // Pulse packets travelling across rows and columns
    interface Pulse {
      type: "col" | "row";
      index: number;
      progress: number;
      speed: number;
      color: string;
    }

    const pulses: Pulse[] = [];
    const PULSE_COLORS = ["#FF007A", "#7928CA", "#00D2FF", "#FF5E00"];

    for (let i = 0; i < 8; i++) {
      pulses.push({
        type: Math.random() < 0.5 ? "col" : "row",
        index: Math.floor(Math.random() * (Math.random() < 0.5 ? cols : rows)),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
        color: PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)],
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Project 3D Grid point to 2D screen coordinates
      const project = (col: number, row: number) => {
        const normCol = (col / (cols - 1)) * 2 - 1; // -1 to 1
        const normRow = row / (rows - 1); // 0 (horizon) to 1 (bottom)

        // Exponential perspective depth
        const depth = Math.pow(normRow, 1.6);
        const screenY = horizonY + depth * (height - horizonY + 40);

        // Fluid 3D wave displacement across rows & columns
        const wave =
          Math.sin(normCol * 4 + time * 1.2) * 12 * depth +
          Math.cos(normRow * 6 - time * 0.9) * 14 * depth +
          Math.sin(normCol * 2 + normRow * 3 + time * 0.7) * 8 * depth;

        const screenX = width / 2 + normCol * (width * 0.65) * (0.2 + depth * 0.85);

        return { x: screenX, y: screenY + wave, depth };
      };

      // 1. Draw Grid Perspective Rows (Horizontal Waving Lines)
      for (let r = 0; r < rows; r++) {
        const normRow = r / (rows - 1);
        const alpha = Math.pow(normRow, 1.2) * 0.55;
        
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = project(c, r);
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        ctx.strokeStyle = `rgba(121, 40, 202, ${alpha})`;
        ctx.lineWidth = 0.75 + normRow * 0.9;
        ctx.stroke();

        // Highlight every 3rd row with magenta accent
        if (r % 3 === 0) {
          ctx.strokeStyle = `rgba(255, 0, 122, ${alpha * 0.4})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 2. Draw Grid Columns (Longitudinal Perspective Lines)
      for (let c = 0; c < cols; c++) {
        const centerDist = Math.abs((c / (cols - 1)) * 2 - 1);
        const colAlpha = (1 - centerDist * 0.4) * 0.45;

        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = project(c, r);
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        ctx.strokeStyle = `rgba(155, 81, 224, ${colAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // 3. Update & Draw Dynamic Light Pulses travelling through the Matrix
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.type = Math.random() < 0.5 ? "col" : "row";
          p.index = Math.floor(Math.random() * (p.type === "col" ? cols : rows));
          p.color = PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)];
        }

        if (p.type === "col" && p.index < cols) {
          const rPos = p.progress * (rows - 1);
          const r0 = Math.floor(rPos);
          const r1 = Math.min(rows - 1, r0 + 1);
          const interp = rPos - r0;

          const p0 = project(p.index, r0);
          const p1 = project(p.index, r1);
          const px = p0.x + (p1.x - p0.x) * interp;
          const py = p0.y + (p1.y - p0.y) * interp;

          // Glowing energy head
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + p0.depth * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "row" && p.index < rows) {
          const cPos = p.progress * (cols - 1);
          const c0 = Math.floor(cPos);
          const c1 = Math.min(cols - 1, c0 + 1);
          const interp = cPos - c0;

          const p0 = project(c0, p.index);
          const p1 = project(c1, p.index);
          const px = p0.x + (p1.x - p0.x) * interp;
          const py = p0.y + (p1.y - p0.y) * interp;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + p0.depth * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
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
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top Ambient Neon Flow Ribbon */}
      <svg
        className="absolute top-0 left-0 w-full h-[180px] opacity-45 mix-blend-screen animate-ribbon-pulse"
        viewBox="0 0 1440 180"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 40 C 300 110, 600 -20, 1000 70 C 1200 120, 1400 30, 1500 50"
          stroke="url(#topRibbonGrad1)"
          strokeWidth="1.8"
          strokeDasharray="4 2"
        />
        <path
          d="M-30 80 C 350 20, 750 150, 1100 40 C 1300 -10, 1450 80, 1520 60"
          stroke="url(#topRibbonGrad2)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="topRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7928CA" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FF007A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="topRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5E00" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#B026FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF007A" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>

      {/* Fluid 3D Cyber Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-85"
      />
    </div>
  );
}
