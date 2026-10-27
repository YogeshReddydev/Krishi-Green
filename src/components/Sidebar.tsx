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
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Sprout,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: SupportedLanguage;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenHelpline: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenHelpline,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const navSections = [
    {
      title: language === 'te' ? 'ప్రధాన విభాగం' : 'MAIN',
      items: [
        {
          id: 'home',
          label: t.navHome || 'Home / Overview',
          subLabel: language === 'te' ? 'ప్రధాన ముఖచిత్రం' : 'Agri Overview & Hero',
          icon: Home,
          badge: null,
        },
      ],
    },
    {
      title: language === 'te' ? 'క్షేత్ర కార్యకలాపాలు & యంత్రాలు' : 'FIELD & OPERATIONS',
      items: [
        {
          id: 'ap-pilot',
          label: t.navApPilot || 'AP Equipment & Providers',
          subLabel: language === 'te' ? '5 పైలట్ జిల్లాలు' : '5 Pilot Districts',
          icon: MapPin,
          badge: '5 Dists',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'pipeline',
          label: t.navPipeline || 'Waste-to-Wealth Pipeline',
          subLabel: language === 'te' ? '16 దశల ప్రాసెసింగ్' : '16-Stage Traceable',
          icon: Layers,
          badge: '16 Stg',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        },
        {
          id: 'marketplace',
          label: t.navMarketplace || 'Dual Marketplace & Machinery',
          subLabel: language === 'te' ? 'ఎరువులు & అద్దె పరికరాలు' : 'Bio-Inputs & Rental',
          icon: ShoppingBag,
          badge: 'Active',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        },
        {
          id: 'carbon',
          label: t.navCarbon || 'Carbon & Climate Engine',
          subLabel: language === 'te' ? 'BEE / ICM కార్బన్ లెడ్జర్' : 'BEE / ICM Registry',
          icon: Flame,
          badge: 'BEE/ICM',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'rotation',
          label: t.navRotation || 'Crop Rotation Scheduler',
          subLabel: language === 'te' ? 'వృద్ధి స్థితి & రొటేషన్' : 'Growth Sync & Health',
          icon: RotateCcw,
          badge: 'Live',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        },
      ],
    },
    {
      title: language === 'te' ? 'ప్రభుత్వ సేవలు & నిఘా' : 'GOVERNMENT & INTEL',
      items: [
        {
          id: 'schemes',
          label: t.navSchemes || 'Govt Subsidies & Schemes',
          subLabel: language === 'te' ? 'PM-PRANAM & SMAM' : 'PM-PRANAM & SMAM',
          icon: FileCheck2,
          badge: 'Official',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        },
        {
          id: 'impact',
          label: t.navImpact || 'Live Impact Ledger',
          subLabel: language === 'te' ? 'ఆడిట్ లెడ్జర్ & ఎక్స్‌పోర్ట్' : 'Audited Ledger & PDF',
          icon: TrendingUp,
          badge: 'Audited',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
          id: 'maps',
          label: t.navMaps || 'Agri Maps Hub',
          subLabel: language === 'te' ? 'జిల్లాల మ్యాపింగ్' : 'GIS Location Finder',
          icon: Compass,
          badge: null,
        },
        {
          id: 'search',
          label: t.navSearch || 'Weather & Agro Intel',
          subLabel: language === 'te' ? 'వాతావరణం & వర్ష సూచన' : 'Rain Risk & Advisory',
          icon: CloudSun,
          badge: 'IMD',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
        },
      ],
    },
    {
      title: language === 'te' ? 'రైతు సేవలు' : 'FARMER SUPPORT',
      items: [
        {
          id: 'helpline',
          label: t.navHelpline || '24x7 Helpline & AI',
          subLabel: language === 'te' ? 'ఉచిత టోల్‌ఫ్రీ కాల్' : 'Toll-Free & Support',
          icon: Bot,
          badge: '1800 Free',
          badgeColor: 'bg-emerald-600 text-white border-transparent',
        },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  const content = (
    <div className="h-full flex flex-col justify-between overflow-y-auto select-none scrollbar-thin scrollbar-thumb-emerald-200">
      {/* Top brand header inside sidebar */}
      <div>
        <div className={`p-4 border-b border-emerald-100/90 flex items-center justify-between ${isCollapsed ? 'justify-center p-3' : ''}`}>
          <div
            onClick={() => handleItemClick('home')}
            className={`flex items-center gap-3 cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}
            title="KrishiGreen - Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-green-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition shrink-0">
              <Sprout className="w-5 h-5 text-emerald-100" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base text-emerald-950 tracking-tight leading-none">
                    Krishi<span className="text-emerald-600">Green</span>
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono border border-emerald-200">
                    AP PILOT
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                  {t.tagline || 'Circular Agriculture Platform'}
                </p>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-2 space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-black text-emerald-800/80 tracking-wider uppercase font-mono">
                  {section.title}
                </div>
              )}
              {isCollapsed && <div className="border-t border-emerald-100/70 my-2 mx-2" />}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      title={item.label}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-150 relative group ${
                        isActive
                          ? 'bg-emerald-800 text-white font-bold shadow-xs'
                          : 'text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-950 font-medium'
                      } ${isCollapsed ? 'justify-center px-2 py-2.5' : ''}`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-300 rounded-r-full" />
                      )}

                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-emerald-200' : 'text-emerald-700'
                        }`}
                      />

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs truncate tracking-tight">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border shrink-0 ${
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
                                isActive ? 'text-emerald-200/80' : 'text-gray-400'
                              }`}
                            >
                              {item.subLabel}
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Area inside Sidebar */}
      <div className="p-3 border-t border-emerald-100/90 bg-emerald-50/40 space-y-2">
        {!isCollapsed && (
          <div className="bg-white p-2.5 rounded-xl border border-emerald-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider">
                Andhra Pradesh Hub
              </span>
            </div>
            <p className="text-[10px] text-gray-600 leading-tight">
              Palnadu • Prakasam • Kurnool • Godavari • Vizianagaram
            </p>
            <button
              onClick={() => {
                onOpenHelpline();
                onCloseMobile();
              }}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold transition shadow-2xs"
            >
              <Phone className="w-3 h-3 text-emerald-200" />
              <span>1800-KRISHI-GRN</span>
            </button>
          </div>
        )}

        {/* Collapse toggle button for desktop */}
        <div className="hidden lg:flex items-center justify-between pt-1">
          <button
            onClick={onToggleCollapse}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-gray-500 hover:text-emerald-800 hover:bg-emerald-100/60 rounded-lg transition border border-transparent hover:border-emerald-200`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-emerald-700" />
                <span className="text-[11px] font-semibold text-gray-600">
                  {language === 'te' ? 'ప్యానెల్ కుదించు' : 'Collapse Panel'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Panel */}
      <aside
        className={`hidden lg:block shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-white border-r border-emerald-100 transition-all duration-300 z-30 shadow-2xs ${
          isCollapsed ? 'w-20' : 'w-64 xl:w-72'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Slide-over Drawer with Backdrop */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
