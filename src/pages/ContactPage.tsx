import React, { useState } from 'react';
import { SupportedLanguage } from '../types';

interface Props { language: SupportedLanguage; onOpenHelpline?: () => void; }

export const ContactPage: React.FC<Props> = ({ language, onOpenHelpline }) => {
  const isTe = language === 'te';
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'సంప్రదింపు & సహాయం' : 'Contact & Support'}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {isTe
            ? 'మీకు సహాయం కావాలంటే మాకు కాల్ చేయండి లేదా మెసేజ్ పంపండి.'
            : 'Need help? Call us directly or send us a message.'}
        </p>
      </section>

      {/* Primary call CTA — preserved helpline */}
      <section className="bg-[#f0fdf4] border border-[#059669] rounded-2xl p-8 text-center space-y-4">
        <div className="text-5xl">📞</div>
        <h2 className="text-2xl font-extrabold text-gray-900">
          {isTe ? 'ఉచిత సహాయ కేంద్రం' : 'Free Customer Support'}
        </h2>
        <p className="text-3xl font-extrabold text-[#059669] tracking-wide">
          1800-KRISHI-GRN
        </p>
        <p className="text-sm text-gray-500">
          {isTe ? '(టోల్-ఫ్రీ)' : '(Toll-free)'}
        </p>
        <a
          href="tel:1800-KRISHI-GRN"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold px-8 py-4 rounded-full text-lg transition shadow-lg"
        >
          📞 {isTe ? 'ఇప్పుడే కాల్ చేయండి' : 'Call Now'}
        </a>
        <p className="text-xs text-gray-400 mt-2">
          {/* Integration point for future LLM voice assistant — do not remove this comment */}
          {isTe
            ? 'గమనిక: ఇప్పుడు లైవ్ ఏజెంట్ సహాయం అందుబాటులో ఉంది. భవిష్యత్తులో వాయిస్ AI సహాయం జోడించబడుతుంది.'
            : 'Note: Live agent support is available. Voice AI assistant integration is planned for a future phase.'}
        </p>
      </section>

      {/* Quick contact options */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '📞', label: isTe ? 'కాల్ చేయండి' : 'Call Us', action: () => onOpenHelpline?.() },
          { icon: '💬', label: isTe ? 'సందేశం పంపండి' : 'Send Message', action: () => {} },
          { icon: '📧', label: isTe ? 'ఇమెయిల్ పంపండి' : 'Email Us', action: () => {} },
        ].map(({ icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:border-[#059669] transition space-y-2"
          >
            <div className="text-3xl">{icon}</div>
            <div className="text-sm font-semibold text-gray-800">{label}</div>
          </button>
        ))}
      </section>

      {/* Message form */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isTe ? 'మెసేజ్ పంపండి' : 'Send a Message'}
        </h2>
        {sent ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-5xl">✅</div>
            <p className="text-sm text-gray-600">
              {isTe ? 'మీ సందేశం పంపబడింది. మేము త్వరలో సంప్రదిస్తాము.' : 'Your message has been sent. We will get back to you shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'మీ పేరు' : 'Your Name'} *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'ఫోన్ నంబర్' : 'Phone Number'} *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'మీ సందేశం' : 'Your Message'} *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-xl text-base transition"
            >
              {isTe ? 'సందేశం పంపండి' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
