import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CMSDashboard from "./pages/cms/Dashboard";
import CMSUsuarios from "./pages/cms/Usuarios";
import CMSCarta from "./pages/cms/Carta";
import CMSReservas from "./pages/cms/Reservas";
import CMSMensajes from "./pages/cms/Mensajes";
import Servicios from "./pages/Servicios";
import ServicioBiopiscinas from "./pages/ServicioBiopiscinas";
import Eventos from "./pages/Eventos";
import Cafeteria from "./pages/Cafeteria";
import GiftCards from "./pages/GiftCards";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Carta from "./pages/Carta";
import NavegaRelax from "./pages/NavegaRelax";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/servicios"} component={Servicios} />
      <Route path={"/servicios/biopiscinas"} component={ServicioBiopiscinas} />
      <Route path={"/eventos"} component={Eventos} />
      <Route path={"/cafeteria"} component={Cafeteria} />
      <Route path={"/gift-cards"} component={GiftCards} />
      <Route path={"/contacto"} component={Contacto} />
      <Route path={"/nosotros"} component={Nosotros} />
      <Route path={"/carta"} component={Carta} />
      <Route path={"/navega-relax"} component={NavegaRelax} />
      <Route path={"/cms"} component={CMSDashboard} />
      <Route path={"/cms/usuarios"} component={CMSUsuarios} />
      <Route path={"/cms/carta"} component={CMSCarta} />
      <Route path={"/cms/reservas"} component={CMSReservas} />
      <Route path={"/cms/mensajes"} component={CMSMensajes} />
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
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
