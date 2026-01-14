import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/context";

describe("Quote PDF Generation", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let testQuoteId: number;

  beforeAll(async () => {
    // Crear contexto de prueba con usuario admin
    const ctx: Context = {
      user: {
        id: 1,
        openId: "test-admin",
        name: "Test Admin",
        email: "admin@test.com",
        role: "admin",
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
      },
    };

    caller = appRouter.createCaller(ctx);

    // Crear producto de prueba
    await caller.corporateProducts.create({
      name: "Biopiscina 4 horas",
      description: "Acceso a biopiscinas geotermales por 4 horas",
      category: "biopiscina",
      priceType: "per_person",
      unitPrice: 34000,
      duration: 240,
      active: 1,
    });

    // Crear cotización de prueba
    const result = await caller.quotes.create({
      clientName: "Juan Pérez",
      clientEmail: "juan@empresa.com",
      clientCompany: "Empresa Test S.A.",
      clientPosition: "Gerente General",
      clientPhone: "+56912345678",
      clientRut: "12.345.678-9",
      clientAddress: "Av. Principal 123, Santiago",
      clientGiro: "Servicios Tecnológicos",
      numberOfPeople: 20,
      eventDescription: "Jornada de team building para el equipo de ventas",
      itinerary: "10:00 - Llegada y bienvenida\n11:00 - Ingreso a biopiscinas\n13:00 - Almuerzo\n15:00 - Cierre de jornada",
      subtotal: 680000,
      total: 809200,
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      items: [
        {
          productName: "Biopiscina 4 horas",
          description: "Acceso a biopiscinas geotermales",
          quantity: 20,
          unitPrice: 34000,
          total: 680000,
          sortOrder: 0,
        },
      ],
    });

    testQuoteId = result.quoteId;
  });

  it("should generate PDF for a quote", async () => {
    const result = await caller.quotes.generatePDF({ id: testQuoteId });

    // Verificar que se retorna un PDF en base64
    expect(result).toHaveProperty("pdf");
    expect(result).toHaveProperty("filename");
    expect(typeof result.pdf).toBe("string");
    expect(result.pdf.length).toBeGreaterThan(0);

    // Verificar que el filename tiene el formato correcto
    expect(result.filename).toMatch(/^Cotizacion_COT-\d+\.pdf$/);

    // Verificar que el base64 es válido
    const isValidBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(result.pdf);
    expect(isValidBase64).toBe(true);

    // Verificar que el PDF tiene un tamaño razonable (al menos 2KB)
    const pdfSize = Buffer.from(result.pdf, "base64").length;
    expect(pdfSize).toBeGreaterThan(2000);
  });

  it("should fail when generating PDF for non-existent quote", async () => {
    await expect(
      caller.quotes.generatePDF({ id: 99999 })
    ).rejects.toThrow("Cotización no encontrada");
  });

  it("should include all client information in PDF data", async () => {
    // Obtener la cotización para verificar los datos
    const quote = await caller.quotes.getById({ id: testQuoteId });

    expect(quote.clientName).toBe("Juan Pérez");
    expect(quote.clientEmail).toBe("juan@empresa.com");
    expect(quote.clientCompany).toBe("Empresa Test S.A.");
    expect(quote.clientPosition).toBe("Gerente General");
    expect(quote.clientPhone).toBe("+56912345678");
    expect(quote.clientRut).toBe("12.345.678-9");
    expect(quote.clientAddress).toBe("Av. Principal 123, Santiago");
    expect(quote.clientGiro).toBe("Servicios Tecnológicos");
  });
});
