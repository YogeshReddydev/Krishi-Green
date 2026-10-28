import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Sun, Sparkles, Sprout, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
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

  // Fruit ripening color: vibrant olive green -> ripening yellow -> radiant sun-ripe vermilion
  const fruitColor =
    progress < 0.78
      ? '#4d7c0f' // lively green
      : progress < 0.91
      ? '#ca8a04' // ripening warm amber
      : '#dc2626'; // lush harvest red

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#35441d] text-[#f4efe6] p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#485c28] select-none transition-colors duration-300">
      {/* Ambient Olive Velvet Shadows & Soft Drifting Botanical Silhouettes */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[480px] h-[480px] bg-[#222c12] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-[520px] h-[520px] bg-[#1a230d] rounded-full blur-3xl" />
        {/* Decorative foliage shadow overlay */}
        <svg
          className="absolute -top-12 right-12 w-96 h-96 text-[#1c240e]/50 pointer-events-none transform rotate-45"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M45,100 C20,60 70,10 120,40 C170,70 160,130 110,150 C60,170 70,140 45,100 Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Header Row of the Growth Showcase */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-2 border-b border-[#4d612e]">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a3b885]">
              <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-ping" />
              <span className="font-bold uppercase tracking-widest">
                {isTe ? 'బయో-న్యూట్రియెంట్ వృద్ధి నమూనా' : 'BIO-NUTRIENT ACCELERATION TIMELAPSE'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#f9f7f2] leading-tight font-sans">
              {growthStage > 85
                ? isTe
                  ? 'ఇప్పుడు పూర్తి ఫలితాలు మీ కళ్ళముందే.'
                  : 'Now you can see the harvest results.'
                : isTe
                ? 'మీరే స్వయంగా మార్పును చూడండి'
                : 'See the Difference for Yourself'}
            </h2>
            <p className="text-xs sm:text-sm text-[#cbd8b5] font-medium leading-relaxed max-w-lg">
              {isTe
                ? 'సేంద్రీయ కార్బన్ క్యాప్సూల్ నేలలోని సూక్ష్మజీవులను మేల్కొల్పి, విత్తనం నుండి అధిక దిగుబడి వరకు మొక్క పెరుగుదలను ఎలా వేగవంతం చేస్తుందో స్వయంగా పరీక్షించండి.'
                : 'Experience how bio-carbon nutrient mobilization awakens depleted soil biology. Drag the nutrient slider below to simulate real vegetative expansion from germinating seed to harvest.'}
            </p>
          </div>

          {/* Right Kicker & Impact Pill */}
          <div className="max-w-xs text-right hidden sm:flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#a3b885] font-mono block leading-relaxed">
              {isTe
                ? 'ఎలాంటి నిబద్ధత అవసరం లేదు — కేవలం సేంద్రీయ బయో-ట్యాబ్ సామర్థ్యాన్ని మీరే చూడండి.'
                : 'SEE IT FOR YOURSELF, NO COMMITMENT NEEDED — WITNESS HOW MUCH BETTER YOUR BIO-FERTILIZER CAN PERFORM.'}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#283515] rounded-full border border-[#485c28] text-[10px] font-mono text-[#bef264]">
              <Sparkles className="w-3 h-3 text-[#84cc16]" />
              <span>+42% Yield • FCO 1985 Grade 1</span>
            </div>
          </div>
        </div>

        {/* 
          ======================================================================
          CENTRAL INTERACTIVE PLANT VISUAL CANVAS:
          Smooth vector plant responsive to growth stage with bio-nutrient root rhizosphere
          ======================================================================
        */}
        <div className="relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] my-2">
          {/* Floating Impact Stats Card (Top Left of Canvas) */}
          <div className="absolute top-2 left-2 sm:left-6 z-20 bg-[#253114]/85 backdrop-blur-md p-3 rounded-2xl border border-[#485c28] shadow-lg max-w-[210px] space-y-1.5">
            <span className="text-[9px] font-mono uppercase text-[#a3b885] block font-bold">
              {isTe ? 'సేంద్రీయ పోషక ప్రభావం' : 'BIO-NUTRIENT UPTAKE'}
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#cbd8b5]">{isTe ? 'వేరు వ్యాప్తి:' : 'Root Expansion:'}</span>
                <span className="font-mono font-bold text-[#bef264]">
                  +{Math.round(20 + progress * 280)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#cbd8b5]">{isTe ? 'నత్రజని లభ్యత:' : 'Active NPK:'}</span>
                <span className="font-mono font-bold text-[#84cc16]">
                  {Math.round(15 + progress * 80)} ppm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#cbd8b5]">{isTe ? 'మొక్కల బలం:' : 'Vigor Index:'}</span>
                <span className="font-mono font-bold text-white">
                  {(1.0 + progress * 3.8).toFixed(1)}x
                </span>
              </div>
            </div>
          </div>

          {/* SVG Plant Timelapse Canvas */}
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-[500px] h-[360px] sm:h-[440px] overflow-visible drop-shadow-2xl"
          >
            <defs>
              {/* Stem Gradient */}
              <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#283515" />
                <stop offset="50%" stopColor="#4d7c0f" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>

              {/* Leaf Gradient */}
              <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="45%" stopColor="#4d7c0f" />
                <stop offset="100%" stopColor="#1e3a10" />
              </linearGradient>

              {/* Fruit Radial Gradient */}
              <radialGradient id="fruitGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="45%" stopColor={fruitColor} />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>

              {/* Glowing Bio-Nutrient Root Flare */}
              <radialGradient id="soilGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#35441d" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1e2710" stopOpacity="0" />
              </radialGradient>

              {/* Soft Specular Filter */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Sub-surface Root Rhizosphere Glow */}
            <circle cx="250" cy="460" r={40 + progress * 45} fill="url(#soilGlow)" />

            {/* Fertile Soil Bed & Base Mound */}
            <ellipse cx="250" cy="460" rx="95" ry="18" fill="#1b230d" opacity="0.9" />
            <path
              d="M165,450 C210,440 290,440 335,450 C325,482 175,482 165,450 Z"
              fill="#263314"
            />

            {/* Root network radiating into living soil (Responsive to progress) */}
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
              <ellipse cx="0" cy="0" rx="14" ry="7" fill="#4d6328" stroke="#84cc16" strokeWidth="1" />
              {/* Nutrient emission particles */}
              {showBioNutrientOverlay && (
                <>
                  <circle cx="-6" cy="-4" r="1.5" fill="#bef264" className="animate-ping" />
                  <circle cx="6" cy="-3" r="1.5" fill="#bef264" className="animate-pulse" />
                </>
              )}
            </g>

            {/* Main Growing Stem (Curves organically with progress) */}
            <path
              d={`M250,446 C248,${446 - stemHeight * 0.4} ${252 + Math.sin(progress * 4) * 8},${
                446 - stemHeight * 0.72
              } 250,${446 - stemHeight}`}
              fill="none"
              stroke="url(#stemGrad)"
              strokeWidth={Math.max(4, 9 - progress * 2)}
              strokeLinecap="round"
            />

            {/* Lower Leaf Pair (Early Stage Unfurling) */}
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
                <path d="M0,0 C-35,10 -65,22 -85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.75" />
                {/* Right Leaf */}
                <path
                  d="M0,0 C40,-15 70,5 85,30 C65,35 20,25 0,0 Z"
                  fill="url(#leafGrad)"
                  stroke="#65a30d"
                  strokeWidth="1.2"
                />
                <path d="M0,0 C35,10 65,22 85,30" stroke="#bef264" strokeWidth="1" fill="none" opacity="0.75" />
              </g>
            )}

            {/* Middle Foliage Cluster (Mid Vegetative Stage) */}
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

            {/* Top Canopy Leaves (Full Sunlight Absorption) */}
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

            {/* Yellow Flower Blossoms (Emerge during flowering stage) */}
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

            {/* Fruit Cluster (Developing from green to radiant harvest red) */}
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

                {/* Vine connector */}
                <path
                  d="M0,0 C-10,8 -24,18 -24,18 M0,0 C10,8 24,18 24,18"
                  stroke="#3f6212"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            )}

            {/* Morning Dew Droplets */}
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
          Matching pill slider from reference video ("Add bio-nutrient & water" / "Harvest Ready • FCO 1985")
          ======================================================================
        */}
        <div className="max-w-lg mx-auto bg-[#293516]/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#485c28] shadow-2xl space-y-3.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#84cc16]" />
              <span className="font-extrabold text-[#f4efe6] tracking-wide">
                {growthStage > 85
                  ? isTe
                    ? 'పూర్తి పంట సిద్ధం (100% సేంద్రీయ దిగుబడి)'
                    : 'Harvest Ready • FCO 1985'
                  : isTe
                  ? 'సేంద్రీయ పోషకాలను & నీటిని జోడించండి'
                  : 'Add bio-nutrient & water'}
              </span>
            </div>

            <span className="text-[11px] font-mono font-bold text-[#bef264] bg-[#1e2710] px-2 py-0.5 rounded-md border border-[#485c28]">
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
              className="w-full h-3 bg-[#18200c] rounded-xl appearance-none cursor-pointer accent-[#84cc16] shadow-inner"
              title="Drag horizontally to simulate vegetative and fruit development"
            />
          </div>

          {/* Preset Stage Jump Pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px] font-mono">
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
                className={`py-1 rounded-lg border transition font-bold cursor-pointer ${
                  Math.abs(growthStage - st.val) < 15
                    ? 'bg-[#4d6328] text-white border-[#84cc16]'
                    : 'bg-[#1e2710]/70 text-[#a3b885] border-white/5 hover:bg-[#283515]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Autoplay & Controls Row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#3e4f24] text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#435725] hover:bg-[#526a2e] text-white rounded-xl font-bold transition active:scale-95 cursor-pointer border border-[#638038]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Autoplay Timelapse'}</span>
              </button>

              <button
                onClick={() => {
                  setGrowthStage(12);
                  setIsPlaying(false);
                }}
                className="p-1.5 hover:text-[#bef264] text-[#a3b885] transition rounded-lg hover:bg-[#1e2710]"
                title="Reset to seedling"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setShowBioNutrientOverlay(!showBioNutrientOverlay)}
              className="text-[10px] font-mono text-[#a3b885] hover:text-white underline cursor-pointer"
            >
              {showBioNutrientOverlay ? 'Hide Nutrient Flare' : 'Show Nutrient Flare'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
