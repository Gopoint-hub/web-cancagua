import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Home, 
  Waves, 
  Calendar, 
  Coffee, 
  Phone, 
  Sparkles,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  const quickLinks = [
    {
      title: "Biopiscinas",
      description: "Relájate en nuestras piscinas geotermales naturales",
      href: "/servicios/biopiscinas",
      icon: Waves,
    },
    {
      title: "Experiencias",
      description: "Descubre nuestros pases y experiencias únicas",
      href: "/experiencias/pases-reconecta",
      icon: Sparkles,
    },
    {
      title: "Eventos",
      description: "Celebra momentos especiales en un entorno único",
      href: "/eventos",
      icon: Calendar,
    },
    {
      title: "Cafetería",
      description: "Disfruta de nuestra carta con productos locales",
      href: "/cafeteria",
      icon: Coffee,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background con gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* 404 Number */}
              <div className="mb-6">
                <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  404
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Página no encontrada
              </h1>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Parece que te has perdido en el camino hacia la relajación. 
                No te preocupes, te ayudamos a encontrar lo que buscas.
              </p>
              
              {/* Main CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/">
                  <Button size="lg" className="gap-2">
                    <Home className="w-5 h-5" />
                    Volver al inicio
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Phone className="w-5 h-5" />
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Explora Cancagua
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Descubre todo lo que tenemos para ofrecerte en nuestro spa y centro de bienestar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="group bg-background rounded-xl p-6 shadow-sm border hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <link.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg">{link.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {link.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Ver más
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Location Banner */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Visítanos en Frutillar</h3>
                  <p className="text-primary-foreground/80">
                    Región de Los Lagos, Chile
                  </p>
                </div>
              </div>
              <Link href="/servicios/biopiscinas">
                <Button variant="secondary" size="lg" className="gap-2">
                  Reservar ahora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
