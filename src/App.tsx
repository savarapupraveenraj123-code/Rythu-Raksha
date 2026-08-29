import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ScanPage } from '@/pages/ScanPage';
import { ForecastPage } from '@/pages/ForecastPage';
import { IrrigationPage } from '@/pages/IrrigationPage';
import { RadarPage } from '@/pages/RadarPage';
import { type ReactNode } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/irrigation" element={<IrrigationPage />} />
          <Route path="/radar" element={<RadarPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <VoiceAssistant />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
