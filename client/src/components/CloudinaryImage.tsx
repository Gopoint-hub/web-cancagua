import { useState } from 'react';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Para imágenes above-the-fold (hero images)
}

/**
 * Componente optimizado para imágenes de Cloudinary
 * - Lazy loading automático
 * - Optimización de URLs con parámetros de transformación
 * - Transición suave al cargar
 */
export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: CloudinaryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimizar URL de Cloudinary con parámetros de transformación
  const optimizedSrc = (() => {
    // Si ya es una URL de Cloudinary CDN, optimizarla
    if (src.includes('cloudfront') || src.includes('cloudinary')) {
      // Si tiene /upload/, agregar parámetros de optimización
      if (src.includes('/upload/')) {
        const optimizations = `w_${width || 800},q_auto,f_auto`;
        return src.replace('/upload/', `/upload/${optimizations}/`);
      }
      return src;
    }

    // Si es una ruta relativa, devolverla tal cual
    return src;
  })();

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={() => setIsLoaded(true)}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}
