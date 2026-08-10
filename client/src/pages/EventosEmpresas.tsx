import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Target, Award, Calendar, Coffee, Waves, Sparkles, CheckCircle2, ArrowRight, Building2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
import { FAQS_EVENTOS } from "@/lib/faqs-eventos";

const corporateQuoteServices = [
  { id: "hot-tubs", label: "Hot-tubs", maxPeople: 60 },
  { id: "biopiscinas", label: "Biopiscinas", maxPeople: 40 },
  { id: "masajes", label: "Masajes", maxPeople: 80 },
  { id: "sauna", label: "Sauna", maxPeople: 6 },
  { id: "team-building", label: "Taller de team building", maxPeople: 80 },
  { id: "gestion-estres-ansiedad", label: "Taller de gestión del estrés y la ansiedad", maxPeople: 80 },
  { id: "respiracion-meditacion", label: "Taller de respiración y meditación", maxPeople: 80 },
  { id: "sonoterapia", label: "Sonoterapia", maxPeople: 80 },
  { id: "almuerzo-grupo", label: "Almuerzo de grupo", maxPeople: 80 },
  { id: "coffee-break", label: "Coffee break", maxPeople: 80 },
  { id: "desayuno", label: "Desayuno", maxPeople: 80 },
  { id: "tablas-picoteo", label: "Tablas de picoteo", maxPeople: 80 },
  { id: "bebestibles", label: "Bebestibles", maxPeople: 80 },
] as const;

type CorporateServiceId = (typeof corporateQuoteServices)[number]["id"];
type CorporateServiceQuantities = Partial<Record<CorporateServiceId, string>>;

const emptyCorporateForm = {
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  numberOfPeople: "",
  eventDate: "",
  objective: "",
  message: "",
};

