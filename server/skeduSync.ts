import { getSkeduServices, getSkeduEvents, getSkeduClients } from "./skedu";
import * as db from "./db";

/**
 * Sincronizar servicios desde Skedu
 */
export async function syncSkeduServices() {
    console.log("[SkeduSync] Iniciando sincronización de servicios...");
    try {
        const services = await getSkeduServices();

        // Asumimos que 'services' es un array o tiene una propiedad 'items'
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


        // Guardar fecha de última sincronización
        await db.updateSiteSetting("last_skedu_services_sync", new Date().toISOString());

        console.log(`[SkeduSync] Sincronizados ${items.length} servicios.`);
        return { success: true, count: items.length };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando servicios:", error);
        throw error;
    }
}

/**
 * Sincronizar eventos desde Skedu
 */
export async function syncSkeduEvents() {
    console.log("[SkeduSync] Iniciando sincronización de eventos...");
    try {
        const events = await getSkeduEvents();

        const items = Array.isArray(events) ? events : (events.items || []);

        for (const item of items) {
            await db.upsertEvent({
                skeduId: item.id.toString(),
                title: item.title || item.name,
                description: item.description,
                startDate: new Date(item.start_date || item.startDate),
                endDate: item.end_date || item.endDate ? new Date(item.end_date || item.endDate) : null,
                duration: item.duration,
                price: item.price,
                totalCapacity: item.total_capacity || item.totalCapacity || 0,
                availableCapacity: item.available_capacity || item.availableCapacity || 0,
                category: item.category,
                imageUrl: item.image_url || item.imageUrl,
                location: item.location,
                active: item.active ? 1 : 0,
            });
        }


        // Guardar fecha de última sincronización
        await db.updateSiteSetting("last_skedu_events_sync", new Date().toISOString());

        console.log(`[SkeduSync] Sincronizados ${items.length} eventos.`);
        return { success: true, count: items.length };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando eventos:", error);
        throw error;
    }
}

/**
 * Sincronizar clientes desde Skedu
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
            });
        }


        // Guardar fecha de última sincronización
        await db.updateSiteSetting("last_skedu_clients_sync", new Date().toISOString());

        console.log(`[SkeduSync] Sincronizados ${items.length} clientes.`);
        return { success: true, count: items.length };
    } catch (error) {
        console.error("[SkeduSync] Error sincronizando clientes:", error);
        throw error;
    }
}

/**
 * Sincronización completa
 */
export async function syncAll() {
    const results = {
        services: await syncSkeduServices(),
        events: await syncSkeduEvents(),
        clients: await syncSkeduClients(),
    };
    return results;
}
