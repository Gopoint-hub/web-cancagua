# Cancagua - Lista de Tareas del Proyecto

## Configuración Base
- [x] Inicializar proyecto con web-db-user scaffold
- [x] Configurar sistema de diseño (colores, tipografía, componentes)
- [x] Configurar esquema de base de datos
- [x] Copiar imágenes del sitio actual al proyecto
- [ ] Configurar SEO base (meta tags, sitemap)

## Frontend Público

### Hero Section
- [x] Slider de imágenes de alta calidad
- [x] Overlay con título y subtítulo
- [x] CTAs principales (Reservar, Conocer Servicios)
- [x] Animaciones suaves de transición

### Sección Servicios
- [x] Card: Biopiscinas Geotermales (destacar "Primeras del Mundo")
- [x] Card: Hot Tubs
- [x] Card: Masajes & Terapias
- [x] Card: Clases Regulares (Yoga, Pilates, Aikido)
- [ ] Card: Pase Reconecta
- [x] Hover effects y animaciones
- [x] Botones de reserva en cada card

### Sección Eventos
- [x] Grid de eventos próximos
- [ ] Sincronización con Skedu API (pendiente integración)
- [x] Mostrar cupos disponibles en tiempo real
- [x] Filtros por tipo de evento
- [x] Página de detalle de evento

### Página Cafetería
- [x] Hero con imagen del espacio
- [x] Carta digital interactiva
- [x] Filtros: Vegano, Vegetariano, Keto, Sin Gluten, Sin Lácteos
- [x] Horarios y políticas
- [x] Sistema de reserva de mesa
- [x] Galería de platos

### Sistema Gift Cards
- [x] Selector de monto (predefinido y personalizado)
- [x] Personalización de mensaje
- [x] Preview de tarjeta digital
- [ ] Proceso de compra (pendiente integración de pago)
- [ ] Envío por email (pendiente backend)
- [x] Términos y condiciones

### Páginas Adicionales
- [x] Página Nosotros (historia, equipo, misión)
- [x] Página Contacto (formulario, mapa, información)
- [x] Página individual por servicio (Biopiscinas completada)
- [x] Página listado de servicios
- [x] Footer completo con links

## Integración Skedu API

### Servicios
- [ ] Endpoint para obtener servicios
- [ ] Sincronización automática (cron job cada 6 horas)
- [ ] Webhook para actualizaciones inmediatas
- [ ] Caché en base de datos local

### Eventos
- [ ] Endpoint para obtener eventos
- [ ] Webhook para nuevos eventos
- [ ] Actualización de cupos en tiempo real
- [ ] Notificación cuando evento se llena

### Clientes
- [ ] Sincronización bidireccional
- [ ] Nuevos clientes web → Skedu
- [ ] Clientes Skedu → base de datos local

### Webhooks
- [ ] Configurar endpoint para recibir webhooks
- [ ] Validación de webhook secret
- [ ] Logs de webhooks recibidos
- [ ] Manejo de eventos: USER_CREATED, APPOINTMENTS_CREATED, etc.

## CMS Interno (Dashboard Admin)

### Autenticación
- [ ] Sistema de login para administradores
- [ ] Protección de rutas admin
- [ ] Gestión de sesiones

### Analytics
- [ ] Visitantes únicos (día/semana/mes)
- [ ] Páginas más visitadas
- [ ] Fuentes de tráfico (Instagram, Google, directo)
- [ ] Tasa de conversión (visitas → reservas)
- [ ] Dispositivos (mobile/desktop)
- [ ] Gráficos interactivos

### Gestión de Servicios
- [ ] Lista de servicios sincronizados desde Skedu
- [ ] Estado de sincronización
- [ ] Botón "Sincronizar Ahora"
- [ ] Edición de contenido adicional (galería, FAQs)

### Gestión de Eventos
- [ ] Lista de eventos desde Skedu
- [ ] Filtros: Próximos, Pasados, Todos
- [ ] Estado de cupos
- [ ] Edición de contenido adicional

### Gestión de Clientes
- [ ] Lista de clientes sincronizados
- [ ] Búsqueda y filtros
- [ ] Exportar a CSV
- [ ] Segmentación para newsletters

### Integraciones
- [ ] Estado de Skedu API (conectado/desconectado)
- [ ] Logs de webhooks
- [ ] Configuración de Make.com
- [ ] Test de conexiones

## Sistema de Newsletter

### Suscripción
- [ ] Formulario de suscripción en múltiples páginas
- [ ] Double opt-in
- [ ] Confirmación por email
- [ ] Página de confirmación

### Gestión de Suscriptores
- [ ] Lista de suscriptores
- [ ] Filtros: Activos, Dados de baja
- [ ] Segmentación por intereses
- [ ] Exportar lista

### Campañas
- [ ] Editor WYSIWYG para crear campañas
- [ ] Plantillas predefinidas responsive
- [ ] Preview de email
- [ ] Programar envío
- [ ] Envío inmediato

### Métricas
- [ ] Tasa de apertura
- [ ] Tasa de clics
- [ ] Historial de campañas
- [ ] Reportes por campaña

## Características Técnicas

