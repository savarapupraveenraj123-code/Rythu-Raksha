import { motion } from 'framer-motion';
import {
  Droplets, CloudRain, Sun, Cloud, TrendingUp, ScanLine,
  MapPin, AlertCircle, Brain,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { RiskChart } from '@/components/charts/RiskChart';
import { forecast72h, riskExplain } from '@/services/mockData';

const conditionIcons: Record<string, typeof Sun> = {
  sunny: Sun, cloudy: Cloud, rain: CloudRain, humid: Droplets,
};

const explainIcons: Record<string, typeof Droplets> = {
  droplets: Droplets, scan: ScanLine, soil: TrendingUp, map: MapPin,
};

export function ForecastPage() {
  const currentRisk = forecast72h[0].risk;
  const peakRisk = Math.max(...forecast72h.map((f) => f.risk));
  const peakHour = forecast72h.find((f) => f.risk === peakRisk);
  const riskLevel = currentRisk >= 70 ? 'high' : currentRisk >= 40 ? 'medium' : 'low';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-ink">72-Hour Risk Forecast</h1>
        <p className="mt-1 text-muted">Weather, soil, and disease risk timeline for your farm.</p>
      </motion.div>

      {/* Top summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="soft" className="p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm text-muted font-medium mb-3">Current Risk</h3>
          <ProgressRing value={currentRisk} label="Risk" size={110} />
          <div className="mt-3"><Badge status={riskLevel} /></div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-muted font-medium mb-2">Peak Risk</h3>
          <p className="text-4xl font-bold text-warning">{peakRisk}</p>
          <p className="text-sm text-muted mt-1">at {peakHour?.hour}</p>
          <div className="mt-3 h-2 rounded-full bg-brand-green-100 overflow-hidden">
            <motion.div className="h-full bg-warning rounded-full" initial={{ width: 0 }} animate={{ width: `${peakRisk}%` }} transition={{ duration: 1 }} />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-muted font-medium mb-2">Rain Expected</h3>
          <p className="text-4xl font-bold text-blue-500">12mm</p>
          <p className="text-sm text-muted mt-1">in next 24 hours</p>
          <CloudRain className="w-6 h-6 text-blue-400 mt-3" />
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-muted font-medium mb-2">Humidity</h3>
          <p className="text-4xl font-bold text-brand-green-600">88%</p>
          <p className="text-sm text-muted mt-1">peak at +24h</p>
          <Droplets className="w-6 h-6 text-brand-green-400 mt-3" />
        </Card>
      </div>

      {/* Main chart */}
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-brand-green-700" />
          <h2 className="font-semibold text-ink text-lg">Disease Risk Timeline</h2>
        </div>
        <RiskChart data={forecast72h} height={240} />
      </Card>

      {/* Timeline detail */}
      <Card className="p-6 mb-8">
        <h2 className="font-semibold text-ink text-lg mb-4">Hour-by-Hour Breakdown</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[700px] space-y-2">
            {forecast72h.map((f, i) => {
              const Icon = conditionIcons[f.condition];
              const riskColor = f.risk >= 70 ? 'text-danger' : f.risk >= 40 ? 'text-warning' : 'text-brand-green-600';
              const riskBg = f.risk >= 70 ? 'bg-red-50' : f.risk >= 40 ? 'bg-amber-50' : 'bg-brand-green-50';
              return (
                <motion.div
                  key={f.hour}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-3 rounded-xl ${riskBg}`}
                >
                  <span className="text-sm font-semibold text-ink w-12">{f.hour}</span>
                  <Icon className="w-5 h-5 text-muted flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                    <div><span className="text-muted">Humidity</span> <span className="font-semibold text-ink">{f.humidity}%</span></div>
                    <div><span className="text-muted">Rain</span> <span className="font-semibold text-ink">{f.rainfall}mm</span></div>
                    <div><span className="text-muted">Soil</span> <span className="font-semibold text-ink">{f.soilMoisture}%</span></div>
                    <div><span className="text-muted">Temp</span> <span className="font-semibold text-ink">{f.temperature}°C</span></div>
                  </div>
                  <div className="flex items-center gap-2 w-24 justify-end">
                    <div className="w-16 h-2 rounded-full bg-white overflow-hidden">
                      <motion.div className={`h-full rounded-full ${f.risk >= 70 ? 'bg-danger' : f.risk >= 40 ? 'bg-warning' : 'bg-brand-green-500'}`} initial={{ width: 0 }} animate={{ width: `${f.risk}%` }} transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }} />
                    </div>
                    <span className={`text-sm font-bold ${riskColor} w-6 text-right`}>{f.risk}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Explainable AI */}
      <Card variant="soft" className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Brain className="w-5 h-5 text-brand-green-700" />
          <h2 className="font-semibold text-ink text-lg">Why is risk high?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskExplain.map((item, i) => {
            const Icon = explainIcons[item.icon] ?? AlertCircle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-brand-green-100"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-green-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{item.factor}</p>
                  <p className="text-sm text-muted mt-0.5">{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
