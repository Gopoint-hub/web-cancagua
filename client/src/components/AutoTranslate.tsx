import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { trpc } from '../lib/trpc';

// Contexto para la página actual
interface PageTranslationContextType {
  pageId: string;
  translations: Map<string, string>;
  isLoading: boolean;
  registerText: (key: string, originalText: string) => void;
  getTranslation: (key: string, originalText: string) => string;
}

const PageTranslationContext = createContext<PageTranslationContextType | null>(null);

// Generar hash simple para identificar textos
function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Provider que envuelve una página y maneja sus traducciones
interface AutoTranslateProviderProps {
  pageId: string;
  children: React.ReactNode;
}

export function AutoTranslateProvider({ pageId, children }: AutoTranslateProviderProps) {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const pendingTexts = useRef<Map<string, string>>(new Map());
  const batchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const translateBatch = trpc.translations.translateBatch.useMutation();

  // Procesar batch de traducciones pendientes
  const processBatch = useCallback(async () => {
    if (pendingTexts.current.size === 0 || language === 'es') return;
    
    setIsLoading(true);
    const items = Array.from(pendingTexts.current.entries()).map(([key, content]) => ({
      contentKey: `${pageId}:${key}`,
      originalContent: content,
    }));
    
    try {
      const results = await translateBatch.mutateAsync({
        items,
        targetLanguage: language,
        context: `Página: ${pageId}`
      });
      
      const newTranslations = new Map(translations);
      Object.entries(results).forEach(([fullKey, translatedText]) => {
        const shortKey = fullKey.replace(`${pageId}:`, '');
        newTranslations.set(shortKey, translatedText);
      });
      setTranslations(newTranslations);
    } catch (error) {
      console.error('Error translating batch:', error);
    } finally {
      setIsLoading(false);
      pendingTexts.current.clear();
    }
  }, [language, pageId, translateBatch, translations]);

  // Registrar texto para traducción
  const registerText = useCallback((key: string, originalText: string) => {
    if (language === 'es' || translations.has(key)) return;
    
    pendingTexts.current.set(key, originalText);
    
    // Debounce para agrupar múltiples registros
    if (batchTimeout.current) {
      clearTimeout(batchTimeout.current);
    }
    batchTimeout.current = setTimeout(() => {
      processBatch();
    }, 100);
  }, [language, translations, processBatch]);

  // Obtener traducción
  const getTranslation = useCallback((key: string, originalText: string) => {
    if (language === 'es') return originalText;
    return translations.get(key) || originalText;
  }, [language, translations]);

  // Limpiar traducciones cuando cambia el idioma
  useEffect(() => {
    if (language !== 'es') {
      setTranslations(new Map());
      pendingTexts.current.clear();
    }
  }, [language]);

  return (
    <PageTranslationContext.Provider value={{ pageId, translations, isLoading, registerText, getTranslation }}>
      {children}
    </PageTranslationContext.Provider>
  );
}

// Hook para usar el contexto de traducción
function usePageTranslation() {
  const context = useContext(PageTranslationContext);
  if (!context) {
    throw new Error('usePageTranslation must be used within AutoTranslateProvider');
  }
  return context;
}

// Componente para traducir texto automáticamente
interface TProps {
  children: string;
  id?: string;
}

export function T({ children, id }: TProps) {
  // Para SSR y SEO, simplemente devolver el texto original en español
  // El sistema de traducción automática con IA se puede activar más adelante
  return <>{children}</>;
}

// Componente simplificado que traduce sin necesidad de Provider
// Usa traducción directa por cada texto (menos eficiente pero más simple)
interface AutoTranslateTextProps {
  children: string;
  className?: string;
}

export function AutoTranslateText({ children, className }: AutoTranslateTextProps) {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);
  
  const translateMutation = trpc.translations.translate.useMutation();
  
  useEffect(() => {
    if (language === 'es') {
      setTranslatedText(children);
      return;
    }
    
    const contentKey = `auto:${hashText(children)}`;
    setIsLoading(true);
    
    translateMutation.mutate(
      { contentKey, originalContent: children, targetLanguage: language },
      {
        onSuccess: (result) => {
          setTranslatedText(result.translatedContent || children);
          setIsLoading(false);
        },
        onError: () => {
          setTranslatedText(children);
          setIsLoading(false);
        }
      }
    );
  }, [language, children]);
  
  return (
    <span className={`${className || ''} ${isLoading ? 'opacity-70' : ''}`}>
      {translatedText}
    </span>
  );
}

// HOC para envolver páginas completas con traducción automática
export function withAutoTranslate<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageId: string
) {
  return function AutoTranslatedPage(props: P) {
    return (
      <AutoTranslateProvider pageId={pageId}>
        <WrappedComponent {...props} />
      </AutoTranslateProvider>
    );
  };
}

export { usePageTranslation };
