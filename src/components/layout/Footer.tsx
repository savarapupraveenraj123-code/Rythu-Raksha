import { Leaf, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-green-900 text-brand-green-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-green-500 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">RythuRaksha</span>
            </div>
            <p className="text-sm text-brand-green-200 max-w-xs">
              A 72-hour crop risk copilot helping farmers prevent loss before disease becomes severe.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-green-200">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Farmer Dashboard</a></li>
              <li><a href="/scan" className="hover:text-white transition-colors">Leaf Scan</a></li>
              <li><a href="/forecast" className="hover:text-white transition-colors">Risk Forecast</a></li>
              <li><a href="/irrigation" className="hover:text-white transition-colors">Smart Irrigation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">About</h4>
            <p className="text-sm text-brand-green-200">
              Built for the Smart Agriculture Hackathon. RythuRaksha combines AI leaf scanning, weather data, and community reports to protect crops.
            </p>
          </div>
        </div>
        <div className="border-t border-brand-green-700 mt-8 pt-6 flex items-center justify-center gap-2 text-sm text-brand-green-300">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-brand-green-400" />
          <span>for farmers · 2026</span>
        </div>
      </div>
    </footer>
  );
}
