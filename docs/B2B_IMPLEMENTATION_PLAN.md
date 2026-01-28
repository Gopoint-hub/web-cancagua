# Plan de Implementación: Módulo de Cotizaciones B2B v2

**Autor:** Manus AI
**Fecha:** 27 de enero de 2026

## 1. Objetivo

Actualizar el sistema de cotizaciones B2B existente en `cancagua-web` para replicar el flujo de trabajo de 7 pasos utilizado en HubSpot, según las imágenes y requerimientos proporcionados. El objetivo es crear una experiencia de usuario más robusta, intuitiva y alineada con los procesos comerciales actuales.

Este documento presenta un plan de implementación detallado y una serie de preguntas para su validación antes de comenzar con el desarrollo.

## 2. Análisis y Detección de Gaps

Tras analizar el flujo de HubSpot y el código actual del proyecto, se han identificado las siguientes diferencias clave:

| Característica | Sistema Actual (`cancagua-web`) | Sistema Propuesto (basado en HubSpot) |
| :--- | :--- | :--- |
| **Flujo de Creación** | Asistente de 3 pasos (Cliente -> Productos -> Revisión). | Asistente de 7 pasos (Negocio -> Comprador -> Info -> Items -> Pago -> Plantilla -> Revisión). |
| **Entidad Principal** | La cotización (`quotes`) es la entidad central. | El "Negocio" (Deal) es la entidad principal a la que se asocian las cotizaciones. |
| **Gestión de Clientes** | Se crea un cliente corporativo (`corporateClients`) por separado. | Se permite buscar/crear "Negocios" y "Contactos" directamente en el flujo. |
| **Items de Cotización** | Se agregan productos. El orden es fijo. | Los items se pueden **arrastrar y soltar** para reordenar, sirviendo como itinerario. |
| **Precios y Cantidad** | El precio unitario y la cantidad se definen al agregar. | El precio unitario y la cantidad son **editables directamente en la tabla** de items. |
| **Generación de PDF** | Se genera un PDF básico al final. | Se genera un PDF con un formato específico, incluyendo datos del vendedor, cliente y referencia. |
| **Variantes** | No hay un concepto formal de "variantes" de una cotización. | El flujo facilita la creación de múltiples cotizaciones para un mismo "Negocio". |

## 3. Plan de Implementación Propuesto

El plan se divide en tres fases principales: Backend, Frontend y Funcionalidades Adicionales.

### Fase 1: Backend (Base de Datos y API)

Esta fase sienta las bases de datos y la lógica de negocio necesarias para soportar el nuevo flujo.

1.  **Modificar el Esquema de la Base de Datos (`drizzle/schema.ts`):**
    *   **Crear nueva tabla `deals` (Negocios):** Para almacenar la información del negocio (nombre, etapa, valor, fecha de cierre, propietario).
    *   **Modificar tabla `quotes` (Cotizaciones):**
        *   Añadir una referencia a `deals` (`dealId`).
        *   Añadir un campo `name` para el nombre de la cotización (ej: "GCN Turismo #Alternativas").
        *   Añadir campos para la URL y el slug de la cotización.
        *   Añadir un campo para el descuento global (porcentaje o monto fijo).
    *   **Modificar tabla `quoteItems` (Items de Cotización):**
        *   Añadir un campo `discount` para descuentos por línea.
        *   Añadir un campo `time` (opcional, tipo `string` o `time`) para la hora del itinerario.
    *   **Modificar tabla `corporateClients` (Clientes):** Renombrarla a `contacts` para reflejar mejor su uso y añadir un campo opcional `companyId` para asociarlo a una empresa.
    *   **Crear nueva tabla `companies` (Empresas):** Para almacenar los datos de las empresas B2B (nombre, RUT, giro, etc.).

2.  **Actualizar el Router de tRPC (`server/routers.ts`):**
    *   Crear nuevos procedimientos para gestionar `deals` (crear, buscar, obtener).
    *   Crear nuevos procedimientos para gestionar `contacts` y `companies`.
    *   **Modificar el procedimiento `quotes.create`:** Adaptarlo para que reciba la nueva estructura de datos, incluyendo el `dealId` y los campos adicionales.
    *   **Modificar el procedimiento `quotes.update`:** Asegurarse de que se puedan actualizar los items (incluyendo su orden), descuentos y otros detalles.
    *   Crear un nuevo procedimiento para la generación del PDF con el formato solicitado.

### Fase 2: Frontend (Interfaz de Usuario en CMS)

