import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { BarChart3, Calendar, Mail, Users } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function CMSDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Verificar si es admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>
              No tienes permisos para acceder al CMS.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="w-full">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Visitantes Hoy",
      value: "0",
      icon: Users,
      description: "Total de visitas únicas",
    },
    {
      title: "Eventos Activos",
      value: "0",
      icon: Calendar,
      description: "Eventos próximos",
    },
    {
      title: "Suscriptores",
      value: "0",
      icon: Mail,
      description: "Newsletter activos",
    },
    {
      title: "Conversiones",
      value: "0%",
      icon: BarChart3,
      description: "Tasa de reservas",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">CMS Cancagua</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={() => setLocation("/")}>
              Ver Sitio
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="default" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/servicios")}
                  >
                    Servicios
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/eventos")}
                  >
                    Eventos
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/carta")}
                  >
                    Carta
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/reservas")}
                  >
                    Reservas
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/mensajes")}
                  >
                    Mensajes
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/clientes")}
                  >
                    Clientes
                  </Button>
                  <div className="pt-2 mt-2 border-t">
                    <p className="text-xs text-muted-foreground px-3 mb-2 font-semibold">EVENTOS CORPORATIVOS</p>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setLocation("/cms/cotizaciones")}
                    >
                      Cotizaciones
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setLocation("/cms/productos-corporativos")}
                    >
                      Catálogo Productos
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/newsletter")}
                  >
                    Newsletter
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/analytics")}
                  >
                    Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/usuarios")}
                  >
                    Usuarios
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setLocation("/cms/configuracion")}
                  >
                    Configuración
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Bienvenida */}
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido al CMS</CardTitle>
                <CardDescription>
                  Panel de administración de Cancagua Spa & Retreat Center
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Gestiona tu sitio desde aquí
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4"
                  onClick={() => setLocation("/cms/servicios")}
                >
                  <span className="font-semibold mb-1">Gestionar Servicios</span>
                  <span className="text-xs text-muted-foreground">
                    Crear, editar y eliminar servicios
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4"
                  onClick={() => setLocation("/cms/eventos")}
                >
                  <span className="font-semibold mb-1">Gestionar Eventos</span>
                  <span className="text-xs text-muted-foreground">
                    Administrar talleres y eventos
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4"
                  onClick={() => setLocation("/cms/newsletter")}
                >
                  <span className="font-semibold mb-1">Enviar Newsletter</span>
                  <span className="text-xs text-muted-foreground">
                    Crear y enviar campañas de email
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4"
                  onClick={() => setLocation("/cms/configuracion")}
                >
                  <span className="font-semibold mb-1">Configurar Skedu</span>
                  <span className="text-xs text-muted-foreground">
                    Conectar con la API de Skedu
                  </span>
                </Button>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas acciones en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No hay actividad reciente
                </p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
