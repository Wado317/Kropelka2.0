import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const plLang = require('./pl.json');
const enLang = require('./en.json');

export enum SupportedLanguages {
  pl = 'pl',
  en = 'en',
}

const resources = {
  [SupportedLanguages.pl]: {
    translation: plLang,
  },
  [SupportedLanguages.en]: {
    translation: enLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: SupportedLanguages.pl,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
