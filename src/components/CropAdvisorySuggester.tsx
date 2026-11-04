import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Volume2,
  VolumeX,
  Share2,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Info,
  DollarSign,
  Tractor,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { navigateTo, APP_ROUTES } from '../utils/navigation';

interface CropAdvisorySuggesterProps {
  language: SupportedLanguage;
  onOpenBooking?: (crop: string, bags: number) => void;
}

interface CropSuggestion {
  id: string;
  name: string;
  nameTe: string;
  nameHi: string;
  variety: string;
  sowingWindow: string;
  sowingWindowTe: string;
  sowingWindowHi: string;
  durationDays: string;
  yieldPerAcre: string;
  yieldPerAcreTe: string;
  yieldPerAcreHi: string;
  waterNeed: 'Low' | 'Medium' | 'High';
  soilSuitability: string[];
  agaDosageKgPerAcre: number;
  dapReplacementPercent: number;
  ureaReplacementPercent: number;
  savingsPerAcreINR: number;
  whySowNow: string;
  whySowNowTe: string;
  whySowNowHi: string;
  agaProtocol: string;
  agaProtocolTe: string;
  agaProtocolHi: string;
}

export const CropAdvisorySuggester: React.FC<CropAdvisorySuggesterProps> = ({
  language,
  onOpenBooking,
}) => {
  const isTe = language === 'te';
  const isHi = language === 'hi';

  // Farmer Inputs
  const [selectedDistrict, setSelectedDistrict] = useState<string>('palnadu');
  const [selectedSoil, setSelectedSoil] = useState<string>('black');
  const [selectedWater, setSelectedWater] = useState<string>('borewell');
  const [selectedSeason, setSelectedSeason] = useState<string>('rabi');
  const [farmAcres, setFarmAcres] = useState<number>(2);
  const [activeCropId, setActiveCropId] = useState<string>('maize');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Database of Regional Crop Recommendations
  const cropDatabase: CropSuggestion[] = [
    {
      id: 'maize',
      name: 'Rabi Hybrid Maize (Makka Jonna)',
      nameTe: 'రబీ హైబ్రిడ్ మొక్కజొన్న (మక్క జొన్న)',
      nameHi: 'रबी हाइब्रिड मक्का (मकई)',
      variety: 'DKC 9108 / Kaveri 50 / Pioneer 3396',
      sowingWindow: 'Oct 25 – Nov 30',
      sowingWindowTe: 'అక్టోబర్ 25 – నవంబర్ 30',
      sowingWindowHi: '25 अक्टूबर – 30 नवंबर',
      durationDays: '110 – 120 Days',
      yieldPerAcre: '32 – 38 Quintals',
      yieldPerAcreTe: '32 – 38 క్వింటాళ్లు',
      yieldPerAcreHi: '32 – 38 क्विंटल',
      waterNeed: 'Medium',
      soilSuitability: ['black', 'alluvial', 'red'],
      agaDosageKgPerAcre: 300, // 6 bags
      dapReplacementPercent: 40,
      ureaReplacementPercent: 30,
      savingsPerAcreINR: 2350,
      whySowNow:
        'Clear winter sunshine and low cloud cover in Palnadu & Guntur reduce blight pressure, yielding 30-40% higher than Kharif season.',
      whySowNowTe:
        'పల్నాడు మరియు గుంటూరులో చలికాలం స్పష్టమైన ఎండతో బూజు తెగుళ్లు రావు. ఖరీఫ్ కంటే రబీలో 30-40% అధిక దిగుబడి లభిస్తుంది.',
      whySowNowHi:
        'रबी में साफ धूप और कम आर्द्रता के कारण झुलसा रोग नहीं लगता। खरीफ की तुलना में पैदावार 30-40% अधिक होती है।',
      agaProtocol:
        'Basal: 300 kg Krishi Green AGA Compost + 25 kg neem cake. Top-dress: Jeevamrutha 200L via drip at 25 and 45 days.',
      agaProtocolTe:
        'ఆఖరి దుక్కిలో: 300 కిలోల AGA సేంద్రీయ ఎరువు + 25 కిలోల వేప పిండి. పైపాటుగా: 25 మరియు 45వ రోజున 200 లీటర్ల జీవామృతం.',
      agaProtocolHi:
        'अंतिम जुताई में: 300 किग्रा एजीए जैविक खाद + 25 किग्रा नीम खली। 25 व 45 दिन पर 200 लीटर जीवामृत सिंचाई के साथ।',
    },
    {
      id: 'chilli',
      name: 'Guntur Teja Chilli (Mirchi)',
      nameTe: 'గుంటూరు తేజ మిరప (ఎండు మిరప)',
      nameHi: 'गुंटूर तेजा लाल मिर्च',
      variety: 'Teja S17 / Armoor / LCA 334',
      sowingWindow: 'Sep 15 – Nov 15',
      sowingWindowTe: 'సెప్టెంబర్ 15 – నవంబర్ 15',
      sowingWindowHi: '15 सितंबर – 15 नवंबर',
      durationDays: '150 – 165 Days',
      yieldPerAcre: '25 – 30 Quintals (Dry)',
      yieldPerAcreTe: '25 – 30 క్వింటాళ్ల ఎండు మిర్చి',
      yieldPerAcreHi: '25 – 30 क्विंटल (सूखी मिर्च)',
      waterNeed: 'Medium',
      soilSuitability: ['black', 'red'],
      agaDosageKgPerAcre: 400, // 8 bags
      dapReplacementPercent: 50,
      ureaReplacementPercent: 35,
      savingsPerAcreINR: 3450,
      whySowNow:
        'Deep-rooted commercial spice crop commanding premium prices at Guntur Mandi. High demand for capsaicin-rich varieties.',
      whySowNowTe:
        'గుంటూరు మార్కెట్ యార్డ్‌లో రికార్డు ధరలు. సేంద్రీయ పద్ధతిలో రంగు, కారం మరియు నిల్వ సామర్థ్యం ఎక్కువగా ఉంటుంది.',
      whySowNowHi:
        'गुंटूर मंडी में सर्वाधिक मांग और प्रीमियम भाव। जैविक खाद से तीखापन और चमक बढ़ती है।',
      agaProtocol:
        'Basal: 400 kg AGA Compost. Spray Panchagavya 3% at flowering to prevent flower drop and thrips infestation.',
      agaProtocolTe:
        'దుక్కిలో: 400 కిలోల AGA ఎరువు. పూత రాలకుండా మరియు తామర పురుగుల నివారణకు పూత దశలో 3% పంచగవ్య పిచికారీ.',
      agaProtocolHi:
        'जुताई में: 400 किग्रा एजीए खाद। फूल आने पर फूल झड़ने से रोकने के लिए 3% पंचगव्य का छिड़काव।',
    },
    {
      id: 'blackgram',
      name: 'Black Gram / Urad (Minumulu)',
      nameTe: 'రబీ మినుములు (వరి మాగాణి మినుము)',
      nameHi: 'रबी उड़द (काली दाल)',
      variety: 'LBG 752 / PU 31 / TBG 104',
      sowingWindow: 'Nov 10 – Dec 20',
      sowingWindowTe: 'నవంబర్ 10 – డిసెంబర్ 20',
      sowingWindowHi: '10 नवंबर – 20 दिसंबर',
      durationDays: '75 – 85 Days',
      yieldPerAcre: '8 – 12 Quintals',
      yieldPerAcreTe: '8 – 12 క్వింటాళ్లు',
      yieldPerAcreHi: '8 – 12 क्विंटल',
      waterNeed: 'Low',
      soilSuitability: ['black', 'alluvial', 'clay'],
      agaDosageKgPerAcre: 200, // 4 bags
      dapReplacementPercent: 60,
      ureaReplacementPercent: 100, // Zero urea needed for pulses
      savingsPerAcreINR: 1950,
      whySowNow:
        'Ideal zero-till relay crop in rice fallows. Roots fix 30-40 kg atmospheric nitrogen per acre, enriching soil for summer.',
      whySowNowTe:
        'వరి కోతల తర్వాత మాగాణిలో జీరో-టిల్లేజ్ పంట. వేర్ల బుడిపెల ద్వారా నేలకు సహజ నత్రజని అందిస్తుంది, ఖర్చు చాలా తక్కువ.',
      whySowNowHi:
        'धान कटाई के बाद बिना जुताई (जीरो टिलेज) सबसे कम लागत वाली दाल फसल। हवा से नाइट्रोजन सोखकर मिट्टी उपजाऊ बनाती है।',
      agaProtocol:
        'Seed coating with Beejamrutha + 200 kg AGA compost broadcasted. Bio-NPK inoculation ensures rich pod filling.',
      agaProtocolTe:
        'విత్తనానికి బీజామృతం పట్టించి విత్తుకోవాలి. 200 కిలోల AGA ఎరువు చల్లడం ద్వారా కాయ సైజు బాగా వస్తుంది.',
      agaProtocolHi:
        'बीजामृत से बीजोपचार व 200 किग्रा एजीए खाद का छिड़काव। फलियों में भरपूर दाना बनता है।',
    },
    {
      id: 'groundnut',
      name: 'Rabi Groundnut (Verusenaga)',
      nameTe: 'రబీ వేరుశనగ (శనగ కాయ)',
      nameHi: 'रबी मूंगफली',
      variety: 'K 6 (Kadiri) / TAG 24 / Dharani',
      sowingWindow: 'Oct 20 – Nov 25',
      sowingWindowTe: 'అక్టోబర్ 20 – నవంబర్ 25',
      sowingWindowHi: '20 अक्टूबर – 25 नवंबर',
      durationDays: '100 – 110 Days',
      yieldPerAcre: '14 – 18 Quintals',
      yieldPerAcreTe: '14 – 18 క్వింటాళ్లు',
      yieldPerAcreHi: '14 – 18 क्विंटल',
      waterNeed: 'Medium',
      soilSuitability: ['red', 'sandy', 'alluvial'],
      agaDosageKgPerAcre: 300,
      dapReplacementPercent: 45,
      ureaReplacementPercent: 80,
      savingsPerAcreINR: 2600,
      whySowNow:
        'High oil content (48-50%) in Rabi harvest yields premium prices in Rayalaseema & coastal Andhra markets.',
      whySowNowTe:
        'రబీ వేరుశనగలో నూనె శాతం 48-50% ఉండటం వల్ల మిల్లుల వద్ద ఎక్కువ ధర వస్తుంది. జిప్సం, సేంద్రీయ ఎరువుతో నాణ్యమైన కాయలు.',
      whySowNowHi:
        'रबी मूंगफली में 48-50% तेल की मात्रा होती है, जिससे मिलों से सर्वोत्तम भाव मिलता है।',
      agaProtocol:
        '300 kg AGA compost + 100 kg Gypsum at pegging stage. Ensures bold pods with zero empty shells (pop pods).',
      agaProtocolTe:
        '300 కిలోల AGA ఎరువు + ఊడలు దిగే దశలో 100 కిలోల జిప్సం. పొల్లు కాయలు లేకుండా గింజ బరువుగా వస్తుంది.',
      agaProtocolHi:
        '300 किग्रा एजीए खाद + सुइयां बनते समय 100 किग्रा जिप्सम। खाली दानों की समस्या समाप्त।',
    },
    {
      id: 'sunflower',
      name: 'Rabi Sunflower (Poddu Tirugudu)',
      nameTe: 'రబీ పొద్దుతిరుగుడు',
      nameHi: 'रबी सूरजमुखी',
      variety: 'KBSH 44 / DRSH 1 / Pioneer 64A57',
      sowingWindow: 'Nov 01 – Nov 30',
      sowingWindowTe: 'నవంబర్ 01 – నవంబర్ 30',
      sowingWindowHi: '01 नवंबर – 30 नवंबर',
      durationDays: '85 – 95 Days',
      yieldPerAcre: '10 – 14 Quintals',
      yieldPerAcreTe: '10 – 14 క్వింటాళ్లు',
      yieldPerAcreHi: '10 – 14 क्विंटल',
      waterNeed: 'Low',
      soilSuitability: ['black', 'alluvial', 'red'],
      agaDosageKgPerAcre: 250,
      dapReplacementPercent: 35,
      ureaReplacementPercent: 30,
      savingsPerAcreINR: 1850,
      whySowNow:
        'Short-duration oilseed with deep taproots. Highly resilient to terminal moisture stress and drought spells.',
      whySowNowTe:
        'తక్కువ రోజుల్లో చేతికొచ్చే పంట (90 రోజులు). చివరి దశలో నీటి కొరత వచ్చినా తట్టుకుని మంచి దిగుబడి ఇస్తుంది.',
      whySowNowHi:
        'कम समय (85-95 दिन) की तिलहनी फसल। पानी की कमी में भी सुरक्षित पैदावार।',
      agaProtocol:
        '250 kg AGA compost + Boron micronutrient spray at ray floret stage to maximize seed setting.',
      agaProtocolTe:
        '250 కిలోల AGA ఎరువు + పూత విచ్చుకునే దశలో బోరాన్ పిచికారీతో గింజలు నూటికి నూరు శాతం నిండుతాయి.',
      agaProtocolHi:
        '250 किग्रा एजीए खाद + फूल खिलते समय बोरान का छिड़काव ताकि दाना पूरा भरे।',
    },
  ];

  // Filter recommendations based on selected soil and water
  const filteredCrops = cropDatabase.filter((c) =>
    c.soilSuitability.includes(selectedSoil)
  );

  const currentCrop =
    filteredCrops.find((c) => c.id === activeCropId) || filteredCrops[0] || cropDatabase[0];

  // Dynamic Calculations for selected farm acreage
  const totalAgaKgNeeded = currentCrop.agaDosageKgPerAcre * farmAcres;
  const totalBagsNeeded = Math.ceil(totalAgaKgNeeded / 50);
  const totalEstimatedSavingsINR = currentCrop.savingsPerAcreINR * farmAcres;
  const carbonBenefitINR = Math.round(farmAcres * 750 * 0.85);

  // Audio Speech Reader in Local Language
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech not supported in this browser');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cropName = isTe ? currentCrop.nameTe : isHi ? currentCrop.nameHi : currentCrop.name;
    const whyText = isTe ? currentCrop.whySowNowTe : isHi ? currentCrop.whySowNowHi : currentCrop.whySowNow;
    const protocolText = isTe ? currentCrop.agaProtocolTe : isHi ? currentCrop.agaProtocolHi : currentCrop.agaProtocol;
    const savingsText = isTe
      ? `మీ ${farmAcres} ఎకరాలకు AGA సేంద్రీయ ఎరువు వాడటం ద్వారా సుమారు ${totalEstimatedSavingsINR} రూపాయల రసాయన ఎరువుల ఖర్చు ఆదా అవుతుంది.`
      : isHi
      ? `आपके ${farmAcres} एकड़ में एजीए जैविक खाद से लगभग ${totalEstimatedSavingsINR} रुपये की बचत होगी।`
      : `By using AGA Organic Fertilizer across your ${farmAcres} acres, you save approximately ${totalEstimatedSavingsINR} rupees in synthetic fertilizer costs.`;

    const fullUtteranceText = `${cropName}. ${whyText}. ${protocolText}. ${savingsText}`;

    const utterance = new SpeechSynthesisUtterance(fullUtteranceText);
    utterance.lang = isTe ? 'te-IN' : isHi ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleShareSummary = () => {
    const textToShare = `🌾 *Krishi Green Crop & Fertilizer Advisory* 🌾\n` +
      `District: ${selectedDistrict.toUpperCase()} | Soil: ${selectedSoil.toUpperCase()} | Area: ${farmAcres} Acres\n` +
      `Recommended Crop: ${currentCrop.name}\n` +
      `Sowing Window: ${currentCrop.sowingWindow}\n` +
      `Expected Yield: ${currentCrop.yieldPerAcre}\n` +
      `AGA Fertilizer Required: ${totalBagsNeeded} Bags (${totalAgaKgNeeded} kg)\n` +
      `Estimated Cost Savings: ₹${totalEstimatedSavingsINR.toLocaleString('en-IN')}\n` +
      `Helpline: 1800-KRISHI-GRN (1800-574-7443)\n` +
      `https://krishigreen.in`;

    if (navigator.share) {
      navigator.share({
        title: 'Krishi Green Advisory',
        text: textToShare,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    }
  };

  return (
    <div className="bg-white border border-emerald-200/90 rounded-3xl shadow-md overflow-hidden text-[#17231c]">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isTe ? 'రైతు సలహా ఇంజిన్' : isHi ? 'स्मार्ट फसल एवं खाद सलाहकार' : 'Farmer Advisory & AGA Suggester'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isTe
                ? 'మీ నేల & కాలానికి తగిన పంట సలహా'
                : isHi
                ? 'मिट्टी, पानी व मौसम अनुसार सर्वश्रेष्ठ फसल सुझाव'
                : 'Custom Crop & AGA Fertilizer Recommendation'}
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl">
              {isTe
                ? 'మీ జిల్లా, నేల రకం మరియు నీటి వసతిని ఎంచుకోండి. ఆంధ్రప్రదేశ్ వ్యవసాయ విశ్వవిద్యాలయ (ANGRAU) మార్గదర్శకాల ఆధారంగా రూపొందించిన సూచనలు.'
                : 'Select your district, soil type, and irrigation source to get proven crop rotations, exact AGA fertilizer doses, and instant cost savings.'}
            </p>
          </div>

          {/* Audio listen button */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={toggleSpeech}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-sm ${
                isSpeaking
                  ? 'bg-amber-400 text-emerald-950 animate-pulse'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/40'
              }`}
              title={isTe ? 'సలహాను గట్టిగా వినండి' : 'Listen to advisory aloud'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-emerald-950" />
                  <span>{isTe ? 'ఆపు' : isHi ? 'रोकें' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>{isTe ? 'వాయిస్ సలహా వినండి' : isHi ? 'आवाज में सुनें' : 'Listen Aloud'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleShareSummary}
              className="p-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 rounded-xl border border-emerald-600/40 transition"
              title={isTe ? 'వాట్సాప్‌లో పంపండి' : 'Share via WhatsApp / Copy'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {shareCopied && (
          <div className="mt-3 p-2 bg-emerald-700/60 border border-emerald-400/50 rounded-lg text-xs text-white text-center animate-fadeIn">
            ✓ {isTe ? 'సలహా కాపీ చేయబడింది! వాట్సాప్‌లో షేర్ చేయవచ్చు.' : 'Advisory summary copied to clipboard! Ready to share.'}
          </div>
        )}
      </div>

      {/* Interactive Selectors Section */}
      <div className="p-6 sm:p-8 bg-emerald-50/40 border-b border-emerald-100 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. District Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              {isTe ? '1. మీ జిల్లా:' : isHi ? '1. आपका जिला:' : '1. District / Region:'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="palnadu">Palnadu (Narasaraopet / Vinukonda)</option>
              <option value="guntur">Guntur (Tenali / Bapatla / Mangalagiri)</option>
              <option value="prakasam">Prakasam (Ongole / Markapur)</option>
              <option value="krishna">Krishna (Machilipatnam / Gudivada)</option>
              <option value="kurnool">Kurnool (Nandyal / Adoni)</option>
              <option value="anantapur">Anantapur (Kadiri / Hindupur)</option>
              <option value="godavari">East & West Godavari Delta</option>
            </select>
          </div>

          {/* 2. Soil Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              {isTe ? '2. నేల రకం:' : isHi ? '2. मिट्टी का प्रकार:' : '2. Soil Type:'}
            </label>
            <select
              value={selectedSoil}
              onChange={(e) => {
                setSelectedSoil(e.target.value);
                // Auto switch active crop if current isn't suitable
                const matched = cropDatabase.filter((c) => c.soilSuitability.includes(e.target.value));
                if (matched.length > 0 && !matched.some((m) => m.id === activeCropId)) {
                  setActiveCropId(matched[0].id);
                }
              }}
              className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="black">{isTe ? 'నల్ల రేగడి నేల (Black Cotton)' : 'Black Cotton Soil (Regur)'}</option>
              <option value="red">{isTe ? 'ఎర్ర నేల / చల్కా (Red Sandy Loam)' : 'Red Sandy Loam'}</option>
              <option value="alluvial">{isTe ? 'డెల్టా ఒండ్రు నేల (Delta Alluvial)' : 'Delta Alluvial Soil'}</option>
              <option value="clay">{isTe ? 'బంకమట్టి / మాగాణి (Clay Loam)' : 'Clay Loam (Rice Fallows)'}</option>
            </select>
          </div>

          {/* 3. Water / Irrigation Source */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              {isTe ? '3. నీటి వనరు:' : isHi ? '3. सिंचाई का साधन:' : '3. Irrigation Source:'}
            </label>
            <select
              value={selectedWater}
              onChange={(e) => setSelectedWater(e.target.value)}
              className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="borewell">{isTe ? 'బోరు బావి / బావి (Borewell / Well)' : 'Borewell / Tube Well'}</option>
              <option value="canal">{isTe ? 'కాలువ నీరు (Canal System)' : 'Canal Irrigation'}</option>
              <option value="drip">{isTe ? 'బిందు సేద్యం (Drip Micro-irrigation)' : 'Drip / Sprinkler'}</option>
              <option value="rainfed">{isTe ? 'వర్షాధార మెట్ట (Rainfed Dryland)' : 'Rainfed / Dryland'}</option>
            </select>
          </div>

          {/* 4. Season */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              {isTe ? '4. ప్రస్తుత కాలం:' : isHi ? '4. मौजूदा सीजन:' : '4. Current Season:'}
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="rabi">{isTe ? 'రబీ / చలికాలం (Rabi Season - Now)' : 'Rabi Season (Winter - Current)'}</option>
              <option value="kharif">{isTe ? 'ఖరీఫ్ / వర్షాకాలం (Kharif Season)' : 'Kharif Season (Monsoon)'}</option>
              <option value="zaid">{isTe ? 'ఎండకాలం / జైద్ (Summer Season)' : 'Zaid (Summer Relay)'}</option>
            </select>
          </div>
        </div>

        {/* Acreage Slider & Presets */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Tractor className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-gray-800">
                {isTe ? 'పొలం విస్తీర్ణం (ఎకరాలు):' : isHi ? 'खेत का रकबा (एकड़):' : 'Farm Cultivation Area:'}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-md font-mono font-extrabold text-sm">
                {farmAcres} {isTe ? 'ఎకరాలు' : isHi ? 'एकड़' : 'Acres'}
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              {isTe ? 'ఎరువు మోతాదు మరియు ఆదా ఈ విస్తీర్ణానికి లెక్కించబడుతుంది.' : 'Dosage and savings update automatically for this area.'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {[1, 2, 3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setFarmAcres(num)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  farmAcres === num
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                {num} Ac
              </button>
            ))}
            <input
              type="range"
              min={1}
              max={25}
              value={farmAcres}
              onChange={(e) => setFarmAcres(Number(e.target.value))}
              className="w-24 sm:w-32 accent-emerald-600 cursor-pointer hidden md:block"
            />
          </div>
        </div>
      </div>

      {/* Crop Recommendations Tabs */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            {isTe
              ? 'ఈ నేల మరియు కాలానికి సిఫార్సు చేయబడిన పంటలు:'
              : isHi
              ? 'आपकी मिट्टी और सीजन के लिए अनुशंसित फसलें:'
              : 'Recommended Crops for Selected Soil & Regime:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCrops.map((crop) => {
              const isSelected = crop.id === currentCrop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => setActiveCropId(crop.id)}
                  className={`p-4 rounded-2xl text-left transition border ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500'
                      : 'bg-white hover:bg-emerald-50/70 border-emerald-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {crop.durationDays}
                    </span>
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`}>
                      {crop.sowingWindow}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm sm:text-base mt-2 leading-snug">
                    {isTe ? crop.nameTe : isHi ? crop.nameHi : crop.name}
                  </h4>
                  <p className={`text-xs mt-1 ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                    {crop.variety}
                  </p>

                  <div className={`mt-3 pt-3 border-t text-xs flex justify-between items-center ${
                    isSelected ? 'border-emerald-800 text-emerald-100' : 'border-gray-100 text-gray-600'
                  }`}>
                    <span>{isTe ? 'దిగుబడి:' : 'Yield:'} <b>{isTe ? crop.yieldPerAcreTe : crop.yieldPerAcre}</b></span>
                    <span className="font-bold text-amber-500">₹{crop.savingsPerAcreINR}/Ac ఆదా</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Crop Deep-Dive Advisory Card */}
        <div className="bg-emerald-50/70 border border-emerald-300/80 rounded-2xl p-6 sm:p-7 space-y-6">
          {/* Top Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-200/70 px-2.5 py-0.5 rounded-md uppercase">
                {isTe ? 'వివరణాత్మక కార్యాచరణ' : 'Selected Action Plan'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                {isTe ? currentCrop.nameTe : isHi ? currentCrop.nameHi : currentCrop.name}
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                {isTe ? 'సిఫార్సు రకాలు:' : 'Certified Seed Varieties:'} {currentCrop.variety}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center sm:text-left">
              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isTe ? 'విత్తు కాలం' : 'Sowing Window'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
                  {isTe ? currentCrop.sowingWindowTe : currentCrop.sowingWindow}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  {isTe ? 'ఆశించే దిగుబడి' : 'Expected Yield'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
                  {isTe ? currentCrop.yieldPerAcreTe : currentCrop.yieldPerAcre}
                </span>
              </div>
            </div>
          </div>

          {/* Why Sow Now & Scientific Reason */}
          <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isTe ? 'ఇప్పుడే ఎందుకు విత్తుకోవాలి? (శాస్త్రీయ కారణం):' : 'Agro-Climatic Rationale for this Season:'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {isTe ? currentCrop.whySowNowTe : isHi ? currentCrop.whySowNowHi : currentCrop.whySowNow}
            </p>
          </div>

          {/* AGA Organic Fertilizer Schedule */}
          <div className="bg-white p-5 rounded-xl border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>
                  {isTe ? 'AGA సేంద్రీయ ఎరువు నియమం & మోతాదు' : 'AGA Organic Fertilizer Application Schedule'}
                </span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                FCO 1985 Grade 1
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
              {isTe ? currentCrop.agaProtocolTe : isHi ? currentCrop.agaProtocolHi : currentCrop.agaProtocol}
            </p>

            {/* Calculated Requirements for Farm Size */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] text-gray-600 block">
                  {isTe ? 'అవసరమైన AGA ఎరువు' : 'Total AGA Needed'}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-950">
                  {totalBagsNeeded} {isTe ? 'బస్తాలు' : 'Bags'}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">({totalAgaKgNeeded} kg)</span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] text-gray-600 block">
                  {isTe ? 'తగ్గే రసాయన DAP' : 'DAP Cut'}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-950">
                  {currentCrop.dapReplacementPercent}% {isTe ? 'ఆదా' : 'Cut'}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">{isTe ? 'భూమి గుల్లబారుతుంది' : 'Zero compaction'}</span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] text-gray-600 block">
                  {isTe ? 'నికర ఖర్చు ఆదా' : 'Net Input Savings'}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-800">
                  ₹{totalEstimatedSavingsINR.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">{farmAcres} {isTe ? 'ఎకరాలకు' : 'Acres'}</span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] text-gray-600 block">
                  {isTe ? 'కార్బన్ బోనస్ (DBT)' : 'Carbon Benefit'}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-950">
                  ₹{carbonBenefitINR.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">{isTe ? 'ఖాతాలో జమ' : 'Direct DBT'}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isTe
                  ? `మీ ${farmAcres} ఎకరాలకు ₹${totalEstimatedSavingsINR} ఆదా అవుతుంది.`
                  : `Total estimated net savings for your ${farmAcres} acres: ₹${totalEstimatedSavingsINR.toLocaleString('en-IN')}.`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking(currentCrop.name, totalBagsNeeded);
                  } else {
                    navigateTo(APP_ROUTES.AGA);
                  }
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-1.5"
              >
                <span>{isTe ? `${totalBagsNeeded} బస్తాల AGA ఎరువు బుక్ చేయండి` : `Book ${totalBagsNeeded} Bags AGA Fertilizer`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:18005747443"
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>1800-KRISHI-GRN</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