export default function EventosEmpresas() {
  const [formData, setFormData] = useState(emptyCorporateForm);
  const [serviceQuantities, setServiceQuantities] = useState<CorporateServiceQuantities>({});

  const sendQuoteRequestMutation = trpc.contactMessages.send.useMutation({
    onSuccess: () => {
      toast.success("¡Solicitud enviada! Te contactaremos pronto con una cotización personalizada.");
      setFormData(emptyCorporateForm);
      setServiceQuantities({});
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar solicitud. Inténtalo nuevamente.");
    },
  });

  const toggleService = (serviceId: CorporateServiceId, checked: boolean) => {
    setServiceQuantities((current) => {
      const next = { ...current };
      if (checked) next[serviceId] = "";
      else delete next[serviceId];
      return next;
    });
  };

  const scrollToQuoteForm = () => {
    document.getElementById("cotizacion")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedServices = corporateQuoteServices.filter(({ id }) => id in serviceQuantities);
    const totalPeople = Number(formData.numberOfPeople);

    if (!formData.companyName.trim() || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.objective.trim()) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (!Number.isInteger(totalPeople) || totalPeople < 1 || totalPeople > 80) {
      toast.error("Indica un número total de personas entre 1 y 80.");
      return;
    }
    if (selectedServices.length === 0) {
      toast.error("Selecciona al menos un servicio para cotizar.");
      return;
    }

    const invalidService = selectedServices.find(({ id, maxPeople }) => {
      const quantity = Number(serviceQuantities[id]);
      return !Number.isInteger(quantity) || quantity < 1 || quantity > totalPeople || quantity > maxPeople;
    });
    if (invalidService) {
      toast.error(`Revisa la cantidad para ${invalidService.label}. Debe estar entre 1 y ${Math.min(totalPeople, invalidService.maxPeople)} personas.`);
      return;
    }

    const servicesSummary = selectedServices
      .map(({ id, label }) => `- ${label}: ${serviceQuantities[id]} personas`)
      .join("\n");
    const fullMessage = `SOLICITUD DE COTIZACIÓN — CORPORATIVOS\n\nEmpresa: ${formData.companyName.trim()}\nContacto: ${formData.firstName.trim()} ${formData.lastName.trim()}\nNúmero total de personas: ${totalPeople}\nFecha estimada: ${formData.eventDate || "Por definir"}\nQué está buscando la empresa: ${formData.objective.trim()}\n\nServicios solicitados:\n${servicesSummary}\n\nMensaje adicional:\n${formData.message.trim() || "Sin mensaje adicional"}`;

    sendQuoteRequestMutation.mutate({
      name: `${formData.firstName.trim()} ${formData.lastName.trim()} (${formData.companyName.trim()})`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: fullMessage,
      recipient: "eventos",
    });
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
                <T>Eventos para empresas frente al Lago Llanquihue.</T>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1] md:text-xl">
                <T>Retiros corporativos, team building y jornadas de bienestar para tu equipo en Frutillar. Hasta 80 personas, con biopiscinas geotermales, hot tubs privados, sauna y masajes.</T>
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="font-cg-mono rounded-full bg-[#FCF9F9] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-white" onClick={scrollToQuoteForm}>
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

          {/* Datos concretos — respuesta primero */}
          <section className="border-b border-black/10 bg-[#F4F2ED] px-6 py-12 md:py-16">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-px overflow-hidden rounded-[24px] border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "CAPACIDAD", value: "Hasta 80 personas", detail: "biopiscinas hasta 40; 6 hot tubs de hasta 10 cada uno" },
                  { label: "DESDE", value: "$36.000 por persona", detail: "biopiscinas, 4 horas de estadía" },
                  { label: "DURACIÓN", value: "4 horas o día completo", detail: "según el programa que armemos" },
                  { label: "RESPUESTA", value: "Menos de 24 horas", detail: "con una propuesta y valores" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#FCF9F9] p-7 md:p-8">
                    <p className="font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#827D78]"><T>{item.label}</T></p>
                    <p className="font-cg-serif mt-3 text-2xl font-normal leading-tight"><T>{item.value}</T></p>
                    <p className="font-cg-soft mt-2 text-sm leading-relaxed text-[#635E5A]"><T>{item.detail}</T></p>
                  </div>
                ))}
              </div>
              <p className="font-cg-soft mt-6 text-sm leading-relaxed text-[#635E5A]">
                <T>Estamos en Frutillar, frente al Lago Llanquihue, a poco más de una hora de Puerto Montt. Para grupos hacemos tarifas especiales.</T>
              </p>
              <Button size="lg" variant="outline" className="font-cg-mono mt-8 rounded-full border-[#333D51] bg-transparent px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-[#333D51] hover:text-white" onClick={scrollToQuoteForm}>
                <T>Solicitar cotización</T>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
              <div className="mt-10 text-center">
                <Button size="lg" className="font-cg-mono rounded-full bg-[#333D51] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#FCF9F9] hover:bg-[#1B212D]" onClick={scrollToQuoteForm}>
                  <T>Solicitar cotización</T>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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

          {/* Preguntas frecuentes */}
          <section className="px-6 py-20 md:py-28">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12">
                <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]"><T>ANTES DE COTIZAR</T></p>
                <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Preguntas frecuentes</T></h2>
              </div>
              <div className="divide-y divide-black/10 border-y border-black/10">
                {FAQS_EVENTOS.map((faq) => (
                  <div key={faq.question} className="py-7 md:py-8">
                    <h3 className="font-cg-serif text-xl font-normal leading-snug md:text-2xl"><T>{faq.question}</T></h3>
                    <p className="font-cg-soft mt-3 text-sm leading-relaxed text-[#635E5A] md:text-base"><T>{faq.answer}</T></p>
                  </div>
                ))}
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
              <form className="space-y-8 rounded-[24px] border border-white/10 bg-[#FCF9F9] p-7 text-[#222221] md:p-10" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="corporate-company" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Nombre de la empresa</T> *</Label>
                  <Input id="corporate-company" autoComplete="organization" placeholder="Tu empresa" value={formData.companyName} onChange={(event) => setFormData({ ...formData, companyName: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="corporate-first-name" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Nombre</T> *</Label>
                    <Input id="corporate-first-name" autoComplete="given-name" placeholder="Tu nombre" value={formData.firstName} onChange={(event) => setFormData({ ...formData, firstName: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="corporate-last-name" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Apellido</T> *</Label>
                    <Input id="corporate-last-name" autoComplete="family-name" placeholder="Tu apellido" value={formData.lastName} onChange={(event) => setFormData({ ...formData, lastName: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="corporate-email" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Email corporativo</T> *</Label>
                    <Input id="corporate-email" type="email" autoComplete="email" placeholder="contacto@empresa.com" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="corporate-phone" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Teléfono</T> *</Label>
                    <Input id="corporate-phone" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="corporate-total-people" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Número total de personas</T> *</Label>
                    <Input id="corporate-total-people" type="number" min="1" max="80" step="1" inputMode="numeric" placeholder="Ej: 25" value={formData.numberOfPeople} onChange={(event) => setFormData({ ...formData, numberOfPeople: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                  <div>
                    <Label htmlFor="corporate-date" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Fecha estimada</T></Label>
                    <Input id="corporate-date" type="date" value={formData.eventDate} onChange={(event) => setFormData({ ...formData, eventDate: event.target.value })} className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="corporate-objective" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>¿Qué experiencia está buscando tu empresa?</T> *</Label>
                  <Input id="corporate-objective" placeholder="Ej: team building, retiro o jornada de bienestar" value={formData.objective} onChange={(event) => setFormData({ ...formData, objective: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>

                <fieldset>
                  <legend className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Servicios que deseas cotizar</T> *</legend>
                  <p className="font-cg-soft mt-2 text-sm text-[#827D78]"><T>Al seleccionar un servicio, indica para cuántas personas lo necesitas.</T></p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {corporateQuoteServices.map(({ id, label, maxPeople }) => {
                      const selected = id in serviceQuantities;
                      const totalPeople = Number(formData.numberOfPeople);
                      const quantityLimit = totalPeople > 0 ? Math.min(totalPeople, maxPeople) : maxPeople;
                      return (
                        <div key={id} className={`rounded-2xl border p-4 transition-colors ${selected ? "border-[#4B5872] bg-[#F4F2ED]" : "border-black/10 bg-white"}`}>
                          <div className="flex items-center gap-3">
                            <Checkbox id={`corporate-service-${id}`} checked={selected} onCheckedChange={(checked) => toggleService(id, checked === true)} className="data-[state=checked]:border-[#333D51] data-[state=checked]:bg-[#333D51]" />
                            <Label htmlFor={`corporate-service-${id}`} className="font-cg-soft cursor-pointer text-base font-medium text-[#222221]"><T>{label}</T></Label>
                          </div>
                          {selected && (
                            <div className="mt-4 pl-7">
                              <Label htmlFor={`corporate-quantity-${id}`} className="font-cg-mono text-[10px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Cantidad de personas</T> *</Label>
                              <Input id={`corporate-quantity-${id}`} type="number" min="1" max={quantityLimit} step="1" inputMode="numeric" placeholder={`Máximo ${quantityLimit}`} value={serviceQuantities[id] || ""} onChange={(event) => setServiceQuantities((current) => ({ ...current, [id]: event.target.value }))} required className="mt-2 h-11 rounded-xl border-black/15 bg-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <Label htmlFor="corporate-message" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Mensaje adicional</T></Label>
                  <Textarea id="corporate-message" rows={5} placeholder="Cuéntanos objetivos, horarios u otros detalles que debamos considerar" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="mt-2 rounded-xl border-black/15 bg-white" />
                </div>

                <Button size="lg" className="font-cg-mono h-14 w-full rounded-full bg-[#333D51] text-xs font-semibold uppercase tracking-[0.15em] text-[#FCF9F9] hover:bg-[#1B212D]" type="submit" disabled={sendQuoteRequestMutation.isPending}>
                  {sendQuoteRequestMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  <T>Solicitar cotización</T>
                </Button>
                <p className="font-cg-soft text-center text-sm text-[#827D78]">
                  <T>Tu solicitud será enviada a</T>{" "}
                  <a href="mailto:eventos@cancagua.cl" className="text-[#333D51] underline underline-offset-4">eventos@cancagua.cl</a>
                </p>
              </form>
            </div>
          </section>

          {/* CTA Final */}
          <section className="bg-[#333D51] px-6 py-20 text-[#FCF9F9] md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Calendar className="mx-auto h-6 w-6 text-[#CCD1DB]" />
              <p className="font-cg-mono mt-6 text-xs uppercase tracking-[0.2em] text-[#CCD1DB]"><T>EL PRÓXIMO ENCUENTRO</T></p>
              <h2 className="font-cg-serif mt-6 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>¿Listo para crear una experiencia memorable?</T></h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1]"><T>Nuestro equipo está listo para diseñar el evento corporativo perfecto para tu empresa.</T></p>
              <Button size="lg" className="font-cg-mono mt-10 rounded-full bg-[#FCF9F9] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-white" onClick={scrollToQuoteForm}>
                <T>Solicitar cotización</T>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
      </div>
    </AutoTranslateProvider>
  );
}
