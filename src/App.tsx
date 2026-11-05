import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PipelineSection } from './components/PipelineSection';
import { SchemeNavigator } from './components/SchemeNavigator';
import { ImpactCalculatorSection } from './components/ImpactCalculatorSection';
import { CropRotationScheduler } from './components/CropRotationScheduler';
import { HomeIntro } from './components/HomeIntro';
import { OurProcessSection } from './components/OurProcessSection';
import { HelplinePage } from './components/HelplinePage';
import { MapsLocationDetector } from './components/MapsLocationDetector';
import { SearchGroundingWidget } from './components/SearchGroundingWidget';
import { RealtimeWeatherDashboardWidget } from './components/RealtimeWeatherDashboardWidget';
import { QRTraceabilityModal } from './components/QRTraceabilityModal';
import { HelplineModal } from './components/HelplineModal';
import { AndhraPradeshDiscoveryMap } from './components/AndhraPradeshDiscoveryMap';
import { CarbonEngineSection } from './components/CarbonEngineSection';
import { WasteToWealthPipeline } from './components/WasteToWealthPipeline';
import { RealImpactDashboard } from './components/RealImpactDashboard';
import { PrototypeNoticeModal } from './components/PrototypeNoticeModal';
import { OfflineSyncToast } from './components/OfflineSyncToast';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LegalModals } from './components/LegalModals';
import { PrototypeTopBanner } from './components/PrototypeTopBanner';
import { AuthProvider } from './contexts/AuthContext';
import { db } from './lib/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import {
  INITIAL_WASTE_REQUESTS,
  INITIAL_BATCHES,
  INITIAL_PRODUCTS,
  INITIAL_TICKETS,
} from './data/mockData';

// New pages
import { AboutPage } from './pages/AboutPage';
import { AGAPage } from './pages/AGAPage';
import { SustainableFarmingPage } from './pages/SustainableFarmingPage';
import { WasteManagementPage } from './pages/WasteManagementPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { EquipmentHubPage } from './pages/EquipmentHubPage';
import { CarbonIntegrityPage } from './pages/CarbonIntegrityPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { AgricultureUpdatesPage } from './pages/AgricultureUpdatesPage';
import { ContactPage } from './pages/ContactPage';
import { FarmerDashboardPage } from './pages/FarmerDashboardPage';

