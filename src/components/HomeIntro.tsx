import React from 'react';
import {
  Sprout,
  ArrowRight,
  Phone,
  Recycle,
  ShoppingBag,
  RotateCcw,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  Layers,
  Sparkles,
  Bot,
  Truck,
  FlaskConical,
  Tractor,
  HeartHandshake,
  BadgeCheck,
  MapPin,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
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

  // Main Webpage Navigation Buttons with rich previews
  const dedicatedWebpages = [
    {
      tab: 'ap-pilot',
      title: t.navApPilot || 'AP Equipment & Providers',
      shortTitle: language === 'te' ? 'ఆంధ్రప్రదేశ్ యంత్రాలు & కేంద్రాలు' : 'AP Pilot Machinery & CHCs',
      desc: language === 'te'
        ? 'పల్నాడు, ప్రకాశం, కర్నూలు, తూర్పు/పశ్చిమ గోదావరి, విజయనగరం జిల్లాల ధృవీకరించిన కస్టమ్ హైరింగ్ కేంద్రాలు (CHCs), బేలర్లు, ష్రెడ్డర్లు.'
        : 'Explore verified Custom Hiring Centres (CHCs), balers, shredders, and compost facilities across 5 Andhra Pradesh pilot districts with live quotation workflows.',
      icon: MapPin,
      color: 'from-emerald-700 to-teal-600',
      badge: '5 AP Districts',
      tag: 'Verified Geospatial Hub',
    },
    {
      tab: 'carbon',
      title: t.navCarbon || 'Carbon & Climate Engine',
      shortTitle: language === 'te' ? 'కార్బన్ క్రెడిట్ & క్లైమేట్ ఇంజిన్' : 'Indian Carbon Market (ICM)',
      desc: language === 'te'
        ? 'వ్యవసాయ వ్యర్థాల దహన నివారణ మరియు మీథేన్ తగ్గింపు ద్వారా అధికారిక BEE/ICM కార్బన్ క్రెడిట్లు (70% రైతు వాటా).'
        : 'Deterministic gross-to-net emissions accounting under the Bureau of Energy Efficiency (BEE) with transparent 70% direct farmer revenue waterfall.',
      icon: Flame,
      color: 'from-teal-700 to-green-600',
      badge: 'BEE / CCTS Aligned',
      tag: '70% Farmer Payout',
    },
    {
      tab: 'pipeline',
      title: t.navPipeline,
      shortTitle: language === 'hi' ? 'कचरे से खाद पाइपलाइन' : language === 'te' ? 'ఎరువుల పైప్‌లైన్' : 'Waste-to-Wealth Pipeline',
      desc: language === 'hi'
        ? 'ग्राम एकत्रीकरण केंद्र, विकेंद्रीकृत वर्मी व बायो-एंजाइम इकाइयां और बैच क्यूआर कोड प्रामाणिकता।'
        : language === 'te'
        ? 'రైతు వ్యర్థాల డిక్లరేషన్, కాటా బరువు స్లిప్, రవాణా ట్రాకింగ్, ల్యాబ్ ఎన్‌పికె పరీక్ష మరియు 16 దశల సమగ్ర సర్క్యులర్ రికార్డు.'
        : 'Verifiable 16-stage circular lifecycle from waste declaration, weighbridge tare/gross slips, and transport to FCO 1985 lab certification.',
      icon: Layers,
      color: 'from-amber-600 to-orange-500',
      badge: '16-Stage Cycle',
      tag: 'Verifiable Lifecycle',
    },
    {
      tab: 'marketplace',
      title: t.navMarketplace,
      shortTitle: language === 'hi' ? 'जैविक बाजार व यंत्र' : language === 'te' ? 'సేంద్రీయ మార్కెట్ & యంత్రాలు' : 'Dual Marketplace & Machinery',
      desc: language === 'hi'
        ? 'प्रमाणित वर्मीकम्पोस्ट, बायो-एंजाइम और 50% सब्सिडी के साथ ट्रैक्टर व यंत्र किराये पर लें।'
        : language === 'te'
        ? 'సేంద్రీయ ఎరువుల కొనుగోలు-అమ్మకాలు మరియు సబ్సిడీతో కూడిన వ్యవసాయ ట్రాక్టర్లు, యంత్రాలు.'
        : 'Direct marketplace for certified organic vermicompost, bio-stimulants, and rental of verified tractors and machinery with SMAM subsidies.',
      icon: ShoppingBag,
      color: 'from-emerald-600 to-teal-500',
      badge: 'Dual Hub',
      tag: 'Inputs & Tools',
    },
    {
      tab: 'rotation',
      title: t.navRotation,
      shortTitle: language === 'hi' ? 'फसल चक्र अनुसूची' : language === 'te' ? 'పంట మార్పిడి పట్టిక' : 'Crop Rotation Scheduler',
      desc: language === 'hi'
        ? 'जैविक खाद के पोषक तत्वों के आधार पर खरीफ → रबी → जायद फसल चक्र की वैज्ञानिक योजना।'
        : language === 'te'
        ? 'ఎరువుల పోషకాల ఆధారంగా ఖరీఫ్, రబీ, జాయెద్ పంట మార్పిడి ప్రణాళికలు.'
        : 'Plan sustainable Kharif → Rabi → Zaid crop rotations customized to the nutrient profile of KrishiGreen bio-batches.',
      icon: RotateCcw,
      color: 'from-blue-600 to-cyan-500',
      badge: 'Agronomy AI',
      tag: 'Kharif-Rabi-Zaid',
    },
    {
      tab: 'schemes',
      title: t.navSchemes,
      shortTitle: language === 'hi' ? 'सरकारी योजनाएं व सब्सिडी' : language === 'te' ? 'ప్రభుత్వ పథకాలు & సబ్సిడీలు' : 'Government Subsidies',
      desc: language === 'hi'
        ? 'पीएम-प्रणाम, पीकेवीवाई जैविक अनुदान और एसएमएएम 50% यंत्र सब्सिडी के लिए पात्रता जांचें।'
        : language === 'te'
        ? 'పీఎం-ప్రణామ్, పీకేవై మరియు ఎస్ఎంఏఎం సబ్సిడీల అర్హతను పరిశీలించి దరఖాస్తు చేసుకోండి.'
        : 'Check eligibility and apply for PM-PRANAM, PKVY organic grants, and SMAM farm machinery subsidies up to 50% discount.',
      icon: FileCheck2,
      color: 'from-purple-600 to-indigo-500',
      badge: 'Govt Grants',
      tag: 'PM-PRANAM / SMAM',
    },
    {
      tab: 'impact',
      title: t.navImpact,
      shortTitle: language === 'hi' ? 'प्रभाव व बचत विश्लेषण' : language === 'te' ? 'లాభాలు & కార్బన్ విశ్లేషణ' : 'Live Impact Ledger',
      desc: language === 'hi'
        ? 'लैंडफिल से बचाए गए कचरे के चार्ट, मीथेन रोकथाम और मिट्टी के जैविक कार्बन की लाइव गणना।'
        : language === 'te'
        ? 'భూమిలో నిల్వ చేసిన కార్బన్, తగ్గిన రసాయన ఎరువుల ఖర్చులు మరియు లైవ్ చార్టులు.'
        : 'Real-time ledger of cumulative waste diverted, methane avoided, and verified farmer DBT payouts strictly from Firestore records.',
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600',
      badge: '100% Real Data',
      tag: 'Verified Metrics',
    },
    {
      tab: 'helpline',
      title: t.navHelpline,
      shortTitle: language === 'hi' ? '24×7 हेल्पलाइन व एआई' : language === 'te' ? '24×7 హెల్ప్‌లైన్ & ఏఐ' : '24x7 Helpline & AI',
      desc: language === 'hi'
        ? '1800 टोल-फ्री आईवीआर सिम्युलेटर, जेमिनी एआई कृषि सलाहकार और वास्तविक समय सहायता टिकट।'
        : language === 'te'
        ? '1800 ఉచిత టోల్-ఫ్రీ ఫోన్, జెమినీ ఏఐ సలహాదారు మరియు సహాయ టిక్కెట్ల ట్రాకింగ్.'
        : 'Dial 1800-KRISHI-GRN, interact with 24x7 voice/text Gemini AI Advisor, and track real-time support tickets.',
      icon: Bot,
      color: 'from-rose-600 to-amber-600',
      badge: '24×7 Multilingual',
      tag: '1800-KRISHI-GRN',
    },
  ];

  const loopSteps = [
    {
      step: '1',
      title: t.stepCollect,
      desc: language === 'hi' ? 'मंडी, रसोई व खेत अपशिष्ट' : language === 'te' ? 'కూరగాయల మార్కెట్ & వంట వ్యర్థాలు' : 'Mandi & Kitchen Waste Aggregation',
      icon: Truck,
      bg: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      step: '2',
      title: t.stepProcess,
      desc: language === 'hi' ? 'वर्मी व बायो-एंजाइम इकाइयां' : language === 'te' ? 'వికేంద్రీకృత సేంద్రీయ ప్రాసెసింగ్' : 'Decentralized Bio-Fermentation',
      icon: FlaskConical,
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    },
    {
      step: '3',
      title: t.stepProduct,
      desc: language === 'hi' ? 'लैब परीक्षित जैविक खाद' : language === 'te' ? 'క్యూఆర్ కోడ్‌తో ధృవీకరించిన ఎరువు' : 'NPK Tested & QR Certified',
      icon: ShieldCheck,
      bg: 'bg-teal-100 text-teal-900 border-teal-200',
    },
    {
      step: '4',
      title: t.stepSell,
      desc: language === 'hi' ? 'सस्ती स्थानीय किसान बिक्री' : language === 'te' ? 'రైతుల కోసం తక్కువ ధర మార్కెట్' : 'Affordable Local Marketplace',
      icon: ShoppingBag,
      bg: 'bg-blue-100 text-blue-900 border-blue-200',
    },
    {
      step: '5',
      title: t.stepUse,
      desc: language === 'hi' ? 'मिट्टी सुधार व उच्च उपज' : language === 'te' ? 'సారవంతమైన నేల & అధిక దిగుబడి' : 'Soil Organic Carbon Restoration',
      icon: Sprout,
      bg: 'bg-green-100 text-green-900 border-green-200',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 
        ======================================================================
        WELCOME HERO SECTION (Organic Biophilic Design System):
        High-contrast framing gradient overlay guarantees 100% legibility 
        while showcasing the authentic Indian farmer smiling in the lush wheat field!
        ======================================================================
      */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-700/40 text-white min-h-[520px] sm:min-h-[560px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 w-full max-w-full">
        {/* User-Uploaded Farmer Image Background with crisp styling */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url('${farmerWelcomeImg}')`,
          }}
        />

        {/* Framing Gradient Overlay (Anti-slop high contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/98 via-emerald-950/85 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-black/40" />

        {/* Decorative Agri Corner Framing Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-400/90 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-400/90 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-400/90 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-400/90 rounded-br-xl pointer-events-none" />

        {/* Top Badges: National Mission & Toll-Free Helpline */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/30 backdrop-blur-md text-emerald-100 border border-emerald-400/50 text-xs font-bold tracking-wide shadow-md">
            <Sprout className="w-4 h-4 text-emerald-300" />
            <span>{t.nationalMission}</span>
          </div>

          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 backdrop-blur-md px-4 py-1.5 rounded-full text-white font-black text-xs shadow-xl transition border border-emerald-300/50 hover:scale-102 active:scale-98"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-100 animate-pulse" />
            <span>{t.tollFreeNumber}</span>
          </button>
        </div>

        {/* Welcome Note, Web Name, and Tagline (Crystal Clear Legibility) */}
        <div className="relative z-10 my-auto py-6 max-w-2xl sm:max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-400/20 backdrop-blur-md rounded-xl text-emerald-200 text-xs font-mono font-bold tracking-wider border border-emerald-400/30">
            <Recycle className="w-4 h-4 text-emerald-300" />
            <span>{t.circularAgro}</span>
          </div>

          {/* Web Name & Welcome Note */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-300 block font-mono">
              {t.welcomeTitle}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
              Krishi<span className="text-emerald-400">Green</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-xl sm:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-200 to-teal-200 drop-shadow-md">
            {t.tagline}
          </div>

          {/* Mission Description */}
          <p className="text-xs sm:text-sm text-emerald-100/95 leading-relaxed max-w-xl font-normal drop-shadow-sm">
            {t.oneLiner}
          </p>

          {/* Primary Quick Actions inside Hero with UI/UX Pro Max Hierarchy */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3">
            <button
              onClick={() => onNavigate('ap-pilot')}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-emerald-950 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 transform active:scale-98"
            >
              <MapPin className="w-4 h-4" />
              <span>{t.navApPilot || 'AP Pilot Machinery & CHCs'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('carbon')}
              className="px-5 py-3 bg-teal-600/90 hover:bg-teal-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all duration-200 flex items-center gap-2 active:scale-98"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>{t.navCarbon || 'Carbon Engine (ICM)'}</span>
            </button>

            <button
              onClick={() => onNavigate('pipeline')}
              className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-2xl font-bold text-xs sm:text-sm border border-white/40 shadow-md transition-all duration-200 flex items-center gap-1.5 active:scale-98"
            >
              <Layers className="w-4 h-4" />
              <span>{t.navPipeline}</span>
            </button>

            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-3 bg-emerald-900/70 hover:bg-emerald-800/90 backdrop-blur-md text-emerald-100 rounded-2xl font-semibold text-xs sm:text-sm border border-emerald-400/40 transition-all duration-200 flex items-center gap-1.5 active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.navMarketplace}</span>
            </button>
          </div>
        </div>

        {/* Hero Bottom Stats Strip - Safely contained with zero horizontal overflow */}
        <div className="relative z-10 w-full rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-emerald-700/60 p-4 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'పైలట్ జిల్లాలు' : 'Pilot AP Districts'}
            </span>
            <strong className="text-base sm:text-lg font-black font-mono text-white">5 District Hubs</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'రైతు రాబడి వాటా' : 'Farmer Revenue Share'}
            </span>
            <strong className="text-base sm:text-lg font-black font-mono text-white">70% Direct DBT</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'కార్బన్ ప్రమాణాలు' : 'Carbon Framework'}
            </span>
            <strong className="text-base sm:text-lg font-black font-mono text-white">BEE / ICM CCTS</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {t.heroStatsSupport.split(':')[0]}
            </span>
            <strong className="text-base sm:text-lg font-black font-mono text-white">24×7 • 13 Languages</strong>
          </div>
        </div>
      </section>

      {/* 
        ======================================================================
        ALL DEDICATED WEBPAGES BENTO GRID:
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">
              DIRECT PORTAL ACCESS
            </span>
            <h3 className="font-black text-xl text-gray-900">
              {language === 'hi' ? 'सभी समर्पित वेबपेज एवं सेवाएं' : language === 'te' ? 'అన్ని ప్రత్యేక వెబ్‌పేజీలు & సేవలు' : 'Explore Dedicated Webpages & Modules'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'hi' ? 'किसी भी सेवा का पूर्ण वेबपेज खोलने के लिए नीचे क्लिक करें:' : language === 'te' ? 'పూర్తి వెబ్‌పేజీ తెరవడానికి క్రింది బటన్లపై క్లిక్ చేయండి:' : 'Select any operational portal below to open its dedicated view:'}
            </p>
          </div>
        </div>

        {/* 8 Grid Cards for every dedicated module */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dedicatedWebpages.map((pg) => {
            const Icon = pg.icon;
            return (
              <div
                key={pg.tab}
                onClick={() => onNavigate(pg.tab)}
                className="relative rounded-3xl border border-emerald-100 bg-white/98 backdrop-blur-md p-5 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1 active:scale-98"
              >
                {/* Decorative Top Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pg.color} rounded-t-3xl`} />

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${pg.color} shadow-md group-hover:scale-105 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      {pg.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {pg.tag}
                    </span>
                    <h4 className="font-black text-gray-900 text-base group-hover:text-emerald-700 transition">
                      {pg.title}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed min-h-[48px]">
                    {pg.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-black text-emerald-800">
                  <span className="group-hover:underline">{t.openDedicatedPage}</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition">
                    <ArrowRight className="w-4 h-4 transition transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ======================================================================
        THE 5-STEP WASTE-TO-WEALTH CLOSED LOOP:
        ======================================================================
      */}
      <section className="bg-white/98 backdrop-blur-md rounded-3xl border-2 border-emerald-100 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">
              CIRCULAR AGRO CYCLE
            </span>
            <h3 className="font-black text-gray-900 text-lg">
              {language === 'hi' ? 'कचरे से समृद्धि: 5-चरणीय चक्रीय प्रक्रिया' : language === 'te' ? 'వ్యర్థాల నుండి సంపద: 5 దశల చక్రం' : 'The 5-Step Closed Loop: From Discarded Peels to Golden Harvest'}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('pipeline')}
            className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1 self-start sm:self-auto bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition active:scale-98"
          >
            <span>{t.openDedicatedPage}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {loopSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                onClick={() => onNavigate('pipeline')}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50/90 hover:bg-emerald-50 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between group active:scale-98"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${step.bg}`}>
                    {step.step}
                  </span>
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 transition" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-gray-900 group-hover:text-emerald-800 transition">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-tight">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ======================================================================
        THE THREE PILLARS OF KRISHIGREEN:
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 font-mono">
            {t.threePillars}
          </span>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.threePillarsDesc}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xs space-y-3 hover:border-emerald-400 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm border border-amber-200">
                01
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Bio-Processing
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-base">
              {t.pillar1Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar1Desc}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('pipeline')}
                className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
              >
                <span>{t.navPipeline}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border-2 border-emerald-300 p-6 shadow-xs space-y-3 ring-4 ring-emerald-500/10 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm border border-emerald-300">
                02
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Commerce & Machinery
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-base">
              {t.pillar2Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar2Desc}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('ap-pilot')}
                className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
              >
                <span>{t.navApPilot || 'AP Equipment & Providers'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xs space-y-3 hover:border-emerald-400 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm border border-teal-200">
                03
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Carbon & Climate
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-base">
              {t.pillar3Title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.pillar3Desc}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('carbon')}
                className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
              >
                <span>{t.navCarbon || 'Carbon Engine (ICM)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
