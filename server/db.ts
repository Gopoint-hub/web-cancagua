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
  const { eq } = await import("drizzle-orm");
  
  const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  if (existing.length > 0) {
    if (existing[0].status === "unsubscribed") {
      await db.update(newsletterSubscribers)
        .set({ status: "active", name: name || existing[0].name, updatedAt: new Date() })
        .where(eq(newsletterSubscribers.email, email));
    }
    return;
  }
  
  await db.insert(newsletterSubscribers).values({ email, name, status: "active" });
}

export async function confirmNewsletterSubscription(email: string) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(newsletterSubscribers)
    .set({ status: "active", updatedAt: new Date() })
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

// ============================================
// NEWSLETTERS
// ============================================

export async function getAllNewsletters() {
  const db = await getDb();
  if (!db) return [];
  const { newsletters } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
}

export async function getNewsletterById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { newsletters } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(newsletters).where(eq(newsletters.id, id));
  return results[0] || null;
}

export async function createNewsletter(newsletter: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletters } = await import("../drizzle/schema");
  await db.insert(newsletters).values(newsletter);
  return { success: true };
}

export async function updateNewsletter(id: number, newsletter: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletters } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(newsletters).set(newsletter).where(eq(newsletters.id, id));
  return { success: true };
}

export async function deleteNewsletter(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletters } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(newsletters).where(eq(newsletters.id, id));
  return { success: true };
}

export async function bulkDeleteNewsletters(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  const { newsletters } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.delete(newsletters).where(inArray(newsletters.id, ids));
}

export async function duplicateNewsletter(id: number, userId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  
  const original = await getNewsletterById(id);
  if (!original) return { success: false };
  
  const { newsletters } = await import("../drizzle/schema");
  await db.insert(newsletters).values({
    subject: `${original.subject} (Copia)`,
    htmlContent: original.htmlContent,
    textContent: original.textContent,
    designPrompt: original.designPrompt,
    status: "draft",
    createdBy: userId,
  });
  
  return { success: true };
}

// ============================================
// NEWSLETTER SUBSCRIBERS
// ============================================

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
}

export async function getSubscriberById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
  return results[0] || null;
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
  return results[0] || null;
}

export async function createSubscriber(subscriber: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterSubscribers } = await import("../drizzle/schema");
  await db.insert(newsletterSubscribers).values(subscriber);
  return { success: true };
}

export async function updateSubscriber(id: number, subscriber: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(newsletterSubscribers).set(subscriber).where(eq(newsletterSubscribers.id, id));
  return { success: true };
}

export async function deleteSubscriber(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
  return { success: true };
}

export async function bulkDeleteSubscribers(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  await db.delete(newsletterSubscribers).where(inArray(newsletterSubscribers.id, ids));
}

export async function bulkUpdateSubscribersStatus(ids: number[], status: "active" | "unsubscribed") {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const { inArray } = await import("drizzle-orm");
  
  const updateData: any = { status, updatedAt: new Date() };
  if (status === "unsubscribed") {
    updateData.unsubscribedAt = new Date();
  }
  
  await db.update(newsletterSubscribers).set(updateData).where(inArray(newsletterSubscribers.id, ids));
}

// ============================================
// SUBSCRIBER LISTS
// ============================================

export async function getAllLists() {
  const db = await getDb();
  if (!db) return [];
  const { subscriberLists } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(subscriberLists).orderBy(desc(subscriberLists.createdAt));
}

export async function getListById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { subscriberLists } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(subscriberLists).where(eq(subscriberLists.id, id));
  return results[0] || null;
}

export async function createList(list: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { subscriberLists } = await import("../drizzle/schema");
  await db.insert(subscriberLists).values(list);
  return { success: true };
}

export async function updateList(id: number, list: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { subscriberLists } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(subscriberLists).set(list).where(eq(subscriberLists.id, id));
  return { success: true };
}

export async function deleteList(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { subscriberLists } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(subscriberLists).where(eq(subscriberLists.id, id));
  return { success: true };
}

// ============================================
// LIST SUBSCRIBERS (Many-to-Many)
// ============================================

export async function getSubscribersInList(listId: number) {
  const db = await getDb();
  if (!db) return [];
  const { listSubscribers, newsletterSubscribers } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const results = await db
    .select({
      id: newsletterSubscribers.id,
      email: newsletterSubscribers.email,
      name: newsletterSubscribers.name,
      status: newsletterSubscribers.status,
      source: newsletterSubscribers.source,
      metadata: newsletterSubscribers.metadata,
      subscribedAt: newsletterSubscribers.subscribedAt,
      addedToListAt: listSubscribers.addedAt,
    })
    .from(listSubscribers)
    .innerJoin(newsletterSubscribers, eq(listSubscribers.subscriberId, newsletterSubscribers.id))
    .where(eq(listSubscribers.listId, listId));
  
  return results;
}

