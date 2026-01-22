import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Gift, Download, Share2, Loader2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";


export default function GiftCards() {
  // SEO - Página oculta de Google (noindex)
  const seoData = {
    title: "Gift Cards | Cancagua Spa",
    description: "Regala bienestar con nuestras gift cards. El regalo perfecto para quienes amas.",
    canonical: "/tienda-regalos-preview",
    noindex: true
  };

  const [montoSeleccionado, setMontoSeleccionado] = useState<string>("50000");
  const [montoPersonalizado, setMontoPersonalizado] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [nombreDestinatario, setNombreDestinatario] = useState<string>("");
  const [emailDestinatario, setEmailDestinatario] = useState<string>("");
  const [nombreRemitente, setNombreRemitente] = useState<string>("");
  const [backgroundImageId, setBackgroundImageId] = useState<string>("spa-green");
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [giftCardId, setGiftCardId] = useState<number | null>(null);

  const { data: backgroundImages } = trpc.giftCards.getBackgroundImages.useQuery();
  const createGiftCard = trpc.giftCards.create.useMutation();
  const simulatePurchase = trpc.giftCards.simulatePurchase.useMutation();
  const generatePDF = trpc.giftCards.generatePDF.useMutation();

  const montosPredefin_idos = [
    { valor: "30000", label: "$30.000" },
    { valor: "50000", label: "$50.000" },
    { valor: "75000", label: "$75.000" },
    { valor: "100000", label: "$100.000" },
    { valor: "personalizado", label: "Otro monto" },
  ];

  const beneficios = [
    "Válida por 1 año desde la compra",
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
    if (amount < 10000) {
      alert("El monto mínimo es $10.000");
      return;
    }

    if (!nombreDestinatario || !emailDestinatario) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      // Crear gift card
      const createResult = await createGiftCard.mutateAsync({
        amount,
        backgroundImage: backgroundImages?.find((img) => img.id === backgroundImageId)?.url || "",
        recipientName: nombreDestinatario,
        recipientEmail: emailDestinatario,
        senderName: nombreRemitente || undefined,
        personalMessage: mensaje || undefined,
      });

      if (!createResult.giftCard) {
        throw new Error("No se pudo crear la gift card");
      }

      // Simular compra (sin pasarela de pago)
      await simulatePurchase.mutateAsync({
        giftCardId: createResult.giftCard.id,
      });

      setGiftCardId(createResult.giftCard.id);
      setCompraExitosa(true);

      alert("¡Gift Card creada exitosamente!");
    } catch (error) {
      alert("No se pudo crear la gift card. Intenta nuevamente.");
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
                        src="/images/01_logo-cancagua.png"
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-light text-lg tracking-wide mb-2 text-[#3a3a3a]">Únete a nuestra comunidad</h3>
                    <p className="text-sm text-[#8C8C8C] mb-4">
                      Forma parte del grupo de WhatsApp de Cancagua y recibe promociones exclusivas, novedades y tips de bienestar.
                    </p>
                    <a
                      href="https://chat.whatsapp.com/GX12Kr6Q6jSDvBUfVrloNy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors font-medium text-sm"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Unirme al grupo
                    </a>
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

      <main>
        {/* Hero */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <Gift className="h-16 w-16 mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Gift Cards Cancagua
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Regala bienestar, regala experiencias únicas en la naturaleza
            </p>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                El Regalo Perfecto con Sentido
              </h2>
              <p className="text-lg text-muted-foreground">
                La tarjeta de regalo Cancagua es una excelente opción para que
                tus seres queridos elijan lo que quieran y cuando quieran.
                Pueden usarla en biopiscinas, hot tubs, masajes, clases, eventos
                o en nuestra cafetería saludable.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario de compra */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Personaliza tu Gift Card
                </h2>

                <div className="space-y-6">
                  {/* Selección de diseño */}
                  {backgroundImages && backgroundImages.length > 0 && (
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Selecciona el diseño
                      </Label>
                      <RadioGroup
                        value={backgroundImageId}
                        onValueChange={setBackgroundImageId}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      >
                        {backgroundImages.map((image) => (
                          <div key={image.id}>
                            <RadioGroupItem
                              value={image.id}
                              id={image.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={image.id}
                              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer overflow-hidden"
                            >
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-24 object-cover rounded mb-2"
                              />
                              <span className="text-xs">{image.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Selección de monto */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Selecciona el monto
                    </Label>
                    <RadioGroup
                      value={montoSeleccionado}
                      onValueChange={setMontoSeleccionado}
                      className="grid grid-cols-2 gap-4"
                    >
                      {montosPredefin_idos.map((monto) => (
                        <div key={monto.valor}>
                          <RadioGroupItem
                            value={monto.valor}
                            id={monto.valor}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={monto.valor}
                            className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            {monto.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {montoSeleccionado === "personalizado" && (
                      <div className="mt-4">
                        <Label htmlFor="monto-personalizado">
                          Ingresa el monto
                        </Label>
                        <Input
                          id="monto-personalizado"
                          type="number"
                          placeholder="Ej: 85000"
                          value={montoPersonalizado}
                          onChange={(e) => setMontoPersonalizado(e.target.value)}
                          min="10000"
                          step="1000"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Monto mínimo: $10.000
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Datos del remitente */}
                  <div>
                    <Label htmlFor="nombre-remitente">
                      Tu nombre (opcional)
                    </Label>
                    <Input
                      id="nombre-remitente"
                      placeholder="Ej: Juan Pérez"
                      value={nombreRemitente}
                      onChange={(e) => setNombreRemitente(e.target.value)}
                    />
                  </div>

                  {/* Datos del destinatario */}
                  <div>
                    <Label htmlFor="nombre-destinatario">
                      Nombre del destinatario *
                    </Label>
                    <Input
                      id="nombre-destinatario"
                      placeholder="Ej: María González"
                      value={nombreDestinatario}
                      onChange={(e) => setNombreDestinatario(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email-destinatario">
                      Email del destinatario *
                    </Label>
                    <Input
                      id="email-destinatario"
                      type="email"
                      placeholder="maria@ejemplo.com"
                      value={emailDestinatario}
                      onChange={(e) => setEmailDestinatario(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      La gift card será enviada a este correo
                    </p>
                  </div>

                  {/* Mensaje personalizado */}
                  <div>
                    <Label htmlFor="mensaje">Mensaje personalizado</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Escribe un mensaje especial para el destinatario..."
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      rows={4}
                      maxLength={300}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {mensaje.length}/300 caracteres
                    </p>
                  </div>

                  {/* Botón de compra */}
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!getMontoFinal() || createGiftCard.isPending || simulatePurchase.isPending}
                    onClick={handleComprar}
                  >
                    {createGiftCard.isPending || simulatePurchase.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Comprar Gift Card"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Compra simulada para pruebas (sin pasarela de pago)
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
                          src="/images/01_logo-cancagua.png"
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
