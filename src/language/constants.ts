import {SupportedLanguages} from './index';

const PlFlag = require('./components/pl.png');
const EnFlag = require('./components/en.png');

export interface LanguageModel {
  label: string;
  value: SupportedLanguages;
  icon: any;
}

/* ----- Models ----- */
const pl: LanguageModel = {
  label: 'Polski',
  value: SupportedLanguages.pl,
  icon: PlFlag,
};

const en: LanguageModel = {
  label: 'English',
  value: SupportedLanguages.en,
  icon: EnFlag,
};

/* ----- Export ----- */
export const LANGUAGES = {
  pl: pl,
  en: en,
};
