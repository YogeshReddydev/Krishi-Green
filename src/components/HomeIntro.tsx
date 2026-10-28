import React from 'react';
import {
  ArrowRight,
  Phone,
  ShoppingBag,
  RotateCcw,
  FileCheck2,
  TrendingUp,
  MapPin,
  Flame,
  Layers,
  Bot,
  Truck,
  Tractor,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { AnimatedEcosystemModel } from './AnimatedEcosystemModel';
import { InteractiveGrowthExperience } from './InteractiveGrowthExperience';
import { Interactive3DCapsule } from './Interactive3DCapsule';
import { EditorialImpactHero } from './EditorialImpactHero';
import { ProductFormatsCarousel } from './ProductFormatsCarousel';
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

  const ecosystemServices = [
    {
      tab: 'ap-pilot',
      title: language === 'te' ? 'కస్టమ్ హైరింగ్ & వ్యవసాయ యంత్రాలు' : 'Custom Hiring Centres & Machinery',
      desc: language === 'te'
        ? 'ట్రాక్టర్లు, వరి గడ్డి బేలర్లు, బయో-ష్రెడ్డర్లు మరియు కంపోస్టింగ్ యంత్రాల అద్దె బుకింగ్, సబ్సిడీ కొటేషన్లు.'
        : 'Book verified tractors, balers, shredders, and compost machinery with SMAM subsidy discount calculations and instant field delivery.',
      icon: Tractor,
      color: 'from-emerald-700 to-teal-600',
      actionLabel: language === 'te' ? 'యంత్రాల అద్దె బుక్ చేయండి' : 'Book Farm Machinery',
    },
    {
      tab: 'pipeline',
      title: language === 'te' ? 'వ్యర్థాల నుండి సంపద పైప్‌లైన్' : 'Waste-to-Wealth Conversion Pipeline',
      desc: language === 'te'
        ? 'మండి ఆహార వ్యర్థాల డిక్లరేషన్, కాటా బరువు స్లిప్పులు, రవాణా ట్రాకింగ్ మరియు ల్యాబ్ పరీక్షల 16-దశల నివేదిక.'
        : 'Transparent 16-stage conversion workflow from mandi collection, weighbridge slips, and bio-fermentation to FCO 1985 certified batches.',
      icon: Layers,
      color: 'from-amber-600 to-orange-500',
      actionLabel: language === 'te' ? 'పైప్‌లైన్ రికార్డులను చూడండి' : 'View Conversion Lifecycle',
    },
    {
      tab: 'marketplace',
      title: language === 'te' ? 'సేంద్రీయ ఎరువుల మార్కెట్‌ప్లేస్' : 'Bio-Inputs & Organic Marketplace',
      desc: language === 'te'
        ? 'ల్యాబ్ పరీక్షించిన నాణ్యమైన వర్మీకంపోస్ట్, జీవామృతం, బయో-ఎంజైమ్‌ల నేరుగా కొనుగోలు మరియు ఆర్డర్ స్లిప్పులు.'
        : 'Direct farmer-to-producer commerce for certified organic vermicompost, bio-stimulants, and microbial bio-enzymes.',
      icon: ShoppingBag,
      color: 'from-emerald-600 to-teal-500',
      actionLabel: language === 'te' ? 'మార్కెట్ ఉత్పత్తులు చూడండి' : 'Browse Verified Inputs',
    },
    {
      tab: 'carbon',
      title: language === 'te' ? 'కార్బన్ క్రెడిట్ & క్లైమేట్ ఇంజిన్' : 'Carbon Credit & Climate Engine',
      desc: language === 'te'
        ? 'వ్యర్థాల దహన నివారణ ద్వారా అధికారిక BEE/ICM కార్బన్ క్రెడిట్లు మరియు 70% ప్రత్యక్ష రైతు ఖాతా జమ (DBT).'
        : 'Deterministic emissions avoidance under the Bureau of Energy Efficiency (BEE) with transparent 70% direct farmer revenue waterfall.',
      icon: Flame,
      color: 'from-teal-700 to-green-600',
      actionLabel: language === 'te' ? 'కార్బన్ లబ్ధి లెక్కించండి' : 'Calculate Carbon Payout',
    },
    {
      tab: 'rotation',
      title: language === 'te' ? 'శాస్త్రీయ పంట మార్పిడి ప్రణాళిక' : 'Crop Rotation & Soil Nutrition',
      desc: language === 'te'
        ? 'సేంద్రీయ ఎరువుల ఎన్‌పికె విలువల ఆధారంగా ఖరీఫ్, రబీ మరియు జాయెద్ పంటల శాస్త్రీయ మార్పిడి పట్టిక.'
        : 'Plan sustainable Kharif → Rabi → Zaid crop sequences matched to organic compost batch nutrients and soil moisture.',
      icon: RotateCcw,
      color: 'from-blue-600 to-cyan-500',
      actionLabel: language === 'te' ? 'పంట పట్టిక తెరవండి' : 'Open Rotation Scheduler',
    },
    {
      tab: 'schemes',
      title: language === 'te' ? 'ప్రభుత్వ సబ్సిడీలు & పథకాలు' : 'Government Agricultural Subsidies',
      desc: language === 'te'
        ? 'పీఎం-ప్రణామ్, పీకేవీవై సేంద్రీయ గ్రాంట్లు మరియు ఎస్ఎంఏఎం 50% యంత్రాల రాయితీ అర్హత తనిఖీ.'
        : 'Eligibility guidelines and application assistance for PM-PRANAM, PKVY organic grants, and SMAM farm machinery subsidies up to 50%.',
      icon: FileCheck2,
      color: 'from-purple-600 to-indigo-500',
      actionLabel: language === 'te' ? 'రాయితీల అర్హత చూడండి' : 'Check Subsidy Eligibility',
    },
    {
      tab: 'impact',
      title: language === 'te' ? 'ప్రత్యక్ష ప్రభావ నివేదిక & లెడ్జర్' : 'Audited Impact Ledger & Analytics',
      desc: language === 'te'
        ? 'ల్యాండ్‌ఫిల్ నుండి మళ్లించిన వ్యర్థాలు, తగ్గిన రసాయన ఖర్చులు మరియు ధృవీకరించిన రైతు బ్యాంక్ జమల లైవ్ లెడ్జర్.'
        : 'Audited ledger of cumulative bio-waste diverted, methane avoided, and verified farmer DBT payouts strictly from database records.',
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600',
      actionLabel: language === 'te' ? 'ఆడిట్ లెడ్జర్ డౌన్‌లోడ్' : 'Export Audited Ledger',
    },
    {
      tab: 'helpline',
      title: language === 'te' ? '24×7 రైతు మద్దతు & ఏఐ సలహాదారు' : '24x7 Agronomy Helpline & AI',
      desc: language === 'te'
        ? '1800-కృషి-గ్రీన్ ఉచిత టోల్‌ఫ్రీ కాల్, జెమినీ ఏఐ సలహాదారు మరియు ఫీల్డ్ టెక్నీషియన్ టిక్కెట్ల ట్రాకింగ్.'
        : 'Dial 1800-KRISHI-GRN, interact with 24x7 regional voice AI Advisor, and track field technician resolution tickets.',
      icon: Bot,
      color: 'from-rose-600 to-amber-600',
      actionLabel: language === 'te' ? 'హెల్ప్‌లైన్‌ను సంప్రదించండి' : 'Connect with Advisor',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 
        ======================================================================
        HERO SECTION:
        Professional, futuristic, non-AI-slop framing with real Indian agriculture imagery
        ======================================================================
      */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-900/20 text-white p-6 sm:p-8 lg:p-10 w-full flex flex-col justify-between">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${farmerWelcomeImg}')`,
          }}
        />

        {/* Ambient Gradient Overlays for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/98 via-emerald-950/85 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/30" />

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-xl space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300 font-mono">
              {language === 'te' ? 'జాతీయ వ్యవసాయ పర్యావరణ వేదిక' : 'National Agri-Ecological Infrastructure'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Krishi<span className="text-emerald-400">Green</span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-emerald-200/95 leading-snug">
            {t.tagline}
          </p>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            {t.oneLiner}
          </p>

          {/* Core Direct Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('pipeline')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'te' ? 'వ్యర్థాల సేకరణ బుక్ చేయండి' : 'Schedule Waste Collection'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-2.5 bg-emerald-800/90 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer border border-emerald-500/40"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>{language === 'te' ? 'సేంద్రీయ ఎరువుల మార్కెట్' : 'Organic Marketplace'}</span>
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

        {/* Real-World National Infrastructure Metrics */}
        <div className="relative z-10 w-full rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-emerald-700/50 p-3.5 sm:p-4 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'పరిధి' : 'Geographic Reach'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">Pan-India Network</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'రైతు రాబడి వాటా' : 'Farmer Revenue Share'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">70% Direct DBT</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'నాణ్యతా ప్రమాణాలు' : 'Quality Standards'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">FCO 1985 & BEE CCTS</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'సహాయ కేంద్రం' : 'Helpline Support'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">24×7 • 13 Languages</strong>
          </div>
        </div>
      </section>

      {/* 
        ======================================================================
        INTERACTIVE PLANT GROWTH TIMELAPSE (See the Difference for Yourself)
        Inspired by Farm Minerals / CropTab botanical timelapse with scrub slider
        ======================================================================
      */}
      <InteractiveGrowthExperience language={language} />

      {/* 
        ======================================================================
        INTERACTIVE 3D BIO-TABLET MODULE (100 kg bio-waste -> 13 g carbon tablet)
        3D rotating perspective tablet with embossed lotus/leaf insignia
        ======================================================================
      */}
      <Interactive3DCapsule language={language} onNavigate={onNavigate} />

      {/* 
        ======================================================================
        EDITORIAL IMPACT HERO (Less in, same out)
        Scenic rolling farmland, 3D NPK box, floating frosted metric cards
        ======================================================================
      */}
      <EditorialImpactHero language={language} onNavigate={onNavigate} />

      {/* 
        ======================================================================
        FORMATS & ACCESS (3D Product Packaging Carousel)
        CropTab K, CropTab N, CropTab NPK, BioEnzyme Gold with tabs & arrows
        ======================================================================
      */}
      <ProductFormatsCarousel language={language} onNavigate={onNavigate} />

      {/* 
        ======================================================================
        INTERACTIVE ANIMATED WEB MODEL:
        Dynamic visual representation of the closed-loop bio-economy
        ======================================================================
      */}
      <AnimatedEcosystemModel
        language={language}
        onNavigate={onNavigate}
        onOpenHelpline={onOpenHelpline}
      />

      {/* 
        ======================================================================
        ECOSYSTEM SERVICES & OPERATIONS:
        Real working modules for lakhs of farmers and agri-entrepreneurs
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 font-mono">
              {language === 'te' ? 'సేవలు & నిర్వహణ' : 'OPERATIONAL ECOSYSTEM'}
            </span>
            <h3 className="font-black text-lg sm:text-xl text-gray-900">
              {language === 'te' ? 'వ్యవసాయ సేవలు & నిర్వహణ సాధనాలు' : 'Ecosystem Services & Agricultural Tools'}
            </h3>
            <p className="text-xs text-gray-600">
              {language === 'te'
                ? 'వ్యర్థాల సేకరణ నుండి ఎరువుల కొనుగోలు, యంత్రాల అద్దె మరియు కార్బన్ క్రెడిట్ రాబడి వరకు ప్రతి సేవను ప్రారంభించండి:'
                : 'Directly access bio-waste aggregation, custom machinery rental, certified input sales, and carbon dividend management:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.tab}
                onClick={() => onNavigate(service.tab)}
                className="relative rounded-3xl border border-emerald-900/10 bg-white/98 backdrop-blur-md p-5 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-0.5 active:scale-98"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color} rounded-t-3xl`} />

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${service.color} shadow-sm group-hover:scale-105 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="font-black text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                    {service.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {service.desc}
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
      </section>

      {/* 
        ======================================================================
        THE THREE PILLARS OF KRISHIGREEN:
        Editorial clarity on the core mission
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 font-mono">
            {t.threePillars}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {t.threePillarsDesc}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/98 backdrop-blur-md rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2.5 hover:border-emerald-400 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs font-mono">
                01
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Decentralized Bioprocessing
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-sm sm:text-base">
              {t.pillar1Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar1Desc}
            </p>
            <button
              onClick={() => onNavigate('pipeline')}
              className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 pt-1 cursor-pointer"
            >
              <span>{language === 'te' ? 'పైప్‌లైన్ వివరాలు' : 'Explore Bioprocessing'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white/98 backdrop-blur-md rounded-2xl border-2 border-emerald-300 p-5 shadow-xs space-y-2.5 ring-2 ring-emerald-500/10 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs font-mono">
                02
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Commerce & Machinery
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-sm sm:text-base">
              {t.pillar2Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar2Desc}
            </p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 pt-1 cursor-pointer"
            >
              <span>{language === 'te' ? 'మార్కెట్ & యంత్రాలు' : 'Access Commerce Hub'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white/98 backdrop-blur-md rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2.5 hover:border-emerald-400 transition">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs font-mono">
                03
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Carbon & Climate
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-sm sm:text-base">
              {t.pillar3Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar3Desc}
            </p>
            <button
              onClick={() => onNavigate('carbon')}
              className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 pt-1 cursor-pointer"
            >
              <span>{language === 'te' ? 'కార్బన్ క్రెడిట్ లెడ్జర్' : 'View Carbon Protocol'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
