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

  // Formulario de contacto público
  contact: router({
    submit: publicProcedure
      .input(z.object({
        nombre: z.string().min(2, "El nombre es requerido"),
        email: z.string().email("Email inválido"),
        telefono: z.string().min(8, "Teléfono inválido"),
        mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
        origen: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Importar funciones de email y WhatsApp
        const { sendContactFormEmail } = await import("./email");
        const { formatContactFormMessage, generateWhatsAppLink, WHATSAPP_INFO } = await import("./whatsapp");
        
        // 1. Enviar email a contacto@cancagua.cl
        const emailResult = await sendContactFormEmail(input);
        
        // 2. Generar mensaje y enlace de WhatsApp
        const whatsappMessage = formatContactFormMessage(input);
        const whatsappLink = generateWhatsAppLink(whatsappMessage);
        
        // 3. Guardar en base de datos (mensajes de contacto)
        await db.createContactMessage({
          name: input.nombre,
          email: input.email,
          phone: input.telefono,
          message: input.mensaje,
          source: input.origen || "web",
          status: "new",
        });
        
        return {
          success: emailResult.success,
          emailSent: emailResult.success,
          whatsappLink,
          whatsappNumber: WHATSAPP_INFO.formatted,
          message: emailResult.success 
            ? "Mensaje enviado correctamente. Nos pondremos en contacto pronto."
            : "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.",
        };
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
    
    // Admin: eliminar múltiples reservas
    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkDeleteBookings(input.ids);
        return { success: true, count: input.ids.length };
      }),
    
    // Admin: actualizar estado de múltiples reservas
    bulkUpdateStatus: protectedProcedure
      .input(z.object({
        ids: z.array(z.number()),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkUpdateBookingsStatus(input.ids, input.status);
        return { success: true, count: input.ids.length };
      }),
  }),

  // Mensajes de contacto (público)
  contactMessages: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(3),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        // Importar funciones de email y WhatsApp
        const { sendContactFormEmail } = await import("./email");
        const { formatContactFormMessage, generateWhatsAppLink, WHATSAPP_INFO } = await import("./whatsapp");
        
        // 1. Guardar en base de datos
        const result = await db.createContactMessage(input);
        
        // 2. Enviar email a contacto@cancagua.cl
        const emailResult = await sendContactFormEmail({
          nombre: input.name,
          email: input.email,
          telefono: input.phone || "No proporcionado",
          mensaje: `Asunto: ${input.subject}\n\n${input.message}`,
          origen: "Formulario de Contacto",
        });
        
        // 3. Generar mensaje y enlace de WhatsApp
        const whatsappMessage = formatContactFormMessage({
          nombre: input.name,
          email: input.email,
          telefono: input.phone || "No proporcionado",
          mensaje: `${input.subject}: ${input.message}`,
          origen: "Formulario de Contacto",
        });
        const whatsappLink = generateWhatsAppLink(whatsappMessage);
        
        // 4. Enviar notificación al propietario
        const { notifyOwner } = await import("./_core/notification");
        await notifyOwner({
          title: `Nuevo mensaje de ${input.name}`,
          content: `Asunto: ${input.subject}\nEmail: ${input.email}${input.phone ? `\nTeléfono: ${input.phone}` : ''}\n\nMensaje:\n${input.message}`,
        });
        
        return {
          ...result,
          emailSent: emailResult.success,
          whatsappLink,
          whatsappNumber: WHATSAPP_INFO.formatted,
        };
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
    
    // Admin: eliminar múltiples mensajes
    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkDeleteContactMessages(input.ids);
        return { success: true, count: input.ids.length };
      }),
    
    // Admin: actualizar estado de múltiples mensajes
    bulkUpdateStatus: protectedProcedure
      .input(z.object({
        ids: z.array(z.number()),
        status: z.enum(["new", "read", "replied"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkUpdateContactMessagesStatus(input.ids, input.status);
        return { success: true, count: input.ids.length };
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

    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const results = await Promise.all(
          input.ids.map(id => db.deleteCorporateProduct(id))
        );
        return { success: true, deleted: results.filter(r => r.success).length };
      }),

    bulkDuplicate: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const products = await Promise.all(
          input.ids.map(id => db.getCorporateProductById(id))
        );
        const duplicated = await Promise.all(
          products.filter(p => p !== null).map(product => 
            db.createCorporateProduct({
              name: `${product.name} (Copia)`,
              description: product.description || undefined,
              category: product.category,
              priceType: product.priceType as "per_person" | "flat",
              unitPrice: product.unitPrice,
              duration: product.duration || undefined,
              maxCapacity: product.maxCapacity || undefined,
              includes: product.includes || undefined,
              active: 1,
            })
          )
        );
        return { success: true, duplicated: duplicated.length };
      }),

    importFromCSV: protectedProcedure
      .input(z.object({
        products: z.array(z.object({
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
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const results = await Promise.all(
          input.products.map(product => db.createCorporateProduct(product))
        );
        return { success: true, imported: results.filter(r => r.success).length };
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
        clientCompany: z.string().optional(),
        clientPosition: z.string().optional(),
        clientPhone: z.string().optional(),
        clientRut: z.string().optional(),
        clientAddress: z.string().optional(),
        clientGiro: z.string().optional(),
        numberOfPeople: z.number(),
        eventDate: z.string().optional(),
        eventDescription: z.string().optional(),
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
    
    // Bulk actions
    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkDeleteQuotes(input.ids);
        return { success: true, count: input.ids.length };
      }),
    
    bulkUpdateStatus: protectedProcedure
      .input(z.object({
        ids: z.array(z.number()),
        status: z.enum(["draft", "sent", "approved", "event_completed", "paid", "invoiced"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkUpdateQuotesStatus(input.ids, input.status);
        return { success: true, count: input.ids.length };
      }),
    
    bulkDuplicate: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const duplicatedIds: number[] = [];
        
        for (const id of input.ids) {
          // Obtener cotización original
          const original = await db.getQuoteById(id);
          if (!original) continue;
          
          const items = await db.getQuoteItems(id);
          
          // Generar nuevo número de cotización
          const quoteNumber = await generateQuoteNumber();
          
          // Crear cotización duplicada
          const result = await db.createQuote({
            quoteNumber,
            clientId: original.clientId,
            clientName: original.clientName,
            clientEmail: original.clientEmail,
            clientCompany: original.clientCompany,
            clientPosition: original.clientPosition,
            clientPhone: original.clientPhone,
            clientRut: original.clientRut,
            clientAddress: original.clientAddress,
            clientGiro: original.clientGiro,
            numberOfPeople: original.numberOfPeople,
            eventDate: original.eventDate,
            eventDescription: original.eventDescription,
            itinerary: original.itinerary,
            subtotal: original.subtotal,
            total: original.total,
            validUntil: calculateValidUntil(),
            status: "draft",
            notes: original.notes,
            createdBy: ctx.user.id,
          });
          
          if (result.success) {
            const newQuote = await db.getQuoteByNumber(quoteNumber);
            if (newQuote) {
              // Duplicar items
              for (const item of items) {
                await db.createQuoteItem({
                  quoteId: newQuote.id,
                  productId: item.productId,
                  productName: item.productName,
                  description: item.description,
                  quantity: item.quantity,
                  unitPrice: item.unitPrice,
                  total: item.total,
                  sortOrder: item.sortOrder,
                });
              }
              duplicatedIds.push(newQuote.id);
            }
          }
        }
        
        return { success: true, count: duplicatedIds.length, ids: duplicatedIds };
      }),

    generatePDF: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { generateQuotePDF } = await import("./pdfGenerator");
        
        // Obtener cotización y sus items
        const quote = await db.getQuoteById(input.id);
        if (!quote) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Cotización no encontrada" });
        }
        
        const items = await db.getQuoteItems(input.id);
        
        // Calcular IVA (19%)
        const subtotal = quote.subtotal || 0;
        const tax = Math.round(subtotal * 0.19);
        
        // Preparar datos para el PDF
        const pdfData = {
          quoteNumber: quote.quoteNumber || `COT-${quote.id}`,
          date: new Date(quote.createdAt).toLocaleDateString("es-CL"),
          clientName: quote.clientName,
          clientEmail: quote.clientEmail,
          clientCompany: quote.clientCompany || "",
          clientPosition: quote.clientPosition || undefined,
          clientPhone: quote.clientPhone || undefined,
          clientRut: quote.clientRut || undefined,
          clientAddress: quote.clientAddress || undefined,
          clientGiro: quote.clientGiro || undefined,
          numberOfPeople: quote.numberOfPeople,
          eventDescription: quote.eventDescription || undefined,
          itinerary: quote.itinerary || undefined,
          items: items.map((item: any) => ({
            productName: item.productName,
            description: item.description || "",
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })),
          subtotal,
          tax,
          total: quote.total || 0,
          validUntil: quote.validUntil ? new Date(quote.validUntil).toLocaleDateString("es-CL") : undefined,
        };
        
        // Generar PDF
        const pdfBuffer = await generateQuotePDF(pdfData);
        
        // Convertir a base64 para enviar al cliente
        return {
          pdf: pdfBuffer.toString("base64"),
          filename: `Cotizacion_${pdfData.quoteNumber}.pdf`,
        };
      }),

    sendByEmail: protectedProcedure
      .input(z.object({
        id: z.number(),
        customMessage: z.string().optional(),
        additionalEmails: z.array(z.string().email()).optional(), // Emails adicionales para enviar
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { generateQuotePDF } = await import("./pdfGenerator");
        const { sendQuoteEmail } = await import("./email");
        
        // Obtener cotización y sus items
        const quote = await db.getQuoteById(input.id);
        if (!quote) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Cotización no encontrada" });
        }
        
        const items = await db.getQuoteItems(input.id);
        
        // Calcular IVA (19%)
        const subtotal = quote.subtotal || 0;
        const tax = Math.round(subtotal * 0.19);
        
        // Preparar datos para el PDF
        const pdfData = {
          quoteNumber: quote.quoteNumber || `COT-${quote.id}`,
          date: new Date(quote.createdAt).toLocaleDateString("es-CL"),
          clientName: quote.clientName,
          clientEmail: quote.clientEmail,
          clientCompany: quote.clientCompany || "",
          clientPosition: quote.clientPosition || undefined,
          clientPhone: quote.clientPhone || undefined,
          clientRut: quote.clientRut || undefined,
          clientAddress: quote.clientAddress || undefined,
          clientGiro: quote.clientGiro || undefined,
          numberOfPeople: quote.numberOfPeople,
          eventDescription: quote.eventDescription || undefined,
          itinerary: quote.itinerary || undefined,
          items: items.map((item: any) => ({
            productName: item.productName,
            description: item.description || "",
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          })),
          subtotal,
          tax,
          total: quote.total || 0,
          validUntil: quote.validUntil ? new Date(quote.validUntil).toLocaleDateString("es-CL") : undefined,
        };
        
        // Generar PDF
        const pdfBuffer = await generateQuotePDF(pdfData);
        
        // Combinar email del cliente con emails adicionales
        const allRecipients = [quote.clientEmail];
        if (input.additionalEmails && input.additionalEmails.length > 0) {
          input.additionalEmails.forEach(email => {
            if (!allRecipients.includes(email)) {
              allRecipients.push(email);
            }
          });
        }
        
        // Enviar email con PDF adjunto a todos los destinatarios
        const result = await sendQuoteEmail({
          to: allRecipients.join(", "),
          clientName: quote.clientName,
          quoteNumber: pdfData.quoteNumber,
          pdfBuffer,
          customMessage: input.customMessage,
        });
        
        if (!result.success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: result.error || "Error al enviar email" });
        }
        
        // Actualizar estado de la cotización a "sent"
        await db.updateQuoteStatus(input.id, "sent");
        
        return { success: true, emailId: result.id };
      }),
  }),

  // ============================================
  // NEWSLETTERS
  // ============================================
  newsletters: router({
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getAllNewsletters();
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getNewsletterById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        subject: z.string(),
        senderName: z.string().optional().default("Newsletter Cancagua"),
        htmlContent: z.string(),
        textContent: z.string().optional(),
        designPrompt: z.string().optional(),
        listIds: z.array(z.number()).optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { listIds, scheduledAt, ...newsletterData } = input;
        
        const result = await db.createNewsletter({
          ...newsletterData,
          status: scheduledAt ? "scheduled" : "draft",
          scheduledAt: scheduledAt || null,
          createdBy: ctx.user.id,
        });
        
        // Obtener el newsletter recién creado para tener el id
        const newsletters = await db.getAllNewsletters();
        const newNewsletter = newsletters[0]; // La más reciente
        
        // Si se proporcionaron listas, asociarlas
        if (listIds && listIds.length > 0) {
          for (const listId of listIds) {
            await db.addListToNewsletter(newNewsletter.id, listId);
          }
        }
        
        return { success: true, id: newNewsletter.id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        subject: z.string().optional(),
        htmlContent: z.string().optional(),
        textContent: z.string().optional(),
        designPrompt: z.string().optional(),
        scheduledAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...updateData } = input;
        return await db.updateNewsletter(id, updateData);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteNewsletter(input.id);
      }),

    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkDeleteNewsletters(input.ids);
        return { success: true, count: input.ids.length };
      }),

    duplicate: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.duplicateNewsletter(input.id, ctx.user.id);
      }),

    generateDesign: protectedProcedure
      .input(z.object({
        prompt: z.string(),
        images: z.array(z.string()).optional(),
        generateImages: z.boolean().optional().default(true),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { invokeLLM } = await import("./_core/llm");
        const { generateImage } = await import("./_core/imageGeneration");
        const { getBrandImageUrls, BRAND_IMAGE_CATALOG } = await import("./upload-brand-images");
        
        // Obtener las URLs de imágenes de marca desde S3
        const brandImages = getBrandImageUrls();
        
        // Paso 1: Generar imágenes adicionales con IA si se solicita
        let generatedImageUrls: string[] = [];
        
        if (input.generateImages) {
          try {
            // Generar imagen hero basada en el prompt del usuario
            const imagePrompt = `Fotografía profesional de alta calidad para email marketing de CANCAGUA, un spa y centro de retiro en el sur de Chile. La imagen debe transmitir serenidad, paz y conexión con la naturaleza. Estilo: elegante, cálido, tonos tierra y naturales. Contexto: ${input.prompt}. NO incluir texto ni logos en la imagen.`;
            
            const heroImage = await generateImage({ prompt: imagePrompt });
            if (heroImage.url) {
              generatedImageUrls.push(heroImage.url);
            }
          } catch (error) {
            console.error('Error generando imagen:', error);
            // Continuar sin imagen si falla la generación
          }
        }
        
        // Combinar imágenes proporcionadas con las generadas
        const allImages = [...(input.images || []), ...generatedImageUrls];
        
        // Construir el catálogo de imágenes disponibles para el prompt
        const imagesCatalog = BRAND_IMAGE_CATALOG.map(img => {
          const url = brandImages[img.name] || '';
          return `- ${img.name}: ${img.description} | URL: ${url}`;
        }).join('\n');
        
        // Agregar imágenes generadas al catálogo
        const generatedImagesList = generatedImageUrls.length > 0 
          ? `\n\nIMÁGENES GENERADAS POR IA (usar como hero o imagen principal):\n${generatedImageUrls.map((url, i) => `- imagen_generada_${i + 1}: ${url}`).join('\n')}`
          : '';
        
        // Construir el prompt para generar HTML de email con estilo de marca Cancagua
        const systemPrompt = `Eres un experto diseñador de emails HTML para CANCAGUA, un spa y centro de retiro en Frutillar, Chile. Crea emails profesionales que reflejen la identidad de marca: serenidad, paz y conexión con la naturaleza.

## IDENTIDAD DE MARCA CANCAGUA
- Personalidad: Servicial, amorosa, serena, sabia
- Emoción a transmitir: Serenidad - Paz - Plenitud
- Mensaje clave: "Uno es parte de la naturaleza cuando se siente parte de ella"

## PALETA DE COLORES (OBLIGATORIO)
- Color Principal (Tierra/Arena): #D3BC8D - Usar para headers, botones, acentos
- Color Secundario (Crema): #F1E7D9 - Usar para fondos de sección
- Gris Medio: #AAAAAA - Textos secundarios
- Gris Oscuro: #8C8C8C - Textos de cuerpo
- Fondo principal: #FFFFFF o #F1E7D9
- Texto principal: #3a3a3a o #2d2d2d

## TIPOGRAFÍAS
- Títulos: font-family: 'Josefin Sans', Arial, sans-serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;
- Cuerpo: font-family: 'Fira Sans', Arial, sans-serif; font-weight: 400;
- Acentos elegantes: font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic;

## REQUISITOS TÉCNICOS
- HTML completo con estilos inline (no CSS externo)
- Responsive (mobile-first, max-width: 600px para contenido)
- Compatible con Gmail, Outlook, Apple Mail
- Usa tablas para layout (no flexbox/grid)
- Incluye alt text en imágenes
- Botones CTA con fondo #D3BC8D, texto #3a3a3a, bordes redondeados 4px

## ESTILO VISUAL
- Diseño limpio y minimalista
- Espaciado generoso (padding 20-40px)
- Imágenes con bordes sutiles o sin bordes
- Evitar colores saturados o brillantes
- Líneas divisorias sutiles en #D3BC8D con opacidad

## ESTRUCTURA SUGERIDA
1. Header con logo (centrado, fondo blanco o crema)
2. Imagen hero (si aplica)
3. Contenido principal con tipografía elegante
4. CTA claro y visible
5. Footer con información de contacto y redes sociales

## CATÁLOGO DE IMÁGENES DE MARCA (URLs REALES - USAR ESTAS)
Logo principal: ${brandImages.logo || 'No disponible'}
Logo footer: ${brandImages.logoFooter || 'No disponible'}

Imágenes disponibles:
${imagesCatalog}${generatedImagesList}

## INSTRUCCIONES PARA IMÁGENES
1. SIEMPRE usa el logo real de la URL proporcionada arriba en el header del email
2. Selecciona imágenes del catálogo según el contexto del email (ej: si es sobre spa, usa biopiscinas o masajes)
3. Si hay imágenes generadas por IA, úsalas como imagen hero principal
4. Usa las URLs EXACTAS proporcionadas, no inventes URLs
5. Incluye alt text descriptivo en todas las imágenes

## REDES SOCIALES (URLs REALES)
- Instagram: https://www.instagram.com/cancaguachile/
- Facebook: https://www.facebook.com/Cancaguachile-100421855205587

En el footer del email, incluye links a estas redes sociales con texto simple (no imágenes).

IMPORTANTE: Devuelve un JSON con la siguiente estructura:
{
  "subject": "Asunto sugerido para el email (máximo 60 caracteres, atractivo y relevante)",
  "htmlContent": "El código HTML completo del email"
}

El asunto debe ser atractivo, relevante al contenido, y puede incluir emojis si es apropiado.
NO incluyas marcadores de código. Devuelve SOLO el JSON válido.`;
        
        const userPrompt = `${input.prompt}${input.images && input.images.length > 0 ? `\n\nImágenes a incluir: ${input.images.join(", ")}` : ""}`;
        
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        
        const content = response.choices[0].message.content;
        let rawContent = typeof content === 'string' ? content : '';
        
        // Limpiar marcadores de código si la IA los incluyó
        rawContent = rawContent.replace(/^```json\s*/i, '').replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/g, '').trim();
        
        // Intentar parsear como JSON
        let htmlContent = '';
        let suggestedSubject = '';
        
        try {
          const parsed = JSON.parse(rawContent);
          htmlContent = parsed.htmlContent || '';
          suggestedSubject = parsed.subject || '';
        } catch {
          // Si no es JSON válido, asumir que es HTML puro
          htmlContent = rawContent;
          suggestedSubject = '';
        }
        
        return { htmlContent, suggestedSubject };
      }),

    refineDesign: protectedProcedure
      .input(z.object({
        currentHtml: z.string(),
        refinementRequest: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { invokeLLM } = await import("./_core/llm");
        
        const systemPrompt = `Eres un experto diseñador de emails HTML para CANCAGUA. Modifica el HTML del email según las instrucciones del usuario.

## MANTENER SIEMPRE LA IDENTIDAD DE MARCA:
- Colores: #D3BC8D (tierra/principal), #F1E7D9 (crema), #8C8C8C (gris)
- Tipografías: Josefin Sans (títulos), Fira Sans (cuerpo), Cormorant Garamond (acentos)
- Estilo: Elegante, sereno, minimalista
- Compatibilidad con clientes de email y estilos inline

## REDES SOCIALES (URLs REALES)
- Instagram: https://www.instagram.com/cancaguachile/
- Facebook: https://www.facebook.com/Cancaguachile-100421855205587

Para el logo, usa texto estilizado en lugar de imagen. Para redes sociales, usa texto simple con links.

IMPORTANTE: Devuelve SOLO el código HTML puro modificado, sin marcadores de código.`;
        
        const userPrompt = `HTML actual:\n${input.currentHtml}\n\nModificación solicitada: ${input.refinementRequest}`;
        
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        
        const content = response.choices[0].message.content;
        let htmlContent = typeof content === 'string' ? content : '';
        
        // Limpiar marcadores de código si la IA los incluyó
        htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/g, '').trim();
        
        return { htmlContent };
      }),

    getLists: protectedProcedure
      .input(z.object({ newsletterId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getListsForNewsletter(input.newsletterId);
      }),

    sendTest: protectedProcedure
      .input(z.object({
        newsletterId: z.number(),
        testEmail: z.string().email(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const newsletter = await db.getNewsletterById(input.newsletterId);
        if (!newsletter) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Newsletter no encontrado" });
        }
        
        const { sendTestEmail } = await import("./email");
        const result = await sendTestEmail(
          input.testEmail,
          newsletter.subject,
          newsletter.htmlContent || ''
        );
        
        if (!result.success) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: result.error || "Error al enviar email de prueba" });
        }
        
        return { success: true, message: "Email de prueba enviado" };
      }),

    send: protectedProcedure
      .input(z.object({
        newsletterId: z.number(),
        listIds: z.array(z.number()),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const newsletter = await db.getNewsletterById(input.newsletterId);
        if (!newsletter) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Newsletter no encontrado" });
        }
        
        // Obtener suscriptores de las listas seleccionadas
        const allSubscribers: any[] = [];
        const seenEmails = new Set<string>();
        
        for (const listId of input.listIds) {
          const subscribers = await db.getSubscribersInList(listId);
          for (const sub of subscribers) {
            if (sub.status === 'active' && !seenEmails.has(sub.email)) {
              seenEmails.add(sub.email);
              allSubscribers.push(sub);
            }
          }
        }
        
        if (allSubscribers.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No hay suscriptores activos en las listas seleccionadas" });
        }
        
        // Actualizar estado a 'sending'
        await db.updateNewsletter(input.newsletterId, { status: 'sending' });
        
        // Preparar emails
        const { sendBulkEmails, htmlToPlainText } = await import("./email");
        const emails = allSubscribers.map(sub => ({
          to: sub.email,
          subject: newsletter.subject,
          html: newsletter.htmlContent || '',
          text: htmlToPlainText(newsletter.htmlContent || ''),
        }));
        
        // Enviar emails con nombre de remitente personalizado
        const result = await sendBulkEmails({ 
          emails,
          senderName: newsletter.senderName || 'Newsletter Cancagua',
        });
        
        // Registrar envíos individuales
        for (const sub of allSubscribers) {
          await db.createNewsletterSend({
            newsletterId: input.newsletterId,
            subscriberId: sub.id,
            status: result.success ? 'sent' : 'failed',
          });
        }
        
        // Actualizar newsletter con resultados
        await db.updateNewsletter(input.newsletterId, {
          status: result.success ? 'sent' : 'failed',
          sentAt: new Date(),
          recipientCount: allSubscribers.length,
        });
        
        return {
          success: result.success,
          sent: result.sent,
          failed: result.failed,
          total: allSubscribers.length,
          errors: result.errors,
        };
      }),
  }),

  // ============================================
  // SUBSCRIBERS
  // ============================================
  subscribers: router({
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getAllSubscribers();
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getSubscriberById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        metadata: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.createSubscriber({
          ...input,
          source: "manual",
          status: "active",
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        email: z.string().email().optional(),
        name: z.string().optional(),
        metadata: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...updateData } = input;
        return await db.updateSubscriber(id, updateData);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteSubscriber(input.id);
      }),

    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkDeleteSubscribers(input.ids);
        return { success: true, count: input.ids.length };
      }),

    bulkUpdateStatus: protectedProcedure
      .input(z.object({
        ids: z.array(z.number()),
        status: z.enum(["active", "unsubscribed"]),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkUpdateSubscribersStatus(input.ids, input.status);
        return { success: true, count: input.ids.length };
      }),

    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.subscribeToNewsletter(input.email, input.name);
        return { success: true };
      }),

    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeFromNewsletter(input.email);
        return { success: true };
      }),

    importCSV: protectedProcedure
      .input(z.object({
        csvData: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        // Parsear CSV simple (asume formato: email,name,metadata)
        const lines = input.csvData.split("\n").filter(line => line.trim());
        const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
        
        const emailIndex = headers.findIndex(h => h.includes("email") || h.includes("correo"));
        const nameIndex = headers.findIndex(h => h.includes("name") || h.includes("nombre"));
        
        if (emailIndex === -1) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "No se encontró columna de email" });
        }
        
        let imported = 0;
        let skipped = 0;
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map(v => v.trim());
          const email = values[emailIndex];
          const name = nameIndex !== -1 ? values[nameIndex] : undefined;
          
          if (!email || !email.includes("@")) {
            skipped++;
            continue;
          }
          
          // Verificar si ya existe
          const existing = await db.getSubscriberByEmail(email);
          if (existing) {
            skipped++;
            continue;
          }
          
          // Crear metadata con todos los campos adicionales
          const metadata: any = {};
          headers.forEach((header, idx) => {
            if (idx !== emailIndex && idx !== nameIndex && values[idx]) {
              metadata[header] = values[idx];
            }
          });
          
          await db.createSubscriber({
            email,
            name,
            source: "import",
            status: "active",
            metadata: Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : null,
          });
          
          imported++;
        }
        
        return { success: true, imported, skipped };
      }),

    analyzeAndSegment: protectedProcedure
      .input(z.object({
        csvData: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { invokeLLM } = await import("./_core/llm");
        
        // Analizar primeras 50 filas para obtener estructura
        const lines = input.csvData.split("\n").slice(0, 51);
        const sample = lines.join("\n");
        
        const systemPrompt = `Eres un experto en segmentación de audiencias para CANCAGUA, un spa y centro de retiro en Frutillar, Chile. Analiza el CSV proporcionado y sugiere listas de segmentación útiles para marketing de bienestar y turismo.

## CONTEXTO DEL NEGOCIO CANCAGUA:
- Spa y centro de retiro de lujo
- Ubicado en Frutillar, Región de Los Lagos, Chile
- Servicios: masajes, tratamientos de spa, retiros de bienestar, eventos corporativos
- Clientes: turistas nacionales e internacionales, empresas para eventos, personas buscando bienestar

## SEGMENTACIONES RECOMENDADAS:
- Por ciudad/región de origen (Santiago, Región de Los Lagos, etc.)
- Por tipo de cliente (individual, corporativo, turista)
- Por fecha de última compra/visita
- Por monto gastado (VIP, regular, nuevo)
- Por interés (spa, eventos, retiros, gastronomía)
- Por frecuencia de visita

Devuelve un JSON con este formato:
{
  "segments": [
    {
      "name": "Nombre de la lista (en español)",
      "description": "Descripción clara de la segmentación",
      "rules": {
        "field": "nombre_campo_del_csv",
        "operator": "equals|contains|greater_than|less_than",
        "value": "valor"
      }
    }
  ],
  "insights": "Observaciones útiles sobre los datos para estrategia de marketing"
}`;
        
        const userPrompt = `Analiza este CSV y sugiere segmentaciones útiles:\n\n${sample}`;
        
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });
        
        const content = response.choices[0].message.content;
        const analysis = JSON.parse(typeof content === 'string' ? content : '{}');
        
        return analysis;
      }),

    getLists: protectedProcedure
      .input(z.object({ subscriberId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getListsForSubscriber(input.subscriberId);
      }),
  }),

  // ============================================
  // SUBSCRIBER LISTS
  // ============================================
  lists: router({
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getAllLists();
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getListById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        segmentationRules: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.createList(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        segmentationRules: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...updateData } = input;
        return await db.updateList(id, updateData);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteList(input.id);
      }),

    getSubscribers: protectedProcedure
      .input(z.object({ listId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getSubscribersInList(input.listId);
      }),

    addSubscriber: protectedProcedure
      .input(z.object({
        listId: z.number(),
        subscriberId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.addSubscriberToList(input.listId, input.subscriberId);
      }),

    removeSubscriber: protectedProcedure
      .input(z.object({
        listId: z.number(),
        subscriberId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.removeSubscriberFromList(input.listId, input.subscriberId);
      }),

    bulkAddSubscribers: protectedProcedure
      .input(z.object({
        listId: z.number(),
        subscriberIds: z.array(z.number()),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkAddSubscribersToList(input.listId, input.subscriberIds);
        return { success: true, count: input.subscriberIds.length };
      }),

    bulkRemoveSubscribers: protectedProcedure
      .input(z.object({
        listId: z.number(),
        subscriberIds: z.array(z.number()),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await db.bulkRemoveSubscribersFromList(input.listId, input.subscriberIds);
        return { success: true, count: input.subscriberIds.length };
      }),
  }),

  // ============================================
  // DISCOUNT CODES
  // ============================================
  discountCodes: router({
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getAllDiscountCodes();
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getDiscountCodeById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        code: z.string().min(3).max(50),
        name: z.string(),
        description: z.string().optional(),
        discountType: z.enum(["percentage", "fixed"]),
        discountValue: z.number().min(1),
        minPurchase: z.number().default(0),
        maxDiscount: z.number().optional(),
        maxUses: z.number().optional(),
        maxUsesPerUser: z.number().default(1),
        assignedUserId: z.number().optional(),
        applicableServices: z.array(z.string()).optional(),
        startsAt: z.date().optional(),
        expiresAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        // Verificar que el código no exista
        const existing = await db.getDiscountCodeByCode(input.code);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "Ya existe un código con ese nombre" });
        }
        
        return await db.createDiscountCode({
          ...input,
          applicableServices: input.applicableServices ? JSON.stringify(input.applicableServices) : null,
          createdBy: ctx.user.id,
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        code: z.string().min(3).max(50).optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        discountType: z.enum(["percentage", "fixed"]).optional(),
        discountValue: z.number().min(1).optional(),
        minPurchase: z.number().optional(),
        maxDiscount: z.number().optional(),
        maxUses: z.number().optional(),
        maxUsesPerUser: z.number().optional(),
        assignedUserId: z.number().optional(),
        applicableServices: z.array(z.string()).optional(),
        startsAt: z.date().optional(),
        expiresAt: z.date().optional(),
        active: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const { id, applicableServices, ...updateData } = input;
        
        if (applicableServices) {
          (updateData as any).applicableServices = JSON.stringify(applicableServices);
        }
        
        return await db.updateDiscountCode(id, updateData);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteDiscountCode(input.id);
      }),

    validate: publicProcedure
      .input(z.object({
        code: z.string(),
        serviceType: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const userId = ctx.user?.id;
        return await db.validateDiscountCode(input.code, userId, input.serviceType);
      }),

    getUsages: protectedProcedure
      .input(z.object({ discountCodeId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getUsagesForDiscountCode(input.discountCodeId);
      }),
  }),

  // ============================================
  // GIFT CARDS
  // ============================================
  giftCards: router({
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getAllGiftCards();
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getGiftCardById(input.id);
      }),

    getByCode: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        const giftCard = await db.getGiftCardByCode(input.code);
        if (!giftCard) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Gift card no encontrada" });
        }
        // Solo devolver información pública
        return {
          code: giftCard.code,
          amount: giftCard.amount,
          balance: giftCard.balance,
          expiresAt: giftCard.expiresAt,
          purchaseStatus: giftCard.purchaseStatus,
        };
      }),

    create: publicProcedure
      .input(z.object({
        amount: z.number().min(5000),
        backgroundImage: z.string().default("default"),
        recipientName: z.string().optional(),
        recipientEmail: z.string().email().optional(),
        recipientPhone: z.string().optional(),
        senderName: z.string().optional(),
        senderEmail: z.string().email().optional(),
        personalMessage: z.string().optional(),
        deliveryMethod: z.enum(["email", "whatsapp", "download"]).default("email"),
      }))
      .mutation(async ({ input }) => {
        return await db.createGiftCard(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        purchaseStatus: z.enum(["pending", "completed", "cancelled"]).optional(),
        paymentMethod: z.string().optional(),
        paymentReference: z.string().optional(),
        deliveredAt: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        const { id, ...updateData } = input;
        return await db.updateGiftCard(id, updateData);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.deleteGiftCard(input.id);
      }),

    // Simular compra (para pruebas sin pasarela de pago)
    simulatePurchase: publicProcedure
      .input(z.object({
        giftCardId: z.number(),
      }))
      .mutation(async ({ input }) => {
        const giftCard = await db.getGiftCardById(input.giftCardId);
        if (!giftCard) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Gift card no encontrada" });
        }
        
        // Simular pago exitoso
        await db.updateGiftCard(input.giftCardId, {
          purchaseStatus: "completed",
          paymentMethod: "simulated",
          paymentReference: `SIM-${Date.now()}`,
        });
        
        // Registrar transacción de compra
        await db.createGiftCardTransaction({
          giftCardId: input.giftCardId,
          transactionType: "purchase",
          amount: giftCard.amount,
          balanceBefore: 0,
          balanceAfter: giftCard.amount,
          notes: "Compra simulada para pruebas",
        });
        
        return { success: true, giftCard: await db.getGiftCardById(input.giftCardId) };
      }),

    redeem: protectedProcedure
      .input(z.object({
        code: z.string(),
        amount: z.number().min(1),
        orderId: z.string().optional(),
        orderType: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.redeemGiftCard(input.code, input.amount, input.orderId, input.orderType);
      }),

    getTransactions: protectedProcedure
      .input(z.object({ giftCardId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin" && ctx.user.role !== "editor") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return await db.getGiftCardTransactions(input.giftCardId);
      }),

    // Obtener imágenes de fondo disponibles
    getBackgroundImages: publicProcedure
      .query(async () => {
        return [
          { id: "spa", name: "Spa & Relax", url: "/images/giftcard-spa.jpg" },
          { id: "nature", name: "Naturaleza", url: "/images/giftcard-nature.jpg" },
          { id: "massage", name: "Masajes", url: "/images/giftcard-massage.jpg" },
          { id: "pool", name: "Biopiscinas", url: "/images/giftcard-pool.jpg" },
          { id: "elegant", name: "Elegante", url: "/images/giftcard-elegant.jpg" },
          { id: "default", name: "Clásico", url: "/images/giftcard-default.jpg" },
        ];
      }),
  }),
});

export type AppRouter = typeof appRouter;
