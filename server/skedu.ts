import axios from "axios";

const SKEDU_API_BASE_URL = "https://api.skedu.com/v1";

// Las credenciales se configurarán mediante variables de entorno
const getHeaders = () => {
  const appId = process.env.SKEDU_APP_ID;
  const secret = process.env.SKEDU_SECRET;

  if (!appId || !secret) {
    throw new Error("Skedu API credentials not configured");
  }

  return {
    "App-ID": appId,
    Secret: secret,
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
      }
    );
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching service ${serviceId}:`, error);
    throw error;
  }
}

/**
 * Obtener lista de eventos desde Skedu
 */
export async function getSkeduEvents(params?: {
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  try {
    const response = await axios.get(`${SKEDU_API_BASE_URL}/events`, {
      headers: getHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching events:", error);
    throw error;
  }
}

/**
 * Obtener un evento específico por ID
 */
export async function getSkeduEventById(eventId: string) {
  try {
    const response = await axios.get(
      `${SKEDU_API_BASE_URL}/events/${eventId}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching event ${eventId}:`, error);
    throw error;
  }
}

/**
 * Obtener lista de clientes desde Skedu
 */
export async function getSkeduClients(params?: {
  page?: number;
  perPage?: number;
  email?: string;
}) {
  try {
    const response = await axios.get(`${SKEDU_API_BASE_URL}/clients`, {
      headers: getHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    console.error("[Skedu] Error fetching clients:", error);
    throw error;
  }
}

/**
 * Obtener un cliente específico por ID
 */
export async function getSkeduClientById(clientId: string) {
  try {
    const response = await axios.get(
      `${SKEDU_API_BASE_URL}/clients/${clientId}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`[Skedu] Error fetching client ${clientId}:`, error);
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
      `${SKEDU_API_BASE_URL}/bookings`,
      data,
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
 * Verificar disponibilidad de un servicio o evento
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
        params,
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
      data,
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
