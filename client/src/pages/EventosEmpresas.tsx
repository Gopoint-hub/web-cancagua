import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Target, Award, Calendar, Coffee, Waves, Sparkles, CheckCircle2, ArrowRight, Building2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

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
      setFormData({ companyName: "", contactName: "", email: "", phone: "", numberOfPeople: "", eventDate: "", message: "" });
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
    const fullMessage = `SOLICITUD DE COTIZACIÓN EMPRESARIAL\n\nEmpresa: ${formData.companyName}\nContacto: ${formData.contactName}\nNúmero de personas: ${formData.numberOfPeople || "Por definir"}\nFecha estimada: ${formData.eventDate || "Por definir"}\n\nMensaje:\n${formData.message}`;
    sendQuoteRequestMutation.mutate({ name: `${formData.contactName} (${formData.companyName})`, email: formData.email, phone: formData.phone, message: fullMessage, recipient: "eventos" });
  };

  const services = [
    { icon: Waves, title: "Biopiscinas Geotermales", description: "Experiencia única en las primeras biopiscinas geotermales del mundo con vista al lago" },
    { icon: Sparkles, title: "Masajes & Spa", description: "Sesiones de relajación y bienestar para tu equipo con terapeutas profesionales" },
    { icon: Coffee, title: "Catering Gourmet", description: "Menús personalizados con productos locales y opciones para todo tipo de eventos" },
    { icon: Target, title: "Talleres Team Building", description: "Actividades diseñadas para fortalecer la cohesión y comunicación del equipo" },
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
    <AutoTranslateProvider pageId="eventos-empresas">
      <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
          {/* Hero */}
          <section className="relative min-h-[680px] overflow-hidden bg-[#1B212D] px-6 pb-20 pt-32 text-[#FCF9F9] md:pb-28">
            <img src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309165/cancagua/images/eventos-empresas-hero.jpg" alt="Equipo compartiendo una experiencia corporativa en Cancagua" className="absolute inset-0 h-full w-full object-cover opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B212D] via-[#1B212D]/80 to-[#1B212D]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D] via-transparent to-[#1B212D]/25" />
            <div className="relative mx-auto flex min-h-[500px] max-w-6xl items-end">
              <div className="max-w-4xl">
              <p className="font-cg-mono flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#CCD1DB]"><Building2 className="h-4 w-4" /><T>BIENESTAR EN EQUIPO</T></p>
              <h1 className="font-cg-serif mt-8 max-w-3xl text-5xl font-normal leading-[1.03] tracking-[-0.025em] md:text-7xl lg:text-[5.25rem]">
                <T>Encuentros que transforman la manera de trabajar juntos.</T>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1] md:text-xl">
                <T>Retiros empresariales, team building y experiencias únicas para tu equipo en un entorno natural privilegiado</T>
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="font-cg-mono rounded-full bg-[#FCF9F9] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-white" onClick={() => document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' })}>
                  <T>Solicitar Cotización</T>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="font-cg-mono rounded-full border-white/60 bg-transparent px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/10 hover:text-white" onClick={() => window.location.href = 'tel:+56940073999'}>
                  <T>Llamar Ahora</T>
                </Button>
              </div>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="border-b border-black/10 bg-[#FCF9F9] px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 border-b border-black/10 pb-12 md:grid-cols-2 md:items-end">
                <div>
                  <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]"><T>¿POR QUÉ CANCAGUA?</T></p>
                  <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Un lugar para cambiar de perspectiva.</T></h2>
                </div>
                <p className="max-w-xl text-lg font-light leading-relaxed text-[#635E5A] md:justify-self-end"><T>Combinamos bienestar, naturaleza y experiencias significativas para fortalecer a tu organización.</T></p>
              </div>
              <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="rounded-none border-0 bg-[#F4F2ED] shadow-none">
                    <CardContent className="p-7 md:p-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#696F4D]" />
                        <p className="font-cg-soft text-sm leading-relaxed text-[#46423F]"><T>{benefit}</T></p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Servicios */}
          <section className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 max-w-3xl">
                <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]"><T>NUESTROS SERVICIOS</T></p>
                <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Experiencias diseñadas para empresas.</T></h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card key={index} className="rounded-[20px] border border-black/10 bg-[#FCF9F9] shadow-none">
                      <CardContent className="p-7 md:p-9">
                        <div className="flex items-start gap-6">
                          <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#333D51]">
                            <Icon className="h-5 w-5 text-[#FCF9F9]" />
                          </div>
                          <div>
                            <h3 className="font-cg-serif text-2xl font-normal leading-tight"><T>{service.title}</T></h3>
                            <p className="mt-3 text-sm font-light leading-relaxed text-[#635E5A]"><T>{service.description}</T></p>
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
          <section className="border-y border-black/10 bg-[#FCF9F9] px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 max-w-3xl">
                <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]"><T>FORMATOS A TU MEDIDA</T></p>
                <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Programas corporativos con propósito.</T></h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="rounded-[20px] border border-black/10 bg-[#F4F2ED] shadow-none">
                  <CardContent className="p-8">
                    <Users className="mb-8 h-8 w-8 text-[#696F4D]" />
                    <p className="font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#827D78]">01 · PAUSA</p>
                    <h3 className="font-cg-serif mt-4 text-2xl font-normal leading-tight"><T>Retiros Corporativos</T></h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#635E5A]"><T>Jornadas de desconexión y reconexión para equipos de trabajo, con actividades de bienestar y estrategia</T></p>
                  </CardContent>
                </Card>
                <Card className="rounded-[20px] border border-black/10 bg-[#F4F2ED] shadow-none">
                  <CardContent className="p-8">
                    <Target className="mb-8 h-8 w-8 text-[#696F4D]" />
                    <p className="font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#827D78]">02 · CONEXIÓN</p>
                    <h3 className="font-cg-serif mt-4 text-2xl font-normal leading-tight">Team Building</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#635E5A]"><T>Actividades diseñadas para fortalecer la cohesión, comunicación y trabajo en equipo</T></p>
                  </CardContent>
                </Card>
                <Card className="rounded-[20px] border border-black/10 bg-[#F4F2ED] shadow-none">
                  <CardContent className="p-8">
                    <Award className="mb-8 h-8 w-8 text-[#696F4D]" />
                    <p className="font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#827D78]">03 · CELEBRACIÓN</p>
                    <h3 className="font-cg-serif mt-4 text-2xl font-normal leading-tight"><T>Eventos de Reconocimiento</T></h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#635E5A]"><T>Celebraciones corporativas, premiaciones y eventos especiales para reconocer logros</T></p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Formulario de Cotización */}
          <section id="cotizacion" className="scroll-mt-24 bg-[#1B212D] px-6 py-20 text-[#FCF9F9] md:py-28">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 max-w-3xl">
                <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]"><T>SOLICITA TU COTIZACIÓN</T></p>
                <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Diseñemos tu evento juntos.</T></h2>
                <p className="mt-6 text-lg font-light leading-relaxed text-[#D7D4D1]"><T>Completa el formulario y te contactaremos en menos de 24 horas con una propuesta personalizada.</T></p>
              </div>
              <Card className="rounded-[24px] border border-white/10 bg-[#FCF9F9] text-[#222221] shadow-none">
                <CardContent className="p-7 md:p-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Nombre de la Empresa</T> *</Label>
                        <Input id="companyName" placeholder="Tu empresa" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                      <div>
                        <Label htmlFor="contactName" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Nombre del Contacto</T> *</Label>
                        <Input id="contactName" placeholder="Tu nombre" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Email Corporativo</T> *</Label>
                        <Input id="email" type="email" placeholder="contacto@empresa.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Teléfono</T> *</Label>
                        <Input id="phone" type="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="numberOfPeople" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Número de Personas</T></Label>
                        <Input id="numberOfPeople" type="number" placeholder="Ej: 25" value={formData.numberOfPeople} onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })} className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Fecha Estimada del Evento</T></Label>
                        <Input id="eventDate" type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="mt-2 h-12 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Cuéntanos sobre tu evento</T> *</Label>
                      <Textarea id="message" placeholder="Describe el tipo de evento, objetivos, servicios de interés, etc." rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="mt-2 rounded-xl border-black/15 bg-white focus:border-[#333D51]" />
                    </div>
                    <Button size="lg" className="font-cg-mono h-14 w-full rounded-full bg-[#333D51] text-xs font-semibold uppercase tracking-[0.15em] text-[#FCF9F9] hover:bg-[#1B212D]" type="submit" disabled={sendQuoteRequestMutation.isPending}>
                      {sendQuoteRequestMutation.isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                      <T>Solicitar Cotización</T>
                    </Button>
                    <p className="font-cg-soft text-center text-sm text-[#827D78]">
                      <T>También puedes contactarnos directamente al</T>{" "}
                      <a href="tel:+56940073999" className="text-[#333D51] underline underline-offset-4">+56 9 4007 3999</a>
                      {" "}<T>o escribirnos a</T>{" "}
                      <a href="mailto:eventos@cancagua.cl" className="text-[#333D51] underline underline-offset-4">eventos@cancagua.cl</a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Final */}
          <section className="bg-[#333D51] px-6 py-20 text-[#FCF9F9] md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Calendar className="mx-auto h-6 w-6 text-[#CCD1DB]" />
              <p className="font-cg-mono mt-6 text-xs uppercase tracking-[0.2em] text-[#CCD1DB]"><T>EL PRÓXIMO ENCUENTRO</T></p>
              <h2 className="font-cg-serif mt-6 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>¿Listo para crear una experiencia memorable?</T></h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1]"><T>Nuestro equipo está listo para diseñar el evento corporativo perfecto para tu empresa.</T></p>
              <Button size="lg" className="font-cg-mono mt-10 rounded-full bg-[#FCF9F9] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-white" onClick={() => document.getElementById('cotizacion')?.scrollIntoView({ behavior: 'smooth' })}>
                <T>Solicitar Cotización Ahora</T>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
      </div>
    </AutoTranslateProvider>
  );
}
