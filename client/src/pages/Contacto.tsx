import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const sendMessageMutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      toast.success("¡Mensaje enviado exitosamente! Te responderemos pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar mensaje. Inténtalo nuevamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    sendMessageMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
              Hablemos
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4">Contacto</h1>
            <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
              Estamos aquí para ayudarte
            </p>
          </div>
        </section>

        {/* Información de contacto */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                    <MapPin className="h-7 w-7 text-[#D3BC8D]" />
                  </div>
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Ubicación</h3>
                  <p className="text-sm text-[#8C8C8C] leading-relaxed">
                    Frutillar, Región de Los Lagos
                    <br />
                    Chile
                    <br />
                    (2 kms de Frutillar Bajo)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                    <Phone className="h-7 w-7 text-[#D3BC8D]" />
                  </div>
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Teléfono</h3>
                  <a
                    href="tel:+56940073999"
                    className="text-sm text-[#8C8C8C] hover:text-[#D3BC8D] transition-colors block"
                  >
                    +56 9 4007 3999
                  </a>
                  <a
                    href="tel:+56988190248"
                    className="text-sm text-[#8C8C8C] hover:text-[#D3BC8D] transition-colors block mt-1"
                  >
                    +56 9 8819 0248
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                    <Mail className="h-7 w-7 text-[#D3BC8D]" />
                  </div>
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Email</h3>
                  <a
                    href="mailto:contacto@cancagua.cl"
                    className="text-sm text-[#8C8C8C] hover:text-[#D3BC8D] transition-colors"
                  >
                    contacto@cancagua.cl
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#FDFBF7]">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                    <Clock className="h-7 w-7 text-[#D3BC8D]" />
                  </div>
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Horarios</h3>
                  <p className="text-sm text-[#8C8C8C] leading-relaxed">
                    Lunes a Domingo
                    <br />
                    Todo el año
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Formulario y Mapa */}
        <section className="py-20 bg-[#F1E7D9]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Formulario */}
              <div>
                <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                  Escríbenos
                </span>
                <h2 className="text-3xl font-light tracking-wide mb-4 text-[#3a3a3a]">Envíanos un Mensaje</h2>
                <p className="text-[#8C8C8C] mb-8">
                  Completa el formulario y te responderemos a la brevedad
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="text-[#3a3a3a]">Nombre Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#3a3a3a]">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-[#3a3a3a]">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-[#3a3a3a]">Asunto *</Label>
                    <Input
                      id="subject"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#3a3a3a]">Mensaje *</Label>
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="border-[#D3BC8D]/30 focus:border-[#D3BC8D] bg-white"
                    />
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider" 
                    type="submit" 
                    disabled={sendMessageMutation.isPending}
                  >
                    {sendMessageMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Enviar Mensaje
                  </Button>
                </form>
              </div>

              {/* Mapa e información adicional */}
              <div className="space-y-6">
                <div>
                  <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                    Visítanos
                  </span>
                  <h2 className="text-3xl font-light tracking-wide mb-4 text-[#3a3a3a]">Cómo Llegar</h2>
                  <p className="text-[#8C8C8C] mb-6">
                    Estamos ubicados a 2 kilómetros de Frutillar Bajo, con vista
                    privilegiada al Lago Llanquihue y los volcanes Osorno y
                    Calbuco.
                  </p>
                </div>

                {/* Mapa */}
                <div className="relative h-96 bg-white rounded-sm overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.8!2d-73.0!3d-41.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzAwLjAiUyA3M8KwMDAnMDAuMCJX!5e0!3m2!1ses!2scl!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Cancagua"
                  />
                </div>

                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="pt-6">
                    <h3 className="font-light text-lg tracking-wide mb-4 text-[#3a3a3a]">Indicaciones</h3>
                    <ul className="space-y-3 text-sm text-[#8C8C8C]">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D]" />
                        Desde Puerto Montt: 45 minutos por Ruta 5 Sur
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D]" />
                        Desde Puerto Varas: 25 minutos por Ruta 5 Sur
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D]" />
                        Desde Frutillar Bajo: 5 minutos hacia el norte
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D]" />
                        Estacionamiento gratuito disponible
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none bg-[#D3BC8D]">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-light text-lg tracking-wide mb-2 text-[#3a3a3a]">
                      ¿Prefieres WhatsApp?
                    </h3>
                    <p className="text-sm mb-4 text-[#3a3a3a]/80">
                      Contáctanos directamente y te responderemos de inmediato
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] tracking-wider"
                      asChild
                    >
                      <a
                        href="https://wa.me/56988190248?text=Hola,%20necesito%20ponerme%20en%20contacto%20con%20ustedes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
