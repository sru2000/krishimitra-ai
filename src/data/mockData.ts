export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Region {
  id: string;
  name: string;
  state: "Andhra Pradesh" | "Telangana";
  lat: number;
  lng: number;
  priorityScore: number;
  risk: RiskLevel;
  crops: string[];
  rainfall: number;
  humidity: number;
  temp: number;
  pestRisk: number;
  outbreak?: string;
}

export const regions: Region[] = [
  { id: "r1", name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, priorityScore: 94, risk: "critical", crops: ["Chilli", "Cotton"], rainfall: 42, humidity: 86, temp: 31, pestRisk: 88, outbreak: "Thrips outbreak" },
  { id: "r2", name: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941, priorityScore: 87, risk: "high", crops: ["Cotton", "Rice"], rainfall: 38, humidity: 81, temp: 30, pestRisk: 74, outbreak: "Pink bollworm" },
  { id: "r3", name: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514, priorityScore: 78, risk: "high", crops: ["Chilli", "Maize"], rainfall: 51, humidity: 84, temp: 29, pestRisk: 69 },
  { id: "r4", name: "Kurnool", state: "Andhra Pradesh", lat: 15.8281, lng: 78.0373, priorityScore: 62, risk: "medium", crops: ["Cotton", "Maize"], rainfall: 22, humidity: 64, temp: 33, pestRisk: 41 },
  { id: "r5", name: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0941, priorityScore: 55, risk: "medium", crops: ["Rice", "Maize"], rainfall: 33, humidity: 72, temp: 28, pestRisk: 38 },
  { id: "r6", name: "Krishna", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, priorityScore: 71, risk: "high", crops: ["Rice", "Chilli"], rainfall: 47, humidity: 83, temp: 30, pestRisk: 65, outbreak: "Blast disease" },
  { id: "r7", name: "Nalgonda", state: "Telangana", lat: 17.0542, lng: 79.2671, priorityScore: 48, risk: "medium", crops: ["Cotton", "Rice"], rainfall: 28, humidity: 68, temp: 31, pestRisk: 35 },
  { id: "r8", name: "Anantapur", state: "Andhra Pradesh", lat: 14.6819, lng: 77.6006, priorityScore: 34, risk: "low", crops: ["Maize", "Cotton"], rainfall: 14, humidity: 52, temp: 35, pestRisk: 22 },
];

export const kpis = [
  { label: "Active Field Reps", value: "248", delta: "+12%", trend: "up" as const, hint: "vs last week" },
  { label: "Priority Regions", value: "17", delta: "+3", trend: "up" as const, hint: "high & critical" },
  { label: "Open Advisories", value: "1,284", delta: "−8%", trend: "down" as const, hint: "resolved today" },
  { label: "Forecast Accuracy", value: "94.2%", delta: "+1.4%", trend: "up" as const, hint: "30-day rolling" },
];

export const weeklyWeather = [
  { day: "Mon", rainfall: 12, humidity: 72, temp: 30 },
  { day: "Tue", rainfall: 18, humidity: 78, temp: 29 },
  { day: "Wed", rainfall: 32, humidity: 84, temp: 28 },
  { day: "Thu", rainfall: 41, humidity: 86, temp: 27 },
  { day: "Fri", rainfall: 28, humidity: 82, temp: 28 },
  { day: "Sat", rainfall: 16, humidity: 75, temp: 30 },
  { day: "Sun", rainfall: 9, humidity: 70, temp: 31 },
];

export const cropMix = [
  { name: "Chilli", value: 34, color: "var(--color-chart-4)" },
  { name: "Cotton", value: 28, color: "var(--color-chart-1)" },
  { name: "Rice", value: 22, color: "var(--color-chart-2)" },
  { name: "Maize", value: 16, color: "var(--color-chart-3)" },
];

