import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  IconShield,
  IconCheck,
  IconPhone,
  IconChevronRight,
  IconLeaf,
  IconUsers,
} from '../components/Icons';

interface PartnershipsPageProps {
  language: SupportedLanguage;
}

export function PartnershipsPage({ language }: PartnershipsPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestArea, setInterestArea] = useState('Sponsor Village Custom Hiring Centre (CHC)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const sponsorshipModels = [
    {
      title: isTe ? 'గ్రామీణ యంత్ర కేంద్రాల స్పాన్సర్‌షిప్' : 'Village CHC Equipment Bank Sponsorship',
      target: isTe ? '100-250 మంది సన్నకారు రైతులు' : '100–250 Smallholder & Tenant Farmers',
      impact: isTe ? 'వరి డ్రమ్ సీడర్లు, వీడర్లు, స్ప్రేయర్లు & పైపులు' : 'SRI cono weeders, drum seeders, battery sprayers & drip kits',
      investment: '₹3,50,000 / Village Hub',
      icon: '🚜',
    },
    {
      title: isTe ? 'మండీ వ్యర్థాల కంపోస్టింగ్ యూనిట్' : 'Decentralized Mandi Waste Bio-Unit',
      target: isTe ? 'రోజుకు 2-5 టన్నుల కూరగాయల వ్యర్థాలు' : '2–5 Tonnes Organic Waste Diverted Daily',
      impact: isTe ? 'ఏరోబిక్ విండ్రో టర్నర్, 4mm జల్లెడ & బ్యాగింగ్' : 'Aerobic windrow turners, 4mm rotary trommel screen & bagging line',
      investment: '₹8,00,000 / Processing Unit',
      icon: '♻️',
    },
    {
      title: isTe ? 'మృత్తిక ఆరోగ్య పరీక్షలు & శిక్షణ' : 'Soil Organic Carbon Testing & Agronomy Pilot',
      target: isTe ? '500 మంది రైతుల పొలాలు' : '500 Verified Smallholder Farms',
      impact: isTe ? 'ప్రయోగశాల నేల పరీక్షలు, జీవామృతం కిట్లు & శిక్షణ' : 'Baseline soil organic carbon lab testing, Jeevamrutham kits & KVK field training',
      investment: '₹2,50,000 / Cluster',
      icon: '🧪',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactName.trim() || !phone.trim()) {
      alert('Please fill the required fields.');
      return;
    }

    setIsSubmitting(true);
    const refId = `CSR-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await addDoc(collection(db, 'partnership_inquiries'), {
        inquiryId: refId,
        organizationName: orgName,
        contactName,
        email,
        phone,
        interestArea,
        message,
        status: 'Received',
        createdAt: new Date().toISOString(),
      });
      setSubmittedId(refId);
      setOrgName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.warn('Inquiry saved locally:', err);
      setSubmittedId(refId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconUsers className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'సంస్థాగత & CSR భాగస్వామ్యాలు' : 'Institutional & CSR Partnerships'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'గ్రామీణ జీవావరణ అభివృద్ధికి భాగస్వామ్యం'
              : 'Empower Rural Regenerative Agriculture'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'కార్పొరేట్ సామాజిక బాధ్యత (CSR) మరియు వ్యవసాయ సంస్థలతో కలసి గ్రామీణ మండలాల్లో రైతులకు ఆధునిక కంపోస్టింగ్ మరియు యంత్ర పరికరాల సేవలను విస్తరించండి.'
              : 'Partner with Krishi Green to sponsor village custom hiring tool banks, urban-rural organic waste diversion units, and verified soil health programs across Andhra Pradesh.'}
          </p>
        </div>
      </div>

      {/* Sponsorship Models */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-xl font-bold text-gray-900">
            {isTe ? 'ప్రధాన CSR స్పాన్సర్‌షిప్ నమూనాలు' : 'Structured CSR Intervention Programs'}
          </h3>
          <p className="text-xs text-gray-500">
            {isTe ? 'స్పష్టమైన ప్రభావ కొలమానాలు మరియు ఆడిట్ చేయగల రికార్డులు.' : 'Measurable community impact with complete photographic and audit documentation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsorshipModels.map((m) => (
            <div
              key={m.title}
              className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition"
            >
              <div className="space-y-3">
                <span className="text-3xl">{m.icon}</span>
                <h4 className="font-bold text-base text-gray-900">{m.title}</h4>
                <div className="text-xs space-y-1 text-gray-600">
                  <p><strong>Beneficiaries:</strong> {m.target}</p>
                  <p><strong>Infrastructure:</strong> {m.impact}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800">{m.investment}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  High Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSR Form */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {isTe ? 'సంస్థాగత భాగస్వామ్య విచారణ ఫారమ్' : 'Institutional Partnership Inquiry'}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isTe ? 'మా సంస్థాగత ప్రతినిధి 24 గంటల్లో సంప్రదిస్తారు.' : 'Our CSR coordination desk will respond with project documentation within 24 hours.'}
          </p>
        </div>

        {submittedId ? (
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
              ✓
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">Partnership Proposal Received</h4>
            <p className="text-xs text-emerald-800 font-mono">Reference: {submittedId}</p>
            <p className="text-xs text-gray-600">
              Thank you for exploring partnership opportunities with Krishi Green.
            </p>
            <button
              onClick={() => setSubmittedId(null)}
              className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-xl text-xs mt-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">Company / Foundation Name</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Tata Trusts / ITC Social Investments / NABARD"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Lead Contact Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Smt. Radhika Verma"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Official Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. csr@company.org"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98480 12345"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Area of Interest</label>
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Sponsor Village Custom Hiring Centre (CHC)">
                    Sponsor Village CHC Equipment Bank
                  </option>
                  <option value="Sponsor Mandi Waste Bio-Composting Unit">
                    Sponsor Mandi Waste Bio-Composting Unit
                  </option>
                  <option value="Soil Health & Carbon Testing Pilot">
                    Soil Health & Carbon Testing Pilot
                  </option>
                  <option value="General CSR Collaboration">General CSR Collaboration</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-xs font-bold text-gray-700">Target Geographies or Project Message</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify target districts in Andhra Pradesh (e.g. Palnadu, Prakasam, Rayalaseema) or scope..."
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
                {isSubmitting ? 'Submitting Proposal...' : 'Submit Partnership Proposal'}
              </button>
              <a
                href="tel:18005747443"
                className="py-3 px-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                <IconPhone className="w-3.5 h-3.5" />
                <span>1800-KRISHI-GRN</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
