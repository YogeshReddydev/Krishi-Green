import React, { useState } from 'react';
import { SupportedLanguage } from '../types';

interface Props { language: SupportedLanguage; }

export const PartnershipsPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';
  const [form, setForm] = useState({ org: '', name: '', phone: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);

  const interestAreas = [
    isTe ? 'యంత్ర కేంద్ర మద్దతు' : 'Equipment Hub Support',
    isTe ? 'వ్యర్థ సేకరణ' : 'Waste Collection Initiative',
    isTe ? 'రైతు మద్దతు' : 'Farmer Support',
    isTe ? 'AGA ఉత్పత్తి' : 'AGA Production',
    isTe ? 'కార్బన్ ప్రాజెక్ట్' : 'Carbon Project Development',
    isTe ? 'స్థిరమైన వ్యవసాయం' : 'Sustainable Farming',
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'CSR & భాగస్వామ్యాలు' : 'CSR & Partnerships'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'కంపెనీలు మరియు సంస్థలు వ్యవసాయ పర్యావరణ వ్యవస్థకు మద్దతు ఇవ్వగలవు.'
            : 'Companies and institutions can support the agricultural ecosystem through documented, evidence-backed partnerships.'}
        </p>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
        ⚠️ {isTe
          ? 'భాగస్వాముల పేర్లు, లోగోలు, సహకారాలు లేదా ఒప్పందాలు వాస్తవ సమాచారం లేకుండా ప్రదర్శించబడవు.'
          : 'No partner names, logos, contributions or agreements are invented or displayed without actual evidence.'}
      </div>

      {/* Support areas */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {isTe ? 'మద్దతు ఇవ్వగల రంగాలు' : 'Areas You Can Support'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🚜', title: isTe ? 'యంత్ర కేంద్రాలు' : 'Equipment Hubs', desc: isTe ? 'CHC కేంద్రాలకు ఫైనాన్స్ చేయండి' : 'Fund Custom Hiring Centres for farmers' },
            { icon: '🗑️', title: isTe ? 'వ్యర్థ సేకరణ' : 'Waste Collection', desc: isTe ? 'సేకరణ మరియు రవాణా మద్దతు' : 'Support collection and transport operations' },
            { icon: '🌱', title: isTe ? 'రైతు మద్దతు' : 'Farmer Support', desc: isTe ? 'రైతుల శిక్షణ మరియు ఇన్‌పుట్స్' : 'Training, inputs and livelihoods support' },
            { icon: '⚗️', title: isTe ? 'AGA ఉత్పత్తి' : 'AGA Production', desc: isTe ? 'ఉత్పత్తి కేంద్రాల స్థాపన' : 'Support processing facility setup' },
            { icon: '🌍', title: isTe ? 'కార్బన్ ప్రాజెక్ట్' : 'Carbon Project', desc: isTe ? 'ధృవీకరణ ఖర్చులకు మద్దతు' : 'Support verification and development costs' },
            { icon: '📊', title: isTe ? 'పర్యవేక్షణ' : 'Monitoring', desc: isTe ? 'ఫీల్డ్ పర్యవేక్షణ మద్దతు' : 'Field monitoring and evidence collection' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="text-3xl">{icon}</div>
              <h3 className="font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we provide */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-[#065f46]">
          {isTe ? 'భాగస్వాములకు మేమిస్తాం' : 'What Partners Receive'}
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {[
            isTe ? 'సాక్ష్యం-ఆధారిత పురోగతి నివేదికలు' : 'Evidence-backed progress reports',
            isTe ? 'ప్రాజెక్ట్ కార్యకలాపాల ఆడిట్ ట్రయల్' : 'Audit trail of project activities',
            isTe ? 'సమాచారం-ఆధారిత ఫీల్డ్ అప్‌డేట్లు' : 'Data-driven field updates',
            isTe ? 'మైలురాళ్ళు మరియు ఫలితాలు' : 'Milestones and documented outcomes',
          ].map((item) => (
            <li key={item} className="flex gap-2 items-start">
              <span className="text-[#059669] font-bold mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 italic mt-2">
          {isTe
            ? 'CSR మద్దతు కార్బన్ క్రెడిట్ యాజమాన్యాన్ని స్వయంచాలకంగా ఇవ్వదు.'
            : 'CSR sponsorship is separate from carbon credit ownership — they are distinct pathways.'}
        </p>
      </section>

      {/* Enquiry form */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isTe ? 'భాగస్వామ్య విచారణ' : 'Partnership Enquiry'}
        </h2>
        {sent ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-5xl">✅</div>
            <p className="font-bold text-[#059669]">{isTe ? 'విచారణ పంపబడింది!' : 'Enquiry sent!'}</p>
            <p className="text-sm text-gray-500">{isTe ? 'మేము త్వరలో సంప్రదిస్తాము.' : 'We will get back to you shortly.'}</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'సంస్థ పేరు' : 'Organisation Name'} *</label>
                <input required type="text" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'సంప్రదింపు పేరు' : 'Contact Name'} *</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'ఫోన్ నంబర్' : 'Phone Number'} *</label>
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'ఆసక్తి రంగం' : 'Area of Interest'}</label>
              <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]">
                <option value="">{isTe ? 'ఎంచుకోండి' : 'Select...'}</option>
                {interestAreas.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'సందేశం' : 'Message'}</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-xl text-base transition">
              {isTe ? 'విచారణ పంపండి' : 'Send Enquiry'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
