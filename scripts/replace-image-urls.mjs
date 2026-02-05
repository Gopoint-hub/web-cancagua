// Script para reemplazar URLs de imágenes locales por URLs de Cloudinary
// Uso: node scripts/replace-image-urls.mjs

import fs from 'fs';
import path from 'path';

// Cargar el mapeo de URLs desde el archivo de resultados
const resultsFile = './scripts/cloudinary-upload-results.json';
const results = JSON.parse(fs.readFileSync(resultsFile, 'utf-8'));
const urlMapping = results.urlMapping;

// Archivos a procesar
const filesToProcess = [
  'client/src/components/BlogLayout.tsx',
  'client/src/components/DynamicHead.tsx',
  'client/src/components/Footer.tsx',
  'client/src/components/HeroSlider.tsx',
  'client/src/components/Navbar.tsx',
  'client/src/components/SEOHead.tsx',
  'client/src/lib/blog-articles.ts',
  'client/src/lib/seo-config.ts',
  'client/src/lib/seo-helpers.ts',
  'client/src/pages/BiopiscnasPuertoVaras.tsx',
  'client/src/pages/Blog.tsx',
  'client/src/pages/Cafeteria.tsx',
  'client/src/pages/ClasesRegulares.tsx',
  'client/src/pages/Contacto.tsx',
  'client/src/pages/Eventos.tsx',
  'client/src/pages/EventosEmpresas.tsx',
  'client/src/pages/EventosLanding.tsx',
  'client/src/pages/EventosSociales.tsx',
  'client/src/pages/GiftCards.tsx',
  'client/src/pages/HeartCoherenceWorkshop.tsx',
  'client/src/pages/Home.tsx',
  'client/src/pages/HotTubs.tsx',
  'client/src/pages/Masajes.tsx',
  'client/src/pages/Nosotros.tsx',
  'client/src/pages/Sauna.tsx',
  'client/src/pages/ServicioBiopiscinas.tsx',
  'client/src/pages/Servicios.tsx',
  'client/src/pages/SpaHCDL.tsx',
  'client/src/pages/TallerWimHof.tsx',
  'client/src/pages/blog/+Head.tsx',
  'client/src/pages/blog/ManejoEstresLaboral.tsx',
  'client/src/pages/blog/MejoresTermasSurChile2026.tsx',
  'client/src/pages/blog/TermasConNinos.tsx',
  'client/src/pages/blog/TermasVsExperienciaNatural.tsx',
  'client/src/pages/cafeteria/+Head.tsx',
  'client/src/pages/cafeteria/+Page.tsx',
  'client/src/pages/carta/+Head.tsx',
  'client/src/pages/clases/+Head.tsx',
  'client/src/pages/clases/+Page.tsx',
  'client/src/pages/cms/ReportesMantencion.tsx',
  'client/src/pages/contacto/+Head.tsx',
  'client/src/pages/contacto/+Page.tsx',
  'client/src/pages/eventos/+Head.tsx',
  'client/src/pages/eventos/+Page.tsx',
  'client/src/pages/eventos/empresas/+Head.tsx',
  'client/src/pages/eventos/sociales/+Head.tsx',
  'client/src/pages/experiencias/+Head.tsx',
  'client/src/pages/experiencias/NavegaRelax.tsx',
  'client/src/pages/experiencias/PaseBioReconecta.tsx',
  'client/src/pages/experiencias/PaseBioReconectaDetox.tsx',
  'client/src/pages/experiencias/PaseReconecta.tsx',
  'client/src/pages/experiencias/PaseReconectaDetox.tsx',
  'client/src/pages/experiencias/PasesReconecta.tsx',
  'client/src/pages/experiencias/pases-reconecta/+Head.tsx',
  'client/src/pages/experiencias/pases-reconecta/+Page.tsx',
  'client/src/pages/gift-cards/+Head.tsx',
  'client/src/pages/gift-cards/+Page.tsx',
  'client/src/pages/gift-cards/payment-result/+Page.tsx',
  'client/src/pages/index/+Head.tsx',
  'client/src/pages/index/+Page.tsx',
  'client/src/pages/navega-relax/+Head.tsx',
  'client/src/pages/navega-relax/+Page.tsx',
  'client/src/pages/nosotros/+Head.tsx',
  'client/src/pages/nosotros/+Page.tsx',
  'client/src/pages/servicios/+Head.tsx',
  'client/src/pages/servicios/FullDayBiopiscinas.tsx',
  'client/src/pages/servicios/biopiscinas-puerto-varas/+Head.tsx',
  'client/src/pages/servicios/biopiscinas/+Head.tsx',
  'client/src/pages/servicios/biopiscinas/+Page.tsx',
  'client/src/pages/servicios/full-day-biopiscinas/+Head.tsx',
  'client/src/pages/servicios/full-day-biopiscinas/+Page.tsx',
  'client/src/pages/servicios/full-day-hot-tubs/+Head.tsx',
  'client/src/pages/servicios/hot-tubs/+Head.tsx',
  'client/src/pages/servicios/hot-tubs/+Page.tsx',
  'client/src/pages/servicios/masajes/+Head.tsx',
  'client/src/pages/servicios/masajes/+Page.tsx',
  'client/src/pages/servicios/sauna/+Head.tsx',
  'client/src/pages/servicios/sauna/+Page.tsx',
  'client/src/pages/spa-hotel-cabanas-del-lago/+Head.tsx',
  'server/_core/imageGeneration.ts',
  'server/email.ts',
  'server/giftcardPdfGenerator.ts',
  'server/routers.ts'
];

// Estadísticas
let totalReplacements = 0;
let filesModified = 0;
const replacementLog = [];

// Procesar cada archivo
for (const filePath of filesToProcess) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  let fileReplacements = 0;
  
  // Reemplazar cada URL local por su equivalente de Cloudinary
  for (const [localUrl, cloudinaryUrl] of Object.entries(urlMapping)) {
    // Buscar variantes de la URL local
    const variants = [
      localUrl,                           // /images/file.jpg
      `'${localUrl}'`,                    // '/images/file.jpg'
      `"${localUrl}"`,                    // "/images/file.jpg"
      `url(${localUrl})`,                 // url(/images/file.jpg)
      `url('${localUrl}')`,               // url('/images/file.jpg')
      `url("${localUrl}")`,               // url("/images/file.jpg")
    ];
    
    // Reemplazar la URL directamente
    const regex = new RegExp(escapeRegExp(localUrl), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, cloudinaryUrl);
      fileReplacements += matches.length;
      replacementLog.push({
        file: filePath,
        from: localUrl,
        to: cloudinaryUrl,
        count: matches.length
      });
    }
  }
  
  // Guardar el archivo si hubo cambios
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    filesModified++;
    totalReplacements += fileReplacements;
    console.log(`✅ ${filePath}: ${fileReplacements} reemplazos`);
  }
}

// Función para escapar caracteres especiales en regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Resumen
console.log('\n📊 Resumen:');
console.log(`   Archivos modificados: ${filesModified}`);
console.log(`   Total de reemplazos: ${totalReplacements}`);

// Guardar log de reemplazos
const logFile = './scripts/url-replacement-log.json';
fs.writeFileSync(logFile, JSON.stringify({
  timestamp: new Date().toISOString(),
  filesModified,
  totalReplacements,
  replacements: replacementLog
}, null, 2));
console.log(`\n💾 Log guardado en: ${logFile}`);
