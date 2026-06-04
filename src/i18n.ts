import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations.json';
import translationsZh from './translationsZh.json';

const getTh = () => {
    let t: Record<string, string> = {};
    for (const key in translations) {
        t[key] = key;
    }
    return t;
};

const resources = {
  en: {
    translation: translations
  },
  th: {
    translation: getTh()
  },
  zh: {
    translation: translationsZh
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "th",
    fallbackLng: "th",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;