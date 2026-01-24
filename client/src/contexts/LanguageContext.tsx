import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import i18n from '../i18n/config';

// Idiomas soportados
export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt', 'fr', 'de'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Nombres de idiomas para mostrar
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
};

// Mapeo de slugs traducidos a slugs base (español)
// Esto permite que /en/services se mapee a /es/servicios
const SLUG_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>> = {
  'servicios': { es: 'servicios', en: 'services', pt: 'servicos', fr: 'services', de: 'dienstleistungen' },
  'eventos': { es: 'eventos', en: 'events', pt: 'eventos', fr: 'evenements', de: 'veranstaltungen' },
  'cafeteria': { es: 'cafeteria', en: 'cafe', pt: 'cafeteria', fr: 'cafe', de: 'cafe' },
  'contacto': { es: 'contacto', en: 'contact', pt: 'contato', fr: 'contact', de: 'kontakt' },
  'nosotros': { es: 'nosotros', en: 'about-us', pt: 'sobre-nos', fr: 'a-propos', de: 'uber-uns' },
  'carta': { es: 'carta', en: 'menu', pt: 'cardapio', fr: 'menu', de: 'speisekarte' },
  'masajes': { es: 'masajes', en: 'massages', pt: 'massagens', fr: 'massages', de: 'massagen' },
  'clases': { es: 'clases', en: 'classes', pt: 'aulas', fr: 'cours', de: 'kurse' },
  'blog': { es: 'blog', en: 'blog', pt: 'blog', fr: 'blog', de: 'blog' },
  'experiencias': { es: 'experiencias', en: 'experiences', pt: 'experiencias', fr: 'experiences', de: 'erlebnisse' },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  getLocalizedPath: (path: string) => string;
  getBaseSlug: (translatedSlug: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<SupportedLanguage>('es');
  const [isLoading, setIsLoading] = useState(true);

  // Extraer idioma de la URL
  const extractLanguageFromPath = useCallback((path: string): SupportedLanguage | null => {
    const match = path.match(/^\/([a-z]{2})(\/|$)/);
    if (match && SUPPORTED_LANGUAGES.includes(match[1] as SupportedLanguage)) {
      return match[1] as SupportedLanguage;
    }
    return null;
  }, []);

  // Obtener el path sin el prefijo de idioma
  const getPathWithoutLanguage = useCallback((path: string): string => {
    const match = path.match(/^\/[a-z]{2}(\/.*)?$/);
    if (match && SUPPORTED_LANGUAGES.includes(path.substring(1, 3) as SupportedLanguage)) {
      return match[1] || '/';
    }
    return path;
  }, []);

  // Obtener el slug base (español) desde un slug traducido
  const getBaseSlug = useCallback((translatedSlug: string): string => {
    for (const [baseSlug, translations] of Object.entries(SLUG_TRANSLATIONS)) {
      for (const [lang, translated] of Object.entries(translations)) {
        if (translated === translatedSlug) {
          return baseSlug;
        }
      }
    }
    return translatedSlug; // Si no hay traducción, devolver el mismo
  }, []);

  // Obtener path localizado
  const getLocalizedPath = useCallback((path: string): string => {
    // Si el path ya tiene prefijo de idioma, quitarlo primero
    const cleanPath = getPathWithoutLanguage(path);
    
    // Si es español, no agregar prefijo (es el idioma por defecto)
    if (language === 'es') {
      return cleanPath;
    }
    
    // Agregar prefijo de idioma
    return `/${language}${cleanPath === '/' ? '' : cleanPath}`;
  }, [language, getPathWithoutLanguage]);

  // Cambiar idioma
  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('cancagua_language', newLang);
    // No cambiar la URL - solo cambiar el idioma del contenido
  }, []);

  // Inicialización: detectar idioma de URL o navegador
  useEffect(() => {
    const urlLang = extractLanguageFromPath(location);
    
    if (urlLang) {
      // Si hay idioma en la URL, usarlo
      setLanguageState(urlLang);
      i18n.changeLanguage(urlLang);
      localStorage.setItem('cancagua_language', urlLang);
    } else {
      // Si no hay idioma en URL, detectar del navegador/localStorage
      const storedLang = localStorage.getItem('cancagua_language') as SupportedLanguage;
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      
      let detectedLang: SupportedLanguage = 'es';
      
      if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
        detectedLang = storedLang;
      } else if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        detectedLang = browserLang;
      }
      
      setLanguageState(detectedLang);
      i18n.changeLanguage(detectedLang);
      
      // NO redirigir automáticamente - mantener las rutas sin prefijo
      // El idioma se guarda en localStorage y se usa para traducir el contenido
    }
    
    setIsLoading(false);
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      getLocalizedPath, 
      getBaseSlug,
      isLoading 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
