import React from 'react';
import {
  Sprout,
  Globe2,
  Mic,
  Menu,
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
  onOpenHelpline: () => void;
  onOpenVoice: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenVoice,
  onToggleSidebar,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-colors duration-200">
      {/* 1. Thin Real-Time Weather Alert Banner */}
      <WeatherAlertBanner language={language} />

      {/* 2. Main Header Board: Menu Trigger + Logo on Left, Profile + Utilities on Right */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Left-Panel Menu Sector Trigger & Brand Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Menu Button to open Left Panel Drawer */}
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100/90 text-emerald-950 font-black rounded-xl border border-emerald-300/80 shadow-2xs transition active:scale-95 cursor-pointer"
            aria-label="Open Left Panel Menu"
            title={language === 'te' ? 'మెనూ జాబితా తెరవండి' : 'Open Left Navigation Menu'}
          >
            <Menu className="w-5 h-5 text-emerald-800" />
            <span className="text-xs font-black tracking-wide text-emerald-950">
              {language === 'te' ? 'మెనూ' : 'Menu'}
            </span>
          </button>

          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-700/20 text-white shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5 h-5 text-emerald-50" />
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl text-emerald-950 tracking-tight leading-none">
                Krishi<span className="text-emerald-600">Green</span>
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-semibold tracking-tight mt-0.5 max-w-[200px] sm:max-w-md truncate">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tools on the Board: Weather, Voice, Language, and Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Small compact weather and temperature indicator */}
          <div className="shrink-0 hidden xs:block">
            <WeatherWidget />
          </div>

          {/* Voice Search Quick Button */}
          <button
            onClick={onOpenVoice}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition border border-emerald-200/80 flex items-center gap-1.5 text-xs font-semibold shadow-2xs active:scale-98"
            title={language === 'te' ? 'తెలుగులో వాయిస్ అసిస్టెంట్' : 'Speak query in regional language'}
          >
            <Mic className="w-4 h-4 text-emerald-700" />
            <span className="hidden xl:inline">{t.voiceAssistant}</span>
          </button>

          {/* 13+ Languages Dropdown */}
          <div className="relative flex items-center bg-gray-100/90 hover:bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-2xs transition">
            <Globe2 className="w-4 h-4 text-emerald-700 ml-1.5 mr-1 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-bold text-gray-800 pr-2 py-1 focus:outline-none cursor-pointer"
              title="Select App Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* User Profile on the Board */}
          <div className="pl-0.5 border-l border-emerald-100/80">
            <UserAuthButton language={language} />
          </div>
        </div>
      </div>
    </header>
  );
};
