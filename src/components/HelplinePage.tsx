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
  LifeBuoy,
  AlertTriangle,
  Loader2,
  Search,
  Filter,
  User,
  Clock,
  ShieldCheck,
  Bot,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { SupportedLanguage, SupportTicket } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';

interface HelplinePageProps {
  language: SupportedLanguage;
  tickets: SupportTicket[];
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const HelplinePage: React.FC<HelplinePageProps> = ({
  language,
  tickets,
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
  const [ticketFilter, setTicketFilter] = useState<'all' | 'Open' | 'In Progress' | 'Resolved'>('all');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

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

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
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
          ? 'कृषिग्रीन सलाहकार लाइन जुड़ चुकी है। आप अपना प्रश्न पूछ सकते हैं।'
          : 'KrishiGreen toll-free helpline connected. You are speaking with the live agricultural advisor.'
      );
    }, 1500);
  };

  const handleEndCall = () => {
    setCallState('ended');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSendMessage = async (msgText?: string) => {
    const textToSend = msgText || chatInput;
    if (!textToSend.trim() || isLoadingAi) return;

    const userMessage = textToSend.trim();
    setChatInput('');
    setConversation((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoadingAi(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          language: currentLangObj.name,
          category: activeIvrOption,
          history: conversation.slice(-4),
        }),
      });

      const data = await res.json();
      const aiReply =
        data.reply ||
        'Thank you for reaching out to KrishiGreen. Your advisor ticket has been recorded for expert review.';

      setConversation((prev) => [...prev, { role: 'assistant', text: aiReply }]);
      speakText(aiReply);

      // Create an official support ticket
      const newTicket: SupportTicket = {
        id: `TKT-${Math.floor(8200 + Math.random() * 900)}`,
        callerName: callerName || 'Farmer Partner',
        phone: callerPhone || '+91 98000 00000',
        language: currentLangObj.name,
        category: (activeIvrOption as any) || 'Crop Advice',
        query: userMessage,
        status: 'In Progress',
        resolutionNotes: aiReply.slice(0, 160) + '...',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        priority: 'Normal',
      };

      setTicketCreated(newTicket);
      onTicketCreated(newTicket);
    } catch (err) {
      const fallbackReply = `Got your query on ${activeIvrOption}. For organic farming, KrishiGreen vermicompost is certified FCO compliant with 18% Organic Carbon. Our field officer will visit your village node.`;
      setConversation((prev) => [...prev, { role: 'assistant', text: fallbackReply }]);
      speakText(fallbackReply);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is supported in modern browsers like Chrome.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const filteredTickets = tickets.filter((tkt) => {
    if (ticketFilter === 'all') return true;
    return tkt.status === ticketFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Webpage Header Banner with Farm Theme */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-800/30 bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 text-white p-6 sm:p-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md text-emerald-200 text-xs font-bold border border-emerald-400/40">
              <Bot className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.tollFree}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {language === 'hi' ? '24×7 राष्ट्रीय किसान हेल्पलाइन एवं एआई सलाहकार' : language === 'te' ? '24×7 జాతీయ రైతు హెల్ప్‌లైన్ & ఏఐ వ్యవసాయ సలహాదారు' : '24×7 National Toll-Free Helpline & AI Agri-Advisor'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {language === 'hi' 
                ? 'एक नंबर, किसी भी फोन से, किसी भी भाषा में। हर कॉल पर स्वचालित टिकट ट्रैकिंग और वास्तविक समाधान।'
                : language === 'te'
                ? 'ఒకే నంబర్, ఏ ఫోన్ నుండైనా, ఏ భాషలోనైనా. ప్రతి కాల్‌కు అధికారిక టిక్కెట్ మరియు తక్షణ సలహాలు.'
                : 'One single number for crop advice, bio-fertilizer orders, waste pickups, and government subsidies. Available in 13+ Indian languages.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-center shrink-0 w-full md:w-auto shadow-lg">
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block">
              {t.tollFree}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 tracking-tight">
              1800-KRISHI-GRN
            </div>
            <div className="text-xs font-mono text-emerald-200">
              1800-574-7443 (Toll Free)
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Dialer & AI Chat (Left) + Tickets & Records (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Voice Call & AI Advisor Simulator */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
            {/* Call State Simulator Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900 to-emerald-950 text-white flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    callState === 'connected'
                      ? 'bg-emerald-500 animate-pulse text-white'
                      : callState === 'calling'
                      ? 'bg-amber-500 animate-ping text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 block font-bold">
                    {callState === 'connected'
                      ? '● CALL CONNECTED • 1800-574-7443'
                      : callState === 'calling'
                      ? 'DIALING NATIONAL HELPLINE...'
                      : 'TOLL-FREE IVR DIALPAD SIMULATOR'}
                  </span>
                  <strong className="text-sm font-bold">
                    {callState === 'connected'
                      ? `Agronomist Line (${currentLangObj.name})`
                      : 'Ready to Dial (Free of Charge)'}
                  </strong>
                </div>
              </div>

              {callState === 'connected' ? (
                <button
                  onClick={handleEndCall}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              ) : (
                <button
                  onClick={handleStartCall}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Dial 1800</span>
                </button>
              )}
            </div>

            {/* IVR Quick Topic Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                IVR Option / Query Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'Crop Advice',
                  'Waste Collection',
                  'Equipment Repair',
                  'Government Subsidy',
                  'Pest Emergency',
                  'Mandi Prices',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActiveIvrOption(opt)}
                    className={`p-2.5 rounded-xl border text-left transition font-semibold flex items-center justify-between ${
                      activeIvrOption === opt
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{opt}</span>
                    {activeIvrOption === opt && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="h-72 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
              {conversation.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-700 text-white rounded-tr-xs'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold opacity-80">
                      {msg.role === 'user' ? (
                        <>
                          <User className="w-3 h-3" />
                          <span>{callerName} ({callerPhone})</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-3 h-3 text-emerald-600" />
                          <span>KrishiGreen Advisor ({currentLangObj.name})</span>
                        </>
                      )}
                    </div>
                    <p className="whitespace-pre-line text-xs font-normal">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoadingAi && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl border border-gray-200 flex items-center gap-2 text-xs text-gray-500 shadow-2xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>Advisor analyzing agronomy standards...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar with Voice Recognition & TTS */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'hi' ? 'अपना प्रश्न यहाँ लिखें या बोलें...' : language === 'te' ? 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి లేదా మాట్లాడండి...' : 'Type query or speak in your language...'}
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  onClick={toggleMic}
                  className={`p-2.5 rounded-xl border transition shadow-2xs ${
                    isListening
                      ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                      : 'bg-gray-100 hover:bg-emerald-50 text-gray-700 border-gray-300'
                  }`}
                  title="Voice Query"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-700" />}
                </button>

                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoadingAi || !chatInput.trim()}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>

              {/* Sample Queries Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-gray-400">Popular Queries:</span>
                {[
                  'How much vermicompost for 1 acre wheat?',
                  'How to schedule kitchen waste pickup?',
                  'Apply for 50% tractor subsidy under SMAM',
                ].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => handleSendMessage(sample)}
                    className="text-[10px] font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-200/60 transition"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Official Support Tickets & Accountability Tracker */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">{t.tickets}</h3>
                  <span className="text-[10px] text-gray-500">Every call logs an auditable ticket</span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
                {(['all', 'Open', 'In Progress', 'Resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setTicketFilter(st)}
                    className={`px-2 py-1 rounded-md transition ${
                      ticketFilter === st
                        ? 'bg-white text-emerald-900 shadow-2xs font-extrabold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Log Form for Walk-In / Phone Farmer */}
            <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200/80 space-y-2 text-xs">
              <span className="font-extrabold text-emerald-950 block text-[11px]">
                Log Caller Details:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-500 block">Farmer Name</label>
                  <input
                    type="text"
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Phone / Mobile</label>
                  <input
                    type="text"
                    value={callerPhone}
                    onChange={(e) => setCallerPhone(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-900 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Ticket List */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="p-3.5 rounded-2xl border border-gray-200/90 bg-gray-50/80 hover:bg-white hover:border-emerald-300 transition space-y-2 text-xs shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-800 text-[11px] bg-emerald-100/60 px-2 py-0.5 rounded-md">
                      {tkt.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        tkt.status === 'Resolved'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : tkt.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {tkt.status}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-gray-900">{tkt.category}</span>
                    <p className="text-gray-600 mt-0.5 text-xs">"{tkt.query}"</p>
                  </div>

                  {tkt.resolutionNotes && (
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-100 text-[11px] text-emerald-900">
                      <strong className="text-emerald-950 font-bold">Advisor Note:</strong> {tkt.resolutionNotes}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                    <span>{tkt.callerName} • {tkt.phone}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {tkt.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
