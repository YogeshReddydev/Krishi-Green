import React, { useEffect, useState } from 'react';
import { CloudRain, TrendingUp, ShieldAlert, Sparkles, Radio } from 'lucide-react';

interface TickerItem {
  id: string;
  icon: React.ElementType;
  label: string;
  text: string;
  color: string;
}

interface AnimatedNewsTickerProps {
  language?: string;
  weatherTemp?: string;
  weatherRain?: string;
  districtName?: string;
}

export const AnimatedNewsTicker: React.FC<AnimatedNewsTickerProps> = ({
  language = 'en',
  weatherTemp = '31°C',
  weatherRain = '22%',
  districtName = 'Palnadu / Guntur Hub',
}) => {
  const [liveTime, setLiveTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  const isTe = language === 'te';

  const items: TickerItem[] = [
    {
      id: 'weather',
      icon: CloudRain,
      label: isTe ? '🌤 వాతావరణం' : '🌤 WEATHER',
      text: isTe
        ? `${districtName} – ${weatherTemp} • వర్షావకాశం ${weatherRain} • పంట సేకరణకు అనుకూలం`
        : `${districtName} – ${weatherTemp} • Rain ${weatherRain} • Favorable for biomass collection`,
      color: '#4ade80',
    },
    {
      id: 'mandi',
      icon: TrendingUp,
      label: isTe ? '📈 మండి ధరలు' : '📈 MANDI RATES',
      text: isTe
        ? 'వర్మికంపోస్ట్ ₹9.50/కిలో  •  వరి గడ్డి బేల్స్ ₹2,200/టన్  •  జీవామృతం ₹28/లీటర్'
        : 'Organic Vermicompost ₹9.50/kg  •  Paddy Bales ₹2,200/t  •  Jeevamrutha ₹28/L',
      color: '#fbbf24',
    },
    {
      id: 'scheme',
      icon: ShieldAlert,
      label: isTe ? '📜 పథకాలు' : '📜 SCHEMES',
      text: isTe
        ? 'PM-PRANAM & SMAM: బేలర్లు, ష్రెడ్డర్లు, కంపోస్టర్లపై 40-50% సబ్సిడీ  •  దరఖాస్తులు ప్రారంభం'
        : 'PM-PRANAM & SMAM: 40–50% subsidy on balers, shredders & composters  •  Applications open',
      color: '#818cf8',
    },
    {
      id: 'impact',
      icon: Sparkles,
      label: isTe ? '🌱 ప్రభావం' : '🌱 IMPACT',
      text: isTe
        ? 'ఏపీ పైలట్: 14,800 టన్నుల పంట వ్యర్థాల వినియోగం  •  10,650 టన్నుల CO₂ నివారణ  •  జీరో స్టబుల్ బర్నింగ్'
        : 'AP Pilot: 14,800 t crop waste diverted  •  10,650 t CO₂ avoided  •  Zero stubble burning achieved',
      color: '#34d399',
    },
    {
      id: 'helpline',
      icon: Radio,
      label: isTe ? '📞 హెల్ప్‌లైన్' : '📞 HELPLINE',
      text: isTe
        ? '24×7 రైతు సహాయం: 1800-KRISHI-GRN  •  13 భాషలలో  •  ఏఐ సలహాదారు అందుబాటులో'
        : '24×7 Farmer Support: 1800-KRISHI-GRN  •  13 languages  •  AI Advisor available now',
      color: '#f87171',
    },
  ];

  // Duplicate items for seamless looping
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #052e16 0%, #14532d 40%, #052e16 100%)',
        borderBottom: '1px solid rgba(74,222,128,0.2)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        height: '28px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      {/* LIVE badge */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0 10px',
          borderRight: '1px solid rgba(74,222,128,0.25)',
          background: 'rgba(0,0,0,0.25)',
          height: '100%',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4ade80',
            display: 'inline-block',
            animation: 'kgPulseDot 1.6s ease-in-out infinite',
          }}
        />
        <span style={{ color: '#4ade80', fontSize: '10px', fontWeight: 800, letterSpacing: '0.06em' }}>
          LIVE
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginLeft: '4px' }}>
          {liveTime}
        </span>
      </div>

      {/* Scrolling ticker */}
      <div style={{ overflow: 'hidden', flex: 1, position: 'relative' }}>
        <div
          className="kg-ticker-track"
          style={{ display: 'flex', alignItems: 'center', gap: '0' }}
        >
          {doubled.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={`${item.id}-${idx}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 20px',
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.85)',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    color: item.color,
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  <Icon size={10} />
                  {item.label}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', margin: '0 4px' }}>›</span>
                {item.text}
                <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 8px' }}>•</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