Esta fase se centra en construir la nueva interfaz de usuario dentro del panel de administración (`/client/src/pages/cms`).

1.  **Actualizar Dashboard de Cotizaciones (`Cotizaciones.tsx`):**
    *   Ajustar la tabla para mostrar el nombre del negocio/cliente y el nombre de la cotización.
    *   Mejorar los filtros para buscar por nombre de negocio.
    *   El botón "Crear cotización" iniciará el nuevo asistente.

2.  **Crear Nuevo Asistente de 7 Pasos (`CrearCotizacionB2B.tsx`):**
    *   **Paso 1: Negocio:** Componente para buscar un `deal` existente o crear uno nuevo en un modal.
    *   **Paso 2: Información del Comprador:** Componente para buscar un `contact` existente o crear uno nuevo (asociado a una `company`).
    *   **Paso 3: Tu Información:** (Omitido o autocompletado con datos del vendedor logueado).
    *   **Paso 4: Elementos de Pedido:**
        *   Implementar una tabla de items con **drag-and-drop** para reordenar.
        *   Hacer que los campos `Precio Unitario` y `Cantidad` sean editables en línea.
        *   Añadir la nueva columna para la `Hora` del itinerario.
        *   Modal para buscar y agregar productos desde la biblioteca (`corporateProducts`).
    *   **Paso 5: Firma y Pago:** Vista simple, ya que la funcionalidad de pago online está desactivada.
    *   **Paso 6: Plantilla y Detalles:** Formulario para el nombre de la cotización, fecha de vencimiento y términos de compra.
    *   **Paso 7: Revisión:** Vista previa del PDF final que se generará, mostrando todos los datos tal como aparecerán en el documento.

3.  **Integrar Lógica con tRPC:** Conectar todos los componentes del frontend con los nuevos procedimientos del backend creados en la Fase 1.

### Fase 3: Funcionalidades Adicionales

1.  **Generación de PDF (`server/pdfGenerator.ts`):**
    *   Actualizar la lógica para generar el PDF con el nuevo diseño: logo, datos del cliente, datos del vendedor, referencia, fechas y tabla de items ordenada.

2.  **Envío de Email (`server/email.ts`):**
    *   Crear una nueva plantilla de email para el envío de la cotización.
    *   Asegurarse de que el PDF se adjunte correctamente.
    *   Actualizar el procedimiento `quotes.sendByEmail` para usar la nueva plantilla y registrar el estado "enviada".

## 4. Dudas y Puntos a Confirmar

Antes de proceder, necesito aclarar los siguientes puntos:

1.  **Concepto de "Negocio" (Deal):** ¿Un "Negocio" representa a una empresa cliente (ej: "GCN Turismo") o a una oportunidad específica (ej: "Evento de fin de año GCN")? Esto es crucial para modelar la base de datos correctamente.

2.  **Variantes de Cotización:** El flujo de HubSpot muestra múltiples cotizaciones para un mismo negocio. ¿Debemos crear una relación formal de "variantes" en la base de datos (ej: una cotización padre y cotizaciones hijas) o simplemente asociar múltiples cotizaciones al mismo "Negocio"?

3.  **IVA (Impuesto):** Mencionaste que "todo se cotiza sin IVA" y que si un cliente lo necesita, Cancagua lo absorbe. ¿Debería haber una opción (checkbox) en la cotización para "Incluir IVA en el total" que recalcule los montos para reflejar esto, aunque el total para el cliente no cambie?

4.  **Campo "Hora" en Itinerario:** ¿Este campo debe ser un selector de hora (ej: 10:30) o un campo de texto libre?

5.  **Propietario del Negocio:** En el formulario de HubSpot se ve un campo "Propietario del negocio". ¿Debe ser asignable a cualquier vendedor (`user` con rol `seller`) o siempre será la misma persona/entidad "Cancagua Spa & Retreat Center"?

6.  **Datos Bancarios:** Indicaste quitar los comentarios con los datos bancarios del flujo de creación. ¿Significa que no deben aparecer en el PDF final, o simplemente que no deben ser editables en ese paso?

7.  **Flujo de Aprobación:** El flujo actual tiene estados como "approved", "paid", "invoiced". ¿Se mantiene este flujo post-envío? ¿Debería el cliente poder aprobar la cotización desde la URL pública que se genera?

## 5. Próximos Pasos

Por favor, revisa este plan y las preguntas. Una vez que tengamos claridad sobre estos puntos y me des tu aprobación, procederé con la implementación siguiendo las fases descritas.

**No se realizará ninguna modificación en el código hasta recibir tu confirmación.**
