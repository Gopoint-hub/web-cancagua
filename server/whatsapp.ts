/**
 * Utilidades para notificaciones de WhatsApp
 * 
 * Nota: Sin una API de WhatsApp Business configurada, usamos el método de enlace directo
 * que abre WhatsApp con un mensaje pre-llenado. Para notificaciones automáticas al negocio,
 * se puede integrar con servicios como Twilio, MessageBird, o la API oficial de WhatsApp Business.
 */

// Número de WhatsApp de Cancagua (formato internacional sin +)
const CANCAGUA_WHATSAPP = "56940073999";
const CANCAGUA_WHATSAPP_FORMATTED = "+56 9 4007 3999";

/**
 * Genera un enlace de WhatsApp con mensaje pre-llenado
 */
export function generateWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CANCAGUA_WHATSAPP}?text=${encodedMessage}`;
}

/**
 * Genera un mensaje formateado para notificación de formulario de contacto
 */
export function formatContactFormMessage(data: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  origen?: string;
}): string {
  const fecha = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
  
  return `🔔 *Nuevo mensaje de contacto*

📅 Fecha: ${fecha}
📍 Origen: ${data.origen || "Sitio web"}

👤 *Datos del contacto:*
• Nombre: ${data.nombre}
• Email: ${data.email}
• Teléfono: ${data.telefono}

💬 *Mensaje:*
${data.mensaje}

---
_Mensaje enviado desde cancagua.cl_`;
}

/**
 * Genera un mensaje formateado para notificación de cotización
 */
export function formatQuoteNotificationMessage(data: {
  quoteNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  total: number;
  numberOfPeople: number;
}): string {
  const fecha = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
  const totalFormatted = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(data.total);
  
  return `📋 *Nueva cotización enviada*

📅 Fecha: ${fecha}
🔢 Número: ${data.quoteNumber}

👤 *Cliente:*
• Nombre: ${data.clientName}
• Email: ${data.clientEmail}
${data.clientPhone ? `• Teléfono: ${data.clientPhone}` : ""}

👥 Personas: ${data.numberOfPeople}
💰 Total: ${totalFormatted}

---
_Notificación automática de cancagua.cl_`;
}

/**
 * Genera un mensaje formateado para notificación de gift card
 */
export function formatGiftCardNotificationMessage(data: {
  code: string;
  amount: number;
  senderName?: string;
  recipientName?: string;
}): string {
  const fecha = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
  const amountFormatted = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(data.amount);
  
  return `🎁 *Nueva Gift Card comprada*

📅 Fecha: ${fecha}
🔢 Código: ${data.code}
💰 Monto: ${amountFormatted}

${data.senderName ? `👤 De: ${data.senderName}` : ""}
${data.recipientName ? `🎯 Para: ${data.recipientName}` : ""}

---
_Notificación automática de cancagua.cl_`;
}

/**
 * Genera un mensaje para compartir gift card por WhatsApp
 */
export function formatGiftCardShareMessage(data: {
  code: string;
  amount: number;
  recipientName?: string;
  senderName?: string;
  pdfUrl?: string;
}): string {
  const amountFormatted = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(data.amount);
  
  let message = `🎁 *¡Te han enviado una Gift Card de Cancagua!*\n\n`;
  
  if (data.senderName) {
    message += `De: ${data.senderName}\n`;
  }
  if (data.recipientName) {
    message += `Para: ${data.recipientName}\n`;
  }
  
  message += `\n💵 Monto: ${amountFormatted}\n`;
  message += `🎫 Código: ${data.code}\n\n`;
  
  if (data.pdfUrl) {
    message += `📎 Descarga tu gift card: ${data.pdfUrl}\n\n`;
  }
  
  message += `Puedes usar esta gift card en cualquier servicio de Cancagua Spa & Retreat Center.\n\n`;
  message += `🌍 Reserva en: https://cancagua.cl`;
  
  return message;
}

/**
 * Información del WhatsApp de Cancagua
 */
export const WHATSAPP_INFO = {
  number: CANCAGUA_WHATSAPP,
  formatted: CANCAGUA_WHATSAPP_FORMATTED,
  link: `https://wa.me/${CANCAGUA_WHATSAPP}`,
};
