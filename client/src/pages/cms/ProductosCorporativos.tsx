import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "biopiscina", label: "Biopiscina" },
  { value: "hot_tub", label: "Hot Tub" },
  { value: "masaje", label: "Masaje" },
  { value: "taller", label: "Taller" },
  { value: "alimentos", label: "Alimentos" },
  { value: "arriendo", label: "Arriendo Espacio" },
  { value: "programa", label: "Programa" },
  { value: "otros", label: "Otros" },
];

export default function ProductosCorporativos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priceType: "per_person" as "per_person" | "flat",
    unitPrice: 0,
    duration: undefined as number | undefined,
    maxCapacity: undefined as number | undefined,
    includes: "",
    active: 1,
  });

  const { data: products = [], refetch } = trpc.corporateProducts.getAll.useQuery();
  const createMutation = trpc.corporateProducts.create.useMutation();
  const updateMutation = trpc.corporateProducts.update.useMutation();
  const deleteMutation = trpc.corporateProducts.delete.useMutation();

  const handleOpenDialog = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        priceType: product.priceType || "per_person",
        unitPrice: product.unitPrice || 0,
        duration: product.duration || undefined,
        maxCapacity: product.maxCapacity || undefined,
        includes: product.includes || "",
        active: product.active ?? 1,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        priceType: "per_person",
        unitPrice: 0,
        duration: undefined,
        maxCapacity: undefined,
        includes: "",
        active: 1,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          ...formData,
        });
        toast.success("Producto actualizado correctamente");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Producto creado correctamente");
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Ha ocurrido un error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Producto eliminado correctamente");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Ha ocurrido un error");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find((c) => c.value === value)?.label || value;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Productos Corporativos</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona los productos y servicios disponibles para cotizaciones corporativas
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo Precio</TableHead>
                <TableHead>Precio Unitario</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No hay productos registrados. Crea uno para comenzar.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                    </TableCell>
                    <TableCell>
                      {product.priceType === "per_person" ? "Por persona" : "Tarifa fija"}
                    </TableCell>
                    <TableCell>{formatPrice(product.unitPrice)}</TableCell>
                    <TableCell>
                      {product.duration ? `${product.duration} min` : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.active ? "default" : "secondary"}>
                        {product.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </DialogTitle>
            <DialogDescription>
              Completa la información del producto o servicio corporativo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nombre del Producto/Servicio *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Ej: Biopiscina 4 horas"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción detallada del servicio"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priceType">Tipo de Precio *</Label>
                <Select
                  value={formData.priceType}
                  onValueChange={(value: "per_person" | "flat") =>
                    setFormData({ ...formData, priceType: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_person">Por Persona</SelectItem>
                    <SelectItem value="flat">Tarifa Fija</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unitPrice">Precio Unitario (CLP) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, unitPrice: parseInt(e.target.value) || 0 })
                  }
                  required
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duración (minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  min="0"
                  placeholder="Opcional"
                />
              </div>

              <div>
                <Label htmlFor="maxCapacity">Capacidad Máxima</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  value={formData.maxCapacity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxCapacity: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  min="0"
                  placeholder="Opcional"
                />
              </div>

              <div>
                <Label htmlFor="active">Estado</Label>
                <Select
                  value={formData.active.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, active: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Activo</SelectItem>
                    <SelectItem value="0">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="includes">Incluye (un item por línea)</Label>
                <Textarea
                  id="includes"
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  placeholder="Bata&#10;Gorro de nado&#10;Bolsa de Pilwa"
                  rows={4}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Escribe cada item en una línea separada
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingProduct ? "Actualizar" : "Crear"} Producto
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
