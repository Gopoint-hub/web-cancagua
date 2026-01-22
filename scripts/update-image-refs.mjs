/**
 * Script para actualizar las referencias de imágenes en el código
 * usando el mapeo de URLs de S3
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Cargar el mapeo de URLs
const mappingPath = path.join(projectRoot, 'scripts/s3-url-mapping.json');
const urlMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

// Archivos a actualizar
const filesToUpdate = [
  // Blog
  'client/src/components/BlogLayout.tsx',
  'client/src/pages/Blog.tsx',
  'client/src/pages/blog/ManejoEstresLaboral.tsx',
  'client/src/pages/blog/MejoresTermasSurChile2026.tsx',
  'client/src/pages/blog/TermasConNinos.tsx',
  'client/src/pages/blog/TermasVsExperienciaNatural.tsx',
  
  // HCDL
  'client/src/pages/SpaHCDL.tsx',
  
  // Hero y Home
  'client/src/components/HeroSlider.tsx',
  'client/src/pages/Home.tsx',
  
  // Servicios
  'client/src/pages/Cafeteria.tsx',
  'client/src/pages/ClasesRegulares.tsx',
  'client/src/pages/HotTubs.tsx',
  'client/src/pages/Masajes.tsx',
  'client/src/pages/Sauna.tsx',
  'client/src/pages/ServicioBiopiscinas.tsx',
  'client/src/pages/Servicios.tsx',
  
  // Eventos
  'client/src/pages/Eventos.tsx',
  'client/src/pages/EventosEmpresas.tsx',
  'client/src/pages/EventosLanding.tsx',
  'client/src/pages/EventosSociales.tsx',
  'client/src/pages/HeartCoherenceWorkshop.tsx',
  'client/src/pages/TallerWimHof.tsx',
  
  // Nosotros
  'client/src/pages/Nosotros.tsx',
  
  // Experiencias
  'client/src/pages/experiencias/NavegaRelax.tsx',
  'client/src/pages/experiencias/PaseBioReconecta.tsx',
  'client/src/pages/experiencias/PaseBioReconectaDetox.tsx',
  'client/src/pages/experiencias/PaseReconecta.tsx',
  'client/src/pages/experiencias/PaseReconectaDetox.tsx',
  'client/src/pages/experiencias/PasesReconecta.tsx',
  
  // FullDay
  'client/src/pages/servicios/FullDayBiopiscinas.tsx',
  'client/src/pages/servicios/FullDayHotTubs.tsx',
];

console.log('=== Actualizando referencias de imágenes ===\n');

let totalReplacements = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.join(projectRoot, relPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Archivo no encontrado: ${relPath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  let fileReplacements = 0;
  
  // Reemplazar cada referencia local por la URL de S3
  for (const [localRef, s3Url] of Object.entries(urlMapping)) {
    // Escapar caracteres especiales para regex
    const escapedRef = localRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedRef, 'g');
    
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, s3Url);
      fileReplacements += matches.length;
    }
  }
  
  if (fileReplacements > 0) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${relPath}: ${fileReplacements} reemplazos`);
    totalReplacements += fileReplacements;
  }
}

console.log(`\n✅ Total de reemplazos: ${totalReplacements}`);
