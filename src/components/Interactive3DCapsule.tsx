import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Rotate3d,
  Layers,
  Flame,
  Scale,
  Package,
  TrendingDown,
  Info,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface Interactive3DCapsuleProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
}

export const Interactive3DCapsule: React.FC<Interactive3DCapsuleProps> = ({
  language,
  onNavigate,
}) => {
  const isTe = language === 'te';

  // 3D Rotation State (Pitch & Yaw)
  const [rotationY, setRotationY] = useState<number>(18);
  const [rotationX, setRotationX] = useState<number>(12);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'layers' | 'kinetics'>('stats');

  // Drag interaction tracking
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);

  // Auto-rotation when user is not manually rotating
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.45) % 360);
    }, 32);
    return () => clearInterval(interval);
  }, [isInteracting]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotationX,
      rotY: rotationY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    // Limit pitch to prevent disorienting flip
    const nextRotX = Math.max(-45, Math.min(45, dragStartRef.current.rotX - deltaY * 0.4));
    setRotationX(nextRotX);
    setRotationY(dragStartRef.current.rotY + deltaX * 0.5);
  };

  const handleMouseUp = () => {
    dragStartRef.current = null;
    setIsInteracting(false);
  };

  // Touch handlers for mobile & tablet support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsInteracting(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      rotX: rotationX,
      rotY: rotationY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStartRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;
    const nextRotX = Math.max(-45, Math.min(45, dragStartRef.current.rotX - deltaY * 0.4));
    setRotationX(nextRotX);
    setRotationY(dragStartRef.current.rotY + deltaX * 0.5);
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
    setIsInteracting(false);
  };

  const resetOrientation = () => {
    setRotationX(12);
    setRotationY(18);
  };

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#35441d] text-[#f4efe6] p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#485c28] select-none transition-colors duration-300">
      {/* Ambient Velvet Lighting & Drifting Botanical Projections */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-[#1e2710] rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-0 w-[480px] h-[480px] bg-[#283615] rounded-full blur-3xl" />
        {/* Stylized organic leaf silhouette in background */}
        <svg
          className="absolute -top-16 left-1/3 w-[640px] h-[440px] text-[#1e2710]/40 pointer-events-none transform -rotate-12"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M25,85 C65,25 145,35 185,95 C155,155 75,165 25,85 Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Section Sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#4d612e] pb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#a3b885]">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
            <span className="font-bold uppercase tracking-widest">
              {isTe ? 'బయో-కార్బన్ క్యాప్సూల్ టెక్నాలజీ' : 'BIO-CARBON CAPSULE INNOVATION'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#d8e2c8] text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
            <span>FCO 1985 Grade 1 • 100% Organic Carbon Matrix</span>
          </div>
        </div>

        {/* Top Header & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f9f7f2] tracking-tight leading-none font-sans">
              CropTab<span className="text-[#a3b885] text-2xl align-super">™</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#d8e2c8] leading-snug">
              {isTe
                ? '100 కేజీల వ్యవసాయ ఆహార వ్యర్థాలు — ఒకే ఒక్క 13 గ్రాముల కార్బన్ క్యాప్సూల్‌గా పునర్నిర్మితం.'
                : '100 KG OF RAW BIO-WASTE — REIMAGINED AS A 13 G CARBON TABLET.'}
            </p>
            <p className="text-xs sm:text-sm text-[#cbd8b5] leading-relaxed max-w-2xl font-normal">
              {isTe
                ? 'మండి సేంద్రీయ వ్యర్థాలు, వరి గడ్డి మరియు వ్యవసాయ వ్యర్థాల నుండి స్థూల తేమను తొలగించి, అధిక సాంద్రత కలిగిన బయో-కార్బన్ కోర్ మరియు మైకోరైజా బయో-స్టిమ్యులెంట్‌ను ఒకే సంపీడన మాత్రగా తయారుచేసే అత్యాధునిక విధానం.'
                : 'Decentralized anaerobic dehydration and slow thermal compaction densify 100 kg of voluminous organic waste into a 13-gram high-potency tablet. Direct root-zone nourishment with zero foul odor, zero urea runoff, and 1,000x lighter farm transport.'}
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-5 py-2.5 bg-[#4d6328] hover:bg-[#5a7430] text-[#f4efe6] font-black rounded-xl text-xs sm:text-sm shadow-lg transition active:scale-95 cursor-pointer border border-[#6b8a39] flex items-center gap-2"
            >
              <span>• {isTe ? 'క్యాప్సూల్ కొనుగోలు / ఆర్డర్' : 'REQUEST CROP-TAB ACCESS'} •</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('pipeline')}
              className="px-4 py-2.5 bg-[#252f14]/80 hover:bg-[#2f3c1a] text-[#cbd8b5] font-bold rounded-xl text-xs transition border border-[#485c28] active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[#a3b885]" />
              <span>{isTe ? '16-దశల తయారీ ప్రక్రియ' : 'Conversion Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* 
          ======================================================================
          INTERACTIVE 3D PERSPECTIVE STAGE & CONVERSION STATS PANEL
          ======================================================================
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Side: 3D Interactive Rotating Bio-Carbon Tablet */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Interactive 3D Canvas Box */}
            <div
              className="w-full max-w-[420px] h-[340px] sm:h-[400px] flex items-center justify-center relative cursor-grab active:cursor-grabbing rounded-3xl bg-[#283515]/60 backdrop-blur-md border border-[#485c28] overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              title="Click and drag horizontally or vertically to rotate the tablet in 3D"
            >
              {/* Radial Lighting beneath the tablet */}
              <div className="absolute w-64 h-64 bg-[#141b0b] rounded-full blur-2xl transform scale-y-50 -bottom-6 pointer-events-none" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#283515]/30 to-[#1e2710]/90 pointer-events-none" />

              {/* Reset view control button */}
              <button
                onClick={resetOrientation}
                className="absolute top-3 right-3 p-2 bg-[#35441d]/80 hover:bg-[#435725] text-[#a3b885] hover:text-[#f4efe6] rounded-xl border border-[#4d6328] transition text-xs flex items-center gap-1 cursor-pointer z-20"
                title="Reset tablet orientation"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="text-[10px] font-mono">Reset</span>
              </button>

              {/* 3D Scene Viewport with Perspective */}
              <div
                className="relative flex items-center justify-center transition-transform duration-75"
                style={{
                  perspective: '1200px',
                }}
              >
                {/* 3D Multi-Layered Tablet Body */}
                <div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[46px] shadow-2xl flex items-center justify-center transition-transform select-none"
                  style={{
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                    transformStyle: 'preserve-3d',
                    background: 'linear-gradient(135deg, #323b2b 0%, #22291c 45%, #151a11 100%)',
                    boxShadow: `
                      ${-Math.sin((rotationY * Math.PI) / 180) * 22}px ${20 + Math.sin((rotationX * Math.PI) / 180) * 12}px 50px rgba(8, 12, 6, 0.85),
                      inset 3px 3px 6px rgba(255, 255, 255, 0.18),
                      inset -4px -4px 8px rgba(0, 0, 0, 0.8)
                    `,
                    border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Subtle Mineral Texture Grain Overlay */}
                  <div className="absolute inset-0 rounded-[46px] opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                  {/* Tablet Beveled Perimeter Rim */}
                  <div className="absolute inset-2 rounded-[38px] border border-black/40 shadow-inner pointer-events-none" />

                  {/* Embossed Botanical Styling on Front Face (TranslateZ gives true 3D depth) */}
                  <div
                    className="flex flex-col items-center justify-center select-none p-4"
                    style={{
                      transform: 'translateZ(14px)',
                    }}
                  >
                    {/* Botanical Lotus & Leaf Insignia with Carved Relief */}
                    <svg
                      className="w-20 h-20 sm:w-24 sm:h-24 text-[#3e4b33] drop-shadow-md"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                      style={{
                        filter: 'drop-shadow(2px 3px 1px rgba(0,0,0,0.9)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.15))',
                      }}
                    >
                      {/* Center Lotus Blade */}
                      <path d="M50,18 C43,30 38,44 42,54 C46,64 54,64 58,54 C62,44 57,30 50,18 Z" />
                      {/* Left Petal */}
                      <path d="M45,55 C35,47 22,46 15,52 C8,58 14,68 24,70 C34,72 41,65 45,55 Z" />
                      {/* Right Petal */}
                      <path d="M55,55 C65,47 78,46 85,52 C92,58 86,68 76,70 C66,72 59,65 55,55 Z" />
                      {/* Lower Left Base Leaf */}
                      <path d="M42,58 C30,63 24,73 26,83 C28,93 40,93 46,85 C52,77 48,67 42,58 Z" />
                      {/* Lower Right Base Leaf */}
                      <path d="M58,58 C70,63 76,73 74,83 C72,93 60,93 54,85 C48,77 52,67 58,58 Z" />
                      {/* Central Core Pip */}
                      <circle cx="50" cy="58" r="4.5" fill="#506141" />
                    </svg>

                    {/* Embossed Typography */}
                    <span
                      className="text-[10px] sm:text-[11px] font-black tracking-widest text-[#4f5f42] font-mono mt-1 uppercase"
                      style={{
                        textShadow: '0 1px 1px rgba(255,255,255,0.15), 0 -1px 2px rgba(0,0,0,0.95)',
                      }}
                    >
                      KRISHIGREEN • CROPTAB
                    </span>

                    <span
                      className="text-[8px] font-mono text-[#424f37] uppercase tracking-wider"
                      style={{
                        textShadow: '0 1px 1px rgba(255,255,255,0.1)',
                      }}
                    >
                      13g • BIO-CARBON MATRIX
                    </span>
                  </div>

                  {/* Tablet Extruded Backface (for full 3D rotation) */}
                  <div
                    className="absolute inset-0 rounded-[46px] flex items-center justify-center p-4 bg-gradient-to-tr from-[#161c12] via-[#222a1b] to-[#2c3524] backface-hidden"
                    style={{
                      transform: 'rotateY(180deg) translateZ(1px)',
                    }}
                  >
                    <div className="text-center space-y-1">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#35441d] border border-white/10 flex items-center justify-center text-[#84cc16]">
                        <Check className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#d8e2c8] block">FCO 1985 SPEC</span>
                      <p className="text-[9px] text-[#cbd8b5] font-mono leading-tight">
                        Organic Carbon &gt; 18%<br />
                        Moisture &lt; 5%<br />
                        Slow-Release 90 Days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Drag Instruction Hint */}
              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 text-[10px] text-[#a3b885] font-mono bg-[#1f2910]/80 py-1 px-3 backdrop-blur-xs">
                <Rotate3d className="w-3 h-3 animate-spin text-[#84cc16]" />
                <span>
                  {isTe
                    ? '3D వీక్షణ కోసం మౌస్ లేదా వేలితో తిప్పండి'
                    : 'Interactive 3D • Drag with mouse or swipe touch to rotate'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Conversion Stats & Biological Kinetics Breakdown */}
          <div className="lg:col-span-6 space-y-4">
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-[#283515] p-1 rounded-2xl border border-[#485c28] text-xs font-mono">
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-[#4d6328] text-white shadow-xs'
                    : 'text-[#cbd8b5] hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isTe ? 'మార్పిడి కొలమానం' : 'Mass Conversion'}</span>
              </button>
              <button
                onClick={() => setActiveTab('layers')}
                className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'layers'
                    ? 'bg-[#4d6328] text-white shadow-xs'
                    : 'text-[#cbd8b5] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isTe ? 'పొరల విశ్లేషణ' : 'Capsule Anatomy'}</span>
              </button>
              <button
                onClick={() => setActiveTab('kinetics')}
                className={`flex-1 py-1.5 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'kinetics'
                    ? 'bg-[#4d6328] text-white shadow-xs'
                    : 'text-[#cbd8b5] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTe ? 'క్షేత్ర ఫలితాలు' : 'Soil Kinetics'}</span>
              </button>
            </div>

            {/* Tab 1: Mass Conversion Statistics (100 kg waste -> 13 g tablet) */}
            {activeTab === 'stats' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="bg-[#283515]/90 rounded-2xl p-4 border border-[#485c28] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#a3b885] uppercase tracking-wider">
                      {isTe ? 'మార్పిడి నిష్పత్తి' : 'VOLUMETRIC COMPACTION RATIO'}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#4d6328] text-white">
                      7,692 : 1
                    </span>
                  </div>

                  {/* Flow Diagram: 100 kg -> 13 g */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="bg-[#1e2710]/80 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-[#a3b885] block font-mono">RAW INPUT</span>
                      <strong className="text-lg sm:text-xl font-black font-mono text-white">100 kg</strong>
                      <span className="text-[10px] text-stone-300 block">Mandi food waste</span>
                    </div>

                    <div className="flex flex-col items-center justify-center text-[#a3b885]">
                      <TrendingDown className="w-5 h-5 text-[#84cc16]" />
                      <span className="text-[9px] font-mono text-white/70">85% H₂O Vap</span>
                      <span className="text-[9px] font-mono text-white/70">14% Bio-Gas</span>
                    </div>

                    <div className="bg-[#1e2710]/80 p-2.5 rounded-xl border border-[#84cc16]/30 bg-gradient-to-br from-[#283515] to-[#1e2710]">
                      <span className="text-[10px] text-[#84cc16] block font-mono font-bold">CROPTAB™</span>
                      <strong className="text-lg sm:text-xl font-black font-mono text-[#bef264]">13 g</strong>
                      <span className="text-[10px] text-emerald-200 block">Solid bio-matrix</span>
                    </div>
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#283515]/70 rounded-2xl p-3 border border-[#485c28]">
                    <div className="flex items-center gap-1.5 text-xs text-[#a3b885] font-mono">
                      <Package className="w-3.5 h-3.5 text-[#84cc16]" />
                      <span>{isTe ? 'రవాణా ఆదా' : 'Freight Efficiency'}</span>
                    </div>
                    <div className="text-xl font-black text-white font-mono mt-1">1,000x</div>
                    <p className="text-[11px] text-[#cbd8b5] leading-tight mt-0.5">
                      {isTe
                        ? 'భారీ ట్రాక్టర్ ట్రాలీలకు బదులుగా కొరియర్ ద్వారా ఇంటికి డెలివరీ'
                        : 'Replaces bulky 25-ton fertilizer truckloads with 1 box'}
                    </p>
                  </div>

                  <div className="bg-[#283515]/70 rounded-2xl p-3 border border-[#485c28]">
                    <div className="flex items-center gap-1.5 text-xs text-[#a3b885] font-mono">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isTe ? 'కార్బన్ నిల్వ' : 'Carbon Sequestration'}</span>
                    </div>
                    <div className="text-xl font-black text-white font-mono mt-1">100+ Yrs</div>
                    <p className="text-[11px] text-[#cbd8b5] leading-tight mt-0.5">
                      {isTe
                        ? 'నేలలో స్థిరపడి శతాబ్దాల పాటు హ్యూమస్‌గా సంరక్షిస్తుంది'
                        : 'Recalcitrant biochar carbon locked in agricultural topsoil'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Capsule Anatomy & Materials */}
            {activeTab === 'layers' && (
              <div className="bg-[#283515]/90 rounded-2xl p-4 border border-[#485c28] space-y-3 animate-fadeIn text-xs">
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#1e2710]/80 border border-white/5 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#4d6328] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      01
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Outer Bio-Carbon Armor</h4>
                      <p className="text-[11px] text-[#cbd8b5]">
                        Compressed microporous plant biochar protects sensitive microbes from UV radiation and rapid dehydration.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1e2710]/80 border border-white/5 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#4d6328] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      02
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Mycorrhizae & Living Inoculants</h4>
                      <p className="text-[11px] text-[#cbd8b5]">
                        Dormant endo-mycorrhizal spores (Glomus intraradices) awaken upon irrigation to expand root surface area by 300%.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1e2710]/80 border border-white/5 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#4d6328] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      03
                    </span>
                    <div>
                      <h4 className="font-bold text-white">Controlled-Release NPK Matrix</h4>
                      <p className="text-[11px] text-[#cbd8b5]">
                        Chelated organic nitrogen, rock phosphate solubilizers, and fermented potassium mobilize continuously for 90 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Soil Kinetics */}
            {activeTab === 'kinetics' && (
              <div className="bg-[#283515]/90 rounded-2xl p-4 border border-[#485c28] space-y-3 animate-fadeIn text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#1e2710]/80 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-[#84cc16] block uppercase">Dissolution Time</span>
                    <strong className="text-base font-black text-white font-mono">48 Hours</strong>
                    <p className="text-[10px] text-stone-300 mt-0.5">Integrates into root zone</p>
                  </div>
                  <div className="bg-[#1e2710]/80 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-[#84cc16] block uppercase">Water Retention</span>
                    <strong className="text-base font-black text-white font-mono">3.2x Weight</strong>
                    <p className="text-[10px] text-stone-300 mt-0.5">Absorbs dew & irrigation</p>
                  </div>
                </div>

                <div className="p-3 bg-[#1e2710]/80 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-[#a3b885] uppercase">Application Modes</span>
                  <p className="text-[11px] text-[#cbd8b5]">
                    • <strong>Direct Root Insertion:</strong> Drop 1 tablet at planting hole for deep root inoculation.<br />
                    • <strong>Drip Fertigation:</strong> Dissolve 10 tablets per 200L irrigation drum for zero-clog spraying.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
