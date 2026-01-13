import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2, CheckCircle2, XCircle, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const STATUS_CONFIG = {
  draft: { label: "Borrador", variant: "secondary" as const, color: "bg-gray-500" },
  sent: { label: "Enviada", variant: "default" as const, color: "bg-blue-500" },
  approved: { label: "Aprobada", variant: "default" as const, color: "bg-green-500" },
  event_completed: { label: "Jornada Efectuada", variant: "default" as const, color: "bg-purple-500" },
  paid: { label: "Pagada", variant: "default" as const, color: "bg-emerald-500" },
  invoiced: { label: "Facturada", variant: "default" as const, color: "bg-indigo-500" },
};

export default function Cotizaciones() {
  const [, setLocation] = useLocation();
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const { data: quotes = [], refetch } = trpc.quotes.getAll.useQuery();
  const { data: quoteItems = [] } = trpc.quotes.getItems.useQuery(
    { quoteId: selectedQuote?.id || 0 },
    { enabled: !!selectedQuote }
  );
  const updateStatusMutation = trpc.quotes.updateStatus.useMutation();
  const deleteQuoteMutation = trpc.quotes.delete.useMutation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-CL");
  };

  const handleViewDetails = (quote: any) => {
    setSelectedQuote(quote);
    setShowDetailsDialog(true);
  };

  const handleChangeStatus = (quote: any) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status);
    setShowStatusDialog(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedQuote || !newStatus) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: selectedQuote.id,
        status: newStatus as any,
      });
      toast.success("Estado actualizado correctamente");
      setShowStatusDialog(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar estado");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta cotización?")) return;

    try {
      await deleteQuoteMutation.mutateAsync({ id });
      toast.success("Cotización eliminada");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Error al eliminar cotización");
    }
  };

  // Agrupar cotizaciones por estado
  const quotesByStatus = quotes.reduce((acc: any, quote: any) => {
    if (!acc[quote.status]) {
      acc[quote.status] = [];
    }
    acc[quote.status].push(quote);
    return acc;
  }, {});

  // Estadísticas
  const stats = {
    total: quotes.length,
    sent: quotes.filter((q: any) => q.status === "sent").length,
    approved: quotes.filter((q: any) => q.status === "approved").length,
    totalValue: quotes
      .filter((q: any) => q.status === "approved" || q.status === "event_completed" || q.status === "paid")
      .reduce((sum: number, q: any) => sum + q.total, 0),
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Cotizaciones</h1>
          <p className="text-muted-foreground mt-2">
            CRM para seguimiento de cotizaciones corporativas
          </p>
        </div>
        <Button onClick={() => setLocation("/cms/crear-cotizacion")}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cotización
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cotizaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Enviadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.sent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aprobadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total Aprobado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de cotizaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Cotizaciones ({quotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Personas</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No hay cotizaciones registradas. Crea una para comenzar.
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((quote: any) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono font-medium">
                      {quote.quoteNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{quote.clientName}</p>
                        <p className="text-sm text-muted-foreground">{quote.clientEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(quote.createdAt)}</TableCell>
                    <TableCell>{quote.numberOfPeople}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(quote.total)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG].variant}
                        className={STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG].color}
                      >
                        {STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(quote)}
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleChangeStatus(quote)}
                          title="Cambiar estado"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(quote.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog: Detalles de cotización */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de Cotización {selectedQuote?.quoteNumber}</DialogTitle>
            <DialogDescription>
              Cliente: {selectedQuote?.clientName}
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-6">
              {/* Información general */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge
                    variant={STATUS_CONFIG[selectedQuote.status as keyof typeof STATUS_CONFIG].variant}
                    className={`${STATUS_CONFIG[selectedQuote.status as keyof typeof STATUS_CONFIG].color} mt-1`}
                  >
                    {STATUS_CONFIG[selectedQuote.status as keyof typeof STATUS_CONFIG].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número de Personas</p>
                  <p className="text-lg font-medium">{selectedQuote.numberOfPeople}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha del Evento</p>
                  <p className="text-lg font-medium">{formatDate(selectedQuote.eventDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Válida Hasta</p>
                  <p className="text-lg font-medium">{formatDate(selectedQuote.validUntil)}</p>
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="font-bold mb-3">Productos y Servicios</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-right">Precio Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quoteItems.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <p className="font-medium">{item.productName}</p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatPrice(item.unitPrice)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">
                        TOTAL
                      </TableCell>
                      <TableCell className="text-right font-bold text-lg">
                        {formatPrice(selectedQuote.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Itinerario */}
              {selectedQuote.itinerary && (
                <div>
                  <h3 className="font-bold mb-3">Itinerario</h3>
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
                    {selectedQuote.itinerary}
                  </pre>
                </div>
              )}

              {/* Notas */}
              {selectedQuote.notes && (
                <div>
                  <h3 className="font-bold mb-3">Notas Internas</h3>
                  <p className="text-sm bg-muted p-4 rounded">{selectedQuote.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Cambiar estado */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Estado de Cotización</DialogTitle>
            <DialogDescription>
              Cotización: {selectedQuote?.quoteNumber} - {selectedQuote?.clientName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Estado Actual:</p>
              <Badge
                variant={STATUS_CONFIG[selectedQuote?.status as keyof typeof STATUS_CONFIG]?.variant}
                className={STATUS_CONFIG[selectedQuote?.status as keyof typeof STATUS_CONFIG]?.color}
              >
                {STATUS_CONFIG[selectedQuote?.status as keyof typeof STATUS_CONFIG]?.label}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Nuevo Estado:</p>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="sent">Cotización Enviada</SelectItem>
                  <SelectItem value="approved">Aprobado por el Cliente</SelectItem>
                  <SelectItem value="event_completed">Jornada Efectuada</SelectItem>
                  <SelectItem value="paid">Jornada Pagada</SelectItem>
                  <SelectItem value="invoiced">Factura Enviada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="font-medium mb-2">Flujo recomendado:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Borrador → Cotización Enviada</li>
                <li>Cotización Enviada → Aprobado por el Cliente</li>
                <li>Aprobado → Jornada Efectuada</li>
                <li>Jornada Efectuada → Jornada Pagada</li>
                <li>Jornada Pagada → Factura Enviada</li>
              </ol>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending || newStatus === selectedQuote?.status}
            >
              Actualizar Estado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
