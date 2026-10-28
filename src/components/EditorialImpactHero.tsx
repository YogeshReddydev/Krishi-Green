import React from 'react';
import { SupportedLanguage } from '../types';
import { Globe, PackageCheck, Award, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

interface EditorialImpactHeroProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
}

export const EditorialImpactHero: React.FC<EditorialImpactHeroProps> = ({
  language,
  onNavigate,
}) => {
  const isTe = language === 'te';

  return (
    <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-800/20 bg-[#1c240e] text-white">
      {/* Editorial Scenic Farmland Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />
      {/* Biophilic Olive Tint Overlay for High Contrast and Editorial Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141a0b] via-[#243114]/85 to-[#1c240e]/75 backdrop-blur-[1px]" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto space-y-12">
        {/* Editorial Sub-bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 text-xs font-mono tracking-wider text-emerald-200">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isTe ? 'అధికారిక క్షేత్ర నిరూపిత ఫలితాలు' : 'FIELD TESTED & AUDITED AGRONOMY'}
          </span>
          <span className="hidden sm:inline text-white/70">
            {isTe ? 'కేంద్ర ఎరువుల నియంత్రణ ఉత్తర్వు (FCO 1985) ధృవీకృతం' : 'CERTIFIED UNDER FCO 1985 & BEE CCTS'}
          </span>
        </div>

        {/* Main Editorial Headline - matches image_15506199 */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white font-sans">
            {isTe ? (
              <>
                తక్కువ ఇన్‌పుట్, అదే దిగుబడి —{' '}
                <span className="text-emerald-300 font-normal">
                  ఖచ్చితమైన పోషక లభ్యత మరియు పునరుద్ధరించిన నేల తేమతో ఎకరానికి ఖర్చు తగ్గింపు.
                </span>
              </>
            ) : (
              <>
                Less in, same out —{' '}
                <span className="text-emerald-200/95 font-normal">
                  precision uptake and mobilized soil-air reserves cut the nutrient demand per acre without cutting yield.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 font-normal max-w-2xl leading-relaxed">
            {isTe
              ? 'సాంప్రదాయ రసాయన ఎరువుల భారీ బస్తాలను రవాణా చేసే వ్యయాన్ని 1000 రెట్లు తగ్గించి, పంట వేరు వ్యవస్థకు అవసరమైన స్థూల, సూక్ష్మ పోషకాలను నేరుగా అందిస్తుంది.'
              : 'Our engineered micro-pelletized bio-carbon matrix eliminates the 80% volatilization waste of synthetic urea, delivering high-density mycorrhizae and organic NPK directly to crop rhizospheres.'}
          </p>
        </div>

        {/* Centerpiece 3D Box & Floating Frosted Glass Cards (Matches image_15506199) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Left Floating Card: Carbon Savings */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-6 bg-[#2a3818]/80 backdrop-blur-xl border border-white/15 shadow-xl hover:border-emerald-400/40 transition duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                ½ ton CO₂e
              </div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mt-1 mb-3">
                {isTe ? 'ఎకరానికి ఆదా అయిన ఉద్గారాలు' : 'Saved per acre'}
              </div>
              <p className="text-xs text-stone-300/90 leading-relaxed font-sans">
                {isTe
                  ? 'కృత్రిమ రసాయన ఎరువుల ఉత్పత్తి, నేల నైట్రస్ ఆక్సైడ్ (N₂O) విడుదల మరియు భారీ డీజిల్ రవాణా నివారణ ద్వారా ధృవీకరించిన పొదుపు.'
                  : 'Life-cycle analysis shows ~500–600 lb CO₂e savings per acre from eliminated synthetic fertilizer runs, avoided soil N₂O, and reduced heavy diesel transit.'}
              </p>
            </div>
          </div>

          {/* Center: 3D Product Box Rendering */}
          <div className="lg:col-span-6 flex justify-center py-6">
            <div className="relative group perspective-1000">
              {/* Soft Ambient Shadow under Box */}
              <div className="absolute -bottom-6 inset-x-8 h-8 bg-black/60 blur-xl rounded-full group-hover:blur-2xl transition duration-500" />

              {/* 3D Box Container */}
              <div className="relative w-72 sm:w-84 h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-[#415228] via-[#35441d] to-[#263314] border-t border-l border-white/30 border-b-4 border-r-4 border-black/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden transform hover:-translate-y-2 hover:rotate-1 transition-transform duration-500">
                {/* Pull tab ribbon */}
                <div className="absolute top-0 right-10 w-6 h-8 bg-amber-200/90 shadow-md rounded-b-sm border border-amber-300 transform -rotate-6" />

                {/* Subtle Box Pattern Texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Box Top Header */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-200/80 uppercase">BIO-CARBON FORMULATION</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">CropTab™ NPK</h3>
                    <p className="text-[10px] text-emerald-300 font-mono mt-0.5">CARBON-CAPSULE BIO-DELIVERY</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/20 text-emerald-100">
                    13g × 10
                  </span>
                </div>

                {/* Big Embossed Watermark in box center */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-[#4d6130] to-[#2e3b1a] border border-white/20 shadow-inner flex flex-col items-center justify-center p-3 text-center transform rotate-3">
                    <svg className="w-16 h-16 text-emerald-300/80 fill-current mb-1" viewBox="0 0 100 100">
                      <path d="M50 15 C35 30 20 50 20 70 C20 85 35 90 50 90 C65 90 80 85 80 70 C80 50 65 30 50 15 Z" opacity="0.6"/>
                      <path d="M50 35 C42 45 35 58 35 72 C35 80 42 85 50 85 C58 85 65 80 65 72 C65 58 58 45 50 35 Z" fill="#ffffff" opacity="0.3"/>
                      <circle cx="50" cy="65" r="8" fill="#a7f3d0"/>
                    </svg>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/90">
                      NPK 14-8-12 + TRACE
                    </span>
                  </div>
                </div>

                {/* Box Bottom Information with Barcode */}
                <div className="relative z-10 pt-3 border-t border-white/15 flex items-end justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-emerald-200/90 block">KrishiGreen™ Lab Spec</span>
                    <span className="text-[9px] text-white/70 block">FCO 1985 Grade 1 • Organic</span>
                  </div>
                  {/* Stylized Barcode */}
                  <div className="flex items-end gap-[2px] bg-white p-1 rounded">
                    {[3, 7, 2, 8, 4, 9, 2, 6, 8, 3, 5, 2, 9, 4, 6].map((h, i) => (
                      <div key={i} className="w-[2px] bg-black" style={{ height: `${h * 2 + 10}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Card: 1000x Lighter Logistics */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-6 bg-[#2a3818]/80 backdrop-blur-xl border border-white/15 shadow-xl hover:border-emerald-400/40 transition duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-110 transition">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                1000x lighter
              </div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mt-1 mb-3">
                {isTe ? 'రవాణా భారం తగ్గింపు' : 'Logistics footprint'}
              </div>
              <p className="text-xs text-stone-300/90 leading-relaxed font-sans">
                {isTe
                  ? 'ఒక్క 13 కిలోల పెట్టె 25 టన్నుల సాంప్రదాయ ఎరువుల పోషక సామర్థ్యాన్ని భర్తీ చేస్తుంది — సులభమైన కొరియర్ డెలివరీ, గన్నీ బస్తాల బాధ లేదు.'
                  : 'One 13 kg box replaces 25 tons of raw bulk fertilizer — courier-shippable, pallet-free, eliminating diesel freight overheads.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Stats Grid - matches image_12b8a4b1 */}
        <div className="border-t border-white/15 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-black tracking-tight text-white uppercase font-sans">
              {isTe ? 'క్షేత్ర నిరూపితం • రైతు విశ్వాసం' : 'Field-Tested. Farmer-Approved.'}
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/25 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">
                {isTe ? 'ప్రాంతీయ భాషలు' : 'Language Accessibility'}
              </span>
              <strong className="text-2xl font-black font-mono text-white">13+</strong>
              <p className="text-xs text-stone-300 mt-1">
                {isTe ? 'తెలుగు వాయిస్ & టెక్స్ట్ నమూనా' : 'Telugu voice & regional audio'}
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">
                {isTe ? 'రవాణా వ్యయం తగ్గింపు' : 'Transport Overhead'}
              </span>
              <strong className="text-2xl font-black font-mono text-white">-99%</strong>
              <p className="text-xs text-stone-300 mt-1">
                {isTe ? 'కొరియర్-షిప్పబుల్ కాంపాక్ట్ సైజు' : 'Courier delivery to doorstep'}
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">
                {isTe ? 'ఎకరానికి CO₂e నివారణ' : 'Emissions Avoided'}
              </span>
              <strong className="text-2xl font-black font-mono text-white">0.5 T</strong>
              <p className="text-xs text-stone-300 mt-1">
                {isTe ? 'BEE CCTS అర్హత గల క్రెడిట్లు' : 'Verified per acre / season'}
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">
                {isTe ? 'పెట్టుబడిపై రైతు రాబడి' : 'Farmer Net Return'}
              </span>
              <strong className="text-2xl font-black font-mono text-white">≥5×</strong>
              <p className="text-xs text-stone-300 mt-1">
                {isTe ? 'ఎరువుల ఖర్చు ఆదా + అధిక దిగుబడి' : 'Direct yield savings & DBT'}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isTe ? 'ల్యాబ్‌లో పరీక్షించబడింది & ధృవీకరించబడింది' : 'Tested across 1,400+ field trial plots in AP & Telangana'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('marketplace')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <span>{isTe ? 'ఉత్పత్తులు ఆర్డర్ చేయండి' : 'Request Access / Order'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
