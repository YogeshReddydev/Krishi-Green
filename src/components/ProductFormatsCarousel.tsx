import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ProductFormatsCarouselProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
  onOpenHelpline?: () => void;
}

interface FormatCard {
  id: string;
  name: string;
  tagline: string;
  taglineTe: string;
  suitability: string;
  suitabilityTe: string;
  weight: string;
  shelfLife: string;
  count: string;
  boxColor: string;
  boxBgGradient: string;
  tabletColor: string;
  accentBorder: string;
}

export const ProductFormatsCarousel: React.FC<ProductFormatsCarouselProps> = ({
  language,
  onNavigate,
  onOpenHelpline,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const formats: FormatCard[] = [
    {
      id: 'croptab-k',
      name: 'CropTab™ K',
      tagline: 'High-Potassium Bio-Capsule',
      taglineTe: 'పొటాషియం సమృద్ధి సేంద్రీయ క్యాప్సూల్',
      suitability: 'PERFECT FOR POTASSIUM-DEMANDING CROPS (Chilli, Cotton, Banana)',
      suitabilityTe: 'మిర్చి, పత్తి మరియు అరటి పంటలకు అత్యంత అనుకూలం',
      weight: '0.13 KG / 1.3 KG',
      shelfLife: 'SHELF LIFE – 2 YEARS',
      count: '■ X 10 / 100 TABLETS',
      boxColor: '#964f33', // Terracotta brown matching reference
      boxBgGradient: 'from-[#b05d3b] via-[#944c2f] to-[#73361e]',
      tabletColor: '#63311c',
      accentBorder: 'border-[#b05d3b]/40',
    },
    {
      id: 'croptab-n',
      name: 'CropTab™ N',
      tagline: 'Sustained-Release Nitrogen Bio-Matrix',
      taglineTe: 'నత్రజని పోషక సేంద్రీయ మాత్ర',
      suitability: 'PERFECT FOR NITROGEN-DEMANDING CROPS (Paddy, Wheat, Sugarcane)',
      suitabilityTe: 'వరి, గోధుమ మరియు చెరకు పంటలకు అనుకూలం',
      weight: '0.13 KG / 1.3 KG',
      shelfLife: 'SHELF LIFE – 2 YEARS',
      count: '■ X 10 / 100 TABLETS',
      boxColor: '#536860', // Sage green matching reference
      boxBgGradient: 'from-[#6c857b] via-[#536860] to-[#3a4a44]',
      tabletColor: '#34453e',
      accentBorder: 'border-[#6c857b]/40',
    },
    {
      id: 'croptab-npk',
      name: 'CropTab™ NPK',
      tagline: 'Full-Spectrum Microbial Bio-Active',
      taglineTe: 'సమగ్ర సూక్ష్మ పోషక ఎరువు',
      suitability: 'BALANCED N-P-K (2:1:1) + LIVING CARBON REGENERATION',
      suitabilityTe: 'అన్ని రకాల ఉద్యానవన మరియు కూరగాయల తోటలకు',
      weight: '0.25 KG / 2.5 KG',
      shelfLife: 'SHELF LIFE – 2 YEARS',
      count: '■ X 20 / 200 TABLETS',
      boxColor: '#3a4921', // Forest olive matching reference
      boxBgGradient: 'from-[#4d612c] via-[#3a4921] to-[#252f14]',
      tabletColor: '#1c240e',
      accentBorder: 'border-[#4d612c]/40',
    },
    {
      id: 'bio-enzyme-gold',
      name: 'BioEnzyme™ Gold',
      tagline: 'Liquid Humic & Fulvic Cold Extract',
      taglineTe: 'ద్రవ రూప జీవామృతం & హ్యూమిక్ యాసిడ్',
      suitability: 'FOLIAR SPRAY & DRIP IRRIGATION CONCENTRATE (1:200 DILUTION)',
      suitabilityTe: 'పిచికారీ మరియు డ్రిప్ ఇరిగేషన్ ద్వారా అందించడానికి',
      weight: '1 LITRE / 5 LITRES',
      shelfLife: 'SHELF LIFE – 3 YEARS',
      count: '■ CONCENTRATED FORMULATION',
      boxColor: '#92400e', // Amber gold
      boxBgGradient: 'from-[#b45309] via-[#92400e] to-[#78350f]',
      tabletColor: '#451a03',
      accentBorder: 'border-[#b45309]/40',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : formats.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < formats.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full rounded-[36px] overflow-hidden bg-[#f9f7f2] text-[#2c3325] p-6 sm:p-10 lg:p-14 shadow-xl border border-[#e5dfd3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222e17] tracking-tight leading-none">
              {language === 'te' ? 'రకాలు & లభ్యత' : 'Formats & Access'}
            </h2>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#5c6e45] font-mono pt-1">
              {language === 'te'
                ? 'ఎంపిక చేసిన రైతులు, ఎఫ్‌పీఓలు మరియు వ్యవసాయ భాగస్వాములకు అందుబాటులో ఉంది.'
                : "WE'RE EXPANDING ACCESS TO SELECT GROWERS AND AGRONOMY PARTNERS NATIONWIDE."}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-3 bg-[#445625] hover:bg-[#34421c] text-[#f9f7f2] font-black rounded-xl text-xs shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>• {language === 'te' ? 'యాక్సెస్ అభ్యర్థన' : 'REQUEST ACCESS'} •</span>
            </button>

            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-3 bg-white hover:bg-[#f1ebe0] text-[#34421c] font-black rounded-xl text-xs border border-[#cbd5bf] shadow-2xs transition active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>• {language === 'te' ? 'ఆర్డర్ సూచన పొందండి' : 'NOTIFY ME WHEN ORDERS OPEN'} •</span>
            </button>
          </div>

          {/* Carousel Arrows (Matching reference: Olive square buttons with white arrows) */}
          <div className="pt-8 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-lg bg-[#556930] hover:bg-[#435325] text-white flex items-center justify-center shadow-sm transition active:scale-95 cursor-pointer"
              aria-label="Previous format"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-lg bg-[#556930] hover:bg-[#435325] text-white flex items-center justify-center shadow-sm transition active:scale-95 cursor-pointer"
              aria-label="Next format"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Carousel of Packaging Cards */}
        <div className="lg:col-span-8 overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 52}%)`,
            }}
          >
            {formats.map((card) => (
              <div
                key={card.id}
                onClick={() => onNavigate('marketplace')}
                className="w-full min-w-[280px] sm:min-w-[340px] max-w-[360px] bg-[#f0eae0] rounded-2xl p-5 border border-[#dfd7c9] shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all duration-300"
              >
                {/* Header Specs */}
                <div className="space-y-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xl text-[#222e17] tracking-tight">
                      {card.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-gray-500">
                      {card.weight}
                    </span>
                  </div>

                  <p className="text-[10px] font-bold text-gray-600 uppercase font-mono tracking-wider">
                    {language === 'te' ? card.suitabilityTe : card.suitability}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
                    <span>{card.count}</span>
                    <span>{card.shelfLife}</span>
                  </div>
                </div>

                {/* 3D Packaging Box Mockup */}
                <div
                  className={`w-full h-64 rounded-xl bg-gradient-to-br ${card.boxBgGradient} text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group-hover:scale-102 transition-transform duration-300`}
                >
                  {/* Pull-tab tear strip accent */}
                  <div className="absolute top-0 right-10 w-6 h-3 bg-white/20 rounded-b-md" />

                  {/* Top Branding on box */}
                  <div className="space-y-0.5 z-10">
                    <span className="font-black text-lg sm:text-xl tracking-tight block">
                      {card.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-white/80 block font-mono">
                      CARBON-CAPSULE TECHNOLOGY DELIVERING NUTRIENTS WITH ZERO WASTE
                    </span>
                  </div>

                  {/* 3D Embossed Tablet Visual in center */}
                  <div className="my-auto flex items-center justify-center z-10">
                    <div
                      className="w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10"
                      style={{
                        backgroundColor: card.tabletColor,
                        boxShadow: '0 15px 30px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.2)',
                      }}
                    >
                      {/* Embossed Botanical Logo */}
                      <svg
                        className="w-12 h-12 text-white/40"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                      >
                        <path d="M50,22 C44,32 38,44 42,54 C46,64 54,64 58,54 C62,44 56,32 50,22 Z" />
                        <path d="M46,55 C36,48 24,46 16,52 C8,58 14,68 24,70 C34,72 42,65 46,55 Z" />
                        <path d="M54,55 C64,48 76,46 84,52 C92,58 86,68 76,70 C66,72 58,65 54,55 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Box Footer with Barcode & Net weight */}
                  <div className="flex items-center justify-between text-[9px] text-white/80 font-mono z-10 border-t border-white/10 pt-2">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white/70" />
                      <span>KrishiGreen Precision</span>
                    </div>
                    <span>{card.weight}</span>
                  </div>

                  {/* Large Faint Watermark Letter in background */}
                  <span className="absolute -bottom-6 -right-3 text-8xl font-black text-black/10 select-none pointer-events-none">
                    {card.name.slice(-1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
