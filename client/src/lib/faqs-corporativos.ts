/**
 * Preguntas frecuentes de jornadas corporativas.
 *
 * Fuente única: alimenta la sección visible de /corporativos y el marcado
 * FAQPage de su +Head.tsx. Igual que en `faqs.ts`, no prometer aquí nada que la
 * operación no pueda cumplir: esto es lo que Google y los motores de IA citan.
 *
 * Precios verificados en Skedu el 3-ago-2026. Capacidades actualizadas por
 * Marketing el 3-ago-2026.
 */

export interface FaqCorporativo {
  question: string;
  answer: string;
}

export const FAQS_CORPORATIVOS: FaqCorporativo[] = [
  {
    question: "¿Para cuántas personas se puede organizar una jornada corporativa en Cancagua?",
    answer:
      "Recibimos grupos corporativos de hasta 80 personas. Las biopiscinas geotermales admiten hasta 40 personas y contamos con 6 hot tubs privados, cada uno con capacidad para hasta 10 personas. El sauna recibe de 1 a 6 personas. Para grupos grandes coordinamos los servicios por bloques a lo largo del día.",
  },
  {
    question: "¿Cuánto cuesta una jornada corporativa en Cancagua?",
    answer:
      "No hay un precio de paquete: se cotiza según el programa. Como referencia, las biopiscinas geotermales cuestan $36.000 por persona por 4 horas de estadía, el hot tub privado va de $80.000 (1 a 2 personas) a $150.000 (5 a 10 personas), el sauna desde $15.000 y los masajes desde $45.000. Para grupos hacemos tarifas especiales; escríbenos y te las pasamos.",
  },
  {
    question: "¿Qué incluye la entrada a las biopiscinas?",
    answer:
      "Cuatro horas de estadía, bata, gorro de nado y locker por persona, más acceso a la cafetería, a la playa y a vestidores con duchas. La toalla recomendamos traerla.",
  },
  {
    question: "¿Cuánto dura una jornada corporativa?",
    answer:
      "Depende del programa. Una jornada de biopiscinas son 4 horas de estadía; un hot tub son 2,5 horas en la tina más 1,5 horas de cafetería y playa. Un retiro de día completo combina varios servicios y ocupa la jornada.",
  },
  {
    question: "¿Se pueden hacer masajes para todo el equipo?",
    answer:
      "Sí, pero no todos a la misma hora: los masajes se agendan por turnos. Para grupos los distribuimos en bloques a lo largo del día mientras el resto del equipo usa las biopiscinas, el hot tub o el sauna. Por eso conviene avisarnos el número de personas con anticipación.",
  },
  {
    question: "¿Cancagua tiene alojamiento para retiros de varios días?",
    answer:
      "No contamos con alojamiento. Estamos en Frutillar y podemos recomendarte hoteles y cabañas de la zona para que el equipo se quede cerca, mientras la jornada de bienestar se hace acá.",
  },
  {
    question: "¿Se puede llevar comida o bebidas para la jornada?",
    answer:
      "No se permite el ingreso de alimentos del exterior. Tenemos cafetería propia y preparamos tablas, menús y bebestibles a pedido, que se coordinan con anticipación al armar el programa.",
  },
  {
    question: "¿Qué horarios tienen?",
    answer:
      "Las instalaciones funcionan de martes a domingo de 10:00 a 21:30, y los lunes de 14:00 a 21:30. Las jornadas corporativas se agendan dentro de ese horario.",
  },
  {
    question: "¿Dónde queda Cancagua?",
    answer:
      "En Ruta V-155, Km 2, camino a Los Bajos, Frutillar, Región de Los Lagos. Estamos frente al Lago Llanquihue y con vista a los volcanes Osorno y Calbuco, a pocos minutos del centro de Frutillar y a poco más de una hora de Puerto Montt y del aeropuerto El Tepual.",
  },
  {
    question: "¿Cómo pido una cotización?",
    answer:
      "Completa el formulario de esta página con el número de personas y la fecha estimada, o escríbenos a eventos@cancagua.cl o al +56 9 4007 3999. Respondemos con una propuesta en menos de 24 horas.",
  },
];
