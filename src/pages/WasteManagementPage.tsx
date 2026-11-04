import React, { useState } from 'react';
import { SupportedLanguage, WasteCollectionRequest } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { WasteToWealthPipeline } from '../components/WasteToWealthPipeline';
import {
  IconTruck,
  IconCheck,
  IconShield,
  IconPhone,
  IconSparkles,
  IconChevronRight,
  IconPlus,
} from '../components/Icons';

interface WasteManagementPageProps {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
  onRequestPickup: (req: Partial<WasteCollectionRequest>) => Promise<void>;
  onOpenQR?: (batch: any) => void;
}

export function WasteManagementPage({
  language,
  wasteRequests,
  onRequestPickup,
  onOpenQR,
}: WasteManagementPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'request' | 'active' | 'lifecycle'>('request');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [generatorType, setGeneratorType] = useState<WasteCollectionRequest['generatorType']>('Mandi / Market');
  const [wasteType, setWasteType] = useState('Vegetable & Fruit Mandi Residue');
  const [weightKg, setWeightKg] = useState(500);
  const [village, setVillage] = useState('Narasaraopet Market Yard');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const weightPresets = [100, 250, 500, 1000, 3000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !phone.trim()) {
      alert(isTe ? 'దయచేసి పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి' : isHi ? 'कृपया नाम और फोन नंबर दर्ज करें' : 'Please provide contact name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onRequestPickup({
        generatorType,
        wasteType,
        estimatedWeightKg: weightKg,
        village: village || 'Narasaraopet',
        contactName,
        phone,
        pickupDate,
        notes,
      });

      setSuccessMessage(
        isTe
          ? `వ్యర్థాల సేకరణ అభ్యర్థన విజయవంతంగా నమోదు చేయబడింది! మా సేకరణ వాహనం త్వరలో సంప్రదిస్తుంది.`
          : isHi
          ? `कचरा संग्रहण अनुरोध सफलतापूर्वक दर्ज कर लिया गया है!`
          : `Waste collection request successfully recorded! Reference ID generated.`
      );
      // Reset
      setContactName('');
      setPhone('');
      setNotes('');
      setActiveTab('active');
    } catch (err) {
      console.error('Error submitting waste request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconTruck className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'వ్యర్థాల సేకరణ & నిర్వహణ' : isHi ? 'जैविक कचरा प्रबंधन' : 'Organic Waste Management'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'వ్యర్థాల సేకరణ అభ్యర్థన'
              : isHi
              ? 'जैविक कचरा संग्रहण अनुरोध'
              : 'Request Waste Collection & Segregation'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'కూరగాయల మండీలు, హోటళ్లు, హాస్టళ్లు మరియు వ్యవసాయ క్షేత్రాల నుండి సేంద్రీయ వ్యర్థాలను సేకరించి నాణ్యమైన సేంద్రీయ ఎరువుగా మారుస్తాము.'
              : isHi
              ? 'सब्जी मंडियों, खानपान गृहों और खेतों से गीले कचरे का त्वरित उठाव और वैज्ञानिक कम्पोस्टिंग।'
              : 'Direct waste collection service for vegetable mandis, hostels, food canteens, and farm residues. Diverting organic waste from open dumps into verified AGA bio-fertilizer.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'request', label: isTe ? '+ కొత్త సేకరణ అభ్యర్థన' : isHi ? '+ नया अनुरोध दर्ज करें' : '+ New Collection Request' },
              { id: 'active', label: `${isTe ? 'యాక్టివ్ అభ్యర్థనలు' : isHi ? 'सक्रिय अनुरोध' : 'Active Requests'} (${wasteRequests.length})` },
              { id: 'lifecycle', label: isTe ? '16-దశల పరిశీలన ప్రక్రియ' : isHi ? '16-चरणीय सत्यापन चक्र' : '16-Stage Verified Workflow' },
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

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <p className="text-xs sm:text-sm font-bold text-emerald-950">{successMessage}</p>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: FORM */}
      {activeTab === 'request' && (
        <div className="bg-white border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {isTe ? 'సులభమైన సేకరణ ఫారమ్' : isHi ? 'कचरा संग्रहण प्रपत्र' : 'Simple Collection Request Form'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isTe
                ? 'రైతులు మరియు వ్యర్థాల ఉత్పత్తిదారులు కేవలం 1 నిమిషంలో నమోదు చేసుకోవచ్చు.'
                : isHi
                ? 'न्यूनतम टाइपिंग के साथ सीधा अनुरोध दर्ज करें।'
                : 'Minimal typing designed for fast submission on mobile devices.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Generator Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isTe ? '1. వ్యర్థాల ఉత్పత్తిదారు రకం' : isHi ? '1. कचरा स्रोत प्रकार' : '1. Generator Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Mandi / Market', label: isTe ? 'కూరగాయల మండీ / మార్కెట్' : isHi ? 'सब्जी मंडी / बाजार' : 'Mandi / Market', icon: '🥦' },
                  { id: 'Household', label: isTe ? 'ఇళ్ల సముదాయం' : isHi ? 'आवासीय कॉलोनी' : 'Household / Colony', icon: '🏡' },
                  { id: 'Hotel / Canteen', label: isTe ? 'హోటల్ / క్యాంటీన్ / హాస్టల్' : isHi ? 'होटल / कैंटीन' : 'Hotel / Canteen', icon: '🍽️' },
                  { id: 'Farm Residue', label: isTe ? 'పంట వ్యర్థాలు / గడ్డి' : isHi ? 'खेत अवशेष / पुआल' : 'Farm Residue', icon: '🌾' },
                ].map((gen) => (
                  <button
                    type="button"
                    key={gen.id}
                    onClick={() => setGeneratorType(gen.id as any)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                      generatorType === gen.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                        : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{gen.icon}</span>
                    <span className="text-xs">{gen.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Waste Type Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isTe ? '2. వ్యర్థాల రకం' : isHi ? '2. अपशिष्ट विवरण' : '2. Waste Classification'}
              </label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
              >
                <option value="Vegetable & Fruit Mandi Residue">
                  {isTe ? 'కూరగాయలు & పండ్ల వ్యర్థాలు (Mandi Waste)' : 'Vegetable & Fruit Mandi Residue'}
                </option>
                <option value="Cooked Food & Kitchen Wet Waste">
                  {isTe ? 'వండిన ఆహారం & కిచెన్ తడి వ్యర్థాలు' : 'Cooked Food & Kitchen Wet Waste'}
                </option>
                <option value="Paddy Straw & Crop Stubble">
                  {isTe ? 'వరి గడ్డి & పంట కొయ్యలు (Paddy Straw)' : 'Paddy Straw & Crop Stubble'}
                </option>
                <option value="Cotton Stalks & Chilli Residue">
                  {isTe ? 'పత్తి కట్టెలు & మిర్చి చెత్త (Cotton Stalks)' : 'Cotton Stalks & Chilli Residue'}
                </option>
                <option value="Banana Pseudostem & Sugarcane Trash">
                  {isTe ? 'అరటి బోదెలు & చెరకు పిప్పి' : 'Banana Pseudostem & Sugarcane Trash'}
                </option>
              </select>
            </div>

            {/* Weight Presets & Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {isTe ? '3. అంచనా బరువు (కిలోలు)' : isHi ? '3. अनुमानित वजन (किग्रा)' : '3. Estimated Quantity (kg)'}
                </label>
                <span className="font-mono text-emerald-800 font-extrabold text-sm sm:text-base">
                  {weightKg >= 1000 ? `${(weightKg / 1000).toFixed(1)} MT (${weightKg} kg)` : `${weightKg} kg`}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {weightPresets.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setWeightKg(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      weightKg === p
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {p >= 1000 ? `${p / 1000} MT` : `${p} kg`}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Location & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'గ్రామం / పట్టణం / మండలం' : isHi ? 'गांव / कस्बा' : 'Village / Market Location'}
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Narasaraopet Market Yard"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'సంప్రదించవలసిన వ్యక్తి పేరు' : isHi ? 'संपर्क व्यक्ति का नाम' : 'Contact Person Name'}
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'మొబైల్ ఫోన్ నంబర్' : isHi ? 'मोबाइल फोन नंबर' : 'Mobile Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98480 12345"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'కోరుకున్న సేకరణ తేదీ' : isHi ? 'उठाव की तिथि' : 'Preferred Pickup Date'}
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isTe ? 'అదనపు వివరాలు (ఐచ్ఛికం)' : isHi ? 'विशेष निर्देश (वैकल्पिक)' : 'Notes or Landmarks (Optional)'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Near gate 2 of market yard, daily segregated crates"
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-bold rounded-xl text-sm shadow transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{isTe ? 'నమోదు చేయబడుతోంది...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <IconPlus className="w-4 h-4" />
                    <span>{isTe ? 'సేకరణ అభ్యర్థనను సమర్పించండి' : isHi ? 'संग्रहण अनुरोध भेजें' : 'Submit Waste Collection Request'}</span>
                  </>
                )}
              </button>

              <a
                href="tel:18005747443"
                className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <IconPhone className="w-4 h-4" />
                <span>{isTe ? 'ఫోన్ ద్వారా బుక్ చేయండి' : isHi ? 'फोन द्वारा बुक करें' : 'Call 1800-KRISHI-GRN'}</span>
              </a>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: ACTIVE REQUESTS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900">
              {isTe ? 'సేకరణ అభ్యర్థనల స్థితి' : isHi ? 'संग्रहण अनुरोध सूची' : 'Real-Time Collection Requests'}
            </h3>
            <button
              onClick={() => setActiveTab('request')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>+ {isTe ? 'కొత్త అభ్యర్థన' : isHi ? 'नया अनुरोध' : 'New Request'}</span>
            </button>
          </div>

          {wasteRequests.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-xs space-y-2">
              <p>{isTe ? 'ప్రస్తుతం సేకరణ అభ్యర్థనలు లేవు.' : 'No active waste collection requests in this session.'}</p>
              <button
                onClick={() => setActiveTab('request')}
                className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs"
              >
                {isTe ? 'మొదటి అభ్యర్థన నమోదు చేయండి' : 'Create First Request'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wasteRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {req.id}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-900">
                      {req.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{req.wasteType}</h4>
                    <p className="text-xs text-gray-500">
                      {req.generatorType} • {req.village}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 block">{isTe ? 'పరిమాణం:' : 'Weight:'}</span>
                      <span className="font-bold text-gray-800">{req.estimatedWeightKg} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{isTe ? 'సేకరణ తేదీ:' : 'Pickup Date:'}</span>
                      <span className="font-bold text-gray-800">{req.pickupDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{isTe ? 'సంప్రదింపు:' : 'Contact:'}</span>
                      <span className="font-bold text-gray-800">{req.contactName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{isTe ? 'ఫోన్:' : 'Phone:'}</span>
                      <span className="font-bold text-gray-800">{req.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 16-STAGE VERIFIED LIFECYCLE */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900">
            <p className="font-bold">
              {isTe
                ? '16-దశల శాస్త్రీయ పారదర్శకత చక్రం (Evidence & Integrity)'
                : isHi
                ? '16-चरणीय वैज्ञानिक पारदर्शी अपशिष्ट-से-कंचन प्रवाह'
                : '16-Stage Verified Waste-to-Wealth Pipeline & Traceability'}
            </p>
            <p className="mt-1 text-emerald-800/90">
              {isTe
                ? 'వ్యర్థం వచ్చిన సమయం నుండి వేబ్రిడ్జ్ బరువు, కిణ్వ ఉష్ణోగ్రత మరియు FCO ప్రయోగశాల పరీక్ష వరకు సమగ్ర రికార్డులు.'
                : 'Complete digital paper trail: weighbridge slips, GPS transport, daily windrow turning, and FCO lab certificates.'}
            </p>
          </div>
          <WasteToWealthPipeline language={language} onOpenQR={onOpenQR} />
        </div>
      )}
    </div>
  );
}
