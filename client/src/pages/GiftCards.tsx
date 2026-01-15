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


export default function GiftCards() {

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
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
