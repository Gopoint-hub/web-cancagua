import { MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

export function WhatsAppButton() {
  const [location] = useLocation();
  const phoneNumber = "56940073999"; // +56 9 4007 3999

  // Mensajes contextuales según la página
  const getContextualMessage = () => {
    if (location === "/") {
      return "Hola, me gustaría información sobre Cancagua";
    } else if (location.startsWith("/servicios/biopiscinas")) {
      return "Hola, me interesa el servicio de Biopiscinas Geotermales";
    } else if (location.startsWith("/servicios/hot-tubs")) {
      return "Hola, me interesa el servicio de Hot Tubs";
    } else if (location.startsWith("/servicios/masajes")) {
      return "Hola, me interesa el servicio de Masajes & Terapias";
    } else if (location.startsWith("/servicios/clases")) {
      return "Hola, me interesa el servicio de Clases Regulares";
    } else if (location.startsWith("/servicios/pase-reconecta")) {
      return "Hola, me interesa el Pase Reconecta";
    } else if (location.startsWith("/servicios")) {
      return "Hola, me interesa información sobre los servicios";
    } else if (location.startsWith("/eventos")) {
      return "Hola, quiero información sobre los eventos";
    } else if (location === "/cafeteria") {
      return "Hola, quiero reservar mesa en la cafetería";
    /* OCULTO - GIFT CARDS - RESTAURAR:
    } else if (location === "/tienda-regalos-preview") {
      return "Hola, quiero comprar una gift card";
    FIN OCULTO GIFT CARDS */
    } else if (location === "/nosotros") {
      return "Hola, me gustaría conocer más sobre Cancagua";
    } else if (location === "/contacto") {
      return "Hola, necesito ponerme en contacto con ustedes";
    }
    return "Hola, me gustaría información sobre Cancagua";
  };

  const message = encodeURIComponent(getContextualMessage());
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Contáctanos por WhatsApp
      </span>

      {/* Indicador de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
    </a>
  );
}
