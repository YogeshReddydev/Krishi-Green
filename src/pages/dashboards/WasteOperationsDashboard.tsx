import React, { useState } from 'react';
import { SupportedLanguage, WasteCollectionRequest } from '../../types';
import { UI_TRANSLATIONS } from '../../data/translations';
import { getMultiTranslations } from '../../utils/multiLang';
import {
  IconTruck,
  IconShield,
  IconCheck,
  IconPhone,
  IconSparkles,
} from '../../components/Icons';

interface WasteOperationsDashboardProps {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
}

export function WasteOperationsDashboard({
  language,
  wasteRequests,
}: WasteOperationsDashboardProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const [filterType, setFilterType] = useState<string>('All');

  const totalKg = wasteRequests.reduce((sum, r) => sum + (r.estimatedWeightKg || 0), 0);
  const pendingCount = wasteRequests.filter((r) => r.status === 'Pending Pickup').length;

  const filtered = filterType === 'All'
    ? wasteRequests
    : wasteRequests.filter((r) => r.generatorType === filterType);

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              Operations Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Waste Operations & Fleet Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Daily collection manifests, weighbridge slips, and intake queues.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-center">
              <span className="block text-xl font-mono font-bold text-amber-300">
                {(totalKg / 1000).toFixed(1)} MT
              </span>
              <span className="text-[10px] text-emerald-200 uppercase font-semibold">Total Tonnage</span>
            </div>
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-center">
              <span className="block text-xl font-mono font-bold text-emerald-300">
                {pendingCount}
              </span>
              <span className="text-[10px] text-emerald-200 uppercase font-semibold">Pending Pickups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Mandi / Market', 'Household', 'Hotel / Canteen', 'Farm Residue'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              filterType === type
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table of Collection Manifests */}
      <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">
            Live Collection Queue ({filtered.length})
          </h3>
          <span className="text-xs text-gray-500 font-mono">Real-time Firestore Sync</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No collection requests in this view.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-mono uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="p-4">Req ID</th>
                  <th className="p-4">Generator & Waste Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Weight (kg)</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-emerald-50/40 transition">
                    <td className="p-4 font-mono font-bold text-emerald-800">{r.id}</td>
                    <td className="p-4">
                      <strong className="block text-gray-900">{r.wasteType}</strong>
                      <span className="text-gray-500 text-[11px]">{r.generatorType}</span>
                    </td>
                    <td className="p-4 text-gray-700">{r.village}</td>
                    <td className="p-4 font-mono font-bold text-gray-900">{r.estimatedWeightKg} kg</td>
                    <td className="p-4">
                      <span className="block text-gray-900">{r.contactName}</span>
                      <span className="text-gray-500 text-[11px]">{r.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 text-[10px]">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
