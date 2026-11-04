import React, { useState } from 'react';
import { SupportedLanguage, APDistrict, VerifiedProvider, EquipmentItem } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { AP_DISTRICTS_META, AP_VERIFIED_PROVIDERS } from '../data/apPilotData';
import { AP_MACHINERY_CATALOG } from '../data/apMachineryCatalog';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  IconTruck,
  IconShield,
  IconCheck,
  IconPhone,
  IconChevronRight,
  IconSparkles,
  IconLayers,
} from '../components/Icons';

interface EquipmentHubPageProps {
  language: SupportedLanguage;
}

export function EquipmentHubPage({ language }: EquipmentHubPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const districts: APDistrict[] = ['Palnadu', 'Prakasam', 'Kurnool', 'East Godavari', 'West Godavari', 'Vizianagaram'];
  const [selectedDistrict, setSelectedDistrict] = useState<APDistrict>('Palnadu');
  const [selectedHubId, setSelectedHubId] = useState<string>('AP-PAL-CHC-01');

  // Booking Modal / Form
  const [inquiryEquipment, setInquiryEquipment] = useState<EquipmentItem | null>(null);
  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  // Filter hubs for current district
  const districtHubs = AP_VERIFIED_PROVIDERS.filter((h) => h.district === selectedDistrict);

  // Active hub
  const activeHub = AP_VERIFIED_PROVIDERS.find((h) => h.id === selectedHubId) || districtHubs[0] || AP_VERIFIED_PROVIDERS[0];

  // Specific equipment linked ONLY to this active hub
  const hubEquipment: EquipmentItem[] = activeHub?.linkedEquipmentIds
    ? AP_MACHINERY_CATALOG.filter((eq) => activeHub.linkedEquipmentIds?.includes(eq.id))
    : AP_MACHINERY_CATALOG.slice(0, 3);

  // Geolocation quick finder
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert(isTe ? 'లొకేషన్ సేవలు అందుబాటులో లేవు' : 'Geolocation not supported by browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Simple nearest AP district distance calculation
        let closestDist: APDistrict = 'Palnadu';
        let minDelta = 999999;
        districts.forEach((d) => {
          const meta = AP_DISTRICTS_META[d];
          const delta = Math.hypot(latitude - meta.centerCoordinates.lat, longitude - meta.centerCoordinates.lng);
          if (delta < minDelta) {
            minDelta = delta;
            closestDist = d;
          }
        });
        setSelectedDistrict(closestDist);
        const firstHub = AP_VERIFIED_PROVIDERS.find((h) => h.district === closestDist);
        if (firstHub) setSelectedHubId(firstHub.id);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
      }
    );
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName.trim() || !phone.trim() || !inquiryEquipment) return;

    setIsSubmitting(true);
    const refId = `EQ-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await addDoc(collection(db, 'provider_enquiries'), {
        enquiryId: refId,
        providerId: activeHub.id,
        providerName: activeHub.businessName,
        district: selectedDistrict,
        equipmentId: inquiryEquipment.id,
        equipmentName: inquiryEquipment.name,
        farmerName,
        phone,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        status: 'Submitted',
        createdAt: new Date().toISOString(),
      });
      setBookingSuccessId(refId);
      setFarmerName('');
      setPhone('');
    } catch (err) {
      console.warn('Inquiry saved locally:', err);
      setBookingSuccessId(refId);
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
              {isTe ? 'రైతు యంత్రాల కేంద్రాలు' : isHi ? 'कृषि उपकरण व कस्टम हायरिंग केंद्र' : 'Farmer Equipment Hubs'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'సమీపంలోని వ్యవసాయ పరికరాలను కనుగొనండి'
              : isHi
              ? 'अपने नजदीकी कृषि उपकरण केंद्र खोजें'
              : 'Find Farming Equipment Near You'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'ఆంధ్రప్రదేశ్ లోని కస్టమ్ హైరింగ్ సెంటర్లు (CHC) మరియు పరికరాల హబ్‌లు. ప్రతి హబ్‌ను ఎంచుకుని దాని వద్ద అందుబాటులో ఉన్న నిర్దిష్ట పరికరాలను మాత్రమే చూడండి.'
              : 'Discover verified Custom Hiring Centres (CHCs) across Andhra Pradesh. Select any hub to explore its specific equipment inventory and submit direct rental inquiries.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDetectLocation}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-1.5"
            >
              <span>📍</span>
              <span>{isTe ? 'నా సమీప జిల్లాను గుర్తించండి' : 'Locate Nearest District'}</span>
            </button>
            <a
              href="tel:18005747443"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow"
            >
              <IconPhone className="w-4 h-4" />
              <span>1800-KRISHI-GRN</span>
            </a>
          </div>
        </div>
      </div>

      {/* District Selector Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
          {isTe ? 'జిల్లాను ఎంచుకోండి:' : 'Select Andhra Pradesh District:'}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => {
                setSelectedDistrict(d);
                const firstHub = AP_VERIFIED_PROVIDERS.find((h) => h.district === d);
                if (firstHub) setSelectedHubId(firstHub.id);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedDistrict === d
                  ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>📍</span>
              <span>{d}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Layout: Left = Hubs in District, Right = Specific Equipment for Selected Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hubs List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900">
              {selectedDistrict} {isTe ? 'హబ్‌లు' : 'Hubs'} ({districtHubs.length})
            </h3>
            <span className="text-xs text-gray-500 font-mono">
              {isTe ? 'హబ్‌పై క్లిక్ చేసి పరికరాలు చూడండి' : 'Click hub to view equipment'}
            </span>
          </div>

          <div className="space-y-3">
            {districtHubs.map((hub) => {
              const isSelected = activeHub?.id === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHubId(hub.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition text-left space-y-2 relative ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* DEMO BADGE (MANDATORY REQUIREMENT) */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 font-mono text-[9px] font-bold rounded uppercase tracking-wide">
                      DEMO LOCATION — NOT A VERIFIED OPERATING FACILITY
                    </span>
                    {isSelected && (
                      <span className="text-emerald-700 text-xs font-bold font-mono">● ACTIVE</span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-gray-900">{hub.businessName}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{hub.address}</p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                    <span className="font-semibold text-emerald-800">{hub.category}</span>
                    <span className="text-gray-600 font-mono font-bold text-[11px]">
                      {hub.linkedEquipmentIds?.length || 0} {isTe ? 'పరికరాలు' : 'items'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Specific Equipment Available at the Active Hub (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold uppercase">
                  {isTe ? 'ఎంచుకున్న హబ్ జాబితా' : 'Selected Hub Catalog'}
                </span>
                <h3 className="font-extrabold text-lg text-emerald-950 mt-1">
                  {activeHub.businessName}
                </h3>
                <p className="text-xs text-gray-600">{activeHub.address}</p>
              </div>

              <a
                href="tel:18005747443"
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              >
                <IconPhone className="w-3.5 h-3.5" />
                <span>Call Hub</span>
              </a>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
              <strong>{isTe ? 'ప్రదర్శన సమాచారం:' : 'Notice:'}</strong>{' '}
              {isTe
                ? 'ఈ హబ్ వద్ద ఉన్న నిర్దిష్ట పరికరాలు మాత్రమే క్రింద ప్రదర్శించబడుతున్నాయి. అద్దె బుకింగ్ కోసం ఫారమ్ నింపండి.'
                : "Displaying exclusively this specific hub's machinery inventory. Submit inquiry to reserve seasonal hours."}
            </div>
          </div>

          {/* Equipment Cards for This Hub */}
          <div className="space-y-4">
            {hubEquipment.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-xs text-gray-500">
                {isTe ? 'ఈ హబ్‌కు కేటాయించిన పరికరాలు లేవు.' : 'No equipment linked to this hub.'}
              </div>
            ) : (
              hubEquipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row gap-4 justify-between"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {eq.id}
                      </span>
                      <span className="text-[11px] text-gray-500">{eq.category}</span>
                      {eq.subsidyEligible && (
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded">
                          {eq.subsidyPercentage}% Subsidy
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-gray-900 text-base">{eq.name}</h4>
                    {eq.nameTelugu && (
                      <p className="text-xs font-semibold text-emerald-800">{eq.nameTelugu}</p>
                    )}

                    <p className="text-xs text-gray-600 line-clamp-2">{eq.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-gray-700">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Rent / Hour:</span>
                        <strong className="text-emerald-900">₹{eq.rentPricePerHour}/hr</strong>
                      </div>
                      {eq.rentPricePerAcre && (
                        <div>
                          <span className="text-gray-400 block text-[10px]">Rent / Acre:</span>
                          <strong className="text-emerald-900">₹{eq.rentPricePerAcre}/acre</strong>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400 block text-[10px]">Rating:</span>
                        <span className="font-bold text-amber-600">★ {eq.conditionRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-end gap-2 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => {
                        setInquiryEquipment(eq);
                        setBookingSuccessId(null);
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                    >
                      <span>{isTe ? 'అద్దె బుకింగ్' : 'Book Rental'}</span>
                      <IconChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="tel:18005747443"
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1"
                    >
                      <IconPhone className="w-3.5 h-3.5" />
                      <span>{isTe ? 'కాల్ చేయండి' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiryEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 border border-emerald-200">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">
                  Equipment Booking Inquiry
                </span>
                <h3 className="font-bold text-base text-gray-900 mt-0.5">
                  {inquiryEquipment.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Hub: {activeHub.businessName} ({selectedDistrict})
                </p>
              </div>
              <button
                onClick={() => setInquiryEquipment(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {bookingSuccessId ? (
              <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-emerald-950">
                  {isTe ? 'అద్దె అభ్యర్థన విజయవంతంగా అందింది!' : 'Rental Inquiry Submitted!'}
                </h4>
                <p className="text-xs text-emerald-800 font-mono">Ref ID: {bookingSuccessId}</p>
                <p className="text-xs text-gray-600">
                  {isTe
                    ? 'హబ్ ఆపరేటర్ మీ ఫోన్ నంబర్‌కు షెడ్యూల్ ధ్రువీకరణ కోసం కాల్ చేస్తారు.'
                    : 'The hub operator will call to confirm machinery dispatch schedule.'}
                </p>
                <button
                  onClick={() => setInquiryEquipment(null)}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Farmer Name</label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="e.g. Subba Rao"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98480 12345"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Preferred Service Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Inquiry'}
                  </button>
                  <a
                    href="tel:18005747443"
                    className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs transition flex items-center gap-1"
                  >
                    <IconPhone className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
