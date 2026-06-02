import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  CheckCircle2,
  Type,
  FileText,
  Keyboard,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Info
} from 'lucide-react';
import { transliterateToHindi, krutiDevToUnicode, unicodeToKrutiDev, fontNames, fontNamesHindi, FontType } from '../lib/fontConverter';

const tools = [
  {
    id: 'converter',
    icon: Languages,
    title: 'Hindi Converter',
    titleHindi: 'हिंदी कन्वर्टर',
    description: 'Convert English to Hindi (Transliteration)'
  },
  {
    id: 'unicode',
    icon: Type,
    title: 'Unicode ↔ KrutiDev',
    titleHindi: 'यूनिकोड ↔ कृतिदेव',
    description: 'Convert between Unicode and KrutiDev fonts'
  },
  {
    id: 'guide',
    icon: BookOpen,
    title: 'Typing Guide',
    titleHindi: 'टाइपिंग गाइड',
    description: 'Learn Hindi and English typing'
  }
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState('converter');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [conversionType, setConversionType] = useState<'toUnicode' | 'toKrutiDev'>('toUnicode');

  const handleConvert = () => {
    if (activeTool === 'converter') {
      const converted = transliterateToHindi(inputText);
      setOutputText(converted);
    } else if (activeTool === 'unicode') {
      if (conversionType === 'toUnicode') {
        setOutputText(krutiDevToUnicode(inputText));
      } else {
        setOutputText(unicodeToKrutiDev(inputText));
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2"
          >
            Typing Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400"
          >
            टाइपिंग उपकरण | Useful tools for Hindi typing
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 rounded-2xl text-left transition-all ${
                activeTool === tool.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <tool.icon className={`w-5 h-5 mb-2 ${
                activeTool === tool.id ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'
              }`} />
              <div className="font-semibold text-xs sm:text-sm">{tool.title}</div>
              <div className={`text-[10px] sm:text-xs ${
                activeTool === tool.id ? 'text-white/70' : 'text-slate-500'
              }`}>
                {tool.titleHindi}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tool Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl"
        >
          {activeTool === 'converter' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Hindi Converter</h2>
                  <p className="text-xs text-slate-500">हिंदी कन्वर्टर - English to Hindi Transliteration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    English Text (इंग्लिश टेक्स्ट)
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type in English... (जैसे: namaste dosto)"
                    className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none resize-none text-slate-800 dark:text-white placeholder-slate-400 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Hindi Output (हिंदी आउटपुट)
                  </label>
                  <div className="relative">
                    <textarea
                      value={outputText}
                      readOnly
                      placeholder="Hindi text will appear here..."
                      className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 text-sm"
                    />
                    {outputText && (
                      <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <button
                  onClick={handleConvert}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Convert to Hindi
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-600 hover:scale-105 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </button>
              </div>

              {/* Quick Examples */}
              <div className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3 text-sm">Quick Examples:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { en: 'namaste', hi: 'नमस्ते' },
                    { en: 'dhanyavaad', hi: 'धन्यवाद' },
                    { en: 'kaise ho', hi: 'कैसे हो' },
                    { en: 'aapka swagat hai', hi: 'आपका स्वागत है' }
                  ].map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputText(ex.en);
                        setOutputText(ex.hi);
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-slate-800 text-xs text-left hover:ring-2 ring-indigo-300 transition-all"
                    >
                      <div className="text-slate-600 dark:text-slate-400">{ex.en}</div>
                      <div className="text-indigo-600 dark:text-indigo-400 font-medium">{ex.hi}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTool === 'unicode' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <Type className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Unicode ↔ KrutiDev Converter</h2>
                  <p className="text-xs text-slate-500">यूनिकोड ↔ कृतिदेव कन्वर्टर</p>
                </div>
              </div>

              {/* Conversion Type Toggle */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={() => setConversionType('toUnicode')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    conversionType === 'toUnicode'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  KrutiDev → Unicode
                </button>
                <button
                  onClick={() => setConversionType('toKrutiDev')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    conversionType === 'toKrutiDev'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Unicode → KrutiDev
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {conversionType === 'toUnicode' ? 'KrutiDev Text' : 'Unicode Text'}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={conversionType === 'toUnicode' ? 'Paste KrutiDev text here...' : 'Paste Unicode Hindi text here...'}
                    className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-0 outline-none resize-none text-slate-800 dark:text-white placeholder-slate-400 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {conversionType === 'toUnicode' ? 'Unicode Output' : 'KrutiDev Output'}
                  </label>
                  <div className="relative">
                    <textarea
                      value={outputText}
                      readOnly
                      placeholder="Converted text will appear here..."
                      className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 text-sm"
                    />
                    {outputText && (
                      <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <button
                  onClick={handleConvert}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Convert
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-600 hover:scale-105 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          )}

          {activeTool === 'guide' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Typing Guide</h2>
                  <p className="text-xs text-slate-500">टाइपिंग गाइड - Learn proper typing techniques</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Home Row Position',
                    titleHindi: 'होम रो पोजीशन',
                    content: 'Place your fingers on ASDF (left) and JKL; (right). This is the starting position for touch typing.',
                    tip: 'अपनी उंगलियां ASDF और JKL; पर रखें'
                  },
                  {
                    title: 'Proper Posture',
                    titleHindi: 'सही मुद्रा',
                    content: 'Sit straight with feet flat on the floor. Keep your elbows at a 90-degree angle.',
                    tip: 'सीधे बैठें, पैर जमीन पर रखें'
                  },
                  {
                    title: 'Focus on Screen',
                    titleHindi: 'स्क्रीन पर ध्यान',
                    content: 'Never look at the keyboard while typing. Trust your muscle memory and focus on the screen.',
                    tip: 'कीबोर्ड पर न देखें, स्क्रीन देखें'
                  },
                  {
                    title: 'Practice Regularly',
                    titleHindi: 'नियमित अभ्यास',
                    content: 'Practice for at least 15-30 minutes daily. Consistency is more important than long sessions.',
                    tip: 'रोज 15-30 मिनट का अभ्यास करें'
                  }
                ].map((section, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1 text-sm">{section.title}</h3>
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mb-2">{section.titleHindi}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{section.content}</p>
                    <p className="text-[10px] text-slate-500 italic">💡 {section.tip}</p>
                  </div>
                ))}
              </div>

              {/* Keyboard Layouts Info */}
              <div className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Hindi Keyboard Layouts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { name: 'Remington Gail', desc: 'Most popular for government exams' },
                    { name: 'Remington CBI', desc: 'Traditional typewriter layout' },
                    { name: 'Inscript', desc: 'Government standard layout' },
                    { name: 'Phonetic', desc: 'Type as you speak' }
                  ].map((layout, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white dark:bg-slate-800 text-xs">
                      <div className="font-medium text-slate-800 dark:text-white">{layout.name}</div>
                      <div className="text-slate-500">{layout.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}