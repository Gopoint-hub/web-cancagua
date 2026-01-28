# Análisis del Flujo de Cotización B2B - HubSpot

## Imágenes Ordenadas Cronológicamente

| # | Hora | Archivo | Paso en HubSpot | Descripción |
|---|------|---------|-----------------|-------------|
| 1 | 11:39:53 | 11.39.53a.m..png | Lista de Cotizaciones | Vista principal con 242 registros, filtros, estados |
| 2 | 11:40:37 | 11.40.37a.m..png | Paso 1 de 7 - Negocio | Selector de negocio existente (dropdown) |
| 3 | 11:40:54 | 11.40.54a.m..png | Paso 1 de 7 - Negocio | Vista previa de cotización + opción "Nuevo negocio" |
| 4 | 11:41:10 | 11.41.10a.m..png | Crear Negocio (Modal) | Formulario: nombre, pipeline, etapa, valor, fecha cierre, propietario |
| 5 | 11:41:50 | 11.41.50a.m..png | Paso 2 de 7 - Info Comprador | Agregar contacto existente (búsqueda) o crear nuevo |
| 6 | 11:42:18 | 11.42.18a.m..png | Paso 4 de 7 - Elementos | Vista vacía con opciones para agregar productos |
| 7 | 11:42:42 | 11.42.42a.m..png | Añadir elemento (Modal) | Búsqueda de productos con precios unitarios |
| 8 | 11:43:20 | 11.43.20a.m..png | Paso 4 de 7 - Elementos | Lista de servicios agregados con cantidad=1 |
| 9 | 11:44:09 | 11.44.09a.m..png | Paso 4 de 7 - Elementos | Lista con cantidades editadas (10, 10, 10, 10, 3, 1) |
| 10 | 11:44:52 | 11.44.52a.m..png | Paso 5 de 7 - Firma y Pago | Cobro de pagos (desactivado) + vista previa PDF |
| 11 | 11:46:41 | 11.46.41a.m..png | Paso 6 de 7 - Plantilla | Nombre cotización, dominio, URL, fecha vencimiento, idioma, comentarios |
| 12 | 11:47:26 | 11.47.26a.m..png | Paso 6 de 7 - Plantilla | Términos de compra + datos bancarios |
| 13 | 11:47:42 | 11.47.42a.m..png | Paso 7 de 7 - Revisión | Vista previa cargando |
| 14 | 11:47:52 | 11.47.52a.m..png | Paso 7 de 7 - Revisión | Vista previa final del PDF de cotización |
| 15 | 11:49:03 | 11.49.03a.m..png | Lista de Cotizaciones | Lista actualizada con 243 registros (nueva cotización "Gopoint") |

---

## Detalle de Cada Paso del Flujo HubSpot

### PASO 0: Lista de Cotizaciones (Dashboard)
**Imagen:** 11:39:53 y 11:49:03

**Elementos visibles:**
- Título "Cotizaciones" con contador de registros (242/243)
- Pestañas de filtro: "Todas las cotizaciones", "Vence pronto", "Pendiente de aceptación", "Pendiente de aprobación"
- Buscador
- Botón "Crear cotización" (arriba derecha, color naranja)
- Tabla con columnas:
  - TÍTULO DEL PRESUPUESTO (ej: "GCN Turismo #Alternativas", "GCN Turismo #2 Sunset")
  - ESTADO DE LA COTIZACIÓN (Publicado, Borrador)
  - IMPORTE DEL PRESUPUESTO (CLP 429.100, CLP 1.671.600, etc.)
  - ESTADO DE LA FIRMA (No aplicable)
  - PROPIETARIO DE LA COTIZACIÓN (Cancagua Spa & Retreat)
- Paginación al fondo

**Observación importante:** Un mismo cliente puede tener múltiples cotizaciones con variantes (ej: "GCN Turismo #1", "#2", "#1 Almuerzo", "#2 Almuerzo")

---

### PASO 1 de 7: Negocio
**Imágenes:** 11:40:37, 11:40:54, 11:41:10

