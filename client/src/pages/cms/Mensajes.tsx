import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Mail, Phone, MessageSquare, Eye, CheckCheck, Reply, Trash2, Download } from "lucide-react";
import { Link } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

export default function CMSMensajes() {
  const { user, loading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Queries
  const { data: messages, isLoading, refetch } = trpc.contactMessages.list.useQuery();

  // Mutations
  const updateStatusMutation = trpc.contactMessages.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Estado actualizado");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al actualizar estado");
    },
  });

  const deleteMutation = trpc.contactMessages.delete.useMutation({
    onSuccess: () => {
      toast.success("Mensaje eliminado");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar mensaje");
    },
  });

  const bulkDeleteMutation = trpc.contactMessages.bulkDelete.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.count} mensajes eliminados`);
      setSelectedIds([]);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar mensajes");
    },
  });

  const bulkUpdateStatusMutation = trpc.contactMessages.bulkUpdateStatus.useMutation({
    onSuccess: (data: { count: number }) => {
      toast.success(`${data.count} mensajes actualizados`);
      setSelectedIds([]);
      refetch();
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || "Error al actualizar mensajes");
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

  if (!user || (user.role !== "super_admin" && user.role !== "admin" && user.role !== "editor")) {
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

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMessages?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMessages?.map((m: any) => m.id) || []);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`¿Eliminar ${selectedIds.length} mensajes seleccionados?`)) {
      bulkDeleteMutation.mutate({ ids: selectedIds });
    }
  };

  const handleBulkUpdateStatus = (status: "new" | "read" | "replied") => {
    if (selectedIds.length === 0) return;
    bulkUpdateStatusMutation.mutate({ ids: selectedIds, status });
  };

  const handleExportCSV = () => {
    if (!filteredMessages || filteredMessages.length === 0) {
      toast.error("No hay mensajes para exportar");
      return;
    }

    const selectedMessages = selectedIds.length > 0
      ? filteredMessages.filter((m: any) => selectedIds.includes(m.id))
      : filteredMessages;

    const headers = ["ID", "Nombre", "Email", "Teléfono", "Asunto", "Mensaje", "Estado", "Fecha"];
    const rows = selectedMessages.map((m: any) => [
      m.id,
      m.name,
      m.email,
      m.phone || "",
      m.subject,
      m.message.replace(/\n/g, " "),
      m.status,
      new Date(m.createdAt).toLocaleString("es-CL"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `mensajes_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast.success(`${selectedMessages.length} mensajes exportados`);
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

        {/* Barra de acciones masivas */}
        {filteredMessages && filteredMessages.length > 0 && (
          <div className="bg-white border rounded-lg p-4 mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.length === filteredMessages.length && filteredMessages.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                {selectedIds.length > 0 ? `${selectedIds.length} seleccionados` : "Seleccionar todos"}
              </span>
            </div>

            {selectedIds.length > 0 && (
              <>
                <div className="h-6 w-px bg-gray-300" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkUpdateStatus("read")}
                  disabled={bulkUpdateStatusMutation.isPending}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Marcar como leído
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkUpdateStatus("replied")}
                  disabled={bulkUpdateStatusMutation.isPending}
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Marcar como respondido
                </Button>
                {user.role === "admin" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleBulkDelete}
                    disabled={bulkDeleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                )}
              </>
            )}

            <div className="ml-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportCSV}
              >
                <Download className="w-4 h-4 mr-1" />
                Exportar CSV
              </Button>
            </div>
          </div>
        )}

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
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedIds.includes(message.id)}
                      onCheckedChange={() => handleSelectOne(message.id)}
                      className="mt-1"
                    />
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
