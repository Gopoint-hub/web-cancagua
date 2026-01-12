import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <img
              src="/images/09_logo-cancagua-footer.png"
              alt="Cancagua"
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Spa & Retreat Center con vista al Lago Llanquihue en mitad de la
              naturaleza. Disfruta de biopiscinas geotermales, hot tubs,
              masajes, yoga y mucho más.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Inicio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/servicios">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Servicios
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/eventos">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Eventos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cafeteria">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Cafetería
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gift-cards">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Gift Cards
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/nosotros">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Nosotros
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Frutillar, Región de Los Lagos, Chile
                  <br />
                  (2 kms de Frutillar Bajo)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+56940073999"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +56 9 4007 3999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:contacto@cancagua.cl"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contacto@cancagua.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios y redes */}
          <div>
            <h3 className="font-semibold mb-4">Horarios</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Lunes a Domingo
              <br />
              Todo el año
            </p>

            <h3 className="font-semibold mb-4 mt-6">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/cancagua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/cancagua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6">
              <a
                href="https://cancagua.cl/media-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Media Kit
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CANCAGUA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
