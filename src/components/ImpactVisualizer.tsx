import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  Recycle,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  Flame,
  Sprout,
  CheckCircle2,
} from 'lucide-react';

// Monthly/Seasonal tracking data for the pilot cluster up to Phase 2 scale
const SEASONAL_OUTPUT_DATA = [
  {
    period: 'Jul 26 (Kharif Start)',
    vermicompostTonnes: 18,
    bioEnzymeKL: 4.2,
    jeevamruthaKL: 12.0,
    chemicalOffsetTonnes: 14.5,
  },
  {
    period: 'Aug 26 (Kharif Mid)',
    vermicompostTonnes: 26,
    bioEnzymeKL: 6.8,
    jeevamruthaKL: 18.5,
    chemicalOffsetTonnes: 21.0,
  },
  {
    period: 'Sep 26 (Kharif Peak)',
    vermicompostTonnes: 38,
    bioEnzymeKL: 9.4,
    jeevamruthaKL: 24.0,
    chemicalOffsetTonnes: 31.2,
  },
  {
    period: 'Oct 26 (Harvest & Compost)',
    vermicompostTonnes: 45,
    bioEnzymeKL: 11.2,
    jeevamruthaKL: 28.5,
    chemicalOffsetTonnes: 38.0,
  },
  {
    period: 'Nov 26 (Rabi Sowing)',
    vermicompostTonnes: 54,
    bioEnzymeKL: 13.5,
    jeevamruthaKL: 34.0,
    chemicalOffsetTonnes: 45.8,
  },
  {
    period: 'Dec 26 (Rabi Vegetative)',
    vermicompostTonnes: 62,
    bioEnzymeKL: 15.0,
    jeevamruthaKL: 39.5,
    chemicalOffsetTonnes: 52.4,
  },
  {
    period: 'Jan 27 (Rabi Mid)',
    vermicompostTonnes: 74,
    bioEnzymeKL: 18.2,
    jeevamruthaKL: 46.0,
    chemicalOffsetTonnes: 63.5,
  },
  {
    period: 'Feb 27 (Rabi Flowering)',
    vermicompostTonnes: 85,
    bioEnzymeKL: 21.0,
    jeevamruthaKL: 52.0,
    chemicalOffsetTonnes: 72.8,
  },
  {
    period: 'Mar 27 (Rabi Harvest)',
    vermicompostTonnes: 98,
    bioEnzymeKL: 24.5,
    jeevamruthaKL: 60.5,
    chemicalOffsetTonnes: 84.0,
  },
  {
    period: 'Apr 27 (Zaid Summer Prep)',
    vermicompostTonnes: 115,
    bioEnzymeKL: 28.0,
    jeevamruthaKL: 71.0,
    chemicalOffsetTonnes: 98.2,
  },
  {
    period: 'May 27 (Zaid Green Manure)',
    vermicompostTonnes: 132,
    bioEnzymeKL: 32.4,
    jeevamruthaKL: 82.0,
    chemicalOffsetTonnes: 112.5,
  },
  {
    period: 'Jun 27 (Pilot Milestone)',
    vermicompostTonnes: 150,
    bioEnzymeKL: 38.0,
    jeevamruthaKL: 95.0,
    chemicalOffsetTonnes: 128.0,
  },
];

