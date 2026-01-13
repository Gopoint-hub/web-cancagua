import { date, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "editor", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Servicios de Skedu
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  skeduId: varchar("skedu_id", { length: 255 }).unique(),
  name: text("name").notNull(),
  description: text("description"),
  duration: int("duration"), // en minutos
  price: int("price"), // en pesos chilenos
  category: varchar("category", { length: 100 }),
  imageUrl: text("image_url"),
  active: int("active").default(1).notNull(), // 1 = activo, 0 = inactivo
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  lastSyncedAt: timestamp("last_synced_at"),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Eventos de Skedu
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  skeduId: varchar("skedu_id", { length: 255 }).unique(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  duration: int("duration"), // en minutos
  price: int("price"),
  totalCapacity: int("total_capacity").notNull(),
  availableCapacity: int("available_capacity").notNull(),
  category: varchar("category", { length: 100 }),
  imageUrl: text("image_url"),
  location: text("location"),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  lastSyncedAt: timestamp("last_synced_at"),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Clientes sincronizados desde Skedu
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  skeduId: varchar("skedu_id", { length: 255 }).unique(),
  email: varchar("email", { length: 320 }).notNull(),
  name: text("name"),
  phone: varchar("phone", { length: 50 }),
  subscribedToNewsletter: int("subscribed_to_newsletter").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  lastSyncedAt: timestamp("last_synced_at"),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

// Suscriptores de newsletter
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  status: mysqlEnum("status", ["pending", "active", "unsubscribed"]).default("pending").notNull(),
  confirmedAt: timestamp("confirmed_at"),
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Campañas de newsletter
export const newsletterCampaigns = mysqlTable("newsletter_campaigns", {
  id: int("id").autoincrement().primaryKey(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["draft", "scheduled", "sent"]).default("draft").notNull(),
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  recipientCount: int("recipient_count").default(0),
  openCount: int("open_count").default(0),
  clickCount: int("click_count").default(0),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterCampaign = typeof newsletterCampaigns.$inferSelect;
export type InsertNewsletterCampaign = typeof newsletterCampaigns.$inferInsert;

// Logs de webhooks de Skedu
export const webhookLogs = mysqlTable("webhook_logs", {
  id: int("id").autoincrement().primaryKey(),
  event: varchar("event", { length: 255 }).notNull(),
  payload: text("payload").notNull(),
  processed: int("processed").default(0).notNull(),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type WebhookLog = typeof webhookLogs.$inferSelect;
export type InsertWebhookLog = typeof webhookLogs.$inferInsert;

// Eventos de analytics
export const analyticsEvents = mysqlTable("analytics_events", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  page: varchar("page", { length: 255 }),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  sessionId: varchar("session_id", { length: 255 }),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

// Categorías de menú (Tablas, Bebestibles, Postres, etc.)
export const menuCategories = mysqlTable("menu_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  displayOrder: int("display_order").default(0).notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type MenuCategory = typeof menuCategories.$inferSelect;
export type InsertMenuCategory = typeof menuCategories.$inferInsert;

// Items de menú
export const menuItems = mysqlTable("menu_items", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("category_id").references(() => menuCategories.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  // Precios flexibles (JSON para soportar múltiples precios)
  // Ejemplo: {"default": 5000, "for_2": 22000, "for_4": 28000, "for_6": 34000}
  prices: text("prices").notNull(),
  // Etiquetas dietéticas (JSON array)
  // Ejemplo: ["vegan", "gluten_free", "keto"]
  dietaryTags: text("dietary_tags"),
  // Notas especiales (ej: "Solicitar con 48 hrs de anticipación")
  specialNotes: text("special_notes"),
  displayOrder: int("display_order").default(0).notNull(),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = typeof menuItems.$inferInsert;

// Reservas (bookings)
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  serviceType: varchar("service_type", { length: 255 }).notNull(), // Biopiscinas, Hot Tubs, Masajes, etc.
  preferredDate: timestamp("preferred_date").notNull(),
  numberOfPeople: int("number_of_people").notNull(),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Mensajes de contacto
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
// Productos corporativos para cotizaciones
export const corporateProducts = mysqlTable("corporate_products", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // biopiscina, hot_tub, masaje, taller, alimentos, arriendo, programa
  priceType: mysqlEnum("price_type", ["per_person", "flat"]).default("per_person").notNull(),
  unitPrice: int("unit_price").notNull(), // en pesos chilenos
  duration: int("duration"), // en minutos (opcional)
  maxCapacity: int("max_capacity"), // capacidad máxima de personas (opcional)
  includes: text("includes"), // JSON con lista de items incluidos
  active: int("active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type CorporateProduct = typeof corporateProducts.$inferSelect;
export type InsertCorporateProduct = typeof corporateProducts.$inferInsert;

// Clientes corporativos
export const corporateClients = mysqlTable("corporate_clients", {
  id: int("id").autoincrement().primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactPosition: text("contact_position"), // Cargo empresarial
  contactEmail: varchar("contact_email", { length: 320 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }),
  contactWhatsapp: varchar("contact_whatsapp", { length: 50 }), // WhatsApp
  rut: varchar("rut", { length: 20 }), // RUT de la empresa
  giro: text("giro"), // Giro de la empresa
  address: text("address"),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Chile"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type CorporateClient = typeof corporateClients.$inferSelect;
export type InsertCorporateClient = typeof corporateClients.$inferInsert;

// Cotizaciones corporativas
export const quotes = mysqlTable("quotes", {
  id: int("id").autoincrement().primaryKey(),
  quoteNumber: varchar("quote_number", { length: 50 }).notNull().unique(), // Ej: COT-1000
  clientId: int("client_id").references(() => corporateClients.id),
  clientName: text("client_name").notNull(), // Guardado por si el cliente no está en la BD
  clientEmail: varchar("client_email", { length: 320 }).notNull(),
  numberOfPeople: int("number_of_people").notNull(),
  eventDate: date("event_date"),
  eventDescription: text("event_description"), // Descripción de la jornada
  itinerary: text("itinerary"), // Texto editable del itinerario
  subtotal: int("subtotal").notNull(),
  total: int("total").notNull(),
  validUntil: date("valid_until").notNull(), // Fecha de caducidad (10 días)
  status: mysqlEnum("status", [
    "draft", 
    "sent", 
    "approved", 
    "event_completed", 
    "paid", 
    "invoiced"
  ]).default("draft").notNull(),
  notes: text("notes"),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  sentAt: timestamp("sent_at"),
  approvedAt: timestamp("approved_at"),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// Items de cotización
export const quoteItems = mysqlTable("quote_items", {
  id: int("id").autoincrement().primaryKey(),
  quoteId: int("quote_id").references(() => quotes.id, { onDelete: "cascade" }).notNull(),
  productId: int("product_id").references(() => corporateProducts.id),
  productName: text("product_name").notNull(),
  description: text("description"),
  quantity: int("quantity").notNull(),
  unitPrice: int("unit_price").notNull(),
  total: int("total").notNull(),
  sortOrder: int("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type QuoteItem = typeof quoteItems.$inferSelect;
export type InsertQuoteItem = typeof quoteItems.$inferInsert;
