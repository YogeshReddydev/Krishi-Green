import React, { useState } from 'react';
import {
  Truck,
  Filter,
  Flame,
  QrCode,
  Store,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  Sprout,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface OurProcessSectionProps {
  onNavigate: (tab: string) => void;
  language: SupportedLanguage;
}

export const OurProcessSection: React.FC<OurProcessSectionProps> = ({
  onNavigate,
  language,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const isTe = language === 'te';

  const steps = [
    {
      stepNumber: '01',
      title: isTe ? 'వ్యర్థాల సేకరణ' : 'Waste Collection',
      subtitle: isTe ? 'రైతు & మండి సేకరణ' : 'Geotagged Feedstock Ingestion',
      timeline: isTe ? 'రోజు 1' : 'Day 1',
      description: isTe
        ? 'కూరగాయల మార్కెట్, కిచెన్ ఆర్గానిక్ వేస్ట్ మరియు పంట అవశేషాలను గ్రామస్థాయి ట్రాక్టర్ల ద్వారా నిర్దేశిత సమయానికి సేకరించడం.'
        : 'Segregated aggregation of vegetable mandi refuse, food waste, and paddy stubble via scheduled village tractor pickups.',
      highlight: isTe ? 'జీరో వ్యర్థాలు ల్యాండ్‌ఫిల్‌కు' : 'Zero Landfill Methane',
      icon: Truck,
      color: 'from-amber-600 to-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      targetTab: 'pipeline',
      targetLabel: isTe ? 'సేకరణ అభ్యర్థన' : 'View Collection',
    },
    {
      stepNumber: '02',
      title: isTe ? 'సార్టింగ్ & ముందస్తు శుద్ధి' : 'Sorting & Pre-Treatment',
      subtitle: isTe ? 'పరిమాణం తగ్గింపు & C:N నిష్పత్తి' : 'Shredding & C:N Balancing',
      timeline: isTe ? 'రోజు 2 - 4' : 'Day 2 - 4',
      description: isTe
        ? 'సేకరించిన వ్యర్థాలను 2-3 సెం.మీ పరిమాణంలో ముక్కలు చేయడం, ప్లాస్టిక్ తొలగించడం మరియు ఆవు పేడతో 30:1 కార్బన్-నత్రజని నిష్పత్తిని సమతుల్యం చేయడం.'
        : 'Mechanical shredding to 2-3 cm size, inorganic removal, and blending with cow dung slurry to achieve ideal 30:1 C:N ratio.',
      highlight: isTe ? '60% తేమ నిర్వహణ' : '60% Moisture Regulated',
      icon: Filter,
      color: 'from-emerald-700 to-teal-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      targetTab: 'pipeline',
      targetLabel: isTe ? 'ప్రాసెసింగ్ బ్యాచ్‌లు' : 'View Processing',
    },
    {
      stepNumber: '03',
      title: isTe ? 'వర్మికంపోస్టింగ్ & బయో-ప్రాసెసింగ్' : 'Bio-Processing & Composting',
      subtitle: isTe ? 'ఎరువుల తయారీ దశ' : 'Aerobic Vermi-Transformation',
      timeline: isTe ? 'రోజు 5 - 38' : 'Day 5 - 38',
      description: isTe
        ? 'ఐసీనియా ఫెటిడా వానపాములు మరియు ప్రత్యేక సూక్ష్మజీవుల ద్వారా 35-40 రోజుల పాటు ఏరోబిక్ పద్ధతిలో సేంద్రీయ ఎరువుగా మార్పిడి చేయడం.'
        : 'Inoculation with Eisenia fetida earthworms & native bio-cultures under shaded, moisture-monitored beds with periodic aerating turns.',
      highlight: isTe ? '55°C సహజ పాశ్చరైజేషన్' : '55°C Pasteurization',
      icon: Sprout,
      color: 'from-green-700 to-emerald-800',
      badgeBg: 'bg-green-100 text-green-800 border-green-300',
      targetTab: 'pipeline',
      targetLabel: isTe ? 'కంపోస్ట్ పర్యవేక్షణ' : 'Track Batches',
    },
    {
      stepNumber: '04',
      title: isTe ? 'నాణ్యత పరీక్ష & QR ట్రేసబిలిటీ' : 'Quality Testing & QR Code',
      subtitle: isTe ? 'ల్యాబ్ సర్టిఫికేషన్' : 'Lab Certification & Traceability',
      timeline: isTe ? 'రోజు 39 - 42' : 'Day 39 - 42',
      description: isTe
        ? 'కేవీకే (KVK) ల్యాబ్‌లలో NPK, సేంద్రీయ కార్బన్ శాతం మరియు పోషక విలువల ధృవీకరణ. ప్రతి బ్యాచ్‌కు పారదర్శక డిజిటల్ QR కోడ్ కేటాయింపు.'
        : 'KVK laboratory testing for NPK (1.8 : 1.2 : 1.4), organic carbon (>16%), and affixing unique tamper-proof digital QR traceability tags.',
      highlight: isTe ? '100% FCO 1985 ప్రమాణాలు' : '100% Organic Certified',
      icon: QrCode,
      color: 'from-teal-700 to-cyan-800',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
      targetTab: 'pipeline',
      targetLabel: isTe ? 'QR ధృవీకరణ' : 'Verify Batches',
    },
    {
      stepNumber: '05',
      title: isTe ? 'రైతులకు పంపిణీ & యంత్రాల అద్దె' : 'FPO Distribution & Machinery',
      subtitle: isTe ? 'గ్రామ మార్కెట్ కేంద్రం' : 'Custom Hiring & Delivery',
      timeline: isTe ? 'రోజు 43 - 45' : 'Day 43 - 45',
      description: isTe
        ? 'ఎఫ్పీవోల (FPO) ద్వారా నేరుగా రైతులకు సరఫరా మరియు కస్టమ్ హైరింగ్ కేంద్రాల ద్వారా రాయితీపై ఎరువుల పిచికారీ యంత్రాలు అందించడం.'
        : 'Direct distribution through Farmer Producer Organizations (FPOs) and subsidized machinery dispatch for uniform field application.',
      highlight: isTe ? 'కస్టమ్ హైరింగ్ సదుపాయం' : 'Custom Hiring Dispatch',
      icon: Store,
      color: 'from-blue-700 to-indigo-800',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
      targetTab: 'marketplace',
      targetLabel: isTe ? 'మార్కెట్‌ప్లేస్' : 'Explore Market',
    },
    {
      stepNumber: '06',
      title: isTe ? 'సేంద్రీయ దిగుబడి & నేల సంపద' : 'Organic Yield & Soil Wealth',
      subtitle: isTe ? 'సమృద్ధి పంట & కార్బన్ ఆదా' : 'Flourishing Harvest & Soil Health',
      timeline: isTe ? 'పంట కాలం' : 'Harvest Season',
      description: isTe
        ? 'రసాయన డీఏపీ వాడకం 40% తగ్గింపు, పంట దిగుబడి 20-30% పెంపు మరియు భూమిలో సేంద్రీయ కార్బన్ శాతం పెరుగుదలతో శాశ్వత నేల సారవంతం.'
        : 'Cuts synthetic fertilizer costs by 40%, boosts crop yields by 20-30%, enhances soil organic carbon (SOC), and restores microbial biodiversity.',
      highlight: isTe ? '+25-35% లాభదాయక దిగుబడి' : '+25-35% Superior Yield',
      icon: Award,
      color: 'from-amber-700 to-emerald-800',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      targetTab: 'impact',
      targetLabel: isTe ? 'ప్రయోజన లెక్కింపు' : 'Calculate ROI',
    },
  ];

  return (
    <section className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden p-5 sm:p-7 relative">
      {/* Decorative Agri Backdrop Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-emerald-100/50 via-teal-50/20 to-transparent rounded-full pointer-events-none -mr-20 -mt-20 blur-2xl" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-2">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700 animate-spin-slow" />
            <span>{isTe ? 'మా సమగ్ర విధానం' : 'Our End-to-End Process'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            {isTe ? (
              <>
                వ్యర్థాల సేకరణ నుండి <span className="text-emerald-700">సేంద్రీయ దిగుబడి</span> వరకు
              </>
            ) : (
              <>
                From Waste Collection to <span className="text-emerald-700">Organic Yield</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl font-medium">
            {isTe
              ? 'ఆహార మరియు వ్యవసాయ వ్యర్థాలను 45 రోజుల్లో ధృవీకరించబడిన పోషక ఎరువులుగా మార్చే పారదర్శక వృత్తాకార జీవ-విధానం.'
              : 'A transparent 6-stage circular bio-economy flow turning vegetable mandi refuse and crop stubble into certified organic nutrition.'}
          </p>
        </div>

        {/* Quick Summary Pill & Legend */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{isTe ? 'పూర్తి 45-రోజుల లైఫ్‌సైకిల్' : '45-Day Closed Loop'}</span>
          </div>
          <span className="text-[11px] text-gray-400 hidden lg:inline">
            {isTe ? 'దశపై క్లిక్ చేసి వివరాలు చూడండి' : 'Click any step to inspect'}
          </span>
        </div>
      </div>

      {/* Horizontal Flow Chart Container */}
      <div className="relative z-10 pt-6">
        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-2 lg:hidden">
          <span>{isTe ? '← ప్రవాహాన్ని వీక్షించడానికి స్క్రోల్ చేయండి →' : '← Swipe horizontally to view full process →'}</span>
          <span className="text-emerald-700 font-bold">{activeStep + 1} of 6</span>
        </div>

        {/* Horizontal Track */}
        <div className="overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-gray-50">
          <div className="flex items-stretch gap-3 min-w-[980px] lg:min-w-0 lg:grid lg:grid-cols-6">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-gray-50/80 border-gray-200 hover:border-emerald-300 shadow-2xs'
                  }`}
                >
                  {/* Step Connector Arrow (visible on desktop between items except the last) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-emerald-200 shadow-xs items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div>
                    {/* Top Row: Step Number & Timeline Tag */}
                    <div className="flex items-center justify-between gap-1 mb-3">
                      <span className="font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                        {step.stepNumber}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {step.timeline}
                      </span>
                    </div>

                    {/* Step Icon with Gradient */}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-sm font-black text-gray-900 leading-tight mb-1 group-hover:text-emerald-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-700 mb-2">
                      {step.subtitle}
                    </p>

                    {/* Step Brief Description */}
                    <p className="text-[11px] text-gray-600 leading-relaxed font-normal mb-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom: Highlight Badge & Navigation Action */}
                  <div className="pt-3 border-t border-gray-100/90 space-y-2 mt-auto">
                    <span
                      className={`inline-block w-full text-center text-[10px] font-extrabold px-2 py-1 rounded-md border ${step.badgeBg}`}
                    >
                      {step.highlight}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(step.targetTab);
                      }}
                      className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <span>{step.targetLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Deep Dive Banner */}
        <div className="mt-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-700/50 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                {isTe ? `దశ ${steps[activeStep].stepNumber}` : `Step ${steps[activeStep].stepNumber} Focus`}
              </span>
              <h4 className="text-sm sm:text-base font-black text-white">
                {steps[activeStep].title} — {steps[activeStep].subtitle}
              </h4>
            </div>
            <p className="text-xs text-emerald-100/90 max-w-3xl leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>

          <button
            onClick={() => onNavigate(steps[activeStep].targetTab)}
            className="shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>
              {isTe
                ? `${steps[activeStep].title} మోడ్యూల్ తెరవండి`
                : `Launch ${steps[activeStep].title}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
