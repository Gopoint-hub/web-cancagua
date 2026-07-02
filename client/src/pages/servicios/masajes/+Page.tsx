import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Heart, Leaf } from "lucide-react";

const CMS_MASSAGE_CATALOG_URL = "https://cms.cancagua.cl/api/public/masajes/techniques";
const FALLBACK_IMAGE = "/images/masajes-hero-cancagua.jpg";

// TEMPORAL (jul 2026): mientras los terapeutas in-house no carguen sus
// calendarios en el CMS, las reservas vuelven a Skedu. Para volver al flujo
// del CMS basta con poner USE_SKEDU_BOOKING = false.
const USE_SKEDU_BOOKING = true;
const SKEDU_BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/502a130d-2e50-472a-aabc-a7917d5b5fbe";

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

// Variantes según el servicio publicado en Skedu (mismos nombres, duraciones y precios)
const SKEDU_TECHNIQUES: MassageTechnique[] = [
  {
    id: 1,
    name: "Masaje de Relajación",
    description:
      "Masaje de cuerpo completo de presión suave, que ayuda a mejorar la circulación y otorga una sensación de bienestar integral con un efecto sedante.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926865/massage-techniques/massage-techniques/1782926864562-eq8f1p.jpg",
    durations: [50, 90],
    prices: [
      { duration: 50, price: 45000 },
      { duration: 90, price: 81000 },
    ],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 2,
    name: "Masaje Descontracturante",
    description:
      "Técnicas manuales profundas que buscan aliviar tejidos tensionados, proporcionando un descanso revitalizante.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926820/massage-techniques/massage-techniques/1782926819782-j5bpdz.jpg",
    durations: [50, 90],
    prices: [
      { duration: 50, price: 50000 },
      { duration: 90, price: 90000 },
    ],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 3,
    name: "Masaje Mixto",
    description:
      "Sesión personalizada que fusiona técnicas de relajación con maniobras profundas, adaptándose a las necesidades de cada receptor para una experiencia integral de bienestar.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926117/massage-techniques/massage-techniques/1782926116429-g3r9m7.jpg",
    durations: [50, 90],
    prices: [
      { duration: 50, price: 50000 },
      { duration: 90, price: 90000 },
    ],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 4,
    name: "Masaje con Piedras Calientes",
    description:
      "Mediante maniobras suaves y el calor de las piedras de origen volcánico se vive una sensación cálida y envolvente que alivia tensiones musculares y disminuye el estrés.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926096/massage-techniques/massage-techniques/1782926095227-942gac.jpg",
    durations: [50, 90],
    prices: [
      { duration: 50, price: 45000 },
      { duration: 90, price: 81000 },
    ],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 5,
    name: "Drenaje Linfático",
    description:
      "Técnica que usa bombeos manuales y rítmicos para estimular la circulación linfática, facilitar la movilización de líquidos retenidos y fortalecer el sistema inmunológico.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926804/massage-techniques/massage-techniques/1782926803984-2kryu8.jpg",
    durations: [50, 90],
    prices: [
      { duration: 50, price: 45000 },
      { duration: 90, price: 81000 },
    ],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 6,
    name: "Masaje Prenatal",
    description:
      "Combinación de técnicas de relajación y drenaje linfático, con el objetivo de disminuir la retención de líquidos y el estrés de la zona lumbar para mujeres en gestación desde la novena semana de embarazo.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926897/massage-techniques/massage-techniques/1782926896407-8vgw9l.jpg",
    durations: [50],
    prices: [{ duration: 50, price: 45000 }],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 7,
    name: "Reflexología Podal",
    description:
      "Terapia holística que usa la presión de puntos específicos de los pies, para activar órganos y sistemas del cuerpo de manera distal.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926882/massage-techniques/massage-techniques/1782926881382-5aef9n.jpg",
    durations: [40],
    prices: [{ duration: 40, price: 40000 }],
    bookingUrl: SKEDU_BOOKING_URL,
  },
  {
    id: 8,
    name: "Cuidado Facial",
    description:
      "Rutina facial universal y sencilla indicada para todo tipo de piel, que limpia e hidrata la zona de cuello y rostro, otorgando elasticidad y protección con los productos Germaine de Capuccini.",
    imageUrl:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1782926058/massage-techniques/massage-techniques/1782926057203-4b4u81.jpg",
    durations: [20],
    prices: [{ duration: 20, price: 30000 }],
    bookingUrl: SKEDU_BOOKING_URL,
  },
];

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
    <article className="group flex h-full flex-col rounded-lg border border-[#d8cdbd] bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 shrink-0 overflow-hidden rounded-md bg-[#3a3a3a]">
        <img
          src={technique.imageUrl || FALLBACK_IMAGE}
          alt={technique.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/65" />
        <h3 className="absolute bottom-5 left-5 right-5 font-['Cormorant_Garamond'] text-3xl font-medium leading-none text-white md:text-4xl">
          {technique.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-['Fira_Sans'] text-base leading-relaxed text-[#666]">
          {technique.description || "Sesión terapéutica diseñada para renovar el cuerpo y relajar la mente en un entorno natural."}
        </p>

        <div className="mt-6">
          <p className="mb-3 font-['Josefin_Sans'] text-xs uppercase tracking-wider text-[#3a3a3a]/70">
            Duraciones disponibles
          </p>
          <div className="flex flex-wrap gap-2">
            {technique.durations.map((duration) => (
              <span
                key={duration}
                onMouseEnter={() => setHoveredDuration(duration)}
                onFocus={() => setHoveredDuration(duration)}
                className="rounded-full border border-[#a99480] bg-[#b09b89] px-4 py-2 font-['Josefin_Sans'] text-xs uppercase tracking-wider text-white outline-none transition-colors hover:bg-[#D3BC8D] hover:text-[#3a3a3a]"
                tabIndex={0}
              >
                <Clock className="mr-1 inline h-3 w-3" />
                {duration} min
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span className="font-['Cormorant_Garamond'] text-3xl font-medium text-[#3a3a3a]">
            {formatPrice(selectedPrice)}
          </span>
          <a href={technique.bookingUrl} className="shrink-0">
            <Button className="rounded-full bg-[#D3BC8D] px-6 font-['Josefin_Sans'] text-sm uppercase tracking-wider text-[#3a3a3a] hover:bg-[#c4ad7e]">
              Reservar →
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const [techniques, setTechniques] = useState<MassageTechnique[]>(
    USE_SKEDU_BOOKING ? SKEDU_TECHNIQUES : []
  );
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(!USE_SKEDU_BOOKING);
  const [catalogError, setCatalogError] = useState(false);

  useEffect(() => {
    if (USE_SKEDU_BOOKING) return;
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
          <h1 className="mb-4 font-['Cormorant_Garamond'] text-5xl font-light md:text-7xl">
            Masajes & Terapias
          </h1>
          <p className="max-w-2xl font-['Josefin_Sans'] text-xl font-light tracking-wide md:text-2xl">
            Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural
          </p>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="mb-6 font-['Fira_Sans'] text-lg leading-relaxed text-[#666]">
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
          <h2 className="mb-4 text-center font-['Cormorant_Garamond'] text-4xl font-light text-[#3a3a3a] md:text-5xl">
            Selecciona tu experiencia
          </h2>
          <p className="mb-12 text-center font-['Fira_Sans'] text-[#666]">
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
          <h2 className="mb-12 text-center font-['Cormorant_Garamond'] text-3xl font-light text-[#3a3a3a] md:text-4xl">
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
          <h2 className="mb-12 text-center font-['Cormorant_Garamond'] text-3xl font-light md:text-4xl">
            Beneficios de nuestros masajes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-['Josefin_Sans'] text-lg uppercase tracking-wider text-[#D3BC8D]">
                  {beneficio.title}
                </h3>
                <p className="font-['Fira_Sans'] leading-relaxed text-white/80">
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
                <span className="font-['Josefin_Sans'] text-sm uppercase tracking-wider text-white/80">
                  También en Puerto Varas
                </span>
              </div>
              <h3 className="mb-2 font-['Cormorant_Garamond'] text-2xl font-medium text-white md:text-3xl">
                Spa en Hotel Cabañas del Lago
              </h3>
              <p className="max-w-lg font-['Fira_Sans'] text-white/80">
                Disfruta de nuestros masajes en el corazón de Puerto Varas.
              </p>
            </div>
            <a href="/spa-hotel-cabanas-del-lago">
              <Button
                size="lg"
                className="whitespace-nowrap bg-white px-8 py-6 font-['Josefin_Sans'] uppercase tracking-wider text-[#1a5276] hover:bg-white/90"
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
          <h2 className="mb-6 font-['Cormorant_Garamond'] text-3xl font-light text-[#3a3a3a] md:text-4xl">
            Regálate un momento de bienestar
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-['Fira_Sans'] text-lg leading-relaxed text-[#666]">
            Elige tu técnica y reserva tu sesión de masaje en línea.
          </p>
          <a href="#tecnicas">
            <Button
              size="lg"
              className="bg-[#D3BC8D] px-12 py-6 font-['Josefin_Sans'] text-lg uppercase tracking-wider text-[#3a3a3a] hover:bg-[#c4ad7e]"
            >
              VER TÉCNICAS →
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
