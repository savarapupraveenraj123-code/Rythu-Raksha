import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ScanLine, Camera, X, AlertTriangle, Lightbulb,
  Clock, Calendar, ShieldAlert, Info, CheckCircle2, Image as ImageIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useToast } from '@/components/ui/Toast';
import { diseaseResult } from '@/services/mockData';

type Phase = 'idle' | 'uploading' | 'analyzing' | 'result';

export function ScanPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleFile = useCallback((file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG).');
      toast('Invalid file type. Please upload an image.', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      toast('Image too large. Max 10MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setPhase('uploading');
    setTimeout(() => {
      setPhase('analyzing');
      toast('Analyzing leaf image...', 'info');
    }, 600);
    setTimeout(() => {
      setPhase('result');
      toast('Disease detected: Early Blight (91% confidence)', 'success');
    }, 2200);
  }, [toast]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setPhase('idle');
    setImagePreview(null);
    setError('');
    if (fileInput.current) fileInput.current.value = '';
  };

  const urgencyConfig = {
    now: { label: 'Do Now', icon: AlertTriangle, color: 'text-danger', bg: 'bg-red-50', border: 'border-red-200' },
    today: { label: 'Today', icon: Clock, color: 'text-warning', bg: 'bg-amber-50', border: 'border-amber-200' },
    'this-week': { label: 'This Week', icon: Calendar, color: 'text-brand-green-700', bg: 'bg-brand-green-50', border: 'border-brand-green-200' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-ink">Leaf Scan</h1>
        <p className="mt-1 text-muted">Upload a clear photo of the affected leaf for AI disease detection.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Idle / Upload */}
        {phase === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInput.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragging ? 'border-brand-green-500 bg-brand-green-50 scale-[1.02]' : 'border-brand-green-200 hover:border-brand-green-400 hover:bg-brand-green-50'
                }`}
              >
                <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 mx-auto rounded-2xl bg-brand-green-100 flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-brand-green-700" />
                </motion.div>
                <p className="text-lg font-semibold text-ink">Upload a clear photo of the affected leaf</p>
                <p className="text-sm text-muted mt-2">Drag & drop or click to browse · JPG, PNG up to 10MB</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="btn-primary">
                    <Upload className="w-5 h-5" />
                    Upload Photo
                  </button>
                  <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); fileInput.current?.click(); }}>
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </button>
                </div>
              </div>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-danger text-center">
                  {error}
                </motion.p>
              )}
            </Card>
          </motion.div>
        )}

        {/* Uploading / Analyzing */}
        {(phase === 'uploading' || phase === 'analyzing') && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-8">
              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img src={imagePreview} alt="Leaf preview" className="w-full h-64 object-cover" />
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: 'linear-gradient(180deg, transparent, rgba(34,197,94,0.3), transparent)' }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm">
                    <ScanLine className="w-5 h-5 text-brand-green-700" />
                    <span className="text-sm font-semibold text-ink">
                      {phase === 'uploading' ? 'Uploading image...' : 'Analyzing leaf patterns...'}
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {['Preprocessing image', 'Extracting leaf features', 'Matching disease patterns', 'Calculating confidence'].map((step, i) => {
                  const active = phase === 'analyzing' || i === 0;
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${active ? 'bg-brand-green-500' : 'bg-brand-green-100'}`}>
                        {active ? <CheckCircle2 className="w-3 h-3 text-white" /> : <span className="w-2 h-2 rounded-full bg-brand-green-300" />}
                      </div>
                      <span className={`text-sm ${active ? 'text-ink font-medium' : 'text-muted'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Result */}
        {phase === 'result' && (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {imagePreview && (
              <Card className="overflow-hidden">
                <div className="relative">
                  <img src={imagePreview} alt="Scanned leaf" className="w-full h-56 object-cover" />
                  <button onClick={reset} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:scale-110 transition-transform">
                    <X className="w-5 h-5 text-ink" />
                  </button>
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-brand-green-800/90 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    Scan Complete
                  </div>
                </div>
              </Card>
            )}

            {/* Result summary */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ProgressRing value={diseaseResult.confidence} label="Confidence" size={130} />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                    <h2 className="text-2xl font-bold text-ink">{diseaseResult.disease}</h2>
                    <Badge status={diseaseResult.severity} />
                  </div>
                  <p className="font-telugu text-brand-green-600">{diseaseResult.teluguName}</p>
                  <div className="mt-3 space-y-1 text-sm text-muted">
                    <p><span className="font-medium text-ink">Affected crop:</span> {diseaseResult.crop}</p>
                    <p><span className="font-medium text-ink">Affected area:</span> {diseaseResult.affectedArea}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Why this alert */}
            <Card variant="soft" className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-brand-green-700" />
                <h3 className="font-semibold text-ink">Why this alert?</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{diseaseResult.explanation}</p>
            </Card>

            {/* Suggested actions */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-brand-green-700" />
                <h3 className="font-semibold text-ink">Suggested Immediate Actions</h3>
              </div>
              <div className="space-y-3">
                {diseaseResult.actions.map((action, i) => {
                  const cfg = urgencyConfig[action.urgency];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} ${cfg.border}`}
                    >
                      <Icon className={`w-5 h-5 ${cfg.color} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink">{action.action}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                        </div>
                        <p className="font-telugu text-xs text-brand-green-600 mt-1">{action.teluguAction}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <ShieldAlert className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Disclaimer:</span> This is advisory support; consult a local agriculture expert for pesticide decisions.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={reset} className="btn-primary flex-1">
                <ScanLine className="w-5 h-5" />
                Scan Another Leaf
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
