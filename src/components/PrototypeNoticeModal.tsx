import React, { useState } from 'react';
import {
  Sparkles,
  Beaker,
  ShieldCheck,
  CheckCircle2,
  X,
  Layers,
  Bot,
  Scale,
  ExternalLink,
  Sprout,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface PrototypeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const PrototypeNoticeModal: React.FC<PrototypeNoticeModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  if (!isOpen) return null;

  const isTe = language === 'te';

  const handleDismiss = () => {
    if (dontShowAgain && typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('krishigreen_prototype_dismissed_v1', 'true');
      } catch {
        // ignore storage errors
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prototype-modal-title"
      >
        {/* Top Header Banner with Green/Amber Gradient */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 text-white p-5 sm:p-6 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-wider">
                <Beaker className="w-3.5 h-3.5 text-amber-300" />
                <span>{isTe ? 'అధికారిక పైలట్ ప్రొటోటైప్' : 'Interactive Prototype Pilot'}</span>
              </div>
              <h2
                id="prototype-modal-title"
                className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2"
              >
                <span>{isTe ? 'కృషిగ్రీన్ వేదికకు స్వాగతం' : 'Welcome to KrishiGreen'}</span>
                <span className="text-emerald-300">🌱</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-snug">
                {isTe
                  ? 'ఆహార వ్యర్థాల నుండి సేంద్రీయ ఎరువుల ఉత్పత్తి — ఆంధ్రప్రదేశ్ పైలట్ ప్రదర్శన వేదిక'
                  : 'Food Waste to Farmer Wealth Ecosystem — Andhra Pradesh Pilot Demonstration'}
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {/* Key Advisory Callout Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 text-xs sm:text-sm mb-1">
                {isTe ? 'ప్రొటోటైప్ ప్రకటన & ఉద్దేశ్యం' : 'Platform Prototype Demonstration Notice'}
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                {isTe
                  ? 'ఈ వెబ్‌సైట్ ఒక కార్యాచరణ ప్రొటోటైప్ (Functional Prototype). ఆంధ్రప్రదేశ్ రైతులు, వ్యవసాయ ఉత్పత్తిదారుల సంఘాలు (FPOలు), మరియు గ్రామ స్వయం ఉపాధి కేంద్రాల కోసం రూపొందించబడిన వృత్తాకార జీవ-ఆర్థిక వ్యవస్థను ఇది ప్రదర్శిస్తుంది.'
                  : 'This platform is an interactive, fully-functional prototype developed to demonstrate the circular bio-economy pipeline: collecting urban/rural organic food waste, processing high-grade vermicompost, supplying certified inputs, and providing 24x7 AI advisory.'}
              </p>
            </div>
          </div>

          {/* Core Prototype Capabilities */}
          <div className="space-y-2.5">
            <h3 className="font-black text-gray-900 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{isTe ? 'ప్రొటోటైప్‌లో అందుబాటులో ఉన్న విభాగాలు' : 'Interactive Features Included in this Prototype:'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block text-xs">
                    {isTe ? 'వ్యర్థాల సేకరణ & కంపోస్టింగ్ పైప్‌లైన్' : 'Waste-to-Wealth Pipeline'}
                  </span>
                  <span className="text-[11px] text-gray-600">
                    {isTe
                      ? 'సేకరణ అభ్యర్థనలు & QR కోడ్ బ్యాచ్ ట్రేసబిలిటీ'
                      : 'Collection requests, 45-day processing, & QR traceability'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block text-xs">
                    {isTe ? 'సేంద్రీయ మార్కెట్ & యంత్రాల అద్దె' : 'Marketplace & Machinery Hubs'}
                  </span>
                  <span className="text-[11px] text-gray-600">
                    {isTe
                      ? 'ధృవీకరించబడిన సేంద్రీయ ఎరువులు & కస్టమ్ హైరింగ్ కేంద్రాలు'
                      : 'Direct organic bio-inputs & custom hiring center rentals'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block text-xs">
                    {isTe ? '24x7 బహుభాషా AI సలహాదారు & శోధన' : '24x7 Multilingual AI Advisory'}
                  </span>
                  <span className="text-[11px] text-gray-600">
                    {isTe
                      ? 'గూగుల్ జెమిని & IMD లైవ్ వాతావరణ ఆధారిత సలహాలు'
                      : 'Gemini AI agronomist with live IMD weather search grounding'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block text-xs">
                    {isTe ? 'నేల కార్బన్ & ఆర్థిక ప్రయోజన లెక్కింపు' : 'Soil Carbon & Impact Ledger'}
                  </span>
                  <span className="text-[11px] text-gray-600">
                    {isTe
                      ? 'రసాయన ఎరువుల ఖర్చు ఆదా & మీథేన్ నివారణ నివేదికలు'
                      : 'Chemical fertilizer savings & verifiable carbon certificates'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pilot Scope & Simulation Note */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600 space-y-1">
            <span className="font-bold text-gray-800 block">
              📍 {isTe ? 'పైలట్ పరిధి & డేటా గమనిక:' : 'Pilot Coverage & Demonstration Data Note:'}
            </span>
            <p>
              {isTe
                ? 'ఆంధ్రప్రదేశ్ లోని పల్నాడు, గుంటూరు, గోదావరి డెల్టా, కర్నూలు మరియు ప్రకాశం జిల్లాల వ్యవసాయ కేంద్రాలపై ప్రాథమిక దృష్టి కేంద్రీకరించబడింది. ప్రదర్శించబడిన లావాదేవీలు మరియు బ్యాచ్ వివరాలు పైలట్ పరీక్ష కొరకు ఉద్దేశించినవి.'
                : 'Primary pilot hubs focus on Andhra Pradesh (Palnadu, Guntur, Godavari Delta, Kurnool, Prakasam). Waste collection requests, batch logs, and simulated transactions operate in prototype testing mode.'}
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 cursor-pointer"
            />
            <span>{isTe ? 'ఈ పరికరంలో మళ్లీ చూపించవద్దు' : 'Do not show again on this device'}</span>
          </label>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-700/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isTe ? 'ప్రొటోటైప్‌ను ప్రారంభించండి' : 'Explore KrishiGreen Prototype'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
