export type RiskLevel = 'low' | 'medium' | 'high';

export interface Plot {
  id: string;
  name: string;
  crop: string;
  stage: string;
  area: string;
  health: number;
  status: 'healthy' | 'attention' | 'high-risk';
  lastScanned: string;
  teluguName: string;
}

export interface ForecastHour {
  hour: string;
  risk: number;
  humidity: number;
  rainfall: number;
  temperature: number;
  soilMoisture: number;
  condition: 'sunny' | 'cloudy' | 'rain' | 'humid';
  diseaseRisk: number;
}

export interface FarmPlan {
  bestIrrigationTime: string;
  rainPrediction: string;
  rainProbability: number;
  checklist: { id: string; task: string; teluguTask: string; done: boolean }[];
}

export interface DiseaseResult {
  disease: string;
  teluguName: string;
  confidence: number;
  severity: RiskLevel;
  crop: string;
  affectedArea: string;
  explanation: string;
  actions: { id: string; action: string; teluguAction: string; urgency: 'now' | 'today' | 'this-week' }[];
}

export interface PestHotspot {
  id: string;
  crop: string;
  disease: string;
  distance: string;
  reports: number;
  severity: RiskLevel;
  timeAgo: string;
  x: number;
  y: number;
}

export interface SoilReading {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export const farmer = {
  name: 'Ramesh',
  teluguName: 'రమేష్',
  village: 'Pallakonda Village, Srikakulam',
  plotsCount: 5,
  totalArea: '12.5 acres',
};

export const plots: Plot[] = [
  { id: 'p1', name: 'Plot A – North Field', crop: 'Tomato', teluguName: 'టొమాటో', stage: 'Flowering', area: '3.2 acres', health: 82, status: 'healthy', lastScanned: '2 hours ago' },
  { id: 'p2', name: 'Plot B – East Field', crop: 'Tomato', teluguName: 'టొమాటో', stage: 'Vegetative', area: '2.8 acres', health: 64, status: 'attention', lastScanned: '5 hours ago' },
  { id: 'p3', name: 'Plot C – South Field', crop: 'Chilli', teluguName: 'మిరప', stage: 'Fruiting', area: '2.0 acres', health: 38, status: 'high-risk', lastScanned: '1 hour ago' },
  { id: 'p4', name: 'Plot D – Riverside', crop: 'Rice', teluguName: 'వరి', stage: 'Tillering', area: '3.5 acres', health: 91, status: 'healthy', lastScanned: '1 day ago' },
  { id: 'p5', name: 'Plot E – Backyard', crop: 'Tomato', teluguName: 'టొమాటో', stage: 'Seedling', area: '1.0 acres', health: 71, status: 'attention', lastScanned: '3 hours ago' },
];

export const farmSummary = {
  healthy: 2,
  attention: 2,
  highRisk: 1,
};

export const forecast72h: ForecastHour[] = [
  { hour: 'Now', risk: 35, humidity: 68, rainfall: 0, temperature: 31, soilMoisture: 54, condition: 'sunny', diseaseRisk: 30 },
  { hour: '+6h', risk: 42, humidity: 72, rainfall: 0, temperature: 29, soilMoisture: 55, condition: 'humid', diseaseRisk: 38 },
  { hour: '+12h', risk: 55, humidity: 78, rainfall: 2, temperature: 27, soilMoisture: 58, condition: 'cloudy', diseaseRisk: 52 },
  { hour: '+18h', risk: 68, humidity: 84, rainfall: 8, temperature: 25, soilMoisture: 64, condition: 'rain', diseaseRisk: 66 },
  { hour: '+24h', risk: 75, humidity: 88, rainfall: 12, temperature: 24, soilMoisture: 70, condition: 'rain', diseaseRisk: 74 },
  { hour: '+30h', risk: 72, humidity: 85, rainfall: 6, temperature: 25, soilMoisture: 68, condition: 'rain', diseaseRisk: 70 },
  { hour: '+36h', risk: 64, humidity: 80, rainfall: 3, temperature: 27, soilMoisture: 63, condition: 'cloudy', diseaseRisk: 60 },
  { hour: '+42h', risk: 52, humidity: 74, rainfall: 1, temperature: 28, soilMoisture: 58, condition: 'humid', diseaseRisk: 48 },
  { hour: '+48h', risk: 45, humidity: 70, rainfall: 0, temperature: 30, soilMoisture: 55, condition: 'sunny', diseaseRisk: 40 },
  { hour: '+54h', risk: 40, humidity: 66, rainfall: 0, temperature: 31, soilMoisture: 53, condition: 'sunny', diseaseRisk: 36 },
  { hour: '+60h', risk: 38, humidity: 64, rainfall: 0, temperature: 32, soilMoisture: 51, condition: 'sunny', diseaseRisk: 34 },
  { hour: '+72h', risk: 35, humidity: 62, rainfall: 0, temperature: 33, soilMoisture: 49, condition: 'sunny', diseaseRisk: 32 },
];

export const farmPlan: FarmPlan = {
  bestIrrigationTime: 'Tomorrow, 6:00 AM – 7:30 AM',
  rainPrediction: 'Rain expected tonight after 9 PM',
  rainProbability: 72,
  checklist: [
    { id: 'c1', task: 'Inspect Plot C for blight spread', teluguTask: 'ప్లాట్ Cలో బ్లైట్ వ్యాప్తి తనిఖీ చేయండి', done: false },
    { id: 'c2', task: 'Apply organic fungicide to Plot B', teluguTask: 'ప్లాట్ Bకు సేంద్రీయ ఫంగసైడ్ పూయండి', done: false },
    { id: 'c3', task: 'Skip irrigation for Plot A (rain expected)', teluguTask: 'ప్లాట్ Aకు నీటి పాట వద్దు (వర్షం అవకాశం)', done: true },
    { id: 'c4', task: 'Check drainage in Plot D', teluguTask: 'ప్లాట్ Dలో డ్రైనేజ్ తనిఖీ చేయండి', done: false },
  ],
};

export const diseaseResult: DiseaseResult = {
  disease: 'Early Blight',
  teluguName: 'ముందస్తు ఆకుమచ్చ',
  confidence: 91,
  severity: 'high',
  crop: 'Tomato',
  affectedArea: 'Lower leaves, Plot C',
  explanation:
    'Early Blight is caused by the fungus Alternaria solani. The scan detected characteristic concentric-ring lesions on older leaves. Combined with high humidity (84%) and above-ideal soil moisture in your area, conditions are highly favorable for rapid spread over the next 48–72 hours.',
  actions: [
    { id: 'a1', action: 'Remove and destroy affected lower leaves immediately', teluguAction: 'ప్రభావితమైన ఆకులను తీసివేసి నాశనం చేయండి', urgency: 'now' },
    { id: 'a2', action: 'Apply copper-based organic fungicide spray', teluguAction: 'రాగి ఆధారిత సేంద్రీయ ఫంగసైడ్ స్ప్రే చేయండి', urgency: 'today' },
    { id: 'a3', action: 'Improve air circulation by pruning dense foliage', teluguAction: 'దట్టమైన ఆకులను కత్తిరించి గాలి ప్రసరణ మెరుగుపరచండి', urgency: 'this-week' },
    { id: 'a4', action: 'Avoid overhead irrigation; use drip line', teluguAction: 'పైనుండి నీటి పాట మానుకోండి; డ్రిప్ లైన్ వాడండి', urgency: 'this-week' },
  ],
};

export const riskExplain = [
  { factor: 'High humidity expected', detail: 'Humidity will reach 88% in next 24 hours', icon: 'droplets' },
  { factor: 'Leaf scan shows early symptoms', detail: '91% confidence match for Early Blight', icon: 'scan' },
  { factor: 'Soil moisture above ideal range', detail: 'Current 70% vs ideal 45–55%', icon: 'soil' },
  { factor: 'Nearby farms reported similar symptoms', detail: '3 reports within 5 km in last 48h', icon: 'map' },
];

export const pestHotspots: PestHotspot[] = [
  { id: 'h1', crop: 'Tomato', disease: 'Early Blight', distance: '1.2 km', reports: 4, severity: 'high', timeAgo: '6h ago', x: 35, y: 42 },
  { id: 'h2', crop: 'Chilli', disease: 'Leaf Curl', distance: '2.8 km', reports: 2, severity: 'medium', timeAgo: '12h ago', x: 58, y: 28 },
  { id: 'h3', crop: 'Rice', disease: 'Blast', distance: '4.5 km', reports: 1, severity: 'low', timeAgo: '20h ago', x: 22, y: 65 },
  { id: 'h4', crop: 'Tomato', disease: 'Late Blight', distance: '3.1 km', reports: 3, severity: 'high', timeAgo: '8h ago', x: 68, y: 58 },
  { id: 'h5', crop: 'Cotton', disease: 'Boll Rot', distance: '5.0 km', reports: 1, severity: 'medium', timeAgo: '18h ago', x: 45, y: 75 },
];

export const soilReading: SoilReading = {
  moisture: 70,
  temperature: 26,
  ph: 6.4,
  nitrogen: 42,
  phosphorus: 28,
  potassium: 35,
};

export const irrigationRecommendation = {
  recommended: true,
  time: 'Tomorrow, 6:00 AM – 7:30 AM',
  duration: '90 minutes',
  waterSaving: '35%',
  reason: 'Rain expected tonight — skip today to save 4,200L of water',
  teluguReason: 'ఈ రాత్రి వర్షం అవకాశం — నేడు నీటి పాట మానుకోండి, 4,200L నీరు ఆదా అవుతుంది',
};

export const voiceConversation = [
  { speaker: 'farmer', text: 'Ee roju neellu pettala?', telugu: 'ఈ రోజు నీళ్లు పెట్టాలా?', translation: 'Should I irrigate today?' },
  { speaker: 'assistant', text: 'Repu udhayam 6 nunchi 7:30 madhya irrigation cheyyandi. Ee rathri varsham chance undi.', telugu: 'రేపు ఉదయం 6 నుండి 7:30 మధ్య ఇరిగేషన్ చేయండి. ఈ రాత్రి వర్షం అవకాశం ఉంది.', translation: 'Irrigate tomorrow between 6 AM and 7:30 AM. Rain is likely tonight.' },
];

export const howItWorks = [
  { step: 1, title: 'Scan Your Crop', teluguTitle: 'మీ పంటను స్కాన్ చేయండి', desc: 'Snap a photo of any leaf or connect your IoT soil sensor. RythuRaksha analyzes it instantly.', icon: 'scan' },
  { step: 2, title: 'Get 72-Hour Forecast', teluguTitle: '72 గంటల అంచనా', desc: 'We combine weather, soil, and nearby reports to predict disease and water-stress risk.', icon: 'cloud' },
  { step: 3, title: 'Act Early, Save Your Crop', teluguTitle: 'ముందుగా చేయండి, పంట కాపాడండి', desc: 'Follow simple, localized recommendations in Telugu and English to prevent loss.', icon: 'shield' },
];

export const features = [
  { title: 'Early Risk Alerts', teluguTitle: 'ముందస్తు హెచ్చరికలు', desc: 'Get notified 72 hours before disease or water stress becomes severe.', icon: 'bell' },
  { title: 'Leaf Scan', teluguTitle: 'ఆకు స్కాన్', desc: 'AI-powered disease detection from a single photo of your crop leaf.', icon: 'scan' },
  { title: 'Smart Irrigation', teluguTitle: 'స్మార్ట్ నీటి పాట', desc: 'Save water with weather-aware irrigation timing and IoT sensor support.', icon: 'droplets' },
  { title: 'Telugu Voice Support', teluguTitle: 'తెలుగు వాయిస్ సపోర్ట్', desc: 'Ask questions in Telugu by voice — get spoken answers instantly.', icon: 'mic' },
];
