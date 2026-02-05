import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, MapPin, Users, Sparkles, Check, Info, 
  Waves, Heart, Coffee, Calendar
} from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

export default function PaseReconecta() {
  const includes = [
    "Hot-Tub privado por 2 horas",
    "Masaje relajante",
    "1 hora y 30 minutos en cafetería y playa",
    "Clase de Yoga o Stand Up Padel/Kayak por 1 hora (gratis y opcional)",
    "Acceso a estacionamientos, baños y amenities",
    "Una bata por persona"
  ];

  const hottubFeatures = [
    "Living equipado",
    "Vestidor privado",
    "Ducha",
    "Aguas entre 37 y 40 grados",
    "Carta exclusiva de tablas de picoteo y bebestibles",
    "Atención con garzones"
  ];

  const weProvide = [
    "1 toalla por persona",
    "1 bata por persona",
    "1 gorra de nado por persona",
    "1 bolsa pilwa con llave de locker"
  ];

  const importantInfo = [
    "Servicio de cafetería disponible de martes a domingo",
    "Capacidad del espacio para 10 personas máximo",
    "Niños menores de 12 años no pagan",
    "Tenemos toallas disponibles para arriendo",
    "La imagen es referencial, la asignación del Hot-Tub es aleatoria",
    "El horario que selecciones al hacer la reserva es el del Hot-Tub; el horario del masaje puede ser antes o después del Hot-Tub (queda sujeto a nuestra disponibilidad de agenda); nosotros nos comunicaremos contigo para entregarte tu itinerario completo"
  ];

  return (
    <AutoTranslateProvider pageId="pase-reconecta">
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-end overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309251/cancagua/images/pase-reconecta-hottub.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          
          <div className="relative z-10 container pb-16 text-white">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium"><T>Experiencia Reconecta</T></span>
              </div>
              <h1 className="text-5xl md:text-6xl font-josefin font-bold tracking-tight">
                <T>Pase Reconecta 5,5hrs</T>
              </h1>
              <p className="text-2xl text-white/90">
                <T>Hot-tub + Masaje + Kayak o Yoga</T>
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                <T>¡Descubre una experiencia única con nuestro Pase Reconecta en Hot-Tubs techados inmersos en bosque nativo! Un espacio privado donde la naturaleza y la comodidad se encuentran para ofrecerte momentos inolvidables.</T>
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold"><T>5.5 horas aprox.</T></span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold"><T>Hasta 10 personas</T></span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold"><T>Hot-Tub Privado</T></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-josefin font-bold text-stone-800">
                <T>Tu experiencia incluye</T>
              </h2>
              <p className="text-lg text-stone-600">
                <T>Una estadía de 5 horas aproximadamente con todo lo necesario para tu relajación</T>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {includes.map((item, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-amber-600" />
                    </div>
                    <p className="text-stone-700 leading-relaxed pt-2"><T>{item}</T></p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-4">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-semibold text-blue-900"><T>Actividades opcionales</T></p>
                <p className="text-blue-800">
                  <T>Stand Up Padel/Kayak sujeto a condiciones climáticas y Clase de Yoga sujeto a horario de clase regular.</T>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hot-Tub Features */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-100">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-200 mb-4">
                  <Waves className="h-8 w-8 text-amber-700" />
                </div>
                <h2 className="text-4xl font-josefin font-bold text-stone-800">
                  <T>Los Hot-Tub disponen de</T>
                </h2>
                <p className="text-lg text-stone-600">
                  <T>Espacios privados completamente equipados para tu comodidad</T>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hottubFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <p className="text-stone-700 font-medium"><T>{feature}</T></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros te entregamos */}
        <section className="py-20 container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-8 w-8" />
                  <h2 className="text-3xl font-josefin font-bold">
                    <T>Nosotros te entregamos</T>
                  </h2>
                </div>
                <p className="text-white/90 text-lg">
                  <T>Todo lo necesario para que disfrutes cómodamente tu experiencia</T>
                </p>
              </div>
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  {weProvide.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                      <span className="text-stone-700"><T>{item}</T></span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-20 bg-stone-50">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <Info className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-4xl font-josefin font-bold text-stone-800">
                  <T>Información importante</T>
                </h2>
              </div>

              <div className="space-y-4">
                {importantInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm flex gap-4 items-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed"><T>{info}</T></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-12 text-center text-white space-y-6">
                <Calendar className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-4xl font-josefin font-bold">
                  <T>¡Reserva tu momento de bienestar!</T>
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  <T>Disfruta de la magia de Cancagua y reconecta con la naturaleza en nuestro Hot-Tub privado</T>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a 
                    href="https://reservas.cancagua.cl/cancaguaspa/s/d24af310-fe7f-426f-be9b-848c1d050b03"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-white text-amber-600 hover:bg-stone-100 font-semibold">
                      <T>Reservar ahora</T>
                    </Button>
                  </a>
                  <a href="https://wa.me/56940073999" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <T>Consultar por WhatsApp</T>
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AutoTranslateProvider>
  );
}
