"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SectionEyebrow from "./SectionEyebrow";

// Shared refs for Three.js animation to prevent React re-renders from causing lag
interface MouseState {
  x: number;
  y: number;
}

function ThreeSphere({ sectionMouse, sectionClickPulse }: { sectionMouse: React.MutableRefObject<MouseState>, sectionClickPulse: React.MutableRefObject<number> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = 220;
    const height = 220;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dense outer wireframe sphere
    const geometry = new THREE.SphereGeometry(1.6, 28, 28);
    const material = new THREE.MeshBasicMaterial({
      color: 0xF1F6F4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Rotated inner wireframe for complexity
    const geometryInner = new THREE.IcosahedronGeometry(1.2, 2);
    const materialInner = new THREE.MeshBasicMaterial({
      color: 0xFFC801, // Forsythia
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const sphereInner = new THREE.Mesh(geometryInner, materialInner);
    scene.add(sphereInner);

    let animationFrameId: number;
    const animate = () => {
      // Smoothly interpolate rotations to follow the cursor (magnetic effect)
      const targetRX = sectionMouse.current.y * 0.6;
      const targetRY = sectionMouse.current.x * 0.6;
      
      sphere.rotation.x += (targetRX - sphere.rotation.x) * 0.06 + 0.0008;
      sphere.rotation.y += (targetRY - sphere.rotation.y) * 0.06 + 0.0022;

      sphereInner.rotation.x -= (targetRX + sphereInner.rotation.x) * 0.06 + 0.001;
      sphereInner.rotation.y += (targetRY - sphereInner.rotation.y) * 0.06 + 0.0012;

      // Pulse physics
      sectionClickPulse.current *= 0.93; // exponential decay
      
      const s = 1.0 + sectionClickPulse.current * 0.18;
      sphere.scale.set(s, s, s);
      material.opacity = 0.22 + sectionClickPulse.current * 0.38;

      const sInner = 1.0 + sectionClickPulse.current * 0.1;
      sphereInner.scale.set(sInner, sInner, sInner);
      materialInner.opacity = 0.08 + sectionClickPulse.current * 0.42;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      geometryInner.dispose();
      materialInner.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [sectionMouse, sectionClickPulse]);

  return (
    <div 
      ref={containerRef} 
      className="w-[220px] h-[220px] pointer-events-none select-none" 
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default function ProductBuilder() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"agent" | "chat">("agent");
  const [chatInputValue, setChatInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Daemon AI core online. Ask me to modify nodes, query scale metrics, or trigger test workflows." }
  ]);

  // Mouse & click state refs to pass to ThreeSphere without React re-render overhead
  const sectionMouse = useRef<MouseState>({ x: 0, y: 0 });
  const sectionClickPulse = useRef<number>(0);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Nodes workspace state
  const [nodes, setNodes] = useState([
    { id: "node-1", type: "email", label: "Email Trigger (IMAP)", icon: "✉️", x: 25, y: 80, width: 95, height: 52, status: "1 Item" },
    { id: "node-2", type: "edit", label: "Edit Fields (Manual)", icon: "✏️", x: 155, y: 150, width: 95, height: 52, status: "1 Item" },
    { id: "node-3", type: "agent", label: "AI Agent", sublabel: "Tools Agent", icon: "⚡", x: 285, y: 60, width: 130, height: 52, active: true },
    { id: "node-4", type: "code", label: "Code", icon: "</>", x: 445, y: 160, width: 95, height: 52, status: "1 Item" },
    { id: "node-5", type: "edit1", label: "Edit Fields1 (Manual)", icon: "✏️", x: 575, y: 70, width: 95, height: 52, status: "1 Item" },
  ]);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track global mouse coordinates for the 3D sphere magnetic look-at effect
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      sectionMouse.current = { x: nx, y: ny };
    };

    const handleGlobalClick = () => {
      sectionClickPulse.current = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [mounted]);

  // Handle dynamic node card dragging (Mouse & Touch compatible)
  const startDrag = (id: string, clientX: number, clientY: number) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    setActiveDragId(id);
    dragOffset.current = {
      x: clientX - node.x,
      y: clientY - node.y
    };
  };

  useEffect(() => {
    if (!activeDragId) return;

    const handleMove = (clientX: number, clientY: number) => {
      const workspace = workspaceRef.current;
      if (!workspace) return;

      const rect = workspace.getBoundingClientRect();
      const node = nodes.find(n => n.id === activeDragId);
      if (!node) return;

      let newX = clientX - rect.left - dragOffset.current.x;
      let newY = clientY - rect.top - dragOffset.current.y;

      // Constrain inside canvas grid boundaries
      const maxX = rect.width - node.width;
      const maxY = rect.height - node.height;
      newX = Math.max(5, Math.min(newX, maxX - 5));
      newY = Math.max(5, Math.min(newY, maxY - 5));

      setNodes(prev => prev.map(n => n.id === activeDragId ? { ...n, x: newX, y: newY } : n));
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleEnd = () => {
      setActiveDragId(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [activeDragId, nodes]);

  // Scroll to bottom of chat whenever messages update
  useEffect(() => {
    if (activeTab === "chat" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  // Send message simulation
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInputValue.trim()) return;

    const userText = chatInputValue.trim();
    const newMessages = [...chatMessages, { sender: "user" as const, text: userText }];
    setChatMessages(newMessages);
    setChatInputValue("");

    // Simulate smart AI responses based on keywords
    setTimeout(() => {
      let aiResponse = "Daemon AI optimizing sequence nodes for high-throughput execution...";
      const query = userText.toLowerCase();

      if (query.includes("workflow") || query.includes("node") || query.includes("agent")) {
        aiResponse = "Analyzing node layout... I suggest positioning your 'AI Agent' as the central decision hub, surrounded by 'Email Trigger' and 'Code' modules.";
      } else if (query.includes("scale") || query.includes("load") || query.includes("throughput")) {
        aiResponse = "AXON pipelines scale horizontally. All 5 active nodes in your editor canvas are running in highly optimized container pools. Uptime is at 99.99%.";
      } else if (query.includes("status") || query.includes("health") || query.includes("latency")) {
        aiResponse = "System Diagnostics: All nodes healthy. Sync latency: 42ms. Total workflow tasks processed: 10.4M. Active sync SLA: 99.99%.";
      } else if (query.includes("cigna") || query.includes("aetna")) {
        aiResponse = "Enterprise databases connected. Member health record pipelines are executing with zero data leakages under secure governance.";
      }

      setChatMessages(prev => [...prev, { sender: "ai" as const, text: aiResponse }]);
      
      // Trigger a 3D sphere rotation flash when receiving response
      sectionClickPulse.current = 1.0;
    }, 650);
  };

  // Generate beautiful dynamic curved SVG paths connecting nodes in sequence
  const getSvgPath = () => {
    let pathStr = "";
    for (let i = 0; i < nodes.length - 1; i++) {
      const n1 = nodes[i];
      const n2 = nodes[i + 1];
      const x1 = n1.x + n1.width;
      const y1 = n1.y + n1.height / 2;
      const x2 = n2.x;
      const y2 = n2.y + n2.height / 2;

      // Control points for a smooth horizontal S-curve
      const cp1x = x1 + Math.abs(x2 - x1) * 0.45;
      const cp1y = y1;
      const cp2x = x2 - Math.abs(x2 - x1) * 0.45;
      const cp2y = y2;

      if (i === 0) {
        pathStr += `M ${x1},${y1}`;
      } else {
        pathStr += ` L ${x1},${y1}`;
      }
      pathStr += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
    }
    return pathStr;
  };

  return (
    <section 
      id="product-builder" 
      className="zone-dark py-32 border-b border-white/5 relative overflow-hidden"
    >
      {/* Global Column Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Hatch Eyebrow */}
        <div data-animate className="mb-8">
          <SectionEyebrow label="OUR PRODUCT" />
        </div>

        {/* Heading & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6">
            <h2 
              data-animate
              data-delay="1"
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-[64px] leading-[1.05] text-arctic tracking-tight select-none"
            >
              Build logic<br />
              at scale
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p 
              data-animate
              data-delay="2"
              className="font-body text-sm sm:text-base text-mint/70 leading-relaxed max-w-lg select-none"
            >
              Design, deploy, and manage sophisticated AI workflows through an intuitive visual interface. Drag nodes, toggle tabs, and test logic instantly.
            </p>
          </div>
        </div>

        {/* Interactive Node Editor Canvas Workspace */}
        <div 
          data-animate
          data-delay="3"
          className="w-full h-[520px] bg-[#0d161a] rounded-xl border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Canvas Sub-Header bar */}
          <div className="w-full border-b border-white/10 px-4 py-3 flex items-center justify-between bg-black/40 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forsythia animate-pulse" />
              <span className="font-mono text-[9px] tracking-wider text-arctic/40 uppercase">
                logic_grid_editor_v2.1.0 // active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[8px] text-arctic/60 uppercase">
                {activeTab === "agent" ? "builder mode" : "terminal mode"}
              </div>
              <div className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[8px] text-forsythia uppercase font-bold">
                interactive *
              </div>
            </div>
          </div>

          {/* Main Workspace (Split into Sidebar and Canvas Grid) */}
          <div className="flex-1 flex relative overflow-hidden">
            
            {/* Left Sidebar Layout (180px) */}
            <div className="w-[180px] border-r border-white/10 p-4 flex flex-col justify-between bg-black/30 shrink-0 z-10 select-none">
              {/* Top Interactive Tabs */}
              <div className="flex flex-col gap-2.5">
                {/* Tab 1: AI AGENT */}
                <button
                  type="button"
                  onClick={() => setActiveTab("agent")}
                  className={`w-full px-3 py-2.5 rounded font-display text-[10px] tracking-wider uppercase text-center transition-all duration-200 focus-visible:outline-none ${
                    activeTab === "agent"
                      ? "bg-white text-[#172B36] font-extrabold shadow-sm"
                      : "border border-white/10 text-arctic/60 hover:bg-white/5 font-bold"
                  }`}
                >
                  AI AGENT
                </button>
                
                {/* Tab 2: AI CHAT */}
                <div className="relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className={`w-full px-3 py-2.5 rounded font-display text-[10px] tracking-wider uppercase text-center transition-all duration-200 focus-visible:outline-none ${
                      activeTab === "chat"
                        ? "bg-white text-[#172B36] font-extrabold shadow-sm"
                        : "border border-white/10 text-arctic/60 hover:bg-white/5 font-bold"
                    }`}
                  >
                    AI CHAT
                  </button>
                  {/* "You" Pill */}
                  <span className="absolute -right-1.5 -top-1 bg-forsythia text-noir font-display font-bold text-[7px] tracking-wider uppercase px-1 rounded select-none pointer-events-none z-20">
                    You
                  </span>
                </div>
              </div>

              {/* Bottom STACK Toolbox */}
              <div className="space-y-3">
                <span className="font-display font-bold text-[8px] tracking-widest text-arctic/40 uppercase block">
                  STACK TOOLBOX
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab text-xs active:cursor-grabbing transition-colors" title="Folder node">
                    📁
                  </div>
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab text-xs active:cursor-grabbing transition-colors" title="Settings node">
                    ⚙️
                  </div>
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab text-xs active:cursor-grabbing transition-colors" title="Favorite node">
                    ★
                  </div>
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab text-xs active:cursor-grabbing transition-colors" title="Secure shield node">
                    🛡️
                  </div>
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab font-mono text-[10px] text-arctic/50 font-bold active:cursor-grabbing transition-colors" title="Manual custom node">
                    M
                  </div>
                  <div className="aspect-square bg-noir border border-white/10 hover:border-forsythia/30 rounded flex items-center justify-center cursor-grab text-xs active:cursor-grabbing transition-colors" title="Add new node">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Right Workspace Area */}
            <div className="flex-1 relative overflow-hidden bg-[#0a1114]">
              
              {/* Three.js dense rotating sphere placed in background */}
              {mounted && (
                <div className="absolute top-[10%] left-[25%] pointer-events-none z-0 opacity-20 mix-blend-screen select-none">
                  <ThreeSphere sectionMouse={sectionMouse} sectionClickPulse={sectionClickPulse} />
                </div>
              )}

              {/* View 1: Node Builder Grid (Active state for Tab 1) */}
              <div 
                ref={workspaceRef}
                className={`absolute inset-0 p-6 overflow-hidden transition-all duration-300 ${
                  activeTab === "agent" 
                    ? "opacity-100 scale-100 pointer-events-auto" 
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Connecting Dashed SVG Line Chain */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {nodes.length > 1 && (
                    <path 
                      d={getSvgPath()} 
                      fill="none" 
                      stroke="rgba(255,255,255,0.18)" 
                      strokeWidth="2.2" 
                      strokeDasharray="5,5" 
                    />
                  )}
                  {/* Dynamic Port connection dots */}
                  {nodes.map((node, index) => {
                    const hasInput = index > 0;
                    const hasOutput = index < nodes.length - 1;
                    const inputX = node.x;
                    const inputY = node.y + node.height / 2;
                    const outputX = node.x + node.width;
                    const outputY = node.y + node.height / 2;

                    return (
                      <g key={node.id}>
                        {hasInput && (
                          <circle 
                            cx={inputX} 
                            cy={inputY} 
                            r="3" 
                            fill="var(--color-forsythia)" 
                            className="animate-pulse"
                          />
                        )}
                        {hasOutput && (
                          <circle 
                            cx={outputX} 
                            cy={outputY} 
                            r="3" 
                            fill="var(--color-forsythia)" 
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Draggable Node cards */}
                {nodes.map((node) => {
                  const isAgent = node.type === "agent";
                  return (
                    <div
                      key={node.id}
                      onMouseDown={(e) => {
                        if (e.button !== 0) return;
                        startDrag(node.id, e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        if (e.touches.length === 0) return;
                        startDrag(node.id, e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      style={{
                        transform: `translate3d(${node.x}px, ${node.y}px, 0)`,
                        width: `${node.width}px`,
                        height: `${node.height}px`,
                        cursor: activeDragId === node.id ? "grabbing" : "grab",
                        touchAction: "none"
                      }}
                      className={`absolute rounded-md p-2 flex shadow-lg select-none transition-shadow z-10 ${
                        isAgent 
                          ? "bg-black border-2 border-forsythia flex items-center gap-2" 
                          : "bg-black border border-white/25 flex flex-col justify-between"
                      } ${activeDragId === node.id ? "shadow-2xl border-forsythia/80 ring-2 ring-forsythia/10 scale-[1.02]" : "hover:border-white/50"}`}
                    >
                      {isAgent ? (
                        <>
                          <div className="p-1 rounded bg-forsythia/15 text-forsythia text-xs select-none pointer-events-none">
                            {node.icon}
                          </div>
                          <div className="flex flex-col justify-center text-left select-none pointer-events-none">
                            <span className="font-display font-bold text-[9px] text-white leading-none">{node.label}</span>
                            <span className="font-mono text-[7px] text-arctic/40 mt-0.5">{node.sublabel}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center w-full select-none pointer-events-none">
                            {node.icon === "</>" ? (
                              <span className="text-xs font-mono font-bold text-arctic/80">&lt;/&gt;</span>
                            ) : (
                              <span className="text-xs">{node.icon}</span>
                            )}
                            <span className="text-[7px] text-arctic/40">{node.status}</span>
                          </div>
                          <span className="font-mono text-[7.5px] text-arctic/70 tracking-tight text-left block truncate w-full select-none pointer-events-none">
                            {node.label}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* View 2: Simulated AI Chat Terminal (Active state for Tab 2) */}
              <div 
                className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-300 ${
                  activeTab === "chat" 
                    ? "opacity-100 scale-100 pointer-events-auto" 
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Scrollable messages log */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-mono text-[10px] leading-relaxed custom-scrollbar">
                  {chatMessages.map((msg, idx) => {
                    const isAi = msg.sender === "ai";
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col space-y-1 max-w-[85%] ${
                          isAi ? "items-start text-left mr-auto" : "items-end text-right ml-auto"
                        }`}
                      >
                        {/* Sender Label */}
                        <div className="flex items-center gap-1.5 text-[8px] tracking-wider text-arctic/40 uppercase font-bold select-none">
                          {isAi ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-forsythia" />
                              <span>daemon ai</span>
                            </>
                          ) : (
                            <span>you</span>
                          )}
                        </div>
                        {/* Bubble Container */}
                        <div 
                          className={`rounded px-3 py-2.5 border ${
                            isAi 
                              ? "bg-black/50 border-white/10 text-arctic" 
                              : "bg-[#114C5A]/30 border-nocturnal/35 text-[#D9E8E2]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef} />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Chat / Command Input Bar */}
          <form 
            onSubmit={handleSendMessage}
            className="w-full border-t border-white/10 p-3 bg-black/30 flex items-center gap-3 select-none z-10"
          >
            {/* + Tools Outlined Button */}
            <button
              type="button"
              className="px-3.5 py-2 border border-white/20 hover:border-white/40 text-arctic font-display font-bold text-[10px] tracking-wider uppercase rounded transition-colors focus-visible:outline-none shrink-0"
            >
              + Tools
            </button>
            {/* TextInput bar */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={chatInputValue}
                onChange={(e) => setChatInputValue(e.target.value)}
                placeholder={
                  activeTab === "agent" 
                    ? "Switch to AI CHAT tab to trigger command logs..." 
                    : "Type 'scale', 'latency', 'workflow' or status query..."
                }
                disabled={activeTab === "agent"}
                className="w-full bg-[#0b161a] border border-white/10 focus:border-forsythia/60 rounded pl-4 pr-16 py-2 text-xs text-arctic placeholder-arctic/30 focus:outline-none transition-colors"
              />
              {/* Mic & Send icons */}
              <div className="absolute right-3 flex items-center gap-3 text-arctic/40">
                <button 
                  type="button" 
                  className="hover:text-white text-xs select-none focus-visible:outline-none"
                  title="Voice Command"
                >
                  🎤
                </button>
                <button 
                  type="submit" 
                  className="hover:text-forsythia text-xs select-none focus-visible:outline-none"
                  title="Send Command"
                >
                  ➔
                </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    </section>
  );
}
