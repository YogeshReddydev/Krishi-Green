import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Calendar,
  Clock,
  Droplets,
  MapPin,
  Sparkles,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Filter,
  Layers,
  ThermometerSun,
  Sun,
  Flame,
  Info,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getMultiTranslations } from '../utils/multiLang';
import { getUITranslation } from '../utils/translationEngine';
import {
  SEASONAL_CROPS_DATABASE,
  AGRO_REGIONS,
  MONTH_NAMES,
  SeasonalCropAdviceItem,
  RegionAgroProfile,
} from '../data/seasonalAdviceData';

interface SeasonalCropAdviceProps {
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
}

export const SeasonalCropAdvice: React.FC<SeasonalCropAdviceProps> = ({
  language,
  onNavigate,
}) => {
  const m = getMultiTranslations(language);
  const ui = getUITranslation(language);
  const cropLabels = ui.cropLabels;
  // Current calendar month (1-12)
  const currentCalendarMonth = new Date().getMonth() + 1; // e.g. 10 for October
  const [selectedMonth, setSelectedMonth] = useState<number>(currentCalendarMonth);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('ap-palnadu');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [speakingCropId, setSpeakingCropId] = useState<string | null>(null);
  const [aiRealtimeData, setAiRealtimeData] = useState<any | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');

  const selectedRegion: RegionAgroProfile =
    AGRO_REGIONS.find((r) => r.id === selectedRegionId) || AGRO_REGIONS[0];

  const currentMonthInfo =
    MONTH_NAMES.find((m) => m.month === selectedMonth) || MONTH_NAMES[selectedMonth - 1] || MONTH_NAMES[9];

  // Filter crops based on selected month and region
  const recommendedCrops = SEASONAL_CROPS_DATABASE.filter((crop) => {
    const matchesMonth = crop.suitableMonths.includes(selectedMonth);
    const matchesRegion =
      crop.suitableRegions.includes(selectedRegionId) || crop.suitableRegions.length === 0;
    const matchesCat =
      selectedCategory === 'All' ||
      (selectedCategory === 'Pulses' && crop.category === 'Pulses') ||
      (selectedCategory === 'Cereals' && crop.category === 'Cereals') ||
      (selectedCategory === 'Oilseeds' && crop.category === 'Oilseeds') ||
      (selectedCategory === 'Vegetables' && (crop.category === 'Vegetables' || crop.category === 'Commercial & Spices'));

    return matchesMonth && matchesRegion && matchesCat;
  });

  // If no crops strictly match the category/region combination, show general suitable crops for that month
  const displayCrops =
    recommendedCrops.length > 0
      ? recommendedCrops
      : SEASONAL_CROPS_DATABASE.filter((c) => c.suitableMonths.includes(selectedMonth));

  // Fetch real-time AI agromet advice from backend
  const fetchRealtimeAgrometAdvice = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/seasonal-crop-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: selectedMonth,
          region: selectedRegion.name,
          language: language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English',
          soilType: selectedRegion.soilTypes[0] || 'Black Cotton Soil',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiRealtimeData(data);
        setLastUpdatedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn('Realtime advice fetch fallback to database:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Trigger speech synthesis
  const handleToggleSpeech = (crop: SeasonalCropAdviceItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingCropId === crop.id) {
      window.speechSynthesis.cancel();
      setSpeakingCropId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const isTe = language === 'te';
    const isHi = language === 'hi';
    const loc = ui.getCrop(crop);

    const textToSpeak = isTe
      ? `${loc.name}. విత్తే సమయం ${loc.sowingWindow}. పంట కాలం ${loc.durationDays}. ఎందుకు నాటాలి: ${loc.whyPlantNow}. సేంద్రీయ ఎరువుల సలహా: ${loc.organicRegimen}. ఆశించిన దిగుబడి: ${loc.expectedYield}.`
      : isHi
      ? `${loc.name}. बुवाई का समय ${loc.sowingWindow}. फसल अवधि ${loc.durationDays}. क्यों लगाएं: ${loc.whyPlantNow}. जैविक खाद नियम: ${loc.organicRegimen}. अनुमानित पैदावार: ${loc.expectedYield}.`
      : `${loc.name}. Recommended Sowing Window: ${loc.sowingWindow}. Duration: ${loc.durationDays}. Why plant now: ${loc.whyPlantNow}. Organic recommendation: ${loc.organicRegimen}. Expected yield: ${loc.expectedYield}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isTe ? 'te-IN' : isHi ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingCropId(null);
    utterance.onerror = () => setSpeakingCropId(null);

    setSpeakingCropId(crop.id);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 border-2 border-emerald-500/40 p-5 sm:p-7 shadow-xl text-white space-y-6">
      {/* Decorative ambient background */}
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-500/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>{m.seasonalAdviceTitle}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{m.seasonalAdviceHeading}</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-3xl leading-relaxed">
            {m.seasonalAdviceDesc}
          </p>
        </div>

        {/* Sync & Refresh Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-emerald-300/80 block uppercase font-mono tracking-wider">
              Agromet Status
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {aiRealtimeData?.isRealtime ? 'AI Live Grounded' : 'IMD & Agrisnet Verified'}
            </span>
          </div>
          <button
            onClick={fetchRealtimeAgrometAdvice}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Fetch latest Agromet Advice with Gemini AI"
          >
            <Sprout className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Fetch Live AI Advice'}</span>
          </button>
        </div>
      </div>

      {/* Controls: Region Selector, Month Navigator, and Soil Status Ticker */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Region Selector */}
        <div className="md:col-span-5 bg-black/25 rounded-2xl p-3.5 border border-emerald-400/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {m.selectFarmingDistrict}
            </span>
            <span className="text-[10px] bg-emerald-900/80 px-2 py-0.5 rounded font-mono text-emerald-200">
              {selectedRegion.state}
            </span>
          </div>

          <select
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="w-full bg-emerald-950/80 border border-emerald-400/40 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          >
            {AGRO_REGIONS.map((region) => (
              <option key={region.id} value={region.id} className="bg-emerald-950 text-white">
                {ui.getRegionName(region)}
              </option>
            ))}
          </select>

          {/* Quick Region Soil & Moisture stats */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-emerald-300/80 block text-[10px]">{ui.t('primarySoil', 'Primary Soil:')}</span>
              <strong className="text-white font-medium truncate block">
                {selectedRegion.soilTypes[0]}
              </strong>
            </div>
            <div>
              <span className="text-emerald-300/80 block text-[10px]">{ui.t('soilMoisture', 'Soil Moisture:')}</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" />
                {selectedRegion.currentSoilMoisture}
              </span>
            </div>
          </div>
        </div>

        {/* Month Selector & Sowing Season Banner */}
        <div className="md:col-span-7 bg-black/25 rounded-2xl p-3.5 border border-emerald-400/20 space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {m.selectCroppingMonth}
            </span>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {ui.getSeason(selectedMonth)}
            </span>
          </div>

          {/* Month Pills Carousel */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {MONTH_NAMES.map((mItem) => {
              const isCurrent = mItem.month === currentCalendarMonth;
              const isSelected = mItem.month === selectedMonth;
              return (
                <button
                  key={mItem.month}
                  onClick={() => setSelectedMonth(mItem.month)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-amber-500 text-amber-950 font-black shadow-md scale-105'
                      : isCurrent
                      ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-700'
                      : 'bg-white/10 text-emerald-100 hover:bg-white/20'
                  }`}
                >
                  <span>{ui.getMonth(mItem.month)}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Current Month" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-emerald-200/80 pt-1 border-t border-white/10">
            <span>
              {ui.t('activeMonth', 'Active')}: {ui.getMonth(selectedMonth)} ({ui.t('currentCalendar', 'Current Calendar')}: {ui.getMonth(currentCalendarMonth)})
            </span>
            <span className="text-emerald-400 font-bold">
              {displayCrops.length} {ui.t('cropsAdvised', 'crops advised')}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="text-xs text-emerald-300 font-bold flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" />
          {cropLabels.cropCategory}
        </span>
        {[
          { id: 'All', label: cropLabels.allCrops },
          { id: 'Pulses', label: cropLabels.pulsesLabel },
          { id: 'Cereals', label: cropLabels.cerealsLabel },
          { id: 'Oilseeds', label: cropLabels.oilseedsLabel },
          { id: 'Vegetables', label: cropLabels.vegetablesLabel },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-xl font-bold transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-400 text-emerald-950 shadow-xs'
                : 'bg-white/10 text-emerald-200 hover:bg-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Real-time AI Insight Banner if available */}
      {aiRealtimeData?.data?.climateOutlook && (
        <div className="relative z-10 bg-emerald-900/80 border border-emerald-400/40 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-black text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {ui.t('liveAgrometOutlook', 'Live AI Agromet Field Outlook')}
            </span>
            <span className="text-[10px] text-emerald-300 font-mono">
              Updated: {lastUpdatedTime}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {language === 'te' && aiRealtimeData.data.climateOutlookTe
              ? aiRealtimeData.data.climateOutlookTe
              : aiRealtimeData.data.climateOutlook}
          </p>
        </div>
      )}

      {/* Recommended Crops Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayCrops.map((crop) => {
          const isSpeaking = speakingCropId === crop.id;
          const loc = ui.getCrop(crop);

          return (
            <div
              key={crop.id}
              className="rounded-2xl border-2 border-emerald-400/30 bg-emerald-950/70 backdrop-blur-md p-5 flex flex-col justify-between hover:border-emerald-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-3.5">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                        {loc.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {cropLabels.plantNow}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white mt-1.5 group-hover:text-amber-300 transition">
                      {loc.name}
                    </h3>
                    {crop.scientificName && (
                      <span className="text-[10px] italic text-emerald-300/70 font-mono block">
                        {crop.scientificName}
                      </span>
                    )}
                  </div>

                  {/* Read Out Aloud Button */}
                  <button
                    onClick={() => handleToggleSpeech(crop)}
                    className={`p-2 rounded-xl transition cursor-pointer shrink-0 ${
                      isSpeaking
                        ? 'bg-amber-400 text-amber-950 animate-pulse'
                        : 'bg-white/10 hover:bg-white/20 text-emerald-200'
                    }`}
                    title={isSpeaking ? 'Stop Audio' : 'Listen Advice in Voice'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sowing Window & Duration Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs p-2.5 bg-black/30 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[10px] text-emerald-300/80 block uppercase font-mono">
                      {cropLabels.sowingWindow}
                    </span>
                    <strong className="text-white text-xs font-semibold block mt-0.5">
                      {loc.sowingWindow}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300/80 block uppercase font-mono">
                      {cropLabels.durationHarvest}
                    </span>
                    <strong className="text-amber-300 text-xs font-semibold block mt-0.5">
                      {loc.durationDays}
                    </strong>
                  </div>
                </div>

                {/* Why Plant Right Now */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" />
                    {cropLabels.whyPlantNow}
                  </span>
                  <p className="text-xs text-emerald-100/90 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
                    {loc.whyPlantNow}
                  </p>
                </div>

                {/* Organic KrishiGreen Bio-Input Regimen */}
                <div className="space-y-1 bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-400/20 text-xs">
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {cropLabels.organicRegimen}:
                    </span>
                    <span className="text-[10px] text-amber-300 font-mono">
                      {loc.chemicalReduction}
                    </span>
                  </div>
                  <p className="text-emerald-100 text-[11px] leading-relaxed">
                    {loc.organicRegimen}
                  </p>
                </div>

                {/* Financial & Yield Outlook */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-[10px] text-emerald-300 block">{cropLabels.expectedYield}</span>
                    <strong className="text-white text-xs font-bold block">
                      {loc.expectedYield}
                    </strong>
                  </div>
                  <div className="p-2 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-[10px] text-emerald-300 block">{cropLabels.estRevenue}</span>
                    <strong className="text-amber-300 text-xs font-bold block">
                      {loc.estRevenue}
                    </strong>
                  </div>
                </div>

                {/* Risk Alert Tip */}
                <div className="flex items-start gap-1.5 text-[11px] text-amber-200/90 bg-amber-500/10 p-2 rounded-xl border border-amber-400/20">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{loc.riskAlert}</span>
                </div>
              </div>

              {/* Card Bottom CTAs */}
              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('rotation')}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white rounded-xl text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{cropLabels.viewRotation}</span>
                </button>

                <button
                  onClick={() => onNavigate('marketplace-products')}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-emerald-950 font-black rounded-xl text-[11px] transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{cropLabels.orderBioHumus}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Field Agronomy Quick Checklist */}
      <div className="relative z-10 bg-black/30 rounded-2xl p-4 sm:p-5 border border-emerald-400/20 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-400 font-black flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            {cropLabels.checklistTitle} ({ui.getMonth(selectedMonth)})
          </span>
          <span className="text-[10px] text-emerald-300 font-mono">
            {cropLabels.sourceText}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-100">
          <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
              1
            </div>
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                {cropLabels.seedTreatmentTitle}
              </strong>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                {cropLabels.seedTreatmentDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
              2
            </div>
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                {cropLabels.basalHumusTitle}
              </strong>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                {cropLabels.basalHumusDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
              3
            </div>
            <div>
              <strong className="text-white block font-semibold mb-0.5">
                {cropLabels.moistureTitle}
              </strong>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                {cropLabels.moistureDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