### Botón WhatsApp
- [x] Botón flotante siempre visible
- [x] Número: +56 9 8819 0248
- [x] Mensajes contextuales por página:
  - [ ] Home: "Hola, me gustaría información sobre Cancagua"
  - [ ] Servicios: "Hola, me interesa el servicio de [nombre]"
  - [ ] Eventos: "Hola, quiero información sobre el evento [nombre]"
  - [ ] Cafetería: "Hola, quiero reservar mesa en la cafetería"
  - [ ] Gift Cards: "Hola, quiero comprar una gift card"
- [ ] Responsive y no obstruye contenido

### SEO Optimización
- [ ] Meta tags dinámicos por página
- [ ] Open Graph para redes sociales
- [ ] Schema.org markup: LocalBusiness
- [ ] Schema.org markup: Service
- [ ] Schema.org markup: Event
- [ ] URLs amigables (slugs)
- [ ] Sitemap XML automático
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Alt text en todas las imágenes
- [ ] Heading hierarchy correcta

### Performance
- [ ] Core Web Vitals optimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Lazy loading de imágenes
- [ ] Compresión de imágenes (WebP)
- [ ] Minificación CSS/JS
- [ ] Caché estratégico

### Mobile-First
- [ ] Diseño inicial para 375px
- [ ] Breakpoints: 375px, 768px, 1024px, 1440px
- [ ] Touch-friendly (botones mínimo 44x44px)
- [ ] Navegación mobile optimizada
- [ ] Formularios optimizados para teclado móvil

## Base de Datos

### Tablas
- [x] services (servicios de Skedu + contenido adicional)
- [x] events (eventos de Skedu + contenido adicional)
- [x] clients (clientes sincronizados)
- [x] newsletter_subscribers (suscriptores)
- [x] newsletter_campaigns (campañas enviadas)
- [x] analytics_events (eventos de analytics)
- [x] webhook_logs (logs de webhooks)
- [ ] gift_cards (tarjetas de regalo) - pendiente

## Testing y Deployment
- [ ] Testing en diferentes navegadores
- [ ] Testing en diferentes dispositivos
- [ ] Testing de formularios
- [ ] Testing de integración con Skedu
- [ ] Crear checkpoint final
- [ ] Documentación de uso del CMS

## Correcciones de Errores
- [x] Corregir error de `<a>` anidados en ServiceCard

## Rediseño de Colores y Mobile-First
- [x] Extraer colores exactos del sitio original de Cancagua
- [x] Actualizar paleta de colores en index.css
- [ ] Ajustar componentes para usar colores originales
- [ ] Optimizar diseño mobile-first
- [ ] Revisar espaciados y tipografía en mobile

## Sistema de Traducción Multiidioma
- [x] Instalar librería de internacionalización (i18next)
- [x] Crear archivos de traducción (ES, EN, PT, FR, DE)
- [x] Implementar detección automática de idioma del navegador
- [x] Agregar selector de idioma en el header
- [ ] Traducir todo el contenido del sitio (pendiente aplicar traducciones a componentes)
- [x] Guardar preferencia de idioma en localStorage
- [ ] Probar cambio de idioma en todas las páginas

## Aplicar Traducciones a Todas las Páginas
- [x] Navbar y Footer traducidos
- [ ] Home (Hero, Servicios, Eventos)
- [ ] Servicios (listado)
- [ ] ServicioBiopiscinas
- [ ] Eventos
- [ ] Cafetería
- [ ] GiftCards
- [ ] Nosotros
- [ ] Contacto
- [ ] HeroSlider
- [ ] ServiceCard
- [ ] WhatsAppButton

## CMS Interno - Dashboard Administrativo
- [x] Crear layout de dashboard con sidebar
- [x] Página principal del dashboard con métricas
- [ ] Gestión de servicios (CRUD)
- [ ] Gestión de eventos (CRUD)
- [ ] Gestión de clientes (listado, búsqueda, exportar)
- [ ] Sistema de newsletter (crear campaña, enviar, métricas)
- [ ] Analytics del sitio (visitantes, conversiones, fuentes)
- [ ] Configuración de Skedu API
- [ ] Logs de webhooks
- [x] Protección con autenticación (solo admin)

## Gestión de Usuarios en CMS
- [x] Actualizar esquema de base de datos para incluir rol "editor"
- [x] Crear página de gestión de usuarios (/cms/usuarios)
- [x] Listado de usuarios con búsqueda y filtros
- [x] Formulario para agregar nuevo usuario
- [x] Editar rol de usuario existente (admin, editor, user)
- [ ] Eliminar usuarios (pendiente backend)
- [x] Control de permisos por rol

## Conectar Gestión de Usuarios con Backend
- [x] Crear endpoints tRPC para listar usuarios
- [ ] Crear endpoint tRPC para agregar usuario (pendiente - usuarios se crean al iniciar sesión)
- [x] Crear endpoint tRPC para cambiar rol de usuario
- [x] Crear endpoint tRPC para eliminar usuario
- [x] Conectar página de usuarios con tRPC queries
- [ ] Probar funcionalidad completa de gestión de usuarios

## Correcciones Visuales
- [x] Corregir títulos del hero slider (aparecen claves de traducción en lugar de texto)

## Corrección de Error de Links Anidados
- [x] Buscar y corregir componentes con `<a>` anidados

