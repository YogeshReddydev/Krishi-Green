import React from 'react';
import { SupportedLanguage } from '../types';

interface Props { language: SupportedLanguage; }

export const AGAPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-block bg-[#dcfce7] text-[#065f46] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {isTe ? 'ప్రతిపాదిత ఉత్పత్తి' : 'Proposed Product'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          AGA {isTe ? 'సేంద్రీయ ఎరువు' : 'Organic Fertilizer'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'వ్యవసాయ మరియు గృహ సేంద్రీయ వ్యర్థాల నుండి తయారు చేయబడిన కృషి గ్రీన్ సేంద్రీయ ఎరువు.'
            : 'Krishi Green\'s proposed organic fertilizer — made from processed agricultural and household organic waste.'}
        </p>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-5">
        <p className="text-sm text-amber-800">
          <strong>⚠️ {isTe ? 'గమనిక:' : 'Note:'}</strong>{' '}
          {isTe
            ? 'AGA ఒక ప్రతిపాదిత ఉత్పత్తి. పోషక విలువలు, నిర్దిష్ట ఫలితాలు లేదా అధికారిక ధృవీకరణలు ఇంకా పరీక్షలు మరియు నియంత్రణ అనుమతులు పూర్తయిన తర్వాత మాత్రమే ప్రకటించబడతాయి.'
            : 'AGA is a proposed product. Nutrient values, specific agricultural benefits and official certifications will only be stated after testing and regulatory approval are completed. No claims are made here.'}
        </p>
      </div>

      {/* Intended ingredients */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'ఉద్దేశించిన పదార్థాలు' : 'Intended Ingredients'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: isTe ? 'ఆవు పేడ' : 'Cow Dung', note: isTe ? 'సేంద్రీయ కార్బన్ మూలం' : 'Organic carbon source' },
            { name: 'Jeevamrutham', note: isTe ? 'సూక్ష్మజీవుల వృద్ధి ప్రేరకం' : 'Microbial growth activator' },
            { name: isTe ? 'గృహ సేంద్రీయ వ్యర్థాలు' : 'Household Organic Waste', note: isTe ? 'చెత్తను సేకరించి ప్రాసెస్ చేసిన తర్వాత' : 'After proper collection and segregation' },
            { name: isTe ? 'వ్యవసాయ అవశేషాలు' : 'Agricultural Residues', note: isTe ? 'పంట అవశేషాలు' : 'Crop residues where applicable' },
          ].map(({ name, note }) => (
            <div key={name} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 shadow-sm">
              <div className="text-2xl">🌿</div>
              <div>
                <div className="font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{note}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 italic">
          {isTe
            ? '* తుది సూత్రీకరణ పరీక్ష ఫలితాల ఆధారంగా నిర్ణయించబడుతుంది.'
            : '* Final formulation will be determined based on testing outcomes.'}
        </p>
      </section>

      {/* Production workflow */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'ఉత్పత్తి ప్రక్రియ' : 'Production Workflow'}
        </h2>
        <ol className="space-y-3">
          {[
            isTe ? 'సేంద్రీయ వ్యర్థ సేకరణ' : 'Organic waste collection',
            isTe ? 'వేరుచేయడం మరియు నాణ్యత తనిఖీ' : 'Segregation and quality check',
            isTe ? 'కంపోస్టింగ్ / వర్మీకంపోస్టింగ్' : 'Composting / Vermicomposting',
            isTe ? 'జీవమృతం మిశ్రమం' : 'Jeevamrutham blending',
            isTe ? 'ప్రయోగశాల పరీక్ష' : 'Laboratory testing',
            isTe ? 'ప్యాకేజింగ్' : 'Packaging',
            isTe ? 'రైతులకు పంపిణీ' : 'Distribution to farmers',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-gray-700 text-sm pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Batch traceability placeholder */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#065f46]">
          {isTe ? 'బ్యాచ్ ట్రేసబిలిటీ' : 'Batch Traceability'}
        </h2>
        <p className="text-sm text-gray-600">
          {isTe
            ? 'ప్రతి AGA బ్యాచ్‌కు ఒక ప్రత్యేక బ్యాచ్ ID మరియు QR కోడ్ ఉంటుంది. ఉత్పత్తి ప్రారంభమైన తర్వాత బ్యాచ్ రికార్డులు ఇక్కడ కనిపిస్తాయి.'
            : 'Every AGA batch will carry a unique batch ID and QR code. Batch records will appear here once production begins.'}
        </p>
        <div className="text-center py-6 text-gray-400 text-sm">
          {isTe ? 'ఇంకా బ్యాచ్ రికార్డులు లేవు.' : 'No batch records yet.'}
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="text-center space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {isTe ? 'AGA గురించి ఆసక్తి ఉందా?' : 'Interested in AGA?'}
        </h2>
        <p className="text-sm text-gray-500">
          {isTe
            ? 'మరింత సమాచారం కోసం మా సహాయ కేంద్రాన్ని సంప్రదించండి.'
            : 'Contact our support team for more information about availability and pricing.'}
        </p>
        <a
          href="tel:1800-KRISHI-GRN"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold px-6 py-3 rounded-full text-sm transition"
        >
          📞 {isTe ? 'కస్టమర్ సపోర్ట్‌కు కాల్ చేయండి' : 'Call Customer Support'}
        </a>
      </section>
    </main>
  );
};
