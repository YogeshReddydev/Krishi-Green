import React, { useState, useEffect } from 'react';
import {
  IconSprout,
  IconCheck,
  IconAlertTriangle,
  IconDroplets,
  IconClock,
  IconCalendar,
  IconArrowRight,
  IconShield,
  IconRefresh,
  IconPlus,
  IconFileText,
} from './Icons';
import { SupportedLanguage } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export type CropGrowthStageId = 'germination' | 'vegetative' | 'flowering' | 'maturation' | 'harvest';
export type CropStatusCode = 'VIGOR' | 'HEALTHY' | 'MOISTURE_STRESS' | 'PEST_ALERT' | 'NUTRIENT_DEFICIENT' | 'WEATHER_STRESS';

export interface GrowthStageDefinition {
  id: CropGrowthStageId;
  name: string;
  nameTe: string;
  nameHi: string;
  stageCode: string;
  progressPercent: number;
  stageDaysRange: string;
  agriFocus: string;
  fertilizerAction: string;
}

export const GROWTH_STAGES: GrowthStageDefinition[] = [
  {
    id: 'germination',
    name: 'Sowing & Germination',
    nameTe: 'విత్తనం & మొలకెత్తుట',
    nameHi: 'बुवाई व अंकुरण',
    stageCode: '01',
    progressPercent: 15,
    stageDaysRange: 'Days 0 to 15',
    agriFocus: 'Seedbed moisture, microbial root coating & uniform sprouting',
    fertilizerAction: 'Basal application of Vermicompost (2t/acre) + Seed treatment slurry',
  },
  {
    id: 'vegetative',
    name: 'Vegetative & Tillering',
    nameTe: 'శాకీయ పెరుగుదల & పిలకలు',
    nameHi: 'वानस्पतिक वृद्धि व कल्ले',
    stageCode: '02',
    progressPercent: 40,
    stageDaysRange: 'Days 16 to 45',
    agriFocus: 'Rapid canopy development, root node colonization & weed suppression',
    fertilizerAction: 'Jeevamrutha liquid irrigation (200L/acre) + Azospirillum microbial boost',
  },
  {
    id: 'flowering',
    name: 'Flowering & Booting',
    nameTe: 'పూత & గర్భ దశ',
    nameHi: 'फूल व बालियां निकलना',
    stageCode: '03',
    progressPercent: 70,
    stageDaysRange: 'Days 46 to 75',
    agriFocus: 'Pollen viability, pest scouting & balanced phosphorus/potassium uptake',
    fertilizerAction: 'Foliar spray of Fermented Bio-Enzyme (5ml/L) or Vermiwash for fruit-set',
  },
  {
    id: 'maturation',
    name: 'Grain / Pod Filling',
    nameTe: 'గింజ పాలుపోసుకునే దశ',
    nameHi: 'दाना व फली भराव',
    stageCode: '04',
    progressPercent: 90,
    stageDaysRange: 'Days 76 to 105',
    agriFocus: 'Kernel starch density, moisture gradual draw-down & husk hardening',
    fertilizerAction: 'Light microbial foliar spray; stop heavy nitrogen to prevent lodging',
  },
  {
    id: 'harvest',
    name: 'Maturity & Harvest Ready',
    nameTe: 'కోతకు సిద్ధం',
    nameHi: 'परिपक्वता व कटाई तैयार',
    stageCode: '05',
    progressPercent: 100,
    stageDaysRange: 'Days 106 to 125',
    agriFocus: 'Grain moisture test (<14%), straw baling coordination & residue aggregation',
    fertilizerAction: 'Collect post-harvest straw for KrishiGreen circular composting pipeline',
  },
];

export interface CropTrackerItem {
  id: string;
  cropName: string;
  cropNameTe: string;
  variety: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  plotName: string;
  acreage: number;
  sowingDate: string;
  currentStage: CropGrowthStageId;
  statusCode: CropStatusCode;
  healthStatusLabel: string;
  healthStatusLabelTe: string;
  lastUpdated: string;
  actionAdvice: string;
  actionAdviceTe: string;
  fieldNotes: string;
  linkedBatchName: string;
}

