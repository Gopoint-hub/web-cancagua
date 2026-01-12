import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const servicios = [
    { name: "Biopiscinas Geotermales", href: "/servicios/biopiscinas" },
    { name: "Hot Tubs", href: "/servicios/hot-tubs" },
    { name: "Masajes & Terapias", href: "/servicios/masajes" },
    { name: "Clases Regulares", href: "/servicios/clases" },
    { name: "Pase Reconecta", href: "/servicios/pase-reconecta" },
  ];

  return (
    <>
      {/* Barra superior con mensaje */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p>En Cancagua estamos abiertos de lunes a domingo todo el año</p>
      </div>

      {/* Navegación principal */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <img
                src="/images/01_logo-cancagua.png"
                alt="Cancagua"
                className="h-12 w-auto"
              />
            </a>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-foreground"
                }`}
              >
                Inicio
              </a>
            </Link>

            {/* Dropdown Servicios */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Servicios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {servicios.map((servicio) => (
                        <li key={servicio.href}>
                          <NavigationMenuLink asChild>
                            <Link href={servicio.href}>
                              <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">
                                  {servicio.name}
                                </div>
                              </a>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/eventos">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/eventos") ? "text-primary" : "text-foreground"
                }`}
              >
                Eventos
              </a>
            </Link>

            <Link href="/cafeteria">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/cafeteria") ? "text-primary" : "text-foreground"
                }`}
              >
                Cafetería
              </a>
            </Link>

            <Link href="/gift-cards">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/gift-cards") ? "text-primary" : "text-foreground"
                }`}
              >
                Gift Cards
              </a>
            </Link>

            <Link href="/nosotros">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/nosotros") ? "text-primary" : "text-foreground"
                }`}
              >
                Nosotros
              </a>
            </Link>

            <Link href="/contacto">
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/contacto") ? "text-primary" : "text-foreground"
                }`}
              >
                Contacto
              </a>
            </Link>
          </nav>

          {/* Botón Reservar */}
          <div className="hidden md:block">
            <Button size="lg" className="font-semibold">
              Reservar
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
              <Link href="/">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </a>
              </Link>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">
                  Servicios
                </p>
                {servicios.map((servicio) => (
                  <Link key={servicio.href} href={servicio.href}>
                    <a
                      className="block text-sm pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {servicio.name}
                    </a>
                  </Link>
                ))}
              </div>

              <Link href="/eventos">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Eventos
                </a>
              </Link>

              <Link href="/cafeteria">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cafetería
                </a>
              </Link>

              <Link href="/gift-cards">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gift Cards
                </a>
              </Link>

              <Link href="/nosotros">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Nosotros
                </a>
              </Link>

              <Link href="/contacto">
                <a
                  className="text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </a>
              </Link>

              <Button
                size="lg"
                className="w-full font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reservar
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
