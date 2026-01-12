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
