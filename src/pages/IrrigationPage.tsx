import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, Clock, Save, Wifi, Cpu, Thermometer, Gauge,
  Beaker, TrendingDown, Calendar, CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { soilReading, irrigationRecommendation } from '@/services/mockData';

export function IrrigationPage() {
  const [mode, setMode] = useState<'manual' | 'iot'>('iot');
  const [moisture, setMoisture] = useState(soilReading.moisture);
  const [esp32Connected, setEsp32Connected] = useState(true);
  const toast = useToast();

  const moistureColor = moisture >= 65 ? '#EF4444' : moisture >= 45 ? '#22C55E' : moisture >= 30 ? '#F59E0B' : '#EF4444';
  const moistureLabel = moisture >= 65 ? 'Above ideal' : moisture >= 45 ? 'Ideal range' : moisture >= 30 ? 'Below ideal' : 'Critical';
  const idealMin = 45;
  const idealMax = 55;

  const soilMetrics = [
    { label: 'Temperature', value: `${soilReading.temperature}°C`, icon: Thermometer, color: 'text-amber-500' },
    { label: 'pH Level', value: soilReading.ph.toString(), icon: Beaker, color: 'text-purple-500' },
    { label: 'Nitrogen', value: `${soilReading.nitrogen} mg/kg`, icon: Gauge, color: 'text-brand-green-600' },
    { label: 'Phosphorus', value: `${soilReading.phosphorus} mg/kg`, icon: Gauge, color: 'text-blue-500' },
    { label: 'Potassium', value: `${soilReading.potassium} mg/kg`, icon: Gauge, color: 'text-orange-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-ink">Smart Irrigation</h1>
        <p className="mt-1 text-muted">Weather-aware watering recommendations to save water and protect crops.</p>
      </motion.div>

      {/* Mode toggle */}
      <div className="flex items-center gap-2 mb-6 p-1 rounded-xl bg-brand-green-50 w-fit">
        <button
          onClick={() => { setMode('iot'); toast('IoT sensor mode activated', 'info'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'iot' ? 'bg-white text-brand-green-800 shadow-soft' : 'text-muted'}`}
        >
          <Cpu className="w-4 h-4" />
          IoT Sensor Mode
        </button>
        <button
          onClick={() => { setMode('manual'); toast('Manual input mode activated', 'info'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'manual' ? 'bg-white text-brand-green-800 shadow-soft' : 'text-muted'}`}
        >
          <Gauge className="w-4 h-4" />
          Manual Input
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil moisture meter */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-brand-green-700" />
            <h2 className="font-semibold text-ink text-lg">Soil Moisture</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="85" fill="none" stroke="#DCFCE7" strokeWidth="14" />
                <motion.circle
                  cx="100" cy="100" r="85" fill="none" stroke={moistureColor} strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 85}
                  initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 85 - (moisture / 100) * 2 * Math.PI * 85 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-ink">{moisture}%</span>
                <span className="text-sm text-muted mt-1">{moistureLabel}</span>
              </div>
            </div>
            {/* Ideal range indicator */}
            <div className="w-full mt-4 px-4">
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>0%</span>
                <span>Ideal: {idealMin}–{idealMax}%</span>
                <span>100%</span>
              </div>
              <div className="relative h-3 rounded-full bg-brand-green-100">
                <div className="absolute h-full rounded-full bg-brand-green-200" style={{ left: `${idealMin}%`, width: `${idealMax - idealMin}%` }} />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: moistureColor }}
                  animate={{ left: `calc(${moisture}% - 8px)` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            {mode === 'manual' && (
              <div className="w-full mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full accent-brand-green-600"
                />
                <p className="text-xs text-muted text-center mt-1">Drag to adjust moisture level</p>
              </div>
            )}
          </div>
        </Card>

        {/* Recommendation */}
        <div className="space-y-6">
          <Card variant="soft" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-brand-green-700" />
              <h2 className="font-semibold text-ink text-lg">Recommendation</h2>
            </div>
            <div className="p-4 rounded-xl bg-white border border-brand-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-brand-green-600" />
                <p className="font-semibold text-ink">{irrigationRecommendation.time}</p>
              </div>
              <p className="text-sm text-muted">Duration: {irrigationRecommendation.duration}</p>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-brand-green-800 text-white">
              <p className="text-sm">{irrigationRecommendation.reason}</p>
              <p className="font-telugu text-sm text-brand-green-100 mt-2">{irrigationRecommendation.teluguReason}</p>
            </div>
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <TrendingDown className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-ink">Water Saving Estimate</p>
                <p className="text-2xl font-bold text-blue-500">{irrigationRecommendation.waterSaving}</p>
              </div>
            </div>
          </Card>

          {/* Soil metrics */}
          <Card className="p-6">
            <h3 className="font-semibold text-ink mb-4">Soil Nutrient Readings</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {soilMetrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="p-3 rounded-xl bg-brand-green-50 border border-brand-green-100">
                    <Icon className={`w-4 h-4 ${m.color} mb-1`} />
                    <p className="text-xs text-muted">{m.label}</p>
                    <p className="text-sm font-semibold text-ink">{m.value}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* ESP32 status */}
      <AnimatePresence>
        {mode === 'iot' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <Card className="p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-brand-green-700" />
                  <h3 className="font-semibold text-ink">ESP32 Sensor Status</h3>
                </div>
                <button
                  onClick={() => { setEsp32Connected(!esp32Connected); toast(esp32Connected ? 'Sensor disconnected' : 'Sensor connected', esp32Connected ? 'error' : 'success'); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${esp32Connected ? 'bg-brand-green-100 text-brand-green-800' : 'bg-red-50 text-danger'}`}
                >
                  <Wifi className="w-3.5 h-3.5" />
                  {esp32Connected ? 'Connected' : 'Disconnected'}
                </button>
              </div>
              {esp32Connected ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Sensor 1', status: 'Active', value: '68%' },
                    { label: 'Sensor 2', status: 'Active', value: '72%' },
                    { label: 'Sensor 3', status: 'Active', value: '65%' },
                    { label: 'Battery', status: 'Good', value: '87%' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-brand-green-50 border border-brand-green-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green-500" />
                        <span className="text-xs text-muted">{s.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-ink">{s.value}</p>
                      <p className="text-[10px] text-brand-green-600">{s.status}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                  <p className="text-sm text-danger">ESP32 sensor is offline. Switch to manual input or check your connection.</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
