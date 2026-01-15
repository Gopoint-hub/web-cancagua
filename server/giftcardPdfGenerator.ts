import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export interface GiftCardData {
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  backgroundImage: string;
  code: string;
}

export async function generateGiftCardPDF(data: GiftCardData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: [600, 400], margin: 0 });
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Fondo con imagen
      const backgroundPath = path.join(
        process.cwd(),
        "client/public",
        data.backgroundImage
      );

      if (fs.existsSync(backgroundPath)) {
        doc.image(backgroundPath, 0, 0, { width: 600, height: 400 });
      } else {
        // Fallback: color sólido
        doc.rect(0, 0, 600, 400).fillOpacity(1).fill("#2F5233");
      }

      // Overlay semi-transparente para mejorar legibilidad
      doc.rect(0, 0, 600, 400).fillOpacity(0.3).fill("#000000");

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
