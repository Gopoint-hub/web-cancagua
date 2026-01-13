import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

// Mock context for testing
const mockContext = {
  user: {
    id: 1,
    openId: "test-open-id",
    name: "Test Admin",
    email: "admin@test.com",
    avatarUrl: null,
    role: "admin" as const,
    createdAt: new Date(),
  },
};

const caller = appRouter.createCaller(mockContext as any);

describe("Bookings and Contact System", () => {
  describe("Bookings", () => {
    it("should create a booking successfully", async () => {
      const result = await caller.bookings.create({
        name: "Test Booking User",
        email: "booking@test.com",
        phone: "+56912345678",
        serviceType: "Biopiscinas Geotermales",
        preferredDate: "2026-02-15T14:00",
        numberOfPeople: 2,
        message: "Test booking message",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should list bookings", async () => {
      const list = await caller.bookings.list();
      expect(Array.isArray(list)).toBe(true);
    });

    it("should update booking status", async () => {
      // First get a booking from the list
      const list = await caller.bookings.list();
      if (list.length > 0) {
        const booking = list[0];
        const updated = await caller.bookings.updateStatus({
          id: booking.id,
          status: "confirmed",
        });
        expect(updated).toBeDefined();
        expect(updated.status).toBe("confirmed");
      }
    });

    it("should delete a booking", async () => {
      // First get a booking from the list
      const list = await caller.bookings.list();
      if (list.length > 0) {
        const booking = list[0];
        const result = await caller.bookings.delete({
          id: booking.id,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Contact Messages", () => {
    it("should send a contact message successfully", async () => {
      const result = await caller.contact.send({
        name: "Test Contact User",
        email: "contact@test.com",
        phone: "+56987654321",
        subject: "Test Subject",
        message: "This is a test contact message with enough characters",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should list contact messages", async () => {
      const list = await caller.contact.list();
      expect(Array.isArray(list)).toBe(true);
    });

    it("should update contact message status", async () => {
      // First get a message from the list
      const list = await caller.contact.list();
      if (list.length > 0) {
        const message = list[0];
        const updated = await caller.contact.updateStatus({
          id: message.id,
          status: "read",
        });
        expect(updated).toBeDefined();
        expect(updated.status).toBe("read");
      }
    });

    it("should delete a contact message", async () => {
      // First get a message from the list
      const list = await caller.contact.list();
      if (list.length > 0) {
        const message = list[0];
        const result = await caller.contact.delete({
          id: message.id,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Menu Items", () => {
    it("should list menu categories and items", async () => {
      const categories = await caller.menuAdmin.getAllCategories();
      expect(Array.isArray(categories)).toBe(true);

      const items = await caller.menuAdmin.getAllItems();
      expect(Array.isArray(items)).toBe(true);
    });
  });
});
