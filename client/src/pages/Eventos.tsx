import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

export default function Eventos() {
  const eventos = [
    {
      id: 1,
      titulo: "Sonoterapia con Cuencos Tibetanos",
      descripcion: "Sesión de sanación sonora con cuencos tibetanos en un ambiente natural único.",
      fecha: "2026-01-25",
      hora: "19:00",
      duracion: "90 minutos",
      cupos: 15,
      cuposDisponibles: 8,
      precio: "$25.000",
      imagen: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/07_eventos-hero.jpg",
      categoria: "Terapias",
    },
    {
      id: 2,
      titulo: "Taller de Yoga y Meditación",
      descripcion: "Práctica intensiva de yoga y meditación con vista al lago. Todos los niveles.",
      fecha: "2026-02-01",
      hora: "10:00",
      duracion: "3 horas",
      cupos: 20,
      cuposDisponibles: 12,
      precio: "$30.000",
      imagen: "/images/12_yoga-clases.webp",
      categoria: "Movimiento",
    },
    {
      id: 3,
      titulo: "Concierto Acústico al Atardecer",
      descripcion: "Música en vivo con artistas locales mientras disfrutas de las biopiscinas.",
      fecha: "2026-02-08",
      hora: "18:30",
      duracion: "2 horas",
      cupos: 30,
      cuposDisponibles: 5,
      precio: "$20.000",
      imagen: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/06_cafeteria-hero.jpg",
      categoria: "Música",
    },
    {
      id: 4,
      titulo: "Retiro de Fin de Semana",
      descripcion: "Retiro completo de bienestar: yoga, meditación, terapias y alimentación consciente.",
      fecha: "2026-02-15",
      hora: "09:00",
      duracion: "2 días",
      cupos: 12,
      cuposDisponibles: 12,
      precio: "$180.000",
      imagen: "/images/10_cancagua-header.jpg",
      categoria: "Retiros",
    },
  ];

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCuposStatus = (disponibles: number, total: number) => {
    const porcentaje = (disponibles / total) * 100;
    if (porcentaje === 0) return { text: "Agotado", variant: "destructive" as const };
    if (porcentaje <= 20) return { text: "Últimos cupos", variant: "destructive" as const };
    if (porcentaje <= 50) return { text: "Cupos limitados", variant: "secondary" as const };
    return { text: "Cupos disponibles", variant: "default" as const };
  };

  return (
    <AutoTranslateProvider pageId="eventos">
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/07_eventos-hero.jpg)" }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <T>Eventos y Talleres</T>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl">
                <T>Experiencias transformadoras: sonoterapia, conciertos, talleres y retiros en conexión con la naturaleza</T>
              </p>
            </div>
          </section>

          {/* Descripción */}
          <section className="py-12 bg-muted">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground">
                  <T>En Cancagua organizamos eventos especiales que combinan bienestar, arte y naturaleza. Desde sesiones de sonoterapia hasta conciertos acústicos y retiros de fin de semana, cada evento está diseñado para ofrecerte una experiencia única e inolvidable.</T>
                </p>
              </div>
            </div>
          </section>

          {/* Próximos Eventos */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <T>Próximos Eventos</T>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.map((evento) => {
                  const cuposStatus = getCuposStatus(evento.cuposDisponibles, evento.cupos);

                  return (
                    <Card key={evento.id} className="overflow-hidden flex flex-col">
                      <div className="relative h-48">
                        <img
                          src={evento.imagen}
                          alt={evento.titulo}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant={cuposStatus.variant}>
                            <T>{cuposStatus.text}</T>
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary"><T>{evento.categoria}</T></Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <h3 className="text-xl font-bold mb-2"><T>{evento.titulo}</T></h3>
                        <p className="text-sm text-muted-foreground">
                          <T>{evento.descripcion}</T>
                        </p>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="capitalize">{formatFecha(evento.fecha)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{evento.hora} • <T>{evento.duracion}</T></span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{evento.cuposDisponibles} <T>de</T> {evento.cupos} <T>cupos disponibles</T></span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Cancagua, Frutillar</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <p className="text-2xl font-bold text-primary">{evento.precio}</p>
                          <p className="text-xs text-muted-foreground"><T>por persona</T></p>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button className="w-full" disabled={evento.cuposDisponibles === 0}>
                          {evento.cuposDisponibles === 0 ? <T>Agotado</T> : <T>Reservar Cupo</T>}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {eventos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    <T>No hay eventos programados en este momento</T>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <T>Suscríbete a nuestro newsletter para enterarte de próximos eventos</T>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA Newsletter */}
          <section className="py-16 bg-muted">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <T>No te pierdas nuestros eventos</T>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                <T>Suscríbete a nuestro newsletter y recibe información exclusiva sobre próximos eventos, talleres y retiros</T>
              </p>
              <Button size="lg"><T>Suscribirme al Newsletter</T></Button>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
