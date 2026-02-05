import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Target, Users } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

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
    <AutoTranslateProvider pageId="nosotros">
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
                <T>Nuestra Esencia</T>
              </span>
              <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">
                <T>Sobre Cancagua</T>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
                <T>Un espacio de bienestar en armonía con la naturaleza</T>
              </p>
            </div>
          </section>

          {/* Nuestra Historia */}
          <section className="py-20 md:py-28 bg-white">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                    <T>Orígenes</T>
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide text-[#3a3a3a]">
                    <T>Nuestra Historia</T>
                  </h2>
                </div>
                <div className="space-y-6 text-[#8C8C8C]">
                  <p className="text-lg leading-relaxed">
                    <T>Cancagua nace del sueño de crear un espacio donde las personas puedan reconectar con la naturaleza y consigo mismas. Ubicados a orillas del Lago Llanquihue, en Frutillar, hemos desarrollado las primeras biopiscinas geotermales del mundo, combinando innovación tecnológica con respeto por el medio ambiente.</T>
                  </p>
                  <p className="text-lg leading-relaxed">
                    <T>Nuestro proyecto comenzó con la visión de ofrecer una alternativa de bienestar que fuera completamente natural y sostenible. Las biopiscinas utilizan un sistema de purificación biológica, sin cloro ni químicos, manteniendo el agua a una temperatura constante de 37º-40º gracias a la energía geotérmica.</T>
                  </p>
                  <p className="text-lg leading-relaxed">
                    <T>Con el tiempo, Cancagua ha crecido para convertirse en un centro integral de bienestar, ofreciendo hot tubs, masajes, clases de yoga y movimiento, eventos especiales y una cafetería saludable. Todo esto en un entorno natural privilegiado, rodeado de bosque nativo y con vistas espectaculares al lago y los volcanes.</T>
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
                      <T>Propósito</T>
                    </span>
                    <h3 className="text-2xl font-light tracking-wide mb-6 text-[#3a3a3a]"><T>Nuestra Misión</T></h3>
                    <p className="text-[#8C8C8C] leading-relaxed">
                      <T>Ofrecer experiencias de bienestar integral que promuevan la reconexión con la naturaleza, el cuidado del cuerpo y la mente, y el desarrollo de una comunidad consciente y sostenible. Buscamos ser un espacio de transformación personal donde cada visitante encuentre paz, salud y renovación.</T>
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="pt-10 pb-10">
                    <span className="text-[#D3BC8D] text-sm tracking-[0.2em] uppercase mb-4 block">
                      <T>Futuro</T>
                    </span>
                    <h3 className="text-2xl font-light tracking-wide mb-6 text-[#3a3a3a]"><T>Nuestra Visión</T></h3>
                    <p className="text-[#8C8C8C] leading-relaxed">
                      <T>Ser reconocidos como el principal centro de bienestar sostenible del sur de Chile, referentes en innovación ecológica y experiencias transformadoras. Aspiramos a expandir nuestro modelo de biopiscinas geotermales y prácticas de bienestar consciente, inspirando a otros a adoptar estilos de vida más saludables y en armonía con el planeta.</T>
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
                  <T>Lo Que Nos Define</T>
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide text-[#3a3a3a]">
                  <T>Nuestros Valores</T>
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
                          <T>{valor.titulo}</T>
                        </h3>
                        <p className="text-sm text-[#8C8C8C] leading-relaxed">
                          <T>{valor.descripcion}</T>
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
                  <T>Compromiso Ambiental</T>
                </h2>
                <p className="text-lg text-[#3a3a3a]/80 mb-10">
                  <T>En Cancagua, la sostenibilidad no es solo una palabra, es el corazón de todo lo que hacemos. Desde nuestras biopiscinas que no utilizan químicos, hasta nuestra cafetería que trabaja con productos locales y de temporada, cada decisión está guiada por el respeto al medio ambiente.</T>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/30 backdrop-blur-sm p-8">
                    <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Energía Geotérmica</T></h3>
                    <p className="text-sm text-[#3a3a3a]/80">
                      <T>Aprovechamos la energía natural de la tierra para calentar nuestras biopiscinas</T>
                    </p>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm p-8">
                    <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Purificación Natural</T></h3>
                    <p className="text-sm text-[#3a3a3a]/80">
                      <T>Sistema biológico sin cloro ni químicos para el tratamiento del agua</T>
                    </p>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm p-8">
                    <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Productos Locales</T></h3>
                    <p className="text-sm text-[#3a3a3a]/80">
                      <T>Trabajamos con productores de la región para reducir nuestra huella de carbono</T>
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
                    <T>Ubicación</T>
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                    <T>Un Entorno Privilegiado</T>
                  </h2>
                  <p className="text-lg text-[#8C8C8C] mb-6 leading-relaxed">
                    <T>Cancagua está ubicado en uno de los lugares más hermosos del sur de Chile. A orillas del Lago Llanquihue, rodeado de bosque nativo y con vistas espectaculares a los volcanes Osorno y Calbuco, nuestro espacio es un verdadero refugio de paz y belleza natural.</T>
                  </p>
                  <p className="text-lg text-[#8C8C8C] mb-8 leading-relaxed">
                    <T>La ubicación en Frutillar, a solo 2 kilómetros de Frutillar Bajo, nos permite combinar la tranquilidad de la naturaleza con la cercanía a servicios y comodidades. Es el lugar perfecto para desconectar del estrés urbano y reconectar con lo esencial.</T>
                  </p>
                  <ul className="space-y-3 text-[#3a3a3a]">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                      <span><T>Vista panorámica al Lago Llanquihue</T></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                      <span><T>Rodeado de bosque nativo</T></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                      <span><T>Vistas a los volcanes Osorno y Calbuco</T></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                      <span><T>Aire puro y naturaleza virgen</T></span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp"
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
    </AutoTranslateProvider>
  );
}
