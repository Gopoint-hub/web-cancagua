import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import CMSDashboard from "./pages/cms/Dashboard";
import CMSUsuarios from "./pages/cms/Usuarios";
import CMSCarta from "./pages/cms/Carta";
import CMSReservas from "./pages/cms/Reservas";
import CMSMensajes from "./pages/cms/Mensajes";
import CMSProductosCorporativos from "./pages/cms/ProductosCorporativos";
import CMSCotizaciones from "./pages/cms/Cotizaciones";
import CMSCrearCotizacion from "./pages/cms/CrearCotizacion";
import CMSCotizacionWizard from "./pages/cms/CotizacionWizard";
import CMSServicios from "./pages/cms/Servicios";
import CMSEventos from "./pages/cms/Eventos";
import CMSClientes from "./pages/cms/Clientes";
import CMSNewsletter from "./pages/cms/Newsletter";
import CMSCrearNewsletter from "./pages/cms/CrearNewsletter";
import CMSSuscriptores from "./pages/cms/Suscriptores";
import CMSListas from "./pages/cms/Listas";
import CMSCodigosDescuento from "./pages/cms/CodigosDescuento";
import CMSAnalytics from "./pages/cms/Analytics";
import CMSConfiguracion from "./pages/cms/Configuracion";
import CMSCRMPipeline from "./pages/cms/CRMPipeline";
import CMSB2C from "./pages/cms/B2C";
import CMSB2B from "./pages/cms/B2B";
import CMSMarketing from "./pages/cms/Marketing";
import CMSMarketingROI from "./pages/cms/MarketingROI";
import CMSMetricas from "./pages/cms/Metricas";
import CMSAdmin from "./pages/cms/Admin";
import CMSTraducciones from "./pages/cms/Traducciones";
import CMSIntegraciones from "./pages/cms/Integraciones";
import CMSGiftCardsSales from "./pages/cms/GiftCardsSales";
import CMSLogin from "./pages/cms/Login";
import CMSActivarCuenta from "./pages/cms/ActivarCuenta";
import CMSRecuperarContrasena from "./pages/cms/RecuperarContrasena";
import CMSRestablecerContrasena from "./pages/cms/RestablecerContrasena";
import Servicios from "./pages/Servicios";
import ServicioBiopiscinas from "./pages/ServicioBiopiscinas";
import Eventos from "./pages/Eventos";
import Cafeteria from "./pages/Cafeteria";
import GiftCards from "./pages/GiftCards";
import GiftCardPaymentResult from "./pages/GiftCardPaymentResult";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Carta from "./pages/Carta";
import NavegaRelax from "./pages/experiencias/NavegaRelax";
import Masajes from "./pages/Masajes";
import ClasesRegulares from "./pages/ClasesRegulares";
import HotTubs from "./pages/HotTubs";
import EventosSociales from "./pages/EventosSociales";
import EventosEmpresas from "./pages/EventosEmpresas";
import Sauna from "./pages/Sauna";
import TallerWimHof from "./pages/TallerWimHof";
import FullDayHotTubs from "./pages/servicios/FullDayHotTubs";
import FullDayBiopiscinas from "./pages/servicios/FullDayBiopiscinas";
import PasesReconecta from "./pages/experiencias/PasesReconecta";
import PaseReconecta from "./pages/experiencias/PaseReconecta";
import PaseReconectaDetox from "./pages/experiencias/PaseReconectaDetox";
import PaseBioReconecta from "./pages/experiencias/PaseBioReconecta";
import PaseBioReconectaDetox from "./pages/experiencias/PaseBioReconectaDetox";
import HeartCoherenceWorkshop from "./pages/HeartCoherenceWorkshop";
import { EventosLanding } from "./pages/EventosLanding";
import Blog from "./pages/Blog";
import MejoresTermasSurChile2026 from "./pages/blog/MejoresTermasSurChile2026";
import TermasConNinos from "./pages/blog/TermasConNinos";
import ManejoEstresLaboral from "./pages/blog/ManejoEstresLaboral";
import TermasVsExperienciaNatural from "./pages/blog/TermasVsExperienciaNatural";
import SpaHCDL from "./pages/SpaHCDL";
import UTMTracker from "./components/UTMTracker";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <UTMTracker />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/servicios"} component={Servicios} />
        <Route path={"/servicios/biopiscinas"} component={ServicioBiopiscinas} />
        <Route path={"/eventos"} component={EventosLanding} />
        <Route path={"/eventos/sociales"} component={EventosSociales} />
        <Route path={"/eventos/empresas"} component={EventosEmpresas} />
        <Route path={"/cafeteria"} component={Cafeteria} />
        <Route path={"/gift-cards"} component={GiftCards} />
        <Route path={"/gift-cards/payment-result"} component={GiftCardPaymentResult} />
        <Route path={"/contacto"} component={Contacto} />
        <Route path={"/nosotros"} component={Nosotros} />
        <Route path={"/carta"} component={Carta} />
        <Route path={"/navega-relax"} component={NavegaRelax} />
        <Route path={"/masajes"} component={Masajes} />
        <Route path={"/servicios/masajes"} component={Masajes} />
        <Route path={"/clases"} component={ClasesRegulares} />
        <Route path={"/servicios/hot-tubs"} component={HotTubs} />
        <Route path={"/servicios/sauna"} component={Sauna} />
        <Route path={"/eventos/taller-wim-hof"} component={TallerWimHof} />
        <Route path={"/eventos/heart-coherence-workshop"} component={HeartCoherenceWorkshop} />
        <Route path={"/servicios/full-day-hot-tubs"} component={FullDayHotTubs} />
        <Route path={"/servicios/full-day-biopiscinas"} component={FullDayBiopiscinas} />
        <Route path={"/experiencias/pases-reconecta"} component={PasesReconecta} />
        <Route path={"/experiencias/pase-reconecta"} component={PaseReconecta} />
        <Route path={"/experiencias/pase-reconecta-detox"} component={PaseReconectaDetox} />
        <Route path={"/experiencias/pase-bioreconecta"} component={PaseBioReconecta} />
        <Route path={"/experiencias/pase-bioreconecta-detox"} component={PaseBioReconectaDetox} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/mejores-termas-sur-chile-2026"} component={MejoresTermasSurChile2026} />
        <Route path={"/blog/termas-del-sur-de-chile-con-ninos-guia-para-familias"} component={TermasConNinos} />
        <Route path={"/blog/tecnicas-manejo-estres-laboral"} component={ManejoEstresLaboral} />
        <Route path={"/blog/termas-del-sur-vs-experiencia-natural"} component={TermasVsExperienciaNatural} />
        <Route path={"/spa-hotel-cabanas-del-lago"} component={SpaHCDL} />
        <Route path={"/cms/login"} component={CMSLogin} />
        <Route path={"/cms/activar-cuenta"} component={CMSActivarCuenta} />
        <Route path={"/cms/recuperar-contrasena"} component={CMSRecuperarContrasena} />
        <Route path={"/cms/restablecer-contrasena"} component={CMSRestablecerContrasena} />
        <Route path={"/cms"} component={CMSDashboard} />
        <Route path={"/cms/usuarios"} component={CMSUsuarios} />
        <Route path={"/cms/carta"} component={CMSCarta} />
        <Route path={"/cms/reservas"} component={CMSReservas} />
        <Route path={"/cms/mensajes"} component={CMSMensajes} />
        <Route path={"/cms/productos-corporativos"} component={CMSProductosCorporativos} />
        <Route path={"/cms/cotizaciones"} component={CMSCotizaciones} />
        <Route path={"/cms/crear-cotizacion"} component={CMSCrearCotizacion} />
        <Route path={"/cms/cotizacion-wizard"} component={CMSCotizacionWizard} />
        <Route path={"/cms/cotizacion-wizard/:id"} component={CMSCotizacionWizard} />
        <Route path={"/cms/servicios"} component={CMSServicios} />
        <Route path={"/cms/eventos"} component={CMSEventos} />
        <Route path={"/cms/clientes"} component={CMSClientes} />
        <Route path={"/cms/newsletter"} component={CMSNewsletter} />
        <Route path={"/cms/crear-newsletter"} component={CMSCrearNewsletter} />
        <Route path={"/cms/suscriptores"} component={CMSSuscriptores} />
        <Route path={"/cms/listas"} component={CMSListas} />
        <Route path={"/cms/codigos-descuento"} component={CMSCodigosDescuento} />
        <Route path={"/cms/analytics"} component={CMSAnalytics} />
        <Route path={"/cms/configuracion"} component={CMSConfiguracion} />
        <Route path={"/cms/crm-pipeline"} component={CMSCRMPipeline} />
        <Route path={"/cms/b2c"} component={CMSB2C} />
        <Route path={"/cms/b2b"} component={CMSB2B} />
        <Route path={"/cms/marketing"} component={CMSMarketing} />
        <Route path={"/cms/marketing-roi"} component={CMSMarketingROI} />
        <Route path={"/cms/metricas"} component={CMSMetricas} />
        <Route path={"/cms/integraciones"} component={CMSIntegraciones} />
        <Route path={"/cms/admin"} component={CMSAdmin} />
        <Route path={"/cms/gift-cards-sales"} component={CMSGiftCardsSales} />
        <Route path={"/cms/traducciones"} component={CMSTraducciones} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
