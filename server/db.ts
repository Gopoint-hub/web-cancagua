import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    // Lista de emails autorizados como administradores
    const authorizedAdminEmails = [
      'eventos@cancagua.cl',
      'sebastian.jara.b@gmail.com',
    ];

    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId || (user.email && authorizedAdminEmails.includes(user.email))) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Gestión de usuarios
export async function getAllUsers() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get users: database not available");
    return [];
  }

  const result = await db.select().from(users);
  return result;
}

export async function updateUserRole(userId: number, role: "user" | "editor" | "admin") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user role: database not available");
    return false;
  }

  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update user role:", error);
    return false;
  }
}

export async function deleteUser(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete user: database not available");
    return false;
  }

  try {
    await db.delete(users).where(eq(users.id, userId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete user:", error);
    return false;
  }
}

// Servicios
export async function getAllServices() {
  const db = await getDb();
  if (!db) return [];
  const { services } = await import("../drizzle/schema");
  return await db.select().from(services).where(eq(services.active, 1));
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { services } = await import("../drizzle/schema");
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertService(service: any) {
  const db = await getDb();
  if (!db) return;
  const { services } = await import("../drizzle/schema");
  
  if (service.skeduId) {
    const existing = await db.select().from(services).where(eq(services.skeduId, service.skeduId)).limit(1);
    if (existing.length > 0) {
      await db.update(services).set({ ...service, lastSyncedAt: new Date() }).where(eq(services.skeduId, service.skeduId));
      return;
    }
  }
  
  await db.insert(services).values({ ...service, lastSyncedAt: new Date() });
}

// Eventos
export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  const { events } = await import("../drizzle/schema");
  return await db.select().from(events).where(eq(events.active, 1));
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) return [];
  const { events } = await import("../drizzle/schema");
  const { gte } = await import("drizzle-orm");
  return await db.select().from(events)
    .where(gte(events.startDate, new Date()))
    .orderBy(events.startDate);
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { events } = await import("../drizzle/schema");
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertEvent(event: any) {
  const db = await getDb();
  if (!db) return;
  const { events } = await import("../drizzle/schema");
  
  if (event.skeduId) {
    const existing = await db.select().from(events).where(eq(events.skeduId, event.skeduId)).limit(1);
    if (existing.length > 0) {
      await db.update(events).set({ ...event, lastSyncedAt: new Date() }).where(eq(events.skeduId, event.skeduId));
      return;
    }
  }
  
  await db.insert(events).values({ ...event, lastSyncedAt: new Date() });
}

// Clientes
export async function getAllClients() {
  const db = await getDb();
  if (!db) return [];
  const { clients } = await import("../drizzle/schema");
  return await db.select().from(clients);
}

export async function getClientByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { clients } = await import("../drizzle/schema");
  const result = await db.select().from(clients).where(eq(clients.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertClient(client: any) {
  const db = await getDb();
  if (!db) return;
  const { clients } = await import("../drizzle/schema");
  
  if (client.skeduId) {
    const existing = await db.select().from(clients).where(eq(clients.skeduId, client.skeduId)).limit(1);
    if (existing.length > 0) {
      await db.update(clients).set({ ...client, lastSyncedAt: new Date() }).where(eq(clients.skeduId, client.skeduId));
      return;
    }
  }
  
  await db.insert(clients).values({ ...client, lastSyncedAt: new Date() });
}

// Newsletter Subscribers
export async function subscribeToNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  
  const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  if (existing.length > 0) {
    if (existing[0].status === "unsubscribed") {
      await db.update(newsletterSubscribers)
        .set({ status: "pending", name: name || existing[0].name, updatedAt: new Date() })
        .where(eq(newsletterSubscribers.email, email));
    }
    return;
  }
  
  await db.insert(newsletterSubscribers).values({ email, name, status: "pending" });
}

export async function confirmNewsletterSubscription(email: string) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  await db.update(newsletterSubscribers)
    .set({ status: "active", confirmedAt: new Date(), updatedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}

export async function unsubscribeFromNewsletter(email: string) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  await db.update(newsletterSubscribers)
    .set({ status: "unsubscribed", unsubscribedAt: new Date(), updatedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}

export async function getActiveNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  const { newsletterSubscribers } = await import("../drizzle/schema");
  return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.status, "active"));
}

// Webhook Logs
export async function logWebhook(event: string, payload: any, processed: boolean = false, error?: string) {
  const db = await getDb();
  if (!db) return;
  const { webhookLogs } = await import("../drizzle/schema");
  await db.insert(webhookLogs).values({
    event,
    payload: JSON.stringify(payload),
    processed: processed ? 1 : 0,
    error,
  });
}

// Analytics
export async function logAnalyticsEvent(eventData: {
  eventType: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  metadata?: any;
}) {
  const db = await getDb();
  if (!db) return;
  const { analyticsEvents } = await import("../drizzle/schema");
  await db.insert(analyticsEvents).values({
    ...eventData,
    metadata: eventData.metadata ? JSON.stringify(eventData.metadata) : null,
  });
}

// Menu Categories
export async function getAllMenuCategories() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories } = await import("../drizzle/schema");
  return await db.select().from(menuCategories).orderBy(menuCategories.displayOrder);
}

