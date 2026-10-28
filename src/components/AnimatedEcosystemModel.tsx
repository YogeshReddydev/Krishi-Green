import React, { useState, useEffect } from 'react';
import {
  Truck,
  FlaskConical,
  ShieldCheck,
  Sprout,
  Coins,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  Leaf,
  ChevronRight,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface AnimatedEcosystemModelProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
  onOpenHelpline: () => void;
}

interface EcosystemNode {
  id: string;
  number: string;
  title: string;
  titleTe: string;
  subtitle: string;
  subtitleTe: string;
  description: string;
  descriptionTe: string;
  metric: string;
  metricLabel: string;
  metricLabelTe: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  targetTab: string;
  cta: string;
  ctaTe: string;
}

export const AnimatedEcosystemModel: React.FC<AnimatedEcosystemModelProps> = ({
  language,
  onNavigate,
  onOpenHelpline,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [simulatedWasteKg, setSimulatedWasteKg] = useState<number>(10000);

  const nodes: EcosystemNode[] = [
    {
      id: 'aggregation',
      number: '01',
      title: 'City & Mandi Waste Intake',
      titleTe: 'కూరగాయల మార్కెట్ & వ్యర్థాల సేకరణ',
      subtitle: 'Zero Landfill Aggregation',
      subtitleTe: 'చెత్త డంపింగ్ నివారణ',
      description:
        'Segregated fruit and vegetable peelings, mandi surplus, and crop residues are collected through scheduled logistics and weighed on certified digital tare-scales.',
      descriptionTe:
        'మార్కెట్ మరియు వ్యవసాయ వ్యర్థాలను క్రమపద్ధతిలో సేకరించి ధృవీకరించిన కాటా బరువు స్లిప్పులతో ప్రాసెసింగ్ యూనిట్లకు తరలిస్తారు.',
      metric: `${(simulatedWasteKg / 1000).toFixed(1)} MT`,
      metricLabel: 'Biomass Aggregated',
      metricLabelTe: 'సేకరించిన వ్యర్థాలు',
      icon: Truck,
      color: '#d97706',
      targetTab: 'pipeline',
      cta: 'Schedule Waste Intake',
      ctaTe: 'వ్యర్థాల సేకరణ బుక్ చేయండి',
    },
    {
      id: 'bioprocess',
      number: '02',
      title: 'Controlled Bio-Fermentation',
      titleTe: 'నియంత్రిత బయో-ప్రాసెసింగ్',
      subtitle: 'Decentralized Microbial Transformation',
      subtitleTe: 'వికేంద్రీకృత సేంద్రీయ కిణ్వ ప్రక్రియ',
      description:
        'Biomass undergoes thermophilic aerobic stabilization with native microbial consortia and Eisenia foetida earthworms, monitored for temperature and 55% moisture.',
      descriptionTe:
        'వానపాములు మరియు సహజ సూక్ష్మజీవుల ద్వారా 55% తేమ మరియు సరైన ఉష్ణోగ్రత వద్ద శాస్త్రీయంగా సేంద్రీయ ఎరువుగా మారుస్తారు.',
      metric: '30-45 Days',
      metricLabel: 'Curing Cycle',
      metricLabelTe: 'తయారీ సమయం',
      icon: FlaskConical,
      color: '#059669',
      targetTab: 'pipeline',
      cta: 'Explore Processing Pipeline',
      ctaTe: 'ప్రాసెసింగ్ దశలను చూడండి',
    },
    {
      id: 'certification',
      number: '03',
      title: 'Certified Organic Formulation',
      titleTe: 'నాణ్యతా ధృవీకరణ & ఎరువుల సరఫరా',
      subtitle: 'FCO 1985 & QR Traceable',
      subtitleTe: 'ల్యాబ్ టెస్ట్ & క్యూఆర్ కోడ్',
      description:
        'Every batch is lab-tested for Nitrogen, Phosphorus, Potassium, and heavy metal limits. Farmers can scan unique batch QR codes to verify nutrient certificates.',
      descriptionTe:
        'ప్రతి బ్యాచ్ ఎన్‌పికె మరియు కర్బన శాతం కొరకు పరీక్షించబడి, పూర్తి పారదర్శకతతో క్యూఆర్ కోడ్ రూపంలో రైతుకు అందుబాటులో ఉంటుంది.',
      metric: `${Math.round(simulatedWasteKg * 0.45).toLocaleString('en-IN')} kg`,
      metricLabel: 'Bio-Compost Produced',
      metricLabelTe: 'ఉత్పత్తి అయిన సేంద్రీయ ఎరువు',
      icon: ShieldCheck,
      color: '#0284c7',
      targetTab: 'marketplace',
      cta: 'Browse Marketplace',
      ctaTe: 'ఎరువుల మార్కెట్ తెరవండి',
    },
    {
      id: 'soil_restoration',
      number: '04',
      title: 'Living Soil Health Regeneration',
      titleTe: 'సారవంతమైన నేల పునరుద్ధరణ',
      subtitle: 'Active Microbial Restoration',
      subtitleTe: 'నేల సేంద్రీయ కర్బన వృద్ధి',
      description:
        'Enriched bio-inputs rebuild depleted soil organic carbon (SOC) from 0.3% to >0.8%, reducing chemical DAP/Urea dependence by 40% while preserving groundwater.',
      descriptionTe:
        'ఈ సేంద్రీయ ఎరువులను నేలలో కలపడం వల్ల రసాయన ఎరువుల ఖర్చు 40% తగ్గి, నేల తేమ నిలుపుదల సామర్థ్యం రెట్టింపు అవుతుంది.',
      metric: `${Math.round((simulatedWasteKg * 0.45) / 50)} Bags`,
      metricLabel: 'Chemical DAP Displaced',
      metricLabelTe: 'ఆదా అయిన డీఏపీ సంచులు',
      icon: Sprout,
      color: '#16a34a',
      targetTab: 'rotation',
      cta: 'View Crop Rotation Schedule',
      ctaTe: 'పంట మార్పిడి పట్టిక చూడండి',
    },
    {
      id: 'farmer_prosperity',
      number: '05',
      title: 'Direct Farmer Revenue & Carbon Dividends',
      titleTe: 'రైతు నికర ఆదాయం & కార్బన్ లబ్ధి',
      subtitle: '70% DBT Revenue Waterfall',
      subtitleTe: '70% ప్రత్యక్ష రైతు ఖాతా జమ',
      description:
        'By avoiding open burning and landfill methane generation, farmers earn verifiable carbon dividends under BEE/ICM frameworks alongside crop yield bonuses.',
      descriptionTe:
        'వ్యర్థాల దహనం నివారించి సాధించిన కార్బన్ క్రెడిట్లలో 70% నేరుగా రైతుల బ్యాంక్ ఖాతాల్లో డీబీటీ ద్వారా జమ అవుతుంది.',
      metric: `₹${Math.round((simulatedWasteKg * 0.45 * 8) + (simulatedWasteKg * 0.4 * 6)).toLocaleString('en-IN')}`,
      metricLabel: 'Net Farmer Wealth Created',
      metricLabelTe: 'రైతులకు సమకూరిన నికర లబ్ధి',
      icon: Coins,
      color: '#ca8a04',
      targetTab: 'carbon',
      cta: 'Open Carbon Revenue Engine',
      ctaTe: 'కార్బన్ లబ్ధి ఇంజిన్ తెరవండి',
    },
  ];

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, nodes.length]);

  const activeNode = nodes[activeNodeIndex];
  const ActiveIcon = activeNode.icon;

  // Real-time calculated indicators based on simulator slider
  const compostKg = Math.round(simulatedWasteKg * 0.45);
  const chemicalSavings = Math.round(compostKg * 8);
  const methaneAvoidedKg = Math.round(simulatedWasteKg * 0.72);
  const carbonCreditsTons = +(methaneAvoidedKg / 1000).toFixed(2);
  const farmerCarbonPayout = Math.round(carbonCreditsTons * 750 * 0.7);
  const totalFarmerBenefit = chemicalSavings + farmerCarbonPayout;

  return (
    <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-emerald-900/10 shadow-md p-6 sm:p-8 space-y-6 overflow-hidden relative">
      {/* Subtle background ambient mesh */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Process Heading: Clean, authoritative, non-meta workflow description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-emerald-800 uppercase font-mono">
              {language === 'te' ? 'సేంద్రీయ మార్పిడి ప్రక్రియ' : 'Bio-Waste Conversion Process'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {language === 'te'
              ? 'ఆహార వ్యర్థాల నుండి రైతు సంపద వరకు 5-దశల నిరంతర ప్రక్రియ'
              : 'The Biological Conversion Process: From Surplus Food to Farmer Wealth'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            {language === 'te'
              ? 'మండి సేంద్రీయ వ్యర్థాల సేకరణ నుండి వికేంద్రీకృత ప్రాసెసింగ్, ల్యాబ్ ధృవీకరణ మరియు ప్రత్యక్ష డీబీటీ రైతు రాబడి వరకు నిరంతర ప్రవాహం.'
              : 'Continuous conversion workflow tracking food waste aggregation, thermophilic bioprocessing, certified organic nutrient extraction, and direct farmer dividends.'}
          </p>
        </div>

        {/* Automatic Visual Flow Status Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/90 text-xs font-mono font-bold text-emerald-900 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{language === 'te' ? 'నిరంతర ఆటోమేటిక్ ప్రవాహం' : 'Automated Visual Flow'}</span>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================
        THE 5-NODE INTERACTIVE FLOW CONDUIT:
        ======================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
        {nodes.map((node, index) => {
          const NodeIcon = node.icon;
          const isActive = index === activeNodeIndex;
          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveNodeIndex(index);
                // Pause momentarily on user inspection, then smoothly resume the automated visual flow
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 6000);
              }}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-emerald-950 to-emerald-900 text-white border-emerald-700 shadow-lg scale-102 ring-2 ring-emerald-500/20'
                  : 'bg-gray-50/80 hover:bg-white text-gray-800 border-gray-200 hover:border-emerald-300 shadow-xs'
              }`}
            >
              {/* Animated Progress indicator on active card */}
              {isActive && isPlaying && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-400 animate-pulse rounded-t-2xl" />
              )}

              <div className="flex items-center justify-between mb-2.5">
                <span
                  className={`text-xs font-black font-mono px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-200/80 text-gray-700'
                  }`}
                >
                  {node.number}
                </span>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isActive ? 'bg-emerald-700/80 text-emerald-200' : 'bg-white text-emerald-800 shadow-2xs'
                  }`}
                >
                  <NodeIcon className="w-4 h-4" />
                </div>
              </div>

              <h3
                className={`font-black text-xs leading-snug line-clamp-2 ${
                  isActive ? 'text-white' : 'text-gray-900'
                }`}
              >
                {language === 'te' ? node.titleTe : node.title}
              </h3>

              <p
                className={`text-[10px] mt-1 font-medium truncate ${
                  isActive ? 'text-emerald-200' : 'text-gray-500'
                }`}
              >
                {language === 'te' ? node.subtitleTe : node.subtitle}
              </p>

              <div
                className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                  isActive ? 'border-emerald-800 text-emerald-100 font-bold' : 'border-gray-200/70 text-gray-600'
                }`}
              >
                <span className="text-[10px] uppercase font-mono">{node.metricLabel.split(' ')[0]}</span>
                <span className="font-extrabold">{node.metric}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 
        ======================================================================
        ACTIVE NODE EXPANDED SPOTLIGHT:
        High-fidelity operational view with live interactive simulation
        ======================================================================
      */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/60 relative z-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Column: Stage Detail */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 text-xs font-mono font-black border border-emerald-400/30">
                PHASE {activeNode.number} OF 05
              </span>
              <span className="text-emerald-200 text-xs font-bold">
                {language === 'te' ? activeNode.subtitleTe : activeNode.subtitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <ActiveIcon className="w-7 h-7 text-emerald-300 shrink-0" />
              <span>{language === 'te' ? activeNode.titleTe : activeNode.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              {language === 'te' ? activeNode.descriptionTe : activeNode.description}
            </p>

            {/* Direct Real-Action Launch Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate(activeNode.targetTab)}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>{language === 'te' ? activeNode.ctaTe : activeNode.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenHelpline}
                className="px-4 py-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition border border-emerald-500/40 active:scale-98 cursor-pointer"
              >
                {language === 'te' ? 'వ్యవసాయ నిపుణుడిని సంప్రదించండి' : 'Speak with Agri-Technician'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Metric Highlight Card */}
          <div className="bg-black/30 rounded-2xl p-5 border border-white/10 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 font-mono block">
              {language === 'te' ? activeNode.metricLabelTe : activeNode.metricLabel}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {activeNode.metric}
            </div>
            <p className="text-[11px] text-gray-300 leading-tight">
              {language === 'te'
                ? 'సేకరించిన ఆహార వ్యర్థాల ఆధారంగా లెక్కించబడిన వాస్తవ ఉత్పత్తి మరియు పొదుపు లెక్కలు.'
                : 'Deterministic output calculated strictly from verified physical waste aggregation ratios.'}
            </p>
          </div>
        </div>

        {/* 
          ====================================================================
          BATCH SCALE & OUTPUT METRICS:
          Real-time deterministic impact calculation
          ====================================================================
        */}
        <div className="border-t border-emerald-800/80 pt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                {language === 'te' ? 'ప్రాసెసింగ్ బ్యాచ్ కొలమానాలు' : 'Processing Batch Scale & Yield'}
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                {language === 'te'
                  ? `పరిమాణం: ${(simulatedWasteKg / 1000).toLocaleString('en-IN')} మెట్రిక్ టన్నుల ఆహార వ్యర్థాల ప్రాసెసింగ్`
                  : `Conversion Yield for ${(simulatedWasteKg / 1000).toLocaleString('en-IN')} Metric Tons of Bio-Waste`}
              </h4>
            </div>

            {/* Quick preset buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              {[2000, 10000, 25000, 50000].map((val) => (
                <button
                  key={val}
                  onClick={() => setSimulatedWasteKg(val)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition cursor-pointer ${
                    simulatedWasteKg === val
                      ? 'bg-emerald-400 text-emerald-950 font-black'
                      : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50'
                  }`}
                >
                  {val >= 1000 ? `${val / 1000} MT` : `${val} kg`}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Control */}
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={simulatedWasteKg}
            onChange={(e) => setSimulatedWasteKg(Number(e.target.value))}
            className="w-full accent-emerald-400 h-2 bg-emerald-950 rounded-lg cursor-pointer"
            title="Adjust Simulated Waste Quantity"
          />

          {/* Computed Dynamic Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] text-emerald-300 block font-mono">
                {language === 'te' ? 'సేంద్రీయ ఎరువు' : 'Bio-Compost Yield'}
              </span>
              <strong className="text-base sm:text-lg font-black text-white font-mono block mt-0.5">
                {compostKg.toLocaleString('en-IN')} kg
              </strong>
              <span className="text-[10px] text-gray-400">@ 45% Conversion</span>
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] text-emerald-300 block font-mono">
                {language === 'te' ? 'రసాయన ఎరువుల ఆదా' : 'Chemical Cost Saved'}
              </span>
              <strong className="text-base sm:text-lg font-black text-emerald-300 font-mono block mt-0.5">
                ₹{chemicalSavings.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400">40% Less DAP/Urea</span>
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] text-emerald-300 block font-mono">
                {language === 'te' ? 'మీథేన్ ఉద్గార నివారణ' : 'Methane Avoided'}
              </span>
              <strong className="text-base sm:text-lg font-black text-sky-300 font-mono block mt-0.5">
                {methaneAvoidedKg.toLocaleString('en-IN')} kg
              </strong>
              <span className="text-[10px] text-gray-400">CO₂e Diverted</span>
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] text-amber-300 block font-mono">
                {language === 'te' ? 'రైతు నికర లబ్ధి' : 'Total Farmer Wealth'}
              </span>
              <strong className="text-base sm:text-lg font-black text-amber-300 font-mono block mt-0.5">
                ₹{totalFarmerBenefit.toLocaleString('en-IN')}
              </strong>
              <span className="text-[10px] text-gray-400">Compost + 70% Carbon DBT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