## Corrección Adicional de Links Anidados
- [x] Revisar y corregir HeroSlider para links anidados

## Búsqueda Exhaustiva de Links Anidados
- [x] Buscar en todos los archivos TSX patrones de links anidados
- [x] Corregir Navbar (eliminados 17 casos de Link + a anidados)
- [x] Corregir Footer (eliminados 6 casos de Link + a anidados)

## Corrección de Scroll al Cambiar de Página
- [x] Implementar scroll automático al inicio cuando se navega entre páginas

## Página de Carta Editable desde CMS
- [x] Actualizar esquema de base de datos para incluir tablas de menú
- [x] Crear tabla `menu_categories` (categorías de menú)
- [x] Crear tabla `menu_items` (items de menú con precios y descripciones)
- [x] Crear helpers de base de datos para gestión de menú
- [x] Crear endpoints tRPC para CRUD de categorías y items de menú
- [x] Crear página pública `/carta` con diseño tipo restaurant
- [x] Crear página CMS `/cms/carta` para gestionar el menú
- [ ] Implementar ordenamiento drag-and-drop de items (pendiente)
- [x] Agregar filtros por opciones dietéticas (vegano, sin gluten, keto)
- [x] Soporte para múltiples precios por item (para 2, para 4, para 6)
- [ ] Subida de imágenes para items de menú

## Poblar Carta con Datos del PDF
- [x] Extraer todos los productos y categorías del PDF
- [x] Crear script para insertar datos en base de datos
- [x] Ejecutar script de población de datos
- [x] Verificar que todos los productos aparezcan en /cms/carta
- [x] Verificar que la carta pública /carta muestre todos los productos

## Sistema de Imágenes para Productos de la Carta
- [x] Agregar campo image_url a tabla menu_items en esquema (ya existe)
- [x] Crear helper para subida de imágenes a S3
- [x] Implementar endpoint tRPC para subir imágenes de productos
- [x] Agregar campo de subida de imagen en formulario de CMS
- [x] Mostrar imágenes en página pública /carta
- [x] Permitir cambiar imágenes desde CMS

## Backend para Formularios de Reserva y Contacto
- [x] Crear tabla bookings en base de datos
- [x] Crear tabla contact_messages en base de datos
- [x] Implementar endpoints tRPC para procesar reservas
- [x] Implementar endpoints tRPC para procesar mensajes de contacto
- [x] Configurar sistema de envío de notificaciones al propietario
- [x] Conectar formulario de reserva con backend
- [x] Conectar formulario de contacto con backend
- [x] Agregar validaciones y manejo de errores
- [x] Crear página en CMS para ver reservas recibidas
- [x] Crear página en CMS para ver mensajes de contacto

## Landing Page Navega Relax (Catamarán + Cancagua)
- [x] Subir imagen del catamarán a S3
- [x] Crear página /navega-relax con información completa de la experiencia
- [x] Agregar botón flotante de WhatsApp
- [x] Incluir enlace a reservas de Catamarán Bandurria
- [x] Agregar ruta y navegación en menú principal
- [x] Probar responsive y funcionalidad

## Sistema de Cotizaciones y CRM Corporativo
- [x] Crear tablas en base de datos: corporate_products, quotes, quote_items, corporate_clients
- [x] Implementar helpers de base de datos para productos y cotizaciones
- [x] Crear endpoints tRPC para gestión de productos corporativos
- [x] Crear endpoints tRPC para creación y gestión de cotizaciones
- [x] Implementar módulo CMS de catálogo de productos corporativos
- [x] Implementar módulo CMS de creación de cotizaciones con generador de itinerario
- [x] Agregar previsualización de cotización antes de enviar
- [x] Implementar módulo CRM de seguimiento de cotizaciones
- [x] Agregar estados: Cotización enviada, Aprobado, Jornada efectuada, Jornada pagada, Factura enviada
- [x] Implementar formulario de datos del cliente para facturación
- [ ] Integrar con sistema de facturación gratuita (pendiente de definir API)
- [x] Agregar sistema de aprobación antes de enviar al cliente
- [x] Escribir tests para funcionalidades de cotizaciones

## Agregar Usuarios Adicionales al CMS
- [x] Verificar sistema de autenticación actual (Manus OAuth)
- [x] Agregar usuarios eventos@cancagua.cl y sebastian.jara.b@gmail.com con rol admin
- [x] Documentar proceso de acceso para nuevos usuarios

## Corregir Menú Lateral en Módulos Corporativos
- [x] Identificar por qué el menú lateral desaparece en páginas de cotizaciones y catálogo
- [x] Corregir estructura de páginas para mantener DashboardLayout consistente
- [x] Verificar que todas las páginas del CMS mantengan el menú lateral

## Exportación de Cotizaciones a PDF
- [x] Crear generador de PDF en backend con diseño profesional
- [x] Agregar endpoint tRPC para generar PDF de cotización
- [x] Implementar botón de descarga/exportación en página de cotizaciones
- [x] Implementar botón de exportación en vista de detalle de cotización
- [x] Probar generación de PDF con diferentes cotizaciones

## Corregir Scroll Horizontal en Modal de Cotización
- [x] Ajustar ancho del modal de detalles de cotización
- [x] Hacer tabla de productos responsive sin scroll horizontal

