export interface Faq {
  question: string;
  answer: string;
  category: string;
}

/**
 * Preguntas frecuentes de Cancagua.
 *
 * Fuente: políticas oficiales entregadas por recepción y el reglamento de uso de
 * la piscina (julio 2026), más las consultas que más se repiten en WhatsApp,
 * Instagram y Facebook.
 *
 * Al editar, mantener las respuestas en una sola voz y sin promesas que el
 * sistema no pueda cumplir: esta página alimenta el marcado FAQPage que Google
 * lee, así que una respuesta desactualizada se propaga a los resultados.
 */
export const FAQS: Faq[] = [
  // ── Horarios y reservas ──────────────────────────────────────────────
  {
    category: "Horarios y reservas",
    question: "¿Cuál es el horario de Cancagua?",
    answer:
      "El uso de las instalaciones es de martes a domingo de 10:00 a 21:30 hrs, y los lunes de 14:00 a 21:30 hrs. Recepción abre a las 8:00 y la cafetería recibe desde las 9:00. El local cierra a las 22:00.",
  },
  {
    category: "Horarios y reservas",
    question: "¿Con cuánta anticipación tengo que reservar?",
    answer:
      "Los fines de semana conviene reservar con varios días de anticipación, porque la agenda se llena. Entre semana solemos tener disponibilidad incluso para el mismo día. Puedes reservar en reservas.cancagua.cl o escribirnos por WhatsApp al +56 9 4007 3999.",
  },
  {
    category: "Horarios y reservas",
    question: "¿A qué hora parten los hot tubs?",
    answer:
      "Los hot tubs tienen horarios fijos de inicio: 10:00, 10:30 y 11:00 en la mañana; 14:00, 14:30 y 15:00 en la tarde; y 18:00, 18:30 y 19:00 en la noche. Es por un tema operativo: entre un grupo y otro hay que vaciar, limpiar, llenar y volver a calentar el agua.",
  },
  {
    category: "Horarios y reservas",
    question: "¿Puedo cambiar la fecha de mi reserva?",
    answer:
      "Sí. Si avisas con al menos 72 horas de anticipación puedes cancelar o reagendar con reembolso (se descuenta el 0,25% correspondiente al cobro por transacción de Transbank). Si avisas con al menos 48 horas, puedes reagendar sin derecho a reembolso. Se puede reagendar un máximo de 2 veces por reserva.",
  },
  {
    category: "Horarios y reservas",
    question: "¿Qué pasa si aviso con menos de 48 horas?",
    answer:
      "Con menos de 48 horas de anticipación no podemos ofrecer reembolso ni reagendamiento. Te recomendamos avisarnos apenas sepas que no podrás venir.",
  },

  // ── Valores ──────────────────────────────────────────────────────────
  {
    category: "Valores",
    question: "¿Cuánto cuesta entrar a las biopiscinas geotermales?",
    answer:
      "La entrada a las biopiscinas es de $36.000 por adulto y $24.000 por niño, con una estadía de 4 horas. Incluye bata, gorro de nado, bolso y locker.",
  },
  {
    category: "Valores",
    question: "¿Cuánto cuesta un hot tub?",
    answer:
      "El hot tub es privado, solo para tu grupo: $80.000 para 1 o 2 personas, $120.000 para 3 o 4, y $150.000 para 5 a 10 personas. Incluye 2,5 horas de tinaja más 1,5 horas en la cafetería y la playa.",
  },
  {
    category: "Valores",
    question: "¿Cuánto cuesta el sauna nativo?",
    answer:
      "El sauna nativo cuesta $15.000 para 1 persona, $25.000 para 2 y $33.000 para 3. La versión privada, para hasta 6 personas, cuesta $40.000.",
  },
  {
    category: "Valores",
    question: "¿Cuánto cuesta un masaje?",
    answer:
      "El masaje de relajación de 50 minutos cuesta $45.000, y el descontracturante o mixto de 50 minutos $50.000. También tenemos versiones de 80 y 110 minutos, y otras técnicas como drenaje linfático, piedras calientes, reflexología y prenatal.",
  },
  {
    category: "Valores",
    question: "¿Qué son los Pases Reconecta?",
    answer:
      "Son experiencias que combinan dos o tres servicios en una sola visita, y salen más convenientes que contratarlos por separado. El Pase BioReconecta (biopiscinas + masaje + kayak o clase) parte en $71.000 por persona, y el Pase Bio-Reconecta Detox, que suma el sauna nativo, parte en $86.000. También hay versiones con hot tub en vez de biopiscina.",
  },

  // ── Qué incluye y qué llevar ─────────────────────────────────────────
  {
    category: "Qué incluye y qué llevar",
    question: "¿Qué incluye la entrada a las biopiscinas?",
    answer:
      "Bata, gorro de nado, bolso y locker, además de las 4 horas de estadía. No necesitas traer nada de eso.",
  },
  {
    category: "Qué incluye y qué llevar",
    question: "¿El hot tub incluye bata y toalla?",
    answer:
      "No. El hot tub es un espacio privado y te puedes cambiar ahí mismo, así que no incluye bata, toalla, gorro ni locker. Si las necesitas, las arrendamos: toalla $3.000 y bata $5.000. También puedes traer las tuyas.",
  },
  {
    category: "Qué incluye y qué llevar",
    question: "¿Qué tengo que llevar?",
    answer:
      "Traje de baño, toalla y sandalias. Y tu documento de identidad, que lo pedimos al hacer el check-in. Te esperamos 10 minutos antes de tu hora para que alcances a instalarte con calma.",
  },
  {
    category: "Qué incluye y qué llevar",
    question: "¿Puedo llevar comida o bebidas?",
    answer:
      "No se pueden ingresar alimentos del exterior. Tenemos cafetería con brunch todo el día, café de especialidad y opciones veganas, keto y sin gluten. Los productos de cafetería se piden, consumen y pagan en la cafetería.",
  },

  // ── Niños y seguridad ────────────────────────────────────────────────
  {
    category: "Niños y seguridad",
    question: "¿Pueden ir niños?",
    answer:
      "Sí, desde los 5 años y con control de esfínter (no se permite el ingreso con pañal impermeable). Los niños deben estar siempre supervisados por un adulto responsable. Ten en cuenta que el recinto no cuenta con salvavidas, por lo que cada persona es responsable de su seguridad.",
  },
  {
    category: "Niños y seguridad",
    question: "¿Los niños pueden hacerse un masaje?",
    answer:
      "Sí, siempre acompañados de un adulto dentro de la sala o en la modalidad de masaje doble. No realizamos masajes a niños solos.",
  },
  {
    category: "Niños y seguridad",
    question: "Vamos con niños, ¿qué nos recomiendan?",
    answer:
      "El hot tub, porque es un espacio privado solo para tu grupo y resulta más cómodo que el área compartida de las biopiscinas.",
  },

  // ── Cuidado del lugar ────────────────────────────────────────────────
  {
    category: "Cuidado del lugar",
    question: "¿Puedo usar bloqueador solar antes de entrar al agua?",
    answer:
      "No antes de entrar. Nuestra biopiscina se purifica con plantas y microorganismos, y los bloqueadores y productos químicos alteran ese equilibrio. Te recomendamos buscar sombra, usar ropa con protección UV y aplicar el protector solo después de salir del agua.",
  },
  {
    category: "Cuidado del lugar",
    question: "¿Se puede escuchar música?",
    answer:
      "No está permitido el uso de parlantes ni música a alto volumen. Buscamos que el lugar se mantenga tranquilo para todos.",
  },
  {
    category: "Cuidado del lugar",
    question: "¿Puedo ir con mi mascota?",
    answer:
      "Sí, siempre que no perturbe la tranquilidad del entorno, no se meta al agua y no ladre sin control. Si la mascota entra al hot tub se cobrará el uso de las piscinas del turno siguiente, ya que el agua se contamina y hay que cambiar entre 10.000 y 12.000 litros.",
  },

  // ── Otros servicios ──────────────────────────────────────────────────
  {
    category: "Otros servicios",
    question: "¿Tienen alojamiento?",
    answer:
      "No, Cancagua es un spa de día. En Frutillar podemos recomendarte el Hotel Frutillar, el Hotel Elun y varias cabañas. Y si quieres darle la vuelta al lago, te recomendamos Mareas Ralún (mareasralun.com).",
  },
  {
    category: "Otros servicios",
    question: "¿Arriendan kayak o SUP?",
    answer:
      "Sí, el arriendo de kayak o SUP cuesta $10.000 por hora por persona. En los Pases Reconecta el kayak va incluido sin costo.",
  },
  {
    category: "Otros servicios",
    question: "¿Cómo funcionan las gift cards?",
    answer:
      "Puedes comprarlas en cancagua.cl/gift-cards y te llega la tarjeta lista para regalar. Tienes 3 meses desde la fecha de compra para hacer efectivo el canje.",
  },
  {
    category: "Otros servicios",
    question: "Quiero organizar una actividad, taller o retiro. ¿Con quién hablo?",
    answer:
      "Escríbele a Bernardita Mir, nuestra encargada de Corporativos y Panoramas, a eventos@cancagua.cl y te ayudará a armar la propuesta.",
  },
  {
    category: "Otros servicios",
    question: "Olvidé algo en Cancagua, ¿cómo lo recupero?",
    answer:
      "Contáctate con recepción lo antes posible. Si encontramos el objeto lo guardamos por 40 días; pasado ese plazo puede ser desechado o donado. El retiro o el envío queda a cargo del cliente. Lamentablemente no podemos hacernos responsables si el objeto no aparece.",
  },
];

export const FAQ_CATEGORIES = Array.from(new Set(FAQS.map(f => f.category)));

export function getFaqsByCategory(category: string): Faq[] {
  return FAQS.filter(f => f.category === category);
}
