import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Target, Users } from "lucide-react";

export default function Nosotros() {
  const valores = [
    {
      icon: Leaf,
      titulo: "Sostenibilidad",
      descripcion:
        "Respetamos y cuidamos el medio ambiente en cada aspecto de nuestras operaciones.",
    },
    {
      icon: Heart,
      titulo: "Bienestar Integral",
      descripcion:
        "Promovemos el equilibrio entre cuerpo, mente y espíritu a través de nuestros servicios.",
    },
    {
      icon: Users,
      titulo: "Comunidad",
      descripcion:
        "Creamos espacios de conexión y pertenencia para todos quienes nos visitan.",
    },
    {
      icon: Target,
      titulo: "Excelencia",
      descripcion:
        "Nos comprometemos a ofrecer experiencias de la más alta calidad en cada detalle.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
              Nuestra Esencia
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
              Sobre Cancagua
            </h1>
            <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
              Un espacio de bienestar en armonía con la naturaleza
            </p>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                  Orígenes
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide text-[#3a3a3a]">
                  Nuestra Historia
                </h2>
              </div>
              <div className="space-y-6 text-[#8C8C8C]">
                <p className="text-lg leading-relaxed">
                  Cancagua nace del sueño de crear un espacio donde las personas
                  puedan reconectar con la naturaleza y consigo mismas. Ubicados
                  a orillas del Lago Llanquihue, en Frutillar, hemos desarrollado
                  las primeras biopiscinas geotermales del mundo, combinando
                  innovación tecnológica con respeto por el medio ambiente.
                </p>
                <p className="text-lg leading-relaxed">
                  Nuestro proyecto comenzó con la visión de ofrecer una
                  alternativa de bienestar que fuera completamente natural y
                  sostenible. Las biopiscinas utilizan un sistema de purificación
                  biológica, sin cloro ni químicos, manteniendo el agua a una
                  temperatura constante de 37º-40º gracias a la energía
                  geotérmica.
                </p>
                <p className="text-lg leading-relaxed">
                  Con el tiempo, Cancagua ha crecido para convertirse en un
                  centro integral de bienestar, ofreciendo hot tubs, masajes,
                  clases de yoga y movimiento, eventos especiales y una cafetería
                  saludable. Todo esto en un entorno natural privilegiado, rodeado
                  de bosque nativo y con vistas espectaculares al lago y los
                  volcanes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-20 bg-[#F1E7D9]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="border-none shadow-sm bg-white">
                <CardContent className="pt-10 pb-10">
                  <span className="text-[#D3BC8D] text-sm tracking-[0.2em] uppercase mb-4 block">
                    Propósito
                  </span>
                  <h3 className="text-2xl font-light tracking-wide mb-6 text-[#3a3a3a]">Nuestra Misión</h3>
                  <p className="text-[#8C8C8C] leading-relaxed">
                    Ofrecer experiencias de bienestar integral que promuevan la
                    reconexión con la naturaleza, el cuidado del cuerpo y la
                    mente, y el desarrollo de una comunidad consciente y
                    sostenible. Buscamos ser un espacio de transformación
                    personal donde cada visitante encuentre paz, salud y
                    renovación.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardContent className="pt-10 pb-10">
                  <span className="text-[#D3BC8D] text-sm tracking-[0.2em] uppercase mb-4 block">
                    Futuro
                  </span>
                  <h3 className="text-2xl font-light tracking-wide mb-6 text-[#3a3a3a]">Nuestra Visión</h3>
                  <p className="text-[#8C8C8C] leading-relaxed">
                    Ser reconocidos como el principal centro de bienestar
                    sostenible del sur de Chile, referentes en innovación
                    ecológica y experiencias transformadoras. Aspiramos a
                    expandir nuestro modelo de biopiscinas geotermales y
                    prácticas de bienestar consciente, inspirando a otros a
                    adoptar estilos de vida más saludables y en armonía con el
                    planeta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Lo Que Nos Define
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-[#3a3a3a]">
                Nuestros Valores
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <Card key={index} className="border-none shadow-sm bg-[#FDFBF7]">
                    <CardContent className="pt-10 pb-10 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                        <Icon className="h-7 w-7 text-[#D3BC8D]" />
                      </div>
                      <h3 className="font-light text-xl tracking-wide mb-4 text-[#3a3a3a]">
                        {valor.titulo}
                      </h3>
                      <p className="text-sm text-[#8C8C8C] leading-relaxed">
                        {valor.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compromiso Ambiental */}
        <section className="py-20 bg-[#D3BC8D]">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Leaf className="h-14 w-14 mx-auto mb-6 text-[#3a3a3a]" />
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Compromiso Ambiental
              </h2>
              <p className="text-lg text-[#3a3a3a]/80 mb-10">
                En Cancagua, la sostenibilidad no es solo una palabra, es el
                corazón de todo lo que hacemos. Desde nuestras biopiscinas que
                no utilizan químicos, hasta nuestra cafetería que trabaja con
                productos locales y de temporada, cada decisión está guiada por
                el respeto al medio ambiente.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/30 backdrop-blur-sm p-8">
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Energía Geotérmica</h3>
                  <p className="text-sm text-[#3a3a3a]/80">
                    Aprovechamos la energía natural de la tierra para calentar
                    nuestras biopiscinas
                  </p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-8">
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Purificación Natural</h3>
                  <p className="text-sm text-[#3a3a3a]/80">
                    Sistema biológico sin cloro ni químicos para el tratamiento
                    del agua
                  </p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm p-8">
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Productos Locales</h3>
                  <p className="text-sm text-[#3a3a3a]/80">
                    Trabajamos con productores de la región para reducir nuestra
                    huella de carbono
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                  Ubicación
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                  Un Entorno Privilegiado
                </h2>
                <p className="text-lg text-[#8C8C8C] mb-6 leading-relaxed">
                  Cancagua está ubicado en uno de los lugares más hermosos del
                  sur de Chile. A orillas del Lago Llanquihue, rodeado de bosque
                  nativo y con vistas espectaculares a los volcanes Osorno y
                  Calbuco, nuestro espacio es un verdadero refugio de paz y
                  belleza natural.
                </p>
                <p className="text-lg text-[#8C8C8C] mb-8 leading-relaxed">
                  La ubicación en Frutillar, a solo 2 kilómetros de Frutillar
                  Bajo, nos permite combinar la tranquilidad de la naturaleza con
                  la cercanía a servicios y comodidades. Es el lugar perfecto
                  para desconectar del estrés urbano y reconectar con lo
                  esencial.
                </p>
                <ul className="space-y-3 text-[#3a3a3a]">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span>Vista panorámica al Lago Llanquihue</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span>Rodeado de bosque nativo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span>Vistas a los volcanes Osorno y Calbuco</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span>Aire puro y naturaleza virgen</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/02_biopiscinas-hero.jpg"
                  alt="Cancagua vista al lago"
                  className="shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
