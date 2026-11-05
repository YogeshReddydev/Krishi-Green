/**
 * mockData.ts — Krishi Green Platform
 *
 * POLICY: No fabricated operational records.
 * Real data arrives from Firestore only.
 * The ONLY illustrative records permitted here are:
 * 1. Explicitly labelled demo equipment hub locations.
 * 2. GOVERNMENT_SCHEMES — static reference data from public government
 *    sources, used in the SchemeNavigator. These are educational, not operational.
 *
 * All INITIAL_WASTE_REQUESTS, INITIAL_BATCHES, INITIAL_PRODUCTS are
 * intentionally empty — the UI shows a clear empty state instead.
 */

import {
  WasteCollectionRequest,
  ProcessingBatch,
  OrganicProduct,
  EquipmentItem,
  SupportTicket,
  GovernmentScheme,
} from '../types';

// ─── OPERATIONAL COLLECTIONS (REAL DATA FROM FIRESTORE ONLY) ────────────────

export const INITIAL_WASTE_REQUESTS: WasteCollectionRequest[] = [];

export const INITIAL_BATCHES: ProcessingBatch[] = [];

export const INITIAL_PRODUCTS: OrganicProduct[] = [];

export const INITIAL_TICKETS: SupportTicket[] = [];

// ─── DEMO EQUIPMENT HUB RECORDS ──────────────────────────────────────────────
// These are clearly labelled demonstration locations for prototype purposes.
// They are NOT verified operating facilities.
// DO NOT present them as real bookable services.

