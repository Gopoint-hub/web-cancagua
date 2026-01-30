import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Loader2, Wrench, Plus, Search, RefreshCw, MoreHorizontal,
  Eye, Edit, Trash2, Camera, X, Download, Clock, CheckCircle2,
  AlertTriangle, AlertCircle, FileText, Calendar, MapPin, Settings2
} from "lucide-react";
import { Link } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type ReportStatus = "pending" | "in_progress" | "completed" | "requires_follow_up";
type ReportPriority = "low" | "medium" | "high" | "critical";
type MaintenanceType = "preventive" | "corrective" | "emergency";
type PhotoType = "before" | "during" | "after" | "evidence";

interface Photo {
  id: number;
  url: string;
  description?: string;
  photoType: PhotoType;
  createdAt: string;
}

interface Report {
  id: number;
  reportNumber: string;
  title: string;
  area?: string;
  equipment?: string;
  location?: string;
  status: ReportStatus;
  priority: ReportPriority;
  maintenanceType: MaintenanceType;
  description?: string;
  resolution?: string;
  materialsUsed?: string;
  observations?: string;
  reportedById: number;
  reportedByName?: string;
  reportedByEmail?: string;
  assignedToId?: number;
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  nextMaintenanceDate?: string;
  createdAt: string;
  updatedAt: string;
  photos?: Photo[];
}

const statusLabels: Record<ReportStatus, string> = {
  pending: "Pendiente",
  in_progress: "En Progreso",
  completed: "Completado",
  requires_follow_up: "Requiere Seguimiento",
};

const priorityLabels: Record<ReportPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

const maintenanceTypeLabels: Record<MaintenanceType, string> = {
  preventive: "Preventiva",
  corrective: "Correctiva",
  emergency: "Emergencia",
};

const photoTypeLabels: Record<PhotoType, string> = {
  before: "Antes",
  during: "Durante",
  after: "Después",
  evidence: "Evidencia",
};