**Funcionalidad:**
- Asociar cotización con un "Negocio" (cliente/empresa)
- Dropdown para buscar negocio existente
- Opción "Nuevo negocio" para crear uno nuevo
- Vista previa de cotización a la derecha

**Formulario "Crear Negocio" (Modal):**
- Nombre del negocio* (texto)
- Pipeline* (dropdown: "Jornada de autocuidado")
- Etapa del negocio* (dropdown: "Reunión programada")
- Valor (numérico)
- Fecha de cierre (calendario: 31/01/2026)
- Propietario del negocio (dropdown: "Cancagua Spa & Retreat Center")
- Botones: "Crear", "Crear y agregar otro", "Cancelar"

---

### PASO 2 de 7: Información del Comprador
**Imagen:** 11:41:50

**Funcionalidad:**
- Agregar información de contacto del comprador
- Dos secciones: CONTACTO y EMPRESA
- Modal "Agregar Contacto existente":
  - Pestañas: "Crear nuevo" / "Agregar existente"
  - Buscador de contactos
  - Lista de contactos con nombre y email
  - Checkbox para seleccionar

**Datos del contacto requeridos:**
- Nombre
- Apellido
- WhatsApp
- Correo electrónico
- Nombre de la empresa

---

### PASO 3 de 7: Tu información
**No hay imagen específica** - Probablemente datos del vendedor/empresa

---

### PASO 4 de 7: Elementos de Pedido
**Imágenes:** 11:42:18, 11:42:42, 11:43:20, 11:44:09

**Vista vacía (11:42:18):**
- Título "Revisar elementos de pedido"
- Botones: "Seleccionar de la biblioteca de productos", "Crear elemento de pedido personalizado"
- Sección "Resumen" con "Subtotal"

**Modal "Añadir elemento de pedido" (11:42:42):**
- Buscador de productos (ej: "masaje")
- Pestañas: "Todos los productos activos", "Vistas"
- Tabla con columnas: NOMBRE, REF., PRECIO UNITARIO
- Lista de productos:
  - Masaje Podal - CLP 40.000
  - Masaje Descontracturante - CLP 48.000
  - Masaje Relajante - CLP 40.000
  - Masaje Drenaje linfático por zona - CLP 45.000
  - Masaje Piedras Calientes - CLP 45.000
  - Masaje Drenaje Linfático cuerpo completo - CLP 75.000
  - Masaje Drenaje linfático por zona pack 3 sesiones - CLP 153.000
- Botones: "Agregar", "Cancelar"

**Lista de elementos agregados (11:43:20, 11:44:09):**
- Tabla con columnas:
  - NOMBRE (link azul, arrastrables para reordenar)
  - PRECIO UNITARIO (editable)
  - REF.
  - CANTIDAD (input numérico)
  - DESCUENTO UNITARIO (% dropdown + valor)
  - PRECIO N... (precio neto calculado)
  - TCV (Total)
- Productos agregados:
  - Desayuno bufete - CL$15.000 x 10 = CLP 150.000
  - Biopiscina - CL$34.000 x 10 = CLP 340.000
  - Masaje Relajante - CL$40.000 x 10 = CLP 400.000
  - Almuerzo de grupo - CL$25.000 x 10 = CLP 250.000
  - Arriendo Yurt - CL$59.500 x 3 = CLP 178.500
  - Coffee Break - CL$12.000 x 1 = CLP 12.000
- Sección "Resumen" al fondo
- Botón "Añadir elemento de pedido" arriba derecha

**Funcionalidades clave:**
- Drag & drop para reordenar (sirve como itinerario)
- Precio unitario editable
- Cantidad editable
- Descuento por línea (% o valor fijo)
- Cálculo automático de totales
- Sin IVA (todos los precios son netos)

---

### PASO 5 de 7: Firma y Pago
**Imagen:** 11:44:52

**Funcionalidad:**
- "Cobro de pagos"
- "Acepta pagos online" con logos VISA, Mastercard, AMEX
- Toggle "DESACTIVADA"
- Vista previa del PDF a la derecha

---

