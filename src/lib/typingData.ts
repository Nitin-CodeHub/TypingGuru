export const englishParagraphs = [
  `The quick brown fox jumps over the lazy dog. This classic sentence contains every letter of the English alphabet and has been used for typing practice for generations. Mastering touch typing requires dedication, regular practice, and proper finger placement on the home row keys.`,
  
  `Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovations continue to reshape industries and create new opportunities for growth and development across the globe.`,
  
  `Professional typing skills are essential in today's digital workplace. Whether you're writing emails, creating documents, or entering data, the ability to type quickly and accurately can significantly improve your productivity and efficiency.`,
  
  `Government examinations often include typing tests as part of their selection process. Candidates must demonstrate both speed and accuracy to qualify for various positions in administrative and clerical roles.`,
  
  `Data entry operators play a crucial role in maintaining accurate records for businesses and organizations. Attention to detail, combined with fast typing speeds, ensures that information is processed efficiently and correctly.`,
  
  `The development of keyboard skills begins with learning the home row position. Your fingers should rest on the ASDF keys for the left hand and JKL keys for the right hand, with thumbs positioned over the spacebar.`,
  
  `Practice makes perfect when it comes to improving your typing speed. Set aside time each day for focused practice sessions, gradually increasing difficulty and duration as your skills improve.`,
  
  `Modern typing software provides real-time feedback on your performance, helping you identify areas for improvement. Track your words per minute and accuracy to monitor progress over time.`
];

export const hindiParagraphs = [
  `भारत एक विशाल देश है जो अपनी समृद्ध संस्कृति और विरासत के लिए जाना जाता है। यहाँ विभिन्न धर्मों, भाषाओं और परंपराओं का अनूठा संगम देखने को मिलता है।`,
  
  `टाइपिंग कौशल आज के डिजिटल युग में अत्यंत महत्वपूर्ण है। सरकारी नौकरियों के लिए टाइपिंग टेस्ट एक आवश्यक योग्यता बन गया है। नियमित अभ्यास से आप अपनी गति और सटीकता में सुधार कर सकते हैं।`,
  
  `कंप्यूटर शिक्षा आधुनिक शिक्षा प्रणाली का एक अभिन्न अंग है। डिजिटल लिटरेसी हर छात्र के लिए आवश्यक है ताकि वे भविष्य में सफल हो सकें।`,
  
  `हिंदी भारत की राजभाषा है और देश की सबसे अधिक बोली जाने वाली भाषाओं में से एक है। हिंदी टाइपिंग सीखना सरकारी कार्यालयों में कार्य करने के लिए लाभदायक है।`,
  
  `इंटरनेट ने हमारे जीवन को पूरी तरह से बदल दिया है। ऑनलाइन शिक्षा, डिजिटल पेमेंट और सोशल मीडिया ने संचार के तरीके को क्रांतिकारी बना दिया है।`,
  
  `समय प्रबंधन सफलता की कुंजी है। अपने कार्यों की प्राथमिकता निर्धारित करें और समय सीमा के भीतर काम पूरा करने का प्रयास करें।`,
  
  `डेटा एंट्री ऑपरेटर का काम सूचनाओं को डिजिटल प्रारूप में बदलना है। यह कार्य सटीकता और गति दोनों की मांग करता है।`,
  
  `सरकारी परीक्षाओं में टाइपिंग टेस्ट उम्मीदवारों के लिए एक चुनौती हो सकता है। लगातार अभ्यास और धैर्य से आप इसे आसानी से पार कर सकते हैं।`
];

export const examPatterns = {
  ssc: {
    name: 'SSC Typing Test',
    nameHindi: 'एसएससी टाइपिंग टेस्ट',
    description: 'Staff Selection Commission typing test pattern',
    duration: 10,
    minWpm: 35,
    minAccuracy: 90,
    language: 'both'
  },
  cpct: {
    name: 'CPCT Exam',
    nameHindi: 'सीपीसीटी परीक्षा',
    description: 'Computer Proficiency Certification Test',
    duration: 15,
    minWpm: 30,
    minAccuracy: 85,
    language: 'both'
  },
  dataEntry: {
    name: 'Data Entry Operator',
    nameHindi: 'डेटा एंट्री ऑपरेटर',
    description: 'Data entry operator typing test',
    duration: 10,
    minWpm: 25,
    minAccuracy: 92,
    language: 'both'
  },
  government: {
    name: 'Government Typing Test',
    nameHindi: 'सरकारी टाइपिंग टेस्ट',
    description: 'General government typing test pattern',
    duration: 10,
    minWpm: 30,
    minAccuracy: 90,
    language: 'both'
  }
};

export const keyboardLayouts = {
  english: {
    rows: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    ],
    homeRow: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
  },
  hindi: {
    rows: [
      ['औ', '१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '-', 'ऋ'],
      ['ौ', 'ै', 'ा', 'ी', 'ू', 'ब', 'ह', 'ग', 'द', 'ड', 'ज', 'ड़', 'ॉ'],
      ['ो', 'े', '्', 'ि', 'ु', 'प', 'र', 'क', 'त', 'च', 'ट'],
      ['ं', 'म', 'न', 'व', 'ल', 'स', ',', '.', 'य', 'श', 'ष']
    ],
    homeRow: ['ा', 'ि', 'ी', 'ु', 'प', 'र', 'क', 'त']
  }
};