export default function CMSReportesMantencion() {
  const { user, loading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | ReportStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    area: "",
    equipment: "",
    location: "",
    status: "pending" as ReportStatus,
    priority: "medium" as ReportPriority,
    maintenanceType: "corrective" as MaintenanceType,
    description: "",
    resolution: "",
    materialsUsed: "",
    observations: "",
  });

  const [photoDescription, setPhotoDescription] = useState("");
  const [photoType, setPhotoType] = useState<PhotoType>("evidence");

  // Queries
  const { data: reports, isLoading, refetch } = trpc.maintenance.list.useQuery();
  const { data: stats } = trpc.maintenance.stats.useQuery();

  // Mutations
  const createMutation = trpc.maintenance.create.useMutation({
    onSuccess: () => {
      toast.success("Reporte creado exitosamente");
      setIsCreateOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear reporte");
    },
  });

  const updateMutation = trpc.maintenance.update.useMutation({
    onSuccess: () => {
      toast.success("Reporte actualizado");
      setIsEditOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al actualizar reporte");
    },
  });

  const deleteMutation = trpc.maintenance.delete.useMutation({
    onSuccess: () => {
      toast.success("Reporte eliminado");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar reporte");
    },
  });

  const addPhotoMutation = trpc.maintenance.addPhoto.useMutation({
    onSuccess: () => {
      toast.success("Foto agregada");
      setUploadingPhoto(false);
      setPhotoDescription("");
      // Refetch report details
      if (selectedReport) {
        refetchReportDetails(selectedReport.id);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Error al subir foto");
      setUploadingPhoto(false);
    },
  });

  const deletePhotoMutation = trpc.maintenance.deletePhoto.useMutation({
    onSuccess: () => {
      toast.success("Foto eliminada");
      if (selectedReport) {
        refetchReportDetails(selectedReport.id);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar foto");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      area: "",
      equipment: "",
      location: "",
      status: "pending",
      priority: "medium",
      maintenanceType: "corrective",
      description: "",
      resolution: "",
      materialsUsed: "",
      observations: "",
    });
  };

  const refetchReportDetails = async (reportId: number) => {
    // This will be handled by the query
    refetch();
  };

  // Verificar permisos
  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user || (user.role !== "super_admin" && user.role !== "admin" && user.role !== "editor")) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Acceso Denegado</CardTitle>
              <CardDescription>
                No tienes permisos para ver los reportes de mantención.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/cms">Volver al Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Filtrar reportes
  const filteredReports = reports?.filter((report: Report) => {
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesSearch = !searchTerm || 
      report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.equipment?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }) || [];

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Settings2 className="w-3 h-3 mr-1" />En Progreso</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="w-3 h-3 mr-1" />Completado</Badge>;
      case "requires_follow_up":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100"><AlertTriangle className="w-3 h-3 mr-1" />Requiere Seguimiento</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: ReportPriority) => {
    switch (priority) {
      case "low":
        return <Badge variant="secondary">Baja</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Media</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Alta</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="w-3 h-3 mr-1" />Crítica</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (!selectedReport) return;
    updateMutation.mutate({
      id: selectedReport.id,
      ...formData,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este reporte?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleViewDetail = (report: Report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setSelectedReport(report);
    setFormData({
      title: report.title || "",
      area: report.area || "",
      equipment: report.equipment || "",
      location: report.location || "",
      status: report.status,
      priority: report.priority,
      maintenanceType: report.maintenanceType,
      description: report.description || "",
      resolution: report.resolution || "",
      materialsUsed: report.materialsUsed || "",
      observations: report.observations || "",
    });
    setIsEditOpen(true);
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedReport) return;

    setUploadingPhoto(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      addPhotoMutation.mutate({
        reportId: selectedReport.id,
        imageData: base64,
        description: photoDescription,
        photoType: photoType,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleExportCSV = () => {
    if (filteredReports.length === 0) {
      toast.error("No hay reportes para exportar");
      return;
    }

    const headers = ["N° Reporte", "Título", "Área", "Equipo", "Estado", "Prioridad", "Tipo", "Descripción", "Resolución", "Fecha Creación"];
    const rows = filteredReports.map((r: Report) => [
      r.reportNumber,
      r.title,
      r.area || "",
      r.equipment || "",
      statusLabels[r.status],
      priorityLabels[r.priority],
      maintenanceTypeLabels[r.maintenanceType],
      (r.description || "").replace(/\n/g, " ").replace(/"/g, '""'),
      (r.resolution || "").replace(/\n/g, " ").replace(/"/g, '""'),
      format(new Date(r.createdAt), "dd/MM/yyyy HH:mm", { locale: es }),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `reportes_mantencion_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();

    toast.success(`${filteredReports.length} reportes exportados`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reportes de Mantención</h1>
            <p className="text-muted-foreground">
              Gestiona los reportes de mantención diarios
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
            <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Reporte
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setStatusFilter("all")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setStatusFilter("pending")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setStatusFilter("in_progress")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
              <Settings2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats?.inProgress || 0}</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setStatusFilter("completed")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completados</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats?.completed || 0}</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => setStatusFilter("requires_follow_up")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seguimiento</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats?.requiresFollowUp || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por título, número, área o equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in_progress">En Progreso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="requires_follow_up">Requiere Seguimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No hay reportes</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "No se encontraron reportes con los filtros aplicados" 
                    : "Crea tu primer reporte de mantención"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° Reporte</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report: Report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono text-sm">{report.reportNumber}</TableCell>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.area || "-"}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{maintenanceTypeLabels[report.maintenanceType]}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(report.createdAt), "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetail(report)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditReport(report)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(report.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Reporte de Mantención</DialogTitle>
              <DialogDescription>
                Completa la información del reporte de mantención
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Reparación de bomba de agua"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="area">Área</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Ej: Piscina"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipment">Equipo</Label>
                  <Input
                    id="equipment"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    placeholder="Ej: Bomba principal"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Sala de máquinas"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Estado</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as ReportStatus })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in_progress">En Progreso</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                      <SelectItem value="requires_follow_up">Requiere Seguimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as ReportPriority })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Tipo</Label>
                  <Select value={formData.maintenanceType} onValueChange={(v) => setFormData({ ...formData, maintenanceType: v as MaintenanceType })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventiva</SelectItem>
                      <SelectItem value="corrective">Correctiva</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción del Problema</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el problema o trabajo a realizar..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="resolution">Resolución / Trabajo Realizado</Label>
                <Textarea
                  id="resolution"
                  value={formData.resolution}
                  onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                  placeholder="Describe la solución aplicada..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materialsUsed">Materiales Utilizados</Label>
                <Textarea
                  id="materialsUsed"
                  value={formData.materialsUsed}
                  onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
                  placeholder="Lista de materiales utilizados..."
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observations">Observaciones</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  placeholder="Observaciones adicionales..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate} disabled={createMutation.isPending || !formData.title}>
                {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Crear Reporte
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Reporte</DialogTitle>
              <DialogDescription>
                {selectedReport?.reportNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-area">Área</Label>
                  <Input
                    id="edit-area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-equipment">Equipo</Label>
                  <Input
                    id="edit-equipment"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Ubicación</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Estado</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as ReportStatus })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in_progress">En Progreso</SelectItem>
                      <SelectItem value="completed">Completado</SelectItem>
                      <SelectItem value="requires_follow_up">Requiere Seguimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Prioridad</Label>
                  <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as ReportPriority })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Tipo</Label>
                  <Select value={formData.maintenanceType} onValueChange={(v) => setFormData({ ...formData, maintenanceType: v as MaintenanceType })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventiva</SelectItem>
                      <SelectItem value="corrective">Correctiva</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción del Problema</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-resolution">Resolución / Trabajo Realizado</Label>
                <Textarea
                  id="edit-resolution"
                  value={formData.resolution}
                  onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-materialsUsed">Materiales Utilizados</Label>
                <Textarea
                  id="edit-materialsUsed"
                  value={formData.materialsUsed}
                  onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-observations">Observaciones</Label>
                <Textarea
                  id="edit-observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                {selectedReport?.title}
              </DialogTitle>
              <DialogDescription>
                {selectedReport?.reportNumber} • Creado el {selectedReport && format(new Date(selectedReport.createdAt), "dd/MM/yyyy HH:mm", { locale: es })}
              </DialogDescription>
            </DialogHeader>
            
            {selectedReport && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="photos">Fotos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Estado</Label>
                      <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Prioridad</Label>
                      <div className="mt-1">{getPriorityBadge(selectedReport.priority)}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Tipo</Label>
                      <div className="mt-1">
                        <Badge variant="outline">{maintenanceTypeLabels[selectedReport.maintenanceType]}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Área</Label>
                      <p className="mt-1">{selectedReport.area || "-"}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Equipo</Label>
                      <p className="mt-1">{selectedReport.equipment || "-"}</p>
                    </div>
                  </div>
                  
                  {selectedReport.location && (
                    <div>
                      <Label className="text-muted-foreground">Ubicación</Label>
                      <p className="mt-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedReport.location}
                      </p>
                    </div>
                  )}
                  
                  {selectedReport.description && (
                    <div>
                      <Label className="text-muted-foreground">Descripción del Problema</Label>
                      <p className="mt-1 whitespace-pre-wrap">{selectedReport.description}</p>
                    </div>
                  )}
                  
                  {selectedReport.resolution && (
                    <div>
                      <Label className="text-muted-foreground">Resolución / Trabajo Realizado</Label>
                      <p className="mt-1 whitespace-pre-wrap">{selectedReport.resolution}</p>
                    </div>
                  )}
                  
                  {selectedReport.materialsUsed && (
                    <div>
                      <Label className="text-muted-foreground">Materiales Utilizados</Label>
                      <p className="mt-1 whitespace-pre-wrap">{selectedReport.materialsUsed}</p>
                    </div>
                  )}
                  
                  {selectedReport.observations && (
                    <div>
                      <Label className="text-muted-foreground">Observaciones</Label>
                      <p className="mt-1 whitespace-pre-wrap">{selectedReport.observations}</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <Label className="text-muted-foreground">Reportado por</Label>
                    <p className="mt-1">{selectedReport.reportedByName || selectedReport.reportedByEmail || "Usuario"}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="photos" className="space-y-4">
                  {/* Photo Upload */}
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <Label htmlFor="photo-description">Descripción de la foto</Label>
                          <Input
                            id="photo-description"
                            value={photoDescription}
                            onChange={(e) => setPhotoDescription(e.target.value)}
                            placeholder="Ej: Daño en la bomba"
                          />
                        </div>
                        <div>
                          <Label>Tipo</Label>
                          <Select value={photoType} onValueChange={(v) => setPhotoType(v as PhotoType)}>
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="before">Antes</SelectItem>
                              <SelectItem value="during">Durante</SelectItem>
                              <SelectItem value="after">Después</SelectItem>
                              <SelectItem value="evidence">Evidencia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <Button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPhoto}
                          >
                            {uploadingPhoto ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Camera className="w-4 h-4 mr-2" />
                            )}
                            Subir Foto
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Photo Gallery */}
                  {selectedReport.photos && selectedReport.photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedReport.photos.map((photo: Photo) => (
                        <Card key={photo.id} className="overflow-hidden">
                          <div className="relative aspect-square">
                            <img
                              src={photo.url}
                              alt={photo.description || "Foto de mantención"}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8"
                              onClick={() => {
                                if (confirm("¿Eliminar esta foto?")) {
                                  deletePhotoMutation.mutate({ photoId: photo.id });
                                }
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Badge className="absolute bottom-2 left-2">
                              {photoTypeLabels[photo.photoType]}
                            </Badge>
                          </div>
                          {photo.description && (
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">{photo.description}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Sin fotos</h3>
                      <p className="text-muted-foreground">
                        Agrega fotos para documentar el trabajo realizado
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Cerrar
              </Button>
              <Button onClick={() => {
                setIsDetailOpen(false);
                if (selectedReport) handleEditReport(selectedReport);
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
