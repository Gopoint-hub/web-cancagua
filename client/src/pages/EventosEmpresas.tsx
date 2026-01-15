import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Target, 
  Award, 
  Calendar, 
  Coffee, 
  Waves, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Building2,
  Loader2
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function EventosEmpresas() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    eventDate: "",
    message: "",
  });

  const sendQuoteRequestMutation = trpc.contactMessages.send.useMutation({
    onSuccess: () => {
      toast.success("¡Solicitud enviada! Te contactaremos pronto con una cotización personalizada.");
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        numberOfPeople: "",
        eventDate: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar solicitud. Inténtalo nuevamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.message) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    const fullMessage = `SOLICITUD DE COTIZACIÓN EMPRESARIAL

Empresa: ${formData.companyName}
Contacto: ${formData.contactName}
Número de personas: ${formData.numberOfPeople || "Por definir"}
Fecha estimada: ${formData.eventDate || "Por definir"}

Mensaje:
${formData.message}`;

    sendQuoteRequestMutation.mutate({
      name: `${formData.contactName} (${formData.companyName})`,
      email: formData.email,
      phone: formData.phone,
      message: fullMessage,
    });
  };

  const services = [
    {
      icon: Waves,
      title: "Biopiscinas Geotermales",
      description: "Experiencia única en las primeras biopiscinas geotermales del mundo con vista al lago",
    },
    {
      icon: Sparkles,
      title: "Masajes & Spa",
      description: "Sesiones de relajación y bienestar para tu equipo con terapeutas profesionales",
    },
    {
      icon: Coffee,
      title: "Catering Gourmet",
      description: "Menús personalizados con productos locales y opciones para todo tipo de eventos",
    },
    {
      icon: Target,
      title: "Talleres Team Building",
      description: "Actividades diseñadas para fortalecer la cohesión y comunicación del equipo",
    },
  ];

  const benefits = [
    "Entorno natural privilegiado frente al Lago Llanquihue",
    "Instalaciones modernas y equipadas para eventos corporativos",
    "Programas personalizados según objetivos de tu empresa",
    "Coordinación integral del evento de principio a fin",
    "Experiencias únicas que generan impacto duradero",
    "Ubicación estratégica en la Región de Los Lagos",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white px-4">
            <Building2 className="h-16 w-16 text-[#D3BC8D] mb-6" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">
              Eventos Corporativos
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl font-light opacity-95 mb-8">
              Retiros empresariales, team building y experiencias únicas para tu equipo en un entorno natural privilegiado
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider text-lg px-8"
                onClick={() => document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 tracking-wider text-lg px-8"
                onClick={() => window.location.href = 'tel:+56940073999'}
              >
                Llamar Ahora
              </Button>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                ¿Por qué elegir Cancagua?
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                El Lugar Perfecto para tu Equipo
              </h2>
              <p className="text-lg text-[#8C8C8C] max-w-3xl mx-auto">
                Ofrecemos experiencias corporativas que combinan bienestar, naturaleza y resultados tangibles para tu organización
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-sm bg-[#FDFBF7] hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#D3BC8D] flex-shrink-0 mt-1" />
                      <p className="text-[#3a3a3a] leading-relaxed">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-20 bg-[#F1E7D9]">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Nuestros Servicios
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Experiencias Diseñadas para Empresas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="border-none shadow-sm bg-white hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8">
                      <div className="flex items-start gap-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 flex-shrink-0">
                          <Icon className="h-8 w-8 text-[#D3BC8D]" />
                        </div>
                        <div>
                          <h3 className="font-light text-xl tracking-wide mb-3 text-[#3a3a3a]">
                            {service.title}
                          </h3>
                          <p className="text-[#8C8C8C] leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tipos de Eventos */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Eventos que Organizamos
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Programas Corporativos a Medida
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <Users className="h-12 w-12 text-[#D3BC8D] mx-auto mb-6" />
                  <h3 className="font-light text-xl tracking-wide mb-4 text-[#3a3a3a]">
                    Retiros Corporativos
                  </h3>
                  <p className="text-[#8C8C8C] leading-relaxed">
                    Jornadas de desconexión y reconexión para equipos de trabajo, con actividades de bienestar y estrategia
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <Target className="h-12 w-12 text-[#D3BC8D] mx-auto mb-6" />
                  <h3 className="font-light text-xl tracking-wide mb-4 text-[#3a3a3a]">
                    Team Building
                  </h3>
                  <p className="text-[#8C8C8C] leading-relaxed">
                    Actividades diseñadas para fortalecer la cohesión, comunicación y trabajo en equipo
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <Award className="h-12 w-12 text-[#D3BC8D] mx-auto mb-6" />
                  <h3 className="font-light text-xl tracking-wide mb-4 text-[#3a3a3a]">
                    Eventos de Reconocimiento
                  </h3>
                  <p className="text-[#8C8C8C] leading-relaxed">
                    Celebraciones corporativas, premiaciones y eventos especiales para reconocer logros
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Formulario de Cotización */}
        <section id="cotizacion" className="py-20 bg-[#F1E7D9]">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Solicita tu Cotización
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Diseñemos tu Evento Juntos
              </h2>
              <p className="text-lg text-[#8C8C8C]">
                Completa el formulario y te contactaremos en menos de 24 horas con una propuesta personalizada
              </p>
            </div>

            <Card className="border-none shadow-lg bg-white">
              <CardContent className="pt-8 pb-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName" className="text-[#3a3a3a]">Nombre de la Empresa *</Label>
                      <Input
                        id="companyName"
                        placeholder="Tu empresa"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactName" className="text-[#3a3a3a]">Nombre del Contacto *</Label>
                      <Input
                        id="contactName"
                        placeholder="Tu nombre"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        required
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-[#3a3a3a]">Email Corporativo *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-[#3a3a3a]">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="numberOfPeople" className="text-[#3a3a3a]">Número de Personas</Label>
                      <Input
                        id="numberOfPeople"
                        type="number"
                        placeholder="Ej: 25"
                        value={formData.numberOfPeople}
                        onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventDate" className="text-[#3a3a3a]">Fecha Estimada del Evento</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#3a3a3a]">Cuéntanos sobre tu evento *</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe el tipo de evento, objetivos, servicios de interés, etc."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
                    />
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider text-lg" 
                    type="submit"
                    disabled={sendQuoteRequestMutation.isPending}
                  >
                    {sendQuoteRequestMutation.isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                    Solicitar Cotización
                  </Button>

                  <p className="text-sm text-[#8C8C8C] text-center">
                    También puedes contactarnos directamente al{" "}
                    <a href="tel:+56940073999" className="text-[#D3BC8D] hover:underline">
                      +56 9 4007 3999
                    </a>
                    {" "}o escribirnos a{" "}
                    <a href="mailto:eventos@cancagua.cl" className="text-[#D3BC8D] hover:underline">
                      eventos@cancagua.cl
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#44580E] text-white">
          <div className="container text-center">
            <Calendar className="h-16 w-16 text-[#D3BC8D] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
              ¿Listo para Crear una Experiencia Memorable?
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Nuestro equipo está listo para diseñar el evento corporativo perfecto para tu empresa
            </p>
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider text-lg px-8"
              onClick={() => document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Solicitar Cotización Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
