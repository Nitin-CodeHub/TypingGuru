import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Keyboard, 
  Clock, 
  Target,
  CheckCircle2,
  AlertCircle,
  Languages,
  ChevronDown,
  Settings,
  Gauge,
  TrendingUp,
  Download
} from 'lucide-react';
import { useApp, Language, HindiKeyboardLayout, FontType } from '../context/AppContext';
import { TypingEngine, typingEngine } from '../lib/typingEngine';
import { hindiLayouts, englishLayouts } from '../lib/keyboardLayouts';
import { fontNames, fontNamesHindi } from '../lib/fontConverter';
import VisualKeyboard from '../components/VisualKeyboard';
import StatsCard from '../components/StatsCard';
import { englishParagraphs, hindiParagraphs } from '../lib/typingData';

type Duration = 1 | 2 | 5 | 10 | 15;

export default function Practice() {
  const { language, setLanguage, hindiKeyboardLayout, setHindiKeyboardLayout, fontType, setFontType, addResult, progress } = useApp();
  
  const [duration, setDuration] = useState<Duration>(2);
  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errors: 0, consistency: 0 });
  const [showResults, setShowResults] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  // Get random paragraph
  const getRandomText = useCallback(() => {
    const paragraphs = language === 'english' ? englishParagraphs : hindiParagraphs;
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
  }, [language]);

  // Initialize text
  useEffect(() => {
    setText(getRandomText());
  }, [getRandomText]);

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleFinish();
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  // Track current key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        setCurrentKey(e.key.toLowerCase());
      }
    };
    const handleKeyUp = () => setCurrentKey(null);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (textDisplayRef.current && typedText.length > 0) {
      const chars = textDisplayRef.current.querySelectorAll('span');
      if (chars[typedText.length]) {
        chars[typedText.length].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [typedText]);

  const startTest = () => {
    setIsActive(true);
    setIsPaused(false);
    typingEngine.startSession(text, language);
    inputRef.current?.focus();
  };

  const pauseTest = () => {
    setIsPaused(true);
    typingEngine.pause();
  };

  const resumeTest = () => {
    setIsPaused(false);
    typingEngine.resume();
    inputRef.current?.focus();
  };

  const resetTest = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    setTypedText('');
    setText(getRandomText());
    setShowResults(false);
    typingEngine.reset();
  };

  const handleFinish = () => {
    setIsActive(false);
    const engineStats = typingEngine.getStats();
    const timeElapsed = duration * 60 - timeLeft;
    
    setStats({
      wpm: engineStats.wpm,
      accuracy: engineStats.accuracy,
      errors: engineStats.incorrectChars,
      consistency: engineStats.consistency
    });
    
    addResult({
      language,
      wpm: engineStats.wpm,
      accuracy: engineStats.accuracy,
      duration: Math.ceil(timeElapsed / 60),
      errors: engineStats.incorrectChars,
      correctChars: engineStats.correctChars,
      totalChars: engineStats.totalChars,
      consistency: engineStats.consistency
    });
    
    setShowResults(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive || isPaused) return;
    const newText = e.target.value;
    setTypedText(newText);
    
    // Update stats
    const engineStats = typingEngine.getStats();
    setStats({
      wpm: engineStats.wpm,
      accuracy: engineStats.accuracy,
      errors: engineStats.incorrectChars,
      consistency: engineStats.consistency
    });
    
    // Check if completed
    if (newText.length >= text.length) {
      handleFinish();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGrade = (accuracy: number, wpm: number): { grade: string; color: string; message: string } => {
    if (accuracy >= 95 && wpm >= 40) {
      return { grade: 'A+', color: 'text-emerald-500', message: 'Excellent! Professional level typing.' };
    } else if (accuracy >= 90 && wpm >= 35) {
      return { grade: 'A', color: 'text-green-500', message: 'Great job! You\'re above average.' };
    } else if (accuracy >= 85 && wpm >= 30) {
      return { grade: 'B+', color: 'text-blue-500', message: 'Good progress! Keep practicing.' };
    } else if (accuracy >= 80 && wpm >= 25) {
      return { grade: 'B', color: 'text-cyan-500', message: 'Nice work! Room for improvement.' };
    } else if (accuracy >= 70 && wpm >= 20) {
      return { grade: 'C', color: 'text-yellow-500', message: 'Fair performance. Practice more.' };
    } else {
      return { grade: 'D', color: 'text-orange-500', message: 'Keep practicing to improve.' };
    }
  };

  const grade = getGrade(stats.accuracy, stats.wpm);

  const renderText = () => {
    return text.split('').map((char, i) => {
      let className = 'text-slate-400 dark:text-slate-500';
      if (i < typedText.length) {
        className = typedText[i] === char 
          ? 'text-emerald-600 dark:text-emerald-400' 
          : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded';
      } else if (i === typedText.length) {
        className = 'text-slate-800 dark:text-white bg-indigo-200 dark:bg-indigo-800 rounded animate-pulse';
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Typing Practice
          </h1>
          <p className="text-slate-600 dark:text-slate-400">टाइपिंग अभ्यास | Improve your speed and accuracy</p>
        </div>

        {/* Settings Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { setLanguage('english'); resetTest(); }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                language === 'english'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
            </button>
            <button
              onClick={() => { setLanguage('hindi'); resetTest(); }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                language === 'hindi'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">हिंदी</span>
              <span className="sm:hidden">हि</span>
            </button>
          </div>

          {/* Duration Select */}
          <div className="relative">
            <select
              value={duration}
              onChange={(e) => { setDuration(Number(e.target.value) as Duration); resetTest(); }}
              className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>1 min</option>
              <option value={2}>2 min</option>
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Keyboard Layout (Hindi only) */}
          {language === 'hindi' && (
            <div className="relative">
              <select
                value={hindiKeyboardLayout}
                onChange={(e) => setHindiKeyboardLayout(e.target.value as HindiKeyboardLayout)}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="remington-gail">Remington Gail</option>
                <option value="remington-cbi">Remington CBI</option>
                <option value="inscript">Inscript</option>
                <option value="indic-input">Indic Input</option>
                <option value="phonetic">Phonetic</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          )}

          {/* Font Select */}
          {language === 'hindi' && (
            <div className="relative">
              <select
                value={fontType}
                onChange={(e) => setFontType(e.target.value as FontType)}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="unicode">Unicode (Mangal)</option>
                <option value="krutidev-010">KrutiDev 010</option>
                <option value="krutidev-016">KrutiDev 016</option>
                <option value="devlys">DevLys</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          )}

          {/* Keyboard Toggle */}
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              showKeyboard
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden sm:inline">Keyboard</span>
          </button>
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatsCard
            icon={Clock}
            label="Time"
            labelHindi="समय"
            value={formatTime(timeLeft)}
            color="from-indigo-500 to-purple-600"
            delay={0}
          />
          <StatsCard
            icon={Gauge}
            label="WPM"
            labelHindi="शब्द प्रति मिनट"
            value={stats.wpm}
            color="from-purple-500 to-pink-600"
            delay={0.1}
          />
          <StatsCard
            icon={Target}
            label="Accuracy"
            labelHindi="सटीकता"
            value={`${stats.accuracy}%`}
            color="from-emerald-500 to-teal-600"
            delay={0.2}
          />
          <StatsCard
            icon={TrendingUp}
            label="Consistency"
            labelHindi="निरंतरता"
            value={`${stats.consistency}%`}
            color="from-orange-500 to-red-600"
            delay={0.3}
          />
        </div>

        {/* Typing Area */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none mb-6">
          {/* Text Display */}
          <div 
            ref={textDisplayRef}
            className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 min-h-[100px] sm:min-h-[140px] max-h-[200px] overflow-y-auto text-base sm:text-lg lg:text-xl leading-relaxed font-mono cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {renderText()}
          </div>

          {/* Input Area */}
          <textarea
            ref={inputRef}
            value={typedText}
            onChange={handleChange}
            disabled={!isActive || isPaused}
            placeholder={isActive ? 'Start typing...' : 'Click Start to begin'}
            className="w-full p-4 sm:p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-0 outline-none resize-none text-base sm:text-lg font-mono text-slate-800 dark:text-white placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            rows={3}
          />

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {!isActive ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTest}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
              >
                <Play className="w-5 h-5" />
                Start Practice
              </motion.button>
            ) : isPaused ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resumeTest}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg"
              >
                <Play className="w-5 h-5" />
                Resume
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={pauseTest}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg"
              >
                <Pause className="w-5 h-5" />
                Pause
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetTest}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-semibold border border-slate-200 dark:border-slate-600"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
          </div>
        </div>

        {/* Virtual Keyboard */}
        <AnimatePresence>
          {showKeyboard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-indigo-600" />
                  {language === 'english' ? 'English Keyboard' : 'हिंदी कीबोर्ड'}
                </h3>
                <span className="text-xs text-slate-500">{fontNames[fontType]}</span>
              </div>
              <VisualKeyboard currentKey={currentKey} showFingerGuide={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Modal */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={(e) => e.target === e.currentTarget && setShowResults(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">
                  Practice Complete! 🎉
                </h2>
                
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold ${grade.color}`}>{grade.grade}</div>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">{grade.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-600">{stats.wpm}</div>
                    <div className="text-sm text-slate-500">WPM</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600">{stats.accuracy}%</div>
                    <div className="text-sm text-slate-500">Accuracy</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600">{stats.consistency}%</div>
                    <div className="text-sm text-slate-500">Consistency</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-red-500">{stats.errors}</div>
                    <div className="text-sm text-slate-500">Errors</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetTest}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-all"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white font-semibold hover:scale-[1.02] transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}