import React, { useState } from 'react';
import { SupportedLanguage, ProcessingBatch } from '../../types';
import { UI_TRANSLATIONS } from '../../data/translations';
import { getMultiTranslations } from '../../utils/multiLang';
import {
  IconLeaf,
  IconCheck,
  IconSparkles,
  IconLayers,
  IconPlus,
} from '../../components/Icons';

interface ProcessingFacilityDashboardProps {
  language: SupportedLanguage;
  batches: ProcessingBatch[];
  onAddBatch: (batch: Partial<ProcessingBatch>) => Promise<void>;
  onOpenQR?: (batch: ProcessingBatch) => void;
}

export function ProcessingFacilityDashboard({
  language,
  batches,
  onAddBatch,
  onOpenQR,
}: ProcessingFacilityDashboardProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const [showAddModal, setShowAddModal] = useState(false);
  const [unitName, setUnitName] = useState('Narasaraopet Composting Facility');
  const [processType, setProcessType] = useState<ProcessingBatch['processType']>('Aerobic Windrow');
  const [wasteKg, setWasteKg] = useState(1000);
  const [operatorName, setOperatorName] = useState('Anji Reddy');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddBatch({
        batchNo: `KG-BAT-${Date.now().toString().slice(-5)}`,
        unitName,
        processType,
        inputWasteKg: wasteKg,
        operatorName,
        village: 'Palnadu Rural',
        currentStage: 'Stage 1: Thermophilic Heating',
        stageProgressPercent: 15,
        outputProduct: 'AGA Organic Fertilizer',
        expectedYieldKg: Math.round(wasteKg * 0.45),
        status: 'Fermenting',
      });
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              Processing & Bio-Refining Unit
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Compost Fermentation & AGA Production
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Windrow temperature logs, microbial curing progress, and FCO lab compliance.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-1.5 whitespace-nowrap"
          >
            <IconPlus className="w-4 h-4" />
            <span>Initiate New Batch</span>
          </button>
        </div>
      </div>

      {/* Active Batches Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-gray-900">
          Active Processing Batches ({batches.length})
        </h3>

        {batches.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-xs text-gray-500">
            No active processing batches registered. Click Initiate New Batch above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {batches.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {b.batchNo}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{b.outputProduct}</h4>
                  <p className="text-xs text-gray-500">
                    {b.unitName} • {b.processType}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-600">
                    <span>{b.currentStage}</span>
                    <span className="font-bold font-mono">{b.stageProgressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all"
                      style={{ width: `${b.stageProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Input Waste:</span>
                    <strong className="text-gray-800">{b.inputWasteKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Expected Yield:</span>
                    <strong className="text-emerald-800">{b.expectedYieldKg} kg</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQR && onOpenQR(b)}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <IconLayers className="w-3.5 h-3.5" />
                    <span>Inspect Lab Certificate & QR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 border border-emerald-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900">Initiate New Processing Batch</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Unit Facility Name</label>
                <input
                  type="text"
                  required
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Process Method</label>
                <select
                  value={processType}
                  onChange={(e) => setProcessType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Aerobic Windrow">Aerobic Windrow Composting</option>
                  <option value="Vermi-composting">Vermi-composting</option>
                  <option value="Bio-Enzyme Fermentation">Bio-Enzyme Fermentation</option>
                  <option value="Jeevamrutha Liquid">Jeevamrutha Liquid Production</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Input Waste Quantity (kg)</label>
                <input
                  type="number"
                  required
                  min="100"
                  value={wasteKg}
                  onChange={(e) => setWasteKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Lead Operator Name</label>
                <input
                  type="text"
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow"
                >
                  {isSubmitting ? 'Starting...' : 'Register Batch'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
