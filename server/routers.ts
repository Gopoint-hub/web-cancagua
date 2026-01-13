import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { generateQuoteNumber, calculateValidUntil } from "./quoteHelpers";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Menú público
  menu: router({    getFullMenu: publicProcedure.query(async () => {
      return await db.getFullMenu();
    }),
    
    getCategories: publicProcedure.query(async () => {
      return await db.getActiveMenuCategories();
    }),
    
    getItemsByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getActiveMenuItemsByCategory(input.categoryId);
      }),
  }),

  // Gestión de menú (CMS - solo admin y editor)
  menuAdmin: router({
    // Categorías
    getAllCategories: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN", message: "No tienes permisos para gestionar el menú" });
      }
      return await db.getAllMenuCategories();
    }),
    
    createCategory: protectedProcedure
      .input(z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.createMenuCategory(input);
        return { success: true };
      }),
    
    updateCategory: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        displayOrder: z.number().optional(),
        active: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...data } = input;
        await db.updateMenuCategory(id, data);
        return { success: true };
      }),
    
    deleteCategory: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden eliminar categorías" });
        }
        await db.deleteMenuCategory(input.id);
        return { success: true };
      }),
    
    // Items
    getAllItems: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getAllMenuItems();
    }),
    
    getItemsByCategory: protectedProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getMenuItemsByCategory(input.categoryId);
      }),
    
    createItem: protectedProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        prices: z.string(), // JSON string
        dietaryTags: z.string().optional(), // JSON string
        specialNotes: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.createMenuItem(input);
        return { success: true };
      }),
    
    updateItem: protectedProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        prices: z.string().optional(),
        dietaryTags: z.string().optional(),
        specialNotes: z.string().optional(),
        displayOrder: z.number().optional(),
        active: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...data } = input;
        await db.updateMenuItem(id, data);
        return { success: true };
      }),
    
    deleteItem: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.deleteMenuItem(input.id);
        return { success: true };
      }),
  }),

  // Subida de imágenes para productos del menú
  upload: router({
    menuItemImage: protectedProcedure
      .input(z.object({
        itemId: z.number(),
        imageData: z.string(), // base64
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { storagePut } = await import("./storage");
        const buffer = Buffer.from(input.imageData, 'base64');
        const extension = input.mimeType.split('/')[1];
        const randomSuffix = Math.random().toString(36).substring(7);
        const fileKey = `menu-items/${input.itemId}-${randomSuffix}.${extension}`;
        
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        // Actualizar el item con la nueva URL de imagen
        await db.updateMenuItem(input.itemId, { imageUrl: url });
        
        return { success: true, url };
      }),
  }),

  // Reservas (público)
  bookings: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(8),
        serviceType: z.string(),
        preferredDate: z.string(), // ISO string
        numberOfPeople: z.number().min(1),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const booking = {
          ...input,
          preferredDate: new Date(input.preferredDate),
        };
        
        const result = await db.createBooking(booking);
        
        // Enviar notificación al propietario
        const { notifyOwner } = await import("./_core/notification");
        await notifyOwner({
          title: `Nueva reserva de ${input.name}`,
          content: `Servicio: ${input.serviceType}\nFecha: ${input.preferredDate}\nPersonas: ${input.numberOfPeople}\nEmail: ${input.email}\nTeléfono: ${input.phone}${input.message ? `\nMensaje: ${input.message}` : ''}`,
        });
        
        return result;
      }),
    
    // Admin: listar todas las reservas
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getAllBookings();
    }),
    
    // Admin: actualizar estado
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const result = await db.updateBookingStatus(input.id, input.status);
        return result;
      }),
    
    // Admin: eliminar reserva
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.deleteBooking(input.id);
        return { success: true };
      }),
  }),

  // Mensajes de contacto (público)
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(3),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const result = await db.createContactMessage(input);
        
        // Enviar notificación al propietario
        const { notifyOwner } = await import("./_core/notification");
        await notifyOwner({
          title: `Nuevo mensaje de ${input.name}`,
          content: `Asunto: ${input.subject}\nEmail: ${input.email}${input.phone ? `\nTeléfono: ${input.phone}` : ''}\n\nMensaje:\n${input.message}`,
        });
        
        return result;
      }),
    
    // Admin: listar todos los mensajes
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getAllContactMessages();
    }),
    
    // Admin: actualizar estado
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const result = await db.updateContactMessageStatus(input.id, input.status);
        return result;
      }),
    
    // Admin: eliminar mensaje
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.deleteContactMessage(input.id);
        return { success: true };
      }),
  }),

  // Gestión de usuarios (solo admin)
  users: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden listar usuarios" });
      }
      return await db.getAllUsers();
    }),
    
    updateRole: protectedProcedure
      .input(z.object({
        userId: z.number(),
        role: z.enum(["user", "editor", "admin"])
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden cambiar roles" });
        }
        const success = await db.updateUserRole(input.userId, input.role);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error al actualizar rol" });
        }
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden eliminar usuarios" });
        }
        // No permitir que el admin se elimine a sí mismo
        if (ctx.user.id === input.userId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No puedes eliminar tu propio usuario" });
        }
        const success = await db.deleteUser(input.userId);
        if (!success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error al eliminar usuario" });
        }
        return { success: true };
      }),
  }),

  // Productos corporativos (CMS - solo admin y editor)
  corporateProducts: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN", message: "No tienes permisos para gestionar productos corporativos" });
      }
      return await db.getAllCorporateProducts();
    }),

    getActive: publicProcedure.query(async () => {
      return await db.getActiveCorporateProducts();
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getCorporateProductById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        category: z.string(),
        priceType: z.enum(["per_person", "flat"]),
        unitPrice: z.number(),
        duration: z.number().optional(),
        maxCapacity: z.number().optional(),
        includes: z.string().optional(),
        active: z.number().default(1),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.createCorporateProduct(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        priceType: z.enum(["per_person", "flat"]).optional(),
        unitPrice: z.number().optional(),
        duration: z.number().optional(),
        maxCapacity: z.number().optional(),
        includes: z.string().optional(),
        active: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...data } = input;
        return await db.updateCorporateProduct(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteCorporateProduct(input.id);
      }),
  }),

  // Clientes corporativos (CMS - solo admin y editor)
  corporateClients: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getAllCorporateClients();
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getCorporateClientById(input.id);
      }),

    getByEmail: protectedProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getCorporateClientByEmail(input.email);
      }),

    create: protectedProcedure
      .input(z.object({
        companyName: z.string(),
        contactName: z.string(),
        contactPosition: z.string().optional(),
        contactEmail: z.string().email(),
        contactPhone: z.string().optional(),
        contactWhatsapp: z.string().optional(),
        rut: z.string().optional(),
        giro: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        country: z.string().default("Chile"),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.createCorporateClient(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        companyName: z.string().optional(),
        contactName: z.string().optional(),
        contactPosition: z.string().optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().optional(),
        contactWhatsapp: z.string().optional(),
        rut: z.string().optional(),
        giro: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...data } = input;
        return await db.updateCorporateClient(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteCorporateClient(input.id);
      }),
  }),

  // Cotizaciones (CMS - solo admin y editor)
  quotes: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getAllQuotes();
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getQuoteById(input.id);
      }),

    getItems: protectedProcedure
      .input(z.object({ quoteId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getQuoteItems(input.quoteId);
      }),

    create: protectedProcedure
      .input(z.object({
        clientId: z.number().optional(),
        clientName: z.string(),
        clientEmail: z.string().email(),
        numberOfPeople: z.number(),
        eventDate: z.string().optional(),
        itinerary: z.string().optional(),
        subtotal: z.number(),
        total: z.number(),
        validUntil: z.string(),
        status: z.enum(["draft", "sent", "approved", "event_completed", "paid", "invoiced"]).default("draft"),
        notes: z.string().optional(),
        items: z.array(z.object({
          productId: z.number().optional(),
          productName: z.string(),
          description: z.string().optional(),
          quantity: z.number(),
          unitPrice: z.number(),
          total: z.number(),
          sortOrder: z.number().default(0),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { items, ...quoteData } = input;
        
        // Generar número de cotización automáticamente
        const quoteNumber = await generateQuoteNumber();
        
        // Crear cotización
        const quoteResult = await db.createQuote({
          ...quoteData,
          quoteNumber,
          createdBy: ctx.user.id,
        });
        
        if (!quoteResult.success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error al crear cotización" });
        }
        
        // Obtener la cotización recién creada para obtener su ID
        const quote = await db.getQuoteByNumber(quoteNumber);
        if (!quote) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error al recuperar cotización" });
        }
        
        // Crear items de cotización
        for (const item of items) {
          await db.createQuoteItem({
            ...item,
            quoteId: quote.id,
          });
        }
        
        return { success: true, quoteId: quote.id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        clientId: z.number().optional(),
        clientName: z.string().optional(),
        clientEmail: z.string().email().optional(),
        numberOfPeople: z.number().optional(),
        eventDate: z.string().optional(),
        itinerary: z.string().optional(),
        subtotal: z.number().optional(),
        total: z.number().optional(),
        validUntil: z.string().optional(),
        status: z.enum(["draft", "sent", "approved", "event_completed", "paid", "invoiced"]).optional(),
        notes: z.string().optional(),
        items: z.array(z.object({
          productId: z.number().optional(),
          productName: z.string(),
          description: z.string().optional(),
          quantity: z.number(),
          unitPrice: z.number(),
          total: z.number(),
          sortOrder: z.number().default(0),
        })).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { id, items, ...quoteData } = input;
        
        // Actualizar cotización
        await db.updateQuote(id, quoteData);
        
        // Si se proporcionan items, reemplazar todos
        if (items) {
          await db.deleteQuoteItems(id);
          for (const item of items) {
            await db.createQuoteItem({
              ...item,
              quoteId: id,
            });
          }
        }
        
        return { success: true };
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["draft", "sent", "approved", "event_completed", "paid", "invoiced"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.updateQuoteStatus(input.id, input.status);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteQuote(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
