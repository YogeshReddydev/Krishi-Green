import React, { useState } from 'react';
import { SupportedLanguage, OrganicProduct } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import {
  IconLeaf,
  IconCheck,
  IconShield,
  IconSparkles,
  IconPlus,
  IconPhone,
  IconLayers,
  IconChevronRight,
} from '../components/Icons';

interface MarketplacePageProps {
  language: SupportedLanguage;
  products: OrganicProduct[];
  onAddProduct: (prod: Partial<OrganicProduct>) => Promise<void>;
  onOpenQR?: (prod: OrganicProduct) => void;
}

export function MarketplacePage({
  language,
  products,
  onAddProduct,
  onOpenQR,
}: MarketplacePageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [activeSection, setActiveSection] = useState<'buy' | 'sell'>('buy');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sell Form States
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<OrganicProduct['category']>('Solid Fertilizer');
  const [price, setPrice] = useState<number>(350);
  const [unit, setUnit] = useState('50 kg bag');
  const [sellerName, setSellerName] = useState('');
  const [sellerRole, setSellerRole] = useState<OrganicProduct['sellerRole']>('Individual Farmer');
  const [village, setVillage] = useState('Narasaraopet');
  const [stock, setStock] = useState<number>(50);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  // Filtered Products
  const categories = ['All', 'Solid Fertilizer', 'Liquid Bio-Stimulant', 'Plant Kit', 'Natural Pest Solution'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !sellerName.trim()) {
      alert(isTe ? 'దయచేసి ఉత్పత్తి పేరు మరియు విక్రేత పేరు నమోదు చేయండి' : 'Please fill required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddProduct({
        name: prodName,
        category: prodCategory,
        pricePerUnit: price,
        unit,
        sellerName,
        sellerRole,
        village,
        availableStock: stock,
        description: description || 'High-grade organic farm input produced locally.',
        batchNo: `KG-LOT-${Date.now().toString().slice(-4)}`,
        organicCertified: true,
      });

      setSuccessNote(
        isTe
          ? 'మీ ఉత్పత్తి విజయవంతంగా మార్కెట్‌ప్లేస్‌లో జాబితా చేయబడింది!'
          : 'Your product has been listed successfully in the Krishi Green Marketplace!'
      );
      setProdName('');
      setSellerName('');
      setDescription('');
      setActiveSection('buy');
    } catch (err) {
      console.error('Error adding product:', err);
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
            <IconLeaf className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'రైతు మార్కెట్‌ప్లేస్' : isHi ? 'किसान जैविक बाज़ार' : 'Unified Farmer Marketplace'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'కొనుగోలు & అమ్మకం మార్కెట్'
              : isHi
              ? 'जैविक उत्पाद: क्रय एवं विक्रय'
              : 'Buy & Sell Organic Inputs & Produce'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'రైతుల కోసం ఒకే సమగ్ర వేదిక. నాణ్యమైన సేంద్రీయ ఎరువులు కొనండి లేదా మీ స్వంత గ్రామీణ ఉత్పత్తులను నేరుగా విక్రయించండి.'
              : 'Direct peer connection for certified organic inputs, AGA bio-fertilizer, vermicompost, and natural crop outputs.'}
          </p>

          {/* Clean 2-Section Switcher: BUY vs SELL */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveSection('buy')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                activeSection === 'buy'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
              }`}
            >
              <span>🛒</span>
              <span>{isTe ? 'కొనుగోలు (BUY)' : isHi ? 'खरीदें (BUY)' : 'BUY (Browse Catalog)'}</span>
            </button>
            <button
              onClick={() => setActiveSection('sell')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                activeSection === 'sell'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
              }`}
            >
              <span>🏷️</span>
              <span>{isTe ? 'అమ్మండి (SELL)' : isHi ? 'बेचें (SELL)' : 'SELL (List Products)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {successNote && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-900">
          <span>✓ {successNote}</span>
          <button onClick={() => setSuccessNote(null)} className="text-emerald-700">✕</button>
        </div>
      )}

      {/* SECTION 1: BUY */}
      {activeSection === 'buy' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === c
                      ? 'bg-emerald-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c === 'All' ? (isTe ? 'అన్నీ' : 'All') : c}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder={isTe ? 'ఉత్పత్తి లేదా గ్రామం వెతకండి...' : 'Search product or village...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 bg-emerald-900/10 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 bg-emerald-800/90 text-white font-mono text-[11px] font-bold rounded-md backdrop-blur-xs">
                        {p.category}
                      </span>
                    </div>
                    {p.isFlagship && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 bg-amber-400 text-emerald-950 font-bold text-[10px] rounded uppercase tracking-wider">
                          Flagship Formula
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-800 transition">
                        {p.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1 text-emerald-800 font-extrabold text-lg">
                      <span>₹{p.pricePerUnit}</span>
                      <span className="text-xs text-gray-500 font-normal">/ {p.unit}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{p.sellerName} ({p.sellerRole})</span>
                      <span>📍 {p.village}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => onOpenQR && onOpenQR(p)}
                    className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <IconLayers className="w-3.5 h-3.5" />
                    <span>{isTe ? 'QR రికార్డు' : 'Trace QR'}</span>
                  </button>
                  <a
                    href="tel:18005747443"
                    className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1"
                  >
                    <IconPhone className="w-3.5 h-3.5" />
                    <span>{isTe ? 'ఆర్డర్ చేయండి' : 'Order'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: SELL */}
      {activeSection === 'sell' && (
        <div className="bg-white border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {isTe ? 'మీ ఉత్పత్తిని మార్కెట్‌లో జాబితా చేయండి' : isHi ? 'उत्पाद बिक्री प्रपत्र' : 'List Your Organic Produce or Compost'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isTe
                ? 'రైతులు, మహిళా స్వయం సహాయక సంఘాలు (SHG) మరియు FPOలు తమ ఉత్పత్తులను ఉచితంగా జాబితా చేయవచ్చు.'
                : 'Direct listing for smallholder farmers, women self-help groups, and village FPOs.'}
            </p>
          </div>

          <form onSubmit={handleSellSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'ఉత్పత్తి పేరు' : 'Product Title'}
                </label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Enriched Earthworm Vermicompost (KVK Certified)"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'వర్గం' : 'Category'}
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Solid Fertilizer">Solid Fertilizer</option>
                  <option value="Liquid Bio-Stimulant">Liquid Bio-Stimulant</option>
                  <option value="Plant Kit">Plant Kit</option>
                  <option value="Natural Pest Solution">Natural Pest Solution</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'యూనిట్ ధర (₹)' : 'Price per Unit (₹)'}
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'యూనిట్ పరిమాణం' : 'Packaging Unit'}
                </label>
                <input
                  type="text"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. 50 kg bag / 5 Litre can"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'అందుబాటులో ఉన్న నిల్వ' : 'Available Stock'}
                </label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'విక్రేత లేదా రైతు పేరు' : 'Seller / Farmer Name'}
                </label>
                <input
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Sri Lakshmi SHG"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'విక్రేత పాత్ర' : 'Seller Organization Role'}
                </label>
                <select
                  value={sellerRole}
                  onChange={(e) => setSellerRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Individual Farmer">Individual Farmer</option>
                  <option value="Women SHG">Women SHG</option>
                  <option value="Village FPO">Village FPO</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'గ్రామం / మండలం' : 'Village / Location'}
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Chilakaluripet, Palnadu"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-3">
                <label className="text-xs font-bold text-gray-700">
                  {isTe ? 'వివరాలు & ఉపయోగం' : 'Description & Ingredients'}
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your organic inputs, preparation method, or recommended application..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
              >
                <IconPlus className="w-4 h-4" />
                <span>{isTe ? 'ఉత్పత్తిని మార్కెట్‌లో చేర్చండి' : 'Publish Product to Marketplace'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('buy')}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition"
              >
                {isTe ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
