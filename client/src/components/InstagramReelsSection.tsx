import { useEffect, useState } from "react";
import { Instagram, Play } from "lucide-react";
import { T } from "@/components/AutoTranslate";

interface InstagramReel {
  id: string;
  permalink: string;
  caption?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  timestamp?: string;
}

const FALLBACK_REELS: InstagramReel[] = [
  {
    id: "fallback-1",
    permalink: "https://www.instagram.com/cancaguachile/",
    caption: "Momentos de bienestar en Cancagua",
    thumbnailUrl: "https://res.cloudinary.com/dhuln9b1n/image/upload/w_700,h_1000,c_fill,f_auto,q_auto/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
  },
  {
    id: "fallback-2",
    permalink: "https://www.instagram.com/cancaguachile/",
    caption: "Biopiscinas geotermales junto al Lago Llanquihue",
    thumbnailUrl: "https://res.cloudinary.com/dhuln9b1n/image/upload/w_700,h_1000,c_fill,f_auto,q_auto/v1770309079/cancagua/images/11_hottub-service.webp",
  },
  {
    id: "fallback-3",
    permalink: "https://www.instagram.com/cancaguachile/",
    caption: "Experiencias para reconectar con la naturaleza",
    thumbnailUrl: "https://res.cloudinary.com/dhuln9b1n/image/upload/w_700,h_1000,c_fill,f_auto,q_auto/v1770309084/cancagua/images/13_masajes-service.webp",
  },
];

function cleanCaption(caption?: string) {
  if (!caption) return "Ver reel en Instagram";
  return caption.replace(/\s+/g, " ").trim().slice(0, 92);
}

export function InstagramReelsSection() {
  const [reels, setReels] = useState<InstagramReel[]>(FALLBACK_REELS);

  useEffect(() => {
    let active = true;

    fetch("/api/instagram/reels")
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.reels) && data.reels.length > 0) {
          setReels(data.reels.slice(0, 3));
        }
      })
      .catch(() => {
        // Mantiene los respaldos visuales si Meta todavía no está conectado.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#222221] text-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[#4B5872] text-sm tracking-[0.3em] uppercase mb-4 block">
              <T>En nuestro Instagram</T>
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
              <T>Momentos reales en Cancagua</T>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              <T>Revisa los últimos Reels de @cancaguachile y descubre experiencias, paisajes y novedades desde Frutillar.</T>
            </p>
          </div>

          <a
            href="https://www.instagram.com/cancaguachile/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-[#4B5872] text-[#4B5872] hover:bg-[#4B5872] hover:text-[#FCF9F9] transition-colors tracking-wider text-sm uppercase"
          >
            <Instagram className="h-4 w-4" />
            <T>Ver más en Instagram</T>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel, index) => (
            <a
              key={reel.id || index}
              href={reel.permalink || "https://www.instagram.com/cancaguachile/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver reel en Instagram"
              className="group relative aspect-[9/14] min-h-[430px] overflow-hidden rounded-sm bg-[#222221] shadow-2xl"
            >
              <img
                src={reel.thumbnailUrl || reel.mediaUrl || FALLBACK_REELS[index % FALLBACK_REELS.length].thumbnailUrl}
                alt={cleanCaption(reel.caption)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#4B5872] group-hover:text-[#FCF9F9]">
                  <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                  <Instagram className="h-3.5 w-3.5" />
                  Reel
                </div>
                <span className="text-5xl font-light text-white/25">0{index + 1}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4B5872]">@cancaguachile</p>
                <p className="line-clamp-3 text-lg font-light leading-snug text-white">
                  {cleanCaption(reel.caption)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
