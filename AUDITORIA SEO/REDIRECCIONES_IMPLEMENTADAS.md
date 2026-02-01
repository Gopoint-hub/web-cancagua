# Redirecciones 301 Implementadas - Cancagua

**Fecha de implementación:** 31 de Enero 2026
**Archivo:** `server/_core/redirects.ts`
**Impacto total:** 358 clicks/mes, 28,666 impressions/mes

---

## 🔴 CRÍTICAS (6 URLs) - 280 clicks, 22,456 impressions

| # | URL Antigua | URL Nueva | Clicks/mes | Impressions/mes | Status |
|---|-------------|-----------|------------|-----------------|--------|
| 1 | `/biopiscinas/` | `/servicios/biopiscinas` | 89 | 2,769 | ✅ |
| 2 | `/hot-tub/` | `/servicios/hot-tubs` | 38 | 7,537 | ✅ |
| 3 | `/hot-tub/fin-de-semana/` | `/servicios/hot-tubs` | 23 | 3,404 | ✅ |
| 4 | `/servicios/` | `/` | 54 | 4,507 | ✅ |
| 5 | `/promos/` | `/` | 49 | 3,378 | ✅ |
| 6 | `/cafeteria-saludable-frutillar/` | `/cafeteria` | 27 | 861 | ✅ |

**Total:** 280 clicks/mes, 22,456 impressions/mes

---

## 🟠 ALTAS (4 URLs) - 23 clicks, 1,008 impressions

| # | URL Antigua | URL Nueva | Clicks/mes | Impressions/mes | Status |
|---|-------------|-----------|------------|-----------------|--------|
| 7 | `/sonoterapia/` | `/servicios/masajes` | 5 | 716 | ✅ |
| 8 | `/categoria/giftcards/` | `/` | 6 | 161 | ✅ |
| 9 | `/menu/` | `/carta` | 6 | 75 | ✅ |
| 10 | `/yoga-nueva/` | `/clases` | 6 | 56 | ✅ |

**Total:** 23 clicks/mes, 1,008 impressions/mes

---

## 🟡 MEDIAS (13 URLs principales) - 37 clicks, 2,275 impressions

| # | URL Antigua | URL Nueva | Clicks/mes | Impressions/mes | Status |
|---|-------------|-----------|------------|-----------------|--------|
| 11 | `/home/` | `/` | 1 | 1,402 | ✅ |
| 12 | `/programas/` | `/experiencias/pases-reconecta` | 3 | 867 | ✅ |
| 13 | `/dia-playa-frutillar/` | `/` | 4 | 227 | ✅ |
| 14 | `/faq/` | `/contacto` | 3 | 302 | ✅ |
| 15 | `/faqs/` | `/contacto` | 3 | 57 | ✅ |
| 16 | `/entrenamiento/` | `/clases` | 4 | 79 | ✅ |
| 17 | `/hot-tubs/` | `/servicios/hot-tubs` | 2 | 214 | ✅ |
| 18 | `/pase-mediodia/` | `/experiencias/pases-reconecta` | 3 | 112 | ✅ |
| 19 | `/beach-day/` | `/` | 3 | 96 | ✅ |
| 20 | `/producto/giftcard-masajes/` | `/` | 2 | 151 | ✅ |
| 21 | `/termas-del-sur-de-chile-con-ninos-guia-para-familias/` | `/blog/termas-con-ninos` | 2 | 107 | ✅ |
| 22 | `/playa/` | `/` | 1 | 60 | ✅ |
| 23 | `/reconnect-half-day-pass/` | `/experiencias/pases-reconecta` | 1 | 14 | ✅ |

---

## ⚪ BAJAS (4 URLs) - 0 clicks, 262 impressions

| # | URL Antigua | URL Nueva | Impressions/mes | Status |
|---|-------------|-----------|-----------------|--------|
| 24 | `/aikido/` | `/clases` | 90 | ✅ |
| 25 | `/services/` | `/` | 73 | ✅ |
| 26 | `/programs/` | `/experiencias/pases-reconecta` | 51 | ✅ |
| 27 | `/producto/giftcard-biopiscinas/` | `/` | 48 | ✅ |

