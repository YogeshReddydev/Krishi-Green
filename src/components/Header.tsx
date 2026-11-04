import React from 'react';
import {
  IconMenu,
  IconGlobe,
  IconLayers,
} from './Icons';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { WeatherWidget } from './WeatherWidget';
import { WeatherAlertBanner } from './WeatherAlertBanner';
import { UserAuthButton } from './UserAuthButton';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  onOpenHelpline: () => void;
  onOpenVoice: () => void;
  onToggleSidebar: () => void;
  onOpenPrototypeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenVoice,
  onToggleSidebar,
  onOpenPrototypeModal,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200/80 shadow-2xs">

      {/* 1. Agricultural Regional Advisory Sector */}
      <WeatherAlertBanner language={language} />

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 bg-white">
        {/* Left: Navigation Drawer Trigger & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#eafaf1] hover:bg-[#d1fae5] text-[#047857] font-bold rounded-full border border-[#a7f3d0] transition cursor-pointer text-xs sm:text-sm shadow-2xs"
            aria-label="Open Navigation Menu"
            title={m.menu}
          >
            <IconMenu className="w-4 h-4 text-[#047857]" />
            <span className="font-bold tracking-wide">
              {m.menu}
            </span>
          </button>

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-9 h-9 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-xs">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">
                  Krishi<span className="text-[#059669]">Green</span>
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPrototypeModal?.();
                  }}
                  className="px-2 py-0.5 bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] border border-[#fde68a] rounded-full text-[9px] font-extrabold uppercase tracking-wide transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Prototype Notice"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                  <span>
                    {language === 'te' ? 'పైలట్' : language === 'hi' ? 'प्रोटोटाइप' : 'PROTOTYPE'}
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-tight mt-0.5 max-w-[200px] sm:max-w-md truncate">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tools: Helpline, Language, and Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Toll-Free Call Button */}
          <a
            href="tel:18005747443"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold rounded-full border border-amber-500 transition cursor-pointer text-xs shadow-2xs"
            title="Toll-Free Helpline 1800-574-7443"
          >
            <svg className="w-3.5 h-3.5 text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-mono tracking-tight font-black">1800-KRISHI-GRN</span>
          </a>

          {/* Regional Language Selector */}
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 border border-gray-200 shadow-2xs">
            <IconGlobe className="w-3.5 h-3.5 text-gray-500 mr-1.5 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-semibold text-gray-700 pr-1 py-0.5 focus:outline-none cursor-pointer"
              title="Select Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="pl-1">
            <UserAuthButton language={language} />
          </div>
        </div>
      </div>

      {/* 3. Desktop Sub-Navigation Bar for Quick Page Hopping */}
      <nav className="hidden lg:block border-t border-gray-100 bg-[#fbfaf6] px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-gray-700 overflow-x-auto">
          <div className="flex items-center gap-1.5 flex-nowrap">
            {[
              { id: 'home', label: language === 'te' ? 'ముఖచిత్రం' : 'Home' },
              { id: 'about', label: language === 'te' ? 'గురించి' : 'About' },
              { id: 'sustainable-farming', label: language === 'te' ? 'సహజ సేద్యం' : 'Sustainable Farming' },
              { id: 'waste-management', label: language === 'te' ? 'వ్యర్థాల సేకరణ' : 'Waste Management' },
              { id: 'aga', label: language === 'te' ? 'AGA ఎరువు' : 'AGA Fertilizer' },
              { id: 'marketplace', label: language === 'te' ? 'మార్కెట్' : 'Marketplace' },
              { id: 'equipment-hub', label: language === 'te' ? 'యంత్రాల హబ్' : 'Equipment Hub' },
              { id: 'carbon-integrity', label: language === 'te' ? 'కర్బన లెడ్జర్' : 'Carbon Integrity' },
              { id: 'partnerships', label: language === 'te' ? 'భాగస్వామ్యాలు' : 'Partnerships' },
              { id: 'agriculture-updates', label: language === 'te' ? 'వాతావరణ వార్తలు' : 'Agri Updates' },
              { id: 'contact', label: language === 'te' ? 'హెల్ప్‌లైన్' : 'Contact & Help' },
            ].map((p) => {
              const active = currentTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentTab(p.id)}
                  className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                    active
                      ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                      : 'hover:bg-emerald-50 hover:text-emerald-900 text-gray-700'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-gray-200">
            <button
              onClick={() => setCurrentTab('dashboard-farmer')}
              className="px-2 py-0.5 rounded text-[11px] font-bold text-emerald-800 hover:bg-emerald-100/60"
            >
              {language === 'te' ? 'రైతు పోర్టల్' : 'Farmer Portal'}
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => setCurrentTab('admin')}
              className="px-2 py-0.5 rounded text-[11px] font-bold text-gray-600 hover:bg-gray-200"
            >
              Admin / 7 Roles
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
