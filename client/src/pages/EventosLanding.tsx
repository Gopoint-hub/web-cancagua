import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";

export function EventosLanding() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "social" | "corporate">("all");

  // Obtener eventos activos
  const { data: events = [], isLoading } = trpc.events.getActive.useQuery();

  // Filtrar eventos según categoría
  const filteredEvents = (events || []).filter((event: any) => {
    if (selectedCategory === "all") return true;
    // Aquí puedes agregar lógica para filtrar por tipo de evento
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("eventos.landing.title") || "Eventos & Experiencias"}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            {t("eventos.landing.subtitle") ||
              "Vive experiencias transformadoras, eventos especiales y retiros diseñados para tu bienestar"}
          </p>
        </div>
      </section>

      {/* Eventos Activos Section */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("eventos.landing.upcoming") || "Próximos Eventos"}
          </h2>
          <p className="text-gray-600 text-lg">
            {t("eventos.landing.upcoming_desc") ||
              "Descubre nuestros eventos especiales y experiencias transformadoras"}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: any) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {event.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    {event.event_date && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.event_date).toLocaleDateString("es-CL")}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Hasta {event.capacity} personas</span>
                      </div>
                    )}
                  </div>
                  <a href={event.booking_url || "#"} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      {t("common.reserve") || "Reservar"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {t("eventos.landing.no_events") || "No hay eventos disponibles en este momento"}
            </p>
          </div>
        )}
      </section>

      {/* Eventos Sociales Section */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("eventos.landing.social_events") || "Eventos Sociales"}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {t("eventos.landing.social_desc") ||
                  "Celebra momentos especiales en nuestro espacio único. Cumpleaños, aniversarios, reuniones familiares y más, en el ambiente perfecto rodeado de naturaleza."}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Cumpleaños y aniversarios",
                  "Reuniones familiares",
                  "Despedidas de soltero/a",
                  "Retiros de amigos",
                  "Eventos corporativos pequeños",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hola, me gustaría cotizar un evento social en Cancagua"
                  );
                  window.open(`https://wa.me/56984007399?text=${message}`, "_blank");
                }}
                className="gap-2"
              >
                {t("common.quote") || "Solicitar Cotización"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-24 h-24 text-amber-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 font-medium">Celebra con nosotros</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Corporativos Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg h-96 flex items-center justify-center order-2 md:order-1">
              <div className="text-center">
                <Users className="w-24 h-24 text-slate-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-600 font-medium">Experiencias corporativas</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("eventos.landing.corporate_events") || "Eventos Corporativos"}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {t("eventos.landing.corporate_desc") ||
                  "Diseñamos experiencias corporativas únicas para tu equipo. Team building, retiros de liderazgo, conferencias y eventos de incentivo en un ambiente inspirador."}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Team building y dinámicas de grupo",
                  "Retiros de liderazgo",
                  "Conferencias y workshops",
                  "Eventos de incentivo",
                  "Jornadas de bienestar corporativo",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-slate-600 rounded-full" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hola, me gustaría cotizar un evento corporativo en Cancagua"
                  );
                  window.open(`https://wa.me/56984007399?text=${message}`, "_blank");
                }}
                className="gap-2"
              >
                {t("common.quote") || "Solicitar Cotización"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("eventos.landing.cta_title") || "¿No encuentras lo que buscas?"}
          </h2>
          <p className="text-lg mb-8 text-amber-50">
            {t("eventos.landing.cta_desc") ||
              "Contáctanos para diseñar la experiencia perfecta para ti. Nuestro equipo está listo para hacer realidad tu evento."}
          </p>
          <Button
            onClick={() => {
              const message = encodeURIComponent(
                "Hola, me gustaría información sobre eventos en Cancagua"
              );
              window.open(`https://wa.me/56984007399?text=${message}`, "_blank");
            }}
            size="lg"
            className="gap-2 bg-white text-amber-600 hover:bg-gray-100"
          >
            {t("common.contact") || "Contactar"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
