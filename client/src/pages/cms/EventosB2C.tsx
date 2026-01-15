import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { 
  Calendar, Plus, Edit, Trash2, Eye, Sparkles, Clock, 
  MapPin, ExternalLink, Upload, X, Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Toast functionality - to be implemented
const useToast = () => ({ 
  toast: (options: any) => console.log('Toast:', options) 
});

type EventStatus = "draft" | "active" | "ended";

export default function EventosB2C() {
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<EventStatus | "all">("all");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("Cancagua Spa");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "active">("draft");
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Queries
  const { data: events, isLoading } = trpc.events.getAll.useQuery(
    statusFilter === "all" ? undefined : { status: statusFilter }
  );

  // Mutations
  const createEvent = trpc.events.create.useMutation({
    onSuccess: () => {
      toast({ title: "Evento creado", description: "El evento se ha creado exitosamente con IA" });
      utils.events.getAll.invalidate();
      resetForm();
      setIsCreateDialogOpen(false);
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const updateEvent = trpc.events.update.useMutation({
    onSuccess: () => {
      toast({ title: "Evento actualizado", description: "Los cambios se han guardado" });
      utils.events.getAll.invalidate();
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const deleteEvent = trpc.events.delete.useMutation({
    onSuccess: () => {
      toast({ title: "Evento eliminado", description: "El evento se ha eliminado correctamente" });
      utils.events.getAll.invalidate();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const regenerateContent = trpc.events.regenerateContent.useMutation({
    onSuccess: () => {
      toast({ title: "Contenido regenerado", description: "La IA ha generado nuevo contenido HTML" });
      utils.events.getAll.invalidate();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setExternalLink("");
    setStartDate("");
    setEndDate("");
    setLocation("Cancagua Spa");
    setPrice("");
    setFeatured(false);
    setStatus("draft");
    setImages([]);
    setSelectedEventId(null);
  };

  const uploadImage = trpc.events.uploadImage.useMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Convertir archivo a base64
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64 = reader.result as string;
              const result = await uploadImage.mutateAsync({
                fileName: file.name,
                fileData: base64,
                contentType: file.type,
              });
              resolve(result.url);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages([...images, ...uploadedUrls]);
      
      toast({ 
        title: "Imágenes subidas", 
        description: `${uploadedUrls.length} imagen(es) subida(s) a S3` 
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({ 
        title: "Error", 
        description: "Error al subir imágenes a S3", 
        variant: "destructive" 
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!title || !description || images.length === 0 || !externalLink || !startDate || !endDate) {
      toast({ 
        title: "Campos incompletos", 
        description: "Por favor completa todos los campos requeridos", 
        variant: "destructive" 
      });
      return;
    }

    createEvent.mutate({
      title,
      description,
      images,
      externalLink,
      startDate,
      endDate,
      location: location || undefined,
      price: price ? parseFloat(price) : undefined,
      featured,
      status,
    });
  };

  const handleEdit = (event: any) => {
    setSelectedEventId(event.id);
    setTitle(event.title);
    setDescription(event.description || "");
    setExternalLink(event.externalLink || "");
    setStartDate(new Date(event.startDate).toISOString().slice(0, 16));
    setEndDate(new Date(event.endDate).toISOString().slice(0, 16));
    setLocation(event.location || "Cancagua Spa");
    setPrice(event.price ? event.price.toString() : "");
    setFeatured(event.featured === 1);
    setStatus(event.status);
    setImages(event.images ? JSON.parse(event.images) : []);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedEventId) return;

    updateEvent.mutate({
      id: selectedEventId,
      title,
      description,
      images,
      externalLink,
      startDate,
      endDate,
      location: location || undefined,
      price: price ? parseFloat(price) : undefined,
      featured,
      status: status as any,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      deleteEvent.mutate({ id });
    }
  };

  const handleRegenerateContent = (id: number) => {
    if (confirm("¿Regenerar el contenido HTML con IA? Esto sobrescribirá el contenido actual.")) {
      regenerateContent.mutate({ id });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>;
      case "ended":
        return <Badge variant="outline">Finalizado</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Eventos</h1>
            <p className="text-muted-foreground">
              Crea y gestiona eventos con landing pages generadas por IA
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crear Evento
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="w-48">
                <Label>Estado</Label>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="draft">Borradores</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="ended">Finalizados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : events && events.length > 0 ? (
            events.map((event: any) => {
              const eventImages = event.images ? JSON.parse(event.images) : [];
              const firstImage = eventImages[0] || "/images/placeholder-event.jpg";

              return (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={firstImage} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(event.status)}
                    </div>
                    {event.featured === 1 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-yellow-500">Destacado</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {new Date(event.startDate).toLocaleDateString("es-CL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/eventos/${event.slug}`, "_blank")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRegenerateContent(event.id)}
                        disabled={regenerateContent.isPending}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        IA
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay eventos {statusFilter !== "all" && `en estado "${statusFilter}"`}</p>
            </div>
          )}
        </div>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Evento</DialogTitle>
              <DialogDescription>
                La IA generará automáticamente el contenido HTML de la landing page
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Heart Coherence Workshop"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción detallada del evento..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="images">Imágenes * (mínimo 1)</Label>
                <div className="space-y-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImages}
                  />
                  {uploadingImages && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo imágenes...
                    </div>
                  )}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="externalLink">Link de Reserva *</Label>
                <Input
                  id="externalLink"
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://reservas.cancagua.cl/..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha/Hora Inicio * (Chile)</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Fecha/Hora Fin * (Chile)</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Cancagua Spa"
                />
              </div>
              <div>
                <Label htmlFor="price">Precio (CLP)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="featured">Destacar en menú principal</Label>
              </div>
              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreate} 
                disabled={createEvent.isPending}
              >
                {createEvent.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando con IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Crear con IA
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Evento</DialogTitle>
              <DialogDescription>
                Modifica los detalles del evento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Título *</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Descripción *</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="edit-images">Imágenes *</Label>
                <div className="space-y-2">
                  <Input
                    id="edit-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImages}
                  />
                  {uploadingImages && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo imágenes...
                    </div>
                  )}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="edit-externalLink">Link de Reserva *</Label>
                <Input
                  id="edit-externalLink"
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-startDate">Fecha/Hora Inicio *</Label>
                  <Input
                    id="edit-startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endDate">Fecha/Hora Fin *</Label>
                  <Input
                    id="edit-endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-location">Ubicación</Label>
                <Input
                  id="edit-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Precio (CLP)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="edit-featured">Destacar en menú principal</Label>
              </div>
              <div>
                <Label htmlFor="edit-status">Estado</Label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="ended">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdate} 
                disabled={updateEvent.isPending}
              >
                {updateEvent.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