export const DEMO_EQUIPMENT_HUBS: EquipmentItem[] = [
  {
    id: 'DEMO-HUB-001',
    name: 'Tractor (45 HP) — Demo Record',
    nameTelugu: 'ట్రాక్టర్ (45 HP) — డెమో రికార్డ్',
    category: 'Tractor',
    sizeScale: 'medium',
    type: 'Rent',
    rentPricePerHour: 450,
    rentPricePerDay: 3200,
    rentPricePerAcre: 900,
    conditionRating: 4,
    hoursUsed: 820,
    inspectionPassed: true,
    sellerOrOwner: 'DEMO — Custom Hiring Centre',
    location: 'Guntur, Andhra Pradesh',
    centerId: 'DEMO-CHC-GNT-001',
    centerName: 'DEMO — Guntur CHC (NOT A REAL FACILITY)',
    mandal: 'Guntur Urban',
    contactPhone: 'NOT A REAL NUMBER — DEMO ONLY',
    subsidyEligible: true,
    subsidySchemeName: 'SMAM (Sub-Mission on Agricultural Mechanisation)',
    subsidyPercentage: 50,
    description:
      'DEMO LOCATION — NOT A VERIFIED OPERATING FACILITY. This record is for prototype demonstration only.',
    features: ['4WD', 'Power Steering', 'Demo Purposes Only'],
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=600&q=80',
    relevantCrops: 'Paddy, Maize, Cotton',
    operatorAvailable: true,
    unitOrQuantityAvailable: 'DEMO',
  },
  {
    id: 'DEMO-HUB-002',
    name: 'Paddy Transplanter — Demo Record',
    nameTelugu: 'వరి నాట్లు యంత్రం — డెమో రికార్డ్',
    category: 'Paddy Transplanter',
    sizeScale: 'medium',
    type: 'Rent',
    rentPricePerHour: 380,
    rentPricePerAcre: 700,
    conditionRating: 4,
    hoursUsed: 340,
    inspectionPassed: true,
    sellerOrOwner: 'DEMO — FPO Equipment Unit',
    location: 'Krishna District, Andhra Pradesh',
    centerId: 'DEMO-CHC-KRS-001',
    centerName: 'DEMO — Krishna FPO Hub (NOT A REAL FACILITY)',
    mandal: 'Machilipatnam',
    contactPhone: 'NOT A REAL NUMBER — DEMO ONLY',
    subsidyEligible: true,
    subsidySchemeName: 'RKVY Equipment Grant',
    subsidyPercentage: 40,
    description:
      'DEMO LOCATION — NOT A VERIFIED OPERATING FACILITY. This record is for prototype demonstration only.',
    features: ['6-row planting', 'Adjustable spacing', 'Demo Purposes Only'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
    relevantCrops: 'Paddy',
    operatorAvailable: true,
    unitOrQuantityAvailable: 'DEMO',
  },
];


// ─── GOVERNMENT SCHEME REFERENCE DATA ────────────────────────────────────────
// Source: Ministry of Agriculture & Farmers Welfare, Government of India.
// These are publicly known schemes; details should be verified against
// official portals before institutional use.

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pm-pranam',
    name: 'PM-PRANAM',
    shortCode: 'PM-PRANAM',
    tagline: 'Promote Alternate Nutrients for Agriculture Management',
    subsidyRange: 'Up to 50% of chemical fertilizer savings shared with states',
    targetBeneficiary: 'States and Farmers reducing chemical fertilizer use',
    description:
      'PM-PRANAM incentivises states to promote alternate and organic fertilizers to reduce chemical fertilizer dependency and soil degradation.',
    keyBenefits: [
      'State-level incentive grants based on chemical fertilizer reduction',
      'Supports organic and bio-fertilizer adoption',
      'Improves soil health long-term',
    ],
    eligibility: [
      'States demonstrating reduced fertilizer subsidy consumption',
      'Farmers adopting organic inputs',
    ],
    applicationPortal: 'https://agricoop.nic.in',
  },
  {
    id: 'smam',
    name: 'SMAM',
    shortCode: 'SMAM',
    tagline: 'Sub-Mission on Agricultural Mechanisation',
    subsidyRange: '40%–50% subsidy on farm machinery',
    targetBeneficiary: 'Small and marginal farmers, FPOs, Custom Hiring Centres',
    description:
      'SMAM provides financial assistance to promote farm mechanisation across India, focusing on Custom Hiring Centres, Hi-Tech Hubs, and individual farm machinery.',
    keyBenefits: [
      '40–50% subsidy on eligible farm equipment',
      'Supports Custom Hiring Centre (CHC) establishment',
      'Increases access to machinery for small farmers',
    ],
    eligibility: [
      'Small and marginal farmers',
      'Farmer Producer Organisations (FPOs)',
      'Registered CHC operators',
    ],
    applicationPortal: 'https://agrimachinery.nic.in',
  },
  {
    id: 'rkvy',
    name: 'RKVY',
    shortCode: 'RKVY',
    tagline: 'Rashtriya Krishi Vikas Yojana',
    subsidyRange: 'State-determined grant support',
    targetBeneficiary: 'Farmers, Agri-startups, FPOs',
    description:
      'RKVY provides flexible grant funding to states for agricultural development projects including infrastructure, technology adoption and farmer training.',
    keyBenefits: [
      'Flexible project-based grants',
      'Supports agri-infrastructure development',
      'Includes technology demonstrations and training',
    ],
    eligibility: [
      'State government-approved projects',
      'Farmer groups and FPOs',
    ],
    applicationPortal: 'https://rkvy.nic.in',
  },
  {
    id: 'pkvy',
    name: 'PKVY',
    shortCode: 'PKVY',
    tagline: 'Paramparagat Krishi Vikas Yojana',
    subsidyRange: '₹50,000 per hectare over 3 years',
    targetBeneficiary: 'Farmers adopting organic farming',
    description:
      'PKVY promotes organic farming through cluster-based certification, soil enrichment and market linkage support.',
    keyBenefits: [
      '₹50,000/ha financial assistance over 3 years',
      'Organic certification support',
      'Market linkage assistance',
    ],
    eligibility: [
      'Farmer clusters of minimum 50 acres',
      'Commitment to full organic transition',
    ],
    applicationPortal: 'https://pgsindia-ncof.gov.in',
  },
];
