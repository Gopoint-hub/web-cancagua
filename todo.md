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