## Estandarizar Menú Lateral en Todas las Páginas del CMS
- [x] Auditar todas las páginas del CMS para verificar uso de DashboardLayout
- [x] Corregir páginas de Carta, Reservas, Mensajes, Usuarios para usar DashboardLayout
- [x] Verificar que ProductosCorporativos, Cotizaciones y CrearCotizacion usen DashboardLayout
- [x] Documentar estructura estándar para futuros módulos

## Páginas Placeholder "Próximamente"
- [x] Identificar enlaces del menú sin páginas implementadas
- [x] Crear componente reutilizable ComingSoon
- [x] Crear páginas placeholder: Servicios, Eventos, Clientes, Newsletter, Analytics, Configuración
- [x] Registrar rutas en App.tsx

## Corregir Menú del CMS en DashboardLayout
- [x] Revisar estructura del menú en Dashboard.tsx
- [x] Actualizar DashboardLayout.tsx para usar menú personalizado del CMS
- [x] Eliminar menú genérico (Navigation, Page 1, Page 2)
- [x] Verificar que todas las páginas muestren el menú correcto

## Bulk Actions e Importación de Productos Corporativos
- [x] Agregar endpoints backend para eliminar múltiples productos
- [x] Agregar endpoint backend para duplicar múltiples productos
- [x] Agregar endpoint backend para importar productos desde CSV/Excel
- [x] Implementar UI de selección múltiple con checkboxes
- [x] Implementar barra de acciones masivas (eliminar, duplicar)
- [x] Implementar componente de importación de archivos CSV/Excel
- [x] Agregar validación y preview de datos antes de importar
- [x] Escribir tests para funcionalidades de bulk actions

## Bulk Actions para Mensajes, Reservas y Cotizaciones

### Mensajes (Contactos)
- [x] Agregar checkboxes de selección múltiple
- [x] Implementar barra de acciones masivas (eliminar, marcar como leído/no leído)
- [x] Agregar exportación a CSV de mensajes seleccionados
- [x] Implementar endpoints tRPC para bulk delete y bulk update status
- [x] Escribir tests para bulk actions de mensajes

### Reservas (Bookings)
- [x] Agregar checkboxes de selección múltiple
- [x] Implementar barra de acciones masivas (eliminar, cambiar estado)
- [x] Agregar exportación a CSV de reservas seleccionadas
- [x] Implementar endpoints tRPC para bulk delete y bulk update status
- [x] Escribir tests para bulk actions de reservas

### Cotizaciones
- [x] Agregar checkboxes de selección múltiple
- [x] Implementar barra de acciones masivas (eliminar, cambiar estado, duplicar)
- [x] Agregar exportación a CSV de cotizaciones seleccionadas
- [x] Implementar endpoints tRPC para bulk delete, bulk update status y bulk duplicate
- [x] Escribir tests para bulk actions de cotizaciones

## Sistema de Newsletters con IA

### Base de Datos
- [x] Crear tabla `newsletters` (id, subject, htmlContent, textContent, status, scheduledAt, sentAt, recipientCount, openCount, clickCount, createdBy, createdAt, updatedAt)
- [x] Crear tabla `subscribers` (id, email, name, status, source, metadata JSON, subscribedAt, unsubscribedAt)
- [x] Crear tabla `subscriber_lists` (id, name, description, segmentationRules JSON, subscriberCount, createdAt, updatedAt)
- [x] Crear tabla `list_subscribers` (listId, subscriberId, addedAt) - relación many-to-many
- [x] Crear tabla `newsletter_sends` (id, newsletterId, subscriberId, sentAt, openedAt, clickedAt, status)

### Backend - Newsletters
- [x] Crear funciones de base de datos para newsletters (CRUD completo)
- [x] Implementar endpoints tRPC para newsletters (getAll, getById, create, update, delete, duplicate)
- [x] Implementar bulk actions: bulkDelete, bulkDuplicate
- [x] Crear endpoint para generar diseño de email con IA (generateEmailDesign)
- [x] Crear endpoint para refinar diseño con chat IA (refineEmailDesign)
- [ ] Implementar vista previa de newsletter (preview)
- [x] Implementar envío de newsletter (send, sendTest)

### Backend - Suscriptores
- [x] Crear funciones de base de datos para suscriptores (CRUD completo)
- [x] Implementar endpoints tRPC para suscriptores (getAll, create, update, delete, subscribe, unsubscribe)
- [x] Implementar importación masiva de CSV (importFromCSV)
- [x] Crear endpoint para segmentación automática con IA (analyzeAndSegment)
- [x] Implementar gestión de listas (createList, updateList, deleteList, addToList, removeFromList)
- [x] Implementar bulk actions para suscriptores (bulkDelete, bulkAddToList, bulkRemoveFromList)

### Frontend - Gestión de Newsletters
- [x] Crear página `/cms/newsletters` con tabla de historial
- [x] Implementar columnas: asunto, fecha envío, hora envío, destinatarios, tasa apertura, estado
- [x] Agregar checkboxes de selección múltiple
- [x] Implementar barra de bulk actions (eliminar, duplicar)
- [x] Agregar botón de vista previa por newsletter
- [x] Implementar botón "Duplicar y Editar" que redirija al creador
- [x] Agregar exportación a CSV del historial
- [x] Implementar filtros por estado y rango de fechas

