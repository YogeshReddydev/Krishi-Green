import React from 'react';
import { SupportedLanguage } from '../../types';
import {
  IconShield,
  IconCheck,
  IconUsers,
  IconLeaf,
  IconTrendingUp,
} from '../../components/Icons';

interface PartnerDashboardProps {
  language: SupportedLanguage;
}

export function PartnerDashboard({ language }: PartnerDashboardProps) {
  const isTe = language === 'te';

  const sponsoredHubs = [
    {
      name: 'Palnadu Rythu Seva CHC Hub (Narasaraopet)',
      sponsoredEquipment: 8,
      farmersImpacted: 320,
      wasteProcessedMT: 45.2,
      fundingStatus: '100% Disbursed (Operational)',
      progress: 92,
    },
    {
      name: 'Chirala Coastal FPO Tool Bank',
      sponsoredEquipment: 5,
      farmersImpacted: 185,
      wasteProcessedMT: 28.6,
      fundingStatus: 'Phase 2 Procurement',
      progress: 68,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
            Institutional Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            CSR Partner & Impact Oversight Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Monitoring rural hub infrastructure, fund utilization, and verified social metrics.
          </p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Farmers Empowered</span>
          <div className="text-2xl font-black text-emerald-950">505 Farmers</div>
          <p className="text-[11px] text-gray-500">Across 2 sponsored rural clusters in Palnadu & Prakasam</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Residue Diverted</span>
          <div className="text-2xl font-black text-emerald-950">73.8 MT</div>
          <p className="text-[11px] text-gray-500">Organic vegetable waste converted to living AGA compost</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-gray-500 font-bold uppercase">Chemical Fertilizer Reduced</span>
          <div className="text-2xl font-black text-emerald-950">~14.5 MT DAP</div>
          <p className="text-[11px] text-gray-500">Direct synthetic input cost savings to smallholders</p>
        </div>
      </div>

      {/* Sponsored Projects Table */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900">
          Sponsored Rural Initiatives & Milestones
        </h3>

        <div className="space-y-4">
          {sponsoredHubs.map((h) => (
            <div key={h.name} className="p-5 rounded-2xl border border-gray-200 bg-[#fbfbf9] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-emerald-950">{h.name}</h4>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {h.fundingStatus}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <span className="text-gray-400 block text-[10px]">Equipment Count:</span>
                  <strong>{h.sponsoredEquipment} Units</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Active Farmers:</span>
                  <strong>{h.farmersImpacted} Rythus</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Compost Processed:</span>
                  <strong>{h.wasteProcessedMT} MT</strong>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Milestone Completion</span>
                  <span className="font-mono font-bold">{h.progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${h.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
