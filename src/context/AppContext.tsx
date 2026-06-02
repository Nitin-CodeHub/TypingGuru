import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'english' | 'hindi';
type HindiKeyboardLayout = 'remington-gail' | 'remington-cbi' | 'inscript' | 'indic-input' | 'phonetic';
type FontType = 'unicode' | 'krutidev-010' | 'krutidev-016' | 'devlys';

interface TypingResult {
  id: string;
  date: string;
  language: Language;
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  examType?: string;
  correctChars: number;
  totalChars: number;
  consistency: number;
}

interface UserProgress {
  totalTests: number;
  totalMinutes: number;
  averageWpm: number;
  averageAccuracy: number;
  bestWpm: number;
  streak: number;
  lastPractice: string | null;
  results: TypingResult[];
  weeklyData: { date: string; wpm: number; accuracy: number }[];
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  hindiKeyboardLayout: HindiKeyboardLayout;
  setHindiKeyboardLayout: (layout: HindiKeyboardLayout) => void;
  fontType: FontType;
  setFontType: (font: FontType) => void;
  progress: UserProgress;
  addResult: (result: Omit<TypingResult, 'id' | 'date'>) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  totalTests: 0,
  totalMinutes: 0,
  averageWpm: 0,
  averageAccuracy: 0,
  bestWpm: 0,
  streak: 0,
  lastPractice: null,
  results: [],
  weeklyData: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('typeguru-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('typeguru-language') as Language) || 'english';
    }
    return 'english';
  });

  const [hindiKeyboardLayout, setHindiKeyboardLayout] = useState<HindiKeyboardLayout>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('typeguru-hindi-layout') as HindiKeyboardLayout) || 'remington-gail';
    }
    return 'remington-gail';
  });

  const [fontType, setFontType] = useState<FontType>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('typeguru-font') as FontType) || 'unicode';
    }
    return 'unicode';
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('typeguru-progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultProgress;
        }
      }
    }
    return defaultProgress;
  });

  // Persist settings
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('typeguru-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('typeguru-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('typeguru-hindi-layout', hindiKeyboardLayout);
  }, [hindiKeyboardLayout]);

  useEffect(() => {
    localStorage.setItem('typeguru-font', fontType);
  }, [fontType]);

  useEffect(() => {
    localStorage.setItem('typeguru-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addResult = (result: Omit<TypingResult, 'id' | 'date'>) => {
    const newResult: TypingResult = {
      ...result,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    setProgress(prev => {
      const newResults = [newResult, ...prev.results].slice(0, 100);
      const totalWpm = newResults.reduce((sum, r) => sum + r.wpm, 0);
      const totalAcc = newResults.reduce((sum, r) => sum + r.accuracy, 0);
      
      // Update weekly data
      const today = new Date().toISOString().split('T')[0];
      const existingDayIndex = prev.weeklyData.findIndex(d => d.date === today);
      const newWeeklyData = [...prev.weeklyData];
      
      if (existingDayIndex >= 0) {
        newWeeklyData[existingDayIndex] = {
          date: today,
          wpm: Math.round((newWeeklyData[existingDayIndex].wpm + result.wpm) / 2),
          accuracy: Math.round((newWeeklyData[existingDayIndex].accuracy + result.accuracy) / 2)
        };
      } else {
        newWeeklyData.push({
          date: today,
          wpm: result.wpm,
          accuracy: result.accuracy
        });
      }
      
      // Keep last 30 days
      const weeklyData = newWeeklyData.slice(-30);

      return {
        totalTests: prev.totalTests + 1,
        totalMinutes: prev.totalMinutes + result.duration,
        averageWpm: Math.round(totalWpm / newResults.length),
        averageAccuracy: Math.round(totalAcc / newResults.length),
        bestWpm: Math.max(prev.bestWpm, result.wpm),
        streak: calculateStreak(prev.lastPractice),
        lastPractice: new Date().toISOString(),
        results: newResults,
        weeklyData
      };
    });
  };

  const resetProgress = () => setProgress(defaultProgress);

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      language,
      setLanguage,
      hindiKeyboardLayout,
      setHindiKeyboardLayout,
      fontType,
      setFontType,
      progress,
      addResult,
      resetProgress
    }}>
      {children}
    </AppContext.Provider>
  );
}

function calculateStreak(lastPractice: string | null): number {
  if (!lastPractice) return 1;
  const last = new Date(lastPractice);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0 || diffDays === 1) return 1;
  return 0;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export type { Language, HindiKeyboardLayout, FontType, TypingResult, UserProgress };