### Frontend - Creador de Newsletters
- [x] Crear página `/cms/crear-newsletter` con formulario
- [x] Implementar campo de asunto
- [x] Crear selector de listas de destinatarios (múltiple)
- [x] Implementar área de chat con IA para diseño
- [x] Agregar carga de imágenes (drag & drop o selector)
- [x] Implementar campo de texto/descripción del contenido
- [x] Crear interfaz de chat para refinamiento iterativo
- [x] Implementar vista previa en tiempo real del diseño generado
- [x] Agregar botón "Enviar Email de Prueba"
- [ ] Implementar programación de envío (fecha y hora)
- [ ] Crear flujo de confirmación antes de envío masivo

### Frontend - Gestión de Suscriptores
- [x] Crear página `/cms/suscriptores` con tabla de suscriptores
- [x] Implementar columnas: email, nombre, estado, fecha suscripción, listas
- [x] Agregar checkboxes de selección múltiple
- [x] Implementar barra de bulk actions (eliminar, agregar a lista, remover de lista)
- [x] Crear botón de importación masiva CSV
- [x] Implementar modal de importación con preview de datos
- [x] Agregar botón "Organizar con IA" para segmentación automática
- [x] Crear interfaz de gestión de listas (crear, editar, eliminar)
- [x] Implementar vista de listas con contadores
- [x] Agregar exportación a CSV de suscriptores

### Frontend - Formulario Público de Suscripción
- [x] Crear componente `NewsletterSubscribe` reutilizable
- [x] Agregar formulario en footer de la web pública
- [x] Implementar validación de email
- [x] Agregar mensaje de confirmación post-suscripción
- [ ] Implementar protección anti-spam (rate limiting)
- [ ] Crear página de confirmación `/suscripcion-exitosa`
- [ ] Agregar página de cancelación de suscripción `/cancelar-suscripcion`

### Integración con IA
- [x] Implementar función para generar diseño HTML de email basado en prompt + imágenes
- [x] Crear sistema de chat iterativo para refinamiento de diseño
- [x] Implementar análisis de CSV para segmentación automática
- [x] Crear función para sugerir nombres de listas basados en segmentos
- [x] Implementar extracción de metadatos relevantes de CSV (ciudad, fecha compra, etc.)

### Sistema de Envío
- [x] Integrar Resend para envío de emails (SMTP o API)
- [ ] Implementar cola de envío para newsletters masivos
- [ ] Crear sistema de tracking de aperturas (pixel tracking)
- [ ] Implementar tracking de clicks en enlaces
- [ ] Agregar manejo de bounces y unsubscribes
- [ ] Implementar límites de envío y throttling

### Tests
- [x] Escribir tests para CRUD de newsletters
- [x] Escribir tests para CRUD de suscriptores
- [x] Escribir tests para gestión de listas
- [x] Escribir tests para bulk actions
- [ ] Escribir tests para importación de CSV
- [ ] Escribir tests para generación de diseño con IA


## Reorganización del Menú CMS por Categorías

### Estructura de Categorías
- [x] Definir estructura de navegación con 5 categorías principales
- [x] B2C (Clientes): Servicios, Carta, Reservas, Mensajes, Clientes
- [x] B2B (Corporativo): Cotizaciones, Catálogo de Productos, CRM Pipeline
- [x] Marketing: Newsletters, Suscriptores, Listas
- [x] Métricas: Analytics, Reportes de Ventas
- [x] Administración: Usuarios, Configuración

### Componente de Layout Unificado
- [x] Crear componente CMSLayout con selector de categorías en header
- [x] Implementar sidebar dinámico que cambia según categoría seleccionada
- [x] Agregar indicador visual de categoría activa
- [x] Implementar persistencia de categoría seleccionada en localStorage

### Dashboard Principal
- [x] Rediseñar dashboard con tarjetas de acceso rápido por categoría
- [x] Cada tarjeta muestra resumen de métricas de esa categoría
- [x] Al hacer clic en categoría, navegar al mini-dashboard de esa área

### Actualización de Páginas Existentes
- [x] Migrar todas las páginas CMS al nuevo CMSLayout
- [x] Asegurar navegación consistente en todas las páginas
- [x] Actualizar rutas si es necesario

## Módulo CRM Pipeline (Tipo Pipedrive)

### Backend
- [x] Verificar que el esquema de cotizaciones soporte los estados del pipeline
- [x] Crear endpoint para actualizar estado de cotización (drag & drop)
- [x] Agregar endpoint para obtener cotizaciones agrupadas por estado

### Frontend - Vista Kanban
- [x] Crear página `/cms/crm-pipeline` con vista de columnas
- [x] Implementar columnas: Borrador, Enviada, En Negociación, Aprobada, Evento Completado, Facturada, Pagada
- [x] Agregar funcionalidad drag & drop para mover cotizaciones entre columnas
- [x] Mostrar tarjeta de cotización con info resumida (cliente, monto, fecha)
- [x] Implementar modal de detalle al hacer clic en cotización
- [x] Agregar filtros por fecha, cliente, monto
- [x] Implementar búsqueda de cotizaciones


