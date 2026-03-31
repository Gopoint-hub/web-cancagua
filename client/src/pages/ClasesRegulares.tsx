import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Sparkles } from "lucide-react";
import { ReservaClasesForm } from "@/components/ReservaClasesForm";

interface ClassInfo {
  name: string;
  subtitle: string;
  description: string;
  schedule: string;
  duration: string;
  level: string;
  bookingUrl: string;
  icon: string;
}

const classes: ClassInfo[] = [
  {
    name: "Hatha Yoga",
    subtitle: "Moderado a Intenso",
    description: "Práctica dinámica que combina posturas, respiración y meditación. Ideal para quienes buscan un desafío físico y mental, mejorando fuerza, flexibilidad y concentración. Imparte Andrea Ortúzar.",
    schedule: "Lunes, Miércoles y Viernes 8:30 - 9:45",
    duration: "75 minutos",
    level: "Intermedio - Avanzado",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/7be8a0f0-1b7a-4b7a-819f-9fe38d26bca7",
    icon: "🧘"
  },
  {
    name: "Hatha Yoga",
    subtitle: "Suave",
    description: "Práctica gentil enfocada en la relajación y el estiramiento. Perfecta para principiantes o quienes buscan una experiencia más restaurativa y meditativa. Imparte Andrea Ortúzar.",
    schedule: "Lunes y Miércoles 10:15 - 11:30",
    duration: "75 minutos",
    level: "Principiante - Todos los niveles",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/f57b8d75-45e8-4811-b705-1a72637a1a50",
    icon: "🌿"
  },
  {
    name: "Entrenamiento Funcional",
    subtitle: "& Movilidad",
    description: "Entrenamiento dinámico que mejora tu fuerza, movilidad y coordinación de forma integral. Sesiones desafiantes y adaptables a todos los niveles. Imparte Bernardita Mir.",
    schedule: "Martes 8:30 - 9:30 | Jueves 8:00 - 9:00",
    duration: "60 minutos",
    level: "Moderado a Intenso",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/3a52ff0c-89cb-48cb-b2e5-f1395a6daf71",
    icon: "💪"
  },
  {
    name: "Natación en Aguas Abiertas",
    subtitle: "En el Lago Llanquihue",
    description: "Entrena natación en las aguas del Lago Llanquihue. Una experiencia única de conexión con la naturaleza mientras mejoras tu técnica y resistencia. Imparte Marco Santana.",
    schedule: "Martes y Jueves 8:30 - 9:30",
    duration: "60 minutos",
    level: "Todos los niveles",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/c6922cd2-76e3-49ab-b8c6-53f0dfa8bcd1",
    icon: "🏊"
  },
  {
    name: "Danza y Movimiento Consciente",
    subtitle: "Moderado a Intenso",
    description: "Explora el movimiento libre y consciente a través de la danza. Una práctica que conecta cuerpo, mente y emociones en un espacio seguro y liberador. Imparte Javiera Anabalón.",
    schedule: "Jueves 9:15 - 10:30",
    duration: "75 minutos",
    level: "Moderado a Intenso",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/7ca0b0a5-1282-48b7-b6ae-4b5b32eb90b5",
    icon: "💃"
  },
  {
    name: "Meditación y Respiración",
    subtitle: "Suave",
    description: "Sesión guiada de meditación y técnicas de respiración para calmar la mente, reducir el estrés y cultivar la presencia. Ideal para cerrar el día en paz. Imparte Claudia Silva.",
    schedule: "Martes 19:00 - 20:00",
    duration: "60 minutos",
    level: "Suave - Todos los niveles",
    bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/431fdc0d-c672-4dc9-a3ba-c4850ddd4504",
    icon: "🧘‍♀️"
  }
];

