import React from 'react';
import { SupportedLanguage } from '../types';

interface Props { language: SupportedLanguage; }

type CarbonStatus =
  | 'Potential Opportunity'
  | 'Preliminary Estimate'
  | 'Activity Monitored'
  | 'Calculation Completed'
  | 'Awaiting Independent Verification'
  | 'Verified Emission Reduction'
  | 'Formally Issued Credits'
  | 'Transferred Credits'
  | 'Retired Credits';

const STATUS_COLORS: Record<CarbonStatus, string> = {
  'Potential Opportunity': 'bg-gray-100 text-gray-700',
  'Preliminary Estimate': 'bg-blue-100 text-blue-800',
  'Activity Monitored': 'bg-amber-100 text-amber-800',
  'Calculation Completed': 'bg-yellow-100 text-yellow-800',
  'Awaiting Independent Verification': 'bg-orange-100 text-orange-800',
  'Verified Emission Reduction': 'bg-teal-100 text-teal-800',
  'Formally Issued Credits': 'bg-green-100 text-green-800',
  'Transferred Credits': 'bg-indigo-100 text-indigo-800',
  'Retired Credits': 'bg-purple-100 text-purple-800',
};

export const CarbonIntegrityPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';

  const statuses: { status: CarbonStatus; label: string; desc: string }[] = [
    { status: 'Potential Opportunity', label: isTe ? 'సాధ్యమైన అవకాశం' : 'Potential Opportunity', desc: isTe ? 'కార్బన్ ప్రాజెక్ట్ సాధ్యత అంచనా మాత్రమే.' : 'Feasibility assessment only — no activity started.' },
    { status: 'Preliminary Estimate', label: isTe ? 'ప్రాథమిక అంచనా' : 'Preliminary Estimate', desc: isTe ? 'తయారీ లెక్కలు — ధృవీకరించబడలేదు.' : 'Indicative calculation — not verified.' },
    { status: 'Activity Monitored', label: isTe ? 'కార్యకలాపం పర్యవేక్షించబడింది' : 'Activity Monitored', desc: isTe ? 'రైతు కార్యకలాపాలు డాక్యుమెంట్ చేయబడ్డాయి.' : 'Farmer activities documented with evidence.' },
    { status: 'Calculation Completed', label: isTe ? 'లెక్కింపు పూర్తయింది' : 'Calculation Completed', desc: isTe ? 'ఎమిషన్ తగ్గింపు లెక్కింపు పూర్తయింది.' : 'Emission reduction calculation completed.' },
    { status: 'Awaiting Independent Verification', label: isTe ? 'స్వతంత్ర ధృవీకరణ కోసం వేచి ఉంది' : 'Awaiting Independent Verification', desc: isTe ? 'ధృవీకరణ ఏజెన్సీకి సమర్పించబడింది.' : 'Submitted to verification agency.' },
    { status: 'Verified Emission Reduction', label: isTe ? 'ధృవీకరించబడిన ఎమిషన్ తగ్గింపు' : 'Verified Emission Reduction', desc: isTe ? 'స్వతంత్ర ధృవీకరణ పూర్తయింది.' : 'Independent verification completed.' },
    { status: 'Formally Issued Credits', label: isTe ? 'అధికారికంగా జారీ చేయబడిన క్రెడిట్లు' : 'Formally Issued Credits', desc: isTe ? 'రిజిస్ట్రీలో జారీ అయిన కార్బన్ క్రెడిట్లు.' : 'Credits formally issued on registry.' },
    { status: 'Transferred Credits', label: isTe ? 'బదిలీ చేయబడిన క్రెడిట్లు' : 'Transferred Credits', desc: isTe ? 'మరొక పార్టీకి బదిలీ చేయబడిన క్రెడిట్లు.' : 'Credits transferred to another party.' },
    { status: 'Retired Credits', label: isTe ? 'రిటైర్ అయిన క్రెడిట్లు' : 'Retired Credits', desc: isTe ? 'క్రెడిట్లు వాడుకోబడ్డాయి — ఇకపై బదిలీ చేయబడవు.' : 'Credits retired — cannot be transferred again.' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'పర్యావరణ ప్రభావ ట్రాకింగ్' : 'Environmental Impact Tracking'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'కార్బన్ క్రెడిట్ ఇంటెగ్రిటీ — ప్రతి దశ పారదర్శకంగా డాక్యుమెంట్ చేయబడుతుంది.'
            : 'Carbon credit integrity — every stage documented transparently. Estimates are never called issued credits.'}
        </p>
      </section>

      {/* Critical disclaimer */}
      <div className="bg-red-50 border border-red-300 rounded-xl p-5">
        <p className="text-sm text-red-800 font-semibold">
          <strong>⚠️ {isTe ? 'ముఖ్యమైన నిరాకరణ:' : 'Important Disclaimer:'}</strong>{' '}
          {isTe
            ? 'ఈ ప్రోటోటైప్‌లో అంచనాలు అధికారికంగా జారీ అయిన కార్బన్ క్రెడిట్లు కావు. మెథడాలజీ కోడ్లు, ఎమిషన్ ఫాక్టర్లు, రిజిస్ట్రీ సీరియల్ నంబర్లు లేదా క్రెడిట్ ధరలు ఇక్కడ కల్పించబడవు.'
            : 'Estimates shown here are NOT formally issued carbon credits. No methodology codes, emission factors, registry serial numbers or credit prices are invented. All values require independent verification before any credit can be claimed.'}
        </p>
      </div>

      {/* Status lifecycle */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'కార్బన్ క్రెడిట్ జీవితచక్రం' : 'Carbon Credit Lifecycle'}
        </h2>
        <div className="space-y-3">
          {statuses.map(({ status, label, desc }, i) => (
            <div key={status} className="flex gap-4 items-start bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-1 ${STATUS_COLORS[status]}`}>
                  {label}
                </span>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What this platform tracks */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'ఈ ప్లాట్‌ఫాం ఏమి ట్రాక్ చేస్తుంది' : 'What This Platform Tracks'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🌱', item: isTe ? 'రైతు కార్యకలాపాల నమోదు' : 'Farmer activity registration' },
            { icon: '📊', item: isTe ? 'వ్యర్థ సేకరణ రికార్డులు' : 'Waste collection records' },
            { icon: '🔬', item: isTe ? 'ప్రాసెసింగ్ సాక్ష్యం' : 'Processing evidence' },
            { icon: '📋', item: isTe ? 'లెక్కింపు పద్దతి ట్రాకింగ్' : 'Calculation methodology tracking' },
            { icon: '✅', item: isTe ? 'ధృవీకరణ స్థితి' : 'Verification status' },
            { icon: '🔒', item: isTe ? 'ఆడిట్ లాగ్లు' : 'Audit logs' },
          ].map(({ icon, item }) => (
            <div key={item} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <span className="text-2xl">{icon}</span>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* No projects yet empty state */}
      <section className="text-center py-12 bg-white border border-dashed border-gray-300 rounded-2xl space-y-3">
        <div className="text-5xl">🌍</div>
        <p className="text-gray-500 text-sm">
          {isTe ? 'ఇంకా కార్బన్ ప్రాజెక్ట్‌లు నమోదు కాలేదు.' : 'No carbon projects registered yet.'}
        </p>
        <p className="text-xs text-gray-400">
          {isTe ? 'ప్రాజెక్ట్‌లు ఆమోదించిన తర్వాత ఇక్కడ కనిపిస్తాయి.' : 'Projects will appear here once approved.'}
        </p>
      </section>

      {/* CSR link */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-6 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#065f46]">
          {isTe ? 'CSR భాగస్వామ్యం' : 'CSR Partnership'}
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          {isTe
            ? 'CSR స్పాన్సర్‌షిప్ కార్బన్ క్రెడిట్ యాజమాన్యాన్ని స్వయంచాలకంగా ఇవ్వదు. ఈ రెండూ వేర్వేరు మార్గాలు.'
            : 'CSR sponsorship does not automatically confer carbon credit ownership. These are separate pathways.'}
        </p>
      </section>
    </main>
  );
};