export async function getListsForSubscriber(subscriberId: number) {
  const db = await getDb();
  if (!db) return [];
  const { listSubscribers, subscriberLists } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const results = await db
    .select({
      id: subscriberLists.id,
      name: subscriberLists.name,
      description: subscriberLists.description,
      addedAt: listSubscribers.addedAt,
    })
    .from(listSubscribers)
    .innerJoin(subscriberLists, eq(listSubscribers.listId, subscriberLists.id))
    .where(eq(listSubscribers.subscriberId, subscriberId));
  
  return results;
}

export async function addSubscriberToList(listId: number, subscriberId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { listSubscribers } = await import("../drizzle/schema");
  
  try {
    await db.insert(listSubscribers).values({ listId, subscriberId });
    await updateListSubscriberCount(listId);
    return { success: true };
  } catch (error) {
    // Ya existe la relación
    return { success: false };
  }
}

export async function removeSubscriberFromList(listId: number, subscriberId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { listSubscribers } = await import("../drizzle/schema");
  const { and, eq } = await import("drizzle-orm");
  
  await db.delete(listSubscribers).where(
    and(
      eq(listSubscribers.listId, listId),
      eq(listSubscribers.subscriberId, subscriberId)
    )
  );
  await updateListSubscriberCount(listId);
  return { success: true };
}

export async function bulkAddSubscribersToList(listId: number, subscriberIds: number[]) {
  const db = await getDb();
  if (!db) return;
  const { listSubscribers } = await import("../drizzle/schema");
  
  const values = subscriberIds.map(subscriberId => ({ listId, subscriberId }));
  
  try {
    await db.insert(listSubscribers).values(values);
  } catch (error) {
    // Ignorar duplicados
  }
  
  await updateListSubscriberCount(listId);
}

export async function bulkRemoveSubscribersFromList(listId: number, subscriberIds: number[]) {
  const db = await getDb();
  if (!db) return;
  const { listSubscribers } = await import("../drizzle/schema");
  const { and, eq, inArray } = await import("drizzle-orm");
  
  await db.delete(listSubscribers).where(
    and(
      eq(listSubscribers.listId, listId),
      inArray(listSubscribers.subscriberId, subscriberIds)
    )
  );
  
  await updateListSubscriberCount(listId);
}

async function updateListSubscriberCount(listId: number) {
  const db = await getDb();
  if (!db) return;
  const { listSubscribers, subscriberLists } = await import("../drizzle/schema");
  const { eq, count } = await import("drizzle-orm");
  
  const result = await db
    .select({ count: count() })
    .from(listSubscribers)
    .where(eq(listSubscribers.listId, listId));
  
  const subscriberCount = result[0]?.count || 0;
  
  await db.update(subscriberLists)
    .set({ subscriberCount, updatedAt: new Date() })
    .where(eq(subscriberLists.id, listId));
}

// ============================================
// NEWSLETTER LISTS (Many-to-Many)
// ============================================

export async function getListsForNewsletter(newsletterId: number) {
  const db = await getDb();
  if (!db) return [];
  const { newsletterLists, subscriberLists } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const results = await db
    .select({
      id: subscriberLists.id,
      name: subscriberLists.name,
      description: subscriberLists.description,
      subscriberCount: subscriberLists.subscriberCount,
    })
    .from(newsletterLists)
    .innerJoin(subscriberLists, eq(newsletterLists.listId, subscriberLists.id))
    .where(eq(newsletterLists.newsletterId, newsletterId));
  
  return results;
}

export async function addListToNewsletter(newsletterId: number, listId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterLists } = await import("../drizzle/schema");
  
  try {
    await db.insert(newsletterLists).values({ newsletterId, listId });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function removeListFromNewsletter(newsletterId: number, listId: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterLists } = await import("../drizzle/schema");
  const { and, eq } = await import("drizzle-orm");
  
  await db.delete(newsletterLists).where(
    and(
      eq(newsletterLists.newsletterId, newsletterId),
      eq(newsletterLists.listId, listId)
    )
  );
  return { success: true };
}

// ============================================
// NEWSLETTER SENDS (Tracking)
// ============================================

export async function createNewsletterSend(send: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterSends } = await import("../drizzle/schema");
  await db.insert(newsletterSends).values(send);
  return { success: true };
}

export async function getSendsForNewsletter(newsletterId: number) {
  const db = await getDb();
  if (!db) return [];
  const { newsletterSends } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  return db.select().from(newsletterSends).where(eq(newsletterSends.newsletterId, newsletterId));
}

