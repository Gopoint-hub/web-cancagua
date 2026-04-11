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
    <div className="min-h-screen bg-[#F1E7D9]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/pulso-local-hero.jpg"
            alt="Pulso Local"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 uppercase tracking-wider">
            Pulso Local
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">
            Bienestar continuo para quienes viven aquí
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <p className="text-xl md:text-2xl text-[#2C3E35] font-light max-w-3xl mx-auto leading-relaxed">
              <span className="text-2xl">🌿</span> Queremos que tu bienestar se transforme en hábito. <span className="text-2xl">🌿</span>
            </p>
            <p className="text-lg text-[#2C3E35]/80 max-w-3xl mx-auto leading-relaxed">
              Por eso creamos Pulso Local — acceso a nuestras Biopiscinas Geotermales con precio preferente, disponible todos los días, pensado para quienes viven entre Osorno y Puerto Montt. Cada sesión tiene una duración de 4 horas.
            </p>
            <p className="text-lg text-[#2C3E35]/80 max-w-3xl mx-auto leading-relaxed">
              Compras tus accesos una vez y los usas cuando quieras. No es necesario agendar todo de una — puedes ir reservando cada visita a tu ritmo, cuando lo necesites.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {planes.map((plan, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur border-[#2C3E35]/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-serif text-[#2C3E35]">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <p className="text-4xl font-light text-[#2C3E35] mb-2">{plan.price}</p>
                    <span className="inline-block bg-[#2C3E35] text-white text-sm px-3 py-1 rounded-full font-medium">
                      {plan.discount}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center text-[#2C3E35]/80">
                      <Check className="w-5 h-5 mr-3 text-[#2C3E35] shrink-0" />
                      <span>{plan.sessions} Sesiones de Biopiscinas Geotermales (4 hrs c/u)</span>
                    </li>
                    <li className="flex items-center text-[#2C3E35]/80">
                      <Check className="w-5 h-5 mr-3 text-[#2C3E35] shrink-0" />
                      <span>Acceso a instalaciones</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mb-16">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#2C3E35] hover:bg-[#1A2520] text-white px-8 py-6 text-lg rounded-none uppercase tracking-widest transition-colors duration-300">
                Quiero ser parte
              </Button>
            </a>
          </div>

          {/* Conditions */}
          <div className="bg-white/50 p-8 rounded-lg border border-[#2C3E35]/10 space-y-6 text-[#2C3E35]/80">
            <h3 className="text-2xl font-serif text-[#2C3E35] mb-4">¿Cómo funciona?</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-xl">📌</span>
                <p>Ingresa a tu cuenta en Skedu y agenda tu próxima visita, o escríbenos al WhatsApp y te ayudamos.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">📌</span>
                <p>Para acceder al precio Pulso Local, debes presentar un documento que acredite tu residencia en la zona. Sin este requisito, se aplica el valor de entrada regular.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">📌</span>
                <p>En días festivos y feriados nacionales se aplica un recargo del 20% sobre el valor por entrada de tu pack.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">📌</span>
                <p>El programa es intransferible. El Pulso Local 10 permite que hasta 3 de los 10 accesos puedan ser usados por invitados, siempre que el titular esté presente y sea quien realice la reserva.</p>
              </li>
            </ul>

            <div className="pt-6 mt-6 border-t border-[#2C3E35]/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm">
              <Info className="w-6 h-6 shrink-0 text-[#2C3E35]" />
              <div>
                <p><strong>Vigente hasta:</strong> 31 de diciembre 2026</p>
                <p><strong>Exclusivo para:</strong> Residentes entre Osorno y Puerto Montt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
