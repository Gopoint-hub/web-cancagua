import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";

export function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageContext = usePageContext();
  const location = pageContext.urlPathname || '/';
  const isMassagePage = location === "/servicios/masajes" || location === "/masajes";
  const generalBookingUrl = "https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw..";
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (path: string) => location === path;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getSkeduLink = (baseUrl: string) => {
    try {
      const stored = sessionStorage.getItem('cancagua_tracking');
      if (!stored) return baseUrl;

      const utms = JSON.parse(stored);
      // Solo nos interesan los UTMs y GCLID/FBCLID
      const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

      const url = new URL(baseUrl);

      trackingParams.forEach(param => {
        if (utms[param]) {
          url.searchParams.set(param, utms[param]);
        }
      });

      return url.toString();
    } catch (e) {
      return baseUrl;
    }
  };
  const bookingUrl = isMassagePage ? "#tecnicas" : getSkeduLink(generalBookingUrl);

  const servicios = [
    { name: t('services.biopiscinas.name'), href: "/servicios/biopiscinas" },
    { name: t('services.hotTubs.name'), href: "/servicios/hot-tubs" },
    { name: "Sauna Nativo", href: "/servicios/sauna" },
    { name: "Pulso Local", href: "/servicios/programalocal", highlight: true },
    { name: t('services.masajes.name'), href: "/servicios/masajes" },
    { name: "Masajes en Puerto Varas", href: "/spa-hotel-cabanas-del-lago", highlight: true },
    { name: t('services.clases.name'), href: "/clases" },
  ];

  const experiencias = [
    { name: "Navega Relax", href: "/navega-relax" },
    { name: "Pases Reconecta", href: "/experiencias/pases-reconecta" },
    { name: "Full Day Hot Tubs + Biopiscinas", href: "/servicios/full-day-hot-tubs" },
    { name: "Full Day Biopiscinas + Playa", href: "/servicios/full-day-biopiscinas" },
  ];

  const eventos = [
    { name: "Todos los Eventos", href: "/eventos" },
    { name: "Sonoterapia — 25 de julio", href: "https://reservas.cancagua.cl/cancaguaspa/s/8dc087fd-67d9-40f0-944c-0872e64e8b0a" },
    { name: "Encuentro de Inmersión — 26 de julio", href: "https://reservas.cancagua.cl/cancaguaspa/s/29ee2d1b-a529-4ad4-857b-c0e45facec62" },
    { name: "Eventos Sociales", href: "/eventos/sociales" },
    { name: "Eventos Empresas", href: "/eventos/empresas" },
  ];

  return (
    <>
      {/* Barra superior con mensaje */}
      <div className="bg-[#4B5872] text-[#FCF9F9] py-2 text-center text-sm tracking-wide">
        <p>{t('footer.scheduleText')}</p>
      </div>

      {/* Navegación principal */}
      <header className="sticky top-0 z-50 w-full border-b border-[#4B5872]/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="container flex h-20 items-center justify-between md:grid md:h-auto md:grid-cols-[1fr_auto_1fr] md:gap-y-2 md:py-3 2xl:flex 2xl:h-20 2xl:gap-y-0 2xl:py-0">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center md:col-start-1 md:row-start-1 md:w-auto md:justify-start 2xl:w-[190px] 2xl:justify-center">
            <img
              src="/brand/logos/cancagua-lockup-medium-black.png"
              alt="Cancagua — Restore Spa & Nature"
              className="h-auto w-[132px] xl:w-[140px] 2xl:w-[148px]"
            />
          </a>

          {/* Navegación Desktop */}
          <nav className="hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 font-cg-mono uppercase md:col-span-3 md:row-start-2 md:flex md:w-full md:border-t md:border-[#4B5872]/10 md:pt-2 lg:gap-x-3 2xl:w-auto 2xl:flex-nowrap 2xl:gap-4 2xl:border-0 2xl:pt-0 [&>a]:whitespace-nowrap [&>a]:text-[11px] xl:[&>a]:text-xs 2xl:[&>a]:text-sm [&_[data-slot=navigation-menu-trigger]]:px-1.5 [&_[data-slot=navigation-menu-trigger]]:text-[11px] lg:[&_[data-slot=navigation-menu-trigger]]:px-2 xl:[&_[data-slot=navigation-menu-trigger]]:px-3 xl:[&_[data-slot=navigation-menu-trigger]]:text-xs 2xl:[&_[data-slot=navigation-menu-trigger]]:px-4 2xl:[&_[data-slot=navigation-menu-trigger]]:text-sm">
            <a
              href="/"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              {t('nav.home')}
            </a>

            {/* Dropdown Servicios */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#222221] hover:text-[#4B5872] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    {t('nav.services')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 bg-white border border-[#4B5872]/20">
                      {servicios.map((servicio: { name: string; href: string; highlight?: boolean }) => (
                        <li key={servicio.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={servicio.href}
                              className={`block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors ${servicio.highlight
                                ? 'bg-[#324853]/10 hover:bg-[#324853]/20 text-[#324853] border-l-2 border-[#324853]'
                                : 'hover:bg-[#F4F2ED] text-[#222221]'
                                }`}
                            >
                              <div className="text-sm tracking-wide flex items-center gap-2">
                                {servicio.name}
                                {servicio.highlight && (
                                  <span className="text-[10px] bg-[#324853] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Nuevo
                                  </span>
                                )}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Dropdown Experiencias */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#222221] hover:text-[#4B5872] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    EXPERIENCIAS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white border border-[#4B5872]/20">
                      {experiencias.map((experiencia) => (
                        <li key={experiencia.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={experiencia.href}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F4F2ED] text-[#222221]"
                            >
                              <div className="text-sm tracking-wide">
                                {experiencia.name}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Dropdown Eventos */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#222221] hover:text-[#4B5872] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    {t('nav.events')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white border border-[#4B5872]/20">
                      {eventos.map((evento) => (
                        <li key={evento.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={evento.href}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F4F2ED] text-[#222221]"
                            >
                              <div className="text-sm tracking-wide">
                                {evento.name}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a
              href="/cafeteria"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/cafeteria") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              {t('nav.cafeteria')}
            </a>

            <a
              href="/nosotros"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/nosotros") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              {t('nav.about')}
            </a>

            <a
              href="/contacto"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/contacto") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              {t('nav.contact')}
            </a>

            <a
              href="/blog"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/blog") || location.startsWith("/blog/") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              Blog
            </a>

            <a
              href="/gift-cards"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#4B5872] ${isActive("/gift-cards") ? "text-[#4B5872]" : "text-[#222221]"
                }`}
            >
              Gift Cards
            </a>
          </nav>

          {/* Selector de Idioma y Botón Reservar */}
          <div className="hidden shrink-0 items-center justify-end gap-2 md:col-start-3 md:row-start-1 md:flex xl:gap-3">
            <LanguageSelector />
            <a href={bookingUrl} target={isMassagePage ? undefined : "_blank"} rel={isMassagePage ? undefined : "noopener noreferrer"}>
              <Button
                size="lg"
                className="bg-[#4B5872] px-4 text-xs uppercase tracking-wider text-[#FCF9F9] hover:bg-[#333D51] xl:px-6 2xl:text-sm"
              >
                {t('nav.reserve')}
              </Button>
            </a>
          </div>

          {/* Navegación compacta para móvil, tablet y notebooks */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={bookingUrl}
              target={isMassagePage ? undefined : "_blank"}
              rel={isMassagePage ? undefined : "noopener noreferrer"}
              className="hidden sm:block"
            >
              <Button
                className="bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] tracking-wider uppercase text-xs"
              >
                {t('nav.reserve')}
              </Button>
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-[#222221]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menú Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="border-t border-[#4B5872]/20 bg-white max-h-[70vh] overflow-y-auto md:hidden">
            <nav className="container py-4 flex flex-col">
              {/* Inicio */}
              <a
                href="/"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </a>

              {/* Servicios - Acordeón */}
              <div className="border-b border-[#4B5872]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#222221]"
                  onClick={() => toggleSection('servicios')}
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'servicios' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'servicios' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {servicios.map((servicio) => (
                      <a
                        key={servicio.href}
                        href={servicio.href}
                        className="block py-2 text-sm text-[#222221] hover:text-[#4B5872]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {servicio.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Experiencias - Acordeón */}
              <div className="border-b border-[#4B5872]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#222221]"
                  onClick={() => toggleSection('experiencias')}
                >
                  <span>EXPERIENCIAS</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'experiencias' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'experiencias' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {experiencias.map((experiencia) => (
                      <a
                        key={experiencia.href}
                        href={experiencia.href}
                        className="block py-2 text-sm text-[#222221] hover:text-[#4B5872]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {experiencia.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Eventos - Acordeón */}
              <div className="border-b border-[#4B5872]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#222221]"
                  onClick={() => toggleSection('eventos')}
                >
                  <span>{t('nav.events')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'eventos' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'eventos' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {eventos.map((evento) => (
                      <a
                        key={evento.href}
                        href={evento.href}
                        className="block py-2 text-sm text-[#222221] hover:text-[#4B5872]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {evento.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Enlaces directos */}
              <a
                href="/cafeteria"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10 hover:text-[#4B5872]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.cafeteria')}
              </a>

              <a
                href="/nosotros"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10 hover:text-[#4B5872]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </a>

              <a
                href="/contacto"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10 hover:text-[#4B5872]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>

              <a
                href="/blog"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10 hover:text-[#4B5872]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>

              <a
                href="/gift-cards"
                className="py-3 text-sm tracking-wider uppercase text-[#222221] border-b border-[#4B5872]/10 hover:text-[#4B5872]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Cards
              </a>

              {/* Selector de idioma y botón reservar */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#827D78]">Idioma</span>
                  <LanguageSelector />
                </div>

                <a href={bookingUrl} target={isMassagePage ? undefined : "_blank"} rel={isMassagePage ? undefined : "noopener noreferrer"} className="block">
                  <Button
                    size="lg"
                    className="w-full bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] tracking-wider uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.reserve')}
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
