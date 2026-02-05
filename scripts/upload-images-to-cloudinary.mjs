// Script para subir imágenes locales a Cloudinary
// Uso: node scripts/upload-images-to-cloudinary.mjs

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dhuln9b1n',
  api_key: '891368161391669',
  api_secret: '-eZm5HIA-AD1rqy45tijVtTHRFA',
  secure: true
});

const IMAGES_DIR = './client/public/images';
const OUTPUT_FILE = './scripts/cloudinary-upload-results.json';

// Función para obtener todos los archivos de imagen recursivamente
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Función para subir una imagen a Cloudinary
async function uploadImage(localPath) {
  // Crear public_id basado en la ruta relativa (sin extensión)
  const relativePath = path.relative(IMAGES_DIR, localPath);
  const publicId = `cancagua/images/${relativePath.replace(/\.[^/.]+$/, '').replace(/\\/g, '/')}`;
  
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      access_mode: 'public',
      type: 'upload'
    });
    
    return {
      localPath: relativePath,
      publicId: result.public_id,
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      success: true
    };
  } catch (error) {
    return {
      localPath: relativePath,
      error: error.message,
      success: false
    };
  }
}

async function main() {
  console.log('🚀 Iniciando subida de imágenes a Cloudinary...\n');
  
  const imageFiles = getImageFiles(IMAGES_DIR);
  console.log(`📁 Encontradas ${imageFiles.length} imágenes para subir:\n`);
  
  const results = [];
  const urlMapping = {};
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const relativePath = path.relative(IMAGES_DIR, file);
    console.log(`[${i + 1}/${imageFiles.length}] Subiendo: ${relativePath}`);
    
    const result = await uploadImage(file);
    results.push(result);
    
    if (result.success) {
      // Crear mapeo de ruta local a URL de Cloudinary
      const localUrl = `/images/${relativePath.replace(/\\/g, '/')}`;
      urlMapping[localUrl] = result.url;
      console.log(`   ✅ ${result.url}`);
    } else {
      console.log(`   ❌ Error: ${result.error}`);
    }
  }
  
  // Guardar resultados
  const output = {
    timestamp: new Date().toISOString(),
    totalImages: imageFiles.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results: results,
    urlMapping: urlMapping
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  
  console.log('\n📊 Resumen:');
  console.log(`   Total: ${output.totalImages}`);
  console.log(`   Exitosas: ${output.successful}`);
  console.log(`   Fallidas: ${output.failed}`);
  console.log(`\n💾 Resultados guardados en: ${OUTPUT_FILE}`);
  
  // Mostrar mapeo de URLs para referencia
  console.log('\n📋 Mapeo de URLs (local -> Cloudinary):');
  for (const [local, cloud] of Object.entries(urlMapping)) {
    console.log(`   ${local}`);
    console.log(`   → ${cloud}\n`);
  }
}

main().catch(console.error);
