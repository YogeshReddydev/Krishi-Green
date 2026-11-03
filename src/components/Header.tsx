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
                  <span>PROTOTYPE</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-tight mt-0.5 max-w-[200px] sm:max-w-md truncate">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tools: Voice Assistant, Language, and Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Voice Assistant Pill Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eafaf1] hover:bg-[#d1fae5] text-[#047857] font-bold rounded-full border border-[#a7f3d0] transition cursor-pointer text-xs shadow-2xs"
            title={m.voiceAssistant}
          >
            <svg className="w-3.5 h-3.5 text-[#047857]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="hidden sm:inline">{m.voiceAssistant}</span>
          </button>

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
    </header>
  );
};
