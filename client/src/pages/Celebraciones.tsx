import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

const celebrationServices = [
  { id: "hot-tub", label: "Hot-tub" },
  { id: "biopiscinas", label: "Biopiscinas" },
  { id: "masajes", label: "Masajes" },
  { id: "sauna", label: "Sauna" },
  { id: "almuerzo-grupo", label: "Almuerzo de grupo" },
  { id: "coffee-break", label: "Coffee break" },
  { id: "desayuno", label: "Desayuno" },
  { id: "tablas-picoteo", label: "Tablas de picoteo" },
  { id: "bebestibles", label: "Bebestibles" },
] as const;

type ServiceId = (typeof celebrationServices)[number]["id"];
type ServiceQuantities = Partial<Record<ServiceId, string>>;

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  celebration: "",
  message: "",
};

export default function Celebraciones() {
  const [formData, setFormData] = useState(emptyForm);
  const [serviceQuantities, setServiceQuantities] = useState<ServiceQuantities>({});

  const sendQuoteRequestMutation = trpc.contactMessages.send.useMutation({
    onSuccess: () => {
      toast.success("¡Solicitud enviada! Te contactaremos pronto para preparar tu cotización.");
      setFormData(emptyForm);
      setServiceQuantities({});
    },
    onError: (error) => {
      toast.error(error.message || "No pudimos enviar la solicitud. Inténtalo nuevamente.");
    },
  });

  const toggleService = (serviceId: ServiceId, checked: boolean) => {
    setServiceQuantities((current) => {
      const next = { ...current };
      if (checked) next[serviceId] = "";
      else delete next[serviceId];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedServices = celebrationServices.filter(({ id }) => id in serviceQuantities);
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.celebration.trim()) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (selectedServices.length === 0) {
      toast.error("Selecciona al menos un servicio para cotizar.");
      return;
    }

    const serviceWithoutQuantity = selectedServices.find(({ id }) => {
      const quantity = Number(serviceQuantities[id]);
      return !Number.isInteger(quantity) || quantity < 1;
    });
    if (serviceWithoutQuantity) {
      toast.error(`Indica para cuántas personas necesitas ${serviceWithoutQuantity.label}.`);
      return;
    }

    const servicesSummary = selectedServices
      .map(({ id, label }) => `- ${label}: ${serviceQuantities[id]} personas`)
      .join("\n");
    const fullMessage = `SOLICITUD DE COTIZACIÓN — CELEBRACIONES\n\nQué está celebrando: ${formData.celebration.trim()}\n\nServicios solicitados:\n${servicesSummary}\n\nMensaje adicional:\n${formData.message.trim() || "Sin mensaje adicional"}`;

    sendQuoteRequestMutation.mutate({
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: fullMessage,
      recipient: "eventos",
    });
  };

  return (
    <AutoTranslateProvider pageId="celebraciones">
      <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
        <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#1B212D] px-6 pb-20 pt-32 text-[#FCF9F9] md:pb-28">
          <img
            src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp"
            alt="Celebraciones en Cancagua junto a las biopiscinas"
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B212D] via-[#1B212D]/70 to-[#1B212D]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D] via-transparent to-[#1B212D]/20" />
          <div className="relative mx-auto w-full max-w-6xl">
            <div className="max-w-4xl">
              <p className="font-cg-mono flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">
                <Sparkles className="h-4 w-4" />
                <T>MOMENTOS PARA COMPARTIR</T>
              </p>
              <h1 className="font-cg-serif mt-8 text-5xl font-normal leading-[1.03] tracking-[-0.025em] md:text-7xl lg:text-[5.5rem]">
                <T>Celebraciones</T>
              </h1>
              <p className="font-cg-soft mt-7 max-w-2xl text-lg font-light normal-case leading-relaxed tracking-normal text-[#E7E3DF] md:text-2xl">
                <T>Celebra tus momentos especiales en un entorno único</T>
              </p>
              <Button
                size="lg"
                className="font-cg-mono mt-10 rounded-full bg-[#FCF9F9] px-8 py-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51] hover:bg-white"
                onClick={() => document.getElementById("cotizacion-celebraciones")?.scrollIntoView({ behavior: "smooth" })}
              >
                <T>Cotizar mi celebración</T>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-[#FCF9F9] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]"><T>CELEBRA EN CANCAGUA</T></p>
              <h2 className="font-cg-serif mt-5 text-4xl font-normal tracking-[-0.02em] md:text-6xl"><T>Celebra con nosotros</T></h2>
              <p className="font-cg-soft mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#635E5A]">
                <T>Cumpleaños, aniversarios, despedidas, reuniones familiares y otros momentos especiales, diseñados a tu medida entre el lago y el bosque nativo.</T>
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[24px] border border-black/10 bg-black/10 md:grid-cols-3">
              {[
                { icon: Calendar, title: "Celebraciones personalizadas", description: "Diseñamos una experiencia que se adapte a tu ocasión y a tu grupo" },
                { icon: Users, title: "Grupos pequeños y grandes", description: "Combinamos espacios y servicios según la cantidad de invitados" },
                { icon: Sparkles, title: "Experiencia única", description: "Biopiscinas, hot tubs, masajes, gastronomía y mucho más" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="bg-[#F4F2ED] p-8 text-center md:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#333D51]">
                      <Icon className="h-6 w-6 text-[#FCF9F9]" />
                    </div>
                    <h3 className="font-cg-serif mt-7 text-2xl font-normal leading-tight"><T>{item.title}</T></h3>
                    <p className="font-cg-soft mt-4 text-sm font-light leading-relaxed text-[#635E5A]"><T>{item.description}</T></p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cotizacion-celebraciones" className="scroll-mt-24 bg-[#1B212D] px-6 py-20 text-[#FCF9F9] md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 max-w-3xl">
              <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]"><T>SOLICITA UNA PROPUESTA</T></p>
              <h2 className="font-cg-serif mt-5 text-4xl font-normal leading-tight tracking-[-0.02em] md:text-6xl"><T>Cuéntanos qué quieres celebrar.</T></h2>
              <p className="font-cg-soft mt-6 text-lg font-light leading-relaxed text-[#D7D4D1]"><T>Selecciona los servicios y la cantidad de personas para preparar una cotización a tu medida.</T></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 rounded-[24px] border border-white/10 bg-[#FCF9F9] p-7 text-[#222221] md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="celebration-first-name" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Nombre</T> *</Label>
                  <Input id="celebration-first-name" autoComplete="given-name" placeholder="Tu nombre" value={formData.firstName} onChange={(event) => setFormData({ ...formData, firstName: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>
                <div>
                  <Label htmlFor="celebration-last-name" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Apellido</T> *</Label>
                  <Input id="celebration-last-name" autoComplete="family-name" placeholder="Tu apellido" value={formData.lastName} onChange={(event) => setFormData({ ...formData, lastName: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>
                <div>
                  <Label htmlFor="celebration-email" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Email</T> *</Label>
                  <Input id="celebration-email" type="email" autoComplete="email" placeholder="tu@email.com" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>
                <div>
                  <Label htmlFor="celebration-phone" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Teléfono</T> *</Label>
                  <Input id="celebration-phone" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
                </div>
              </div>

              <div>
                <Label htmlFor="celebration-type" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>¿Qué estás celebrando?</T> *</Label>
                <Input id="celebration-type" placeholder="Ej: cumpleaños, aniversario o reunión familiar" value={formData.celebration} onChange={(event) => setFormData({ ...formData, celebration: event.target.value })} required className="mt-2 h-12 rounded-xl border-black/15 bg-white" />
              </div>

              <fieldset>
                <legend className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Servicios que deseas cotizar</T> *</legend>
                <p className="font-cg-soft mt-2 text-sm text-[#827D78]"><T>Al seleccionar un servicio, indica para cuántas personas lo necesitas.</T></p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {celebrationServices.map(({ id, label }) => {
                    const selected = id in serviceQuantities;
                    return (
                      <div key={id} className={`rounded-2xl border p-4 transition-colors ${selected ? "border-[#4B5872] bg-[#F4F2ED]" : "border-black/10 bg-white"}`}>
                        <div className="flex items-center gap-3">
                          <Checkbox id={`service-${id}`} checked={selected} onCheckedChange={(checked) => toggleService(id, checked === true)} className="data-[state=checked]:border-[#333D51] data-[state=checked]:bg-[#333D51]" />
                          <Label htmlFor={`service-${id}`} className="font-cg-soft cursor-pointer text-base font-medium text-[#222221]"><T>{label}</T></Label>
                        </div>
                        {selected && (
                          <div className="mt-4 pl-7">
                            <Label htmlFor={`quantity-${id}`} className="font-cg-mono text-[10px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Cantidad de personas</T> *</Label>
                            <Input id={`quantity-${id}`} type="number" min="1" step="1" inputMode="numeric" placeholder="Ej: 10" value={serviceQuantities[id] || ""} onChange={(event) => setServiceQuantities((current) => ({ ...current, [id]: event.target.value }))} required className="mt-2 h-11 rounded-xl border-black/15 bg-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <Label htmlFor="celebration-message" className="font-cg-mono text-[11px] uppercase tracking-[0.12em] text-[#635E5A]"><T>Mensaje adicional</T></Label>
                <Textarea id="celebration-message" rows={5} placeholder="Cuéntanos cualquier detalle que debamos considerar" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="mt-2 rounded-xl border-black/15 bg-white" />
              </div>

              <Button type="submit" size="lg" disabled={sendQuoteRequestMutation.isPending} className="font-cg-mono h-14 w-full rounded-full bg-[#333D51] text-xs font-semibold uppercase tracking-[0.15em] text-[#FCF9F9] hover:bg-[#1B212D]">
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
      </div>
    </AutoTranslateProvider>
  );
}
