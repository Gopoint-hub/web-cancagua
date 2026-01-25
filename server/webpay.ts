/**
 * WebPay Plus Integration Service
 * 
 * Este módulo maneja la integración con la pasarela de pago WebPay Plus de Transbank.
 * Soporta tanto el ambiente de integración (pruebas) como producción.
 */

import { WebpayPlus, Options, IntegrationApiKeys, IntegrationCommerceCodes, Environment } from "transbank-sdk";

// Configuración del ambiente
const isProduction = process.env.WEBPAY_ENVIRONMENT === "production";

// Configurar opciones según el ambiente
const getWebpayOptions = (): Options => {
  if (isProduction) {
    // Producción: usar credenciales del .env
    const commerceCode = process.env.WEBPAY_COMMERCE_CODE;
    const apiKey = process.env.WEBPAY_API_KEY;
    
    if (!commerceCode || !apiKey) {
      throw new Error("WebPay: Credenciales de producción no configuradas");
    }
    
    return new Options(commerceCode, apiKey, Environment.Production);
  } else {
    // Integración: usar credenciales de prueba
    return new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    );
  }
};

/**
 * Crear una nueva transacción de WebPay Plus
 * 
 * @param buyOrder - Identificador único de la orden de compra
 * @param sessionId - ID de sesión del usuario
 * @param amount - Monto a cobrar en pesos chilenos (entero)
 * @param returnUrl - URL a la que WebPay redirigirá después del pago
 * @returns Token y URL para redirigir al usuario
 */
export async function createTransaction(
  buyOrder: string,
  sessionId: string,
  amount: number,
  returnUrl: string
): Promise<{ token: string; url: string }> {
  try {
    const options = getWebpayOptions();
    const tx = new WebpayPlus.Transaction(options);
    
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    
    return {
      token: response.token,
      url: response.url,
    };
  } catch (error: any) {
    console.error("WebPay createTransaction error:", error);
    throw new Error(`Error al crear transacción WebPay: ${error.message}`);
  }
}

/**
 * Confirmar una transacción de WebPay Plus
 * 
 * @param token - Token de la transacción recibido en el callback
 * @returns Detalles de la transacción confirmada
 */
export async function commitTransaction(token: string): Promise<{
  vci: string;
  amount: number;
  status: string;
  buyOrder: string;
  sessionId: string;
  cardNumber: string;
  accountingDate: string;
  transactionDate: string;
  authorizationCode: string;
  paymentTypeCode: string;
  responseCode: number;
  installmentsAmount: number | null;
  installmentsNumber: number | null;
}> {
  try {
    const options = getWebpayOptions();
    const tx = new WebpayPlus.Transaction(options);
    
    const response = await tx.commit(token);
    
    return {
      vci: response.vci,
      amount: response.amount,
      status: response.status,
      buyOrder: response.buy_order,
      sessionId: response.session_id,
      cardNumber: response.card_detail?.card_number || "",
      accountingDate: response.accounting_date,
      transactionDate: response.transaction_date,
      authorizationCode: response.authorization_code,
      paymentTypeCode: response.payment_type_code,
      responseCode: response.response_code,
      installmentsAmount: response.installments_amount,
      installmentsNumber: response.installments_number,
    };
  } catch (error: any) {
    console.error("WebPay commitTransaction error:", error);
    throw new Error(`Error al confirmar transacción WebPay: ${error.message}`);
  }
}

/**
 * Obtener el estado de una transacción
 * 
 * @param token - Token de la transacción
 * @returns Estado actual de la transacción
 */
export async function getTransactionStatus(token: string) {
  try {
    const options = getWebpayOptions();
    const tx = new WebpayPlus.Transaction(options);
    
    const response = await tx.status(token);
    
    return {
      vci: response.vci,
      amount: response.amount,
      status: response.status,
      buyOrder: response.buy_order,
      sessionId: response.session_id,
      cardNumber: response.card_detail?.card_number || "",
      accountingDate: response.accounting_date,
      transactionDate: response.transaction_date,
      authorizationCode: response.authorization_code,
      paymentTypeCode: response.payment_type_code,
      responseCode: response.response_code,
    };
  } catch (error: any) {
    console.error("WebPay getTransactionStatus error:", error);
    throw new Error(`Error al obtener estado de transacción WebPay: ${error.message}`);
  }
}

/**
 * Verificar si una transacción fue exitosa
 * 
 * @param responseCode - Código de respuesta de WebPay
 * @param status - Estado de la transacción
 * @returns true si la transacción fue aprobada
 */
export function isTransactionApproved(responseCode: number, status: string): boolean {
  return responseCode === 0 && status === "AUTHORIZED";
}

/**
 * Generar un buyOrder único para Gift Cards
 * 
 * @param giftCardId - ID de la gift card
 * @returns Orden de compra única
 */
export function generateBuyOrder(giftCardId: number): string {
  const timestamp = Date.now();
  return `GC-${giftCardId}-${timestamp}`;
}

/**
 * Generar un sessionId único
 * 
 * @returns ID de sesión único
 */
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
