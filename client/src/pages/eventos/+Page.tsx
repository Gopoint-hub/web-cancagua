import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

// Próximos eventos — Julio 2026
const featuredEvents = [
  {
    id: 1,
    title: "Sonoterapia",
    description: "Una sesión grupal en la calidez del yurt, guiada por Sebastián Diez con cuencos, gong, didgeridoo y otros instrumentos para entrar en un estado de relajación y calma. Incluye té del día y opción de extender la experiencia en las biopiscinas.",
    image: "https://cdn.skedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/29598e93ddc94c3f83f84f8e5afac156.png",
    imagePosition: "center top",
    date: "Sábado 25 de julio de 2026",
    time: "Llegada 10:00 · Sesión 10:15–11:15",
    location: "Yurt de Cancagua",
    price: "Desde $15.000",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/8dc087fd-67d9-40f0-944c-0872e64e8b0a",
  },
  {
    id: 2,
    title: "Encuentro de Inmersión Julio",
    description: "Un ritual de reconexión que integra aromaterapia, respiración, movimiento consciente, inmersión en el Lago Llanquihue y recuperación en sauna nativo. Una experiencia acompañada para despertar los sentidos y cultivar presencia.",
    image: "https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/0d6784633a564379a3f4dc5de2c3f18b.png",
    imagePosition: "center 42%",
    date: "Domingo 26 de julio de 2026",
    time: "Check-in 10:00 · Inicio 10:30",
    location: "Yurt, Lago Llanquihue y sauna nativo",
    price: "Desde $10.000",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/29ee2d1b-a529-4ad4-857b-c0e45facec62",
  },
];

const socialEventsList = [
  "Cumpleaños y aniversarios",
  "Reuniones familiares",
  "Despedidas de soltero/a",
  "Retiros de amigos",
  "Baby showers y celebraciones",
];

const corporateEventsList = [
  "Team building y dinámicas de grupo",
  "Retiros de liderazgo",
  "Conferencias y workshops",
  "Eventos de incentivo",
  "Jornadas de bienestar corporativo",
];

const whatsappLink = (message: string) =>
  `https://wa.me/56940073999?text=${encodeURIComponent(message)}`;

export default function EventosPage() {
  return (
    <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
      <header className="relative min-h-[620px] overflow-hidden bg-[#1B212D] px-6 pb-20 pt-32 text-[#FCF9F9] md:pb-28">
        <img
          src="https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto/cancagua/eventos/eventos-header-lago.jpg"
          alt="Entorno natural de Cancagua junto al Lago Llanquihue"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B212D] via-[#1B212D]/80 to-[#1B212D]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D] via-transparent to-[#1B212D]/25" />
        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-end">
          <div className="max-w-4xl">
            <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">
              CANCAGUA · ENCUENTROS EN LA NATURALEZA
            </p>
            <h1 className="font-cg-serif mt-8 max-w-3xl text-5xl font-normal leading-[1.03] tracking-[-0.025em] md:text-7xl lg:text-[5.5rem]">
              Experiencias para sentir, conectar y volver al cuerpo.
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1] md:text-xl">
              Talleres y encuentros de bienestar creados para vivir con presencia el paisaje del sur de Chile.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 border-b border-black/10 pb-12 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]">AGENDA · JULIO 2026</p>
                <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl">
                  Próximos eventos
                </h2>
              </div>
              <p className="max-w-xl text-base font-light leading-relaxed text-[#635E5A] md:justify-self-end md:text-lg">
                Dos invitaciones a detener el ritmo cotidiano y abrir espacio a la respiración, el movimiento y la naturaleza.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featuredEvents.map((event) => (
              <article key={event.id} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/10 bg-[#FCF9F9]">
                <div className="relative h-72 overflow-hidden md:h-80">
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ${event.id === 1 ? "scale-[1.4] group-hover:scale-[1.44]" : "group-hover:scale-[1.03]"}`}
                    style={{ objectPosition: event.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D]/45 via-transparent to-transparent" />
                  <div className="font-cg-mono absolute left-5 top-5 rounded-full bg-[#FCF9F9]/95 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#333D51]">
                    {event.price}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <div className="flex-1">
                    <p className="font-cg-mono text-[11px] uppercase tracking-[0.18em] text-[#696F4D]">EXPERIENCIA CANCAGUA</p>
                    <h3 className="font-cg-serif mt-4 text-3xl font-normal leading-tight tracking-[-0.015em] md:text-4xl">{event.title}</h3>
                    <p className="mt-5 text-[15px] font-light leading-[1.75] text-[#635E5A] md:text-base">{event.description}</p>
                  </div>
                  <div className="font-cg-soft mt-8 space-y-3 border-t border-black/10 pt-6 text-sm text-[#635E5A]">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#696F4D]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#696F4D]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#696F4D]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer" className="font-cg-mono mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#333D51] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#FCF9F9] transition-colors hover:bg-[#1B212D]">
                    RESERVAR CUPO <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-[#FCF9F9] px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <img src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp" alt="Eventos sociales en Cancagua" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D]/30 to-transparent" />
            </div>
            <div>
              <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]">CELEBRAR CON OTROS</p>
              <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">Eventos sociales</h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-[#635E5A]">
                Celebra momentos especiales en nuestro espacio único. Cumpleaños, aniversarios, reuniones familiares y más, en el ambiente perfecto rodeado de naturaleza.
              </p>
              <ul className="font-cg-soft mt-7 grid gap-3 text-sm text-[#635E5A] sm:grid-cols-2">
                {socialEventsList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#696F4D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={whatsappLink("Hola, me gustaría cotizar un evento social en Cancagua")} target="_blank" rel="noopener noreferrer" className="font-cg-mono mt-9 inline-flex items-center gap-3 rounded-full border border-[#333D51] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] transition-colors hover:bg-[#333D51] hover:text-white">
                COTIZAR EVENTO <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]">BIENESTAR EN EQUIPO</p>
              <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">Eventos corporativos</h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-[#635E5A]">
                Diseñamos experiencias corporativas únicas para tu equipo. Team building, retiros de liderazgo, conferencias y eventos de incentivo en un ambiente inspirador.
              </p>
              <ul className="font-cg-soft mt-7 grid gap-3 text-sm text-[#635E5A] sm:grid-cols-2">
                {corporateEventsList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#696F4D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={whatsappLink("Hola, me gustaría cotizar un evento corporativo en Cancagua")} target="_blank" rel="noopener noreferrer" className="font-cg-mono mt-9 inline-flex items-center gap-3 rounded-full border border-[#333D51] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] transition-colors hover:bg-[#333D51] hover:text-white">
                COTIZAR EVENTO <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <img src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309226/cancagua/images/navega-relax-header.jpg" alt="Eventos corporativos en Cancagua" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D]/30 to-transparent" />
            </div>
          </div>
        </section>
      </main>

      <section className="bg-[#333D51] px-6 py-20 text-[#FCF9F9] md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">UNA EXPERIENCIA A TU MEDIDA</p>
          <h2 className="font-cg-serif mt-6 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl">¿Imaginamos tu próximo encuentro?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1]">
            Contáctanos para diseñar la experiencia perfecta para ti. Nuestro equipo está listo para hacer realidad tu evento.
          </p>
          <a href={whatsappLink("Hola, me gustaría información sobre eventos en Cancagua")} target="_blank" rel="noopener noreferrer" className="font-cg-mono mt-10 inline-flex items-center gap-3 rounded-full bg-[#FCF9F9] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] transition-transform hover:-translate-y-0.5">
            CONVERSEMOS <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
