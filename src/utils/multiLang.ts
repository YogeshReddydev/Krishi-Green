import { SupportedLanguage } from '../types';

export interface MultiTranslations {
  // Common UI
  menu: string;
  prototypePilot: string;
  prototypeNotice: string;
  region: string;
  voiceAssistant: string;
  tollFreeHelpline: string;
  callNow: string;
  free24x7: string;
  allCrops: string;
  exploreEcosystem: string;
  liveTelemetry: string;
  
  // Hero & Metrics
  nationalAgriInfra: string;
  heroTagline: string;
  heroOneLiner: string;
  scheduleWasteCollection: string;
  organicMarketplace: string;
  geographicReach: string;
  panIndiaNetwork: string;
  farmerRevenueShare: string;
  directDbt70: string;
  qualityStandards: string;
  fcoAndBee: string;
  helplineSupport: string;
  helpline24x7: string;

  // Flagship Product
  flagshipProduct: string;
  officialStoreVisual: string;
  verifiedInputCommerce: string;
  flagshipTitle: string;
  flagshipDesc: string;
  dissolutionTime: string;
  dissolutionTimeVal: string;
  waterRetention: string;
  waterRetentionVal: string;
  microbialDensity: string;
  microbialDensityVal: string;
  carbonMatrix: string;
  carbonMatrixVal: string;
  requestBioSupply: string;
  viewLabCertificate: string;
  directRootInsertion: string;
  dripFertigation: string;

  // Ecosystem Services
  serviceMachineryTitle: string;
  serviceMachineryDesc: string;
  serviceMachineryAction: string;

  servicePipelineTitle: string;
  servicePipelineDesc: string;
  servicePipelineAction: string;

  serviceMarketplaceTitle: string;
  serviceMarketplaceDesc: string;
  serviceMarketplaceAction: string;

  serviceCarbonTitle: string;
  serviceCarbonDesc: string;
  serviceCarbonAction: string;

  serviceRotationTitle: string;
  serviceRotationDesc: string;
  serviceRotationAction: string;

  serviceSchemesTitle: string;
  serviceSchemesDesc: string;
  serviceSchemesAction: string;

  serviceImpactTitle: string;
  serviceImpactDesc: string;
  serviceImpactAction: string;

  serviceHelplineTitle: string;
  serviceHelplineDesc: string;
  serviceHelplineAction: string;

  // Interactive Farmer Tools
  farmerQuickTools: string;
  startInSeconds: string;
  calcBookAdvice: string;
  tabEarn: string;
  tabPickup: string;
  tabWeather: string;
  selectWasteQty: string;
  compostYield: string;
  compostRevenue: string;
  carbonPayout: string;
  dapBagsSaved: string;
  totalFarmerBenefit: string;
  yourVillage: string;
  villagePlaceholder: string;
  wasteType: string;
  bookFreePickup: string;
  pickupBooked: string;
  teamContact24h: string;
  bookAnother: string;
  selectCrop: string;
  temp: string;
  rain: string;
  condition: string;
  advisoryFor: string;

  // Seasonal Advice
  seasonalAdviceTitle: string;
  seasonalAdviceHeading: string;
  seasonalAdviceDesc: string;
  selectFarmingDistrict: string;
  selectCroppingMonth: string;
  whyPlantNow: string;
  organicRegimen: string;
  expectedYield: string;
  duration: string;
  waterNeed: string;
}

const EN_TRANSLATIONS: MultiTranslations = {
  menu: 'Menu',
  prototypePilot: 'PROTOTYPE DEMONSTRATION',
  prototypeNotice: 'Interactive Prototype Pilot for Andhra Pradesh & Telangana',
  region: 'REGION:',
  voiceAssistant: 'Voice Assistant',
  tollFreeHelpline: 'Toll-Free Helpline',
  callNow: 'CALL NOW',
  free24x7: 'FREE • 24×7',
  allCrops: 'All Crops',
  exploreEcosystem: 'EXPLORE ECOSYSTEM',
  liveTelemetry: 'LIVE TELEMETRY',

  nationalAgriInfra: 'National Agri-Ecological Infrastructure',
  heroTagline: 'Food Waste → Organic Fertilizer → Farmer Prosperity',
  heroOneLiner: "Turning India's food waste into wealth for farmers while restoring living soil health.",
  scheduleWasteCollection: 'Schedule Waste Collection',
  organicMarketplace: 'Organic Marketplace',
  geographicReach: 'Geographic Reach',
  panIndiaNetwork: 'Pan-India Network',
  farmerRevenueShare: 'Farmer Revenue Share',
  directDbt70: '70% Direct DBT',
  qualityStandards: 'Quality Standards',
  fcoAndBee: 'FCO 1985 & BEE CCTS',
  helplineSupport: 'Helpline Support',
  helpline24x7: '24×7 • 13 Languages',

  flagshipProduct: 'Our Flagship Product',
  officialStoreVisual: 'Official Store Visual',
  verifiedInputCommerce: 'Verified Farmer Input Commerce',
  flagshipTitle: 'FCO 1985 Grade-A Enriched Bio-Vermicompost',
  flagshipDesc: 'Direct root-zone nourishment enriched with 18.4% living organic carbon, active mycorrhizae fungi, and beneficial rhizosphere bacteria. Zero foul odor, zero urea runoff, and 1,000x lighter farm transport.',
  dissolutionTime: 'Dissolution Time',
  dissolutionTimeVal: '48 Hours (integrates into root zone)',
  waterRetention: 'Water Retention',
  waterRetentionVal: '3.2x Weight (absorbs dew & irrigation)',
  microbialDensity: 'Living Microbes',
  microbialDensityVal: '10^8 CFU/g active soil biology',
  carbonMatrix: 'Bio-Carbon',
  carbonMatrixVal: '18.4% FCO 1985 Grade 1 Matrix',
  requestBioSupply: 'Request Bio-Input Supply',
  viewLabCertificate: 'View Lab Test Certificate',
  directRootInsertion: 'Direct Root Placement: 1 handful per crop hole for deep root inoculation.',
  dripFertigation: 'Liquid Drip Fertigation: Dissolve in 200L irrigation drum for zero-clog spraying.',

  serviceMachineryTitle: 'Custom Hiring Machinery Hub',
  serviceMachineryDesc: 'Machinery catalog with average rent per hour, SMAM 40-50% subsidy discounts, and certified operators.',
  serviceMachineryAction: 'Browse Machinery & Hourly Rent',

  servicePipelineTitle: 'Waste-to-Wealth Conversion Pipeline',
  servicePipelineDesc: 'Transparent 16-stage conversion workflow from mandi collection, weighbridge slips, to certified batches.',
  servicePipelineAction: 'View Conversion Lifecycle',

  serviceMarketplaceTitle: 'Selling Farming Products',
  serviceMarketplaceDesc: 'Direct farmer commerce for certified organic vermicompost, bio-stimulants, and microbial bio-enzymes.',
  serviceMarketplaceAction: 'Browse Verified Inputs',

  serviceCarbonTitle: 'Carbon Credit & Climate Engine',
  serviceCarbonDesc: 'Deterministic emissions avoidance under BEE with transparent 70% direct farmer revenue waterfall.',
  serviceCarbonAction: 'Calculate Carbon Payout',

  serviceRotationTitle: 'Crop Rotation & Soil Nutrition',
  serviceRotationDesc: 'Plan sustainable Kharif → Rabi → Zaid crop sequences matched to organic compost nutrients and moisture.',
  serviceRotationAction: 'Open Rotation Scheduler',

  serviceSchemesTitle: 'Government Agricultural Subsidies',
  serviceSchemesDesc: 'Eligibility guidelines and application assistance for PM-PRANAM, PKVY organic grants, and SMAM subsidies.',
  serviceSchemesAction: 'Check Subsidy Eligibility',

  serviceImpactTitle: 'Audited Impact Ledger & Analytics',
  serviceImpactDesc: 'Audited ledger of bio-waste diverted, methane avoided, and verified farmer DBT payouts strictly from database records.',
  serviceImpactAction: 'Export Audited Ledger',

  serviceHelplineTitle: '24x7 Agronomy Helpline & AI',
  serviceHelplineDesc: 'Dial 1800-KRISHI-GRN, interact with 24x7 regional voice AI Advisor, and track field resolution tickets.',
  serviceHelplineAction: 'Connect with Advisor',

  farmerQuickTools: '🌾 FARMER QUICK TOOLS',
  startInSeconds: 'Start in seconds',
  calcBookAdvice: 'Calculate • Book • Get advice',
  tabEarn: '💰 What will I earn?',
  tabPickup: '🚛 Book Pickup',
  tabWeather: '🌤 Crop Advisory',
  selectWasteQty: 'Select waste quantity (kg):',
  compostYield: 'Compost Yield',
  compostRevenue: 'Compost Revenue',
  carbonPayout: 'Carbon Payout',
  dapBagsSaved: 'DAP Bags Saved',
  totalFarmerBenefit: 'Total Farmer Benefit',
  yourVillage: 'Your Village / Mandal:',
  villagePlaceholder: 'e.g. Ramnagar, Palnadu',
  wasteType: 'Waste type:',
  bookFreePickup: 'Book Free Pickup',
  pickupBooked: 'Pickup Booked Successfully!',
  teamContact24h: 'Our team will contact you within 24 hours.',
  bookAnother: 'Book Another',
  selectCrop: 'Select your crop:',
  temp: 'Temp',
  rain: 'Rain',
  condition: 'Condition',
  advisoryFor: 'Advisory for',

  seasonalAdviceTitle: 'Real-Time Seasonal Crop Advisory • 2026',
  seasonalAdviceHeading: 'Seasonal Crop Advice: What to Plant Next',
  seasonalAdviceDesc: 'Real-time, region-specific cropping suggestions matched to the current month, residual soil moisture, and KrishiGreen bio-vermicompost schedules to guide what to plant next.',
  selectFarmingDistrict: 'Select Farming District / Agro-Zone:',
  selectCroppingMonth: 'Select Month (Cropping Window):',
  whyPlantNow: 'Why Plant Now',
  organicRegimen: 'Organic Regimen',
  expectedYield: 'Expected Yield',
  duration: 'Duration',
  waterNeed: 'Water Needs',
};