## Correcciones Urgentes (14 Enero 2026)

- [x] Corregir logo del footer que no carga
- [x] Eliminar marcadores de código (```html y ```) de la vista previa de emails

- [x] Actualizar prompt de IA para usar URLs absolutas de imágenes reales de Cancagua en emails


## Correcciones 14 Enero 2026 - Parte 2

- [x] Corregir generación de imágenes en emails (la IA sigue inventando URLs)
- [x] Actualizar links de redes sociales en Footer, emails y toda la web
- [x] Configurar envío de cotizaciones B2B desde cotizacion@cancagua.cl con copia a eventos@cancagua.cl


## Integración de Imágenes con IA en Newsletters

- [ ] Crear endpoint para generar imágenes de newsletter con IA
- [ ] Implementar subida automática de imágenes generadas a S3
- [x] Modificar generateDesign para usar imágenes generadas reales
- [x] Actualizar frontend del creador de newsletters con indicador de generación de imágenes
- [ ] Probar flujo completo de generación de newsletter con imágenes


## Simplificación Sistema de Newsletters

- [x] Eliminar opción de programar envío en CrearNewsletter
- [ ] Agregar botón "Guardar como Borrador" en CrearNewsletter
- [x] Agregar botón "Enviar Ahora" en CrearNewsletter
- [ ] Actualizar página Newsletter.tsx con pestañas (Borradores, Enviados)
- [ ] Filtrar newsletters por estado en cada pestaña


## Landing Hot Tubs y TikTok (14 Enero 2026)

### Redes Sociales
- [ ] Agregar TikTok (@cancaguafrutillar) al Footer
- [ ] Agregar TikTok a los prompts de generación de emails

