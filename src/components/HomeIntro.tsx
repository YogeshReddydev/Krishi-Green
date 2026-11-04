import React, { useState } from 'react';
import {
  ArrowRight,
  Phone,
  ShoppingBag,
  RotateCcw,
  FileCheck2,
  TrendingUp,
  Flame,
  Layers,
  Bot,
  Truck,
  Tractor,
  Sparkles,
  CheckCircle2,
  Award,
  Calculator,
  ShieldCheck,
  Droplets,
  Scale,
  XCircle,
  HelpCircle,
  ChevronRight,
  Leaf,
  Sun,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { AnimatedEcosystemModel } from './AnimatedEcosystemModel';
import { SeasonalCropAdvice } from './SeasonalCropAdvice';
import { CropAdvisorySuggester } from './CropAdvisorySuggester';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedNewsTicker } from './AnimatedNewsTicker';
import { FarmerInteractivePanel } from './FarmerInteractivePanel';
import farmerWelcomeImg from '../assets/images/krishigreen_farmer_welcome_1791353512681.jpg';

interface HomeIntroProps {
  onNavigate: (tab: string) => void;
  onOpenHelpline: () => void;
  language: SupportedLanguage;
}

export const HomeIntro: React.FC<HomeIntroProps> = ({
  onNavigate,
  onOpenHelpline,
  language,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  // Interactive Product Station states
  const [productTab, setProductTab] = useState<'benefits' | 'calculator' | 'lab'>('benefits');
  const [calcCrop, setCalcCrop] = useState<string>('chilli');
  const [calcAcres, setCalcAcres] = useState<number>(2);

  // Category filter state for ecosystem cards
  const [serviceCategory, setServiceCategory] = useState<'all' | 'biomass' | 'marketplace' | 'schemes'>('all');

  // Interactive Method Comparison Tab
  const [comparisonMetric, setComparisonMetric] = useState<'all' | 'costs' | 'soil' | 'income'>('all');

  // Home Advisory Selector state
  const [homeAdviceView, setHomeAdviceView] = useState<'suggester' | 'calendar'>('suggester');

  // Crop dosage configurations for interactive station
  const cropDosageMap: Record<string, { name: string; nameTe: string; nameHi: string; bagsPerAcre: number; dapCut: number }> = {
    chilli: { name: 'Chilli / Pepper', nameTe: 'మిరప తోట', nameHi: 'मिर्च', bagsPerAcre: 5, dapCut: 1950 },
    cotton: { name: 'Cotton', nameTe: 'పత్తి', nameHi: 'कपास', bagsPerAcre: 6, dapCut: 2200 },
    paddy: { name: 'Paddy / Rice', nameTe: 'వరి', nameHi: 'धान / चावल', bagsPerAcre: 4, dapCut: 1600 },
    tomato: { name: 'Tomato / Veg', nameTe: 'టమోటా & కూరగాయలు', nameHi: 'टमाटर व सब्जियां', bagsPerAcre: 5, dapCut: 1850 },
    groundnut: { name: 'Groundnut', nameTe: 'వేరుశనగ', nameHi: 'मूंगफली', bagsPerAcre: 4, dapCut: 1500 },
  };

  const currentCropInfo = cropDosageMap[calcCrop] || cropDosageMap.chilli;
  const totalBagsNeeded = currentCropInfo.bagsPerAcre * calcAcres;
  const totalWeightKg = totalBagsNeeded * 50;
  const totalProductCost = totalBagsNeeded * 399;
  const estimatedDapSavings = currentCropInfo.dapCut * calcAcres;

  const ecosystemServices = [
    {
      tab: 'marketplace-machinery',
      category: 'marketplace',
      title: m.serviceMachineryTitle,
      shortBenefit: language === 'te' ? 'రైతులకు 50% సబ్సిడీతో ష్రెడ్డర్లు & ట్రాక్టర్లు' : language === 'hi' ? 'किसानों को 50% सब्सिडी पर श्रेडर व ट्रैक्टर' : 'Subsidized custom-hiring balers & shredders',
      icon: Tractor,
      tags: ['50% Subsidy', 'Zero Deposit'],
      color: 'from-amber-600 to-orange-600',
      actionLabel: m.serviceMachineryAction,
    },
    {
      tab: 'pipeline',
      category: 'biomass',
      title: m.servicePipelineTitle,
      shortBenefit: language === 'te' ? 'ద్వారపు వద్దనే బరువు చూసి తక్షణ చెల్లింపు' : language === 'hi' ? 'खेत पर ही तौल व तत्काल डीबीटी भुगतान' : 'Doorstep biomass weighing with instant DBT',
      icon: Layers,
      tags: ['Geotagged', '₹750/MT'],
      color: 'from-teal-600 to-emerald-600',
      actionLabel: m.servicePipelineAction,
    },
    {
      tab: 'marketplace-products',
      category: 'marketplace',
      title: m.serviceMarketplaceTitle,
      shortBenefit: language === 'te' ? 'FCO ధృవీకరించిన సేంద్రీయ ఎరువుల విక్రయం' : language === 'hi' ? 'एफसीओ 1985 प्रमाणित जैविक खाद की सीधी बिक्री' : 'Direct certified input marketplace for growers',
      icon: ShoppingBag,
      tags: ['FCO 1985', '₹399/Bag'],
      color: 'from-emerald-700 to-green-600',
      actionLabel: m.serviceMarketplaceAction,
    },
    {
      tab: 'carbon',
      category: 'schemes',
      title: m.serviceCarbonTitle,
      shortBenefit: language === 'te' ? '70% కార్బన్ క్రెడిట్ నగదు నేరుగా బ్యాంకులో' : language === 'hi' ? '70% प्रमाणित कार्बन क्रेडिट सीधे खाते में' : '70% verified carbon revenue credited to DBT',
      icon: Flame,
      tags: ['BEE / CCTS', '70% DBT'],
      color: 'from-teal-700 to-green-600',
      actionLabel: m.serviceCarbonAction,
    },
    {
      tab: 'rotation',
      category: 'biomass',
      title: m.serviceRotationTitle,
      shortBenefit: language === 'te' ? 'నేల సారాన్ని పెంచే శాస్త్రీయ పంట ప్రణాళిక' : language === 'hi' ? 'मिट्टी की नमी अनुसार वैज्ञानिक फसल चक्र' : 'Crop calendar matched to residual soil moisture',
      icon: RotateCcw,
      tags: ['Agromet AI', 'Moisture Map'],
      color: 'from-blue-600 to-cyan-500',
      actionLabel: m.serviceRotationAction,
    },
    {
      tab: 'schemes',
      category: 'schemes',
      title: m.serviceSchemesTitle,
      shortBenefit: language === 'te' ? 'పీఎం-కుసుమ్ & పీఎం-ప్రణామ్ రాయితీలు' : language === 'hi' ? 'पीएम-प्रणाम व पीएम-कुसुम अनुदान सहायक' : 'PM-PRANAM & PM-KUSUM grant navigators',
      icon: FileCheck2,
      tags: ['Govt Grants', '1-Click Apply'],
      color: 'from-purple-600 to-indigo-500',
      actionLabel: m.serviceSchemesAction,
    },
    {
      tab: 'impact',
      category: 'schemes',
      title: m.serviceImpactTitle,
      shortBenefit: language === 'te' ? 'వాస్తవ ల్యాబ్ డేటా మరియు క్షేత్రస్థాయి విశ్లేషణ' : language === 'hi' ? 'प्रमाणित जैविक प्रभाव व बचत का लाइव खाता' : 'Real-time ledger of diverted methane & humus',
      icon: TrendingUp,
      tags: ['Audited Data', 'Live Ledger'],
      color: 'from-green-600 to-emerald-600',
      actionLabel: m.serviceImpactAction,
    },
    {
      tab: 'helpline',
      category: 'schemes',
      title: m.serviceHelplineTitle,
      shortBenefit: language === 'te' ? '13 భాషలలో ఉచిత 24×7 వ్యవసాయ సలహా' : language === 'hi' ? '13 भारतीय भाषाओं में 24×7 निःशुल्क कृषि सलाह' : 'Toll-free voice advisor in 13 Indian languages',
      icon: Bot,
      tags: ['24×7 Free', '13 Languages'],
      color: 'from-rose-600 to-amber-600',
      actionLabel: m.serviceHelplineAction,
    },
  ];

  const filteredServices = ecosystemServices.filter((s) => {
    if (serviceCategory === 'all') return true;
    return s.category === serviceCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 
        ======================================================================
        1. ACTION-ORIENTED HERO COCKPIT:
        Tactile, visual, zero-fatigue entry point for farmers
        ======================================================================
      */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-900/20 text-white p-6 sm:p-8 lg:p-10 w-full flex flex-col justify-between">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${farmerWelcomeImg}')` }}
        />
        {/* Measured dark scrim for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/98 via-emerald-950/90 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/30" />

        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{m.nationalAgriInfra}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Krishi<span className="text-emerald-400">Green</span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-emerald-200/95 leading-snug">
            {t.tagline || m.heroTagline}
          </p>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg">
            {t.oneLiner || m.heroOneLiner}
          </p>

          {/* Quick-Action Launch Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('pipeline')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>{m.scheduleWasteCollection}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-2.5 bg-emerald-800/90 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer border border-emerald-500/40"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>{m.organicMarketplace}</span>
            </button>

            <button
              onClick={onOpenHelpline}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 transition flex items-center gap-1.5 active:scale-98 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200" />
              <span>1800-KRISHI-GRN</span>
            </button>
          </div>
        </div>

        {/* Tactile 4-Card Action Dock */}
        <div className="relative z-10 w-full mt-6 pt-4 border-t border-emerald-800/50">
          <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-300/80 mb-2.5">
            {language === 'te' ? 'రైతు తక్షణ చర్యలు:' : language === 'hi' ? 'त्वरित किसान क्रियाएं:' : 'Quick Farmer Actions:'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
            <button
              onClick={() => onNavigate('waste-management')}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 hover:border-emerald-400 rounded-2xl text-left transition group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Truck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
                <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <strong className="text-white block font-black text-xs">
                {language === 'te' ? 'వ్యర్థాల సేకరణ' : language === 'hi' ? 'कचरा उठाव अनुरोध' : 'Request Waste Collection'}
              </strong>
              <span className="text-[10px] text-emerald-200/80 block mt-0.5 truncate">
                {language === 'te' ? 'గ్రామం/మండీ నుండి సేకరణ' : language === 'hi' ? 'खेत पर तौल व सीधा उठाव' : 'Mandi & Farm Pickup'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('aga')}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 hover:border-emerald-400 rounded-2xl text-left transition group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <strong className="text-white block font-black text-xs">
                {language === 'te' ? 'AGA సేంద్రీయ ఎరువు' : language === 'hi' ? 'एजीए जैविक खाद' : 'AGA Organic Fertilizer'}
              </strong>
              <span className="text-[10px] text-emerald-200/80 block mt-0.5 truncate">
                {language === 'te' ? 'జీవామృతం & ఆవు పేడ ఎరువు' : language === 'hi' ? 'देसी गाय गोबर व जीवामृत' : 'Living Microbial Humus'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('equipment-hub')}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 hover:border-emerald-400 rounded-2xl text-left transition group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Tractor className="w-4 h-4 text-sky-400 group-hover:scale-110 transition" />
                <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <strong className="text-white block font-black text-xs">
                {language === 'te' ? 'సమీప వ్యవసాయ యంత్రాలు' : language === 'hi' ? 'नजदीकी कृषि उपकरण' : 'Find Farming Equipment'}
              </strong>
              <span className="text-[10px] text-emerald-200/80 block mt-0.5 truncate">
                {language === 'te' ? 'CHC హబ్‌లు & అద్దె యంత్రాలు' : language === 'hi' ? 'कस्टम हायरिंग केंद्र' : 'AP CHC Machinery Hubs'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('agriculture-updates')}
              className="p-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 hover:border-emerald-400 rounded-2xl text-left transition group cursor-pointer shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <Sun className="w-4 h-4 text-amber-300 group-hover:scale-110 transition" />
                <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <strong className="text-white block font-black text-xs">
                {language === 'te' ? 'వాతావరణం & పంట సలహాలు' : language === 'hi' ? 'मौसम व फसल सलाह' : 'Agri Weather & Updates'}
              </strong>
              <span className="text-[10px] text-emerald-200/80 block mt-0.5 truncate">
                {language === 'te' ? 'వర్షపాతం & మండి ధరలు' : language === 'hi' ? 'वर्षा व मंडी भाव' : 'Rain Radar & Mandi Prices'}
              </span>
            </button>
          </div>
        </div>

        {/* Real-World National Infrastructure Metrics */}
        <div className="relative z-10 w-full rounded-2xl bg-black/40 backdrop-blur-md border border-emerald-700/40 p-3 sm:p-4 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {m.geographicReach}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">{m.panIndiaNetwork}</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {m.farmerRevenueShare}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">{m.directDbt70}</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {m.qualityStandards}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">{m.fcoAndBee}</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {m.helplineSupport}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">{m.helpline24x7}</strong>
          </div>
        </div>
      </section>

      {/* 
        ======================================================================
        2. LIVE TELEMETRY STREAM & MANDI RATES
        ======================================================================
      */}
      <ScrollReveal>
        <AnimatedNewsTicker
          language={language}
          districtName="Palnadu / Guntur Hub"
          onScrollToNext={() => {
            const el = document.getElementById('flagship-station');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </ScrollReveal>

      {/* 
        ======================================================================
        3. INTERACTIVE FLAGSHIP PRODUCT STATION:
        Zero "Book to Read" fatigue — Real visuals + Interactive dosage tool
        ======================================================================
      */}
      <ScrollReveal>
        <section id="flagship-station" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 border-2 border-emerald-500/40 p-5 sm:p-7 text-white shadow-xl">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Header pill & title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-3 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{m.flagshipProduct}</span>
                <span className="text-emerald-400/60">·</span>
                <span>{m.officialStoreVisual}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {m.flagshipTitle}
              </h2>
            </div>

            {/* Interactive Mode Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-emerald-700/50 self-start sm:self-auto text-xs font-bold">
              <button
                onClick={() => setProductTab('benefits')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  productTab === 'benefits'
                    ? 'bg-emerald-500 text-emerald-950 font-black shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {language === 'te' ? 'ముఖ్యాంశాలు' : language === 'hi' ? 'मुख्य विशेषताएं' : 'Key Highlights'}
              </button>
              <button
                onClick={() => setProductTab('calculator')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  productTab === 'calculator'
                    ? 'bg-emerald-500 text-emerald-950 font-black shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'మోతాదు కాలిక్యులేటర్' : language === 'hi' ? 'मात्रा कैलकुलेटर' : 'Dosage Calc'}</span>
              </button>
              <button
                onClick={() => setProductTab('lab')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  productTab === 'lab'
                    ? 'bg-emerald-500 text-emerald-950 font-black shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'ల్యాబ్ రిపోర్ట్' : language === 'hi' ? 'लैब प्रमाण पत्र' : 'Lab Certificate'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Store Box */}
            <div className="lg:col-span-5 space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-400/50 shadow-2xl aspect-[4/3] sm:aspect-[4/5] bg-gradient-to-b from-[#03190f] to-[#010c07] flex items-center justify-center group">
                <img
                  src="/assets/aistudio/image_d4f93b65.png"
                  alt="KrishiGreen Flagship Grade-A Vermicompost"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-emerald-950 text-[10px] font-black uppercase tracking-wider">
                  FCO 1985 Grade 1
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs p-2 rounded-xl border border-white/10 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">₹399 / 50 kg</span>
                  <span className="text-[10px] text-emerald-300 font-mono">Batch: KG-2026-B08</span>
                </div>
              </div>
            </div>

            {/* Interactive Tab Body */}
            <div className="lg:col-span-7 space-y-4">
              {/* TAB 1: BENEFITS & SPECIFICATIONS */}
              {productTab === 'benefits' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-black/30 border border-emerald-500/30 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold text-xs">18.4% Living Bio-Humus</strong>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5">
                          {language === 'te' ? 'నేలలో సేంద్రీయ కర్బనాన్ని వేగంగా పునరుద్ధరిస్తుంది' : language === 'hi' ? 'मिट्टी के जैविक कार्बन को तुरंत सक्रिय करता है' : 'Rapidly activates depleted soil microbial biology'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/30 border border-emerald-500/30 flex items-start gap-2.5">
                      <Droplets className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold text-xs">3.2x Water Sponge</strong>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5">
                          {language === 'te' ? 'వర్షాభావ పరిస్థితుల్లో 10 రోజుల వరకు తేమ సంరక్షణ' : language === 'hi' ? 'कम पानी में भी 8-10 दिनों तक नमी बनाए रखता है' : 'Holds dew and irrigation moisture for 8-10 dry days'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/30 border border-emerald-500/30 flex items-start gap-2.5">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold text-xs">40% Chemical DAP Cut</strong>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5">
                          {language === 'te' ? 'ఖరీదైన రసాయన ఎరువుల ఖర్చును సగానికి తగ్గిస్తుంది' : language === 'hi' ? 'डीएपी और रासायनिक खाद की लागत में 40% तक कटौती' : 'Substitutes costly chemical fertilizer bags safely'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/30 border border-emerald-500/30 flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold text-xs">100% Odorless & Pure</strong>
                        <p className="text-[11px] text-emerald-200/80 mt-0.5">
                          {language === 'te' ? 'కలుపు విత్తనాలు లేని నాణ్యమైన గ్రాన్యూల్స్' : language === 'hi' ? 'खरपतवार मुक्त, 100% शुद्ध व गंधहीन खाद' : 'Zero weed seeds, lab-certified non-toxic formula'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Quantitative badges */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-emerald-300 block font-mono">Organic Carbon</span>
                      <strong className="text-sm font-black text-white">18.4%</strong>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-emerald-300 block font-mono">NPK Ratio</span>
                      <strong className="text-sm font-black text-white">1.8-1.2-1.4</strong>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-emerald-300 block font-mono">Moisture</span>
                      <strong className="text-sm font-black text-white">18.2%</strong>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] text-emerald-300 block font-mono">pH Balance</span>
                      <strong className="text-sm font-black text-amber-300">7.2 Neutral</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE DOSAGE & SAVINGS CALCULATOR */}
              {productTab === 'calculator' && (
                <div className="space-y-4 p-4 rounded-2xl bg-black/40 border border-emerald-500/40 animate-fadeIn text-xs">
                  <div>
                    <label className="text-[11px] text-emerald-300 font-bold block mb-1.5">
                      {language === 'te' ? 'మీ పంటను ఎంచుకోండి:' : language === 'hi' ? 'अपनी फसल चुनें:' : 'Select Your Target Crop:'}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(cropDosageMap).map(([key, crop]) => (
                        <button
                          key={key}
                          onClick={() => setCalcCrop(key)}
                          className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer text-xs ${
                            calcCrop === key
                              ? 'bg-emerald-400 text-emerald-950 font-black shadow-xs'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {language === 'te' ? crop.nameTe : language === 'hi' ? crop.nameHi : crop.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-emerald-300 font-bold block mb-1.5">
                      {language === 'te' ? 'పొలం విస్తీర్ణం (ఎకరాలు):' : language === 'hi' ? 'खेत का क्षेत्रफल (एकड़):' : 'Farm Acreage:'}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 5, 10].map((acres) => (
                        <button
                          key={acres}
                          onClick={() => setCalcAcres(acres)}
                          className={`flex-1 py-1.5 rounded-xl font-mono font-bold transition cursor-pointer text-xs ${
                            calcAcres === acres
                              ? 'bg-amber-400 text-amber-950 font-black shadow-xs'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {acres} {language === 'te' ? 'ఎకరాలు' : language === 'hi' ? 'एकड़' : acres === 1 ? 'Acre' : 'Acres'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculated Output Summary Strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-center">
                    <div>
                      <span className="text-[10px] text-emerald-300/80 block uppercase font-mono">
                        {language === 'te' ? 'అవసరమైన బస్తాలు' : language === 'hi' ? 'आवश्यक बोरियां' : 'Bags Required'}
                      </span>
                      <strong className="text-base font-black text-white">
                        {totalBagsNeeded} {language === 'te' ? 'బస్తాలు' : language === 'hi' ? 'बोरियां' : 'Bags'}
                      </strong>
                      <span className="text-[10px] text-emerald-200/70 block">({totalWeightKg} kg)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300/80 block uppercase font-mono">
                        {language === 'te' ? 'మొత్తం ఖర్చు' : language === 'hi' ? 'कुल लागत' : 'Investment'}
                      </span>
                      <strong className="text-base font-black text-amber-300">₹{totalProductCost.toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] text-emerald-200/70 block">@ ₹399/bag</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300/80 block uppercase font-mono">
                        {language === 'te' ? 'రసాయన ఎరువుల ఆదా' : language === 'hi' ? 'डीएपी खाद की बचत' : 'Est. DAP Saved'}
                      </span>
                      <strong className="text-base font-black text-emerald-300">₹{estimatedDapSavings.toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] text-emerald-200/70 block">
                        {language === 'te' ? 'ఖర్చు తగ్గింపు' : language === 'hi' ? 'लागत में बचत' : 'Chemical cut'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: LAB QA CERTIFICATE PREVIEW */}
              {productTab === 'lab' && (
                <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-emerald-500/40 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-mono text-emerald-300 font-bold">QA Lab Audit: KG-VERMI-2026-B08</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-400/30">
                      PASSED (FCO 1985)
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-300">Total Organic Carbon:</span>
                      <span className="text-white font-bold">18.4% (Standard min 16.0%)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-300">Total Nitrogen (as N):</span>
                      <span className="text-white font-bold">1.82% (Standard min 1.0%)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-300">C:N Ratio:</span>
                      <span className="text-white font-bold">14.1 (Ideal 12 - 18)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-300">Heavy Metals (Pb, Cd, As):</span>
                      <span className="text-emerald-400 font-bold">ND (Below Detection Limits)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-300">Pathogens (Salmonella / E. coli):</span>
                      <span className="text-emerald-400 font-bold">Absent (100% Sterile)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Direct Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('marketplace-products')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-950 font-black rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{m.requestBioSupply}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('pipeline')}
                  className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs sm:text-sm transition border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>{m.viewLabCertificate}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 
        ======================================================================
        4. FARMER INTERACTIVE TOOLS: EARNINGS CALCULATOR & QUICK PICKUP
        ======================================================================
      */}
      <ScrollReveal>
        <div className="w-full">
          <FarmerInteractivePanel
            language={language}
            onOpenHelpline={onOpenHelpline}
            onNavigate={onNavigate}
            weatherTemp="28°C"
            weatherRain="15%"
          />
        </div>
      </ScrollReveal>

      {/* 
        ======================================================================
        5. FARMER ADVISORY: CROP & AGA SUGGESTER + SEASONAL CALENDAR
        ======================================================================
      */}
      <div id="seasonal-advice-block" className="space-y-4">
        {/* View Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-800">
              {language === 'te'
                ? 'వ్యవసాయ సలహా సాధనాలు'
                : language === 'hi'
                ? 'कृषि सलाहकार टूल्स'
                : 'Agricultural Advisory Tools'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-emerald-50 rounded-xl border border-emerald-200">
            <button
              onClick={() => setHomeAdviceView('suggester')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                homeAdviceView === 'suggester'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-emerald-900 hover:bg-emerald-100/60'
              }`}
            >
              <span>🌾</span>
              <span>
                {language === 'te'
                  ? 'స్మార్ట్ పంట & ఎరువు సలహా'
                  : language === 'hi'
                  ? 'स्मार्ट फसल व खाद सलाहकार'
                  : 'Custom Crop & AGA Suggester'}
              </span>
            </button>

            <button
              onClick={() => setHomeAdviceView('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                homeAdviceView === 'calendar'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-emerald-900 hover:bg-emerald-100/60'
              }`}
            >
              <span>📅</span>
              <span>
                {language === 'te'
                  ? 'సీజనల్ పంట క్యాలెండర్'
                  : language === 'hi'
                  ? 'मौसमी फसल कैलेंडर'
                  : 'Seasonal Crop Calendar'}
              </span>
            </button>
          </div>
        </div>

        <ScrollReveal>
          {homeAdviceView === 'suggester' ? (
            <CropAdvisorySuggester
              language={language}
              onOpenBooking={(crop, bags) => {
                onNavigate('marketplace-products');
              }}
            />
          ) : (
            <SeasonalCropAdvice language={language} onNavigate={onNavigate} />
          )}
        </ScrollReveal>
      </div>

      {/* 
        ======================================================================
        6. VISUAL COMPARISON: TRADITIONAL CHEMICAL FARMING vs KRISHIGREEN
        Replaces the boring "Three Pillars" reading text with a visual decision matrix
        ======================================================================
      */}
      <ScrollReveal>
        <section className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                {language === 'te' ? 'వాస్తవ పోలిక' : language === 'hi' ? 'वास्तविक अंतर' : 'THE REAL DIFFERENCE'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {language === 'te'
                  ? 'రసాయన సేద్యం vs కృషిగ్రీన్ సేంద్రీయ చక్రం'
                  : language === 'hi'
                  ? 'पारंपरिक रासायनिक खेती बनाम कृषिग्रीन जैविक चक्र'
                  : 'Conventional Chemical Farming vs. KrishiGreen Bio-Loop'}
              </h3>
            </div>

            {/* Quick Filter Switch */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setComparisonMetric('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  comparisonMetric === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {language === 'te' ? 'అన్నీ' : language === 'hi' ? 'सभी' : 'Full Matrix'}
              </button>
              <button
                onClick={() => setComparisonMetric('costs')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  comparisonMetric === 'costs' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {language === 'te' ? 'ఖర్చులు' : language === 'hi' ? 'लागत' : 'Input Costs'}
              </button>
              <button
                onClick={() => setComparisonMetric('soil')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  comparisonMetric === 'soil' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {language === 'te' ? 'నేల సారం' : language === 'hi' ? 'मिट्टी की उर्वरता' : 'Soil Health'}
              </button>
            </div>
          </div>

          {/* 2-Column Side-by-Side Visual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Conventional Chemical Approach */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-200/80 text-rose-900 text-xs font-black">
                  {language === 'te' ? 'రసాయన పద్ధతి' : language === 'hi' ? 'पारंपरिक रासायनिक विधि' : 'Conventional Chemical Approach'}
                </span>
                <XCircle className="w-5 h-5 text-rose-600" />
              </div>

              <div className="space-y-2.5 text-xs text-rose-950">
                {(comparisonMetric === 'all' || comparisonMetric === 'costs') && (
                  <div className="p-2.5 rounded-xl bg-white/80 border border-rose-100 flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <div>
                      <strong>
                        {language === 'te' ? 'ఖరీదైన రసాయనాలు:' : language === 'hi' ? 'अधिक लागत:' : 'High Input Cost:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? 'ఎకరాకు ₹4,500 - ₹6,000 వరకు ఖర్చు'
                          : language === 'hi'
                          ? 'डीएपी और रसायनों पर ₹4,500 - ₹6,000 प्रति एकड़ खर्च'
                          : '₹4,500 - ₹6,000/acre on DAP & chemical fertilizers'}
                      </span>
                    </div>
                  </div>
                )}

                {(comparisonMetric === 'all' || comparisonMetric === 'soil') && (
                  <div className="p-2.5 rounded-xl bg-white/80 border border-rose-100 flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <div>
                      <strong>
                        {language === 'te' ? 'నేల క్షీణత:' : language === 'hi' ? 'मिट्टी का बंजर होना:' : 'Depleted Soil Biology:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? 'సేంద్రీయ కర్బనం <0.3% కు పడిపోయి గట్టిపడుతుంది'
                          : language === 'hi'
                          ? 'जैविक कार्बन <0.3% तक गिरकर मिट्टी सख्त हो जाती है'
                          : 'Soil Organic Carbon <0.3%, hardpan soil crusting'}
                      </span>
                    </div>
                  </div>
                )}

                {(comparisonMetric === 'all' || comparisonMetric === 'income') && (
                  <div className="p-2.5 rounded-xl bg-white/80 border border-rose-100 flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✕</span>
                    <div>
                      <strong>
                        {language === 'te' ? 'వ్యర్థాలు దహనం:' : language === 'hi' ? 'पराली जलाना:' : 'Stubble Burning:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? 'జీరో ఆదాయం, కాలుష్యం & జరిమానాలు'
                          : language === 'hi'
                          ? 'शून्य आय, वायु प्रदूषण और चालान का जोखिम'
                          : 'Crop residues burned or dumped with zero revenue'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* KrishiGreen Bio-Loop Approach */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-black shadow-xs">
                  {language === 'te' ? 'కృషిగ్రీన్ సేంద్రీయ చక్రం' : language === 'hi' ? 'कृषिग्रीन जैविक चक्र' : 'KrishiGreen Closed-Loop Bio-Model'}
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="space-y-2.5 text-xs text-emerald-950">
                {(comparisonMetric === 'all' || comparisonMetric === 'costs') && (
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <div>
                      <strong>
                        {language === 'te' ? '40% తక్కువ ఖర్చు:' : language === 'hi' ? '40% कम लागत:' : '40% Lower Input Cost:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? 'ఎకరాకు ₹2,200 మాత్రమే ఖర్చు అవుతుంది'
                          : language === 'hi'
                          ? 'प्रति एकड़ केवल ₹2,200 खर्च; डीएपी की 40% बचत'
                          : 'Only ~₹2,200/acre; displaces costly chemical DAP'}
                      </span>
                    </div>
                  </div>
                )}

                {(comparisonMetric === 'all' || comparisonMetric === 'soil') && (
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <div>
                      <strong>
                        {language === 'te' ? 'సజీవ నేల సారం:' : language === 'hi' ? '18.4% जैविक कार्बन:' : '18.4% Organic Carbon:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? '3.2 రెట్ల నీటి నిల్వ సామర్థ్యంతో కరువు తట్టుకుంటుంది'
                          : language === 'hi'
                          ? '3.2 गुना अधिक नमी सोखने की क्षमता; सूखे से बचाव'
                          : '3.2x water sponge protects crops through 10 dry days'}
                      </span>
                    </div>
                  </div>
                )}

                {(comparisonMetric === 'all' || comparisonMetric === 'income') && (
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <div>
                      <strong>
                        {language === 'te' ? 'వ్యర్థాల నుండి ఆదాయం:' : language === 'hi' ? 'कचरे से आय व कार्बन क्रेडिट:' : 'Waste-to-Wealth & Carbon:'}
                      </strong>
                      <span className="block text-[11px] text-gray-600">
                        {language === 'te'
                          ? 'టన్నుకు ₹750 రాబడి + 70% కార్బన్ క్రెడిట్ జమ'
                          : language === 'hi'
                          ? '₹750 प्रति टन कचरा आय + 70% सीधा डीबीटी भुगतान'
                          : '₹750/MT aggregation revenue + 70% direct DBT'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 
        ======================================================================
        7. BIOLOGICAL CONVERSION PROCESS ANIMATION (Streamlined)
        ======================================================================
      */}
      <ScrollReveal>
        <AnimatedEcosystemModel
          language={language}
          onNavigate={onNavigate}
          onOpenHelpline={onOpenHelpline}
        />
      </ScrollReveal>

      {/* 
        ======================================================================
        8. ECOSYSTEM SERVICES & OPERATIONS (Filterable, Actionable Hub)
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 font-mono">
              {t.platformModules || 'OPERATIONAL ECOSYSTEM'}
            </span>
            <h3 className="font-black text-lg sm:text-xl text-gray-900">
              {t.platformModulesDesc || 'Ecosystem Services & Agricultural Tools'}
            </h3>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold">
            <button
              onClick={() => setServiceCategory('all')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                serviceCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tools (8)
            </button>
            <button
              onClick={() => setServiceCategory('biomass')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                serviceCategory === 'biomass'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Biomass & Soil (2)
            </button>
            <button
              onClick={() => setServiceCategory('marketplace')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                serviceCategory === 'marketplace'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Machinery & Market (2)
            </button>
            <button
              onClick={() => setServiceCategory('schemes')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                serviceCategory === 'schemes'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grants & Help (4)
            </button>
          </div>
        </div>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.tab}
                  onClick={() => onNavigate(service.tab)}
                  className="kg-card relative rounded-3xl border border-emerald-900/10 bg-white p-5 shadow-xs hover:border-emerald-500 hover:shadow-lg cursor-pointer flex flex-col justify-between group active:scale-98 transition"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color} rounded-t-3xl`} />

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${service.color} shadow-sm group-hover:scale-105 transition`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex gap-1">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-mono font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-black text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                      {service.title}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {service.shortBenefit}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-black text-emerald-800">
                    <span className="group-hover:underline">{service.actionLabel}</span>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition">
                      <ArrowRight className="w-3.5 h-3.5 transition transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
