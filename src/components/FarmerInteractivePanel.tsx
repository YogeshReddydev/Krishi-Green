import React, { useState } from 'react';
import {
  Phone,
  Calculator,
  Leaf,
  Truck,
  CheckCircle2,
  Coins,
  Sun,
  CloudRain,
  Wind,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getMultiTranslations } from '../utils/multiLang';

interface FarmerInteractivePanelProps {
  language?: SupportedLanguage;
  onOpenHelpline?: () => void;
  onNavigate?: (tab: string) => void;
  weatherTemp?: string;
  weatherRain?: string;
}

/* ── Earnings Calculator ───────────────────────────────────────── */
function EarningsCalc({ lang }: { lang: SupportedLanguage }) {
  const t = getMultiTranslations(lang);
  const [wasteKg, setWasteKg] = useState(500);

  const compostKg = Math.round(wasteKg * 0.45);
  const compostEarning = Math.round(compostKg * 9.5);
  const carbonTons = +(wasteKg * 0.00072).toFixed(2);
  const carbonPayout = Math.round(carbonTons * 750 * 0.7);
  const total = compostEarning + carbonPayout;
  const dacSaved = Math.round(compostKg / 50);

  const presets = [100, 500, 1000, 5000];

  return (
    <div style={{ padding: '16px 0 4px' }}>
      {/* Preset buttons */}
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontWeight: 500 }}>
        {t.selectWasteQty}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setWasteKg(p)}
            style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              background: wasteKg === p ? '#4ade80' : 'rgba(255,255,255,0.12)',
              color: wasteKg === p ? '#052e16' : '#d1fae5',
              transition: 'all 0.2s',
            }}
          >
            {p >= 1000 ? `${p / 1000} MT` : `${p} kg`}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="range"
          min={50}
          max={10000}
          step={50}
          value={wasteKg}
          onChange={(e) => setWasteKg(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#4ade80', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
          <span>50 kg</span>
          <span style={{ color: '#4ade80', fontWeight: 800, fontSize: 13 }}>{wasteKg.toLocaleString('en-IN')} kg</span>
          <span>10 MT</span>
        </div>
      </div>

      {/* Result cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          {
            label: t.compostYield,
            value: `${compostKg.toLocaleString('en-IN')} kg`,
            sub: lang === 'te' ? '45% మార్పిడి' : lang === 'hi' ? '45% रूपांतरण' : '45% conversion',
            color: '#34d399',
          },
          {
            label: t.compostRevenue,
            value: `₹${compostEarning.toLocaleString('en-IN')}`,
            sub: '@ ₹9.50/kg',
            color: '#fbbf24',
          },
          {
            label: t.carbonPayout,
            value: `₹${carbonPayout.toLocaleString('en-IN')}`,
            sub: '70% DBT',
            color: '#818cf8',
          },
          {
            label: t.dapBagsSaved,
            value: `${dacSaved} bags`,
            sub: lang === 'te' ? 'ఖర్చు తగ్గింపు' : lang === 'hi' ? 'लागत में बचत' : 'cost reduction',
            color: '#f87171',
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 12,
              padding: '10px 12px',
              border: `1px solid ${card.color}30`,
            }}
          >
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: card.color, lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        style={{
          background: 'linear-gradient(135deg, #14532d, #166534)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid rgba(74,222,128,0.3)',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
            {t.totalFarmerBenefit}
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#4ade80' }}>
            ₹{total.toLocaleString('en-IN')}
          </div>
        </div>
        <Coins size={32} color="#4ade80" opacity={0.7} />
      </div>
    </div>
  );
}

/* ── Quick Pickup Booking ─────────────────────────────────────── */
function QuickPickup({
  lang,
  onNavigate,
}: {
  lang: SupportedLanguage;
  onNavigate?: (tab: string) => void;
}) {
  const t = getMultiTranslations(lang);
  const [village, setVillage] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const wasteOptions = [
    { en: 'Kitchen waste', te: 'వంటగది వ్యర్థాలు', hi: 'रसोई अपशिष्ट', ta: 'சமையல் கழிவு' },
    { en: 'Paddy straw', te: 'వరి గడ్డి', hi: 'धान की पराली', ta: 'நெல் வைக்கோல்' },
    { en: 'Vegetable waste', te: 'కూరగాయల వ్యర్థాలు', hi: 'सब्जी कचरा', ta: 'காய்கறி கழிவு' },
    { en: 'Fruit peels', te: 'పండ్ల తొక్కలు', hi: 'फलों के छिलके', ta: 'பழத்தோல்' },
  ];

  const getOptLabel = (opt: typeof wasteOptions[0]) => {
    if (lang === 'te') return opt.te;
    if (lang === 'hi') return opt.hi;
    if (lang === 'ta') return opt.ta;
    return opt.en;
  };

  if (submitted) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center' }}>
        <CheckCircle2 size={48} color="#4ade80" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: 18, fontWeight: 800, color: '#4ade80', marginBottom: 6 }}>
          {t.pickupBooked}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
          {t.teamContact24h}
        </div>
        <button
          onClick={() => { setSubmitted(false); setVillage(''); setWasteType(''); }}
          style={{
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            color: 'white',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          {t.bookAnother}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '14px 0 4px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>
          {t.yourVillage}
        </label>
        <input
          type="text"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          placeholder={t.villagePlaceholder}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid rgba(74,222,128,0.3)',
            background: 'rgba(0,0,0,0.3)',
            color: 'white',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>
          {t.wasteType}
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {wasteOptions.map((opt, i) => {
            const label = getOptLabel(opt);
            return (
              <button
                key={i}
                onClick={() => setWasteType(label)}
                style={{
                  padding: '7px 13px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: wasteType === label ? '#4ade80' : 'rgba(255,255,255,0.2)',
                  background: wasteType === label ? 'rgba(74,222,128,0.2)' : 'transparent',
                  color: wasteType === label ? '#4ade80' : 'rgba(255,255,255,0.7)',
                  fontSize: 12,
                  fontWeight: wasteType === label ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        disabled={!village || !wasteType}
        onClick={() => setSubmitted(true)}
        style={{
          padding: '13px',
          borderRadius: 12,
          border: 'none',
          background: village && wasteType ? '#4ade80' : 'rgba(255,255,255,0.1)',
          color: village && wasteType ? '#052e16' : 'rgba(255,255,255,0.3)',
          fontWeight: 900,
          fontSize: 15,
          cursor: village && wasteType ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Truck size={18} />
        {t.bookFreePickup}
      </button>
    </div>
  );
}

/* ── Weather Advisory Card ───────────────────────────────────── */
function WeatherAdvisory({
  lang,
  weatherTemp,
  weatherRain,
}: {
  lang: SupportedLanguage;
  weatherTemp: string;
  weatherRain: string;
}) {
  const t = getMultiTranslations(lang);
  const rainNum = parseInt(weatherRain, 10);
  const isRisk = rainNum >= 50;
  const isMod = rainNum >= 25 && rainNum < 50;

  const cropItems = [
    { en: 'Paddy', te: 'వరి', hi: 'धान', ta: 'நெல்' },
    { en: 'Chilli', te: 'మిరప', hi: 'मिर्च', ta: 'மிளகாய்' },
    { en: 'Cotton', te: 'పత్తి', hi: 'कपास', ta: 'பருத்தி' },
    { en: 'Maize', te: 'మొక్కజొన్న', hi: 'मक्का', ta: 'மக்காச்சோளம்' },
  ];

  const getCropName = (c: typeof cropItems[0]) => {
    if (lang === 'te') return c.te;
    if (lang === 'hi') return c.hi;
    if (lang === 'ta') return c.ta;
    return c.en;
  };

  const [selectedCrop, setSelectedCrop] = useState(getCropName(cropItems[0]));

  const getAdviceText = () => {
    if (isRisk) {
      if (lang === 'te') return 'భారీ వర్షం హెచ్చరిక — ఆరుబయట ఎరువులు కప్పండి. పురుగుమందుల పిచికారీ వాయిదా వేయండి.';
      if (lang === 'hi') return 'भारी बारिश की चेतावनी — बाहर रखी खाद को ढकें। कीटनाशक छिड़काव स्थगित करें।';
      return 'Heavy rain risk — cover outdoor compost. Postpone pesticide sprays.';
    }
    if (isMod) {
      if (lang === 'te') return 'చెదురుమదురు వర్షం — నేల తేమ మంచిది. సేంద్రీయ ఎరువు వేయడానికి అనుకూలం.';
      if (lang === 'hi') return 'हल्की बारिश — मिट्टी में अच्छी नमी। जैविक खाद डालने के लिए अनुकूल समय।';
      return 'Scattered showers — good soil moisture. Good time to apply organic inputs.';
    }
    if (lang === 'te') return 'స్పష్టమైన ఆకాశం — పొలంలో అన్ని పనులకు అనుకూలం. బేలింగ్ & రవాణా సిద్ధం.';
    if (lang === 'hi') return 'साफ मौसम — खेत के सभी कार्यों के लिए उपयुक्त। पराली बेलिंग और परिवहन के लिए तैयार।';
    return 'Clear skies — ideal for all field operations. Ready for baling & transport.';
  };

  return (
    <div style={{ padding: '14px 0 4px' }}>
      {/* Crop selector */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          {t.selectCrop}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cropItems.map((c) => {
            const name = getCropName(c);
            return (
              <button
                key={c.en}
                onClick={() => setSelectedCrop(name)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: selectedCrop === name ? '#4ade80' : 'rgba(255,255,255,0.2)',
                  background: selectedCrop === name ? 'rgba(74,222,128,0.2)' : 'transparent',
                  color: selectedCrop === name ? '#4ade80' : 'rgba(255,255,255,0.7)',
                  fontSize: 12,
                  fontWeight: selectedCrop === name ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { icon: Sun, label: t.temp, value: weatherTemp, color: '#fbbf24' },
          { icon: CloudRain, label: t.rain, value: weatherRain, color: '#60a5fa' },
          { icon: Wind, label: t.condition, value: isRisk ? '⚠️' : isMod ? '🌤' : '✅', color: '#4ade80' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              padding: '10px',
              textAlign: 'center',
              border: `1px solid ${color}25`,
            }}
          >
            <Icon size={18} color={color} style={{ margin: '0 auto 4px' }} />
            <div style={{ fontSize: 16, fontWeight: 900, color }}>{value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Advisory */}
      <div
        style={{
          background: isRisk
            ? 'rgba(239,68,68,0.15)'
            : isMod
            ? 'rgba(251,191,36,0.12)'
            : 'rgba(74,222,128,0.1)',
          border: `1px solid ${isRisk ? '#ef4444' : isMod ? '#fbbf24' : '#4ade80'}40`,
          borderRadius: 12,
          padding: '12px 14px',
        }}
      >
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
          {t.advisoryFor} {selectedCrop}:
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', lineHeight: 1.5 }}>
          {getAdviceText()}
        </div>
      </div>
    </div>
  );
}

/* ── Main Panel ──────────────────────────────────────────────── */
export const FarmerInteractivePanel: React.FC<FarmerInteractivePanelProps> = ({
  language = 'en',
  onOpenHelpline,
  onNavigate,
  weatherTemp = '28°C',
  weatherRain = '15%',
}) => {
  const t = getMultiTranslations(language);
  const [activeTab, setActiveTab] = useState<'earn' | 'pickup' | 'weather'>('earn');

  const tabs = [
    { id: 'earn' as const, label: t.tabEarn, icon: Calculator },
    { id: 'pickup' as const, label: t.tabPickup, icon: Truck },
    { id: 'weather' as const, label: t.tabWeather, icon: Leaf },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #052e16 0%, #0f3621 50%, #052e16 100%)',
        borderRadius: 24,
        padding: '20px',
        border: '1px solid rgba(74,222,128,0.25)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        width: '100%',
        color: 'white',
        fontFamily: 'inherit',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#4ade80',
              letterSpacing: '0.08em',
              marginBottom: 4,
              textTransform: 'uppercase',
            }}
          >
            {t.farmerQuickTools}
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>
            {t.startInSeconds}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
            {t.calcBookAdvice}
          </div>
        </div>

        {/* Helpline call button */}
        <button
          onClick={onOpenHelpline}
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            border: 'none',
            borderRadius: 14,
            padding: '10px 14px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(22,163,74,0.5)',
            animation: 'kgGlow 2.4s ease-in-out infinite',
          }}
        >
          <Phone size={20} color="white" />
          <span style={{ fontSize: 9, fontWeight: 900, color: 'white', letterSpacing: '0.05em' }}>
            {t.callNow}
          </span>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)' }}>{t.free24x7}</span>
        </button>
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 6,
          background: 'rgba(0,0,0,0.25)',
          borderRadius: 14,
          padding: 5,
          marginBottom: 16,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 4px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === tab.id ? 'rgba(74,222,128,0.2)' : 'transparent',
              color: activeTab === tab.id ? '#4ade80' : 'rgba(255,255,255,0.6)',
              fontWeight: activeTab === tab.id ? 800 : 400,
              fontSize: 11,
              cursor: 'pointer',
              transition: 'all 0.2s',
              lineHeight: 1.3,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'earn' && <EarningsCalc lang={language} />}
      {activeTab === 'pickup' && <QuickPickup lang={language} onNavigate={onNavigate} />}
      {activeTab === 'weather' && (
        <WeatherAdvisory lang={language} weatherTemp={weatherTemp} weatherRain={weatherRain} />
      )}
    </div>
  );
};
