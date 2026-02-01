import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

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
                <a
                  href="/"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a
                  href="/servicios"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a
                  href="/eventos"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.events')}
                </a>
              </li>
              <li>
                <a
                  href="/cafeteria"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.cafeteria')}
                </a>
              </li>
              <li>
                <a
                  href="/nosotros"
                  className="text-white/70 hover:text-[#D3BC8D] transition-colors"
                >
                  {t('nav.about')}
                </a>
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
              <a
                href="https://www.tiktok.com/@cancaguafrutillar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D3BC8D]/20 flex items-center justify-center text-white/70 hover:bg-[#D3BC8D] hover:text-[#3a3a3a] transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>

            {/* Grupo de WhatsApp */}
            <div className="mt-6 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg">
              <p className="text-xs text-white/70 mb-2">Únete a nuestra comunidad</p>
              <a
                href="https://chat.whatsapp.com/GX12Kr6Q6jSDvBUfVrloNy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#25D366] hover:text-[#20BA5A] transition-colors font-medium flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Grupo de WhatsApp
              </a>
            </div>

            <div className="mt-4">
              <a
                href="https://drive.google.com/drive/u/1/folders/1A02wUkV1mkZTl0REkHqiKr8E490SI6fD"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-[#D3BC8D] transition-colors"
              >
                Media Kit
              </a>
            </div>
          </div>
        </div>

        {/* Ubicaciones */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-sm tracking-[0.2em] uppercase text-[#D3BC8D] mb-6 text-center">Nuestras Ubicaciones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="/"
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-[#D3BC8D]" />
              </div>
              <div>
                <h4 className="font-['Josefin_Sans'] text-white group-hover:text-[#D3BC8D] transition-colors">
                  Cancagua Spa
                </h4>
                <p className="text-sm text-white/60">Frutillar, Región de Los Lagos</p>
              </div>
            </a>
            <a
              href="/spa-hotel-cabanas-del-lago"
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a5276]/40 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-[#5dade2]" />
              </div>
              <div>
                <h4 className="font-['Josefin_Sans'] text-white group-hover:text-[#5dade2] transition-colors">
                  Spa Hotel Cabañas del Lago
                </h4>
                <p className="text-sm text-white/60">Puerto Varas, Región de Los Lagos</p>
              </div>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} CANCAGUA. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
