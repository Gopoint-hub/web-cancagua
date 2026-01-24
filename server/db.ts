import { eq, gte, and, desc, sql, asc, like, or, isNull, ne, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/tidb-serverless";
import { connect } from "@tidbcloud/serverless";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance for TiDB Cloud Serverless
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = connect({ url: process.env.DATABASE_URL });
      _db = drizzle(client);
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
export async function getActiveEvents() {
  const db = await getDb();
  if (!db) return [];
  const { events } = await import("../drizzle/schema");
  return await db.select().from(events).where(eq(events.active, 1));
}

export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  const { events } = await import("../drizzle/schema");
  return await db.select().from(events);
}

export async function getEventBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { events } = await import("../drizzle/schema");
  // Convertir slug a título (reemplazar guiones con espacios y capitalizar)
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const result = await db.select().from(events).where(eq(events.title, title)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) return [];
  const { events } = await import("../drizzle/schema");
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

// Analytics Events
export async function logAnalyticsEvent(eventData: {
  eventType: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
  metadata?: string;
}) {
  const db = await getDb();
  if (!db) return;
  const { analyticsEvents } = await import("../drizzle/schema");
  await db.insert(analyticsEvents).values(eventData);
}

export async function getAnalyticsEvents(days: number = 30) {
  const db = await getDb();
  if (!db) return [];
  const { analyticsEvents } = await import("../drizzle/schema");
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return await db.select().from(analyticsEvents)
    .where(gte(analyticsEvents.createdAt, startDate))
    .orderBy(desc(analyticsEvents.createdAt));
}

// Menú - Categorías
export async function getAllMenuCategories() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories } = await import("../drizzle/schema");
  return await db.select().from(menuCategories).orderBy(asc(menuCategories.displayOrder));
}

export async function getActiveMenuCategories() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories } = await import("../drizzle/schema");
  return await db.select().from(menuCategories)
    .where(eq(menuCategories.active, 1))
    .orderBy(asc(menuCategories.displayOrder));
}

export async function createMenuCategory(category: any) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.insert(menuCategories).values(category);
}

export async function updateMenuCategory(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.update(menuCategories).set(data).where(eq(menuCategories.id, id));
}

export async function deleteMenuCategory(id: number) {
  const db = await getDb();
  if (!db) return;
  const { menuCategories } = await import("../drizzle/schema");
  await db.delete(menuCategories).where(eq(menuCategories.id, id));
}

// Menú - Items
export async function getAllMenuItems() {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  return await db.select().from(menuItems).orderBy(asc(menuItems.displayOrder));
}

export async function getMenuItemsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  return await db.select().from(menuItems)
    .where(eq(menuItems.categoryId, categoryId))
    .orderBy(asc(menuItems.displayOrder));
}

export async function getActiveMenuItemsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  const { menuItems } = await import("../drizzle/schema");
  return await db.select().from(menuItems)
    .where(and(eq(menuItems.categoryId, categoryId), eq(menuItems.active, 1)))
    .orderBy(asc(menuItems.displayOrder));
}

export async function createMenuItem(item: any) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.insert(menuItems).values(item);
}

export async function updateMenuItem(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.update(menuItems).set(data).where(eq(menuItems.id, id));
}

export async function deleteMenuItem(id: number) {
  const db = await getDb();
  if (!db) return;
  const { menuItems } = await import("../drizzle/schema");
  await db.delete(menuItems).where(eq(menuItems.id, id));
}

// Menú completo con categorías e items
export async function getFullMenu() {
  const db = await getDb();
  if (!db) return [];
  const { menuCategories, menuItems } = await import("../drizzle/schema");
  
  const categories = await db.select().from(menuCategories)
    .where(eq(menuCategories.active, 1))
    .orderBy(asc(menuCategories.displayOrder));
  
  const items = await db.select().from(menuItems)
    .where(eq(menuItems.active, 1))
    .orderBy(asc(menuItems.displayOrder));
  
  return categories.map(cat => ({
    ...cat,
    items: items.filter(item => item.categoryId === cat.id),
  }));
}

// Reservas
export async function createBooking(booking: any) {
  const db = await getDb();
  if (!db) return { success: false };
  const { bookings } = await import("../drizzle/schema");
  await db.insert(bookings).values(booking);
  return { success: true };
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  const { bookings } = await import("../drizzle/schema");
  return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function updateBookingStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return;
  const { bookings } = await import("../drizzle/schema");
  await db.update(bookings).set({ status: status as any }).where(eq(bookings.id, id));
}

// Mensajes de contacto
export async function createContactMessage(message: any) {
  const db = await getDb();
  if (!db) return;
  const { contactMessages } = await import("../drizzle/schema");
  await db.insert(contactMessages).values(message);
}

export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  const { contactMessages } = await import("../drizzle/schema");
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function updateContactMessageStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return;
  const { contactMessages } = await import("../drizzle/schema");
  await db.update(contactMessages).set({ status: status as any }).where(eq(contactMessages.id, id));
}

