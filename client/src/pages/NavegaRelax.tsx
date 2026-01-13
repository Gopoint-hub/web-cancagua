import { Check, Ship, Waves, Clock, MapPin, Gift, Phone, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NavegaRelax() {
  const whatsappNumber = "+56965267774";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información sobre la experiencia Navega Relax.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const reservationLink = "https://catamaranbandurria.cl";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/catamaran-bandurria.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white font-medium">Todos los Días</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Navega al Relax
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-md">
              Cancagua Spa & Retreat Center + Catamarán Bandurria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#6B8E23] hover:bg-[#556B1A] text-white text-lg px-8 py-6"
                onClick={() => window.open(reservationLink, '_blank')}
              >
                <Ship className="mr-2 h-5 w-5" />
                Reservar Ahora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-lg px-8 py-6"
                onClick={() => window.open(whatsappLink, '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* La Experiencia */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Una Experiencia Única en el Lago Llanquihue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vive una experiencia única en Frutillar: un paseo en Catamarán Bandurria por el Lago Llanquihue 
              con desembarque exclusivo en el muelle de Cancagua, seguido de una relajante estadía en nuestras 
              biopiscinas geotermales. Ideal para regalar, compartir en pareja o venir en familia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6B8E23]/10 rounded-full flex items-center justify-center">
                    <Ship className="h-6 w-6 text-[#6B8E23]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Zarpe desde Frutillar</h3>
                    <p className="text-gray-600">
                      El Catamarán Bandurria zarpa a las <strong>11:30 hrs</strong> desde el icónico muelle de Frutillar, 
                      con audioguía en español, inglés y portugués.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6B8E23]/10 rounded-full flex items-center justify-center">
                    <Waves className="h-6 w-6 text-[#6B8E23]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Navegación Panorámica</h3>
                    <p className="text-gray-600">
                      Disfruta del paisaje volcánico mientras navegas por el Lago Llanquihue 
                      hasta el desembarque exclusivo en el muelle privado de Cancagua.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6B8E23]/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#6B8E23]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">4 Horas de Relajo</h3>
                    <p className="text-gray-600">
                      Sumérgete en aguas libres de químicos con estadía de <strong>4 horas</strong> en las biopiscinas 
                      geotermales, rodeadas de naturaleza y tranquilidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/catamaran-bandurria.jpg" 
                  alt="Catamarán Bandurria"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#6B8E23] text-white p-6 rounded-xl shadow-xl">
                <p className="text-sm font-medium mb-1">Duración</p>
                <p className="text-3xl font-bold">5 hrs</p>
                <p className="text-sm">Mar-Dom 11:30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Incluye */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¿Qué Incluye la Experiencia?
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo necesario para tu comodidad y relajo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-[#6B8E23]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities Incluidos</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Bata de baño</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Gorro de nado</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Audioguía multiidioma</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-[#6B8E23]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transporte Náutico</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Ida en catamarán</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Regreso incluido</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Vistas panorámicas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-[#6B8E23]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acceso Completo</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Biopiscinas geotermales</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Vestuarios y duchas</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-[#6B8E23]" />
                    <span>Áreas de descanso</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ¿Qué Debes Traer?
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-[#6B8E23]" />
                <span className="text-gray-700">Traje de baño</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-[#6B8E23]" />
                <span className="text-gray-700">Sandalias</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Check className="h-5 w-5 text-[#6B8E23]" />
                <span className="text-gray-700">Disposición al relajo</span>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Servicios Opcionales
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start gap-3">
                  <Ship className="h-5 w-5 text-[#6B8E23] flex-shrink-0 mt-0.5" />
                  <p><strong>Transporte de regreso</strong> al Muelle de Frutillar: $5.000 p/p (pago directo en recepción)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-[#6B8E23] flex-shrink-0 mt-0.5" />
                  <p><strong>Alimentación y bebestibles</strong> disponibles con costo adicional en la cafetería a bordo o en Cancagua</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Reservar */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-br from-[#6B8E23] to-[#556B1A] rounded-2xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Vivir esta Experiencia?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Reserva tu lugar en el Catamarán Bandurria y prepárate para un día inolvidable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#6B8E23] hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => window.open(reservationLink, '_blank')}
              >
                <Ship className="mr-2 h-5 w-5" />
                Reservar en Catamarán Bandurria
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => window.open(whatsappLink, '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Consultar por WhatsApp
              </Button>
            </div>
            <p className="mt-8 text-sm opacity-75">
              ¿Tienes dudas? Escríbenos al WhatsApp +56 9 6526 7774
            </p>
          </div>
        </div>
      </section>

      {/* Información Práctica */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Información Práctica
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#6B8E23] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Punto de Encuentro</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Muelle de Frutillar</strong>
                    </p>
                    <p className="text-gray-600">
                      Llega 15 minutos antes de la salida para el check-in
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-[#6B8E23] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Horarios</h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Horario:</strong> Martes a domingo 11:30 hrs
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Duración:</strong> 5 horas
                    </p>
                    <p className="text-gray-600">
                      <strong>Disponibilidad:</strong> Todos los días
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-2"
        aria-label="Contactar por WhatsApp"
      >
        <Phone className="h-6 w-6" />
        <span className="hidden sm:inline font-medium pr-2">WhatsApp</span>
      </a>

      <Footer />
    </div>
  );
}
