# Plan de Implementación: Módulo Concierge para Cancagua Web

**Autor:** Manus AI  
**Fecha:** 30 de enero de 2026  
**Versión:** 2.0

---

## 1. Resumen Ejecutivo

Este documento presenta la versión actualizada del plan técnico para implementar un **Módulo Concierge** en la plataforma Cancagua Web, incorporando las especificaciones detalladas por el cliente. El objetivo es crear una categoría de negocio completamente nueva y autocontenida dentro del CMS, diseñada para que vendedores externos (afiliados) puedan comercializar servicios de Cancagua de forma autónoma.

El sistema se estructurará en torno a una nueva categoría principal en el CMS llamada **"Concierge"**, que contendrá módulos específicos para la gestión de servicios, vendedores y la herramienta de venta. Se creará un nuevo rol de usuario, **`concierge`**, con acceso restringido únicamente a la interfaz de ventas, la cual estará optimizada para su uso en dispositivos móviles y tablets. La solución aprovechará la infraestructura de pagos existente con WebPay Plus y el sistema de autenticación del proyecto.

---

## 2. Arquitectura y Diseño General

### 2.1. Nueva Categoría "Concierge" en el CMS

En lugar de ser un sub-módulo, "Concierge" será una categoría principal en la navegación del CMS, visible solo para roles `admin`, `super_admin` y `concierge`. Esta categoría albergará tres módulos distintos:

1.  **Herramienta de Venta:** La interfaz que utilizarán los usuarios con rol `concierge` para realizar ventas. Será su única vista disponible.
2.  **Servicios Disponibles (Admin):** Panel donde los administradores gestionan el catálogo de servicios para el canal Concierge.
3.  **Vendedores (Admin):** Panel para que los administradores gestionen a los vendedores, configuren sus comisiones y analicen sus métricas de rendimiento.

### 2.2. Nuevo Rol de Usuario: `concierge`

Se modificará el esquema de la base de datos para incluir un nuevo rol de usuario.

-   **Tabla `users`:** Se actualizará el `mysqlEnum` del campo `role` para añadir el valor `concierge`. Este rol tendrá los permisos más restringidos del sistema.

    > Los usuarios con rol `concierge` solo podrán acceder a la ruta `/cms/concierge/vender` y a los endpoints de tRPC estrictamente necesarios para seleccionar servicios y procesar una venta. No tendrán visibilidad sobre ningún otro módulo del CMS.

### 2.3. Modelo de Datos Actualizado

Para cumplir con los nuevos requisitos, se realizarán las siguientes modificaciones en la base de datos:

**Tabla `users` (Modificación):**

| Campo Añadido | Tipo | Descripción |
|:--------------|:-----|:------------|
| commissionRate| INT | Porcentaje de comisión (ej: 10 para 10%). Aplicable a roles `concierge`. |

**Tabla `conciergeServices` (Actualizada):**

Esta tabla definirá el catálogo de servicios para el canal Concierge, gestionado por el administrador.

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| id | INT (PK) | Identificador único |
| serviceId | INT (FK) | Referencia al servicio base en la tabla `services` |
| price | INT | Precio de venta específico para el canal Concierge (puede diferir del precio normal) |
| availableQuantity | INT | Cantidad de unidades disponibles para la venta (-1 para ilimitado) |
| active | BOOLEAN | Indica si el servicio está disponible para la venta |

**Tabla `conciergeSales` (Sin cambios):**

Esta tabla, propuesta en la V1, sigue siendo válida para registrar cada transacción individual, incluyendo el `sellerId`, el `amount`, la `commissionRate` y los datos de la transacción de WebPay.

**Nueva Tabla `conciergeSellerMetrics`:**

Para optimizar la consulta de métricas de rendimiento, se creará una tabla que almacene datos agregados por vendedor y por período.

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| id | INT (PK) | Identificador único |
| sellerId | INT (FK) | Referencia al vendedor en la tabla `users` |
| periodType | ENUM | Tipo de período: `daily`, `weekly`, `monthly` |
| periodKey | VARCHAR | Clave del período (ej: '2026-01-30', '2026-W05', '2026-01') |
| totalSales | INT | Monto total vendido en el período |
| transactionCount | INT | Número de transacciones en el período |
| totalCommission | INT | Monto total de comisiones generadas |

> **Nota:** Esta tabla se poblará mediante un proceso automatizado (ej. un cron job diario) que procesará los datos de la tabla `conciergeSales` para mantener las métricas actualizadas sin sobrecargar la base de datos con consultas complejas en tiempo real.

---

## 3. Módulos de la Categoría Concierge

