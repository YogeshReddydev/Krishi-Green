import React, { useState } from 'react';
import { Sparkles, Info, X, ChevronRight, Beaker } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PrototypeTopBannerProps {
  language: SupportedLanguage;
  onOpenDetails: () => void;
}

export const PrototypeTopBanner: React.FC<PrototypeTopBannerProps> = ({
  language,
  onOpenDetails,
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const isTe = language === 'te';

  if (isDismissed) {
    return (
      <div className="bg-amber-950/90 text-amber-200 text-[11px] px-3 py-1 flex items-center justify-between border-b border-amber-800/60 z-30">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold tracking-wide uppercase text-amber-300">
              {isTe ? 'ప్రొటోటైప్ డెమో మోడ్' : 'Prototype Demo Mode'}:
            </span>
            <span className="text-amber-100/90 hidden sm:inline">
              {isTe
                ? 'ఆంధ్రప్రదేశ్ పైలట్ ప్రాజెక్ట్ - డెమో ప్లాట్‌ఫారమ్'
                : 'Andhra Pradesh Circular Bio-Economy Pilot Edition'}
            </span>
          </div>
          <button
            onClick={() => setIsDismissed(false)}
            className="text-amber-300 hover:text-white underline font-semibold cursor-pointer text-[10px]"
          >
            {isTe ? 'బ్యానర్ చూపించు' : 'Show Banner'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-30 bg-gradient-to-r from-amber-950 via-amber-900 to-emerald-950 text-white border-b border-amber-500/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs">
        {/* Left: Indicator Badge + Message */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/50 text-amber-200 font-extrabold text-[10px] uppercase tracking-wider shrink-0 shadow-2xs">
            <Beaker className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{isTe ? 'పైలట్ ప్రొటోటైప్' : 'Prototype Demonstration'}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-amber-50 font-medium truncate">
            {isTe ? (
              <span>
                <strong>గమనిక:</strong> ఇది కృషిగ్రీన్ వర్కింగ్ ప్రొటోటైప్ వేదిక. సేంద్రీయ ఎరువులు, వ్యర్థాల సేకరణ & AI సలహాలు డెమో కొరకు ఉద్దేశించినవి.
              </span>
            ) : (
              <span>
                <strong>Notice:</strong> KrishiGreen is currently operating in <strong>Interactive Prototype Pilot Mode</strong> for Andhra Pradesh. Features and data are for demonstration & evaluation.
              </span>
            )}
          </p>
        </div>

        {/* Right: Learn More CTA + Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white font-bold text-[11px] px-2.5 py-1 rounded-lg border border-amber-400/40 transition active:scale-95 cursor-pointer"
            title={isTe ? 'ప్రొటోటైప్ వివరాలు చూడండి' : 'View Prototype Details & Scope'}
          >
            <span>{isTe ? 'వివరాలు చూడండి' : 'Prototype Details'}</span>
            <ChevronRight className="w-3 h-3 text-amber-300" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-amber-300/80 hover:text-white hover:bg-white/10 rounded transition cursor-pointer"
            title={isTe ? 'బ్యానర్ తగ్గించు' : 'Minimize notice'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
