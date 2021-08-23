import {useState, useEffect} from 'react';
import {SupportedLanguages} from '../';
import localStorage from '../../helpers/localStorage';
import {useTranslation} from 'react-i18next';

const LANGUAGE_STORAGE_KEY = 'langCode';

export default function useLanguage() {
  const {t, i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>(
    i18n.language as SupportedLanguages,
  );

  useEffect(() => {
    setCurrentLanguage(i18n.language as SupportedLanguages);
  }, [i18n.language, t]);

  const loadAppLanguage = async () => {
    const savedLang = await localStorage.getItem(LANGUAGE_STORAGE_KEY);
    changeLang(savedLang);
  };

  const setAppLanguage = async (langCode: SupportedLanguages) => {
    changeLang(langCode);
    return localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
  };

  const changeLang = (langCode: SupportedLanguages) => {
    if (langCode && langCode !== currentLanguage) {
      i18n.changeLanguage(langCode);
      setCurrentLanguage(langCode);
    }
  };

  return {
    currentLanguage,
    loadAppLanguage,
    setAppLanguage,
  };
}
