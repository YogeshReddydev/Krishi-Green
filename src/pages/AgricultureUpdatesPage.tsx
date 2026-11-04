import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { getMultiTranslations } from '../utils/multiLang';
import { RealtimeWeatherDashboardWidget } from '../components/RealtimeWeatherDashboardWidget';
import { SearchGroundingWidget } from '../components/SearchGroundingWidget';
import { SchemeNavigator } from '../components/SchemeNavigator';
import { SeasonalCropAdvice } from '../components/SeasonalCropAdvice';
import { navigateTo } from '../utils/navigation';
import {
  IconSun,
  IconShield,
  IconPhone,
  IconTrendingUp,
} from '../components/Icons';

import { CropAdvisorySuggester } from '../components/CropAdvisorySuggester';

interface AgricultureUpdatesPageProps {
  language: SupportedLanguage;
}

export function AgricultureUpdatesPage({ language }: AgricultureUpdatesPageProps) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const m = getMultiTranslations(language);

  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'suggester' | 'weather' | 'advice' | 'mandi' | 'schemes'>('suggester');

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-200">
            <IconSun className="w-3.5 h-3.5" />
            <span>
              {isTe ? 'వ్యవసాయ వార్తలు & వాతావరణం' : 'Agro-Meteorology & Mandi Intel'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isTe
              ? 'వాతావరణం, పంట సలహాలు & మార్కెట్ ధరలు'
              : 'Agromet Bulletins, Crop Advisory & Mandi Prices'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            {isTe
              ? 'ఆంధ్రప్రదేశ్ జిల్లాల రైతుల కోసం తాజా వాతావరణ హెచ్చరికలు, మార్కెట్ యార్డ్ ధరలు మరియు ప్రభుత్వ సబ్సిడీ పథకాల సమాచారం.'
              : 'Real-time IMD weather bulletins, crop-specific natural farming advisories, live mandi price trends, and verified government subsidies.'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'suggester', label: isTe ? '🌾 స్మార్ట్ పంట & ఎరువు సలహా' : isHi ? '🌾 फसल व खाद सुझाव' : '🌾 Crop & AGA Suggester' },
              { id: 'weather', label: isTe ? 'వాతావరణం & వర్షపాతం' : 'Weather & Rain Radar' },
              { id: 'advice', label: isTe ? 'సీజనల్ పంట క్యాలెండర్' : 'Seasonal Crop Calendar' },
              { id: 'mandi', label: isTe ? 'మార్కెట్ ధరలు (Mandi)' : 'Live Mandi Intel' },
              { id: 'schemes', label: isTe ? 'ప్రభుత్వ సబ్సిడీలు' : 'Subsidies & Schemes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-950 shadow'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 0: Smart Crop & AGA Suggester */}
      {activeTab === 'suggester' && (
        <div className="space-y-6">
          <CropAdvisorySuggester language={language} />
        </div>
      )}

      {/* Tab 1: Weather & Radar */}
      {activeTab === 'weather' && (
        <div className="space-y-6">
          <RealtimeWeatherDashboardWidget language={language} />
        </div>
      )}

      {/* Tab 2: Seasonal Crop Advice */}
      {activeTab === 'advice' && (
        <div className="space-y-6">
          <SeasonalCropAdvice language={language} onNavigate={(tab) => navigateTo(tab)} />
        </div>
      )}

      {/* Tab 3: Mandi Intel & AI Search */}
      {activeTab === 'mandi' && (
        <div className="space-y-6">
          <SearchGroundingWidget language={language} />
        </div>
      )}

      {/* Tab 4: Government Schemes */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          <SchemeNavigator language={language} />
        </div>
      )}
    </div>
  );
}
