import React from 'react';
import {
  Sprout,
  Phone,
  Globe2,
  Smartphone,
  Layers,
  ShoppingBag,
  TrendingUp,
  FileCheck2,
  Mic,
  RotateCcw,
  Home,
  Bot,
  Compass,
  Search,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { WeatherWidget } from './WeatherWidget';
import { UserAuthButton } from './UserAuthButton';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  viewMode: 'portal' | 'mobile';
  setViewMode: (mode: 'portal' | 'mobile') => void;
  onOpenHelpline: () => void;
  onOpenVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  viewMode,
  setViewMode,
  onOpenHelpline,
  onOpenVoice,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'pipeline', label: t.navPipeline, icon: Layers },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingBag },
    { id: 'rotation', label: t.navRotation, icon: RotateCcw },
    { id: 'schemes', label: t.navSchemes, icon: FileCheck2 },
    { id: 'impact', label: t.navImpact, icon: TrendingUp },
    { id: 'maps', label: t.navMaps, icon: Compass },
    { id: 'search', label: t.navSearch, icon: Search },
    { id: 'helpline', label: t.navHelpline, icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner: One-liner & Helpline quick access (Language Reactive) */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 text-white text-xs py-1.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
            {t.nationalMission}
          </span>
          <span className="hidden md:inline font-medium text-emerald-100">
            {t.oneLiner}
          </span>
          <span className="md:hidden font-medium text-emerald-100">
            {t.tagline}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentTab('helpline')}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 px-3 py-0.5 rounded-full text-white font-bold transition text-[11px] shadow-xs"
          >
            <Phone className="w-3 h-3 text-emerald-200 animate-pulse" />
            <span>{t.tollFreeNumber}</span>
          </button>

          {/* Portal vs Mobile view mode toggles */}
          <div className="bg-emerald-950/70 p-0.5 rounded-lg flex items-center text-[11px] border border-emerald-800/50">
            <button
              onClick={() => setViewMode('portal')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition ${
                viewMode === 'portal'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
              title="Full Desktop & FPO View"
            >
              {t.portalView}
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition flex items-center gap-1 ${
                viewMode === 'mobile'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
              title="Farmer Mobile Friendly Layout"
            >
              <Smartphone className="w-3 h-3" />
              <span>{t.mobileView}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setCurrentTab('home')}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-green-600 to-lime-500 flex items-center justify-center shadow-md shadow-emerald-700/20 text-white shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-xl text-emerald-950 tracking-tight leading-none">
                Krishi<span className="text-emerald-600">Green</span>
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono">
                {t.circularAgro}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium tracking-tight">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items (Responsive to selected language) */}
        <nav className="hidden xl:flex items-center gap-1 bg-gray-50/90 p-1 rounded-xl border border-gray-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right tools: Weather widget, Voice trigger, Multilingual Selector & User Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Real-time Agricultural Weather Widget */}
          <WeatherWidget />

          {/* Voice Search Quick Button */}
          <button
            onClick={onOpenVoice}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition border border-emerald-200/60 flex items-center gap-1.5 text-xs font-semibold"
            title="Speak query in regional language"
          >
            <Mic className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">{t.voiceAssistant}</span>
          </button>

          {/* 13+ Languages Dropdown */}
          <div className="relative flex items-center bg-gray-100/90 rounded-xl p-1 border border-gray-200 shadow-2xs">
            <Globe2 className="w-4 h-4 text-emerald-700 ml-1.5 mr-1 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-bold text-gray-800 pr-2 py-1 focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Firebase Google Auth & User Profile Button */}
          <UserAuthButton language={language} />
        </div>
      </div>

      {/* Secondary Ribbon for tablet & mobile navigation (Responsive to language) */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-4 py-1.5 bg-gray-50/90 border-t border-gray-100 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
