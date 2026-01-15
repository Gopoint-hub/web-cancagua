// Función para subir imágenes de marca a S3
import fs from 'fs';
import path from 'path';
import { storagePut } from './storage';

// Imágenes a subir
const imagesToUpload = [
  { file: '01_logo-cancagua.png', key: 'brand/logo-cancagua.png', contentType: 'image/png', name: 'logo' },
  { file: '09_logo-cancagua-footer.png', key: 'brand/logo-cancagua-footer.png', contentType: 'image/png', name: 'logoFooter' },
  { file: '02_biopiscinas-hero.jpg', key: 'brand/biopiscinas-hero.jpg', contentType: 'image/jpeg', name: 'biopiscinas' },
  { file: '03_masajes-hero.webp', key: 'brand/masajes-hero.webp', contentType: 'image/webp', name: 'masajes' },
  { file: '04_clases-hero.jpg', key: 'brand/clases-hero.jpg', contentType: 'image/jpeg', name: 'clases' },
  { file: '05_hottubs-hero.png', key: 'brand/hottubs-hero.png', contentType: 'image/png', name: 'hottubs' },
  { file: '06_cafeteria-hero.jpg', key: 'brand/cafeteria-hero.jpg', contentType: 'image/jpeg', name: 'cafeteria' },
  { file: '07_eventos-hero.jpg', key: 'brand/eventos-hero.jpg', contentType: 'image/jpeg', name: 'eventos' },
  { file: '08_cafeteria-interior.jpg', key: 'brand/cafeteria-interior.jpg', contentType: 'image/jpeg', name: 'cafeteriaInterior' },
  { file: '10_cancagua-header.jpg', key: 'brand/cancagua-header.jpg', contentType: 'image/jpeg', name: 'header' },
  { file: '11_hottub-service.webp', key: 'brand/hottub-service.webp', contentType: 'image/webp', name: 'hottubService' },
  { file: '12_yoga-clases.webp', key: 'brand/yoga-clases.webp', contentType: 'image/webp', name: 'yoga' },
  { file: '13_masajes-service.webp', key: 'brand/masajes-service.webp', contentType: 'image/webp', name: 'masajesService' },
  { file: '14_sup-actividad.jpg', key: 'brand/sup-actividad.jpg', contentType: 'image/jpeg', name: 'sup' },
];

export async function uploadBrandImages(): Promise<Record<string, string>> {
  const imagesDir = path.join(process.cwd(), 'client/public/images');
  const results: Record<string, string> = {};
  
  for (const img of imagesToUpload) {
    const filePath = path.join(imagesDir, img.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${img.file} no existe, saltando...`);
      continue;
    }
    
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const { url } = await storagePut(img.key, fileBuffer, img.contentType);
      results[img.name] = url;
      console.log(`✅ ${img.name}: ${url}`);
    } catch (error: any) {
      console.error(`❌ Error subiendo ${img.file}:`, error.message);
    }
  }
  
  // Guardar las URLs en un archivo JSON para uso posterior
  const urlsFilePath = path.join(process.cwd(), 'brand-image-urls.json');
  fs.writeFileSync(urlsFilePath, JSON.stringify(results, null, 2));
  console.log(`💾 URLs guardadas en ${urlsFilePath}`);
  
  return results;
}

// Función para obtener las URLs de imágenes de marca desde el archivo JSON
export function getBrandImageUrls(): Record<string, string> {
  const urlsFilePath = path.join(process.cwd(), 'brand-image-urls.json');
  
  if (fs.existsSync(urlsFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(urlsFilePath, 'utf-8'));
    } catch (error) {
      console.error('Error leyendo brand-image-urls.json:', error);
    }
  }
  
  return {};
}

// Catálogo de imágenes con descripciones para la IA
export const BRAND_IMAGE_CATALOG = [
  { name: 'logo', description: 'Logo principal de Cancagua - usar en header de emails' },
  { name: 'logoFooter', description: 'Logo para footer - versión oscura/clara' },
  { name: 'biopiscinas', description: 'Biopiscinas geotermales - piscinas naturales con agua caliente, vista al lago' },
  { name: 'masajes', description: 'Servicios de masajes y terapias - ambiente relajante' },
  { name: 'clases', description: 'Clases de yoga, pilates y aikido - actividades grupales' },
  { name: 'hottubs', description: 'Hot tubs privados - tinas calientes con vista' },
  { name: 'cafeteria', description: 'Cafetería exterior - terraza con vista al lago' },
  { name: 'cafeteriaInterior', description: 'Interior de la cafetería - ambiente acogedor' },
  { name: 'eventos', description: 'Eventos corporativos - espacios para reuniones y retiros' },
  { name: 'header', description: 'Vista general de Cancagua - panorama del centro' },
  { name: 'hottubService', description: 'Servicio de hot tub - detalle de la experiencia' },
  { name: 'yoga', description: 'Clases de yoga - práctica en naturaleza' },
  { name: 'masajesService', description: 'Servicio de masajes - detalle del tratamiento' },
  { name: 'sup', description: 'Stand Up Paddle - actividad acuática en el lago' },
];
