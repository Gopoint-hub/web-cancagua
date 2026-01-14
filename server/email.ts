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
