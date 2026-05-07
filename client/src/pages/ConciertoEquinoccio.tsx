import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock, MapPin, Calendar, Music, Sparkles, Ticket, Waves, ArrowRight
} from "lucide-react";

const proximasFechas = [
  { fecha: "13 de Junio", titulo: "We Tripantu", subtitulo: "Solsticio de invierno" },
  { fecha: "15 de Agosto", titulo: "Pure Imagination", subtitulo: "Honrar la infancia" },
  { fecha: "10 de Octubre", titulo: "Humana Muerte", subtitulo: "Reflexiones en torno a la muerte" },
  { fecha: "11 de Diciembre", titulo: "Navidad", subtitulo: "Villancicos" },
];

export default function ConciertoEquinoccio() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/a5ac625d2db04b39a004b6b2851d0995.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 container pb-16 text-white">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-3 bg-amber-700/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Music className="h-5 w-5" />
              <span className="font-semibold">Ciclo de Conciertos Cancagua 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-josefin font-bold tracking-tight leading-tight">
              Concierto Equinoccio de Otoño
            </h1>
            <p className="text-3xl text-white/90 font-light italic">
              Cambio de Piel ✨
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Sábado 25 de Abril</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">19:00 - 20:30 hrs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Cancagua Spa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
          {/* Promociones Destacadas */}
          <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-6 mb-8 text-center space-y-4">
            <h3 className="text-2xl font-josefin font-bold text-amber-800 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6" />
              Promociones Exclusivas
              <Sparkles className="h-6 w-6" />
            </h3>
            <p className="text-lg text-stone-700">
              <strong>Promo 2x1 en Concierto + Biopiscinas:</strong> Compras tu entrada y traes a un acompañante <strong>GRATIS</strong>.
            </p>
            <p className="text-lg text-stone-700">
              <strong>Happy Hour 2x1 desde las 17:00 hrs:</strong> A cargo de Casawer. ¡No te pierdas el Sour de Murta y Menta Jengibre!
            </p>
          </div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              Una invitación a renovarte
            </h2>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                En el corazón del otoño, cuando la naturaleza comienza su tránsito hacia el recogimiento y la transformación, te invitamos a vivir una <strong>experiencia sensorial única</strong> en Cancagua.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                <em>"Cambio de Piel"</em> es un concierto íntimo que celebra el equinoccio y el tiempo de Pascua como símbolos de <strong>renovación, tránsito y nueva energía</strong>.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                Una velada sutil y envolvente, acompañada por el delicado concierto acústico del dúo formado por <strong>Daniela Conejero</strong> en la voz e <strong>Ítalo Aguilera</strong> en la guitarra, donde la música dialoga con el agua, el paisaje y el silencio del atardecer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experiencia Biopiscinas */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-amber-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100">
                  <Waves className="h-8 w-8 text-sky-600" />
                </div>
                <h2 className="text-4xl font-josefin font-bold text-stone-800">
                  Música desde el agua
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed">
                  La experiencia puede vivirse desde nuestras <strong>biopiscinas geotermales</strong>, permitiéndote escuchar la música mientras te relajas en el agua caliente, en plena conexión con la naturaleza.
                </p>
                <p className="text-lg text-stone-700 leading-relaxed">
                  Una invitación a soltar lo que ya cumplió su ciclo y abrir espacio a una nueva etapa.
                </p>
                <p className="text-xl text-stone-800 font-medium italic">
                  A cambiar de piel con calma, belleza y presencia.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/a7bce94e86c54e5fbb5a7bfe298b7815.png"
                  alt="Concierto acústico en Cancagua Spa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              🕯 Programa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-josefin font-bold text-stone-800">Llegada</h3>
                <p className="text-3xl font-light text-amber-700">18:30 hrs</p>
                <p className="text-stone-600">Recepción y bienvenida</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                  <Music className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-josefin font-bold text-stone-800">Concierto</h3>
                <p className="text-3xl font-light text-amber-700">19:00 - 20:30 hrs</p>
                <p className="text-stone-600">Daniela Conejero (voz) & Ítalo Aguilera (guitarra)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modalidades de entrada */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                <Ticket className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-4xl font-josefin font-bold text-stone-800">
                🎟 Modalidades de Entrada
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-8 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto">
                    <Music className="h-8 w-8 text-stone-600" />
                  </div>
                  <h3 className="text-2xl font-josefin font-bold text-stone-800">
                    Ticket Concierto
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Acceso al concierto en vivo, en cómodos sillones bordeando las biopiscinas.
                  </p>
                  <a
                    href="https://reservas.cancagua.cl/cancaguaspa/s/203139c0-f3d8-42d6-a996-15c5ed74c511"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-stone-800 hover:bg-stone-900 text-white font-semibold">
                      Reservar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow ring-2 ring-amber-300">
                <div className="bg-amber-600 text-white text-center py-2 text-sm font-semibold tracking-wide">
                  EXPERIENCIA COMPLETA
                </div>
                <CardContent className="p-8 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                    <Waves className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-josefin font-bold text-stone-800">
                    Ticket Concierto + Biopiscinas
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    Concierto + acceso a biopiscinas geotermales para extender la experiencia de relajo y conexión.
                  </p>
                  <a
                    href="https://reservas.cancagua.cl/cancaguaspa/s/203139c0-f3d8-42d6-a996-15c5ed74c511"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                      Reservar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Fechas */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              Próximas Fechas del Ciclo
            </h2>
            <p className="text-lg text-stone-600">
              Un ciclo de conciertos que acompaña los ritmos de la naturaleza
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {proximasFechas.map((evento, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700">{evento.fecha}</p>
                    <p className="text-lg font-josefin font-bold text-stone-800">{evento.titulo}</p>
                    <p className="text-sm text-stone-500">{evento.subtitulo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-amber-700 to-stone-800 p-12 text-center text-white space-y-6">
              <Music className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-4xl font-josefin font-bold">
                Reserva tu lugar
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Vive una velada de música, agua y transformación en el corazón del otoño
              </p>
              <div className="flex flex-col items-center gap-2 text-white/90 pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">Sábado 25 de Abril | 19:00 - 20:30 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Cancagua Spa & Retreat Center, Frutillar</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a
                  href="https://reservas.cancagua.cl/cancaguaspa/s/203139c0-f3d8-42d6-a996-15c5ed74c511"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-amber-700 hover:bg-stone-100 font-semibold">
                    Reservar Ahora
                  </Button>
                </a>
                <a href="https://wa.me/56989670670" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contáctanos por WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