// Newsletter Subscribers - funciones adicionales
export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  const { newsletterSubscribers } = await import("../drizzle/schema");
  return await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
}

export async function getNewsletterSubscriberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateNewsletterSubscriber(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  await db.update(newsletterSubscribers).set({ ...data, updatedAt: new Date() }).where(eq(newsletterSubscribers.id, id));
}

export async function deleteNewsletterSubscriber(id: number) {
  const db = await getDb();
  if (!db) return;
  const { newsletterSubscribers } = await import("../drizzle/schema");
  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
}

export async function bulkCreateNewsletterSubscribers(subscribers: any[]) {
  const db = await getDb();
  if (!db) return { created: 0, skipped: 0 };
  const { newsletterSubscribers } = await import("../drizzle/schema");
  
  let created = 0;
  let skipped = 0;
  
  for (const sub of subscribers) {
    const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, sub.email)).limit(1);
    if (existing.length > 0) {
      skipped++;
    } else {
      await db.insert(newsletterSubscribers).values({
        email: sub.email,
        name: sub.name,
        status: "active",
        source: sub.source || "import",
        metadata: sub.metadata ? JSON.stringify(sub.metadata) : null,
      });
      created++;
    }
  }
  
  return { created, skipped };
}

// Subscriber Lists
export async function getAllSubscriberLists() {
  const db = await getDb();
  if (!db) return [];
  const { subscriberLists } = await import("../drizzle/schema");
  return await db.select().from(subscriberLists).orderBy(desc(subscriberLists.createdAt));
}

export async function createSubscriberList(list: any) {
  const db = await getDb();
  if (!db) return;
  const { subscriberLists } = await import("../drizzle/schema");
  await db.insert(subscriberLists).values(list);
}

export async function updateSubscriberList(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { subscriberLists } = await import("../drizzle/schema");
  await db.update(subscriberLists).set(data).where(eq(subscriberLists.id, id));
}

export async function deleteSubscriberList(id: number) {
  const db = await getDb();
  if (!db) return;
  const { subscriberLists, listSubscribers } = await import("../drizzle/schema");
  await db.delete(listSubscribers).where(eq(listSubscribers.listId, id));
  await db.delete(subscriberLists).where(eq(subscriberLists.id, id));
}

// Newsletters
export async function getAllNewsletters() {
  const db = await getDb();
  if (!db) return [];
  const { newsletters } = await import("../drizzle/schema");
  return await db.select().from(newsletters).orderBy(desc(newsletters.createdAt));
}

