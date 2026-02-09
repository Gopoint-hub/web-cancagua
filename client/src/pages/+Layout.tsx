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
import { DynamicHead } from "@/components/DynamicHead";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { useState } from 'react';
import type { ReactNode } from 'react';

// URL de la API del CMS
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://cms.cancagua.cl";

export default function Layout({ children }: { children: ReactNode }) {
  // Crear cliente de tRPC apuntando al CMS
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${API_BASE_URL}/api/trpc`,
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
              {/* Componente que actualiza meta tags dinámicamente durante navegación client-side */}
              <DynamicHead />

              <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
