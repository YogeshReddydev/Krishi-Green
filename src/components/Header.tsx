import React from 'react';
import {
  Sprout,
  Phone,
  Globe2,
  Smartphone,
  Mic,
  Menu,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { WeatherWidget } from './WeatherWidget';
import { WeatherAlertBanner } from './WeatherAlertBanner';
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
  onToggleMobileSidebar: () => void;
  onToggleDesktopSidebar?: () => void;
  isSidebarCollapsed?: boolean;
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
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
  isSidebarCollapsed,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'home':
        return t.navHome || 'Home / Overview';
      case 'ap-pilot':
        return t.navApPilot || 'AP Equipment & Providers';
      case 'pipeline':
        return t.navPipeline || 'Waste-to-Wealth Pipeline';
      case 'marketplace':
        return t.navMarketplace || 'Dual Marketplace & Machinery';
      case 'carbon':
        return t.navCarbon || 'Carbon & Climate Engine';
      case 'rotation':
        return t.navRotation || 'Crop Rotation Scheduler';
      case 'schemes':
        return t.navSchemes || 'Govt Subsidies & Schemes';
      case 'impact':
        return t.navImpact || 'Live Impact Ledger';
      case 'maps':
        return t.navMaps || 'Agri Maps Hub';
      case 'search':
        return t.navSearch || 'Weather & Agro Intel';
      case 'helpline':
        return t.navHelpline || '24x7 Helpline & AI';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/90 shadow-xs transition-colors duration-200">
      {/* Top Banner: One-liner & Helpline quick access (Organic Biophilic Bar) */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white text-xs py-1.5 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/50">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-emerald-500/25 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase border border-emerald-400/30">
            {t.nationalMission}
          </span>
          <span className="hidden md:inline font-medium text-emerald-100/95 text-[11px]">
            {t.oneLiner}
          </span>
          <span className="md:hidden font-medium text-emerald-100/95 text-[11px]">
            {t.tagline}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentTab('helpline')}
            className="flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1 rounded-full text-white font-bold transition text-[11px] shadow-xs border border-emerald-400/40 active:scale-98"
          >
            <Phone className="w-3 h-3 text-emerald-200 animate-pulse" />
            <span>{t.tollFreeNumber}</span>
          </button>

          {/* Portal vs Mobile view mode toggles */}
          <div className="bg-emerald-950/80 p-0.5 rounded-xl flex items-center text-[11px] border border-emerald-800/60">
            <button
              onClick={() => setViewMode('portal')}
              className={`px-2.5 py-0.5 rounded-lg font-medium transition ${
                viewMode === 'portal'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
              title="Full Desktop & FPO View"
            >
              {t.portalView}
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-0.5 rounded-lg font-medium transition flex items-center gap-1 ${
                viewMode === 'mobile'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
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

      {/* Real-Time Adverse Weather Alert Banner (Search-Grounded for Farmers) */}
      <WeatherAlertBanner language={language} />

      {/* Main navigation bar without overflowing horizontal tab slider */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Sidebar Hamburger toggle + Brand Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition active:scale-95"
            aria-label="Open navigation menu"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-emerald-800" />
          </button>

          {/* Desktop sidebar toggle button */}
          <button
            onClick={onToggleDesktopSidebar}
            className="hidden lg:flex p-2 rounded-xl text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/80 transition active:scale-95"
            aria-label="Toggle navigation panel"
            title="Toggle navigation sidebar"
          >
            <Menu className="w-4 h-4 text-emerald-800" />
          </button>

          {/* Brand logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-700/20 text-white shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5 h-5 text-emerald-50" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-lg sm:text-xl text-emerald-950 tracking-tight leading-none">
                  Krishi<span className="text-emerald-600">Green</span>
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-mono border border-emerald-200 hidden sm:inline-block">
                  {t.circularAgro}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-tight mt-0.5 hidden xs:block">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Current Active Module Chip / Breadcrumb indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50/70 rounded-full border border-emerald-200/70 text-xs font-semibold text-emerald-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-gray-500 text-[11px]">Active View:</span>
          <span className="font-bold text-emerald-950">{getTabLabel(currentTab)}</span>
        </div>

        {/* Right tools: Weather widget, Voice trigger, Multilingual Selector & User Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Real-time Agricultural Weather Widget (Now plenty of space!) */}
          <div className="shrink-0">
            <WeatherWidget />
          </div>

          {/* Voice Search Quick Button */}
          <button
            onClick={onOpenVoice}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition border border-emerald-200/80 flex items-center gap-1.5 text-xs font-semibold shadow-2xs active:scale-98"
            title="Speak query in regional language"
          >
            <Mic className="w-4 h-4 text-emerald-700" />
            <span className="hidden xl:inline">{t.voiceAssistant}</span>
          </button>

          {/* 13+ Languages Dropdown with flag icon */}
          <div className="relative flex items-center bg-gray-100/90 hover:bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-2xs transition">
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
    </header>
  );
};
