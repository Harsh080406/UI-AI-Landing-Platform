"use client";

import React, { useEffect, useRef, useState } from "react";

// Types for the Canvas Neural Network and 3D Shapes
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Signal {
  from: Particle;
  to: Particle;
  progress: number;
  speed: number;
  color: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Shape3D {
  type: "cube" | "octahedron" | "tetrahedron";
  vertices: Point3D[];
  edges: Edge[];
  xPercent: number;
  yPercent: number;
  size: number;
  rx: number;
  ry: number;
  rz: number;
  rvx: number;
  rvy: number;
  rvz: number;
  phaseX: number;
  phaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftRange: number;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let signals: Signal[] = [];
    let shapes: Shape3D[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    // Set canvas dimensions based on device pixel ratio for retina-sharp renders
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize 3D Shapes
    const initShapes = () => {
      // 1. Cube
      const cubeVertices: Point3D[] = [
        { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
      ];
      const cubeEdges: Edge[] = [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 }, // Back face
        { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 }, // Front face
        { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }  // Connections
      ];

      // 2. Octahedron
      const octVertices: Point3D[] = [
        { x: 0, y: -1.4, z: 0 }, { x: 0, y: 1.4, z: 0 }, // Top, Bottom
        { x: -1, y: 0, z: -1 }, { x: 1, y: 0, z: -1 },
        { x: 1, y: 0, z: 1 }, { x: -1, y: 0, z: 1 }      // Middle ring
      ];
      const octEdges: Edge[] = [
        { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 }, { a: 0, b: 5 }, // Top connections
        { a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 1, b: 5 }, // Bottom connections
        { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 2 }  // Middle ring
      ];

      // 3. Tetrahedron
      const tetVertices: Point3D[] = [
        { x: 1, y: 1, z: 1 }, { x: -1, y: -1, z: 1 },
        { x: -1, y: 1, z: -1 }, { x: 1, y: -1, z: -1 }
      ];
      const tetEdges: Edge[] = [
        { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 },
        { a: 1, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 3 }
      ];

      shapes = [
        {
          type: "cube",
          vertices: cubeVertices,
          edges: cubeEdges,
          xPercent: 0.12,
          yPercent: 0.22,
          size: 35,
          rx: 0.2, ry: 0.4, rz: 0.1,
          rvx: 0.003, rvy: 0.005, rvz: 0.002,
          phaseX: 0, phaseY: Math.PI / 4,
          driftSpeedX: 0.0008, driftSpeedY: 0.0006,
          driftRange: 25
        },
        {
          type: "octahedron",
          vertices: octVertices,
          edges: octEdges,
          xPercent: 0.45,
          yPercent: 0.78,
          size: 40,
          rx: 0.5, ry: 0.2, rz: 0.3,
          rvx: 0.004, rvy: 0.003, rvz: 0.005,
          phaseX: Math.PI, phaseY: 0,
          driftSpeedX: 0.0005, driftSpeedY: 0.0007,
          driftRange: 30
        },
        {
          type: "tetrahedron",
          vertices: tetVertices,
          edges: tetEdges,
          xPercent: 0.82,
          yPercent: 0.28,
          size: 32,
          rx: 0.1, ry: 0.6, rz: 0.4,
          rvx: 0.005, rvy: 0.006, rvz: 0.003,
          phaseX: Math.PI / 2, phaseY: Math.PI * 1.5,
          driftSpeedX: 0.0007, driftSpeedY: 0.0005,
          driftRange: 20
        }
      ];
    };

    // Initialize Particles (Neural Network Nodes)
    const initParticles = () => {
      particles = [];
      signals = [];
      const particleCount = width < 768 ? 30 : 65;
      
      const colors = [
        "rgba(217, 232, 226, 0.85)", // Mint
        "rgba(255, 200, 1, 0.85)",   // Forsythia
        "rgba(255, 153, 50, 0.85)",   // Saffron
        "rgba(241, 246, 244, 0.85)"    // Arctic
      ];

      for (let i = 0; i < particleCount; i++) {
        const baseRadius = 1.2 + Math.random() * 1.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };

    initShapes();
    initParticles();

    // Mouse Tracking Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 3D Rotation Math & projection
    const project = (v: Point3D, shape: Shape3D, cx: number, cy: number) => {
      // 1. Scale
      const x = v.x * shape.size;
      const y = v.y * shape.size;
      const z = v.z * shape.size;

      // 2. Rotate X
      const cosX = Math.cos(shape.rx);
      const sinX = Math.sin(shape.rx);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // 3. Rotate Y
      const cosY = Math.cos(shape.ry);
      const sinY = Math.sin(shape.ry);
      const x2 = x * cosY - z1 * sinY;
      const z2 = x * sinY + z1 * cosY;

      // 4. Rotate Z
      const cosZ = Math.cos(shape.rz);
      const sinZ = Math.sin(shape.rz);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      // 5. Perspective Projection
      const perspective = 320;
      const scale = perspective / (perspective + z2);
      
      return {
        x: cx + x3 * scale,
        y: cy + y3 * scale,
        depth: z2
      };
    };

    // Main Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // --- DRAW INTERACTIVE NEURAL NETWORK ---
      const maxDistance = 125;

      // 1. Update and Draw Particles
      particles.forEach(p => {
        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap at edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.05;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Pulse size
        p.pulsePhase += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.5;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Subtle glow for colored nodes
        if (p.color !== "rgba(241, 246, 244, 0.85)") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace("0.85", "0.12");
          ctx.fill();
        }
      });

      // 2. Draw Synapses (Connecting lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(241, 246, 244, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Connections to Mouse
      if (mouse.active) {
        particles.forEach(p => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 200, 1, ${opacity})`; // Forsythia colored interactive lines
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      // 4. Update and Draw Signals
      // Spawn new signals randomly if below cap
      if (signals.length < 6 && Math.random() < 0.02) {
        const startIndex = Math.floor(Math.random() * particles.length);
        const pStart = particles[startIndex];
        // Find close particles as potential targets
        const targets: Particle[] = [];
        particles.forEach(p => {
          if (p !== pStart) {
            const dist = Math.sqrt((p.x - pStart.x) ** 2 + (p.y - pStart.y) ** 2);
            if (dist < maxDistance) targets.push(p);
          }
        });

        if (targets.length > 0) {
          const pEnd = targets[Math.floor(Math.random() * targets.length)];
          signals.push({
            from: pStart,
            to: pEnd,
            progress: 0,
            speed: 0.015 + Math.random() * 0.02,
            color: Math.random() > 0.5 ? "rgba(255, 200, 1, 0.95)" : "rgba(255, 153, 50, 0.95)"
          });
        }
      }

      // Update and render active signals
      signals = signals.filter(sig => {
        sig.progress += sig.speed;
        
        if (sig.progress >= 1) {
          // 65% chance to propagate to next node
          if (Math.random() < 0.65) {
            const targets: Particle[] = [];
            particles.forEach(p => {
              if (p !== sig.to && p !== sig.from) {
                const dist = Math.sqrt((p.x - sig.to.x) ** 2 + (p.y - sig.to.y) ** 2);
                if (dist < maxDistance) targets.push(p);
              }
            });

            if (targets.length > 0) {
              sig.from = sig.to;
              sig.to = targets[Math.floor(Math.random() * targets.length)];
              sig.progress = 0;
              sig.speed = 0.015 + Math.random() * 0.02;
              return true; // Keep signal alive, redirected
            }
          }
          return false; // Terminate signal
        }

        // Draw signal packet
        const x = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
        const y = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = sig.color.replace("0.95", "0.2");
        ctx.fill();

        return true;
      });

      // --- DRAW FLOATING 3D ROTATING SHAPES ---
      shapes.forEach(shape => {
        // Increment drift phases
        shape.phaseX += shape.driftSpeedX;
        shape.phaseY += shape.driftSpeedY;

        // Calculate current screen coordinates with drift
        const cx = shape.xPercent * width + Math.sin(shape.phaseX) * shape.driftRange;
        const cy = shape.yPercent * height + Math.cos(shape.phaseY) * shape.driftRange;

        // Apply rotation velocities
        shape.rx += shape.rvx;
        shape.ry += shape.rvy;
        shape.rz += shape.rvz;

        // Project vertices to 2D
        const projected = shape.vertices.map(v => project(v, shape, cx, cy));

        // Draw Edges
        shape.edges.forEach(edge => {
          const pA = projected[edge.a];
          const pB = projected[edge.b];

          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          // Make edges slightly brighter if they are in the front (depth < 0)
          const avgDepth = (pA.depth + pB.depth) / 2;
          const maxDepthVal = shape.size * 1.5;
          const depthRatio = Math.max(0, Math.min(1, (avgDepth + maxDepthVal) / (maxDepthVal * 2)));
          const opacity = 0.03 + (1 - depthRatio) * 0.08; // Front lines are more visible

          ctx.strokeStyle = `rgba(219, 232, 226, ${opacity})`; // Translucent Mint wireframe
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });

        // Draw glowing vertex nodes
        projected.forEach(p => {
          const depthRatio = Math.max(0, Math.min(1, (p.depth + shape.size) / (shape.size * 2)));
          const opacity = 0.04 + (1 - depthRatio) * 0.16;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 1, ${opacity})`; // Forsythia vertex nodes
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="zone-dark min-h-[90vh] flex items-center justify-center py-20 lg:py-28 relative overflow-hidden"
    >
      {/* 1. Global Column Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* 2. CSS Noise Texture Overlay */}
      <div className="hero-noise-overlay" />

      {/* 3. High-Performance Interactive Canvas (Background) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none opacity-80"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Heading + Subtext + CTA */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-8 max-w-xl">
          
          {/* H1 Title */}
          <h1 
            className="hero-h1 font-body font-extrabold text-5xl sm:text-6xl md:text-[68px] leading-[1.05] text-arctic tracking-tight select-none"
            style={{ willChange: "transform, opacity" }}
          >
            Power your<br />
            future with AI
          </h1>
          
          {/* Subtext */}
          <p 
            className="hero-sub font-body text-sm sm:text-base text-mint/80 max-w-md leading-relaxed select-none"
            style={{ willChange: "transform, opacity" }}
          >
            Deploy custom enterprise agents and automate complex workflows. Scale your intelligence with AXON today.
          </p>
          
          {/* CTA Button */}
          <div 
            className="hero-cta pt-2"
            style={{ willChange: "transform, opacity" }}
          >
            <a
              href="#product-builder"
              className="group inline-flex items-center bg-white text-[#172B36] font-body font-semibold text-sm rounded-md py-1.5 pl-2.5 pr-6 hover:bg-white/95 transition-colors focus-visible:outline-none"
            >
              {/* Left-side Black Square with White Node/Branch Icon */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#172B36] rounded shrink-0 transition-colors mr-3">
                <svg 
                  className="w-4 h-4 text-white fill-none stroke-current" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Workflow node icon"
                >
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="M9 12h4m0 0l5-6m-5 6l5 6" />
                </svg>
              </div>
              <span className="tracking-wide">Build A Workflow</span>
            </a>
          </div>

        </div>

        {/* Right Column: Stacked Large Links + Brand Context + Partner Logos */}
        <div 
          className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center text-left lg:text-right space-y-12 w-full relative"
          style={{ animation: "fadeUp 400ms 200ms both ease-out", willChange: "transform, opacity" }}
        >
          
          {/* Decorative Subtle SVG Diagram (Gives context to the core) */}
          <div className="absolute right-0 lg:-right-12 top-[-60px] w-[320px] sm:w-[400px] h-[300px] pointer-events-none z-0 opacity-10 select-none">
            <svg className="w-full h-full text-white" viewBox="0 0 200 150">
              <path d="M 20,40 L 80,30" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3,3" />
              <path d="M 20,90 L 80,30" stroke="currentColor" strokeWidth="0.7" />
              <path d="M 20,90 L 80,80" stroke="currentColor" strokeWidth="0.7" strokeDasharray="4,4" />
              <path d="M 80,30 L 140,40" stroke="currentColor" strokeWidth="0.7" />
              <path d="M 80,30 L 140,100" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3,3" />
              <path d="M 80,80 L 140,100" stroke="currentColor" strokeWidth="0.7" />
              <path d="M 140,40 L 180,70" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2,2" />
              <path d="M 140,100 L 180,70" stroke="currentColor" strokeWidth="0.7" />
              <circle cx="20" cy="40" r="2.5" fill="var(--color-mint)" />
              <circle cx="20" cy="90" r="2.5" fill="var(--color-mint)" />
              <circle cx="80" cy="30" r="3" fill="var(--color-forsythia)" />
              <circle cx="80" cy="80" r="3" fill="var(--color-mint)" />
              <circle cx="140" cy="40" r="3" fill="var(--color-mint)" />
              <circle cx="140" cy="100" r="3" fill="var(--color-saffron)" />
              <circle cx="180" cy="70" r="3.5" fill="var(--color-forsythia)" />
            </svg>
          </div>

          {/* Large Stacked Links (With premium smooth slide-in hover arrow effect) */}
          <div className="flex flex-col space-y-5 font-body font-bold text-3xl sm:text-[40px] tracking-tight text-white/90 select-none relative z-10">
            <span className="group flex items-center gap-3 hover:text-forsythia cursor-pointer transition-all duration-300 transform hover:translate-x-[-8px] lg:justify-end">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-forsythia font-mono text-xl leading-none">→</span>
              <span>AI Strategy</span>
            </span>
            <span className="group flex items-center gap-3 hover:text-forsythia cursor-pointer transition-all duration-300 transform hover:translate-x-[-8px] lg:justify-end">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-forsythia font-mono text-xl leading-none">→</span>
              <span>Custom Agents</span>
            </span>
            <span className="group flex items-center gap-3 hover:text-forsythia cursor-pointer transition-all duration-300 transform hover:translate-x-[-8px] lg:justify-end">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-forsythia font-mono text-xl leading-none">→</span>
              <span>Process Automation</span>
            </span>
            <span className="group flex items-center gap-3 hover:text-forsythia cursor-pointer transition-all duration-300 transform hover:translate-x-[-8px] lg:justify-end">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-forsythia font-mono text-xl leading-none">→</span>
              <span>Data Intelligence</span>
            </span>
          </div>

          {/* Partner Logo Strip (Aetna, Cigna, Anthem) */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-10 opacity-70 hover:opacity-100 transition-opacity select-none pt-4 relative z-10">
            {/* Logo 1: aetna */}
            <div className="flex items-center font-display font-extrabold text-lg text-white tracking-tighter">
              <span className="text-purple-400">ae</span>tna
            </div>

            {/* Logo 2: cigna */}
            <div className="flex items-center gap-1 font-display font-extrabold text-lg text-white tracking-tighter">
              <svg className="w-4 h-4 fill-forsythia" viewBox="0 0 24 24" role="img" aria-label="Cigna logo star">
                <path d="M12 2L9 9H2l6 5-3 8 7-5 7 5-3-8 6-5h-7z" />
              </svg>
              <span>cigna</span>
            </div>

            {/* Logo 3: Anthem */}
            <div className="flex items-center gap-1.5 font-body font-extrabold text-lg text-white tracking-tight">
              <span>Anthem</span>
              <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 16 16" role="img" aria-label="Anthem logo squares">
                <rect x="0" y="0" width="7" height="7" rx="0.5" />
                <rect x="9" y="0" width="7" height="7" rx="0.5" />
                <rect x="0" y="9" width="7" height="7" rx="0.5" />
                <rect x="9" y="9" width="7" height="4" rx="0.5" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
