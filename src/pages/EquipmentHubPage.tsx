import React, { useState } from 'react';
import { SupportedLanguage, EquipmentItem } from '../types';
import { DEMO_EQUIPMENT_HUBS } from '../data/mockData';

interface Props { language: SupportedLanguage; }

export const EquipmentHubPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';
  const [selected, setSelected] = useState<EquipmentItem | null>(null);

  const categories = ['All', 'Tractor', 'Paddy Transplanter', 'Harvester', 'Rotavator', 'Seed Drill'];
  const [catFilter, setCatFilter] = useState('All');

  const shown = catFilter === 'All' ? DEMO_EQUIPMENT_HUBS : DEMO_EQUIPMENT_HUBS.filter((e) => e.category === catFilter);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'దగ్గరలో వ్యవసాయ యంత్రాలు కనుగొనండి' : 'Find Farming Equipment Near You'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'ట్రాక్టర్లు, హార్వెస్టర్లు, నాట్లు మెషీన్లు మరియు మరిన్ని — మీ గ్రామానికి దగ్గర.'
            : 'Tractors, harvesters, transplanters and more — available near your village.'}
        </p>
      </section>

      {/* Demo notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl px-5 py-4 text-sm text-amber-900 font-medium">
        ⚠️ {isTe
          ? 'ఈ పేజీలో చూపించిన హబ్‌లు డెమో ప్రయోజనాల కోసం మాత్రమే. ఇవి ధృవీకరించబడిన కార్యకలాప కేంద్రాలు కావు.'
          : 'Locations shown are DEMO records for prototype purposes only. These are NOT verified operating facilities. Do not treat them as real bookable services.'}
      </div>

      {/* Location selector placeholder */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-gray-700">
          {isTe ? 'మీ స్థానాన్ని ఎంచుకోండి' : 'Select Your Location'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]">
            <option>{isTe ? 'జిల్లా ఎంచుకోండి' : 'Select District'}</option>
            <option>Guntur</option><option>Krishna</option><option>Palnadu</option>
            <option>Prakasam</option><option>Kurnool</option><option>East Godavari</option>
          </select>
          <select className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]">
            <option>{isTe ? 'మండలం ఎంచుకోండి' : 'Select Mandal'}</option>
          </select>
        </div>
        <p className="text-xs text-gray-400">
          {isTe ? 'లొకేషన్ అనుమతి ఉంటే స్వయంచాలకంగా మీ దగ్గరి కేంద్రాలు చూపించబడతాయి.' : 'With location permission, nearby hubs are shown automatically.'}
        </p>
      </section>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition
              ${catFilter === c ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Equipment cards */}
      {shown.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white border border-dashed border-gray-300 rounded-2xl">
          <div className="text-5xl">🚜</div>
          <p className="text-gray-500 text-sm">
            {isTe ? 'ఈ వర్గంలో ఇంకా యంత్రాలు లేవు.' : 'No equipment in this category yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {shown.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-amber-200 rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
              onClick={() => setSelected(item)}
            >
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
                <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-full uppercase">
                  DEMO ONLY
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-xs text-amber-700 font-semibold">{item.centerName}</div>
                <div className="text-xs text-gray-500">{item.location}</div>
                <div className="text-sm font-bold text-[#059669]">
                  {isTe ? 'అద్దె:' : 'Rent:'} ₹{item.rentPricePerDay}/day
                </div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register hub CTA */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-6 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#065f46]">
          {isTe ? 'మీ యంత్ర కేంద్రాన్ని నమోదు చేయండి' : 'Register Your Equipment Hub'}
        </h2>
        <p className="text-sm text-gray-600">
          {isTe
            ? 'మీకు CHC లేదా యంత్ర సేవలు ఉంటే, మాతో భాగస్వామ్యం కండి.'
            : 'If you operate a Custom Hiring Centre or equipment service, partner with us.'}
        </p>
        <a
          href="tel:1800-KRISHI-GRN"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold px-6 py-3 rounded-full text-sm transition"
        >
          📞 {isTe ? 'సంప్రదించండి' : 'Contact Us'}
        </a>
      </section>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-amber-100 border border-amber-300 rounded-xl px-4 py-2 text-xs text-amber-800 font-bold">
              ⚠️ DEMO RECORD — NOT A VERIFIED OPERATING FACILITY
            </div>
            <img src={selected.image} alt={selected.name} className="w-full h-44 object-cover rounded-xl" />
            <h3 className="text-xl font-extrabold text-gray-900">{selected.name}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>{isTe ? 'కేంద్రం:' : 'Hub:'}</strong> {selected.centerName}</div>
              <div><strong>{isTe ? 'స్థానం:' : 'Location:'}</strong> {selected.location}</div>
              <div><strong>{isTe ? 'అద్దె (రోజుకు):' : 'Rent/day:'}</strong> ₹{selected.rentPricePerDay} (DEMO)</div>
              <div><strong>{isTe ? 'సబ్సిడీ:' : 'Subsidy:'}</strong> {selected.subsidySchemeName} ({selected.subsidyPercentage}%)</div>
              <div className="text-amber-700 font-semibold text-xs mt-2">{isTe ? 'ఫోన్: DEMO మాత్రమే — అసలు నంబర్ కాదు' : 'Phone: DEMO ONLY — not a real number'}</div>
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl text-sm transition">
              {isTe ? 'మూసివేయండి' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
