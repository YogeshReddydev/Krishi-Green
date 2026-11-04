import React from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { navigateTo, APP_ROUTES } from '../utils/navigation';
import {
  IconLeaf,
  IconShield,
  IconCheck,
  IconPhone,
  IconTruck,
  IconSparkles,
  IconChevronRight,
  IconUsers,
} from '../components/Icons';

interface AboutPageProps {
  language: SupportedLanguage;
}

export function AboutPage({ language }: AboutPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const lifecycleStages = [
    {
      num: '01',
      title: isTe ? 'సేంద్రీయ వ్యర్థాల సేకరణ' : isHi ? 'जैविक कचरा स्रोत' : 'Organic Waste Sources',
      desc: isTe
        ? 'మండీలు, కూరగాయల మార్కెట్లు, హోటళ్లు, హాస్టళ్లు మరియు వ్యవసాయ వ్యర్థాల నుండి సేంద్రీయ పదార్థాల సేకరణ.'
        : isHi
        ? 'मंडियों, सब्जी बाजारों, होटलों और खेतों से जैविक कचरे का पृथक्करण।'
        : 'Vegetable mandis, daily markets, canteens, and farm crop residues segregated at source.',
      icon: '🥗',
    },
    {
      num: '02',
      title: isTe ? 'పరిశీలన & రవాణా' : isHi ? 'सत्यापित परिवहन' : 'Verified Transport',
      desc: isTe
        ? 'డిజిటల్ వేబ్రిడ్జ్ మరియు GPS ట్రాకింగ్ ద్వారా బరువు నమోదు చేసి సేకరణ కేంద్రానికి తరలింపు.'
        : isHi
        ? 'डिजिटल वे-ब्रिज और वजन पर्ची के साथ प्रसंस्करण केंद्र तक पारदर्शी परिवहन।'
        : 'Digital weighbridge slips, GPS-tracked dispatch, and tare weight verification at entry.',
      icon: '🚚',
    },
    {
      num: '03',
      title: isTe ? 'సేంద్రీయ కిణ్వ ప్రక్రియ' : isHi ? 'वायवीय खाद निर्माण' : 'Aerobic Fermentation',
      desc: isTe
        ? 'ఆవు పేడ మరియు జీవామృతం సూక్ష్మజీవుల మిశ్రమంతో నియంత్రిత పద్ధతిలో కంపోస్టింగ్ ప్రక్రియ.'
        : isHi
        ? 'देसी गाय के गोबर, गोमूत्र और जीवामृत संवर्धन के साथ 45 दिवसीय वैज्ञानिक कम्पोस्टिंग।'
        : 'Indigenous cow dung, Jeevamrutham cultures, and thermophilic aerobic windrow turning (45-day cycle).',
      icon: '🧪',
    },
    {
      num: '04',
      title: isTe ? 'AGA సేంద్రీయ ఎరువు' : isHi ? 'एजीए जैविक खाद' : 'AGA Organic Fertilizer',
      desc: isTe
        ? 'FCO 1985 నిబంధనలకు అనుగుణంగా తయారు చేయబడిన పోషక విలువలు గల సేంద్రీయ ఎరువుల ప్యాకింగ్.'
        : isHi
        ? 'एफसीओ 1985 मानकों के अनुसार प्रमाणित, एनपीके और कार्बन समृद्ध जैविक खाद।'
        : 'FCO 1985 tested organic fertilizer enriched with beneficial rhizosphere microbial consortia.',
      icon: '🌱',
    },
    {
      num: '05',
      title: isTe ? 'రైతులకు పంపిణీ' : isHi ? 'किसानों तक वितरण' : 'Farmer Distribution',
      desc: isTe
        ? 'రైతులకు సరసమైన ధరల వద్ద పారదర్శక QR కోడ్ ట్రేసబిలిటీతో ఎరువుల పంపిణీ.'
        : isHi
        ? 'क्यूआर कोड ट्रेसेबिलिटी और उचित लागत पर सीधे किसानों के खेतों तक आपूर्ति।'
        : 'Affordable delivery to smallholder farmers with transparent batch QR traceability on each bag.',
      icon: '🚜',
    },
    {
      num: '06',
      title: isTe ? 'పర్యావరణ ప్రభావం & CSR' : isHi ? 'पर्यावरणीय प्रभाव एवं सीएसआर' : 'Carbon Integrity & CSR',
      desc: isTe
        ? 'ల్యాండ్‌ఫిల్ మీథేన్ ఉద్గారాల నివారణ మరియు 70% ప్రత్యక్ష రైతు ప్రయోజన బదిలీ (DBT).'
        : isHi
        ? 'मीथेन उत्सर्जन रोकथाम का मापन और 70% प्रत्यक्ष लाभ अंतरण (डीबीटी)।'
        : 'Measured methane avoidance under Indian Carbon Market principles with 70% pool benefit to farmers.',
      icon: '🌍',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-[#17231c]">
      {/* Prototype Banner Notification */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex items-start gap-3">
        <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg text-sm font-bold font-mono">
          PROTOTYPE
        </span>
        <div className="text-xs text-amber-950 leading-relaxed">
          <p className="font-bold">
            {isTe
              ? 'గమనిక: కృషి గ్రీన్ వ్యవసాయ సాంకేతిక ప్రాజెక్ట్ నమూనా'
              : isHi
              ? 'प्रोटोटाइप सूचना: कृषि ग्रीन एक कृषि प्रौद्योगिकी प्रदर्शन मंच है'
              : 'Prototype Disclosure: Krishi Green Demonstration Platform'}
          </p>
          <p className="mt-0.5 text-amber-900/90">
            {isTe
              ? 'ఇది ఒక కార్యాచరణ నమూనా (ప్రోటోటైప్). ప్రభుత్వ విభాగాలకు మరియు సామాజిక సంస్థలకు ప్రదర్శించేందుకు రూపొందించబడింది. ఫీల్డ్ హబ్‌లు ప్రదర్శన కోసం ఉద్దేశించినవి.'
              : isHi
              ? 'यह मंच एक प्रदर्शन प्रोटोटाइप है जो हितधारकों और किसानों को पूर्ण बायो-इकोनॉमी वर्कफ़्लो समझाने हेतु विकसित किया गया है।'
              : 'This platform is an agricultural technology demonstration prototype. Operational records and pilot hub directories illustrate proposed ground workflows before multi-district expansion.'}
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconLeaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {isTe ? 'వ్యవసాయ వ్యర్థాల నుండి సమగ్ర అభివృద్ధి' : isHi ? 'कृषि अपशिष्ट से समृद्धि' : 'Circular Agro-Bioeconomy'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {isTe
              ? 'రైతుల శ్రేయస్సు కోసం సేంద్రీయ పరిష్కారం'
              : isHi
              ? 'किसानों की मिट्टी, उनका भविष्य और स्वच्छ पर्यावरण'
              : 'Restoring Living Soil, Empowering Farmers, Cleaning Our Towns'}
          </h1>

          <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed">
            {isTe
              ? 'కృషి గ్రీన్ ఆహార వ్యర్థాలు మరియు వ్యవసాయ అవశేషాలను నాణ్యమైన సేంద్రీయ ఎరువులుగా మారుస్తుంది. రసాయనాల ఖర్చు తగ్గించి భూమి సారాన్ని పెంచుతుంది.'
              : isHi
              ? 'कृषि ग्रीन का उद्देश्य सब्जी मंडियों और भोजन के जैविक कचरे को उन्नत जैविक खाद (AGA) में बदलकर किसानों तक पहुंचाना और रासायनिक लागत को घटाना है।'
              : 'Krishi Green converts organic food and agricultural waste into laboratory-tested AGA bio-fertilizer, connecting custom hiring hubs, natural farming practices, and transparent environmental stewardship.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigateTo(APP_ROUTES.WASTE_MANAGEMENT)}
              className="px-5 py-3 bg-white text-emerald-900 font-bold rounded-xl text-sm shadow hover:bg-emerald-50 transition flex items-center gap-2"
            >
              <span>{isTe ? 'వ్యర్థాల సేకరణ అభ్యర్థన' : isHi ? 'कचरा संग्रहण अनुरोध' : 'Request Waste Collection'}</span>
              <IconChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo(APP_ROUTES.AGA)}
              className="px-5 py-3 bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-500/40 text-white font-bold rounded-xl text-sm transition flex items-center gap-2"
            >
              <IconSparkles className="w-4 h-4 text-emerald-300" />
              <span>{isTe ? 'AGA సేంద్రీయ ఎరువు వివరాలు' : isHi ? 'एजीए जैविक खाद जानें' : 'Explore AGA Fertilizer'}</span>
            </button>
            <a
              href="tel:18005747443"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow"
            >
              <IconPhone className="w-4 h-4" />
              <span>1800-KRISHI-GRN</span>
            </a>
          </div>
        </div>
      </div>

      {/* The Central Lifecycle (6-Step Visual Flow) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 font-mono">
            {isTe ? 'సమగ్ర కార్యచరణ చక్రం' : isHi ? 'पूर्ण बायो-इकोनॉमी चक्र' : 'Integrated Lifecycle'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231c]">
            {isTe
              ? 'వ్యర్థం నుండి సిరులు: 6-దశల విప్లవం'
              : isHi
              ? 'कचरे से कंचन: 6-चरणीय वैज्ञानिक प्रक्रिया'
              : 'From Waste to Wealth: The 6-Stage Soil Cycle'}
          </h2>
          <p className="text-sm text-gray-600">
            {isTe
              ? 'ప్రతి దశలోనూ పారదర్శకత, నాణ్యతా ప్రమాణాలు మరియు రైతు సంక్షేమం ముఖ్యోద్దేశం.'
              : isHi
              ? 'प्रत्येक चरण पर डिजिटल प्रमाण, प्रयोगशाला परीक्षण और 70% किसान लाभांश।'
              : 'A transparent closed-loop cycle ensuring quality inputs for farmers and documented carbon reduction.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lifecycleStages.map((stage) => (
            <div
              key={stage.num}
              className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{stage.icon}</span>
                <span className="font-mono text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {stage.num}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-800 transition">
                {stage.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-[#f2f7f2] border border-emerald-200/60 rounded-3xl p-8 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
          {isTe ? 'కృషి గ్రీన్ ముఖ్య సూత్రాలు' : isHi ? 'कृषि ग्रीन के मार्गदर्शक सिद्धांत' : 'Our Guiding Principles'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-gray-900">
              {isTe ? 'రైతు ప్రథమం' : isHi ? 'किसान सबसे पहले' : 'Farmer-First Usability'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isTe
                ? 'క్లిష్టమైన సాంకేతిక భాష కాకుండా సులభమైన తెలుగు మరియు సరళమైన రూపకల్పన.'
                : isHi
                ? 'कठिन तकनीकी शब्दों की जगह सरल भाषा और बड़े बटन ताकि हर किसान आसानी से उपयोग कर सके।'
                : 'Zero unnecessary jargon. Large buttons, voice support, and clear forms tailored for smallholder farmers.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-gray-900">
              {isTe ? 'నిజమైన డేటా సమగ్రత' : isHi ? 'सच्ची डेटा पारदर्शिता' : 'Absolute Data Integrity'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isTe
                ? 'ఏ విధమైన తప్పుడు రికార్డులు లేకుండా కేవలం నిజమైన తూకం మరియు ప్రయోగశాల పరీక్షల రికార్డులు.'
                : isHi
                ? 'काल्पनिक या झूठे आंकड़ों का पूर्ण बहिष्कार; केवल सत्यापित वजन पर्चियां और लैब रिपोर्ट।'
                : 'No fabricated farmer records or fake customer reviews. Transparent demonstration disclaimers.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-gray-900">
              {isTe ? 'ఆంధ్రప్రదేశ్ పైలట్' : isHi ? 'आंध्र प्रदेश प्रायोगिक क्षेत्र' : 'Andhra Pradesh Focus'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {isTe
                ? 'పల్నాడు, ప్రకాశం, కర్నూలు, తూర్పు/పశ్చిమ గోదావరి, విజయనగరం జిల్లాలలో రైతు సహకారం.'
                : isHi
                ? 'पलनाडु, प्रकाशम, कर्नूल, गोदावरी और विजयनगरम के कृषि क्षेत्रों पर केंद्रित।'
                : 'Rooted in the unique agro-climatic conditions of Andhra Pradesh with expansion frameworks.'}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Support Strip */}
      <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold">
            {isTe ? 'సహాయం కావాలా? నేరుగా మాట్లాడండి' : isHi ? 'सहायता चाहिए? सीधे कॉल करें' : 'Need Farmer Assistance? Call Toll-Free'}
          </h4>
          <p className="text-xs text-emerald-300">
            {isTe
              ? 'కృషి గ్రీన్ ఉచిత కాల్ సెంటర్: 1800-KRISHI-GRN (1800-574-7443)'
              : isHi
              ? 'कृषि ग्रीन टोल-फ्री सहायता केंद्र: 1800-KRISHI-GRN (1800-574-7443)'
              : 'Direct calling assistance for waste collection, AGA fertilizers, and machinery.'}
          </p>
        </div>
        <a
          href="tel:18005747443"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-base shadow flex items-center gap-2 whitespace-nowrap"
        >
          <IconPhone className="w-5 h-5 text-emerald-900" />
          <span>1800-KRISHI-GRN</span>
        </a>
      </div>
    </div>
  );
}
