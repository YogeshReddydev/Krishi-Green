import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PipelineSection } from './components/PipelineSection';
import { DualMarketplace } from './components/DualMarketplace';
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
import { db } from './lib/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
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
import { LegalModals } from './components/LegalModals';
import {
  IconPhone,
  IconShield,
  IconLayers,
  IconClose,
} from './components/Icons';
import { UI_TRANSLATIONS } from './data/translations';
import { getMultiTranslations } from './utils/multiLang';
import farmerWelcomeImg from './assets/images/krishigreen_farmer_welcome_1791353512681.jpg';
import { AboutPage } from './pages/AboutPage';
import { SustainableFarmingPage } from './pages/SustainableFarmingPage';
import { WasteManagementPage } from './pages/WasteManagementPage';
import { AgaProductPage } from './pages/AgaProductPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { EquipmentHubPage } from './pages/EquipmentHubPage';
import { CarbonIntegrityPage } from './pages/CarbonIntegrityPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { AgricultureUpdatesPage } from './pages/AgricultureUpdatesPage';
import { ContactPage } from './pages/ContactPage';
import { FarmerDashboard } from './pages/dashboards/FarmerDashboard';
import { WasteOperationsDashboard } from './pages/dashboards/WasteOperationsDashboard';
import { ProcessingFacilityDashboard } from './pages/dashboards/ProcessingFacilityDashboard';
import { EquipmentOperatorDashboard } from './pages/dashboards/EquipmentOperatorDashboard';
import { PartnerDashboard } from './pages/dashboards/PartnerDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { VerificationDashboard } from './pages/dashboards/VerificationDashboard';
import { APP_ROUTES } from './utils/navigation';

const pathToTab = (pathname: string): string => {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/about') return 'about';
  if (clean === '/sustainable-farming') return 'sustainable-farming';
  if (clean === '/waste-management') return 'waste-management';
  if (clean === '/aga') return 'aga';
  if (clean === '/marketplace') return 'marketplace';
  if (clean === '/equipment-hub') return 'equipment-hub';
  if (clean === '/carbon-integrity') return 'carbon-integrity';
  if (clean === '/partnerships') return 'partnerships';
  if (clean === '/agriculture-updates') return 'agriculture-updates';
  if (clean === '/contact') return 'contact';
  if (clean === '/dashboard/farmer') return 'dashboard-farmer';
  if (clean === '/dashboard/waste') return 'dashboard-waste';
  if (clean === '/dashboard/processing') return 'dashboard-processing';
  if (clean === '/dashboard/equipment') return 'dashboard-equipment';
  if (clean === '/dashboard/partner') return 'dashboard-partner';
  if (clean === '/dashboard/verification') return 'dashboard-verification';
  if (clean === '/admin') return 'admin';
  return 'home';
};

const tabToPath = (tab: string): string => {
  switch (tab) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'sustainable-farming': return '/sustainable-farming';
    case 'waste-management': return '/waste-management';
    case 'aga': return '/aga';
    case 'marketplace': return '/marketplace';
    case 'equipment-hub': return '/equipment-hub';
    case 'carbon-integrity': return '/carbon-integrity';
    case 'partnerships': return '/partnerships';
    case 'agriculture-updates': return '/agriculture-updates';
    case 'contact': return '/contact';
    case 'dashboard-farmer': return '/dashboard/farmer';
    case 'dashboard-waste': return '/dashboard/waste';
    case 'dashboard-processing': return '/dashboard/processing';
    case 'dashboard-equipment': return '/dashboard/equipment';
    case 'dashboard-partner': return '/dashboard/partner';
    case 'dashboard-verification': return '/dashboard/verification';
    case 'admin': return '/admin';
    default: return '/';
  }
};

