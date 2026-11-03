import React, { useState } from 'react';
import {
  IconRefresh,
  IconSprout,
  IconSun,
  IconCloudSun,
  IconFlame,
  IconCheck,
  IconCalendar,
  IconArrowRight,
  IconTrendingUp,
  IconShield,
  IconLayers,
  IconPrinter,
  IconChevronDown,
  IconClock,
  IconLoader,
  IconDroplets,
  IconFileText,
} from './Icons';
import { ProcessingBatch, SupportedLanguage } from '../types';
import { CROP_ROTATION_PATTERNS } from '../data/cropRotationData';
import { CropGrowthTracker } from './CropGrowthTracker';

interface CropRotationSchedulerProps {
  batches: ProcessingBatch[];
  language: SupportedLanguage;
}

export const CropRotationScheduler: React.FC<CropRotationSchedulerProps> = ({ batches, language }) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || 'BATCH-2026-V08');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(CROP_ROTATION_PATTERNS[0].id);

  // Custom AI Rotation Generator states
  const [farmAcres, setFarmAcres] = useState<number>(3);
  const [soilType, setSoilType] = useState<string>('Black Cotton Soil (Regur)');
  const [waterAvailability, setWaterAvailability] = useState<string>('Drip Irrigation + Borewell');
  const [customGoal, setCustomGoal] = useState<string>('Maximum chemical reduction and organic vegetable yields');
  const [aiCustomPlan, setAiCustomPlan] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const activeBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];

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
        'Recommended Plan: Kharif - Paddy (2t vermicompost basal) -> Rabi - Chickpea (Nitrogen fixer, 1t compost) -> Zaid - Sunhemp (Green manure ploughed in). This rotation cuts chemical DAP by 45%.'
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner (Disciplined Solid Forest Style) */}
      <div className="bg-[#1e382b] rounded-sm p-6 text-stone-100 border border-[#ded9ce] relative">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#2d523f] border border-[#3e6852] text-stone-200 text-xs font-mono">
            <IconRefresh className="w-3.5 h-3.5" />
            <span>Biological Soil Cycle Optimizer | Multi-Season Regeneration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
            Sustainable Crop Rotation Scheduler
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
            Synchronize your Kharif, Rabi, and Zaid planting patterns directly with the nutrient profile of your KrishiGreen organic fertilizer batches. Alternating heavy feeders with nitrogen-fixing legumes and green manures breaks pest life-cycles and permanently builds living soil organic carbon.
          </p>
        </div>
      </div>

      {/* STEP 1: Link With Specific Organic Fertilizer Batch (2-Column Ledger layout) */}
      <div className="bg-[#fdfcf9] rounded-sm border border-[#ded9ce] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ded9ce]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600 block">
              Step 1: Biochemical Fertilizer Pairing
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900">
              Select Processed Bio-Fertilizer Batch
            </h3>
          </div>
          <span className="text-xs text-stone-600 font-mono">
            Active Batches in Facility: <strong>{batches.length}</strong>
          </span>
        </div>

        {/* 2-Column Batch Selection Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {batches.map((batch) => {
            const isSelected = selectedBatchId === batch.id;
            return (
              <div
                key={batch.id}
                onClick={() => handleSelectBatch(batch.id)}
                className={`p-4 rounded-sm border text-left cursor-pointer transition-colors flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]'
                    : 'bg-[#f6f4ee] border-[#ded9ce] text-stone-900 hover:border-stone-400'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] font-bold ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {batch.batchNo}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
                        isSelected ? 'bg-[#2d523f] text-stone-200 border-[#3e6852]' : 'bg-stone-200 text-stone-800 border-stone-300'
                      }`}
                    >
                      {batch.processType}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-sm leading-snug">
                    {batch.outputProduct}
                  </h4>
                  <p className={`text-[11px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>{batch.unitName}</p>

                  {/* NPK Snapshot */}
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-mono text-center">
                    <div className={`p-1 rounded-sm border ${isSelected ? 'bg-[#122018] border-[#2d4937]' : 'bg-[#fdfcf9] border-stone-200'}`}>
                      <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>N</span>
                      <strong className={isSelected ? 'text-white' : 'text-stone-900'}>{batch.npkReport?.nitrogen || '1.8%'}</strong>
                    </div>
                    <div className={`p-1 rounded-sm border ${isSelected ? 'bg-[#122018] border-[#2d4937]' : 'bg-[#fdfcf9] border-stone-200'}`}>
                      <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>P</span>
                      <strong className={isSelected ? 'text-white' : 'text-stone-900'}>{batch.npkReport?.phosphorus || '1.2%'}</strong>
                    </div>
                    <div className={`p-1 rounded-sm border ${isSelected ? 'bg-[#122018] border-[#2d4937]' : 'bg-[#fdfcf9] border-stone-200'}`}>
                      <span className={isSelected ? 'text-stone-400' : 'text-stone-500'}>K</span>
                      <strong className={isSelected ? 'text-white' : 'text-stone-900'}>{batch.npkReport?.potassium || '1.4%'}</strong>
                    </div>
                  </div>
                </div>

                <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] font-mono ${isSelected ? 'border-[#2d4937]' : 'border-stone-200'}`}>
                  <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>Organic Carbon:</span>
                  <strong className={isSelected ? 'text-white' : 'text-[#1e382b]'}>
                    {batch.npkReport?.organicCarbonPercent || 18}% SOC
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Crop Growth Progression & Health Tracker */}
      <CropGrowthTracker
        language={language}
        activeBatchName={activeBatch ? activeBatch.outputProduct : 'KrishiGreen Grade-A Vermicompost'}
      />

      {/* STEP 2: Selected Crop Rotation Pattern Details */}
      <div className="bg-[#fdfcf9] rounded-sm border border-[#ded9ce] p-6 space-y-6">
        {/* Pattern Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#ded9ce]">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-stone-200 text-stone-800 text-[11px] font-mono font-bold border border-stone-300">
                Pattern: {activePattern.linkedBatchType}
              </span>
              <span className="text-xs text-stone-600 font-mono">
                Soil: {activePattern.targetSoilType}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {activePattern.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">{activePattern.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-sm text-xs font-mono border border-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <IconPrinter className="w-3.5 h-3.5" /> Print Planting Schedule
            </button>
          </div>
        </div>

        {/* Agronomic Impact Strip (2x2 Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 bg-[#f6f4ee] border border-[#ded9ce] rounded-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-600 block">Biological N-Fixed</span>
            <strong className="text-lg font-bold text-stone-900">
              +{activePattern.totalNitrogenFixedKgPerAcre} kg / Acre
            </strong>
            <p className="text-[10px] text-stone-500">Atmospheric N captured via legumes</p>
          </div>

          <div className="p-3.5 bg-[#f6f4ee] border border-[#ded9ce] rounded-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-600 block">Chemical Replacement</span>
            <strong className="text-lg font-bold text-stone-900">
              - {activePattern.chemicalSavingsPercent}% DAP/Urea
            </strong>
            <p className="text-[10px] text-stone-500">Input cost reduction</p>
          </div>

          <div className="p-3.5 bg-[#f6f4ee] border border-[#ded9ce] rounded-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-600 block">Pathogen Disruption</span>
            <strong className="text-lg font-bold text-stone-900">
              {activePattern.pathogenBreakScore.split(' ')[0]}
            </strong>
            <p className="text-[10px] text-stone-500">Root rot & nematode disruption</p>
          </div>

          <div className="p-3.5 bg-[#f6f4ee] border border-[#ded9ce] rounded-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-600 block">Humus Accretion</span>
            <strong className="text-lg font-bold text-stone-900">
              {activePattern.humusRestorationRate.split(' ')[0]}
            </strong>
            <p className="text-[10px] text-stone-500">Active Soil Organic Carbon growth</p>
          </div>
        </div>

        {/* Seasonal Rotation Sequence: Structured Chronological Timeline (No 3 cards in a row) */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
            Tri-Seasonal Planting & Fertilizer Application Timeline:
          </h4>

          <div className="space-y-3">
            {activePattern.seasons.map((season, idx) => (
              <div
                key={season.seasonName}
                className="rounded-sm border border-[#ded9ce] bg-[#f6f4ee] p-4 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-800 bg-stone-200 px-2 py-0.5 rounded-sm border border-stone-300">
                      Season {idx + 1}: {season.seasonName}
                    </span>
                    <span className="text-[10px] font-mono text-stone-600">
                      Duration: {season.durationDays} Days
                    </span>
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-base text-stone-900">
                      {season.cropName}
                    </h5>
                    <span className="text-[10px] font-mono text-stone-600">
                      Category: {season.cropCategory}
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#fdfcf9] rounded-sm border border-[#ded9ce] text-xs font-mono space-y-1">
                    <span className="text-stone-800 font-bold block">
                      Fertilizer: {season.fertilizerBatchUsed}
                    </span>
                    <span className="text-stone-600 block">
                      Dosage: <strong>{season.recommendedDosage}</strong>
                    </span>
                  </div>
                </div>

                <div className="md:w-1/2 space-y-2 border-t md:border-t-0 md:border-l border-[#ded9ce] md:pl-4 pt-2 md:pt-0">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-600 block">
                    Field Application Schedule:
                  </span>
                  <ul className="space-y-1 text-stone-700 text-xs font-sans">
                    {season.applicationSchedule.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-stone-500 font-mono">-</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-[#ded9ce] flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-500">Expected Yield:</span>
                    <strong className="text-stone-900">{season.expectedYieldPerAcre}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3: AI Custom Rotation Generator for Farmer's Specific Plot */}
      <div className="bg-[#fdfcf9] rounded-sm border border-[#ded9ce] p-6 space-y-4">
        <div className="pb-3 border-b border-[#ded9ce]">
          <h3 className="text-base font-serif font-bold text-stone-900">
            Agronomy Schedule Planner: Custom Rotation Schedule
          </h3>
          <p className="text-xs text-stone-600 font-mono mt-0.5">
            Tailored to your specific village soil type, water source, and fertilizer batch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Land Size (Acres)</label>
            <input
              type="number"
              value={farmAcres}
              onChange={(e) => setFarmAcres(Number(e.target.value))}
              min="0.5"
              max="100"
              className="w-full p-2 border border-stone-300 rounded-sm bg-[#f6f4ee]"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-sm bg-[#f6f4ee]"
            >
              <option value="Black Cotton Soil (Regur)">Black Cotton Soil (High clay & moisture)</option>
              <option value="Alluvial Soil">Alluvial Soil (Gangetic & River plains)</option>
              <option value="Red Sandy Loam">Red Sandy Loam (Southern & Eastern plateau)</option>
              <option value="Laterite Soil">Laterite Soil (High rainfall hilly tracts)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Water & Irrigation</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-sm bg-[#f6f4ee]"
            >
              <option value="Drip Irrigation + Borewell">Drip Irrigation + Borewell</option>
              <option value="Canal Flood Irrigation">Canal Flood Irrigation</option>
              <option value="Rainfed (Monsoon Dependent)">Rainfed (Monsoon Dependent)</option>
              <option value="Farm Pond / Sprinklers">Farm Pond / Sprinklers</option>
            </select>
          </div>
        </div>

        <div className="text-xs space-y-1 font-mono">
          <label className="font-bold text-stone-700 block">Specific Crop Goal or Problem to Solve</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="e.g. Stop fungal root rot in tomato, reduce DAP in sugarcane, or boost wheat grain size"
              className="flex-1 p-2 border border-stone-300 rounded-sm bg-[#f6f4ee] outline-none"
            />
            <button
              onClick={handleGenerateAiRotation}
              disabled={isLoadingAi}
              className="px-4 py-2 bg-[#1e382b] hover:bg-[#2d523f] disabled:opacity-50 text-[#fbfaf6] rounded-sm font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              {isLoadingAi ? (
                <>
                  <IconLoader className="w-4 h-4" />
                  <span>Analyzing Soil...</span>
                </>
              ) : (
                <span>Generate Schedule</span>
              )}
            </button>
          </div>
        </div>

        {/* AI Output Card */}
        {aiCustomPlan && (
          <div className="p-4 bg-[#f6f4ee] rounded-sm border border-[#ded9ce] text-xs text-stone-800 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#ded9ce] font-mono">
              <strong className="text-stone-900 font-bold text-sm">
                Custom Agronomic Rotation Plan for Your Farm:
              </strong>
              <span className="text-[10px] text-stone-600">
                Batch Synced: {activeBatch?.batchNo}
              </span>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-stone-700 font-sans">{aiCustomPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};
