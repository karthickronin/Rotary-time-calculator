// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  en: {
    translation: {
      "taskDetails": "Task Details",
      "addTimePeriod": "Add Time Period",
      "enterTime": "Enter Time",
      "exitTime": "Exit Time",
      "calculate": "Calculate",
      "elapsedTime": "Elapsed Time",
      "wages": "Wages",
      "totalTime": "Total Time",
      "totalWages": "Total Wages",
      "backHome": "Back to Home",
      "setCurrentTime": "Set Current Time",
      "name": "Name",
      "viewDetails": "View Details",
      "add": "Add",
      "enterPersonName": "Enter person's name",
      "tasks": "Tasks"
    }
  },
  ta: {
    translation: {
      "taskDetails": "பணியின் விவரங்கள்",
      "addTimePeriod": "நேரம் சேர்க்கவும்",
      "enterTime": "நேரத்தை உள்ளிடவும்",
      "exitTime": "வெளியே செல்லும் நேரம்",
      "calculate": "கணக்கிடவும்",
      "elapsedTime": "கடந்த நேரம்",
      "wages": "சம்பளம்",
      "totalTime": "மொத்த நேரம்",
      "totalWages": "மொத்த சம்பளம்",
      "backHome": "முகப்புப் பக்கம்",
      "setCurrentTime": "தற்போதைய நேரத்தை அமைக்கவும்",
      "name": "பெயர்",
      "viewDetails": "விவரங்கள்",
      "add": "சேர்க்கவும்",
      "enterPersonName": "பேரை உள்ளிடவும்",
      "tasks": "பணிகள்"
    }
  },
  hi: {
    translation: {
      "taskDetails": "कार्य विवरण",
      "addTimePeriod": "समय अवधि जोड़ें",
      "enterTime": "समय दर्ज करें",
      "exitTime": "निकासी समय",
      "calculate": "गणना करें",
      "elapsedTime": "बीता समय",
      "wages": "वेतन",
      "totalTime": "कुल समय",
      "totalWages": "कुल वेतन",
      "backHome": "घर वापस जाएं",
      "setCurrentTime": "वर्तमान समय सेट करें",
      "name": "नाम",
      "viewDetails": "विवरण देखें",
      "add": "जोड़ें",
      "enterPersonName": "व्यक्ति का नाम दर्ज करें",
      "tasks": "कार्य"
    }
  }
};

i18n
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
