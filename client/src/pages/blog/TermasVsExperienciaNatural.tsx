import { BlogLayout } from '@/components/BlogLayout';
import { TreePine, Building2, Droplets, MapPin, DollarSign, Calendar, Backpack, Leaf, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export default function TermasVsExperienciaNatural() {
  return (
    <BlogLayout
        title="Termas cerca de Frutillar: tradicionales vs experiencia natural"
        excerpt="Si buscas termas cerca de Frutillar o Puerto Varas, esta guía compara las termas tradicionales del sur de Chile con alternativas naturales como las biopiscinas geotermales y hot tubs de Cancagua."
        image="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309133/cancagua/images/blog/termas-geometricas-hero.webp"
        date="29 Octubre 2025"
        author="Mario Hermosilla"
        readTime="11 min"
        category="Comparativas"
      >
        <h2>Termas cerca de Frutillar y Puerto Varas: ¿qué alternativa elegir?</h2>
        <p>
          Frutillar y Puerto Varas concentran muchas búsquedas de escapadas de bienestar: aguas calientes, termas, spa y experiencias de naturaleza. Si quieres una experiencia cerca del Lago Llanquihue sin viajar varias horas hacia complejos termales masivos, Cancagua funciona como una alternativa local: biopiscinas geotermales, hot tubs privados y espacios con cupos controlados.
        </p>
        <p>
          La decisión no es solo “termas sí o no”. Lo importante es elegir entre una infraestructura termal tradicional y una experiencia natural más silenciosa, cerca de Frutillar Bajo, con reserva previa y foco en descanso.
        </p>

        <h2>Diferencias Entre Termas Tradicionales y Experiencia Natural</h2>

        <h3>Infraestructura y Comodidades</h3>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-5 bg-gray-100 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-gray-600" />
              <h4 className="font-bold text-[#282C1C] m-0">Termas Tradicionales</h4>
            </div>
            <p className="text-gray-600 m-0">
              Apuestan por la comodidad acotada. Hay cambiadores amplios, cafeterías con menú típico, y piscinas de cemento que mantienen temperaturas constantes. Las Termas Geométricas, por ejemplo, tienen pasarelas de madera diseñadas arquitectónicamente.
            </p>
          </div>
          <div className="p-5 bg-[#F4F2ED] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="w-5 h-5 text-[#4B5872]" />
              <h4 className="font-bold text-[#282C1C] m-0">Experiencias Naturales</h4>
            </div>
            <p className="text-gray-600 m-0">
              Priorizan elementos que no puedes construir: el sonido del bosque, hot tubs que respetan el entorno, biopiscinas que se integran orgánicamente al paisaje nativo, con vista y acceso inmediato al Lago Llanquihue.
            </p>
          </div>
        </div>
        <p className="text-center italic text-gray-500">
          La diferencia no es mejor o peor. Es la intención, y se nota que es totalmente diferente.
        </p>

        <h3>Ambiente y Paisaje</h3>
        <p>
          En temporada alta, las termas tradicionales suelen estar saturadas. Es cosa de darse una vuelta en los comentarios de Google para darse cuenta que es uno de los temas de mayor discusión: el atochamiento. El ambiente es más animado, con conversaciones en tono más alto, la familia organizando el almuerzo, música de fondo que compite con los sonidos naturales.
        </p>
        <p>
          Las experiencias naturales tienen otra visión. En Cancagua, lo primero es que estás ubicado a orillas del Lago Llanquihue, y limitamos conscientemente el número de visitantes. No porque sea exclusivo (de hecho los precios muchas veces son más económicos), sino porque <strong>la calidad de la experiencia se vuelve mala cuando el espacio está saturado</strong>.
        </p>

        <blockquote>
          ¿Escuchas tu respiración cuando solo sientes el sonido del viento entre las hojas? Es distinto a cuando suena música envasada de fondo, ¿no?
        </blockquote>

        <h3>Nivel de Conexión con la Naturaleza</h3>
        <p>
          Esta es quizás la diferencia más sutil pero profunda. Las termas tradicionales te ofrecen una experiencia <em>en</em> la naturaleza del agua volcánica, indiscutible. En cambio, las experiencias naturales te invitan a ser <em>parte de</em> la naturaleza en sus detalles.
        </p>
        <p>
          Por ejemplo, en Cancagua, las biopiscinas —las primeras calientes de Chile— aprovechan la geotermia sin alterar drásticamente el ecosistema que lo rodea. Son pequeños detalles que, en suma, crean algo que puede sonar medio cursi pero es cierto: <strong>la experiencia natural crea una sensación de pertenencia al entorno</strong>, en lugar de ser solo un visitante temporal.
        </p>

        <h2>Beneficios Terapéuticos de las Aguas Termales del Sur de Chile</h2>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-6 h-6 text-slate-600" />
            </div>
            <h4 className="font-bold text-[#282C1C] mb-2">Relajación Muscular</h4>
            <p className="text-sm text-gray-600 m-0">
              El calor dilata los vasos sanguíneos, mejorando la circulación y reduciendo la tensión acumulada.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-[#282C1C] mb-2">Propiedades para la Piel</h4>
            <p className="text-sm text-gray-600 m-0">
              Minerales como azufre, litio y sodio tienen propiedades regenerativas para la piel.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreePine className="w-6 h-6 text-sage-600" />
            </div>
            <h4 className="font-bold text-[#282C1C] mb-2">Bienestar Mental</h4>
            <p className="text-sm text-gray-600 m-0">
              La experiencia termal completa genera un estado de calma profunda que impacta positivamente en la salud mental.
            </p>
          </div>
        </div>

        <h2>Regiones Clave de Termas en el Sur de Chile</h2>
        
        <div className="space-y-4 my-6">
          <div className="flex gap-4 p-4 bg-[#F4F2ED] rounded-lg">
            <MapPin className="w-6 h-6 text-[#4B5872] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#282C1C] m-0 mb-1">Región de Los Lagos</h4>
              <p className="text-gray-600 m-0 text-sm">
                El epicentro de las termas del sur. Aquí encontrarás desde experiencias masivas como Termas Geométricas hasta opciones más íntimas como Cancagua.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-[#F4F2ED] rounded-lg">
            <MapPin className="w-6 h-6 text-[#4B5872] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#282C1C] m-0 mb-1">Región de La Araucanía</h4>
              <p className="text-gray-600 m-0 text-sm">
                Ofrece termas con un carácter más rústico y menos comercial, perfectas para quienes buscan autenticidad.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-[#F4F2ED] rounded-lg">
            <MapPin className="w-6 h-6 text-[#4B5872] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#282C1C] m-0 mb-1">Región de Los Ríos</h4>
              <p className="text-gray-600 m-0 text-sm">
                Termas menos conocidas pero igualmente efectivas, con menos afluencia de turistas.
              </p>
            </div>
          </div>
        </div>

        <h2>Comparativa de Costos</h2>
        
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#282C1C] text-white">
                <th className="p-3 text-left">Concepto</th>
                <th className="p-3 text-left">Termas Tradicionales</th>
                <th className="p-3 text-left">Experiencias Naturales</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Entrada</td>
                <td className="p-3">$25.000 – $50.000 CLP</td>
                <td className="p-3">$15.000 – $35.000 CLP</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-3 font-medium">Alimentación</td>
                <td className="p-3">$8.000 – $15.000 (cafetería resort)</td>
                <td className="p-3">Opciones locales más económicas</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 font-medium">Toallas</td>
                <td className="p-3">Generalmente incluidas</td>
                <td className="p-3">A veces incluidas</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Estacionamiento</td>
                <td className="p-3">Gratuito</td>
                <td className="p-3">Gratuito</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Cuándo Ir: Temporada Alta vs Baja</h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-5 bg-clay-100 rounded-xl border border-clay-200">
            <h4 className="font-bold text-clay-800 mb-2">Temporada Alta</h4>
            <p className="text-sm text-clay-700 mb-2">Diciembre-Febrero, Julio</p>
            <ul className="text-sm text-clay-700 m-0 space-y-1">
              <li>Más concurrido</li>
              <li>Precios más altos</li>
              <li>Reserva con anticipación</li>
            </ul>
          </div>
          <div className="p-5 bg-sage-100 rounded-xl border border-sage-300">
            <h4 className="font-bold text-sage-800 mb-2">Temporada Baja</h4>
            <p className="text-sm text-sage-700 mb-2">Marzo-Junio, Sept-Nov</p>
            <ul className="text-sm text-sage-700 m-0 space-y-1">
              <li>Menos gente</li>
              <li>Precios más bajos</li>
              <li>Experiencia más tranquila</li>
            </ul>
          </div>
        </div>

        <h2>Qué Llevar en la Mochila</h2>
        
        <div className="my-6 p-6 bg-[#F4F2ED] rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Backpack className="w-6 h-6 text-[#4B5872]" />
            <h4 className="font-bold text-[#282C1C] m-0">Equipaje Esencial</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 m-0">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Traje de baño (2 si es posible)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Toalla (aunque muchas incluyen)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Bloqueador solar
              </li>
            </ul>
            <ul className="space-y-2 m-0">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Chancletas o sandalias
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Ropa cómoda para después
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sage-600" />
                Botella de agua reutilizable
              </li>
            </ul>
          </div>
        </div>

        <h2>Sostenibilidad e Impacto Ambiental</h2>
        
        <div className="my-6 p-6 bg-gradient-to-r from-sage-100 to-sage-100 rounded-xl border border-sage-300">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-sage-600" />
            <h4 className="font-bold text-sage-800 m-0">Buenas Prácticas</h4>
          </div>
          <div className="space-y-3">
            <p className="text-sage-800 m-0">
              <strong>Manejo responsable del agua:</strong> Las aguas termales son un recurso limitado. Apoya operadores que practiquen sostenibilidad.
            </p>
            <p className="text-sage-800 m-0">
              <strong>Basura cero:</strong> Lleva tu propia botella, bolsas reutilizables. Deja el lugar como lo encontraste.
            </p>
            <p className="text-sage-800 m-0">
              <strong>Apoyo a comunidades locales:</strong> Compra en negocios locales. Tu dinero impacta directamente en la comunidad.
            </p>
          </div>
        </div>

        <h2>Tu Próximo Paso</h2>
        <p>
          Ya sabes las diferencias. Ya conoces tus opciones. La pregunta ahora es: <strong>¿qué tipo de experiencia necesitas?</strong>
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-5 bg-gray-100 rounded-xl text-center">
            <Building2 className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="font-bold text-[#282C1C] mb-2">Si buscas comodidad y variedad</p>
            <p className="text-gray-600 m-0">Termas tradicionales</p>
          </div>
          <div className="p-5 bg-[#F4F2ED] rounded-xl text-center border-2 border-[#4B5872]">
            <TreePine className="w-8 h-8 text-[#4B5872] mx-auto mb-3" />
            <p className="font-bold text-[#282C1C] mb-2">Si buscas autenticidad y transformación</p>
            <p className="text-[#4B5872] font-medium m-0">Cancagua</p>
          </div>
        </div>

        <h2>Preguntas Frecuentes</h2>
        
        <div className="space-y-4 my-6">
          <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#4B5872] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#282C1C] mb-2">¿Puedo visitar las termas del sur con niños pequeños?</h4>
                <p className="text-gray-600 m-0 text-sm">
                  Tanto las termas tradicionales como las experiencias naturales suelen tener instalaciones adaptadas para familias. Cancagua recibe familias de todas las edades. En biopiscinas: niños con control de esfínter, mayores de 5 años y sin pañal.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#4B5872] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#282C1C] mb-2">¿Qué diferencia hay en términos de temperatura del agua?</h4>
                <p className="text-gray-600 m-0 text-sm">
                  Las termas tradicionales mantienen temperaturas volcánicas en piscinas construidas. En Cancagua, las biopiscinas geotérmicas mantienen todo el año entre 37° a 40°C, y los Hot Tubs aumentan a 40°-41°C en invierno.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#4B5872] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#282C1C] mb-2">¿Las experiencias naturales como Cancagua están abiertas todo el año?</h4>
                <p className="text-gray-600 m-0 text-sm">
                  Sí, operamos durante todo el año. El invierno crea una atmósfera especial cuando puedes sumergirte en agua caliente mientras observas lluvia o neblina sobre el lago.
                </p>
              </div>
            </div>
          </div>
        </div>
    </BlogLayout>
  );
}
