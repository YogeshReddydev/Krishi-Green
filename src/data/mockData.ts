import {
  WasteCollectionRequest,
  ProcessingBatch,
  OrganicProduct,
  EquipmentItem,
  SupportTicket,
  GovernmentScheme,
} from '../types';

export const INITIAL_WASTE_REQUESTS: WasteCollectionRequest[] = [];

export const INITIAL_BATCHES: ProcessingBatch[] = [];

export const INITIAL_PRODUCTS: OrganicProduct[] = [
  {
    id: 'AGA-PROD-01',
    name: 'AGA Organic Fertilizer (Proposed Bio-Organic Formulation)',
    category: 'Solid Fertilizer',
    pricePerUnit: 350,
    unit: '50 kg bag (Pilot Reference)',
    sellerName: 'KrishiGreen Research & Pilot Demonstration Unit',
    sellerRole: 'Village FPO',
    village: 'Pilot Aggregation Hub (Andhra Pradesh)',
    rating: 5.0,
    reviewsCount: 0,
    availableStock: 100,
    batchNo: 'AGA-DEMO-2026-01',
    description: 'AGA is Krishi Green’s proposed organic bio-fertilizer manufactured from segregated biodegradable food waste, Desi cow dung, and Jeevamrutham. Formulated to restore living soil organic carbon and reduce chemical fertilizer dependence. Currently in prototype formulation and testing.',
    organicCertified: false,
    isFlagship: true,
    qrTraceabilityCode: 'AGA-DEMO-2026-01-SPEC',
    ingredients: 'Segregated vegetable and canteen food waste, Desi cow dung, natural Jeevamrutham bio-culture, decomposed plant biomass.',
    applicationGuideline: 'Recommended trial dose: 200-250 kg per acre during field preparation or basal application.',
    image: '/assets/aistudio/image_d4f93b65.png',
  },
];

import { AP_MACHINERY_CATALOG } from './apMachineryCatalog';

export const INITIAL_EQUIPMENT: EquipmentItem[] = AP_MACHINERY_CATALOG;


export const INITIAL_TICKETS: SupportTicket[] = [];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'SCHEME-01',
    name: 'PM-PRANAM Scheme',
    shortCode: 'PM-PRANAM',
    tagline: 'PM Programme for Restoration, Awareness, Nourishment and Melioration of Mother Earth',
    subsidyRange: 'Direct grant & incentive sharing with states & Gram Panchayats',
    targetBeneficiary: 'Farmers reducing chemical fertilizers, Gram Panchayats promoting bio-fertilizers',
    description: 'Incentivizes states and village panchayats to reduce subsidy consumption on chemical fertilizers (Urea, DAP) and reallocates 50% of the saved central subsidy directly into bio-fertilizer infrastructure and farmer incentives.',
    keyBenefits: [
      'Incentives for Gram Panchayats achieving >25% reduction in chemical fertilizer use',
      'Assistance for setting up village organic waste composting centers',
      'Free soil health cards & biological organic carbon monitoring',
      'Direct purchase guarantees for farmer-produced organic manure',
    ],
    eligibility: [
      'Registered farmers adopting organic/bio-inputs',
      'FPOs with minimum 50 active smallholder farmers',
      'Gram Panchayats with organic bio-waste segregation plans',
    ],
    applicationPortal: 'https://agricoop.nic.in/pm-pranam',
  },
  {
    id: 'SCHEME-02',
    name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    shortCode: 'PKVY',
    tagline: 'Traditional Agriculture Development through Organic Clusters',
    subsidyRange: '₹50,000 per hectare over 3 years (₹31,000 direct transfer for inputs)',
    targetBeneficiary: 'Individual smallholders & cluster farmer groups (20 ha clusters)',
    description: 'Subsidizes organic farming through cluster approach and Participatory Guarantee System (PGS) certification, supporting biological manure production and packaging.',
    keyBenefits: [
      '₹31,000/ha provided directly for organic seeds, bio-fertilizers, and vermicompost',
      'Free PGS-India organic certification without expensive third-party audit fees',
      'Support for branding, packaging, and marketing organic produce at KrishiGreen hubs',
    ],
    eligibility: [
      'Farmers with minimum 0.5 acres agricultural land',
      'Willingness to form or join a 20-50 farmer organic cluster',
      'Agreement to eliminate synthetic pesticides and chemicals over 3 years',
    ],
    applicationPortal: 'https://pgsindia-ncof.gov.in',
  },
  {
    id: 'SCHEME-03',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortCode: 'SMAM',
    tagline: 'Farm Machinery & Custom Hiring Centers Subsidy',
    subsidyRange: '40% to 50% subsidy on farm equipment; up to 80% for Custom Hiring Centers (CHCs)',
    targetBeneficiary: 'Small and marginal farmers, women farmers, SC/ST, and Farmer Producer Organizations',
    description: 'Provides financial assistance for purchasing agricultural equipment such as tractors, tillers, bio-waste shredders, and establishing village machinery banks.',
    keyBenefits: [
      '40-50% subsidy on tractors, power tillers, and bio-waste shredders',
      'Up to ₹10-25 Lakh grant for FPOs to establish village Custom Hiring Centers (CHCs)',
      'Subsidized equipment rentals for landless and smallholder farmers',
    ],
    eligibility: [
      'Farmer with valid Aadhaar and 7/12 land record',
      'Bank account linked with Direct Benefit Transfer (DBT)',
      'Priority for women, SC, ST, and smallholders',
    ],
    applicationPortal: 'https://agrimachinery.nic.in',
  },
  {
    id: 'SCHEME-04',
    name: 'GOBARdhan Scheme',
    shortCode: 'GOBARdhan',
    tagline: 'Galvanizing Organic Bio-Agro Resources Dhan',
    subsidyRange: 'Financial assistance up to ₹50 Lakh per district / village cluster',
    targetBeneficiary: 'Gram Panchayats, SHGs, Dairy cooperatives, and rural entrepreneurs',
    description: 'Focuses on converting cattle dung, agricultural residue, and biodegradable food waste into bio-gas, CBG (Compressed Bio-Gas), and high-grade organic bio-slurry fertilizer.',
    keyBenefits: [
      'Grants for setting up community bio-waste processing and bio-slurry bottling units',
      'Clean village environment by preventing open dumping and foul odors',
      'Produces fermented organic manure (FOM) tested and sold on KrishiGreen marketplace',
    ],
    eligibility: [
      'Village Panchayats or registered SHG federations',
      'Availability of at least 500 kg daily biodegradable organic waste',
    ],
    applicationPortal: 'https://gobardhan.co.in',
  },
  {
    id: 'SCHEME-05',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortCode: 'AIF',
    tagline: 'Financing for Post-Harvest Management & Composting Units',
    subsidyRange: '3% per annum interest subvention on bank loans up to ₹2 Crore for 7 years',
    targetBeneficiary: 'Agri-entrepreneurs, FPOs, Startups, and SHGs',
    description: 'Medium to long-term debt financing facility for investment in viable post-harvest management infrastructure, sorting/grading units, and organic fertilizer production plants.',
    keyBenefits: [
      '3% interest rate concession on bank loans',
      'Credit guarantee coverage under CGTMSE for loans up to ₹2 Crore',
      'Moratorium period up to 2 years during construction',
    ],
    eligibility: [
      'FPOs, Agri-entrepreneurs, Startups, Cooperatives, and SHGs',
      'Viable project report for organic waste processing or cold chain logistics',
    ],
    applicationPortal: 'https://agriinfra.dac.gov.in',
  },
];
