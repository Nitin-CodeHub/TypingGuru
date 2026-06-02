// Advanced Real-time Typing Engine

export interface TypingSession {
  id: string;
  startTime: number;
  endTime: number | null;
  language: 'english' | 'hindi';
  originalText: string;
  typedText: string;
  keyEvents: KeyEvent[];
  isComplete: boolean;
}

export interface KeyEvent {
  key: string;
  timestamp: number;
  isCorrect: boolean;
  expectedChar: string;
  position: number;
}

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errorRate: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  totalKeystrokes: number;
  timeElapsed: number;
  consistency: number;
  burstSpeed: number[];
  averageBurstSpeed: number;
}

export interface CharacterStats {
  char: string;
  correct: number;
  incorrect: number;
  averageTime: number;
}

export class TypingEngine {
  private session: TypingSession | null = null;
  private startTime: number = 0;
  private typedText: string = '';
  private keyEvents: KeyEvent[] = [];
  private isPaused: boolean = false;
  private pauseTime: number = 0;
  private totalPauseTime: number = 0;
  private burstInterval: number = 5000; // 5 seconds
  private burstSpeeds: number[] = [];
  private lastBurstTime: number = 0;
  private burstChars: number = 0;

  constructor() {
    this.reset();
  }

  startSession(text: string, language: 'english' | 'hindi'): void {
    this.session = {
      id: crypto.randomUUID(),
      startTime: Date.now(),
      endTime: null,
      language,
      originalText: text,
      typedText: '',
      keyEvents: [],
      isComplete: false
    };
    this.startTime = Date.now();
    this.typedText = '';
    this.keyEvents = [];
    this.isPaused = false;
    this.totalPauseTime = 0;
    this.burstSpeeds = [];
    this.lastBurstTime = Date.now();
    this.burstChars = 0;
  }

  processKey(key: string): { isCorrect: boolean; expectedChar: string | null; isComplete: boolean } {
    if (!this.session || this.isPaused) {
      return { isCorrect: false, expectedChar: null, isComplete: false };
    }

    const position = this.typedText.length;
    const expectedChar = this.session.originalText[position] || '';
    const isCorrect = key === expectedChar;

    // Record key event
    const keyEvent: KeyEvent = {
      key,
      timestamp: Date.now(),
      isCorrect,
      expectedChar,
      position
    };
    this.keyEvents.push(keyEvent);

    // Update typed text
    this.typedText += key;

    // Track burst speed
    this.burstChars++;
    const now = Date.now();
    if (now - this.lastBurstTime >= this.burstInterval) {
      const burstWpm = Math.round((this.burstChars / 5) / ((now - this.lastBurstTime) / 60000));
      this.burstSpeeds.push(burstWpm);
      this.lastBurstTime = now;
      this.burstChars = 0;
    }

    // Check if complete
    const isComplete = this.typedText.length >= this.session.originalText.length;

    if (isComplete) {
      this.session.endTime = Date.now();
      this.session.typedText = this.typedText;
      this.session.keyEvents = this.keyEvents;
      this.session.isComplete = true;
    }

    return { isCorrect, expectedChar, isComplete };
  }

  backspace(): void {
    if (this.typedText.length > 0) {
      this.typedText = this.typedText.slice(0, -1);
    }
  }

  pause(): void {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pauseTime = Date.now();
    }
  }

  resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.totalPauseTime += Date.now() - this.pauseTime;
    }
  }

  reset(): void {
    this.session = null;
    this.startTime = 0;
    this.typedText = '';
    this.keyEvents = [];
    this.isPaused = false;
    this.totalPauseTime = 0;
    this.burstSpeeds = [];
    this.lastBurstTime = 0;
    this.burstChars = 0;
  }

  getTypedText(): string {
    return this.typedText;
  }

  getStats(): TypingStats {
    if (!this.session) {
      return this.getEmptyStats();
    }

    const effectiveTime = (Date.now() - this.startTime - this.totalPauseTime) / 1000;
    const correctChars = this.keyEvents.filter(e => e.isCorrect).length;
    const incorrectChars = this.keyEvents.filter(e => !e.isCorrect).length;
    const totalChars = this.typedText.length;
    const totalKeystrokes = this.keyEvents.length;

    // Calculate WPM (words = characters / 5)
    const words = correctChars / 5;
    const minutes = effectiveTime / 60;
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

    // Raw WPM (including errors)
    const rawWords = totalChars / 5;
    const rawWpm = minutes > 0 ? Math.round(rawWords / minutes) : 0;

    // Accuracy
    const accuracy = totalChars > 0 ? Math.round((correctChars / this.session.originalText.length) * 100) : 0;

    // Error rate
    const errorRate = totalChars > 0 ? Math.round((incorrectChars / totalChars) * 100) : 0;

    // Consistency (based on burst speeds)
    const consistency = this.calculateConsistency();

    // Average burst speed
    const averageBurstSpeed = this.burstSpeeds.length > 0
      ? Math.round(this.burstSpeeds.reduce((a, b) => a + b, 0) / this.burstSpeeds.length)
      : wpm;

    return {
      wpm,
      rawWpm,
      accuracy: Math.min(accuracy, 100),
      errorRate,
      correctChars,
      incorrectChars,
      totalChars,
      totalKeystrokes,
      timeElapsed: Math.floor(effectiveTime),
      consistency,
      burstSpeed: this.burstSpeeds,
      averageBurstSpeed
    };
  }

  getCharacterStats(): CharacterStats[] {
    const charStats: Record<string, CharacterStats> = {};

    for (const event of this.keyEvents) {
      if (!charStats[event.expectedChar]) {
        charStats[event.expectedChar] = {
          char: event.expectedChar,
          correct: 0,
          incorrect: 0,
          averageTime: 0
        };
      }

      if (event.isCorrect) {
        charStats[event.expectedChar].correct++;
      } else {
        charStats[event.expectedChar].incorrect++;
      }
    }

    return Object.values(charStats);
  }

  isSessionActive(): boolean {
    return this.session !== null && !this.session.isComplete;
  }

  isPausedSession(): boolean {
    return this.isPaused;
  }

  private getEmptyStats(): TypingStats {
    return {
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      errorRate: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      totalKeystrokes: 0,
      timeElapsed: 0,
      consistency: 100,
      burstSpeed: [],
      averageBurstSpeed: 0
    };
  }

  private calculateConsistency(): number {
    if (this.burstSpeeds.length < 2) return 100;

    const mean = this.burstSpeeds.reduce((a, b) => a + b, 0) / this.burstSpeeds.length;
    const variance = this.burstSpeeds.reduce((sum, speed) => sum + Math.pow(speed - mean, 2), 0) / this.burstSpeeds.length;
    const stdDev = Math.sqrt(variance);
    
    // Convert to percentage (lower std dev = higher consistency)
    const consistencyPercent = Math.max(0, Math.min(100, 100 - (stdDev / mean) * 100));
    return Math.round(consistencyPercent);
  }
}

// Singleton instance
export const typingEngine = new TypingEngine();