const TE_TRANSLATIONS: MultiTranslations = {
  menu: 'మెనూ',
  prototypePilot: 'ప్రొటోటైప్ డెమో',
  prototypeNotice: 'ఆంధ్రప్రదేశ్ & తెలంగాణ కోసం ఇంటరాక్టివ్ ప్రొటోటైప్ పైలట్',
  region: 'ప్రాంతం:',
  voiceAssistant: 'వాయిస్ అసిస్టెంట్',
  tollFreeHelpline: 'ఉచిత హెల్ప్‌లైన్',
  callNow: 'ఇప్పుడు కాల్',
  free24x7: 'ఉచితం • 24×7',
  allCrops: 'అన్ని పంటలు',
  exploreEcosystem: 'వ్యవసాయ వేదికను అన్వేషించండి',
  liveTelemetry: 'లైవ్ టెలిమెట్రీ',

  nationalAgriInfra: 'జాతీయ వ్యవసాయ పర్యావరణ వేదిక',
  heroTagline: 'ఆహార వ్యర్థాలు → సేంద్రీయ ఎరువు → రైతు సమృద్ధి',
  heroOneLiner: 'భారతదేశ ఆహార వ్యర్థాలను రైతుల ఆదాయంగా మరియు భూమికి సేంద్రీయ ఎరువుగా మార్చే సమగ్ర వేదిక.',
  scheduleWasteCollection: 'వ్యర్థాల సేకరణ బుక్ చేయండి',
  organicMarketplace: 'సేంద్రీయ ఎరువుల మార్కెట్',
  geographicReach: 'పరిధి',
  panIndiaNetwork: 'భారతదేశ వ్యాప్తంగా నెట్‌వర్క్',
  farmerRevenueShare: 'రైతు రాబడి వాటా',
  directDbt70: '70% ప్రత్యక్ష డీబీటీ (DBT)',
  qualityStandards: 'నాణ్యతా ప్రమాణాలు',
  fcoAndBee: 'FCO 1985 & BEE CCTS',
  helplineSupport: 'సహాయ కేంద్రం',
  helpline24x7: '24×7 • 13 భాషలు',

  flagshipProduct: 'మా ప్రముఖ ఉత్పత్తి',
  officialStoreVisual: 'అధికారిక స్టోర్ చిత్రం',
  verifiedInputCommerce: 'ధృవీకరించబడిన రైతు సేంద్రీయ ఇన్‌పుట్',
  flagshipTitle: 'ఎఫ్‌సీవో 1985 గ్రేడ్-1 సేంద్రీయ వర్మీకంపోస్ట్',
  flagshipDesc: '18.4% జీవ సేంద్రీయ కార్బన్, మైకోరైజా మరియు ఉపయోగకర సూక్ష్మజీవులతో కూడిన ప్రత్యక్ష వేరు పోషణ. దుర్వాసన లేదు, రసాయన అవశేషాలు లేవు.',
  dissolutionTime: 'కరిగే సమయం',
  dissolutionTimeVal: '48 గంటలు (వేరు మండలంలో మిళితం)',
  waterRetention: 'నీటి నిలుపుదల',
  waterRetentionVal: '3.2 రెట్లు బరువు (మంచు & నీటిని పీల్చుకుంటుంది)',
  microbialDensity: 'జీవ సూక్ష్మజీవులు',
  microbialDensityVal: '10^8 CFU/g క్రియాశీల నేల జీవరాశి',
  carbonMatrix: 'సేంద్రీయ కార్బన్',
  carbonMatrixVal: '18.4% FCO 1985 గ్రేడ్ 1 ప్రమాణం',
  requestBioSupply: 'సేంద్రీయ ఎరువుల కోసం అభ్యర్థించండి',
  viewLabCertificate: 'ల్యాబ్ పరీక్ష ధృవీకరణ పత్రం',
  directRootInsertion: 'నేరుగా వేరు వద్ద వేయడం: నాటే గుంటలో ఒక గుప్పెడు వేసి వేర్లను బలపరచండి.',
  dripFertigation: 'డ్రిప్ ఫెర్టిగేషన్: 200 లీటర్ల డ్రమ్ములో కరిగించి ఫిల్టర్ల అడ్డంకులు లేకుండా స్ప్రే చేయండి.',

  serviceMachineryTitle: 'కస్టమ్ హైరింగ్ & వ్యవసాయ యంత్రాలు',
  serviceMachineryDesc: 'ట్రాక్టర్లు, పవర్ టిల్లర్లు, డ్రోన్లు, హార్వెస్టర్ల గంటకు సగటు అద్దె మరియు రాయితీ కొనుగోలు.',
  serviceMachineryAction: 'యంత్రాల హబ్ & గంట అద్దె చూడండి',

  servicePipelineTitle: 'వ్యర్థాల నుండి సంపద పైప్‌లైన్',
  servicePipelineDesc: 'మండి ఆహార వ్యర్థాల డిక్లరేషన్, కాటా బరువు స్లిప్పులు, రవాణా ట్రాకింగ్ మరియు 16-దశల నివేదిక.',
  servicePipelineAction: 'పైప్‌లైన్ రికార్డులను చూడండి',

  serviceMarketplaceTitle: 'సేంద్రీయ ఎరువుల మార్కెట్‌ప్లేస్',
  serviceMarketplaceDesc: 'ల్యాబ్ పరీక్షించిన నాణ్యమైన వర్మీకంపోస్ట్, జీవామృతం, బయో-ఎంజైమ్‌ల నేరుగా కొనుగోలు.',
  serviceMarketplaceAction: 'సేంద్రీయ ఉత్పత్తులు చూడండి',

  serviceCarbonTitle: 'కార్బన్ క్రెడిట్ & క్లైమేట్ ఇంజిన్',
  serviceCarbonDesc: 'వ్యర్థాల దహన నివారణ ద్వారా అధికారిక BEE కార్బన్ క్రెడిట్లు మరియు 70% ప్రత్యక్ష రైతు ఖాతా జమ (DBT).',
  serviceCarbonAction: 'కార్బన్ లబ్ధి లెక్కించండి',

  serviceRotationTitle: 'శాస్త్రీయ పంట మార్పిడి ప్రణాళిక',
  serviceRotationDesc: 'సేంద్రీయ ఎరువుల ఎన్‌పికె విలువల ఆధారంగా ఖరీఫ్, రబీ మరియు జాయెద్ పంటల మార్పిడి పట్టిక.',
  serviceRotationAction: 'పంట పట్టిక తెరవండి',

  serviceSchemesTitle: 'ప్రభుత్వ సబ్సిడీలు & పథకాలు',
  serviceSchemesDesc: 'పీఎం-ప్రణామ్, పీకేవీవై సేంద్రీయ గ్రాంట్లు మరియు ఎస్ఎంఏఎం 50% యంత్రాల రాయితీ అర్హత తనిఖీ.',
  serviceSchemesAction: 'రాయితీల అర్హత చూడండి',

  serviceImpactTitle: 'ప్రత్యక్ష ప్రభావ నివేదిక & లెడ్జర్',
  serviceImpactDesc: 'ల్యాండ్‌ఫిల్ నుండి మళ్లించిన వ్యర్థాలు, తగ్గిన రసాయన ఖర్చులు మరియు ధృవీకరించిన రైతు బ్యాంక్ జమల లైవ్ లెడ్జర్.',
  serviceImpactAction: 'ఆడిట్ లెడ్జర్ డౌన్‌లోడ్',

  serviceHelplineTitle: '24×7 రైతు మద్దతు & ఏఐ సలహాదారు',
  serviceHelplineDesc: '1800-కృషి-గ్రీన్ ఉచిత టోల్‌ఫ్రీ కాల్, జెమినీ ఏఐ సలహాదారు మరియు ఫీల్డ్ టెక్నీషియన్ టిక్కెట్ల ట్రాకింగ్.',
  serviceHelplineAction: 'హెల్ప్‌లైన్‌ను సంప్రదించండి',

  farmerQuickTools: '🌾 రైతు సహాయ కేంద్రం',
  startInSeconds: 'ఇప్పుడే ప్రారంభించండి',
  calcBookAdvice: 'లెక్కించండి • బుక్ చేయండి • సలహా పొందండి',
  tabEarn: '💰 నేను ఎంత సంపాదిస్తాను?',
  tabPickup: '🚛 సేకరణ బుక్',
  tabWeather: '🌤 పంట సలహా',
  selectWasteQty: 'వ్యర్థాల పరిమాణం (కిలోలు) ఎంచుకోండి:',
  compostYield: 'సేంద్రీయ ఎరువు',
  compostRevenue: 'ఎరువు ఆదాయం',
  carbonPayout: 'కార్బన్ బహుమతి',
  dapBagsSaved: 'రసాయన ఆదా (DAP)',
  totalFarmerBenefit: 'మొత్తం రైతు లాభం',
  yourVillage: 'మీ గ్రామం / మండలం:',
  villagePlaceholder: 'ఉదా: రామనగర్, పల్నాడు',
  wasteType: 'వ్యర్థాల రకం:',
  bookFreePickup: 'వ్యర్థాల సేకరణ బుక్ చేయండి',
  pickupBooked: 'విజయవంతంగా నమోదు అయింది!',
  teamContact24h: 'మా బృందం 24 గంటల్లో మిమ్మల్ని సంప్రదిస్తుంది.',
  bookAnother: 'మరొక బుకింగ్',
  selectCrop: 'మీ పంట ఎంచుకోండి:',
  temp: 'ఉష్ణోగ్రత',
  rain: 'వర్షావకాశం',
  condition: 'స్థితి',
  advisoryFor: 'కోసం సలహా:',

  seasonalAdviceTitle: 'రియల్-టైమ్ సీజనల్ పంటల సలహాదారు • 2026',
  seasonalAdviceHeading: 'సీజనల్ పంటల సలహా: తదుపరి ఏమి నాటాలి?',
  seasonalAdviceDesc: 'ప్రస్తుత నెల వాతావరణం, నేలలోని తేమ మరియు సేంద్రీయ ఎరువుల లభ్యత ఆధారంగా రైతులకు అనువైన పంటల సిఫార్సులు.',
  selectFarmingDistrict: 'ప్రాంతం / జిల్లాను ఎంచుకోండి:',
  selectCroppingMonth: 'నెలను ఎంచుకోండి (విత్తే సమయం):',
  whyPlantNow: 'ఎందుకు నాటాలి',
  organicRegimen: 'సేంద్రీయ ఎరువుల సలహా',
  expectedYield: 'ఆశించిన దిగుబడి',
  duration: 'పంట కాలం',
  waterNeed: 'నీటి అవసరం',
};

