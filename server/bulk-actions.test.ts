import { describe, it, expect, beforeAll } from "vitest";
import * as db from "../server/db";

describe("Bulk Actions - Contact Messages", () => {
  let testMessageIds: number[] = [];

  beforeAll(async () => {
    // Crear mensajes de prueba
    for (let i = 0; i < 3; i++) {
      await db.createContactMessage({
        name: `Test User ${i}`,
        email: `test${i}@example.com`,
        phone: `+56912345${i}`,
        subject: `Test Subject ${i}`,
        message: `Test message ${i}`,
        status: "new",
      });
    }

    // Obtener los IDs de los mensajes creados
    const allMessages = await db.getAllContactMessages();
    testMessageIds = allMessages
      .filter((m: any) => m.email.includes("@example.com"))
      .map((m: any) => m.id)
      .slice(0, 3);
  });

  it("should bulk delete contact messages", async () => {
    const idsToDelete = testMessageIds.slice(0, 2);
    await db.bulkDeleteContactMessages(idsToDelete);

    const remaining = await db.getAllContactMessages();
    const deletedMessages = remaining.filter((m: any) => idsToDelete.includes(m.id));
    
    expect(deletedMessages.length).toBe(0);
  });

  it("should bulk update contact messages status", async () => {
    const idsToUpdate = [testMessageIds[2]];
    await db.bulkUpdateContactMessagesStatus(idsToUpdate, "read");

    const messages = await db.getAllContactMessages();
    const updatedMessage = messages.find((m: any) => m.id === testMessageIds[2]);
    
    expect(updatedMessage?.status).toBe("read");
  });
});

describe("Bulk Actions - Bookings", () => {
  let testBookingIds: number[] = [];

  beforeAll(async () => {
    // Crear reservas de prueba
    for (let i = 0; i < 3; i++) {
      await db.createBooking({
        name: `Test Booking ${i}`,
        email: `booking${i}@example.com`,
        phone: `+56987654${i}`,
        serviceType: "Biopiscinas",
        preferredDate: new Date("2025-02-15"),
        numberOfPeople: 2 + i,
        message: `Test booking message ${i}`,
        status: "pending",
      });
    }

    // Obtener los IDs de las reservas creadas
    const allBookings = await db.getAllBookings();
    testBookingIds = allBookings
      .filter((b: any) => b.email.includes("booking") && b.email.includes("@example.com"))
      .map((b: any) => b.id)
      .slice(0, 3);
  });

  it("should bulk delete bookings", async () => {
    const idsToDelete = testBookingIds.slice(0, 2);
    await db.bulkDeleteBookings(idsToDelete);

    const remaining = await db.getAllBookings();
    const deletedBookings = remaining.filter((b: any) => idsToDelete.includes(b.id));
    
    expect(deletedBookings.length).toBe(0);
  });

  it("should bulk update bookings status", async () => {
    const idsToUpdate = [testBookingIds[2]];
    await db.bulkUpdateBookingsStatus(idsToUpdate, "confirmed");

    const bookings = await db.getAllBookings();
    const updatedBooking = bookings.find((b: any) => b.id === testBookingIds[2]);
    
    expect(updatedBooking?.status).toBe("confirmed");
  });
});

describe("Bulk Actions - Quotes", () => {
  let testQuoteIds: number[] = [];

  beforeAll(async () => {
    // Crear cotizaciones de prueba
    for (let i = 0; i < 3; i++) {
      await db.createQuote({
        quoteNumber: `TEST-BULK-${Date.now()}-${i}`,
        clientName: `Test Client ${i}`,
        clientEmail: `quote${i}@example.com`,
        clientCompany: `Test Company ${i}`,
        numberOfPeople: 10 + i,
        eventDate: new Date("2025-03-20"),
        subtotal: 100000 + (i * 10000),
        total: 119000 + (i * 11900),
        validUntil: new Date("2025-02-20"),
        status: "draft",
        createdBy: 1,
      });
    }

    // Obtener los IDs de las cotizaciones creadas
    const allQuotes = await db.getAllQuotes();
    testQuoteIds = allQuotes
      .filter((q: any) => q.quoteNumber?.includes("TEST-BULK"))
      .map((q: any) => q.id)
      .slice(0, 3);
  });

  it("should bulk delete quotes", async () => {
    const idsToDelete = testQuoteIds.slice(0, 1);
    await db.bulkDeleteQuotes(idsToDelete);

    const remaining = await db.getAllQuotes();
    const deletedQuotes = remaining.filter((q: any) => idsToDelete.includes(q.id));
    
    expect(deletedQuotes.length).toBe(0);
  });

  it("should bulk update quotes status", async () => {
    const idsToUpdate = testQuoteIds.slice(1, 3);
    await db.bulkUpdateQuotesStatus(idsToUpdate, "sent");

    const quotes = await db.getAllQuotes();
    const updatedQuotes = quotes.filter((q: any) => idsToUpdate.includes(q.id));
    
    updatedQuotes.forEach((quote: any) => {
      expect(quote.status).toBe("sent");
      expect(quote.sentAt).toBeTruthy();
    });
  });
});
