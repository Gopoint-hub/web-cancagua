import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import es from './locales/es.json';
import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
  pt: { translation: pt },
  fr: { translation: fr },
  de: { translation: de },
};

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next) // Integra con React
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto
    supportedLngs: ['es', 'en', 'pt', 'fr', 'de'],
    
    detection: {
      // Orden de detección: localStorage -> navegador
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cancagua_language',
    },
    
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
