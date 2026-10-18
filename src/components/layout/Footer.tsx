import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, FileText } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-slate-400 text-sm border-t border-navy-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-bold">
              <div className="bg-teal p-1.5 rounded-lg text-navy-900">
                <Activity className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-lg">HumanScore</span>
            </div>
            <p className="text-xs text-slate-400">
              Measure. Understand. Explore. Professional interactive self-assessments with educational insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Assessments</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/${cat.slug}`} className="hover:text-teal transition">{cat.footerLabel}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/overall-assessment" className="hover:text-teal transition">Assessment Index Dashboard</Link></li>
              <li><Link to="/scoring-methodology" className="hover:text-teal transition">Scoring Methodology</Link></li>
              <li><Link to="/about" className="hover:text-teal transition">About HumanScore</Link></li>
              <li><Link to="/contact" className="hover:text-teal transition">Contact & Feedback</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-teal transition flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-teal transition flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HumanScore. Educational and informational self-assessment platform. Not a medical or diagnostic service.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link to="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link to="/scoring-methodology" className="hover:text-white">Methodology</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};