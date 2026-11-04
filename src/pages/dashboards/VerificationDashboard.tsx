import React, { useState } from 'react';
import { SupportedLanguage } from '../../types';
import {
  IconShield,
  IconCheck,
  IconLayers,
} from '../../components/Icons';

interface VerificationDashboardProps {
  language: SupportedLanguage;
}

export function VerificationDashboard({ language }: VerificationDashboardProps) {
  const [checklist, setChecklist] = useState([
    {
      id: 'MRV-01',
      title: 'Weighbridge Digital Calibration Log',
      agency: 'Palnadu District Weights & Measures Dept',
      status: 'Passed (Audit Verified)',
      checked: true,
    },
    {
      id: 'MRV-02',
      title: 'Thermophilic Curing Temperature Record (55°C+ for 14 Days)',
      agency: 'Internal Telemetry Sensor Log',
      status: 'Compliant (Thermal Inactivation)',
      checked: true,
    },
    {
      id: 'MRV-03',
      title: 'FCO 1985 Chemical & Heavy Metal Lab Analysis',
      agency: 'Regional Fertilizer Control Testing Lab',
      status: 'Passed (Zero Heavy Metals)',
      checked: true,
    },
    {
      id: 'MRV-04',
      title: 'Farmer Direct Benefit Transfer (70% Pool DBT Agreement)',
      agency: 'Participating FPO Rythu Committee',
      status: 'Signed & Deposited',
      checked: true,
    },
    {
      id: 'MRV-05',
      title: 'BEE / Indian Carbon Market (ICM) Registry Eligibility Review',
      agency: 'Accredited Carbon VVB Independent Auditor',
      status: 'Under Annual Review',
      checked: false,
    },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
            MRV & Carbon Audit Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Independent Verification & Regulatory Compliance
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Audit evidence review, weighbridge calibration, temperature logs, and FCO lab sign-offs.
          </p>
        </div>
      </div>

      {/* Audit Checklist */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-base text-gray-900">
            MRV Protocol Verification Checklist
          </h3>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-bold">
            {checklist.filter((c) => c.checked).length} / {checklist.length} Verified
          </span>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="p-4 rounded-2xl border border-gray-200 bg-[#fbfbf9] hover:bg-emerald-50/50 cursor-pointer transition flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="mt-1 w-4 h-4 accent-emerald-600 rounded"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {item.id}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Auditing Authority: {item.agency}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  item.checked
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
