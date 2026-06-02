import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TypingResult {
  id: string;
  date: string;
  language: 'hindi' | 'english';
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  examType?: string;
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
}

interface ProgressContextType {
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
  results: []
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
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

  useEffect(() => {
    localStorage.setItem('typeguru-progress', JSON.stringify(progress));
  }, [progress]);

  const addResult = (result: Omit<TypingResult, 'id' | 'date'>) => {
    const newResult: TypingResult = {
      ...result,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    setProgress(prev => {
      const newResults = [newResult, ...prev.results].slice(0, 50);
      const totalWpm = newResults.reduce((sum, r) => sum + r.wpm, 0);
      const totalAcc = newResults.reduce((sum, r) => sum + r.accuracy, 0);
      
      return {
        totalTests: prev.totalTests + 1,
        totalMinutes: prev.totalMinutes + result.duration,
        averageWpm: Math.round(totalWpm / newResults.length),
        averageAccuracy: Math.round(totalAcc / newResults.length),
        bestWpm: Math.max(prev.bestWpm, result.wpm),
        streak: calculateStreak(prev.lastPractice),
        lastPractice: new Date().toISOString(),
        results: newResults
      };
    });
  };

  const resetProgress = () => setProgress(defaultProgress);

  return (
    <ProgressContext.Provider value={{ progress, addResult, resetProgress }}>
      {children}
    </ProgressContext.Provider>
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

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}