const HI_TRANSLATIONS: MultiTranslations = {
  menu: 'मेनू',
  prototypePilot: 'प्रोटोटाइप प्रदर्शन',
  prototypeNotice: 'आंध्र प्रदेश एवं तेलंगाना के लिए इंटरएक्टिव प्रोटोटाइप पायलट मोड',
  region: 'क्षेत्र:',
  voiceAssistant: 'वॉयस सहायक',
  tollFreeHelpline: 'टोल-फ्री हेल्पलाइन',
  callNow: 'अभी कॉल करें',
  free24x7: 'निःशुल्क • 24×7',
  allCrops: 'सभी फसलें',
  exploreEcosystem: 'पारिस्थितिकी तंत्र देखें',
  liveTelemetry: 'लाइव टेलीमेट्री',

  nationalAgriInfra: 'राष्ट्रीय कृषि-पारिस्थितिक अवसंरचना',
  heroTagline: 'कचरा से जैविक खाद → किसान की समृद्धि',
  heroOneLiner: 'भारत के खाद्य कचरे को किसानों की आय और भूमि के जैविक उर्वरक में बदलना।',
  scheduleWasteCollection: 'कचरा उठाव अनुरोध करें',
  organicMarketplace: 'जैविक खाद मंडी',
  geographicReach: 'भौगोलिक विस्तार',
  panIndiaNetwork: 'अखिल भारतीय नेटवर्क',
  farmerRevenueShare: 'किसान राजस्व हिस्सा',
  directDbt70: '70% प्रत्यक्ष बैंक अंतरण (DBT)',
  qualityStandards: 'गुणवत्ता मानक',
  fcoAndBee: 'FCO 1985 एवं BEE CCTS',
  helplineSupport: 'हेल्पलाइन सहायता',
  helpline24x7: '24×7 • 13 भारतीय भाषाएं',

  flagshipProduct: 'हमारा प्रमुख उत्पाद',
  officialStoreVisual: 'आधिकारिक स्टोर दृश्य',
  verifiedInputCommerce: 'सत्यापित किसान जैविक इनपुट वाणिज्य',
  flagshipTitle: 'एफसीओ 1985 ग्रेड-ए संवर्धित बायो-वर्मीकम्पोस्ट',
  flagshipDesc: '18.4% सक्रिय जैविक कार्बन, माइकोराइजा कवक और लाभकारी बैक्टीरिया से समृद्ध जड़ पोषण। शून्य दुर्गंध, शून्य यूरिया बहाव।',
  dissolutionTime: 'घुलनशीलता समय',
  dissolutionTimeVal: '48 घंटे (जड़ क्षेत्र में समाहित)',
  waterRetention: 'जल धारण क्षमता',
  waterRetentionVal: '3.2 गुना भार (ओस व सिंचाई सोखता है)',
  microbialDensity: 'जीवित सूक्ष्मजीव',
  microbialDensityVal: '10^8 CFU/g सक्रिय मृदा जीव विज्ञान',
  carbonMatrix: 'बायो-कार्बन',
  carbonMatrixVal: '18.4% एफसीओ 1985 ग्रेड 1 मैट्रिक्स',
  requestBioSupply: 'जैविक खाद आपूर्ति अनुरोध करें',
  viewLabCertificate: 'प्रयोगशाला परीक्षण प्रमाणपत्र देखें',
  directRootInsertion: 'प्रत्यक्ष जड़ उपयोग: बुवाई के समय प्रति पौधा एक मुट्ठी डालें।',
  dripFertigation: 'ड्रिप फर्टिगेशन: 200 लीटर ड्रम में घोलकर बिना चोक हुए छिड़काव करें।',

  serviceMachineryTitle: 'कस्टम हायरिंग एवं कृषि यंत्र केंद्र',
  serviceMachineryDesc: 'ट्रैक्टर, टिलर, ड्रोन व हार्वेस्टर का प्रति घंटा औसत किराया और 40-50% सब्सिडी।',
  serviceMachineryAction: 'यंत्र सूची व किराया देखें',

  servicePipelineTitle: 'कचरा से समृद्धि पाइपलाइन',
  servicePipelineDesc: 'मंडी कचरा संग्रह, वजन पर्ची से लेकर एफसीओ प्रमाणित खाद का 16-चरणीय जीवन चक्र।',
  servicePipelineAction: 'रूपांतरण जीवन चक्र देखें',

  serviceMarketplaceTitle: 'जैविक उत्पाद एवं उपकरण बाजार',
  serviceMarketplaceDesc: 'प्रमाणित जैविक वर्मीकम्पोस्ट, जीवामृत व बायो-एंजाइम की प्रत्यक्ष किसान बिक्री।',
  serviceMarketplaceAction: 'सत्यापित इनपुट देखें',

  serviceCarbonTitle: 'कार्बन क्रेडिट व जलवायु इंजन',
  serviceCarbonDesc: 'परावली दहन रोककर बीईई के तहत कार्बन क्रेडिट और किसानों को 70% सीधा भुगतान।',
  serviceCarbonAction: 'कार्बन लाभ की गणना करें',

  serviceRotationTitle: 'वैज्ञानिक फसल चक्र व पोषण',
  serviceRotationDesc: 'खरीफ, रबी और जायद फसलों का जैविक पोषण और नमी के आधार पर वैज्ञानिक चक्र।',
  serviceRotationAction: 'फसल चक्र अनुसूची खोलें',

  serviceSchemesTitle: 'सरकारी कृषि योजनाएं व सब्सिडी',
  serviceSchemesDesc: 'पीएम-प्रणाम, पीकेवीवाई जैविक अनुदान और 50% कृषि यंत्र सब्सिडी के लिए पात्रता जांच।',
  serviceSchemesAction: 'सब्सिडी पात्रता जांचें',

  serviceImpactTitle: 'प्रभाव विश्लेषण एवं प्रत्यक्ष लेजर',
  serviceImpactDesc: 'डंपिंग से बचा कचरा, रोकी गई मीथेन और किसानों को प्रत्यक्ष डीबीटी भुगतान का लेजर।',
  serviceImpactAction: 'ऑडिट लेजर डाउनलोड करें',

  serviceHelplineTitle: '24x7 किसान हेल्पलाइन व एआई',
  serviceHelplineDesc: '1800-कृषि-ग्रीन टोल-फ्री कॉल, 24x7 क्षेत्रीय जेमिनी एआई सलाहकार और सहायता टिकट।',
  serviceHelplineAction: 'सलाहकार से जुड़ें',

  farmerQuickTools: '🌾 किसान त्वरित उपकरण',
  startInSeconds: 'कुछ ही सेकंड में शुरू करें',
  calcBookAdvice: 'गणना करें • बुक करें • सलाह लें',
  tabEarn: '💰 मेरी कितनी कमाई होगी?',
  tabPickup: '🚛 पिकअप बुक करें',
  tabWeather: '🌤 फसल सलाह',
  selectWasteQty: 'कचरे की मात्रा (किलो) चुनें:',
  compostYield: 'खाद उत्पादन',
  compostRevenue: 'खाद से राजस्व',
  carbonPayout: 'कार्बन भुगतान',
  dapBagsSaved: 'डीएपी खाद की बचत',
  totalFarmerBenefit: 'कुल किसान लाभ',
  yourVillage: 'आपका गांव / ब्लॉक:',
  villagePlaceholder: 'उदा: रामनगर, पलनाडु',
  wasteType: 'कचरे का प्रकार:',
  bookFreePickup: 'निःशुल्क पिकअप बुक करें',
  pickupBooked: 'पिकअप सफलतापूर्वक दर्ज हुआ!',
  teamContact24h: 'हमारी टीम 24 घंटे में आपसे संपर्क करेगी।',
  bookAnother: 'एक और बुकिंग करें',
  selectCrop: 'अपनी फसल चुनें:',
  temp: 'तापमान',
  rain: 'बारिश',
  condition: 'स्थिति',
  advisoryFor: 'के लिए कृषि सलाह:',

  seasonalAdviceTitle: 'रीयल-टाइम मौसमी फसल सलाहकार • 2026',
  seasonalAdviceHeading: 'मौसमी फसल सलाह: आगे क्या बोएं?',
  seasonalAdviceDesc: 'वर्तमान माह, अवशिष्ट मृदा नमी और जैविक खाद चक्र के आधार पर क्षेत्र-विशिष्ट उपयुक्त फसल सिफारिशें।',
  selectFarmingDistrict: 'कृषि जिला / क्षेत्र चुनें:',
  selectCroppingMonth: 'महीना (बुवाई खिड़की) चुनें:',
  whyPlantNow: 'अभी क्यों बोएं',
  organicRegimen: 'जैविक खाद नियम',
  expectedYield: 'अपेक्षित पैदावार',
  duration: 'फसल अवधि',
  waterNeed: 'पानी की आवश्यकता',
};

