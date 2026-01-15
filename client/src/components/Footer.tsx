import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#3a3a3a] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="space-y-6">
            <img
              src="/images/09_logo-cancagua-footer.png"
              alt="Cancagua"
              className="h-16 w-auto"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#D3BC8D] mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cafeteria"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.cafeteria')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.giftCards')}
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#D3BC8D] mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[#D3BC8D] flex-shrink-0" />
                <span className="text-white/70">
                  {t('contact.addressText')}
                  <br />
                  (2 kms de Frutillar Bajo)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#D3BC8D] flex-shrink-0" />
                <a
                  href="tel:+56940073999"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  +56 9 4007 3999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#D3BC8D] flex-shrink-0" />
                <a
                  href="mailto:contacto@cancagua.cl"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  contacto@cancagua.cl
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios y redes */}
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#D3BC8D] mb-6">{t('footer.schedule')}</h3>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              {t('footer.scheduleText')}
            </p>

            <h3 className="text-sm tracking-[0.2em] uppercase text-[#D3BC8D] mb-4">{t('contact.followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Cancaguachile-100421855205587"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D3BC8D]/20 flex items-center justify-center text-white/70 hover:bg-[#D3BC8D] hover:text-[#3a3a3a] transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/cancaguachile/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D3BC8D]/20 flex items-center justify-center text-white/70 hover:bg-[#D3BC8D] hover:text-[#3a3a3a] transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6">
              <a
                href="https://cancagua.cl/media-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-[#D3BC8D] transition-colors"
              >
                Media Kit
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} CANCAGUA. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
