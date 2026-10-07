export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'te'
  | 'ta'
  | 'kn'
  | 'mr'
  | 'bn'
  | 'gu'
  | 'pa'
  | 'ml'
  | 'or'
  | 'as'
  | 'ur';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface WasteCollectionRequest {
  id: string;
  generatorType: 'Household' | 'Mandi / Market' | 'Hotel / Canteen' | 'Farm Residue';
  wasteType: string;
  estimatedWeightKg: number;
  village: string;
  contactName: string;
  phone: string;
  pickupDate: string;
  status: 'Pending Pickup' | 'Collected' | 'In Processing' | 'Completed';
  notes?: string;
  createdAt: string;
}

export interface ProcessingBatch {
  id: string;
  batchNo: string;
  unitName: string;
  operatorName: string;
  village: string;
  processType: 'Vermi-composting' | 'Aerobic Windrow' | 'Bio-Enzyme Fermentation' | 'Jeevamrutha Liquid';
  inputWasteKg: number;
  inputRawMaterials: string[];
  startDate: string;
  estimatedReadyDate: string;
  currentStage: string;
  stageProgressPercent: number;
  outputProduct: string;
  expectedYieldKg: number;
  status: 'Fermenting' | 'Curing' | 'Tested & Certified' | 'Packaged & Ready';
  npkReport?: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    organicCarbonPercent: number;
    ph: number;
    cToNRatio: string;
  };
  qrCodeData: string;
}

export interface OrganicProduct {
  id: string;
  name: string;
  category: 'Solid Fertilizer' | 'Liquid Bio-Stimulant' | 'Plant Kit' | 'Natural Pest Solution';
  pricePerUnit: number;
  unit: string;
  sellerName: string;
  sellerRole: 'Individual Farmer' | 'Women SHG' | 'Village FPO';
  village: string;
  rating: number;
  reviewsCount: number;
  availableStock: number;
  batchNo: string;
  description: string;
  organicCertified: boolean;
  qrTraceabilityCode: string;
  ingredients: string;
  applicationGuideline: string;
  image: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Tractor' | 'Power Tiller' | 'Bio-waste Shredder' | 'Rotary Drum Composter' | 'Solar Dehydrator' | 'Power Sprayer';
  type: 'Rent' | 'Buy' | 'Both';
  rentPricePerDay?: number;
  salePrice?: number;
  conditionRating: number; // 1-5
  hoursUsed: number;
  inspectionPassed: boolean;
  sellerOrOwner: string;
  location: string;
  contactPhone: string;
  subsidyEligible: boolean;
  subsidySchemeName: string;
  subsidyPercentage: number;
  description: string;
  features: string[];
  image: string;
}

export interface SupportTicket {
  id: string;
  callerName: string;
  phone: string;
  language: string;
  category: 'Crop Advice' | 'Waste Collection' | 'Equipment Breakdown' | 'Mandi Prices' | 'Government Subsidy' | 'Pest Emergency';
  query: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  resolutionNotes?: string;
  createdAt: string;
  priority: 'Normal' | 'High' | 'Critical';
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  subsidyRange: string;
  targetBeneficiary: string;
  description: string;
  keyBenefits: string[];
  eligibility: string[];
  applicationPortal: string;
}

export interface CropSeasonPlan {
  seasonName: 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)';
  cropName: string;
  cropCategory: 'Heavy Feeder' | 'Nitrogen Fixer (Legume)' | 'Deep Root Restorer' | 'Light Feeder';
  durationDays: number;
  fertilizerBatchUsed: string;
  recommendedDosage: string;
  applicationSchedule: string[];
  expectedYieldPerAcre: string;
  soilBenefits: string[];
}

export interface CropRotationPattern {
  id: string;
  title: string;
  suitability: string;
  targetSoilType: string;
  linkedBatchType: ProcessingBatch['processType'] | 'All';
  seasons: CropSeasonPlan[];
  totalNitrogenFixedKgPerAcre: number;
  chemicalSavingsPercent: number;
  pathogenBreakScore: string;
  humusRestorationRate: string;
  description: string;
}
