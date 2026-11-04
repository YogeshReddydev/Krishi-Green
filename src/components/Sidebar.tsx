import React from 'react';
import {
  IconHome,
  IconMapPin,
  IconLayers,
  IconBag,
  IconFlame,
  IconRefresh,
  IconFileText,
  IconTrendingUp,
  IconCompass,
  IconCloudSun,
  IconTractor,
  IconClose,
  IconPhone,
  IconSprout,
  IconShield,
  IconChevronRight,
  IconLeaf,
  IconUsers,
  IconTruck,
} from './Icons';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
  onOpenHelpline: () => void;
  onOpenLegal?: (type: 'tos' | 'privacy') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  isOpen,
  onClose,
  onOpenHelpline,
  onOpenLegal,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';
  const isTa = language === 'ta';

  const navSections = [
    {
      title: isTe ? 'ప్రజా పేజీలు (PUBLIC PAGES)' : isHi ? 'सार्वजनिक पृष्ठ (PUBLIC PAGES)' : 'PUBLIC PAGES',
      items: [
        {
          id: 'home',
          label: isTe ? 'ముఖచిత్రం (Home)' : 'Home',
          subLabel: isTe ? 'వ్యవసాయ పరిచయం & ముఖ్యాంశాలు' : 'Circular Agro-Bioeconomy Overview',
          icon: IconHome,
          badge: null,
        },
        {
          id: 'about',
          label: isTe ? 'కృషి గ్రీన్ గురించి (About)' : 'About Krishi Green',
          subLabel: isTe ? 'లక్ష్యం, సూత్రాలు & బయో-ఎకానమీ' : 'Mission, Circular Model & Leadership',
          icon: IconShield,
          badge: 'Mission',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'sustainable-farming',
          label: isTe ? 'సహజ సేద్యం (Sustainable Farming)' : 'Sustainable Farming',
          subLabel: isTe ? 'నేల కర్బనం, జీవామృతం & పంట మార్పిడి' : 'Soil Organic Carbon & Natural Agronomy',
          icon: IconSprout,
          badge: 'Soil Health',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'waste-management',
          label: isTe ? 'వ్యర్థాల సేకరణ (Waste Management)' : 'Waste Management',
          subLabel: isTe ? 'మండీ & ఆహార వ్యర్థాల సేకరణ' : 'Request Organic Waste Collection',
          icon: IconLayers,
          badge: 'Collection',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'aga',
          label: isTe ? 'AGA సేంద్రీయ ఎరువు (AGA Fertilizer)' : 'AGA Organic Fertilizer',
          subLabel: isTe ? 'ఆవు పేడ & జీవామృతం మిశ్రమం' : 'Flagship Bio-Input & Curing Protocol',
          icon: IconLeaf,
          badge: 'Flagship',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        },
        {
          id: 'marketplace',
          label: isTe ? 'మార్కెట్‌ప్లేస్ (Marketplace)' : 'Unified Marketplace',
          subLabel: isTe ? 'కొనుగోలు & అమ్మకం వేదిక' : 'Buy & Sell Verified Organic Inputs',
          icon: IconBag,
          badge: 'Buy/Sell',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'equipment-hub',
          label: isTe ? 'యంత్రాల హబ్ (Equipment Hub)' : 'Farmer Equipment Hub',
          subLabel: isTe ? 'ఆంధ్రప్రదేశ్ CHC యంత్రాలు' : 'Find Farming Equipment Near You',
          icon: IconTractor,
          badge: 'CHC Hubs',
          badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        },
        {
          id: 'carbon-integrity',
          label: isTe ? 'కర్బన విశ్వసనీయత (Carbon Integrity)' : 'Carbon Integrity',
          subLabel: isTe ? '9-దశల శాస్త్రీయ లెక్కింపు & 70% DBT' : '9-Stage Protocol & 70% Farmer DBT',
          icon: IconFlame,
          badge: 'ICM/BEE',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'partnerships',
          label: isTe ? 'భాగస్వామ్యాలు (Partnerships)' : 'Institutional & CSR',
          subLabel: isTe ? 'గ్రామీణ యంత్ర కేంద్రాల స్పాన్సర్‌షిప్' : 'Sponsor CHCs & Decarbonized Units',
          icon: IconUsers,
          badge: 'CSR',
          badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        },
        {
          id: 'agriculture-updates',
          label: isTe ? 'వ్యవసాయ సమాచారం (Agri Updates)' : 'Agriculture Updates',
          subLabel: isTe ? 'వాతావరణ రాడార్, మండి ధరలు & సబ్సిడీలు' : 'IMD Bulletins, Crop Advice & Schemes',
          icon: IconCloudSun,
          badge: 'Live',
          badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        },
        {
          id: 'contact',
          label: isTe ? 'సంప్రదించండి (Contact & Help)' : 'Contact & Helpline',
          subLabel: isTe ? 'ఉచిత టోల్‌ఫ్రీ: 1800-KRISHI-GRN' : 'Toll-Free 1800-KRISHI-GRN & Offices',
          icon: IconPhone,
          badge: '1800 Free',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        },
      ],
    },
    {
      title: isTe ? 'రోల్ ఆధారిత డాష్‌బోర్డులు (DASHBOARDS)' : isHi ? 'डैशबोर्ड (DASHBOARDS)' : 'ROLE DASHBOARDS',
      items: [
        {
          id: 'dashboard-farmer',
          label: isTe ? 'రైతు డాష్‌బోర్డ్' : 'Farmer Dashboard',
          subLabel: isTe ? 'వ్యర్థాల రికార్డులు & ఎరువుల బుకింగ్' : 'Requests, AGA Orders & CHC Bookings',
          icon: IconHome,
          badge: 'Rythu',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'dashboard-waste',
          label: isTe ? 'వ్యర్థాల ఆపరేషన్స్ డాష్‌బోర్డ్' : 'Waste Operations',
          subLabel: isTe ? 'వాహన రవాణా & వేబ్రిడ్జ్ లాగ్‌లు' : 'Daily Manifests & Weighbridge Slips',
          icon: IconTruck,
          badge: 'Fleet',
          badgeColor: 'bg-gray-100 text-gray-800 border-gray-300',
        },
        {
          id: 'dashboard-processing',
          label: isTe ? 'ప్రాసెసింగ్ ప్లాంట్ డాష్‌బోర్డ్' : 'Processing Facility',
          subLabel: isTe ? 'విండ్రో ఉష్ణోగ్రత & క్యూరింగ్ దశలు' : 'Fermentation Tracker & FCO Lab Tests',
          icon: IconRefresh,
          badge: 'Refinery',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'dashboard-equipment',
          label: isTe ? 'యంత్రాల ఆపరేటర్ డాష్‌బోర్డ్' : 'Equipment Operator',
          subLabel: isTe ? 'CHC యంత్రాల స్థితి నియంత్రణ' : 'Inventory & Availability Status',
          icon: IconTractor,
          badge: 'Operator',
          badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        },
        {
          id: 'dashboard-partner',
          label: isTe ? 'CSR పార్టనర్ డాష్‌బోర్డ్' : 'Partner & CSR Portal',
          subLabel: isTe ? 'స్పాన్సర్ చేసిన గ్రామీణ హబ్‌లు' : 'Fund Utilization & Milestone Reports',
          icon: IconUsers,
          badge: 'Oversight',
          badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        },
        {
          id: 'dashboard-verification',
          label: isTe ? 'ధ్రువీకరణ ఆడిట్ డాష్‌బోర్డ్' : 'Verification & MRV',
          subLabel: isTe ? 'స్వతంత్ర కర్బన తనిఖీ సమీక్ష' : 'Weighbridge & Sensor Compliance Review',
          icon: IconShield,
          badge: 'Audit',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        },
        {
          id: 'admin',
          label: isTe ? 'సిస్టమ్ అడ్మిన్' : 'Admin Control Center',
          subLabel: isTe ? 'మొత్తం ప్లాట్‌ఫారమ్ టెలిమెట్రీ & రోల్ స్విచ్' : 'Full Telemetry & Role Simulator',
          icon: IconShield,
          badge: 'SuperAdmin',
          badgeColor: 'bg-red-100 text-red-900 border-red-300',
        },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed Solid Overlay */}
      <div
        className="fixed inset-0 bg-stone-900/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full flex flex-col z-10 border-r border-gray-200 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-900/10 bg-[#064e3b] text-white flex items-center justify-between">
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-xs">
              <IconSprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                  Krishi<span className="text-emerald-300">Green</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-800 border border-emerald-600 text-emerald-200">
                  AP Pilot
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 font-medium tracking-tight mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition cursor-pointer"
            aria-label="Close navigation menu"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-500 tracking-wider uppercase font-mono">
                {section.title}
              </div>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition relative border ${
                        isActive
                          ? 'bg-[#064e3b] text-white border-[#064e3b] font-medium shadow-xs'
                          : 'text-gray-800 hover:bg-emerald-50/70 hover:text-emerald-950 border-transparent'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg shrink-0 border ${
                          isActive
                            ? 'bg-emerald-700 text-white border-emerald-600'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold truncate tracking-tight">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                                isActive
                                  ? 'bg-[#2d523f] text-stone-200 border-[#3e6852]'
                                  : item.badgeColor
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subLabel && (
                          <p
                            className={`text-[10px] truncate leading-tight mt-0.5 ${
                              isActive ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {item.subLabel}
                          </p>
                        )}
                      </div>

                      <IconChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-stone-300' : 'text-stone-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer with Helpline & Legal Policies */}
        <div className="p-3.5 border-t border-[#ded9ce] bg-stone-100 space-y-2.5">
          <div className="bg-[#fdfcf9] p-3 rounded-sm border border-[#ded9ce]">
            <div className="flex items-center gap-2 mb-1">
              <IconShield className="w-4 h-4 text-[#1e382b] shrink-0" />
              <span className="text-[10px] font-mono font-bold text-stone-800 uppercase tracking-wider">
                {language === 'te' ? 'జాతీయ వ్యవసాయ పర్యావరణ వ్యవస్థ' : 'National Agri-Ecological Network'}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-tight">
              {language === 'te'
                ? 'భారతదేశ రైతులు, ఎఫ్‌పీఓలు మరియు సేంద్రీయ ఉత్పత్తిదారుల కొరకు'
                : 'Serving farmers, FPOs & food-waste aggregators nationwide'}
            </p>
            <button
              onClick={() => {
                onOpenHelpline();
                onClose();
              }}
              className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#1e382b] hover:bg-[#2d523f] text-[#fbfaf6] rounded-sm text-xs font-semibold border border-[#1e382b] transition-colors"
            >
              <IconPhone className="w-3.5 h-3.5 text-stone-200" />
              <span>{t.tollFree}: 1800-KRISHI-GRN</span>
            </button>
          </div>

          {/* Legal Links (TOS and Privacy Policy) */}
          <div className="flex items-center justify-between px-1 text-[11px] text-stone-600 font-mono">
            <button
              onClick={() => {
                if (onOpenLegal) onOpenLegal('tos');
                onClose();
              }}
              className="hover:text-stone-900 underline underline-offset-2"
            >
              Terms of Service
            </button>
            <span className="text-stone-400">|</span>
            <button
              onClick={() => {
                if (onOpenLegal) onOpenLegal('privacy');
                onClose();
              }}
              className="hover:text-stone-900 underline underline-offset-2"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