### Landing Page Hot Tubs
- [ ] Crear página HotTubs.tsx optimizada para conversión
- [ ] Incluir hero con imagen impactante y CTA de reserva
- [ ] Agregar sección de beneficios/características
- [ ] Incluir galería de imágenes
- [ ] Agregar sección de precios y horarios
- [ ] Incluir testimonios o reseñas
- [ ] Agregar múltiples CTAs de reserva (enlace: https://reservas.cancagua.cl/cancaguaspa/s/f4975ff2-fd9c-4519-8103-97d6f75108bf)
- [ ] Optimizar para móvil

### Landing Page Masajes y Terapias
- [x] Crear página Masajes.tsx optimizada para conversión
- [x] Incluir hero con imagen impactante y CTA de reserva
- [x] Agregar listado de todos los tipos de masajes con precios
- [x] Incluir descripción de cada servicio
- [x] Agregar múltiples CTAs de reserva (enlace: https://reservas.cancagua.cl/cancaguaspa/s/502a130d-2e50-472a-aabc-a7917d5b5fbe)
- [x] Optimizar para móvil

### Landing Page Clases Regulares
- [x] Crear página ClasesRegulares.tsx optimizada para conversión
- [x] Incluir hero con imagen impactante
- [x] Agregar cards para cada clase:
  - Hatha Yoga Moderado/Intenso (https://reservas.cancagua.cl/cancaguaspa/s/7be8a0f0-1b7a-4b7a-819f-9fe38d26bca7)
  - Hatha Yoga Suave (https://reservas.cancagua.cl/cancaguaspa/s/f57b8d75-45e8-4811-b705-1a72637a1a50)
  - Danza Infantil (https://reservas.cancagua.cl/cancaguaspa/s/07228efe-177c-429c-89a0-676277abbdff)
  - Entrenamiento Funcional & Animal Flow (https://reservas.cancagua.cl/cancaguaspa/s/3a52ff0c-89cb-48cb-b2e5-f1395a6daf71)
- [x] Optimizar para móvil


## Nombres de Remitente Personalizados para Emails
- [x] Modificar sistema de envío de newsletters para usar "Newsletter Cancagua" como nombre de remitente
- [x] Modificar sistema de envío de cotizaciones para usar "Cotización Cancagua" como nombre de remitente
- [x] Agregar campo editable en creador de newsletters para personalizar nombre del remitente
- [x] Agregar campo sender_name a tabla newsletters en base de datos
- [ ] Probar que los emails muestren el nombre correcto en lugar de solo "info"

## Mejoras en Sistema de Envío de Emails

### Newsletters
- [ ] Restaurar selector de opciones de envío (Enviar ahora, Programar, Borrador)
- [ ] Agregar selector de fecha/hora para programar envío
- [ ] Configurar reply-to a contacto@cancagua.cl para newsletters

### Cotizaciones B2B
- [ ] Agregar modal de envío de cotización con campo para emails de destinatarios
- [ ] Mantener remitente como "Cotización Cancagua <cotizacion@cancagua.cl>"
- [ ] Agregar copia automática a eventos@cancagua.cl
- [ ] Configurar reply-to a eventos@cancagua.cl


## Módulo de Códigos de Descuento
- [x] Crear tabla discountCodes en base de datos
- [x] Campos: código, tipo (porcentaje/monto), valor, usos máximos, usos actuales, usuario asignado, fecha expiración, servicios aplicables
- [x] Crear endpoints CRUD para códigos de descuento
- [x] Crear página de gestión en CMS Marketing (Códigos Dcto.)
- [x] Agregar enlace en navegación de Marketing
- [ ] Validación de códigos en proceso de reserva (pendiente integración)

## Mejoras en Gift Cards
- [x] Crear galería de imágenes de fondo para gift cards (5 opciones disponibles)
- [x] Implementar generación de PDF con imagen de fondo seleccionada
- [x] Agregar botón de descarga de PDF en confirmación de compra
- [x] Implementar botón de envío a WhatsApp con enlace de descarga
- [x] Actualizar interfaz de compra con selector de imágenes (5 diseños disponibles)
- [x] Sistema de compra simulada para pruebas (ya existía)


## Sistema de Formularios con Notificaciones
- [ ] Implementar sistema de notificación por WhatsApp (+56 9 4007 3999)
- [ ] Crear formulario de contacto con campos: Nombre, Email, Teléfono, Mensaje
- [ ] Enviar email a contacto@cancagua.cl con información del formulario
- [ ] Enviar mensaje personalizado a WhatsApp de Cancagua
- [ ] Probar funcionamiento completo del sistema


## Rediseño Módulo de Newsletters
- [x] Crear flujo paso a paso intuitivo (1. Contenido, 2. Diseño, 3. Destinatarios, 4. Envío)
- [x] IA genera asunto automáticamente junto con el contenido
- [x] Campo de asunto editable después de generación
- [x] Diseño más visual con cards y mejor espaciado
- [x] Preview en tiempo real del email
- [x] Botones de acción claros y descriptivos


## Landing Page Hot Tubs
- [x] Crear página HotTubs.tsx optimizada para conversión
- [x] Incluir hero con imagen impactante y CTA de reserva
- [x] Agregar descripción del servicio de Hot Tubs
- [x] Incluir enlace de reserva: https://reservas.cancagua.cl/cancaguaspa/s/f4975ff2-fd9c-4519-8103-97d6f75108bf
- [x] Agregar ruta /servicios/hot-tubs en App.tsx
- [x] Optimizar para móvil


## Corrección y Ordenamiento del Menú del Header
- [x] Revisar estructura actual del menú en Navbar.tsx
- [x] Reorganizar menú con estructura lógica (Home, Servicios con submenu, Navega Relax, Eventos, Cafetería, Gift Cards, Nosotros, Contacto)
- [x] Corregir rutas de Masajes y Clases en el submenu de Servicios
- [x] Asegurar que todos los enlaces funcionen correctamente
- [ ] Verificar responsive en móvil


## Reorganización del Menú - Opción A
- [x] Cambiar "Navega Relax" a categoría "EXPERIENCIAS" en el menú
- [x] Crear dropdown "EVENTOS" con dos opciones: Eventos Sociales y Eventos Empresas
- [x] Crear landing "Coming Soon" para Eventos Sociales
- [x] Enlazar "Eventos Empresas" a la sección B2B existente
- [x] Corregir imágenes faltantes en Hot Tubs (usar imágenes existentes del proyecto)
- [x] Corregir imágenes faltantes en Clases Regulares (usar imágenes existentes del proyecto)


## Reorganización del Menú - Opción A
- [x] Cambiar "Navega Relax" a categoría "EXPERIENCIAS" en el menú
- [x] Crear dropdown "EVENTOS" con dos opciones: Eventos Sociales y Eventos Empresas
- [x] Crear landing "Coming Soon" para Eventos Sociales
- [x] Enlazar "Eventos Empresas" a la sección B2B existente
- [x] Corregir imágenes faltantes en Hot Tubs (usar imágenes existentes del proyecto)
- [x] Corregir imágenes faltantes en Clases Regulares (usar imágenes existentes del proyecto)


## Mejoras Formulario de Contacto
- [x] Eliminar campo "Asunto" del formulario
- [x] Hacer campo "Teléfono" obligatorio
- [x] Agregar selector de país automático según geolocalización del usuario
- [x] Hacer campo "Mensaje" obligatorio
- [x] Mejorar formato del email a contacto@cancagua.cl con información ordenada
- [x] Mejorar formato del mensaje de WhatsApp con información estructurada
- [x] Actualizar schema de base de datos para eliminar subject y hacer phone obligatorio
- [x] Configurar reply-to a contacto@cancagua.cl


## Rediseño Landing Eventos Empresariales
- [x] Crear landing de ventas profesional para eventos corporativos (no CMS)
- [x] Hero impactante con enfoque en retiros corporativos y team building
- [x] Sección de beneficios para empresas
- [x] Showcase de servicios disponibles (biopiscinas, masajes, talleres, catering)
- [x] Tipos de eventos corporativos (retiros, team building, reconocimiento)
- [x] Formulario de cotización rápida con campos empresariales
- [x] CTAs claros para solicitar cotización
- [x] Optimizar para conversión B2B


## Ajuste PDF de Cotización
- [x] Reducir tamaño del número de cotización en esquina superior derecha del PDF
- [x] Asegurar que no se superponga con el texto "COTIZACIÓN"
- [x] Ajustar posición de fecha y válida hasta


## Scroll en Chat de Newsletters
- [x] Agregar scroll al contenedor de mensajes de IA en CrearNewsletter
- [x] Asegurar que la conversación se mantenga dentro del cuadro
- [x] Scroll automático al último mensaje (ya existía con chatEndRef)


## Pendientes Futuros

### Pasarela de Pago
- [ ] Integrar pasarela de pago real (Flow, Transbank, o Mercado Pago)
- [ ] Reemplazar sistema de compra simulada de gift cards con pago real
- [ ] Configurar webhooks para confirmación de pagos
- [ ] Implementar manejo de estados de pago (pendiente, aprobado, rechazado, reembolso)

### Galería Eventos Corporativos
- [ ] Agregar galería de fotos de eventos corporativos en landing de Eventos Empresas
- [ ] Incluir testimonios reales de clientes B2B con resultados medibles
- [ ] Agregar logos de empresas que han realizado eventos en Cancagua
- [ ] Crear casos de éxito con métricas de satisfacción

### Sistema de Reservas Integrado
- [ ] Implementar sistema de reservas integrado en el sitio web
- [ ] Permitir aplicar códigos de descuento en el proceso de booking
- [ ] Permitir aplicar gift cards como método de pago en reservas
- [ ] Integrar con calendario de disponibilidad
- [ ] Enviar confirmaciones automáticas por email y WhatsApp


## Correcciones y Mejoras Inmediatas
- [x] Corregir botón "BOOK NOW" del header para que redirija a página de reservas funcional
- [x] Agregar invitación al grupo de WhatsApp de Cancagua (https://chat.whatsapp.com/GX12Kr6Q6jSDvBUfVrloNy) en:
  - [x] Footer del sitio
  - [x] Página de contacto
  - [x] Banner en home
  - [x] Confirmación de compra de gift cards


## Landing Page Sauna Nativo
- [x] Crear página Sauna.tsx optimizada para conversión
- [x] Incluir hero con imagen impactante
- [x] Agregar 4 opciones de reserva con precios:
  - Sauna Nativo 1 Persona ($15.000 CLP) - https://reservas.cancagua.cl/cancaguaspa/s/294abb1b-bda0-4e10-8600-7d225f6ce663
  - Sauna Nativo 2 Personas ($25.000 CLP) - https://reservas.cancagua.cl/cancaguaspa/s/486ccef7-d9d0-4310-9eaf-8034ece7ac26
  - Sauna Nativo 3 Personas ($33.000 CLP) - https://reservas.cancagua.cl/cancaguaspa/s/d2ff9cba-5073-4d6b-9992-fb0e4d727caf
  - Sauna Nativo Privado Hasta 6 personas ($40.000 CLP) - https://reservas.cancagua.cl/cancaguaspa/s/a944a041-9556-4c39-9252-ef1a01b28439
- [x] Agregar descripción de beneficios del sauna
- [x] Agregar ruta /servicios/sauna en App.tsx
- [x] Agregar enlace en menú SERVICIOS del Navbar
- [x] Optimizar para móvil

## Landing Page Taller Método Wim Hof
- [x] Crear página TallerWimHof.tsx para evento del 31 de enero
- [x] Incluir hero con imagen de Alan IceMan
- [x] Agregar información del instructor (Alan Iceman, único instructor avanzado en Chile)
- [x] Incluir descripción del método Wim Hof (respiración, mente, frío)
- [x] Agregar detalles del evento (fecha, duración 4h 15min, precio $45.000)
- [x] Incluir enlace de reserva: https://reservas.cancagua.cl/cancaguaspa/s/4ef7ffc4-7d23-4acd-af42-79a8c78fb1b5
- [x] Agregar ruta /eventos/taller-wim-hof en App.tsx
- [x] Agregar enlace destacado en menú EVENTOS del Navbar
- [x] Optimizar para móvil


## Correcciones Pendientes
- [x] Corregir texto del menú de Sauna en Navbar (muestra "Name" en lugar de "Sauna")
- [x] Actualizar enlace de reserva en botón BOOK NOW del header: https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw..

## Actualizar Horarios Reales de Cancagua
- [x] Actualizar mensaje del header con horarios correctos (Lunes 17:00-22:00, Martes-Domingo 09:00-22:00)
- [x] Actualizar archivos de traducción con horarios correctos (ES, EN, PT, FR, DE)

## Landing Pages Full Day
- [x] Crear landing Full Day Hot Tubs + Biopiscinas (8 hrs)
- [x] Crear landing Full Day Biopiscinas + Playa (8 hrs)
- [x] Agregar enlaces en menú de navegación
- [x] Probar enlaces de reserva de Skedu

## Reorganización de Menú
- [x] Mover Full Day Hot Tubs + Biopiscinas de Servicios a Experiencias
- [x] Mover Full Day Biopiscinas + Playa de Servicios a Experiencias

## Correcciones Página Servicios y Banners
- [x] Actualizar página /servicios con servicios actuales (eliminados SUP y Pase Reconecta, agregado Sauna Nativo)
- [x] Arreglar botones del primer banner del home (los enlaces ya funcionan correctamente)
- [x] Corregir enlaces de los otros banners del home (masajes y clases ahora apuntan a /masajes y /clases)
- [x] Actualizar foto de Alan IceMan en Taller Wim Hof con imagen real
