import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles, Heart, Leaf } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

const BOOKING_URL = "/servicios/masajes#tecnicas";

interface MassageService {
  name: string;
  duration: string;
  price: string;
}

const massageServices: MassageService[] = [
  { name: "Masaje de relajación", duration: "50 min", price: "$45.000" },
  { name: "Masaje de relajación", duration: "90 min", price: "$81.000" },
  { name: "Masaje Descontracturante", duration: "50 min", price: "$50.000" },
  { name: "Masaje Descontracturante", duration: "90 min", price: "$90.000" },
  { name: "Masaje con Piedras Calientes", duration: "50 min", price: "$45.000" },
  { name: "Masaje con Piedras Calientes", duration: "90 min", price: "$81.000" },
  { name: "Drenaje Linfático", duration: "50 min", price: "$45.000" },
  { name: "Drenaje Linfático", duration: "90 min", price: "$81.000" },
  { name: "Cuidado Facial", duration: "20 min", price: "$30.000" },
  { name: "Reflexología Podal", duration: "40 min", price: "$40.000" },
  { name: "Masaje Prenatal", duration: "50 min", price: "$45.000" },
  { name: "Masaje Mixto", duration: "50 min", price: "$50.000" },
  { name: "Masaje Mixto", duration: "90 min", price: "$90.000" },
];

const beneficios = [
  {
    title: "Regulación del sistema nervioso por inmersión sensorial real",
    description: "El sonido del bosque y el aire puro potencian el efecto del masaje: mientras las manos liberan tensión muscular, el entorno natural regula tu sistema nervioso desde el primer minuto."
  },
  {
    title: "Desconexión sin esfuerzo",
    description: "No tienes que esforzarte por desconectar: el bosque hace ese trabajo por ti. Solo debes llegar y dejar que el cuerpo se rinda."
  },
  {
    title: "Un ritual, no un trámite",
    description: "Cada sesión ocurre en un espacio diseñado para el ritual, no para la eficiencia: sin apuro, sin ruido urbano, con el bosque nativo como única referencia de tiempo."
  },
  {
    title: "El paisaje como parte activa de la recuperación del cuerpo",
    description: "Volcán Calbuco, Lago Llanquihue y bosque nativo no son el paisaje de fondo: son parte del tratamiento. La vista, el aire y el silencio trabajan junto con cada técnica manual."
  }
];

