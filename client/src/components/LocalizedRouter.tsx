import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'wouter';
import { useLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../contexts/LanguageContext';

interface LocalizedRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

/**
 * Componente de ruta que maneja múltiples idiomas
 * Genera automáticamente rutas para cada idioma soportado
 */
export function LocalizedRoute({ path, component: Component }: LocalizedRouteProps) {
  const { language } = useLanguage();
  
  // Generar rutas para cada idioma
  const routes = SUPPORTED_LANGUAGES.map((lang) => {
    // Español sin prefijo (es el idioma por defecto)
    if (lang === 'es') {
      return <Route key={`${lang}-${path}`} path={path} component={Component} />;
    }
    // Otros idiomas con prefijo
    const localizedPath = path === '/' ? `/${lang}` : `/${lang}${path}`;
    return <Route key={`${lang}-${path}`} path={localizedPath} component={Component} />;
  });
  
  return <>{routes}</>;
}

/**
 * Componente Link localizado que mantiene el idioma actual
 */
export function LocalizedLink({
  href,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { language, getLocalizedPath } = useLanguage();
  const localizedHref = getLocalizedPath(href);
  
  return (
    <a href={localizedHref} className={className} {...props}>
      {children}
    </a>
  );
}

/**
 * Hook para navegar manteniendo el idioma
 */
export function useLocalizedNavigate() {
  const [, setLocation] = useLocation();
  const { getLocalizedPath } = useLanguage();
  
  return (path: string) => {
    setLocation(getLocalizedPath(path));
  };
}

/**
 * Componente de redirección que detecta idioma del navegador
 * y redirige a la versión correcta de la página
 */
export function LanguageRedirect() {
  const [location] = useLocation();
  const { language } = useLanguage();
  
  // Si ya tiene prefijo de idioma o es español, no redirigir
  const hasLanguagePrefix = SUPPORTED_LANGUAGES.some(
    lang => lang !== 'es' && location.startsWith(`/${lang}`)
  );
  
  if (hasLanguagePrefix || language === 'es') {
    return null;
  }
  
  // Redirigir a la versión con idioma
  const newPath = `/${language}${location === '/' ? '' : location}`;
  return <Redirect to={newPath} />;
}

/**
 * Wrapper para el Switch que maneja rutas multiidioma
 */
export function LocalizedSwitch({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LanguageRedirect />
      <Switch>{children}</Switch>
    </>
  );
}
