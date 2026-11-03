import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  CloudRain,
  Radio,
  Sparkles,
  ChevronDown,
  Award,
  Flame,
  Activity,
  Thermometer,
  FileText,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getMultiTranslations } from '../utils/multiLang';

interface AnimatedNewsTickerProps {
  language?: SupportedLanguage;
  weatherTemp?: string;
  weatherRain?: string;
  districtName?: string;
  onScrollToNext?: () => void;
}

export const AnimatedNewsTicker: React.FC<AnimatedNewsTickerProps> = ({
  language = 'en',
  weatherTemp = '28°C',
  weatherRain = '15%',
  districtName = 'Palnadu / Guntur Hub',
  onScrollToNext,
}) => {
  const t = getMultiTranslations(language);
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const isTe = language === 'te';
  const isHi = language === 'hi';
  const isTa = language === 'ta';

  // Real-time market telemetry items (Mandi prices, bio-inputs, weather, farm news)
  const telemetryItems = [
    {
      category: 'MANDI',
      icon: TrendingUp,
      title: isTe ? 'గుంటూరు మిర్చి యార్డ్' : isHi ? 'गुंटूर मिर्च मंडी' : isTa ? 'குண்டூர் மிளகாய் சந்தை' : 'Guntur Chilli Yard',
      text: 'Teja Chilli ₹19,800/Qtl (▲ +2.4%)',
      badge: isTe ? 'లైవ్ ధర' : isHi ? 'लाइव भाव' : 'LIVE PRICE',
      color: '#fbbf24',
    },
    {
      category: 'AGROMET',
      icon: CloudRain,
      title: isTe ? 'వాతావరణ హెచ్చరిక' : isHi ? 'कृषि मौसम परामर्श' : isTa ? 'வானிலை ஆலோசனை' : 'Regional Agromet Advisory',
      text: `${districtName} • ${weatherTemp} • Rain ${weatherRain} • Humidity 62%`,
      badge: 'IMD RADAR',
      color: '#60a5fa',
    },
    {
      category: 'MANDI',
      icon: TrendingUp,
      title: isTe ? 'వరంగల్ కాటన్ మార్కెట్' : isHi ? 'वारंगल कपास मंडी' : isTa ? 'வரங்கல் பருத்தி சந்தை' : 'Warangal Cotton Mandi',
      text: 'Kapas Cotton ₹7,450/Qtl (▲ +1.8%)',
      badge: isTe ? 'లైవ్ ధర' : isHi ? 'लाइव भाव' : 'LIVE PRICE',
      color: '#f472b6',
    },
    {
      category: 'PRODUCT',
      icon: Sparkles,
      title: isTe ? 'సేంద్రీయ ఎరువు' : isHi ? 'जैविक वर्मीकम्पोस्ट' : isTa ? 'மண்புழு உரம்' : 'KrishiGreen Vermicompost',
      text: 'FCO 1985 Grade 1 • ₹9.50/kg • 18.4% Carbon',
      badge: isTe ? 'సేంద్రీయ ఇన్‌పుట్' : isHi ? 'जैविक उत्पाद' : 'ORGANIC INPUT',
      color: '#34d399',
    },
    {
      category: 'BIOMASS',
      icon: Flame,
      title: isTe ? 'పంట వ్యర్థాల సేకరణ' : isHi ? 'पराली/बायोमास खरीद' : isTa ? 'கழிவு கொள்முதல்' : 'Biomass Waste Purchase',
      text: 'Paddy Straw Bales ₹2,200/Ton • Direct pickup',
      badge: 'FARM LOGISTICS',
      color: '#a78bfa',
    },
    {
      category: 'MANDI',
      icon: TrendingUp,
      title: isTe ? 'నిజామాబాద్ పసుపు' : isHi ? 'निजामाबाद हल्दी मंडी' : isTa ? 'நிசாமாபாத் மஞ்சள் சந்தை' : 'Nizamabad Turmeric Mandi',
      text: 'Finger Turmeric ₹13,200/Qtl (▲ +3.1%)',
      badge: isTe ? 'లైవ్ ధర' : isHi ? 'लाइव भाव' : 'LIVE PRICE',
      color: '#facc15',
    },
    {
      category: 'NEWS',
      icon: FileText,
      title: isTe ? 'రైతు సలహా' : isHi ? 'कृषि सलाह' : isTa ? 'விவசாய ஆலோசனை' : 'Seasonal Agronomy Advisory',
      text: isTe
        ? 'రబీ సీజన్: విత్తే ముందు సేంద్రీయ కర్బన ఎరువును వేయడం వల్ల నేల తేమ పెరుగుతుంది'
        : isHi
        ? 'रबी मौसम: बुवाई से पहले बायो-कम्पोस्ट खाद डालने से मिट्टी में नमी धारण क्षमता बढ़ती है'
        : 'Rabi Season: Inoculate soil with bio-carbon compost before sowing to boost moisture holding',
      badge: 'FARM ADVICE',
      color: '#38bdf8',
    },
    {
      category: 'DBT',
      icon: Award,
      title: isTe ? 'రైతు ఖాతా జమ (DBT)' : isHi ? 'किसान खाता अंतरण (DBT)' : isTa ? 'நேரடி வங்கி வரவு' : 'Direct Farmer DBT Share',
      text: isTe
        ? 'సేంద్రీయ అమ్మకాలలో 70% నేరుగా రైతు ఖాతాలో జమ'
        : isHi
        ? 'जैविक बिक्री में 70% शुद्ध आय सीधे किसान बैंक खाते में जमा'
        : '70% transparent direct farmer payout waterfall for supplied farm biomass',
      badge: '70% DIRECT DBT',
      color: '#4ade80',
    },
    {
      category: 'HELPLINE',
      icon: Radio,
      title: isTe ? '24×7 ఉచిత హెల్ప్‌లైన్' : isHi ? '24×7 निःशुल्क हेल्पलाइन' : isTa ? 'இலவச உதவி எண்' : '24x7 Agronomy Helpline',
      text: '1800-KRISHI-GRN • Toll Free • 13 Regional Languages',
      badge: 'TOLL FREE',
      color: '#f87171',
    },
  ];

  // News and weather feature highlights
  const newsHighlights = [
    {
      icon: Thermometer,
      label: isTe ? 'వాతావరణం' : isHi ? 'मौसम रडार' : isTa ? 'வானிலை' : 'Agromet Radar',
      val: `${districtName} • ${weatherTemp}`,
      sub: isTe ? 'వర్షావకాశం 15% • గాలి 16 km/h' : isHi ? 'बारिश 15% • हवा 16 km/h' : 'Rain chance 15% • Wind 16 km/h',
      color: '#60a5fa',
    },
    {
      icon: TrendingUp,
      label: isTe ? 'లైవ్ మండి ధరలు' : isHi ? 'मंडी भाव सूचकांक' : isTa ? 'சந்தை விலைகள்' : 'Mandi Index',
      val: isTe ? 'మిర్చి ₹19,800 • పత్తి ₹7,450' : isHi ? 'मिर्च ₹19,800 • कपास ₹7,450' : 'Chilli ₹19.8k • Cotton ₹7.4k',
      sub: isTe ? 'రోజువారీ మార్కెట్ ధరల నవీకరణ' : isHi ? 'दैनिक एपीएमसी अद्यतनित दर' : 'Daily APMC updated rates',
      color: '#fbbf24',
    },
    {
      icon: Sparkles,
      label: isTe ? 'సేంద్రీయ ఎరువు' : isHi ? 'जैविक खाद सूचकांक' : isTa ? 'இயற்கை உரம்' : 'Bio-Compost Index',
      val: '₹9.50 / kg • FCO 1985 Spec',
      sub: isTe ? 'ల్యాబ్ పరీక్షించిన సేంద్రీయ కర్బనం >18%' : isHi ? 'प्रमाणित जैविक कार्बन >18%' : 'Lab-tested organic carbon >18%',
      color: '#34d399',
    },
    {
      icon: Flame,
      label: isTe ? 'వ్యర్థాల సేకరణ' : isHi ? 'बायोमास खरीद' : isTa ? 'கழிவு கொள்முதல்' : 'Biomass Buyback',
      val: '₹2,200 / Ton • Farmgate Pick',
      sub: isTe ? 'వరి గడ్డి బేల్స్ నేరుగా సేకరణ' : isHi ? 'खेत से सीधी पराली उठान' : 'Doorstep baler pickup available',
      color: '#a78bfa',
    },
  ];

  const doubledTelemetry = [...telemetryItems, ...telemetryItems];

  return (
    <div className="w-full my-6 rounded-3xl overflow-hidden bg-gradient-to-b from-[#03140b] via-[#051c10] to-[#020b06] border border-emerald-900/60 shadow-2xl text-white relative">
      {/* Background ambient glow */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Centered agri-intelligence pill */}
      <div className="pt-6 pb-2 px-4 flex flex-col items-center justify-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#072416]/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-emerald-300 uppercase transition hover:border-emerald-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
          <span>
            {isTe
              ? 'కృషిగ్రీన్ లైవ్ సమాచార కేంద్రం • రియల్-టైమ్ మండి ధరలు & వాతావరణ నివేదిక'
              : isHi
              ? 'कृषिग्रीन लाइव सूचना केंद्र • रीयल-टाइम मंडी भाव व कृषि मौसम रिपोर्ट'
              : isTa
              ? 'க்ரிஷிகிரீன் நேரடி தகவல் மையம் • நிகழ்நேர சந்தை விலை & வானிலை'
              : 'KRISHIGREEN AGRI-TELEMETRY • REAL-TIME MANDI RATES & AGROMET FEED'}
          </span>
        </div>
      </div>

      {/* Featured quick telemetry tiles */}
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
        {newsHighlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-500/40 hover:bg-white/[0.05] transition flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-gray-400 tracking-wider">
                  {item.label}
                </span>
                <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
              </div>
              <p className="text-xs sm:text-sm font-black font-mono text-white leading-tight">
                {item.val}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 font-sans truncate">
                {item.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Continuous streaming ticker track */}
      <div className="relative w-full bg-[#020d07] border-y border-emerald-900/50 py-2.5 px-3 flex items-center overflow-hidden">
        {/* Pulsing LIVE Telemetry indicator */}
        <div className="flex items-center gap-2 pl-2 pr-3.5 border-r border-emerald-800/60 shrink-0 bg-[#020d07] z-20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono font-black text-emerald-400 tracking-wider uppercase">
            {t.liveTelemetry}
          </span>
          <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
            {liveTime}
          </span>
        </div>

        {/* Continuous streaming telemetry track */}
        <div className="relative flex-1 overflow-hidden ml-3">
          <div className="kg-ticker-track-fast flex items-center gap-0">
            {doubledTelemetry.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.category}-${idx}`}
                  className="inline-flex items-center gap-2.5 px-5 py-0.5 text-xs whitespace-nowrap text-gray-200 border-r border-white/[0.08]"
                >
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-black tracking-wider"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                      border: `1px solid ${item.color}35`,
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-gray-300 font-bold">
                    {item.title}:
                  </span>
                  <span className="font-semibold text-xs text-white/95">
                    {item.text}
                  </span>
                  <span className="text-white/20 ml-2">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom section divider with centered action pill */}
      <div className="relative py-3.5 flex items-center justify-center">
        {/* Horizontal Divider Line */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-800/60 to-transparent" />

        {/* Centered Pill Badge */}
        <button
          onClick={onScrollToNext}
          className="relative z-10 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#051c10] border border-emerald-500/40 text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest text-emerald-300 shadow-md hover:bg-[#072917] hover:border-emerald-400 hover:text-white transition cursor-pointer"
        >
          <span>{t.exploreEcosystem}</span>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
