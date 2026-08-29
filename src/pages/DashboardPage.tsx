import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine, CheckCircle2, AlertTriangle, ShieldAlert, Clock,
  CloudRain, Sun, Droplets, ListChecks, ChevronRight, MapPin,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton';
import { RiskChart } from '@/components/charts/RiskChart';
import { useToast } from '@/components/ui/Toast';
import {
  farmer, farmSummary, plots, forecast72h, farmPlan,
} from '@/services/mockData';

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(farmPlan);
  const toast = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const toggleTask = (id: string) => {
    setPlan((p) => {
      const updated = { ...p, checklist: p.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)) };
      const task = updated.checklist.find((c) => c.id === id);
      if (task?.done) toast('Task completed. Well done!', 'success');
      return updated;
    });
  };

  const summaryCards = [
    { label: 'Healthy Plots', value: farmSummary.healthy, icon: CheckCircle2, color: 'text-brand-green-600', bg: 'bg-brand-green-50', ring: '#22C55E' },
    { label: 'Attention Needed', value: farmSummary.attention, icon: AlertTriangle, color: 'text-warning', bg: 'bg-amber-50', ring: '#F59E0B' },
    { label: 'High-Risk Alerts', value: farmSummary.highRisk, icon: ShieldAlert, color: 'text-danger', bg: 'bg-red-50', ring: '#EF4444' },
  ];

  const currentRisk = forecast72h[0].risk;
  const peakRisk = Math.max(...forecast72h.map((f) => f.risk));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-ink">
          Namaste, {farmer.name} Garu 👋
        </h1>
        <p className="mt-1 text-muted flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {farmer.village} · {farmer.plotsCount} plots · {farmer.totalArea}
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loading
          ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          : summaryCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="p-6" hover>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted font-medium">{card.label}</p>
                        <p className={`text-4xl font-bold mt-2 ${card.color}`}>{card.value}</p>
                        <p className="text-xs text-muted mt-1">{card.value === 1 ? 'plot' : 'plots'}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${card.color}`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
      </div>

      {/* Risk forecast + Current risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-ink text-lg">72-Hour Risk Forecast</h2>
                <p className="text-sm text-muted">Disease & water-stress risk over the next 3 days</p>
              </div>
              <Link to="/forecast" className="btn-ghost text-sm">
                Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {loading ? <Skeleton className="h-48 w-full" /> : <RiskChart data={forecast72h} />}
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card variant="soft" className="p-6 h-full flex flex-col items-center justify-center">
            <h3 className="font-semibold text-ink mb-4">Current Risk Score</h3>
            <ProgressRing value={currentRisk} label="Risk" sublabel="Now" />
            <div className="mt-4 text-center">
              <p className="text-sm text-muted">Peak in 24h: <span className="font-bold text-warning">{peakRisk}</span></p>
              <Badge status={currentRisk >= 70 ? 'high' : currentRisk >= 40 ? 'medium' : 'low'} customLabel={currentRisk >= 70 ? 'High Risk' : currentRisk >= 40 ? 'Medium Risk' : 'Low Risk'} />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Today's Farm Plan */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <ListChecks className="w-5 h-5 text-brand-green-700" />
            <h2 className="font-semibold text-ink text-lg">Today's Farm Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-brand-green-50 border border-brand-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-brand-green-600" />
                <span className="text-sm text-muted font-medium">Best Irrigation Time</span>
              </div>
              <p className="font-semibold text-ink">{plan.bestIrrigationTime}</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted font-medium">Rain Prediction</span>
              </div>
              <p className="font-semibold text-ink">{plan.rainPrediction}</p>
              <div className="mt-2 h-2 rounded-full bg-blue-100 overflow-hidden">
                <motion.div className="h-full bg-blue-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${plan.rainProbability}%` }} transition={{ duration: 1 }} />
              </div>
              <p className="text-xs text-muted mt-1">{plan.rainProbability}% probability</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-muted font-medium">Today's Weather</span>
              </div>
              <p className="font-semibold text-ink">31°C · Sunny</p>
              <p className="text-xs text-muted mt-1">Humidity: 68%</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink mb-3">Crop Action Checklist</p>
            <div className="space-y-2">
              {plan.checklist.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    task.done ? 'bg-brand-green-50 border-brand-green-200' : 'bg-white border-gray-100 hover:border-brand-green-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    task.done ? 'bg-brand-green-600 border-brand-green-600' : 'border-gray-300'
                  }`}>
                    {task.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.done ? 'text-muted line-through' : 'text-ink'}`}>{task.task}</p>
                    <p className="font-telugu text-xs text-brand-green-600">{task.teluguTask}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Plot health list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink text-lg">Plot Health</h2>
            <Link to="/scan" className="btn-ghost text-sm">
              Scan <ScanLine className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {loading
              ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              : plots.map((plot) => (
                  <div key={plot.id} className="flex items-center gap-4 p-4 rounded-xl bg-brand-green-50 border border-brand-green-100 hover:border-brand-green-300 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-ink truncate">{plot.name}</p>
                        <Badge status={plot.status} />
                      </div>
                      <p className="text-sm text-muted mt-0.5">
                        {plot.crop} · {plot.stage} · {plot.area} · Scanned {plot.lastScanned}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <div className="w-24 h-2 rounded-full bg-brand-green-100 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${plot.health >= 70 ? 'bg-brand-green-500' : plot.health >= 50 ? 'bg-warning' : 'bg-danger'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${plot.health}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-ink w-10 text-right">{plot.health}%</span>
                    </div>
                  </div>
                ))}
          </div>
        </Card>
      </motion.div>

      {/* Floating scan button */}
      <Link to="/scan" className="fixed bottom-24 left-4 sm:left-6 z-40">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-brand-green-800 text-white shadow-card-hover"
        >
          <ScanLine className="w-5 h-5" />
          <span className="font-semibold text-sm">Scan Leaf</span>
        </motion.div>
      </Link>
    </div>
  );
}