export async function getNewsletterById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { newsletters } = await import("../drizzle/schema");
  const result = await db.select().from(newsletters).where(eq(newsletters.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createNewsletter(newsletter: any) {
  const db = await getDb();
  if (!db) return undefined;
  const { newsletters } = await import("../drizzle/schema");
  const result = await db.insert(newsletters).values(newsletter);
  return result;
}

export async function updateNewsletter(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { newsletters } = await import("../drizzle/schema");
  await db.update(newsletters).set(data).where(eq(newsletters.id, id));
}

export async function deleteNewsletter(id: number) {
  const db = await getDb();
  if (!db) return;
  const { newsletters, newsletterSends, newsletterLists } = await import("../drizzle/schema");
  await db.delete(newsletterSends).where(eq(newsletterSends.newsletterId, id));
  await db.delete(newsletterLists).where(eq(newsletterLists.newsletterId, id));
  await db.delete(newsletters).where(eq(newsletters.id, id));
}

// Gift Cards
export async function getAllGiftCards() {
  const db = await getDb();
  if (!db) return [];
  const { giftCards } = await import("../drizzle/schema");
  return await db.select().from(giftCards).orderBy(desc(giftCards.createdAt));
}

export async function getGiftCardById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { giftCards } = await import("../drizzle/schema");
  const result = await db.select().from(giftCards).where(eq(giftCards.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getGiftCardByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { giftCards } = await import("../drizzle/schema");
  const result = await db.select().from(giftCards).where(eq(giftCards.code, code)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createGiftCard(giftCard: any) {
  const db = await getDb();
  if (!db) return undefined;
  const { giftCards } = await import("../drizzle/schema");
  await db.insert(giftCards).values(giftCard);
  return giftCard;
}

export async function updateGiftCard(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { giftCards } = await import("../drizzle/schema");
  await db.update(giftCards).set(data).where(eq(giftCards.id, id));
}

export async function deleteGiftCard(id: number) {
  const db = await getDb();
  if (!db) return;
  const { giftCards } = await import("../drizzle/schema");
  await db.delete(giftCards).where(eq(giftCards.id, id));
}

// Quotes
export async function getAllQuotes() {
  const db = await getDb();
  if (!db) return [];
  const { quotes } = await import("../drizzle/schema");
  return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
}

export async function getQuoteById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { quotes } = await import("../drizzle/schema");
  const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getQuoteByNumber(quoteNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { quotes } = await import("../drizzle/schema");
  const result = await db.select().from(quotes).where(eq(quotes.quoteNumber, quoteNumber)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createQuote(quote: any) {
  const db = await getDb();
  if (!db) return undefined;
  const { quotes } = await import("../drizzle/schema");
  await db.insert(quotes).values(quote);
  return quote;
}

export async function updateQuote(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { quotes } = await import("../drizzle/schema");
  await db.update(quotes).set(data).where(eq(quotes.id, id));
}

export async function deleteQuote(id: number) {
  const db = await getDb();
  if (!db) return;
  const { quotes } = await import("../drizzle/schema");
  await db.delete(quotes).where(eq(quotes.id, id));
}

// Blog Articles
export async function getAllBlogArticles() {
  const db = await getDb();
  if (!db) return [];
  const { blogArticles } = await import("../drizzle/schema");
  return await db.select().from(blogArticles).orderBy(desc(blogArticles.publishedAt));
}

export async function getPublishedBlogArticles() {
  const db = await getDb();
  if (!db) return [];
  const { blogArticles } = await import("../drizzle/schema");
  return await db.select().from(blogArticles)
    .where(eq(blogArticles.status, "published"))
    .orderBy(desc(blogArticles.publishedAt));
}

export async function getBlogArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { blogArticles } = await import("../drizzle/schema");
  const result = await db.select().from(blogArticles).where(eq(blogArticles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const { blogArticles } = await import("../drizzle/schema");
  const result = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogArticle(article: any) {
  const db = await getDb();
  if (!db) return undefined;
  const { blogArticles } = await import("../drizzle/schema");
  await db.insert(blogArticles).values(article);
  return article;
}

export async function updateBlogArticle(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { blogArticles } = await import("../drizzle/schema");
  await db.update(blogArticles).set(data).where(eq(blogArticles.id, id));
}

export async function deleteBlogArticle(id: number) {
  const db = await getDb();
  if (!db) return;
  const { blogArticles } = await import("../drizzle/schema");
  await db.delete(blogArticles).where(eq(blogArticles.id, id));
}

// Testimonials
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  const { testimonials } = await import("../drizzle/schema");
  return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  const { testimonials } = await import("../drizzle/schema");
  return await db.select().from(testimonials)
    .where(eq(testimonials.approved, 1))
    .orderBy(desc(testimonials.createdAt));
}

export async function createTestimonial(testimonial: any) {
  const db = await getDb();
  if (!db) return;
  const { testimonials } = await import("../drizzle/schema");
  await db.insert(testimonials).values(testimonial);
}

export async function updateTestimonial(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { testimonials } = await import("../drizzle/schema");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) return;
  const { testimonials } = await import("../drizzle/schema");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// FAQs
export async function getAllFaqs() {
  const db = await getDb();
  if (!db) return [];
  const { faqs } = await import("../drizzle/schema");
  return await db.select().from(faqs).orderBy(asc(faqs.displayOrder));
}

export async function getActiveFaqs() {
  const db = await getDb();
  if (!db) return [];
  const { faqs } = await import("../drizzle/schema");
  return await db.select().from(faqs)
    .where(eq(faqs.active, 1))
    .orderBy(asc(faqs.displayOrder));
}

export async function createFaq(faq: any) {
  const db = await getDb();
  if (!db) return;
  const { faqs } = await import("../drizzle/schema");
  await db.insert(faqs).values(faq);
}

export async function updateFaq(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { faqs } = await import("../drizzle/schema");
  await db.update(faqs).set(data).where(eq(faqs.id, id));
}

export async function deleteFaq(id: number) {
  const db = await getDb();
  if (!db) return;
  const { faqs } = await import("../drizzle/schema");
  await db.delete(faqs).where(eq(faqs.id, id));
}

// Site Settings
export async function getSiteSettings() {
  const db = await getDb();
  if (!db) return {};
  const { siteSettings } = await import("../drizzle/schema");
  const settings = await db.select().from(siteSettings);
  return settings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
}

export async function updateSiteSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) return;
  const { siteSettings } = await import("../drizzle/schema");
  
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  if (existing.length > 0) {
    await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }
}

// Galería
export async function getAllGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  const { galleryImages } = await import("../drizzle/schema");
  return await db.select().from(galleryImages).orderBy(asc(galleryImages.displayOrder));
}

export async function getActiveGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  const { galleryImages } = await import("../drizzle/schema");
  return await db.select().from(galleryImages)
    .where(eq(galleryImages.active, 1))
    .orderBy(asc(galleryImages.displayOrder));
}

export async function createGalleryImage(image: any) {
  const db = await getDb();
  if (!db) return;
  const { galleryImages } = await import("../drizzle/schema");
  await db.insert(galleryImages).values(image);
}

export async function updateGalleryImage(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  const { galleryImages } = await import("../drizzle/schema");
  await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
}

export async function deleteGalleryImage(id: number) {
  const db = await getDb();
  if (!db) return;
  const { galleryImages } = await import("../drizzle/schema");
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
}