---

## Otras Redirecciones (Blog, Eventos, Gift Cards)

### Blog
- `/articulos/` → `/blog` ✅
- `/mejores-termas-sur-chile-2026/` → `/blog/mejores-termas-sur-chile-2026` ✅
- `/tecnicas-manejo-estres-laboral/` → `/blog/manejo-estres-laboral` ✅
- `/termas-del-sur-vs-experiencia-natural/` → `/blog/termas-vs-experiencia-natural` ✅

### Eventos
- `/eventos-empresas/` → `/eventos/empresas` ✅

### Gift Cards
- `/giftcards/` → `/` ✅
- `/gift-card/` → `/` ✅

### Servicios Antiguos
- `/masajes/` → `/servicios/masajes` ✅
- `/sauna/` → `/servicios/sauna` ✅

---

## Verificación

### Testing Local

```bash
# Test redirección crítica
curl -I http://localhost:3000/biopiscinas/

# Debe retornar:
# HTTP/1.1 301 Moved Permanently
# Location: /servicios/biopiscinas

# Test con query string
curl -I "http://localhost:3000/hot-tub/?utm_source=google"

# Debe preservar query string:
# Location: /servicios/hot-tubs?utm_source=google
```

### Testing en Producción (Después de Deploy)

```bash
# Verificar redirecciones críticas
curl -I https://cancagua.cl/biopiscinas/
curl -I https://cancagua.cl/hot-tub/
curl -I https://cancagua.cl/promos/
```

### Google Search Console

Después del deploy:
1. Ir a Google Search Console
2. URL Inspection Tool
3. Verificar cada URL antigua
4. Confirmar que Google ve el 301 redirect
5. Solicitar re-crawl si es necesario

---

## Monitoreo Post-Implementación

### Semana 1-2
- ✅ Verificar en GSC que Google está procesando los 301
- ✅ Revisar que no hay errores 404 en Analytics
- ✅ Confirmar que el tráfico se mantiene o aumenta

### Mes 1
- ✅ Comparar clicks/impressions vs período anterior
- ✅ Verificar posiciones en rankings para keywords principales
- ✅ Revisar si hay URLs antiguas aún apareciendo en SERP

### Mes 3
- ✅ Confirmar que todas las URLs antiguas han sido reemplazadas en índice de Google
- ✅ Evaluar impacto total en tráfico orgánico
- ✅ Decidir si eliminar redirects para URLs sin tráfico (bajas prioridad)

---

## Notas Técnicas

### Implementación
- Middleware Express en `server/_core/redirects.ts`
- Se ejecuta ANTES de rutas estáticas y Vike
- Preserva query strings
- Status code: 301 (permanente)
- Case-insensitive matching

### Trailing Slash
Todas las URLs están duplicadas con y sin trailing slash:
- `/biopiscinas` → `/servicios/biopiscinas`
- `/biopiscinas/` → `/servicios/biopiscinas`

### Variantes de URL
Se incluyen variantes comunes:
- Singular/plural: `/hot-tub/` y `/hot-tubs/`
- Con/sin guiones: `/giftcards/` y `/gift-card/`
- Español/inglés: `/articulos/` y `/blog/`

---

## Próximos Pasos

1. ✅ **Implementado** - Redirecciones 301 en servidor
2. ⏳ **Pendiente** - Deploy a producción
3. ⏳ **Pendiente** - Verificar en GSC
4. ⏳ **Pendiente** - Monitorear Analytics (2 semanas)
5. ⏳ **Pendiente** - Crear páginas faltantes (hot-tubs, masajes, clases, etc.)
6. ⏳ **Pendiente** - Actualizar sitemap.xml con todas las rutas

---

## Contacto

Para dudas sobre estas redirecciones:
- Archivo técnico: `server/_core/redirects.ts`
- Auditoría original: `AUDITORIA SEO/analisis_urls_migracion_seo.xlsx`
- Implementado: Enero 31, 2026
