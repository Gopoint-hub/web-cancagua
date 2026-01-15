// Función para subir imágenes de marca a S3
import fs from 'fs';
import path from 'path';
import { storagePut } from './storage';

// Imágenes a subir
const imagesToUpload = [
  { file: '01_logo-cancagua.png', key: 'brand/logo-cancagua.png', contentType: 'image/png' },
  { file: '02_biopiscinas-hero.jpg', key: 'brand/biopiscinas-hero.jpg', contentType: 'image/jpeg' },
  { file: '03_masajes-hero.webp', key: 'brand/masajes-hero.webp', contentType: 'image/webp' },
  { file: '04_clases-hero.jpg', key: 'brand/clases-hero.jpg', contentType: 'image/jpeg' },
  { file: '05_hottubs-hero.png', key: 'brand/hottubs-hero.png', contentType: 'image/png' },
  { file: '06_cafeteria-hero.jpg', key: 'brand/cafeteria-hero.jpg', contentType: 'image/jpeg' },
  { file: '07_eventos-hero.jpg', key: 'brand/eventos-hero.jpg', contentType: 'image/jpeg' },
  { file: '10_cancagua-header.jpg', key: 'brand/cancagua-header.jpg', contentType: 'image/jpeg' },
  { file: '14_sup-actividad.jpg', key: 'brand/sup-actividad.jpg', contentType: 'image/jpeg' },
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
      results[img.file] = url;
      console.log(`✅ ${img.file} -> ${url}`);
    } catch (error: any) {
      console.error(`❌ Error subiendo ${img.file}:`, error.message);
    }
  }
  
  return results;
}

// URLs de imágenes de marca (se actualizarán después de subir a S3)
export const BRAND_IMAGE_URLS = {
  logo: '',
  biopiscinas: '',
  masajes: '',
  clases: '',
  hottubs: '',
  cafeteria: '',
  eventos: '',
  header: '',
  sup: '',
};
