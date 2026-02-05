import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Loader2, Download, Share2, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { usePageContext } from "vike-react/usePageContext";

export default function PaymentResultPage() {
  const pageContext = usePageContext();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [giftCardData, setGiftCardData] = useState<any>(null);

  const confirmPayment = trpc.giftCards.confirmPayment.useMutation();
  const generatePDF = trpc.giftCards.generatePDF.useMutation();

  useEffect(() => {
    const confirmWebPayTransaction = async () => {
      // Obtener token de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token_ws");

      if (!token) {
        setStatus("error");
        setErrorMessage("No se recibió el token de la transacción");
        return;
      }

      try {
        // Confirmar pago con WebPay
        const result = await confirmPayment.mutateAsync({ token });

        if (result.success && result.giftCard) {
          setStatus("success");
          setGiftCardData(result.giftCard);
        } else {
          setStatus("error");
          setErrorMessage(result.message || "No se pudo confirmar la transacción");
        }
      } catch (error: any) {
        setStatus("error");
        setErrorMessage(error.message || "Error al procesar el pago");
      }
    };

    confirmWebPayTransaction();
  }, []);

  const handleDescargarPDF = async () => {
    if (!giftCardData?.id) return;

    try {
      const result = await generatePDF.mutateAsync({ giftCardId: giftCardData.id });

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
    if (!giftCardData) return;

    const message = `🎁 ¡Te han enviado una Gift Card de Cancagua!

${giftCardData.senderName ? `De: ${giftCardData.senderName}` : ""}
${giftCardData.recipientName ? `Para: ${giftCardData.recipientName}` : ""}

💵 Monto: ${formatPrecio(giftCardData.amount)}

${giftCardData.personalMessage ? `💬 Mensaje: "${giftCardData.personalMessage}"` : ""}

Puedes usar esta gift card en cualquier servicio de Cancagua Spa & Retreat Center.

🌍 Reserva en: https://cancagua.cl`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatPrecio = (valor: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  // Estado de carga
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Confirmando tu pago...</h2>
          <p className="text-muted-foreground">
            Por favor espera mientras procesamos tu transacción
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
              <X className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Error en el pago</h1>
            <p className="text-muted-foreground">
              {errorMessage || "Hubo un problema al procesar tu pago"}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900 dark:text-amber-100">¿Qué puedes hacer?</p>
                  <ul className="text-amber-700 dark:text-amber-300 mt-2 space-y-1 list-disc list-inside">
                    <li>Verifica que tu tarjeta tenga fondos suficientes</li>
                    <li>Intenta nuevamente con otra tarjeta</li>
                    <li>Contacta a tu banco si el problema persiste</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href="/gift-cards">
                    Volver a intentar
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href="/contacto">
                    Contactar soporte
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Estado de éxito
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">¡Pago exitoso!</h1>
          <p className="text-muted-foreground">
            Tu gift card ha sido creada y enviada por email
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Preview de la gift card */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              {giftCardData?.backgroundImage && (
                <img
                  src={giftCardData.backgroundImage}
                  alt="Gift Card"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30 p-8 flex flex-col justify-between text-white">
                <div>
                  <img
                    src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770308861/cancagua/images/01_logo-cancagua.png"
                    alt="Cancagua"
                    className="h-12 w-auto mb-4 brightness-0 invert"
                  />
                  <p className="text-sm opacity-90">Gift Card</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">
                    {giftCardData?.amount ? formatPrecio(giftCardData.amount) : "$0"}
                  </p>
                  {giftCardData?.recipientName && (
                    <p className="text-sm mt-2">Para: {giftCardData.recipientName}</p>
                  )}
                </div>
              </div>
            </div>

            {giftCardData?.personalMessage && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground italic">
                  "{giftCardData.personalMessage}"
                </p>
              </div>
            )}

            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Email enviado a:</strong> {giftCardData?.recipientEmail}
                {giftCardData?.senderEmail && (
                  <><br /><strong>Copia enviada a:</strong> {giftCardData.senderEmail}</>
                )}
              </p>
            </div>

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

              <Button
                size="lg"
                variant="ghost"
                className="w-full"
                asChild
              >
                <a href="/gift-cards">
                  Crear otra Gift Card
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invitación al grupo de WhatsApp */}
        <Card className="mt-8 border-[#25D366]/30 bg-[#25D366]/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">¿Quieres recibir ofertas exclusivas?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Únete a nuestra comunidad de WhatsApp y recibe promociones especiales, novedades y descuentos exclusivos.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                  onClick={() => window.open("https://chat.whatsapp.com/LYaRz1TQqKv9Ej4qNuNkfZ", "_blank")}
                >
                  Unirme al grupo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
