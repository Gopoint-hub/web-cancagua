import { getSkeduServices, getSkeduEvents, getSkeduClients, getSkeduBookings, getSkeduPayments } from "./skedu";
import * as db from "./db";

/**
 * Extraer items de la respuesta de Skedu
 * Skedu puede devolver: { Data: { Items: [...] } } o { Items: [...] } o [...]
 */
function extractItems(response: any): any[] {
    console.log("[SkeduSync] Tipo de respuesta:", typeof response);
    console.log("[SkeduSync] Keys de respuesta:", response ? Object.keys(response) : "null");
    
    if (Array.isArray(response)) {
        console.log("[SkeduSync] Respuesta es array directo");
        return response;
    }
    if (response?.Data?.Items) {
        console.log("[SkeduSync] Respuesta tiene Data.Items");
        return response.Data.Items;
    }
    if (response?.Data && Array.isArray(response.Data)) {
        console.log("[SkeduSync] Respuesta tiene Data como array");
        return response.Data;
    }
    if (response?.Items) {
        console.log("[SkeduSync] Respuesta tiene Items");
        return response.Items;
    }
    if (response?.items) {
        console.log("[SkeduSync] Respuesta tiene items (minuscula)");
        return response.items;
    }
    if (response?.data) {
        console.log("[SkeduSync] Respuesta tiene data");
        return Array.isArray(response.data) ? response.data : [];
    }
    console.log("[SkeduSync] No se encontro estructura conocida, retornando array vacio");
    return [];
}

/**
 * Sincronizar servicios desde Skedu
 */
export async function syncSkeduServices() {
    console.log("[SkeduSync] Iniciando sincronizacion de servicios...");
    try {
        const services = await getSkeduServices();
        
        // Log completo de la respuesta para debug
        console.log("[SkeduSync] Respuesta completa de Skedu (primeros 1000 chars):", 
            JSON.stringify(services).substring(0, 1000));
        
        const items = extractItems(services);
        console.log("[SkeduSync] Items extraidos:", items.length);
        
        if (items.length > 0) {
            console.log("[SkeduSync] Primer item:", JSON.stringify(items[0]).substring(0, 500));
        }

        let syncCount = 0;
        for (const item of items) {
            try {
                // Mapear campos de Skedu (PascalCase) a nuestro schema
                const serviceData = {
                    skeduId: item.UUID || item.id?.toString() || "",
                    name: item.Name || item.name || "Sin nombre",
                    description: item.Description || item.description || "",
                    duration: item.Duration || item.duration || 0,
                    price: item.Price || item.price || 0,
                    category: item.ShowcaseUUID || item.category || "",
                    imageUrl: item.Images?.[0] || item.image_url || item.imageUrl || "",
                    active: 1,
                };
                
                if (serviceData.skeduId) {
                    await db.upsertService(serviceData);
                    syncCount++;
                }
            } catch (itemError) {
                console.error("[SkeduSync] Error procesando servicio:", itemError);
            }
        }

        await db.updateSiteSetting("last_skedu_services_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizados " + syncCount + " servicios.");
        return { success: true, count: syncCount };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando servicios:", error);
        throw error;
    }
}

/**
 * Sincronizar clientes desde Skedu con UTMs
 * Nota: El endpoint /clients puede no existir en todas las versiones de Skedu
 */
export async function syncSkeduClients() {
    console.log("[SkeduSync] Iniciando sincronizacion de clientes...");
    try {
        const clients = await getSkeduClients();
        const items = extractItems(clients);

        let syncCount = 0;
        for (const item of items) {
            try {
                const firstName = item.FirstName || item.first_name || "";
                const lastName = item.LastName || item.last_name || "";
                const email = item.Email || item.email || "";
                
                // Solo sincronizar si tiene email
                if (email) {
                    await db.upsertClient({
                        skeduId: item.UUID || item.id?.toString() || "",
                        email: email,
                        name: item.Name || item.name || (firstName + " " + lastName).trim() || "Cliente",
                        phone: item.Phone || item.phone || "",
                        subscribedToNewsletter: item.subscribed_to_newsletter ? 1 : 0,
                        utmSource: item.utm_source,
                        utmMedium: item.utm_medium,
                        utmCampaign: item.utm_campaign,
                    });
                    syncCount++;
                }
            } catch (itemError) {
                console.error("[SkeduSync] Error procesando cliente:", itemError);
            }
        }

        await db.updateSiteSetting("last_skedu_clients_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizados " + syncCount + " clientes.");
        return { success: true, count: syncCount };
    } catch (error: any) {
        // Si el endpoint no existe (400/404), retornar 0 en lugar de error
        if (error?.response?.status === 400 || error?.response?.status === 404) {
            console.warn("[SkeduSync] Endpoint de clientes no disponible en esta version de Skedu");
            return { success: true, count: 0, warning: "Endpoint no disponible" };
        }
        console.error("[SkeduSync] Error sincronizando clientes:", error);
        throw error;
    }
}

