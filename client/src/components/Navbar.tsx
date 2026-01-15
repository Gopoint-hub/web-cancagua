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
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

export function Navbar() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const servicios = [
    { name: t('services.biopiscinas.name'), href: "/servicios/biopiscinas" },
    { name: t('services.hotTubs.name'), href: "/servicios/hot-tubs" },
    { name: "Sauna Nativo", href: "/servicios/sauna" },
    { name: t('services.masajes.name'), href: "/masajes" },
    { name: t('services.clases.name'), href: "/clases" },
  ];

  const experiencias = [
    { name: "Navega Relax", href: "/navega-relax" },
    { name: "Full Day Hot Tubs + Biopiscinas", href: "/servicios/full-day-hot-tubs" },
    { name: "Full Day Biopiscinas + Playa", href: "/servicios/full-day-biopiscinas" },
  ];

  const eventos = [
    { name: "Taller Wim Hof", href: "/eventos/taller-wim-hof", featured: true },
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
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${
                isActive("/") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
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
                      {servicios.map((servicio) => (
                        <li key={servicio.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={servicio.href}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F1E7D9] text-[#3a3a3a]"
                            >
                              <div className="text-sm tracking-wide">
                                {servicio.name}
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
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${
                isActive("/cafeteria") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
              }`}
            >
              {t('nav.cafeteria')}
            </Link>

            <Link
              href="/gift-cards"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${
                isActive("/gift-cards") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
              }`}
            >
              {t('nav.giftCards')}
            </Link>

            <Link
              href="/nosotros"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${
                isActive("/nosotros") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              href="/contacto"
              className={`text-sm tracking-wider uppercase transition-colors hover:text-[#D3BC8D] ${
                isActive("/contacto") ? "text-[#D3BC8D]" : "text-[#3a3a3a]"
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Selector de Idioma y Botón Reservar */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <a href="https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw.." target="_blank" rel="noopener noreferrer">
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
          <div className="md:hidden border-t border-[#D3BC8D]/20 bg-white">
            <nav className="container py-6 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm tracking-wider uppercase text-[#3a3a3a]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>

              <div className="space-y-3">
                <p className="text-sm tracking-wider uppercase text-[#8C8C8C]">
                  {t('nav.services')}
                </p>
                {servicios.map((servicio) => (
                  <Link
                    key={servicio.href}
                    href={servicio.href}
                    className="block text-sm pl-4 text-[#3a3a3a]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {servicio.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm tracking-wider uppercase text-[#8C8C8C]">
                  EXPERIENCIAS
                </p>
                {experiencias.map((experiencia) => (
                  <Link
                    key={experiencia.href}
                    href={experiencia.href}
                    className="block text-sm pl-4 text-[#3a3a3a]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {experiencia.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm tracking-wider uppercase text-[#8C8C8C]">
                  {t('nav.events')}
                </p>
                {eventos.map((evento) => (
                  <Link
                    key={evento.href}
                    href={evento.href}
                    className="block text-sm pl-4 text-[#3a3a3a]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {evento.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/cafeteria"
                className="text-sm tracking-wider uppercase text-[#3a3a3a]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.cafeteria')}
              </Link>

              <Link
                href="/gift-cards"
                className="text-sm tracking-wider uppercase text-[#3a3a3a]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.giftCards')}
              </Link>

              <Link
                href="/nosotros"
                className="text-sm tracking-wider uppercase text-[#3a3a3a]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <Link
                href="/contacto"
                className="text-sm tracking-wider uppercase text-[#3a3a3a]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-[#D3BC8D]/20">
                <LanguageSelector />
              </div>

              <a href="https://reservas.cancagua.cl/?_gl=1*e0alyp*_gcl_au*NjA5MTYyNzYuMTc2ODQzMjIyNw.." target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.reserve')}
                </Button>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