export async function getActiveMenuCategories() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories } = await import("../drizzle/schema");
  return await db.select().from(menuCategories)
    .where(eq(menuCategories.active, 1))
    .orderBy(menuCategories.displayOrder);
}

export async function getMenuCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { menuCategories } = await import("../drizzle/schema");
  const result = await db.select().from(menuCategories).where(eq(menuCategories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMenuCategory(category: any) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.insert(menuCategories).values(category);
}

export async function updateMenuCategory(id: number, category: any) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.update(menuCategories).set({ ...category, updatedAt: new Date() }).where(eq(menuCategories.id, id));
}

export async function deleteMenuCategory(id: number) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.delete(menuCategories).where(eq(menuCategories.id, id));
}

// Menu Items
export async function getAllMenuItems() {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  return await db.select().from(menuItems).orderBy(menuItems.displayOrder);
}

export async function getMenuItemsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  return await db.select().from(menuItems)
    .where(eq(menuItems.categoryId, categoryId))
    .orderBy(menuItems.displayOrder);
}

export async function getActiveMenuItemsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  return await db.select().from(menuItems)
    .where(and(
      eq(menuItems.categoryId, categoryId),
      eq(menuItems.active, 1)
    ))
    .orderBy(menuItems.displayOrder);
}

export async function getMenuItemById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { menuItems } = await import("../drizzle/schema");
  const result = await db.select().from(menuItems).where(eq(menuItems.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createMenuItem(item: any) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.insert(menuItems).values(item);
}

export async function updateMenuItem(id: number, item: any) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.update(menuItems).set({ ...item, updatedAt: new Date() }).where(eq(menuItems.id, id));
}

export async function deleteMenuItem(id: number) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.delete(menuItems).where(eq(menuItems.id, id));
}

// Get full menu with categories and items
export async function getFullMenu() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories, menuItems } = await import("../drizzle/schema");
  
  const categories = await db.select().from(menuCategories)
    .where(eq(menuCategories.active, 1))
    .orderBy(menuCategories.displayOrder);
  
  const { and } = await import("drizzle-orm");
  const result = [];
  for (const category of categories) {
    const items = await db.select().from(menuItems)
      .where(and(
        eq(menuItems.categoryId, category.id),
        eq(menuItems.active, 1)
      ))
      .orderBy(menuItems.displayOrder);
    
    result.push({
      ...category,
      items: items.map((item: any) => ({
        ...item,
        prices: item.prices ? JSON.parse(item.prices) : {},
        dietaryTags: item.dietaryTags ? JSON.parse(item.dietaryTags) : [],
      })),
    });
  }
  
  return result;
}