export const HEALTH_STATUS_OPTIONS: Array<{
  code: CropStatusCode;
  label: string;
  labelTe: string;
  badgeStyle: string;
  cardBorder: string;
  defaultAdvice: string;
  defaultAdviceTe: string;
}> = [
  {
    code: 'VIGOR',
    label: 'Thriving & Vigorous',
    labelTe: 'చాలా ఆరోగ్యకరం (ఉత్తమ పెరుగుదల)',
    badgeStyle: 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]',
    cardBorder: 'border-[#1e382b]',
    defaultAdvice: 'Lush green canopy and deep root vigor. Continue bi-weekly Jeevamrutha schedule.',
    defaultAdviceTe: 'పచ్చని ఆకులు, బలమైన వేర్లు. ప్రతి 15 రోజులకు జీవామృతం కొనసాగించండి.',
  },
  {
    code: 'HEALTHY',
    label: 'Healthy & On Track',
    labelTe: 'సాధారణంగా బాగుంది',
    badgeStyle: 'bg-stone-200 text-stone-800 border-stone-300',
    cardBorder: 'border-stone-400',
    defaultAdvice: 'Normal developmental pace matching sowing calendar. Maintain balanced moisture.',
    defaultAdviceTe: 'విత్తిన క్యాలెండర్‌కు అనుగుణంగా సాధారణ పెరుగుదల. సరైన తేమను నిర్వహించండి.',
  },
  {
    code: 'MOISTURE_STRESS',
    label: 'Moisture Stress',
    labelTe: 'తేమ కొరత (నీటి ఒత్తిడి)',
    badgeStyle: 'bg-stone-200 text-stone-800 border-stone-300',
    cardBorder: 'border-stone-400',
    defaultAdvice: 'Soil drying out; leaf rolling observed at midday. Provide light irrigation and crop residue mulch.',
    defaultAdviceTe: 'మధ్యాహ్న సమయాల్లో ఆకులు ముడుచుకుంటున్నాయి. తేలికపాటి తడి అందించి, గడ్డితో మల్చింగ్ చేయండి.',
  },
  {
    code: 'PEST_ALERT',
    label: 'Pest / Bug Alert',
    labelTe: 'పురుగు / తెగులు దాడి',
    badgeStyle: 'bg-[#6b4f3b] text-[#fbfaf6] border-[#6b4f3b]',
    cardBorder: 'border-[#6b4f3b]',
    defaultAdvice: 'Scouted leaf nibbling or sucking pests. Spray 5% Neem Seed Kernel Extract (NSKE) or Agniastra immediately.',
    defaultAdviceTe: 'ఆకులను తింటున్న పురుగులు లేదా రసం పీల్చే పురుగులు గమనించబడ్డాయి. వెంటనే 5% వేప గింజల కషాయం లేదా అగ్నిఅస్త్రం పిచికారీ చేయండి.',
  },
  {
    code: 'NUTRIENT_DEFICIENT',
    label: 'Nutrient Deficiency',
    labelTe: 'పోషకాల లోపం',
    badgeStyle: 'bg-stone-200 text-stone-800 border-stone-300',
    cardBorder: 'border-stone-400',
    defaultAdvice: 'Lower leaf chlorosis or pale tips. Apply foliar Vermiwash (50ml/L) or fermented bio-enzyme booster.',
    defaultAdviceTe: 'క్రింది ఆకులు పసుపుబారాయి. వర్మివాష్ (లీటరుకు 50మి.లీ) లేదా బయో-ఎంజైమ్ ద్రావణాన్ని పిచికారీ చేయండి.',
  },
  {
    code: 'WEATHER_STRESS',
    label: 'Weather Stress',
    labelTe: 'వాతావరణ ప్రభావం',
    badgeStyle: 'bg-stone-200 text-stone-800 border-stone-300',
    cardBorder: 'border-stone-400',
    defaultAdvice: 'Excess rainfall or windy lodging risk. Clear drainage furrows to avoid root water-logging.',
    defaultAdviceTe: 'అధిక వర్షం లేదా బలమైన గాలుల ప్రభావం. వేరు కుళ్లు రాకుండా పొలంలో మురుగు కాలువలను శుభ్రం చేయండి.',
  },
];

