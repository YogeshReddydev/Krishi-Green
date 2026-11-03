import React, { useState, useEffect, useRef } from 'react';
import {
  IconPlay,
  IconPause,
  IconRefresh,
  IconDroplets,
  IconCheck,
  IconSprout,
  IconShield,
} from './Icons';
import { SupportedLanguage } from '../types';

interface InteractiveGrowthExperienceProps {
  language: SupportedLanguage;
  onOpenHelpline?: () => void;
}

export const InteractiveGrowthExperience: React.FC<InteractiveGrowthExperienceProps> = ({
  language,
}) => {
  const isTe = language === 'te';
  const [growthStage, setGrowthStage] = useState<number>(38); // 0 to 100
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showBioNutrientOverlay, setShowBioNutrientOverlay] = useState<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);

  // Automated playback timelapse loop
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
        return forward ? prev + 0.4 : prev - 0.6;
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
  const stemHeight = 65 + progress * 240;
  const leafScale = 0.25 + progress * 0.95;
  const flowerOpacity = progress > 0.48 ? Math.min(1, (progress - 0.48) * 4) : 0;
  const fruitProgress = progress > 0.68 ? Math.min(1, (progress - 0.68) * 3.2) : 0;
  const fruitSize = fruitProgress * 34;

  const fruitColor =
    progress < 0.78
      ? '#4d7c0f'
      : progress < 0.91
      ? '#ca8a04'
      : '#dc2626';

  return (
    <section className="relative w-full rounded-sm overflow-hidden bg-[#243317] text-[#f4efe6] p-6 sm:p-8 lg:p-10 border border-[#3b5226] select-none">
      <div className="relative z-10 space-y-6">
        {/* Top Header Row of the Growth Showcase */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-3 border-b border-[#3b5226]">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#84cc16]" />
              <span className="font-bold uppercase tracking-wider">
                {isTe ? 'బయో-న్యూట్రియెంట్ వృద్ధి నమూనా' : 'BIO-NUTRIENT ACCELERATION TIMELAPSE'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {growthStage > 85
                ? isTe
                  ? 'ఇప్పుడు పూర్తి ఫలితాలు మీ కళ్ళముందే.'
                  : 'Now you can see the harvest results.'
                : isTe
                ? 'మీరే స్వయంగా మార్పును చూడండి'
                : 'See the Difference for Yourself'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-lg">
              {isTe
                ? 'సేంద్రీయ కార్బన్ క్యాప్సూల్ నేలలోని సూక్ష్మజీవులను మేల్కొల్పి, విత్తనం నుండి అధిక దిగుబడి వరకు మొక్క పెరుగుదలను ఎలా వేగవంతం చేస్తుందో స్వయంగా పరీక్షించండి.'
                : 'Experience how bio-carbon nutrient mobilization awakens depleted soil biology. Drag the nutrient slider below to simulate real vegetative expansion from germinating seed to harvest.'}
            </p>
          </div>

          {/* Right Kicker & Impact Pill */}
          <div className="max-w-xs text-right hidden sm:flex flex-col items-end gap-2 font-mono">
            <span className="text-[10px] tracking-wider uppercase text-stone-300 block leading-relaxed">
              {isTe
                ? 'సేంద్రీయ బయో-ట్యాబ్ సామర్థ్యాన్ని మీరే ప్రత్యక్షంగా చూడండి.'
                : 'SEE IT FOR YOURSELF: WITNESS REAL VEGETATIVE EXPANSION.'}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a2610] rounded-sm border border-[#3b5226] text-[10px] text-stone-200">
              <IconCheck className="w-3 h-3 text-[#84cc16]" />
              <span>+42% Yield | FCO 1985 Grade 1</span>
            </div>
          </div>
        </div>

        {/* Central Plant Canvas */}
        <div className="relative flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] my-2">
          {/* Floating Impact Stats Card */}
          <div className="absolute top-2 left-2 sm:left-6 z-20 bg-[#1a2610] p-3 rounded-sm border border-[#3b5226] max-w-[210px] space-y-1.5 font-mono">
            <span className="text-[9px] uppercase text-stone-400 block font-bold">
              {isTe ? 'సేంద్రీయ పోషక ప్రభావం' : 'BIO-NUTRIENT UPTAKE'}
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-stone-300">{isTe ? 'వేరు వ్యాప్తి:' : 'Root Expansion:'}</span>
                <span className="font-bold text-[#bef264]">
                  +{Math.round(20 + progress * 280)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-300">{isTe ? 'నత్రజని లభ్యత:' : 'Active NPK:'}</span>
                <span className="font-bold text-[#84cc16]">
                  {Math.round(15 + progress * 80)} ppm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-300">{isTe ? 'మొక్కల బలం:' : 'Vigor Index:'}</span>
                <span className="font-bold text-white">
                  {(1.0 + progress * 3.8).toFixed(1)}x
                </span>
              </div>
            </div>
          </div>

          {/* SVG Plant Timelapse Canvas */}
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-[500px] h-[360px] sm:h-[420px] overflow-visible"
          >
            <defs>
              <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1a2610" />
                <stop offset="50%" stopColor="#4d7c0f" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>

              <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="45%" stopColor="#4d7c0f" />
                <stop offset="100%" stopColor="#1e3a10" />
              </linearGradient>

              <radialGradient id="fruitGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="45%" stopColor={fruitColor} />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
            </defs>

            {/* Fertile Soil Bed & Base Mound */}
            <ellipse cx="250" cy="460" rx="95" ry="18" fill="#141c0c" opacity="0.9" />
            <path
              d="M165,450 C210,440 290,440 335,450 C325,482 175,482 165,450 Z"
              fill="#1e2912"
            />

            {/* Root network radiating into living soil */}
            <g opacity={0.4 + progress * 0.5}>
              <path
                d={`M250,455 Q${240 - progress * 40},475 ${220 - progress * 50},490`}
                stroke="#65a30d"
                strokeWidth={1.5 + progress * 1.5}
                fill="none"
              />
              <path
                d={`M250,455 Q${260 + progress * 40},475 ${280 + progress * 50},490`}
                stroke="#65a30d"
                strokeWidth={1.5 + progress * 1.5}
                fill="none"
              />
              <path
                d={`M250,458 Q250,480 ${250 + Math.sin(progress * 3) * 15},498`}
                stroke="#84cc16"
                strokeWidth={1.5 + progress}
                fill="none"
              />
            </g>

            {/* Sprouting Seed Pod / Carbon Pellet at Base */}
            <g transform="translate(250, 446)">
              <ellipse cx="0" cy="0" rx="14" ry="7" fill="#3b5226" stroke="#84cc16" strokeWidth="1" />
            </g>

            {/* Main Growing Stem */}
            <path
              d={`M250,446 C248,${446 - stemHeight * 0.4} ${252 + Math.sin(progress * 4) * 8},${
                446 - stemHeight * 0.72
              } 250,${446 - stemHeight}`}
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth={Math.max(4, 9 - progress * 2)}
              strokeLinecap="round"
            />

            {/* Lower Leaf Pair */}
            {progress > 0.08 && (
              <g
                transform={`translate(248, ${446 - stemHeight * 0.3}) scale(${leafScale * 0.9})`}
                className="transition-transform duration-300"
              >
                <path
                  d="M0,0 C-40,-15 -70,5 -85,30 C-65,35 -20,25 0,0 Z"
                  fill="url(#leafGrad)"
                  stroke="#65a30d"
                  strokeWidth="1.2"
                />
                <path d="M0,0 C-35,10 -65,22 -85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.75" />
                <path
                  d="M0,0 C40,-15 70,5 85,30 C65,35 20,25 0,0 Z"
                  fill="url(#leafGrad)"
                  stroke="#65a30d"
                  strokeWidth="1.2"
                />
                <path d="M0,0 C35,10 65,22 85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.75" />
              </g>
            )}

            {/* Middle Foliage Cluster */}
            {progress > 0.3 && (
              <g
                transform={`translate(251, ${446 - stemHeight * 0.6}) scale(${leafScale})`}
                className="transition-transform duration-300"
              >
                <path
                  d="M0,0 C-50,-25 -95,-10 -115,20 C-85,28 -30,15 0,0 Z"
                  fill="url(#leafGrad)"
                  stroke="#65a30d"
                  strokeWidth="1.4"
                />
                <path d="M0,0 C-45,3 -85,12 -115,20" stroke="#bef264" strokeWidth="1.2" fill="none" opacity="0.8" />
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

            {/* Yellow Flower Blossoms */}
            {flowerOpacity > 0 && progress < 0.85 && (
              <g
                opacity={flowerOpacity * (1 - fruitProgress * 0.8)}
                transform={`translate(242, ${446 - stemHeight * 0.75}) scale(${0.8 + progress * 0.3})`}
              >
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

            {/* Fruit Cluster */}
            {fruitSize > 0 && (
              <g
                transform={`translate(250, ${446 - stemHeight * 0.72})`}
                className="transition-all duration-300"
              >
                <path
                  d="M-4,-2 L-12,-8 L-6,1 L-10,9 L0,3 L10,9 L6,1 L12,-8 L4,-2 Z"
                  fill="#4d7c0f"
                />

                <g transform="translate(-24, 18)">
                  <circle cx="0" cy="0" r={fruitSize * 0.9} fill="url(#fruitGrad)" />
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

                <g transform="translate(24, 18)">
                  <circle cx="0" cy="0" r={fruitSize} fill="url(#fruitGrad)" />
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

                <path
                  d="M0,0 C-10,8 -24,18 -24,18 M0,0 C10,8 24,18 24,18"
                  stroke="#3f6212"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Scrub Slider Container */}
        <div className="max-w-lg mx-auto bg-[#1a2610] p-4 rounded-sm border border-[#3b5226] space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <IconDroplets className="w-4 h-4 text-[#84cc16]" />
              <span className="font-bold text-stone-200">
                {growthStage > 85
                  ? isTe
                    ? 'పూర్తి పంట సిద్ధం (100% సేంద్రీయ దిగుబడి)'
                    : 'Harvest Ready: FCO 1985'
                  : isTe
                  ? 'సేంద్రీయ పోషకాలను జోడించండి'
                  : 'Add Bio-Nutrient & Water'}
              </span>
            </div>

            <span className="text-[11px] font-bold text-[#bef264] bg-[#121c0b] px-2 py-0.5 rounded-sm border border-[#3b5226]">
              {Math.round(growthStage)}% Vitality
            </span>
          </div>

          {/* Scrub Slider Track */}
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
              className="w-full h-2.5 bg-[#121c0b] rounded-sm appearance-none cursor-pointer accent-[#84cc16]"
              title="Drag horizontally to simulate vegetative and fruit development"
            />
          </div>

          {/* Preset Stage Jump Buttons */}
          <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px]">
            {[
              { label: isTe ? 'మొలక' : 'Seedling', val: 12 },
              { label: isTe ? 'శాకీయ' : 'Vegetative', val: 38 },
              { label: isTe ? 'పూత' : 'Flowering', val: 68 },
              { label: isTe ? 'పంట' : 'Harvest', val: 100 },
            ].map((st) => (
              <button
                key={st.val}
                onClick={() => {
                  setGrowthStage(st.val);
                  setIsPlaying(false);
                }}
                className={`py-1 rounded-sm border transition-colors font-bold cursor-pointer ${
                  Math.abs(growthStage - st.val) < 15
                    ? 'bg-[#3b5226] text-white border-[#84cc16]'
                    : 'bg-[#121c0b] text-stone-400 border-[#243317] hover:bg-[#1a2610]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Autoplay & Controls Row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2d3f1d] text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#2d3f1d] hover:bg-[#3b5226] text-white rounded-sm font-bold transition-colors cursor-pointer border border-[#4d662b]"
              >
                {isPlaying ? <IconPause className="w-3.5 h-3.5" /> : <IconPlay className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Autoplay'}</span>
              </button>

              <button
                onClick={() => {
                  setGrowthStage(12);
                  setIsPlaying(false);
                }}
                className="p-1 text-stone-400 hover:text-white rounded-sm hover:bg-[#121c0b] transition-colors"
                title="Reset to seedling"
              >
                <IconRefresh className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setShowBioNutrientOverlay(!showBioNutrientOverlay)}
              className="text-[10px] text-stone-400 hover:text-white underline cursor-pointer"
            >
              {showBioNutrientOverlay ? 'Hide Flare' : 'Show Flare'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
