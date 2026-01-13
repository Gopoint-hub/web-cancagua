import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Eye, Save, Send } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface QuoteItem {
  productId?: number;
  productName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  sortOrder: number;
  duration?: number; // Para generar itinerario
}

export default function CrearCotizacion() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1); // 1: Datos cliente, 2: Productos, 3: Revisión
  const [showPreview, setShowPreview] = useState(false);

  // Datos del cliente
  const [clientData, setClientData] = useState({
    companyName: "",
    contactName: "",
    contactPosition: "",
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    rut: "",
    giro: "",
    address: "",
    city: "",
  });

  // Datos de la cotización
  const [quoteData, setQuoteData] = useState({
    numberOfPeople: 1,
    eventDate: "",
    eventDescription: "",
    notes: "",
  });

  // Items de la cotización
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [itinerary, setItinerary] = useState("");

  // Dialog para agregar productos
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productQuantity, setProductQuantity] = useState(1);

  const { data: products = [] } = trpc.corporateProducts.getActive.useQuery();
  const createQuoteMutation = trpc.quotes.create.useMutation();

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal; // Aquí podrías agregar impuestos o descuentos

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const newItem: QuoteItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      description: selectedProduct.description,
      quantity: productQuantity,
      unitPrice: selectedProduct.unitPrice,
      total:
        selectedProduct.priceType === "per_person"
          ? selectedProduct.unitPrice * productQuantity * quoteData.numberOfPeople
          : selectedProduct.unitPrice * productQuantity,
      sortOrder: items.length,
      duration: selectedProduct.duration,
    };

    setItems([...items, newItem]);
    setIsAddProductOpen(false);
    setSelectedProduct(null);
    setProductQuantity(1);
    toast.success("Producto agregado");
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    toast.success("Producto eliminado");
  };

  const generateItinerary = () => {
    const lines: string[] = [];
    lines.push(`ITINERARIO PROPUESTO - ${quoteData.numberOfPeople} personas\n`);
    lines.push("Horario de atención: 10:00 - 18:00\n");

    let currentTime = "10:00";

    // Filtrar items con duración
    const timedItems = items.filter((item) => item.duration && item.duration > 0);

    for (const item of timedItems) {
      if (item.duration) {
        const durationHours = Math.floor(item.duration / 60);
        const durationMins = item.duration % 60;
        const durationStr =
          durationHours > 0
            ? `${durationHours}h ${durationMins > 0 ? durationMins + "min" : ""}`
            : `${durationMins}min`;

        lines.push(`${currentTime} - ${item.productName} (${durationStr})`);

        // Calcular siguiente hora
        const [hours, mins] = currentTime.split(":").map(Number);
        const totalMins = hours * 60 + mins + item.duration;
        const nextHours = Math.floor(totalMins / 60);
        const nextMins = totalMins % 60;
        currentTime = `${String(nextHours).padStart(2, "0")}:${String(nextMins).padStart(2, "0")}`;
      }
    }

    // Agregar items sin duración
    const untimedItems = items.filter((item) => !item.duration || item.duration === 0);
    if (untimedItems.length > 0) {
      lines.push("\nServicios adicionales incluidos:");
      untimedItems.forEach((item) => {
        lines.push(`• ${item.productName}`);
      });
    }

    lines.push("\n*El itinerario puede ajustarse según las necesidades del grupo");

    setItinerary(lines.join("\n"));
  };

  const handleSubmit = async (status: "draft" | "sent") => {
    // Validaciones
    if (!clientData.companyName || !clientData.contactName || !clientData.contactEmail) {
      toast.error("Por favor completa los datos del cliente");
      return;
    }

    if (items.length === 0) {
      toast.error("Agrega al menos un producto a la cotización");
      return;
    }

    try {
      // Calcular fecha de validez (10 días)
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 10);

      await createQuoteMutation.mutateAsync({
        clientName: clientData.companyName,
        clientEmail: clientData.contactEmail,
        numberOfPeople: quoteData.numberOfPeople,
        eventDate: quoteData.eventDate || undefined,
        itinerary: itinerary || undefined,
        subtotal,
        total,
        validUntil: validUntil.toISOString().split("T")[0],
        status,
        notes: quoteData.notes || undefined,
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
          sortOrder: item.sortOrder,
        })),
      });

      toast.success(
        status === "draft"
          ? "Cotización guardada como borrador"
          : "Cotización enviada al cliente"
      );
      setLocation("/cms/cotizaciones");
    } catch (error: any) {
      toast.error(error.message || "Error al crear cotización");
    }
  };

  useEffect(() => {
    if (items.length > 0 && quoteData.numberOfPeople > 0) {
      generateItinerary();
    }
  }, [items, quoteData.numberOfPeople]);

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Nueva Cotización Corporativa</h1>
          <p className="text-muted-foreground mt-2">
            Crea una cotización personalizada para eventos corporativos
          </p>
        </div>
        <Button variant="outline" onClick={() => setLocation("/cms/cotizaciones")}>
          Cancelar
        </Button>
      </div>

      {/* Indicador de pasos */}
      <div className="flex gap-4 mb-8">
        {[
          { num: 1, label: "Datos del Cliente" },
          { num: 2, label: "Productos y Servicios" },
          { num: 3, label: "Revisión y Envío" },
        ].map((s) => (
          <div
            key={s.num}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              step === s.num
                ? "border-primary bg-primary/10"
                : step > s.num
                ? "border-green-500 bg-green-50"
                : "border-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  step === s.num
                    ? "bg-primary text-primary-foreground"
                    : step > s.num
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.num}
              </div>
              <span className="font-medium">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Paso 1: Datos del Cliente */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Completa los datos de la empresa y contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                <Input
                  id="companyName"
                  value={clientData.companyName}
                  onChange={(e) =>
                    setClientData({ ...clientData, companyName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactName">Nombre del Contacto *</Label>
                <Input
                  id="contactName"
                  value={clientData.contactName}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPosition">Cargo Empresarial</Label>
                <Input
                  id="contactPosition"
                  value={clientData.contactPosition}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactPosition: e.target.value })
                  }
                  placeholder="Ej: Gerente de RRHH"
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={clientData.contactEmail}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactEmail: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Teléfono</Label>
                <Input
                  id="contactPhone"
                  value={clientData.contactPhone}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactPhone: e.target.value })
                  }
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="contactWhatsapp">WhatsApp</Label>
                <Input
                  id="contactWhatsapp"
                  value={clientData.contactWhatsapp}
                  onChange={(e) =>
                    setClientData({ ...clientData, contactWhatsapp: e.target.value })
                  }
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="rut">RUT de la Empresa</Label>
                <Input
                  id="rut"
                  value={clientData.rut}
                  onChange={(e) => setClientData({ ...clientData, rut: e.target.value })}
                  placeholder="12.345.678-9"
                />
              </div>

              <div>
                <Label htmlFor="giro">Giro</Label>
                <Input
                  id="giro"
                  value={clientData.giro}
                  onChange={(e) => setClientData({ ...clientData, giro: e.target.value })}
                  placeholder="Ej: Servicios de consultoría"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={clientData.address}
                  onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={clientData.city}
                  onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
                  placeholder="Frutillar"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button onClick={() => setStep(2)}>Continuar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paso 2: Productos */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfPeople">Número de Personas *</Label>
                  <Input
                    id="numberOfPeople"
                    type="number"
                    min="1"
                    value={quoteData.numberOfPeople}
                    onChange={(e) =>
                      setQuoteData({
                        ...quoteData,
                        numberOfPeople: parseInt(e.target.value) || 1,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="eventDate">Fecha del Evento</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={quoteData.eventDate}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, eventDate: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="eventDescription">Descripción de la Jornada</Label>
                  <Textarea
                    id="eventDescription"
                    value={quoteData.eventDescription}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, eventDescription: e.target.value })
                    }
                    placeholder="Describe el tipo de evento, objetivos, necesidades especiales, etc."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Productos y Servicios</CardTitle>
                  <CardDescription>Agrega los servicios incluidos en la cotización</CardDescription>
                </div>
                <Button onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No has agregado productos aún</p>
                  <p className="text-sm mt-2">Haz clic en "Agregar Producto" para comenzar</p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto/Servicio</TableHead>
                        <TableHead className="text-center">Cantidad</TableHead>
                        <TableHead className="text-right">Precio Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              {item.description && (
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.unitPrice)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatPrice(item.total)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          TOTAL
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          {formatPrice(total)}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              Volver
            </Button>
            <Button onClick={() => setStep(3)} disabled={items.length === 0}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Paso 3: Revisión */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Itinerario Propuesto</CardTitle>
              <CardDescription>
                Revisa y edita el itinerario antes de enviar la cotización
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={itinerary}
                onChange={(e) => setItinerary(e.target.value)}
                rows={12}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas Internas</CardTitle>
              <CardDescription>Opcional - Solo visible para el equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={quoteData.notes}
                onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                placeholder="Agrega notas internas sobre esta cotización..."
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              Volver
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Previsualizar
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSubmit("draft")}
                disabled={createQuoteMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button
                onClick={() => handleSubmit("sent")}
                disabled={createQuoteMutation.isPending}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar al Cliente
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog: Agregar Producto */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Producto/Servicio</DialogTitle>
            <DialogDescription>
              Selecciona un producto del catálogo y especifica la cantidad
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Producto</Label>
              <Select
                value={selectedProduct?.id.toString()}
                onValueChange={(value) => {
                  const product = products.find((p) => p.id === parseInt(value));
                  setSelectedProduct(product);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} - {formatPrice(product.unitPrice)}
                      {product.priceType === "per_person" ? " por persona" : " tarifa fija"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProduct && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                  {selectedProduct.includes && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Incluye:</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {selectedProduct.includes.split("\n").map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Cantidad</Label>
                  <Input
                    type="number"
                    min="1"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(parseInt(e.target.value) || 1)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedProduct.priceType === "per_person"
                      ? `Total: ${formatPrice(
                          selectedProduct.unitPrice *
                            productQuantity *
                            quoteData.numberOfPeople
                        )} (${productQuantity} x ${quoteData.numberOfPeople} personas)`
                      : `Total: ${formatPrice(selectedProduct.unitPrice * productQuantity)}`}
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddProduct} disabled={!selectedProduct}>
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Previsualización */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Previsualización de Cotización</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-6 bg-white text-black">
            {/* Encabezado */}
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold">Cancagua Spa & Retreat Center</h1>
              <p className="text-sm text-gray-600">contacto@cancagua.cl | +56940073999</p>
            </div>

            {/* Información del cliente */}
            <div>
              <h2 className="font-bold mb-2">Cliente:</h2>
              <p>{clientData.companyName}</p>
              <p>{clientData.contactName}</p>
              {clientData.contactPosition && <p>{clientData.contactPosition}</p>}
              <p>{clientData.contactEmail}</p>
            </div>

            {/* Tabla de productos */}
            <div>
              <h2 className="font-bold mb-2">Detalle de Servicios:</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Artículo y descripción</th>
                    <th className="text-center p-2">Cantidad</th>
                    <th className="text-right p-2">Precio unitario</th>
                    <th className="text-right p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        <p className="font-medium">{item.productName}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600">{item.description}</p>
                        )}
                      </td>
                      <td className="text-center p-2">{item.quantity}</td>
                      <td className="text-right p-2">{formatPrice(item.unitPrice)}</td>
                      <td className="text-right p-2">{formatPrice(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan={3} className="text-right p-2">
                      TOTAL
                    </td>
                    <td className="text-right p-2">{formatPrice(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Itinerario */}
            {itinerary && (
              <div>
                <h2 className="font-bold mb-2">Itinerario:</h2>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                  {itinerary}
                </pre>
              </div>
            )}

            {/* Condiciones */}
            <div className="text-sm text-gray-600">
              <p className="font-bold">Condiciones de compra:</p>
              <p>• Cotización válida por 10 días</p>
              <p>• Para garantizar reserva se debe abonar el 50% del valor total</p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
