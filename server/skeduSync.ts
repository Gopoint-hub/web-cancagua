import { getSkeduServices, getSkeduEvents, getSkeduClients, getSkeduBookings, getSkeduPayments } from "./skedu";
import * as db from "./db";

/**
 * Sincronizar servicios desde Skedu
 */
export async function syncSkeduServices() {
    console.log("[SkeduSync] Iniciando sincronización de servicios...");
    try {
        const services = await getSkeduServices();
        const items = Array.isArray(services) ? services : (services.items || []);

        for (const item of items) {
            await db.upsertService({
                skeduId: item.id.toString(),
                name: item.name,
                description: item.description,
                duration: item.duration,
                price: item.price,
                category: item.category,
                imageUrl: item.image_url || item.imageUrl,
                active: item.active ? 1 : 0,
            });
        }

        await db.updateSiteSetting("last_skedu_services_sync", new Date().toISOString());
        console.log(`[SkeduSync] Sincronizados ${items.length} servicios.`);
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
    console.log("[SkeduSync] Iniciando sincronización de clientes...");
    try {
        const clients = await getSkeduClients();
        const items = Array.isArray(clients) ? clients : (clients.items || []);

        for (const item of items) {
            await db.upsertClient({
                skeduId: item.id.toString(),
                email: item.email,
                name: item.name || `${item.first_name} ${item.last_name}`,
                phone: item.phone,
                subscribedToNewsletter: item.subscribed_to_newsletter ? 1 : 0,
                // Si la API provee UTMs en el cliente, los guardamos
                utmSource: item.utm_source,
                utmMedium: item.utm_medium,
                utmCampaign: item.utm_campaign,
            });
        }

        await db.updateSiteSetting("last_skedu_clients_sync", new Date().toISOString());
        console.log(`[SkeduSync] Sincronizados ${items.length} clientes.`);
        return { success: true, count: items.length };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando clientes:", error);
        throw error;
    }
}

/**
 * Sincronizar reservas e ingresos desde Skedu (Appointments)
 * Antes llamado syncSkeduEvents, ahora mejorado con montos y UTMs
 */
export async function syncSkeduEvents(params?: { startDate?: string; endDate?: string }) {
    console.log("[SkeduSync] Iniciando sincronización de reservas/eventos...");
    try {
        // Si no hay rango, por defecto sincronizamos los últimos 90 días para poblar el dashboard
        const syncParams = params || {
            startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };

        const bookings = await getSkeduBookings(syncParams);

        // Intentar extraer el array de múltiples formas comunes
        let items: any[] = [];
        if (Array.isArray(bookings)) {
            items = bookings;
        } else if (bookings && typeof bookings === 'object') {
            items = bookings.items || bookings.data || bookings.appointments || bookings.results || [];
        }

        console.log(`[SkeduSync] Skedu respondió con ${items.length} elementos. Estructura:`,
            Array.isArray(bookings) ? "Array" : Object.keys(bookings || {}));

        let syncCount = 0;
        for (const item of items) {
            // Intentar obtener el monto del pago si no está en el objeto de reserva
            let amount = item.amount || item.total || 0;

            if (amount === 0) {
                try {
                    const payments = await getSkeduPayments(item.id.toString());
                    if (Array.isArray(payments) && payments.length > 0) {
                        amount = payments.reduce((acc: number, p: any) => acc + (p.amount || 0), 0);
                    }
                } catch (e) {
                    // Silently ignore payment fetch errors for individual bookings
                }
            }

            await db.upsertBooking({
                skeduId: item.id.toString(),
                name: item.name || item.client_name || "Cliente Skedu",
                email: item.email || item.client_email || "",
                phone: item.phone || item.client_phone || "",
                serviceType: item.service_name || item.serviceType || "Servicio",
                preferredDate: new Date(item.date || item.start_date || item.createdAt || new Date()),
                numberOfPeople: item.numberOfPeople || item.people || 1,
                status: (item.status || "pending").toLowerCase() as any,
                amount: amount,
                // Atribución
                utmSource: item.utm_source || item.utmSource,
                utmMedium: item.utm_medium || item.utmMedium,
                utmCampaign: item.utm_campaign || item.utmCampaign,
                utmTerm: item.utm_term || item.utmTerm,
                utmContent: item.utm_content || item.utmContent,
                createdAt: new Date(item.createdAt || item.created_at || item.date || item.start_date || new Date()),
            });
            console.log(`[SkeduSync] ✓ Reserva ${item.id} - Monto: ${amount} - Status: ${item.status}`);
            syncCount++;
        }

        await db.updateSiteSetting("last_skedu_events_sync", new Date().toISOString());
        console.log(`[SkeduSync] Sincronizadas ${syncCount} reservas/eventos.`);
        return { success: true, count: syncCount };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando reservas:", error);
        throw error;
    }
}

/**
 * Alias de syncSkeduEvents para compatibilidad con el nuevo router
 */
export const syncSkeduBookings = syncSkeduEvents;

/**
 * Sincronización completa
 */
export async function syncAll() {
    return {
        services: await syncSkeduServices(),
        clients: await syncSkeduClients(),
        events: await syncSkeduEvents(),
    };
}
