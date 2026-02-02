# Propuesta de Ajuste de Flujo: Módulo Concierge con Pago en Skedu

**Autor:** Manus AI  
**Fecha:** 30 de enero de 2026  
**Versión:** 1.0

---

## 1. Resumen del Cambio

Tras la solicitud de que el proceso de pago para las ventas del Módulo Concierge se realice a través de **Skedu** en lugar de la integración directa con WebPay, se ha realizado un análisis de la viabilidad técnica y se propone un nuevo flujo de operación. Este cambio es significativo, ya que desplaza la responsabilidad del cobro a un sistema externo, pero es completamente factible gracias a las capacidades de la API de Skedu, específicamente mediante el uso de **Webhooks** y campos de metadatos.

El objetivo principal de esta propuesta es asegurar que, aunque el pago se realice en Skedu, podamos **rastrear de manera fiable cada venta hasta el vendedor que la originó** para automatizar el cálculo de comisiones.

---

## 2. Análisis de la Integración con Skedu

La revisión del código existente en `server/skedu.ts` y `server/skeduSync.ts` confirma los siguientes puntos clave:

-   **API Completa:** El proyecto ya interactúa con la API de Skedu para obtener servicios, crear reservas (`appointments`) y sincronizar datos.
-   **Soporte para Webhooks:** La integración incluye funciones para configurar (`configureSkeduWebhook`) y recibir notificaciones de eventos desde Skedu. El sistema ya está preparado para registrar estos eventos en la tabla `webhookLogs`.
-   **Paso de Metadatos:** Al crear una reserva en Skedu, la API permite enviar un campo `notes` o campos personalizados. Este es el mecanismo clave que usaremos para vincular la venta a nuestro sistema.

---

## 3. Nuevo Flujo de Operación Propuesto

Proponemos un flujo asíncrono basado en Webhooks que garantiza la atribución correcta de las ventas. A continuación se detalla el proceso paso a paso.

### Paso 1: Inicio de la Venta (En el Módulo Concierge)

1.  El vendedor, desde la interfaz del Concierge, selecciona el servicio y captura los datos del cliente (nombre, email).
2.  Al presionar "Generar Link de Pago", nuestro backend (tRPC) ejecuta la mutación `concierge.initiateSkeduSale`.
3.  **Acción Clave:** En lugar de crear una transacción de WebPay, esta mutación realiza dos acciones:
    a.  Crea un registro en nuestra tabla `conciergeSales` con el estado `pending_skedu_payment` y asocia el `sellerId`.
    b.  Genera un **enlace de pago único de Skedu** para ese servicio específico. Para ello, se puede usar la API de Skedu o construir una URL directa a la página de booking del servicio en Skedu.
4.  **Atribución de la Venta:** Al generar el enlace de pago de Skedu, le añadiremos parámetros UTM o un identificador único que incluya nuestro `saleId` (el ID del registro creado en `conciergeSales`). Por ejemplo:
    `https://booking.skedu.com/cancagua/servicio-xyz?ref=CONCIERGE-SALE-123`
5.  El Módulo Concierge muestra este enlace de pago (o un código QR) para que el cliente finalice la compra en la plataforma de Skedu desde su propio dispositivo o en la tablet del vendedor.

### Paso 2: Notificación de Pago (Webhook desde Skedu)

1.  Una vez que el cliente completa el pago en Skedu, Skedu enviará automáticamente una notificación (un **Webhook**) a un endpoint específico de nuestro backend. Necesitaremos configurar en Skedu que nos notifique del evento `payment.created` o `appointment.paid`.
2.  Nuestro endpoint (`/api/webhooks/skedu`) recibirá esta notificación, que contendrá toda la información de la reserva, incluyendo el monto pagado y, fundamentalmente, los **metadatos o notas** que enviamos en el paso anterior (ej. `ref=CONCIERGE-SALE-123`).

### Paso 3: Confirmación y Cálculo de Comisión (En nuestro Backend)

1.  Al recibir el Webhook, nuestro sistema parsea el `ref` para extraer el `saleId` (en el ejemplo, `123`).
2.  Busca el registro correspondiente en la tabla `conciergeSales`.
3.  **Validación:** Confirma que el monto pagado en Skedu coincide con el precio del servicio en nuestro sistema.
4.  **Actualización:** Si todo es correcto, actualiza el registro de la venta:
    -   Cambia el estado a `completed`.
    -   Guarda el ID de la transacción de Skedu como referencia.
    -   Calcula y guarda el `commissionAmount` (monto de la venta * tasa de comisión del vendedor).

Este flujo garantiza que solo las ventas pagadas y confirmadas a través de Skedu se marquen como completadas y generen una comisión.

---

## 4. Ajustes Necesarios en el Plan

Para implementar este nuevo flujo, se requieren los siguientes ajustes al plan anterior:

### 4.1. Backend (API y Lógica)

-   **Modificar `concierge.initiateSale`:** Cambiar la lógica para que genere un enlace de pago de Skedu con un `ref` único en lugar de una transacción de WebPay.
-   **Crear Endpoint de Webhook:** Implementar un nuevo endpoint público (`/api/webhooks/skedu`) que escuche las notificaciones de Skedu, valide los datos y actualice la base de datos.
-   **Configurar Webhook en Skedu:** Usar la función `configureSkeduWebhook` para registrar nuestro nuevo endpoint en la plataforma de Skedu para los eventos de pago.
-   **Modificar Tabla `conciergeSales`:** Añadir un campo `skeduTransactionId` para guardar la referencia del pago en Skedu y ajustar el `paymentStatus` para incluir el estado `pending_skedu_payment`.

### 4.2. Frontend (Módulo Concierge)

-   La interfaz de venta ya no redirigirá a WebPay. En su lugar, mostrará el **enlace de pago de Skedu** o un **código QR** para que el cliente pueda escanearlo y pagar desde su propio teléfono. Esto mejora la experiencia y seguridad.
-   Se añadirá un estado visual en el historial de ventas del vendedor para indicar "Esperando pago en Skedu".

### 4.3. Cronograma

El cambio de flujo no altera significativamente el tiempo total de desarrollo, pero sí redistribuye el esfuerzo. La complejidad se traslada de la gestión de WebPay a la correcta implementación y securización del endpoint de Webhooks.

| Fase | Descripción Ajustada | Duración |
|:-----|:---------------------|:---------|
| **Fase 1** | Modelo de Datos y API (`initiateSale`) | 2-3 días |
| **Fase 2** | Desarrollo y securización del Endpoint de Webhooks | 3-4 días |
| **Fase 3** | Interfaz de Venta (con generación de link/QR) | 3-4 días |
| **Fase 4** | Módulos de Admin (Servicios y Vendedores) | 3-4 días |
| **Fase 5** | Pruebas de flujo completo (end-to-end) y correcciones | 2-3 días |
| **Total** | | **13-18 días** |

---

## 5. Conclusión y Próximos Pasos

Este nuevo enfoque es robusto y se integra de manera más nativa con el ecosistema de Skedu. Permite un seguimiento fiable de las comisiones y ofrece una experiencia de pago más flexible para el cliente final.

Una vez que apruebes esta propuesta, procederé a actualizar el plan de implementación detallado y comenzaremos con el desarrollo, empezando por la configuración del Webhook y la modificación de la lógica de inicio de venta.
