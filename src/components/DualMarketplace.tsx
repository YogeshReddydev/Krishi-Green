import React, { useState } from 'react';
import {
  ShoppingBag,
  Tractor,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  IndianRupee,
  Plus,
  Search,
  Filter,
  Check,
  X,
  Sparkles,
  CreditCard,
  Phone,
  FileCheck,
} from 'lucide-react';
import { OrganicProduct, EquipmentItem, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface DualMarketplaceProps {
  products: OrganicProduct[];
  equipment: EquipmentItem[];
  onOpenQR: (product: OrganicProduct) => void;
  onAddProduct: (prod: Partial<OrganicProduct>) => void;
  language: SupportedLanguage;
}

export const DualMarketplace: React.FC<DualMarketplaceProps> = ({
  products,
  equipment,
  onOpenQR,
  onAddProduct,
  language,
}) => {
  const [activeMarketTab, setActiveMarketTab] = useState<'organic' | 'equipment'>('organic');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');
  const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState<string>('All');

  // Checkout modal
  const [checkoutItem, setCheckoutItem] = useState<{
    title: string;
    price: number;
    type: 'product' | 'equipment_rent' | 'equipment_buy';
  } | null>(null);
  const [paymentStep, setPaymentStep] = useState<'review' | 'upi_qr' | 'success'>('review');

  // New product listing modal
  const [showListingModal, setShowListingModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<OrganicProduct['category']>('Solid Fertilizer');
  const [newPrice, setNewPrice] = useState<number>(350);
  const [newUnit, setNewUnit] = useState<string>('50 kg bag');
  const [newStock, setNewStock] = useState<number>(100);

  // Equipment Inspection Modal
  const [selectedEquipmentDetail, setSelectedEquipmentDetail] = useState<EquipmentItem | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedProductCategory === 'All' || p.category === selectedProductCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredEquipment = equipment.filter((eq) => {
    const matchesCat = selectedEquipmentCategory === 'All' || eq.category === selectedEquipmentCategory;
    const matchesSearch =
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.sellerOrOwner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartCheckout = (
    title: string,
    price: number,
    type: 'product' | 'equipment_rent' | 'equipment_buy'
  ) => {
    setCheckoutItem({ title, price, type });
    setPaymentStep('review');
  };

  const handleSimulatePayment = () => {
    setPaymentStep('upi_qr');
    setTimeout(() => {
      setPaymentStep('success');
    }, 2400);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddProduct({
      name: newTitle,
      category: newCategory,
      pricePerUnit: Number(newPrice),
      unit: newUnit,
      sellerName: 'Ramnagar Organic Producer SHG',
      sellerRole: 'Women SHG',
      village: 'Ramnagar, Nashik',
      rating: 5.0,
      reviewsCount: 1,
      availableStock: Number(newStock),
      batchNo: `KG-PROD-2026-${Math.floor(100 + Math.random() * 900)}`,
      description: 'Locally processed organic soil amendment compliant with FCO standards.',
      organicCertified: true,
      qrTraceabilityCode: `KG-TRACE-${Date.now()}`,
      ingredients: 'Composted bio-waste, microbial cultures',
      applicationGuideline: 'Apply before tilling or during root-zone fertilizing.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    });
    setShowListingModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Switcher */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Slide 06 • The Rural Economic Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              KrishiGreen Dual Marketplace & Equipment Hub
            </h2>
            <p className="text-xs text-gray-500">
              Direct selling for farmer-made organic products and access to certified machinery with government subsidies.
            </p>
          </div>

          <button
            onClick={() => setShowListingModal(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition shrink-0"
          >
            <Plus className="w-4 h-4" /> {t.listProduct || 'List My Product / Tool'}
          </button>
        </div>

        {/* Dual Tab Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveMarketTab('organic')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeMarketTab === 'organic'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Organic Fertilizers & Bio-Inputs ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveMarketTab('equipment')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                activeMarketTab === 'equipment'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Tractor className="w-4 h-4 text-emerald-700" />
              <span>Farm Equipment Hub ({equipment.length})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, villages, sellers..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: ORGANIC PRODUCTS */}
      {activeMarketTab === 'organic' && (
        <div className="space-y-4">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Solid Fertilizer', 'Liquid Bio-Stimulant', 'Plant Kit', 'Natural Pest Solution'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedProductCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedProductCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Image & badge */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-emerald-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                        {prod.category}
                      </span>
                      {prod.organicCertified && (
                        <span className="px-2 py-0.5 bg-green-600/90 backdrop-blur-xs text-white text-[10px] font-bold rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onOpenQR(prod)}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-emerald-800 rounded-xl shadow-xs transition"
                      title="View Laboratory QR Traceability Certificate"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <MapPin className="w-3 h-3" /> {prod.village}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {prod.rating} ({prod.reviewsCount})
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2">{prod.description}</p>

                    <div className="p-2.5 bg-gray-50 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between text-gray-600">
                        <span>Producer:</span>
                        <strong className="text-gray-900 font-medium">{prod.sellerName}</strong>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Batch Trace:</span>
                        <span className="font-mono text-emerald-800 font-semibold">{prod.batchNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Price</span>
                    <span className="text-lg font-extrabold text-emerald-900 flex items-center">
                      ₹{prod.pricePerUnit}
                      <span className="text-xs font-normal text-gray-500 ml-1">/ {prod.unit}</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenQR(prod)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold transition"
                      title="Inspect Lab Batch"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartCheckout(prod.name, prod.pricePerUnit, 'product')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                    >
                      Buy via UPI
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: EQUIPMENT HUB */}
      {activeMarketTab === 'equipment' && (
        <div className="space-y-4">
          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              'All',
              'Tractor',
              'Power Tiller',
              'Bio-waste Shredder',
              'Rotary Drum Composter',
              'Solar Dehydrator',
              'Power Sprayer',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEquipmentCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedEquipmentCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEquipment.map((eq) => (
              <div
                key={eq.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={eq.image}
                      alt={eq.name}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-blue-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                        {eq.category}
                      </span>
                      {eq.inspectionPassed && (
                        <span className="px-2 py-0.5 bg-green-600/90 backdrop-blur-xs text-white text-[10px] font-bold rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> 42-Point Inspected
                        </span>
                      )}
                    </div>
                    {eq.subsidyEligible && (
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-amber-500/90 backdrop-blur-xs text-amber-950 text-[10px] font-extrabold rounded-md shadow-xs">
                        {eq.subsidyPercentage}% SMAM Subsidy
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <MapPin className="w-3 h-3" /> {eq.location}
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-600">
                        {eq.hoursUsed} hrs used
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
                      {eq.name}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2">{eq.description}</p>

                    <div className="p-2.5 bg-gray-50 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between text-gray-600">
                        <span>Owner/Pool:</span>
                        <strong className="text-gray-900 font-medium">{eq.sellerOrOwner}</strong>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-semibold">
                        <span>Govt Subsidy:</span>
                        <span>{eq.subsidySchemeName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    {eq.rentPricePerDay ? (
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Rental</span>
                        <span className="text-base font-extrabold text-emerald-900">
                          ₹{eq.rentPricePerDay}
                          <span className="text-xs font-normal text-gray-500 ml-1">/ day</span>
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase font-bold">Purchase</span>
                        <span className="text-base font-extrabold text-emerald-900">
                          ₹{eq.salePrice?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedEquipmentDetail(eq)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition"
                    >
                      Report
                    </button>
                    {eq.rentPricePerDay && (
                      <button
                        onClick={() =>
                          handleStartCheckout(
                            `${eq.name} (1 Day Rental)`,
                            eq.rentPricePerDay!,
                            'equipment_rent'
                          )
                        }
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                      >
                        Rent
                      </button>
                    )}
                    {eq.salePrice && (
                      <button
                        onClick={() =>
                          handleStartCheckout(
                            `${eq.name} (Direct Buy)`,
                            eq.salePrice!,
                            'equipment_buy'
                          )
                        }
                        className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                      >
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checkout / UPI Simulator Modal */}
      {checkoutItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">KrishiGreen Secure Payment</h3>
              <button
                onClick={() => setCheckoutItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentStep === 'review' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Order Item:</span>
                    <strong className="text-gray-900 text-right">{checkoutItem.title}</strong>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee (3% capped):</span>
                    <span className="text-emerald-700 font-semibold">
                      ₹{Math.min(Math.round(checkoutItem.price * 0.03), 150)} (Included)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-900 text-sm font-bold pt-1 border-t border-gray-200">
                    <span>Total Amount Payable:</span>
                    <span className="text-emerald-800">₹{checkoutItem.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950 space-y-1">
                  <strong className="block font-semibold">Instant Farmer UPI Settlement</strong>
                  <p className="text-[11px] text-emerald-800">
                    Funds are held in escrow until delivery confirmation and batch QR scan, then disbursed directly to the farmer/SHG UPI VPA.
                  </p>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Pay via UPI / NetBanking
                </button>
              </div>
            )}

            {paymentStep === 'upi_qr' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-bold text-base text-gray-900">Connecting to UPI Gateway...</h4>
                <p className="text-xs text-gray-500">
                  Simulating payment for ₹{checkoutItem.price.toLocaleString('en-IN')} with BHIM / PhonePe / GPay.
                </p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-gray-900">Payment & Order Confirmed!</h4>
                <p className="text-xs text-gray-600">
                  Order ID: <strong className="font-mono">KG-ORD-{Math.floor(10000 + Math.random() * 90000)}</strong>
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-left text-xs text-gray-600 space-y-1">
                  <p>• Dispatch notification sent to seller via SMS.</p>
                  <p>• Batch QR code receipt generated in your Farmer Profile.</p>
                  <p>• Local pickup available at Ramnagar Hub.</p>
                </div>
                <button
                  onClick={() => setCheckoutItem(null)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
                >
                  Back to Marketplace
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Equipment Inspection Report Modal */}
      {selectedEquipmentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Verified Condition Inspection</h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  KrishiGreen Certified Machinery Report
                </p>
              </div>
              <button
                onClick={() => setSelectedEquipmentDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
                <h4 className="font-bold text-gray-900 text-sm">{selectedEquipmentDetail.name}</h4>
                <p className="text-gray-600">
                  Owner: {selectedEquipmentDetail.sellerOrOwner} • Location: {selectedEquipmentDetail.location}
                </p>
                <div className="flex gap-3 text-gray-700 pt-1">
                  <span>Engine Hours: <strong>{selectedEquipmentDetail.hoursUsed} hrs</strong></span>
                  <span>Condition Rating: <strong>{selectedEquipmentDetail.conditionRating} / 5.0</strong></span>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-gray-700 mb-1.5 uppercase text-[11px]">
                  42-Point Inspection Checklist:
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Engine & Transmission: Passed</span>
                  </div>
                  <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Hydraulics & PTO: Passed</span>
                  </div>
                  <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Blades / Tines Wear: &lt;15%</span>
                  </div>
                  <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Safety Guards & Brakes: OK</span>
                  </div>
                </div>
              </div>

              {selectedEquipmentDetail.subsidyEligible && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                  <strong className="block font-semibold mb-0.5">Government Subsidy Available</strong>
                  <p className="text-[11px] text-amber-900">
                    Eligible under <strong>{selectedEquipmentDetail.subsidySchemeName}</strong> for up to{' '}
                    <strong>{selectedEquipmentDetail.subsidyPercentage}%</strong> financial assistance. KrishiGreen FPO team assists with direct document submission.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedEquipmentDetail(null)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition"
            >
              Close Inspection Report
            </button>
          </div>
        </div>
      )}

      {/* New Listing Modal */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">List Organic Product for Sale</h3>
            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Product Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Enriched Vermicompost (50 kg)"
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Product Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
                >
                  <option value="Solid Fertilizer">Solid Organic Fertilizer</option>
                  <option value="Liquid Bio-Stimulant">Liquid Bio-Stimulant / Enzyme</option>
                  <option value="Plant Kit">Urban Balcony & Garden Kit</option>
                  <option value="Natural Pest Solution">Natural Botanical Pest Solution</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Packaging Unit</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    placeholder="e.g. 50 kg bag, 5 L can"
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Stock Quantity Available</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowListingModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