import {
  SupportedLanguage,
  WasteCollectionRequest,
  ProcessingBatch,
  OrganicProduct,
  EquipmentItem,
  SupportTicket,
} from './types';
import {
  IconPhone,
  IconShield,
  IconLayers,
  IconClose,
} from './components/Icons';
import { UI_TRANSLATIONS } from './data/translations';
import { getMultiTranslations } from './utils/multiLang';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const m = getMultiTranslations(language);

  // Core data states
  const [wasteRequests, setWasteRequests] = useState<WasteCollectionRequest[]>(INITIAL_WASTE_REQUESTS);
  const [batches, setBatches] = useState<ProcessingBatch[]>(INITIAL_BATCHES);
  const [products, setProducts] = useState<OrganicProduct[]>(INITIAL_PRODUCTS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Modals
  const [isHelplineOpen, setIsHelplineOpen] = useState<boolean>(false);
  const [activeQRBatch, setActiveQRBatch] = useState<any | null>(null);
  const [showTicketsDrawer, setShowTicketsDrawer] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'tos' | 'privacy' | null>(null);
  const [isPrototypeModalOpen, setIsPrototypeModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem('krishigreen_prototype_dismissed_v1') !== 'true';
      } catch { return true; }
    }
    return true;
  });

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Firestore real-time sync with resilient fallback
  useEffect(() => {
    try {
      const unsubWaste = onSnapshot(collection(db, 'waste_requests'), (snapshot) => {
        if (!snapshot.empty) {
          const remote: WasteCollectionRequest[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setWasteRequests(remote);
        }
      }, (err) => console.log('Firestore waste_requests:', err.message));

      const unsubBatches = onSnapshot(collection(db, 'processing_batches'), (snapshot) => {
        if (!snapshot.empty) {
          const remote: ProcessingBatch[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setBatches(remote);
        }
      }, (err) => console.log('Firestore processing_batches:', err.message));

      const unsubProducts = onSnapshot(collection(db, 'organic_products'), (snapshot) => {
        if (!snapshot.empty) {
          const remote: OrganicProduct[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setProducts(remote);
        }
      }, (err) => console.log('Firestore organic_products:', err.message));

      const unsubTickets = onSnapshot(collection(db, 'support_tickets'), (snapshot) => {
        if (!snapshot.empty) {
          const remote: SupportTicket[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
          setTickets(remote);
        } else {
          setTickets([]);
        }
      }, (err) => console.log('Firestore support_tickets:', err.message));

      return () => { unsubWaste(); unsubBatches(); unsubProducts(); unsubTickets(); };
    } catch (e) {
      console.warn('Firestore initialized with local cache');
    }
  }, []);

  const handleRequestPickup = async (req: Partial<WasteCollectionRequest>) => {
    const newReq: WasteCollectionRequest = {
      id: `WC-${Math.floor(1050 + Math.random() * 9000)}`,
      generatorType: req.generatorType || 'Household',
      wasteType: req.wasteType || 'Kitchen organic waste',
      estimatedWeightKg: req.estimatedWeightKg || 50,
      village: req.village || '',
      contactName: req.contactName || '',
      phone: req.phone || '',
      pickupDate: req.pickupDate || new Date().toISOString().split('T')[0],
      status: 'Pending Pickup',
      notes: req.notes,
      createdAt: req.createdAt || new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setWasteRequests((prev) => [newReq, ...prev]);
    try {
      await addDoc(collection(db, 'waste_requests'), newReq);
    } catch (err) { console.warn('Persisted locally:', err); }
  };

  const handleAddBatch = async (batch: Partial<ProcessingBatch>) => {
    const newBatch: ProcessingBatch = {
      id: `BATCH-${Date.now()}`,
      batchNo: batch.batchNo || `KG-BATCH-${Date.now()}`,
      unitName: batch.unitName || 'Village Composting Unit',
      operatorName: batch.operatorName || 'Village Entrepreneur',
      village: batch.village || '',
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
    setBatches((prev) => [newBatch, ...prev]);
    try {
      await addDoc(collection(db, 'processing_batches'), newBatch);
    } catch (err) { console.warn('Persisted locally:', err); }
  };

  const handleAddProduct = async (prod: Partial<OrganicProduct>) => {
    const newProd: OrganicProduct = {
      id: `PROD-${Date.now()}`,
      name: prod.name || 'Organic Soil Compost',
      category: prod.category || 'Solid Fertilizer',
      pricePerUnit: prod.pricePerUnit || 350,
      unit: prod.unit || '50 kg bag',
      sellerName: prod.sellerName || 'Local Producer',
      sellerRole: prod.sellerRole || 'Individual Farmer',
      village: prod.village || '',
      rating: 0,
      reviewsCount: 0,
      availableStock: prod.availableStock || 1,
      batchNo: prod.batchNo || `KG-${Date.now()}`,
      description: prod.description || '',
      organicCertified: prod.organicCertified || false,
      qrTraceabilityCode: prod.qrTraceabilityCode || `KG-TRACE-${Date.now()}`,
      ingredients: prod.ingredients || '',
      applicationGuideline: prod.applicationGuideline || '',
      image: prod.image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    };
    setProducts((prev) => [newProd, ...prev]);
    try {
      await addDoc(collection(db, 'organic_products'), newProd);
    } catch (err) { console.warn('Persisted locally:', err); }
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

  const handleTicketCreated = async (newTicket: SupportTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    try {
      await addDoc(collection(db, 'support_tickets'), newTicket);
    } catch (err) { console.warn('Ticket saved locally:', err); }
  };

  // ── Tab → page renderer ───────────────────────────────────────────────────
  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <>
            <HomeIntro language={language} onNavigate={setCurrentTab} onOpenHelpline={() => setIsHelplineOpen(true)} />
            <ImpactCalculatorSection language={language} />
          </>
        );
      case 'about':
        return <AboutPage language={language} />;
      case 'sustainable-farming':
        return <SustainableFarmingPage language={language} />;
      case 'waste-management':
        return (
          <WasteManagementPage
            language={language}
            wasteRequests={wasteRequests}
            onRequestPickup={handleRequestPickup}
          />
        );
      case 'aga':
        return <AGAPage language={language} />;
      case 'marketplace':
        return (
          <MarketplacePage
            language={language}
            products={products}
            onAddProduct={handleAddProduct}
          />
        );
      case 'equipment-hub':
        return <EquipmentHubPage language={language} />;
      case 'carbon-integrity':
        return <CarbonIntegrityPage language={language} />;
      case 'partnerships':
        return <PartnershipsPage language={language} />;
      case 'agriculture-updates':
        return <AgricultureUpdatesPage language={language} />;
      case 'contact':
        return <ContactPage language={language} onOpenHelpline={() => setIsHelplineOpen(true)} />;
      case 'dashboard-farmer':
        return (
          <FarmerDashboardPage
            language={language}
            wasteRequests={wasteRequests}
            products={products}
            onNavigate={setCurrentTab}
          />
        );

      // ── Legacy/existing tabs ─────────────────────────────────────────────
      case 'process':
        return <OurProcessSection language={language} onNavigate={setCurrentTab} />;
      case 'pipeline':
        return (
          <WasteToWealthPipeline
            language={language}
            onOpenQR={handleOpenQRForBatch}
          />
        );
      case 'marketplace-products':
        return (
          <MarketplacePage
            language={language}
            products={products}
            onAddProduct={handleAddProduct}
          />
        );
      case 'marketplace-machinery':
        return <EquipmentHubPage language={language} />;
      case 'carbon':
        return <CarbonIntegrityPage language={language} />;
      case 'rotation':
        return <CropRotationScheduler language={language} batches={batches} />;
      case 'schemes':
        return <SchemeNavigator language={language} />;
      case 'impact':
        return (
          <RealImpactDashboard
            language={language}
          />
        );
      case 'maps':
      case 'ap-pilot':
        return (
          <AndhraPradeshDiscoveryMap
            language={language}
          />
        );
      case 'search':
        return (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <RealtimeWeatherDashboardWidget language={language} />
            <SearchGroundingWidget language={language} />
          </div>
        );
      case 'helpline':
        return (
          <HelplinePage
            language={language}
            tickets={tickets}
            onTicketCreated={handleTicketCreated}
          />
        );
      default:
        return (
          <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
            <div className="text-5xl">🌾</div>
            <h2 className="text-xl font-bold text-gray-700">
              {language === 'te' ? 'పేజీ కనుగొనబడలేదు' : 'Page Not Found'}
            </h2>
            <button
              onClick={() => setCurrentTab('home')}
              className="bg-[#059669] text-white font-bold px-6 py-3 rounded-full text-sm"
            >
              {language === 'te' ? 'హోమ్‌కి వెళ్ళండి' : 'Go to Home'}
            </button>
          </div>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col relative text-gray-900 bg-[#f8faf8]">
        {/* Source Sans Pro font */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&display=swap');
          * { font-family: 'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif; }
        `}</style>

        <AnimatedBackground />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#f8faf8]/95" />

        <PrototypeTopBanner
          language={language}
          onOpenDetails={() => setIsPrototypeModalOpen(true)}
        />

        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          language={language}
          setLanguage={setLanguage}
          onOpenHelpline={() => setIsHelplineOpen(true)}
          onOpenVoice={() => setIsHelplineOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
          onOpenPrototypeModal={() => setIsPrototypeModalOpen(true)}
        />

        {/* Farmer quick-action bar on home */}
        {currentTab === 'home' && (
          <nav className="bg-white border-b border-gray-200 shadow-sm z-30 relative">
            <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                { tab: 'waste-management', icon: '🗑️', label: language === 'te' ? 'వ్యర్థ సేకరణ' : 'Request Collection' },
                { tab: 'aga', icon: '🌱', label: language === 'te' ? 'AGA ఎరువు' : 'AGA Fertilizer' },
                { tab: 'marketplace', icon: '🛒', label: language === 'te' ? 'మార్కెట్' : 'Marketplace' },
                { tab: 'equipment-hub', icon: '🚜', label: language === 'te' ? 'యంత్రాలు' : 'Equipment' },
                { tab: 'contact', icon: '📞', label: language === 'te' ? 'సహాయం' : 'Support' },
                { tab: 'dashboard-farmer', icon: '👤', label: language === 'te' ? 'నా ఖాతా' : 'My Account' },
              ].map(({ tab, icon, label }) => (
                <button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#065f46] border border-[#bbf7d0] whitespace-nowrap transition"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}

        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => { setCurrentTab(tab); setIsSidebarOpen(false); }}
          language={language}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenHelpline={() => setIsHelplineOpen(true)}
          onOpenLegal={setLegalModalType}
        />

        {/* Page content */}
        <main className="flex-1 relative z-10 pb-12">
          {renderPage()}
        </main>

        {/* Persistent call button */}
        <a
          href="tel:1800-KRISHI-GRN"
          className="fixed bottom-6 right-6 z-50 bg-[#059669] hover:bg-[#047857] text-white font-bold px-5 py-3.5 rounded-full shadow-xl flex items-center gap-2 text-sm transition"
          title="Call Customer Support"
        >
          📞 <span className="hidden sm:inline">{language === 'te' ? 'కాల్ చేయండి' : 'Call Support'}</span>
        </a>

        {/* Offline sync toast */}
        <OfflineSyncToast language={language} />

        {/* Modals */}
        {isHelplineOpen && (
          <HelplineModal
            language={language}
            isOpen={isHelplineOpen}
            onClose={() => setIsHelplineOpen(false)}
            onTicketCreated={handleTicketCreated}
          />
        )}

        {activeQRBatch && (
          <QRTraceabilityModal
            isOpen={!!activeQRBatch}
            onClose={() => setActiveQRBatch(null)}
            batchData={activeQRBatch}
          />
        )}

        {legalModalType && (
          <LegalModals
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
            language={language}
          />
        )}

        {isPrototypeModalOpen && (
          <PrototypeNoticeModal
            isOpen={isPrototypeModalOpen}
            onClose={() => {
              setIsPrototypeModalOpen(false);
              try { localStorage.setItem('krishigreen_prototype_dismissed_v1', 'true'); } catch {}
            }}
            language={language}
          />
        )}
      </div>
    </AuthProvider>
  );
}