export const salesTrend = [
  { month: "Apr", fungicide: 240, insecticide: 320, fertilizer: 510 },
  { month: "May", fungicide: 280, insecticide: 360, fertilizer: 540 },
  { month: "Jun", fungicide: 410, insecticide: 380, fertilizer: 620 },
  { month: "Jul", fungicide: 520, insecticide: 450, fertilizer: 700 },
  { month: "Aug", fungicide: 610, insecticide: 510, fertilizer: 680 },
  { month: "Sep", fungicide: 740, insecticide: 590, fertilizer: 720 },
];

export const pestRiskRadar = [
  { factor: "Humidity", value: 86 },
  { factor: "Rainfall", value: 72 },
  { factor: "Temp", value: 58 },
  { factor: "Crop stage", value: 80 },
  { factor: "History", value: 65 },
  { factor: "Density", value: 74 },
];

export interface Recommendation {
  id: string;
  region: string;
  crop: string;
  title: string;
  product: string;
  reason: string;
  confidence: number;
  urgency: RiskLevel;
}

export const recommendations: Recommendation[] = [
  { id: "rec1", region: "Guntur", crop: "Chilli", title: "Apply systemic fungicide", product: "Amistar Top 325 SC", reason: "Humidity at 86% combined with thrips outbreak signals 78% probability of fungal co-infection within 72h.", confidence: 92, urgency: "critical" },
  { id: "rec2", region: "Warangal", crop: "Cotton", title: "Pink bollworm pheromone traps", product: "PB Knot + Ampligo", reason: "Larval count exceeds economic threshold; forecast favors moth flight peak Thu–Sat.", confidence: 88, urgency: "high" },
  { id: "rec3", region: "Krishna", crop: "Rice", title: "Preventive blast spray", product: "Amistar 250 SC", reason: "Continuous leaf wetness >10h + nighttime temp 22–26°C matches blast risk window.", confidence: 84, urgency: "high" },
  { id: "rec4", region: "Khammam", crop: "Maize", title: "Foliar nutrition boost", product: "Isabion + Zn", reason: "V8 stage detected, low Zn in soil scan, rainfall forecast supports uptake.", confidence: 76, urgency: "medium" },
  { id: "rec5", region: "Kurnool", crop: "Cotton", title: "Defer irrigation 48h", product: "—", reason: "Forecast rainfall 22mm Wed; current soil moisture adequate at 38% VWC.", confidence: 81, urgency: "medium" },
];

export interface InventoryItem {
  sku: string;
  product: string;
  category: "Fungicide" | "Insecticide" | "Fertilizer" | "Seed";
  stock: number;
  reorder: number;
  weekSales: number;
  status: "ok" | "low" | "critical";
}

export const inventory: InventoryItem[] = [
  { sku: "SY-AMI-325", product: "Amistar Top 325 SC", category: "Fungicide", stock: 142, reorder: 200, weekSales: 86, status: "low" },
  { sku: "SY-AMP-150", product: "Ampligo 150 ZC", category: "Insecticide", stock: 58, reorder: 150, weekSales: 64, status: "critical" },
  { sku: "SY-ISA-100", product: "Isabion 1L", category: "Fertilizer", stock: 412, reorder: 250, weekSales: 92, status: "ok" },
  { sku: "SY-CRU-480", product: "Cruiser 480 FS", category: "Insecticide", stock: 224, reorder: 200, weekSales: 38, status: "ok" },
  { sku: "SY-FOR-525", product: "Force 1.5G", category: "Insecticide", stock: 89, reorder: 180, weekSales: 71, status: "low" },
  { sku: "SY-NK-66", product: "NK 6240 Maize Seed", category: "Seed", stock: 36, reorder: 120, weekSales: 28, status: "critical" },
];

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  acres: number;
  crops: string[];
  lastVisit: string;
  riskScore: number;
  preferredLang: "en" | "te" | "hi";
}

