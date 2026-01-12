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
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
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
