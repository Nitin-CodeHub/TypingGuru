import { motion } from 'framer-motion';
import { hindiLayouts, englishLayouts, fingerColors, fingerLabels } from '../lib/keyboardLayouts';
import { useApp, Language, HindiKeyboardLayout } from '../context/AppContext';
import { useState } from 'react';

interface VisualKeyboardProps {
  currentKey?: string | null;
  showFingerGuide?: boolean;
}

export default function VisualKeyboard({ currentKey, showFingerGuide = true }: VisualKeyboardProps) {
  const { language, hindiKeyboardLayout } = useApp();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const getLayout = () => {
    if (language === 'hindi') {
      return hindiLayouts[hindiKeyboardLayout as HindiKeyboardLayout] || hindiLayouts['remington-gail'];
    }
    return englishLayouts['qwerty'];
  };

  const layout = getLayout();

  const getKeyClass = (key: string) => {
    const isHomeRow = layout.homeRow.includes(key);
    const isCurrentKey = currentKey === key.toLowerCase() || currentKey === key;
    const finger = layout.fingerMapping[key];
    const fingerColor = finger ? fingerColors[finger] : '';

    let baseClass = 'relative flex items-center justify-center rounded-lg text-sm font-mono transition-all duration-150 cursor-pointer ';

    if (isCurrentKey) {
      baseClass += 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/50 z-10 ';
    } else if (isHomeRow) {
      baseClass += 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-2 border-indigo-300 dark:border-indigo-700 ';
    } else if (finger && showFingerGuide) {
      baseClass += `${fingerColor} text-white opacity-80 hover:opacity-100 `;
    } else {
      baseClass += 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 ';
    }

    return baseClass;
  };

  return (
    <div className="w-full">
      {/* Keyboard */}
      <div className="space-y-1.5 sm:space-y-2">
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((key, keyIndex) => (
              <motion.div
                key={`${rowIndex}-${keyIndex}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredKey(key)}
                onHoverEnd={() => setHoveredKey(null)}
                className={`${getKeyClass(key)} w-7 h-9 sm:w-10 sm:h-12 md:w-11 md:h-13`}
              >
                <span className="text-xs sm:text-sm md:text-base">{key}</span>
                
                {/* Finger guide tooltip */}
                {hoveredKey === key && layout.fingerMapping[key] && showFingerGuide && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-800 text-white text-xs whitespace-nowrap z-20"
                  >
                    {fingerLabels[layout.fingerMapping[key]]}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-slate-800" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Finger Guide Legend */}
      {showFingerGuide && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Finger Guide | उंगली गाइड</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {Object.entries(fingerColors).map(([finger, color]) => (
              <div key={finger} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${color}`} />
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  {fingerLabels[finger].split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Layout Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {layout.name} <span className="text-slate-400">|</span> {layout.nameHindi}
        </p>
        <p className="text-xs text-slate-500 mt-1">{layout.description}</p>
      </div>
    </div>
  );
}