/**
 * Sincronizar reservas e ingresos desde Skedu (Appointments)
 */
export async function syncSkeduEvents(params?: { startDate?: string; endDate?: string }) {
    console.log("[SkeduSync] Iniciando sincronizacion de reservas/eventos...");
    try {
        const syncParams = params || {
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
        };

        const bookings = await getSkeduBookings(syncParams);
        const items = extractItems(bookings);

        console.log("[SkeduSync] Skedu respondio con " + items.length + " reservas");
        
        if (items.length > 0) {
            console.log("[SkeduSync] Primera reserva:", JSON.stringify(items[0]).substring(0, 500));
        }

        let syncCount = 0;
        let errorCount = 0;
        
        for (const item of items) {
            try {
                let amount = item.Amount || item.amount || item.total || 0;

                // Extraer datos del cliente de la reserva
                const clientData = item.Client || item.client || {};
                const clientName = clientData.Name || clientData.name || 
                    item.ClientName || item.client_name || item.Name || item.name || "Cliente";
                const clientEmail = clientData.Email || clientData.email || 
                    item.ClientEmail || item.client_email || item.Email || item.email || "sin-email@skedu.com";
                const clientPhone = clientData.Phone || clientData.phone || 
                    item.ClientPhone || item.client_phone || item.Phone || item.phone || "";
                
                // Extraer nombre del servicio
                const serviceData = item.Service || item.service || {};
                const serviceName = serviceData.Name || serviceData.name || 
                    item.ServiceName || item.service_name || item.serviceType || "Servicio Skedu";

                const bookingData = {
                    skeduId: item.UUID || item.id?.toString() || "",
                    name: clientName,
                    email: clientEmail,
                    phone: clientPhone || "000000000", // Valor por defecto si no hay telefono
                    serviceType: serviceName,
                    preferredDate: new Date(item.StartsAt || item.starts_at || item.date || item.start_date || item.CreatedAt || new Date()),
                    numberOfPeople: item.NumberOfPeople || item.numberOfPeople || item.people || item.Seats || 1,
                    status: mapSkeduStatus(item.Status || item.status || "pending"),
                    amount: amount,
                    utmSource: item.utm_source || item.utmSource || null,
                    utmMedium: item.utm_medium || item.utmMedium || null,
                    utmCampaign: item.utm_campaign || item.utmCampaign || null,
                    utmTerm: item.utm_term || item.utmTerm || null,
                    utmContent: item.utm_content || item.utmContent || null,
                };

                if (bookingData.skeduId) {
                    await db.upsertBooking(bookingData);
                    console.log("[SkeduSync] Reserva " + bookingData.skeduId + " sincronizada");
                    syncCount++;
                }
            } catch (itemError) {
                console.error("[SkeduSync] Error procesando reserva:", itemError);
                errorCount++;
            }
        }

        await db.updateSiteSetting("last_skedu_events_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizadas " + syncCount + " reservas. Errores: " + errorCount);
        return { success: true, count: syncCount, errors: errorCount };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando reservas:", error);
        throw error;
    }
}

/**
 * Mapear estados de Skedu a nuestros estados
 */
function mapSkeduStatus(status: string): "pending" | "confirmed" | "cancelled" {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === "confirmed" || normalizedStatus === "completed" || normalizedStatus === "paid") {
        return "confirmed";
    }
    if (normalizedStatus === "cancelled" || normalizedStatus === "canceled" || normalizedStatus === "no_show") {
        return "cancelled";
    }
    return "pending";
}

/**
 * Alias de syncSkeduEvents para compatibilidad
 */
export const syncSkeduBookings = syncSkeduEvents;

/**
 * Sincronizacion completa
 */
export async function syncAll() {
    const results = {
        services: { success: false, count: 0 } as any,
        clients: { success: false, count: 0 } as any,
        events: { success: false, count: 0 } as any,
    };
    
    try {
        results.services = await syncSkeduServices();
    } catch (e) {
        console.error("[SkeduSync] Error en servicios:", e);
    }
    
    try {
        results.clients = await syncSkeduClients();
    } catch (e) {
        console.error("[SkeduSync] Error en clientes:", e);
    }
    
    try {
        results.events = await syncSkeduEvents();
    } catch (e) {
        console.error("[SkeduSync] Error en eventos:", e);
    }
    
    return results;
}
