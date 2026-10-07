import React, { useState } from 'react';
import {
  Layers,
  Truck,
  FlaskConical,
  PackageCheck,
  Store,
  Sprout,
  Plus,
  Clock,
  QrCode,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { WasteCollectionRequest, ProcessingBatch, SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface PipelineSectionProps {
  requests: WasteCollectionRequest[];
  batches: ProcessingBatch[];
  onRequestPickup: (req: Partial<WasteCollectionRequest>) => void;
  onAddBatch: (batch: Partial<ProcessingBatch>) => void;
  onOpenQR: (batch: ProcessingBatch) => void;
  onGoToMarketplace: () => void;
  onGoToRotation?: () => void;
  language: SupportedLanguage;
}

export const PipelineSection: React.FC<PipelineSectionProps> = ({
  requests,
  batches,
  onRequestPickup,
  onAddBatch,
  onOpenQR,
  onGoToMarketplace,
  onGoToRotation,
  language,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showPickupModal, setShowPickupModal] = useState<boolean>(false);
  const [showBatchModal, setShowBatchModal] = useState<boolean>(false);

  // New pickup form state
  const [newGeneratorType, setNewGeneratorType] = useState<WasteCollectionRequest['generatorType']>('Mandi / Market');
  const [newWasteType, setNewWasteType] = useState<string>('Vegetable mandi trimmings & discarded fruits');
  const [newWeight, setNewWeight] = useState<number>(300);
  const [newVillage, setNewVillage] = useState<string>('Ramnagar Gram Panchayat Center');
  const [newContact, setNewContact] = useState<string>('Ramesh Kumar');
  const [newPhone, setNewPhone] = useState<string>('+91 98221 55678');
  const [newNotes, setNewNotes] = useState<string>('Segregated organic wet waste, no plastics.');

  // New batch form state
  const [newUnitName, setNewUnitName] = useState<string>('Kisan Self-Help Composting Pit #3');
  const [newOperator, setNewOperator] = useState<string>('Savita Tai (Women SHG)');
  const [newProcessType, setNewProcessType] = useState<ProcessingBatch['processType']>('Vermi-composting');
  const [newInputKg, setNewInputKg] = useState<number>(800);
  const [newOutputProduct, setNewOutputProduct] = useState<string>('Grade-A Enriched Vermicompost');
  const [newExpectedYield, setNewExpectedYield] = useState<number>(360);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const pipelineSteps = [
    {
      num: 1,
      title: t.stepCollect || '1. Collect',
      subtitle: 'Village Aggregation Points',
      icon: Truck,
      color: 'from-amber-600 to-orange-500',
      desc: 'Household, vegetable market, hotel & farm biomass waste aggregation.',
    },
    {
      num: 2,
      title: t.stepProcess || '2. Process',
      subtitle: 'Decentralized Units',
      icon: FlaskConical,
      color: 'from-emerald-600 to-teal-500',
      desc: 'Run by farmers & SHGs: Vermicompost, bio-enzymes, and jeevamrutha liquid.',
    },
    {
      num: 3,
      title: t.stepProduct || '3. Product',
      subtitle: 'Certified Quality Batches',
      icon: PackageCheck,
      color: 'from-blue-600 to-cyan-500',
      desc: 'Lab assayed NPK profile, QR batch traceability, humic enrichment.',
    },
    {
      num: 4,
      title: t.stepSell || '4. Sell',
      subtitle: 'Dual Marketplace & FPO',
      icon: Store,
      color: 'from-purple-600 to-indigo-500',
      desc: 'Sold directly to farmers, FPOs, and urban gardeners with low 3-8% commission.',
    },
    {
      num: 5,
      title: t.stepUse || '5. Use',
      subtitle: 'Field Application & Soil Health',
      icon: Sprout,
      color: 'from-green-600 to-emerald-600',
      desc: 'Replaces 40% DAP/Urea, builds soil organic carbon, cleaner harvests.',
    },
  ];

  const handleCreatePickup = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestPickup({
      generatorType: newGeneratorType,
      wasteType: newWasteType,
      estimatedWeightKg: Number(newWeight),
      village: newVillage,
      contactName: newContact,
      phone: newPhone,
      notes: newNotes,
      status: 'Pending Pickup',
      pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    });
    setShowPickupModal(false);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const batchNo = `KG-${newProcessType.slice(0, 4).toUpperCase()}-2026-${Math.floor(10 + Math.random() * 90)}`;
    onAddBatch({
      batchNo,
      unitName: newUnitName,
      operatorName: newOperator,
      village: 'Ramnagar, Nashik',
      processType: newProcessType,
      inputWasteKg: Number(newInputKg),
      inputRawMaterials: ['Segregated mandi waste', 'Cow dung slurry', 'Bio-inoculant'],
      startDate: new Date().toISOString().split('T')[0],
      estimatedReadyDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      currentStage: 'Active microbial breakdown & temperature balancing',
      stageProgressPercent: 15,
      outputProduct: newOutputProduct,
      expectedYieldKg: Number(newExpectedYield),
      status: 'Fermenting',
      npkReport: {
        nitrogen: '1.9%',
        phosphorus: '1.3%',
        potassium: '1.5%',
        organicCarbonPercent: 19.2,
        ph: 7.1,
        cToNRatio: '14:1',
      },
      qrCodeData: `https://krishigreen.in/verify/${batchNo}`,
    });
    setShowBatchModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Slide 04 Blueprint • Closed-Loop Agri Economy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            The 5-Step Waste-to-Wealth Pipeline
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            From village kitchens and mandis directly to living soils. The farmer is both producer and beneficiary—turning discarded bio-waste into certified organic fertility and village revenue.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-emerald-700/60">
            <div>
              <span className="text-[11px] text-emerald-300 uppercase block font-semibold">Active Waste Ingestion</span>
              <strong className="text-xl font-bold font-mono">1,545 kg</strong>
            </div>
            <div>
              <span className="text-[11px] text-emerald-300 uppercase block font-semibold">Decentralized Units</span>
              <strong className="text-xl font-bold font-mono">12 Pits/Labs</strong>
            </div>
            <div>
              <span className="text-[11px] text-emerald-300 uppercase block font-semibold">Organic Output Yield</span>
              <strong className="text-xl font-bold font-mono">1,230 kg Ready</strong>
            </div>
            <div>
              <span className="text-[11px] text-emerald-300 uppercase block font-semibold">Farmer Revenue Generated</span>
              <strong className="text-xl font-bold font-mono">₹48,250</strong>
            </div>
          </div>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 5-Step Interactive Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {pipelineSteps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.num;
          return (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`p-3.5 rounded-xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-gray-200/90 hover:border-emerald-300 hover:bg-emerald-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${step.color} shadow-xs`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Step 0{step.num}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-tight">{step.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{step.subtitle}</p>
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Step Content View */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
        {/* Step 1: COLLECT */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                    <Truck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">Step 1: Waste Aggregation & Collection</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Scheduled pickups from village households, agricultural mandis, highway canteens, and farm biomass residues.
                </p>
              </div>
              <button
                onClick={() => setShowPickupModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> Request Waste Pickup
              </button>
            </div>

            {/* Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition bg-gradient-to-b from-gray-50/50 to-white flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-gray-500">{req.id}</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : req.status === 'In Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : req.status === 'Collected'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm">{req.wasteType}</h4>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{req.village}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-white p-2.5 rounded-lg border border-gray-100">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Generator</span>
                        <strong>{req.generatorType}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Est. Weight</span>
                        <strong className="text-emerald-700 font-bold">{req.estimatedWeightKg} kg</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Contact Person</span>
                        <span>{req.contactName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Pickup Date</span>
                        <span>{req.pickupDate}</span>
                      </div>
                    </div>

                    {req.notes && (
                      <p className="text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded-md">
                        "{req.notes}"
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span>Logged: {req.createdAt}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      Route #4 Assigned <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: PROCESS */}
        {activeStep === 2 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">Step 2: Decentralized Processing Units</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Village units run by farmers, SHGs, and local youth. Tracking fermentation, earthworm activity, and curing times.
                </p>
              </div>
              <button
                onClick={() => setShowBatchModal(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-4 h-4" /> Log New Bio-Batch
              </button>
            </div>

            <div className="space-y-4">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-4 sm:p-5 rounded-xl border border-gray-200 hover:border-emerald-300 transition bg-white shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs font-bold">
                          {batch.batchNo}
                        </span>
                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                          {batch.processType}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base mt-1">{batch.unitName}</h4>
                      <p className="text-xs text-gray-500">
                        Lead Operator: <strong>{batch.operatorName}</strong> • {batch.village}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          batch.status === 'Tested & Certified'
                            ? 'bg-green-100 text-green-800'
                            : batch.status === 'Curing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {batch.status}
                      </span>
                      <button
                        onClick={() => onOpenQR(batch)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-emerald-200 transition"
                      >
                        <QrCode className="w-3.5 h-3.5" /> Trace QR
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Stage: {batch.currentStage}</span>
                      <strong className="font-mono text-emerald-700">{batch.stageProgressPercent}% Complete</strong>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500"
                        style={{ width: `${batch.stageProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Input Bio-Waste</span>
                      <strong className="text-gray-900">{batch.inputWasteKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Expected Yield</span>
                      <strong className="text-emerald-700">{batch.expectedYieldKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Started On</span>
                      <span className="text-gray-700">{batch.startDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Ready for Sifting</span>
                      <span className="text-gray-700 font-semibold">{batch.estimatedReadyDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: PRODUCT */}
        {activeStep === 3 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
                    <PackageCheck className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">Step 3: Quality Product & Laboratory Assay</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Real items ready for distribution: Solid Vermicompost, Liquid Bio-Stimulants, Natural Pest Solutions, and Garden Kits.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                        {batch.batchNo}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Tested & Approved
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">{batch.outputProduct}</h4>
                    <p className="text-xs text-gray-500">Produced by {batch.unitName}</p>

                    {/* NPK Snapshot */}
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Nitrogen (N):</span>
                        <strong className="text-emerald-900">{batch.npkReport?.nitrogen || '1.8%'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phosphorus (P₂O₅):</span>
                        <strong className="text-emerald-900">{batch.npkReport?.phosphorus || '1.2%'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potassium (K₂O):</span>
                        <strong className="text-emerald-900">{batch.npkReport?.potassium || '1.4%'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Organic Carbon (SOC):</span>
                        <strong className="text-emerald-900 font-bold">
                          {batch.npkReport?.organicCarbonPercent || 18.4}%
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenQR(batch)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <QrCode className="w-3.5 h-3.5" /> View QR Certificate
                    </button>
                    <span className="text-xs font-mono font-bold text-gray-700">
                      Stock: {batch.expectedYieldKg} kg
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: SELL */}
        {activeStep === 4 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-purple-100 text-purple-800 rounded-lg">
                    <Store className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">Step 4: KrishiGreen Marketplace & FPO Distribution</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Connecting village bio-fertilizer producers with local farmers, retail nurseries, and urban gardeners.
                </p>
              </div>
              <button
                onClick={onGoToMarketplace}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                Go to Dual Marketplace <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Store className="w-8 h-8" />
              </div>
              <div className="space-y-2 text-sm text-purple-950">
                <h4 className="font-bold text-base">Fair & Transparent Shared Prosperity Model (Slide 09)</h4>
                <p className="text-xs leading-relaxed text-purple-800">
                  KrishiGreen keeps commissions deliberately low (3–8%) and capped for smallholders. Every rupee paid by buyers flows directly into village SHGs and farmer bank accounts through instant UPI settlement.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-0.5 bg-white text-purple-800 font-bold rounded-md border border-purple-200">
                    Capped 3-8% Fee
                  </span>
                  <span className="px-2.5 py-0.5 bg-white text-purple-800 font-bold rounded-md border border-purple-200">
                    Instant UPI Payouts
                  </span>
                  <span className="px-2.5 py-0.5 bg-white text-purple-800 font-bold rounded-md border border-purple-200">
                    FPO Bulk Invoicing
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: USE */}
        {activeStep === 5 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-green-100 text-green-800 rounded-lg">
                    <Sprout className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg">Step 5: Field Application & Soil Restoration</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Replacing toxic synthetic chemical load (Urea & DAP) with high-carbon biological nutrients for long-term soil health.
                </p>
              </div>
              {onGoToRotation && (
                <button
                  onClick={onGoToRotation}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <RotateCcw className="w-4 h-4" /> Open Crop Rotation Scheduler
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-800">Dosage for Paddy & Wheat</span>
                <p className="text-sm font-semibold text-gray-900">2.0 – 2.5 Tonnes Vermicompost / Acre</p>
                <p className="text-xs text-gray-600">
                  Apply during basal field preparation. Reduces DAP requirement by 40% in season 1.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-800">Dosage for Cotton & Sugarcane</span>
                <p className="text-sm font-semibold text-gray-900">3.0 Tonnes Vermicompost + Jeevamrutha</p>
                <p className="text-xs text-gray-600">
                  Apply Jeevamrutha at 200L/acre every 21 days with irrigation for deep root colonization.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-800">Vegetables & Orchards</span>
                <p className="text-sm font-semibold text-gray-900">Foliar Bio-Enzyme Spray (5ml/L)</p>
                <p className="text-xs text-gray-600">
                  Provides trace plant hormones, improves fruit setting, and repels sucking insects naturally.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Request Pickup */}
      {showPickupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Request Waste Pickup</h3>
            <form onSubmit={handleCreatePickup} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Waste Generator Category</label>
                <select
                  value={newGeneratorType}
                  onChange={(e) => setNewGeneratorType(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
                >
                  <option value="Mandi / Market">Mandi / Market Trimmings</option>
                  <option value="Household">Village Household Aggregation</option>
                  <option value="Hotel / Canteen">Hotel / Highway Canteen</option>
                  <option value="Farm Residue">Farm Crop Biomass Residue</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Waste Description</label>
                <input
                  type="text"
                  value={newWasteType}
                  onChange={(e) => setNewWasteType(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Estimated Weight (kg)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                    min="10"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Village / Location</label>
                  <input
                    type="text"
                    value={newVillage}
                    onChange={(e) => setNewVillage(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Special Notes</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPickupModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Processing Batch */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Log New Processing Batch</h3>
            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Processing Unit Name</label>
                <input
                  type="text"
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Lead Operator / Farmer</label>
                <input
                  type="text"
                  value={newOperator}
                  onChange={(e) => setNewOperator(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Process Method</label>
                <select
                  value={newProcessType}
                  onChange={(e) => setNewProcessType(e.target.value as any)}
                  className="w-full p-2.5 border rounded-xl bg-gray-50 font-medium"
                >
                  <option value="Vermi-composting">Vermi-composting (Earthworm casting)</option>
                  <option value="Aerobic Windrow">Aerobic Thermophilic Composting</option>
                  <option value="Bio-Enzyme Fermentation">Bio-Enzyme Citrus Fermentation (90 days)</option>
                  <option value="Jeevamrutha Liquid">Jeevamrutha Microbial Brew</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Input Waste (kg)</label>
                  <input
                    type="number"
                    value={newInputKg}
                    onChange={(e) => {
                      const kg = Number(e.target.value);
                      setNewInputKg(kg);
                      setNewExpectedYield(Math.round(kg * 0.45));
                    }}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Expected Output (kg)</label>
                  <input
                    type="number"
                    value={newExpectedYield}
                    onChange={(e) => setNewExpectedYield(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Output Product Label</label>
                <input
                  type="text"
                  value={newOutputProduct}
                  onChange={(e) => setNewOutputProduct(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBatchModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition"
                >
                  Start Batch Processing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
