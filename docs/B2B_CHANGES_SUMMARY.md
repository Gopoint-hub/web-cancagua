# Resumen de Cambios - Módulo de Cotizaciones B2B

## Fecha: 28 de enero de 2026

## Objetivo
Implementar un nuevo flujo de cotizaciones B2B con 7 pasos similar al de HubSpot.

---

## Archivos Modificados

### 1. Base de Datos (`drizzle/schema.ts`)

**Nueva tabla `deals` (Negocios):**
```typescript
- id: número autoincremental
- name: nombre del negocio (requerido)
- pipeline: pipeline de ventas (default: "jornada_autocuidado")
- stage: etapa del negocio (nuevo, reunion_programada, propuesta_enviada, etc.)
- value: valor estimado del negocio
- closeDate: fecha estimada de cierre
- ownerId: propietario del negocio (referencia a users)
- notes: notas adicionales
- createdAt, updatedAt: timestamps
```

**Campos nuevos en `quotes`:**
- `dealId`: referencia al negocio asociado
- `name`: nombre de la cotización
- `clientWhatsapp`: WhatsApp del cliente
- `eventDate`: fecha del evento
- `termsOfPurchase`: términos de compra personalizados
- `notes`: notas/comentarios para el comprador

**Campos nuevos en `quoteItems`:**
- `scheduleTime`: hora del itinerario (ej: "10:00")
- `sortOrder`: orden para drag-and-drop

---

### 2. Funciones de Base de Datos (`server/db.ts`)

**Nuevas funciones para Deals:**
- `getAllDeals()` - Listar todos los negocios
- `getDealById(id)` - Obtener un negocio por ID
- `getDealsByOwner(ownerId)` - Negocios por propietario
- `searchDeals(query)` - Buscar negocios
- `createDeal(deal)` - Crear nuevo negocio
- `updateDeal(id, data)` - Actualizar negocio
- `deleteDeal(id)` - Eliminar negocio
- `getQuotesByDeal(dealId)` - Cotizaciones de un negocio

**Nuevas funciones para Quotes:**
- `duplicateQuote(quoteId, newName)` - Duplicar cotización
- `generateQuoteSlug()` - Generar slug único

**Funciones auxiliares:**
- `searchCorporateClients(query)` - Buscar clientes corporativos

---

### 3. Router de API (`server/routers.ts`)

**Nuevo router `deals`:**
```typescript
deals: {
  getAll: query - Listar todos los negocios
  getById: query - Obtener negocio por ID
  search: query - Buscar negocios
  create: mutation - Crear negocio
  update: mutation - Actualizar negocio
  delete: mutation - Eliminar negocio
  getQuotes: query - Obtener cotizaciones del negocio
}
```

**Nuevos endpoints en `quotes`:**
- `duplicate` - Duplicar una cotización existente

**Nuevos endpoints en `corporateClients`:**
- `search` - Buscar clientes corporativos

---

### 4. Componente Frontend (`client/src/pages/cms/CotizacionWizard.tsx`)

**Nuevo asistente de 7 pasos:**

| Paso | Nombre | Descripción |
|------|--------|-------------|
| 1 | Negocio | Seleccionar o crear un negocio (deal) |
| 2 | Info del Comprador | Seleccionar cliente existente o crear nuevo |
| 3 | Tu Información | Datos del vendedor (autocompletado) |
| 4 | Elementos de Pedido | Agregar servicios con drag-and-drop, precios editables, campo de hora |
| 5 | Firma y Pago | Configuración de pagos (desactivado por defecto) |
| 6 | Plantilla y Detalles | Nombre, fecha vencimiento, términos de compra |
| 7 | Revisión | Vista previa del PDF antes de guardar |

**Características:**
- Barra de progreso visual con pasos clickeables
- Vista previa del PDF en tiempo real
- Drag-and-drop para reordenar items
- Precios editables en línea
- Campo de hora para itinerario
- Descuentos por porcentaje o monto fijo
- Autoguardado de borradores

---

### 5. Dashboard de Cotizaciones (`client/src/pages/cms/Cotizaciones.tsx`)

**Cambios:**
- Nuevo botón "Crear Cotización B2B" que abre el wizard
- Botón "Cotización Rápida" mantiene el flujo anterior

---

### 6. Generador de PDF (`server/pdfGenerator.ts`)

**Nuevo diseño estilo HubSpot:**
- Header con logo y nombre de empresa
- Bloque de información del cliente con fondo beige
- Información de referencia alineada a la derecha
- Sección de comentarios/notas
- Datos bancarios de Cancagua
- Tabla de productos con:
  - Nombre del servicio (color verde)
  - Descripción
  - Hora del itinerario (si aplica)
  - Cantidad, precio unitario, total
- Totales con línea separadora
- Términos de compra personalizables
- Footer con contacto

---

## Rutas Agregadas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/cms/cotizacion-wizard` | CotizacionWizard | Nuevo asistente de cotizaciones B2B |
| `/cms/cotizacion-wizard/:id` | CotizacionWizard | Editar cotización existente |

---

## Migraciones Pendientes

Para aplicar los cambios en la base de datos, ejecutar:

```bash
# Generar migración
pnpm exec drizzle-kit generate

# Aplicar migración
pnpm exec drizzle-kit push
```

**Tablas/campos a crear:**
1. Nueva tabla `deals`
2. Nuevos campos en `quotes`: dealId, name, clientWhatsapp, eventDate, termsOfPurchase, notes
3. Nuevos campos en `quoteItems`: scheduleTime, sortOrder

---

## Notas de Implementación

1. **IVA:** Se removió del cálculo ya que Cancagua lo absorbe
2. **Datos bancarios:** Se mantienen en el PDF pero no en el flujo de creación
3. **Variantes de cotización:** Múltiples cotizaciones pueden asociarse al mismo negocio
4. **Campo hora:** Implementado como texto libre para flexibilidad

---

## Próximos Pasos Sugeridos

1. Ejecutar migraciones en la base de datos
2. Probar el flujo completo de creación de cotizaciones
3. Ajustar el diseño del PDF según feedback
4. Implementar envío de cotización por email desde el wizard
5. Agregar filtros por negocio en el dashboard de cotizaciones
