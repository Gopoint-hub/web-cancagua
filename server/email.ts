import { Resend } from 'resend';

// Inicializar Resend con API key del entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuración del remitente
const FROM_EMAIL = process.env.FROM_EMAIL || 'Cancagua <noreply@cancagua.cl>';
const FROM_NAME = process.env.FROM_NAME || 'Cancagua Spa & Retreat';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}

interface SendBulkEmailOptions {
  emails: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }[];
  tags?: { name: string; value: string }[];
}

/**
 * Envía un email individual
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurada. Email no enviado.');
      return { success: false, error: 'API key no configurada' };
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      tags: options.tags,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error('Error enviando email:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
}

/**
 * Envía emails en lote (batch)
 * Resend permite hasta 100 emails por batch
 */
export async function sendBulkEmails(options: SendBulkEmailOptions): Promise<{ 
  success: boolean; 
  sent: number; 
  failed: number; 
  errors: string[] 
}> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurada. Emails no enviados.');
      return { success: false, sent: 0, failed: options.emails.length, errors: ['API key no configurada'] };
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Dividir en batches de 100 (límite de Resend)
    const batchSize = 100;
    const batches = [];
    for (let i = 0; i < options.emails.length; i += batchSize) {
      batches.push(options.emails.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      // Enviar batch usando la API de batch de Resend
      const batchEmails = batch.map(email => ({
        from: FROM_EMAIL,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        tags: options.tags,
      }));

      try {
        const { data, error } = await resend.batch.send(batchEmails);
        
        if (error) {
          results.failed += batch.length;
          results.errors.push(error.message);
        } else {
          results.sent += batch.length;
        }
      } catch (batchError: any) {
        results.failed += batch.length;
        results.errors.push(batchError.message || 'Error en batch');
      }

      // Pequeña pausa entre batches para evitar rate limiting
      if (batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return {
      success: results.failed === 0,
      sent: results.sent,
      failed: results.failed,
      errors: results.errors,
    };
  } catch (error: any) {
    console.error('Error enviando emails en batch:', error);
    return { 
      success: false, 
      sent: 0, 
      failed: options.emails.length, 
      errors: [error.message || 'Error desconocido'] 
    };
  }
}

/**
 * Envía un email de prueba
 */
export async function sendTestEmail(to: string, subject: string, html: string): Promise<{ success: boolean; error?: string }> {
  return sendEmail({
    to,
    subject: `[TEST] ${subject}`,
    html,
    tags: [{ name: 'type', value: 'test' }],
  });
}

/**
 * Genera el HTML base para un email de newsletter
 */
export function generateNewsletterWrapper(content: string, unsubscribeUrl?: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter de Cancagua</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background-color: #44580E;
      padding: 24px;
      text-align: center;
    }
    .email-header img {
      max-width: 180px;
      height: auto;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 16px 0 0 0;
      font-size: 24px;
    }
    .email-content {
      padding: 32px 24px;
    }
    .email-footer {
      background-color: #f5f5f5;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    .email-footer a {
      color: #44580E;
      text-decoration: none;
    }
    .unsubscribe {
      margin-top: 16px;
    }
    @media only screen and (max-width: 600px) {
      .email-content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Cancagua</h1>
    </div>
    <div class="email-content">
      ${content}
    </div>
    <div class="email-footer">
      <p>
        Cancagua Spa & Retreat Center<br>
        Puerto Varas, Chile
      </p>
      <p>
        <a href="https://cancagua.cl">Visitar sitio web</a> | 
        <a href="mailto:contacto@cancagua.cl">Contacto</a>
      </p>
      ${unsubscribeUrl ? `
      <p class="unsubscribe">
        <a href="${unsubscribeUrl}">Darse de baja de este newsletter</a>
      </p>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Configuración específica para cotizaciones B2B
 */
const QUOTE_FROM_EMAIL = 'Cancagua Eventos <cotizacion@cancagua.cl>';
const QUOTE_CC_EMAIL = 'eventos@cancagua.cl';

interface SendQuoteEmailOptions {
  to: string;
  clientName: string;
  quoteNumber: string;
  pdfBuffer: Buffer;
  customMessage?: string;
}

/**
 * Envía una cotización por email con PDF adjunto
 * Remitente: cotizacion@cancagua.cl
 * Copia: eventos@cancagua.cl
 */
export async function sendQuoteEmail(options: SendQuoteEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY no configurada. Email no enviado.');
      return { success: false, error: 'API key no configurada' };
    }

    const htmlContent = generateQuoteEmailHtml(options.clientName, options.quoteNumber, options.customMessage);
    const textContent = `Estimado/a ${options.clientName},\n\nAdjunto encontrará la cotización ${options.quoteNumber} de Cancagua Spa & Retreat Center.\n\n${options.customMessage || 'Quedamos atentos a sus consultas.'}\n\nSaludos cordiales,\nEquipo Cancagua Eventos\ncotizacion@cancagua.cl\n+56 9 1234 5678`;

    const { data, error } = await resend.emails.send({
      from: QUOTE_FROM_EMAIL,
      to: [options.to],
      cc: [QUOTE_CC_EMAIL],
      subject: `Cotización ${options.quoteNumber} - Cancagua Spa & Retreat`,
      html: htmlContent,
      text: textContent,
      replyTo: 'eventos@cancagua.cl',
      attachments: [
        {
          filename: `Cotizacion_${options.quoteNumber}.pdf`,
          content: options.pdfBuffer,
        },
      ],
      tags: [{ name: 'type', value: 'quote' }],
    });

    if (error) {
      console.error('Error enviando cotización:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error('Error enviando cotización:', error);
    return { success: false, error: error.message || 'Error desconocido' };
  }
}

/**
 * Genera el HTML para el email de cotización
 */
function generateQuoteEmailHtml(clientName: string, quoteNumber: string, customMessage?: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización ${quoteNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F1E7D9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #3a3a3a; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 28px; font-weight: 300; letter-spacing: 4px; color: #D3BC8D;">CANCAGUA</h1>
              <p style="margin: 8px 0 0 0; font-family: 'Georgia', serif; font-size: 12px; font-style: italic; color: #AAAAAA;">Spa & Retreat Center</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 24px; font-weight: 400; color: #3a3a3a;">Cotización ${quoteNumber}</h2>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Estimado/a <strong>${clientName}</strong>,</p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Es un placer hacerle llegar la cotización solicitada para su evento en Cancagua Spa & Retreat Center. Encontrará el documento adjunto en formato PDF.</p>
              
              ${customMessage ? `<p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">${customMessage}</p>` : ''}
              
              <div style="background-color: #F1E7D9; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #4a4a4a;">
                  <strong>Documento adjunto:</strong> Cotizacion_${quoteNumber}.pdf
                </p>
              </div>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Quedamos atentos a sus consultas y comentarios. Será un placer atenderle.</p>
              
              <p style="margin: 30px 0 0 0; font-size: 16px; color: #4a4a4a;">
                Saludos cordiales,<br>
                <strong style="color: #D3BC8D;">Equipo Cancagua Eventos</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #3a3a3a; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #AAAAAA;">Cancagua Spa & Retreat Center</p>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #AAAAAA;">Frutillar, Región de Los Lagos, Chile</p>
              <p style="margin: 0 0 20px 0; font-size: 14px;">
                <a href="mailto:eventos@cancagua.cl" style="color: #D3BC8D; text-decoration: none;">eventos@cancagua.cl</a> | 
                <a href="tel:+56912345678" style="color: #D3BC8D; text-decoration: none;">+56 9 1234 5678</a>
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="https://www.instagram.com/cancaguachile/" style="color: #AAAAAA; text-decoration: none; margin: 0 10px;">Instagram</a>
                <a href="https://www.facebook.com/Cancaguachile-100421855205587" style="color: #AAAAAA; text-decoration: none; margin: 0 10px;">Facebook</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Genera texto plano a partir de HTML
 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}
