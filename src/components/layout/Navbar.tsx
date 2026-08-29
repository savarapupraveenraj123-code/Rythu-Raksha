import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, LayoutDashboard, ScanLine, TrendingUp, Droplets, Radar, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/scan', label: 'Leaf Scan', icon: ScanLine },
  { to: '/forecast', label: 'Risk Forecast', icon: TrendingUp },
  { to: '/irrigation', label: 'Irrigation', icon: Droplets },
  { to: '/radar', label: 'Pest Radar', icon: Radar },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-green-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-green-700 to-brand-green-500 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="leading-none">
            <span className="text-lg font-bold text-brand-green-800">RythuRaksha</span>
            <span className="block text-[10px] text-muted font-medium">Crop Risk Copilot</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'text-brand-green-800' : 'text-muted hover:text-brand-green-800 hover:bg-brand-green-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {active && (
                  <motion.div layoutId="nav-active" className="absolute inset-0 -z-10 bg-brand-green-50 rounded-lg" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">
            Check My Crop
          </Link>
        </div>

        <button className="md:hidden p-2 text-brand-green-800" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-brand-green-100 bg-white"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? 'bg-brand-green-50 text-brand-green-800' : 'text-muted hover:bg-brand-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
}
