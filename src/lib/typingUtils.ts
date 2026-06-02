export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

export function calculateTypingStats(
  originalText: string,
  typedText: string,
  timeElapsed: number // in seconds
): TypingStats {
  let correctChars = 0;
  let errors = 0;
  const minLength = Math.min(originalText.length, typedText.length);

  for (let i = 0; i < minLength; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    } else {
      errors++;
    }
  }

  // Count remaining characters as errors
  if (typedText.length < originalText.length) {
    // Don't count untyped characters as errors
  } else if (typedText.length > originalText.length) {
    errors += typedText.length - originalText.length;
  }

  const totalChars = typedText.length;
  const accuracy = totalChars > 0 ? Math.round((correctChars / originalText.length) * 100) : 0;
  
  // WPM calculation: (characters / 5) / minutes
  // For Hindi, we count each character as one unit
  const words = correctChars / 5;
  const minutes = timeElapsed / 60;
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

  return {
    wpm,
    accuracy,
    errors,
    correctChars,
    totalChars,
    timeElapsed
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getGrade(accuracy: number, wpm: number): { grade: string; color: string; message: string } {
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
}

export const EXAM_REQUIREMENTS = {
  ssc: { minWpm: 35, minAccuracy: 90, duration: 10 },
  cpct: { minWpm: 30, minAccuracy: 85, duration: 15 },
  dataEntry: { minWpm: 25, minAccuracy: 92, duration: 10 },
  government: { minWpm: 30, minAccuracy: 90, duration: 10 }
};