// Cumulative Landfill Waste Diversion & Methane Prevention Data
const CUMULATIVE_DIVERSION_DATA = [
  {
    month: 'Jul 26',
    divertedTonnes: 42,
    cumulativeTonnes: 42,
    methaneAvoidedMT: 30.2,
    landfillAreaSavedSqM: 126,
  },
  {
    month: 'Aug 26',
    divertedTonnes: 58,
    cumulativeTonnes: 100,
    methaneAvoidedMT: 72.0,
    landfillAreaSavedSqM: 300,
  },
  {
    month: 'Sep 26',
    divertedTonnes: 78,
    cumulativeTonnes: 178,
    methaneAvoidedMT: 128.2,
    landfillAreaSavedSqM: 534,
  },
  {
    month: 'Oct 26',
    divertedTonnes: 95,
    cumulativeTonnes: 273,
    methaneAvoidedMT: 196.6,
    landfillAreaSavedSqM: 819,
  },
  {
    month: 'Nov 26',
    divertedTonnes: 120,
    cumulativeTonnes: 393,
    methaneAvoidedMT: 283.0,
    landfillAreaSavedSqM: 1179,
  },
  {
    month: 'Dec 26',
    divertedTonnes: 145,
    cumulativeTonnes: 538,
    methaneAvoidedMT: 387.4,
    landfillAreaSavedSqM: 1614,
  },
  {
    month: 'Jan 27',
    divertedTonnes: 172,
    cumulativeTonnes: 710,
    methaneAvoidedMT: 511.2,
    landfillAreaSavedSqM: 2130,
  },
  {
    month: 'Feb 27',
    divertedTonnes: 198,
    cumulativeTonnes: 908,
    methaneAvoidedMT: 653.8,
    landfillAreaSavedSqM: 2724,
  },
  {
    month: 'Mar 27',
    divertedTonnes: 230,
    cumulativeTonnes: 1138,
    methaneAvoidedMT: 819.4,
    landfillAreaSavedSqM: 3414,
  },
  {
    month: 'Apr 27',
    divertedTonnes: 265,
    cumulativeTonnes: 1403,
    methaneAvoidedMT: 1010.2,
    landfillAreaSavedSqM: 4209,
  },
  {
    month: 'May 27',
    divertedTonnes: 310,
    cumulativeTonnes: 1713,
    methaneAvoidedMT: 1233.4,
    landfillAreaSavedSqM: 5139,
  },
  {
    month: 'Jun 27',
    divertedTonnes: 360,
    cumulativeTonnes: 2073,
    methaneAvoidedMT: 1492.6,
    landfillAreaSavedSqM: 6219,
  },
];

