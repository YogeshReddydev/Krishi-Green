import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, Layers, Rotate3d } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface Interactive3DCapsuleProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
}

export const Interactive3DCapsule: React.FC<Interactive3DCapsuleProps> = ({
  language,
  onNavigate,
}) => {
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(10);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  // Automated continuous gentle rotation when not hovered
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.6) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationY((prev) => prev + deltaX * 0.4);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#38461f] text-[#f4efe6] p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#485c28] select-none">
      {/* Animated leaf shadow ambient projections */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#222c12] rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#2a3717] rounded-full blur-3xl" />
        <svg
          className="absolute -top-12 left-1/4 w-[600px] h-[400px] text-[#1c240e]/50 pointer-events-none transform -rotate-12 animate-pulse"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M20,80 C60,20 140,30 180,90 C150,150 70,160 20,80 Z" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Bold Typography & Manifesto */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#a3b885] font-mono block">
              {language === 'te' ? 'సేంద్రీయ ఎరువు పునర్నిర్మాణం' : 'FERTILIZER, REINVENTED.'}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              CropTab<span className="text-[#a3b885] text-2xl align-super">™</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-bold text-[#d8e2c8] leading-snug">
            {language === 'te'
              ? '100 కేజీల వ్యవసాయ ఆహార వ్యర్థాలు — ఒకే ఒక్క 13 గ్రాముల కార్బన్ క్యాప్సూల్‌గా పునర్నిర్మితం.'
              : '100 KG OF RAW BIO-WASTE — REIMAGINED AS A 13 G CARBON TABLET.'}
          </p>

          <p className="text-xs sm:text-sm text-[#cbd8b5] leading-relaxed font-normal">
            {language === 'te'
              ? 'సూక్ష్మ-పోషకాలతో నిండిన కార్బన్ క్యాప్సూల్ నేరుగా మొక్కల వేరు వ్యవస్థకు అవసరమైన నత్రజని, భాస్వరం మరియు పొటాషియంను సున్నా రసాయన ఉద్గారాలతో అందిస్తుంది.'
              : 'Precision carbon-capsule matrix that delivers active biological nutrients with zero odor, zero synthetic runoff, and zero chemical emissions.'}
          </p>

          {/* Bullet Spec Highlights */}
          <div className="pt-2 space-y-2 text-xs text-[#e2ebd6]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#84cc16] shrink-0" />
              <span>100x lighter freight — replaces cumbersome bulk tractor trolley loads</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#84cc16] shrink-0" />
              <span>FCO 1985 laboratory tested & verified organic carbon content</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#84cc16] shrink-0" />
              <span>Direct soil microbial awakening within 48 hours of irrigation</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-5 py-2.5 bg-[#4d6328] hover:bg-[#5a7430] text-[#f4efe6] font-black rounded-xl text-xs sm:text-sm shadow-lg transition active:scale-98 cursor-pointer border border-[#6b8a39] flex items-center gap-2"
            >
              <span>• {language === 'te' ? 'క్యాప్సూల్ కొనుగోలు / ఆర్డర్' : 'REQUEST ACCESS'} •</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('pipeline')}
              className="px-4 py-2.5 bg-[#252f14]/80 hover:bg-[#2f3c1a] text-[#cbd8b5] font-bold rounded-xl text-xs transition border border-[#485c28] active:scale-98 cursor-pointer"
            >
              {language === 'te' ? 'తయారీ విధానం' : 'View Bio-Compression'}
            </button>
          </div>
        </div>

        {/* Center / Right: 3D Interactive Tablet Perspective Showcase */}
        <div
          className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px] relative cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          title="Drag horizontally to rotate CropTab™ in 3D"
        >
          {/* Subtle 3D Stage Floor Glow */}
          <div className="absolute w-72 h-72 bg-[#20290f] rounded-full blur-2xl transform scale-y-50 -bottom-8 pointer-events-none" />

          {/* 3D Tablet Wrapper with Perspective */}
          <div
            className="relative flex items-center justify-center transition-transform duration-75"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[42px] shadow-2xl flex items-center justify-center transition-transform"
              style={{
                transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(145deg, #2c3325 0%, #1e2419 60%, #12160f 100%)',
                boxShadow: `
                  ${-Math.sin((rotationY * Math.PI) / 180) * 20}px 25px 50px rgba(10, 14, 8, 0.8),
                  inset 2px 2px 4px rgba(255, 255, 255, 0.15),
                  inset -3px -3px 6px rgba(0, 0, 0, 0.7)
                `,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Embossed Botanical Logo on the Tablet Face */}
              <div
                className="flex flex-col items-center justify-center select-none"
                style={{
                  transform: 'translateZ(12px)',
                }}
              >
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 text-[#3f4a35] drop-shadow-md"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  style={{
                    filter: 'drop-shadow(1px 2px 1px rgba(0,0,0,0.8)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.12))',
                  }}
                >
                  {/* Stylized Lotus Petal Emblem Matching Reference */}
                  <path d="M50,22 C44,32 38,44 42,54 C46,64 54,64 58,54 C62,44 56,32 50,22 Z" />
                  <path d="M46,55 C36,48 24,46 16,52 C8,58 14,68 24,70 C34,72 42,65 46,55 Z" />
                  <path d="M54,55 C64,48 76,46 84,52 C92,58 86,68 76,70 C66,72 58,65 54,55 Z" />
                  <path d="M42,57 C30,62 24,72 26,82 C28,92 40,92 46,84 C52,76 48,66 42,57 Z" />
                  <path d="M58,57 C70,62 76,72 74,82 C72,92 60,92 54,84 C48,76 52,66 58,57 Z" />
                </svg>

                <span
                  className="text-[11px] font-black tracking-widest text-[#4d5b40] font-mono mt-1"
                  style={{
                    textShadow: '0 1px 1px rgba(255,255,255,0.1), 0 -1px 1px rgba(0,0,0,0.9)',
                  }}
                >
                  KRISHIGREEN
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-6 flex items-center gap-2 text-[11px] text-[#a3b885] font-mono">
            <Rotate3d className="w-3.5 h-3.5 animate-spin" />
            <span>Interactive 3D Preview • Drag to Inspect Matrix</span>
          </div>
        </div>
      </div>
    </section>
  );
};
