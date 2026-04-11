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
            alt="Programa Pulso Local"
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
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-[#2C3E35] font-light max-w-2xl mx-auto leading-relaxed">
              Pulso Local es para quienes eligen el bienestar como hábito. Mayor frecuencia, mejor precio.
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
                      <Check className="w-5 h-5 mr-3 text-[#2C3E35]" />
                      <span>{plan.sessions} Sesiones incluidas</span>
                    </li>
                    <li className="flex items-center text-[#2C3E35]/80">
                      <Check className="w-5 h-5 mr-3 text-[#2C3E35]" />
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
          <div className="bg-white/50 p-6 rounded-lg border border-[#2C3E35]/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center text-sm text-[#2C3E35]/70">
            <Info className="w-6 h-6 shrink-0 text-[#2C3E35]" />
            <div>
              <p>
                <strong>Condiciones:</strong> Vigente hasta el 31 de diciembre 2026. Exclusivo para residentes de la zona (Osorno – Puerto Montt).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
