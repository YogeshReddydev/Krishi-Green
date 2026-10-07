import React, { useState } from 'react';
import {
  FileCheck2,
  Building2,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { GOVERNMENT_SCHEMES } from '../data/mockData';
import { SupportedLanguage } from '../types';

interface SchemeNavigatorProps {
  language: SupportedLanguage;
}

export const SchemeNavigator: React.FC<SchemeNavigatorProps> = ({ language }) => {
  const [selectedScheme, setSelectedScheme] = useState<string>(GOVERNMENT_SCHEMES[0].id);
  const [beneficiaryFilter, setBeneficiaryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeScheme = GOVERNMENT_SCHEMES.find((s) => s.id === selectedScheme) || GOVERNMENT_SCHEMES[0];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Government Policy Navigator & Subsidies
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Central & State Agro Subsidies Navigator
            </h2>
            <p className="text-xs text-gray-500">
              Access up to 50% equipment subsidies and organic input grants under PM-PRANAM, PKVY, SMAM, and GOBARdhan.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name or code..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Scheme Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pt-4 pb-1">
          {filteredSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setSelectedScheme(scheme.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                selectedScheme === scheme.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-emerald-300" />
              <span>{scheme.shortCode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Detail Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {activeScheme.shortCode}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {activeScheme.name}
            </h3>
            <p className="text-xs text-gray-500 italic font-medium">{activeScheme.tagline}</p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-right shrink-0">
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Subsidy & Assistance</span>
            <span className="text-sm font-extrabold text-emerald-900 block mt-0.5">
              {activeScheme.subsidyRange}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          {activeScheme.description}
        </p>

        {/* Key Benefits & Eligibility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Benefits for Farmers
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {activeScheme.keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" /> Eligibility Criteria
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {activeScheme.eligibility.map((el, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action callout */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <strong className="text-emerald-950 font-bold text-sm block">
              KrishiGreen FPO Direct Application Assistance
            </strong>
            <p className="text-emerald-800 text-[11px]">
              Our village extension agents help smallholders prepare 7/12 land records, Aadhaar DBT linkage, and FCO compost testing certificates for this scheme.
            </p>
          </div>

          <a
            href={activeScheme.applicationPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