export async function updateNewsletterSendStatus(id: number, status: "sent" | "failed" | "bounced", error?: string) {
  const db = await getDb();
  if (!db) return { success: false };
  const { newsletterSends } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const updateData: any = { status };
  if (status === "sent") {
    updateData.sentAt = new Date();
  }
  if (error) {
    updateData.error = error;
  }
  
  await db.update(newsletterSends).set(updateData).where(eq(newsletterSends.id, id));
  return { success: true };
}

export async function trackNewsletterOpen(sendId: number) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSends } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.update(newsletterSends)
    .set({ openedAt: new Date() })
    .where(eq(newsletterSends.id, sendId));
}

export async function trackNewsletterClick(sendId: number) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSends } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  await db.update(newsletterSends)
    .set({ clickedAt: new Date() })
    .where(eq(newsletterSends.id, sendId));
}


// ============================================
// DISCOUNT CODES
// ============================================

export async function getAllDiscountCodes() {
  const db = await getDb();
  if (!db) return [];
  const { discountCodes } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(discountCodes).orderBy(desc(discountCodes.createdAt));
}

export async function getActiveDiscountCodes() {
  const db = await getDb();
  if (!db) return [];
  const { discountCodes } = await import("../drizzle/schema");
  const { eq, and, or, isNull, gte, lte } = await import("drizzle-orm");
  
  const now = new Date();
  return db.select().from(discountCodes).where(
    and(
      eq(discountCodes.active, 1),
      or(isNull(discountCodes.startsAt), lte(discountCodes.startsAt, now)),
      or(isNull(discountCodes.expiresAt), gte(discountCodes.expiresAt, now))
    )
  );
}

export async function getDiscountCodeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { discountCodes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(discountCodes).where(eq(discountCodes.id, id));
  return results[0] || null;
}

export async function getDiscountCodeByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const { discountCodes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(discountCodes).where(eq(discountCodes.code, code.toUpperCase()));
  return results[0] || null;
}

export async function createDiscountCode(discountCode: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { discountCodes } = await import("../drizzle/schema");
  await db.insert(discountCodes).values({
    ...discountCode,
    code: discountCode.code.toUpperCase(),
  });
  return { success: true };
}

export async function updateDiscountCode(id: number, discountCode: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { discountCodes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const updateData = { ...discountCode };
  if (updateData.code) {
    updateData.code = updateData.code.toUpperCase();
  }
  
  await db.update(discountCodes).set(updateData).where(eq(discountCodes.id, id));
  return { success: true };
}

export async function deleteDiscountCode(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { discountCodes } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(discountCodes).where(eq(discountCodes.id, id));
  return { success: true };
}

export async function incrementDiscountCodeUsage(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { discountCodes } = await import("../drizzle/schema");
  const { eq, sql } = await import("drizzle-orm");
  
  await db.update(discountCodes)
    .set({ currentUses: sql`${discountCodes.currentUses} + 1` })
    .where(eq(discountCodes.id, id));
  return { success: true };
}

export async function validateDiscountCode(code: string, userId?: number, serviceType?: string) {
  const discountCode = await getDiscountCodeByCode(code);
  
  if (!discountCode) {
    return { valid: false, error: "Código no encontrado" };
  }
  
  if (discountCode.active !== 1) {
    return { valid: false, error: "Código inactivo" };
  }
  
  const now = new Date();
  
  if (discountCode.startsAt && new Date(discountCode.startsAt) > now) {
    return { valid: false, error: "Código aún no está activo" };
  }
  
  if (discountCode.expiresAt && new Date(discountCode.expiresAt) < now) {
    return { valid: false, error: "Código expirado" };
  }
  
  if (discountCode.maxUses && discountCode.currentUses >= discountCode.maxUses) {
    return { valid: false, error: "Código ha alcanzado el límite de usos" };
  }
  
  if (discountCode.assignedUserId && discountCode.assignedUserId !== userId) {
    return { valid: false, error: "Código no válido para este usuario" };
  }
  
  // Verificar servicios aplicables
  if (serviceType && discountCode.applicableServices) {
    const services = JSON.parse(discountCode.applicableServices);
    if (!services.includes(serviceType) && !services.includes("all")) {
      return { valid: false, error: "Código no aplicable a este servicio" };
    }
  }
  
  return { 
    valid: true, 
    discountCode,
    discountType: discountCode.discountType,
    discountValue: discountCode.discountValue,
    maxDiscount: discountCode.maxDiscount,
  };
}

// ============================================
// DISCOUNT CODE USAGES
// ============================================

export async function createDiscountCodeUsage(usage: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { discountCodeUsages } = await import("../drizzle/schema");
  await db.insert(discountCodeUsages).values(usage);
  
  // Incrementar contador de usos
  await incrementDiscountCodeUsage(usage.discountCodeId);
  
  return { success: true };
}

export async function getUsagesForDiscountCode(discountCodeId: number) {
  const db = await getDb();
  if (!db) return [];
  const { discountCodeUsages } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  return db.select().from(discountCodeUsages)
    .where(eq(discountCodeUsages.discountCodeId, discountCodeId))
    .orderBy(desc(discountCodeUsages.usedAt));
}

export async function getUserDiscountCodeUsageCount(discountCodeId: number, userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const { discountCodeUsages } = await import("../drizzle/schema");
  const { eq, and, count } = await import("drizzle-orm");
  
  const result = await db
    .select({ count: count() })
    .from(discountCodeUsages)
    .where(and(
      eq(discountCodeUsages.discountCodeId, discountCodeId),
      eq(discountCodeUsages.userId, userId)
    ));
  
  return result[0]?.count || 0;
}

// ============================================
// GIFT CARDS
// ============================================

export async function getAllGiftCards() {
  const db = await getDb();
  if (!db) return [];
  const { giftCards } = await import("../drizzle/schema");
  const { desc } = await import("drizzle-orm");
  return db.select().from(giftCards).orderBy(desc(giftCards.createdAt));
}

export async function getGiftCardById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const { giftCards } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(giftCards).where(eq(giftCards.id, id));
  return results[0] || null;
}

