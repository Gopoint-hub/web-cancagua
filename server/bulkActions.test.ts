import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Bulk Actions for Corporate Products", () => {
  const createCaller = () => appRouter.createCaller({
    req: {} as any,
    res: {} as any,
    user: {
      openId: "test-admin",
      name: "Test Admin",
      email: "admin@test.com",
      role: "admin",
    },
  });

  it("should bulk delete multiple products", async () => {
    const caller = createCaller();

    // Create test products
    const product1 = await caller.corporateProducts.create({
      name: "Bulk Delete Test 1",
      description: "Test product for bulk delete",
      category: "biopiscina",
      priceType: "per_person",
      unitPrice: 10000,
      duration: 60,
      maxCapacity: 10,
      includes: "Test includes",
      active: 1,
    });

    const product2 = await caller.corporateProducts.create({
      name: "Bulk Delete Test 2",
      description: "Another test product",
      category: "masaje",
      priceType: "flat",
      unitPrice: 20000,
      duration: 45,
      maxCapacity: 5,
      includes: "Test includes",
      active: 1,
    });

    expect(product1.success).toBe(true);
    expect(product2.success).toBe(true);

    // Bulk delete
    const result = await caller.corporateProducts.bulkDelete({
      ids: [product1.id!, product2.id!],
    });

    expect(result.success).toBe(true);
    expect(result.deleted).toBe(2);

    // Verify products were deleted
    const allProducts = await caller.corporateProducts.getAll();
    const deletedIds = [product1.id, product2.id];
    const remainingIds = allProducts.map(p => p.id);
    
    expect(remainingIds).not.toContain(deletedIds[0]);
    expect(remainingIds).not.toContain(deletedIds[1]);
  });

  it("should bulk duplicate products", async () => {
    const caller = createCaller();

    // Create test product
    const product = await caller.corporateProducts.create({
      name: "Bulk Duplicate Test",
      description: "Test product for duplication",
      category: "taller",
      priceType: "per_person",
      unitPrice: 15000,
      duration: 90,
      maxCapacity: 15,
      includes: "Materials included",
      active: 1,
    });

    expect(product.success).toBe(true);
    expect(product.id).toBeDefined();

    // Bulk duplicate
    const result = await caller.corporateProducts.bulkDuplicate({
      ids: [product.id!],
    });

    expect(result.success).toBe(true);
    expect(result.duplicated).toBe(1);

    // Verify duplicate was created
    const allProducts = await caller.corporateProducts.getAll();
    const duplicates = allProducts.filter(p => 
      p.name.includes("Bulk Duplicate Test") && p.name.includes("(Copia)")
    );
    
    expect(duplicates.length).toBeGreaterThan(0);
    expect(duplicates[0].unitPrice).toBe(15000);
    expect(duplicates[0].category).toBe("taller");
  });

  it("should import products from CSV data", async () => {
    const caller = createCaller();

    const csvProducts = [
      {
        name: "CSV Import Test 1",
        description: "Imported from CSV",
        category: "masaje",
        priceType: "per_person" as const,
        unitPrice: 15000,
        duration: 45,
        maxCapacity: 5,
        includes: "Aceites esenciales",
        active: 1,
      },
      {
        name: "CSV Import Test 2",
        description: "Another import",
        category: "taller",
        priceType: "flat" as const,
        unitPrice: 50000,
        duration: 120,
        maxCapacity: 20,
        includes: "Materiales incluidos",
        active: 1,
      },
    ];

    const result = await caller.corporateProducts.importFromCSV({
      products: csvProducts,
    });

    expect(result.success).toBe(true);
    expect(result.imported).toBe(2);

    // Verify products were imported
    const allProducts = await caller.corporateProducts.getAll();
    const importedProducts = allProducts.filter(p => 
      p.name === "CSV Import Test 1" || p.name === "CSV Import Test 2"
    );
    
    expect(importedProducts.length).toBeGreaterThanOrEqual(2);
    
    // Verify first imported product details
    const product1 = importedProducts.find(p => p.name === "CSV Import Test 1");
    expect(product1).toBeDefined();
    expect(product1?.category).toBe("masaje");
    expect(product1?.unitPrice).toBe(15000);
    expect(product1?.priceType).toBe("per_person");
  });

  it("should reject bulk actions for non-admin users", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: {
        openId: "test-user",
        name: "Test User",
        email: "user@test.com",
        role: "user",
      },
    });

    await expect(
      caller.corporateProducts.bulkDelete({ ids: [1, 2] })
    ).rejects.toThrow("FORBIDDEN");

    await expect(
      caller.corporateProducts.bulkDuplicate({ ids: [1] })
    ).rejects.toThrow("FORBIDDEN");

    await expect(
      caller.corporateProducts.importFromCSV({ products: [] })
    ).rejects.toThrow("FORBIDDEN");
  });
});
