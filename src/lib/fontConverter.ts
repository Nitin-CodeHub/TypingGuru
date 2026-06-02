// Unicode to KrutiDev and vice versa conversion utilities

// KrutiDev to Unicode mapping (simplified)
const krutiToUnicodeMap: Record<string, string> = {
  'd': 'अ', 'D': 'आ', 'p': 'इ', 'P': 'ई',
  '[': 'उ', '{': 'ऊ', 'k': 'ए', 'K': 'ऐ',
  ']': 'ओ', '}': 'औ', '´': 'अं', '¨': 'अः',
  'a': 'क', 's': 'ख', 'w': 'ग', 'W': 'घ',
  'q': 'ङ', 'l': 'च', 'L': 'छ', 'u': 'ज',
  'U': 'झ', '`': 'ञ', 'f': 'ट', 'F': 'ठ',
  'T': 'ड', 't': 'ढ', 'r': 'ण', 'n': 'त',
  'N': 'थ', 'j': 'द', 'J': 'ध', 'b': 'न',
  'v': 'प', 'V': 'फ', 'm': 'ब', 'M': 'भ',
  '<': 'म', 'h': 'य', 'H': 'र', 'c': 'ल',
  'C': 'व', 'i': 'श', 'I': 'ष', 'x': 'स',
  'X': 'ह', 'e': 'ा', 'E': 'ी', 'o': 'ु',
  'O': 'ू', 'g': 'े', 'G': 'ै', '\\': 'ो',
  '|': 'ौ', 'z': 'ं', 'Z': 'ँ', 'Y': '्',
  'S': 'ृ', 'A': 'क्ष', 'Q': 'त्र', 'R': 'ज्ञ'
};

// Unicode to KrutiDev mapping
const unicodeToKrutiMap: Record<string, string> = {};
Object.entries(krutiToUnicodeMap).forEach(([kruti, unicode]) => {
  unicodeToKrutiMap[unicode] = kruti;
});

// Convert KrutiDev text to Unicode
export function krutiDevToUnicode(text: string): string {
  let result = '';
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    const nextChar = text[i + 1] || '';
    
    // Check for combined characters
    const combined = char + nextChar;
    if (krutiToUnicodeMap[combined]) {
      result += krutiToUnicodeMap[combined];
      i += 2;
      continue;
    }
    
    // Single character
    if (krutiToUnicodeMap[char]) {
      result += krutiToUnicodeMap[char];
    } else {
      result += char;
    }
    i++;
  }
  
  return result;
}

// Convert Unicode text to KrutiDev
export function unicodeToKrutiDev(text: string): string {
  let result = '';
  
  for (const char of text) {
    if (unicodeToKrutiMap[char]) {
      result += unicodeToKrutiMap[char];
    } else {
      result += char;
    }
  }
  
  return result;
}

