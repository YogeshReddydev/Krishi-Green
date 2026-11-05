import React from 'react';
import { SupportedLanguage } from '../types';
import { RealtimeWeatherDashboardWidget } from '../components/RealtimeWeatherDashboardWidget';
import { SearchGroundingWidget } from '../components/SearchGroundingWidget';

interface Props { language: SupportedLanguage; }

export const AgricultureUpdatesPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'వ్యవసాయ వార్తలు & వాతావరణం' : 'Agriculture News & Weather'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'తాజా వాతావరణ సమాచారం, వ్యవసాయ వార్తలు మరియు ప్రభుత్వ అప్‌డేట్లు.'
            : 'Live weather updates, agricultural news and government announcements — sourced from official channels.'}
        </p>
      </section>

      {/* Weather */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">
          🌤️ {isTe ? 'వాతావరణ సమాచారం' : 'Weather Information'}
        </h2>
        <RealtimeWeatherDashboardWidget language={language} />
      </section>

      {/* News */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">
          📰 {isTe ? 'వ్యవసాయ వార్తలు' : 'Agricultural News'}
        </h2>
        <SearchGroundingWidget language={language} />
      </section>
    </main>
  );
};
