import React, { useState, useEffect } from 'react';
import { IconWifi, IconWifiOff, IconCheck, IconShield, IconClose } from './Icons';
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
  const isHi = language === 'hi';

  const t = {
    offlineTitle: isTe ? 'ఆఫ్‌లైన్ మోడ్ క్రియాశీలకం' : isHi ? 'ऑफ़लाइन मोड सक्रिय' : 'Offline Mode Active',
    onlineTitle: isTe ? 'ఇంటర్నెట్ పునరుద్ధరించబడింది' : isHi ? 'इंटरनेट कनेक्शन बहाल हुआ' : 'Connection Restored',
    offlineBadge: isTe ? 'డేటా సింక్ తాత్కాలికంగా నిలిచింది' : isHi ? 'डेटा सिंक रुका हुआ' : 'Data Sync Paused',
    onlineBadge: isTe ? 'సింక్ పునఃప్రారంభం' : isHi ? 'लाइव सिंक जारी' : 'Live Sync Resumed',
    offlineBody: isTe
      ? 'మీ పరికరం ఆఫ్‌లైన్‌లో ఉంది. క్లౌడ్ డేటా సింక్ తాత్కాలికంగా నిలిచింది. స్థానిక రికార్డులు బ్రౌజర్‌లో భద్రంగా నిల్వ ఉంటాయి.'
      : isHi
      ? 'आपका डिवाइस ऑफ़लाइन है। क्लाउड सिंक रुका हुआ है। आपके रिकॉर्ड ब्राउज़र में सुरक्षित सहेजे गए हैं।'
      : 'Your device is offline. Cloud data sync is temporarily paused. Local records and selections remain securely stored in your browser.',
    onlineBody: isTe
      ? 'ఇంటర్నెట్ కనెక్షన్ సిద్ధంగా ఉంది. క్లౌడ్ నెట్‌వర్క్‌తో ప్రత్యక్ష సమకాలీకరణ కొనసాగుతోంది.'
      : isHi
      ? 'इंटरनेट कनेक्शन फिर से जुड़ गया है। कृषिग्रीन क्लाउड नेटवर्क के साथ लाइव डेटा सिंक हो रहा है।'
      : 'Internet connection restored. Synchronizing cached records with the KrishiGreen cloud network.',
    offlineCache: isTe ? 'స్థానిక ఆఫ్‌లైన్ నిల్వ సిద్ధంగా ఉంది' : isHi ? 'ब्राउज़र ऑफ़लाइन कैशे सक्रिय' : 'Browser Offline Cache Active',
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false);
      setShowToast(true);

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

  const isVisible = (!isOnline && !isDismissed) || (isOnline && showToast && hasEverBeenOffline && !isDismissed);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-[92vw] sm:max-w-md w-full"
    >
      <div
        className={`p-3.5 sm:p-4 rounded-sm border flex items-start gap-3 text-stone-100 ${
          !isOnline
            ? 'bg-[#241c15] border-[#523e2d]'
            : 'bg-[#182a20] border-[#2d4937]'
        }`}
      >
        {/* Status Icon */}
        <div className="shrink-0 mt-0.5">
          {!isOnline ? (
            <div className="w-8 h-8 rounded-sm bg-[#3a2c20] border border-[#523e2d] text-amber-300 flex items-center justify-center">
              <IconWifiOff className="w-4 h-4 text-amber-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-sm bg-[#253d2d] border border-[#3e6852] text-stone-200 flex items-center justify-center">
              <IconCheck className="w-4 h-4 text-emerald-400" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {!isOnline ? t.offlineTitle : t.onlineTitle}
            </h4>

            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm border ${
                !isOnline
                  ? 'bg-[#3a2c20] text-amber-300 border-[#523e2d]'
                  : 'bg-[#253d2d] text-stone-200 border-[#3e6852]'
              }`}
            >
              {!isOnline ? t.offlineBadge : t.onlineBadge}
            </span>
          </div>

          <p className="text-[11px] text-stone-300 leading-snug font-sans">
            {!isOnline ? t.offlineBody : t.onlineBody}
          </p>

          {!isOnline && (
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
              <IconShield className="w-3 h-3 text-stone-400" />
              <span>{t.offlineCache}</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 rounded-sm text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss notification"
          title="Dismiss notification"
        >
          <IconClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