// Transliteration mapping (English to Hindi)
const transliterationMap: Record<string, string> = {
  'a': 'अ', 'aa': 'आ', 'A': 'अ', 'Aa': 'आ', 'AA': 'आ',
  'i': 'इ', 'ii': 'ई', 'I': 'ई', 'ee': 'ई', 'EE': 'ई',
  'u': 'उ', 'uu': 'ऊ', 'U': 'ऊ', 'oo': 'ऊ', 'OO': 'ऊ',
  'e': 'ए', 'E': 'ए', 'ai': 'ऐ', 'AI': 'ऐ', 'ei': 'ऐ',
  'o': 'ओ', 'O': 'ओ', 'au': 'औ', 'AU': 'औ', 'ou': 'औ',
  'am': 'अं', 'AM': 'अं', 'ah': 'अः', 'AH': 'अः',
  'an': 'अं', 'AN': 'अं',
  
  'k': 'क', 'K': 'क', 'kh': 'ख', 'Kh': 'ख', 'KH': 'ख',
  'g': 'ग', 'G': 'ग', 'gh': 'घ', 'Gh': 'घ', 'GH': 'घ',
  'ng': 'ङ', 'NG': 'ङ',
  
  'ch': 'च', 'Ch': 'च', 'CH': 'च', 'c': 'च', 'C': 'च',
  'chh': 'छ', 'Chh': 'छ', 'CHH': 'छ', 'ch\'': 'छ',
  'j': 'ज', 'J': 'ज', 'jh': 'झ', 'Jh': 'झ', 'JH': 'झ',
  'ny': 'ञ', 'NY': 'ञ', 'gy': 'ज्ञ', 'GY': 'ज्ञ', 'dny': 'ज्ञ',
  
  'T': 'ट', 'Th': 'ठ', 'TH': 'ठ',
  'D': 'ड', 'Dh': 'ढ', 'DH': 'ढ',
  'N': 'ण',
  
  't': 'त', 'th': 'थ',
  'd': 'द', 'dh': 'ध',
  'n': 'न',
  
  'p': 'प', 'P': 'प', 'ph': 'फ', 'Ph': 'फ', 'PH': 'फ', 'f': 'फ', 'F': 'फ',
  'b': 'ब', 'B': 'ब', 'bh': 'भ', 'Bh': 'भ', 'BH': 'भ',
  'm': 'म', 'M': 'म',
  
  'y': 'य', 'Y': 'य',
  'r': 'र', 'R': 'र', 'ri': 'ऋ', 'RI': 'ऋ',
  'l': 'ल', 'L': 'ल',
  'v': 'व', 'V': 'व', 'w': 'व',
  
  'sh': 'श', 'Sh': 'श', 'SH': 'श',
  'Shh': 'ष', 'SHH': 'ष', 'S': 'ष',
  's': 'स',
  'h': 'ह', 'H': 'ह',
  
  'ksh': 'क्ष', 'KSH': 'क्ष', 'Ksh': 'क्ष',
  'tr': 'त्र', 'TR': 'त्र',
  'gya': 'ज्ञ', 'GYA': 'ज्ञ',
  
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
  
  '.': '.', ',': ',', '?': '?', '!': '!',
  ' ': ' ', '\n': '\n'
};

// Matras (vowel signs)
const matraMap: Record<string, string> = {
  'aa': 'ा', 'a': 'ा', 'A': 'ा',
  'i': 'ि', 'I': 'ी', 'ii': 'ी', 'ee': 'ी',
  'u': 'ु', 'U': 'ू', 'uu': 'ू', 'oo': 'ू',
  'e': 'े', 'E': 'े',
  'ai': 'ै', 'ei': 'ै',
  'o': 'ो', 'O': 'ो',
  'au': 'ौ', 'ou': 'ौ',
  'am': 'ं', 'an': 'ं', 'ah': 'ः',
  'ri': 'ृ'
};

// Transliterate English to Hindi
export function transliterateToHindi(text: string): string {
  let result = '';
  let i = 0;
  const lowerText = text.toLowerCase();
  
  while (i < text.length) {
    let matched = false;
    
    // Try matching longest sequences first (4 chars, then 3, 2, 1)
    for (let len = 4; len >= 1; len--) {
      const substr = text.substring(i, i + len);
      const lowerSubstr = substr.toLowerCase();
      
      if (transliterationMap[substr] || transliterationMap[lowerSubstr]) {
        result += transliterationMap[substr] || transliterationMap[lowerSubstr];
        i += len;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      result += text[i];
      i++;
    }
  }
  
  return result;
}

// Font types
export type FontType = 'unicode' | 'krutidev-010' | 'krutidev-016' | 'devlys';

export const fontNames: Record<FontType, string> = {
  'unicode': 'Unicode (Mangal)',
  'krutidev-010': 'KrutiDev 010',
  'krutidev-016': 'KrutiDev 016',
  'devlys': 'DevLys'
};

export const fontNamesHindi: Record<FontType, string> = {
  'unicode': 'यूनिकोड (मंगल)',
  'krutidev-010': 'कृतिदेव 010',
  'krutidev-016': 'कृतिदेव 016',
  'devlys': 'देवलिस'
};

// Detect font type
export function detectFontType(text: string): FontType {
  // Check if text contains Unicode Hindi characters
  const unicodeRange = /[\u0900-\u097F]/;
  if (unicodeRange.test(text)) {
    return 'unicode';
  }
  return 'krutidev-010';
}