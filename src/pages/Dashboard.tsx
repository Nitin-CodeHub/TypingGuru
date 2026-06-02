import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  Flame,
  Calendar,
  Trophy,
  ArrowUpRight,
  Play,
  BarChart3,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatsCard from '../components/StatsCard';
import ProgressChart from '../components/ProgressChart';

export default function Dashboard() {
  const { progress } = useApp();

  const stats = [
    {
      icon: Target,
      label: 'Average WPM',
      labelHindi: 'औसत डब्ल्यूपीएम',
      value: progress.averageWpm || 0,
      trend: 'up' as const,
      trendValue: '+5',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Award,
      label: 'Accuracy',
      labelHindi: 'सटीकता',
      value: `${progress.averageAccuracy || 0}%`,
      trend: 'up' as const,
      trendValue: '+2%',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Clock,
      label: 'Total Minutes',
      labelHindi: 'कुल मिनट',
      value: progress.totalMinutes,
      trend: 'up' as const,
      trendValue: '+15',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Trophy,
      label: 'Best WPM',
      labelHindi: 'सर्वश्रेष्ठ डब्ल्यूपीएम',
      value: progress.bestWpm || 0,
      trend: 'neutral' as const,
      trendValue: 'Best',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">डैशबोर्ड | Track your typing progress</p>
          </div>
          <Link
            to="/practice"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all"
          >
            <Play className="w-4 h-4" />
            Start Practice
          </Link>
        </div>

        {/* Streak Banner */}
        {progress.streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">{progress.streak} Day Streak! 🔥</div>
              <div className="text-white/80 text-sm">Keep practicing to maintain your streak</div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatsCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2">
            <ProgressChart 
              data={progress.weeklyData} 
              title="Weekly Progress" 
              titleHindi="साप्ताहिक प्रगति" 
            />
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
          >
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <p className="text-sm text-slate-500 mb-4">त्वरित कार्य</p>
            
            <div className="space-y-2">
              {[
                { label: 'English Practice', to: '/practice', color: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' },
                { label: 'Hindi Practice', to: '/practice', color: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' },
                { label: 'Take Exam', to: '/exam', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' },
                { label: 'View Results', to: '/results', color: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' }
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.to}
                  className={`flex items-center justify-between p-3 rounded-xl ${action.color} hover:scale-[1.02] transition-transform`}
                >
                  <span className="font-medium text-sm">{action.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">Recent Results</h3>
              <p className="text-sm text-slate-500">हाल के परिणाम</p>
            </div>
            <Link to="/results" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              View All
            </Link>
          </div>

          {progress.results.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">No results yet</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">अभी तक कोई परिणाम नहीं</p>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Practice
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {progress.results.slice(0, 5).map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      result.language === 'english'
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                        : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
                    }`}>
                      {result.language === 'english' ? 'EN' : 'हि'}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-white capitalize">
                        {result.language} Practice
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(result.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">{result.wpm}</div>
                      <div className="text-xs text-slate-400">WPM</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">{result.accuracy}%</div>
                      <div className="text-xs text-slate-400">Acc</div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="font-bold text-orange-600 dark:text-orange-400">{result.consistency}%</div>
                      <div className="text-xs text-slate-400">Cons</div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="font-bold text-slate-600 dark:text-slate-400">{result.duration}m</div>
                      <div className="text-xs text-slate-400">Time</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Performance Tips */}
        {progress.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: TrendingUp,
                title: 'Improvement Tip',
                titleHindi: 'सुधार सुझाव',
                tip: progress.averageWpm < 30 
                  ? 'Focus on accuracy first, speed will come naturally.'
                  : 'Great progress! Try increasing your test duration.',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                icon: Zap,
                title: 'Speed Tip',
                titleHindi: 'गति सुझाव',
                tip: 'Practice daily for 15-30 minutes for best results.',
                color: 'from-purple-500 to-pink-600'
              },
              {
                icon: AlertCircle,
                title: 'Accuracy Tip',
                titleHindi: 'सटीकता सुझाव',
                tip: 'Slow down if accuracy drops below 90%. Quality over quantity.',
                color: 'from-orange-500 to-red-600'
              }
            ].map((tip, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tip.color} flex items-center justify-center mb-3`}>
                  <tip.icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-slate-800 dark:text-white text-sm">{tip.title}</h4>
                <p className="text-xs text-slate-500 mb-2">{tip.titleHindi}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{tip.tip}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}