import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Keyboard, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30"
              >
                <Keyboard className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-800 dark:text-white font-display">TypeGuru India</span>
                <span className="text-xs text-slate-500">टाइपिंग मास्टर प्लेटफॉर्म</span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
              India's most trusted Hindi and English typing learning platform. Master typing for SSC, CPCT, 
              Data Entry, and Government exams with real-time analytics and professional certification.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">
              भारत का सबसे विश्वसनीय हिंदी और अंग्रेजी टाइपिंग लर्निंग प्लेटफॉर्म।
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="w-4 h-4" />
                <span>support@typeguru.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/practice', label: 'Practice Typing', hindi: 'टाइपिंग अभ्यास' },
                { to: '/exam', label: 'Exam Mode', hindi: 'परीक्षा मोड' },
                { to: '/dashboard', label: 'Dashboard', hindi: 'डैशबोर्ड' },
                { to: '/leaderboard', label: 'Leaderboard', hindi: 'लीडरबोर्ड' },
                { to: '/tools', label: 'Tools', hindi: 'उपकरण' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex flex-col text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-400">{link.hindi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Prep */}
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">Exam Preparation</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'SSC Typing Test', hindi: 'एसएससी टाइपिंग' },
                { label: 'CPCT Exam', hindi: 'सीपीसीटी परीक्षा' },
                { label: 'Data Entry Operator', hindi: 'डेटा एंट्री' },
                { label: 'Government Jobs', hindi: 'सरकारी नौकरी' },
                { label: 'State Exams', hindi: 'राज्य परीक्षाएं' },
              ].map((item, i) => (
                <li key={i}>
                  <span className="group flex flex-col text-slate-600 dark:text-slate-400 text-sm cursor-default">
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400">{item.hindi}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center gap-1.5">
              Made with <Heart className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" /> in India 🇮🇳
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>© {currentYear} TypeGuru India</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}