export default function ClasesRegulares() {
  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309082/cancagua/images/12_yoga-clases.webp"
            alt="Clases en Cancagua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-4">
            Clases Regulares
          </h1>
          <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl">
            Hatha Yoga, Entrenamiento Funcional, Natación, Danza Consciente, Meditación y más
          </p>
          <a href="#clases">
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-10 py-6"
            >
              VER CLASES
            </Button>
          </a>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
            Únete a nuestra comunidad y descubre el poder transformador del movimiento consciente. 
            Nuestras clases están diseñadas para todos los niveles, en un ambiente acogedor 
            con vista al Lago Llanquihue.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Users className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Grupos reducidos</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Sparkles className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Instructores certificados</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Calendar className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Horarios flexibles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clases */}
      <section id="clases" className="py-20 bg-[#F1E7D9]">
        <div className="container max-w-6xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-4">
            Nuestras Clases
          </h2>
          <p className="font-['Fira_Sans'] text-[#666] text-center mb-12">
            Elige la clase que mejor se adapte a tus objetivos
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((classInfo, index) => (
              <Card key={index} className="bg-white border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#3a3a3a] to-[#4a4a4a] text-white pb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{classInfo.icon}</span>
                    <div>
                      <CardTitle className="font-['Josefin_Sans'] text-xl tracking-wide">
                        {classInfo.name}
                      </CardTitle>
                      <p className="font-['Fira_Sans'] text-white/80 text-sm">
                        {classInfo.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="font-['Fira_Sans'] text-[#666] mb-6 leading-relaxed">
                    {classInfo.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-[#666]">
                      <Calendar className="h-4 w-4 text-[#D3BC8D]" />
                      <span className="font-['Fira_Sans'] text-sm">{classInfo.schedule}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#666]">
                      <Clock className="h-4 w-4 text-[#D3BC8D]" />
                      <span className="font-['Fira_Sans'] text-sm">{classInfo.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#666]">
                      <Users className="h-4 w-4 text-[#D3BC8D]" />
                      <span className="font-['Fira_Sans'] text-sm">{classInfo.level}</span>
                    </div>
                  </div>
                  
                  <a href={classInfo.bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button 
                      className="w-full bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider"
                    >
                      RESERVAR CLASE
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-12">
            Beneficios de practicar con nosotros
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg text-[#3a3a3a] mb-2">Entorno Natural</h3>
              <p className="font-['Fira_Sans'] text-sm text-[#666]">
                Practica con vista al Lago Llanquihue y los volcanes de la Patagonia
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg text-[#3a3a3a] mb-2">Comunidad</h3>
              <p className="font-['Fira_Sans'] text-sm text-[#666]">
                Únete a un grupo de personas que comparten tu pasión por el bienestar
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg text-[#3a3a3a] mb-2">Experiencia Integral</h3>
              <p className="font-['Fira_Sans'] text-sm text-[#666]">
                Combina tu clase con nuestras biopiscinas, hot tubs o cafetería
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pases y Membresías */}
      <section className="py-20 bg-[#3a3a3a] text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl mb-6">
            Pases y Membresías
          </h2>
          <p className="font-['Fira_Sans'] text-white/80 mb-8 max-w-2xl mx-auto">
            Consulta por nuestros pases mensuales y descuentos para clases regulares. 
            Contáctanos para más información sobre planes personalizados.
          </p>
          <a href="https://wa.me/56940073999?text=Hola!%20Me%20gustaría%20consultar%20por%20los%20pases%20y%20membresías%20de%20clases" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#D3BC8D] text-[#D3BC8D] hover:bg-[#D3BC8D] hover:text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-10 py-6"
            >
              CONSULTAR POR WHATSAPP
            </Button>
          </a>
        </div>
      </section>

      {/* Formulario de Reserva */}
      <section className="py-20 bg-white">
        <div className="container max-w-2xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-12">
            Reserva tu clase directamente
          </h2>
          <ReservaClasesForm 
            classes={classes.map(c => ({ name: c.name, subtitle: c.subtitle }))}
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
            Comienza tu práctica hoy
          </h2>
          <p className="font-['Fira_Sans'] text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            No necesitas experiencia previa. Nuestros instructores te guiarán en cada paso del camino.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {classes.slice(0, 2).map((classInfo, index) => (
              <a key={index} href={classInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider px-8 py-6"
                >
                  {classInfo.name} {classInfo.subtitle}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
