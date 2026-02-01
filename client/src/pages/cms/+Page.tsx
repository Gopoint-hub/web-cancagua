import { Route, Router } from "wouter";
import CMSDashboard from "./Dashboard";
import CMSUsuarios from "./Usuarios";
import CMSCarta from "./Carta";
import CMSReservas from "./Reservas";
import CMSMensajes from "./Mensajes";
import CMSProductosCorporativos from "./ProductosCorporativos";
import CMSCotizaciones from "./Cotizaciones";
import CMSCrearCotizacion from "./CrearCotizacion";
import CMSCotizacionWizard from "./CotizacionWizard";
import CMSNegocios from "./Negocios";
import CMSServicios from "./Servicios";
import CMSEventos from "./Eventos";
import CMSClientes from "./Clientes";
import CMSNewsletter from "./Newsletter";
import CMSCrearNewsletter from "./CrearNewsletter";
import CMSSuscriptores from "./Suscriptores";
import CMSListas from "./Listas";
import CMSCodigosDescuento from "./CodigosDescuento";
import CMSAnalytics from "./Analytics";
import CMSConfiguracion from "./Configuracion";
import CMSCRMPipeline from "./CRMPipeline";
import CMSB2C from "./B2C";
import CMSB2B from "./B2B";
import CMSMarketing from "./Marketing";
import CMSMarketingROI from "./MarketingROI";
import CMSMetricas from "./Metricas";
import CMSAdmin from "./Admin";
import CMSTraducciones from "./Traducciones";
import CMSReportesMantencion from "./ReportesMantencion";
import CMSIntegraciones from "./Integraciones";
import CMSGiftCardsSales from "./GiftCardsSales";
import CMSLogin from "./Login";
import CMSActivarCuenta from "./ActivarCuenta";
import CMSRecuperarContrasena from "./RecuperarContrasena";
import CMSRestablecerContrasena from "./RestablecerContrasena";

export default function CMSPage() {
  return (
    <Router base="/cms">
      <Route path="/login" component={CMSLogin} />
      <Route path="/activar-cuenta" component={CMSActivarCuenta} />
      <Route path="/recuperar-contrasena" component={CMSRecuperarContrasena} />
      <Route path="/restablecer-contrasena" component={CMSRestablecerContrasena} />
      <Route path="/" component={CMSDashboard} />
      <Route path="/usuarios" component={CMSUsuarios} />
      <Route path="/carta" component={CMSCarta} />
      <Route path="/reservas" component={CMSReservas} />
      <Route path="/mensajes" component={CMSMensajes} />
      <Route path="/productos-corporativos" component={CMSProductosCorporativos} />
      <Route path="/cotizaciones" component={CMSCotizaciones} />
      <Route path="/crear-cotizacion" component={CMSCrearCotizacion} />
      <Route path="/cotizacion-wizard" component={CMSCotizacionWizard} />
      <Route path="/cotizacion-wizard/:id" component={CMSCotizacionWizard} />
      <Route path="/negocios" component={CMSNegocios} />
      <Route path="/servicios" component={CMSServicios} />
      <Route path="/eventos" component={CMSEventos} />
      <Route path="/clientes" component={CMSClientes} />
      <Route path="/newsletter" component={CMSNewsletter} />
      <Route path="/crear-newsletter" component={CMSCrearNewsletter} />
      <Route path="/suscriptores" component={CMSSuscriptores} />
      <Route path="/listas" component={CMSListas} />
      <Route path="/codigos-descuento" component={CMSCodigosDescuento} />
      <Route path="/analytics" component={CMSAnalytics} />
      <Route path="/configuracion" component={CMSConfiguracion} />
      <Route path="/crm-pipeline" component={CMSCRMPipeline} />
      <Route path="/b2c" component={CMSB2C} />
      <Route path="/b2b" component={CMSB2B} />
      <Route path="/marketing" component={CMSMarketing} />
      <Route path="/marketing-roi" component={CMSMarketingROI} />
      <Route path="/metricas" component={CMSMetricas} />
      <Route path="/integraciones" component={CMSIntegraciones} />
      <Route path="/admin" component={CMSAdmin} />
      <Route path="/gift-cards-sales" component={CMSGiftCardsSales} />
      <Route path="/traducciones" component={CMSTraducciones} />
      <Route path="/reportes-mantencion" component={CMSReportesMantencion} />
    </Router>
  );
}
