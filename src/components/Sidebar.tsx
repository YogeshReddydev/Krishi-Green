import React from 'react';
import {
  Home,
  MapPin,
  Layers,
  ShoppingBag,
  Flame,
  RotateCcw,
  FileCheck2,
  TrendingUp,
  Compass,
  CloudSun,
  Bot,
  X,
  Phone,
  Sprout,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
  onOpenHelpline: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  isOpen,
  onClose,
  onOpenHelpline,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const navSections = [
    {
      title: language === 'te' ? 'ప్రధాన విభాగం' : 'MAIN NAVIGATION',
      items: [
        {
          id: 'home',
          label: t.navHome || 'Home / Overview',
          subLabel: language === 'te' ? 'ప్రధాన ముఖచిత్రం & రైతు స్వాగతం' : 'Entrance Hero & Circular Flow',
          icon: Home,
          badge: null,
        },
        {
          id: 'process',
          label: language === 'te' ? 'మా విధానం (ప్రక్రియ)' : 'Our Process',
          subLabel: language === 'te' ? 'వ్యర్థాల సేకరణ నుండి సేంద్రీయ దిగుబడి' : 'Waste Collection to Organic Yield',
          icon: RefreshCw,
          badge: '6 Stages',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
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
          icon: MapPin,
          badge: language === 'te' ? 'నెట్‌వర్క్' : 'Network',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'pipeline',
          label: t.navPipeline || 'Waste-to-Wealth Pipeline',
          subLabel: language === 'te' ? '16 దశల క్యూఆర్ ట్రేసింగ్' : '16-Stage Traceable Batching',
          icon: Layers,
          badge: '16 Stg',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        },
        {
          id: 'marketplace',
          label: t.navMarketplace || 'Dual Marketplace & Machinery',
          subLabel: language === 'te' ? 'సేంద్రీయ ఎరువులు & అద్దె పరికరాలు' : 'Bio-Inputs & Custom Hiring',
          icon: ShoppingBag,
          badge: language === 'te' ? 'ప్రత్యక్షం' : 'Live',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        },
        {
          id: 'carbon',
          label: t.navCarbon || 'Carbon & Climate Engine',
          subLabel: language === 'te' ? 'BEE / ICM కార్బన్ క్రెడిట్ లెడ్జర్' : 'BEE / ICM Registry (₹750/tCO2e)',
          icon: Flame,
          badge: 'BEE/ICM',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'rotation',
          label: t.navRotation || 'Crop Rotation Scheduler',
          subLabel: language === 'te' ? '5-దశల పంట వృద్ధి స్థితి & ఎమోజి ట్రాకర్' : 'Growth Sync & Emoji Status',
          icon: RotateCcw,
          badge: language === 'te' ? 'వృద్ధి' : 'Active',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
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
          icon: FileCheck2,
          badge: 'Official',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        },
        {
          id: 'impact',
          label: t.navImpact || 'Live Impact Ledger',
          subLabel: language === 'te' ? 'ఆడిట్ లెడ్జర్ & పీడీఎఫ్ డౌన్‌లోడ్' : 'Audited Records & PDF Export',
          icon: TrendingUp,
          badge: 'Audited',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'maps',
          label: t.navMaps || 'Agri Maps Hub',
          subLabel: language === 'te' ? 'జీపీఎస్ & స్థానిక కేంద్రాలు' : 'GIS Field Location Finder',
          icon: Compass,
          badge: 'GIS',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'search',
          label: t.navSearch || 'Weather & Agro Intel',
          subLabel: language === 'te' ? 'వాతావరణం, వర్షపాతం & మండి ధరలు' : 'Rain Risk & IMD Agromet Advisory',
          icon: CloudSun,
          badge: 'Live IMD',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
        },
      ],
    },
    {
      title: language === 'te' ? 'రైతు మద్దతు & సహాయం' : 'FARMER SUPPORT',
      items: [
        {
          id: 'helpline',
          label: t.navHelpline || '24x7 Helpline & AI',
          subLabel: language === 'te' ? 'ఉచిత టోల్‌ఫ్రీ కాల్ 1800-KRISHI-GRN' : 'Toll-Free & Telugu AI Advisor',
          icon: Bot,
          badge: '1800 Free',
          badgeColor: 'bg-emerald-600 text-white border-transparent',
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
      {/* Dimmed Backdrop Overlay (Strictly Vertical - closes on tap) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250 border-r border-emerald-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-100 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition shrink-0">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-white tracking-tight leading-none">
                  Krishi<span className="text-emerald-400">Green</span>
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/90 font-medium tracking-tight mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition active:scale-95"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-emerald-200">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 pt-2 pb-1 text-[10px] font-black text-emerald-800 tracking-wider uppercase font-mono">
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
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all duration-150 relative group ${
                        isActive
                          ? 'bg-emerald-800 text-white font-bold shadow-sm'
                          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-medium'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-emerald-300 rounded-r-full" />
                      )}

                      <div
                        className={`p-2 rounded-xl shrink-0 transition-colors ${
                          isActive
                            ? 'bg-emerald-700 text-emerald-100'
                            : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate tracking-tight">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md border shrink-0 ${
                                isActive
                                  ? 'bg-emerald-700 text-emerald-100 border-emerald-600'
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
                              isActive ? 'text-emerald-200/90' : 'text-gray-500'
                            }`}
                          >
                            {item.subLabel}
                          </p>
                        )}
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? 'text-emerald-200' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer with Helpline & Tagline */}
        <div className="p-4 border-t border-emerald-100 bg-emerald-50/50 space-y-2.5">
          <div className="bg-white p-3 rounded-2xl border border-emerald-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider">
                {language === 'te' ? 'జాతీయ వ్యవసాయ పర్యావరణ వ్యవస్థ' : 'National Agri-Ecological Network'}
              </span>
            </div>
            <p className="text-[10px] text-gray-600 leading-tight">
              {language === 'te'
                ? 'భారతదేశ రైతులు, ఎఫ్‌పీఓలు మరియు సేంద్రీయ ఉత్పత్తిదారుల కొరకు'
                : 'Serving farmers, FPOs & food-waste aggregators nationwide'}
            </p>
            <button
              onClick={() => {
                onOpenHelpline();
                onClose();
              }}
              className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs active:scale-98"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
              <span>{t.tollFree}: 1800-KRISHI-GRN</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-emerald-800 font-semibold italic">
            "{t.tagline}"
          </p>
        </div>
      </div>
    </div>
  );
};
