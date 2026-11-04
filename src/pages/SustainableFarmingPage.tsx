import React, { useState } from 'react';
import { SupportedLanguage, ProcessingBatch } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { CropRotationScheduler } from '../components/CropRotationScheduler';
import { navigateTo, APP_ROUTES } from '../utils/navigation';
import {
  IconLeaf,
  IconCheck,
  IconSparkles,
  IconChevronRight,
  IconPhone,
  IconSun,
  IconTrendingUp,
} from '../components/Icons';

import { CropAdvisorySuggester } from '../components/CropAdvisorySuggester';

interface SustainableFarmingPageProps {
  language: SupportedLanguage;
  batches?: ProcessingBatch[];
}

export function SustainableFarmingPage({ language, batches = [] }: SustainableFarmingPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'soil' | 'jeevamrutha' | 'rotation' | 'savings' | 'advisory'>('soil');

  const naturalPillars = [
    {
      name: isTe ? 'జీవామృతం (Jeevamrutha)' : isHi ? 'जीवामृत' : 'Jeevamrutham',
      tag: isTe ? 'సూక్ష్మజీవుల సంవర్ధనం' : isHi ? 'सूक्ष्मजीव संवर्धन' : 'Microbial Culture',
      desc: isTe
        ? 'నాటు ఆవు పేడ, మూత్రం, బెల్లం, శనగపిండి మరియు పొలం గట్టు మట్టితో తయారైన సహజ కిణ్వ ద్రవం. నేలలో వానపాములు మరియు సూక్ష్మజీవులను వేగంగా పెంచుతుంది.'
        : isHi
        ? 'देसी गाय के गोबर, गोमूत्र, गुड़, बेसन और मेड़ की मिट्टी से तैयार प्राकृतिक संवर्धन जो मिट्टी में लाभकारी जीवाणुओं को कई गुना बढ़ाता है।'
        : 'Fermented blend of native cow dung, cow urine, jaggery, pulse flour, and living soil, inoculating billions of beneficial soil microbes per millilitre.',
      dosage: isTe ? '200 లీటర్లు / ఎకరాకి (నీటి తడులతో)' : isHi ? '200 लीटर / एकड़ (सिंचाई के साथ)' : '200 Litres / Acre (via irrigation)',
    },
    {
      name: isTe ? 'బీజామృతం (Beejamrutha)' : isHi ? 'बीजामृत' : 'Beejamrutham',
      tag: isTe ? 'విత్తన శుద్ధి' : isHi ? 'बीज उपचार' : 'Seed Treatment',
      desc: isTe
        ? 'విత్తనాలు నాటే ముందు సహజ రక్షణ కవచం. విత్తన మరియు నేల ద్వారా సంక్రమించే ఫంగల్ వ్యాధుల నుండి మొలకలను కాపాడుతుంది.'
        : isHi
        ? 'बुआई से पूर्व बीजों का प्राकृतिक जैविक उपचार, जिससे अंकुरण दर बढ़ती है और बीज-जनित रोगों से सुरक्षा मिलती है।'
        : 'Natural prophylactic seed treatment protecting sprouting seeds from soil-borne pathogens and enhancing germination vigor.',
      dosage: isTe ? '50-100 గ్రాములు / కిలో విత్తనానికి' : isHi ? '50-100 ग्राम / किग्रा बीज' : 'Coat seeds 1-2 hours before sowing',
    },
    {
      name: isTe ? 'ఆచ్ఛాదన (Acchadana - Mulching)' : isHi ? 'आच्छादन (मल्चिंग)' : 'Acchadana (Mulching)',
      tag: isTe ? 'నేల తేమ & ఉష్ణోగ్రత రక్షణ' : isHi ? 'नमी एवं तापमान संरक्षण' : 'Soil Cover',
      desc: isTe
        ? 'పంట వ్యర్థాలు మరియు గడ్డితో నేలను కప్పడం ద్వారా నేల ఉష్ణోగ్రత నియంత్రణ, తేమ ఆవిరి కాకుండా నిరోధించడం మరియు కలుపు నివారణ.'
        : isHi
        ? 'फसल अवशेषों और पुआल से मिट्टी को ढकना, जिससे 50% पानी की बचत होती है और केंचुआ गतिविधि सक्रिय रहती है।'
        : 'Covering topsoil with agricultural straw and biomass, cutting water evaporation by 50% and protecting humus-forming microbes.',
      dosage: isTe ? 'ఎకరాకి 1.5 - 2 టన్నుల గడ్డి' : isHi ? '1.5 - 2 टन पुआल प्रति एकड़' : '1.5 - 2.0 Tonnes crop residue/acre',
    },
    {
      name: isTe ? 'వాపాస (Whapasa - Soil Aeration)' : isHi ? 'वापसा (हवा व नमी संतुलन)' : 'Whapasa (Aeration)',
      tag: isTe ? 'నీరు & గాలి సమతుల్యత' : isHi ? 'जड़ क्षेत्र वातन' : 'Rootzone Microclimate',
      desc: isTe
        ? 'నేలలో కేవలం నీరు నిల్వ కాకుండా 50% నీరు మరియు 50% గాలి ఉండే స్థితి. మొక్క వేర్లు బలంగా శ్వాసించి పోషకాలను తీసుకుంటాయి.'
        : isHi
        ? 'जड़ क्षेत्र में 50% नमी और 50% वायु का संतुलन, जिससे फसलें बाढ़ व सूखे दोनों में लचीली रहती हैं।'
        : 'The micro-aeration condition where 50% moisture and 50% air cavities exist in the root zone, maximizing root nutrient intake.',
      dosage: isTe ? 'సహజ డ్రైనేజ్ & బిందు సేద్యం' : isHi ? 'संतुलित सिंचाई' : 'Optimal furrow / alternate wetting interval',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconLeaf className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'సహజ వ్యవసాయం & నేల సారం' : isHi ? 'प्राकृतिक खेती एवं मृदा स्वास्थ्य' : 'Sustainable Agronomy'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'సజీవ నేల — రైతుల శాశ్వత సంపద'
              : isHi
              ? 'जीवंत मिट्टी — किसान की स्थायी पूंजी'
              : 'Living Soil: Regenerative Agriculture in Andhra Pradesh'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'రసాయన ఎరువుల వాడకం తగ్గించి, సేంద్రీయ కర్బనాన్ని 0.3% నుండి 1.0% పైగా పెంచే శాస్త్రీయ పద్ధతులు. పల్నాడు, ప్రకాశం, రాయలసీమ మరియు గోదావరి డెల్టా రైతులకు నిరూపిత మార్గదర్శకాలు.'
              : isHi
              ? 'रासायनिक खादों की जगह जैविक व प्राकृतिक उपायों से मिट्टी के जैविक कार्बन को बढ़ाएं। कम लागत में अधिक लाभ और टिकाऊ पैदावार।'
              : 'Practical protocols to rebuild soil organic carbon, cut synthetic fertilizer bills by 40%, and enhance water retention in regional soils.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'advisory', label: isTe ? '🌾 పంట & ఎరువు సలహా' : isHi ? '🌾 फसल व खाद सुझाव' : '🌾 Crop & AGA Suggester' },
              { id: 'soil', label: isTe ? 'నేల పునరుద్ధరణ' : isHi ? 'मृदा सुधार' : 'Soil Health' },
              { id: 'jeevamrutha', label: isTe ? '4 సహజ స్తంభాలు' : isHi ? '4 प्राकृतिक स्तंभ' : '4 Natural Pillars' },
              { id: 'rotation', label: isTe ? 'పంట మార్పిడి పట్టిక' : isHi ? 'फसल चक्र अनुसूची' : 'Crop Rotation Plan' },
              { id: 'savings', label: isTe ? 'ఖర్చు ఆదా లెక్క' : isHi ? 'लागत बचत गणना' : 'Fertilizer Economics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-900 shadow'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1: Soil Health & Organic Carbon */}
      {activeTab === 'soil' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-3 shadow-xs">
              <span className="text-3xl">🌱</span>
              <h3 className="font-bold text-gray-900 text-base">
                {isTe ? 'సేంద్రీయ కర్బనం (Organic Carbon)' : isHi ? 'जैविक कार्बन स्तर' : 'Soil Organic Carbon (SOC)'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isTe
                  ? 'ప్రస్తుతం అనేక ప్రాంతాల్లో SOC 0.35% మాత్రమే ఉంది. AGA సేంద్రీయ ఎరువుతో 2 సీజన్లలో SOC 0.8% - 1.2% కి చేరుతుంది.'
                  : isHi
                  ? 'अधिकांश खेतों में जैविक कार्बन घटकर 0.35% रह गया है। एजीए खाद से इसे 1% तक पुनः बहाल किया जा सकता है।'
                  : 'Normal soils hold only 0.35% SOC due to intensive urea. Applying AGA compost restores SOC toward 1.0%.'}
              </p>
              <div className="p-2.5 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-800">
                {isTe ? 'లక్ష్యం: > 1.0% సేంద్రీయ కర్బనం' : isHi ? 'लक्ष्य: > 1.0% जैविक कार्बन' : 'Target: > 1.0% Living SOC'}
              </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-3 shadow-xs">
              <span className="text-3xl">💧</span>
              <h3 className="font-bold text-gray-900 text-base">
                {isTe ? 'నీటి నిల్వ సామర్థ్యం' : isHi ? 'जल धारण क्षमता' : 'Water Infiltration & Holding'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isTe
                  ? 'సేంద్రీయ పదార్థం వల్ల నేల ప్రతి ఎకరాకు 25,000 లీటర్ల ఎక్కువ నీటిని నిలుపుకుంటుంది. కరువు సమయంలో పంట ఎండిపోకుండా కాపాడుతుంది.'
                  : isHi
                  ? 'जैविक खाद से संपन्न मिट्टी प्रति एकड़ 25,000 लीटर अधिक नमी संचित रखती है, जिससे सूखे में फसल सुरक्षित रहती है।'
                  : 'Every 1% increase in soil organic matter holds approximately 25,000 gallons of additional water per acre.'}
              </p>
              <div className="p-2.5 bg-blue-50 rounded-xl text-xs font-bold text-blue-800">
                {isTe ? '+30% ఎక్కువ తేమ నిల్వ' : isHi ? '+30% अधिक नमी संरक्षण' : '+30% Moisture Longevity'}
              </div>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-3 shadow-xs">
              <span className="text-3xl">🪱</span>
              <h3 className="font-bold text-gray-900 text-base">
                {isTe ? 'వానపాములు & సూక్ష్మజీవులు' : isHi ? 'केंचुआ व सूक्ष्मजीव सक्रियता' : 'Beneficial Earthworms'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isTe
                  ? 'రసాయన క్రిమిసంహారకాలు మరియు అధిక DAP వాడకం వల్ల నేలలో వానపాములు నశించాయి. సహజ ఎరువుల వాడకంతో ఇవి మళ్లీ వృద్ధి చెందుతాయి.'
                  : isHi
                  ? 'रासायनिक खादों के कारण सुप्त पड़े देसी केंचुए प्राकृतिक खाद के प्रयोग से पुनः सक्रिय होकर मिट्टी को भुरभुरा बनाते हैं।'
                  : 'Earthworms and mycorrhizae dig micro-channels, bringing deep subsoil minerals to crop roots.'}
              </p>
              <div className="p-2.5 bg-amber-50 rounded-xl text-xs font-bold text-amber-900">
                {isTe ? 'సహజ నేల గుల్లదనం పునరుద్ధరణ' : isHi ? 'प्राकृतिक जुताई' : 'Living Rhizosphere Activity'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 4 Natural Farming Pillars */}
      {activeTab === 'jeevamrutha' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {naturalPillars.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-emerald-200/80 rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-400 transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-emerald-950">{p.name}</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {p.tag}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-semibold">
                    {isTe ? 'సిఫార్సు మోతాదు:' : isHi ? 'अनुशंसित मात्रा:' : 'Recommended Dosage:'}
                  </span>
                  <span className="font-bold text-emerald-800">{p.dosage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Crop Rotation Plan */}
      {activeTab === 'rotation' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900">
            <p className="font-bold">
              {isTe
                ? 'ఆంధ్రప్రదేశ్ ఖరీఫ్, రబీ & జైద్ పంటల మార్పిడి పట్టిక'
                : isHi
                ? 'आंध्र प्रदेश खरीफ, रबी और जायद फसल चक्र अनुसूची'
                : 'Andhra Pradesh Crop Succession & Soil Replenishment Schedule'}
            </p>
            <p className="mt-1 text-emerald-800/90">
              {isTe
                ? 'ధాన్యపు పంటల తర్వాత పప్పుదినుసులు (లెగ్యూమ్స్) వేయడం ద్వారా నేలలో సహజ నత్రజని స్థిరీకరణ జరుగుతుంది.'
                : isHi
                ? 'अनाज की फसलों के बाद दलहनी फसलों की बुआई से मिट्टी में वायुमंडलीय नाइट्रोजन का प्राकृतिक स्थिरीकरण होता है।'
                : 'Rotating heavy feeder cereal crops with nitrogen-fixing pulses breaks pest cycles and saves synthetic inputs.'}
            </p>
          </div>
          <CropRotationScheduler batches={batches} language={language} />
        </div>
      )}

      {/* Tab 4: Fertilizer Economics & Savings Calculator */}
      {activeTab === 'savings' && (
        <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
              {isTe ? 'రసాయన ఎరువుల ఖర్చు తగ్గింపు లెక్కింపు' : isHi ? 'रासायनिक खाद लागत कटौती' : 'Per-Acre Input Cost Comparison'}
            </h3>
            <p className="text-xs text-gray-600">
              {isTe
                ? 'కృషి గ్రీన్ AGA ఎరువుల వినియోగంతో ఎకరాకు ₹3,500 నుండి ₹6,000 ఆదా అవుతుంది.'
                : isHi
                ? 'डीएपी और यूरिया की आंशिक कटौती व एजीए खाद के प्रयोग से प्रति एकड़ बचत का विवरण।'
                : 'Benchmark comparison for 1 acre irrigated paddy / chilli farming in Andhra Pradesh.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chemical side */}
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-red-900">
                  {isTe ? 'సాంప్రదాయ రసాయన పద్ధతి' : isHi ? 'पारंपरिक रासायनिक खेती' : 'Conventional Chemical Input'}
                </h4>
                <span className="text-xs font-mono text-red-700 bg-red-100 px-2 py-0.5 rounded">
                  {isTe ? 'ఎకరాకి' : isHi ? 'प्रति एकड़' : 'Per Acre'}
                </span>
              </div>
              <ul className="text-xs space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span>DAP (2 బస్తాలు / 100 kg):</span>
                  <span className="font-bold">₹2,700</span>
                </li>
                <li className="flex justify-between">
                  <span>Urea (3 బస్తాలు / 135 kg):</span>
                  <span className="font-bold">₹810</span>
                </li>
                <li className="flex justify-between">
                  <span>Potash / MOP (1 బస్తా / 50 kg):</span>
                  <span className="font-bold">₹1,700</span>
                </li>
                <li className="flex justify-between">
                  <span>రసాయన పురుగుమందులు (Pesticides):</span>
                  <span className="font-bold">₹3,200</span>
                </li>
                <li className="pt-2 border-t border-red-200 flex justify-between font-bold text-red-950 text-sm">
                  <span>{isTe ? 'మొత్తం ఖర్చు:' : isHi ? 'कुल लागत:' : 'Total Chemical Expense:'}</span>
                  <span>₹8,410</span>
                </li>
              </ul>
              <p className="text-[11px] text-red-700 italic">
                {isTe
                  ? '* నేల గట్టిపడుతుంది, ప్రతి ఏటా ఎరువుల అవసరం పెరుగుతుంది.'
                  : isHi
                  ? '* मिट्टी की उर्वरता में निरंतर गिरावट।'
                  : '* Leads to soil compaction, requiring higher dosages each year.'}
              </p>
            </div>

            {/* Krishi Green AGA side */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <IconSparkles className="w-4 h-4 text-emerald-600" />
                  <span>{isTe ? 'కృషి గ్రీన్ AGA సమగ్ర పద్ధతి' : isHi ? 'कृषि ग्रीन एजीए जैविक मॉडल' : 'Krishi Green Integrated Plan'}</span>
                </h4>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded font-bold">
                  {isTe ? 'ఆదా' : isHi ? 'बचत' : 'Optimized'}
                </span>
              </div>
              <ul className="text-xs space-y-2 text-gray-800">
                <li className="flex justify-between">
                  <span>AGA సేంద్రీయ ఎరువు (6 బస్తాలు / 300 kg):</span>
                  <span className="font-bold">₹2,100</span>
                </li>
                <li className="flex justify-between">
                  <span>తగ్గించిన DAP (1 బస్తా మాత్రమే - 50% ఆదా):</span>
                  <span className="font-bold">₹1,350</span>
                </li>
                <li className="flex justify-between">
                  <span>తగ్గించిన Urea (1.5 బస్తాలు):</span>
                  <span className="font-bold">₹405</span>
                </li>
                <li className="flex justify-between">
                  <span>జీవామృతం & కషాయాలు (స్థానిక తయారీ):</span>
                  <span className="font-bold">₹450</span>
                </li>
                <li className="pt-2 border-t border-emerald-300 flex justify-between font-bold text-emerald-950 text-sm">
                  <span>{isTe ? 'మొత్తం ఖర్చు:' : isHi ? 'कुल लागत:' : 'Total Optimized Expense:'}</span>
                  <span className="text-emerald-800 font-black">₹4,305</span>
                </li>
              </ul>
              <div className="p-2.5 bg-emerald-100 rounded-xl text-xs font-bold text-emerald-900 flex justify-between">
                <span>{isTe ? 'ఎకరాకు నికర ఆదా:' : isHi ? 'प्रति एकड़ शुद्ध बचत:' : 'Net Direct Savings / Acre:'}</span>
                <span className="text-emerald-950 font-black">₹4,105 (48% ఆదా)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Crop & AGA Advisory Suggester */}
      {activeTab === 'advisory' && (
        <div className="space-y-6">
          <CropAdvisorySuggester language={language} />
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white border border-emerald-100 rounded-2xl shadow-xs">
        <div className="space-y-0.5">
          <h4 className="font-bold text-gray-900 text-sm">
            {isTe ? 'AGA సేంద్రీయ ఎరువు కోసం అభ్యర్థించండి' : isHi ? 'एजीए जैविक खाद बुक करें' : 'Ready to trial AGA Organic Fertilizer?'}
          </h4>
          <p className="text-xs text-gray-500">
            {isTe ? 'పల్నాడు మరియు సమీప మండలాల రైతులకు ప్రత్యేక డెలివరీ.' : isHi ? 'आंध्र प्रदेश पायलट क्षेत्रों में डिलीवरी उपलब्ध।' : 'Available for field trials across pilot districts.'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigateTo(APP_ROUTES.AGA)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow transition flex items-center gap-1.5"
          >
            <span>{isTe ? 'ఎరువు వివరాలు చూడండి' : isHi ? 'खाद विवरण देखें' : 'View AGA Specifications'}</span>
            <IconChevronRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="tel:18005747443"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
          >
            <IconPhone className="w-3.5 h-3.5" />
            <span>1800-KRISHI-GRN</span>
          </a>
        </div>
      </div>
    </div>
  );
}
