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

// ============================================================================
// ANDHRA PRADESH GEOGRAPHIC PILOT & VERIFIED PROVIDER DISCOVERY
// ============================================================================
export type APDistrict =
  | 'Palnadu'
  | 'Prakasam'
  | 'Kurnool'
  | 'East Godavari'
  | 'West Godavari'
  | 'Vizianagaram';

export type VerifiedProviderCategory =
  | 'Custom Hiring Centre (CHC)'
  | 'Tractor & Machinery Dealership'
  | 'Straw & Paddy Baler Provider'
  | 'Shredder & Mulcher Service'
  | 'Biomass / Briquette Facility'
  | 'Organic Compost / Vermicompost Plant'
  | 'Farmer Producer Organization (FPO)';

export interface VerifiedProvider {
  id: string;
  businessName: string;
  district: APDistrict;
  headquartersOrMandal: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: VerifiedProviderCategory;
  publicPhone: string;
  website?: string;
  verificationStatus: 'Verified by Dept / Ground Audit' | 'User Submitted (Pending Review)';
  sourceName: string;
  sourceUrl?: string;
  lastCheckedTimestamp: string;
  supportedEquipment: string[];
  pricingNotes: string;
  enquiryEnabled: boolean;
  reportedCount?: number;
}

export interface ProviderEnquiry {
  id: string;
  providerId: string;
  providerName: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  district: APDistrict;
  requiredEquipmentOrService: string;
  preferredDates: string;
  rentalOrPurchase: 'Rental Booking' | 'Purchase Enquiry' | 'Custom Harvesting Service';
  status: 'Submitted' | 'In Review' | 'Quoted' | 'Declined';
  createdAt: string;
}

// ============================================================================
// COMPLETE 16-STAGE WASTE-TO-WEALTH PIPELINE
// ============================================================================
export type WasteLifecycleStage =
  | 'Farmer/Aggregator Registration'
  | 'Waste Declaration'
  | 'Collection Request'
  | 'Collection Scheduling'
  | 'Weighing & Evidence Capture'
  | 'Collection Confirmation'
  | 'Transport Tracking'
  | 'Receiving Facility Confirmation'
  | 'Quality Assessment'
  | 'Processing Batch'
  | 'Output Measurement'
  | 'Product Quality & Compliance'
  | 'Buyer Enquiry / Order'
  | 'Delivery Confirmation'
  | 'Payment Reconciliation'
  | 'Environmental Impact Accounting';

export interface WeighbridgeSlip {
  tareWeightKg: number;
  grossWeightKg: number;
  netWeightKg: number;
  slipNumber: string;
  weighbridgeLocation: string;
  photoUrl?: string;
}

export interface TransportTracking {
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  dispatchTime: string;
  etaMinutes: number;
}

export interface QualityAssessment {
  moisturePercent: number;
  foreignMatterPercent: number;
  ph: number;
  accepted: boolean;
  inspectorNotes: string;
}

export interface LabComplianceReport {
  fcoStandardMet: boolean;
  nitrogenPercent: number;
  phosphorusPercent: number;
  potassiumPercent: number;
  organicCarbonPercent: number;
  heavyMetalsPass: boolean;
  labCertificateNo: string;
}

export interface FinancialSettlement {
  grossValueINR: number;
  farmerPayoutINR: number;
  aggregatorFeeINR: number;
  platformFeeINR: number;
  payoutStatus: 'Pending' | 'Processed' | 'Settled';
  bankRefNo?: string;
}

export interface CarbonAccountingRecord {
  methaneAvoidedKg: number;
  tCO2eAvoided: number;
  verifiedDate: string;
}

export interface WasteLifecycleRecord {
  id: string;
  batchOrDeclarationId: string;
  currentStage: WasteLifecycleStage;
  stageNumber: number; // 1 to 16
  district: APDistrict | string;
  village: string;
  farmerOrAggregatorName: string;
  wasteType: string;
  declaredWeightKg: number;
  weighbridgeSlip?: WeighbridgeSlip;
  transport?: TransportTracking;
  qualityAssessment?: QualityAssessment;
  labCompliance?: LabComplianceReport;
  financialSettlement?: FinancialSettlement;
  carbonAccounting?: CarbonAccountingRecord;
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// CARBON CREDIT & CLIMATE ENGINE (INDIAN CARBON MARKET / BEE / VOLUNTARY)
// ============================================================================
export type CarbonMethodologyCode = 'ICM-AGRI-01' | 'ICM-AGRI-02' | 'ICM-AGRI-03';

export interface CarbonMethodology {
  code: CarbonMethodologyCode;
  standard: 'Indian Carbon Market (BEE / CCTS)' | 'Gold Standard' | 'Verra VM0042';
  title: string;
  description: string;
  baselineEmissionFactorTCO2e: number; // e.g. 0.85 tCO2e/tonne
  eligiblePractices: string[];
}

export type CarbonLifecycleStage =
  | 'Draft'
  | 'Eligibility Assessment'
  | 'Monitoring & Evidence'
  | 'Independent Verification'
  | 'Issuance'
  | 'Listed for Offtake'
  | 'Retired';

export interface CarbonProject {
  id: string;
  projectTitle: string;
  district: APDistrict;
  mandal: string;
  farmerGroupId: string;
  farmerGroupName: string;
  participatingFarmersCount: number;
  totalAcreageHa: number;
  methodologyCode: CarbonMethodologyCode;
  baselineEmissionsTCO2e: number;
  grossAvoidedTCO2e: number;
  bufferPoolDeductionTCO2e: number; // 10%
  leakageDeductionTCO2e: number; // 5%
  netIssuedCreditsTCO2e: number; // 85% of gross
  creditPriceINR: number; // e.g. ₹1,250 / tCO2e
  totalCreditValueINR: number;
  farmerPoolPayoutINR: number; // 70% direct to farmers
  aggregatorShareINR: number; // 20%
  registryVerificationFeeINR: number; // 10%
  lifecycleStage: CarbonLifecycleStage;
  registrySerialNo: string;
  monitoringEvidenceCount: number;
  verificationAgency: string;
  issuanceDate?: string;
  createdAt: string;
}
