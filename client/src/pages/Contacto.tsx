import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone as PhoneIcon, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { getCountryCallingCode, CountryCode } from 'libphonenumber-js';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [defaultCountry, setDefaultCountry] = useState<CountryCode>("CL");

  // Detectar país del usuario automáticamente
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          setDefaultCountry(data.country_code as CountryCode);
        }
      })
      .catch(() => {
        // Si falla, mantener Chile por defecto
        setDefaultCountry("CL");
      });
  }, []);

  const sendMessageMutation = trpc.contactMessages.send.useMutation({
    onSuccess: () => {
      toast.success("¡Mensaje enviado exitosamente! Te responderemos pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar mensaje. Inténtalo nuevamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
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
                    <PhoneIcon className="h-7 w-7 text-[#D3BC8D]" />
                  </div>
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]">Teléfono</h3>
                  <a
                    href="tel:+56940073999"
                    className="text-sm text-[#8C8C8C] hover:text-[#D3BC8D] transition-colors block"
                  >
                    +56 9 4007 3999
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
                    <Label htmlFor="phone" className="text-[#3a3a3a]">Teléfono *</Label>
                    <PhoneInput
                      international
                      defaultCountry={defaultCountry}
                      value={formData.phone}
                      onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                      className="phone-input-custom border border-[#D3BC8D]/30 rounded-md px-3 py-2 bg-white focus-within:border-[#D3BC8D] focus-within:ring-1 focus-within:ring-[#D3BC8D]"
                      placeholder="Ingresa tu número de teléfono"
                      required
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
                        Desde Puerto Varas: 30 minutos por Ruta 5 Sur
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D]" />
                        Desde Osorno: 60 minutos por Ruta 5 Norte
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Invitación al grupo de WhatsApp */}
              <div className="mt-8">
                <Card className="border-[#25D366]/30 bg-[#25D366]/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="h-6 w-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-light text-lg tracking-wide mb-2 text-[#3a3a3a]">Únete a nuestra comunidad</h3>
                        <p className="text-sm text-[#8C8C8C] mb-4">
                          Forma parte del grupo de WhatsApp de Cancagua y recibe promociones exclusivas, novedades y tips de bienestar.
                        </p>
                        <a
                          href="https://chat.whatsapp.com/GX12Kr6Q6jSDvBUfVrloNy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors font-medium text-sm"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          Unirme al grupo
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />

      <style>{`
        .phone-input-custom input {
          border: none;
          outline: none;
          width: 100%;
          background: transparent;
        }
        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
}
