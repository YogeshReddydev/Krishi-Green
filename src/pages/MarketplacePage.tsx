import React, { useState } from 'react';
import { SupportedLanguage, OrganicProduct } from '../types';

interface Props {
  language: SupportedLanguage;
  products: OrganicProduct[];
  onAddProduct: (prod: Partial<OrganicProduct>) => Promise<void>;
}

type MarketTab = 'buy' | 'sell';

export const MarketplacePage: React.FC<Props> = ({ language, products, onAddProduct }) => {
  const isTe = language === 'te';
  const [tab, setTab] = useState<MarketTab>('buy');
  const [sellForm, setSellForm] = useState({ name: '', category: 'Solid Fertilizer' as OrganicProduct['category'], pricePerUnit: '', unit: '', description: '', village: '', contactName: '', phone: '' });
  const [selling, setSelling] = useState(false);
  const [sold, setSold] = useState(false);

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelling(true);
    await onAddProduct({
      name: sellForm.name,
      category: sellForm.category,
      pricePerUnit: Number(sellForm.pricePerUnit),
      unit: sellForm.unit,
      description: sellForm.description,
      village: sellForm.village,
      sellerName: sellForm.contactName,
      sellerRole: 'Individual Farmer',
      availableStock: 1,
      batchNo: `FARMER-${Date.now()}`,
      organicCertified: false,
      qrTraceabilityCode: `KG-SELL-${Date.now()}`,
      ingredients: '',
      applicationGuideline: '',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      rating: 0,
      reviewsCount: 0,
    });
    setSelling(false);
    setSold(true);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'కృషి మార్కెట్‌ప్లేస్' : 'Krishi Marketplace'}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {isTe ? 'వ్యవసాయ ఉత్పత్తులను కొనండి మరియు అమ్మండి.' : 'Buy and sell agricultural products directly.'}
        </p>
      </section>

      {/* Prototype notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-sm text-amber-800">
        ⚠️ {isTe
          ? 'ఇది ప్రోటోటైప్. అసలు లావాదేవీలు, ధరలు లేదా స్టాక్ ఇంకా అందుబాటులో లేవు.'
          : 'Prototype: No real transactions, prices or stock exist yet. Listings are for demonstration only.'}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 bg-gray-100 rounded-2xl p-1.5 max-w-sm">
        {([['buy', isTe ? '🛒 కొనండి' : '🛒 Buy'], ['sell', isTe ? '💰 అమ్మండి' : '💰 Sell']] as [MarketTab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition ${tab === t ? 'bg-white shadow text-[#059669]' : 'text-gray-500'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* BUY tab */}
      {tab === 'buy' && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            {isTe ? 'అందుబాటులో ఉన్న ఉత్పత్తులు' : 'Available Products'}
          </h2>
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-white border border-gray-200 rounded-2xl">
              <div className="text-5xl">🌿</div>
              <p className="text-gray-500 text-sm">
                {isTe ? 'ఇంకా ఉత్పత్తులు అందుబాటులో లేవు. మొదటి రైతు జాబితా కోసం నిరీక్షించండి.' : 'No products listed yet. Check back once sellers register.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                  <div className="p-4 space-y-1">
                    <div className="font-bold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.village} · {p.sellerRole}</div>
                    <div className="text-lg font-extrabold text-[#059669]">₹{p.pricePerUnit} / {p.unit}</div>
                    <div className="text-xs text-gray-600 mt-1">{p.description}</div>
                    <a
                      href="tel:1800-KRISHI-GRN"
                      className="mt-3 block text-center bg-[#059669] hover:bg-[#047857] text-white text-sm font-bold py-2 rounded-xl transition"
                    >
                      {isTe ? 'విచారణ చేయండి' : 'Enquire'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SELL tab */}
      {tab === 'sell' && (
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isTe ? 'మీ ఉత్పత్తిని జాబితా చేయండి' : 'List Your Product'}
          </h2>
          {sold ? (
            <div className="text-center py-8 space-y-3">
              <div className="text-5xl">✅</div>
              <p className="font-bold text-[#059669]">{isTe ? 'జాబితా సమర్పించబడింది!' : 'Listing submitted!'}</p>
              <p className="text-sm text-gray-500">
                {isTe ? 'మీ ఉత్పత్తి సమీక్ష కోసం సమర్పించబడింది.' : 'Your product has been submitted for review.'}
              </p>
              <button onClick={() => setSold(false)} className="text-sm text-[#059669] underline">
                {isTe ? 'మరొక జాబితా జోడించండి' : 'Add another listing'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSell} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'ఉత్పత్తి పేరు' : 'Product Name'} *</label>
                <input required type="text" value={sellForm.name} onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'ధర (₹)' : 'Price (₹)'} *</label>
                  <input required type="number" min={1} value={sellForm.pricePerUnit} onChange={(e) => setSellForm({ ...sellForm, pricePerUnit: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'యూనిట్' : 'Unit'} *</label>
                  <input required type="text" value={sellForm.unit} placeholder={isTe ? 'ఉదా: 50 కిలో బ్యాగ్' : 'e.g. 50 kg bag'} onChange={(e) => setSellForm({ ...sellForm, unit: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'వివరణ' : 'Description'}</label>
                <textarea rows={3} value={sellForm.description} onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'గ్రామం' : 'Village'} *</label>
                  <input required type="text" value={sellForm.village} onChange={(e) => setSellForm({ ...sellForm, village: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{isTe ? 'మీ పేరు' : 'Your Name'} *</label>
                  <input required type="text" value={sellForm.contactName} onChange={(e) => setSellForm({ ...sellForm, contactName: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                </div>
              </div>
              <button type="submit" disabled={selling} className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-xl text-base transition disabled:opacity-60">
                {selling ? (isTe ? 'సమర్పిస్తున్నారు...' : 'Submitting...') : (isTe ? 'జాబితా సమర్పించండి' : 'Submit Listing')}
              </button>
            </form>
          )}
        </section>
      )}
    </main>
  );
};
