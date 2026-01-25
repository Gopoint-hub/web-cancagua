import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Clock, AlertCircle, Download, Share2, Loader2, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";

type PaymentStatus = "loading" | "approved" | "rejected" | "aborted" | "timeout" | "error";

interface PaymentResult {
  success: boolean;
  status: string;
  giftCardId?: number;
  giftCardCode?: string;
  amount?: number;
  message: string;
}

export default function GiftCardPaymentResult() {
  const [location] = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("loading");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const confirmPayment = trpc.giftCards.confirmPayment.useMutation();
  const generatePDF = trpc.giftCards.generatePDF.useMutation();

  // Parsear query params manualmente ya que wouter no tiene useSearchParams
  const getSearchParams = () => {
    const search = window.location.search;
    return new URLSearchParams(search);
  };

  // SEO - Página oculta de Google (noindex)
  const seoData = {
    title: "Resultado del Pago | Gift Cards Cancagua",
    description: "Resultado de tu compra de Gift Card en Cancagua.",
    canonical: "/gift-cards/payment-result",
    noindex: true
  };

  useEffect(() => {
    const processPayment = async () => {
      // Obtener parámetros de WebPay
      const searchParams = getSearchParams();
      const token_ws = searchParams.get("token_ws");
      const TBK_TOKEN = searchParams.get("TBK_TOKEN");
      const TBK_ORDEN_COMPRA = searchParams.get("TBK_ORDEN_COMPRA");
      const TBK_ID_SESION = searchParams.get("TBK_ID_SESION");

      try {
        const result = await confirmPayment.mutateAsync({
          token_ws: token_ws || undefined,
          TBK_TOKEN: TBK_TOKEN || undefined,
          TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA || undefined,
          TBK_ID_SESION: TBK_ID_SESION || undefined,
        });

        setPaymentResult(result);
        setPaymentStatus(result.status as PaymentStatus);
      } catch (error: any) {
        console.error("Error procesando pago:", error);
        setPaymentResult({
          success: false,
          status: "error",
          message: error.message || "Error al procesar el pago",
        });
        setPaymentStatus("error");
      }
    };

    processPayment();
  }, []);

  const formatPrecio = (valor: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  const handleDescargarPDF = async () => {
    if (!paymentResult?.giftCardId) return;

    try {
      const result = await generatePDF.mutateAsync({ giftCardId: paymentResult.giftCardId });
      
      // Convertir base64 a blob y descargar
      const byteCharacters = atob(result.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("No se pudo descargar el PDF. Intenta nuevamente.");
    }
  };

  const handleCompartirWhatsApp = () => {
    if (!paymentResult?.amount || !paymentResult?.giftCardCode) return;
    
    const message = `🎁 ¡Gift Card de Cancagua!

💵 Monto: ${formatPrecio(paymentResult.amount)}
🎫 Código: ${paymentResult.giftCardCode}

Puedes usar esta gift card en cualquier servicio de Cancagua Spa & Retreat Center.

🌍 Reserva en: https://cancagua.cl`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case "loading":
        return (
          <div className="text-center py-12">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Procesando tu pago...</h1>
            <p className="text-muted-foreground">
              Por favor espera mientras confirmamos tu transacción con WebPay.
            </p>
          </div>
        );

      case "approved":
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
              <Check className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
            <p className="text-muted-foreground mb-8">
              Tu Gift Card ha sido creada y enviada al destinatario.
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Monto de la Gift Card</p>
                    <p className="text-4xl font-bold text-primary">
                      {paymentResult?.amount ? formatPrecio(paymentResult.amount) : "-"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Código de la Gift Card</p>
                    <p className="text-xl font-mono font-bold">
                      {paymentResult?.giftCardCode || "-"}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-left">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Hemos enviado la Gift Card al email del destinatario. También puedes descargarla o compartirla usando los botones de abajo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleDescargarPDF}
                disabled={generatePDF.isPending}
              >
                {generatePDF.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar PDF
                  </>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={handleCompartirWhatsApp}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir por WhatsApp
              </Button>

              <Link to="/gift-cards" className="block">
                <Button size="lg" variant="ghost" className="w-full">
                  Comprar otra Gift Card
                </Button>
              </Link>
            </div>
          </div>
        );

      case "rejected":
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6">
              <X className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pago Rechazado</h1>
            <p className="text-muted-foreground mb-8">
              {paymentResult?.message || "Tu pago no pudo ser procesado. Por favor, intenta nuevamente."}
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-left">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    <p className="font-medium mb-1">Posibles razones del rechazo:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fondos insuficientes</li>
                      <li>Tarjeta bloqueada o vencida</li>
                      <li>Límite de compra excedido</li>
                      <li>Datos de la tarjeta incorrectos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link to="/gift-cards" className="block">
                <Button size="lg" className="w-full">
                  Intentar nuevamente
                </Button>
              </Link>

              <Link to="/" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        );

      case "aborted":
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-6">
              <X className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pago Cancelado</h1>
            <p className="text-muted-foreground mb-8">
              Has cancelado el proceso de pago. No se ha realizado ningún cargo.
            </p>

            <div className="space-y-3">
              <Link to="/gift-cards" className="block">
                <Button size="lg" className="w-full">
                  Intentar nuevamente
                </Button>
              </Link>

              <Link to="/" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        );

      case "timeout":
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 mb-6">
              <Clock className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Tiempo Agotado</h1>
            <p className="text-muted-foreground mb-8">
              El tiempo para completar el pago ha expirado. Por favor, intenta nuevamente.
            </p>

            <div className="space-y-3">
              <Link to="/gift-cards" className="block">
                <Button size="lg" className="w-full">
                  Intentar nuevamente
                </Button>
              </Link>

              <Link to="/" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        );

      case "error":
      default:
        return (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6">
              <AlertCircle className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Error en el Pago</h1>
            <p className="text-muted-foreground mb-8">
              {paymentResult?.message || "Ocurrió un error al procesar tu pago. Por favor, intenta nuevamente."}
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-left">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Si el problema persiste, por favor contáctanos a{" "}
                    <a href="mailto:eventos@cancagua.cl" className="underline font-medium">
                      eventos@cancagua.cl
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link to="/gift-cards" className="block">
                <Button size="lg" className="w-full">
                  Intentar nuevamente
                </Button>
              </Link>

              <Link to="/" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead {...seoData} />
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-lg">
          {renderContent()}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
