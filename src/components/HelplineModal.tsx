import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  CheckCircle,
  FileText,
  X,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { SupportedLanguage, SupportTicket } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({
  isOpen,
  onClose,
  language,
  onTicketCreated,
}) => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [activeIvrOption, setActiveIvrOption] = useState<string>('Crop Advice');
  const [chatInput, setChatInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [callerName, setCallerName] = useState<string>('Kisan Sathi');
  const [callerPhone, setCallerPhone] = useState<string>('+91 98220 54123');
  const [ticketCreated, setTicketCreated] = useState<SupportTicket | null>(null);

  const [conversation, setConversation] = useState<Array<{ role: 'assistant' | 'user'; text: string }>>([
    {
      role: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! कृषिग्रीन 24x7 राष्ट्रीय हेल्पलाइन 1800-KRISHI-GRN में आपका स्वागत है। आप जैविक खाद, कचरा संग्रहण, कृषि उपकरण या सरकारी योजनाओं के बारे में पूछ सकते हैं।'
          : language === 'te'
          ? 'నమస్కారం! కృషిగ్రీన్ 24x7 టోల్-ఫ్రీ హెల్ప్‌లైన్‌కు స్వాగతం. సేంద్రీయ ఎరువులు, వ్యర్థాల సేకరణ లేదా వ్యవసాయ పరికరాల వివరాలను అడగండి.'
          : 'Namaste! Welcome to KrishiGreen 24x7 National Toll-Free Helpline (1800-KRISHI-GRN). How can we assist your farming today? Ask about bio-fertilizers, waste collection, equipment or government schemes.',
    },
  ]);

  if (!isOpen) return null;

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Best effort regional language code
    const langMap: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-PK',
    };
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStartCall = () => {
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
      speakText(
        language === 'hi'
          ? 'कृषिग्रीन सलाहकार लाइन जुड़ चुकी है। आप अपना प्रश्न बोल सकते हैं।'
          : 'KrishiGreen toll-free helpline connected. You are speaking with the live agricultural advisor.'
      );
    }, 1800);
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallState('ended');
    setTimeout(() => setCallState('idle'), 1500);
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition not supported in this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        mr: 'mr-IN',
        bn: 'bn-IN',
        gu: 'gu-IN',
        pa: 'pa-IN',
        ml: 'ml-IN',
        or: 'or-IN',
        as: 'as-IN',
        ur: 'ur-PK',
      };
      recognition.lang = langMap[language] || 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        setIsListening(false);
        sendQuery(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const sendQuery = async (queryText?: string) => {
    const textToSend = queryText || chatInput;
    if (!textToSend.trim()) return;

    const newConvo = [...conversation, { role: 'user' as const, text: textToSend }];
    setConversation(newConvo);
    setChatInput('');
    setIsLoadingAi(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: currentLangObj.name,
          context: activeIvrOption,
        }),
      });

      const data = await res.json();
      const aiReply =
        data.reply ||
        'For this condition, apply 2.5 tonnes vermicompost and foliar spray bio-enzyme at 5ml/litre water. A support ticket has been created for field technician follow-up.';

      setConversation([...newConvo, { role: 'assistant', text: aiReply }]);
      speakText(aiReply);

      // Create tracked support ticket automatically (as per Slide 5)
      const newTicket: SupportTicket = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        callerName: callerName,
        phone: callerPhone,
        language: currentLangObj.name,
        category: (activeIvrOption as any) || 'Crop Advice',
        query: textToSend,
        status: 'Open',
        resolutionNotes: aiReply.slice(0, 150) + '...',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        priority: activeIvrOption === 'Pest Emergency' ? 'Critical' : 'Normal',
      };

      setTicketCreated(newTicket);
      onTicketCreated(newTicket);
    } catch (err) {
      console.error(err);
      const fallbackReply = `Applied guidance for "${textToSend}": Maintain 55% moisture in vermi-beds. Replace 40% DAP with KrishiGreen organic compost. Helpline ticket logged.`;
      setConversation([...newConvo, { role: 'assistant', text: fallbackReply }]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const ivrOptions = [
    { key: 'Crop Advice', label: '1. Crop & Organic Bio-Fertilizer Advice', icon: '🌱' },
    { key: 'Waste Collection', label: '2. Waste Collection & Pickup Request', icon: '♻️' },
    { key: 'Equipment Breakdown', label: '3. Equipment Breakdown & Rental', icon: '🚜' },
    { key: 'Government Subsidy', label: '4. PM-PRANAM & SMAM Subsidies', icon: '🏛️' },
    { key: 'Pest Emergency', label: '5. Emergency Pest / Disease Alert', icon: '🚨' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col h-[90vh] max-h-[750px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700/60 rounded-xl relative">
              <Phone className="w-6 h-6 text-emerald-200" />
              {callState === 'connected' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight">1800-KRISHI-GRN</span>
                <span className="px-2 py-0.5 bg-emerald-600/60 text-emerald-100 text-[11px] rounded-full font-mono">
                  1800-574-7443
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                24×7 National Toll-Free Multi-Lingual Agro Helpline & AI Advisor
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/60 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dial / Connected Banner */}
        <div className="bg-emerald-50/80 px-4 py-2.5 border-b border-emerald-100 flex flex-wrap items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Language:</span>
            <span className="px-2 py-0.5 bg-emerald-100 rounded-md font-medium text-emerald-800">
              {currentLangObj.flag} {currentLangObj.name} ({currentLangObj.nativeName})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {callState === 'idle' && (
              <button
                onClick={handleStartCall}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call Toll-Free (Simulate)
              </button>
            )}
            {callState === 'calling' && (
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Dialing National IVR Gateway...
              </span>
            )}
            {callState === 'connected' && (
              <button
                onClick={handleEndCall}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <PhoneOff className="w-3.5 h-3.5" /> End Call
              </button>
            )}
            {callState === 'ended' && (
              <span className="text-gray-500 font-semibold">Call Disconnected</span>
            )}
          </div>
        </div>

        {/* Interactive IVR Selection Buttons */}
        <div className="p-3 bg-gray-50 border-b border-gray-200 overflow-x-auto">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            IVR Touch-Tone Quick Navigation:
          </p>
          <div className="flex gap-2">
            {ivrOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setActiveIvrOption(opt.key);
                  speakText(`Selected ${opt.key}`);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeIvrOption === opt.key
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Conversation Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-gray-50/50 to-white">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
                  KG
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-white border border-emerald-100 shadow-xs text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.role === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-emerald-50 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Grounded Agri-Advisor
                    </span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="p-1 hover:text-emerald-700 rounded text-emerald-800 transition flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoadingAi && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 p-2 bg-emerald-50 rounded-xl w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Consulting KrishiGreen Soil & Agronomy Database...</span>
            </div>
          )}

          {ticketCreated && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <strong>Helpline Support Ticket Generated: {ticketCreated.id}</strong>
                  <span className="px-1.5 py-0.5 bg-amber-200/80 rounded font-mono text-[10px] font-bold">
                    {ticketCreated.priority} Priority
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  Assigned to Ramnagar KVK Agri-Extension Officer. Farmer SMS dispatched to {callerPhone}.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendQuery();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={startVoiceInput}
              title="Click and speak in your language"
              className={`p-2.5 rounded-xl transition ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                isListening
                  ? t.listening
                  : `Ask in ${currentLangObj.name} (e.g., How much vermicompost for 1 acre paddy?)`
              }
              className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={isLoadingAi || !chatInput.trim()}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Every call creates an accountable ticket inside the app.
            </span>
            <span className="font-mono text-gray-400">IVR Engine v3.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};
