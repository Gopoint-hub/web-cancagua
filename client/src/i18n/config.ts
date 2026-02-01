import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector'; // Deshabilitado para SSR

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

// Solo usar initReactI18next (LanguageDetector deshabilitado para SSR)
const plugins = [initReactI18next];

// Inicializar i18n de forma síncrona
i18n
  .use(...plugins)
  .init({
    resources,
    lng: 'es', // Idioma inicial (importante para SSR)
    fallbackLng: 'es', // Idioma por defecto
    supportedLngs: ['es', 'en', 'pt', 'fr', 'de'],

    // Cargar traducciones de forma síncrona (sin backend)
    initImmediate: false,

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    react: {
      useSuspense: false,
    },
  });

// Forzar el idioma a español inmediatamente
i18n.changeLanguage('es');

export default i18n;
