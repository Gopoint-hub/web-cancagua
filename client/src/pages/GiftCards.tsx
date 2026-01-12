import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Gift, Heart, Mail } from "lucide-react";
import { useState } from "react";

export default function GiftCards() {
  const [montoSeleccionado, setMontoSeleccionado] = useState<string>("50000");
  const [montoPersonalizado, setMontoPersonalizado] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [nombreDestinatario, setNombreDestinatario] = useState<string>("");
  const [emailDestinatario, setEmailDestinatario] = useState<string>("");

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

                  {/* Datos del destinatario */}
                  <div>
                    <Label htmlFor="nombre-destinatario">
                      Nombre del destinatario
                    </Label>
                    <Input
                      id="nombre-destinatario"
                      placeholder="Ej: María González"
                      value={nombreDestinatario}
                      onChange={(e) => setNombreDestinatario(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email-destinatario">
                      Email del destinatario
                    </Label>
                    <Input
                      id="email-destinatario"
                      type="email"
                      placeholder="maria@ejemplo.com"
                      value={emailDestinatario}
                      onChange={(e) => setEmailDestinatario(e.target.value)}
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
                  <Button size="lg" className="w-full" disabled={!getMontoFinal()}>
                    Comprar Gift Card
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Serás redirigido a la pasarela de pago segura
                  </p>
                </div>
              </div>

              {/* Preview y resumen */}
              <div className="space-y-6">
                {/* Preview de la gift card */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-primary to-secondary p-8 flex flex-col justify-between text-white">
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
                      <span className="text-muted-foreground">
                        Costo de envío:
                      </span>
                      <span className="font-semibold text-primary">Gratis</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-xl">
                        {getMontoFinal() > 0
                          ? formatPrecio(getMontoFinal())
                          : "$0"}
                      </span>
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
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {beneficio}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">
              ¿Cómo Funciona?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">1. Personaliza</h3>
                  <p className="text-sm text-muted-foreground">
                    Elige el monto y escribe un mensaje especial
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">2. Envío</h3>
                  <p className="text-sm text-muted-foreground">
                    El destinatario recibe la gift card por email
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">3. Disfruta</h3>
                  <p className="text-sm text-muted-foreground">
                    Puede usarla en cualquier servicio de Cancagua
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Términos */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Términos y Condiciones</h2>
              <div className="prose prose-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>
                    Las gift cards tienen una validez de 1 año desde la fecha de
                    compra
                  </li>
                  <li>
                    Pueden ser utilizadas en cualquier servicio de Cancagua:
                    biopiscinas, hot tubs, masajes, clases, eventos y cafetería
                  </li>
                  <li>
                    Son transferibles a otra persona sin costo adicional
                  </li>
                  <li>No son reembolsables ni canjeables por dinero en efectivo</li>
                  <li>
                    Si el monto de la compra es menor al valor de la gift card,
                    el saldo restante queda disponible para futuras compras
                  </li>
                  <li>
                    Si el monto de la compra es mayor, la diferencia debe pagarse
                    con otro medio de pago
                  </li>
                  <li>
                    La gift card será enviada al email del destinatario en un
                    plazo máximo de 24 horas
                  </li>
                  <li>
                    Para reservar con gift card, contactar directamente a Cancagua
                  </li>
                </ul>
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
