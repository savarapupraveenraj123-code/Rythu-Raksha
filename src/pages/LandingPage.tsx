import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell, ScanLine, Droplets, Mic, ArrowRight, ShieldCheck, Cloud, Leaf,
  TrendingUp, Users, Sprout, Sun, CloudRain, Wind,
} from 'lucide-react';
import { features, howItWorks } from '@/services/mockData';

const iconMap: Record<string, typeof Bell> = {
  bell: Bell, scan: ScanLine, droplets: Droplets, mic: Mic, cloud: Cloud, shield: ShieldCheck,
};

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-50 via-white to-brand-green-50 pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-100 text-brand-green-800 text-sm font-medium mb-6">
              <Sprout className="w-4 h-4" />
              72-hour Crop Risk Copilot
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight">
              Protect Your Crop Before{' '}
              <span className="text-brand-green-700">Risk</span> Becomes{' '}
              <span className="text-danger">Loss</span>.
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg">
              RythuRaksha predicts crop disease and water-stress risk up to 72 hours early.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="btn-primary text-base">
                Check My Crop
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/scan" className="btn-secondary text-base">
                View Demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-green-600" />
                <span>2,400+ farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green-600" />
                <span>91% detection accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-green-600" />
                <span>72-hour early alerts</span>
              </div>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green-200 to-brand-green-100 rounded-[3rem] rotate-6" />
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-card flex items-center justify-center p-8">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-brand-green-600" />
                      <span className="font-semibold text-ink">Plot A – Tomato</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-brand-green-100 text-brand-green-800 text-xs font-semibold">Healthy</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Sun, label: 'Temperature', value: '31°C', color: 'text-amber-500' },
                      { icon: CloudRain, label: 'Rain (24h)', value: '12mm', color: 'text-blue-500' },
                      { icon: Wind, label: 'Humidity', value: '88%', color: 'text-brand-green-600' },
                    ].map((row) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} className="flex items-center gap-3 p-3 rounded-xl bg-brand-green-50">
                          <Icon className={`w-5 h-5 ${row.color}`} />
                          <span className="text-sm text-muted flex-1">{row.label}</span>
                          <span className="text-sm font-semibold text-ink">{row.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-brand-green-800 to-brand-green-600 text-white">
                    <p className="text-xs text-brand-green-100 mb-1">72-hour Risk Forecast</p>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">75%</span>
                      <span className="text-sm text-brand-green-100">Peak at +24h</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/20 overflow-hidden">
                      <motion.div className="h-full bg-warning rounded-full" initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ delay: 1, duration: 1 }} />
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center"
              >
                <ScanLine className="w-8 h-8 text-brand-green-600" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center"
              >
                <Bell className="w-8 h-8 text-warning" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink">Everything Your Farm Needs</h2>
            <p className="mt-3 text-muted text-lg">AI-powered tools designed for farmers, in your language.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-base p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4 group-hover:bg-brand-green-200 transition-colors">
                    <Icon className="w-6 h-6 text-brand-green-700" />
                  </div>
                  <h3 className="font-semibold text-ink text-lg">{f.title}</h3>
                  <p className="font-telugu text-sm text-brand-green-600 mt-0.5">{f.teluguTitle}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 bg-brand-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink">How It Works</h2>
            <p className="mt-3 text-muted text-lg">Three simple steps to protect your crop.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center mb-5">
                      <Icon className="w-9 h-9 text-brand-green-700" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-green-700 text-white text-sm font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-semibold text-ink text-lg">{step.title}</h3>
                    <p className="font-telugu text-sm text-brand-green-600 mt-0.5">{step.teluguTitle}</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full">
                      <ArrowRight className="w-6 h-6 text-brand-green-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-brand-green-800 to-brand-green-600 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <Leaf className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Protect Your Crop?</h2>
              <p className="mt-4 text-brand-green-100 text-lg max-w-xl mx-auto">
                Join thousands of farmers using RythuRaksha to prevent crop loss before it happens.
              </p>
              <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-green-800 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Check My Crop
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
