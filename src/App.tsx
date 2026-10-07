import React, { useState } from 'react';
import { Header } from './components/Header';
import { PipelineSection } from './components/PipelineSection';
import { DualMarketplace } from './components/DualMarketplace';
import { SchemeNavigator } from './components/SchemeNavigator';
import { ImpactCalculatorSection } from './components/ImpactCalculatorSection';
import { CropRotationScheduler } from './components/CropRotationScheduler';
import { HomeIntro } from './components/HomeIntro';
import { HelplinePage } from './components/HelplinePage';
import { QRTraceabilityModal } from './components/QRTraceabilityModal';
import { HelplineModal } from './components/HelplineModal';
import {
  INITIAL_WASTE_REQUESTS,
  INITIAL_BATCHES,
  INITIAL_PRODUCTS,
  INITIAL_EQUIPMENT,
  INITIAL_TICKETS,
} from './data/mockData';
import {
  SupportedLanguage,
  WasteCollectionRequest,
  ProcessingBatch,
  OrganicProduct,
  EquipmentItem,
  SupportTicket,
} from './types';
import {
  Phone,
  LifeBuoy,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Bot,
} from 'lucide-react';
import { UI_TRANSLATIONS } from './data/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [viewMode, setViewMode] = useState<'portal' | 'mobile'>('portal');

  // Core Data States
  const [wasteRequests, setWasteRequests] = useState<WasteCollectionRequest[]>(INITIAL_WASTE_REQUESTS);
  const [batches, setBatches] = useState<ProcessingBatch[]>(INITIAL_BATCHES);
  const [products, setProducts] = useState<OrganicProduct[]>(INITIAL_PRODUCTS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  // Modals
  const [isHelplineOpen, setIsHelplineOpen] = useState<boolean>(false);
  const [activeQRBatch, setActiveQRBatch] = useState<any | null>(null);
  const [showTicketsDrawer, setShowTicketsDrawer] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const handleRequestPickup = (req: Partial<WasteCollectionRequest>) => {
    const newReq: WasteCollectionRequest = {
      id: `WC-${Math.floor(1050 + Math.random() * 900)}`,
      generatorType: req.generatorType || 'Household',
      wasteType: req.wasteType || 'Kitchen organic waste',
      estimatedWeightKg: req.estimatedWeightKg || 50,
      village: req.village || 'Ramnagar',
      contactName: req.contactName || 'Kisan Lead',
      phone: req.phone || '+91 98000 00000',
      pickupDate: req.pickupDate || new Date().toISOString().split('T')[0],
      status: 'Pending Pickup',
      notes: req.notes,
      createdAt: req.createdAt || new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setWasteRequests([newReq, ...wasteRequests]);
  };

  const handleAddBatch = (batch: Partial<ProcessingBatch>) => {
    const newBatch: ProcessingBatch = {
      id: `BATCH-${Date.now()}`,
      batchNo: batch.batchNo || `KG-BATCH-${Date.now()}`,
      unitName: batch.unitName || 'Village Composting Unit',
      operatorName: batch.operatorName || 'Village Entrepreneur',
      village: batch.village || 'Ramnagar',
      processType: batch.processType || 'Vermi-composting',
      inputWasteKg: batch.inputWasteKg || 500,
      inputRawMaterials: batch.inputRawMaterials || ['Vegetable waste', 'Cow dung'],
      startDate: batch.startDate || new Date().toISOString().split('T')[0],
      estimatedReadyDate: batch.estimatedReadyDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      currentStage: batch.currentStage || 'Initiated',
      stageProgressPercent: batch.stageProgressPercent || 10,
      outputProduct: batch.outputProduct || 'Organic Vermicompost',
      expectedYieldKg: batch.expectedYieldKg || 250,
      status: batch.status || 'Fermenting',
      npkReport: batch.npkReport,
      qrCodeData: batch.qrCodeData || `https://krishigreen.in/verify/${batch.batchNo}`,
    };
    setBatches([newBatch, ...batches]);
  };

  const handleAddProduct = (prod: Partial<OrganicProduct>) => {
    const newProd: OrganicProduct = {
      id: `PROD-${Date.now()}`,
      name: prod.name || 'Organic Soil Compost',
      category: prod.category || 'Solid Fertilizer',
      pricePerUnit: prod.pricePerUnit || 350,
      unit: prod.unit || '50 kg bag',
      sellerName: prod.sellerName || 'Local Producer',
      sellerRole: prod.sellerRole || 'Village FPO',
      village: prod.village || 'Ramnagar',
      rating: 5.0,
      reviewsCount: 1,
      availableStock: prod.availableStock || 50,
      batchNo: prod.batchNo || 'KG-2026-NEW',
      description: prod.description || 'Nutrient rich organic bio-input',
      organicCertified: true,
      qrTraceabilityCode: prod.qrTraceabilityCode || `KG-TRACE-${Date.now()}`,
      ingredients: prod.ingredients || 'Composted bio-waste',
      applicationGuideline: prod.applicationGuideline || 'Apply at root zone',
      image: prod.image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    };
    setProducts([newProd, ...products]);
  };

  const handleOpenQRForBatch = (batch: ProcessingBatch) => {
    setActiveQRBatch({
      batchNo: batch.batchNo,
      productName: batch.outputProduct,
      producerName: batch.operatorName,
      village: batch.village,
      productionDate: batch.estimatedReadyDate,
      certificationStatus: 'KVK Tested & Organic Certified (FCO 1985 Compliant)',
      npk: batch.npkReport,
    });
  };

  const handleOpenQRForProduct = (product: OrganicProduct) => {
    setActiveQRBatch({
      batchNo: product.batchNo,
      productName: product.name,
      producerName: product.sellerName,
      village: product.village,
      productionDate: '2026-10-01',
      certificationStatus: '100% Tested Organic (Zero Synthetic Chemicals)',
      npk: {
        nitrogen: '1.8%',
        phosphorus: '1.2%',
        potassium: '1.4%',
        organicCarbonPercent: 18.4,
        ph: 7.2,
        cToNRatio: '15:1',
      },
    });
  };

  const handleTicketCreated = (newTicket: SupportTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-gray-800 bg-[#f7faf4]">
      {/* Agricultural Farmland Framing & Textured Visual Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/farmer_welcome.jpg')`,
        }}
      />
      {/* Framing Ambient High-Contrast Overlay to guarantee 100% crystal-clear UI contrast */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#f8faf6]/92 via-[#f8faf6]/96 to-[#f4f7ef]/98 backdrop-blur-[2px]" />

      {/* Decorative Agri Corner Framing Accents */}
      <div className="fixed top-2 left-2 w-28 h-28 pointer-events-none z-10 border-t-2 border-l-2 border-emerald-600/30 rounded-tl-3xl hidden md:block" />
      <div className="fixed top-2 right-2 w-28 h-28 pointer-events-none z-10 border-t-2 border-r-2 border-emerald-600/30 rounded-tr-3xl hidden md:block" />
      <div className="fixed bottom-2 left-2 w-28 h-28 pointer-events-none z-10 border-b-2 border-l-2 border-emerald-600/30 rounded-bl-3xl hidden md:block" />
      <div className="fixed bottom-2 right-2 w-28 h-28 pointer-events-none z-10 border-b-2 border-r-2 border-emerald-600/30 rounded-br-3xl hidden md:block" />

      {/* App Header (Full Language Shell Reactive) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenVoice={() => setIsHelplineOpen(true)}
      />

      {/* Main Website Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        <div className={viewMode === 'mobile' ? 'max-w-md mx-auto shadow-2xl rounded-3xl bg-white/98 backdrop-blur-md p-4 sm:p-5 border-2 border-emerald-200 space-y-5' : 'space-y-6'}>
          {/* Quick Status Pill in Mobile mode */}
          {viewMode === 'mobile' && (
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 text-white rounded-2xl flex items-center justify-between shadow-sm border border-emerald-700/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-700/70 rounded-xl">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300 block font-bold">
                    {t.nationalMission}
                  </span>
                  <strong className="text-xs sm:text-sm font-extrabold">{t.villageNode}</strong>
                </div>
              </div>
              <button
                onClick={() => setIsHelplineOpen(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white flex items-center gap-1.5 text-xs font-bold shadow-sm transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-100" />
                <span>1800</span>
              </button>
            </div>
          )}

          {/* Webpage Breadcrumb bar when on dedicated modules */}
          {currentTab !== 'home' && (
            <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-100 shadow-2xs text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('home')}
                  className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline"
                >
                  <span>{t.navHome}</span>
                </button>
                <span className="text-gray-400">/</span>
                <span className="font-extrabold text-gray-900">
                  {currentTab === 'pipeline' && t.navPipeline}
                  {currentTab === 'marketplace' && t.navMarketplace}
                  {currentTab === 'rotation' && t.navRotation}
                  {currentTab === 'schemes' && t.navSchemes}
                  {currentTab === 'impact' && t.navImpact}
                  {currentTab === 'helpline' && t.navHelpline}
                </span>
              </div>
              <button
                onClick={() => setCurrentTab('home')}
                className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-xl transition border border-emerald-200"
              >
                {t.backToOverview}
              </button>
            </div>
          )}

          {/* Dedicated Webpage 1: Home / Intro Overview */}
          {currentTab === 'home' && (
            <HomeIntro
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenHelpline={() => setIsHelplineOpen(true)}
              language={language}
            />
          )}

          {/* Dedicated Webpage 2: Waste-to-Wealth Pipeline */}
          {currentTab === 'pipeline' && (
            <PipelineSection
              requests={wasteRequests}
              batches={batches}
              onRequestPickup={handleRequestPickup}
              onAddBatch={handleAddBatch}
              onOpenQR={handleOpenQRForBatch}
              onGoToMarketplace={() => setCurrentTab('marketplace')}
              onGoToRotation={() => setCurrentTab('rotation')}
              language={language}
            />
          )}

          {/* Dedicated Webpage 3: Dual Marketplace & Machinery */}
          {currentTab === 'marketplace' && (
            <DualMarketplace
              products={products}
              equipment={equipment}
              onOpenQR={handleOpenQRForProduct}
              onAddProduct={handleAddProduct}
              language={language}
            />
          )}

          {/* Dedicated Webpage 4: Crop Rotation Scheduler */}
          {currentTab === 'rotation' && (
            <CropRotationScheduler batches={batches} language={language} />
          )}

          {/* Dedicated Webpage 5: Government Schemes & Subsidies */}
          {currentTab === 'schemes' && <SchemeNavigator language={language} />}

          {/* Dedicated Webpage 6: Live Impact & Analytics */}
          {currentTab === 'impact' && <ImpactCalculatorSection language={language} />}

          {/* Dedicated Webpage 7: 24x7 Helpline & AI Advisor */}
          {currentTab === 'helpline' && (
            <HelplinePage
              language={language}
              tickets={tickets}
              onTicketCreated={handleTicketCreated}
            />
          )}
        </div>
      </main>

      {/* Floating Action Trigger for 24x7 Helpline & Support Tickets Drawer */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        <button
          onClick={() => setShowTicketsDrawer(!showTicketsDrawer)}
          className="p-3 bg-white/95 backdrop-blur-md hover:bg-white text-emerald-950 rounded-2xl shadow-xl border border-emerald-200/90 transition flex items-center gap-2 text-xs font-bold"
          title={t.tickets}
        >
          <LifeBuoy className="w-4 h-4 text-emerald-700" />
          <span className="hidden sm:inline">{t.tickets} ({tickets.length})</span>
        </button>

        <button
          onClick={() => setIsHelplineOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-emerald-800 to-green-700 hover:from-emerald-900 hover:to-green-800 text-white rounded-2xl shadow-xl transition flex items-center gap-2 text-xs font-bold border border-emerald-600/50"
        >
          <Phone className="w-4 h-4 text-emerald-200 animate-bounce" />
          <span>{t.tollFreeNumber}</span>
        </button>
      </div>

      {/* Slide-over Tickets Drawer (Fully localized) */}
      {showTicketsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                    <LifeBuoy className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-base">{t.tickets}</h3>
                </div>
                <button
                  onClick={() => setShowTicketsDrawer(false)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-500">
                {t.oneLiner}
              </p>

              <div className="space-y-3">
                {tickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    className="p-3.5 bg-gray-50/90 rounded-xl border border-gray-200 space-y-1.5 text-xs shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-800">{tkt.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tkt.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : tkt.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tkt.status}
                      </span>
                    </div>

                    <div className="font-semibold text-gray-800">{tkt.category}</div>
                    <p className="text-gray-600 line-clamp-2">"{tkt.query}"</p>

                    {tkt.resolutionNotes && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                        <strong>Advisor:</strong> {tkt.resolutionNotes}
                      </p>
                    )}

                    <div className="text-[10px] text-gray-400 pt-1 flex justify-between">
                      <span>Caller: {tkt.callerName}</span>
                      <span>{tkt.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowTicketsDrawer(false);
                setCurrentTab('helpline');
              }}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition mt-4 shadow-sm"
            >
              {t.callNow}
            </button>
          </div>
        </div>
      )}

      {/* QR Traceability Modal */}
      <QRTraceabilityModal
        isOpen={!!activeQRBatch}
        onClose={() => setActiveQRBatch(null)}
        batchData={activeQRBatch || {}}
      />

      {/* Toll-free Helpline & AI Advisor Modal */}
      <HelplineModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        language={language}
        onTicketCreated={handleTicketCreated}
      />

      {/* Footer (Fully localized shell) */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-gray-200/90 py-6 px-4 sm:px-6 text-xs text-gray-500 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-950 text-sm">KrishiGreen</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{t.footerTagline}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => setCurrentTab('helpline')}
              className="font-medium text-emerald-800 hover:underline"
            >
              {t.tollFree}: {t.tollFreeNumber}
            </button>
            <span>hello@krishigreen.in</span>
            <span className="text-emerald-700 font-semibold">{t.villageNode}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