export async function getGiftCardByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const { giftCards } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  const results = await db.select().from(giftCards).where(eq(giftCards.code, code.toUpperCase()));
  return results[0] || null;
}

export async function createGiftCard(giftCard: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { giftCards } = await import("../drizzle/schema");
  
  // Generar código único
  const code = generateGiftCardCode();
  
  // Fecha de expiración: 1 año desde ahora
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  
  await db.insert(giftCards).values({
    ...giftCard,
    code,
    balance: giftCard.amount,
    expiresAt,
  });
  
  // Obtener la gift card recién creada
  const created = await getGiftCardByCode(code);
  return { success: true, giftCard: created };
}

export async function updateGiftCard(id: number, giftCard: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { giftCards } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.update(giftCards).set(giftCard).where(eq(giftCards.id, id));
  return { success: true };
}

export async function deleteGiftCard(id: number) {
  const db = await getDb();
  if (!db) return { success: false };
  const { giftCards } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  await db.delete(giftCards).where(eq(giftCards.id, id));
  return { success: true };
}

export async function redeemGiftCard(code: string, amount: number, orderId?: string, orderType?: string) {
  const giftCard = await getGiftCardByCode(code);
  
  if (!giftCard) {
    return { success: false, error: "Gift card no encontrada" };
  }
  
  if (giftCard.purchaseStatus !== "completed") {
    return { success: false, error: "Gift card no está activa" };
  }
  
  if (new Date(giftCard.expiresAt) < new Date()) {
    return { success: false, error: "Gift card expirada" };
  }
  
  if (giftCard.balance < amount) {
    return { success: false, error: "Saldo insuficiente", balance: giftCard.balance };
  }
  
  const db = await getDb();
  if (!db) return { success: false, error: "Error de base de datos" };
  
  const { giftCards, giftCardTransactions } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  const newBalance = giftCard.balance - amount;
  
  // Actualizar saldo
  await db.update(giftCards)
    .set({ 
      balance: newBalance,
      redeemedAt: newBalance === 0 ? new Date() : null,
    })
    .where(eq(giftCards.id, giftCard.id));
  
  // Registrar transacción
  await db.insert(giftCardTransactions).values({
    giftCardId: giftCard.id,
    transactionType: "redemption",
    amount,
    balanceBefore: giftCard.balance,
    balanceAfter: newBalance,
    orderId,
    orderType,
  });
  
  return { success: true, newBalance };
}

function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "GC-";
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += "-";
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ============================================
// GIFT CARD TRANSACTIONS
// ============================================

export async function getGiftCardTransactions(giftCardId: number) {
  const db = await getDb();
  if (!db) return [];
  const { giftCardTransactions } = await import("../drizzle/schema");
  const { eq, desc } = await import("drizzle-orm");
  return db.select().from(giftCardTransactions)
    .where(eq(giftCardTransactions.giftCardId, giftCardId))
    .orderBy(desc(giftCardTransactions.createdAt));
}

export async function createGiftCardTransaction(transaction: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { giftCardTransactions } = await import("../drizzle/schema");
  await db.insert(giftCardTransactions).values(transaction);
  return { success: true };
}
