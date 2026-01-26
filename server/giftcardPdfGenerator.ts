import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

export interface GiftCardData {
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  backgroundImage: string;
  code: string;
}

// Función para descargar imagen desde URL
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    
    protocol.get(url, (response) => {
      // Manejar redirecciones
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      const chunks: Buffer[] = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    }).on("error", reject);
  });
}

export async function generateGiftCardPDF(data: GiftCardData): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: [600, 400], margin: 0 });
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      let backgroundApplied = false;

      // Intentar cargar imagen de fondo
      if (data.backgroundImage) {
        try {
          // Si es una URL de Cloudinary o externa
          if (data.backgroundImage.startsWith("http")) {
            console.log("Descargando imagen de fondo desde:", data.backgroundImage);
            const imageBuffer = await downloadImage(data.backgroundImage);
            doc.image(imageBuffer, 0, 0, { width: 600, height: 400, cover: [600, 400] });
            backgroundApplied = true;
          } else {
            // Si es una ruta local
            const backgroundPath = path.join(
              process.cwd(),
              "client/public",
              data.backgroundImage
            );
            
            if (fs.existsSync(backgroundPath)) {
              doc.image(backgroundPath, 0, 0, { width: 600, height: 400, cover: [600, 400] });
              backgroundApplied = true;
            }
          }
        } catch (imgError) {
          console.error("Error cargando imagen de fondo:", imgError);
        }
      }

      // Fallback: color sólido si no se pudo cargar la imagen
      if (!backgroundApplied) {
        doc.rect(0, 0, 600, 400).fillOpacity(1).fill("#2F5233");
      }

      // Overlay semi-transparente para mejorar legibilidad
      doc.rect(0, 0, 600, 400).fillOpacity(0.4).fill("#000000");

      // Logo Cancagua
      const logoPath = path.join(
        process.cwd(),
        "client/public/images/01_logo-cancagua.png"
      );
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 40, 40, { width: 120 });
      }

      // Texto "Gift Card"
      doc
        .fillOpacity(1)
        .fillColor("#FFFFFF")
        .fontSize(16)
        .font("Helvetica")
        .text("Gift Card", 40, 120);

      // Monto
      doc
        .fontSize(48)
        .font("Helvetica-Bold")
        .text(
          new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(data.amount),
          40,
          150
        );

      // Destinatario
      if (data.recipientName) {
        doc
          .fontSize(14)
          .font("Helvetica")
          .text(`Para: ${data.recipientName}`, 40, 220);
      }

      // Código
      doc
        .fontSize(12)
        .font("Helvetica")
        .text(`Código: ${data.code}`, 40, 250);

      // Mensaje personalizado
      if (data.message) {
        doc
          .fontSize(11)
          .font("Helvetica-Oblique")
          .fillColor("#F0F0F0")
          .text(`"${data.message}"`, 40, 290, {
            width: 520,
            align: "left",
          });
      }

      // Información adicional en la parte inferior
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#CCCCCC")
        .text("Válida por 1 año | Cancagua Spa & Retreat Center", 40, 360, {
          width: 520,
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
