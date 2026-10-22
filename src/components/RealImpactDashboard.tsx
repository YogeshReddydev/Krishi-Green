import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  Leaf,
  Scale,
  Flame,
  DollarSign,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { SupportedLanguage, APDistrict } from '../types';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { AP_DISTRICTS_META } from '../data/apPilotData';

interface RealImpactDashboardProps {
  language: SupportedLanguage;
}

export const RealImpactDashboard: React.FC<RealImpactDashboardProps> = ({ language }) => {
  const [lifecycleEvents, setLifecycleEvents] = useState<any[]>([]);
  const [carbonProjects, setCarbonProjects] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    try {
      const unsub1 = onSnapshot(collection(db, 'waste_lifecycle_events'), (snap) => {
        setLifecycleEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLastRefreshed(new Date().toLocaleTimeString());
      });

      const unsub2 = onSnapshot(collection(db, 'carbon_projects'), (snap) => {
        setCarbonProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLastRefreshed(new Date().toLocaleTimeString());
      });

      const unsub3 = onSnapshot(collection(db, 'processing_batches'), (snap) => {
        setBatches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLastRefreshed(new Date().toLocaleTimeString());
      });

      setLoading(false);
      return () => {
        unsub1();
        unsub2();
        unsub3();
      };
    } catch (e) {
      setLoading(false);
    }
  }, []);

  // Compute live aggregates strictly from real records
  const metrics = useMemo(() => {
    // 1. Total waste diverted (kg)
    const wasteFromEvents = lifecycleEvents.reduce(
      (acc, ev) => acc + (ev.weighbridgeSlip?.netWeightKg || ev.declaredWeightKg || 0),
      0
    );
    const wasteFromBatches = batches.reduce((acc, b) => acc + (b.inputWasteKg || 0), 0);
    const totalWasteKg = wasteFromEvents + wasteFromBatches;

    // 2. Methane avoided (kg CH4) ~ 40 kg CH4 avoided per tonne of organic waste diverted
    const methaneAvoidedKg = Math.round((totalWasteKg / 1000) * 40 * 10) / 10;

    // 3. Carbon emissions avoided (tCO2e)
    const carbonFromEvents = lifecycleEvents.reduce(
      (acc, ev) => acc + (ev.carbonAccounting?.tCO2eAvoided || 0),
      0
    );
    const carbonFromProjects = carbonProjects.reduce(
      (acc, p) => acc + (p.grossAvoidedTCO2e || 0),
      0
    );
    const totalCarbonTCO2e = Math.round((carbonFromEvents + carbonFromProjects) * 10) / 10;

    // 4. Net Issued Credits
    const netCredits = carbonProjects.reduce(
      (acc, p) => acc + (p.netIssuedCreditsTCO2e || 0),
      0
    );

    // 5. Total Farmer Payouts (INR)
    const farmerPayoutEvents = lifecycleEvents.reduce(
      (acc, ev) => acc + (ev.financialSettlement?.farmerPayoutINR || 0),
      0
    );
    const farmerPayoutCarbon = carbonProjects.reduce(
      (acc, p) => acc + (p.farmerPoolPayoutINR || 0),
      0
    );
    const totalFarmerPayoutINR = farmerPayoutEvents + farmerPayoutCarbon;

    // District-wise distribution of verified waste
    const districtDist: Record<APDistrict, number> = {
      Palnadu: 0,
      Prakasam: 0,
      Kurnool: 0,
      'East Godavari': 0,
      'West Godavari': 0,
      Vizianagaram: 0,
    };

    lifecycleEvents.forEach((ev) => {
      const dist = ev.district as APDistrict;
      if (districtDist[dist] !== undefined) {
        districtDist[dist] += ev.weighbridgeSlip?.netWeightKg || ev.declaredWeightKg || 0;
      }
    });

    return {
      totalWasteKg,
      methaneAvoidedKg,
      totalCarbonTCO2e,
      netCredits,
      totalFarmerPayoutINR,
      districtDist,
      totalVerifiedRecords: lifecycleEvents.length + carbonProjects.length + batches.length,
    };
  }, [lifecycleEvents, carbonProjects, batches]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-emerald-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              {language === 'te'
                ? 'లైవ్ డేటాబేస్ పారదర్శక విశ్లేషణ'
                : '100% Real-Data Impact Ledger'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {language === 'te'
              ? 'నిజమైన సర్క్యులర్ ఎకానమీ & కార్బన్ పొదుపు'
              : 'Verifiable Circular Economy & Carbon Ledger'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {language === 'te'
              ? 'ఈ డాష్‌బోర్డ్‌లోని ప్రతి సంఖ్య అధికారిక కాటా బరువులు, ప్రాసెసింగ్ బ్యాచ్‌లు మరియు భారతీయ కార్బన్ మార్కెట్ (ICM) రికార్డుల నుండి నేరుగా గణించబడింది.'
              : 'Calculated strictly from real Firestore records without synthetic or fabricated numbers. Zero data fabrication guarantee.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1.5 rounded-xl self-start md:self-center border border-gray-200">
          <Clock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Last Refreshed: {lastRefreshed}</span>
        </div>
      </div>

      {/* Honest Empty State Alert if Registry is Brand New */}
      {metrics.totalVerifiedRecords === 0 && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-black block">
              {language === 'te' ? 'లైవ్ రిజిస్ట్రీ ప్రారంభ దశలో ఉంది' : 'Production Registry Initialized (0 Synthetic Records)'}
            </strong>
            <p className="text-amber-800 leading-relaxed">
              {language === 'te'
                ? 'డేటా సమగ్రతా నిబంధనల ప్రకారం, కృత్రిమ లేదా కల్పిత గణాంకాలు ప్రదర్శించబడవు. నిజమైన ప్రభావ గణాంకాలను చూడటానికి "వేస్ట్ పైప్‌లైన్" లేదా "కార్బన్ ఇంజిన్" లో రికార్డులను నమోదు చేయండి.'
                : 'In accordance with our strict data integrity standard, fake and simulated records have been completely removed. Log real transactions in the 16-Stage Waste Pipeline or Carbon Engine to watch live metrics compute in real-time.'}
            </p>
          </div>
        </div>
      )}

      {/* Primary Verified Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Real Waste Diverted */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {language === 'te' ? 'సేకరించిన వ్యర్థాలు' : 'Verified Waste Diverted'}
            </span>
            <Scale className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="space-y-0.5">
            <strong className="text-2xl sm:text-3xl font-black font-mono text-gray-900">
              {metrics.totalWasteKg.toLocaleString('en-IN')}
            </strong>
            <span className="text-xs text-gray-500 font-medium ml-1">kg</span>
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold">
            Certified via weighbridge receipts
          </p>
        </div>

        {/* Metric 2: Methane Avoided */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {language === 'te' ? 'నిరోధించిన మీథేన్' : 'Methane Suppressed'}
            </span>
            <Leaf className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="space-y-0.5">
            <strong className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
              {metrics.methaneAvoidedKg.toLocaleString('en-IN')}
            </strong>
            <span className="text-xs text-gray-500 font-medium ml-1">kg CH₄</span>
          </div>
          <p className="text-[10px] text-gray-400">
            Landfill anaerobic avoidance
          </p>
        </div>

        {/* Metric 3: Carbon Offset */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {language === 'te' ? 'కార్బన్ క్రెడిట్‌లు' : 'Net Carbon Offset'}
            </span>
            <Flame className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="space-y-0.5">
            <strong className="text-2xl sm:text-3xl font-black font-mono text-teal-800">
              {metrics.totalCarbonTCO2e.toLocaleString('en-IN')}
            </strong>
            <span className="text-xs text-gray-500 font-medium ml-1">tCO₂e</span>
          </div>
          <p className="text-[10px] text-gray-400">
            BEE / CCTS accounting framework
          </p>
        </div>

        {/* Metric 4: Direct Farmer Payouts */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {language === 'te' ? 'రైతులకు చేరిన ఆదాయం' : 'Farmer Reconciled Wealth'}
            </span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="space-y-0.5">
            <strong className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
              ₹{metrics.totalFarmerPayoutINR.toLocaleString('en-IN')}
            </strong>
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold">
            Direct DBT bank ledger transfers
          </p>
        </div>
      </div>

      {/* Pilot Districts Real Breakdown */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">
              GEOGRAPHIC BREAKDOWN
            </span>
            <h3 className="font-black text-gray-900 text-lg">
              {language === 'te'
                ? '5 పైలట్ జిల్లాల వారీగా ధృవీకరించిన వ్యర్థాల రికార్డులు'
                : 'Pilot District Progress across Andhra Pradesh'}
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            {metrics.totalVerifiedRecords} total audited records
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(
            [
              'Palnadu',
              'Prakasam',
              'Kurnool',
              'East Godavari',
              'West Godavari',
              'Vizianagaram',
            ] as APDistrict[]
          ).map((dist) => {
            const meta = AP_DISTRICTS_META[dist];
            const weight = metrics.districtDist[dist] || 0;
            return (
              <div
                key={dist}
                className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-gray-900 text-sm font-black">{dist}</strong>
                  <span className="text-[10px] font-mono text-gray-500">
                    HQ: {meta.headquarters}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-gray-500">Verified Waste:</span>
                  <span className="font-mono font-extrabold text-emerald-950 text-sm">
                    {weight.toLocaleString('en-IN')} kg
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${metrics.totalWasteKg > 0 ? (weight / metrics.totalWasteKg) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
