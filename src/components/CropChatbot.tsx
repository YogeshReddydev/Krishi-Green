import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Phone,
  Sparkles,
  ArrowRight,
  FileText,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Truck,
  Tractor,
  Maximize2,
  Minimize2,
  RefreshCw,
  CloudSun,
  Coins,
  Ticket,
} from 'lucide-react';
import { SupportedLanguage, SupportTicket } from '../types';
import { navigateTo, APP_ROUTES } from '../utils/navigation';
import { InlineCropSpinner } from './CropLoader';

interface CropChatbotProps {
  language: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onTicketCreated?: (ticket: SupportTicket) => void;
  onOpenHelpline?: () => void;
  ticketCount?: number;
  onOpenTicketsDrawer?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'navigation' | 'ticket_form' | 'ticket_confirmed' | 'operational_guide';
    title: string;
    description?: string;
    route?: string;
    routeLabel?: string;
    ticketData?: Partial<SupportTicket>;
  };
}

interface CommonFAQ {
  keywords: string[];
  question: { en: string; te: string; hi: string };
  answer: { en: string; te: string; hi: string };
  route?: string;
  routeLabel?: { en: string; te: string; hi: string };
}

export const CropChatbot: React.FC<CropChatbotProps> = ({
  language,
  onLanguageChange,
  onTicketCreated,
  onOpenHelpline,
  ticketCount = 0,
  onOpenTicketsDrawer,
}) => {
  const isTe = language === 'te';
  const isHi = language === 'hi';

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'directions' | 'ticket'>('chat');

  // Interactive Ticket Form state (inside chatbot)
  const [ticketForm, setTicketForm] = useState({
    callerName: '',
    phone: '',
    category: 'Waste Collection' as SupportTicket['category'],
    query: '',
    isSubmitting: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  // Common Farmer FAQs with direct routing suggestions
  const COMMON_FAQS: CommonFAQ[] = [
    {
      keywords: ['order', 'aga', 'fertilizer', 'compost', 'ఖరీదు', 'ఎరువు', 'ఆర్డర్', 'खाद', 'खरीदें'],
      question: {
        en: 'How do I order AGA Organic Fertilizer?',
        te: 'AGA సేంద్రీయ ఎరువును ఎలా ఆర్డర్ చేయాలి?',
        hi: 'एजीए जैविक खाद कैसे ऑर्डर करें?',
      },
      answer: {
        en: 'You can order AGA Organic Fertilizer directly from our AGA section. 50kg bags are available at subsidized rates with lab quality certificate. We provide doorstep delivery across Andhra Pradesh pilot districts.',
        te: 'మీరు మా AGA పేజీ నుండి నేరుగా 50kg బ్యాగులను బుక్ చేసుకోవచ్చు. FCO 1985 నాణ్యతా పత్రంతో మీ గ్రామానికే ఉచిత డెలివరీ అందించబడుతుంది.',
        hi: 'आप एजीए पेज से 50 किलो की बोरियां सीधे बुक कर सकते हैं। परीक्षण प्रमाण पत्र के साथ आपके गांव तक सुरक्षित डिलीवरी उपलब्ध है।',
      },
      route: APP_ROUTES.AGA,
      routeLabel: {
        en: 'Order AGA Fertilizer Now',
        te: 'AGA ఎరువు పేజీకి వెళ్లండి',
        hi: 'एजीए खाद ऑर्डर करें',
      },
    },
    {
      keywords: ['waste', 'pickup', 'collect', 'residue', 'straw', 'చెత్త', 'సేకరణ', 'వ్యర్థాలు', 'कचरा', 'संग्रह'],
      question: {
        en: 'How to request farm & vegetable waste collection?',
        te: 'వ్యవసాయ మరియు కూరగాయల వ్యర్థాల సేకరణ ఎలా అభ్యర్థించాలి?',
        hi: 'कृषि व सब्जी कचरा संग्रह अनुरोध कैसे दर्ज करें?',
      },
      answer: {
        en: 'Enter your village name and residue type in the Waste Management section. Our decentralized collection vehicles weigh the biomass on digital scales and process ₹750/MT direct DBT to your account.',
        te: 'వేస్ట్ మేనేజ్‌మెంట్ విభాగంలో మీ గ్రామం మరియు వ్యర్థాల రకాన్ని నమోదు చేయండి. మా వాహనం కాటా బరువు వేసి, టన్నుకు ₹750 చొప్పున నేరుగా మీ ఖాతాకు డీబీటీ జమ చేస్తుంది.',
        hi: 'वेस्ट मैनेजमेंट सेक्शन में अपना गांव और कचरा प्रकार दर्ज करें। डिजिटल कांटे से तौलकर ₹750 प्रति टन सीधे खाते में भुगतान किया जाता है।',
      },
      route: APP_ROUTES.WASTE_MANAGEMENT,
      routeLabel: {
        en: 'Request Free Waste Pickup',
        te: 'సేకరణ అభ్యర్థన నమోదు చేయండి',
        hi: 'कचरा संग्रह बुक करें',
      },
    },
    {
      keywords: ['equipment', 'tractor', 'shredder', 'baler', 'machinery', 'యంత్రాలు', 'ట్రాక్టర్', 'ష్రెడ్డర్', 'उपकरण', 'ट्रैक्टर'],
      question: {
        en: 'How to hire tractors, shredders & balers?',
        te: 'రైతు యంత్రాలు మరియు ష్రెడ్డర్లను ఎలా అద్దెకు తీసుకోవాలి?',
        hi: 'ट्रैक्टर और पराली श्रेडर किराए पर कैसे लें?',
      },
      answer: {
        en: 'Browse our Equipment Hub for verified Custom Hiring Center (CHC) machinery. All tools include trained operators, zero security deposit, and up to 50% government subsidy.',
        te: 'ఎక్విప్‌మెంట్ హబ్ ద్వారా ష్రెడ్డర్లు, ట్రాక్టర్లు మరియు బేలర్లను అద్దెకు పొందండి. సున్నా డిపాజిట్ మరియు 50% రాయితీతో ఆపరేటర్ సదుపాయం ఉంటుంది.',
        hi: 'इक्विपमेंट हब से सत्यापित कृषि यंत्र किराए पर लें। प्रशिक्षित चालक, शून्य अग्रिम राशि व 50% तक सरकारी अनुदान उपलब्ध है।',
      },
      route: APP_ROUTES.EQUIPMENT_HUB,
      routeLabel: {
        en: 'Explore Farming Equipment',
        te: 'వ్యవసాయ యంత్రాల హబ్ చూడండి',
        hi: 'कृषि उपकरण हब देखें',
      },
    },
    {
      keywords: ['weather', 'rain', 'mandi', 'price', 'వాతావరణం', 'వర్షం', 'మండి', 'ధరలు', 'मौसम', 'बारिश', 'भाव'],
      question: {
        en: 'How to check rain alerts & mandi prices?',
        te: 'వర్షపాత సమాచారం మరియు మార్కెట్ ధరలు ఎలా చూడాలి?',
        hi: 'मौसम, बारिश और मंडी भाव कैसे देखें?',
      },
      answer: {
        en: 'Open the Agriculture Updates page to view live IMD rain forecasts, agromet bulletins for Andhra Pradesh districts, and live price trends from regional market yards.',
        te: 'వ్యవసాయ అప్‌డేట్స్ పేజీలో IMD తాజా వర్షపాత రాడార్, గుంటూరు మరియు పల్నాడు మార్కెట్ యార్డుల తాజా ధరలు నిరంతరం లభిస్తాయి.',
        hi: 'एग्रीकल्चर अपडेट्स में मौसम विभाग का बारिश पूर्वानुमान और नजदीकी कृषि मंडियों के ताजा भाव देख सकते हैं।',
      },
      route: APP_ROUTES.AGRICULTURE_UPDATES,
      routeLabel: {
        en: 'Check Weather & Mandi Rates',
        te: 'వాతావరణం & ధరల పేజీ చూడండి',
        hi: 'मौसम व मंडी भाव देखें',
      },
    },
    {
      keywords: ['carbon', 'credit', 'dbt', 'earning', 'కార్బన్', 'నగదు', 'లబ్ధి', 'कार्बन', 'कमाई'],
      question: {
        en: 'How do farmers earn carbon credit payouts?',
        te: 'రైతులకు కార్బన్ క్రెడిట్ నగదు ఎలా లభిస్తుంది?',
        hi: 'किसानों को कार्बन क्रेडिट का भुगतान कैसे मिलता है?',
      },
      answer: {
        en: 'By redirecting crop residues away from open field burning into Krishi Green bio-fermentation, methane is captured. 70% of certified carbon revenue is directly disbursed to the farmer via DBT.',
        te: 'పంట వ్యర్థాలను కాల్చకుండా సేంద్రీయ ఎరువుగా మార్చినప్పుడు మిథేన్ ఉద్గారాలు ఆగుతాయి. ధృవీకరించిన కార్బన్ రాబడిలో 70% నగదు నేరుగా మీ బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది.',
        hi: 'पराली जलाने के बजाय खाद बनाने से मीथेन गैस रुकती है। प्रमाणित कार्बन राजस्व का 70% सीधा किसान के खाते में डीबीटी द्वारा भेजा जाता है।',
      },
      route: APP_ROUTES.CARBON_INTEGRITY,
      routeLabel: {
        en: 'View Carbon Revenue Engine',
        te: 'కార్బన్ లబ్ధి వివరాలు చూడండి',
        hi: 'कार्बन क्रेडिट पोर्टल देखें',
      },
    },
  ];

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: isTe
        ? 'నమస్కారం! నేను కృషి బోట్ (AI రైతు మిత్ర). వ్యర్థాల సేకరణ, AGA సేంద్రీయ ఎరువు ఆర్డర్, యంత్రాల అద్దె లేదా ఏదైనా సందేహం ఉంటే నన్ను అడగండి.'
        : isHi
        ? 'नमस्ते! मैं कृषि बॉट (AI किसान मित्र) हूँ। कचरा संग्रह, एजीए जैविक खाद, कृषि यंत्र या किसी भी सहायता के लिए मुझसे पूछें।'
        : 'Namaskaram! I am Krishi Bot, your 24×7 agricultural companion. Ask me anything about ordering AGA fertilizer, waste collection, hiring farm equipment, or raise a support ticket directly.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Check if user has started conversation (sent any message)
  const hasUserStartedConversation = messages.some((m) => m.sender === 'user');

  // Reset conversation handler
  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: isTe
          ? 'నమస్కారం! నేను కృషి బోట్ (AI రైతు మిత్ర). వ్యర్థాల సేకరణ, AGA సేంద్రీయ ఎరువు ఆర్డర్, యంత్రాల అద్దె లేదా ఏదైనా సందేహం ఉంటే నన్ను అడగండి.'
          : isHi
          ? 'नमस्ते! मैं कृषि बॉट (AI किसान मित्र) हूँ। कचरा संग्रह, एजीए जैविक खाद, कृषि यंत्र या किसी भी सहायता के लिए मुझसे पूछें।'
          : 'Namaskaram! I am Krishi Bot, your 24×7 agricultural companion. Ask me anything about ordering AGA fertilizer, waste collection, hiring farm equipment, or raise a support ticket directly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMessage('');
  };

  type QuickTopicId =
    | 'how_to_order'
    | 'view_tickets'
    | 'waste_pickup'
    | 'rent_machinery'
    | 'weather_mandi'
    | 'chemical_savings';

  interface QuickTopic {
    id: QuickTopicId;
    icon: React.ReactNode;
    title: { en: string; te: string; hi: string };
    desc: { en: string; te: string; hi: string };
    badge?: string;
  }

  const QUICK_TOPICS: QuickTopic[] = [
    {
      id: 'how_to_order',
      icon: <ShoppingBag className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'How to order',
        te: 'ఎరువు ఆర్డర్',
        hi: 'खाद ऑर्डर करें',
      },
      desc: {
        en: '50kg AGA bags & delivery',
        te: 'సబ్సిడీతో 50kg బ్యాగులు',
        hi: 'सब्सिडी दर पर खाद',
      },
    },
    {
      id: 'view_tickets',
      icon: <Ticket className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'View my tickets',
        te: 'నా టికెట్లు చూడండి',
        hi: 'मेरे टिकट देखें',
      },
      desc: {
        en: ticketCount > 0 ? `${ticketCount} active ticket(s)` : 'Check status or query',
        te: ticketCount > 0 ? `${ticketCount} యాక్టివ్ టికెట్లు` : 'స్థితి లేదా ప్రశ్న',
        hi: ticketCount > 0 ? `${ticketCount} सक्रिय टिकट` : 'स्थिति व समाधान',
      },
      badge: ticketCount > 0 ? `${ticketCount}` : undefined,
    },
    {
      id: 'waste_pickup',
      icon: <Truck className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'Waste pickup',
        te: 'వ్యర్థాల సేకరణ',
        hi: 'कचरा संग्रह',
      },
      desc: {
        en: 'Farm & market residue',
        te: 'వరి గడ్డి & వ్యర్థాలు',
        hi: 'पराली व मंडी कचरा',
      },
    },
    {
      id: 'rent_machinery',
      icon: <Tractor className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'Rent machinery',
        te: 'యంత్రాల అద్దె',
        hi: 'यंत्र किराया',
      },
      desc: {
        en: 'Shredders, balers, CHC',
        te: 'ష్రెడ్డర్లు, బేలర్లు',
        hi: 'श्रेडर, बेलर व ट्रैक्टर',
      },
    },
    {
      id: 'weather_mandi',
      icon: <CloudSun className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'Weather & mandi',
        te: 'వాతావరణం & ధరలు',
        hi: 'मौसम व मंडी भाव',
      },
      desc: {
        en: 'Rain radar & crop rates',
        te: 'లైవ్ రాడార్ & రేట్లు',
        hi: 'लाइव बारिश व भाव',
      },
    },
    {
      id: 'chemical_savings',
      icon: <Coins className="w-4 h-4 text-emerald-700" />,
      title: {
        en: 'Calculate savings',
        te: 'ఎరువుల పొదుపు',
        hi: 'उर्वरक बचत',
      },
      desc: {
        en: 'Save ₹3200-5400/acre',
        te: 'ఎకరాకు ₹3200+ ఆదా',
        hi: 'यूरिया व DAP बचत',
      },
    },
  ];

  const handleQuickTopicSelect = (topicId: QuickTopicId) => {
    let userText = '';
    switch (topicId) {
      case 'how_to_order':
        userText = isTe
          ? 'AGA సేంద్రీయ ఎరువును ఎలా ఆర్డర్ చేయాలి?'
          : isHi
          ? 'एजीए जैविक खाद कैसे ऑर्डर करें?'
          : 'How do I order AGA Organic Fertilizer?';
        break;
      case 'view_tickets':
        userText = isTe
          ? 'నా సపోర్ట్ టికెట్లు చూడండి'
          : isHi
          ? 'मेरे सहायता टिकट देखें'
          : 'View my support tickets';
        break;
      case 'waste_pickup':
        userText = isTe
          ? 'పంట & మార్కెట్ వ్యర్థాల సేకరణ ఎలా అభ్యర్థించాలి?'
          : isHi
          ? 'फसल व मंडी अपशिष्ट संग्रह का अनुरोध कैसे करें?'
          : 'How to request farm waste pickup?';
        break;
      case 'rent_machinery':
        userText = isTe
          ? 'ట్రాక్టర్లు & ష్రెడ్డర్లు అద్దెకు ఎలా తీసుకోవాలి?'
          : isHi
          ? 'कृषि यंत्र किराए पर कैसे लें?'
          : 'How to rent tractors & farming machinery?';
        break;
      case 'weather_mandi':
        userText = isTe
          ? 'ఈరోజు వాతావరణం & మార్కెట్ ధరలు ఏమిటి?'
          : isHi
          ? 'आज का मौसम और मंडी भाव क्या हैं?'
          : "Check today's weather & mandi rates";
        break;
      case 'chemical_savings':
        userText = isTe
          ? 'రసాయన ఎరువుల ఖర్చు ఎంత ఆదా అవుతుంది?'
          : isHi
          ? 'रासायनिक खाद पर कितनी बचत होगी?'
          : 'How much chemical DAP/Urea cost can I save?';
        break;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Instant realistic response
    setTimeout(() => {
      setIsTyping(false);
      let botReply: ChatMessage;

      if (topicId === 'view_tickets') {
        if (ticketCount > 0) {
          botReply = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: isTe
              ? `మీ ఖాతాలో ప్రస్తుతం ${ticketCount} సపోర్ట్ టికెట్లు నమోదై ఉన్నాయి. మా వ్యవసాయ నిపుణుల బృందం మీ అభ్యర్థనలను పరిశీలిస్తోంది. టికెట్ల వివరాలు చూడటానికి లేదా కొత్త సమస్య నమోదు చేయడానికి క్రింది బటన్లు ఉపయోగించండి:`
              : isHi
              ? `आपके खाते में वर्तमान में ${ticketCount} सहायता टिकट दर्ज हैं। हमारी कृषि टीम आपके अनुरोधों पर कार्य कर रही है। स्थिति देखने या नया टिकट दर्ज करने हेतु नीचे दिए विकल्प चुनें:`
              : `You currently have ${ticketCount} active support ticket(s) registered with Krishi Green. Our agricultural team is reviewing your request. Use the buttons below to review active tickets or submit a new query:`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionCard: {
              type: 'ticket_form',
              title: isTe ? `యాక్టివ్ టికెట్లు చూడండి (${ticketCount})` : isHi ? `सक्रिय टिकट देखें (${ticketCount})` : `View Active Tickets (${ticketCount})`,
              description: isTe ? 'టికెట్ డ్రాయర్ తెరవండి లేదా కొత్త ప్రశ్న నమోదు చేయండి' : 'Open tickets drawer or submit new inquiry',
            },
          };
        } else {
          botReply = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: isTe
              ? 'ప్రస్తుతం మీ ఖాతాలో ఎలాంటి ఓపెన్ సపోర్ట్ టికెట్లు లేవు. వ్యర్థాల సేకరణ, ఎరువుల ఆర్డర్ లేదా సాంకేతిక సాయం కోసం మీరు వెంటనే అధికారిక టికెట్ నమోదు చేయవచ్చు.'
              : isHi
              ? 'वर्तमान में आपके खाते में कोई सक्रिय टिकट नहीं है। अपशिष्ट संग्रह, खाद ऑर्डर या किसी भी समस्या के समाधान के लिए आप तुरंत टिकट दर्ज कर सकते हैं।'
              : 'You currently have 0 active support tickets. If you need assistance with farm waste collection, fertilizer delivery, or equipment booking, you can raise an instant support ticket below.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionCard: {
              type: 'ticket_form',
              title: isTe ? 'కొత్త సపోర్ట్ టికెట్ నమోదు' : isHi ? 'नया टिकट दर्ज करें' : 'Raise Support Ticket',
            },
          };
        }
      } else if (topicId === 'how_to_order') {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? `🌾 **AGA సేంద్రీయ ఎరువు (Bio-Enriched Compost) ఆర్డర్ విధానం:**\n• కనీస ఆర్డర్: 5 బ్యాగులు (50kg ప్రతి బ్యాగ్)\n• సబ్సిడీ ధర: ₹320 / బ్యాగ్ (మార్కెట్ ధర ₹480)\n• రవాణా: మీ గ్రామానికే ఉచిత రవాణా\n• నాణ్యత: FCO-1985 ధృవీకృత బ్యాచ్ ల్యాబ్ రిపోర్ట్\n• చెల్లింపు: UPI, కిసాన్ క్రెడిట్ కార్డ్ లేదా క్యాష్ ఆన్ డెలివరీ (COD)\n\nఆర్డర్ బుక్ చేయడానికి క్రింది బటన్ నొక్కండి:`
            : isHi
            ? `🌾 **एजीए जैविक खाद (Bio-Enriched Compost) ऑर्डर करने की विधि:**\n• न्यूनतम मात्रा: 5 बोरी (50 किग्रा)\n• रियायती दर: ₹320 प्रति बोरी (बाजार दर ₹480)\n• डिलीवरी: आपके गाँव तक निःशुल्क परिवहन\n• गुणवत्ता: FCO-1985 प्रमाणित लैब रिपोर्ट\n• भुगतान: UPI, किसान क्रेडिट कार्ड या कैश ऑन डिलीवरी (COD)\n\nऑर्डर शुरू करने के लिए नीचे दिए बटन पर टैप करें:`
            : `🌾 **How to Order AGA Bio-Fermented Organic Fertilizer:**\n• Packaging: 50kg HDPE bags at subsidized ₹320/bag (Market ₹480)\n• Doorstep Delivery: Free logistics for orders of 5+ bags across AP pilot mandals\n• Quality Guarantee: FCO-1985 certified with batch nitrogen & carbon lab reports\n• Payment: UPI, Kisan Credit Card (KCC), or Cash on Delivery (COD)\n\nTap the button below to open the AGA ordering page:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'navigation',
            title: isTe ? 'AGA ఎరువు పేజీకి వెళ్ళండి' : isHi ? 'एजीए खाद ऑर्डर पेज खोलें' : 'Go to AGA Order Page',
            route: APP_ROUTES.AGA,
            routeLabel: isTe ? 'AGA ఎరువు ఆర్డర్ చేయండి' : isHi ? 'खाद ऑर्डर करें' : 'Order AGA Fertilizer Now',
          },
        };
      } else if (topicId === 'waste_pickup') {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? `🚛 **వ్యర్థాల సేకరణ (Biomass Pickup) అభ్యర్థన విధానం:**\n1. మీ పొలం లేదా మార్కెట్ లొకేషన్ ఎంచుకోండి.\n2. వ్యర్థాల రకం (వరి గడ్డి, అరటి వ్యర్థాలు, కూరగాయల వ్యర్థాలు) నమోదు చేయండి.\n3. మా హైడ్రాలిక్ ట్రాక్టర్ ట్రాలీ 24 గంటల్లో వచ్చి వ్యర్థాలను ఉచితంగా సేకరిస్తుంది.\n4. కాల్చకుండా నివారించిన ప్రతి టన్నుకు కార్బన్ క్రెడిట్ నగదు మీ బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది.`
            : isHi
            ? `🚛 **अपशिष्ट संग्रह (Biomass Pickup) अनुरोध प्रक्रिया:**\n1. अपने खेत या मंडी का स्थान दर्ज करें।\n2. अपशिष्ट प्रकार (पराली, केले के अवशेष, मंडी कचरा) चुनें।\n3. हमारी ट्रैक्टर ट्रॉली 24 घंटे में आपके पास आकर निःशुल्क संग्रह करेगी।\n4. पराली न जलाने पर प्रमाणित कार्बन क्रेडिट भुगतान आपके खाते में जमा होगा।`
            : `🚛 **How to Request Farm & Mandi Waste Pickup:**\n1. Submit your farm coordinates or village pickup location.\n2. Select waste category (paddy straw, banana pseudo-stems, vegetable rejects).\n3. Krishi Green hydraulic aggregation tractor collects it within 24 hours.\n4. Certified carbon credits are credited via DBT directly to your bank account.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'navigation',
            title: isTe ? 'వ్యర్థాల సేకరణ ఫారమ్' : isHi ? 'कचरा संग्रह पोर्टल' : 'Waste Pickup Portal',
            route: APP_ROUTES.WASTE_MANAGEMENT,
            routeLabel: isTe ? 'వ్యర్థాల సేకరణ షెడ్యూల్ చేయండి' : isHi ? 'संग्रह का अनुरोध करें' : 'Schedule Waste Pickup',
          },
        };
      } else if (topicId === 'rent_machinery') {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? `🚜 **కృషి గ్రీన్ యంత్రాల అద్దె కేంద్రం (Custom Hiring Centre):**\n• మొబైల్ స్ట్రా ష్రెడ్డర్లు & మల్చర్లు (గంటకు ₹450 సబ్సిడీ రేటు)\n• రౌండ్ స్ట్రా బేలర్లు & లోడర్లు (ఎకరాకు ₹600)\n• లేజర్ ల్యాండ్ లెవెలర్లు & ట్రాక్టర్లు\n\nమీ గ్రామానికి సమీపంలోని హబ్ నుండి అవసరమైన యంత్రాన్ని తేలికగా బుక్ చేసుకోండి:`
            : isHi
            ? `🚜 **कृषि ग्रीन कस्टम हायरिंग सेंटर (CHC):**\n• मोबाइल स्ट्रॉ श्रेडर व मल्चर (₹450/घंटा सब्सिडी दर)\n• राउंड स्ट्रॉ बेलर व लोडर (₹600/एकड़)\n• लेजर लैंड लेवलर व आधुनिक ट्रैक्टर\n\nअपने गाँव के निकटतम हब से उपकरण बुक करने के लिए नीचे टैप करें:`
            : `🚜 **Krishi Green Custom Hiring Centre (CHC) Rentals:**\n• Mobile Residue Shredders & Mulchers (Subsidized ₹450/hr)\n• High-density Round Straw Balers & Loaders (₹600/acre)\n• Laser Land Levellers & Modern Tractors\n\nReserve verified machinery from your nearest mandal hub:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'navigation',
            title: isTe ? 'యంత్రాల అద్దె పేజీ' : isHi ? 'कृषि यंत्र हब' : 'Farming Equipment Hub',
            route: APP_ROUTES.EQUIPMENT_HUB,
            routeLabel: isTe ? 'యంత్రాలు బ్రౌజ్ చేయండి' : isHi ? 'यंत्र बुक करें' : 'Browse & Book Machinery',
          },
        };
      } else if (topicId === 'weather_mandi') {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? `🌤️ **లైవ్ వాతావరణ రాడార్ & APMC మార్కెట్ ధరలు:**\n• నేటి వర్ష సూచన, ఉపగ్రహ మేఘాల పటాలు మరియు నేల తేమ వివరాలు\n• వరి, మొక్కజొన్న, పత్తి, మిరప మరియు కూరగాయల రోజువారీ క్వింటాల్ ధరలు\n\nతాజా సమాచారం చూడటానికి క్రింది లింక్ నొక్కండి:`
            : isHi
            ? `🌤️ **लाइव मौसम रडार एवं APMC मंडी भाव:**\n• वर्षा पूर्वानुमान, उपग्रह बादल मानचित्र व मिट्टी की नमी\n• धान, मक्का, कपास, मिर्च व सब्जियों के लाइव दैनिक थोक भाव\n\nताजा कृषि जानकारी के लिए नीचे टैप करें:`
            : `🌤️ **Hyperlocal Weather Radar & APMC Mandi Rates:**\n• Doppler rainfall radar, 7-day precipitation forecasts, and soil moisture\n• Real-time APMC mandi prices for Paddy, Maize, Cotton, Chillies, and Vegetables\n\nTap below to open live updates:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'navigation',
            title: isTe ? 'వాతావరణం & ధరల పేజీ' : isHi ? 'मौसम व मंडी भाव पेज' : 'Weather & Mandi Portal',
            route: APP_ROUTES.AGRICULTURE_UPDATES,
            routeLabel: isTe ? 'వాతావరణం & ధరలు చూడండి' : isHi ? 'लाइव भाव देखें' : 'View Weather & Mandi Rates',
          },
        };
      } else {
        // chemical_savings
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? `💰 **రసాయన ఎరువుల ఖర్చు పొదుపు కాలిక్యులేటర్:**\n• AGA సేంద్రీయ ఎరువుతో 40-50% DAP మరియు యూరియా రసాయన ఖర్చు ఆదా అవుతుంది\n• ఎకరాకు సగటున ₹3,200 నుండి ₹5,400 వరకు నికర లాభం\n• నేలలో కర్బనం పెరిగి పంట కరువును తట్టుకునే శక్తి 25% పెరుగుతుంది\n\nమీ పొలానికి పొదుపును లెక్కించడానికి క్రింది కాలిక్యులేటర్ తెరవండి:`
            : isHi
            ? `💰 **रासायनिक खाद बचत कैलकुलेटर:**\n• एजीए जैविक खाद से 40-50% यूरिया व डीएपी की आवश्यकता कम होती है\n• प्रति एकड़ औसतन ₹3,200 से ₹5,400 की सीधी बचत\n• मिट्टी की कार्बन गुणवत्ता व जल धारण क्षमता में 25% सुधार\n\nअपनी फसल के लिए बचत का आकलन करने हेतु नीचे टैप करें:`
            : `💰 **Chemical Fertilizer Savings Calculator:**\n• Replacing 40-50% DAP & Urea with AGA Bio-Enriched Compost\n• Average net cash savings of ₹3,200 to ₹5,400 per acre per crop cycle\n• Restores soil microbial biodiversity and water retention by 25%\n\nLaunch the interactive calculator below:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'navigation',
            title: isTe ? 'ఎరువుల కాలిక్యులేటర్' : isHi ? 'खाद बचत कैलकुलेटर' : 'Fertilizer Calculator',
            route: APP_ROUTES.AGA,
            routeLabel: isTe ? 'పొదుపు కాలిక్యులేటర్ తెరవండి' : isHi ? 'कैलकुलेटर खोलें' : 'Open Savings Calculator',
          },
        };
      }

      setMessages((prev) => [...prev, botReply]);
    }, 200);
  };

  // Dynamic typing suggestions
  const filteredSuggestions = inputMessage.trim().length > 1
    ? COMMON_FAQS.filter((faq) => {
        const query = inputMessage.toLowerCase();
        return (
          faq.keywords.some((k) => k.includes(query) || query.includes(k)) ||
          faq.question.en.toLowerCase().includes(query) ||
          faq.question.te.includes(query) ||
          faq.question.hi.includes(query)
        );
      })
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice speech synthesis
  const speakText = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#•]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isTe ? 'te-IN' : isHi ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    window.speechSynthesis.speak(utterance);
    setSpeakingMessageId(msgId);
  };

  // Speech Recognition (Mic Input directly inside input field)
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        isTe
          ? 'ఈ బ్రౌజర్‌లో మైక్రోఫోన్ వాయిస్ రికార్డింగ్ అందుబాటులో లేదు. దయచేసి గూగుల్ క్రోమ్‌లో ప్రయత్నించండి.'
          : isHi
          ? 'इस ब्राउज़र में वॉयस रिकॉर्डिंग समर्थित नहीं है। कृपया क्रोम का उपयोग करें।'
          : 'Microphone voice recording is not supported in this browser. Please use Chrome or Edge.'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = isTe ? 'te-IN' : isHi ? 'hi-IN' : 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        if (event.error === 'not-allowed') {
          alert(
            isTe
              ? 'దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో మైక్రోఫోన్ అనుమతిని (Microphone Permission) ఆన్ చేయండి.'
              : 'Please enable microphone permissions in your browser address bar to record your voice.'
          );
        }
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (currentText) {
          setInputMessage(currentText);
        }

        // If final sentence detected, automatically convert and dispatch to bot
        if (finalTranscript.trim()) {
          setTimeout(() => {
            handleSendMessage(finalTranscript.trim());
          }, 350);
        }
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // 1. Check for immediate FAQ match
    const lowerQuery = query.toLowerCase();
    const matchedFaq = COMMON_FAQS.find((faq) =>
      faq.keywords.some((k) => lowerQuery.includes(k)) ||
      faq.question.en.toLowerCase().includes(lowerQuery) ||
      faq.question.te.includes(query) ||
      faq.question.hi.includes(query)
    );

    // 2. Check if user wants to raise a ticket
    const ticketTriggers = ['ticket', 'complain', 'query', 'support', 'help', 'ఫిర్యాదు', 'సందేహం', 'టికెట్', 'शिकायत'];
    const isTicketIntent = ticketTriggers.some((t) => lowerQuery.includes(t));

    if (isTicketIntent && !matchedFaq) {
      setTimeout(() => {
        setIsTyping(false);
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: isTe
            ? 'మీ సమస్య లేదా సందేహంపై మా వ్యవసాయ నిపుణుల బృందం సహాయం చేస్తుంది. క్రింది వివరాలు పూరించి తక్షణమే సపోర్ట్ టికెట్ నమోదు చేయండి:'
            : isHi
            ? 'आपकी समस्या या प्रश्न के समाधान हेतु हमारी कृषि टीम तैयार है। कृपया नीचे दिए फॉर्म द्वारा तुरंत टिकट दर्ज करें:'
            : 'Our agricultural experts are ready to assist you. Please fill out the brief form below to raise an official support ticket directly:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'ticket_form',
            title: isTe ? 'సపోర్ట్ టికెట్ నమోదు' : isHi ? 'सहायता टिकट दर्ज करें' : 'Raise Support Ticket',
          },
        };
        setMessages((prev) => [...prev, botReply]);
      }, 500);
      return;
    }

    // 3. Server-side Gemini API call with fallback
    try {
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: isTe ? 'Telugu' : isHi ? 'Hindi' : 'English',
          context: 'krishigreen_floating_bot',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || (isTe ? 'సమాచారం లభించలేదు.' : 'Could not process query.');

        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: matchedFaq?.route
            ? {
                type: 'navigation',
                title: isTe ? matchedFaq.routeLabel?.te || 'వివరాలు చూడండి' : isHi ? matchedFaq.routeLabel?.hi || 'देखें' : matchedFaq.routeLabel?.en || 'View Details',
                route: matchedFaq.route,
                routeLabel: isTe ? matchedFaq.routeLabel?.te : isHi ? matchedFaq.routeLabel?.hi : matchedFaq.routeLabel?.en,
              }
            : undefined,
        };

        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      // Offline / Local knowledge base fallback
      const fallbackText = matchedFaq
        ? isTe ? matchedFaq.answer.te : isHi ? matchedFaq.answer.hi : matchedFaq.answer.en
        : isTe
        ? `మీ ప్రశ్న '${query}' కొరకు, మా టోల్-ఫ్రీ రైతు హెల్ప్‌లైన్ 1800-కృషి-గ్రీన్ (1800-574-7443) ను సంప్రదించండి లేదా క్రింద సపోర్ట్ టికెట్ నమోదు చేయండి.`
        : isHi
        ? `आपके प्रश्न '${query}' के लिए, आप हमारे टोल-फ्री किसान हेल्पलाइन 1800-KRISHI-GRN पर संपर्क कर सकते हैं या टिकट दर्ज कर सकते हैं।`
        : `Regarding '${query}', you can contact our 24×7 toll-free farmer helpline at 1800-KRISHI-GRN or raise a support ticket below.`;

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionCard: matchedFaq?.route
          ? {
              type: 'navigation',
              title: isTe ? matchedFaq.routeLabel?.te || 'పేజీకి వెళ్ళండి' : matchedFaq.routeLabel?.en || 'Go to Page',
              route: matchedFaq.route,
              routeLabel: isTe ? matchedFaq.routeLabel?.te : matchedFaq.routeLabel?.en,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, botReply]);
    } finally {
      setIsTyping(false);
    }
  };

  // Submit in-chat ticket form
  const handleTicketFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.callerName.trim() || !ticketForm.phone.trim()) {
      alert(isTe ? 'దయచేసి పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి' : 'Please enter your name and phone number');
      return;
    }

    setTicketForm((prev) => ({ ...prev, isSubmitting: true }));

    const ticketId = `KG-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: ticketId,
      callerName: ticketForm.callerName,
      phone: ticketForm.phone,
      language: isTe ? 'Telugu' : isHi ? 'Hindi' : 'English',
      category: ticketForm.category,
      query: ticketForm.query || 'Inquiry registered through Krishi Bot',
      status: 'Open',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      priority: 'Normal',
    };

    if (onTicketCreated) {
      await onTicketCreated(newTicket);
    }

    setTicketForm({
      callerName: '',
      phone: '',
      category: 'Waste Collection',
      query: '',
      isSubmitting: false,
    });

    const confirmationReply: ChatMessage = {
      id: `bot-tkt-${Date.now()}`,
      sender: 'bot',
      text: isTe
        ? `ధన్యవాదాలు! మీ సపోర్ట్ టికెట్ #${ticketId} విజయవంతంగా నమోదైంది. మా వ్యవసాయ నిపుణుల బృందం త్వరలోనే మిమ్మల్ని ఫోన్ ద్వారా సంప్రదిస్తుంది.`
        : isHi
        ? `धन्यवाद! आपका सहायता टिकट #${ticketId} सफलतापूर्वक दर्ज हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।`
        : `Thank you! Your support ticket #${ticketId} has been successfully registered. Our regional team will contact you shortly.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionCard: {
        type: 'ticket_confirmed',
        title: `Ticket #${ticketId} Active`,
        ticketData: newTicket,
      },
    };

    setMessages((prev) => [...prev, confirmationReply]);
  };

  return (
    <>
      {/* 
        ======================================================================
        FLOATING TRIGGER BUTTON
        Mounted on top of Support Tickets and Toll-Free Helpline
        Features Small Crop sprout logo with pulsing online indicator
        ======================================================================
      */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-600 text-white rounded-full shadow-xl border-2 border-emerald-400/60 transition-all duration-300 hover:scale-105 cursor-pointer touch-target-44"
          title={isTe ? 'కృషి బోట్ (AI రైతు మిత్ర)' : isHi ? 'कृषि बॉट (AI किसान मित्र)' : 'Krishi Bot (AI Farm Assistant)'}
        >
          {/* Small Crop Logo Badge */}
          <div className="relative w-7 h-7 rounded-full bg-emerald-950/90 border border-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
            <Sprout className="w-4 h-4 text-emerald-300 animate-crop-spin" />
            {/* Online pulsing indicator */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-emerald-900" />
            </span>
          </div>

          <div className="text-left">
            <span className="block text-xs font-black tracking-wide leading-none text-emerald-100">
              {isTe ? 'కృషి బోట్' : isHi ? 'कृषि बॉट' : 'Krishi Bot'}
            </span>
            <span className="text-[10px] text-emerald-200/90 font-medium leading-none">
              {isTe ? '24/7 AI సహాయం' : isHi ? '24/7 AI सहायता' : '24/7 AI Assistant'}
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* 
        ======================================================================
        CHATBOT MODAL PANEL
        ======================================================================
      */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden text-[#17231c] ${
            isExpanded
              ? 'inset-4 sm:inset-10 md:inset-16'
              : 'bottom-5 right-5 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          } animate-fadeIn`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-950 border border-emerald-400/40 flex items-center justify-center relative shadow-xs">
                <Sprout className="w-5 h-5 text-emerald-400 animate-crop-spin" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-emerald-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug">
                    {isTe ? 'కృషి బోట్ (AI రైతు మిత్ర)' : isHi ? 'कृषि बॉट (AI किसान मित्र)' : 'Krishi Bot'}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                    Gemini 3.8
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 leading-none">
                  {isTe
                    ? 'వ్యర్థాల సేకరణ • ఎరువుల ఆర్డర్ • యంత్రాల మార్గదర్శి'
                    : isHi
                    ? 'कचरा संग्रह • खाद ऑर्डर • कृषि सहायता'
                    : 'Smart Guide • Orders • Waste • Tickets'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Selector Pills */}
              {onLanguageChange && (
                <div className="flex items-center gap-1 bg-emerald-950/60 p-0.5 rounded-lg border border-emerald-600/40 mr-1 text-[10px] font-bold">
                  {(['te', 'hi', 'en'] as SupportedLanguage[]).map((langCode) => (
                    <button
                      key={langCode}
                      onClick={() => onLanguageChange(langCode)}
                      className={`px-1.5 py-0.5 rounded transition ${
                        language === langCode
                          ? 'bg-emerald-500 text-emerald-950 font-black'
                          : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      {langCode.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              {/* Reset to Common Topics / Clear Chat */}
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-200 hover:text-white transition cursor-pointer"
                title={isTe ? 'ప్రశ్నల గ్రిడ్‌కు రీసెట్ చేయండి' : isHi ? 'मुख्य विषयों पर रीसेट करें' : 'Reset to Common Topics'}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-200 transition hidden sm:block cursor-pointer"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-200 hover:text-white transition cursor-pointer"
                title="Close Krishi Bot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Bar: Chat / Directions / Tickets */}
          <div className="flex items-center border-b border-gray-100 bg-emerald-50/50 p-1.5 gap-1 shrink-0 text-xs font-bold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                  : 'text-gray-600 hover:bg-emerald-100/50'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isTe ? 'చాట్ & సలహా' : isHi ? 'चैट व सलाह' : 'Chat & Q&A'}</span>
            </button>

            <button
              onClick={() => setActiveTab('directions')}
              className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'directions'
                  ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                  : 'text-gray-600 hover:bg-emerald-100/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isTe ? 'కార్యాచరణ సూచనలు' : isHi ? 'दिशानिर्देश' : 'Operations'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'ticket'
                  ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                  : 'text-gray-600 hover:bg-emerald-100/50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isTe ? 'టికెట్ నమోదు' : isHi ? 'टिकट दर्ज करें' : 'Raise Ticket'}</span>
            </button>
          </div>

          {/* TAB 1: Main Conversational Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Message scroll container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#fbfaf6]">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-fadeIn`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[88%]">
                        {isBot && (
                          <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mb-1">
                            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isBot
                              ? 'bg-white text-gray-900 border border-emerald-100 shadow-2xs rounded-bl-xs'
                              : 'bg-emerald-700 text-white shadow-2xs rounded-br-xs font-medium'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* Action Card Attachment */}
                          {msg.actionCard && (
                            <div className="mt-2.5 pt-2 border-t border-gray-100 space-y-2">
                              {/* Operational Guide Quick Buttons */}
                              {msg.actionCard.type === 'operational_guide' && (
                                <div className="space-y-1.5">
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                    {isTe ? 'తరచుగా అడిగే ప్రశ్నలు:' : 'Suggested Directions:'}
                                  </span>
                                  <div className="flex flex-col gap-1.5">
                                    {COMMON_FAQS.slice(0, 3).map((faq, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleSendMessage(isTe ? faq.question.te : isHi ? faq.question.hi : faq.question.en)}
                                        className="text-left p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 text-emerald-950 text-xs font-bold transition flex items-center justify-between cursor-pointer"
                                      >
                                        <span>{isTe ? faq.question.te : isHi ? faq.question.hi : faq.question.en}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Navigation button */}
                              {msg.actionCard.type === 'navigation' && msg.actionCard.route && (
                                <button
                                  onClick={() => {
                                    setIsOpen(false);
                                    navigateTo(msg.actionCard!.route!);
                                  }}
                                  className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                                >
                                  <span>{msg.actionCard.routeLabel || msg.actionCard.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* In-chat Ticket Shortcut */}
                              {msg.actionCard.type === 'ticket_form' && (
                                <div className="space-y-1.5">
                                  {onOpenTicketsDrawer && ticketCount > 0 && (
                                    <button
                                      onClick={() => onOpenTicketsDrawer()}
                                      className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer touch-target-44"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      <span>{isTe ? `యాక్టివ్ టికెట్లు చూడండి (${ticketCount})` : isHi ? `सक्रिय टिकट देखें (${ticketCount})` : `View Active Tickets (${ticketCount})`}</span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setActiveTab('ticket')}
                                    className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer touch-target-44"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{isTe ? 'కొత్త సపోర్ట్ టికెట్ నమోదు' : isHi ? 'नया टिकट दर्ज करें' : 'Raise Support Ticket'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Footer with Voice Readout */}
                          <div
                            className={`flex items-center justify-between gap-3 mt-1.5 pt-1 text-[10px] ${
                              isBot ? 'text-gray-400' : 'text-emerald-200'
                            }`}
                          >
                            <span>{msg.timestamp}</span>
                            {isBot && (
                              <button
                                onClick={() => speakText(msg.text, msg.id)}
                                className="hover:text-emerald-700 p-0.5 transition cursor-pointer"
                                title="Listen to message aloud"
                              >
                                {speakingMessageId === msg.id ? (
                                  <VolumeX className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* QUICK REPLIES / COMMON TOPICS GRID: Displayed prominently when no conversation has started */}
                {!hasUserStartedConversation && (
                  <div className="pt-2 pb-1 space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-1.5 text-emerald-950 font-extrabold text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {isTe
                            ? 'సాధారణ అంశాలు • త్వరిత ప్రత్యుత్తరాలు'
                            : isHi
                            ? 'त्वरित प्रत्युत्तर एवं मुख्य विषय'
                            : 'Quick Replies & Common Topics'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        {isTe ? 'ఒక్క ట్యాప్‌తో తక్షణ సమాధానం' : isHi ? 'एक टैप में उत्तर' : '1-Tap Instant Responses'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_TOPICS.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleQuickTopicSelect(topic.id)}
                          className="flex flex-col text-left p-3 rounded-2xl bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-emerald-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition group justify-between cursor-pointer touch-target-44 min-h-[66px]"
                        >
                          <div className="flex items-start justify-between gap-1 w-full mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 group-hover:bg-emerald-700 group-hover:text-white transition shrink-0">
                                {topic.icon}
                              </span>
                              <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-950 leading-snug truncate">
                                {isTe ? topic.title.te : isHi ? topic.title.hi : topic.title.en}
                              </span>
                            </div>
                            {topic.badge && (
                              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-600 text-white shrink-0 ml-1">
                                {topic.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium w-full mt-1 pt-1 border-t border-gray-100">
                            <span className="truncate pr-1">
                              {isTe ? topic.desc.te : isHi ? topic.desc.hi : topic.desc.en}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-emerald-100 shadow-2xs w-max text-xs text-emerald-800 font-mono animate-fadeIn">
                    <InlineCropSpinner className="w-4 h-4" />
                    <span>{isTe ? 'కృషి బోట్ ఆలోచిస్తోంది...' : isHi ? 'कृषि बॉट सोच रहा है...' : 'Krishi Bot is researching...'}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Real-time typing autocomplete suggestions */}
              {filteredSuggestions.length > 0 && (
                <div className="p-2 bg-emerald-50 border-t border-emerald-200/80 max-h-32 overflow-y-auto space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 px-1 uppercase tracking-wider block">
                    {isTe ? 'సూచించిన ప్రశ్నలు:' : 'Suggested Matches:'}
                  </span>
                  {filteredSuggestions.slice(0, 3).map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(isTe ? faq.question.te : isHi ? faq.question.hi : faq.question.en)}
                      className="w-full text-left p-1.5 px-2.5 rounded-lg bg-white hover:bg-emerald-100 text-xs text-gray-800 font-semibold transition truncate flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{isTe ? faq.question.te : isHi ? faq.question.hi : faq.question.en}</span>
                      <ArrowRight className="w-3 h-3 text-emerald-700 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Compact Quick Topic Chips: Available during active chat */}
              {hasUserStartedConversation && !isTyping && (
                <div className="px-3 py-1.5 bg-emerald-50/70 border-t border-emerald-100 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    {isTe ? 'అంశాలు:' : isHi ? 'विषय:' : 'Topics:'}
                  </span>
                  {QUICK_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleQuickTopicSelect(topic.id)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/90 border border-emerald-200 text-emerald-950 text-[11px] font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer touch-target-44"
                    >
                      <span className="scale-90">{topic.icon}</span>
                      <span>{isTe ? topic.title.te : isHi ? topic.title.hi : topic.title.en}</span>
                      {topic.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-700 text-white font-black">
                          {topic.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Bar with Embedded Microphone inside field */}
              <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={
                      isListening
                        ? isTe
                          ? 'మీ స్వరాన్ని వింటున్నాను... మాట్లాడండి...'
                          : isHi
                          ? 'आपकी आवाज सुन रहे हैं... बोलिए...'
                          : 'Listening to your voice... speak now...'
                        : isTe
                        ? 'ప్రశ్న టైప్ చేయండి లేదా మైక్ నొక్కండి...'
                        : isHi
                        ? 'प्रश्न टाइप करें या माइक दबाकर बोलें...'
                        : 'Ask question or tap mic inside field...'
                    }
                    className={`w-full bg-gray-50 border rounded-xl pl-3.5 pr-11 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                      isListening
                        ? 'border-red-400 ring-2 ring-red-400/30 bg-red-50/20 placeholder-red-600 font-semibold'
                        : 'border-gray-200 focus:ring-2 focus:ring-emerald-500'
                    }`}
                  />

                  {/* Microphone Button INSIDE the Input Field */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition cursor-pointer flex items-center justify-center touch-target-44 ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse shadow-sm'
                        : 'text-gray-400 hover:text-emerald-700 hover:bg-emerald-100/60'
                    }`}
                    title={
                      isListening
                        ? isTe ? 'రికార్డింగ్ ఆపు' : 'Stop voice recording'
                        : isTe ? 'వాయిస్ ద్వారా మాట్లాడండి' : 'Record voice to text'
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4 text-white" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition cursor-pointer shadow-xs touch-target-44 flex items-center justify-center shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Operational Directions & Step-by-Step Guidance */}
          {activeTab === 'directions' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fbfaf6]">
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-gray-900">
                  {isTe ? 'వెబ్‌సైట్ కార్యాచరణ సహాయ మార్గదర్శి' : isHi ? 'प्लेटफॉर्म संचालन दिशानिर्देश' : 'Platform Operations & Support'}
                </h4>
                <p className="text-xs text-gray-500">
                  {isTe
                    ? 'ఎలా ఆర్డర్ చేయాలి, వ్యర్థాలు ఎలా అందించాలి మరియు యంత్రాల బుకింగ్ వివరాలు.'
                    : 'Clear step-by-step directions on how to order, request pickups, and book equipment.'}
                </p>
              </div>

              {/* Guide 1: How to order AGA Fertilizer */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                    {isTe ? '1. AGA సేంద్రీయ ఎరువును ఎలా ఆర్డర్ చేయాలి?' : isHi ? '1. एजीए जैविक खाद कैसे ऑर्डर करें?' : '1. How to Order AGA Fertilizer'}
                  </h5>
                </div>
                <ol className="text-xs text-gray-600 space-y-1.5 list-decimal pl-5 leading-relaxed">
                  <li>{isTe ? 'మీ పొలం విస్తీర్ణం (ఎకరాలు) మరియు పంటను ఎంచుకోండి.' : 'Specify your crop and farm acreage to calculate exact bags.'}</li>
                  <li>{isTe ? '50kg బ్యాగుల సంఖ్య మరియు గ్రామ డెలివరీ చిరునామా నమోదు చేయండి.' : 'Enter your contact number and village delivery location.'}</li>
                  <li>{isTe ? 'ఆర్డర్ ధృవీకరణ మరియు ల్యాబ్ సర్టిఫికెట్ SMS ద్వారా అందుతుంది.' : 'Receive booking ID with verified FCO 1985 quality report.'}</li>
                </ol>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo(APP_ROUTES.AGA);
                  }}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isTe ? 'AGA ఎరువు పేజీకి వెళ్లండి' : 'Go to AGA Fertilizer Order'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Guide 2: How to Request Waste Collection */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                    {isTe ? '2. వ్యర్థాల సేకరణ ఎలా అభ్యర్థించాలి?' : isHi ? '2. कचरा संग्रह अनुरोध कैसे करें?' : '2. How to Request Waste Pickup'}
                  </h5>
                </div>
                <ol className="text-xs text-gray-600 space-y-1.5 list-decimal pl-5 leading-relaxed">
                  <li>{isTe ? 'పంట అవశేషాలు (వరి గడ్డి/మిరప) లేదా కూరగాయల వ్యర్థాలు ఎంచుకోండి.' : 'Select waste category (crop residues, mandi waste, kitchen waste).'}</li>
                  <li>{isTe ? 'వాహనం మీ గ్రామానికి వచ్చి డిజిటల్ కాటా ద్వారా బరువు వేస్తుంది.' : 'Our collection logistics weigh the biomass on calibrated scales.'}</li>
                  <li>{isTe ? 'టన్నుకు ₹750 చొప్పున నేరుగా DBT ద్వారా నగదు మీ ఖాతాకు చేరుతుంది.' : 'Instant ₹750/MT payment is credited directly via DBT.'}</li>
                </ol>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo(APP_ROUTES.WASTE_MANAGEMENT);
                  }}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isTe ? 'వ్యర్థాల సేకరణ పేజీకి వెళ్లండి' : 'Request Waste Pickup'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Guide 3: How to Rent Equipment */}
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <Tractor className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-xs sm:text-sm text-gray-900">
                    {isTe ? '3. వ్యవసాయ యంత్రాలు ఎలా అద్దెకు తీసుకోవాలి?' : isHi ? '3. कृषि यंत्र कैसे किराए पर लें?' : '3. How to Rent Equipment'}
                  </h5>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {isTe
                    ? 'కస్టమ్ హైరింగ్ కేంద్రాల (CHC) ద్వారా ట్రాక్టర్లు, స్ట్రా బేలర్లు మరియు వేస్ట్ ష్రెడ్డర్లను 50% రాయితీతో అద్దెకు పొందవచ్చు.'
                    : 'Rent certified balers, tractors, and shredders with trained operators and zero deposit from local CHC hubs.'}
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo(APP_ROUTES.EQUIPMENT_HUB);
                  }}
                  className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isTe ? 'యంత్రాల హబ్ తెరవండి' : 'Open Equipment Hub'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: In-Chat Support Ticket Creation */}
          {activeTab === 'ticket' && (
            <div className="flex-1 overflow-y-auto p-4 bg-[#fbfaf6]">
              <form onSubmit={handleTicketFormSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>{isTe ? 'సపోర్ట్ టికెట్ నమోదు ఫారమ్' : isHi ? 'सहायता टिकट फॉर्म' : 'Register Support Ticket'}</span>
                  </h4>
                  <p className="text-xs text-gray-500">
                    {isTe
                      ? 'మీ సందేహం లేదా ఫిర్యాదును నమోదు చేయండి. మా స్థానిక KVK బృందం 24 గంటల్లో సహాయం చేస్తుంది.'
                      : 'File your inquiry or grievance. Our regional agronomist desk will call back within 24 hours.'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">
                    {isTe ? 'రైతు / మీ పేరు:' : 'Farmer / Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.callerName}
                    onChange={(e) => setTicketForm({ ...ticketForm, callerName: e.target.value })}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">
                    {isTe ? 'మొబైల్ ఫోన్ నంబర్:' : 'Mobile Phone Number:'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      placeholder="9848022338"
                      className="w-full bg-white border border-emerald-300 rounded-xl pl-11 pr-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">
                    {isTe ? 'సమస్య విభాగం:' : 'Issue Category:'}
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value as any })}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  >
                    <option value="Waste Collection">{isTe ? 'వ్యర్థాల సేకరణ (Waste Collection)' : 'Waste Collection'}</option>
                    <option value="Crop Advice">{isTe ? 'పంట సలహా (Crop Advice)' : 'Crop Advice'}</option>
                    <option value="Equipment Breakdown">{isTe ? 'యంత్రాలు & అద్దె (Equipment / Machinery)' : 'Equipment / Machinery'}</option>
                    <option value="Government Subsidy">{isTe ? 'సబ్సిడీలు & DBT (Subsidy / DBT)' : 'Government Subsidy / DBT'}</option>
                    <option value="Mandi Prices">{isTe ? 'మార్కెట్ ధరలు (Mandi Prices)' : 'Mandi Prices'}</option>
                    <option value="Pest Emergency">{isTe ? 'పురుగు / తెగులు అత్యవసరం (Pest Emergency)' : 'Pest Emergency'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">
                    {isTe ? 'సమస్య వివరాలు:' : 'Query / Grievance Details:'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={ticketForm.query}
                    onChange={(e) => setTicketForm({ ...ticketForm, query: e.target.value })}
                    placeholder={
                      isTe
                        ? 'మీ సమస్య లేదా అభ్యర్థన వివరంగా రాయండి...'
                        : 'Explain your question, waste pickup delay, or fertilizer requirement...'
                    }
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ticketForm.isSubmitting}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {ticketForm.isSubmitting ? (
                    <InlineCropSpinner className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {ticketForm.isSubmitting
                      ? isTe ? 'నమోదు అవుతోంది...' : 'Registering Ticket...'
                      : isTe ? 'టికెట్ సమర్పించండి' : 'Submit Support Ticket'}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* Footer Bar: Toll-Free Helpline Link */}
          <div className="bg-gray-50 border-t border-gray-100 p-2.5 px-4 flex items-center justify-between text-xs shrink-0">
            <span className="text-[11px] text-gray-500">
              {isTe ? 'అత్యవసర సహాయం కావాలా?' : 'Need direct phone support?'}
            </span>
            <a
              href="tel:18005747443"
              className="font-bold text-emerald-800 hover:underline flex items-center gap-1 text-[11px]"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>1800-KRISHI-GRN</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
