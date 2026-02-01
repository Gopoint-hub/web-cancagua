# PENDIENTES - Cancagua Web

## 🔴 ALTA PRIORIDAD

### Migrar imágenes de local a Cloudinary/CloudFront
**Fecha**: 2026-02-01
**Estado**: Pendiente
**Prioridad**: Alta

**Contexto**:
- Actualmente hay 26 imágenes siendo servidas localmente desde `client/public/images/`
- La norma del proyecto es que TODAS las imágenes estén en S3/Cloudinary + CloudFront CDN
- Las imágenes originales en Cloudinary tienen "Access Denied" (permisos incorrectos)
- Se implementó solución temporal de emergencia sirviendo imágenes localmente

**Problema**:
Las imágenes en Cloudinary están configuradas como privadas y retornan error:
```xml
<Error>
  <Code>AccessDenied</Code>
  <Message>Access Denied</Message>
</Error>
```

**Por qué es importante volver a CDN**:
- ✅ **Rendimiento**: CDN distribuye globalmente, carga más rápida
- ✅ **Optimización**: Cloudinary redimensiona/comprime/convierte formatos automáticamente
- ✅ **Ancho de banda**: No consume recursos del servidor Render
- ✅ **Repo liviano**: Git sin archivos binarios grandes (actualmente ~5-10MB extra)
- ✅ **Caché**: CloudFront maneja caché automáticamente
- ✅ **Transformaciones**: Cambiar tamaño de imágenes con URL params

**Soluciones posibles**:

#### Opción A: Hacer públicas las imágenes existentes en Cloudinary (MÁS RÁPIDO)
1. Ir a Cloudinary Dashboard: https://cloudinary.com/console
2. Media Library → Buscar carpeta `cancagua/images/` y `brand/`
3. Seleccionar todas las imágenes problemáticas
4. Click en "Manage" → "Change Access Control" → "Public"
5. Save
6. Esperar 5-10 min propagación en CloudFront
7. Probar que las URLs funcionen

#### Opción B: Cambiar configuración de Upload Preset (PREVIENE FUTURO)
1. Settings → Upload
2. Upload Presets → Seleccionar preset default
3. Delivery type: "upload" (public)
4. Access mode: "Public"
5. Save

#### Opción C: Re-subir imágenes con script (MÁS LIMPIO)
1. Crear script Node.js con Cloudinary SDK
2. Subir las 26 imágenes desde `client/public/images/`
3. Configurar permisos públicos en el upload
4. Obtener nuevas URLs de CloudFront
5. Reemplazar URLs en el código
6. Eliminar imágenes locales del repo

**Imágenes afectadas** (26 total):
```
client/public/images/
├── 02_biopiscinas-hero.jpg
├── 04_clases-hero.jpg
├── 05_hottubs-hero.png
├── 06_cafeteria-hero.jpg
├── 07_eventos-hero.jpg
├── 08_cafeteria-interior.jpg
├── alan-iceman.png
├── eventos-empresas-hero.jpg
├── eventos-sociales-hero.jpg
├── pase-reconecta-hottub.png
├── pase-reconecta-masaje-1.png
├── pase-reconecta-masaje-2.png
├── pase-reconecta-sauna.png
├── sauna-nativo-hero.png
├── sonja-bloder.png
├── blog/
│   ├── manejo-estres-laboral-hero.webp
│   ├── termas-geometricas-hero.webp
│   ├── termas-ninos-familias-hero.webp
│   └── termas-vs-experiencia-natural-hero.jpg
└── hcdl/
    ├── drenaje-linfatico.webp
    ├── masaje-descontracturante.webp
    ├── masaje-mixto.webp
    ├── masaje-relajacion.webp
    ├── piedras-calientes.webp
    ├── prenatal.webp
    └── reflexologia.webp
```

**Archivos afectados en código** (50 archivos):
- Ver commit `15cfeb8`: "fix: Restore images from git history and replace Cloudfront URLs"
- Todos los archivos en `client/src/pages/` y `client/src/components/`

**Pasos para implementar**:
1. [ ] Decidir opción (A, B o C)
2. [ ] Ejecutar cambios en Cloudinary
3. [ ] Verificar que URLs de Cloudfront funcionen (probar en navegador)
4. [ ] Revertir commit `15cfeb8` (o crear nuevo commit)
5. [ ] Restaurar URLs de Cloudfront en código
6. [ ] Eliminar imágenes de `client/public/images/` (excepto logos necesarios)
7. [ ] Build y test local
8. [ ] Deploy y verificar en producción
9. [ ] Confirmar que todas las páginas cargan imágenes correctamente

**Referencias**:
- Cloudinary Dashboard: https://cloudinary.com/console
- Documentación CORS: https://cloudinary.com/documentation/cors_support
- Commit con imágenes locales: `15cfeb8`
- Commit anterior con URLs Cloudfront: `27ac5cb^`

---

## 📋 OTROS PENDIENTES

_(Agregar aquí otras tareas pendientes)_

---

**Última actualización**: 2026-02-01
