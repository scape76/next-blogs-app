import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import en from "@/../assets/locale/en.json";
import ua from "@/../assets/locale/uk-UA.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: en,
    },
    "uk-UA": {
      translation: ua,
    },
  },
});

export default i18n;
