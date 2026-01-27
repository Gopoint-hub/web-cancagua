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
import { Link, useLocation } from "wouter";

export function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
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

  const servicios = [
    { name: t('services.biopiscinas.name'), href: "/servicios/biopiscinas" },
    { name: t('services.hotTubs.name'), href: "/servicios/hot-tubs" },
    { name: "Sauna Nativo", href: "/servicios/sauna" },
    { name: t('services.masajes.name'), href: "/masajes" },
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
    { name: "Heart Coherence Workshop", href: "/eventos/heart-coherence-workshop" },
    { name: "Taller Wim Hof", href: "/eventos/taller-wim-hof" },
    { name: "Eventos Sociales", href: "/eventos/sociales" },
    { name: "Eventos Empresas", href: "/eventos/empresas" },
  ];

  return (
    <>
      {/* Barra superior con mensaje */}
      <div className="bg-[#D3BC8D] text-[#3a3a3a] py-2 text-center text-sm tracking-wide">
        <p>{t('footer.scheduleText')}</p>
      </div>

      {/* Navegación principal */}
      <header className="sticky top-0 z-50 w-full border-b border-[#D3BC8D]/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/01_logo-cancagua.png"
              alt="Cancagua"
              className="h-12 w-auto"
            />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              {t('nav.home')}
            </Link>

            {/* Dropdown Servicios */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#3a3a3a] hover:text-[#D3BC8D] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    {t('nav.services')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4 bg-white border border-[#D3BC8D]/20">
                      {servicios.map((servicio: { name: string; href: string; highlight?: boolean }) => (
                        <li key={servicio.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={servicio.href}
                              className={`block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors ${servicio.highlight
                                ? 'bg-[#1a5276]/10 hover:bg-[#1a5276]/20 text-[#1a5276] border-l-2 border-[#1a5276]'
                                : 'hover:bg-[#F1E7D9] text-[#3a3a3a]'
                                }`}
                            >
                              <div className="text-sm tracking-wide flex items-center gap-2">
                                {servicio.name}
                                {servicio.highlight && (
                                  <span className="text-[10px] bg-[#1a5276] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Nuevo
                                  </span>
                                )}
                              </div>
                            </Link>
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
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#3a3a3a] hover:text-[#D3BC8D] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    EXPERIENCIAS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white border border-[#D3BC8D]/20">
                      {experiencias.map((experiencia) => (
                        <li key={experiencia.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={experiencia.href}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F1E7D9] text-[#3a3a3a]"
                            >
                              <div className="text-sm tracking-wide">
                                {experiencia.name}
                              </div>
                            </Link>
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
                  <NavigationMenuTrigger className="text-sm tracking-wider uppercase text-[#3a3a3a] hover:text-[#D3BC8D] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    {t('nav.events')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-4 bg-white border border-[#D3BC8D]/20">
                      {eventos.map((evento) => (
                        <li key={evento.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={evento.href}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F1E7D9] text-[#3a3a3a]"
                            >
                              <div className="text-sm tracking-wide">
                                {evento.name}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/cafeteria"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/cafeteria") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              {t('nav.cafeteria')}
            </Link>

            <Link
              href="/nosotros"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/nosotros") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              href="/contacto"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/contacto") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              {t('nav.contact')}
            </Link>

            <Link
              href="/blog"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/blog") || location.startsWith("/blog/") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              Blog
            </Link>

            <Link
              href="/gift-cards"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${isActive("/gift-cards") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
                }`}
            >
              Gift Cards
            </Link>
          </nav>

          {/* Selector de Idioma y Botón Reservar */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <a href={getSkeduLink("https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw..")} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider uppercase text-sm"
              >
                {t('nav.reserve')}
              </Button>
            </a>
          </div>

          {/* Menú Mobile */}
          <button
            className="md:hidden text-[#3a3a3a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menú Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D3BC8D]/20 bg-white max-h-[70vh] overflow-y-auto">
            <nav className="container py-4 flex flex-col">
              {/* Inicio */}
              <Link
                href="/"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>

              {/* Servicios - Acordeón */}
              <div className="border-b border-[#D3BC8D]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#3a3a3a]"
                  onClick={() => toggleSection('servicios')}
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'servicios' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'servicios' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {servicios.map((servicio) => (
                      <Link
                        key={servicio.href}
                        href={servicio.href}
                        className="block py-2 text-sm text-[#3a3a3a] hover:text-[#D3BC8D]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {servicio.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Experiencias - Acordeón */}
              <div className="border-b border-[#D3BC8D]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#3a3a3a]"
                  onClick={() => toggleSection('experiencias')}
                >
                  <span>EXPERIENCIAS</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'experiencias' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'experiencias' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {experiencias.map((experiencia) => (
                      <Link
                        key={experiencia.href}
                        href={experiencia.href}
                        className="block py-2 text-sm text-[#3a3a3a] hover:text-[#D3BC8D]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {experiencia.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Eventos - Acordeón */}
              <div className="border-b border-[#D3BC8D]/10">
                <button
                  className="w-full py-3 flex items-center justify-between text-sm tracking-wider uppercase text-[#3a3a3a]"
                  onClick={() => toggleSection('eventos')}
                >
                  <span>{t('nav.events')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === 'eventos' ? 'rotate-180' : ''}`} />
                </button>
                {expandedSection === 'eventos' && (
                  <div className="pb-3 pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {eventos.map((evento) => (
                      <Link
                        key={evento.href}
                        href={evento.href}
                        className="block py-2 text-sm text-[#3a3a3a] hover:text-[#D3BC8D]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {evento.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Enlaces directos */}
              <Link
                href="/cafeteria"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10 hover:text-[#D3BC8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.cafeteria')}
              </Link>

              <Link
                href="/nosotros"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10 hover:text-[#D3BC8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <Link
                href="/contacto"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10 hover:text-[#D3BC8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              <Link
                href="/blog"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10 hover:text-[#D3BC8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/gift-cards"
                className="py-3 text-sm tracking-wider uppercase text-[#3a3a3a] border-b border-[#D3BC8D]/10 hover:text-[#D3BC8D]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Cards
              </Link>

              {/* Selector de idioma y botón reservar */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8C8C8C]">Idioma</span>
                  <LanguageSelector />
                </div>

                <a href={getSkeduLink("https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw..")} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider uppercase"
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
