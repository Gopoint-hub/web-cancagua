import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Slide {
  image: string;
  titleKey: string;
  titleLine2?: string;
  subtitleKey: string;
  ctaKey: string;
  ctaLink: string;
  isExternal?: boolean;
  eyebrow?: string;
  promoCode?: string;
}

export function HeroSlider() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
      titleKey: "hero.biopiscinas.title",
      subtitleKey: "hero.biopiscinas.subtitle",
      ctaKey: "hero.biopiscinas.cta1",
      ctaLink: "/servicios/biopiscinas",
    },
    {
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp",
      titleKey: "hero.hotTubs.title",
      subtitleKey: "hero.hotTubs.subtitle",
      ctaKey: "hero.hotTubs.cta1",
      ctaLink: "/servicios/hot-tubs",
    },
    {
      image: "/images/masajes-spa-cancagua-frutillar.jpg",
      titleKey: "hero.masajes.title",
      subtitleKey: "hero.masajes.subtitle",
      ctaKey: "hero.masajes.cta1",
      ctaLink: "/servicios/masajes",
    },
    {
      image: "/images/clases-regulares-hero.jpg",
      titleKey: "hero.clases.title",
      subtitleKey: "hero.clases.subtitle",
      ctaKey: "hero.clases.cta1",
      ctaLink: "/clases",
    },
    {
      image: "/images/cafeteria-cancagua-brunch.jpg",
      titleKey: "hero.cafeteria.title",
      subtitleKey: "hero.cafeteria.subtitle",
      ctaKey: "hero.cafeteria.cta1",
      ctaLink: "/cafeteria",
    },
    {
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto/cancagua/eventos/eventos-header-lago.jpg",
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

  const handleCtaClick = (slide: Slide) => {
    if (typeof window !== 'undefined') {
      if (slide.isExternal) {
        window.open(slide.ctaLink, '_blank');
      } else {
        window.location.href = slide.ctaLink;
      }
    }
  };

  const handleServicesClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://reservas.cancagua.cl';
    }
  };

  // Get current slide
  const slide = slides[currentSlide];

  return (
    <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background images - all slides rendered for smooth transitions */}
      {slides.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
      ))}

      {/* Content overlay - positioned absolutely over everything */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:justify-center md:pt-0 text-center text-white px-4 z-10 pointer-events-none">
        {slide.eyebrow && (
          <div key={`eyebrow-${currentSlide}`} className="inline-flex items-center gap-2 mb-4 animate-fade-in">
            <span className="w-5 h-px bg-white/70" />
            <span className="text-white text-xs md:text-sm tracking-[0.25em] uppercase font-medium">
              {slide.eyebrow}
            </span>
            <span className="w-5 h-px bg-white/70" />
          </div>
        )}
        <h1
          key={`title-${currentSlide}`}
          className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-light tracking-wider mb-3 md:mb-6 max-w-4xl animate-fade-in px-2"
        >
          {!slide.titleKey.startsWith("hero.") ? slide.titleKey : t(slide.titleKey)}
          {slide.titleLine2 && (
            <><br />{slide.titleLine2}</>
          )}
        </h1>
        <p
          key={`subtitle-${currentSlide}`}
          className="text-sm sm:text-base md:text-xl mb-4 md:mb-6 max-w-2xl animate-fade-in animation-delay-200 font-light opacity-90 px-4"
        >
          {!slide.titleKey.startsWith("hero.") ? slide.subtitleKey : t(slide.subtitleKey)}
        </p>
        {slide.promoCode && (
          <div key={`promo-${currentSlide}`} className="inline-flex items-center gap-2 border border-[#4B5872]/60 bg-black/30 backdrop-blur-sm px-4 py-2 mb-6 animate-fade-in animation-delay-200">
            <span className="text-white/70 text-xs tracking-wide hidden sm:inline">Usa el código</span>
            <span className="text-[#4B5872] font-mono font-semibold tracking-[0.15em] text-sm">{slide.promoCode}</span>
            <span className="text-white/70 text-xs tracking-wide hidden sm:inline">al pagar</span>
          </div>
        )}

        {/* Buttons inside content container for better mobile layout */}
        <div
          key={`buttons-${currentSlide}`}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in animation-delay-400 pointer-events-auto w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            onClick={() => handleCtaClick(slide)}
            className="text-xs sm:text-sm px-6 py-3 md:px-10 md:py-6 bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] tracking-widest uppercase cursor-pointer font-medium transition-colors w-full sm:w-auto"
          >
            {!slide.titleKey.startsWith("hero.") ? slide.ctaKey : t(slide.ctaKey)}
          </button>
          <button
            onClick={handleServicesClick}
            className="text-xs sm:text-sm px-6 py-3 md:px-10 md:py-6 bg-transparent backdrop-blur-sm border border-white/50 text-white hover:bg-white hover:text-[#222221] tracking-widest uppercase cursor-pointer font-medium transition-colors w-full sm:w-auto"
          >
            {t('home.hero.viewAllServices')}
          </button>
        </div>
      </div>

      {/* Navigation controls - smaller on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#4B5872] backdrop-blur-sm text-white hover:text-[#FCF9F9] p-2 md:p-4 transition-all z-20"
        aria-label={t('common.previousSlide')}
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#4B5872] backdrop-blur-sm text-white hover:text-[#FCF9F9] p-2 md:p-4 transition-all z-20"
        aria-label={t('common.nextSlide')}
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 transition-all ${
              index === currentSlide
                ? "w-8 md:w-10 bg-[#4B5872]"
                : "w-4 md:w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={t('common.goToSlide', { number: index + 1 })}
          />
        ))}
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-20">
        <div className="w-6 h-10 border border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-0.5 h-3 bg-[#4B5872] rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
}
