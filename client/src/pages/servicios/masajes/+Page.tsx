import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Heart, Leaf, ArrowUpRight } from "lucide-react";

const CMS_MASSAGE_CATALOG_URL = "https://cms.cancagua.cl/api/public/masajes/techniques";
const FALLBACK_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg";

interface MassagePrice {
  duration: number;
  price: number | null;
}

interface MassageTechnique {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  durations: number[];
  prices: MassagePrice[];
  bookingUrl: string;
}

const beneficios = [
  {
    title: "Masaje de Relajación",
    description: "Ideal para liberar el estrés acumulado y alcanzar un estado de calma profunda. Utiliza movimientos suaves y fluidos que relajan los músculos y la mente."
  },
  {
    title: "Masaje Descontracturante",
    description: "Enfocado en aliviar tensiones musculares profundas y contracturas. Perfecto para quienes sufren de dolores cervicales, lumbares o de espalda."
  },
  {
    title: "Piedras Calientes",
    description: "Combina el masaje tradicional con piedras volcánicas calientes que penetran profundamente en los músculos, aliviando tensiones y mejorando la circulación."
  },
  {
    title: "Drenaje Linfático",
    description: "Técnica suave que estimula el sistema linfático, ayudando a eliminar toxinas, reducir la retención de líquidos y mejorar el sistema inmunológico."
  }
];

function formatPrice(price?: number | null) {
  if (!price) return "Consultar";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
}

function getPriceForDuration(technique: MassageTechnique, duration: number) {
  return technique.prices.find((price) => price.duration === duration)?.price ?? null;
}

function MassageTechniqueCard({ technique }: { technique: MassageTechnique }) {
  const defaultDuration = technique.durations[0] ?? technique.prices[0]?.duration;
  const [hoveredDuration, setHoveredDuration] = useState<number | null>(null);
  const selectedDuration = hoveredDuration ?? defaultDuration;
  const selectedPrice = selectedDuration ? getPriceForDuration(technique, selectedDuration) : technique.prices[0]?.price;

  return (
    <article className="group rounded-lg border border-[#d8cdbd] bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden rounded-md bg-[#3a3a3a]">
        <img
          src={technique.imageUrl || FALLBACK_IMAGE}
          alt={technique.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/65" />
        <h3 className="absolute bottom-5 left-5 right-5 font-['Cormorant_Garamond'] text-3xl leading-none text-white md:text-4xl">
          {technique.name}
        </h3>
      </div>

      <div className="flex min-h-[230px] flex-col p-6">
        <p className="font-['Fira_Sans'] text-lg leading-relaxed text-[#3a3a3a]">
          {technique.description || "Sesión terapéutica diseñada para renovar el cuerpo y relajar la mente en un entorno natural."}
        </p>

        <div className="mt-6">
          <p className="mb-3 font-['Josefin_Sans'] text-xs uppercase tracking-[0.18em] text-[#3a3a3a]/70">
            Duraciones disponibles
          </p>
          <div className="flex flex-wrap gap-2">
            {technique.durations.map((duration) => (
              <span
                key={duration}
                onMouseEnter={() => setHoveredDuration(duration)}
                onFocus={() => setHoveredDuration(duration)}
                className="rounded-full border border-[#a99480] bg-[#b09b89] px-4 py-2 font-['Josefin_Sans'] text-xs font-semibold uppercase tracking-wide text-white outline-none transition-colors hover:bg-[#8fa1ad]"
                tabIndex={0}
              >
                <Clock className="mr-1 inline h-3 w-3" />
                {duration} min
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <span className="font-['Fira_Sans'] text-xl text-[#1f1f1f]">
            {formatPrice(selectedPrice)}
          </span>
          <a href={technique.bookingUrl} className="shrink-0">
            <Button
              variant="outline"
              className="rounded-full border-[#3a3a3a] bg-white px-6 font-['Josefin_Sans'] text-sm uppercase tracking-wide text-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white"
            >
              Reservar
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const [techniques, setTechniques] = useState<MassageTechnique[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(CMS_MASSAGE_CATALOG_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`CMS catalog error ${res.status}`);
        return res.json();
      })
      .then((data: { techniques?: MassageTechnique[] }) => {
        if (!cancelled) setTechniques(data.techniques ?? []);
      })
      .catch((error) => {
        console.error("[Masajes] Error cargando catálogo CMS:", error);
        if (!cancelled) setCatalogError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCatalog(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleTechniques = useMemo(
    () => techniques.filter((technique) => technique.durations.length > 0),
    [techniques]
  );

  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={FALLBACK_IMAGE}
            alt="Masajes Cancagua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-4">
            Masajes & Terapias
          </h1>
          <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide max-w-2xl">
            Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural
          </p>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
            Tu bienestar es nuestro compromiso. Tenemos diversos tipos de masajes diseñados para renovar tu cuerpo y mente en un entorno natural único.
          </p>
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Sparkles className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Ambiente relajante</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Heart className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Terapeutas certificados</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Leaf className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Productos naturales</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Servicios */}
      <section id="tecnicas" className="py-20 bg-[#F1E7D9]">
        <div className="container max-w-6xl">
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-[#3a3a3a] text-center mb-4">
            Selecciona tu experiencia
          </h2>
          <p className="font-['Fira_Sans'] text-[#666] text-center mb-12">
            Elige el masaje que mejor se adapte a tus necesidades
          </p>

          {isLoadingCatalog ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-[500px] animate-pulse rounded-lg bg-white/70" />
              ))}
            </div>
          ) : catalogError || visibleTechniques.length === 0 ? (
            <div className="rounded-lg bg-white p-10 text-center font-['Fira_Sans'] text-[#666]">
              Estamos actualizando la disponibilidad de masajes. Escríbenos y te ayudamos a reservar.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleTechniques.map((technique) => (
                <MassageTechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Galería */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-12">
            Nuestro espacio
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <img
              src={FALLBACK_IMAGE}
              alt="Masaje relajante"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp"
              alt="Biopiscinas"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp"
              alt="Hot Tubs"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-[#3a3a3a] text-white">
        <div className="container max-w-4xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-center mb-12">
            Beneficios de nuestros masajes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                  {beneficio.title}
                </h3>
                <p className="font-['Fira_Sans'] text-white/80">
                  {beneficio.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Puerto Varas */}
      <section className="py-12 bg-gradient-to-r from-[#1a5276] to-[#2874a6]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-['Josefin_Sans'] text-sm text-white/80 uppercase tracking-wider">
                  También en Puerto Varas
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-white mb-2">
                Spa en Hotel Cabañas del Lago
              </h3>
              <p className="font-['Fira_Sans'] text-white/80 max-w-lg">
                Disfruta de nuestros masajes en el corazón de Puerto Varas.
              </p>
            </div>
            <a href="/spa-hotel-cabanas-del-lago">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-[#1a5276] font-['Josefin_Sans'] tracking-wider px-8 py-6 whitespace-nowrap"
              >
                VER SERVICIOS EN PUERTO VARAS
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
            Regálate un momento de bienestar
          </h2>
          <p className="font-['Fira_Sans'] text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            Elige tu técnica y reserva tu sesión de masaje desde nuestro nuevo flujo de compra.
          </p>
          <a href="#tecnicas">
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
            >
              VER TÉCNICAS
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
