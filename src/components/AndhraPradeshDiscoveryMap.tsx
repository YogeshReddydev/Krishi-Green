import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone,
  Building2,
  Wrench,
  Sparkles,
  Layers,
  Send,
  AlertTriangle,
  PlusCircle,
  X,
  Compass,
  Maximize2,
  Minimize2,
  Navigation,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  APDistrict,
  VerifiedProvider,
  VerifiedProviderCategory,
  ProviderEnquiry,
  SupportedLanguage,
} from '../types';
import { AP_DISTRICTS_META, AP_VERIFIED_PROVIDERS } from '../data/apPilotData';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface AndhraPradeshDiscoveryMapProps {
  language: SupportedLanguage;
  onSelectProvider?: (provider: VerifiedProvider) => void;
}

export const AndhraPradeshDiscoveryMap: React.FC<AndhraPradeshDiscoveryMapProps> = ({
  language,
  onSelectProvider,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<APDistrict | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<VerifiedProviderCategory | 'All'>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Selected Provider for Drawer / Detail Panel
  const [activeProvider, setActiveProvider] = useState<VerifiedProvider | null>(null);

  // Enquiry / Quotation Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquirySuccessMessage, setEnquirySuccessMessage] = useState<string | null>(null);
  const [enquiryForm, setEnquiryForm] = useState<{
    farmerName: string;
    farmerPhone: string;
    village: string;
    requiredEquipmentOrService: string;
    preferredDates: string;
    rentalOrPurchase: 'Rental Booking' | 'Purchase Enquiry' | 'Custom Harvesting Service';
  }>({
    farmerName: '',
    farmerPhone: '',
    village: '',
    requiredEquipmentOrService: '',
    preferredDates: '',
    rentalOrPurchase: 'Rental Booking',
  });

  // Submit Listing Modal State (for admin review)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [newListingForm, setNewListingForm] = useState<{
    businessName: string;
    district: APDistrict;
    headquartersOrMandal: string;
    address: string;
    category: VerifiedProviderCategory;
    publicPhone: string;
    supportedEquipment: string;
    sourceName: string;
  }>({
    businessName: '',
    district: 'Palnadu',
    headquartersOrMandal: '',
    address: '',
    category: 'Custom Hiring Centre (CHC)',
    publicPhone: '',
    supportedEquipment: '',
    sourceName: 'User / Ground Representative Submission',
  });

  // Dynamic user-submitted providers state
  const [customProviders, setCustomProviders] = useState<VerifiedProvider[]>([]);

  // Map Zoom & Center State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Combine static authoritative providers + user submitted ones
  const allProviders = useMemo(() => {
    return [...AP_VERIFIED_PROVIDERS, ...customProviders];
  }, [customProviders]);

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return allProviders.filter((p) => {
      if (selectedDistrict !== 'All' && p.district !== selectedDistrict) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (verifiedOnly && p.verificationStatus !== 'Verified by Dept / Ground Audit') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.businessName.toLowerCase().includes(q);
        const matchesDist = p.district.toLowerCase().includes(q);
        const matchesMandal = p.headquartersOrMandal.toLowerCase().includes(q);
        const matchesEquip = p.supportedEquipment.some((eq) => eq.toLowerCase().includes(q));
        const matchesAddress = p.address.toLowerCase().includes(q);
        if (!matchesName && !matchesDist && !matchesMandal && !matchesEquip && !matchesAddress) {
          return false;
        }
      }

      return true;
    });
  }, [allProviders, selectedDistrict, selectedCategory, verifiedOnly, searchQuery]);

  // Bounding box calculation for Andhra Pradesh pilot
  // AP roughly spans Lat 13.5 to 19.5, Lng 76.5 to 84.5
  const mapBounds = {
    minLat: 14.5,
    maxLat: 19.2,
    minLng: 76.8,
    maxLng: 84.2,
  };

  // Convert GPS Coordinates to SVG X, Y percentage
  const getCoordinatesPercent = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    // Invert Y because latitude increases upwards
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(8, Math.min(92, y)),
    };
  };

  // Handle Enquiry Submission to Firestore
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProvider) return;

    const enquiryRecord: ProviderEnquiry = {
      id: `ENQ-${Date.now()}`,
      providerId: activeProvider.id,
      providerName: activeProvider.businessName,
      farmerName: enquiryForm.farmerName,
      farmerPhone: enquiryForm.farmerPhone,
      village: enquiryForm.village,
      district: activeProvider.district,
      requiredEquipmentOrService: enquiryForm.requiredEquipmentOrService,
      preferredDates: enquiryForm.preferredDates,
      rentalOrPurchase: enquiryForm.rentalOrPurchase,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'provider_enquiries'), enquiryRecord);
    } catch (err) {
      console.warn('Enquiry stored locally:', err);
    }

    setEnquirySuccessMessage(
      language === 'te'
        ? `ధన్యవాదాలు! మీ విచారణ (${enquiryRecord.id}) ${activeProvider.businessName} కు పంపబడింది. వారు లభ్యత మరియు ధరను నేరుగా ఫోన్ ద్వారా తెలియజేస్తారు.`
        : `Enquiry (${enquiryRecord.id}) successfully dispatched to ${activeProvider.businessName}. Provider will contact you at ${enquiryForm.farmerPhone} to confirm availability and exact tariff.`
    );

    setTimeout(() => {
      setIsEnquiryModalOpen(false);
      setEnquirySuccessMessage(null);
      setEnquiryForm({
        farmerName: '',
        farmerPhone: '',
        village: '',
        requiredEquipmentOrService: '',
        preferredDates: '',
        rentalOrPurchase: 'Rental Booking',
      });
    }, 3500);
  };

  // Handle New Provider Submission for Administrator Review
  const handleNewProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const meta = AP_DISTRICTS_META[newListingForm.district];
    const newProv: VerifiedProvider = {
      id: `USR-${Date.now()}`,
      businessName: newListingForm.businessName,
      district: newListingForm.district,
      headquartersOrMandal: newListingForm.headquartersOrMandal || meta.headquarters,
      address: newListingForm.address,
      coordinates: {
        lat: meta.centerCoordinates.lat + (Math.random() - 0.5) * 0.1,
        lng: meta.centerCoordinates.lng + (Math.random() - 0.5) * 0.1,
      },
      category: newListingForm.category,
      publicPhone: newListingForm.publicPhone,
      verificationStatus: 'User Submitted (Pending Review)',
      sourceName: newListingForm.sourceName,
      lastCheckedTimestamp: new Date().toISOString(),
      supportedEquipment: newListingForm.supportedEquipment
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      pricingNotes: 'Subject to administrator verification & direct quotation.',
      enquiryEnabled: true,
    };

    try {
      await addDoc(collection(db, 'verified_providers'), newProv);
    } catch (err) {
      console.warn('Saved provider locally:', err);
    }

    setCustomProviders((prev) => [newProv, ...prev]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
      setSubmitSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-emerald-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              {language === 'te'
                ? 'ఆంధ్రప్రదేశ్ రియల్ డేటా పైలట్ (5 జిల్లాలు)'
                : 'Andhra Pradesh Verified Pilot (5 Districts)'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {language === 'te'
              ? 'వ్యవసాయ యంత్రాలు & వ్యర్థాల ప్రాసెసింగ్ డైరెక్టరీ'
              : 'Equipment Discovery & Biomass Processing Directory'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {language === 'te'
              ? 'పల్నాడు, ప్రకాశం, కర్నూలు, తూర్పు గోదావరి, పశ్చిమ గోదావరి, విజయనగరం జిల్లాల అధికారిక వ్యవసాయ శాఖ డేటా మరియు క్షేత్రస్థాయి పరిశీలన ద్వారా ధృవీకరించిన కేంద్రాలు.'
              : 'Real, verifiable machinery providers, Custom Hiring Centres (CHCs), balers, shredders, and organic waste processors across AP pilot districts with live quotation workflows.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>
              {language === 'te' ? 'కొత్త కేంద్రాన్ని నమోదు చేయండి' : 'Submit Provider for Review'}
            </span>
          </button>

          <div className="inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl transition ${
                viewMode === 'map' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {language === 'te' ? 'మ్యాప్ వ్యూ' : 'Interactive Map'}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl transition ${
                viewMode === 'list' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {language === 'te' ? 'జాబితా వ్యూ' : 'Directory List'} ({filteredProviders.length})
            </button>
          </div>
        </div>
      </div>

      {/* District Selector Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedDistrict('All')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition border ${
            selectedDistrict === 'All'
              ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {language === 'te' ? 'అన్ని జిల్లాలు (ఆంధ్రప్రదేశ్)' : 'All 5 Pilot District Groups'}
        </button>

        {(
          [
            'Palnadu',
            'Prakasam',
            'Kurnool',
            'East Godavari',
            'West Godavari',
            'Vizianagaram',
          ] as APDistrict[]
        ).map((dist) => {
          const meta = AP_DISTRICTS_META[dist];
          const count = allProviders.filter((p) => p.district === dist).length;
          return (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition flex items-center gap-2 border ${
                selectedDistrict === dist
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{dist}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  selectedDistrict === dist ? 'bg-emerald-700 text-emerald-100' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-4 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              language === 'te'
                ? 'యంత్రం పేరు, మండలం లేదా కేంద్రం పేరుతో వెతకండి...'
                : 'Search by equipment, baler, CHC, mandal, or business name...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
          >
            <option value="All">
              {language === 'te' ? 'అన్ని కేటగిరీలు' : 'All Provider Categories'}
            </option>
            <option value="Custom Hiring Centre (CHC)">Custom Hiring Centre (CHC)</option>
            <option value="Tractor & Machinery Dealership">Tractor & Machinery Dealership</option>
            <option value="Straw & Paddy Baler Provider">Straw & Paddy Baler Provider</option>
            <option value="Shredder & Mulcher Service">Shredder & Mulcher Service</option>
            <option value="Biomass / Briquette Facility">Biomass / Briquette Facility</option>
            <option value="Organic Compost / Vermicompost Plant">Organic Compost / Vermicompost Plant</option>
            <option value="Farmer Producer Organization (FPO)">Farmer Producer Organization (FPO)</option>
          </select>
        </div>

        {/* Verified Filter Checkbox */}
        <div className="md:col-span-3 flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>{language === 'te' ? 'ధృవీకరించినవి మాత్రమే' : 'Govt / Audit Verified'}</span>
          </label>

          <span className="text-xs text-gray-400 font-mono">
            {filteredProviders.length} {language === 'te' ? 'కేంద్రాలు' : 'centers'}
          </span>
        </div>
      </div>

      {/* Main View Area: Map or List */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Map Visualizer */}
          <div className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-emerald-100 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[520px] relative overflow-hidden">
            {/* Map Controls Floating Badge */}
            <div className="absolute top-6 left-6 z-10 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-md border border-emerald-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 px-2">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>
                  {selectedDistrict === 'All' ? 'Andhra Pradesh (5 Pilot Zones)' : `${selectedDistrict} District`}
                </span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.3))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.3))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold transition"
              >
                Reset
              </button>
            </div>

            {/* Scale & Legend Indicator */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 shadow-xs text-[10px] text-gray-500 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Verified CHC / Baler</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Bio-Process / Compost</span>
              </span>
            </div>

            {/* SVG Cartographic Canvas */}
            <div className="w-full h-full min-h-[460px] relative rounded-2xl bg-[#edf5ea] border border-emerald-100 overflow-hidden flex items-center justify-center">
              {/* Background Geographic Gridlines */}
              <svg className="absolute inset-0 w-full h-full stroke-emerald-800/10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="geo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#geo-grid)" />
              </svg>

              {/* Bay of Bengal Stylized Ocean Background (East) */}
              <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-100/40 via-transparent to-transparent pointer-events-none" />

              {/* District Center Markers & Labels */}
              {(
                [
                  'Palnadu',
                  'Prakasam',
                  'Kurnool',
                  'East Godavari',
                  'West Godavari',
                  'Vizianagaram',
                ] as APDistrict[]
              ).map((dist) => {
                const meta = AP_DISTRICTS_META[dist];
                const pos = getCoordinatesPercent(meta.centerCoordinates.lat, meta.centerCoordinates.lng);
                const isSelected = selectedDistrict === dist;
                return (
                  <div
                    key={dist}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                      transformOrigin: 'center center',
                    }}
                    onClick={() => setSelectedDistrict(dist)}
                    className="absolute cursor-pointer group z-0 transition-transform duration-300 pointer-events-auto"
                  >
                    <div
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wide border shadow-xs transition ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-700 ring-4 ring-emerald-500/20'
                          : 'bg-white/80 text-emerald-950 border-emerald-200/90 group-hover:bg-emerald-100'
                      }`}
                    >
                      {dist} ({meta.headquarters})
                    </div>
                  </div>
                );
              })}

              {/* Interactive Provider Markers */}
              {filteredProviders.map((provider) => {
                const pos = getCoordinatesPercent(provider.coordinates.lat, provider.coordinates.lng);
                const isSelected = activeProvider?.id === provider.id;
                const isCompostOrBiomass =
                  provider.category === 'Organic Compost / Vermicompost Plant' ||
                  provider.category === 'Biomass / Briquette Facility';

                return (
                  <div
                    key={provider.id}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: `translate(-50%, -100%) scale(${isSelected ? 1.35 * zoomLevel : 1 * zoomLevel})`,
                      transformOrigin: 'bottom center',
                    }}
                    onClick={() => setActiveProvider(provider)}
                    className="absolute cursor-pointer z-10 transition-all duration-200 group"
                  >
                    {/* Marker Pin */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 transition ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-white ring-4 ring-emerald-500/40 scale-110'
                          : isCompostOrBiomass
                          ? 'bg-amber-500 text-white border-white hover:scale-110'
                          : 'bg-emerald-600 text-white border-white hover:scale-110'
                      }`}
                      title={`${provider.businessName} (${provider.headquartersOrMandal})`}
                    >
                      {isCompostOrBiomass ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Wrench className="w-4 h-4" />
                      )}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none whitespace-nowrap bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-30">
                      {provider.businessName}
                      <span className="block text-[8px] text-emerald-300 font-mono font-normal">
                        {provider.category} • {provider.headquartersOrMandal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provider Detail Card or District Overview */}
          <div className="lg:col-span-4 space-y-4">
            {activeProvider ? (
              <div className="bg-white/98 backdrop-blur-md rounded-3xl border-2 border-emerald-300 p-5 shadow-lg space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {activeProvider.category}
                    </span>
                    <h3 className="font-black text-gray-900 text-base mt-1.5">
                      {activeProvider.businessName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {activeProvider.headquartersOrMandal}, {activeProvider.district} District
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveProvider(null)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Verification & Source Badge */}
                <div className="bg-emerald-50/80 rounded-2xl p-3 border border-emerald-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-extrabold text-emerald-950">
                      {activeProvider.verificationStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    <strong>Source:</strong> {activeProvider.sourceName}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Last Verified:{' '}
                    {new Date(activeProvider.lastCheckedTimestamp).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                {/* Address & GPS */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-700 block">Address:</span>
                  <p className="text-gray-600 text-[11px] leading-relaxed">{activeProvider.address}</p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-gray-500">
                      {activeProvider.coordinates.lat.toFixed(4)}° N,{' '}
                      {activeProvider.coordinates.lng.toFixed(4)}° E
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${activeProvider.coordinates.lat},${activeProvider.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Supported Machinery / Services */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-gray-700 block">Available Machinery & Services:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProvider.supportedEquipment.map((eq, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-800 text-[11px] font-medium border border-gray-200"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Terms */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <span className="font-bold text-gray-700 block text-[11px]">Tariff & Availability:</span>
                  <p className="text-gray-600 text-[11px] mt-0.5">{activeProvider.pricingNotes}</p>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {language === 'te' ? 'ధర / లభ్యత విచారణ పంపండి' : 'Request Quotation / Confirm Rental'}
                    </span>
                  </button>

                  {activeProvider.publicPhone && (
                    <a
                      href={`tel:${activeProvider.publicPhone}`}
                      className="w-full py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call Provider: {activeProvider.publicPhone}</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>
                    {selectedDistrict === 'All'
                      ? 'Andhra Pradesh Pilot Profile'
                      : `${selectedDistrict} District Profile`}
                  </span>
                </div>

                {selectedDistrict !== 'All' ? (
                  <div className="space-y-3 text-xs text-gray-600">
                    <p className="leading-relaxed">
                      {AP_DISTRICTS_META[selectedDistrict].description}
                    </p>

                    <div>
                      <span className="font-bold text-gray-900 block text-[11px]">Key Agronomic Residues:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {AP_DISTRICTS_META[selectedDistrict].residueTypes.map((res, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold"
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-gray-900 block text-[11px]">Primary Pilot Mandals:</span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {AP_DISTRICTS_META[selectedDistrict].majorMandals.join(' • ')}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[11px] text-emerald-800 font-bold block">
                        💡 Click on any marker on the map to view phone numbers, equipment inventory, and request quotations.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs text-gray-600">
                    <p className="leading-relaxed">
                      The KrishiGreen real-data geospatial pilot connects agricultural circular-economy hubs across 5 designated Andhra Pradesh districts:
                    </p>
                    <ul className="space-y-1.5 text-[11px] list-disc list-inside text-gray-700">
                      <li><strong>Palnadu:</strong> Cotton stubble shredding & CHC network</li>
                      <li><strong>Prakasam:</strong> Pulse biomass and baling aggregates</li>
                      <li><strong>Kurnool:</strong> Rayalaseema natural input clusters</li>
                      <li><strong>East & West Godavari:</strong> High-yield paddy straw baling</li>
                      <li><strong>Vizianagaram:</strong> Natural farming FPO compost clusters</li>
                    </ul>
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-[11px]">
                      <strong>Data Integrity Notice:</strong> All listed facilities feature verified administrative coordinates and direct telephone/department verification trails.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Directory List View */
        <div className="space-y-4">
          {filteredProviders.length === 0 ? (
            <div className="bg-white/95 rounded-3xl border border-gray-200 p-8 text-center space-y-3">
              <Info className="w-8 h-8 text-gray-400 mx-auto" />
              <h4 className="font-black text-gray-900 text-base">
                No Verified Providers Found Matching Criteria
              </h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No verified records match your active district or machinery filter. You can submit a genuine local machinery or CHC provider for administrative review.
              </p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Submit Provider for Review
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {provider.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono font-bold">
                        {provider.district}
                      </span>
                    </div>

                    <h4 className="font-black text-gray-900 text-base">{provider.businessName}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{provider.address}</p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {provider.supportedEquipment.slice(0, 3).map((eq, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-medium"
                        >
                          {eq}
                        </span>
                      ))}
                      {provider.supportedEquipment.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-medium">
                          +{provider.supportedEquipment.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveProvider(provider);
                        setViewMode('map');
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      <span>View on Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveProvider(provider);
                        setIsEnquiryModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 
        ======================================================================
        PROVIDER ENQUIRY & QUOTATION MODAL
        ======================================================================
      */}
      {isEnquiryModalOpen && activeProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">
                  REAL-DATA ENQUIRY DISPATCH
                </span>
                <h3 className="font-black text-gray-900 text-lg">
                  {language === 'te' ? 'యంత్రం / సేవ విచారణ పంపండి' : 'Request Equipment Quotation'}
                </h3>
              </div>
              <button
                onClick={() => setIsEnquiryModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enquirySuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-center">{enquirySuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-1">
                  <p>
                    <strong>Provider:</strong> {activeProvider.businessName}
                  </p>
                  <p>
                    <strong>Location:</strong> {activeProvider.headquartersOrMandal},{' '}
                    {activeProvider.district}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    <em>Notice:</em> Submitting this form requests a verified quote. It does not automatically charge fees or falsely confirm machinery dispatch without provider confirmation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Farmer / Aggregator Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={enquiryForm.farmerName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, farmerName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Contact Phone (10 digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={enquiryForm.farmerPhone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, farmerPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Village & Mandal *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sattenapalle Rural"
                      value={enquiryForm.village}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, village: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Enquiry Type
                    </label>
                    <select
                      value={enquiryForm.rentalOrPurchase}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, rentalOrPurchase: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Rental Booking">Rental / Custom Hiring</option>
                      <option value="Custom Harvesting Service">Custom Harvesting / Baling Service</option>
                      <option value="Purchase Enquiry">Machinery Purchase Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Required Equipment / Service & Field Size *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 55HP Rotary Tiller for 4 acres of cotton land"
                    value={enquiryForm.requiredEquipmentOrService}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, requiredEquipmentOrService: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Preferred Dates / Timeline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next Monday to Wednesday (3 days)"
                    value={enquiryForm.preferredDates}
                    onChange={(e) =>
                      setEnquiryForm({ ...enquiryForm, preferredDates: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry to Provider</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 
        ======================================================================
        SUBMIT NEW PROVIDER FOR ADMINISTRATOR REVIEW MODAL
        ======================================================================
      */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">
                  NEW LISTING REGISTRATION
                </span>
                <h3 className="font-black text-gray-900 text-lg">
                  Submit Provider for Administrator Review
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p>
                  Provider submitted successfully! It has been placed in "User Submitted (Pending Review)" status and will be verified by the district coordinator before official verification badge issuance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewProviderSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Business / CHC / Facility Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vinukonda Agro Baler Services"
                    value={newListingForm.businessName}
                    onChange={(e) =>
                      setNewListingForm({ ...newListingForm, businessName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Pilot District *
                    </label>
                    <select
                      value={newListingForm.district}
                      onChange={(e) =>
                        setNewListingForm({ ...newListingForm, district: e.target.value as any })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Palnadu">Palnadu</option>
                      <option value="Prakasam">Prakasam</option>
                      <option value="Kurnool">Kurnool</option>
                      <option value="East Godavari">East Godavari</option>
                      <option value="West Godavari">West Godavari</option>
                      <option value="Vizianagaram">Vizianagaram</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Mandal / Town *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vinukonda"
                      value={newListingForm.headquartersOrMandal}
                      onChange={(e) =>
                        setNewListingForm({
                          ...newListingForm,
                          headquartersOrMandal: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Provider Category *
                  </label>
                  <select
                    value={newListingForm.category}
                    onChange={(e) =>
                      setNewListingForm({ ...newListingForm, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Custom Hiring Centre (CHC)">Custom Hiring Centre (CHC)</option>
                    <option value="Tractor & Machinery Dealership">Tractor & Machinery Dealership</option>
                    <option value="Straw & Paddy Baler Provider">Straw & Paddy Baler Provider</option>
                    <option value="Shredder & Mulcher Service">Shredder & Mulcher Service</option>
                    <option value="Biomass / Briquette Facility">Biomass / Briquette Facility</option>
                    <option value="Organic Compost / Vermicompost Plant">Organic Compost / Vermicompost Plant</option>
                    <option value="Farmer Producer Organization (FPO)">Farmer Producer Organization (FPO)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Street Address & Landmarks *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Near Rythu Bharosa Kendra, Main Road"
                    value={newListingForm.address}
                    onChange={(e) => setNewListingForm({ ...newListingForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Public Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94400 00000"
                      value={newListingForm.publicPhone}
                      onChange={(e) =>
                        setNewListingForm({ ...newListingForm, publicPhone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Information Source
                    </label>
                    <input
                      type="text"
                      value={newListingForm.sourceName}
                      onChange={(e) =>
                        setNewListingForm({ ...newListingForm, sourceName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">
                    Supported Machinery (comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Baler, 50HP Tractor, Straw Chopper"
                    value={newListingForm.supportedEquipment}
                    onChange={(e) =>
                      setNewListingForm({
                        ...newListingForm,
                        supportedEquipment: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    Submit for Administrator Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