const TA_TRANSLATIONS: MultiTranslations = {
  ...EN_TRANSLATIONS,
  menu: 'மெனு',
  prototypePilot: 'மாதிரி செயல்முறை விளக்கம்',
  prototypeNotice: 'ஆந்திரா & தெலுங்கானாவிற்கான ஊடாடும் மாதிரி பதிப்பு',
  region: 'பகுதி:',
  voiceAssistant: 'குரல் உதவியாளர்',
  tollFreeHelpline: 'கட்டணமில்லா உதவி எண்',
  callNow: 'இப்போதே அழைக்கவும்',
  free24x7: 'இலவசம் • 24×7',
  allCrops: 'அனைத்து பயிர்கள்',
  exploreEcosystem: 'அமைப்பை ஆராயுங்கள்',
  liveTelemetry: 'நேரடி அளவீடுகள்',

  nationalAgriInfra: 'தேசிய வேளாண் சூழலியல் உள்கட்டமைப்பு',
  heroTagline: 'உணவுக் கழிவு → இயற்கை உரம் → விவசாயி வளம்',
  heroOneLiner: 'இந்தியாவின் உணவுக் கழிவுகளை விவசாயிகளின் வருமானமாகவும் மண்ணிற்கான இயற்கை உரமாகவும் மாற்றுதல்.',
  scheduleWasteCollection: 'கழிவு சேகரிப்பை பதிவு செய்க',
  organicMarketplace: 'இயற்கை உரம் சந்தை',
  geographicReach: 'புவியியல் எல்லை',
  panIndiaNetwork: 'அகில இந்திய நெட்வொர்க்',
  farmerRevenueShare: 'விவசாயி வருவாய் பங்கு',
  directDbt70: '70% நேரடி வங்கி வரவு (DBT)',
  qualityStandards: 'தரக் கட்டுப்பாடுகள்',
  fcoAndBee: 'FCO 1985 & BEE CCTS',
  helplineSupport: 'உதவி மையம்',
  helpline24x7: '24×7 • 13 மொழிகள்',

  flagshipProduct: 'எங்கள் முதன்மை தயாரிப்பு',
  officialStoreVisual: 'அதிகாரப்பூர்வ அங்காடி தோற்றம்',
  verifiedInputCommerce: 'சரிபார்க்கப்பட்ட விவசாய உள்ளீட்டு வர்த்தகம்',
  flagshipTitle: 'FCO 1985 கிரேடு-A செறிவூட்டப்பட்ட மண்புழு உரம்',
  flagshipDesc: '18.4% இயற்கை கார்பன் மற்றும் நன்மை பயக்கும் நுண்ணுயிரிகளுடன் கூடிய நேரடி வேர் ஊட்டச்சத்து.',
  dissolutionTime: 'கரையும் நேரம்',
  dissolutionTimeVal: '48 மணிநேரம் (வேர் மண்டலத்தில் கலக்கிறது)',
  waterRetention: 'நீர் தேக்கும் திறன்',
  waterRetentionVal: '3.2 மடங்கு எடை',
  microbialDensity: 'நுண்ணுயிரிகள்',
  microbialDensityVal: '10^8 CFU/g தீவிர மண் உயிரியல்',
  carbonMatrix: 'பயோ-கார்பன்',
  carbonMatrixVal: '18.4% FCO 1985 தரம்',
  requestBioSupply: 'இயற்கை உரம் கோரிக்கை விடுக்கவும்',
  viewLabCertificate: 'ஆய்வக சோதனை சான்றிதழ் காண்க',
  directRootInsertion: 'நேரடி வேர் பயன்பாடு: நடவின் போது குழிக்கு ஒரு கைப்பிடி இடவும்.',
  dripFertigation: 'சொட்டு நீர் உரம்: 200L தொட்டியில் கரைத்து தெளிக்கவும்.',

  serviceMachineryTitle: 'பண்ணை இயந்திரங்கள் வாடகை மையம்',
  serviceMachineryDesc: 'குறைந்த வாடகை மற்றும் 40-50% மானியத்துடன் கூடிய டிராக்டர்கள் மற்றும் கருவிகள்.',
  serviceMachineryAction: 'இயந்திரங்கள் வாடகை காண்க',

  servicePipelineTitle: 'கழிவிலிருந்து வருமானம் மாற்றும் திட்டம்',
  servicePipelineDesc: 'மண்டி கழிவு முதல் சான்றளிக்கப்பட்ட உரம் தயாரிப்பு வரையிலான 16 நிலைகள்.',
  servicePipelineAction: 'செயல்முறையை காண்க',

  serviceMarketplaceTitle: 'விவசாய பொருட்கள் விற்பனை',
  serviceMarketplaceDesc: 'தரமான மண்புழு உரம், ஜீவாமிர்தம் ஆகியவற்றை நேரடியாக வாங்கலாம்.',
  serviceMarketplaceAction: 'உரங்களை காண்க',

  serviceCarbonTitle: 'கார்பன் கிரெடிட் & காலநிலை திட்டம்',
  serviceCarbonDesc: 'விவசாயிகளுக்கு 70% நேரடி வருவாய் பங்கீட்டுடன் கூடிய கார்பன் திட்டம்.',
  serviceCarbonAction: 'கார்பன் பலன் கணக்கிடுக',

  serviceRotationTitle: 'பயிர் சுழற்சி மற்றும் மண் சத்து',
  serviceRotationDesc: 'மண்ணின் ஈரப்பதம் மற்றும் சத்துக்கு ஏற்ற காரிஃப், ரபி பயிர் சுழற்சி முறை.',
  serviceRotationAction: 'பயிர் அட்டவணை திறக்க',

  serviceSchemesTitle: 'அரசு மானியங்கள் & திட்டங்கள்',
  serviceSchemesDesc: 'PM-PRANAM மற்றும் 50% இயந்திர மானிய தகுதி வழிகாட்டுதல்.',
  serviceSchemesAction: 'மானியம் சரிபார்க்க',

  serviceImpactTitle: 'தாக்கம் மற்றும் கணக்கு தணிக்கை',
  serviceImpactDesc: 'மீட்கப்பட்ட கழிவுகள் மற்றும் விவசாயிகளுக்கான நேரடி வங்கி பரிவர்த்தனை விவரங்கள்.',
  serviceImpactAction: 'தணிக்கை அறிக்கை பதிவிறக்குக',

  serviceHelplineTitle: '24x7 விவசாய உதவி மையம் & AI',
  serviceHelplineDesc: '1800-க்ரிஷிகிரீன் இலவச அழைப்பு மற்றும் AI விவசாய ஆலோசனை.',
  serviceHelplineAction: 'உதவி மையத்தை தொடர்பு கொள்ள',

  farmerQuickTools: '🌾 விவசாயி உடனடி கருவிகள்',
  startInSeconds: 'உடனே தொடங்கவும்',
  calcBookAdvice: 'கணக்கிடுங்கள் • முன்பதிவு செய்யுங்கள் • ஆலோசனை பெறுங்கள்',
  tabEarn: '💰 எனக்கு என்ன வருமானம் கிடைக்கும்?',
  tabPickup: '🚛 கழிவு சேகரிப்பு',
  tabWeather: '🌤 பயிர் ஆலோசனை',
  selectWasteQty: 'கழிவு அளவை தேர்ந்தெடுக்கவும் (கிலோ):',
  compostYield: 'உர உற்பத்தி',
  compostRevenue: 'உர வருமானம்',
  carbonPayout: 'கார்பன் வருவாய்',
  dapBagsSaved: 'DAP உர சேமிப்பு',
  totalFarmerBenefit: 'மொத்த விவசாயி பயன்',
  yourVillage: 'உங்கள் கிராமம்:',
  villagePlaceholder: 'எ.கா: ராமநகர், பல்நாடு',
  wasteType: 'கழிவு வகை:',
  bookFreePickup: 'இலவச சேகரிப்பை பதிவு செய்க',
  pickupBooked: 'முன்பதிவு வெற்றிகரமாக முடிந்தது!',
  teamContact24h: 'எங்கள் குழு 24 மணி நேரத்திற்குள் உங்களை தொடர்பு கொள்ளும்.',
  bookAnother: 'மறுபதிவு செய்க',
  selectCrop: 'உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்:',
  temp: 'வெப்பநிலை',
  rain: 'மழை',
  condition: 'நிலை',
  advisoryFor: 'பயிருக்கான ஆலோசனை:',

  seasonalAdviceTitle: 'பருவகால பயிர் ஆலோசனை • 2026',
  seasonalAdviceHeading: 'அடுத்து என்ன பயிரிடலாம்?',
  seasonalAdviceDesc: 'மண் ஈரப்பதம் மற்றும் தட்பவெப்ப நிலைக்கு ஏற்ப பயிர் பரிந்துரைகள்.',
  selectFarmingDistrict: 'மாவட்டத்தை தேர்வு செய்யவும்:',
  selectCroppingMonth: 'மாதத்தை தேர்வு செய்யவும்:',
  whyPlantNow: 'இப்போது ஏன் பயிரிட வேண்டும்',
  organicRegimen: 'இயற்கை உர முறை',
  expectedYield: 'எதிர்பார்க்கப்படும் மகசூல்',
  duration: 'கால அளவு',
  waterNeed: 'நீர் தேவை',
};

