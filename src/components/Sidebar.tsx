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
} from './Icons';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

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

  const navSections = [
    {
      title: language === 'te' ? 'ప్రధాన విభాగం' : 'MAIN NAVIGATION',
      items: [
        {
          id: 'home',
          label: t.navHome || 'Home / Overview',
          subLabel: language === 'te' ? 'ప్రధాన ముఖచిత్రం: రైతు స్వాగతం' : 'Entrance Hero: Circular Flow',
          icon: IconHome,
          badge: null,
        },
        {
          id: 'process',
          label: language === 'te' ? 'మా విధానం (ప్రక్రియ)' : 'Our Process',
          subLabel: language === 'te' ? 'వ్యర్థాల సేకరణ నుండి సేంద్రీయ దిగుబడి' : 'Waste Collection to Organic Yield',
          icon: IconRefresh,
          badge: '6 Stages',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
      ],
    },
    {
      title: language === 'te' ? 'క్షేత్ర కార్యకలాపాలు & యంత్రాలు' : 'FIELD & OPERATIONS',
      items: [
        {
          id: 'ap-pilot',
          label: language === 'te' ? 'కస్టమ్ హైరింగ్ & యంత్రాలు' : 'Custom Hiring & Machinery',
          subLabel: language === 'te' ? 'యంత్రాల అద్దె & సేవా కేంద్రాలు' : 'CHC Machinery Hubs & Rentals',
          icon: IconMapPin,
          badge: language === 'te' ? 'నెట్‌వర్క్' : 'Network',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'pipeline',
          label: t.navPipeline || 'Waste-to-Wealth Pipeline',
          subLabel: language === 'te' ? '16 దశల క్యూఆర్ ట్రేసింగ్' : '16-Stage Traceable Batching',
          icon: IconLayers,
          badge: '16 Stg',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'marketplace-products',
          label: language === 'te' ? 'వ్యవసాయ ఉత్పత్తుల అమ్మకం' : 'Selling Farming Products',
          subLabel: language === 'te' ? 'ధృవీకరించబడిన జీవ ఎరువులు & వర్మీకంపోస్ట్' : 'Certified Bio-Inputs & Organic Direct',
          icon: IconBag,
          badge: language === 'te' ? 'సేంద్రీయ' : 'Organic',
          badgeColor: 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]',
        },
        {
          id: 'marketplace-machinery',
          label: language === 'te' ? 'రైతుల కోసం యంత్రాల హబ్' : 'Equipment Hub for Farmers',
          subLabel: language === 'te' ? 'గంటకు సగటు అద్దె & AP గైడ్ యంత్రాలు' : 'Hourly Rentals & AP Guide Machinery',
          icon: IconTractor,
          badge: 'AP Guide',
          badgeColor: 'bg-[#6b4f3b] text-[#fbfaf6] border-[#6b4f3b]',
        },
        {
          id: 'carbon',
          label: t.navCarbon || 'Carbon & Climate Engine',
          subLabel: language === 'te' ? 'BEE / ICM కార్బన్ క్రెడిట్ లెడ్జర్' : 'BEE / ICM Registry (Rs 750/tCO2e)',
          icon: IconFlame,
          badge: 'BEE/ICM',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'rotation',
          label: t.navRotation || 'Crop Rotation Scheduler',
          subLabel: language === 'te' ? '5-దశల పంట వృద్ధి స్థితి ట్రాకర్' : 'Growth Sync & Status Matrix',
          icon: IconRefresh,
          badge: language === 'te' ? 'వృద్ధి' : 'Active',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
      ],
    },
    {
      title: language === 'te' ? 'ప్రభుత్వ పథకాలు & నివేదికలు' : 'GOVERNANCE & AUDIT',
      items: [
        {
          id: 'schemes',
          label: t.navSchemes || 'Govt Subsidies & Schemes',
          subLabel: language === 'te' ? 'PM-PRANAM, SMAM & డీబీటీ రాయితీలు' : 'PM-PRANAM & SMAM Subsidies',
          icon: IconFileText,
          badge: 'Official',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'impact',
          label: t.navImpact || 'Live Impact Ledger',
          subLabel: language === 'te' ? 'ఆడిట్ లెడ్జర్ & పీడీఎఫ్ డౌన్‌లోడ్' : 'Audited Records & PDF Export',
          icon: IconTrendingUp,
          badge: 'Audited',
          badgeColor: 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]',
        },
        {
          id: 'maps',
          label: t.navMaps || 'Agri Maps Hub',
          subLabel: language === 'te' ? 'జీపీఎస్ & స్థానిక కేంద్రాలు' : 'GIS Field Location Finder',
          icon: IconCompass,
          badge: 'GIS',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
        {
          id: 'search',
          label: t.navSearch || 'Weather & Agro Intel',
          subLabel: language === 'te' ? 'వాతావరణం, వర్షపాతం & మండి ధరలు' : 'Rain Risk & IMD Agromet Advisory',
          icon: IconCloudSun,
          badge: 'Live IMD',
          badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
        },
      ],
    },
    {
      title: language === 'te' ? 'రైతు మద్దతు & సహాయం' : 'FARMER SUPPORT',
      items: [
        {
          id: 'helpline',
          label: t.navHelpline || '24x7 Helpline & Advisory',
          subLabel: language === 'te' ? 'ఉచిత టోల్‌ఫ్రీ కాల్ 1800-KRISHI-GRN' : 'Toll-Free & Telugu Agro Advisory',
          icon: IconPhone,
          badge: '1800 Free',
          badgeColor: 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]',
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