// Bookings (Reservas)
export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  const { bookings } = await import("../drizzle/schema");
  return await db.select().from(bookings).orderBy(bookings.createdAt);
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { bookings } = await import("../drizzle/schema");
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBooking(booking: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { bookings } = await import("../drizzle/schema");
  await db.insert(bookings).values(booking);
  return { success: true };
}

export async function updateBookingStatus(id: number, status: "pending" | "confirmed" | "cancelled") {
  const db = await getDb();
  if (!db) return null;
  const { bookings } = await import("../drizzle/schema");
  await db.update(bookings).set({ status, updatedAt: new Date() }).where(eq(bookings.id, id));
  const updated = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return updated[0];
}

export async function deleteBooking(id: number) {
  const db = await getDb();
  if (!db) return;
  const { bookings } = await import("../drizzle/schema");
  await db.delete(bookings).where(eq(bookings.id, id));
}

export async function bulkDeleteBookings(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  const { bookings } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.delete(bookings).where(inArray(bookings.id, ids));
}

export async function bulkUpdateBookingsStatus(ids: number[], status: "pending" | "confirmed" | "cancelled") {
  const db = await getDb();
  if (!db) return;
  const { bookings } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.update(bookings).set({ status, updatedAt: new Date() }).where(inArray(bookings.id, ids));
}

// Contact Messages
export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  const { contactMessages } = await import("../drizzle/schema");
  return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
}

export async function getContactMessageById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { contactMessages } = await import("../drizzle/schema");
  const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContactMessage(message: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { contactMessages } = await import("../drizzle/schema");
  await db.insert(contactMessages).values(message);
  return { success: true };
}

export async function updateContactMessageStatus(id: number, status: "new" | "read" | "replied") {
  const db = await getDb();
  if (!db) return null;
  const { contactMessages } = await import("../drizzle/schema");
  await db.update(contactMessages).set({ status, updatedAt: new Date() }).where(eq(contactMessages.id, id));
  const updated = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return updated[0];
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) return;
  const { contactMessages } = await import("../drizzle/schema");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

export async function bulkDeleteContactMessages(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  const { contactMessages } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.delete(contactMessages).where(inArray(contactMessages.id, ids));
}

export async function bulkUpdateContactMessagesStatus(ids: number[], status: "new" | "read" | "replied") {
  const db = await getDb();
  if (!db) return;
  const { contactMessages } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.update(contactMessages).set({ status, updatedAt: new Date() }).where(inArray(contactMessages.id, ids));
}


// ============================================
// CORPORATE PRODUCTS
// ============================================

export async function getAllCorporateProducts() {
  const db = await getDb();
  if (!db) return [];
  const { corporateProducts } = await import("../drizzle/schema");
  return db.select().from(corporateProducts);
}

export async function getActiveCorporateProducts() {
  const db = await getDb();
  if (!db) return [];
  const { corporateProducts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(corporateProducts).where(eq(corporateProducts.active, 1));
}

export async function getCorporateProductById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { corporateProducts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(corporateProducts).where(eq(corporateProducts.id, id));
  return results[0] || null;
}

export async function createCorporateProduct(product: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateProducts } = await import("../drizzle/schema");
  const result = await db.insert(corporateProducts).values(product);
  
  // Get the last inserted ID
  const [newProduct] = await db.select().from(corporateProducts).orderBy(corporateProducts.id).limit(1).offset((await db.select().from(corporateProducts)).length - 1);
  
  return { success: true, id: newProduct?.id };
}

export async function updateCorporateProduct(id: number, product: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateProducts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(corporateProducts).set(product).where(eq(corporateProducts.id, id));
  return { success: true };
}

export async function deleteCorporateProduct(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateProducts } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(corporateProducts).where(eq(corporateProducts.id, id));
  return { success: true };
}