### 3.1. Herramienta de Venta (Rol `concierge`)

-   **Ruta:** `/cms/concierge/vender`
-   **Diseño:** La interfaz será **mobile-first**, diseñada específicamente para una experiencia fluida en tablets y smartphones.
-   **Funcionalidad:**
    1.  El vendedor verá una cuadrícula visual con los servicios disponibles del catálogo Concierge.
    2.  Al seleccionar un servicio, se mostrará un formulario simple para ingresar los datos del cliente final (nombre, email).
    3.  Al confirmar, se iniciará la transacción con WebPay, y la interfaz de pago se mostrará directamente en el dispositivo para que el cliente pague.
    4.  Tras el pago, el sistema mostrará una confirmación de "Venta Exitosa" o "Pago Rechazado".

### 3.2. Módulo "Servicios Disponibles" (Rol `admin`)

-   **Ruta:** `/cms/concierge/servicios`
-   **Funcionalidad:**
    -   Una tabla permitirá a los administradores ver y gestionar los servicios disponibles en el canal Concierge.
    -   **Acciones:**
        -   **Agregar Servicio:** Un modal permitirá seleccionar un servicio del catálogo general (`services`), y establecer el **precio de venta** y la **cantidad disponible** para el canal Concierge.
        -   **Editar Servicio:** Modificar el precio, la cantidad o desactivar un servicio.
        -   **Eliminar Servicio:** Quitar un servicio del catálogo Concierge.

### 3.3. Módulo "Vendedores" (Rol `admin`)

-   **Ruta:** `/cms/concierge/vendedores`
-   **Funcionalidad:**
    -   **Listado de Vendedores:** Se mostrará una lista de todos los usuarios con el rol `concierge`.
    -   **Gestión de Comisiones:** Al seleccionar un vendedor, el administrador podrá ver y actualizar su `commissionRate`.
    -   **Dashboard de Métricas:** Al hacer clic en "Ver Métricas", se accederá a un dashboard individual por vendedor que mostrará:
        -   **Filtros de Período:** Selectores para ver datos por día, semana, mes o un rango histórico.
        -   **KPIs Principales:** Tarjetas con el total de ventas, número de transacciones y comisiones generadas en el período seleccionado.
        -   **Gráficos de Tendencia:** Un gráfico de barras o líneas mostrará la evolución de las ventas y comisiones a lo largo del tiempo (ej. ventas diarias del último mes).
        -   **Tabla de Ventas:** Un listado detallado de todas las transacciones individuales del vendedor en el período seleccionado.

---

## 4. API del Backend (tRPC)

El router `concierge` se expandirá para incluir los siguientes procedimientos:

-   **`concierge.getAvailableServices`:** (Rol `concierge`) Devuelve los servicios activos del catálogo Concierge.
-   **`concierge.initiateSale`:** (Rol `concierge`) Inicia el flujo de venta y la transacción de WebPay.
-   **`concierge.confirmSale`:** (Público) Confirma el pago de WebPay y actualiza el estado de la venta.
-   **`admin.getConciergeServices`:** (Rol `admin`) Devuelve todos los servicios del catálogo Concierge para su gestión.
-   **`admin.addOrUpdateConciergeService`:** (Rol `admin`) Permite agregar o modificar un servicio del catálogo.
-   **`admin.getSellers`:** (Rol `admin`) Devuelve la lista de usuarios con rol `concierge`.
-   **`admin.updateSellerCommission`:** (Rol `admin`) Actualiza la comisión de un vendedor.
-   **`admin.getSellerMetrics`:** (Rol `admin`) Devuelve las métricas de rendimiento de un vendedor para un período específico, consultando la tabla `conciergeSellerMetrics`.

---

## 5. Cronograma de Implementación Revisado

| Fase | Descripción | Duración |
|:-----|:------------|:---------|
| **Fase 1** | Actualización del modelo de datos y migraciones | 1-2 días |
| **Fase 2** | Desarrollo de la API tRPC (procedimientos para venta y admin) | 3-4 días |
| **Fase 3** | Interfaz de Venta (diseño mobile-first) | 4-5 días |
| **Fase 4** | Módulos de Admin (Servicios y Vendedores con métricas) | 3-4 días |
| **Fase 5** | Pruebas integrales, ajustes de UI y corrección de errores | 2-3 días |
| **Total** | | **13-18 días** |

---

## 6. Próximos Pasos

Este plan actualizado refleja una solución más robusta y alineada con las necesidades del negocio. Una vez aprobado, se procederá con la implementación. Se recomienda comenzar con la actualización del esquema de la base de datos para sentar las bases de los desarrollos posteriores.
