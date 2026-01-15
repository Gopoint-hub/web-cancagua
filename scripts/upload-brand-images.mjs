// Script para subir imágenes de marca a S3
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración desde variables de entorno
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!FORGE_API_URL || !FORGE_API_KEY) {
  console.error('Error: BUILT_IN_FORGE_API_URL y BUILT_IN_FORGE_API_KEY son requeridos');
  process.exit(1);
}

const baseUrl = FORGE_API_URL.replace(/\/+$/, '') + '/';

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

async function uploadImage(filePath, key, contentType) {
  const uploadUrl = new URL('v1/storage/upload', baseUrl);
  uploadUrl.searchParams.set('path', key);
  
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: contentType });
  const formData = new FormData();
  formData.append('file', blob, path.basename(filePath));
  
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${FORGE_API_KEY}` },
    body: formData,
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${text}`);
  }
  
  const result = await response.json();
  return result.url;
}

async function main() {
  const imagesDir = path.join(__dirname, '../client/public/images');
  const results = {};
  
  console.log('Subiendo imágenes de marca a S3...\n');
  
  for (const img of imagesToUpload) {
    const filePath = path.join(imagesDir, img.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${img.file} no existe, saltando...`);
      continue;
    }
    
    try {
      const url = await uploadImage(filePath, img.key, img.contentType);
      results[img.file] = url;
      console.log(`✅ ${img.file} -> ${url}`);
    } catch (error) {
      console.error(`❌ Error subiendo ${img.file}:`, error.message);
    }
  }
  
  console.log('\n=== URLs de imágenes para usar en emails ===\n');
  console.log(JSON.stringify(results, null, 2));
  
  // Guardar URLs en un archivo JSON
  const outputPath = path.join(__dirname, '../brand-image-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nURLs guardadas en: ${outputPath}`);
}

main().catch(console.error);
