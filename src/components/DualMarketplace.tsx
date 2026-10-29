import React, { useState, useEffect } from 'react';
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
  Clock,
  Gauge,
  Zap,
  Tag,
  FileCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Award,
  Layers,
  Fuel,
  CheckSquare,
  HelpCircle,
  BookOpen,
  Wrench,
  ShieldAlert,
  Droplets,
  PackageCheck,
  Cpu,
} from 'lucide-react';
import { OrganicProduct, EquipmentItem, SupportedLanguage, EquipmentScale } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface DualMarketplaceProps {
  products: OrganicProduct[];
  equipment: EquipmentItem[];
  onOpenQR: (product: OrganicProduct) => void;
  onAddProduct: (prod: Partial<OrganicProduct>) => void;
  language: SupportedLanguage;
  initialSector?: 'products' | 'equipment';
}

export const DualMarketplace: React.FC<DualMarketplaceProps> = ({
  products,
  equipment,
  onOpenQR,
  onAddProduct,
  language,
  initialSector = 'products',
}) => {
  // Sector separation: 'products' = Selling Farming Products; 'equipment' = Equipment Hub for Farmers
  const [activeSector, setActiveSector] = useState<'products' | 'equipment'>(initialSector);

  useEffect(() => {
    setActiveSector(initialSector);
  }, [initialSector]);

  // Search & Filter for Sector 1: Selling Farming Products
  const [productSearch, setProductSearch] = useState<string>('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');

  // Search & Filter for Sector 2: Farming Equipment Hub
  const [equipmentSearch, setEquipmentSearch] = useState<string>('');
  const [selectedScaleFilter, setSelectedScaleFilter] = useState<string>('all');
  const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState<string>('All');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');

  // Interactive Card Accordion: which equipment card has "How to Use" expanded
  const [expandedHowToUseId, setExpandedHowToUseId] = useState<string | null>(null);

  // Rental Booking Modal State
  const [rentalModalItem, setRentalModalItem] = useState<EquipmentItem | null>(null);
  const [rentalHours, setRentalHours] = useState<number>(4);
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [rentalAcres, setRentalAcres] = useState<number>(2);
  const [rentalType, setRentalType] = useState<'hourly' | 'daily' | 'acre'>('hourly');
  const [includeOperator, setIncludeOperator] = useState<boolean>(true);
  const [rentalDate, setRentalDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [farmerVillage, setFarmerVillage] = useState<string>('Narasaraopet, Palnadu');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Purchase Modal State
  const [purchaseModalItem, setPurchaseModalItem] = useState<EquipmentItem | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [purchaseMode, setPurchaseMode] = useState<'full' | 'advance_loan'>('full');
  const [purchaseUnits, setPurchaseUnits] = useState<number>(1);
  const [confirmedPurchaseId, setConfirmedPurchaseId] = useState<string>('');

  // Product Checkout Modal State (Sector 1)
  const [checkoutProduct, setCheckoutProduct] = useState<{
    product: OrganicProduct;
    quantity: number;
  } | null>(null);
  const [productPaymentStep, setProductPaymentStep] = useState<'review' | 'processing' | 'success'>('review');

  // New Product Listing Modal (for Sector 1 only)
  const [showListingModal, setShowListingModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<OrganicProduct['category']>('Solid Fertilizer');
  const [newPrice, setNewPrice] = useState<number>(350);
  const [newUnit, setNewUnit] = useState<string>('50 kg bag');
  const [newStock, setNewStock] = useState<number>(100);

  // Equipment Inspection & Specification Detail Modal
  const [selectedEquipmentDetail, setSelectedEquipmentDetail] = useState<EquipmentItem | null>(null);
  const [detailModalTab, setDetailModalTab] = useState<'howToUse' | 'specs' | 'subsidy'>('howToUse');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Filtered lists for Sector 1: Organic Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedProductCategory === 'All' || p.category === selectedProductCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.village.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Scale filters for Sector 2
  const scaleFilters = [
    { id: 'all', label: language === 'te' ? 'అన్ని పరిమాణాలు' : 'All Machinery & Supplies', icon: Tractor },
    { id: 'mini', label: language === 'te' ? 'మినీ & చేతి పరికరాలు' : 'Mini & Handheld Tools', icon: Wrench },
    { id: 'smart', label: language === 'te' ? 'స్మార్ట్ డ్రోన్లు & ఐఓటీ' : 'Smart Agri-Tech & Drones', icon: Cpu },
    { id: 'irrigation', label: language === 'te' ? 'పైపులు & డ్రిప్ సిస్టమ్' : 'Pipes & Drip Irrigation', icon: Droplets },
    { id: 'supplies-pattas', label: language === 'te' ? 'పట్టాలు & నిల్వ సంచులు' : 'Drying Pattas & Storage Bags', icon: PackageCheck },
    { id: 'medium', label: language === 'te' ? 'మధ్యస్థ యంత్రాలు' : 'Medium (Power Tillers & Seeders)', icon: Gauge },
    { id: 'large', label: language === 'te' ? 'భారీ కమర్షియల్ యంత్రాలు' : 'Large (Tractors & Harvesters)', icon: Tractor },
  ];

  const equipmentCategories = [
    'All',
    'Soil Preparation & Tillage',
    'Sowing & Planting',
    'Crop Care & Weeding',
    'Harvesting & Balers',
    'Post-Harvest & Processing',
    'Irrigation & Pumps',
    'Farm Logistics & Trailers',
  ];

  const apCropList = [
    'All',
    'Paddy',
    'Chilli',
    'Cotton',
    'Maize',
    'Groundnut',
    'Pulses',
    'Sugarcane',
    'Horticulture',
  ];

  // Filtered equipment list
  const filteredEquipment = equipment.filter((eq) => {
    const matchesScale = selectedScaleFilter === 'all' || eq.sizeScale === selectedScaleFilter;
    const matchesCat = selectedEquipmentCategory === 'All' || eq.category === selectedEquipmentCategory;
    const matchesCrop =
      selectedCropFilter === 'All' ||
      (eq.relevantCrops && eq.relevantCrops.toLowerCase().includes(selectedCropFilter.toLowerCase()));
    const matchesSearch =
      eq.name.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
      (eq.nameTelugu && eq.nameTelugu.toLowerCase().includes(equipmentSearch.toLowerCase())) ||
      eq.location.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
      eq.sellerOrOwner.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
      (eq.hpRating && eq.hpRating.toLowerCase().includes(equipmentSearch.toLowerCase())) ||
      (eq.relevantCrops && eq.relevantCrops.toLowerCase().includes(equipmentSearch.toLowerCase())) ||
      (eq.category && eq.category.toLowerCase().includes(equipmentSearch.toLowerCase()));
    return matchesScale && matchesCat && matchesCrop && matchesSearch;
  });

  // Rental calculation supporting Hour, Day, and Acre
  const calculatedRentalTotal = () => {
    if (!rentalModalItem) return 0;
    const operatorPerHour = includeOperator ? 100 : 0;
    const operatorPerDay = includeOperator ? 600 : 0;
    const operatorPerAcre = includeOperator ? 150 : 0;

    if (rentalType === 'hourly') {
      const baseHour = rentalModalItem.rentPricePerHour || Math.round((rentalModalItem.rentPricePerDay || 2000) / 8);
      return (baseHour + operatorPerHour) * rentalHours;
    } else if (rentalType === 'daily') {
      const baseDay = rentalModalItem.rentPricePerDay || (rentalModalItem.rentPricePerHour ? rentalModalItem.rentPricePerHour * 7 : 3000);
      return (baseDay + operatorPerDay) * rentalDays;
    } else {
      // Per Acre
      const baseAcre = rentalModalItem.rentPricePerAcre || Math.round((rentalModalItem.rentPricePerHour || 500) * 1.5);
      return (baseAcre + operatorPerAcre) * rentalAcres;
    }
  };

  const handleOpenRental = (eq: EquipmentItem) => {
    setRentalModalItem(eq);
    setRentalHours(4);
    setRentalDays(1);
    setRentalAcres(2);
    // default to hourly if available, or acre if agricultural service
    setRentalType(eq.rentPricePerHour ? 'hourly' : eq.rentPricePerAcre ? 'acre' : 'daily');
    setIncludeOperator(eq.operatorAvailable || false);
    setBookingConfirmed(false);
  };

  const handleConfirmRental = () => {
    const orderId = `CHC-RENT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(orderId);
    setBookingConfirmed(true);
  };

  const handleOpenPurchase = (eq: EquipmentItem) => {
    setPurchaseModalItem(eq);
    setPurchaseStep('details');
    setPurchaseMode('full');
    setPurchaseUnits(1);
    setConfirmedPurchaseId('');
  };

  const handleConfirmPurchase = () => {
    setPurchaseStep('confirm');
    setTimeout(() => {
      setConfirmedPurchaseId(`AP-MACH-BUY-${Math.floor(100000 + Math.random() * 900000)}`);
      setPurchaseStep('success');
    }, 1800);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddProduct({
      name: newTitle,
      category: newCategory,
      pricePerUnit: Number(newPrice),
      unit: newUnit,
      sellerName: 'Palnadu Organic Producer SHG',
      sellerRole: 'Women SHG',
      village: 'Narasaraopet, Palnadu',
      rating: 5.0,
      reviewsCount: 1,
      availableStock: Number(newStock),
      batchNo: `KG-PROD-2026-${Math.floor(100 + Math.random() * 900)}`,
      description: 'Locally formulated organic amendment compliant with FCO specifications.',
      organicCertified: true,
      qrTraceabilityCode: `KG-TRACE-${Date.now()}`,
      ingredients: 'Composted biomass, rhizosphere microbes, enriched rock phosphate',
      applicationGuideline: 'Apply before tilling or during root-zone fertilizing.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    });
    setShowListingModal(false);
    setNewTitle('');
  };

  const handleStartProductCheckout = (prod: OrganicProduct) => {
    setCheckoutProduct({ product: prod, quantity: 1 });
    setProductPaymentStep('review');
  };

  const handleConfirmProductPayment = () => {
    setProductPaymentStep('processing');
    setTimeout(() => {
      setProductPaymentStep('success');
    }, 2000);
  };

  const toggleHowToUse = (id: string) => {
    setExpandedHowToUseId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TOP LEVEL: STRICT SECTOR SEGREGATION (TWO DISTINCT UNMIXED SECTORS)
          ========================================================================= */}
      <div className="bg-white rounded-2xl border-2 border-emerald-900/10 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'te' ? 'రైతు మార్కెట్‌ప్లేస్ & యంత్రాల కేంద్రం' : 'KrishiGreen Agricultural Commerce'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {language === 'te' ? 'ద్విముఖ మార్కెట్‌ప్లేస్ & యంత్రాల హబ్' : 'Dual Marketplace & Machinery'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
              {language === 'te'
                ? 'రైతుల కోసం రెండు ప్రత్యేక రంగాలు విభజించబడ్డాయి: సేంద్రీయ వ్యవసాయ ఉత్పత్తుల అమ్మకం మరియు ఆంధ్రప్రదేశ్ యంత్రాల అద్దె/కొనుగోలు కేంద్రం.'
                : 'Divided into two strictly unmixed sectors: Selling Farming Products (certified organic inputs) and the Equipment Hub for Farmers (Andhra Pradesh machinery rentals & purchases).'}
            </p>
          </div>

          {activeSector === 'products' ? (
            <button
              onClick={() => setShowListingModal(true)}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'te' ? '+ నా సేంద్రీయ ఉత్పత్తిని అమ్మండి' : '+ List My Farm Product'}</span>
            </button>
          ) : (
            <div className="px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-700 shrink-0" />
              <span>SMAM / PM-PRANAM Subsidies: 40% - 70% Off</span>
            </div>
          )}
        </div>

        {/* HIGH-VISIBILITY DUAL SECTOR SELECTOR CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-5">
          {/* SECTOR 1 SELECTOR */}
          <button
            onClick={() => setActiveSector('products')}
            className={`text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden flex items-start gap-4 ${
              activeSector === 'products'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`p-3 rounded-xl shrink-0 ${
                activeSector === 'products' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                  {language === 'te' ? 'విభాగం 1' : 'Sector 1'}
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {products.length} {language === 'te' ? 'ఉత్పత్తులు' : 'Products'}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-gray-900 mt-1">
                {language === 'te' ? 'వ్యవసాయ ఉత్పత్తుల అమ్మకం' : 'Selling Farming Products'}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {language === 'te'
                  ? 'ధృవీకరించబడిన సేంద్రీయ ఎరువులు, వర్మీకంపోస్ట్, జీవామృతం & రైతు సహజ ఉత్పత్తులు.'
                  : 'Organic fertilizers, vermicompost, Jeevamrutha, bio-inputs & lab-tested farm solutions.'}
              </p>
            </div>
            {activeSector === 'products' && (
              <div className="absolute top-2 right-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
              </div>
            )}
          </button>

          {/* SECTOR 2 SELECTOR */}
          <button
            onClick={() => setActiveSector('equipment')}
            className={`text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden flex items-start gap-4 ${
              activeSector === 'equipment'
                ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`p-3 rounded-xl shrink-0 ${
                activeSector === 'equipment' ? 'bg-amber-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Tractor className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950">
                  {language === 'te' ? 'విభాగం 2' : 'Sector 2'}
                </span>
                <span className="text-xs font-bold text-amber-900">
                  {equipment.length} {language === 'te' ? 'యంత్రాలు & సామాగ్రి' : 'Machinery, Pipes & Pattas'}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-gray-900 mt-1">
                {language === 'te' ? 'రైతుల కోసం యంత్రాల హబ్' : 'Equipment Hub for Farmers'}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {language === 'te'
                  ? 'మినీ నుండి భారీ యంత్రాలు, డ్రోన్లు, పైపులు, డ్రిప్, పట్టాలు, సంచులు - గంటకు/రోజుకు/ఎకరానికి అద్దె & కొనుగోలు.'
                  : 'Mini to heavy equipment, smart drones, drip pipes, drying pattas & bags — hourly, daily & per-acre rates with How-to-Use.'}
              </p>
            </div>
            {activeSector === 'equipment' && (
              <div className="absolute top-2 right-2 text-amber-600">
                <CheckCircle2 className="w-5 h-5 fill-amber-100" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTOR 1: SELLING FARMING PRODUCTS (ORGANIC BIO-INPUTS & COMMERCE)
          ========================================================================= */}
      {activeSector === 'products' && (
        <div className="space-y-6">
          {/* Sector 1 Filter & Search Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                <span className="font-extrabold text-gray-900 text-sm">
                  {language === 'te' ? 'రైతు ఉత్పత్తుల కేటలాగ్' : 'Organic Farm Products Catalog'}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} {language === 'te' ? 'అందుబాటులో ఉన్నాయి' : 'available'}
                </span>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder={
                    language === 'te'
                      ? 'ఉత్పత్తులు, ఎరువులు లేదా గ్రామం శోధించండి...'
                      : 'Search bio-fertilizers, villages, SHGs...'
                  }
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'All', label: language === 'te' ? 'అన్నీ' : 'All Products' },
                { id: 'Solid Fertilizer', label: language === 'te' ? 'ఘన ఎరువులు' : 'Solid Fertilizers (Vermi)' },
                { id: 'Liquid Bio-Stimulant', label: language === 'te' ? 'ద్రవ జీవ ఉత్ప్రేరకం' : 'Liquid Bio-Stimulants (Jeevamrutha)' },
                { id: 'Plant Kit', label: language === 'te' ? 'గార్డెన్ కిట్‌లు' : 'Home & Terrace Garden Kits' },
                { id: 'Natural Pest Solution', label: language === 'te' ? 'సహజ కీటక నివారిణి' : 'Botanical Pest Repellents' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedProductCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedProductCategory === cat.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-emerald-900/90 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                        {prod.category}
                      </span>
                      {prod.organicCertified && (
                        <span className="px-2 py-0.5 bg-green-600/95 backdrop-blur-xs text-white text-[10px] font-bold rounded-full flex items-center gap-0.5 shadow-xs">
                          <CheckCircle2 className="w-3 h-3" /> FCO Lab Certified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onOpenQR(prod)}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/95 hover:bg-white text-emerald-800 rounded-xl shadow-md transition"
                      title="Inspect Batch Laboratory QR Certificate"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-emerald-800 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {prod.village}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {prod.rating} ({prod.reviewsCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{prod.description}</p>

                    <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1.5 border border-gray-100">
                      <div className="flex justify-between text-gray-600">
                        <span>Producer / SHG:</span>
                        <strong className="text-gray-900 font-semibold">{prod.sellerName}</strong>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Batch Identifier:</span>
                        <span className="font-mono text-emerald-800 font-bold">{prod.batchNo}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Stock Available:</span>
                        <span className="text-emerald-700 font-semibold">{prod.availableStock} in stock</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">
                      Farmer Direct Price
                    </span>
                    <span className="text-xl font-black text-emerald-900 flex items-center">
                      ₹{prod.pricePerUnit}
                      <span className="text-xs font-semibold text-gray-500 ml-1">/ {prod.unit}</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenQR(prod)}
                      className="p-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center gap-1"
                      title="Inspect Lab Batch QR"
                    >
                      <QrCode className="w-4 h-4" />
                      <span className="hidden sm:inline">QR</span>
                    </button>
                    <button
                      onClick={() => handleStartProductCheckout(prod)}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? 'UPI తో కొనండి' : 'Buy via UPI'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTOR 2: EQUIPMENT HUB FOR FARMERS (MINI TO LARGE, DRONES, PIPES, PATTAS)
          ========================================================================= */}
      {activeSector === 'equipment' && (
        <div className="space-y-6">
          {/* Sector 2 Controls Bar */}
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-5 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                    <Tractor className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                      <span>{language === 'te' ? 'ఆంధ్రప్రదేశ్ వ్యవసాయ పరికరాలు & యంత్రాల హబ్' : 'Andhra Pradesh Farmer Equipment & Machinery Hub'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                        {filteredEquipment.length} Available
                      </span>
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {language === 'te'
                        ? 'గంటకు, రోజుకు, ఎకరానికి సగటు అద్దె ఫీజులు • మినీ టూల్స్, డ్రోన్లు, పైపులు, డ్రిప్, పట్టాలు, కంబైన్ హార్వెస్టర్లు • సమగ్ర వినియోగ గైడ్.'
                        : 'Transparent cost per hour, per day & per acre • Mini tools, smart drones, pipes, drip systems, drying pattas & heavy machines • Full How-to-Use field guide.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Machinery Search */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={equipmentSearch}
                  onChange={(e) => setEquipmentSearch(e.target.value)}
                  placeholder={
                    language === 'te'
                      ? 'డ్రోన్లు, పైపులు, పట్టాలు, ట్రాక్టర్, HP...'
                      : 'Search drones, pipes, pattas, sprayers, HP...'
                  }
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>
            </div>

            {/* Scale / Size Filter: Mini, Smart, Irrigation, Pattas, Medium, Large */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[11px] font-extrabold text-amber-950 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                {language === 'te' ? 'పరికరాల పరిమాణం & వర్గం (మినీ నుండి భారీ వరకు):' : 'Equipment Scale & Category (Mini to Large):'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {scaleFilters.map((sc) => {
                  const IconComponent = sc.icon;
                  const isSelected = selectedScaleFilter === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setSelectedScaleFilter(sc.id)}
                      className={`px-3 py-2 rounded-xl font-extrabold whitespace-nowrap transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/30'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{sc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Categories from PDF */}
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                {language === 'te' ? 'కార్యకలాప విభాగం:' : 'Operational Stage:'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {equipmentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedEquipmentCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                      selectedEquipmentCategory === cat
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by AP Target Crop */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">
                {language === 'te' ? 'పంట ప్రాధాన్యత:' : 'Target Crop:'}
              </span>
              {apCropList.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCropFilter(crop)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
                    selectedCropFilter === crop
                      ? 'bg-amber-800 text-white font-bold'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Machinery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEquipment.map((eq) => {
              // Calculate effective purchase price after SMAM subsidy
              const subsidyAmount = eq.salePrice && eq.subsidyEligible
                ? Math.round((eq.salePrice * (eq.subsidyPercentage || 40)) / 100)
                : 0;
              const netPurchasePrice = eq.salePrice ? eq.salePrice - subsidyAmount : 0;
              const isHowToUseOpen = expandedHowToUseId === eq.id;

              return (
                <div
                  key={eq.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header & Badges */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={eq.image}
                        alt={eq.name}
                        className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[85%]">
                        <span className="px-2.5 py-0.5 bg-amber-950/90 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
                          {eq.category}
                        </span>
                        {eq.hpRating && (
                          <span className="px-2 py-0.5 bg-blue-700/90 backdrop-blur-xs text-white text-[10px] font-black rounded-full flex items-center gap-0.5">
                            <Gauge className="w-3 h-3" /> {eq.hpRating}
                          </span>
                        )}
                        {eq.sizeType && (
                          <span className="px-2 py-0.5 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-medium rounded-full">
                            {eq.sizeType}
                          </span>
                        )}
                      </div>

                      {eq.subsidyEligible && (
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-amber-500 text-amber-950 text-[10px] font-black rounded-lg shadow-sm border border-amber-600/20">
                          {eq.subsidyPercentage}% Subsidy
                        </span>
                      )}

                      {eq.operatorAvailable && (
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-1 bg-emerald-900/90 backdrop-blur-xs text-emerald-200 text-[10px] font-bold rounded-lg shadow-xs">
                          Driver Avail.
                        </span>
                      )}
                    </div>

                    {/* Machine Details */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1 text-emerald-800 font-bold truncate">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {eq.location}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-600 shrink-0">
                          {eq.hoursUsed > 0 ? `${eq.hoursUsed} hrs logged` : 'Brand New'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2">
                        {eq.name}
                      </h3>
                      {eq.nameTelugu && (
                        <span className="text-xs font-bold text-amber-800 block -mt-1">
                          {eq.nameTelugu}
                        </span>
                      )}

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{eq.description}</p>

                      {/* Crops badge */}
                      {eq.relevantCrops && (
                        <div className="text-[11px] text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1 font-medium">
                          <span className="font-bold shrink-0">{language === 'te' ? 'పంటలు:' : 'Crops:'}</span>
                          <span className="truncate">{eq.relevantCrops}</span>
                        </div>
                      )}

                      {/* HOW TO USE ACCORDION BUTTON (USER REQUIREMENT) */}
                      {eq.howToUse && (
                        <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/50">
                          <button
                            type="button"
                            onClick={() => toggleHowToUse(eq.id)}
                            className="w-full px-3 py-2 flex items-center justify-between text-left text-xs font-bold text-amber-950 hover:bg-amber-100/60 transition"
                          >
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-amber-700" />
                              <span>{language === 'te' ? 'ఎలా ఉపయోగించాలి (వినియోగ గైడ్)' : 'How to Use & Field Guide'}</span>
                            </span>
                            {isHowToUseOpen ? (
                              <ChevronUp className="w-4 h-4 text-amber-700" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-amber-700" />
                            )}
                          </button>

                          {isHowToUseOpen && (
                            <div className="p-3 pt-1 text-xs text-gray-700 space-y-2 border-t border-amber-200/60 bg-white">
                              <p className="font-semibold text-amber-900 italic text-[11px]">
                                "{eq.howToUse.overview}"
                              </p>
                              <div className="space-y-1">
                                <span className="font-bold text-gray-900 block text-[11px] uppercase tracking-wider">
                                  Step-by-Step Operation:
                                </span>
                                <ol className="list-decimal list-inside space-y-0.5 text-gray-600 text-[11px]">
                                  {eq.howToUse.steps.map((st, sidx) => (
                                    <li key={sidx} className="leading-snug">{st}</li>
                                  ))}
                                </ol>
                              </div>
                              {eq.howToUse.idealConditions && (
                                <div className="text-[10px] p-2 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100">
                                  <strong>Ideal Condition:</strong> {eq.howToUse.idealConditions}
                                </div>
                              )}
                              {eq.howToUse.safetyTips && eq.howToUse.safetyTips.length > 0 && (
                                <div className="text-[10px] p-2 bg-rose-50 text-rose-950 rounded-lg border border-rose-100 flex items-start gap-1">
                                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                  <span><strong>Safety:</strong> {eq.howToUse.safetyTips[0]}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* CHC Pool & Inspection Spec */}
                      <div className="p-2.5 bg-gray-50 rounded-xl text-xs space-y-1 border border-gray-100">
                        <div className="flex justify-between text-gray-600">
                          <span>Hub / CHC Pool:</span>
                          <strong className="text-gray-900 font-semibold truncate ml-2">
                            {eq.sellerOrOwner}
                          </strong>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Inspection Status:</span>
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 42-Point Certified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRICING & CALL-TO-ACTION (HOUR, DAY, ACRE & PURCHASE) */}
                  <div className="p-4 pt-3 border-t border-gray-100 bg-amber-50/30 space-y-3">
                    {/* 3-Part Pricing Grid: Cost per Hour, Cost per Day, Cost per Acre (USER REQUIREMENT) */}
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      {/* HOURLY */}
                      <div className="p-2 bg-white rounded-xl border border-amber-200">
                        <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wider">
                          Per Hour
                        </span>
                        <span className="text-sm font-black text-amber-800 block mt-0.5">
                          ₹{eq.rentPricePerHour || Math.round((eq.rentPricePerDay || 2000) / 8)}
                        </span>
                        <span className="text-[9px] text-gray-400 block font-mono">/ hr</span>
                      </div>

                      {/* DAILY */}
                      <div className="p-2 bg-white rounded-xl border border-amber-200">
                        <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wider">
                          Per Day
                        </span>
                        <span className="text-sm font-black text-amber-900 block mt-0.5">
                          ₹{(eq.rentPricePerDay || (eq.rentPricePerHour ? eq.rentPricePerHour * 7 : 1500)).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-gray-400 block font-mono">/ day</span>
                      </div>

                      {/* PER ACRE (USER REQUIREMENT) */}
                      <div className="p-2 bg-white rounded-xl border border-emerald-300 bg-emerald-50/40">
                        <span className="text-[9px] text-emerald-800 block uppercase font-bold tracking-wider">
                          Per Acre
                        </span>
                        <span className="text-sm font-black text-emerald-900 block mt-0.5">
                          ₹{(eq.rentPricePerAcre || Math.round((eq.rentPricePerHour || 400) * 1.5)).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-emerald-700 block font-mono">/ acre</span>
                      </div>
                    </div>

                    {/* Purchase Price Banner (if saleable) */}
                    {eq.salePrice && (
                      <div className="px-3 py-1.5 bg-white rounded-xl border border-teal-200 flex items-center justify-between text-xs">
                        <span className="text-teal-950 font-bold">
                          Direct Purchase: <strong className="text-teal-900 text-sm">₹{netPurchasePrice.toLocaleString('en-IN')}</strong>
                        </span>
                        <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {eq.subsidyPercentage > 0 ? `${eq.subsidyPercentage}% Subsidy` : 'Direct Wholesale'}
                        </span>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedEquipmentDetail(eq);
                          setDetailModalTab('howToUse');
                        }}
                        className="px-2.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                        title="View Full Operating Manual & Specifications"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Guide</span>
                      </button>

                      <button
                        onClick={() => handleOpenRental(eq)}
                        className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Select & Rent</span>
                      </button>

                      {eq.salePrice && (
                        <button
                          onClick={() => handleOpenPurchase(eq)}
                          className="flex-1 py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>Buy Direct</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: SELECT & RENT (HOURLY, DAILY & PER-ACRE CALCULATION)
          ========================================================================= */}
      {rentalModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">
                    {language === 'te' ? 'యంత్రాల అద్దె బుకింగ్' : 'Custom Hiring Machinery Rental'}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">
                    {rentalModalItem.sellerOrOwner} • {rentalModalItem.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRentalModalItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!bookingConfirmed ? (
              <div className="space-y-4 text-xs">
                {/* Equipment summary card */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex gap-3 items-center">
                  <img
                    src={rentalModalItem.image}
                    alt={rentalModalItem.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900 leading-snug">
                      {rentalModalItem.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {rentalModalItem.category} • {rentalModalItem.hpRating || 'Standard Power'}
                    </p>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-amber-800 font-bold text-[11px] mt-1">
                      <span>₹{rentalModalItem.rentPricePerHour}/hr</span>
                      {rentalModalItem.rentPricePerDay && <span>• ₹{rentalModalItem.rentPricePerDay}/day</span>}
                      {rentalModalItem.rentPricePerAcre && (
                        <span className="text-emerald-800">• ₹{rentalModalItem.rentPricePerAcre}/acre</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rental Type: Hourly, Daily, or Per-Acre (USER REQUIREMENT) */}
                <div>
                  <label className="font-bold block mb-1.5 text-gray-700">
                    {language === 'te' ? 'అద్దె పద్ధతిని ఎంచుకోండి:' : 'Select Rental Pricing Mode:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRentalType('hourly')}
                      className={`p-2.5 rounded-xl border-2 text-left transition ${
                        rentalType === 'hourly'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs">Per Hour</span>
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                      </div>
                      <span className="text-[10px] text-gray-600 block mt-1">
                        ₹{rentalModalItem.rentPricePerHour} / hr
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRentalType('daily')}
                      className={`p-2.5 rounded-xl border-2 text-left transition ${
                        rentalType === 'daily'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs">Per Day</span>
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      </div>
                      <span className="text-[10px] text-gray-600 block mt-1">
                        ₹{rentalModalItem.rentPricePerDay || (rentalModalItem.rentPricePerHour * 7)} / day
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRentalType('acre')}
                      className={`p-2.5 rounded-xl border-2 text-left transition ${
                        rentalType === 'acre'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs">Per Acre</span>
                        <Layers className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <span className="text-[10px] text-gray-600 block mt-1">
                        ₹{rentalModalItem.rentPricePerAcre || Math.round(rentalModalItem.rentPricePerHour * 1.5)} / acre
                      </span>
                    </button>
                  </div>
                </div>

                {/* Duration / Area Slider */}
                {rentalType === 'hourly' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-gray-700">Hours Needed:</label>
                      <span className="font-black text-sm text-amber-800">{rentalHours} Hours</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={rentalHours}
                      onChange={(e) => setRentalHours(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>1 hr</span>
                      <span>4 hrs (Half day)</span>
                      <span>8 hrs (Full day)</span>
                      <span>12 hrs</span>
                    </div>
                  </div>
                )}

                {rentalType === 'daily' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-gray-700">Days Needed:</label>
                      <span className="font-black text-sm text-amber-800">{rentalDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={1}
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>1 day</span>
                      <span>3 days</span>
                      <span>5 days</span>
                      <span>7 days (1 week)</span>
                    </div>
                  </div>
                )}

                {rentalType === 'acre' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-bold text-gray-700">Field Area to Cover:</label>
                      <span className="font-black text-sm text-emerald-800">{rentalAcres} Acres</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={rentalAcres}
                      onChange={(e) => setRentalAcres(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>1 acre</span>
                      <span>5 acres</span>
                      <span>10 acres</span>
                      <span>15 acres</span>
                    </div>
                  </div>
                )}

                {/* Date and Location */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1 text-gray-700">Field Operation Date</label>
                    <input
                      type="date"
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                      className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-gray-700">Field Delivery Village</label>
                    <input
                      type="text"
                      value={farmerVillage}
                      onChange={(e) => setFarmerVillage(e.target.value)}
                      className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
                    />
                  </div>
                </div>

                {/* Operator checkbox */}
                {rentalModalItem.operatorAvailable && (
                  <label className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeOperator}
                      onChange={(e) => setIncludeOperator(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-emerald-700 rounded"
                    />
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        Include Certified Driver / Machinery Operator
                        {rentalType === 'hourly' && ' (+₹100/hr)'}
                        {rentalType === 'daily' && ' (+₹600/day)'}
                        {rentalType === 'acre' && ' (+₹150/acre)'}
                      </span>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Trained by Krishi Vigyan Kendra (KVK) for optimal field calibration, zero diesel wastage, and highest safety.
                      </p>
                    </div>
                  </label>
                )}

                {/* Total Cost Breakdown */}
                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1.5">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Machine Rental (
                      {rentalType === 'hourly' && `${rentalHours} hrs @ ₹${rentalModalItem.rentPricePerHour}/hr`}
                      {rentalType === 'daily' && `${rentalDays} days @ ₹${rentalModalItem.rentPricePerDay || (rentalModalItem.rentPricePerHour * 7)}/day`}
                      {rentalType === 'acre' && `${rentalAcres} acres @ ₹${rentalModalItem.rentPricePerAcre || Math.round(rentalModalItem.rentPricePerHour * 1.5)}/acre`}
                      ):
                    </span>
                    <strong className="text-gray-900">
                      ₹{rentalType === 'hourly'
                        ? (rentalModalItem.rentPricePerHour * rentalHours).toLocaleString('en-IN')
                        : rentalType === 'daily'
                        ? ((rentalModalItem.rentPricePerDay || (rentalModalItem.rentPricePerHour * 7)) * rentalDays).toLocaleString('en-IN')
                        : ((rentalModalItem.rentPricePerAcre || Math.round(rentalModalItem.rentPricePerHour * 1.5)) * rentalAcres).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  {includeOperator && (
                    <div className="flex justify-between text-gray-600">
                      <span>Certified Operator Fee:</span>
                      <strong className="text-gray-900">
                        ₹{rentalType === 'hourly'
                          ? (100 * rentalHours).toLocaleString('en-IN')
                          : rentalType === 'daily'
                          ? (600 * rentalDays).toLocaleString('en-IN')
                          : (150 * rentalAcres).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Security Deposit (KrishiGreen Kisan Trust):</span>
                    <strong className="text-emerald-700">₹0 (Waived for AP Farmers)</strong>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-amber-950 pt-2 border-t border-amber-200">
                    <span>Total Rent Payable:</span>
                    <span className="text-amber-800 text-lg">₹{calculatedRentalTotal().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={handleConfirmRental}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Rental & Reserve Machine</span>
                </button>
              </div>
            ) : (
              /* Booking Success view */
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-lg text-gray-900">
                  {language === 'te' ? 'యంత్రం విజయవంతంగా బుక్ చేయబడింది!' : 'Machinery Rental Confirmed!'}
                </h4>
                <p className="text-xs text-gray-600">
                  Booking ID: <strong className="font-mono text-amber-800 font-bold">{confirmedBookingId}</strong>
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-left text-xs text-gray-700 space-y-1.5 border border-gray-200">
                  <p>• <strong>Equipment:</strong> {rentalModalItem.name}</p>
                  <p>
                    • <strong>Scheduled Date:</strong> {rentalDate} (
                    {rentalType === 'hourly' && `${rentalHours} hours`}
                    {rentalType === 'daily' && `${rentalDays} days`}
                    {rentalType === 'acre' && `${rentalAcres} acres`}
                    )
                  </p>
                  <p>• <strong>Delivery Point:</strong> {farmerVillage}</p>
                  <p>• <strong>CHC Hub Coordinator:</strong> {rentalModalItem.sellerOrOwner} ({rentalModalItem.contactPhone})</p>
                  <p>• <strong>Total Payable:</strong> ₹{calculatedRentalTotal().toLocaleString('en-IN')} (Pay upon field arrival)</p>
                </div>
                <button
                  onClick={() => setRentalModalItem(null)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs transition"
                >
                  Back to Equipment Hub
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: DIRECT PURCHASE MACHINERY / SUPPLIES WITH SUBSIDY
          ========================================================================= */}
      {purchaseModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">
                    {language === 'te' ? 'వ్యవసాయ పరికరం కొనుగోలు' : 'Purchase Equipment & Farm Supplies'}
                  </h3>
                  <p className="text-xs text-emerald-800 font-bold">
                    Official AP Manufacturer & Rythu Bharosa Kendra Supply
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPurchaseModalItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {purchaseStep === 'details' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex gap-3 items-center">
                  <img
                    src={purchaseModalItem.image}
                    alt={purchaseModalItem.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900 leading-snug">
                      {purchaseModalItem.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {purchaseModalItem.category} • {purchaseModalItem.hpRating || 'Standard Power'}
                    </p>
                    <span className="text-emerald-800 font-bold text-[11px] block mt-1">
                      Dealer / Supplier: {purchaseModalItem.sellerOrOwner}
                    </span>
                  </div>
                </div>

                {/* Quantity selector for supplies (e.g. pattas, bags, pipes) */}
                {purchaseModalItem.sizeScale === 'supplies-pattas' && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <strong className="block text-amber-950 font-bold">Order Quantity:</strong>
                      <span className="text-[11px] text-amber-800">{purchaseModalItem.unitOrQuantityAvailable || 'Units in stock'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPurchaseUnits(Math.max(1, purchaseUnits - 1))}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-black text-sm px-2">{purchaseUnits}</span>
                      <button
                        type="button"
                        onClick={() => setPurchaseUnits(purchaseUnits + 1)}
                        className="w-8 h-8 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Subsidy Calculation Breakdown */}
                {purchaseModalItem.salePrice && (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Standard Retail / Ex-Showroom Price ({purchaseUnits} unit{purchaseUnits > 1 ? 's' : ''}):</span>
                      <strong className="text-gray-900">
                        ₹{(purchaseModalItem.salePrice * purchaseUnits).toLocaleString('en-IN')}
                      </strong>
                    </div>

                    {purchaseModalItem.subsidyEligible && (
                      <div className="flex justify-between text-emerald-800 font-bold">
                        <span>
                          {purchaseModalItem.subsidyPercentage}% {purchaseModalItem.subsidySchemeName}:
                        </span>
                        <span>
                          - ₹{Math.round(((purchaseModalItem.salePrice * purchaseModalItem.subsidyPercentage) / 100) * purchaseUnits).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>GST & Delivery to Taluka Hub:</span>
                      <strong className="text-emerald-700">Subsidized & Free</strong>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-emerald-950 pt-2 border-t border-emerald-200">
                      <span>Net Effective Farmer Price:</span>
                      <span className="text-emerald-800 text-lg">
                        ₹{Math.round(
                          (purchaseModalItem.salePrice -
                            (purchaseModalItem.subsidyEligible
                              ? (purchaseModalItem.salePrice * purchaseModalItem.subsidyPercentage) / 100
                              : 0)) * purchaseUnits
                        ).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Purchase payment mode */}
                <div>
                  <label className="font-bold block mb-1.5 text-gray-700">
                    Choose Purchase Settlement Option:
                  </label>
                  <div className="space-y-2">
                    <label
                      onClick={() => setPurchaseMode('full')}
                      className={`p-3 rounded-xl border-2 block cursor-pointer transition ${
                        purchaseMode === 'full'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="font-bold">Full 1-Click Payment via UPI / RTGS</strong>
                        <span className="text-xs font-mono font-bold text-emerald-800">Direct Dispatch</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Immediate invoice generated. Machine/supplies delivered within 48 hours to your local CHC hub.
                      </p>
                    </label>

                    {purchaseModalItem.salePrice && purchaseModalItem.salePrice > 50000 && (
                      <label
                        onClick={() => setPurchaseMode('advance_loan')}
                        className={`p-3 rounded-xl border-2 block cursor-pointer transition ${
                          purchaseMode === 'advance_loan'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">15% Token Advance + Agri Infrastructure Fund (AIF)</strong>
                          <span className="text-xs font-mono font-bold text-emerald-800">3% Interest Loan</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1">
                          Pay 15% booking token now. KrishiGreen FPO team facilitates NABARD/SBI 3% subvention loan.
                        </p>
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {purchaseMode === 'full'
                      ? 'Proceed to Complete Purchase'
                      : 'Pay 15% Token & Apply for AIF Subsidy'}
                  </span>
                </button>
              </div>
            )}

            {purchaseStep === 'confirm' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-bold text-base text-gray-900">Verifying SMAM Subsidy & Invoicing...</h4>
                <p className="text-xs text-gray-500">
                  Connecting to AP Rythu Bharosa Kendra (RBK) database & generating purchase order.
                </p>
              </div>
            )}

            {purchaseStep === 'success' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-lg text-gray-900">
                  {language === 'te' ? 'యంత్రం ఆర్డర్ నిర్ధారించబడింది!' : 'Order Placed Successfully!'}
                </h4>
                <p className="text-xs text-gray-600">
                  Order Reference: <strong className="font-mono text-emerald-800">{confirmedPurchaseId}</strong>
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-left text-xs text-gray-700 space-y-1.5 border border-gray-200">
                  <p>• <strong>Equipment:</strong> {purchaseModalItem.name} ({purchaseUnits} unit{purchaseUnits > 1 ? 's' : ''})</p>
                  <p>• <strong>SMAM Subsidy Claim:</strong> Verified and applied automatically.</p>
                  <p>• <strong>Hub Inspection:</strong> Pre-calibrated by certified agricultural engineers.</p>
                  <p>• <strong>Delivery:</strong> Scheduled within 2-3 business days to your nearest CHC hub.</p>
                  <p>• <strong>Support Helpline:</strong> 1800-425-0012 (Toll Free Kisan Call Center)</p>
                </div>
                <button
                  onClick={() => setPurchaseModalItem(null)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
                >
                  Back to Equipment Hub
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: COMPREHENSIVE HOW-TO-USE & TECHNICAL SPECIFICATIONS REPORT
          ========================================================================= */}
      {selectedEquipmentDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">
                  {selectedEquipmentDetail.name}
                </h3>
                <p className="text-xs text-amber-800 font-bold">
                  {selectedEquipmentDetail.sellerOrOwner} • {selectedEquipmentDetail.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedEquipmentDetail(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs: How to Use | Technical Specs | Government Subsidy */}
            <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setDetailModalTab('howToUse')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  detailModalTab === 'howToUse' ? 'bg-white text-amber-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>How to Use Field Guide</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailModalTab('specs')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  detailModalTab === 'specs' ? 'bg-white text-amber-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Specs & 42-Point Check</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailModalTab('subsidy')}
                className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  detailModalTab === 'subsidy' ? 'bg-white text-amber-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>Subsidy & Rates</span>
              </button>
            </div>

            {/* TAB 1: HOW TO USE FIELD GUIDE (USER REQUIREMENT) */}
            {detailModalTab === 'howToUse' && selectedEquipmentDetail.howToUse && (
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                  <span className="font-extrabold uppercase text-[10px] tracking-wider block text-amber-900 mb-1">
                    Operational Overview:
                  </span>
                  <p className="leading-relaxed font-medium">
                    {selectedEquipmentDetail.howToUse.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 mb-2 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-700" />
                    <span>Step-by-Step Field Operating Instructions:</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedEquipmentDetail.howToUse.steps.map((st, idx) => (
                      <div key={idx} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed font-medium">{st}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedEquipmentDetail.howToUse.idealConditions && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
                    <strong className="block font-bold mb-0.5">Optimal Soil & Field Conditions:</strong>
                    <p className="text-[11px] text-emerald-900 leading-relaxed">
                      {selectedEquipmentDetail.howToUse.idealConditions}
                    </p>
                  </div>
                )}

                {selectedEquipmentDetail.howToUse.safetyTips && selectedEquipmentDetail.howToUse.safetyTips.length > 0 && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 space-y-1">
                    <strong className="block font-bold flex items-center gap-1 text-rose-900">
                      <ShieldAlert className="w-4 h-4 text-rose-700" /> Critical Safety Precautions:
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-rose-900 text-[11px]">
                      {selectedEquipmentDetail.howToUse.safetyTips.map((tip, tidx) => (
                        <li key={tidx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedEquipmentDetail.howToUse.maintenanceNotes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950">
                    <strong className="block font-bold mb-0.5 flex items-center gap-1 text-blue-900">
                      <Wrench className="w-3.5 h-3.5 text-blue-700" /> Routine Daily Maintenance:
                    </strong>
                    <p className="text-[11px] text-blue-900 leading-relaxed">
                      {selectedEquipmentDetail.howToUse.maintenanceNotes}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TECHNICAL SPECIFICATIONS & 42-POINT INSPECTION */}
            {detailModalTab === 'specs' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                    <div>Engine Hours: <strong>{selectedEquipmentDetail.hoursUsed} hrs</strong></div>
                    <div>Condition Rating: <strong>{selectedEquipmentDetail.conditionRating} / 5.0</strong></div>
                    <div>Power: <strong>{selectedEquipmentDetail.hpRating || 'Standard'}</strong></div>
                    <div>Scale: <strong>{selectedEquipmentDetail.sizeScale?.toUpperCase() || 'EQUIPMENT'}</strong></div>
                  </div>
                </div>

                <div>
                  <h5 className="font-extrabold text-gray-700 mb-1.5 uppercase text-[11px] tracking-wider">
                    Features & Specifications:
                  </h5>
                  <ul className="space-y-1 text-gray-700 list-disc list-inside bg-gray-50 p-3 rounded-xl border border-gray-200">
                    {selectedEquipmentDetail.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-extrabold text-gray-700 mb-1.5 uppercase text-[11px] tracking-wider">
                    42-Point Machinery Quality Check:
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>Engine & Gearbox: Passed</span>
                    </div>
                    <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>Hydraulics & PTO: Passed</span>
                    </div>
                    <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>Blades / Tines Wear: &lt;10%</span>
                    </div>
                    <div className="p-2 bg-green-50 text-green-900 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>Safety Guards: Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SUBSIDY & PRICING BREAKDOWN */}
            {detailModalTab === 'subsidy' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 space-y-1">
                  <strong className="block font-bold">Government Subsidy Scheme:</strong>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Eligible under <strong>{selectedEquipmentDetail.subsidySchemeName}</strong> for{' '}
                    <strong>{selectedEquipmentDetail.subsidyPercentage}%</strong> financial assistance. KrishiGreen FPO team assists with direct document submission.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <h5 className="font-extrabold text-gray-900 text-sm">Transparent Rate Card:</h5>
                  <div className="flex justify-between text-gray-700">
                    <span>Hourly Rental Rate:</span>
                    <strong>₹{selectedEquipmentDetail.rentPricePerHour} / hr</strong>
                  </div>
                  {selectedEquipmentDetail.rentPricePerDay && (
                    <div className="flex justify-between text-gray-700">
                      <span>Daily Rental Rate:</span>
                      <strong>₹{selectedEquipmentDetail.rentPricePerDay.toLocaleString('en-IN')} / day</strong>
                    </div>
                  )}
                  {selectedEquipmentDetail.rentPricePerAcre && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Per-Acre Service Rate:</span>
                      <strong>₹{selectedEquipmentDetail.rentPricePerAcre.toLocaleString('en-IN')} / acre</strong>
                    </div>
                  )}
                  {selectedEquipmentDetail.salePrice && (
                    <div className="flex justify-between text-teal-900 font-bold pt-1 border-t border-gray-200">
                      <span>Ex-Factory Purchase Price:</span>
                      <strong>₹{selectedEquipmentDetail.salePrice.toLocaleString('en-IN')}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  const eq = selectedEquipmentDetail;
                  setSelectedEquipmentDetail(null);
                  handleOpenRental(eq);
                }}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" /> Rent This Equipment
              </button>
              {selectedEquipmentDetail.salePrice && (
                <button
                  type="button"
                  onClick={() => {
                    const eq = selectedEquipmentDetail;
                    setSelectedEquipmentDetail(null);
                    handleOpenPurchase(eq);
                  }}
                  className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <IndianRupee className="w-3.5 h-3.5" /> Purchase Direct
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: PRODUCT CHECKOUT (BUY VIA UPI FOR SECTOR 1)
          ========================================================================= */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-gray-900">
                {language === 'te' ? 'సేంద్రీయ ఉత్పత్తి చెల్లింపు' : 'Direct Farmer Purchase via UPI'}
              </h3>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {productPaymentStep === 'review' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Product:</span>
                    <strong className="text-gray-900 text-right">{checkoutProduct.product.name}</strong>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Producer:</span>
                    <span className="font-medium">{checkoutProduct.product.sellerName}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Batch Code:</span>
                    <span className="font-mono text-emerald-800 font-bold">{checkoutProduct.product.batchNo}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Packaging:</span>
                    <span>{checkoutProduct.product.unit}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 text-sm font-extrabold pt-2 border-t border-gray-200">
                    <span>Total Amount Payable:</span>
                    <span className="text-emerald-800">
                      ₹{checkoutProduct.product.pricePerUnit.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950 space-y-1">
                  <strong className="block font-bold">100% Direct Escrow to Farmer SHG</strong>
                  <p className="text-[11px] text-emerald-800">
                    No middlemen deduction. Payment is settled directly to the producer group's bank account via BHIM UPI.
                  </p>
                </div>

                <button
                  onClick={handleConfirmProductPayment}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Pay ₹{checkoutProduct.product.pricePerUnit} via UPI
                </button>
              </div>
            )}

            {productPaymentStep === 'processing' && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-bold text-base text-gray-900">Processing UPI Transaction...</h4>
                <p className="text-xs text-gray-500">
                  Simulating payment for ₹{checkoutProduct.product.pricePerUnit} with BHIM / PhonePe / GPay.
                </p>
              </div>
            )}

            {productPaymentStep === 'success' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-lg text-gray-900">Order Confirmed!</h4>
                <p className="text-xs text-gray-600">
                  Order ID: <strong className="font-mono">KG-BIO-{Math.floor(10000 + Math.random() * 90000)}</strong>
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-left text-xs text-gray-600 space-y-1">
                  <p>• Dispatch notification sent to {checkoutProduct.product.sellerName} via SMS.</p>
                  <p>• Batch QR code authenticity receipt generated in your profile.</p>
                  <p>• Pickup or delivery available from Ramnagar Hub.</p>
                </div>
                <button
                  onClick={() => setCheckoutProduct(null)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
                >
                  Back to Marketplace
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: LIST PRODUCT FOR SALE (SECTOR 1 ONLY)
          ========================================================================= */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="font-extrabold text-lg text-gray-900">
              {language === 'te' ? 'సేంద్రీయ ఉత్పత్తిని అమ్మకానికి ఉంచండి' : 'List Organic Farm Product for Sale'}
            </h3>
            <p className="text-xs text-gray-500">
              Sell directly to fellow farmers, urban gardeners, and SHG cooperatives.
            </p>
            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Product Title</label>
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
                <label className="font-bold block mb-1">Product Category</label>
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
                  <label className="font-bold block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Packaging Unit</label>
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
                <label className="font-bold block mb-1">Stock Quantity Available</label>
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
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition"
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