// Return the appropriate language bundle with robust fallback
export const getMultiTranslations = (lang: SupportedLanguage): MultiTranslations => {
  switch (lang) {
    case 'te':
      return TE_TRANSLATIONS;
    case 'hi':
      return HI_TRANSLATIONS;
    case 'ta':
      return TA_TRANSLATIONS;
    case 'kn':
      return {
        ...EN_TRANSLATIONS,
        menu: 'ಮೆನು',
        prototypePilot: 'ಮಾದರಿ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ',
        prototypeNotice: 'ಆಂಧ್ರಪ್ರದೇಶ ಮತ್ತು ತೆಲಂಗಾಣಕ್ಕಾಗಿ ಮಾದರಿ ಪೈಲಟ್ ಆವೃತ್ತಿ',
        region: 'ಪ್ರದೇಶ:',
        voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',
        tollFreeHelpline: 'ಉಚಿತ ಸಹಾಯವಾಣಿ',
        callNow: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
        free24x7: 'ಉಚಿತ • 24×7',
        allCrops: 'ಎಲ್ಲಾ ಬೆಳೆಗಳು',
        exploreEcosystem: 'ಪರಿಸರ ವ್ಯವಸ್ಥೆ ನೋಡಿ',
        liveTelemetry: 'ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ',
        nationalAgriInfra: 'ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ-ಪರಿಸರ ಮೂಲಸೌಕರ್ಯ',
        heroTagline: 'ಆಹಾರ ತ್ಯಾಜ್ಯ → ಸಾವಯವ ಗೊಬ್ಬರ → ರೈತರ ಸಮೃದ್ಧಿ',
        heroOneLiner: 'ತ್ಯಾಜ್ಯವನ್ನು ರೈತರ ಆದಾಯವನ್ನಾಗಿ ಮತ್ತು ಭೂಮಿಗೆ ಸಾವಯವ ಗೊಬ್ಬರವನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವ ವೇದಿಕೆ.',
        scheduleWasteCollection: 'ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹಣೆ ಬುಕ್ ಮಾಡಿ',
        organicMarketplace: 'ಸಾವಯವ ಮಾರುಕಟ್ಟೆ',
        geographicReach: 'ವ್ಯಾಪ್ತಿ',
        panIndiaNetwork: 'ಅಖಿಲ ಭಾರತ ಜಾಲ',
        farmerRevenueShare: 'ರೈತರ ಆದಾಯ ಪಾಲು',
        directDbt70: '70% ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ (DBT)',
        qualityStandards: 'ಗುಣಮಟ್ಟದ ಮಾನದಂಡಗಳು',
        fcoAndBee: 'FCO 1985 ಮತ್ತು BEE CCTS',
        helplineSupport: 'ಸಹಾಯವಾಣಿ ಬೆಂಬಲ',
        helpline24x7: '24×7 • 13 ಭಾಷೆಗಳು',
        flagshipProduct: 'ನಮ್ಮ ಪ್ರಮುಖ ಉತ್ಪನ್ನ',
        flagshipTitle: 'FCO 1985 ಗ್ರೇಡ್-ಎ ಸಾವಯವ ಎರೆಹುಳು ಗೊಬ್ಬರ',
        requestBioSupply: 'ಸಾವಯವ ಗೊಬ್ಬರಕ್ಕಾಗಿ ವಿನಂತಿಸಿ',
        viewLabCertificate: 'ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷಾ ಪ್ರಮಾಣಪತ್ರ',
        farmerQuickTools: '🌾 ರೈತ ತ್ವರಿತ ಪರಿಕರಗಳು',
        startInSeconds: 'ಕ್ಷಣಗಳಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ',
        tabEarn: '💰 ನನ್ನ ಗಳಿಕೆ ಎಷ್ಟು?',
        tabPickup: '🚛 ಸಂಗ್ರಹಣೆ ಬುಕ್',
        tabWeather: '🌤 ಬೆಳೆ ಸಲಹೆ',
        totalFarmerBenefit: 'ಒಟ್ಟು ರೈತರ ಲಾಭ',
        bookFreePickup: 'ಉಚಿತ ಸಂಗ್ರಹಣೆ ಬುಕ್ ಮಾಡಿ',
        seasonalAdviceHeading: 'ಮುಂದೆ ಏನು ಬಿತ್ತಬೇಕು?',
      };
    case 'mr':
      return {
        ...HI_TRANSLATIONS,
        menu: 'मेनू',
        prototypePilot: 'प्रोटोटाइप प्रात्यक्षिक',
        prototypeNotice: 'आंध्र प्रदेश आणि तेलंगणासाठी इंटरएक्टिव्ह प्रोटोटाइप पायलट',
        region: 'विभाग:',
        voiceAssistant: 'व्हॉइस असिस्टंट',
        tollFreeHelpline: 'टोल-फ्री हेल्पलाइन',
        callNow: 'आता कॉल करा',
        allCrops: 'सर्व पिके',
        exploreEcosystem: 'परिसंस्था एक्सप्लोर करा',
        liveTelemetry: 'थेट टेलीमेट्री',
        nationalAgriInfra: 'राष्ट्रीय कृषी-पर्यावरण पायाभूत सुविधा',
        heroTagline: 'अन्न कचरा → सेंद्रिय खत → शेतकरी समृद्धी',
        heroOneLiner: 'भारतातील अन्न कचऱ्याचे रूपांतर शेतकऱ्यांच्या उत्पन्नात आणि जमिनीसाठी सेंद्रिय खतात करणे.',
        scheduleWasteCollection: 'कचरा उचल विनंती नोंदवा',
        organicMarketplace: 'सेंद्रिय बाजारपेठ',
        geographicReach: 'भौगोलिक विस्तार',
        panIndiaNetwork: 'अखिल भारतीय नेटवर्क',
        farmerRevenueShare: 'शेतकरी महसूल वाटा',
        directDbt70: '70% थेट बँक जमा (DBT)',
        qualityStandards: 'दर्जा मानके',
        flagshipProduct: 'आमचे प्रमुख उत्पादन',
        flagshipTitle: 'एफसीओ 1985 ग्रेड-ए समृद्ध गांडूळ खत',
        requestBioSupply: 'सेंद्रिय खतासाठी विनंती करा',
        viewLabCertificate: 'प्रयोगशाळा चाचणी प्रमाणपत्र पहा',
        farmerQuickTools: '🌾 शेतकरी जलद साधने',
        startInSeconds: 'काही सेकंदात सुरू करा',
        tabEarn: '💰 माझी किती कमाई होईल?',
        tabPickup: '🚛 पिकअप बुक करा',
        tabWeather: '🌤 पीक सल्ला',
        totalFarmerBenefit: 'एकूण शेतकरी नफा',
        bookFreePickup: 'मोफत पिकअप बुक करा',
        seasonalAdviceHeading: 'हंगामी पीक सल्ला: पुढे काय पेरावे?',
      };
    case 'bn':
      return {
        ...HI_TRANSLATIONS,
        menu: 'মেনু',
        prototypePilot: 'প্রোটোটাইপ ডেমো',
        prototypeNotice: 'অন্ধ্রপ্রদেশ ও তেলঙ্গানার জন্য ইন্টারঅ্যাকটিভ প্রোটোটাইপ পাইলট',
        region: 'অঞ্চল:',
        voiceAssistant: 'ভয়েস সহায়ক',
        tollFreeHelpline: 'টোল-ফ্রি হেল্পলাইন',
        callNow: 'এখনই কল করুন',
        allCrops: 'সব ফসল',
        exploreEcosystem: 'ইকোসিস্টেম দেখুন',
        liveTelemetry: 'লাইভ টেলিমেট্রি',
        nationalAgriInfra: 'জাতীয় কৃষি-বাস্তুতান্ত্রিক পরিকাঠামো',
        heroTagline: 'খাদ্য বর্জ্য → জৈব সার → কৃষকের সমৃদ্ধি',
        heroOneLiner: 'ভারতের খাদ্য বর্জ্যকে কৃষকের আয় এবং মাটির জৈব সারে রূপান্তর করার সর্বাত্মক মঞ্চ।',
        scheduleWasteCollection: 'বর্জ্য সংগ্রহের আবেদন করুন',
        organicMarketplace: 'জৈব সার বাজার',
        farmerRevenueShare: 'কৃষকের আয়ের অংশ',
        directDbt70: '৭০% সরাসরি ডিবিটি (DBT)',
        flagshipProduct: 'আমাদের প্রধান পণ্য',
        flagshipTitle: 'এফসিও ১৯৮৫ গ্রেড-এ সমৃদ্ধ কেঁচো সার',
        requestBioSupply: 'জৈব সার সরবরাহ অনুরোধ করুন',
        viewLabCertificate: 'ল্যাব পরীক্ষার সনদ দেখুন',
        farmerQuickTools: '🌾 কৃষক দ্রুত সরঞ্জাম',
        tabEarn: '💰 আমার কত আয় হবে?',
        tabPickup: '🚛 পিকআপ বুকিং',
        tabWeather: '🌤 ফসল পরামর্শ',
        totalFarmerBenefit: 'মোট কৃষক সুবিধা',
        bookFreePickup: 'বিনামূল্যে সংগ্রহ বুক করুন',
        seasonalAdviceHeading: 'মৌসুমি ফসল পরামর্শ: এরপর কী রোপণ করবেন?',
      };
    case 'gu':
      return {
        ...HI_TRANSLATIONS,
        menu: 'મેનૂ',
        prototypePilot: 'પ્રોટોટાઇપ પ્રદર્શન',
        prototypeNotice: 'આંધ્રપ્રદેશ અને તેલંગાણા માટે ઇન્ટરેક્ટિવ પ્રોટોટાઇપ પાઇલટ',
        region: 'વિસ્તાર:',
        voiceAssistant: 'વોઇસ સહાયક',
        tollFreeHelpline: 'ટોલ-ફ્રી હેલ્પલાઇન',
        callNow: 'હમણાં કોલ કરો',
        exploreEcosystem: 'ઇકોસિસ્ટમ જુઓ',
        liveTelemetry: 'લાઇવ ટેલિમેટ્રી',
        heroTagline: 'ખોરાક કચરો → જૈવિક ખાતર → ખેડૂત સમૃદ્ધિ',
        scheduleWasteCollection: 'કચરો ઉપાડવા બુક કરો',
        organicMarketplace: 'જૈવિક બજાર',
        farmerRevenueShare: 'ખેડૂત આવક હિસ્સો',
        directDbt70: '70% સીધા ડીબીટી (DBT)',
        flagshipProduct: 'અમારું મુખ્ય ઉત્પાદન',
        flagshipTitle: 'FCO 1985 ગ્રેડ-A સમૃદ્ધ વર્મીકમ્પોસ્ટ',
        requestBioSupply: 'જૈવિક ખાતર માટે વિનંતી કરો',
        farmerQuickTools: '🌾 ખેડૂત ઝડપી સાધનો',
        tabEarn: '💰 મારી કેટલી કમાણી થશે?',
        tabPickup: '🚛 પીકઅપ બુકિંગ',
        tabWeather: '🌤 પાક સલાહ',
        totalFarmerBenefit: 'કુલ ખેડૂત લાભ',
        bookFreePickup: 'મફત પીકઅપ બુક કરો',
        seasonalAdviceHeading: 'મોસમી પાક સલાહ: આગળ શું વાવવું?',
      };
    case 'pa':
      return {
        ...HI_TRANSLATIONS,
        menu: 'ਮੇਨੂ',
        prototypePilot: 'ਪ੍ਰੋਟੋਟਾਈਪ ਡੈਮੋ',
        prototypeNotice: 'ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼ ਅਤੇ ਤੇਲੰਗਾਨਾ ਲਈ ਇੰਟਰਐਕਟਿਵ ਪ੍ਰੋਟੋਟਾਈਪ ਪਾਇਲਟ',
        region: 'ਖੇਤਰ:',
        voiceAssistant: 'ਆਵਾਜ਼ ਸਹਾਇਕ',
        tollFreeHelpline: 'ਟੋਲ-ਫ੍ਰੀ ਹੈਲਪਲਾਈਨ',
        callNow: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
        exploreEcosystem: 'ਈਕੋਸਿਸਟਮ ਦੇਖੋ',
        liveTelemetry: 'ਲਾਈਵ ਟੈਲੀਮੈਟਰੀ',
        heroTagline: 'ਭੋਜਨ ਕੂੜਾ → ਜੈਵਿਕ ਖਾਦ → ਕਿਸਾਨ ਖੁਸ਼ਹਾਲੀ',
        scheduleWasteCollection: 'ਕੂੜਾ ਚੁੱਕਣ ਲਈ ਬੁੱਕ ਕਰੋ',
        organicMarketplace: 'ਜੈਵਿਕ ਮੰਡੀ',
        farmerRevenueShare: 'ਕਿਸਾਨ ਆਮਦਨ ਹਿੱਸਾ',
        directDbt70: '70% ਸਿੱਧਾ ਡੀਬੀਟੀ (DBT)',
        flagshipProduct: 'ਸਾਡਾ ਮੁੱਖ ਉਤਪਾਦ',
        flagshipTitle: 'ਐਫਸੀਓ 1985 ਗ੍ਰੇਡ-ਏ ਵਰਮੀਕੰਪੋਸਟ',
        requestBioSupply: 'ਖਾਦ ਸਪਲਾਈ ਲਈ ਬੇਨਤੀ ਕਰੋ',
        farmerQuickTools: '🌾 ਕਿਸਾਨ ਤੇਜ਼ ਸੰਦ',
        tabEarn: '💰 ਮੇਰੀ ਕਿੰਨੀ ਕਮਾਈ ਹੋਵੇਗੀ?',
        tabPickup: '🚛 ਪਿਕਅੱਪ ਬੁੱਕ ਕਰੋ',
        tabWeather: '🌤 ਫਸਲ ਸਲਾਹ',
        totalFarmerBenefit: 'ਕੁੱਲ ਕਿਸਾਨ ਲਾਭ',
        bookFreePickup: 'ਮੁਫ਼ਤ ਪਿਕਅੱਪ ਬੁੱਕ ਕਰੋ',
        seasonalAdviceHeading: 'ਮੌਸਮੀ ਫਸਲ ਸਲਾਹ: ਅੱਗੇ ਕੀ ਬੀਜੀਏ?',
      };
    case 'ml':
      return {
        ...TA_TRANSLATIONS,
        menu: 'മെനു',
        prototypePilot: 'പ്രോട്ടോടൈപ്പ് ഡെമോ',
        prototypeNotice: 'ആന്ധ്രാപ്രദേശിനും തെലങ്കാനയ്ക്കും വേണ്ടിയുള്ള പൈലറ്റ് പതിപ്പ്',
        region: 'മേഖല:',
        voiceAssistant: 'ശബ്ദ സഹായി',
        tollFreeHelpline: 'ടോൾ ഫ്രീ ഹെൽപ്പ്‌ലൈൻ',
        callNow: 'ഇപ്പോൾ വിളിക്കുക',
        exploreEcosystem: 'ഇക്കോസിസ്റ്റം കാണുക',
        liveTelemetry: 'തത്സമയ വിവരങ്ങൾ',
        heroTagline: 'ഭക്ഷണ മാലിന്യം → ജൈവ വളം → കർഷക സമൃദ്ധി',
        scheduleWasteCollection: 'മാലിന്യ ശേഖരണം ബുക്ക് ചെയ്യുക',
        organicMarketplace: 'ജൈവ വിപണി',
        farmerRevenueShare: 'കർഷക വരുമാന വിഹിതം',
        directDbt70: '70% നേരിട്ടുള്ള ഡിബിടി (DBT)',
        flagshipProduct: 'ഞങ്ങളുടെ പ്രധാന ഉൽപ്പന്നം',
        flagshipTitle: 'FCO 1985 ഗ്രേഡ്-എ വെർമി കമ്പോസ്റ്റ്',
        requestBioSupply: 'ജൈവ വളം അഭ്യർത്ഥിക്കുക',
        farmerQuickTools: '🌾 കർഷക ദ്രുത ഉപകരണങ്ങൾ',
        tabEarn: '💰 എനിക്ക് എത്ര വരുമാനം ലഭിക്കും?',
        tabPickup: '🚛 ശേഖരണം ബുക്ക് ചെയ്യുക',
        tabWeather: '🌤 വിള ഉപദേശം',
        totalFarmerBenefit: 'ആകെ കർഷക ആനുകൂല്യം',
        bookFreePickup: 'സൗജന്യ പിക്കപ്പ് ബുക്ക് ചെയ്യുക',
        seasonalAdviceHeading: 'സീസണൽ വിള ഉപദേശം: അടുത്തതായി എന്ത് നടണം?',
      };
    case 'or':
      return {
        ...HI_TRANSLATIONS,
        menu: 'ମେନୁ',
        prototypePilot: 'ପ୍ରୋଟୋଟାଇପ୍ ଡେମୋ',
        prototypeNotice: 'ଆନ୍ଧ୍ରପ୍ରଦେଶ ଏବଂ ତେଲେଙ୍ଗାନା ପାଇଁ ପାଇଲଟ୍ ସଂସ୍କରଣ',
        region: 'ଅଞ୍ଚଳ:',
        voiceAssistant: 'ଭଏସ ସହାୟକ',
        tollFreeHelpline: 'ଟୋଲ-ଫ୍ରି ହେଲ୍ପଲାଇନ',
        callNow: 'କଲ୍ କରନ୍ତୁ',
        exploreEcosystem: 'ଇକୋସିଷ୍ଟମ୍ ଦେଖନ୍ତୁ',
        heroTagline: 'ଖାଦ୍ୟ ବର୍ଜ୍ୟବସ୍ତୁ → ଜୈବିକ ଖତ → କୃଷକ ସମୃଦ୍ଧି',
        scheduleWasteCollection: 'ବର୍ଜ୍ୟ ସଂଗ୍ରହ ବୁକ୍ କରନ୍ତୁ',
        organicMarketplace: 'ଜୈବିକ ବଜାର',
        flagshipProduct: 'ଆମର ପ୍ରମୁଖ ଉତ୍ପାଦ',
        flagshipTitle: 'FCO 1985 ଗ୍ରେଡ୍-ଏ ଜିଆ ଖତ',
        farmerQuickTools: '🌾 କୃଷକ ସହାୟକ ଉପକରଣ',
        tabEarn: '💰 ମୋର କେତେ ଲାଭ ହେବ?',
        tabPickup: '🚛 ପିକଅପ୍ ବୁକ୍',
        tabWeather: '🌤 ଫସଲ ପରାମର୍ଶ',
        totalFarmerBenefit: 'ମୋଟ କୃଷକ ଲାଭ',
        bookFreePickup: 'ମାଗଣା ପିକଅପ୍ ବୁକ୍ କରନ୍ତୁ',
      };
    case 'as':
      return {
        ...HI_TRANSLATIONS,
        menu: 'মেনু',
        prototypePilot: 'প্রোট’টাইপ ডেম’',
        prototypeNotice: 'অন্ধ্ৰপ্ৰদেশ আৰু তেলেংগানাৰ বাবে পাইলট সংস্কৰণ',
        region: 'অঞ্চল:',
        voiceAssistant: 'ভইচ সহায়ক',
        tollFreeHelpline: 'টোল-ফ্ৰী হেল্পলাইন',
        callNow: 'কল কৰক',
        exploreEcosystem: 'পৰিস্থিতিতন্ত্ৰ চাওক',
        heroTagline: 'খাদ্য আৱৰ্জনা → জৈৱিক সাৰ → কৃষকৰ সমৃদ্ধি',
        scheduleWasteCollection: 'আৱৰ্জনা সংগ্ৰহ অনুৰোধ',
        organicMarketplace: 'জৈৱিক বজাৰ',
        flagshipProduct: 'আমাৰ প্ৰধান সামগ্ৰী',
        flagshipTitle: 'FCO 1985 গ্ৰেড-এ কেঁচু সাৰ',
        farmerQuickTools: '🌾 কৃষক ক্ষিপ্ৰ সঁজুলি',
        tabEarn: '💰 মোৰ কিমান উপাৰ্জন হ’ব?',
        tabPickup: '🚛 পিকআপ বুকিং',
        tabWeather: '🌤 শস্য পৰামৰ্শ',
        totalFarmerBenefit: 'মুঠ কৃষক লাভ',
        bookFreePickup: 'বিনামূলীয়া পিকআপ বুক কৰক',
      };
    case 'ur':
      return {
        ...HI_TRANSLATIONS,
        menu: 'مینو',
        prototypePilot: 'پروٹوٹائپ مظاہرہ',
        prototypeNotice: 'آندھرا پردیش اور تلنگانہ کے لیے انٹرایکٹو پروٹوٹائپ پائلٹ',
        region: 'علاقہ:',
        voiceAssistant: 'وائس اسسٹنٹ',
        tollFreeHelpline: 'ٹول فری ہیلپ لائن',
        callNow: 'ابھی کال کریں',
        exploreEcosystem: 'ماحولیاتی نظام دیکھیں',
        heroTagline: 'خوراک کا فضلہ → نامیاتی کھاد → کسان کی خوشحالی',
        scheduleWasteCollection: 'فضلہ اٹھانے کا وقت طے کریں',
        organicMarketplace: 'نامیاتی منڈی',
        farmerRevenueShare: 'کسان کی آمدنی کا حصہ',
        directDbt70: '70% براہ راست بینک اکاؤنٹ (DBT)',
        flagshipProduct: 'ہماری نمایاں مصنوعات',
        flagshipTitle: 'ایف سی او 1985 گریڈ اے افزودہ ورمی کمپوسٹ',
        farmerQuickTools: '🌾 کسان فوری ٹولز',
        tabEarn: '💰 میری کتنی کمائی ہوگی؟',
        tabPickup: '🚛 پک اپ بک کریں',
        tabWeather: '🌤 فصل کا مشورہ',
        totalFarmerBenefit: 'کل کسان فائدہ',
        bookFreePickup: 'مفت پک اپ بک کریں',
      };
    default:
      return EN_TRANSLATIONS;
  }
};
