import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    image: "/images/02_biopiscinas-hero.jpg",
    title: "Primeras Biopiscinas Geotermales del Mundo",
    subtitle: "¡Cuatro horas de una maravillosa experiencia a 37º-40º!",
    cta: "Reservar Biopiscinas",
    ctaLink: "/servicios/biopiscinas",
  },
  {
    image: "/images/05_hottubs-hero.png",
    title: "Hot Tubs en Bosque Nativo",
    subtitle: "Disfruta spa al aire libre con vista al Lago Llanquihue",
    cta: "Reservar Hot Tubs",
    ctaLink: "/servicios/hot-tubs",
  },
  {
    image: "/images/03_masajes-hero.webp",
    title: "Masajes & Terapias",
    subtitle: "Reconforta tu cuerpo con nuestras terapias holísticas",
    cta: "Ver Masajes",
    ctaLink: "/servicios/masajes",
  },
  {
    image: "/images/04_clases-hero.jpg",
    title: "Clases de Yoga y Movimiento",
    subtitle: "Conecta con tu cuerpo y mente en la naturaleza",
    cta: "Ver Clases",
    ctaLink: "/servicios/clases",
  },
  {
    image: "/images/06_cafeteria-hero.jpg",
    title: "Cafetería Saludable",
    subtitle: "Alimentación consciente con productos locales",
    cta: "Ver Carta",
    ctaLink: "/cafeteria",
  },
  {
    image: "/images/07_eventos-hero.jpg",
    title: "Eventos y Talleres",
    subtitle: "Sonoterapia, conciertos y experiencias transformadoras",
    cta: "Ver Eventos",
    ctaLink: "/eventos",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Reactivar auto-play después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Contenido */}
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl animate-fade-in">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-2xl animate-fade-in animation-delay-200">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
              <Link href={slide.ctaLink}>
                <Button size="lg" className="text-lg px-8 py-6">
                  {slide.cta}
                </Button>
              </Link>
              <Link href="/servicios">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground"
                >
                  Ver Todos los Servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
