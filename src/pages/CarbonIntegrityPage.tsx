import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { CARBON_METHODOLOGIES } from '../data/apPilotData';
import { CarbonEngineSection } from '../components/CarbonEngineSection';
import {
  IconLeaf,
  IconShield,
  IconCheck,
  IconPhone,
  IconSparkles,
  IconTrendingUp,
} from '../components/Icons';

interface CarbonIntegrityPageProps {
  language: SupportedLanguage;
}

export function CarbonIntegrityPage({ language }: CarbonIntegrityPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'lifecycle' | 'standards' | 'calculator'>('lifecycle');

  const nineStages = [
    {
      num: 1,
      name: isTe ? 'బేస్‌లైన్ అసెస్‌మెంట్' : 'Baseline Assessment',
      sub: isTe ? 'ప్రస్తుత కర్బన ఉద్గారాల లెక్కింపు' : 'Historical emissions baseline & open dump surveys',
      status: 'Verified Methodology',
    },
    {
      num: 2,
      name: isTe ? 'రైతు సమూహాల చేరిక' : 'Farmer Cluster Onboarding',
      sub: isTe ? 'FPOలు & గ్రామీణ రైతుల నమోదు' : 'Consent, land boundary polygons, and FPO aggregation',
      status: 'Digital Onboarding',
    },
    {
      num: 3,
      name: isTe ? 'సహజ సేద్య పద్ధతులు' : 'Sustainable Practices',
      sub: isTe ? 'ఏరోబిక్ కంపోస్టింగ్, AWD & గడ్డి ముక్కలు' : 'Aerobic windrow composting, AWD paddy, residue mulching',
      status: 'Field Implementation',
    },
    {
      num: 4,
      name: isTe ? 'డిజిటల్ సాక్ష్యాల సేకరణ' : 'Digital Evidence Capture',
      sub: isTe ? 'వేబ్రిడ్జ్ రికార్డులు, GPS & ఉష్ణోగ్రత లాగ్‌లు' : 'Weighbridge slips, moisture readings, and windrow temperatures',
      status: 'Immutable Data Log',
    },
    {
      num: 5,
      name: isTe ? 'MRV శాస్త్రీయ లెక్కింపు' : 'MRV Accounting',
      sub: isTe ? 'మీథేన్ నివారణ & నికర tCO2e గణన' : 'Methane avoidance calculation minus buffer pool (10%)',
      status: 'Pre-Audit Estimate',
    },
    {
      num: 6,
      name: isTe ? 'స్వతంత్ర ఆడిట్ (VVB)' : 'Independent Audit (VVB)',
      sub: isTe ? 'అధీకృత ఏజెన్సీ ద్వారా ఫీల్డ్ తనిఖీ' : 'Accredited third-party validation & verification body review',
      status: 'Rigorous Verification',
    },
    {
      num: 7,
      name: isTe ? 'క్రెడిట్ జారీ (BEE / CCTS)' : 'Credit Issuance',
      sub: isTe ? 'అధికారిక క్రెడిట్ల రిజిస్ట్రీ ఎంట్రీ' : 'Serial number generation in carbon registry ledger',
      status: 'Verified Carbon Credit',
    },
    {
      num: 8,
      name: isTe ? 'మార్కెట్ లిస్టింగ్' : 'Offtake Listing',
      sub: isTe ? 'బాధ్యతాయుత కార్పొరేట్ కొనుగోలు' : 'Compliance & voluntary carbon buyers transaction',
      status: 'Transparent Trade',
    },
    {
      num: 9,
      name: isTe ? '70% రైతు DBT జమ' : '70% Direct Farmer DBT',
      sub: isTe ? 'రైతుల బ్యాంక్ ఖాతాలకు నేరుగా నగదు బదిలీ' : 'Direct benefit transfer credited to participating farmers',
      status: 'Direct Farmer Benefit',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconShield className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'కర్బన విశ్వసనీయత & సమగ్రత' : isHi ? 'कार्बन सत्यनिष्ठा एवं पारदर्शी मानक' : 'Carbon Integrity & Standards'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'పర్యావరణ ప్రభావ పర్యవేక్షణ & నిజమైన రికార్డులు'
              : isHi
              ? 'पर्यावरणीय प्रभाव निगरानी एवं 70% किसान लाभ'
              : 'Environmental Impact & Carbon Integrity'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'అంచనాలు వేరు — ధ్రువీకరించబడిన క్రెడిట్‌లు వేరు. కృషి గ్రీన్ 9-దశల శాస్త్రీయ పద్ధతి ద్వారా మాత్రమే క్రెడిట్‌లను లెక్కిస్తుంది. 70% విలువ నేరుగా రైతులకు చేరుతుంది.'
              : 'Strict separation of carbon estimates from verified issued credits. Grounded in Bureau of Energy Efficiency (BEE) and Indian Carbon Market (ICM) methodologies.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'lifecycle', label: isTe ? '9-దశల ప్రాజెక్ట్ చక్రం' : '9-Stage Carbon Lifecycle' },
              { id: 'standards', label: isTe ? 'ICM శాస్త్రీయ ప్రమాణాలు' : 'ICM Methodologies' },
              { id: 'calculator', label: isTe ? 'ప్రత్యక్ష కాలిక్యులేటర్' : 'Carbon Engine & DBT Simulator' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-950 shadow'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSR vs Credit Ownership Disclosure */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
            <span>⚖️</span>
            <span>
              {isTe
                ? 'ముఖ్య నిబంధన: CSR స్పాన్సర్‌షిప్ ≠ కార్బన్ క్రెడిట్ యాజమాన్యం'
                : 'Core Principle: CSR Sponsorship Does NOT Equal Carbon Credit Ownership'}
            </span>
          </h4>
          <p className="text-xs text-emerald-900/90 max-w-2xl leading-relaxed">
            {isTe
              ? 'సంస్థలు మరియు CSR భాగస్వాములు పరికరాల హబ్‌లు లేదా కంపోస్టింగ్ యూనిట్లను స్పాన్సర్ చేయవచ్చు. అయితే, ఉత్పత్తి చేయబడిన కార్బన్ క్రెడిట్ల ప్రయోజనం 70% ఎల్లప్పుడూ క్షేత్రస్థాయి రైతులకు మాత్రమే చెందుతుంది.'
              : 'Institutional CSR funds sponsor village equipment banks and infrastructure without claiming carbon credit offsets. Carbon offsets remain registered to participating farmer groups with 70% proceeds disbursed via direct benefit transfer.'}
          </p>
        </div>
        <div className="shrink-0 p-3 bg-white rounded-xl border border-emerald-200 text-center">
          <span className="block font-black text-xl text-emerald-800">70%</span>
          <span className="text-[10px] text-gray-600 font-bold uppercase">Farmer Pool DBT</span>
        </div>
      </div>

      {/* TAB 1: 9-STAGE LIFECYCLE */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              {isTe ? '9-దశల శాస్త్రీయ కర్బన ప్రక్రియ' : 'The 9-Stage Carbon Verification Lifecycle'}
            </h3>
            <p className="text-xs text-gray-500">
              {isTe ? 'ప్రతి దశలోనూ నిజమైన డిజిటల్ సాక్ష్యాలు మాత్రమే నమోదవుతాయి.' : 'From baseline field data to transparent direct farmer payout.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nineStages.map((s) => (
              <div
                key={s.num}
                className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold font-mono text-xs flex items-center justify-center">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {s.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{s.name}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: METHODOLOGIES */}
      {activeTab === 'standards' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARBON_METHODOLOGIES.map((m) => (
              <div
                key={m.code}
                className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {m.code}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{m.baselineEmissionFactorTCO2e} tCO2e/t</span>
                </div>

                <h4 className="font-bold text-gray-900 text-base">{m.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{m.description}</p>

                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <span className="text-[11px] font-bold text-gray-700 block">Eligible Practices:</span>
                  <ul className="text-xs space-y-1 text-gray-600">
                    {m.eligiblePractices.map((ep) => (
                      <li key={ep} className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{ep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-4">
          <CarbonEngineSection language={language} />
        </div>
      )}
    </div>
  );
}