export default function App() {
  const [currentTab, setCurrentTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return pathToTab(window.location.pathname);
    }
    return 'home';
  });

  const setCurrentTab = (tab: string) => {
    setCurrentTabState(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tabToPath(tab);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentTabState(pathToTab(window.location.pathname));
    };
    const handleCustomNav = () => {
      setCurrentTabState(pathToTab(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('krishi_location_change', handleCustomNav);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('krishi_location_change', handleCustomNav);
    };
  }, []);

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const m = getMultiTranslations(language);

  // Core Data States (With Firestore persistence & offline fallback)
  const [wasteRequests, setWasteRequests] = useState<WasteCollectionRequest[]>(INITIAL_WASTE_REQUESTS);
  const [batches, setBatches] = useState<ProcessingBatch[]>(INITIAL_BATCHES);
  const [products, setProducts] = useState<OrganicProduct[]>(INITIAL_PRODUCTS);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
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
      } catch {
        return true;
      }
    }
    return true;
  });

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Real-time Firestore sync with resilient fallback
  useEffect(() => {
    try {
      // 1. Waste requests
      const unsubWaste = onSnapshot(collection(db, 'waste_requests'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteRequests: WasteCollectionRequest[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as any),
          }));
          setWasteRequests((prev) => {
            const merged = [...remoteRequests];
            INITIAL_WASTE_REQUESTS.forEach((init) => {
              if (!merged.some((m) => m.id === init.id)) merged.push(init);
            });
            return merged;
          });
        }
      }, (err) => console.log('Firestore waste_requests sync:', err.message));

      // 2. Processing batches
      const unsubBatches = onSnapshot(collection(db, 'processing_batches'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteBatches: ProcessingBatch[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as any),
          }));
          setBatches((prev) => {
            const merged = [...remoteBatches];
            INITIAL_BATCHES.forEach((init) => {
              if (!merged.some((m) => m.id === init.id)) merged.push(init);
            });
            return merged;
          });
        }
      }, (err) => console.log('Firestore processing_batches sync:', err.message));

      // 3. Organic products
      const unsubProducts = onSnapshot(collection(db, 'organic_products'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteProds: OrganicProduct[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as any),
          }));
          setProducts((prev) => {
            const merged = [...remoteProds];
            INITIAL_PRODUCTS.forEach((init) => {
              if (!merged.some((m) => m.id === init.id)) merged.push(init);
            });
            return merged;
          });
        }
      }, (err) => console.log('Firestore organic_products sync:', err.message));

      // 4. Real-time Support tickets (Strictly real data only - no fake fixtures)
      const unsubTickets = onSnapshot(collection(db, 'support_tickets'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteTickets: SupportTicket[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as any),
          }));
          setTickets(remoteTickets);
        } else {
          setTickets([]);
        }
      }, (err) => console.log('Firestore support_tickets sync:', err.message));

      return () => {
        unsubWaste();
        unsubBatches();
        unsubProducts();
        unsubTickets();
      };
    } catch (e) {
      console.warn('Firestore subscription initialized with local cache');
    }
  }, []);

  const handleRequestPickup = async (req: Partial<WasteCollectionRequest>) => {
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

    // Persist to Firestore
    try {
      await addDoc(collection(db, 'waste_requests'), newReq);
    } catch (err) {
      console.warn('Persisted locally to cache:', err);
    }
  };

  const handleAddBatch = async (batch: Partial<ProcessingBatch>) => {
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

    // Persist to Firestore
    try {
      await addDoc(collection(db, 'processing_batches'), newBatch);
    } catch (err) {
      console.warn('Persisted locally to cache:', err);
    }
  };

  const handleAddProduct = async (prod: Partial<OrganicProduct>) => {
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

    // Persist to Firestore
    try {
      await addDoc(collection(db, 'organic_products'), newProd);
    } catch (err) {
      console.warn('Persisted locally to cache:', err);
    }
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

  const handleTicketCreated = async (newTicket: SupportTicket) => {
    setTickets([newTicket, ...tickets]);
    // Persist to Firestore
    try {
      await addDoc(collection(db, 'support_tickets'), newTicket);
    } catch (err) {
      console.warn('Ticket saved locally:', err);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col relative text-gray-900 bg-[#f8faf8]">
      {/* Floating Organic Leaf Particle Background */}
      <AnimatedBackground />

      {/* Subtle Farm Landscape Ambient Framing */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${farmerWelcomeImg}')`,
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#f8faf8]/95" />


      {/* Main App Navigation Header (PINNED sticky top-0) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenVoice={() => setIsHelplineOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenPrototypeModal={() => setIsPrototypeModalOpen(true)}
      />

      {/* Vertical Slide-over Navigation Drawer */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setIsSidebarOpen(false);
        }}
        language={language}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenHelpline={() => {
          setIsHelplineOpen(true);
          setIsSidebarOpen(false);
        }}
        onOpenLegal={(type) => {
          setLegalModalType(type);
          setIsSidebarOpen(false);
        }}
      />

      {/* Clean Vertical Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
        <div className="space-y-6">
          {/* Webpage Breadcrumb bar when on dedicated modules */}
          {currentTab !== 'home' && (
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-xs shadow-2xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('home')}
                  className="font-medium text-emerald-800 hover:underline flex items-center gap-1"
                >
                  <span>{t.navHome}</span>
                </button>
                <span className="text-gray-400">/</span>
                <span className="font-bold text-gray-900 capitalize">
                  {currentTab === 'about' && 'About Krishi Green'}
                  {currentTab === 'sustainable-farming' && 'Sustainable Farming & Soil Health'}
                  {currentTab === 'waste-management' && 'Organic Waste Management'}
                  {currentTab === 'aga' && 'AGA Organic Fertilizer'}
                  {currentTab === 'marketplace' && 'Unified Marketplace (Buy & Sell)'}
                  {currentTab === 'equipment-hub' && 'Farmer Equipment Hub (AP CHCs)'}
                  {currentTab === 'carbon-integrity' && 'Carbon Integrity & Standards'}
                  {currentTab === 'partnerships' && 'Institutional & CSR Partnerships'}
                  {currentTab === 'agriculture-updates' && 'Agriculture Weather & Mandi Updates'}
                  {currentTab === 'contact' && 'Farmer Contact & Helpline'}
                  {currentTab === 'dashboard-farmer' && 'Farmer Dashboard (Rythu Mitra)'}
                  {currentTab === 'dashboard-waste' && 'Waste Operations & Fleet Dispatch'}
                  {currentTab === 'dashboard-processing' && 'Compost Processing Facility'}
                  {currentTab === 'dashboard-equipment' && 'Equipment Hub Operator'}
                  {currentTab === 'dashboard-partner' && 'CSR & Institutional Partner Portal'}
                  {currentTab === 'dashboard-verification' && 'Independent Carbon Verification (MRV)'}
                  {currentTab === 'admin' && 'System Super Admin Control'}
                  {currentTab === 'process' && (m.servicePipelineTitle || 'Our Process')}
                  {currentTab === 'ap-pilot' && (m.serviceMachineryTitle || 'Custom Hiring Hubs')}
                  {currentTab === 'pipeline' && '16-Stage Pipeline'}
                  {currentTab === 'carbon' && 'Carbon Engine'}
                  {currentTab === 'rotation' && 'Crop Rotation'}
                  {currentTab === 'schemes' && 'Government Schemes'}
                  {currentTab === 'impact' && 'Impact Ledger'}
                  {currentTab === 'maps' && 'Agri Maps'}
                  {currentTab === 'search' && 'Agro Intel Search'}
                  {currentTab === 'helpline' && '24x7 Helpline'}
                </span>
              </div>
              <button
                onClick={() => setCurrentTab('home')}
                className="text-[11px] font-mono text-stone-800 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-sm border border-stone-300"
              >
                {t.backToOverview}
              </button>
            </div>
          )}

          {/* PAGE 1: Home / Intro Overview */}
          {currentTab === 'home' && (
            <div className="space-y-6">
              <HomeIntro
                onNavigate={(tab) => setCurrentTab(tab)}
                onOpenHelpline={() => setIsHelplineOpen(true)}
                language={language}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <MapsLocationDetector
                  language={language}
                  onLocationDetected={(loc) => console.log('Detected loc:', loc)}
                />
                <SearchGroundingWidget language={language} />
              </div>
              <div className="pt-2 border-t border-emerald-100/80">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wider font-mono">
                      {language === 'te' ? 'వాతావరణం & వర్షపాత నివేదిక' : language === 'hi' ? 'क्षेत्रीय कृषि मौसम और वर्षा पूर्वानुमान' : 'Regional Agromet Weather & Rain Probability'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentTab('agriculture-updates')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'te' ? 'పూర్తి నివేదిక చూడండి' : 'Open Weather Intel'}</span>
                    <span>→</span>
                  </button>
                </div>
                <RealtimeWeatherDashboardWidget language={language} />
              </div>
            </div>
          )}

          {/* PAGE 2: About Krishi Green */}
          {currentTab === 'about' && (
            <AboutPage language={language} />
          )}

          {/* PAGE 3: Sustainable Farming & Soil Carbon */}
          {currentTab === 'sustainable-farming' && (
            <SustainableFarmingPage language={language} batches={batches} />
          )}

          {/* PAGE 4: Organic Waste Management */}
          {currentTab === 'waste-management' && (
            <WasteManagementPage
              language={language}
              wasteRequests={wasteRequests}
              onRequestPickup={handleRequestPickup}
              onOpenQR={setActiveQRBatch}
            />
          )}

          {/* PAGE 5: AGA Organic Fertilizer */}
          {currentTab === 'aga' && (
            <AgaProductPage language={language} onOpenQR={setActiveQRBatch} />
          )}

          {/* PAGE 6: Unified Marketplace */}
          {currentTab === 'marketplace' && (
            <MarketplacePage
              language={language}
              products={products}
              onAddProduct={handleAddProduct}
              onOpenQR={handleOpenQRForProduct}
            />
          )}

          {/* PAGE 7: Farmer Equipment Hub */}
          {currentTab === 'equipment-hub' && (
            <EquipmentHubPage language={language} />
          )}

          {/* PAGE 8: Carbon Integrity & Standards */}
          {currentTab === 'carbon-integrity' && (
            <CarbonIntegrityPage language={language} />
          )}

          {/* PAGE 9: Institutional & CSR Partnerships */}
          {currentTab === 'partnerships' && (
            <PartnershipsPage language={language} />
          )}

          {/* PAGE 10: Agriculture Updates & Weather */}
          {currentTab === 'agriculture-updates' && (
            <AgricultureUpdatesPage language={language} />
          )}

          {/* PAGE 11: Contact & Farmer Support */}
          {currentTab === 'contact' && (
            <ContactPage
              language={language}
              tickets={tickets}
              onTicketCreated={handleTicketCreated}
            />
          )}

          {/* DASHBOARD 1: Farmer Dashboard */}
          {currentTab === 'dashboard-farmer' && (
            <FarmerDashboard
              language={language}
              wasteRequests={wasteRequests}
              products={products}
              onLanguageChange={setLanguage}
            />
          )}

          {/* DASHBOARD 2: Waste Operations */}
          {currentTab === 'dashboard-waste' && (
            <WasteOperationsDashboard
              language={language}
              wasteRequests={wasteRequests}
            />
          )}

          {/* DASHBOARD 3: Processing Facility */}
          {currentTab === 'dashboard-processing' && (
            <ProcessingFacilityDashboard
              language={language}
              batches={batches}
              onAddBatch={handleAddBatch}
              onOpenQR={setActiveQRBatch}
            />
          )}

          {/* DASHBOARD 4: Equipment Operator */}
          {currentTab === 'dashboard-equipment' && (
            <EquipmentOperatorDashboard language={language} />
          )}

          {/* DASHBOARD 5: Partner Dashboard */}
          {currentTab === 'dashboard-partner' && (
            <PartnerDashboard language={language} />
          )}

          {/* DASHBOARD 6: Verification & MRV */}
          {currentTab === 'dashboard-verification' && (
            <VerificationDashboard language={language} />
          )}

          {/* DASHBOARD 7: Admin Panel */}
          {currentTab === 'admin' && (
            <AdminDashboard
              language={language}
              wasteRequests={wasteRequests}
              batches={batches}
              products={products}
              tickets={tickets}
            />
          )}

          {/* Backward-compatible views */}
          {currentTab === 'process' && (
            <div className="space-y-6 animate-fadeIn">
              <OurProcessSection
                onNavigate={(tab) => setCurrentTab(tab)}
                language={language}
              />
            </div>
          )}
          {currentTab === 'ap-pilot' && <AndhraPradeshDiscoveryMap language={language} />}
          {currentTab === 'pipeline' && (
            <WasteToWealthPipeline language={language} onOpenQR={setActiveQRBatch} />
          )}
          {(currentTab === 'marketplace-products' || currentTab === 'marketplace-machinery') && (
            <DualMarketplace
              products={products}
              equipment={equipment}
              onOpenQR={handleOpenQRForProduct}
              onAddProduct={handleAddProduct}
              language={language}
              initialSector={currentTab === 'marketplace-machinery' ? 'equipment' : 'products'}
            />
          )}
          {currentTab === 'carbon' && <CarbonEngineSection language={language} />}
          {currentTab === 'rotation' && <CropRotationScheduler batches={batches} language={language} />}
          {currentTab === 'schemes' && <SchemeNavigator language={language} />}
          {currentTab === 'impact' && <RealImpactDashboard language={language} />}
          {currentTab === 'maps' && <MapsLocationDetector language={language} />}
          {currentTab === 'search' && (
            <div className="space-y-6">
              <RealtimeWeatherDashboardWidget language={language} />
              <SearchGroundingWidget language={language} />
            </div>
          )}
          {currentTab === 'helpline' && (
            <HelplinePage
              language={language}
              tickets={tickets}
              onTicketCreated={handleTicketCreated}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 text-xs text-gray-500 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#047857] text-sm">KrishiGreen</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{t.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => setCurrentTab('helpline')}
              className="font-medium text-[#047857] hover:underline cursor-pointer"
            >
              {t.tollFree}: {t.tollFreeNumber}
            </button>
            <button
              onClick={() => setLegalModalType('tos')}
              className="font-medium text-[#047857] hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setLegalModalType('privacy')}
              className="font-medium text-[#047857] hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>hello@krishigreen.in</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Trigger for 24x7 Helpline & Support Tickets Drawer */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        <button
          onClick={() => setShowTicketsDrawer(!showTicketsDrawer)}
          className="px-4 py-2 bg-white hover:bg-gray-50 text-emerald-950 rounded-full border border-emerald-200 shadow-md transition flex items-center gap-2 text-xs font-bold cursor-pointer"
          title={t.tickets}
        >
          <IconShield className="w-4 h-4 text-emerald-700" />
          <span>{t.tickets} ({tickets.length})</span>
        </button>

        <button
          onClick={() => setIsHelplineOpen(true)}
          className="px-4 py-2 bg-[#047857] hover:bg-[#065f46] text-white rounded-full shadow-md transition flex items-center gap-2 text-xs font-bold cursor-pointer"
        >
          <IconPhone className="w-4 h-4" />
          <span>{t.tollFreeNumber}</span>
        </button>
      </div>

      {/* Slide-over Tickets Drawer */}
      {showTicketsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 animate-fadeIn">
          <div className="bg-white text-gray-900 w-full max-w-md h-full p-5 border-l border-gray-200 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                    <IconShield className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-base">{t.tickets}</h3>
                </div>
                <button
                  onClick={() => setShowTicketsDrawer(false)}
                  className="text-gray-400 hover:text-gray-700 p-1"
                >
                  <IconClose className="w-4 h-4" />
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

      {/* Prototype Welcome Announcement Modal (Shown on site open) */}
      <PrototypeNoticeModal
        isOpen={isPrototypeModalOpen}
        onClose={() => setIsPrototypeModalOpen(false)}
        language={language}
      />

      {/* Subtle Offline Mode & Paused Sync Notification Toast */}
      <OfflineSyncToast language={language} />

      {/* Official Terms of Service and Privacy Policy Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        language={language}
      />

    </div>
  );
}
