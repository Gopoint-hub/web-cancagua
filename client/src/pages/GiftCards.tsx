import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Gift, Download, Share2, Loader2, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";


export default function GiftCards() {
  // SEO - Página pública de Gift Cards
  const seoData = {
    title: "Gift Cards | Cancagua Spa - Regala Bienestar",
    description: "Regala bienestar con nuestras gift cards de Cancagua Spa. El regalo perfecto para quienes amas. Válidas por 3 meses, entrega inmediata por email.",
    canonical: "/gift-cards",
    noindex: false
  };

  const [montoSeleccionado, setMontoSeleccionado] = useState<string>("50000");
  const [montoPersonalizado, setMontoPersonalizado] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [nombreDestinatario, setNombreDestinatario] = useState<string>("");
  const [emailDestinatario, setEmailDestinatario] = useState<string>("");
  const [nombreRemitente, setNombreRemitente] = useState<string>("");
  const [emailRemitente, setEmailRemitente] = useState<string>("");
  const [backgroundImageId, setBackgroundImageId] = useState<string>("spa-green");
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [giftCardId, setGiftCardId] = useState<number | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { data: backgroundImages } = trpc.giftCards.getBackgroundImages.useQuery();
  const initiatePayment = trpc.giftCards.initiatePayment.useMutation();
  const generatePDF = trpc.giftCards.generatePDF.useMutation();

  const montosPredefin_idos = [
    { valor: "30000", label: "$30.000" },
    { valor: "50000", label: "$50.000" },
    { valor: "75000", label: "$75.000" },
    { valor: "100000", label: "$100.000" },
    { valor: "personalizado", label: "Otro monto" },
  ];

  const beneficios = [
    "Válida por 3 meses desde la compra",
    "Puede usarse en cualquier servicio de Cancagua",
    "Transferible a otra persona",
    "Entrega inmediata por email",
    "Diseño digital exclusivo",
    "Sin costos adicionales",
  ];

  const getMontoFinal = () => {
    if (montoSeleccionado === "personalizado") {
      return montoPersonalizado ? parseInt(montoPersonalizado) : 0;
    }
    return parseInt(montoSeleccionado);
  };

  const formatPrecio = (valor: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(valor);
  };

  const handleComprar = async () => {
    const amount = getMontoFinal();
    if (amount < 5000) {
      alert("El monto mínimo es $5.000");
      return;
    }

    if (!nombreDestinatario || !emailDestinatario) {
      alert("Por favor completa el nombre y email del destinatario");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailDestinatario)) {
      alert("Por favor ingresa un email válido para el destinatario");
      return;
    }

    if (emailRemitente && !emailRegex.test(emailRemitente)) {
      alert("Por favor ingresa un email válido para el remitente");
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Iniciar transacción de pago con WebPay
      const result = await initiatePayment.mutateAsync({
        amount,
        backgroundImage: backgroundImages?.find((img) => img.id === backgroundImageId)?.url || "",
        recipientName: nombreDestinatario,
        recipientEmail: emailDestinatario,
        senderName: nombreRemitente || undefined,
        senderEmail: emailRemitente || undefined,
        personalMessage: mensaje || undefined,
        deliveryMethod: "email",
      });

      if (result.success && result.paymentUrl) {
        // Redirigir a WebPay
        window.location.href = `${result.paymentUrl}?token_ws=${result.token}`;
      } else {
        throw new Error("No se pudo iniciar el pago");
      }
    } catch (error: any) {
      setIsProcessingPayment(false);
      alert(error.message || "No se pudo iniciar el pago. Intenta nuevamente.");
    }
  };

  const handleDescargarPDF = async () => {
    if (!giftCardId) return;

    try {
      const result = await generatePDF.mutateAsync({ giftCardId });
      
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

      // PDF descargado exitosamente
    } catch (error) {
      alert("No se pudo descargar el PDF. Intenta nuevamente.");
    }
  };

  const handleCompartirWhatsApp = () => {
    const amount = getMontoFinal();
    const message = `🎁 ¡Te han enviado una Gift Card de Cancagua!

${nombreRemitente ? `De: ${nombreRemitente}` : ""}
${nombreDestinatario ? `Para: ${nombreDestinatario}` : ""}

💵 Monto: ${formatPrecio(amount)}

${mensaje ? `💬 Mensaje: "${mensaje}"` : ""}

Puedes usar esta gift card en cualquier servicio de Cancagua Spa & Retreat Center.

🌍 Reserva en: https://cancagua.cl`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const selectedBackgroundImage = backgroundImages?.find((img) => img.id === backgroundImageId);

  if (compraExitosa) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead {...seoData} />
        <Navbar />

        <main className="flex-1 py-16 md:py-24">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold mb-2">¡Gift Card Creada!</h1>
              <p className="text-muted-foreground">
                Tu gift card ha sido generada exitosamente
              </p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* Preview de la gift card */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  {selectedBackgroundImage && (
                    <img
                      src={selectedBackgroundImage.url}
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
                        {formatPrecio(getMontoFinal())}
                      </p>
                      {nombreDestinatario && (
                        <p className="text-sm mt-2">Para: {nombreDestinatario}</p>
                      )}
                    </div>
                  </div>
                </div>

                {mensaje && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      "{mensaje}"
                    </p>
                  </div>
                )}

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
                    onClick={() => {
                      setCompraExitosa(false);
                      setGiftCardId(null);
                      setMensaje("");
                      setNombreDestinatario("");
                      setEmailDestinatario("");
                      setNombreRemitente("");
                      setEmailRemitente("");
                    }}
                  >
                    Crear otra Gift Card
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
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead {...seoData} />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1775605436/cancagua/images/giftcards-hero-new.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6 backdrop-blur-sm">
                <Gift className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Regala Bienestar
              </h1>
              <p className="text-lg text-white/90 drop-shadow-sm">
                Sorprende a quienes más quieres con una experiencia única de
                relajación y conexión con la naturaleza en Cancagua.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario de compra */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Formulario */}
              <div className="space-y-8">
                {/* Selección de monto */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">1. Elige el monto</h2>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={montoSeleccionado}
                      onValueChange={setMontoSeleccionado}
                      className="grid grid-cols-2 md:grid-cols-3 gap-3"
                    >
                      {montosPredefin_idos.map((monto) => (
                        <Label
                          key={monto.valor}
                          htmlFor={monto.valor}
                          className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            montoSeleccionado === monto.valor
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem
                            value={monto.valor}
                            id={monto.valor}
                            className="sr-only"
                          />
                          <span className="font-medium">{monto.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>

                    {montoSeleccionado === "personalizado" && (
                      <div className="mt-4">
                        <Label htmlFor="montoPersonalizado">
                          Ingresa el monto (mínimo $5.000)
                        </Label>
                        <Input
                          id="montoPersonalizado"
                          type="number"
                          min="5000"
                          step="1000"
                          placeholder="Ej: 45000"
                          value={montoPersonalizado}
                          onChange={(e) =>
                            setMontoPersonalizado(e.target.value)
                          }
                          className="mt-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Selección de diseño */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">2. Elige el diseño</h2>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={backgroundImageId}
                      onValueChange={setBackgroundImageId}
                      className="grid grid-cols-2 md:grid-cols-3 gap-3"
                    >
                      {backgroundImages?.map((img) => (
                        <Label
                          key={img.id}
                          htmlFor={img.id}
                          className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                            backgroundImageId === img.id
                              ? "ring-2 ring-primary ring-offset-2"
                              : "hover:opacity-80"
                          }`}
                        >
                          <RadioGroupItem
                            value={img.id}
                            id={img.id}
                            className="sr-only"
                          />
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                            <span className="text-white text-xs font-medium">
                              {img.name}
                            </span>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Datos del destinatario */}
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">
                      3. Datos del destinatario
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="nombreDestinatario">
                        Nombre del destinatario *
                      </Label>
                      <Input
                        id="nombreDestinatario"
                        placeholder="¿Para quién es la gift card?"
                        value={nombreDestinatario}
                        onChange={(e) => setNombreDestinatario(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailDestinatario">
                        Email del destinatario *
                      </Label>
                      <Input
                        id="emailDestinatario"
                        type="email"
                        placeholder="email@ejemplo.com"
                        value={emailDestinatario}
                        onChange={(e) => setEmailDestinatario(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        La gift card será enviada a este email
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="nombreRemitente">
                        Tu nombre (opcional)
                      </Label>
                      <Input
                        id="nombreRemitente"
                        placeholder="¿De parte de quién?"
                        value={nombreRemitente}
                        onChange={(e) => setNombreRemitente(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailRemitente">
                        Tu email (opcional)
                      </Label>
                      <Input
                        id="emailRemitente"
                        type="email"
                        placeholder="tu@email.com"
                        value={emailRemitente}
                        onChange={(e) => setEmailRemitente(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recibirás una copia de la gift card
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="mensaje">Mensaje personalizado</Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Escribe un mensaje especial para el destinatario..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        maxLength={150}
                        className="mt-2"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-right">
                        {mensaje.length}/150 caracteres
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Información de pago y botón */}
                <div className="space-y-4">
                  {/* Aviso de pago seguro */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                    <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100">Pago 100% seguro con WebPay</p>
                      <p className="text-blue-700 dark:text-blue-300 mt-1">
                        Serás redirigido a la plataforma segura de Transbank para completar tu pago con tarjeta de crédito o débito.
                      </p>
                    </div>
                  </div>

                  {/* Aviso de envío */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900 dark:text-amber-100">Entrega inmediata</p>
                      <p className="text-amber-700 dark:text-amber-300 mt-1">
                        Una vez confirmado el pago, la gift card será enviada automáticamente al email del destinatario.
                      </p>
                    </div>
                  </div>

                  {/* Botón de compra */}
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!getMontoFinal() || getMontoFinal() < 5000 || initiatePayment.isPending || isProcessingPayment}
                    onClick={handleComprar}
                  >
                    {initiatePayment.isPending || isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pagar {getMontoFinal() > 0 ? formatPrecio(getMontoFinal()) : ""} con WebPay
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al hacer clic en "Pagar", serás redirigido a WebPay de Transbank
                  </p>
                </div>
              </div>

              {/* Preview y resumen */}
              <div className="space-y-6">
                {/* Preview de la gift card */}
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    {selectedBackgroundImage && (
                      <img
                        src={selectedBackgroundImage.url}
                        alt="Gift Card Preview"
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
                          {getMontoFinal() > 0
                            ? formatPrecio(getMontoFinal())
                            : "$0"}
                        </p>
                        {nombreDestinatario && (
                          <p className="text-sm mt-2">Para: {nombreDestinatario}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {mensaje && (
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground italic">
                        "{mensaje}"
                      </p>
                    </CardContent>
                  )}
                </Card>

                {/* Resumen */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-lg">Resumen</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monto:</span>
                      <span className="font-semibold">
                        {getMontoFinal() > 0
                          ? formatPrecio(getMontoFinal())
                          : "$0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diseño:</span>
                      <span className="font-semibold">
                        {selectedBackgroundImage?.name || "Clásico"}
                      </span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>
                          {getMontoFinal() > 0
                            ? formatPrecio(getMontoFinal())
                            : "$0"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficios */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-lg">Beneficios</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Logo de WebPay */}
                <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground">Pago seguro con</span>
                  <img 
                    src="https://www.transbankdevelopers.cl/public/library/img/svg/logo_webpay.svg" 
                    alt="WebPay" 
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
