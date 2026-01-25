import axios from "axios";

const SKEDU_API_BASE_URL = "https://api.getskedu.com";
const STORE_UUID = "c5e0a893-7eff-42b8-815a-296b1a9c345d";

// Las credenciales se configurarán mediante variables de entorno
const getHeaders = () => {
  const appId = process.env.SKEDU_APP_ID || "e0fd2e66-64ce-4b44-82e1-2740581b8872";
  const secret = process.env.SKEDU_APP_SECRET || "4b46a0a5-8e03-436a-8b11-880a4d86b48b";

  if (!appId || !secret) {
    throw new Error("Skedu API credentials not configured");
  }

  return {
    "X-Skedu-App-ID": appId,
    "X-Skedu-App-Secret": secret,
    "Content-Type": "application/json",
  };
};

/**
 * Obtener lista de servicios desde Skedu
 */
export async function getSkeduServices() {
  try {
    const response = await axios.get(`${SKEDU_API_BASE_URL}/services`, {
      headers: getHeaders(),
      params: { StoreUUID: STORE_UUID }
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching services:", error);
    throw error;
  }
}

/**
 * Obtener un servicio específico por ID
 */
export async function getSkeduServiceById(serviceId: string) {
  try {
    const response = await axios.get(
      `${SKEDU_API_BASE_URL}/services/${serviceId}`,
      {
        headers: getHeaders(),
        params: { StoreUUID: STORE_UUID }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching service ${serviceId}:`, error);
    throw error;
  }
}

/**
 * Obtener lista de eventos desde Skedu (Appointments)
 */
export async function getSkeduEvents(params?: {
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  try {
    // Mapear camelCase a snake_case que es más común en APIs como Skedu
    const skeduParams = {
      StoreUUID: STORE_UUID,
      ...params,
      start_date: params?.startDate,
      end_date: params?.endDate,
    };

    const response = await axios.get(`${SKEDU_API_BASE_URL}/appointments`, {
      headers: getHeaders(),
      params: skeduParams,
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching events:", error);
    throw error;
  }
}

/**
 * Obtener una reserva específica por ID
 */
export async function getSkeduAppointmentById(appointmentId: string) {
  try {
    const response = await axios.get(
      `${SKEDU_API_BASE_URL}/appointments/${appointmentId}`,
      {
        headers: getHeaders(),
        params: { StoreUUID: STORE_UUID }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching appointment ${appointmentId}:`, error);
    throw error;
  }
}

/**
 * Obtener lista de clientes desde Skedu
 * Nota: Según docs, usa /businesses/:business_uuid/users
 * Pero intentaremos /clients si existe o el usuario provee el business_uuid
 */
export async function getSkeduClients(params?: {
  page?: number;
  perPage?: number;
  email?: string;
}) {
  try {
    // Intentamos el endpoint genérico primero si está disponible
    const response = await axios.get(`${SKEDU_API_BASE_URL}/clients`, {
      headers: getHeaders(),
      params: { ...params, StoreUUID: STORE_UUID },
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching clients:", error);
    throw error;
  }
}

/**
 * Crear una reserva en Skedu
 */
export async function createSkeduBooking(data: {
  serviceId?: string;
  eventId?: string;
  clientId: string;
  date: string;
  time?: string;
  notes?: string;
}) {
  try {
    const response = await axios.post(
      `${SKEDU_API_BASE_URL}/appointments`,
      { ...data, StoreUUID: STORE_UUID },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error creating booking:", error);
    throw error;
  }
}

/**
 * Obtener lista de reservas (alias de getSkeduEvents para compatibilidad)
 */
export async function getSkeduBookings(params?: {
  startDate?: string;
  endDate?: string;
  clientId?: string;
  status?: string;
}) {
  return getSkeduEvents(params);
}

/**
 * Obtener pagos asociados a una reserva
 */
export async function getSkeduPayments(appointmentUuid: string) {
  try {
    const response = await axios.get(`${SKEDU_API_BASE_URL}/payments/${appointmentUuid}`, {
      headers: getHeaders(),
      params: { StoreUUID: STORE_UUID }
    });
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching payments for ${appointmentUuid}:`, error);
    throw error;
  }
}

/**
 * Verificar disponibilidad
 */
export async function checkSkeduAvailability(params: {
  serviceId?: string;
  eventId?: string;
  date: string;
  time?: string;
}) {
  try {
    const response = await axios.get(
      `${SKEDU_API_BASE_URL}/availability`,
      {
        headers: getHeaders(),
        params: { ...params, StoreUUID: STORE_UUID },
      }
    );
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error checking availability:", error);
    throw error;
  }
}

/**
 * Obtener configuración de webhooks
 */
export async function getSkeduWebhooks() {
  try {
    const response = await axios.get(`${SKEDU_API_BASE_URL}/webhooks`, {
      headers: getHeaders(),
      params: { StoreUUID: STORE_UUID }
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching webhooks:", error);
    throw error;
  }
}

/**
 * Crear o actualizar un webhook
 */
export async function configureSkeduWebhook(data: {
  url: string;
  events: string[];
  active?: boolean;
}) {
  try {
    const response = await axios.post(
      `${SKEDU_API_BASE_URL}/webhooks`,
      { ...data, StoreUUID: STORE_UUID },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error configuring webhook:", error);
    throw error;
  }
}
