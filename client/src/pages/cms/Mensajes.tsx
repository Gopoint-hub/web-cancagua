import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Mail, Phone, MessageSquare, Eye, CheckCheck, Reply } from "lucide-react";
import { Link } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

export default function CMSMensajes() {
  const { user, loading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read" | "replied">("all");

  // Queries
  const { data: messages, isLoading, refetch } = trpc.contact.list.useQuery();

  // Mutations
  const updateStatusMutation = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Estado actualizado");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al actualizar estado");
    },
  });

  const deleteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      toast.success("Mensaje eliminado");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar mensaje");
    },
  });

  // Verificar permisos
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#44580E]" />
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>
              No tienes permisos para ver los mensajes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cms">Volver al Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredMessages = messages?.filter((message: any) => {
    if (statusFilter === "all") return true;
    return message.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-600">Nuevo</Badge>;
      case "read":
        return <Badge variant="secondary">Leído</Badge>;
      case "replied":
        return <Badge className="bg-green-600">Respondido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mensajes de Contacto</h1>
            <p className="text-gray-600 mt-1">
              Gestiona los mensajes recibidos desde el formulario de contacto
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/cms">Volver al Dashboard</Link>
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={statusFilter === "new" ? "default" : "outline"}
            onClick={() => setStatusFilter("new")}
          >
            Nuevos
          </Button>
          <Button
            variant={statusFilter === "read" ? "default" : "outline"}
            onClick={() => setStatusFilter("read")}
          >
            Leídos
          </Button>
          <Button
            variant={statusFilter === "replied" ? "default" : "outline"}
            onClick={() => setStatusFilter("replied")}
          >
            Respondidos
          </Button>
        </div>

        {/* Lista de Mensajes */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#44580E]" />
          </div>
        )}

        {!isLoading && (!filteredMessages || filteredMessages.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">No hay mensajes {statusFilter !== "all" ? statusFilter + "s" : ""} aún.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && filteredMessages && filteredMessages.length > 0 && (
          <div className="space-y-4">
            {filteredMessages.map((message: any) => (
              <Card key={message.id} className={message.status === "new" ? "border-blue-300" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription className="mt-1 font-semibold">
                        {message.subject}
                      </CardDescription>
                    </div>
                    {getStatusBadge(message.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${message.email}`} className="hover:underline">
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${message.phone}`} className="hover:underline">
                          {message.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {message.status === "new" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatusMutation.mutate({ id: message.id, status: "read" })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Marcar como leído
                      </Button>
                    )}
                    {message.status === "read" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatusMutation.mutate({ id: message.id, status: "replied" })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <CheckCheck className="w-4 h-4 mr-1" />
                        Marcar como respondido
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                        <Reply className="w-4 h-4 mr-1" />
                        Responder
                      </a>
                    </Button>
                    {user.role === "admin" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("¿Eliminar este mensaje?")) {
                            deleteMutation.mutate({ id: message.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Recibido el {new Date(message.createdAt).toLocaleString("es-CL")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
}