export default function Masajes() {
  return (
    <AutoTranslateProvider pageId="masajes">
      <div className="min-h-screen bg-[#F4F2ED]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg"
              alt="Masajes Cancagua"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-cg-serif text-5xl md:text-7xl font-light mb-4">
              <T>Masajes & Terapias</T>
            </h1>
            <p className="font-cg-soft text-xl md:text-2xl font-light leading-relaxed tracking-normal mb-8 max-w-2xl">
              <T>Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural</T>
            </p>
            <a href={BOOKING_URL}>
              <Button 
                size="lg" 
                className="bg-[#4B5872] hover:bg-[#333D51] text-[#FCF9F9] font-cg-mono tracking-wider text-lg px-10 py-6"
              >
                <T>RESERVAR MASAJE</T>
              </Button>
            </a>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl text-center">
            <p className="font-cg-sans text-lg text-[#635E5A] leading-relaxed mb-6">
              <T>Tu bienestar es nuestro compromiso. Tenemos diversos tipos de masajes diseñados para renovar tu cuerpo y mente en un entorno natural único.</T>
            </p>
            <div className="flex justify-center gap-8 mt-8 flex-wrap">
              <div className="flex items-center gap-2 text-[#4B5872]">
                <Sparkles className="h-5 w-5" />
                <span className="font-cg-sans text-sm text-[#635E5A]"><T>Ambiente relajante</T></span>
              </div>
              <div className="flex items-center gap-2 text-[#4B5872]">
                <Heart className="h-5 w-5" />
                <span className="font-cg-sans text-sm text-[#635E5A]"><T>Terapeutas certificados</T></span>
              </div>
              <div className="flex items-center gap-2 text-[#4B5872]">
                <Leaf className="h-5 w-5" />
                <span className="font-cg-sans text-sm text-[#635E5A]"><T>Productos naturales</T></span>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Servicios */}
        <section className="py-20 bg-[#F4F2ED]">
          <div className="container max-w-5xl">
            <h2 className="font-cg-serif text-3xl md:text-4xl text-[#222221] text-center mb-4">
              <T>Selecciona tu experiencia</T>
            </h2>
            <p className="font-cg-sans text-[#635E5A] text-center mb-12">
              <T>Elige el masaje que mejor se adapte a tus necesidades</T>
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {massageServices.map((service, index) => (
                <a 
                  key={index} 
                  href={BOOKING_URL} 
                  className="block"
                >
                  <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-cg-serif text-base md:text-lg font-normal leading-snug tracking-[-0.01em] text-[#222221] mb-2 group-hover:text-[#4B5872] transition-colors">
                            <T>{service.name}</T> ({service.duration})
                          </h3>
                          <div className="flex items-center gap-2 text-[#827D78]">
                            <Clock className="h-4 w-4" />
                            <span className="font-cg-sans text-sm">{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <span className="font-cg-serif text-2xl text-[#4B5872]">
                            {service.price}
                          </span>
                          <span className="font-cg-mono text-xs text-[#4B5872] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                            <T>Reservar</T> →
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href={BOOKING_URL}>
                <Button 
                  size="lg" 
                  className="bg-[#4B5872] hover:bg-[#333D51] text-[#FCF9F9] font-cg-mono tracking-wider text-lg px-12 py-6"
                >
                  <T>RESERVAR AHORA</T>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="font-cg-serif text-3xl md:text-4xl text-[#222221] text-center mb-12">
              <T>Nuestro espacio</T>
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <img
                src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg"
                alt="Masaje relajante"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <img
                src="/images/masajes/espacio-exterior.jpg"
                alt="Exterior del espacio de masajes rodeado de bosque"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <img
                src="/images/masajes/sala-espera.jpg"
                alt="Sala de espera del espacio de masajes"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="bg-[#222221] py-20 text-white md:py-24">
          <div className="container max-w-6xl">
            <h2 className="mb-12 text-center font-cg-serif text-3xl font-normal tracking-[-0.01em] md:mb-16 md:text-5xl">
              <T>Beneficios de nuestros masajes</T>
            </h2>
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 md:grid-cols-2">
              {beneficios.map((beneficio, index) => (
                <article key={beneficio.title} className="flex min-h-72 flex-col bg-[#222221] p-7 md:p-10">
                  <span className="mb-8 font-cg-mono text-sm tracking-[0.18em] text-sage-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-5 max-w-xl font-cg-serif text-2xl font-normal leading-tight tracking-[-0.01em] text-[#F4F2ED] md:text-3xl">
                    <T>{beneficio.title}</T>
                  </h3>
                  <p className="mt-auto max-w-xl font-cg-soft text-base leading-relaxed text-white/75 md:text-lg">
                    <T>{beneficio.description}</T>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Puerto Varas */}
        <section className="py-12 bg-gradient-to-r from-[#324853] to-[#496674]">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-cg-mono text-sm text-white/80 uppercase tracking-wider">
                    <T>También en Puerto Varas</T>
                  </span>
                </div>
                <h3 className="font-cg-serif text-2xl md:text-3xl text-white mb-2">
                  <T>Spa en Hotel Cabañas del Lago</T>
                </h3>
                <p className="font-cg-sans text-white/80 max-w-lg">
                  <T>Disfruta de nuestros masajes en el corazón de Puerto Varas.</T>
                </p>
              </div>
              <a href="/spa-hotel-cabanas-del-lago">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-[#324853] font-cg-mono tracking-wider px-8 py-6 whitespace-nowrap"
                >
                  <T>VER SERVICIOS EN PUERTO VARAS</T>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#F4F2ED]">
          <div className="container text-center">
            <h2 className="font-cg-serif text-3xl md:text-4xl text-[#222221] mb-6">
              <T>Regálate un momento de bienestar</T>
            </h2>
            <p className="font-cg-sans text-lg text-[#635E5A] mb-8 max-w-2xl mx-auto">
              <T>Reserva tu sesión de masaje y vive una experiencia de renovación en el corazón de la Patagonia.</T>
            </p>
            <a href={BOOKING_URL}>
              <Button 
                size="lg" 
                className="bg-[#4B5872] hover:bg-[#333D51] text-[#FCF9F9] font-cg-mono tracking-wider text-lg px-12 py-6"
              >
                <T>RESERVAR MASAJE</T>
              </Button>
            </a>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
