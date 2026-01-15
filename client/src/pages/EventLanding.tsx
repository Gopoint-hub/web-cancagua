import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, ExternalLink, Loader2 } from "lucide-react";

export default function EventLanding() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug as string;

  const { data: event, isLoading, error } = trpc.events.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Evento no encontrado</h1>
            <p className="text-muted-foreground mb-8">
              El evento que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={() => setLocation("/eventos")}>
              Ver todos los eventos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = event.images ? JSON.parse(event.images) : [];
  const firstImage = images[0] || "/images/placeholder-event.jpg";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <img 
            src={firstImage} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {event.title}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Event Info Bar */}
        <div className="bg-primary/10 py-6">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>
                  {new Date(event.startDate).toLocaleDateString("es-CL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.price && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>${event.price.toLocaleString("es-CL")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI-Generated Content */}
        <div className="container py-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: event.contentHtml || "" }}
          />
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 py-12">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para unirte?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reserva tu lugar ahora y vive esta experiencia única en Cancagua
            </p>
            <Button 
              size="lg" 
              onClick={() => event.externalLink && window.open(event.externalLink, "_blank")}
              className="gap-2"
              disabled={!event.externalLink}
            >
              Reservar Ahora
              <ExternalLink className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        {images.length > 1 && (
          <div className="container py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Galería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.slice(1).map((image: string, index: number) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${event.title} - Imagen ${index + 2}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
