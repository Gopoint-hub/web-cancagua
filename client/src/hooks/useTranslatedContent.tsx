import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage, SupportedLanguage } from '../contexts/LanguageContext';
import { trpc } from '../lib/trpc';

interface TranslationItem {
  key: string;
  content: string;
}

interface UseTranslatedContentOptions {
  context?: string; // Contexto para mejorar la traducción (ej: "página de servicios de spa")
  autoTranslate?: boolean; // Si debe traducir automáticamente al cambiar idioma
}

/**
 * Hook para obtener contenido traducido automáticamente
 * 
 * Uso básico:
 * const { t, isTranslating } = useTranslatedContent({
 *   'hero.title': 'Bienvenido a Cancagua',
 *   'hero.subtitle': 'Tu refugio de bienestar',
 * });
 * 
 * return <h1>{t('hero.title')}</h1>
 */
export function useTranslatedContent(
  content: Record<string, string>,
  options: UseTranslatedContentOptions = {}
) {
  const { language } = useLanguage();
  const { context = '', autoTranslate = true } = options;
  
  const [translations, setTranslations] = useState<Record<string, string>>(content);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Referencia para evitar traducciones duplicadas
  const translatingRef = useRef(false);
  const lastLanguageRef = useRef<string>(language);
  
  // Mutation para traducir batch
  const translateBatch = trpc.translations.translateBatch.useMutation();
  
  // Función para obtener traducción
  const t = useCallback((key: string): string => {
    return translations[key] || content[key] || key;
  }, [translations, content]);
  
  // Efecto para traducir cuando cambia el idioma
  useEffect(() => {
    // Si es español, usar contenido original
    if (language === 'es') {
      setTranslations(content);
      return;
    }
    
    // Si el idioma no cambió, no hacer nada
    if (lastLanguageRef.current === language && Object.keys(translations).length > 0) {
      return;
    }
    
    // Evitar traducciones duplicadas
    if (translatingRef.current || !autoTranslate) {
      return;
    }
    
    lastLanguageRef.current = language;
    translatingRef.current = true;
    setIsTranslating(true);
    setError(null);
    
    // Preparar items para traducir
    const items: TranslationItem[] = Object.entries(content).map(([key, value]) => ({
      key,
      content: value,
    }));
    
    // Traducir en batch
    translateBatch.mutateAsync({
      items: items.map(item => ({
        contentKey: item.key,
        originalContent: item.content,
      })),
      targetLanguage: language,
      context,
    })
      .then((result) => {
        // Combinar traducciones con contenido original (fallback)
        const newTranslations: Record<string, string> = {};
        for (const [key, value] of Object.entries(content)) {
          newTranslations[key] = result[key] || value;
        }
        setTranslations(newTranslations);
      })
      .catch((err) => {
        console.error('Translation error:', err);
        setError('Error al traducir contenido');
        // Mantener contenido original en caso de error
        setTranslations(content);
      })
      .finally(() => {
        setIsTranslating(false);
        translatingRef.current = false;
      });
  }, [language, content, context, autoTranslate, translateBatch]);
  
  return {
    t,
    translations,
    isTranslating,
    error,
    language,
  };
}

/**
 * Hook simplificado para traducir un solo texto
 */
export function useTranslateText(
  text: string,
  contentKey: string,
  options: UseTranslatedContentOptions = {}
) {
  const { language } = useLanguage();
  const { context = '' } = options;
  
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const translate = trpc.translations.translate.useMutation();
  
  useEffect(() => {
    if (language === 'es') {
      setTranslatedText(text);
      return;
    }
    
    setIsTranslating(true);
    
    translate.mutateAsync({
      contentKey,
      originalContent: text,
      targetLanguage: language,
      context,
    })
      .then((result) => {
        setTranslatedText(result.translatedContent || text);
      })
      .catch(() => {
        setTranslatedText(text);
      })
      .finally(() => {
        setIsTranslating(false);
      });
  }, [language, text, contentKey, context]);
  
  return { text: translatedText, isTranslating };
}

/**
 * Componente wrapper para traducir contenido de forma declarativa
 */
export function TranslatedText({
  contentKey,
  children,
  context,
  fallback,
}: {
  contentKey: string;
  children: string;
  context?: string;
  fallback?: React.ReactNode;
}) {
  const { text, isTranslating } = useTranslateText(children, contentKey, { context });
  
  if (isTranslating && fallback) {
    return <>{fallback}</>;
  }
  
  return <>{text}</>;
}
