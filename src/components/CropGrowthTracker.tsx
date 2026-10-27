import React, { useState, useEffect } from 'react';
import {
  Sprout,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Sparkles,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  HeartPulse,
  Leaf,
  Layers,
  ChevronRight,
  Sun,
  Flame,
  CloudRain,
  MessageSquare,
  Award,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export type CropGrowthStageId = 'germination' | 'vegetative' | 'flowering' | 'maturation' | 'harvest';
export type CropHealthEmoji = '🌟' | '✅' | '💧' | '🐛' | '🍂' | '🌦️';

export interface GrowthStageDefinition {
  id: CropGrowthStageId;
  name: string;
  nameTe: string;
  nameHi: string;
  icon: string;
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
    icon: '🌱',
    progressPercent: 15,
    stageDaysRange: 'Days 0 – 15',
    agriFocus: 'Seedbed moisture, microbial root coating & uniform sprouting',
    fertilizerAction: 'Basal application of Vermicompost (2t/acre) + Seed treatment slurry',
  },
  {
    id: 'vegetative',
    name: 'Vegetative & Tillering',
    nameTe: 'శాకీయ పెరుగుదల & పిలకలు',
    nameHi: 'वानस्पतिक वृद्धि व कल्ले',
    icon: '🌿',
    progressPercent: 40,
    stageDaysRange: 'Days 16 – 45',
    agriFocus: 'Rapid canopy development, root node colonization & weed suppression',
    fertilizerAction: 'Jeevamrutha liquid irrigation (200L/acre) + Azospirillum microbial boost',
  },
  {
    id: 'flowering',
    name: 'Flowering & Booting',
    nameTe: 'పూత & గర్భ దశ',
    nameHi: 'फूल व बालियां निकलना',
    icon: '🌸',
    progressPercent: 70,
    stageDaysRange: 'Days 46 – 75',
    agriFocus: 'Pollen viability, pest scouting & balanced phosphorus/potassium uptake',
    fertilizerAction: 'Foliar spray of Fermented Bio-Enzyme (5ml/L) or Vermiwash for fruit-set',
  },
  {
    id: 'maturation',
    name: 'Grain / Pod Filling',
    nameTe: 'గింజ పాలుపోసుకునే దశ',
    nameHi: 'दाना व फली भराव',
    icon: '🌾',
    progressPercent: 90,
    stageDaysRange: 'Days 76 – 105',
    agriFocus: 'Kernel starch density, moisture gradual draw-down & husk hardening',
    fertilizerAction: 'Light microbial foliar spray; stop heavy nitrogen to prevent lodging',
  },
  {
    id: 'harvest',
    name: 'Maturity & Harvest Ready',
    nameTe: 'కోతకు సిద్ధం',
    nameHi: 'परिपक्वता व कटाई तैयार',
    icon: '🚜',
    progressPercent: 100,
    stageDaysRange: 'Days 106 – 125',
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
  healthEmoji: CropHealthEmoji;
  healthStatusLabel: string;
  healthStatusLabelTe: string;
  lastUpdated: string;
  actionAdvice: string;
  actionAdviceTe: string;
  fieldNotes: string;
  linkedBatchName: string;
}

export const EMOJI_STATUS_OPTIONS: Array<{
  emoji: CropHealthEmoji;
  label: string;
  labelTe: string;
  badgeColor: string;
  cardBorder: string;
  defaultAdvice: string;
  defaultAdviceTe: string;
}> = [
  {
    emoji: '🌟',
    label: 'Thriving & Vigorous',
    labelTe: 'చాలా ఆరోగ్యకరం (ఉత్తమ పెరుగుదల)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cardBorder: 'border-emerald-500',
    defaultAdvice: 'Lush green canopy and deep root vigor. Continue bi-weekly Jeevamrutha schedule.',
    defaultAdviceTe: 'పచ్చని ఆకులు, బలమైన వేర్లు. ప్రతి 15 రోజులకు జీవామృతం కొనసాగించండి.',
  },
  {
    emoji: '✅',
    label: 'Healthy & On Track',
    labelTe: 'సాధారణంగా బాగుంది',
    badgeColor: 'bg-green-100 text-green-800 border-green-300',
    cardBorder: 'border-green-400',
    defaultAdvice: 'Normal developmental pace matching sowing calendar. Maintain balanced moisture.',
    defaultAdviceTe: 'విత్తిన క్యాలెండర్‌కు అనుగుణంగా సాధారణ పెరుగుదల. సరైన తేమను నిర్వహించండి.',
  },
  {
    emoji: '💧',
    label: 'Moisture Stress',
    labelTe: 'తేమ కొరత (నీటి ఒత్తిడి)',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    cardBorder: 'border-sky-400',
    defaultAdvice: 'Soil drying out; leaf rolling observed at midday. Provide light irrigation and crop residue mulch.',
    defaultAdviceTe: 'మధ్యాహ్న సమయాల్లో ఆకులు ముడుచుకుంటున్నాయి. తేలికపాటి తడి అందించి, గడ్డితో మల్చింగ్ చేయండి.',
  },
  {
    emoji: '🐛',
    label: 'Pest / Bug Alert',
    labelTe: 'పురుగు / తెగులు దాడి',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    cardBorder: 'border-rose-400',
    defaultAdvice: 'Scouted leaf nibbling or sucking pests. Spray 5% Neem Seed Kernel Extract (NSKE) or Agniastra immediately.',
    defaultAdviceTe: 'ఆకులను తింటున్న పురుగులు లేదా రసం పీల్చే పురుగులు గమనించబడ్డాయి. వెంటనే 5% వేప గింజల కషాయం లేదా అగ్నిఅస్త్రం పిచికారీ చేయండి.',
  },
  {
    emoji: '🍂',
    label: 'Nutrient Deficiency',
    labelTe: 'పోషకాల లోపం (పసుపు రంగు ఆకులు)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    cardBorder: 'border-amber-400',
    defaultAdvice: 'Lower leaf chlorosis or pale tips. Apply foliar Vermiwash (50ml/L) or fermented bio-enzyme booster.',
    defaultAdviceTe: 'క్రింది ఆకులు పసుపుబారాయి. వర్మివాష్ (లీటరుకు 50మి.లీ) లేదా బయో-ఎంజైమ్ ద్రావణాన్ని పిచికారీ చేయండి.',
  },
  {
    emoji: '🌦️',
    label: 'Weather Stress',
    labelTe: 'వాతావరణ ప్రభావం (గాలి / వర్షం)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    cardBorder: 'border-purple-400',
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
    healthEmoji: '🌟',
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
    healthEmoji: '✅',
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
    healthEmoji: '💧',
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

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishi_crop_progression_tracker', JSON.stringify(crops));
    }
  }, [crops]);

  const activeCrop = crops.find((c) => c.id === selectedCropId) || crops[0];

  // Handler to update health emoji status
  const handleUpdateHealth = async (emojiOpt: typeof EMOJI_STATUS_OPTIONS[number]) => {
    const timestampStr = 'Just now • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const advice = language === 'te' ? emojiOpt.defaultAdviceTe : emojiOpt.defaultAdvice;

    const updatedCrops = crops.map((c) => {
      if (c.id === activeCrop.id) {
        return {
          ...c,
          healthEmoji: emojiOpt.emoji,
          healthStatusLabel: emojiOpt.label,
          healthStatusLabelTe: emojiOpt.labelTe,
          actionAdvice: emojiOpt.defaultAdvice,
          actionAdviceTe: emojiOpt.defaultAdviceTe,
          lastUpdated: timestampStr,
        };
      }
      return c;
    });

    setCrops(updatedCrops);
    setSaveToast(`Health status updated to ${emojiOpt.emoji} ${language === 'te' ? emojiOpt.labelTe : emojiOpt.label}!`);
    setTimeout(() => setSaveToast(null), 3000);

    // Persist health log to Firestore
    try {
      await addDoc(collection(db, 'crop_health_logs'), {
        cropId: activeCrop.id,
        cropName: activeCrop.cropName,
        plotName: activeCrop.plotName,
        healthEmoji: emojiOpt.emoji,
        healthStatus: emojiOpt.label,
        currentStage: activeCrop.currentStage,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      // gracefully handled locally
    }
  };

  // Handler to advance or change growth stage
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
    setSaveToast(`Advanced to ${stageDef?.name || stageId} stage!`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Save custom field notes
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
    setSaveToast('Field note saved successfully!');
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Current stage meta
  const currentStageIndex = GROWTH_STAGES.findIndex((s) => s.id === activeCrop.currentStage);
  const currentStageMeta = GROWTH_STAGES[currentStageIndex] || GROWTH_STAGES[0];
  const activeEmojiOpt =
    EMOJI_STATUS_OPTIONS.find((e) => e.emoji === activeCrop.healthEmoji) || EMOJI_STATUS_OPTIONS[0];

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-200/90 p-5 sm:p-6 shadow-sm space-y-6 animate-fadeIn">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold tracking-wide">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
            <span>
              {language === 'te' ? 'లైవ్ పంట ఎదుగుదల & ఆరోగ్య పర్యవేక్షణ' : 'Live Crop Growth & Health Progression Tracker'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {language === 'te' ? 'పంట దశల పురోగతి & త్వరిత ఎమోజి అప్‌డేట్స్' : 'Visual Crop Growth Tracker & Emoji Health Status'}
          </h3>
          <p className="text-xs text-gray-600 max-w-2xl">
            {language === 'te'
              ? 'పొలంలో ఉన్నప్పుడు ఒకే ట్యాప్‌తో పంట ఆరోగ్య స్థితిని అప్‌డేట్ చేయండి. మొలక దశ నుండి కోత దశ వరకు ఆర్గానిక్ ఎరువుల వాడకాన్ని సమన్వయం చేయండి.'
              : 'Track germination, tillering, flowering and harvest milestones. Tap quick status emojis to log field health and receive organic bio-fertilizer corrective advisories.'}
          </p>
        </div>

        {/* Multi-Crop Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 rounded-2xl border border-gray-200">
          {crops.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCropId(c.id);
                setShowNotesInput(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                c.id === activeCrop.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-gray-700 hover:text-emerald-900 hover:bg-white'
              }`}
            >
              <span>{c.healthEmoji}</span>
              <span className="truncate max-w-[100px] sm:max-w-[130px]">
                {language === 'te' ? c.cropNameTe : c.cropName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Toast */}
      {saveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-fadeIn shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Active Crop Overview Card */}
      <div className={`rounded-2xl border-2 ${activeEmojiOpt.cardBorder} p-5 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 space-y-5 transition-all duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCrop.healthEmoji}</span>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
                  <span>{language === 'te' ? activeCrop.cropNameTe : activeCrop.cropName}</span>
                  <span className="text-xs font-normal text-gray-500 font-mono">({activeCrop.variety})</span>
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {activeCrop.plotName} • {activeCrop.acreage} Acres • {activeCrop.season} Season
                </p>
              </div>
            </div>
          </div>

          {/* Current Health Status Pill */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className={`px-3.5 py-1.5 rounded-full border text-xs font-black flex items-center gap-2 shadow-2xs ${activeEmojiOpt.badgeColor}`}>
              <span className="text-base">{activeCrop.healthEmoji}</span>
              <span>{language === 'te' ? activeCrop.healthStatusLabelTe : activeCrop.healthStatusLabel}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">
              Last Audited: {activeCrop.lastUpdated}
            </span>
          </div>
        </div>

        {/* ONE-TAP HEALTH EMOJI SELECTOR BAR */}
        <div className="p-4 bg-white/90 backdrop-blur-xs rounded-2xl border border-gray-200/90 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'te' ? 'త్వరిత ఎమోజి ద్వారా పంట ఆరోగ్యాన్ని అప్‌డేట్ చేయండి:' : 'Quick Tap: Update Crop Health Status Emojis'}</span>
            </span>
            <span className="text-[10px] text-gray-400 hidden sm:inline">Tap any emoji to log instant field observation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {EMOJI_STATUS_OPTIONS.map((opt) => {
              const isCurrent = activeCrop.healthEmoji === opt.emoji;
              return (
                <button
                  key={opt.emoji}
                  onClick={() => handleUpdateHealth(opt)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-gray-50/70 border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-300'
                  }`}
                  title={opt.label}
                >
                  <span className="text-2xl leading-none animate-bounce-short">{opt.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-800 leading-tight">
                    {language === 'te' ? opt.labelTe.split(' ')[0] : opt.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] text-emerald-700 font-extrabold font-mono">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* VISUAL CROP GROWTH PROGRESSION TIMELINE */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 font-mono block">
                GROWTH STAGE MILESTONES (0 – 100%)
              </span>
              <strong className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <span>Current Stage:</span>
                <span className="text-emerald-800">
                  {currentStageMeta.icon} {language === 'te' ? currentStageMeta.nameTe : currentStageMeta.name}
                </span>
                <span className="text-xs text-gray-400 font-mono">({currentStageMeta.stageDaysRange})</span>
              </strong>
            </div>

            <div className="text-right">
              <span className="font-mono font-black text-emerald-950 text-base">
                {currentStageMeta.progressPercent}%
              </span>
              <span className="text-[10px] text-gray-400 block">Growth Complete</span>
            </div>
          </div>

          {/* Progress Bar with Milestones */}
          <div className="relative pt-2 pb-4">
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${currentStageMeta.progressPercent}%` }}
              />
            </div>

            {/* Interactive Step Milestone Nodes */}
            <div className="grid grid-cols-5 gap-1 pt-3">
              {GROWTH_STAGES.map((stg, sIdx) => {
                const isPassed = sIdx <= currentStageIndex;
                const isCurrent = sIdx === currentStageIndex;
                return (
                  <button
                    key={stg.id}
                    onClick={() => handleSelectStage(stg.id)}
                    className={`text-center space-y-1 p-2 rounded-xl transition cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-100/70 border border-emerald-400 shadow-2xs'
                        : isPassed
                        ? 'hover:bg-gray-100 text-gray-700'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl leading-none">{stg.icon}</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                      {language === 'te' ? stg.nameTe : stg.name}
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono block">
                      {stg.stageDaysRange.split(' ')[1]}d
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Stage Agronomic Instructions & Organic Fertilizer Dosage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-emerald-100 text-xs">
          {/* Box 1: Stage Guidance */}
          <div className="p-3.5 bg-white/95 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-950 font-bold">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>Current Stage Agronomy Focus:</span>
            </div>
            <p className="text-gray-700 leading-relaxed font-medium">
              {currentStageMeta.agriFocus}
            </p>
            <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
              <strong>Nutrient Action:</strong> {currentStageMeta.fertilizerAction}
            </div>
          </div>

          {/* Box 2: Health Status Action Advisory */}
          <div className="p-3.5 bg-white/95 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-gray-900 font-bold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Health Corrective Action ({activeCrop.healthEmoji}):</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">Bio-Organic Model</span>
            </div>
            <p className="text-gray-700 leading-relaxed font-medium">
              {language === 'te' ? activeCrop.actionAdviceTe : activeCrop.actionAdvice}
            </p>
            <div className="text-[11px] text-gray-500 flex items-center justify-between pt-1">
              <span>Synced Fertilizer: <strong>{activeCrop.linkedBatchName}</strong></span>
            </div>
          </div>
        </div>

        {/* Field Notes Section */}
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
              FARMER FIELD LOG & OBSERVATIONS:
            </span>
            <button
              onClick={() => setShowNotesInput(!showNotesInput)}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showNotesInput ? 'Cancel' : '+ Add Field Note'}</span>
            </button>
          </div>

          {activeCrop.fieldNotes && !showNotesInput && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 font-bold font-mono">📝</span>
              <p className="italic">"{activeCrop.fieldNotes}"</p>
            </div>
          )}

          {showNotesInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. Applied 100L Jeevamrutha, saw earthworm castings near roots, trimmed dead foliage..."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
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
