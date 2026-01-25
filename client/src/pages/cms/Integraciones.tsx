import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    RefreshCw, Calendar, Users, Briefcase, CheckCircle2, AlertCircle, Clock
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";

export default function CMSIntegraciones() {
    const [syncingAll, setSyncingAll] = useState(false);

    const utils = trpc.useUtils();
    const { data: status, isLoading } = trpc.skedu.getSyncStatus.useQuery();

    const syncServices = trpc.skedu.syncServices.useMutation({
        onSuccess: (data) => {
            toast.success(`Servicios sincronizados: ${data.count}`);
            utils.skedu.getSyncStatus.invalidate();
        },
        onError: (err) => toast.error(`Error: ${err.message}`)
    });

    const syncEvents = trpc.skedu.syncEvents.useMutation({
        onSuccess: (data) => {
            toast.success(`Eventos sincronizados: ${data.count}`);
            utils.skedu.getSyncStatus.invalidate();
        },
        onError: (err) => toast.error(`Error: ${err.message}`)
    });

    const syncClients = trpc.skedu.syncClients.useMutation({
        onSuccess: (data) => {
            toast.success(`Clientes sincronizados: ${data.count}`);
            utils.skedu.getSyncStatus.invalidate();
        },
        onError: (err) => toast.error(`Error: ${err.message}`)
    });

    const syncAll = trpc.skedu.syncAll.useMutation({
        onSuccess: (data) => {
            toast.success("Sincronización completa finalizada");
            utils.skedu.getSyncStatus.invalidate();
            setSyncingAll(false);
        },
        onError: (err) => {
            toast.error(`Error: ${err.message}`);
            setSyncingAll(false);
        }
    });

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "Nunca";
        return new Date(dateStr).toLocaleString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const handleSyncAll = async () => {
        setSyncingAll(true);
        syncAll.mutate();
    };

    const seoData = {
        title: "Integraciones | Cancagua CMS",
        description: "Gestión de integraciones externas con Skedu y otros servicios",
        noindex: true
    };

    return (
        <DashboardLayout>
            <SEOHead {...seoData} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Integraciones Externas</h1>
                        <p className="text-muted-foreground">
                            Gestiona la conexión y sincronización con plataformas externas
                        </p>
                    </div>
                    <Button
                        onClick={handleSyncAll}
                        disabled={syncingAll || syncAll.isPending}
                        className="bg-primary hover:bg-primary/90"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${syncingAll ? "animate-spin" : ""}`} />
                        Sincronizar Todo
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Skedu Services */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-blue-600" />
                                </div>
                                {status?.services ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-amber-500" />
                                )}
                            </div>
                            <CardTitle className="text-xl">Servicios (Skedu)</CardTitle>
                            <CardDescription>
                                Sincroniza masajes, terapias y pases desde Skedu API
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Última sincronización:</span>
                                <span className="font-medium text-foreground">
                                    {isLoading ? "Cargando..." : formatDate(status?.services)}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => syncServices.mutate()}
                                disabled={syncServices.isPending}
                            >
                                {syncServices.isPending ? (
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                )}
                                Sincronizar Servicios
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Skedu Events */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                </div>
                                {status?.events ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-amber-500" />
                                )}
                            </div>
                            <CardTitle className="text-xl">Eventos y Clases</CardTitle>
                            <CardDescription>
                                Actualiza el calendario de eventos y clases regulares
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Última sincronización:</span>
                                <span className="font-medium text-foreground">
                                    {isLoading ? "Cargando..." : formatDate(status?.events)}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => syncEvents.mutate()}
                                disabled={syncEvents.isPending}
                            >
                                {syncEvents.isPending ? (
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                )}
                                Sincronizar Eventos
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Skedu Clients */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>
                                {status?.clients ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-amber-500" />
                                )}
                            </div>
                            <CardTitle className="text-xl">Clientes Skedu</CardTitle>
                            <CardDescription>
                                Importa perfiles de clientes desde la base de datos de Skedu
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Última sincronización:</span>
                                <span className="font-medium text-foreground">
                                    {isLoading ? "Cargando..." : formatDate(status?.clients)}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => syncClients.mutate()}
                                disabled={syncClients.isPending}
                            >
                                {syncClients.isPending ? (
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                )}
                                Sincronizar Clientes
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Configuration Notice */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-slate-500" />
                            Información de Configuración
                        </CardTitle>
                        <CardDescription>
                            La sincronización utiliza las credenciales de Skedu API definidas en las variables de entorno del servidor.
                            Si encuentras errores de autenticación, verifica que SKEDU_APP_ID y SKEDU_SECRET sean correctos.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </DashboardLayout>
    );
}
