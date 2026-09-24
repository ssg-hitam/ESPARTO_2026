"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS, TechnicalChapter } from "@/data/chapters";

interface SphereItem {
    chapter: TechnicalChapter;
    phi: number;
    theta: number;
    x: number;
    y: number;
    z: number;
}

/**
 * ChaptersSphereSection Component
 * 
 * Interactive 3D Holographic Spherical Dome of Technical Chapters:
 * - 3D spherical node projection with real-time mouse/touch drag rotation & inertia
 * - Perspective scaling, depth fading, and luminous rim glow
 * - Verified chapter logos rendered with sharp backdrop cards
 * - Touch & pointer drag controls with auto-rotation when idle
 */
export function ChaptersSphereSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.2, y: 0 });
    const [hoveredChapter, setHoveredChapter] = useState<TechnicalChapter | null>(null);

    const isDragging = useRef(false);
    const previousMousePosition = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0.002, y: 0.003 });
    const animFrameId = useRef<number | null>(null);

    // Generate 3D sphere points (repeating the 5 official chapters across 20-25 spherical slots for rich dome density)
    const sphereItems: SphereItem[] = useMemo(() => {
        const totalSlots = 24;
        const items: SphereItem[] = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2;

        for (let i = 0; i < totalSlots; i++) {
            const chapter = TECHNICAL_CHAPTERS[i % TECHNICAL_CHAPTERS.length];
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / totalSlots);

            const x = Math.sin(phi) * Math.cos(theta);
            const y = Math.cos(phi);
            const z = Math.sin(phi) * Math.sin(theta);

            items.push({ chapter, phi, theta, x, y, z });
        }
        return items;
    }, []);

    // Continuous 3D auto-spin and inertia drag physics loop
    useEffect(() => {
        let lastTime = performance.now();

        const updatePhysics = (now: number) => {
            const dt = Math.min((now - lastTime) / 16.67, 2.0);
            lastTime = now;

            if (!isDragging.current) {
                // Friction decay towards smooth auto-spin velocity
                velocity.current.x += (0.0015 - velocity.current.x) * 0.04;
                velocity.current.y += (0.0035 - velocity.current.y) * 0.04;

                setRotation((prev) => ({
                    x: prev.x + velocity.current.x * dt,
                    y: prev.y + velocity.current.y * dt,
                }));
            }

            animFrameId.current = requestAnimationFrame(updatePhysics);
        };

        animFrameId.current = requestAnimationFrame(updatePhysics);

        return () => {
            if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
        };
    }, []);

    // Pointer Drag Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;

        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        velocity.current = {
            x: deltaY * 0.004,
            y: deltaX * 0.004,
        };

        setRotation((prev) => ({
            x: prev.x + velocity.current.x,
            y: prev.y + velocity.current.y,
        }));

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    return (
        <section
            id="chapters"
            aria-label="Participating Technical Chapters and Clubs"
            className="relative py-24 sm:py-32 bg-[#04010e] overflow-hidden border-b border-brand-violet/15 select-none"
        >
            {/* Background Subtle Tech Matrix Dots */}
            <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(rgba(121, 40, 202, 0.4) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
            />

            {/* Atmospheric Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-brand-purple/10 blur-[170px] pointer-events-none mix-blend-screen"
                aria-hidden="true"
            />

            <Container size="lg" className="relative z-10 text-center">

                {/* Header Section matching reference */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/40 bg-surface/80 mb-4 shadow-[0_0_12px_rgba(255,94,0,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-text-primary uppercase">
                            [ COMMUNITY ALLIANCE // TECHNICAL SOCIETIES ]
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight uppercase mb-4">
                        ORGANISERS
                    </h2>

                    {/* Subtitle */}
                    <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
                        ESPARTO 2026 is brought to you by technical chapters and student societies working together to create an unforgettable experience.
                    </p>
                </div>

                {/* 3D Interactive Dome Container */}
                <div
                    ref={containerRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="relative w-full max-w-[720px] h-[400px] sm:h-[480px] lg:h-[540px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing touch-none my-4"
                >
                    {/* Center Holographic Radial Disc */}
                    <div
                        className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full border border-brand-violet/20 bg-gradient-to-tr from-brand-purple/10 via-transparent to-brand-magenta/10 pointer-events-none blur-[1px]"
                        aria-hidden="true"
                    />

                    {/* Projected 3D Chapter Logo Badges */}
                    {sphereItems.map((item, idx) => {
                        // Apply 3D Rotation Matrix
                        const cosX = Math.cos(rotation.x);
                        const sinX = Math.sin(rotation.x);
                        const cosY = Math.cos(rotation.y);
                        const sinY = Math.sin(rotation.y);

                        // Rotate around Y-axis
                        const x1 = item.x * cosY - item.z * sinY;
                        const z1 = item.x * sinY + item.z * cosY;

                        // Rotate around X-axis
                        const y2 = item.y * cosX - z1 * sinX;
                        const z2 = item.y * sinX + z1 * cosX;
                        const x2 = x1;

                        // Spherical Radius (responsive)
                        const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 150 : 220;

                        // Perspective Projection
                        const fov = 380;
                        const scale = fov / (fov + z2 * radius);
                        const screenX = x2 * radius * scale;
                        const screenY = y2 * radius * scale;
                        const alpha = Math.max(0.2, (z2 + 1) / 2); // Closer items are brighter
                        const zIndex = Math.round((z2 + 1) * 100);

                        return (
                            <div
                                key={`${item.chapter.id}-${idx}`}
                                style={{
                                    transform: `translate3d(${screenX}px, ${screenY}px, 0) scale(${Math.max(0.55, scale * 0.95)})`,
                                    opacity: alpha,
                                    zIndex,
                                }}
                                onMouseEnter={() => setHoveredChapter(item.chapter)}
                                onMouseLeave={() => setHoveredChapter(null)}
                                className="absolute w-14 h-14 sm:w-20 sm:h-20 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-white/20 bg-white/95 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex items-center justify-center transition-opacity duration-150 group hover:scale-125 hover:border-brand-magenta hover:shadow-[0_0_30px_rgba(255,0,122,0.8)] hover:z-50 cursor-pointer"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.chapter.logo}
                                        alt={item.chapter.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Hover Information Display Overlay */}
                <div className="min-h-[50px] flex items-center justify-center my-3">
                    {hoveredChapter ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-magenta/40 bg-[#0a0524]/90 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,122,0.25)] animate-in fade-in duration-200">
                            <span className="w-2 h-2 rounded-full bg-brand-magenta" />
                            <span className="font-display font-bold text-xs sm:text-sm text-text-primary uppercase">
                                {hoveredChapter.name}
                            </span>
                            <span className="font-mono text-[11px] text-brand-orange uppercase px-2 py-0.5 rounded bg-brand-orange/10 border border-brand-orange/30">
                                {hoveredChapter.category}
                            </span>
                        </div>
                    ) : (
                        <p className="font-mono text-[11px] sm:text-xs tracking-widest text-text-muted uppercase">
                            [ ◄ DRAG DOME TO EXPLORE • HOVER BADGE TO IDENTIFY ► ]
                        </p>
                    )}
                </div>

            </Container>
        </section>
    );
}
