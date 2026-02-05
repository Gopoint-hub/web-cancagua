import { getSkeduServices, getSkeduEvents, getSkeduClients, getSkeduBookings, getSkeduPayments } from "./skedu";
import * as db from "./db";

/**
 * Extraer items de la respuesta de Skedu
 * Skedu puede devolver: { Data: { Items: [...] } } o { Items: [...] } o [...]
 */
function extractItems(response: any): any[] {
    if (Array.isArray(response)) {
        return response;
    }
    if (response?.Data?.Items) {
        return response.Data.Items;
    }
    if (response?.Items) {
        return response.Items;
    }
    if (response?.items) {
        return response.items;
    }
    if (response?.data) {
        return Array.isArray(response.data) ? response.data : [];
    }
    return [];
}

/**
 * Sincronizar servicios desde Skedu
 */
export async function syncSkeduServices() {
    console.log("[SkeduSync] Iniciando sincronizacion de servicios...");
    try {
        const services = await getSkeduServices();
        const items = extractItems(services);
        
        console.log("[SkeduSync] Respuesta de Skedu:", JSON.stringify(services).substring(0, 500));
        console.log("[SkeduSync] Items extraidos:", items.length);

        for (const item of items) {
            // Mapear campos de Skedu (PascalCase) a nuestro schema
            await db.upsertService({
                skeduId: item.UUID || item.id?.toString() || "",
                name: item.Name || item.name || "",
                description: item.Description || item.description || "",
                duration: item.Duration || item.duration || 0,
                price: item.Price || item.price || 0,
                category: item.ShowcaseUUID || item.category || "",
                imageUrl: item.Images?.[0] || item.image_url || item.imageUrl || "",
                active: 1, // Si viene de Skedu, asumimos que esta activo
            });
        }

        await db.updateSiteSetting("last_skedu_services_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizados " + items.length + " servicios.");
        return { success: true, count: items.length };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando servicios:", error);
        throw error;
    }
}

/**
 * Sincronizar clientes desde Skedu con UTMs
 */
export async function syncSkeduClients() {
    console.log("[SkeduSync] Iniciando sincronizacion de clientes...");
    try {
        const clients = await getSkeduClients();
        const items = extractItems(clients);

        for (const item of items) {
            // Mapear campos de Skedu (PascalCase) a nuestro schema
            const firstName = item.FirstName || item.first_name || "";
            const lastName = item.LastName || item.last_name || "";
            await db.upsertClient({
                skeduId: item.UUID || item.id?.toString() || "",
                email: item.Email || item.email || "",
                name: item.Name || item.name || (firstName + " " + lastName).trim(),
                phone: item.Phone || item.phone || "",
                subscribedToNewsletter: item.subscribed_to_newsletter ? 1 : 0,
                utmSource: item.utm_source,
                utmMedium: item.utm_medium,
                utmCampaign: item.utm_campaign,
            });
        }

        await db.updateSiteSetting("last_skedu_clients_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizados " + items.length + " clientes.");
        return { success: true, count: items.length };
    } catch (error) {
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

        let syncCount = 0;
        for (const item of items) {
            let amount = item.Amount || item.amount || item.total || 0;

            if (amount === 0) {
                try {
                    const appointmentId = item.UUID || item.id?.toString();
                    if (appointmentId) {
                        const payments = await getSkeduPayments(appointmentId);
                        const paymentItems = extractItems(payments);
                        if (paymentItems.length > 0) {
                            amount = paymentItems.reduce((acc: number, p: any) => acc + (p.Amount || p.amount || 0), 0);
                        }
                    }
                } catch (e) {
                    // Silently ignore payment fetch errors
                }
            }

            await db.upsertBooking({
                skeduId: item.UUID || item.id?.toString() || "",
                name: item.Name || item.name || item.client_name || "Cliente Skedu",
                email: item.Email || item.email || item.client_email || "",
                phone: item.Phone || item.phone || item.client_phone || "",
                serviceType: item.ServiceName || item.service_name || item.serviceType || "Servicio",
                preferredDate: new Date(item.StartsAt || item.starts_at || item.date || item.start_date || item.CreatedAt || new Date()),
                numberOfPeople: item.NumberOfPeople || item.numberOfPeople || item.people || 1,
                status: (item.Status || item.status || "pending").toLowerCase() as any,
                amount: amount,
                utmSource: item.utm_source || item.utmSource,
                utmMedium: item.utm_medium || item.utmMedium,
                utmCampaign: item.utm_campaign || item.utmCampaign,
                utmTerm: item.utm_term || item.utmTerm,
                utmContent: item.utm_content || item.utmContent,
                createdAt: new Date(item.CreatedAt || item.createdAt || item.created_at || item.StartsAt || new Date()),
            });
            console.log("[SkeduSync] Reserva " + (item.UUID || item.id) + " - Monto: " + amount);
            syncCount++;
        }

        await db.updateSiteSetting("last_skedu_events_sync", new Date().toISOString());
        console.log("[SkeduSync] Sincronizadas " + syncCount + " reservas/eventos.");
        return { success: true, count: syncCount };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando reservas:", error);
        throw error;
    }
}

/**
 * Alias de syncSkeduEvents para compatibilidad
 */
export const syncSkeduBookings = syncSkeduEvents;

/**
 * Sincronizacion completa
 */
export async function syncAll() {
    return {
        services: await syncSkeduServices(),
        clients: await syncSkeduClients(),
        events: await syncSkeduEvents(),
    };
}
