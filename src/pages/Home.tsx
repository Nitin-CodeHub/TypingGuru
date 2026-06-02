import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Keyboard, 
  Zap, 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  Globe, 
  BookOpen,
  FileText,
  BarChart3,
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const features = [
  {
    icon: Keyboard,
    title: '5 Hindi Keyboard Layouts',
    titleHindi: '5 हिंदी कीबोर्ड लेआउट',
    description: 'Remington Gail, CBI, Inscript, Indic Input, Phonetic - practice on your preferred layout.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Target,
    title: 'Real Exam Patterns',
    titleHindi: 'वास्तविक परीक्षा पैटर्न',
    description: 'SSC, CPCT, Data Entry, Government typing tests with official time limits and requirements.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    titleHindi: 'वास्तविक समय विश्लेषण',
    description: 'Track WPM, accuracy, consistency, and character-level performance with live charts.',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Award,
    title: 'PDF Certificates',
    titleHindi: 'पीडीएफ़ प्रमाण पत्र',
    description: 'Download and print professional certificates upon completing tests successfully.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Settings,
    title: 'Font Switching',
    titleHindi: 'फ़ॉन्ट स्विचिंग',
    description: 'Switch between Unicode (Mangal), KrutiDev 010/016, and DevLys fonts instantly.',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Local Leaderboard',
    titleHindi: 'स्थानीय लीडरबोर्ड',
    description: 'Compete with yourself and track your ranking on the local leaderboard.',
    color: 'from-yellow-500 to-orange-600'
  }
];

const examTypes = [
  {
    name: 'SSC Typing Test',
    nameHindi: 'एसएससी टाइपिंग टेस्ट',
    icon: FileText,
    requirements: '35 WPM | 90% Accuracy',
    description: 'Staff Selection Commission',
    duration: '10 min'
  },
  {
    name: 'CPCT Exam',
    nameHindi: 'सीपीसीटी परीक्षा',
    icon: Shield,
    requirements: '30 WPM | 85% Accuracy',
    description: 'Computer Proficiency Test',
    duration: '15 min'
  },
  {
    name: 'Data Entry',
    nameHindi: 'डेटा एंट्री',
    icon: BarChart3,
    requirements: '25 WPM | 92% Accuracy',
    description: 'Data Entry Operator',
    duration: '10 min'
  },
  {
    name: 'Government',
    nameHindi: 'सरकारी नौकरी',
    icon: Globe,
    requirements: '30 WPM | 90% Accuracy',
    description: 'Various Government Jobs',
    duration: '10 min'
  }
];

const stats = [
  { value: '50K+', label: 'Active Users', labelHindi: 'सक्रिय उपयोगकर्ता' },
  { value: '1M+', label: 'Tests Completed', labelHindi: 'परीक्षण पूर्ण' },
  { value: '95%', label: 'Success Rate', labelHindi: 'सफलता दर' },
  { value: '4.9', label: 'User Rating', labelHindi: 'उपयोगकर्ता रेटिंग' }
];

const keyboardLayouts = [
  { name: 'Remington Gail', hindi: 'रेमिंगटन गेल', popular: true },
  { name: 'Remington CBI', hindi: 'रेमिंगटन सीबीआई', popular: false },
  { name: 'Inscript', hindi: 'इन्स्क्रिप्ट', popular: true },
  { name: 'Indic Input', hindi: 'इंडिक इनपुट', popular: false },
  { name: 'Phonetic', hindi: 'फोनेटिक', popular: true }
];

export default function Home() {
  const { progress } = useApp();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-300/10 to-pink-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>India's #1 Typing Platform</span>
            <span className="text-indigo-400">|</span>
            <span className="text-slate-600 dark:text-slate-400">भारत का #1 टाइपिंग प्लेटफॉर्म</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-display"
          >
            <span className="text-slate-800 dark:text-white">Master </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Typing
            </span>
            <br />
            <span className="text-slate-800 dark:text-white">in </span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Hindi & English
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-4"
          >
            5 Hindi keyboard layouts • Real exam patterns • PDF certificates • Font switching • Offline support
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mb-10"
          >
            एसएससी, सीपीसीटी, डेटा एंट्री और सरकारी टाइपिंग परीक्षाओं की तैयारी करें
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/practice"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>Start Practice</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/exam"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold shadow-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              <span>Take Exam</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.labelHindi}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Keyboard Layouts Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4"
            >
              5 Hindi Keyboard Layouts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400"
            >
              5 हिंदी कीबोर्ड लेआउट | Choose your preferred typing method
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {keyboardLayouts.map((layout, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
              >
                {layout.popular && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium bg-orange-500 text-white rounded-full">
                    Popular
                  </span>
                )}
                <div className="font-medium text-slate-800 dark:text-white">{layout.name}</div>
                <div className="text-xs text-slate-500">{layout.hindi}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4"
            >
              Why Choose TypeGuru?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              TypeGuru क्यों चुनें? Professional features for serious learners
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-3">{feature.titleHindi}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4"
            >
              Exam Preparation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              परीक्षा की तैयारी | Official patterns and time limits
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {examTypes.map((exam, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                
                <exam.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-0.5">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{exam.nameHindi}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                    {exam.requirements}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {exam.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            
            <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Improve Your Typing?
            </h2>
            <p className="relative text-white/80 mb-8 max-w-2xl mx-auto">
              अपनी टाइपिंग में सुधार करने के लिए तैयार हैं? आज ही अभ्यास शुरू करें
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/practice"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Free Practice
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-6"
              >
                Everything You Need to Succeed
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 dark:text-slate-400 mb-8"
              >
                सफलता के लिए आपको जो चाहिए वह सब यहाँ है
              </motion.p>
              
              <div className="space-y-4">
                {[
                  '5 Hindi keyboard layouts with finger guides',
                  'Real exam patterns (SSC, CPCT, Government)',
                  'Unicode & KrutiDev font switching',
                  'Visual keyboard with color-coded keys',
                  'Real-time WPM, accuracy & consistency tracking',
                  'Printable PDF certificates',
                  'Offline PWA support',
                  'Progress analytics with charts'
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Keyboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-white">Live Typing Test</div>
                  <div className="text-sm text-slate-500">Real-time feedback</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Speed</span>
                  <span className="font-semibold text-indigo-600">45 WPM</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" 
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Accuracy</span>
                  <span className="font-semibold text-emerald-600">96%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '96%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" 
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Consistency</span>
                  <span className="font-semibold text-orange-600">92%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}