export const farmers: Farmer[] = [
  { id: "f1", name: "Ravi Kumar", village: "Tenali", district: "Guntur", acres: 8, crops: ["Chilli"], lastVisit: "2 days ago", riskScore: 88, preferredLang: "te" },
  { id: "f2", name: "Suresh Reddy", village: "Hanamkonda", district: "Warangal", acres: 12, crops: ["Cotton", "Rice"], lastVisit: "5 days ago", riskScore: 74, preferredLang: "te" },
  { id: "f3", name: "Lakshmi Devi", village: "Vijayawada", district: "Krishna", acres: 5, crops: ["Rice"], lastVisit: "1 day ago", riskScore: 65, preferredLang: "te" },
  { id: "f4", name: "Mahesh Yadav", village: "Sathupalli", district: "Khammam", acres: 15, crops: ["Maize", "Chilli"], lastVisit: "1 week ago", riskScore: 58, preferredLang: "hi" },
  { id: "f5", name: "Anjali Sharma", village: "Adoni", district: "Kurnool", acres: 6, crops: ["Cotton"], lastVisit: "3 days ago", riskScore: 42, preferredLang: "hi" },
  { id: "f6", name: "Venkatesh Naidu", village: "Bodhan", district: "Nizamabad", acres: 9, crops: ["Rice", "Maize"], lastVisit: "4 days ago", riskScore: 38, preferredLang: "te" },
];

export const advisories: Record<string, { en: string; te: string; hi: string }> = {
  chilliFungal: {
    en: "High humidity and thrips activity detected. Spray Amistar Top 325 SC at 1ml/L within 48 hours. Re-inspect leaves in 5 days.",
    te: "అధిక తేమ మరియు థ్రిప్స్ ఉధృతి గుర్తించబడింది. 48 గంటలలోపు అమిస్టార్ టాప్ 325 SC ను లీటరుకు 1ml చొప్పున పిచికారీ చేయండి. 5 రోజుల్లో ఆకులను తిరిగి పరిశీలించండి.",
    hi: "उच्च आर्द्रता और थ्रिप्स गतिविधि देखी गई है। 48 घंटों के भीतर अमिस्टार टॉप 325 SC का 1ml/लीटर छिड़काव करें। 5 दिनों में पत्तियों का पुनः निरीक्षण करें।",
  },
  cottonBollworm: {
    en: "Pink bollworm larval count above threshold. Install PB Knot pheromone dispensers and spray Ampligo 150 ZC at 80ml/acre.",
    te: "పింక్ బోల్‌వర్మ్ లార్వా సంఖ్య పరిమితిని మించింది. PB నాట్ ఫెరోమోన్ డిస్పెన్సర్‌లను అమర్చండి మరియు ఎకరానికి 80ml ఆంప్లిగో 150 ZC పిచికారీ చేయండి.",
    hi: "गुलाबी सूंडी की संख्या सीमा से अधिक है। PB नॉट फेरोमोन डिस्पेंसर लगाएं और 80ml/एकड़ की दर से एम्प्लिगो 150 ZC का छिड़काव करें।",
  },
  riceBlast: {
    en: "Leaf wetness and night temperatures favor blast. Apply preventive Amistar 250 SC at 200ml/acre before tillering ends.",
    te: "ఆకుల తేమ మరియు రాత్రి ఉష్ణోగ్రతలు బ్లాస్ట్‌కు అనుకూలంగా ఉన్నాయి. టిల్లరింగ్ ముగియక ముందే ఎకరానికి 200ml అమిస్టార్ 250 SC ముందస్తుగా వేయండి.",
    hi: "पत्तियों की नमी और रात्रि तापमान ब्लास्ट के अनुकूल हैं। कल्ले निकलने से पहले 200ml/एकड़ अमिस्टार 250 SC का निवारक छिड़काव करें।",
  },
};

export const riskColor = (risk: RiskLevel) => {
  switch (risk) {
    case "critical": return "var(--color-destructive)";
    case "high": return "var(--color-warning)";
    case "medium": return "var(--color-info)";
    case "low": return "var(--color-success)";
  }
};
