import { Home, Phone } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";
import { Button } from "@/components/ui/button";

export default function Page() {
  const pageContext = usePageContext();
  const isNotFound = pageContext.abortStatusCode === 404 || pageContext.is404;

  return (
    <div className="min-h-screen bg-[#faf8f5] px-4 py-24">
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-7xl font-bold text-[#c4a86b] md:text-8xl">
          {isNotFound ? "404" : "Error"}
        </p>
        <h1 className="mb-4 text-3xl font-serif font-bold text-[#2d3e2f] md:text-4xl">
          {isNotFound ? "Página no encontrada" : "Algo salió mal"}
        </h1>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600">
          {isNotFound
            ? "El contenido que buscas no existe o ya no está disponible."
            : "No pudimos cargar esta página. Intenta nuevamente en unos minutos."}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/">
            <Button
              size="lg"
              className="bg-[#2d3e2f] text-white hover:bg-[#1a2a1c]"
            >
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Button>
          </a>
          <a href="/contacto">
            <Button
              size="lg"
              variant="outline"
              className="border-[#2d3e2f] text-[#2d3e2f]"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contacto
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
}
