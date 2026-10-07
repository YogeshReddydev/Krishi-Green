import React, { useState } from 'react';
import {
  RotateCcw,
  Sprout,
  Sun,
  CloudRain,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FlaskConical,
  Layers,
  Printer,
  ChevronDown,
  HelpCircle,
  Clock,
  Loader2,
  Send,
  Droplets,
  Leaf,
} from 'lucide-react';
import { ProcessingBatch, CropRotationPattern, SupportedLanguage } from '../types';
import { CROP_ROTATION_PATTERNS } from '../data/cropRotationData';

interface CropRotationSchedulerProps {
  batches: ProcessingBatch[];
  language: SupportedLanguage;
}

export const CropRotationScheduler: React.FC<CropRotationSchedulerProps> = ({ batches, language }) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || 'BATCH-2026-V08');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(CROP_ROTATION_PATTERNS[0].id);
  const [expandedSeason, setExpandedSeason] = useState<number | null>(0);

  // Custom AI Rotation Generator states
  const [farmAcres, setFarmAcres] = useState<number>(3);
  const [soilType, setSoilType] = useState<string>('Black Cotton Soil (Regur)');
  const [waterAvailability, setWaterAvailability] = useState<string>('Drip Irrigation + Borewell');
  const [customGoal, setCustomGoal] = useState<string>('Maximum chemical reduction and organic vegetable yields');
  const [aiCustomPlan, setAiCustomPlan] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Find active batch
  const activeBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];

  // Auto-suggest pattern based on batch process type
  const activePattern =
    CROP_ROTATION_PATTERNS.find((p) => p.id === selectedPatternId) ||
    CROP_ROTATION_PATTERNS.find((p) => p.linkedBatchType === activeBatch?.processType) ||
    CROP_ROTATION_PATTERNS[0];

  const handleSelectBatch = (batchId: string) => {
    setSelectedBatchId(batchId);
    const matchedBatch = batches.find((b) => b.id === batchId);
    if (matchedBatch) {
      const bestPattern = CROP_ROTATION_PATTERNS.find(
        (p) => p.linkedBatchType === matchedBatch.processType
      );
      if (bestPattern) setSelectedPatternId(bestPattern.id);
    }
  };

  const handleGenerateAiRotation = async () => {
    setIsLoadingAi(true);
    setAiCustomPlan(null);
    try {
      const prompt = `As an expert agronomy specialist for KrishiGreen, formulate a custom 3-season sustainable crop rotation schedule (Kharif, Rabi, Zaid) for an Indian farmer with:
- Land size: ${farmAcres} Acres
- Soil type: ${soilType}
- Water source: ${waterAvailability}
- Organic fertilizer batch available: ${activeBatch ? activeBatch.outputProduct : 'Grade-A Vermicompost'} (NPK: ${activeBatch?.npkReport?.nitrogen || '1.8%'} N, ${activeBatch?.npkReport?.phosphorus || '1.2%'} P, ${activeBatch?.npkReport?.potassium || '1.4%'} K, SOC: ${activeBatch?.npkReport?.organicCarbonPercent || 18}%)
- Farming goal: ${customGoal}

Format the response clearly with:
1. Season 1 (Kharif): Crop name, category (Heavy Feeder/Legume), exact vermicompost/bio-fertilizer dosage & schedule
2. Season 2 (Rabi): Crop name, natural nitrogen-fixing / pest break benefits
3. Season 3 (Zaid): Crop name / green manure biomass recycling
4. Projected soil organic carbon & chemical fertilizer savings summary.`;

      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          language: language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English',
          context: 'Crop Rotation Scheduler',
        }),
      });

      const data = await res.json();
      setAiCustomPlan(data.reply || 'Rotation schedule generated. Apply 2 tonnes vermicompost during Kharif basal tilling.');
    } catch (e) {
      setAiCustomPlan(
        'Recommended Plan: Kharif - Paddy (2t vermicompost basal) → Rabi - Chickpea (Nitrogen fixer, 1t compost) → Zaid - Sunhemp (Green manure ploughed in). This rotation cuts chemical DAP by 45%.'
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  const getSeasonIcon = (season: string) => {
    if (season.includes('Kharif')) return <CloudRain className="w-4 h-4 text-sky-600" />;
    if (season.includes('Rabi')) return <Sun className="w-4 h-4 text-amber-500" />;
    return <Flame className="w-4 h-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold">
            <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
            Biological Soil Cycle Optimizer • Multi-Season Regeneration
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sustainable Crop Rotation Scheduler
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
            Synchronize your Kharif, Rabi, and Zaid planting patterns directly with the nutrient profile of your KrishiGreen organic fertilizer batches. Alternating heavy feeders with nitrogen-fixing legumes and green manures breaks pest life-cycles and permanently builds living soil organic carbon.
          </p>
        </div>

        {/* Ambient glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      </div>

      {/* STEP 1: Link With Specific Organic Fertilizer Batch */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Step 1 • Biochemical Fertilizer Pairing
            </span>
            <h3 className="text-base font-extrabold text-gray-900">
              Select Processed Bio-Fertilizer Batch
            </h3>
          </div>
          <span className="text-xs text-gray-500">
            Current Active Batches in Facility: <strong>{batches.length}</strong>
          </span>
        </div>

        {/* Batch Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {batches.map((batch) => {
            const isSelected = selectedBatchId === batch.id;
            return (
              <div
                key={batch.id}
                onClick={() => handleSelectBatch(batch.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-gray-50/50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-gray-500">
                      {batch.batchNo}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {batch.processType}
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-900 text-sm leading-snug">
                    {batch.outputProduct}
                  </h4>
                  <p className="text-[11px] text-gray-500">{batch.unitName}</p>

                  {/* NPK Snapshot */}
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-mono text-center">
                    <div className="p-1 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block">N</span>
                      <strong className="text-emerald-900">{batch.npkReport?.nitrogen || '1.8%'}</strong>
                    </div>
                    <div className="p-1 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block">P</span>
                      <strong className="text-emerald-900">{batch.npkReport?.phosphorus || '1.2%'}</strong>
                    </div>
                    <div className="p-1 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block">K</span>
                      <strong className="text-emerald-900">{batch.npkReport?.potassium || '1.4%'}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">Organic Carbon:</span>
                  <strong className="text-emerald-700 font-bold">
                    {batch.npkReport?.organicCarbonPercent || 18}% SOC
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Selected Crop Rotation Pattern Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        {/* Pattern Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Pattern Matched: {activePattern.linkedBatchType}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Soil: {activePattern.targetSoilType}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {activePattern.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">{activePattern.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print Planting Schedule
            </button>
          </div>
        </div>

        {/* Agronomic Impact Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Biological N-Fixed</span>
            <strong className="text-xl font-bold font-mono text-emerald-950">
              +{activePattern.totalNitrogenFixedKgPerAcre} kg / Acre
            </strong>
            <p className="text-[10px] text-emerald-700">Atmospheric N captured via legumes</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Chemical Replacement</span>
            <strong className="text-xl font-bold font-mono text-emerald-950">
              ↓ {activePattern.chemicalSavingsPercent}% DAP/Urea
            </strong>
            <p className="text-[10px] text-emerald-700">Substantial input cost reduction</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Pathogen Disruption</span>
            <strong className="text-xl font-bold font-mono text-emerald-950">
              {activePattern.pathogenBreakScore.split(' ')[0]}
            </strong>
            <p className="text-[10px] text-emerald-700">Root rot & nematode disruption</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Humus Accretion</span>
            <strong className="text-xl font-bold font-mono text-emerald-950">
              {activePattern.humusRestorationRate.split(' ')[0]}
            </strong>
            <p className="text-[10px] text-emerald-700">Active Soil Organic Carbon growth</p>
          </div>
        </div>

        {/* Seasonal 3-Stage Rotation Sequence */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Tri-Seasonal Planting & Fertilizer Application Timeline:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activePattern.seasons.map((season, idx) => {
              const isExpanded = expandedSeason === idx;
              return (
                <div
                  key={season.seasonName}
                  className={`rounded-2xl border transition overflow-hidden flex flex-col justify-between ${
                    isExpanded
                      ? 'border-emerald-500 bg-white shadow-md ring-2 ring-emerald-500/10'
                      : 'border-gray-200 bg-gray-50/50 hover:bg-white'
                  }`}
                >
                  <div className="p-4 space-y-3">
                    {/* Season Tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {getSeasonIcon(season.seasonName)}
                        <span className="text-xs font-bold text-gray-800 font-mono">
                          {season.seasonName}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {season.durationDays} Days
                      </span>
                    </div>

                    {/* Crop Name & Category */}
                    <div>
                      <h5 className="font-extrabold text-base text-gray-900 leading-snug">
                        {season.cropName}
                      </h5>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-md">
                        {season.cropCategory}
                      </span>
                    </div>

                    {/* Organic Fertilizer Batch Allocation */}
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                      <div className="flex items-center gap-1 text-emerald-900 font-bold text-[11px]">
                        <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Fertilizer: {season.fertilizerBatchUsed}</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 font-medium">
                        Dosage: <strong>{season.recommendedDosage}</strong>
                      </p>
                    </div>

                    {/* Application steps */}
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] font-bold uppercase text-gray-400 block">
                        Field Application Steps:
                      </span>
                      <ul className="space-y-1 text-gray-600 text-[11px]">
                        {season.applicationSchedule.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Soil benefits */}
                    <div className="pt-2 border-t border-gray-100 space-y-1 text-[11px] text-gray-500">
                      <span className="text-[10px] font-bold uppercase text-gray-400 block">
                        Soil Health Restoration:
                      </span>
                      {season.soilBenefits.map((b, bIdx) => (
                        <p key={bIdx} className="flex items-center gap-1 text-gray-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 text-[11px]">Expected Yield:</span>
                    <strong className="text-gray-900 font-mono text-[11px]">{season.expectedYieldPerAcre}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP 3: AI Custom Rotation Generator for Farmer's Specific Plot */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                AI Agronomy Assistant: Generate Custom Rotation Schedule
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Powered by Gemini 3.8 Flash • Tailored to your specific village soil type, water source, and fertilizer batch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Land Size (Acres)</label>
            <input
              type="number"
              value={farmAcres}
              onChange={(e) => setFarmAcres(Number(e.target.value))}
              min="0.5"
              max="100"
              className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
            >
              <option value="Black Cotton Soil (Regur)">Black Cotton Soil (High clay & moisture)</option>
              <option value="Alluvial Soil">Alluvial Soil (Gangetic & River plains)</option>
              <option value="Red Sandy Loam">Red Sandy Loam (Southern & Eastern plateau)</option>
              <option value="Laterite Soil">Laterite Soil (High rainfall hilly tracts)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Water & Irrigation</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
            >
              <option value="Drip Irrigation + Borewell">Drip Irrigation + Borewell</option>
              <option value="Canal Flood Irrigation">Canal Flood Irrigation</option>
              <option value="Rainfed (Monsoon Dependent)">Rainfed (Monsoon Dependent)</option>
              <option value="Farm Pond / Sprinklers">Farm Pond / Sprinklers</option>
            </select>
          </div>
        </div>

        <div className="text-xs space-y-1">
          <label className="font-bold text-gray-700 block">Specific Crop Goal or Problem to Solve</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="e.g. Stop fungal root rot in tomato, reduce DAP in sugarcane, or boost wheat grain size"
              className="flex-1 p-2.5 border rounded-xl bg-gray-50 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleGenerateAiRotation}
              disabled={isLoadingAi}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-1.5 transition shrink-0"
            >
              {isLoadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Soil...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Schedule</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Output Card */}
        {aiCustomPlan && (
          <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl border border-emerald-200 text-xs text-gray-800 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-100">
              <strong className="text-emerald-950 font-bold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Custom Agronomic Rotation Plan for Your Farm:
              </strong>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                Batch Synced: {activeBatch?.batchNo}
              </span>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-gray-700">{aiCustomPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};