### PASO 6 de 7: Plantilla y Detalles
**Imágenes:** 11:46:41, 11:47:26

**Campos del formulario:**
- Plantilla (dropdown: "Default Modern")
- Gestionar plantillas de cotización (link)
- Nombre de la cotización* (texto: "Gopoint")
- Dominio* (dropdown: "45425166.hs-sites.com/")
- Slug de contenido* (texto: "Hayf0tlsgEIzh")
- URL de cotización (generada automáticamente)
- Fecha de vencimiento* (dropdown: "En 90 días (26 de abril de 2026)" o calendario: 28/03/2026)
- Idioma de la cotización* (dropdown: "Español")
- Lugar* (dropdown: "América del Sur")
- Comentarios para el comprador (textarea con formato)
- Términos de la compra (textarea con formato)

**Contenido de "Comentarios para el comprador":**
```
Cuenta Bancaria
Banco: Santander
Cuenta: Corriente
No de Cuenta: 9569934-0
Nombre: Cancagua Spa y Centro de Bienestar Limitada
RUT: 77.926.863-2
Correo: eventos@cancagua.cl
```

**Contenido de "Términos de la compra":**
```
Cotización válida por 10 días
Para garantizar reserva se debe abonar el 50% del valor total
Valores IVA incluido
```

---

### PASO 7 de 7: Revisión
**Imágenes:** 11:47:42, 11:47:52

**Vista previa del PDF final:**

**Encabezado:**
- Logo/Nombre: "Cancagua Spa & Retreat Center"

**Sección Cliente (franja beige):**
- Nombre empresa: "Gopoint"
- Nombre contacto: "Sebastián Jara"
- Email: sebastian@gopointagency.com
- Teléfono: +56 9 5858 5362

**Sección Referencia (derecha):**
- Referencia: 20260126-1114025423
- Creación del presupuesto: 26 de enero de 2026
- Caducidad del presupuesto: 28 de marzo de 2026
- Presupuesto creado por: Cancagua Spa & Retreat Center

**Datos de contacto Cancagua:**
- contacto@cancagua.cl
- +56940073999

**Sección Comentarios:**
- Cuenta Bancaria con todos los datos

**Tabla de Productos y servicios:**
- Columnas: Artículo y descripción, Cantidad, Precio unitario, Total
- Lista de servicios con descripciones detalladas

**Pie:**
- Subtotal
- Total

---

## Requerimientos Específicos del Usuario

Basado en el archivo de solicitud:

1. **Dashboard de cotizaciones:**
   - Listado con buscador
   - Estados de cotización
   - Soporte para múltiples cotizaciones por cliente (variantes)

2. **Paso 1 - Negocio:**
   - Seleccionar negocio existente o crear nuevo
   - Formulario simplificado para nuevo negocio

3. **Paso 2 - Información del comprador:**
   - Datos mínimos: nombre, apellido, WhatsApp, email, empresa

4. **Paso 4 - Elementos de pedido:**
   - Seleccionar de biblioteca de servicios existente
   - Precio unitario editable
   - Cantidad editable
   - **NUEVO:** Campo para hora/orden (itinerario)
   - Drag & drop para reordenar
   - Descuento por línea
   - Sin IVA (todo neto)
   - Cálculo automático

5. **Paso 6 - Plantilla:**
   - Nombre de cotización
   - Fecha de vencimiento (calendario)
   - **QUITAR:** Comentarios con datos bancarios (no se usa)
   - Términos de compra

6. **Paso 7 - Revisión/PDF:**
   - Logo Cancagua arriba
   - Datos del cliente (empresa, nombre, email, teléfono)
   - Referencia única
   - Fecha creación y caducidad
   - Nombre del vendedor (usuario logueado)
   - Datos de contacto Cancagua
   - Tabla de servicios en orden definido
   - Totales

7. **Post-guardado:**
   - Opción de enviar al cliente por email
   - Registro de cotizaciones enviadas
   - Seguimiento de estados

8. **Base de datos de vendedores:**
   - Usar usuarios registrados del sistema
   - Mostrar nombre y apellido en la cotización
