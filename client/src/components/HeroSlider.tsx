import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

interface Slide {
  image: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaLink: string;
}

export function HeroSlider() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      image: "/images/02_biopiscinas-hero.jpg",
      titleKey: "hero.biopiscinas.title",
      subtitleKey: "hero.biopiscinas.subtitle",
      ctaKey: "hero.biopiscinas.cta1",
      ctaLink: "/servicios/biopiscinas",
    },
    {
      image: "/images/05_hottubs-hero.png",
      titleKey: "hero.hotTubs.title",
      subtitleKey: "hero.hotTubs.subtitle",
      ctaKey: "hero.hotTubs.cta1",
      ctaLink: "/servicios/hot-tubs",
    },
    {
      image: "/images/03_masajes-hero.webp",
      titleKey: "hero.masajes.title",
      subtitleKey: "hero.masajes.subtitle",
      ctaKey: "hero.masajes.cta1",
      ctaLink: "/masajes",
    },
    {
      image: "/images/04_clases-hero.jpg",
      titleKey: "hero.clases.title",
      subtitleKey: "hero.clases.subtitle",
      ctaKey: "hero.clases.cta1",
      ctaLink: "/clases",
    },
    {
      image: "/images/06_cafeteria-hero.jpg",
      titleKey: "hero.cafeteria.title",
      subtitleKey: "hero.cafeteria.subtitle",
      ctaKey: "hero.cafeteria.cta1",
      ctaLink: "/cafeteria",
    },
    {
      image: "/images/07_eventos-hero.jpg",
      titleKey: "hero.eventos.title",
      subtitleKey: "hero.eventos.subtitle",
      ctaKey: "hero.eventos.cta1",
      ctaLink: "/eventos",
    },
  ];

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[60vh] md:h-[85vh] overflow-hidden">
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

          {/* Overlay con gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

          {/* Contenido */}
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 max-w-4xl animate-fade-in">
              {t(slide.titleKey)}
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl animate-fade-in animation-delay-200 font-light opacity-90">
              {t(slide.subtitleKey)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
              <Button 
                size="lg" 
                className="text-sm px-10 py-6 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-widest uppercase" 
                asChild
              >
                <Link href={slide.ctaLink}>
                  {t(slide.ctaKey)}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm px-10 py-6 bg-transparent backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-[#3a3a3a] tracking-widest uppercase"
                asChild
              >
                <Link href="/servicios">
                  {t('home.hero.viewAllServices')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#D3BC8D] backdrop-blur-sm text-white hover:text-[#3a3a3a] p-4 transition-all z-10"
        aria-label={t('common.previousSlide')}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#D3BC8D] backdrop-blur-sm text-white hover:text-[#3a3a3a] p-4 transition-all z-10"
        aria-label={t('common.nextSlide')}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 transition-all ${
              index === currentSlide
                ? "w-10 bg-[#D3BC8D]"
                : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={t('common.goToSlide', { number: index + 1 })}
          />
        ))}
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-0.5 h-3 bg-[#D3BC8D] rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
