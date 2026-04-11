import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/8bc72ad4-5dbc-4b1b-963d-bf5da1388d24";

export default function PulsoLocalPage() {
  const planes = [
    {
      name: "Pulso Local 3",
      price: "$81.000",
      discount: "25% menos",
      sessions: 3,
    },
    {
      name: "Pulso Local 5",
      price: "$127.500",
      discount: "29% menos",
      sessions: 5,
    },
    {
      name: "Pulso Local 10",
      price: "$225.000",
      discount: "38% menos",
      sessions: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/pulso-local-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Membresía Exclusiva
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Pulso Local
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl">
            Acceso a nuestras Biopiscinas Geotermales (4 horas) con precio preferente para quienes viven entre Osorno y Puerto Montt.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="text-lg px-8 py-6">
              Quiero ser parte
            </Button>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Queremos que tu bienestar se transforme en hábito
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Por eso creamos Pulso Local — acceso a nuestras Biopiscinas Geotermales con precio preferente, disponible todos los días, pensado para quienes viven entre Osorno y Puerto Montt. Cada sesión tiene una duración de 4 horas.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Compras tus accesos una vez y los usas cuando quieras. No es necesario agendar todo de una — puedes ir reservando cada visita a tu ritmo, cuando lo necesites.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {planes.map((plan, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-primary mb-2">{plan.price}</p>
                    <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-semibold">
                      {plan.discount}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{plan.sessions} Sesiones de Biopiscinas Geotermales (4 hrs c/u)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Acceso a instalaciones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mb-16">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6">
                Comprar Pulso Local
              </Button>
            </a>
          </div>

          {/* Conditions */}
          <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">¿Cómo funciona?</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Ingresa a tu cuenta en Skedu y agenda tu próxima visita, o escríbenos al WhatsApp y te ayudamos.</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Para acceder al precio Pulso Local, debes presentar un documento que acredite tu residencia en la zona. Sin este requisito, se aplica el valor de entrada regular.</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">En días festivos y feriados nacionales se aplica un recargo del 20% sobre el valor por entrada de tu pack.</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">El programa es intransferible. El Pulso Local 10 permite que hasta 3 de los 10 accesos puedan ser usados por invitados, siempre que el titular esté presente y sea quien realice la reserva.</p>
              </li>
            </ul>

            <div className="pt-6 mt-6 border-t border-primary/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm text-muted-foreground">
              <Info className="w-6 h-6 flex-shrink-0 text-primary" />
              <div>
                <p><strong className="text-foreground">Vigente hasta:</strong> 31 de diciembre 2026</p>
                <p><strong className="text-foreground">Exclusivo para:</strong> Residentes entre Osorno y Puerto Montt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
