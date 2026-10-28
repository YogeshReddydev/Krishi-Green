import React from 'react';
import {
  Sprout,
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
        ? 'రైతు వ్యర్థాల డిక్లరేషన్, కాటా బరువు స్లిప్, రవాణా ట్రాకింగ్, ల్యాబ్ ఎన్‌పికె పరీక్ష మరియు సమగ్ర రికార్డు.'
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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 
        ======================================================================
        CLEAN, FIT HERO SECTION:
        Proportioned to fit standard screens without pushing everything off-screen.
        ======================================================================
      */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-700/40 text-white p-6 sm:p-8 lg:p-10 w-full flex flex-col justify-between">
        {/* Farmer Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${farmerWelcomeImg}')`,
          }}
        />

        {/* Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/98 via-emerald-950/85 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/30" />

        {/* Content */}
        <div className="relative z-10 max-w-xl space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              {t.welcomeTitle}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Krishi<span className="text-emerald-400">Green</span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg font-bold text-emerald-200/95 leading-snug">
            {t.tagline}
          </p>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            {t.oneLiner}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => onNavigate('ap-pilot')}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>{t.navApPilot || 'AP Pilot Machinery & CHCs'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('carbon')}
              className="px-4 py-2.5 bg-teal-700/90 hover:bg-teal-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-98 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>{t.navCarbon || 'Carbon Engine (ICM)'}</span>
            </button>

            <button
              onClick={onOpenHelpline}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 transition flex items-center gap-1.5 active:scale-98 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.tollFreeNumber}</span>
            </button>
          </div>
        </div>

        {/* Bottom Key Numbers Strip */}
        <div className="relative z-10 w-full rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-emerald-700/50 p-3 sm:p-4 mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'పైలట్ జిల్లాలు' : 'Pilot AP Districts'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">5 District Hubs</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'రైతు రాబడి వాటా' : 'Farmer Revenue Share'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">70% Direct DBT</strong>
          </div>
          <div>
            <span className="text-emerald-300 uppercase block font-bold text-[10px] tracking-wide">
              {language === 'te' ? 'కార్బన్ ప్రమాణాలు' : 'Carbon Framework'}
            </span>
            <strong className="text-sm sm:text-base font-black font-mono text-white">BEE / ICM CCTS</strong>
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
        DEDICATED WEBPAGES BENTO GRID:
        ======================================================================
      */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">
              DIRECT PORTAL ACCESS
            </span>
            <h3 className="font-black text-lg sm:text-xl text-gray-900">
              {language === 'hi' ? 'सभी समर्पित वेबपेज एवं सेवाएं' : language === 'te' ? 'అన్ని ప్రత్యేక వెబ్‌పేజీలు & సేవలు' : 'Explore Dedicated Webpages & Modules'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'hi' ? 'किसी भी सेवा का पूर्ण वेबपेज खोलने के लिए नीचे क्लिक करें:' : language === 'te' ? 'పూర్తి వెబ్‌పేజీ తెరవడానికి క్రింది బటన్లపై క్లిక్ చేయండి:' : 'Select any operational portal below to open its dedicated view:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dedicatedWebpages.map((pg) => {
            const Icon = pg.icon;
            return (
              <div
                key={pg.tab}
                onClick={() => onNavigate(pg.tab)}
                className="relative rounded-3xl border border-emerald-100 bg-white/98 backdrop-blur-md p-4 sm:p-5 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group transform hover:-translate-y-0.5 active:scale-98"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pg.color} rounded-t-3xl`} />

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${pg.color} shadow-sm group-hover:scale-105 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                      {pg.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {pg.tag}
                    </span>
                    <h4 className="font-black text-gray-900 text-sm sm:text-base group-hover:text-emerald-700 transition">
                      {pg.title}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {pg.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-black text-emerald-800">
                  <span className="group-hover:underline">{t.openDedicatedPage}</span>
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
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs border border-amber-200">
                01
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Bio-Processing
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
              <span>{t.navPipeline}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white/98 backdrop-blur-md rounded-2xl border-2 border-emerald-300 p-5 shadow-xs space-y-2.5 ring-2 ring-emerald-500/10 transition">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs border border-emerald-300">
                02
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
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
              onClick={() => onNavigate('ap-pilot')}
              className="text-xs font-black text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 pt-1 cursor-pointer"
            >
              <span>{t.navApPilot || 'AP Equipment & Providers'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white/98 backdrop-blur-md rounded-2xl border border-gray-200 p-5 shadow-xs space-y-2.5 hover:border-emerald-400 transition">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs border border-teal-200">
                03
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
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
              <span>{t.navCarbon || 'Carbon Engine (ICM)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