export const ImpactVisualizer: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<'diversion' | 'fertilizer'>('diversion');
  const [filterRange, setFilterRange] = useState<'all' | 'kharif' | 'rabi'>('all');

  // Filter diversion data
  const filteredDiversion = CUMULATIVE_DIVERSION_DATA.filter((d, idx) => {
    if (filterRange === 'kharif') return idx <= 4;
    if (filterRange === 'rabi') return idx >= 4 && idx <= 8;
    return true;
  });

  // Filter seasonal output data
  const filteredOutput = SEASONAL_OUTPUT_DATA.filter((d, idx) => {
    if (filterRange === 'kharif') return idx <= 4;
    if (filterRange === 'rabi') return idx >= 4 && idx <= 8;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            Slide 08 & 11 • Real-Time Environmental Analytics
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Impact Data Visualization & Seasonal Trends
          </h3>
          <p className="text-xs text-gray-500">
            Tracking cumulative landfill waste diversion and seasonal organic fertilizer yields across pilot villages.
          </p>
        </div>

        {/* Chart View Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveChartTab('diversion')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeChartTab === 'diversion'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Recycle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Waste Diverted (Cumulative)</span>
            </button>
            <button
              onClick={() => setActiveChartTab('fertilizer')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeChartTab === 'fertilizer'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seasonal Fertilizer Outputs</span>
            </button>
          </div>

          {/* Season Filter Dropdown */}
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value as any)}
            className="p-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none"
          >
            <option value="all">Full 12 Months</option>
            <option value="kharif">Kharif Season</option>
            <option value="rabi">Rabi Season</option>
          </select>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">
            Cumulative Waste Diverted
          </span>
          <strong className="text-xl font-bold font-mono text-emerald-900">2,073 Tonnes</strong>
          <span className="text-[10px] text-emerald-700 block mt-0.5">
            ↑ 360 T/mo current run rate
          </span>
        </div>

        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">
            Methane Gas Prevented
          </span>
          <strong className="text-xl font-bold font-mono text-teal-800">1,492.6 MT CO₂e</strong>
          <span className="text-[10px] text-teal-700 block mt-0.5">
            Equivalent to 320 cars off roads
          </span>
        </div>

        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">
            Total Bio-Inputs Yielded
          </span>
          <strong className="text-xl font-bold font-mono text-green-800">932 Tonnes / KL</strong>
          <span className="text-[10px] text-green-700 block mt-0.5">
            100% FCO quality certified
          </span>
        </div>

        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-gray-500 uppercase font-bold block">
            Chemical DAP Replaced
          </span>
          <strong className="text-xl font-bold font-mono text-emerald-700">↓ 42.4%</strong>
          <span className="text-[10px] text-emerald-600 block mt-0.5">
            Exceeding 40% 3-year target
          </span>
        </div>
      </div>

      {/* CHART 1: Cumulative Waste Diversion (Area Chart) */}
      {activeChartTab === 'diversion' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-semibold text-gray-800">
              Cumulative Waste Diverted (Tonnes) vs Methane Avoidance (MT CO₂e)
            </span>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              Target: 1M+ Tonnes National Scale
            </span>
          </div>

          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredDiversion}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorMethane" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `${val} T`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-emerald-100 text-xs space-y-1.5">
                          <p className="font-bold text-gray-900 border-b pb-1">{label}</p>
                          <p className="text-emerald-700 font-semibold">
                            Cumulative Diverted: {payload[0]?.value} Tonnes
                          </p>
                          <p className="text-teal-700 font-semibold">
                            Methane Avoided: {payload[1]?.value} MT CO₂e
                          </p>
                          <p className="text-gray-500 text-[10px]">
                            Monthly Inflow: {(payload[0]?.payload as any)?.divertedTonnes} T
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Area
                  type="monotone"
                  dataKey="cumulativeTonnes"
                  name="Cumulative Food Waste Diverted (Tonnes)"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorCumulative)"
                />
                <Area
                  type="monotone"
                  dataKey="methaneAvoidedMT"
                  name="Methane Emissions Prevented (MT CO₂e)"
                  stroke="#0d9488"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMethane)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART 2: Seasonal Fertilizer Output Trends (Composed Chart) */}
      {activeChartTab === 'fertilizer' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-semibold text-gray-800">
              Monthly Bio-Fertilizer Output (Tonnes/KL) vs Chemical DAP Offset (Tonnes)
            </span>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              Kharif → Rabi → Zaid Harvest Output
            </span>
          </div>

          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredOutput}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `${val} T`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: '#f59e0b' }}
                  tickFormatter={(val) => `${val} T`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-emerald-100 text-xs space-y-1.5">
                          <p className="font-bold text-gray-900 border-b pb-1">{label}</p>
                          <p className="text-emerald-800 font-semibold">
                            Vermicompost: {payload[0]?.value} Tonnes
                          </p>
                          <p className="text-teal-700 font-semibold">
                            Jeevamrutha Brew: {payload[1]?.value} KL
                          </p>
                          <p className="text-blue-600 font-semibold">
                            Bio-Enzymes: {payload[2]?.value} KL
                          </p>
                          <p className="text-amber-600 font-bold pt-1 border-t">
                            Chemical DAP Replaced: {payload[3]?.value} Tonnes
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar
                  yAxisId="left"
                  dataKey="vermicompostTonnes"
                  name="Solid Vermicompost (Tonnes)"
                  fill="#047857"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="jeevamruthaKL"
                  name="Jeevamrutha Brew (KL)"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="bioEnzymeKL"
                  name="Citrus Bio-Enzyme (KL)"
                  fill="#38bdf8"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="chemicalOffsetTonnes"
                  name="Chemical DAP/Urea Offset (Tonnes)"
                  stroke="#d97706"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#d97706' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Footer Insight Box */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-emerald-950 font-bold">
              Carbon Credit Aggregation & Verification (Slide 09 & 10)
            </strong>
            <p className="text-emerald-800 text-[11px]">
              Every metric ton of diverted landfill organic waste is geotagged and ledgered with batch QR codes, allowing village FPOs to pool verified carbon offsets under international accreditation registries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
