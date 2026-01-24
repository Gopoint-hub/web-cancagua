// Script para aplicar AutoTranslateProvider a todas las páginas principales
// Este script modifica los archivos .tsx para agregar el wrapper de traducción automática

import fs from 'fs';
import path from 'path';

const pagesDir = '/home/ubuntu/cancagua/client/src/pages';

// Páginas a procesar (excluyendo las que ya tienen traducción o no necesitan)
const pagesToProcess = [
  'Servicios.tsx',
  'ServicioBiopiscinas.tsx',
  'HotTubs.tsx',
  'Sauna.tsx',
  'Masajes.tsx',
  'ClasesRegulares.tsx',
  'Cafeteria.tsx',
  'Carta.tsx',
  'Contacto.tsx',
  'Nosotros.tsx',
  'Blog.tsx',
  'EventosLanding.tsx',
  'EventosSociales.tsx',
  'EventosEmpresas.tsx',
  'HeartCoherenceWorkshop.tsx',
  'TallerWimHof.tsx',
];

// Páginas de experiencias
const experienciasDir = '/home/ubuntu/cancagua/client/src/pages/experiencias';
const experienciasPages = [
  'NavegaRelax.tsx',
  'PasesReconecta.tsx',
  'PaseReconecta.tsx',
  'PaseReconectaDetox.tsx',
  'PaseBioReconecta.tsx',
  'PaseBioReconectaDetox.tsx',
  'FullDayBiopiscinas.tsx',
  'FullDayHotTubs.tsx',
];

function getPageId(filename) {
  return filename.replace('.tsx', '').toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
}

function processPage(filePath, pageId) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Si ya tiene AutoTranslateProvider, saltar
  if (content.includes('AutoTranslateProvider')) {
    console.log(`⏭️  ${path.basename(filePath)} ya tiene AutoTranslateProvider`);
    return false;
  }
  
  // Agregar import de AutoTranslate si no existe
  if (!content.includes("from '@/components/AutoTranslate'") && !content.includes('from "@/components/AutoTranslate"')) {
    // Buscar el último import
    const lastImportMatch = content.match(/^import .+$/gm);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      content = content.replace(
        lastImport,
        `${lastImport}\nimport { AutoTranslateProvider, T } from '@/components/AutoTranslate';`
      );
    }
  }
  
  // Encontrar el return statement y envolver el contenido
  // Buscar el patrón: return ( seguido de contenido JSX
  const returnMatch = content.match(/return\s*\(\s*\n?\s*(<[^>]+)/);
  if (returnMatch) {
    const firstElement = returnMatch[1];
    
    // Si es un Fragment (<> o <React.Fragment>), envolver después
    if (firstElement === '<>' || firstElement.includes('Fragment')) {
      content = content.replace(
        /return\s*\(\s*\n?\s*<>/,
        `return (\n    <AutoTranslateProvider pageId="${pageId}">\n      <>`
      );
      // Cerrar el provider antes del cierre del fragment
      content = content.replace(
        /<\/>\s*\n?\s*\);?\s*\n?\s*}/,
        `</>\n    </AutoTranslateProvider>\n  );\n}`
      );
    } else {
      // Envolver el elemento principal
      content = content.replace(
        /return\s*\(\s*\n?\s*(<)/,
        `return (\n    <AutoTranslateProvider pageId="${pageId}">\n      $1`
      );
      
      // Encontrar el cierre del return y agregar el cierre del provider
      // Esto es más complejo, así que lo haremos manualmente para cada archivo
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${path.basename(filePath)} procesado con pageId: ${pageId}`);
  return true;
}

// Procesar páginas principales
console.log('\\n📄 Procesando páginas principales...\\n');
for (const page of pagesToProcess) {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    processPage(filePath, getPageId(page));
  } else {
    console.log(`⚠️  ${page} no encontrado`);
  }
}

// Procesar páginas de experiencias
console.log('\\n📄 Procesando páginas de experiencias...\\n');
for (const page of experienciasPages) {
  const filePath = path.join(experienciasDir, page);
  if (fs.existsSync(filePath)) {
    processPage(filePath, `experiencias-${getPageId(page)}`);
  } else {
    console.log(`⚠️  ${page} no encontrado en experiencias`);
  }
}

console.log('\\n✨ Proceso completado!');
