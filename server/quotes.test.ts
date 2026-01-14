import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-admin",
    name: "Admin Test",
    email: "admin@test.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    loginMethod: "manus",
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Corporate Products", () => {
  it("should create a corporate product", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.corporateProducts.create({
      name: "Biopiscina 4 horas",
      description: "Acceso a biopiscinas geotermales por 4 horas",
      category: "biopiscina",
      priceType: "per_person",
      unitPrice: 34000,
      duration: 240,
      includes: "Bata\nGorro de nado\nBolsa de Pilwa",
      active: 1,
    });

    expect(result.success).toBe(true);
  });

  it("should list all corporate products", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const products = await caller.corporateProducts.getAll();
    expect(Array.isArray(products)).toBe(true);
  });

  it("should list only active products", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const products = await caller.corporateProducts.getActive();
    expect(Array.isArray(products)).toBe(true);
    // All returned products should be active
    products.forEach((p: any) => {
      expect(p.active).toBe(1);
    });
  });
});

describe("Corporate Clients", () => {
  it("should create a corporate client", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.corporateClients.create({
      companyName: "Empresa Test S.A.",
      contactName: "Juan Pérez",
      contactPosition: "Gerente de RRHH",
      contactEmail: "juan.perez@test.com",
      contactPhone: "+56912345678",
      contactWhatsapp: "+56912345678",
      rut: "12.345.678-9",
      giro: "Servicios de consultoría",
      address: "Av. Principal 123",
      city: "Frutillar",
      country: "Chile",
    });

    expect(result.success).toBe(true);
  });

  it("should list all corporate clients", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const clients = await caller.corporateClients.getAll();
    expect(Array.isArray(clients)).toBe(true);
  });

  it("should find client by email", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    // First create a client
    await caller.corporateClients.create({
      companyName: "Test Company",
      contactName: "Test Contact",
      contactEmail: "unique@test.com",
    });

    // Then search for it
    const client = await caller.corporateClients.getByEmail({
      email: "unique@test.com",
    });

    expect(client).toBeDefined();
    if (client) {
      expect(client.contactEmail).toBe("unique@test.com");
    }
  });
});

describe("Quotes", () => {
  it("should create a quote with items", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.create({
      clientName: "Empresa Test",
      clientEmail: "test@empresa.com",
      numberOfPeople: 20,
      eventDate: "2026-02-15",
      itinerary: "10:00 - Biopiscinas\n14:00 - Almuerzo",
      subtotal: 680000,
      total: 680000,
      validUntil: "2026-01-25",
      status: "draft",
      items: [
        {
          productName: "Biopiscina 4 horas",
          description: "Acceso a biopiscinas geotermales",
          quantity: 1,
          unitPrice: 34000,
          total: 680000,
          sortOrder: 0,
        },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.quoteId).toBeDefined();
  });

  it("should list all quotes", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const quotes = await caller.quotes.getAll();
    expect(Array.isArray(quotes)).toBe(true);
  });

  it("should get quote items", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a quote first
    const createResult = await caller.quotes.create({
      clientName: "Test Client",
      clientEmail: "test@client.com",
      numberOfPeople: 10,
      subtotal: 340000,
      total: 340000,
      validUntil: "2026-01-25",
      status: "draft",
      items: [
        {
          productName: "Test Product",
          quantity: 1,
          unitPrice: 34000,
          total: 340000,
          sortOrder: 0,
        },
      ],
    });

    expect(createResult.quoteId).toBeDefined();

    // Get items
    const items = await caller.quotes.getItems({
      quoteId: createResult.quoteId!,
    });

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it("should update quote status", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a quote
    const createResult = await caller.quotes.create({
      clientName: "Status Test",
      clientEmail: "status@test.com",
      numberOfPeople: 5,
      subtotal: 170000,
      total: 170000,
      validUntil: "2026-01-25",
      status: "draft",
      items: [
        {
          productName: "Test",
          quantity: 1,
          unitPrice: 34000,
          total: 170000,
          sortOrder: 0,
        },
      ],
    });

    // Update status
    const updated = await caller.quotes.updateStatus({
      id: createResult.quoteId!,
      status: "sent",
    });

    expect(updated).toBeDefined();
    if (updated) {
      expect(updated.status).toBe("sent");
      expect(updated.sentAt).toBeDefined();
    }
  });

  it.skip("should generate sequential quote numbers starting from COT-1000", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create first quote
    const result1 = await caller.quotes.create({
      clientName: "Client 1",
      clientEmail: "client1@test.com",
      numberOfPeople: 10,
      subtotal: 100000,
      total: 100000,
      validUntil: "2026-01-25",
      status: "draft",
      items: [
        {
          productName: "Product 1",
          quantity: 1,
          unitPrice: 10000,
          total: 100000,
          sortOrder: 0,
        },
      ],
    });

    const quote1 = await caller.quotes.getById({ id: result1.quoteId! });
    expect(quote1?.quoteNumber).toMatch(/COT-\d+/);

    // Create second quote
    const result2 = await caller.quotes.create({
      clientName: "Client 2",
      clientEmail: "client2@test.com",
      numberOfPeople: 10,
      subtotal: 100000,
      total: 100000,
      validUntil: "2026-01-25",
      status: "draft",
      items: [
        {
          productName: "Product 2",
          quantity: 1,
          unitPrice: 10000,
          total: 100000,
          sortOrder: 0,
        },
      ],
    });

    const quote2 = await caller.quotes.getById({ id: result2.quoteId! });
    expect(quote2?.quoteNumber).toMatch(/COT-\d+/);

    // Verify sequential numbering
    if (quote1 && quote2) {
      const num1 = parseInt(quote1.quoteNumber.split("-")[1]);
      const num2 = parseInt(quote2.quoteNumber.split("-")[1]);
      expect(num2).toBeGreaterThan(num1);
    }
  });
});
