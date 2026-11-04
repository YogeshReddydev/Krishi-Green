import React, { useState } from 'react';
import { SupportedLanguage, SupportTicket } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  IconPhone,
  IconCheck,
  IconShield,
  IconSparkles,
  IconUsers,
} from '../components/Icons';

interface ContactPageProps {
  language: SupportedLanguage;
  tickets?: SupportTicket[];
  onTicketCreated?: (ticket: SupportTicket) => void;
}

export function ContactPage({ language, tickets = [], onTicketCreated }: ContactPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [callerName, setCallerName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Crop Advice');
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerName.trim() || !phone.trim() || !query.trim()) {
      alert('Please fill the required fields.');
      return;
    }

    setIsSubmitting(true);
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      callerName,
      phone,
      language: language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English',
      category,
      query,
      status: 'Open',
      createdAt: new Date().toISOString(),
      priority: 'Normal',
    };

    try {
      await addDoc(collection(db, 'support_tickets'), newTicket);
      if (onTicketCreated) onTicketCreated(newTicket);
      setSuccessTicketId(newTicket.id);
      setCallerName('');
      setPhone('');
      setQuery('');
    } catch (err) {
      console.warn('Ticket saved locally:', err);
      if (onTicketCreated) onTicketCreated(newTicket);
      setSuccessTicketId(newTicket.id);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconPhone className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'రైతు సహాయ కేంద్రం' : 'Farmer Support & Contact'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'మేము మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాము'
              : 'We Are Here to Support Every Farmer'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'వ్యర్థాల సేకరణ, AGA సేంద్రీయ ఎరువుల సరఫరా లేదా యంత్ర పరికరాల అద్దెకు సంబంధించి ఏదైనా సందేహం ఉంటే నేరుగా మా టోల్-ఫ్రీ నంబర్‌కు కాల్ చేయండి లేదా మీ ప్రశ్నను నమోదు చేయండి.'
              : 'Direct customer service helpline for organic waste pickups, AGA fertilizer distribution, CHC equipment dispatch, and agricultural advisory across Andhra Pradesh.'}
          </p>
        </div>
      </div>

      {/* Main Calling Box */}
      <div className="bg-amber-400 text-emerald-950 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-300">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-wider font-mono text-emerald-900 bg-amber-300 px-2.5 py-0.5 rounded">
            Toll-Free Helpline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">1800-KRISHI-GRN</h2>
          <p className="text-xs sm:text-sm font-semibold text-emerald-900">
            (1800-574-7443) • {isTe ? 'ఉచిత కాల్ • ఉదయం 7:00 నుండి రాత్రి 8:00 వరకు' : 'Toll-free • Mon–Sat 7:00 AM – 8:00 PM IST'}
          </p>
        </div>

        <a
          href="tel:18005747443"
          className="px-8 py-4 bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold rounded-2xl text-base shadow-lg transition flex items-center gap-2 whitespace-nowrap active:scale-98"
        >
          <IconPhone className="w-5 h-5 text-amber-300 animate-bounce" />
          <span>{isTe ? 'ఇప్పుడే కాల్ చేయండి' : 'Call 1800-KRISHI-GRN'}</span>
        </a>
      </div>

      {/* Location & Emergency Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <span>📍</span>
            <span>{isTe ? 'కార్యాలయం & డెమో కేంద్రం' : 'Innovation Hub & Demonstration Center'}</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Krishi Green Agritech Demonstration Center</strong><br />
            Subbaiah Thota, Near Old Agricultural Market Yard<br />
            Narasaraopet, Palnadu District, Andhra Pradesh — 522601<br />
            Email: <span className="text-emerald-800 font-semibold">support@krishigreen.in</span>
          </p>
          <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900">
            {isTe
              ? 'రైతులు మరియు వ్యవసాయ విద్యార్థులు క్షేత్ర సందర్శన కోసం రావచ్చు.'
              : 'Open for farmer group visits, soil testing consultations, and equipment demonstrations.'}
          </div>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <span>🚨</span>
            <span>{isTe ? 'ప్రభుత్వ అత్యవసర వ్యవసాయ హెల్ప్‌లైన్లు' : 'Government Emergency Helplines'}</span>
          </h3>
          <ul className="text-xs space-y-2 text-gray-700">
            <li className="flex justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <span>Kisan Call Center (Central Govt):</span>
              <a href="tel:1551" className="font-bold text-emerald-800">1551</a>
            </li>
            <li className="flex justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <span>AP Agriculture Dept Farmer Helpline:</span>
              <a href="tel:1907" className="font-bold text-emerald-800">1907</a>
            </li>
            <li className="flex justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <span>Disaster & Crop Loss Relief Cell:</span>
              <a href="tel:1070" className="font-bold text-emerald-800">1070</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Submit Support Ticket Form */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {isTe ? 'ఆన్‌లైన్ మద్దతు అభ్యర్థన నమోదు' : 'Log a Support or Advisory Request'}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isTe ? 'మీ సందేహాన్ని ఇక్కడ నమోదు చేయండి. మా అగ్రికల్చర్ ఆఫీసర్ సంప్రదిస్తారు.' : 'Submit your query below. An extension specialist will review your request.'}
          </p>
        </div>

        {successTicketId ? (
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              ✓
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">
              {isTe ? 'మద్దతు టికెట్ విజయవంతంగా నమోదైంది!' : 'Support Request Submitted!'}
            </h4>
            <p className="text-xs text-emerald-800 font-mono">Ticket ID: {successTicketId}</p>
            <p className="text-xs text-gray-600">
              Our support team will contact you shortly on your provided phone number.
            </p>
            <button
              onClick={() => setSuccessTicketId(null)}
              className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs mt-2"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Your Name</label>
                <input
                  type="text"
                  required
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="e.g. Siva Reddy"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98480 12345"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Query Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Crop Advice">Crop Advice</option>
                  <option value="Waste Collection">Waste Collection</option>
                  <option value="Equipment Breakdown">Equipment Booking / Breakdown</option>
                  <option value="Mandi Prices">Mandi Prices</option>
                  <option value="Government Subsidy">Government Subsidy</option>
                  <option value="Pest Emergency">Pest Emergency</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-xs font-bold text-gray-700">Describe Your Query or Field Issue</label>
                <textarea
                  rows={3}
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your crop condition, fertilizer requirement, or waste collection location..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Support Ticket'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
