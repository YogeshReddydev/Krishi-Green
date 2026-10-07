import React, { useState } from 'react';
import {
  Search,
  CloudSun,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  Loader2,
  Sparkles,
  Globe2,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface SearchGroundingWidgetProps {
  language: SupportedLanguage;
}

export const SearchGroundingWidget: React.FC<SearchGroundingWidgetProps> = ({ language }) => {
  const [query, setQuery] = useState<string>('Current weather forecast and APMC vegetable mandi prices in Nashik');
  const [location, setLocation] = useState<string>('Nashik, Maharashtra');
  const [topic, setTopic] = useState<'weather' | 'mandi' | 'subsidies' | 'general'>('weather');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);

  const presets = [
    {
      id: 'weather',
      label: '☀️ Live Weather & Rain Alert',
      q: `Live weather forecast, rainfall probability, and soil moisture conditions in ${location}`,
    },
    {
      id: 'mandi',
      label: '📈 APMC Mandi Commodity Prices',
      q: `Today's APMC vegetable and crop mandi wholesale modal prices in ${location}`,
    },
    {
      id: 'fertilizer',
      label: '🌱 Organic Fertilizer Rates',
      q: `Current market price per kg for certified vermicompost and DAP fertilizer in India`,
    },
    {
      id: 'subsidies',
      label: '🏛️ PM-PRANAM & SMAM Grants',
      q: `Latest government guidelines for PM-PRANAM scheme and SMAM tractor subsidies in 2026`,
    },
  ];

  const handleSearch = async (customQuery?: string) => {
    const qToSend = customQuery || query;
    if (!qToSend.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: qToSend,
          location,
          topic,
        }),
      });

      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Search grounding error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Globe2 className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-gray-900 text-base">
              Live Google Search Grounding for Weather & Mandi Intel
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Real-time agricultural facts powered by Gemini 3.5 Flash with Google Search Grounding.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-Time Web Data</span>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setQuery(p.q);
              handleSearch(p.q);
            }}
            className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200 hover:border-emerald-300 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-2xl px-4 py-2.5">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search live weather, mandi rates, or agricultural notices..."
            className="w-full bg-transparent text-xs text-gray-900 font-semibold focus:outline-none"
          />
        </div>

        <button
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Search className="w-3.5 h-3.5" />
          )}
          <span>{loading ? 'Searching...' : 'Ground Search'}</span>
        </button>
      </div>

      {/* Search Results Display */}
      {result && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-200 space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-950 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Grounded Agricultural Intelligence (Google Search):</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">Live Grounding</span>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-emerald-100 text-gray-800 leading-relaxed whitespace-pre-line shadow-2xs">
            {result.answer}
          </div>

          {/* Sources and Citations if returned */}
          {result.groundingMetadata?.groundingChunks && result.groundingMetadata.groundingChunks.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Verified Search Sources:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.groundingMetadata.groundingChunks.slice(0, 4).map((chunk: any, i: number) => {
                  const web = chunk.web;
                  if (!web) return null;
                  return (
                    <a
                      key={i}
                      href={web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-white hover:bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 text-[11px] font-semibold transition"
                    >
                      <span className="truncate max-w-[180px]">{web.title || web.uri}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
