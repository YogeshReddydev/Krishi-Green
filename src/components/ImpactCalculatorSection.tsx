import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Sprout,
  DollarSign,
  Users,
  Recycle,
  Sparkles,
  Calculator,
  CheckCircle2,
  Building,
  Target,
  ArrowRight,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { ImpactVisualizer } from './ImpactVisualizer';

interface ImpactCalculatorProps {
  language: SupportedLanguage;
}

export const ImpactCalculatorSection: React.FC<ImpactCalculatorProps> = ({ language }) => {
  // Calculator inputs
  const [landAcres, setLandAcres] = useState<number>(3);
  const [cropType, setCropType] = useState<string>('Paddy / Rice');
  const [chemicalSpendYearly, setChemicalSpendYearly] = useState<number>(32000);
  const [wasteKgsMonthly, setWasteKgsMonthly] = useState<number>(600);

  // Dynamic calculations based on agricultural agronomy models
  const chemicalSavings = Math.round(chemicalSpendYearly * 0.40); // 40% chemical reduction
  const yearlyWasteKg = wasteKgsMonthly * 12;
  const compostYieldKg = Math.round(yearlyWasteKg * 0.45); // 45% conversion yield
  const compostMarketValue = Math.round(compostYieldKg * 8); // ₹8/kg
  const totalNetBenefit = chemicalSavings + compostMarketValue;
  const netIncomeUpliftPercent = Math.min(
    Math.round((totalNetBenefit / (chemicalSpendYearly * 1.5)) * 100),
    38
  );
  const socIncrease = +(0.12 * Math.min(landAcres, 5)).toFixed(2);
  const methaneAvoidedKg = Math.round(yearlyWasteKg * 0.72);

  return (
    <div className="space-y-6">
      {/* Top Banner: The Problem (Slide 02) vs The Impact (Slide 08) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* The Problem (Slide 02) */}
        <div className="bg-gradient-to-br from-rose-950 via-red-950 to-orange-950 text-white rounded-2xl p-6 shadow-md border border-rose-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/30 text-rose-300 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
              Slide 02 • The Crisis in Numbers
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              68+ Million Tonnes
            </h3>
            <p className="text-xs text-rose-200 mt-1">
              Food waste generated annually in India, dumped into landfills or openly burned.
            </p>
          </div>

          <div className="space-y-2 text-xs text-rose-100">
            <div className="flex items-start gap-2 p-2.5 bg-rose-900/40 rounded-xl border border-rose-800/40">
              <span className="text-rose-400 font-bold shrink-0">1.</span>
              <span><strong>Wasted Resource:</strong> Billions of rupees in organic fertility rotting in landfills producing potent methane emissions.</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-rose-900/40 rounded-xl border border-rose-800/40">
              <span className="text-rose-400 font-bold shrink-0">2.</span>
              <span><strong>Soil Depletion:</strong> Excessive chemical fertilizer (Urea/DAP) causing soil organic carbon (SOC) to drop below 0.4%.</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-rose-900/40 rounded-xl border border-rose-800/40">
              <span className="text-rose-400 font-bold shrink-0">3.</span>
              <span><strong>Crushed Margins:</strong> Rising input inflation on synthetic fertilizers squeezing smallholder profits.</span>
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-rose-900/40 rounded-xl border border-rose-800/40">
              <span className="text-rose-400 font-bold shrink-0">4.</span>
              <span><strong>Fragmented Tech:</strong> Siloed, mono-lingual apps leaving average Indian farmers without accessible support.</span>
            </div>
          </div>
        </div>

        {/* The Impact We Create (Slide 08) */}
        <div className="bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 text-white rounded-2xl p-6 shadow-md border border-emerald-800/50 space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/30 text-emerald-300 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Slide 08 • Verified National Impact Targets
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Circular Prosperity
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              Closing the loop creates measurable environmental restoration and farmer wealth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-700/50">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>↓ 40% Chemical Use</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-1">
                Reduction in synthetic fertilizer reliance in pilot clusters within 3 years.
              </p>
            </div>

            <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-700/50">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>↑ 25% Net Income</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-1">
                Net gain through input cost reduction + new organic fertilizer sales.
              </p>
            </div>

            <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-700/50">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Recycle className="w-4 h-4 text-emerald-400" />
                <span>1M+ Tonnes Diverted</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-1">
                Food and mandi waste turned into organic fertilizer instead of landfill greenhouse gases.
              </p>
            </div>

            <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-700/50">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>50,000+ Green Jobs</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-1">
                Rural livelihoods across collection logistics, bio-processing, and sales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Farmer Savings & Soil Carbon Calculator */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Calculator className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-gray-900 text-lg">
                Interactive Farmer Net Income & Soil Carbon Calculator
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Estimate your exact rupee savings, organic compost output, and soil fertility boost.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold font-mono">
            Model: KrishiGreen Agronomic Formula v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            {/* Land acres slider */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-800">Agricultural Land Size:</label>
                <span className="px-2.5 py-0.5 bg-emerald-700 text-white font-bold rounded-lg font-mono text-sm">
                  {landAcres} Acres
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0.5 Acre</span>
                <span>10 Acres</span>
                <span>25 Acres</span>
              </div>
            </div>

            {/* Crop Selector */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <label className="font-bold text-gray-800 block">Primary Crop Cultivated:</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full p-2.5 border rounded-xl bg-white font-semibold text-gray-800"
              >
                <option value="Paddy / Rice">Paddy / Rice (High NPK demand)</option>
                <option value="Wheat">Wheat (Grain cycle)</option>
                <option value="Cotton">Cotton (Soil intensive)</option>
                <option value="Sugarcane">Sugarcane (Heavy feeder)</option>
                <option value="Vegetables & Tomatoes">Vegetables & Tomatoes (Continuous cycle)</option>
                <option value="Orchards / Grapes / Citrus">Orchards / Grapes / Citrus</option>
              </select>
            </div>

            {/* Chemical Spend */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-800">Current Chemical (DAP/Urea) Yearly Spend:</label>
                <span className="font-bold text-gray-900 font-mono text-sm">₹{chemicalSpendYearly.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={chemicalSpendYearly}
                onChange={(e) => setChemicalSpendYearly(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹5,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Waste Available */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-gray-800">Bio-Waste Available Monthly (Kitchen/Mandi/Farm):</label>
                <span className="font-bold text-emerald-800 font-mono text-sm">{wasteKgsMonthly} kg/mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={wasteKgsMonthly}
                onChange={(e) => setWasteKgsMonthly(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>100 kg</span>
                <span>1,500 kg</span>
                <span>3,000 kg</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-green-50/70 p-5 rounded-2xl border border-emerald-100 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                Projected Annual Impact Summary
              </span>
              <h4 className="text-xl font-extrabold text-emerald-950">
                Total Estimated Farmer Net Benefit:
              </h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono">
                  +₹{totalNetBenefit.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  +{netIncomeUpliftPercent}% Net Income Uplift
                </span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[11px] text-gray-500 block">Direct Chemical Input Savings</span>
                <strong className="text-lg font-bold text-green-700 font-mono">
                  ₹{chemicalSavings.toLocaleString('en-IN')}
                </strong>
                <p className="text-[10px] text-gray-500">Replacing 40% synthetic DAP and Urea</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[11px] text-gray-500 block">Organic Fertilizer Yield</span>
                <strong className="text-lg font-bold text-emerald-800 font-mono">
                  {compostYieldKg.toLocaleString('en-IN')} kg
                </strong>
                <p className="text-[10px] text-gray-500">Worth ₹{compostMarketValue.toLocaleString('en-IN')} in input value</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[11px] text-gray-500 block">Soil Organic Carbon (SOC)</span>
                <strong className="text-lg font-bold text-teal-800 font-mono">
                  +{socIncrease}% Rise
                </strong>
                <p className="text-[10px] text-gray-500">Restores beneficial mycorrhizae & worms</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <span className="text-[11px] text-gray-500 block">Landfill Methane Diverted</span>
                <strong className="text-lg font-bold text-emerald-700 font-mono">
                  {methaneAvoidedKg.toLocaleString('en-IN')} kg CO₂e
                </strong>
                <p className="text-[10px] text-gray-500">Eligible for FPO carbon credit pooling</p>
              </div>
            </div>

            {/* Recommendation callout */}
            <div className="p-3.5 bg-emerald-800 text-white rounded-xl text-xs space-y-1">
              <strong className="block font-semibold">Agronomic Recommendation for {cropType}:</strong>
              <p className="text-emerald-100 text-[11px] leading-relaxed">
                Applying {Math.round(compostYieldKg / landAcres)} kg/acre of KrishiGreen cured compost directly improves soil moisture retention by 22%, protecting your {cropType} crop during high summer dry spells while significantly cutting synthetic fertilizer dependency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Environmental Data Visualization using Recharts */}
      <ImpactVisualizer />

      {/* Slide 11: Pilot Plan & Milestones */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
                <Target className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-gray-900 text-base">
                Slide 11 • Ground Pilot Execution Plan
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              "We will not scale until the pilot shows clear, measurable results." (Nashik District Pilot Cluster)
            </p>
          </div>
          <span className="px-2.5 py-1 bg-green-100 text-green-800 font-bold text-xs rounded-full">
            Phase 1: Months 0–4 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Target 1</span>
            <h4 className="font-bold text-gray-900 text-sm">500+ Active Farmers</h4>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-emerald-600 h-full w-[78%]" />
            </div>
            <p className="text-[11px] text-emerald-700 font-mono font-semibold pt-1">
              392 Enrolled (78%)
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Target 2</span>
            <h4 className="font-bold text-gray-900 text-sm">200 Tonnes Waste</h4>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-emerald-600 h-full w-[84%]" />
            </div>
            <p className="text-[11px] text-emerald-700 font-mono font-semibold pt-1">
              168 Tonnes Processed (84%)
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Target 3</span>
            <h4 className="font-bold text-gray-900 text-sm">50+ Product Sellers</h4>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-emerald-600 h-full w-[90%]" />
            </div>
            <p className="text-[11px] text-emerald-700 font-mono font-semibold pt-1">
              45 SHGs / Sellers (90%)
            </p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Target 4</span>
            <h4 className="font-bold text-gray-900 text-sm">KVK & FPO Sync</h4>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
              <div className="bg-emerald-600 h-full w-[100%]" />
            </div>
            <p className="text-[11px] text-green-700 font-mono font-semibold pt-1">
              ✓ MoU Signed & Audited
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
