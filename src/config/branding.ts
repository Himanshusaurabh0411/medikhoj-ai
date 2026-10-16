export interface AppConfig {
  name: string;
  tagline: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  version: string;
  emergencyNumber: string;
  poisonControlTollFree: string;
  poisonControlAiims: string;
  contactEmail: string;
  colors: {
    primary: string;
    primaryDark: string;
    tealAccent: string;
    emeraldSafe: string;
    amberWarning: string;
    roseDanger: string;
  };
  navigation: {
    key: string;
    path: string;
    labelEn: string;
    labelHi: string;
    icon: string;
  }[];
}

export const APP_CONFIG: AppConfig = {
  name: "MediKhoj",
  tagline: {
    en: "Know Your Medicine. Compare Smarter. Stay Safer.",
    hi: "अपनी दवा को जानें। समझदारी से तुलना करें। सुरक्षित रहें।",
  },
  description: {
    en: "Independent Indian medicine intelligence & substitute discovery platform: search verified Indian medicines, find affordable bio-equivalent substitutes, scan packaging barcodes, and compare per-tablet unit prices.",
    hi: "स्वतंत्र भारतीय दवा सूचना एवं विकल्प खोज मंच: सत्यापित भारतीय दवाएं खोजें, किफायती बायो-इक्विवेलेंट विकल्प प्राप्त करें, बारकोड स्कैन करें और प्रति टैबलेट कीमतों की तुलना करें।",
  },
  version: "1.0.0-production",
  emergencyNumber: "112",
  poisonControlTollFree: "1800-116-117",
  poisonControlAiims: "011-26589391",
  contactEmail: "safety@medikhoj.in",
  colors: {
    primary: "#090E17",
    primaryDark: "#0C121E",
    tealAccent: "#0C5134",
    emeraldSafe: "#1A8258",
    amberWarning: "#D9480F",
    roseDanger: "#C8162A",
  },
  navigation: [
    { key: "home", path: "/", labelEn: "Home", labelHi: "होम", icon: "Home" },
    { key: "search", path: "/search", labelEn: "Search Medicines", labelHi: "दवा खोजें", icon: "Search" },
    { key: "compare", path: "/compare", labelEn: "Compare Prices", labelHi: "कीमत तुलना", icon: "Scale" },
    { key: "generics", path: "/generics", labelEn: "Affordable Substitutes", labelHi: "किफायती विकल्प", icon: "ShieldCheck" },
    { key: "scan", path: "/scan", labelEn: "Scan Packaging", labelHi: "पैकेजिंग स्कैन", icon: "ScanLine" },
    { key: "safety", path: "/safety", labelEn: "Medicine Safety", labelHi: "दवा सुरक्षा", icon: "AlertTriangle" },
    { key: "symptoms", path: "/symptom-guide", labelEn: "Symptom Guide", labelHi: "लक्षण गाइड", icon: "HeartPulse" },
    { key: "cabinet", path: "/cabinet", labelEn: "Saved Medicines", labelHi: "मेरी दवाएं", icon: "Bookmark" },
    { key: "importers", path: "/data-sources", labelEn: "Price Ceilings", labelHi: "मूल्य सीमाएं", icon: "Database" },
    { key: "about", path: "/about", labelEn: "About & Disclaimer", labelHi: "अस्वीकरण", icon: "Info" },
  ],
};
