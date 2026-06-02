import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  Target, 
  Award, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Play,
  Shield,
  BookOpen,
  BarChart3,
  Globe
} from 'lucide-react';

const examTypes = [
  {
    id: 'ssc',
    name: 'SSC Typing Test',
    nameHindi: 'एसएससी टाइपिंग टेस्ट',
    icon: FileText,
    color: 'from-blue-500 to-indigo-600',
    duration: 10,
    minWpm: 35,
    minAccuracy: 90,
    description: 'Staff Selection Commission',
    features: ['Real SSC pattern', '10-minute test', 'Both languages', 'Official standards']
  },
  {
    id: 'cpct',
    name: 'CPCT Exam',
    nameHindi: 'सीपीसीटी परीक्षा',
    icon: Shield,
    color: 'from-purple-500 to-pink-600',
    duration: 15,
    minWpm: 30,
    minAccuracy: 85,
    description: 'Computer Proficiency Test',
    features: ['CPCT syllabus', '15-minute test', 'Proficiency test', 'State exams']
  },
  {
    id: 'dataEntry',
    name: 'Data Entry Operator',
    nameHindi: 'डेटा एंट्री ऑपरेटर',
    icon: Target,
    color: 'from-orange-500 to-red-600',
    duration: 10,
    minWpm: 25,
    minAccuracy: 92,
    description: 'Data Entry Operator',
    features: ['High accuracy focus', '10-minute test', 'Data entry jobs', 'Speed + Precision']
  },
  {
    id: 'government',
    name: 'Government Typing Test',
    nameHindi: 'सरकारी टाइपिंग टेस्ट',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    duration: 10,
    minWpm: 30,
    minAccuracy: 90,
    description: 'Various Government Jobs',
    features: ['General pattern', '10-minute test', 'Multiple exams', 'Standard criteria']
  }
];

export default function Exam() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const selectedExamData = examTypes.find(e => e.id === selectedExam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>Official Exam Patterns</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4"
          >
            Exam Mode
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            परीक्षा मोड | Practice with real exam patterns and time limits
          </motion.p>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {examTypes.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative group p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedExam === exam.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 shadow-xl shadow-indigo-500/10'
                  : 'bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
              onClick={() => setSelectedExam(exam.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <exam.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-0.5">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-3">{exam.nameHindi}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{exam.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {exam.duration} min
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                      <Target className="w-3 h-3" />
                      {exam.minWpm} WPM
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {exam.minAccuracy}% Acc
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1">
                    {exam.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedExam === exam.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Requirements Info */}
        {selectedExam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">
                  {selectedExamData?.name} Selected
                </h3>
                <p className="text-white/80 text-sm">
                  Minimum: {selectedExamData?.minWpm} WPM & {selectedExamData?.minAccuracy}% accuracy | {selectedExamData?.duration} minutes
                </p>
              </div>
              <Link
                to="/practice"
                state={{ examMode: selectedExam }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-slate-100 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Exam
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: AlertCircle,
              title: 'Exam Guidelines',
              titleHindi: 'परीक्षा दिशानिर्देश',
              tips: ['Read instructions carefully', 'Manage your time wisely', 'Focus on accuracy first', 'Stay calm and focused']
            },
            {
              icon: Target,
              title: 'Speed Tips',
              titleHindi: 'गति सुझाव',
              tips: ['Use all fingers for typing', 'Keep eyes on screen', 'Practice regularly', 'Maintain proper posture']
            },
            {
              icon: Award,
              title: 'Success Strategy',
              titleHindi: 'सफलता रणनीति',
              tips: ['Start with practice mode', 'Track your progress', 'Work on weak areas', 'Take mock tests daily']
            }
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{section.title}</h4>
                  <p className="text-xs text-slate-500">{section.titleHindi}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {section.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: '10K+', label: 'Exams Taken', labelHindi: 'परीक्षा दी' },
              { value: '92%', label: 'Pass Rate', labelHindi: 'उत्तीर्ण दर' },
              { value: '4.8', label: 'User Rating', labelHindi: 'रेटिंग' },
              { value: '24/7', label: 'Available', labelHindi: 'उपलब्ध' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                <div className="text-[10px] text-slate-400">{stat.labelHindi}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}