const INITIAL_CROPS: CropTrackerItem[] = [
  {
    id: 'CROP-KH-01',
    cropName: 'Paddy (Sona Masuri)',
    cropNameTe: 'వరి (సోనా మసూరి)',
    variety: 'BPT-5204 (Subamba)',
    season: 'Kharif',
    plotName: 'North Field Plot #2 (Palnadu Hub)',
    acreage: 2.5,
    sowingDate: '2026-08-10',
    currentStage: 'flowering',
    statusCode: 'VIGOR',
    healthStatusLabel: 'Thriving & Vigorous',
    healthStatusLabelTe: 'చాలా ఆరోగ్యకరం (ఉత్తమ పెరుగుదల)',
    lastUpdated: 'Today at 09:15 AM',
    actionAdvice: 'Panicle initiation stage. Apply foliar bio-enzyme spray (5ml/L) for healthy grain filling.',
    actionAdviceTe: 'వరి పొట్టదశ/పూతదశ. గింజ బాగా పాలుపోసుకోవడానికి బయో-ఎంజైమ్ స్ప్రే చేయండి.',
    fieldNotes: 'Transplanted with 2 tonnes vermicompost basal dressing. Zero synthetic urea used.',
    linkedBatchName: 'KrishiGreen Grade-A Vermicompost (Batch V08)',
  },
  {
    id: 'CROP-RB-02',
    cropName: 'Chickpea (Bengal Gram)',
    cropNameTe: 'శనగ (బెంగాల్ గ్రామ్)',
    variety: 'JG-11 (Wilt Resistant)',
    season: 'Rabi',
    plotName: 'South Terraced Plot #1 (Prakasam)',
    acreage: 1.5,
    sowingDate: '2026-10-05',
    currentStage: 'vegetative',
    statusCode: 'HEALTHY',
    healthStatusLabel: 'Healthy & On Track',
    healthStatusLabelTe: 'సాధారణంగా బాగుంది',
    lastUpdated: 'Yesterday at 04:30 PM',
    actionAdvice: 'Active branch nodulation occurring. Keep soil aerated; avoid over-irrigation.',
    actionAdviceTe: 'వేరు బుడిపెలలో నత్రజని స్థాపన చురుగ్గా సాగుతోంది. తేమను నియంత్రించండి.',
    fieldNotes: 'Seeds inoculated with Rhizobium slurry before sowing. Excellent germination rate.',
    linkedBatchName: 'Liquid Bio-Enzyme Ferment (Batch L03)',
  },
  {
    id: 'CROP-ZD-03',
    cropName: 'Green Manure (Sunhemp / Dhaincha)',
    cropNameTe: 'పచ్చిరొట్ట ఎరువు (జనుము / జీలుగా)',
    variety: 'Local High Biomass Selection',
    season: 'Zaid',
    plotName: 'East Canal Border Plot',
    acreage: 1.0,
    sowingDate: '2026-09-28',
    currentStage: 'germination',
    statusCode: 'MOISTURE_STRESS',
    healthStatusLabel: 'Moisture Stress',
    healthStatusLabelTe: 'తేమ కొరత (నీటి ఒత్తిడి)',
    lastUpdated: '2 days ago',
    actionAdvice: 'Seedlings need light sprinkler irrigation to support early rooting.',
    actionAdviceTe: 'మొలకలు బలపడటానికి తేలికపాటి నీటి తడులు అందించండి.',
    fieldNotes: 'Will be ploughed back into topsoil with rotavator after 50 days to rebuild humus.',
    linkedBatchName: 'Jeevamrutha Microbial Brew (Batch J02)',
  },
];

interface CropGrowthTrackerProps {
  language: SupportedLanguage;
  activeBatchName?: string;
}

