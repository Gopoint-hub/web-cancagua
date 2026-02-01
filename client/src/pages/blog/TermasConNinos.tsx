import { BlogLayout } from '@/components/BlogLayout';
import { Baby, Shield, TreePine, Users, Thermometer, AlertTriangle, Heart, CheckCircle } from 'lucide-react';

export default function TermasConNinos() {
  return (
    <BlogLayout
        title="Termas del Sur de Chile con Niños: Guía para Familias"
        excerpt="Planificar unas vacaciones en el sur de Chile con niños puede ser emocionante y estresante a la vez. Sé que muchas familias buscan «termas sur chile niños» esperando encontrar ese lugar perfecto donde los adultos puedan relajarse mientras los pequeños disfrutan seguros."
        image="/images/blog/termas-ninos-familias-hero.webp"
        date="6 Enero 2026"
        author="Mario Hermosilla"
        readTime="10 min"
        category="Familias"
      >
        <p>
          En esta guía compartiré lo que he aprendido sobre las opciones reales para familias en el sur de Chile, los desafíos que nadie menciona sobre las termas tradicionales con niños pequeños, y por qué cada vez más familias eligen alternativas como las biopiscinas naturales.
        </p>

        <h2>Por qué las familias buscan termas en el Sur de Chile</h2>
        <p>
          El sur de Chile tiene una reputación bien ganada por sus aguas termales. Desde Termas Geométricas hasta Puyehue, estas experiencias prometen conexión con la naturaleza y relax en aguas calientes naturales. Para las familias que viajan con niños, la idea es atractiva: un lugar donde todos puedan disfrutar, desconectarse de las pantallas y reconectarse como familia.
        </p>
        
        <p>
          Lo que encuentro interesante es que cuando las familias dicen «queremos ir a termas con niños», lo que realmente buscan no es necesariamente agua termal volcánica. Buscan:
        </p>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-[#f5f0e8] rounded-lg">
            <Shield className="w-6 h-6 text-[#c4a86b] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#2d3e2f]">Espacio seguro</h4>
              <p className="text-sm text-gray-600 m-0">Donde los niños puedan jugar en el agua</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f5f0e8] rounded-lg">
            <Heart className="w-6 h-6 text-[#c4a86b] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#2d3e2f]">Bienestar inclusivo</h4>
              <p className="text-sm text-gray-600 m-0">Experiencias que no excluyan a los más pequeños</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f5f0e8] rounded-lg">
            <Users className="w-6 h-6 text-[#c4a86b] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#2d3e2f]">Menos aglomeración</h4>
              <p className="text-sm text-gray-600 m-0">Que las piscinas urbanas y termas en temporada alta</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f5f0e8] rounded-lg">
            <TreePine className="w-6 h-6 text-[#c4a86b] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-[#2d3e2f]">Conexión real</h4>
              <p className="text-sm text-gray-600 m-0">Con la naturaleza del sur de Chile</p>
            </div>
          </div>
        </div>

        <h2>El desafío real de las termas tradicionales con niños</h2>
        <p>
          Aquí viene la parte que pocas guías turísticas mencionan. Las termas tradicionales del sur de Chile, aunque espectaculares, presentan varios desafíos específicos cuando viajas con niños pequeños:
        </p>

        <h3>Temperaturas extremas para cuerpos pequeños</h3>
        <div className="flex items-start gap-3 my-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <Thermometer className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 m-0">
            Las termas volcánicas naturales suelen alcanzar <strong>38-42°C</strong>, temperaturas que pueden ser incómodas o incluso riesgosas para niños menores de 5 años. Los pediatras recomiendan exposiciones cortas y supervisión constante.
          </p>
        </div>

        <h3>Acceso complicado</h3>
        <p>
          Muchas termas requieren caminatas por senderos irregulares. Termas Geométricas, por ejemplo, implica navegar pasarelas de madera con escalones hermosos para adultos, pero pueden ser estresantes con un niño de 3 años que corre en todas direcciones.
        </p>

        <h3>Horarios restrictivos y aglomeración</h3>
        <p>
          Las termas familiares más populares tienen cupos limitados. Esto significa que tienes que reservar con semanas de anticipación y, aun así, compartir pozas con muchas otras familias durante la temporada alta. He escuchado más de una historia de padres que terminaron persiguiendo a sus hijos entre pozas abarrotadas en lugar de relajarse.
        </p>

        <h3>Falta de actividades complementarias</h3>
        <p>
          Una vez que los niños se aburren del agua (y créeme, se aburren más rápido de lo que imaginas), no hay mucho más por hacer en las termas tradicionales.
        </p>

        <div className="my-8 p-6 bg-gradient-to-r from-[#2d3e2f] to-[#3d5240] rounded-xl text-white">
          <div className="flex items-start gap-4">
            <Baby className="w-8 h-8 text-[#c4a86b] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Cancagua: La alternativa natural para familias</h3>
              <p className="text-white/90 mb-4">
                Cuando fundamos Cancagua a orillas del Lago Llanquihue, queríamos crear exactamente lo que faltaba: un espacio donde las familias pudieran tener una experiencia de bienestar completa sin los inconvenientes de las termas tradicionales.
              </p>
              <p className="text-white/80 m-0">
                Nuestra propuesta es diferente: no somos termas volcánicas. Somos un centro de bienestar con <strong>biopiscinas temperadas</strong> y tinajas al aire libre que ofrecen una experiencia más controlada, segura y versátil para familias.
              </p>
            </div>
          </div>
        </div>

        <h2>¿Qué hace a Cancagua ideal para familias con niños?</h2>

        <div className="space-y-6 my-8">
          <div className="flex gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#2d3e2f] mb-2">Temperatura controlada y segura</h4>
              <p className="text-gray-600 m-0">
                Nuestras biopiscinas se mantienen entre <strong>37° y 40°C</strong>, cálidas y reconfortantes pero seguras para niños desde los 5 años. Los Hot Tubs individuales permiten ajustar la experiencia según las necesidades de cada familia.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#2d3e2f] mb-2">Entorno natural pero accesible</h4>
              <p className="text-gray-600 m-0">
                Estamos rodeados de un bosque nativo con vistas al lago y los volcanes, pero con <strong>accesos planos y seguros</strong>. No hay escaleras complicadas ni senderos resbalosos. Los niños pueden moverse libremente en un espacio contenido.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#2d3e2f] mb-2">Experiencia integral más allá del agua</h4>
              <p className="text-gray-600 m-0">
                En Cancagua no solo «te metes al agua y listo». Ofrecemos una experiencia completa que incluye <strong>alimentación consciente</strong>, espacios de descanso con vista al lago, y actividades complementarias como yoga suave.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#2d3e2f] mb-2">Menos gente, más conexión</h4>
              <p className="text-gray-600 m-0">
                Controlamos nuestros aforos para garantizar una experiencia tranquila. Esto no es una piscina municipal ni un parque acuático, es un <strong>espacio de bienestar</strong> donde las familias pueden realmente conectarse.
              </p>
            </div>
          </div>
        </div>

        <h2>Qué hacer con niños en Cancagua</h2>
        <p>
          Una pregunta que me hacen seguido: «¿Mis hijos no se van a aburrir en un spa?» La respuesta es corta: no si entendemos que Cancagua no es un spa convencional.
        </p>

        <h3>En el agua</h3>
        <p>
          Las biopiscinas tienen diferentes profundidades. Los niños pueden jugar en zonas más superficiales mientras los adultos disfrutan áreas más profundas. Las tinajas al aire libre son perfectas para familias pequeñas que quieren su propio espacio privado.
        </p>

        <h3>Explorando el entorno</h3>
        <p>
          Tenemos senderos cortos y seguros por el bosque nativo. Los niños se fascinan observando la flora local, escuchando los pájaros, y simplemente corriendo en un entorno natural. La cafetería saludable está mirando el Lago con playa para que los niños puedan correr y jugar en el Lago.
        </p>

        <h3>Momentos de quietud</h3>
        <p>
          Sí, también pueden simplemente estar. Descansar en reposeras mirando el lago, compartir una comida consciente juntos, o participar en sesiones de yoga familiar suave. Estas experiencias, aunque son menos «adrenalínicas» para los niños, crean recuerdos más profundos.
        </p>

        <div className="my-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <p className="text-amber-800 m-0">
            <strong>La clave es ajustar las expectativas:</strong> si lo que buscas es un parque de entretenciones acuático, este no es el lugar. Si buscas una experiencia de bienestar familiar donde la naturaleza es la protagonista, aquí encontrarás exactamente eso.
          </p>
        </div>

        <h2>La mejor decisión para tu familia</h2>
        <p>
          Después de compartir esta información con cientos de familias, he aprendido que no existe una respuesta única. Algunas familias con niños mayores (8 años y más) disfrutan enormemente de las termas tradicionales y pueden manejar los desafíos que mencioné. Otras, especialmente con niños pequeños o buscando una experiencia más integral, encuentran en espacios como Cancagua lo que realmente necesitaban.
        </p>

        <p>
          Mi recomendación: considera la edad de tus hijos, tu nivel de tolerancia al estrés logístico, y qué tipo de experiencia quieres crear.
        </p>

        <blockquote>
          En Cancagua creemos que el verdadero bienestar surge cuando toda la familia puede relajarse junta, sin estrés, en un entorno natural que respeta tanto la necesidad de juego de los niños como la necesidad de descanso de los adultos.
        </blockquote>

        <p>
          ¿Tu familia ya visitó termas o experiencias similares en el sur? ¿Qué fue lo más desafiante con los niños? Me encanta conocer las historias reales de otras familias viajeras.
        </p>
    </BlogLayout>
  );
}
