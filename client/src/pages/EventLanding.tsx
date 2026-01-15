import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, ExternalLink, Loader2, Clock, Users, CheckCircle, Phone } from "lucide-react";

export default function EventLanding() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug as string;

  const { data: event, isLoading, error } = trpc.events.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-[#F5F1E8]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#D3BC8D] mx-auto mb-4" />
            <p className="text-gray-600">Cargando evento...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-[#F5F1E8]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-[#D3BC8D]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Evento no encontrado</h1>
            <p className="text-gray-600 mb-8">
              El evento que buscas no existe, ha sido eliminado o ya finalizó.
            </p>
            <Button 
              onClick={() => setLocation("/eventos")}
              className="bg-[#D3BC8D] hover:bg-[#C5AE7F] text-white"
            >
              Ver todos los eventos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = event.images ? JSON.parse(event.images) : [];
  const mainImage = images[0] || "/images/placeholder-event.jpg";
  const galleryImages = images.slice(1);

  // Formatear fechas
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Imagen de fondo con overlay */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img 
            src={mainImage} 
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4">
            <div className="container max-w-4xl mx-auto text-white">
              {/* Badge de fecha */}
              <div className="inline-flex items-center gap-2 bg-[#D3BC8D] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                {startDate.toLocaleDateString("es-CL", dateOptions)}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {event.title}
              </h1>
              
              {event.description && (
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-6">
                  {event.description}
                </p>
              )}
              
              {/* Info rápida */}
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{startDate.toLocaleTimeString("es-CL", timeOptions)} hrs</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.price && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span>${event.price.toLocaleString("es-CL")} CLP</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Principal - Sticky en mobile */}
        <section className="bg-[#D3BC8D] py-6 sticky top-0 z-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-center md:text-left">
                <p className="font-semibold text-lg">¿Listo para vivir esta experiencia?</p>
                <p className="text-white/80 text-sm">Cupos limitados - Reserva tu lugar ahora</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  size="lg"
                  onClick={() => event.externalLink && window.open(event.externalLink, "_blank")}
                  className="bg-white text-[#D3BC8D] hover:bg-gray-100 font-bold px-8 shadow-lg"
                  disabled={!event.externalLink}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Reservar Ahora
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.open("https://wa.me/56940073999", "_blank")}
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Información del Evento */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card Fecha */}
              <div className="bg-[#F5F1E8] rounded-xl p-6 text-center">
                <Calendar className="h-10 w-10 text-[#D3BC8D] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Fecha</h3>
                <p className="text-gray-600">
                  {startDate.toLocaleDateString("es-CL", { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-[#D3BC8D] font-semibold mt-1">
                  {startDate.toLocaleTimeString("es-CL", timeOptions)} hrs
                </p>
              </div>
              
              {/* Card Ubicación */}
              <div className="bg-[#F5F1E8] rounded-xl p-6 text-center">
                <MapPin className="h-10 w-10 text-[#D3BC8D] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Ubicación</h3>
                <p className="text-gray-600">
                  {event.location || "Cancagua Spa & Retreat Center"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Frutillar, Chile</p>
              </div>
              
              {/* Card Precio */}
              <div className="bg-[#F5F1E8] rounded-xl p-6 text-center">
                <DollarSign className="h-10 w-10 text-[#D3BC8D] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Inversión</h3>
                <p className="text-2xl font-bold text-[#D3BC8D]">
                  {event.price ? `$${event.price.toLocaleString("es-CL")}` : "Consultar"}
                </p>
                <p className="text-sm text-gray-500 mt-1">por persona</p>
              </div>
            </div>
          </div>
        </section>

        {/* Descripción Detallada */}
        <section className="py-16 bg-[#F5F1E8]">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Sobre este Evento
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {event.description && (
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              )}
              
              {/* Qué incluye - Lista genérica */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">¿Qué incluye?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Experiencia guiada por profesionales certificados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acceso a las instalaciones de Cancagua</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Materiales necesarios para la actividad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Ambiente tranquilo frente al Lago Llanquihue</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Galería de Imágenes */}
        {galleryImages.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Galería
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image: string, index: number) => (
                  <div key={index} className="aspect-video rounded-xl overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${event.title} - Imagen ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a]">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¡No te pierdas esta experiencia única!
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Reserva tu lugar ahora y vive un momento de transformación en el entorno natural de Cancagua
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => event.externalLink && window.open(event.externalLink, "_blank")}
                className="bg-[#D3BC8D] hover:bg-[#C5AE7F] text-white font-bold px-10 py-6 text-lg shadow-xl"
                disabled={!event.externalLink}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Reservar Mi Lugar Ahora
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.open("https://wa.me/56940073999?text=Hola, me interesa el evento: " + encodeURIComponent(event.title), "_blank")}
                className="border-white text-white hover:bg-white/10 px-10 py-6 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Consultar por WhatsApp
              </Button>
            </div>
            
            <p className="text-white/60 mt-6 text-sm">
              ¿Tienes dudas? Escríbenos al +56 9 4007 3999
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
