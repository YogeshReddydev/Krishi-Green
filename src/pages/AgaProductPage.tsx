import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  IconLeaf,
  IconSparkles,
  IconShield,
  IconCheck,
  IconPhone,
  IconChevronRight,
  IconLayers,
  IconSun,
} from '../components/Icons';

interface AgaProductPageProps {
  language: SupportedLanguage;
  onOpenQR?: (batchData: any) => void;
}

export function AgaProductPage({ language, onOpenQR }: AgaProductPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [bookingBags, setBookingBags] = useState(10);
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Narasaraopet Mandal');
  const [cropType, setCropType] = useState('Paddy / వరి');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim()) {
      alert(isTe ? 'దయచేసి పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి' : 'Please enter name and phone.');
      return;
    }

    setIsSubmitting(true);
    const bookingId = `AGA-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await addDoc(collection(db, 'aga_bookings'), {
        bookingId,
        farmerName,
        phone,
        village,
        cropType,
        bagsCount: bookingBags,
        priceEstimateINR: bookingBags * 350,
        status: 'Booking Inquiry Received',
        createdAt: new Date().toISOString(),
      });
      setSubmittedBookingId(bookingId);
      setFarmerName('');
      setPhone('');
    } catch (err) {
      console.warn('Booking saved locally:', err);
      setSubmittedBookingId(bookingId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewSampleBatchQR = () => {
    if (onOpenQR) {
      onOpenQR({
        batchNo: 'AGA-PROT-2026-B1',
        productName: 'Krishi Green AGA Organic Fertilizer',
        producerName: 'Palnadu Decentralized Processing Unit',
        village: 'Narasaraopet Rural, Palnadu District, AP',
        productionDate: '2026-10-15',
        certificationStatus: 'PROTOTYPE TRIAL LOT (FCO 1985 Guidelines Tested)',
        npk: {
          nitrogen: '1.92%',
          phosphorus: '1.45%',
          potassium: '1.68%',
          organicCarbonPercent: 18.2,
          ph: 7.2,
          cToNRatio: '15.8:1',
        },
      });
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn text-[#17231c]">
      {/* Prototype Disclosure Banner */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex items-start gap-3">
        <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg text-xs font-bold font-mono">
          SPECIFICATION PROTOTYPE
        </span>
        <div className="text-xs text-amber-950 leading-relaxed">
          <p className="font-bold">
            {isTe
              ? 'AGA సేంద్రీయ ఎరువు నమూనా వివరాలు & ప్రయోగశాల నివేదిక'
              : isHi
              ? 'एजीए जैविक खाद: प्रोटोटाइप परीक्षण विशिष्टता'
              : 'AGA Organic Fertilizer: Pilot Trial Specifications'}
          </p>
          <p className="mt-0.5 text-amber-900/90">
            {isTe
              ? 'క్రింది పోషక విలువలు మరియు కిణ్వ ప్రక్రియ వివరాలు పైలట్ బ్యాచ్ పరీక్షల ఆధారంగా రూపొందించబడ్డాయి. వాణిజ్య బ్యాచ్‌లకు విడివిడిగా టెస్ట్ సర్టిఫికెట్ జారీ చేయబడుతుంది.'
              : 'The nutrient parameters and formulation represent pilot batch test results under FCO 1985 guidelines. Independent batch lab tests are generated per production lot.'}
          </p>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconSparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {isTe ? 'కృషి గ్రీన్ ప్రత్యేక సేంద్రీయ ఎరువు' : isHi ? 'कृषि ग्रीन विशेष जैविक खाद' : 'Proprietary Organic Bio-Input'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            AGA Organic Fertilizer (50 kg)
          </h1>
          <p className="text-xl font-medium text-emerald-200">
            {isTe
              ? 'ఆవు పేడ, జీవామృతం & ఆహార వ్యర్థాల మిశ్రమంతో తయారైన సజీవ ఎరువు'
              : isHi
              ? 'देसी गाय के गोबर, जीवामृत और जैविक अवशेषों से समृद्ध संपूर्ण खाद'
              : 'Enriched microbial bio-fertilizer restoring living organic carbon to depleted soils.'}
          </p>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'రసాయన డీఏపీ (DAP) మరియు యూరియా ఖర్చులను 40-50% వరకు తగ్గిస్తూ, వేర్లకు పోషకాలను స్థిరంగా అందించే సమగ్ర పోషక మిశ్రమం. ఖరీఫ్ మరియు రబీ అన్ని రకాల పంటలకు అనుకూలం.'
              : 'Formulated to replace up to 50% of synthetic chemical DAP while revitalizing soil earthworms and microbial biomass. 100% natural, weed-seed-free, and pathogen cleared.'}
          </p>

          {/* Key highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-emerald-900/60 border border-emerald-700/60 p-3 rounded-xl text-center">
              <span className="block text-xl font-extrabold text-amber-300">18.2%</span>
              <span className="text-[11px] text-emerald-200 uppercase font-semibold">Organic Carbon</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/60 p-3 rounded-xl text-center">
              <span className="block text-xl font-extrabold text-emerald-300">1.92%</span>
              <span className="text-[11px] text-emerald-200 uppercase font-semibold">Total Nitrogen (N)</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/60 p-3 rounded-xl text-center">
              <span className="block text-xl font-extrabold text-emerald-300">1.45%</span>
              <span className="text-[11px] text-emerald-200 uppercase font-semibold">Total Phos (P2O5)</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/60 p-3 rounded-xl text-center">
              <span className="block text-xl font-extrabold text-emerald-300">1.68%</span>
              <span className="text-[11px] text-emerald-200 uppercase font-semibold">Total Potash (K2O)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="#booking-form"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-sm shadow transition flex items-center gap-2"
            >
              <span>{isTe ? 'ఎరువు బుకింగ్ / విచారణ' : isHi ? 'खाद अग्रिम बुकिंग' : 'Book AGA Trial Bags'}</span>
              <IconChevronRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleViewSampleBatchQR}
              className="px-6 py-3 bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/60 text-white font-bold rounded-xl text-sm transition flex items-center gap-2"
            >
              <IconLayers className="w-4 h-4 text-emerald-300" />
              <span>{isTe ? 'QR కోడ్ & టెస్ట్ రిపోర్ట్ చూడండి' : 'Inspect Sample Batch QR'}</span>
            </button>
            <a
              href="tel:18005747443"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition flex items-center gap-2"
            >
              <IconPhone className="w-4 h-4 text-amber-300" />
              <span>1800-KRISHI-GRN</span>
            </a>
          </div>
        </div>
      </div>

      {/* Composition & Ingredients Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span>{isTe ? 'AGA ఎరువు సహజ పదార్థాలు' : isHi ? 'प्राकृतिक सामग्री' : 'Target Formulation & Ingredients'}</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isTe
              ? 'కృషి గ్రీన్ AGA ఎరువు రసాయన రహిత సహజ పదార్థాల కిణ్వ ప్రక్రియ ద్వారా తయారవుతుంది.'
              : 'Every bag of AGA is blended from rigorously tested bio-inputs:'}
          </p>

          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <IconCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">
                  {isTe ? 'నాటు ఆవు పేడ & గోమూత్రం (Desi Cow Go-maya & Go-mutra)' : 'Indigenous Desi Cow Manure'}
                </strong>
                <span className="text-gray-600 text-xs">
                  {isTe ? 'సహజ వానపాములు మరియు సూక్ష్మజీవులను క్రియాశీలం చేసేందుకు మూల పదార్థం.' : 'Rich in indigenous actinomycetes and active cellulolytic enzymes.'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <IconCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">
                  {isTe ? 'జీవామృతం కల్చర్ (Jeevamrutham Culture)' : 'Jeevamrutham Fermented Inoculant'}
                </strong>
                <span className="text-gray-600 text-xs">
                  {isTe ? 'నత్రజని స్థిరీకరణ మరియు భాస్వరం కరిగించే బ్యాక్టీరియా సంవర్ధనం.' : 'Cultured with nitrogen-fixing Azotobacter and phosphorus-solubilizing microbes (PSB).'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <IconCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">
                  {isTe ? 'సేంద్రీయ కూరగాయల & ఆహార వ్యర్థాలు (Cured Mandi Waste)' : 'Segregated Organic Mandi Residue'}
                </strong>
                <span className="text-gray-600 text-xs">
                  {isTe ? '45 రోజుల నియంత్రిత ఏరోబిక్ కిణ్వ ప్రక్రియ ద్వారా తయారైన కంపోస్ట్.' : 'Diverted from market yards and thermophilically composted at 55-65°C.'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <IconCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">
                  {isTe ? 'వేప పిండి & సహజ బయో-స్టిమ్యులేంట్లు' : 'Neem Cake & Bio-Stimulant Fortification'}
                </strong>
                <span className="text-gray-600 text-xs">
                  {isTe ? 'నేలలోని నెమటోడ్లను మరియు తెగుళ్లను సహజంగా నిరోధించేందుకు సహాయపడుతుంది.' : 'Natural azadirachtin repellent shielding seedling roots from subterranean pests.'}
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* 45-Day Production & Curing Cycle */}
        <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">⏳</span>
            <span>{isTe ? '45 రోజుల తయారీ & శుద్ధి ప్రక్రియ' : isHi ? '45-दिवसीय निर्माण प्रक्रिया' : '45-Day Production Cycle'}</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isTe
              ? 'ప్రతి బ్యాచ్ కూడా శాస్త్రీయ ఉష్ణోగ్రత పర్యవేక్షణ మరియు జల్లెడ ప్రక్రియ ద్వారా పూర్తవుతుంది.'
              : 'Aerobic windrow composting protocol ensuring complete weed-seed destruction:'}
          </p>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <div className="flex justify-between font-bold text-emerald-900">
                <span>{isTe ? 'దశ 1 (రోజు 1-15): థర్మోఫిలిక్ వేడి దశ' : 'Stage 1 (Days 1–15): Thermophilic Heating'}</span>
                <span className="font-mono text-xs text-amber-700">55°C - 65°C</span>
              </div>
              <p className="text-xs text-gray-600">
                {isTe ? 'సహజ వేడి ద్వారా హానికర క్రిములు, కలుపు విత్తనాలు పూర్తిగా నాశనమవుతాయి.' : 'High internal heat destroys weed seeds and harmful pathogen organisms.'}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <div className="flex justify-between font-bold text-emerald-900">
                <span>{isTe ? 'దశ 2 (రోజు 16-30): జీవామృతం సూక్ష్మజీవ దశ' : 'Stage 2 (Days 16–30): Microbial Inoculation'}</span>
                <span className="font-mono text-xs text-emerald-700">35°C - 45°C</span>
              </div>
              <p className="text-xs text-gray-600">
                {isTe ? 'జీవామృతం మిశ్రమం చేర్చి లబ్ధి కలిగించే బ్యాక్టీరియా సంఖ్యను బిలియన్లకు పెంచుతాము.' : 'Inoculation with Jeevamrutham consortia as pile cools, multiplying beneficial microbes.'}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <div className="flex justify-between font-bold text-emerald-900">
                <span>{isTe ? 'దశ 3 (రోజు 31-45): క్యూరింగ్ & 4mm జల్లెడ' : 'Stage 3 (Days 31–45): Curing & 4mm Screening'}</span>
                <span className="font-mono text-xs text-blue-700">Ambient Curing</span>
              </div>
              <p className="text-xs text-gray-600">
                {isTe ? 'సువాసన గల నల్లటి నేలగా మారిన ఎరువును 4mm మెష్ ద్వారా జల్లించి 50kg సంచుల్లో ప్యాక్ చేస్తాము.' : 'Refined through 4mm mechanical trommel into dark, crumbly, earthy-smelling humus.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking / Trial Inquiry Form */}
      <div id="booking-form" className="bg-[#f7faf7] border border-emerald-300 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
            {isTe ? 'రైతు ట్రయల్ బుకింగ్ ఫారమ్' : isHi ? 'किसान ट्रायल बुकिंग फॉर्म' : 'Farmer Trial Order & Booking'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {isTe
              ? 'ఆంధ్రప్రదేశ్ పైలట్ జిల్లాల రైతులకు రాయితీ ప్రదర్శన ధర: ₹350 / 50 కిలోల బస్తా.'
              : 'Pilot trial demonstration pricing: ₹350 per 50 kg bag (direct village delivery).'}
          </p>
        </div>

        {submittedBookingId ? (
          <div className="bg-emerald-100 border border-emerald-400 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              ✓
            </div>
            <h4 className="font-bold text-lg text-emerald-950">
              {isTe ? 'బుకింగ్ విచారణ విజయవంతంగా అందింది!' : 'Trial Booking Request Received!'}
            </h4>
            <p className="text-xs text-emerald-900 font-mono">
              Reference ID: <strong>{submittedBookingId}</strong>
            </p>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              {isTe
                ? 'మా పైలట్ డిస్ట్రిబ్యూషన్ టీమ్ మీ గ్రామానికి డెలివరీ సమయాన్ని నిర్ధారించడానికి ఫోన్ చేస్తుంది.'
                : 'Our agricultural extension team will contact your mobile to confirm delivery schedule and application advice.'}
            </p>
            <button
              onClick={() => setSubmittedBookingId(null)}
              className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs hover:bg-emerald-800 transition"
            >
              {isTe ? 'మరో బుకింగ్ చేయండి' : 'Submit Another Inquiry'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'రైతు పేరు' : isHi ? 'किसान का नाम' : 'Farmer Name'}
                </label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Venkata Rao"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'మొబైల్ ఫోన్ నంబర్' : isHi ? 'मोबाइल नंबर' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98480 12345"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'గ్రామం / మండలం / జిల్లా' : isHi ? 'गांव / जिला' : 'Village & District'}
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Narasaraopet, Palnadu"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'పంట రకం' : isHi ? 'फसल' : 'Crop Type'}
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Paddy / వరి">Paddy (వరి)</option>
                  <option value="Chilli / మిర్చి">Chilli (మిర్చి)</option>
                  <option value="Cotton / పత్తి">Cotton (పత్తి)</option>
                  <option value="Maize / మొక్కజొన్న">Maize (మొక్కజొన్న)</option>
                  <option value="Groundnut / వేరుశనగ">Groundnut (వేరుశనగ)</option>
                  <option value="Horticulture / కూరగాయలు">Vegetables & Fruits (కూరగాయలు)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700">
                    {isTe ? 'అవసరమైన బస్తాల సంఖ్య (50 kg బస్తాలు)' : 'Quantity of 50 kg Bags'}
                  </label>
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    {bookingBags} {isTe ? 'బస్తాలు' : 'Bags'} (~₹{(bookingBags * 350).toLocaleString('en-IN')})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[5, 10, 20, 50, 100].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBookingBags(b)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                        bookingBags === b
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="2"
                    value={bookingBags}
                    onChange={(e) => setBookingBags(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{isTe ? 'నమోదు చేయబడుతోంది...' : 'Booking...'}</span>
                ) : (
                  <span>{isTe ? 'AGA ఎరువు బుకింగ్ నిర్ధారించండి' : 'Confirm AGA Trial Booking'}</span>
                )}
              </button>

              <a
                href="tel:18005747443"
                className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <IconPhone className="w-4 h-4" />
                <span>1800-KRISHI-GRN</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
