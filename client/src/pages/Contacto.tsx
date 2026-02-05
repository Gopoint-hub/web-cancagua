import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
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
    <AutoTranslateProvider pageId="contacto">
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
              <T>Hablemos</T>
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-4"><T>Contacto</T></h1>
            <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
              <T>Estamos aquí para ayudarte</T>
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
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Ubicación</T></h3>
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
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Teléfono</T></h3>
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
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Email</T></h3>
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
                  <h3 className="font-light text-lg tracking-wide mb-3 text-[#3a3a3a]"><T>Horarios</T></h3>
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
                  <T>Escríbenos</T>
                </span>
                <h2 className="text-3xl font-light tracking-wide mb-4 text-[#3a3a3a]"><T>Envíanos un Mensaje</T></h2>
                <p className="text-[#8C8C8C] mb-8">
                  <T>Completa el formulario y te responderemos a la brevedad</T>
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
                    <T>Visitános</T>
                  </span>
                  <h2 className="text-3xl font-light tracking-wide mb-4 text-[#3a3a3a]"><T>Cómo Llegar</T></h2>
                  <p className="text-[#8C8C8C] mb-6">
                    Estamos ubicados a 2 kilómetros de Frutillar Bajo, con vista
                    privilegiada al Lago Llanquihue y los volcanes Osorno y
                    Calbuco.
                  </p>
                </div>

                {/* Mapa */}
                <div className="relative h-96 bg-white rounded-sm overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.745812503505!2d-73.01359452303775!3d-41.118242130025415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96179314014546c1%3A0x4d1a08f9164c20!2sCANCAGUA%20Spa%2C%20Biopiscinas%20Geot%C3%A9rmicas%2C%20la%20alternativa%20a%20las%20termas%20del%20sur%20de%20Chile!5e0!3m2!1ses-419!2scl!4v1768925453997!5m2!1ses-419!2scl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Cancagua"
                  />
                </div>

                {/* Botones de navegación */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.waze.com/live-map/directions/cl/los-lagos/cancagua-spa,-biopiscinas-geotermicas,-la-alternativa-a-las-termas-del-sur-de-chile?navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location&to=place.ChIJwUZFARSTF5YRIEwW-QgaTQA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#33CCFF] text-white rounded-lg hover:bg-[#2BB8E8] transition-colors font-medium"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.54 6.63c.69.94 1.15 2.04 1.35 3.19.21 1.21.11 2.46-.29 3.63-.42 1.24-1.14 2.37-2.1 3.27-.94.88-2.08 1.52-3.31 1.87-.59.17-1.19.28-1.79.33-.25.02-.51.03-.76.03-.83 0-1.65-.11-2.44-.33-.55-.15-1.08-.36-1.58-.62l-4.17 1.34 1.37-4.03c-.35-.58-.62-1.21-.81-1.86-.26-.89-.38-1.82-.35-2.75.03-.88.2-1.75.51-2.57.32-.87.79-1.67 1.38-2.37.63-.75 1.4-1.38 2.27-1.85.92-.5 1.93-.82 2.97-.94.49-.06.99-.08 1.48-.06 1.15.04 2.27.32 3.29.81 1.08.52 2.03 1.26 2.78 2.17l.2.24zM12 2C6.5 2 2 6.5 2 12c0 1.82.49 3.53 1.34 5L2 22l5.12-1.32c1.43.78 3.07 1.23 4.81 1.32h.07c5.5 0 10-4.5 10-10S17.5 2 12 2zm.04 3c.47 0 .93.04 1.39.11.86.14 1.68.43 2.43.85.71.4 1.35.91 1.88 1.52.5.58.9 1.24 1.18 1.95.26.67.42 1.38.47 2.1.05.68 0 1.36-.14 2.02-.15.7-.42 1.37-.79 1.98-.39.65-.89 1.23-1.48 1.71-.63.51-1.35.91-2.13 1.18-.74.26-1.52.4-2.31.41h-.08c-.67 0-1.33-.09-1.97-.26-.6-.16-1.17-.4-1.7-.71l-.12-.07-2.48.65.67-2.44-.08-.13c-.37-.57-.65-1.19-.83-1.84-.2-.71-.29-1.45-.26-2.19.02-.69.15-1.37.38-2.01.24-.68.59-1.31 1.04-1.87.48-.6 1.07-1.11 1.74-1.5.71-.41 1.49-.69 2.31-.82.43-.07.87-.1 1.31-.1l.06-.04z"/>
                    </svg>
                    Navegar con Waze
                  </a>
                  <a
                    href="https://www.google.com/maps/place/CANCAGUA+Spa,+Biopiscinas+Geot%C3%A9rmicas,+la+alternativa+a+las+termas+del+sur+de+Chile/@-41.118242,-73.013595,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#4285F4] text-white rounded-lg hover:bg-[#3574E0] transition-colors font-medium"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Abrir en Google Maps
                  </a>
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
    </AutoTranslateProvider>
  );
}
