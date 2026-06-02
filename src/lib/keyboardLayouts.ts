// Hindi Keyboard Layouts for different typing methods

export interface KeyboardLayout {
  name: string;
  nameHindi: string;
  description: string;
  rows: string[][];
  homeRow: string[];
  fingerMapping: Record<string, string>;
}

// Remington Gail Layout (Most common for Hindi typing exams)
export const remingtonGailLayout: KeyboardLayout = {
  name: 'Remington Gail',
  nameHindi: 'रेमिंगटन गेल',
  description: 'Most popular layout for government exams',
  rows: [
    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ड', 'ज', 'ड़', 'ॉ'],
    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट', 'ॉ'],
    ['ं', 'म', 'न', 'व', 'ल', 'स', ',', '.', 'य', 'श', 'ष'],
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः']
  ],
  homeRow: ['्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च'],
  fingerMapping: {
    '्': 'left-pinky', 'ि': 'left-ring', 'ु': 'left-middle', 'प': 'left-index',
    'र': 'right-index', 'क': 'right-middle', 'त': 'right-ring', 'च': 'right-pinky'
  }
};

// Remington CBI Layout
export const remingtonCBILayout: KeyboardLayout = {
  name: 'Remington CBI',
  nameHindi: 'रेमिंगटन सीबीआई',
  description: 'Traditional typewriter layout',
  rows: [
    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ड', 'ज', 'ड़'],
    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट'],
    ['ं', 'म', 'न', 'व', 'ल', 'स', 'य', 'श', 'ष', '।'],
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ']
  ],
  homeRow: ['्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च'],
  fingerMapping: {
    '्': 'left-pinky', 'ि': 'left-ring', 'ु': 'left-middle', 'प': 'left-index',
    'र': 'right-index', 'क': 'right-middle', 'त': 'right-ring', 'च': 'right-pinky'
  }
};

// Inscript Layout (Indian Script)
export const inscriptLayout: KeyboardLayout = {
  name: 'Inscript',
  nameHindi: 'इन्स्क्रिप्ट',
  description: 'Government standard layout',
  rows: [
    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ड', 'ज', 'ड़', 'ॉ'],
    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट', 'ँ'],
    ['ं', 'म', 'न', 'व', 'ल', 'स', ',', '.', 'य', 'श', 'ष', '।'],
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'ऋ', 'ॠ']
  ],
  homeRow: ['्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च'],
  fingerMapping: {
    '्': 'left-pinky', 'ि': 'left-ring', 'ु': 'left-middle', 'प': 'left-index',
    'र': 'right-index', 'क': 'right-middle', 'त': 'right-ring', 'च': 'right-pinky'
  }
};

// Indic Input Layout (Phonetic-based)
export const indicInputLayout: KeyboardLayout = {
  name: 'Indic Input',
  nameHindi: 'इंडिक इनपुट',
  description: 'Phonetic based input method',
  rows: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ'],
    ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ'],
    ['म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ']
  ],
  homeRow: ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
  fingerMapping: {
    'ड': 'left-pinky', 'ढ': 'left-ring', 'ण': 'left-middle', 'त': 'left-index',
    'थ': 'right-index', 'द': 'right-middle', 'ध': 'right-ring', 'न': 'right-pinky'
  }
};

// Phonetic Layout
export const phoneticLayout: KeyboardLayout = {
  name: 'Phonetic',
  nameHindi: 'फोनेटिक',
  description: 'Type Hindi as it sounds in English',
  rows: [
    ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ड', 'ज', 'ड़'],
    ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट', 'ँ'],
    ['ं', 'म', 'न', 'व', 'ल', 'स', 'य', 'श', 'ष', '।'],
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ']
  ],
  homeRow: ['्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च'],
  fingerMapping: {
    '्': 'left-pinky', 'ि': 'left-ring', 'ु': 'left-middle', 'प': 'left-index',
    'र': 'right-index', 'क': 'right-middle', 'त': 'right-ring', 'च': 'right-pinky'
  }
};

// English QWERTY Layout
export const englishQWERTYLayout: KeyboardLayout = {
  name: 'English QWERTY',
  nameHindi: 'अंग्रेजी क्वर्टी',
  description: 'Standard English keyboard',
  rows: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ],
  homeRow: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
  fingerMapping: {
    'a': 'left-pinky', 's': 'left-ring', 'd': 'left-middle', 'f': 'left-index',
    'j': 'right-index', 'k': 'right-middle', 'l': 'right-ring', ';': 'right-pinky'
  }
};

// All layouts
export const hindiLayouts = {
  'remington-gail': remingtonGailLayout,
  'remington-cbi': remingtonCBILayout,
  'inscript': inscriptLayout,
  'indic-input': indicInputLayout,
  'phonetic': phoneticLayout
};

export const englishLayouts = {
  'qwerty': englishQWERTYLayout
};

// Finger colors for visual guides
export const fingerColors: Record<string, string> = {
  'left-pinky': 'bg-pink-500',
  'left-ring': 'bg-purple-500',
  'left-middle': 'bg-indigo-500',
  'left-index': 'bg-blue-500',
  'right-index': 'bg-cyan-500',
  'right-middle': 'bg-teal-500',
  'right-ring': 'bg-emerald-500',
  'right-pinky': 'bg-green-500'
};

export const fingerLabels: Record<string, string> = {
  'left-pinky': 'Left Pinky',
  'left-ring': 'Left Ring',
  'left-middle': 'Left Middle',
  'left-index': 'Left Index',
  'right-index': 'Right Index',
  'right-middle': 'Right Middle',
  'right-ring': 'Right Ring',
  'right-pinky': 'Right Pinky'
};