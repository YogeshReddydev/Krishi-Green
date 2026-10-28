import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Sun, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface InteractiveGrowthExperienceProps {
  language: SupportedLanguage;
  onOpenHelpline?: () => void;
}

export const InteractiveGrowthExperience: React.FC<InteractiveGrowthExperienceProps> = ({
  language,
  onOpenHelpline,
}) => {
  const [growthStage, setGrowthStage] = useState<number>(35); // 0 to 100
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Automated playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let forward = true;
    const step = () => {
      setGrowthStage((prev) => {
        if (prev >= 100) {
          forward = false;
          return 99;
        }
        if (prev <= 5) {
          forward = true;
          return 6;
        }
        return forward ? prev + 0.35 : prev - 0.5;
      });
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Derived plant metrics
  const progress = growthStage / 100;
  const stemHeight = 60 + progress * 240;
  const leafScale = 0.2 + progress * 0.95;
  const flowerOpacity = progress > 0.45 ? Math.min(1, (progress - 0.45) * 4) : 0;
  const fruitProgress = progress > 0.65 ? Math.min(1, (progress - 0.65) * 3) : 0;
  const fruitSize = fruitProgress * 32;

  // Color transition for tomatoes: dark green -> yellowish -> radiant red
  const fruitColor =
    progress < 0.8
      ? '#4d7c0f' // dark green
      : progress < 0.92
      ? '#ca8a04' // ripening amber
      : '#dc2626'; // lush harvest red

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#35441d] text-[#f4efe6] p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#485c28] select-none">
      {/* Ambient soft tree leaf shadows drifting in the background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-[#283514] rounded-full blur-3xl transform rotate-12 animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[480px] h-[480px] bg-[#222e10] rounded-full blur-3xl" />
        {/* Decorative leafy shadow silhouette */}
        <svg
          className="absolute -top-10 right-10 w-80 h-80 text-[#222e10]/60 pointer-events-none transform rotate-45"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M45,100 C20,60 70,10 120,40 C170,70 160,130 110,150 C60,170 70,140 45,100 Z" />
        </svg>
      </div>

      {/* Top Header Row of the Growth Showcase */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6">
        <div className="max-w-xl space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#f9f7f2] leading-tight">
            {growthStage > 85
              ? language === 'te'
                ? 'ఇప్పుడు ఫలితాలు మీ కళ్ళముందే.'
                : 'Now you can see the results.'
              : language === 'te'
              ? 'మీరే స్వయంగా మార్పును చూడండి'
              : 'See the Difference for Yourself'}
          </h2>
          <p className="text-xs sm:text-sm text-[#cbd8b5] font-medium leading-relaxed max-w-lg">
            {language === 'te'
              ? 'ఆహార వ్యర్థాల నుండి తయారుచేసిన సూక్ష్మ-సేంద్రీయ ఎరువులతో పంట ఏవిధంగా పురోగమిస్తుందో ప్రత్యక్షంగా అనుభవించండి.'
              : 'Precision carbon-capsule nutrients activate dormant soil biology. Drag the nutrient slider below to witness progressive crop vitality from seed to golden harvest.'}
          </p>
        </div>

        {/* Editorial Subtitle Kicker (Matching reference image) */}
        <div className="max-w-xs text-right hidden sm:block">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#a3b885] font-mono block leading-relaxed">
            {language === 'te'
              ? 'ఎలాంటి నిబద్ధత అవసరం లేదు — కేవలం సేంద్రీయ బయో-ట్యాబ్ సామర్థ్యాన్ని మీరే చూడండి.'
              : 'SEE IT FOR YOURSELF, NO COMMITMENT NEEDED — JUST A CHANCE TO SEE HOW MUCH BETTER YOUR BIO-FERTILIZER CAN WORK.'}
          </span>
        </div>
      </div>

      {/* 
        ======================================================================
        CENTRAL INTERACTIVE PLANT VISUAL CANVAS:
        Smooth vector plant responsive to growth stage
        ======================================================================
      */}
      <div className="relative z-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] my-2">
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[500px] h-[380px] sm:h-[460px] overflow-visible drop-shadow-2xl"
        >
          <defs>
            {/* Stem Gradient */}
            <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#2d3a1a" />
              <stop offset="60%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>

            {/* Leaf Gradient */}
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="40%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#1e3a10" />
            </linearGradient>

            {/* Fruit Glow */}
            <radialGradient id="fruitGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor={fruitColor} />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>

            {/* Soft Shadow Filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Fertile Soil Pot & Base */}
          <ellipse cx="250" cy="460" rx="90" ry="18" fill="#1f2910" opacity="0.8" />
          <path
            d="M170,450 C210,442 290,442 330,450 C320,480 180,480 170,450 Z"
            fill="#273315"
          />

          {/* Sprouting Seed Pod at Base */}
          <ellipse cx="250" cy="446" rx="14" ry="7" fill="#65a30d" />

          {/* Main Growing Stem */}
          <path
            d={`M250,446 C248,${446 - stemHeight * 0.4} ${252 + Math.sin(progress * 4) * 6},${
              446 - stemHeight * 0.7
            } 250,${446 - stemHeight}`}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={Math.max(4, 9 - progress * 2)}
            strokeLinecap="round"
          />

          {/* Lower Leaf Pair (Unfurls early) */}
          {progress > 0.08 && (
            <g
              transform={`translate(248, ${446 - stemHeight * 0.3}) scale(${leafScale * 0.9})`}
              className="transition-transform duration-300"
            >
              {/* Left Leaf */}
              <path
                d="M0,0 C-40,-15 -70,5 -85,30 C-65,35 -20,25 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#65a30d"
                strokeWidth="1.2"
              />
              <path d="M0,0 C-35,10 -65,22 -85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.7" />
              {/* Right Leaf */}
              <path
                d="M0,0 C40,-15 70,5 85,30 C65,35 20,25 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#65a30d"
                strokeWidth="1.2"
              />
              <path d="M0,0 C35,10 65,22 85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.7" />
            </g>
          )}

          {/* Middle Foliage Cluster (Mid Stage) */}
          {progress > 0.3 && (
            <g
              transform={`translate(251, ${446 - stemHeight * 0.6}) scale(${leafScale})`}
              className="transition-transform duration-300"
            >
              {/* Left Middle Leaf */}
              <path
                d="M0,0 C-50,-25 -95,-10 -115,20 C-85,28 -30,15 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#65a30d"
                strokeWidth="1.4"
              />
              <path d="M0,0 C-45,3 -85,12 -115,20" stroke="#bef264" strokeWidth="1.2" fill="none" opacity="0.8" />
              {/* Right Middle Leaf */}
              <path
                d="M0,0 C50,-25 95,-10 115,20 C85,28 30,15 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#65a30d"
                strokeWidth="1.4"
              />
              <path d="M0,0 C45,3 85,12 115,20" stroke="#bef264" strokeWidth="1.2" fill="none" opacity="0.8" />
            </g>
          )}

          {/* Top Canopy Leaves */}
          {progress > 0.5 && (
            <g
              transform={`translate(250, ${446 - stemHeight}) scale(${leafScale * 1.1})`}
              className="transition-transform duration-300"
            >
              <path
                d="M0,0 C-30,-45 -65,-55 -80,-30 C-60,-15 -20,-5 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#84cc16"
                strokeWidth="1.5"
              />
              <path
                d="M0,0 C30,-45 65,-55 80,-30 C60,-15 20,-5 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#84cc16"
                strokeWidth="1.5"
              />
              <path
                d="M0,0 C-10,-55 10,-55 0,-70 C-10,-55 0,-20 0,0 Z"
                fill="url(#leafGrad)"
                stroke="#bef264"
                strokeWidth="1.2"
              />
            </g>
          )}

          {/* Yellow Flower Blossoms (Emerge at ~50%) */}
          {flowerOpacity > 0 && progress < 0.85 && (
            <g
              opacity={flowerOpacity * (1 - fruitProgress * 0.8)}
              transform={`translate(242, ${446 - stemHeight * 0.75}) scale(${0.8 + progress * 0.3})`}
            >
              {/* 5 Petal Blossom */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="0"
                  cy="-9"
                  rx="4"
                  ry="9"
                  fill="#facc15"
                  stroke="#eab308"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="4" fill="#ca8a04" />
            </g>
          )}

          {/* Fruit Cluster (Tomatoes developing from green to ripe red) */}
          {fruitSize > 0 && (
            <g
              transform={`translate(250, ${446 - stemHeight * 0.72})`}
              className="transition-all duration-300"
            >
              {/* Calyx Star sepals */}
              <path
                d="M-4,-2 L-12,-8 L-6,1 L-10,9 L0,3 L10,9 L6,1 L12,-8 L4,-2 Z"
                fill="#4d7c0f"
              />

              {/* Left Fruit */}
              <g transform="translate(-24, 18)">
                <circle cx="0" cy="0" r={fruitSize * 0.9} fill="url(#fruitGrad)" filter="url(#softGlow)" />
                <circle cx="0" cy="0" r={fruitSize * 0.9} fill="url(#fruitGrad)" />
                {/* Gloss highlight */}
                <ellipse
                  cx={-fruitSize * 0.28}
                  cy={-fruitSize * 0.28}
                  rx={fruitSize * 0.22}
                  ry={fruitSize * 0.14}
                  fill="#ffffff"
                  opacity="0.5"
                  transform="rotate(-25)"
                />
              </g>

              {/* Right Fruit */}
              <g transform="translate(24, 18)">
                <circle cx="0" cy="0" r={fruitSize} fill="url(#fruitGrad)" filter="url(#softGlow)" />
                <circle cx="0" cy="0" r={fruitSize} fill="url(#fruitGrad)" />
                {/* Gloss highlight */}
                <ellipse
                  cx={-fruitSize * 0.3}
                  cy={-fruitSize * 0.3}
                  rx={fruitSize * 0.25}
                  ry={fruitSize * 0.16}
                  fill="#ffffff"
                  opacity="0.55"
                  transform="rotate(-25)"
                />
              </g>

              {/* Branch connector */}
              <path
                d="M0,0 C-10,8 -24,18 -24,18 M0,0 C10,8 24,18 24,18"
                stroke="#3f6212"
                strokeWidth="3"
                fill="none"
              />
            </g>
          )}

          {/* Morning Dew Droplets on Leaves */}
          {progress > 0.4 && (
            <>
              <circle cx="210" cy={`${446 - stemHeight * 0.58}`} r="2" fill="#e0f2fe" opacity="0.8" />
              <circle cx="295" cy={`${446 - stemHeight * 0.55}`} r="2.5" fill="#e0f2fe" opacity="0.8" />
              <circle cx="265" cy={`${446 - stemHeight * 0.88}`} r="1.8" fill="#e0f2fe" opacity="0.9" />
            </>
          )}
        </svg>
      </div>

      {/* 
        ======================================================================
        INTERACTIVE SCRUB PILL SLIDER:
        Matching the pill control from the video ("Add more water" / "Add bio-nutrient")
        ======================================================================
      */}
      <div className="relative z-10 max-w-md mx-auto bg-[#293516]/90 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border border-[#485c28] shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#a3b885]" />
            <span className="font-extrabold text-[#f4efe6] tracking-wide">
              {growthStage > 85
                ? language === 'te'
                  ? 'పూర్తి పంట సిద్ధం (100% ఆర్గానిక్)'
                  : 'Harvest Ready • FCO 1985'
                : language === 'te'
                ? 'సేంద్రీయ పోషకాలను పెంచండి'
                : 'Add bio-nutrient & water'}
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold text-[#a3b885]">
            {Math.round(growthStage)}% Vitality
          </span>
        </div>

        {/* Range Slider */}
        <div className="relative flex items-center">
          <input
            type="range"
            min={5}
            max={100}
            value={growthStage}
            onChange={(e) => {
              setGrowthStage(Number(e.target.value));
              if (isPlaying) setIsPlaying(false);
            }}
            className="w-full h-2.5 bg-[#1c240e] rounded-lg appearance-none cursor-pointer accent-[#84cc16]"
            title="Drag to simulate vegetative and fruit development"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#3d4f20] hover:bg-[#4d6328] text-white rounded-xl font-bold transition active:scale-95 cursor-pointer border border-[#5a7430]"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Autoplay Timelapse'}</span>
            </button>

            <button
              onClick={() => {
                setGrowthStage(15);
                setIsPlaying(false);
              }}
              className="p-1 hover:text-[#bef264] text-[#a3b885] transition"
              title="Reset to seedling"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[#a3b885] font-medium hidden sm:inline">
            {growthStage < 30 ? '🌱 Sprout' : growthStage < 70 ? '🌿 Vegetative' : '🍅 Bountiful Yield'}
          </span>
        </div>
      </div>
    </section>
  );
};
