/**
 * Script para subir imágenes de la carpeta wordpress a S3
 * y generar un mapeo de URLs para actualizar el código
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Configuración del storage proxy
const FORGE_API_URL = process.env.BUILT_IN_FORGE_API_URL;
const FORGE_API_KEY = process.env.BUILT_IN_FORGE_API_KEY;

if (!FORGE_API_URL || !FORGE_API_KEY) {
  console.error('Error: BUILT_IN_FORGE_API_URL y BUILT_IN_FORGE_API_KEY deben estar configurados');
  process.exit(1);
}

const baseUrl = FORGE_API_URL.replace(/\/+$/, '') + '/';

async function uploadFile(filePath, relKey) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  const contentTypeMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };
  
  const contentType = contentTypeMap[ext] || 'application/octet-stream';
  
  const uploadUrl = new URL('v1/storage/upload', baseUrl);
  uploadUrl.searchParams.set('path', relKey);
  
  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: contentType });
  formData.append('file', blob, path.basename(filePath));
  
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FORGE_API_KEY}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`Upload failed (${response.status}): ${text}`);
  }
  
  const result = await response.json();
  return result.url;
}

async function main() {
  const imagesDir = path.join(projectRoot, 'client/public/images');
  const urlMapping = {};
  
  // Carpetas a subir
  const foldersToUpload = ['wordpress', 'blog', 'hcdl', 'giftcard-backgrounds'];
  
  // También subir imágenes sueltas grandes (>500KB)
  const looseImages = fs.readdirSync(imagesDir)
    .filter(f => {
      const fullPath = path.join(imagesDir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) return false;
      const ext = path.extname(f).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return false;
      return stat.size > 500 * 1024; // > 500KB
    });
  
  console.log('=== Subiendo imágenes a S3 ===\n');
  
  // Subir carpetas
  for (const folder of foldersToUpload) {
    const folderPath = path.join(imagesDir, folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`Carpeta ${folder} no existe, saltando...`);
      continue;
    }
    
    const files = fs.readdirSync(folderPath)
      .filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
      });
    
    console.log(`\n📁 Carpeta: ${folder} (${files.length} archivos)`);
    
    for (const file of files) {
      const localPath = path.join(folderPath, file);
      const s3Key = `cancagua/images/${folder}/${file}`;
      const localRef = `/images/${folder}/${file}`;
      
      try {
        console.log(`  ⬆️  Subiendo ${file}...`);
        const s3Url = await uploadFile(localPath, s3Key);
        urlMapping[localRef] = s3Url;
        console.log(`  ✅ ${file} -> ${s3Url}`);
      } catch (error) {
        console.error(`  ❌ Error subiendo ${file}: ${error.message}`);
      }
    }
  }
  
  // Subir imágenes sueltas grandes
  if (looseImages.length > 0) {
    console.log(`\n📁 Imágenes sueltas grandes (${looseImages.length} archivos)`);
    
    for (const file of looseImages) {
      const localPath = path.join(imagesDir, file);
      const s3Key = `cancagua/images/${file}`;
      const localRef = `/images/${file}`;
      
      try {
        console.log(`  ⬆️  Subiendo ${file}...`);
        const s3Url = await uploadFile(localPath, s3Key);
        urlMapping[localRef] = s3Url;
        console.log(`  ✅ ${file} -> ${s3Url}`);
      } catch (error) {
        console.error(`  ❌ Error subiendo ${file}: ${error.message}`);
      }
    }
  }
  
  // Guardar mapeo de URLs
  const mappingPath = path.join(projectRoot, 'scripts/s3-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  console.log(`\n✅ Mapeo de URLs guardado en: ${mappingPath}`);
  console.log(`   Total de imágenes subidas: ${Object.keys(urlMapping).length}`);
}

main().catch(console.error);
