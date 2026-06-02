import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Download, 
  Printer, 
  Share2, 
  Trophy,
  Target,
  Calendar,
  Clock,
  Play,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Results() {
  const { progress } = useApp();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const getGrade = (accuracy: number, wpm: number): { grade: string; color: string; message: string } => {
    if (accuracy >= 95 && wpm >= 40) return { grade: 'A+', color: 'text-emerald-500', message: 'Excellent!' };
    if (accuracy >= 90 && wpm >= 35) return { grade: 'A', color: 'text-green-500', message: 'Great job!' };
    if (accuracy >= 85 && wpm >= 30) return { grade: 'B+', color: 'text-blue-500', message: 'Good progress!' };
    if (accuracy >= 80 && wpm >= 25) return { grade: 'B', color: 'text-cyan-500', message: 'Nice work!' };
    if (accuracy >= 70 && wpm >= 20) return { grade: 'C', color: 'text-yellow-500', message: 'Keep practicing!' };
    return { grade: 'D', color: 'text-orange-500', message: 'Practice more!' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2"
          >
            Results & Certificates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400"
          >
            परिणाम और प्रमाण पत्र | View your achievements
          </motion.p>
        </div>

        {progress.results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200/50 dark:border-slate-700/50 shadow-xl text-center"
          >
            <Award className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Results Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Complete a typing test to see your results here
            </p>
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all"
            >
              <Play className="w-5 h-5" />
              Start Practice
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Overall Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 sm:p-6 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-white/80 text-sm">Overall Performance</div>
                    <div className="text-xl font-bold">{progress.totalTests} Tests Completed</div>
                    <div className="text-white/80 text-sm">{progress.totalMinutes} minutes practiced</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{progress.averageWpm}</div>
                    <div className="text-white/80 text-xs">Avg WPM</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{progress.averageAccuracy}%</div>
                    <div className="text-white/80 text-xs">Avg Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{progress.bestWpm}</div>
                    <div className="text-white/80 text-xs">Best WPM</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results List */}
            <div className="space-y-3">
              {progress.results.slice(0, 10).map((result, i) => {
                const grade = getGrade(result.accuracy, result.wpm);
                
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                          result.language === 'english'
                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                            : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
                        }`}>
                          {grade.grade}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800 dark:text-white capitalize text-sm">
                              {result.language} Typing Test
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                              result.language === 'english'
                                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                                : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
                            }`}>
                              {result.language === 'english' ? 'EN' : 'हि'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(result.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {result.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{result.wpm}</div>
                          <div className="text-[10px] text-slate-500">WPM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{result.accuracy}%</div>
                          <div className="text-[10px] text-slate-500">Accuracy</div>
                        </div>
                        <div className="text-center hidden sm:block">
                          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{result.consistency}%</div>
                          <div className="text-[10px] text-slate-500">Consistency</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <span className={`text-xs ${grade.color}`}>{grade.message}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrint}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          <Printer className="w-3 h-3" />
                          Print
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certificate Preview */}
        {progress.results.length > 0 && (
          <motion.div
            ref={certificateRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border-4 border-double border-indigo-200 dark:border-indigo-800 shadow-xl print:shadow-none"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                Certificate of Achievement
              </h2>
              <p className="text-slate-500 mb-6 text-sm">उपलब्धि प्रमाण पत्र</p>
              
              <div className="max-w-md mx-auto">
                <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                  This is to certify that
                </p>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 py-2 border-b-2 border-indigo-200 dark:border-indigo-800">
                  TypeGuru User
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                  has successfully completed a typing test with
                </p>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">{progress.bestWpm}</div>
                    <div className="text-xs text-slate-500">WPM</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{progress.averageAccuracy}%</div>
                    <div className="text-xs text-slate-500">Accuracy</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Certificate
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-600 hover:scale-105 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}