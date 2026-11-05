import React from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface Props { language: SupportedLanguage; }

export const AboutPage: React.FC<Props> = ({ language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTe = language === 'te';

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'కృషి గ్రీన్ గురించి' : 'About Krishi Green'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'వ్యవసాయ వ్యర్థాలను సేంద్రీయ సంపదగా మార్చే మిషన్.'
            : 'A mission to turn agricultural waste into organic wealth — connecting farmers, waste sources, and sustainable agriculture.'}
        </p>
      </section>

      {/* Mission */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-8 space-y-3">
        <h2 className="text-xl font-bold text-[#065f46]">
          {isTe ? 'మా లక్ష్యం' : 'Our Mission'}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {isTe
            ? 'కృషి గ్రీన్ వ్యవసాయ మరియు గృహ సేంద్రీయ వ్యర్థాలను సేకరించి, ప్రాసెస్ చేసి, AGA సేంద్రీయ ఎరువుగా మార్చి రైతులకు అందిస్తుంది. ఇది వ్యర్థాలను తగ్గించి, భూసారం పెంచి, రైతు ఆదాయాన్ని మెరుగుపరుస్తుంది.'
            : 'Krishi Green collects organic waste from households, hostels, markets and farms — processes it into AGA organic fertilizer — and distributes it to farmers at affordable prices. This reduces waste, restores soil health and improves farmer incomes.'}
        </p>
      </section>

      {/* Lifecycle overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'వ్యర్థం నుండి సంపద వరకు' : 'Waste to Wealth — The Lifecycle'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { step: '1', label: isTe ? 'వ్యర్థ సేకరణ' : 'Waste Collection', icon: '🗑️' },
            { step: '2', label: isTe ? 'ప్రాసెసింగ్' : 'Processing', icon: '⚙️' },
            { step: '3', label: isTe ? 'AGA ఎరువు' : 'AGA Fertilizer', icon: '🌱' },
            { step: '4', label: isTe ? 'రైతు పంపిణీ' : 'Farmer Distribution', icon: '🚜' },
          ].map(({ step, label, icon }) => (
            <div key={step} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-xs font-bold text-[#059669] mb-1">STEP {step}</div>
              <div className="text-sm font-semibold text-gray-800">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Prototype notice */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p className="text-sm text-amber-800 font-medium">
          <span className="font-bold">⚠️ {isTe ? 'ముఖ్యమైన గమనిక:' : 'Important Notice:'}</span>{' '}
          {isTe
            ? 'ఇది ఒక ప్రోటోటైప్. ఇక్కడ చూపించే డేటా ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే. అసలు కార్యకలాపాలు, ధృవీకరించబడిన రైతులు లేదా పూర్తయిన లావాదేవీలు ఇంకా లేవు.'
            : 'This is a prototype. Data shown is for demonstration purposes only. No actual operations, verified farmers or completed transactions exist yet.'}
        </p>
      </section>

      {/* Team placeholder */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'బృందం' : 'The Team'}
        </h2>
        <p className="text-gray-500 text-sm italic">
          {isTe
            ? 'బృంద వివరాలు వాస్తవ సభ్యుల సమ్మతితో జోడించబడతాయి.'
            : 'Team details will be added with actual member consent.'}
        </p>
      </section>
    </main>
  );
};
