import React, { useState } from 'react';
import { IconInfo, IconClose, IconChevronRight } from './Icons';
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
      <div className="bg-[#241c15] text-stone-300 text-[11px] px-3 py-1 flex items-center justify-between border-b border-[#3d2b1f] z-30 font-mono">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300 uppercase">
              {isTe ? 'ప్రొటోటైప్ మోడ్' : 'Prototype Mode'}:
            </span>
            <span className="text-stone-300 hidden sm:inline">
              {isTe
                ? 'ఆంధ్రప్రదేశ్ పైలట్ ప్రాజెక్ట్ : డిజిటల్ అగ్రి ప్లాట్‌ఫారమ్'
                : 'Andhra Pradesh Circular Bio-Economy Pilot Edition'}
            </span>
          </div>
          <button
            onClick={() => setIsDismissed(false)}
            className="text-amber-300 hover:text-white underline text-[10px]"
          >
            {isTe ? 'నోటీస్ చూపించు' : 'Show Notice'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-30 bg-[#2d1b06] text-[#fbfaf6] border-b border-[#4d2f0d]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs">
        {/* Left: Indicator Badge + Message */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-400 bg-amber-500/10 text-amber-300 font-bold text-[10px] tracking-wide uppercase shrink-0">
            <IconInfo className="w-3.5 h-3.5 text-amber-300" />
            <span>{isTe ? 'ప్రొటోటైప్ డెమో' : 'PROTOTYPE DEMONSTRATION'}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-amber-100/90 truncate font-normal">
            {isTe ? (
              <span>
                <strong>గమనిక:</strong> కృషిగ్రీన్ ఆంధ్రప్రదేశ్ కోసం <strong>ఇంటరాక్టివ్ ప్రొటోటైప్ పైలట్ మోడ్</strong> లో పనిచేస్తోంది. ఫీచర్లు మరియు డేటా ప్రదర్శన & మూల్యాంకనం కొరకు.
              </span>
            ) : (
              <span>
                <strong>Notice: KrishiGreen is currently operating in Interactive Prototype Pilot Mode</strong> for Andhra Pradesh. Features and data are for demonstration & evaluation.
              </span>
            )}
          </p>
        </div>

        {/* Right: Learn More CTA + Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1 bg-[#472c0e] hover:bg-[#5c3912] text-amber-300 hover:text-white text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/80 transition cursor-pointer shadow-xs"
            title={isTe ? 'ప్రొటోటైప్ వివరాలు' : 'Prototype Details'}
          >
            <span>{isTe ? 'ప్రొటోటైప్ వివరాలు >' : 'Prototype Details >'}</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-amber-300/80 hover:text-white rounded-full transition cursor-pointer ml-1"
            title={isTe ? 'నోటీస్ తగ్గించు' : 'Minimize notice'}
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