// ============================================
// CORPORATE CLIENTS
// ============================================

export async function getAllCorporateClients() {
  const db = await getDb();
  if (!db) return [];
  const { corporateClients } = await import("../drizzle/schema");
  return db.select().from(corporateClients);
}

export async function getCorporateClientById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { corporateClients } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(corporateClients).where(eq(corporateClients.id, id));
  return results[0] || null;
}

export async function getCorporateClientByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const { corporateClients } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(corporateClients).where(eq(corporateClients.contactEmail, email));
  return results[0] || null;
}

export async function createCorporateClient(client: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateClients } = await import("../drizzle/schema");
  await db.insert(corporateClients).values(client);
  return { success: true };
}

export async function updateCorporateClient(id: number, client: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateClients } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(corporateClients).set(client).where(eq(corporateClients.id, id));
  return { success: true };
}

export async function deleteCorporateClient(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { corporateClients } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(corporateClients).where(eq(corporateClients.id, id));
  return { success: true };
}

// ============================================
// QUOTES
// ============================================

export async function getAllQuotes() {
  const db = await getDb();
  if (!db) return [];
  const { quotes } = await import("../drizzle/schema");
  return db.select().from(quotes);
}

export async function getQuoteById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { quotes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(quotes).where(eq(quotes.id, id));
  return results[0] || null;
}

export async function getQuoteByNumber(quoteNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const { quotes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(quotes).where(eq(quotes.quoteNumber, quoteNumber));
  return results[0] || null;
}

export async function createQuote(quote: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quotes } = await import("../drizzle/schema");
  await db.insert(quotes).values(quote);
  return { success: true };
}

export async function updateQuote(id: number, quote: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quotes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(quotes).set(quote).where(eq(quotes.id, id));
  return { success: true };
}

export async function updateQuoteStatus(id: number, status: "draft" | "sent" | "approved" | "event_completed" | "paid" | "invoiced") {
  const db = await getDb();
  if (!db) return null;
  const { quotes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const updateData: any = { status };
  
  if (status === "sent") {
    updateData.sentAt = new Date();
  } else if (status === "approved") {
    updateData.approvedAt = new Date();
  }
  
  await db.update(quotes).set(updateData).where(eq(quotes.id, id));
  
  const results = await db.select().from(quotes).where(eq(quotes.id, id));
  return results[0] || null;
}

export async function deleteQuote(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quotes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(quotes).where(eq(quotes.id, id));
  return { success: true };
}

export async function bulkDeleteQuotes(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  const { quotes, quoteItems } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  // Eliminar primero los items de las cotizaciones
  await db.delete(quoteItems).where(inArray(quoteItems.quoteId, ids));
  // Luego eliminar las cotizaciones
  await db.delete(quotes).where(inArray(quotes.id, ids));
}

export async function bulkUpdateQuotesStatus(ids: number[], status: "draft" | "sent" | "approved" | "event_completed" | "paid" | "invoiced") {
  const db = await getDb();
  if (!db) return;
  const { quotes } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  
  const updateData: any = { status };
  
  if (status === "sent") {
    updateData.sentAt = new Date();
  }
  
  await db.update(quotes).set(updateData).where(inArray(quotes.id, ids));
}

// ============================================
// QUOTE ITEMS
// ============================================

export async function getQuoteItems(quoteId: number) {
  const db = await getDb();
  if (!db) return [];
  const { quoteItems } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(quoteItems).where(eq(quoteItems.quoteId, quoteId));
}

export async function createQuoteItem(item: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quoteItems } = await import("../drizzle/schema");
  await db.insert(quoteItems).values(item);
  return { success: true };
}

export async function deleteQuoteItem(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quoteItems } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(quoteItems).where(eq(quoteItems.id, id));
  return { success: true };
}

export async function deleteQuoteItems(quoteId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { quoteItems } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(quoteItems).where(eq(quoteItems.quoteId, quoteId));
  return { success: true };
}
