import "@/index.css";
import "@/i18n/config";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import UTMTracker from "@/components/UTMTracker";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from 'react';
import type { ReactNode } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

/**
 * Rutas que tienen su propio Navbar y Footer integrado en el componente
 * Para estas rutas, el Layout global solo provee los providers pero NO renderiza Navbar/Footer
 */
const ROUTES_WITH_OWN_NAVBAR = [
  '/eventos/empresas',
  '/eventos/sociales',
  '/eventos/heart-coherence-workshop',
  '/eventos/taller-wim-hof',
  '/spa-hotel-cabanas-del-lago',
];

export default function Layout({ children }: { children: ReactNode }) {
  const pageContext = usePageContext();
  const pathname = pageContext.urlPathname;
  
  const isCMSRoute = pathname.startsWith('/cms');
  const hasOwnNavbar = ROUTES_WITH_OWN_NAVBAR.includes(pathname);

  // Crear cliente de tRPC solo en el cliente
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          fetch(input, init) {
            return globalThis.fetch(input, {
              ...(init ?? {}),
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider>
            <TooltipProvider>
              <Analytics />
              <Toaster />
              <ScrollToTop />
              <UTMTracker />

              {/* Si es ruta del CMS o tiene su propio Navbar, NO renderizar Navbar/Footer del Layout */}
              {isCMSRoute || hasOwnNavbar ? (
                children
              ) : (
                <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </div>
              )}
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
