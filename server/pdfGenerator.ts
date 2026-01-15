import PDFDocument from "pdfkit";
import { Readable } from "stream";

interface QuoteItem {
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuoteData {
  quoteNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientPosition?: string;
  clientPhone?: string;
  clientRut?: string;
  clientAddress?: string;
  clientGiro?: string;
  numberOfPeople: number;
  eventDescription?: string;
  itinerary?: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  validUntil?: string;
}

export async function generateQuotePDF(data: QuoteData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header - Logo y título
      doc
        .fontSize(24)
        .fillColor("#4A5D23")
        .text("CANCAGUA", 50, 50)
        .fontSize(10)
        .fillColor("#666666")
        .text("Spa & Retreat Center", 50, 78)
        .text("Frutillar, Chile", 50, 92);

      // Número de cotización y fecha
      doc
        .fontSize(14)
        .fillColor("#4A5D23")
        .text("COTIZACIÓN", 350, 50, { align: "right" })
        .fontSize(12)
        .fillColor("#666666")
        .text(data.quoteNumber, 350, 68, { align: "right" })
        .fontSize(10)
        .text(`Fecha: ${data.date}`, 350, 85, { align: "right" });

      if (data.validUntil) {
        doc.text(`Válida hasta: ${data.validUntil}`, 350, 100, {
          align: "right",
        });
      }

      // Línea separadora
      doc
        .moveTo(50, 120)
        .lineTo(545, 120)
        .strokeColor("#4A5D23")
        .lineWidth(2)
        .stroke();

      // Información del cliente
      let yPos = 140;
      doc
        .fontSize(12)
        .fillColor("#4A5D23")
        .text("DATOS DEL CLIENTE", 50, yPos);

      yPos += 20;
      doc.fontSize(10).fillColor("#333333");

      if (data.clientCompany) {
        doc.text(`Empresa: ${data.clientCompany}`, 50, yPos);
        yPos += 15;
      }

      if (data.clientRut) {
        doc.text(`RUT: ${data.clientRut}`, 50, yPos);
        yPos += 15;
      }

      if (data.clientGiro) {
        doc.text(`Giro: ${data.clientGiro}`, 50, yPos);
        yPos += 15;
      }

      doc.text(`Contacto: ${data.clientName}`, 50, yPos);
      yPos += 15;

      if (data.clientPosition) {
        doc.text(`Cargo: ${data.clientPosition}`, 50, yPos);
        yPos += 15;
      }

      doc.text(`Email: ${data.clientEmail}`, 50, yPos);
      yPos += 15;

      if (data.clientPhone) {
        doc.text(`Teléfono: ${data.clientPhone}`, 50, yPos);
        yPos += 15;
      }

      if (data.clientAddress) {
        doc.text(`Dirección: ${data.clientAddress}`, 50, yPos);
        yPos += 15;
      }

      doc.text(`Número de personas: ${data.numberOfPeople}`, 50, yPos);
      yPos += 25;

      // Descripción de la jornada
      if (data.eventDescription) {
        doc.fontSize(12).fillColor("#4A5D23").text("DESCRIPCIÓN", 50, yPos);
        yPos += 20;
        doc
          .fontSize(10)
          .fillColor("#333333")
          .text(data.eventDescription, 50, yPos, { width: 495 });
        yPos += doc.heightOfString(data.eventDescription, { width: 495 }) + 20;
      }

      // Itinerario
      if (data.itinerary) {
        doc.fontSize(12).fillColor("#4A5D23").text("ITINERARIO", 50, yPos);
        yPos += 20;
        doc
          .fontSize(10)
          .fillColor("#333333")
          .text(data.itinerary, 50, yPos, { width: 495 });
        yPos += doc.heightOfString(data.itinerary, { width: 495 }) + 25;
      }

      // Verificar si necesitamos nueva página
      if (yPos > 650) {
        doc.addPage();
        yPos = 50;
      }

      // Tabla de productos/servicios
      doc.fontSize(12).fillColor("#4A5D23").text("DETALLE DE SERVICIOS", 50, yPos);
      yPos += 20;

      // Encabezado de tabla
      doc
        .fontSize(9)
        .fillColor("#FFFFFF")
        .rect(50, yPos, 495, 20)
        .fillAndStroke("#4A5D23", "#4A5D23");

      doc.text("Servicio", 55, yPos + 5, { width: 200 });
      doc.text("Cantidad", 260, yPos + 5, { width: 60, align: "center" });
      doc.text("Precio Unit.", 325, yPos + 5, { width: 80, align: "right" });
      doc.text("Total", 410, yPos + 5, { width: 130, align: "right" });

      yPos += 25;

      // Items
      doc.fontSize(9).fillColor("#333333");
      data.items.forEach((item, index) => {
        // Verificar si necesitamos nueva página
        if (yPos > 700) {
          doc.addPage();
          yPos = 50;
        }

        // Fondo alternado
        if (index % 2 === 0) {
          doc.rect(50, yPos - 2, 495, 30).fillAndStroke("#F5F5F5", "#F5F5F5");
        }

        doc.fillColor("#333333");
        doc.text(item.productName, 55, yPos, { width: 200 });
        
        if (item.description) {
          doc
            .fontSize(8)
            .fillColor("#666666")
            .text(item.description, 55, yPos + 12, { width: 200 });
        }

        doc
          .fontSize(9)
          .fillColor("#333333")
          .text(item.quantity.toString(), 260, yPos, {
            width: 60,
            align: "center",
          });

        doc.text(`$${item.unitPrice.toLocaleString("es-CL")}`, 325, yPos, {
          width: 80,
          align: "right",
        });

        doc.text(`$${item.total.toLocaleString("es-CL")}`, 410, yPos, {
          width: 130,
          align: "right",
        });

        yPos += 35;
      });

      // Línea separadora
      yPos += 5;
      doc
        .moveTo(50, yPos)
        .lineTo(545, yPos)
        .strokeColor("#CCCCCC")
        .lineWidth(1)
        .stroke();

      yPos += 15;

      // Totales
      doc.fontSize(10).fillColor("#333333");

      doc.text("Subtotal:", 380, yPos, { width: 100, align: "right" });
      doc.text(`$${data.subtotal.toLocaleString("es-CL")}`, 485, yPos, {
        width: 60,
        align: "right",
      });

      yPos += 20;
      doc.text("IVA (19%):", 380, yPos, { width: 100, align: "right" });
      doc.text(`$${data.tax.toLocaleString("es-CL")}`, 485, yPos, {
        width: 60,
        align: "right",
      });

      yPos += 25;
      doc
        .fontSize(12)
        .fillColor("#4A5D23")
        .text("TOTAL:", 380, yPos, { width: 100, align: "right" });
      doc.text(`$${data.total.toLocaleString("es-CL")}`, 485, yPos, {
        width: 60,
        align: "right",
      });

      // Términos y condiciones
      yPos += 40;
      if (yPos > 650) {
        doc.addPage();
        yPos = 50;
      }

      doc
        .fontSize(10)
        .fillColor("#4A5D23")
        .text("TÉRMINOS Y CONDICIONES", 50, yPos);

      yPos += 20;
      doc
        .fontSize(8)
        .fillColor("#666666")
        .text(
          "• Esta cotización tiene una validez de 15 días desde la fecha de emisión.",
          50,
          yPos,
          { width: 495 }
        );

      yPos += 15;
      doc.text(
        "• Los precios incluyen IVA y están sujetos a disponibilidad.",
        50,
        yPos,
        { width: 495 }
      );

      yPos += 15;
      doc.text(
        "• Se requiere confirmación con al menos 48 horas de anticipación.",
        50,
        yPos,
        { width: 495 }
      );

      yPos += 15;
      doc.text(
        "• Políticas de cancelación: 100% de reembolso con 7 días de anticipación, 50% con 3 días, sin reembolso con menos de 48 horas.",
        50,
        yPos,
        { width: 495 }
      );

      // Footer
      const footerY = 750;
      doc
        .fontSize(8)
        .fillColor("#999999")
        .text(
          "Cancagua Spa & Retreat Center | Frutillar, Chile",
          50,
          footerY,
          { align: "center", width: 495 }
        );

      doc.text("contacto@cancagua.cl | +56 9 XXXX XXXX", 50, footerY + 12, {
        align: "center",
        width: 495,
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
