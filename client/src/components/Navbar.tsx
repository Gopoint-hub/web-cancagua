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
    { name: t('services.masajes.name'), href: "/servicios/masajes" },
    { name: t('services.clases.name'), href: "/servicios/clases" },
    { name: t('services.paseReconecta.name'), href: "/servicios/pase-reconecta" },
  ];

  return (
    <>
      {/* Barra superior con mensaje */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p>{t('footer.scheduleText')}</p>
      </div>

      {/* Navegación principal */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.home')}
            </Link>

            {/* Dropdown Servicios */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {t('nav.services')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {servicios.map((servicio) => (
                        <li key={servicio.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={servicio.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
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

            <Link
              href="/eventos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/eventos") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.events')}
            </Link>

            <Link
              href="/cafeteria"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/cafeteria") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.cafeteria')}
            </Link>

            <Link
              href="/gift-cards"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/gift-cards") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.giftCards')}
            </Link>

            <Link
              href="/nosotros"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/nosotros") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              href="/contacto"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contacto") ? "text-primary" : "text-foreground"
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Selector de Idioma y Botón Reservar */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <Button size="lg" className="font-semibold">
              {t('nav.reserve')}
            </Button>
          </div>

          {/* Menú Mobile */}
          <button
            className="md:hidden"
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
          <div className="md:hidden border-t">
            <nav className="container py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">
                  {t('nav.services')}
                </p>
                {servicios.map((servicio) => (
                  <Link
                    key={servicio.href}
                    href={servicio.href}
                    className="block text-sm pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {servicio.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/eventos"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.events')}
              </Link>

              <Link
                href="/cafeteria"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.cafeteria')}
              </Link>

              <Link
                href="/gift-cards"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.giftCards')}
              </Link>

              <Link
                href="/nosotros"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <Link
                href="/contacto"
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              <div className="flex items-center justify-between pt-2">
                <LanguageSelector />
              </div>

              <Button
                size="lg"
                className="w-full font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.reserve')}
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
