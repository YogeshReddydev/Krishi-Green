import React, { useState, useEffect } from 'react';
import { SupportedLanguage, WasteCollectionRequest, OrganicProduct } from '../../types';
import { UI_TRANSLATIONS } from '../../data/translations';
import { getMultiTranslations } from '../../utils/multiLang';
import { navigateTo, APP_ROUTES } from '../../utils/navigation';
import { useAuth } from '../../contexts/AuthContext';
import {
  IconLeaf,
  IconTruck,
  IconSparkles,
  IconPhone,
  IconChevronRight,
  IconCheck,
  IconSun,
} from '../../components/Icons';
import {
  User,
  MapPin,
  Globe,
  Phone,
  Save,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  Sprout,
  Tractor,
  X,
  Layers,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface FarmerDashboardProps {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
  products: OrganicProduct[];
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

interface FarmerProfileState {
  fullName: string;
  phone: string;
  village: string;
  mandal: string;
  district: string;
  landAcres: number;
  preferredLanguage: SupportedLanguage;
  primaryCrop: string;
}

const LOCAL_STORAGE_KEY = 'krishigreen_farmer_profile_v1';

export function FarmerDashboard({
  language,
  wasteRequests,
  products,
  onLanguageChange,
}: FarmerDashboardProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);
  const { user, profile, updateProfileData } = useAuth();

  const isTe = language === 'te';
  const isHi = language === 'hi';

  // Load initial profile data from Firebase or localStorage or defaults
  const [profileData, setProfileData] = useState<FarmerProfileState>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            fullName: parsed.fullName || 'Venkateswara Rao',
            phone: parsed.phone || '9848022338',
            village: parsed.village || 'Narasaraopet Rural',
            mandal: parsed.mandal || 'Narasaraopet Mandal',
            district: parsed.district || 'Palnadu',
            landAcres: parsed.landAcres || 3,
            preferredLanguage: parsed.preferredLanguage || language || 'te',
            primaryCrop: parsed.primaryCrop || 'Chilli (Mirchi) / మిరప',
          };
        }
      } catch (e) {
        // Fallback below
      }
    }
    return {
      fullName: 'Venkateswara Rao',
      phone: '9848022338',
      village: 'Narasaraopet Rural',
      mandal: 'Narasaraopet Mandal',
      district: 'Palnadu',
      landAcres: 3,
      preferredLanguage: language || 'te',
      primaryCrop: 'Chilli (Mirchi) / మిరప',
    };
  });

  // Sync from Firebase Auth Profile if available
  useEffect(() => {
    if (profile) {
      setProfileData((prev) => ({
        ...prev,
        fullName: profile.displayName || prev.fullName,
        phone: profile.phone || prev.phone,
        village: profile.village || prev.village,
        district: profile.district || prev.district,
        mandal: profile.mandal || prev.mandal,
        landAcres: profile.landAcres || prev.landAcres,
        preferredLanguage: (profile.preferredLanguage as SupportedLanguage) || prev.preferredLanguage,
        primaryCrop: profile.primaryCrop || prev.primaryCrop,
      }));
    }
  }, [profile]);

  // Form editing states
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form inputs state while editing
  const [formData, setFormData] = useState<FarmerProfileState>(profileData);

  const startEditing = () => {
    setFormData(profileData);
    setIsEditing(true);
    setSaveSuccessMsg(null);
  };

  const cancelEditing = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccessMsg(null);

    try {
      // 1. Update local state
      setProfileData(formData);

      // 2. Persist to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));

      // 3. Persist to Firebase Firestore if authenticated
      if (user) {
        await updateProfileData({
          displayName: formData.fullName,
          phone: formData.phone,
          village: formData.village,
          district: formData.district,
          mandal: formData.mandal,
          landAcres: formData.landAcres,
          preferredLanguage: formData.preferredLanguage,
          primaryCrop: formData.primaryCrop,
        });
      }

      // 4. Update live UI language if changed
      if (onLanguageChange && formData.preferredLanguage !== language) {
        onLanguageChange(formData.preferredLanguage);
      }

      setSaveSuccessMsg(
        isTe
          ? 'మీ ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది!'
          : isHi
          ? 'आपकी किसान प्रोफाइल सफलतापूर्वक अपडेट की गई!'
          : 'Farmer profile successfully saved!'
      );
      setIsEditing(false);
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      // Fallback: still keep local updates
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const myWasteRequests = wasteRequests.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>{isTe ? 'రైతు డాష్‌బోర్డ్' : isHi ? 'किसान डैशबोर्ड' : 'Farmer Dashboard'}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {isTe
                ? `నమస్కారం, ${profileData.fullName} గారు!`
                : isHi
                ? `नमस्ते, ${profileData.fullName} जी!`
                : `Welcome, ${profileData.fullName}!`}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                {profileData.village}, {profileData.district} • {profileData.landAcres} {isTe ? 'ఎకరాల సాగు' : 'Acres'}
              </span>
            </p>
          </div>

          <a
            href="tel:18005747443"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap shadow-xs"
          >
            <IconPhone className="w-4 h-4" />
            <span>1800-KRISHI-GRN</span>
          </a>
        </div>
      </div>

      {/* Success alert message */}
      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 animate-fadeIn text-emerald-900 text-xs sm:text-sm font-bold shadow-2xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* 
        ======================================================================
        FARMER PROFILE SECTION
        Manages basic information, village name, and preferred communication language
        ======================================================================
      */}
      <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl shadow-2xs">
              <User className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  {isTe ? 'రైతు ప్రొఫైల్ వివరాలు' : isHi ? 'किसान प्रोफाइल विवरण' : 'Farmer Profile'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>{isTe ? 'ధృవీకరించబడిన రైతు' : 'Verified Rythu'}</span>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {isTe
                  ? 'మీ వ్యక్తిగత వివరాలు, గ్రామం మరియు కమ్యూనికేషన్ భాషను నిర్వహించండి.'
                  : 'Manage your basic details, village, and preferred communication language.'}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={startEditing}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 border border-emerald-200 shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-emerald-700" />
              <span>{isTe ? 'ప్రొఫైల్ సవరించండి' : isHi ? 'प्रोफाइल संपादित करें' : 'Edit Profile'}</span>
            </button>
          ) : (
            <button
              onClick={cancelEditing}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>{isTe ? 'రద్దు చేయి' : isHi ? 'रद्द करें' : 'Cancel'}</span>
            </button>
          )}
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Basic Info */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {isTe ? 'రైతు పేరు' : isHi ? 'किसान का नाम' : 'Farmer Name'}
              </span>
              <p className="font-extrabold text-sm sm:text-base text-gray-900">{profileData.fullName}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3 text-emerald-600" />
                <span>+91 {profileData.phone}</span>
              </p>
            </div>

            {/* 2. Village & District */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {isTe ? 'గ్రామం & మండలం' : isHi ? 'गांव व मंडल' : 'Village & Mandal'}
              </span>
              <p className="font-extrabold text-sm sm:text-base text-gray-900">{profileData.village}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{profileData.mandal}, {profileData.district}</span>
              </p>
            </div>

            {/* 3. Farm Cultivation */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {isTe ? 'సాగు విస్తీర్ణం & పంట' : isHi ? 'खेत का रकबा व फसल' : 'Land & Crop'}
              </span>
              <p className="font-extrabold text-sm sm:text-base text-gray-900">
                {profileData.landAcres} {isTe ? 'ఎకరాలు' : isHi ? 'एकड़' : 'Acres'}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Tractor className="w-3 h-3 text-emerald-600" />
                <span className="truncate">{profileData.primaryCrop}</span>
              </p>
            </div>

            {/* 4. Preferred Communication Language */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {isTe ? 'కమ్యూనికేషన్ భాష' : isHi ? 'संचार भाषा' : 'Preferred Language'}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="font-extrabold text-sm sm:text-base text-emerald-950">
                  {profileData.preferredLanguage === 'te'
                    ? 'తెలుగు (Telugu)'
                    : profileData.preferredLanguage === 'hi'
                    ? 'हिन्दी (Hindi)'
                    : 'English'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                {isTe ? 'SMS & కాల్స్ తెలుగులో వస్తాయి' : 'SMS & notifications in this language'}
              </p>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'రైతు పూర్తి పేరు:' : isHi ? 'किसान का पूरा नाम:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Venkateswara Rao"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'మొబైల్ నంబర్ (SMS కోసం):' : isHi ? 'मोबाइल नंबर (एसएमएस हेतु):' : 'Mobile Phone (for SMS / DBT):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9848022338"
                    className="w-full bg-white border border-emerald-300 rounded-xl pl-11 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Village Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'గ్రామం పేరు:' : isHi ? 'गांव का नाम:' : 'Village Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="e.g. Narasaraopet Rural / Ramnagar"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              {/* Mandal */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'మండలం:' : isHi ? 'मंडल:' : 'Mandal:'}
                </label>
                <input
                  type="text"
                  value={formData.mandal}
                  onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                  placeholder="e.g. Narasaraopet Mandal"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'జిల్లా:' : isHi ? 'जिला:' : 'District:'}
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                >
                  <option value="Palnadu">Palnadu</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Prakasam">Prakasam</option>
                  <option value="Krishna">Krishna</option>
                  <option value="Kurnool">Kurnool</option>
                  <option value="Anantapur">Anantapur</option>
                  <option value="East Godavari">East Godavari</option>
                  <option value="West Godavari">West Godavari</option>
                </select>
              </div>

              {/* Land Acres */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'సాగు విస్తీర్ణం (ఎకరాలు):' : isHi ? 'रकबा (एकड़):' : 'Land Acreage:'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={formData.landAcres}
                    onChange={(e) => setFormData({ ...formData, landAcres: Number(e.target.value) })}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                  <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                    {isTe ? 'ఎకరాలు' : 'Acres'}
                  </span>
                </div>
              </div>

              {/* Primary Crop */}
              <div className="space-y-1.5 lg:col-span-3">
                <label className="text-xs font-bold text-gray-700 block">
                  {isTe ? 'ప్రధాన పంట:' : isHi ? 'मुख्य फसल:' : 'Primary Crop Grown:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Chilli (Mirchi) / మిరప',
                    'Cotton (Patti) / పత్తి',
                    'Paddy (Vari) / వరి',
                    'Hybrid Maize / మొక్కజొన్న',
                    'Black Gram (Minumu) / మినుము',
                    'Groundnut / వేరుశనగ',
                  ].map((crop) => (
                    <button
                      type="button"
                      key={crop}
                      onClick={() => setFormData({ ...formData, primaryCrop: crop })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        formData.primaryCrop === crop
                          ? 'bg-emerald-700 text-white shadow'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Communication Language */}
              <div className="space-y-2 lg:col-span-3 pt-2 border-t border-gray-100">
                <label className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <span>
                    {isTe
                      ? 'కమ్యూనికేషన్ & SMS కోసం మీ ప్రాధాన్యత భాషను ఎంచుకోండి:'
                      : isHi
                      ? 'एसएमएस और संदेशों हेतु अपनी पसंदीदा भाषा चुनें:'
                      : 'Preferred Communication Language (for Advisory, SMS & Helpline):'}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'te' as SupportedLanguage,
                      label: 'తెలుగు (Telugu)',
                      sub: 'రైతు మిత్ర సందేశాలు & ఫోన్ సలహాలు',
                      flag: '🇮🇳',
                    },
                    {
                      id: 'hi' as SupportedLanguage,
                      label: 'हिन्दी (Hindi)',
                      sub: 'किसान सूचनाएं व एसएमएस अलर्ट',
                      flag: '🇮🇳',
                    },
                    {
                      id: 'en' as SupportedLanguage,
                      label: 'English',
                      sub: 'Institutional & General Notifications',
                      flag: '🌐',
                    },
                  ].map((langOption) => (
                    <button
                      type="button"
                      key={langOption.id}
                      onClick={() => setFormData({ ...formData, preferredLanguage: langOption.id })}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 ${
                        formData.preferredLanguage === langOption.id
                          ? 'bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500'
                          : 'bg-white hover:bg-emerald-50/70 border-emerald-200 text-gray-900'
                      }`}
                    >
                      <span className="text-xl">{langOption.flag}</span>
                      <div className="space-y-0.5">
                        <strong className="block text-sm font-extrabold">{langOption.label}</strong>
                        <span
                          className={`text-[11px] block ${
                            formData.preferredLanguage === langOption.id ? 'text-emerald-200' : 'text-gray-500'
                          }`}
                        >
                          {langOption.sub}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {isTe
                  ? '* ఈ వివరాలు మీ సేకరణ అభ్యర్థనలు మరియు ఎరువుల డెలివరీకి స్వయంచాలకంగా ఉపయోగించబడతాయి.'
                  : '* These details are automatically referenced for waste pickups and fertilizer deliveries.'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
                >
                  {isTe ? 'రద్దు చేయి' : isHi ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <Sprout className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>
                    {isSaving
                      ? isTe
                        ? 'భద్రపరుస్తోంది...'
                        : 'Saving...'
                      : isTe
                      ? 'వివరాలను భద్రపరచండి'
                      : isHi
                      ? 'प्रोफाइल सहेजें'
                      : 'Save Profile Details'}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 4 Large Farmer Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigateTo(APP_ROUTES.WASTE_MANAGEMENT)}
          className="p-5 bg-white border border-emerald-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl group-hover:scale-110 transition">
            🚚
          </div>
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition">
            {isTe ? 'వ్యర్థాల సేకరణ అభ్యర్థన' : isHi ? 'कचरा संग्रहण अनुरोध' : 'Request Waste Collection'}
          </h3>
          <p className="text-xs text-gray-500">
            {isTe ? 'పొలం, మండి లేదా గ్రామం నుండి సేకరణ' : 'Pickup from farm, mandi or household'}
          </p>
        </button>

        <button
          onClick={() => navigateTo(APP_ROUTES.AGA)}
          className="p-5 bg-white border border-emerald-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center text-xl group-hover:scale-110 transition">
            🌱
          </div>
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition">
            {isTe ? 'AGA సేంద్రీయ ఎరువు ఆర్డర్' : isHi ? 'एजीए जैविक खाद ऑर्डर' : 'Order AGA Bio-Fertilizer'}
          </h3>
          <p className="text-xs text-gray-500">
            {isTe ? '50kg బస్తాలు • ప్రయోగశాల పరీక్షితం' : '50kg bags • FCO 1985 benchmarked'}
          </p>
        </button>

        <button
          onClick={() => navigateTo(APP_ROUTES.EQUIPMENT_HUB)}
          className="p-5 bg-white border border-emerald-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl group-hover:scale-110 transition">
            🚜
          </div>
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition">
            {isTe ? 'వ్యవసాయ యంత్రాలు అద్దెకు' : isHi ? 'कृषि उपकरण किराए पर' : 'Find Farming Equipment'}
          </h3>
          <p className="text-xs text-gray-500">
            {isTe ? 'సమీపంలోని CHC హబ్‌ల నుండి' : 'Direct custom hiring hub bookings'}
          </p>
        </button>

        <button
          onClick={() => navigateTo(APP_ROUTES.AGRICULTURE_UPDATES)}
          className="p-5 bg-white border border-emerald-200 rounded-2xl text-left hover:border-emerald-500 hover:shadow-md transition space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-800 flex items-center justify-center text-xl group-hover:scale-110 transition">
            ☀️
          </div>
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition">
            {isTe ? 'వాతావరణం & పంట సలహాలు' : isHi ? 'मौसम व फसल परामर्श' : 'Weather & Crop Advice'}
          </h3>
          <p className="text-xs text-gray-500">
            {isTe ? 'వర్షపాత రాడార్ & మండి ధరలు' : 'Rain probability & seasonal bulletins'}
          </p>
        </button>
      </div>

      {/* Active Requests List */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-gray-900">
            {isTe ? 'మీ సేకరణ అభ్యర్థనలు' : isHi ? 'आपके कचरा संग्रहण अनुरोध' : 'Your Waste Collection Requests'}
          </h3>
          <button
            onClick={() => navigateTo(APP_ROUTES.WASTE_MANAGEMENT)}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isTe ? 'అన్నీ చూడండి' : isHi ? 'सभी देखें' : 'View All Requests'}</span>
            <IconChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myWasteRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs bg-gray-50 rounded-2xl">
            {isTe ? 'ఇంకా ఎటువంటి అభ్యర్థనలు నమోదు చేయలేదు.' : 'No active waste requests recorded yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myWasteRequests.map((r) => (
              <div key={r.id} className="p-4 rounded-xl border border-gray-200 space-y-2 bg-[#fdfdfc]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-emerald-800">{r.id}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 text-[10px]">
                    {r.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-gray-900">{r.wasteType}</h4>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Weight: <strong>{r.estimatedWeightKg} kg</strong></span>
                  <span>Pickup: <strong>{r.pickupDate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
