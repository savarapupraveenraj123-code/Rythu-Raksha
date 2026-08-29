import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Filter, Shield, AlertTriangle, ShieldAlert, Users,
  Clock, Crosshair,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { pestHotspots, type PestHotspot } from '@/services/mockData';

const crops = ['All', 'Tomato', 'Chilli', 'Rice', 'Cotton'];
const diseases = ['All', 'Early Blight', 'Late Blight', 'Leaf Curl', 'Blast', 'Boll Rot'];
const distances = ['All', '< 2 km', '< 5 km', '< 10 km'];
const timeFilters = ['All', 'Last 24 hours', 'Last 48 hours'];

export function RadarPage() {
  const [crop, setCrop] = useState('All');
  const [disease, setDisease] = useState('All');
  const [distance, setDistance] = useState('All');
  const [time, setTime] = useState('All');
  const [selected, setSelected] = useState<PestHotspot | null>(null);
  const toast = useToast();

  const filtered = useMemo(() => {
    return pestHotspots.filter((h) => {
      if (crop !== 'All' && h.crop !== crop) return false;
      if (disease !== 'All' && h.disease !== disease) return false;
      if (distance !== 'All') {
        const km = parseFloat(h.distance);
        if (distance === '< 2 km' && km >= 2) return false;
        if (distance === '< 5 km' && km >= 5) return false;
        if (distance === '< 10 km' && km >= 10) return false;
      }
      return true;
    });
  }, [crop, disease, distance]);

  const totalReports = filtered.reduce((sum, h) => sum + h.reports, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-ink">Local Pest Radar</h1>
        <p className="mt-1 text-muted">Anonymized crop-risk hotspots reported by nearby farmers.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <Users className="w-5 h-5 text-brand-green-600 mb-2" />
          <p className="text-2xl font-bold text-ink">{totalReports}</p>
          <p className="text-xs text-muted">Total Reports</p>
        </Card>
        <Card className="p-4">
          <MapPin className="w-5 h-5 text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-ink">{filtered.length}</p>
          <p className="text-xs text-muted">Hotspots</p>
        </Card>
        <Card className="p-4">
          <ShieldAlert className="w-5 h-5 text-danger mb-2" />
          <p className="text-2xl font-bold text-ink">{filtered.filter((h) => h.severity === 'high').length}</p>
          <p className="text-xs text-muted">High Risk</p>
        </Card>
        <Card className="p-4">
          <Clock className="w-5 h-5 text-warning mb-2" />
          <p className="text-2xl font-bold text-ink">24h</p>
          <p className="text-xs text-muted">Time Range</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-brand-green-700" />
          <h3 className="font-semibold text-ink text-sm">Filters</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Crop', value: crop, options: crops, setter: setCrop },
            { label: 'Disease', value: disease, options: diseases, setter: setDisease },
            { label: 'Distance', value: distance, options: distances, setter: setDistance },
            { label: 'Time', value: time, options: timeFilters, setter: setTime },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-muted font-medium block mb-1">{f.label}</label>
              <select
                value={f.value}
                onChange={(e) => { f.setter(e.target.value); toast(`Filtered by ${f.label}: ${e.target.value}`, 'info'); }}
                className="w-full px-3 py-2 rounded-lg bg-brand-green-50 border border-brand-green-100 text-sm text-ink focus:outline-none focus:border-brand-green-400"
              >
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-ink text-lg">District Risk Map</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Crosshair className="w-4 h-4 text-brand-green-600" />
                Pallakonda District
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-green-50 to-brand-green-100 border border-brand-green-100 overflow-hidden">
              {/* Grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#166534" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              {/* Rivers/roads decoration */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
                <path d="M 0 40 Q 30 35 50 45 T 100 40" fill="none" stroke="#86EFAC" strokeWidth="1.5" opacity="0.5" />
                <path d="M 20 0 Q 25 20 30 40 T 40 75" fill="none" stroke="#86EFAC" strokeWidth="1" opacity="0.4" />
              </svg>
              {/* Your farm */}
              <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-brand-green-700 ring-4 ring-brand-green-200" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-brand-green-800 bg-white px-1.5 py-0.5 rounded shadow-soft whitespace-nowrap">Your Farm</span>
                </div>
              </div>
              {/* Hotspots */}
              <AnimatePresence>
                {filtered.map((h) => (
                  <motion.button
                    key={h.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setSelected(h)}
                    className="absolute group"
                    style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%,-50%)' }}
                  >
                    <span className={`absolute inset-0 rounded-full animate-pulse-ring ${h.severity === 'high' ? 'bg-danger/30' : h.severity === 'medium' ? 'bg-warning/30' : 'bg-brand-green-500/30'}`} />
                    <div className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg ${h.severity === 'high' ? 'bg-danger' : h.severity === 'medium' ? 'bg-warning' : 'bg-brand-green-500'}`}>
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-ink bg-white px-1.5 py-0.5 rounded shadow-soft whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {h.disease}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted">No hotspots match your filters.</p>
                </div>
              )}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-xs text-muted">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-brand-green-500" /> Low risk</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-warning" /> Medium risk</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-danger" /> High risk</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-brand-green-700 ring-2 ring-brand-green-200" /> Your farm</div>
            </div>
          </Card>
        </div>

        {/* Hotspot list + detail */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-ink mb-3">Nearby Reports</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-8 h-8 text-muted mx-auto mb-2" />
                  <p className="text-sm text-muted">No reports match your filters.</p>
                </div>
              ) : (
                filtered.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelected(h)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${selected?.id === h.id ? 'bg-brand-green-50 border-brand-green-300' : 'bg-white border-gray-100 hover:border-brand-green-200'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-ink">{h.disease}</p>
                      <Badge status={h.severity} />
                    </div>
                    <p className="text-xs text-muted">{h.crop} · {h.distance} · {h.reports} reports · {h.timeAgo}</p>
                  </button>
                ))
              )}
            </div>
          </Card>

          {/* Privacy note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-green-50 border border-brand-green-100">
            <Shield className="w-5 h-5 text-brand-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-brand-green-800">
              <span className="font-semibold">Privacy Note:</span> Farmer locations are generalized to protect privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-card-hover max-w-sm w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-ink text-lg">{selected.disease}</h3>
                <Badge status={selected.severity} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Crop</span><span className="font-semibold text-ink">{selected.crop}</span></div>
                <div className="flex justify-between"><span className="text-muted">Distance</span><span className="font-semibold text-ink">{selected.distance}</span></div>
                <div className="flex justify-between"><span className="text-muted">Reports</span><span className="font-semibold text-ink">{selected.reports} farmers</span></div>
                <div className="flex justify-between"><span className="text-muted">Last report</span><span className="font-semibold text-ink">{selected.timeAgo}</span></div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-brand-green-50 border border-brand-green-100">
                <p className="text-sm text-brand-green-800">
                  Multiple farmers in your area reported {selected.disease} on {selected.crop}. Monitor your crops closely and consider preventive measures.
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="btn-primary w-full mt-4">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
