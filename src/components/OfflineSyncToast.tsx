import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface OfflineSyncToastProps {
  language: SupportedLanguage;
}

export const OfflineSyncToast: React.FC<OfflineSyncToastProps> = ({ language }) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [hasEverBeenOffline, setHasEverBeenOffline] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const isTe = language === 'te';

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false);
      setShowToast(true);

      // Auto-hide the "back online" confirmation after 4 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasEverBeenOffline(true);
      setIsDismissed(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check: if already offline on load
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      setHasEverBeenOffline(true);
      setShowToast(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Do not render if dismissed or if toast should be hidden (unless currently offline and not dismissed)
  const isVisible = (!isOnline && !isDismissed) || (isOnline && showToast && hasEverBeenOffline && !isDismissed);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-[92vw] sm:max-w-md w-full animate-fadeIn transition-all duration-300"
    >
      <div
        className={`p-3.5 sm:p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 flex items-start gap-3 text-white ${
          !isOnline
            ? 'bg-slate-950/95 border-amber-500/50 shadow-amber-950/30'
            : 'bg-slate-950/95 border-emerald-500/50 shadow-emerald-950/30'
        }`}
      >
        {/* Status Icon */}
        <div className="shrink-0 mt-0.5">
          {!isOnline ? (
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center relative">
              <WifiOff className="w-5 h-5 text-amber-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-black tracking-tight text-white">
              {!isOnline
                ? (isTe ? 'ఆఫ్‌లైన్ మోడ్ క్రియాశీలకం' : 'Offline Mode Active')
                : (isTe ? 'ఇంటర్నెట్ పునరుద్ధరించబడింది' : 'Connection Restored')}
            </h4>

            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider border ${
                !isOnline
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
              }`}
            >
              {!isOnline
                ? (isTe ? 'డేటా సింక్ నిలిపివేయబడింది' : 'Sync Paused')
                : (isTe ? 'సింక్ తిరిగి ప్రారంభమైంది' : 'Live Sync Active')}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-300 leading-snug font-medium">
            {!isOnline
              ? (isTe
                  ? 'మీ పరికరం ఇంటర్నెట్‌కు కనెక్ట్ కాలేదు. స్థానిక మార్పులు క్యాష్‌లో సురక్షితంగా ఉంటాయి; నెట్‌వర్క్ రాగానే క్లౌడ్ డేటా సింక్ ప్రారంభమవుతుంది.'
                  : 'You are currently offline. Cloud data sync is temporarily paused. All local actions and submissions remain safely cached in your browser.')
              : (isTe
                  ? 'ఇంటర్నెట్ కనెక్షన్ స్థిరపడింది. కృషిగ్రీన్ క్లౌడ్ డేటాబేస్‌తో ప్రత్యక్ష డేటా సింక్ కొనసాగుతోంది.'
                  : 'Internet connection is back. Resuming real-time synchronization with the KrishiGreen cloud network.')}
          </p>

          {!isOnline && (
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-amber-200/90 font-mono">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{isTe ? 'స్థానిక ఆఫ్‌లైన్ నిల్వ సిద్ధంగా ఉంది' : 'Local Offline Storage Ready'}</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
          aria-label="Dismiss notification"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