export const CropGrowthTracker: React.FC<CropGrowthTrackerProps> = ({
  language,
  activeBatchName = 'KrishiGreen Grade-A Vermicompost',
}) => {
  const [crops, setCrops] = useState<CropTrackerItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krishi_crop_progression_tracker');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback to initial
        }
      }
    }
    return INITIAL_CROPS;
  });

  const [selectedCropId, setSelectedCropId] = useState<string>(crops[0]?.id || 'CROP-KH-01');
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [showNotesInput, setShowNotesInput] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishi_crop_progression_tracker', JSON.stringify(crops));
    }
  }, [crops]);

  const activeCrop = crops.find((c) => c.id === selectedCropId) || crops[0];

  const handleUpdateHealth = async (opt: typeof HEALTH_STATUS_OPTIONS[number]) => {
    const timestampStr = 'Just now: ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedCrops = crops.map((c) => {
      if (c.id === activeCrop.id) {
        return {
          ...c,
          statusCode: opt.code,
          healthStatusLabel: opt.label,
          healthStatusLabelTe: opt.labelTe,
          actionAdvice: opt.defaultAdvice,
          actionAdviceTe: opt.defaultAdviceTe,
          lastUpdated: timestampStr,
        };
      }
      return c;
    });

    setCrops(updatedCrops);
    setSaveToast(`Health status updated to ${language === 'te' ? opt.labelTe : opt.label}.`);
    setTimeout(() => setSaveToast(null), 3000);

    try {
      await addDoc(collection(db, 'crop_health_logs'), {
        cropId: activeCrop.id,
        cropName: activeCrop.cropName,
        plotName: activeCrop.plotName,
        statusCode: opt.code,
        healthStatus: opt.label,
        currentStage: activeCrop.currentStage,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      // gracefully handled locally
    }
  };

  const handleSelectStage = (stageId: CropGrowthStageId) => {
    const stageDef = GROWTH_STAGES.find((s) => s.id === stageId);
    const updatedCrops = crops.map((c) => {
      if (c.id === activeCrop.id) {
        return {
          ...c,
          currentStage: stageId,
          lastUpdated: 'Stage updated just now',
        };
      }
      return c;
    });
    setCrops(updatedCrops);
    setSaveToast(`Advanced to ${stageDef?.name || stageId} stage.`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveNotes = () => {
    if (!editingNotes.trim()) return;
    const updatedCrops = crops.map((c) => {
      if (c.id === activeCrop.id) {
        return {
          ...c,
          fieldNotes: editingNotes.trim(),
          lastUpdated: 'Field note added just now',
        };
      }
      return c;
    });
    setCrops(updatedCrops);
    setShowNotesInput(false);
    setEditingNotes('');
    setSaveToast('Field note saved successfully.');
    setTimeout(() => setSaveToast(null), 2500);
  };

  const currentStageIndex = GROWTH_STAGES.findIndex((s) => s.id === activeCrop.currentStage);
  const currentStageMeta = GROWTH_STAGES[currentStageIndex] || GROWTH_STAGES[0];
  const activeStatusOpt =
    HEALTH_STATUS_OPTIONS.find((e) => e.code === activeCrop.statusCode) || HEALTH_STATUS_OPTIONS[0];

  return (
    <div className="bg-[#fdfcf9] rounded-sm border border-[#ded9ce] p-5 sm:p-6 space-y-6">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ded9ce] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-stone-100 border border-stone-300 text-stone-800 text-[10px] font-mono font-bold tracking-wide">
            <IconSprout className="w-3.5 h-3.5 text-[#1e382b]" />
            <span>
              {language === 'te' ? 'లైవ్ పంట ఎదుగుదల & ఆరోగ్య పర్యవేక్షణ' : 'Live Crop Growth & Health Progression Tracker'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'te' ? 'పంట దశల పురోగతి & ఆరోగ్య స్థితి' : 'Visual Crop Growth Tracker & Health Status'}
          </h3>
          <p className="text-xs text-stone-600 max-w-2xl font-sans">
            {language === 'te'
              ? 'పొలంలో ఉన్నప్పుడు ఒకే ట్యాప్‌తో పంట ఆరోగ్య స్థితిని అప్‌డేట్ చేయండి. మొలక దశ నుండి కోత దశ వరకు ఆర్గానిక్ ఎరువుల వాడకాన్ని సమన్వయం చేయండి.'
              : 'Track germination, tillering, flowering and harvest milestones. Tap quick status buttons to log field health and receive organic bio-fertilizer corrective advisories.'}
          </p>
        </div>

        {/* Multi-Crop Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-sm border border-stone-300 font-mono text-xs">
          {crops.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCropId(c.id);
                setShowNotesInput(false);
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer border ${
                c.id === activeCrop.id
                  ? 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b] font-bold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200 border-transparent'
              }`}
            >
              <span className="truncate max-w-[120px] inline-block">
                {language === 'te' ? c.cropNameTe : c.cropName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Toast */}
      {saveToast && (
        <div className="p-2.5 bg-stone-100 border border-stone-300 rounded-sm text-xs font-mono text-stone-800 flex items-center gap-2">
          <IconCheck className="w-4 h-4 text-[#1e382b] shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Active Crop Overview Card */}
      <div className={`rounded-sm border ${activeStatusOpt.cardBorder} p-5 bg-[#f6f4ee] space-y-5`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <span>{language === 'te' ? activeCrop.cropNameTe : activeCrop.cropName}</span>
              <span className="text-xs font-normal text-stone-500 font-mono">({activeCrop.variety})</span>
            </h4>
            <p className="text-xs text-stone-600 font-mono">
              {activeCrop.plotName} | {activeCrop.acreage} Acres | {activeCrop.season} Season
            </p>
          </div>

          {/* Current Health Status Badge */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className={`px-3 py-1 rounded-sm border text-xs font-mono font-bold flex items-center gap-1.5 ${activeStatusOpt.badgeStyle}`}>
              <span>{language === 'te' ? activeCrop.healthStatusLabelTe : activeCrop.healthStatusLabel}</span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono">
              Last Audited: {activeCrop.lastUpdated}
            </span>
          </div>
        </div>

        {/* ONE-TAP HEALTH STATUS SELECTOR BAR */}
        <div className="p-3.5 bg-[#fdfcf9] rounded-sm border border-[#ded9ce] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <IconShield className="w-3.5 h-3.5 text-[#1e382b]" />
              <span>{language === 'te' ? 'పంట ఆరోగ్యాన్ని నమోదు చేయండి:' : 'Update Field Health Observation:'}</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">Select status to log field observation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {HEALTH_STATUS_OPTIONS.map((opt) => {
              const isCurrent = activeCrop.statusCode === opt.code;
              return (
                <button
                  key={opt.code}
                  onClick={() => handleUpdateHealth(opt)}
                  className={`p-2 rounded-sm border text-center transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer font-mono ${
                    isCurrent
                      ? 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                  title={opt.label}
                >
                  <span className="text-[11px] font-bold leading-tight">
                    {opt.code}
                  </span>
                  <span className={`text-[10px] leading-tight truncate max-w-full ${isCurrent ? 'text-stone-300' : 'text-stone-600'}`}>
                    {language === 'te' ? opt.labelTe.split(' ')[0] : opt.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* VISUAL CROP GROWTH PROGRESSION TIMELINE */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                GROWTH STAGE MILESTONES (0 to 100%)
              </span>
              <strong className="text-sm font-serif font-bold text-stone-900 flex items-center gap-1.5">
                <span>Current Stage:</span>
                <span className="text-[#1e382b]">
                  [{currentStageMeta.stageCode}] {language === 'te' ? currentStageMeta.nameTe : currentStageMeta.name}
                </span>
                <span className="text-xs text-stone-500 font-mono">({currentStageMeta.stageDaysRange})</span>
              </strong>
            </div>

            <div className="text-right font-mono">
              <span className="font-bold text-[#1e382b] text-base">
                {currentStageMeta.progressPercent}%
              </span>
              <span className="text-[10px] text-stone-500 block">Growth Complete</span>
            </div>
          </div>

          {/* Progress Bar with Milestones */}
          <div className="relative pt-2 pb-2">
            <div className="w-full bg-stone-200 h-2 rounded-sm overflow-hidden border border-stone-300">
              <div
                className="bg-[#1e382b] h-full transition-all duration-300"
                style={{ width: `${currentStageMeta.progressPercent}%` }}
              />
            </div>

            {/* Interactive Step Milestone Nodes */}
            <div className="grid grid-cols-5 gap-1 pt-3 font-mono">
              {GROWTH_STAGES.map((stg, sIdx) => {
                const isPassed = sIdx <= currentStageIndex;
                const isCurrent = sIdx === currentStageIndex;
                return (
                  <button
                    key={stg.id}
                    onClick={() => handleSelectStage(stg.id)}
                    className={`text-center space-y-1 p-2 rounded-sm transition-colors cursor-pointer border ${
                      isCurrent
                        ? 'bg-[#1e382b] text-[#fbfaf6] border-[#1e382b]'
                        : isPassed
                        ? 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
                        : 'bg-transparent text-stone-400 border-transparent hover:border-stone-200'
                    }`}
                  >
                    <div className="text-xs font-bold leading-none">{stg.stageCode}</div>
                    <div className="text-[10px] font-sans truncate leading-tight">
                      {language === 'te' ? stg.nameTe : stg.name}
                    </div>
                    <span className="text-[9px] text-stone-500 block">
                      {stg.stageDaysRange.split(' ')[1]}d
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Stage Agronomic Instructions & Organic Fertilizer Dosage: 2-Column Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-[#ded9ce] text-xs">
          <div className="p-3.5 bg-[#fdfcf9] rounded-sm border border-[#ded9ce] space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-900 font-serif font-bold">
              <IconSprout className="w-4 h-4 text-[#1e382b]" />
              <span>Current Stage Agronomy Focus:</span>
            </div>
            <p className="text-stone-700 leading-relaxed font-sans">
              {currentStageMeta.agriFocus}
            </p>
            <div className="text-[11px] font-mono text-stone-800 bg-stone-100 p-2 rounded-sm border border-stone-200">
              <strong>Nutrient Action:</strong> {currentStageMeta.fertilizerAction}
            </div>
          </div>

          <div className="p-3.5 bg-[#fdfcf9] rounded-sm border border-[#ded9ce] space-y-1.5">
            <div className="flex items-center justify-between text-stone-900 font-serif font-bold">
              <div className="flex items-center gap-1.5">
                <IconShield className="w-4 h-4 text-[#1e382b]" />
                <span>Corrective Action ({activeCrop.statusCode}):</span>
              </div>
              <span className="text-[10px] font-mono text-stone-500">Bio-Organic Model</span>
            </div>
            <p className="text-stone-700 leading-relaxed font-sans">
              {language === 'te' ? activeCrop.actionAdviceTe : activeCrop.actionAdvice}
            </p>
            <div className="text-[11px] font-mono text-stone-600 flex items-center justify-between pt-1">
              <span>Batch: <strong>{activeCrop.linkedBatchName}</strong></span>
            </div>
          </div>
        </div>

        {/* Field Notes Section */}
        <div className="pt-2 border-t border-[#ded9ce] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600">
              FARMER FIELD LOG & OBSERVATIONS:
            </span>
            <button
              onClick={() => setShowNotesInput(!showNotesInput)}
              className="text-xs text-[#1e382b] font-mono hover:underline flex items-center gap-1 cursor-pointer"
            >
              <IconFileText className="w-3.5 h-3.5" />
              <span>{showNotesInput ? 'Cancel' : '+ Add Field Note'}</span>
            </button>
          </div>

          {activeCrop.fieldNotes && !showNotesInput && (
            <div className="p-3 bg-[#fdfcf9] rounded-sm border border-[#ded9ce] text-xs text-stone-700 font-sans">
              <p className="italic">"{activeCrop.fieldNotes}"</p>
            </div>
          )}

          {showNotesInput && (
            <div className="flex gap-2 font-mono text-xs">
              <input
                type="text"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. Applied 100L Jeevamrutha, inspected root nodules..."
                className="flex-1 px-3 py-2 bg-[#fdfcf9] border border-stone-300 rounded-sm outline-none focus:border-stone-500"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-[#1e382b] hover:bg-[#2d523f] text-[#fbfaf6] rounded-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
