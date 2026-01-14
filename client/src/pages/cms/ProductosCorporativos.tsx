import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Pencil, Trash2, DollarSign, Upload, Copy, X } from "lucide-react";
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
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const { data: products, isLoading, refetch } = trpc.corporateProducts.getAll.useQuery();
  const createMutation = trpc.corporateProducts.create.useMutation();
  const updateMutation = trpc.corporateProducts.update.useMutation();
  const deleteMutation = trpc.corporateProducts.delete.useMutation();
  const bulkDeleteMutation = trpc.corporateProducts.bulkDelete.useMutation();
  const bulkDuplicateMutation = trpc.corporateProducts.bulkDuplicate.useMutation();
  const importMutation = trpc.corporateProducts.importFromCSV.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          ...formData,
        });
        toast.success("Producto actualizado exitosamente");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Producto creado exitosamente");
      }
      
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      toast.error("Error al guardar el producto");
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category,
      priceType: product.priceType,
      unitPrice: product.unitPrice,
      duration: product.duration || undefined,
      maxCapacity: product.maxCapacity || undefined,
      includes: product.includes || "",
      active: product.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Producto eliminado exitosamente");
      refetch();
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Selecciona al menos un producto");
      return;
    }
    
    if (!confirm(`¿Estás seguro de que deseas eliminar ${selectedProducts.length} producto(s)?`)) return;
    
    try {
      const result = await bulkDeleteMutation.mutateAsync({ ids: selectedProducts });
      toast.success(`${result.deleted} producto(s) eliminado(s) exitosamente`);
      setSelectedProducts([]);
      refetch();
    } catch (error) {
      toast.error("Error al eliminar productos");
    }
  };

  const handleBulkDuplicate = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Selecciona al menos un producto");
      return;
    }
    
    try {
      const result = await bulkDuplicateMutation.mutateAsync({ ids: selectedProducts });
      toast.success(`${result.duplicated} producto(s) duplicado(s) exitosamente`);
      setSelectedProducts([]);
      refetch();
    } catch (error) {
      toast.error("Error al duplicar productos");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter(line => line.trim());
    if (lines.length < 2) {
      toast.error("El archivo CSV debe tener al menos una fila de encabezados y una fila de datos");
      return;
    }

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    const data = lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index] || "";
        
        if (header === "name" || header === "nombre") row.name = value;
        else if (header === "description" || header === "descripcion" || header === "descripción") row.description = value;
        else if (header === "category" || header === "categoria" || header === "categoría") row.category = value;
        else if (header === "pricetype" || header === "tipo_precio") row.priceType = value === "flat" ? "flat" : "per_person";
        else if (header === "unitprice" || header === "precio_unitario" || header === "precio") row.unitPrice = parseFloat(value) || 0;
        else if (header === "duration" || header === "duracion" || header === "duración") row.duration = value ? parseInt(value) : undefined;
        else if (header === "maxcapacity" || header === "capacidad_maxima" || header === "capacidad") row.maxCapacity = value ? parseInt(value) : undefined;
        else if (header === "includes" || header === "incluye") row.includes = value;
        else if (header === "active" || header === "activo") row.active = value === "1" || value.toLowerCase() === "true" || value.toLowerCase() === "si" ? 1 : 0;
      });
      
      return row;
    }).filter(row => row.name && row.category && row.unitPrice);

    if (data.length === 0) {
      toast.error("No se encontraron productos válidos en el archivo CSV");
      return;
    }

    setCsvData(data);
    setIsImportDialogOpen(true);
  };

  const handleImport = async () => {
    try {
      const result = await importMutation.mutateAsync({ products: csvData });
      toast.success(`${result.imported} producto(s) importado(s) exitosamente`);
      setIsImportDialogOpen(false);
      setCsvData([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      refetch();
    } catch (error) {
      toast.error("Error al importar productos");
    }
  };

  const resetForm = () => {
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
    setEditingProduct(null);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products?.map(p => p.id) || []);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">Cargando...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Catálogo de Productos Corporativos</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona los productos y servicios para eventos corporativos
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar CSV
            </Button>
            <Button onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <Card className="bg-muted/50 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {selectedProducts.length} producto(s) seleccionado(s)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProducts([])}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDuplicate}
                    disabled={bulkDuplicateMutation.isPending}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    disabled={bulkDeleteMutation.isPending}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === products?.length && products?.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Tipo de Precio</TableHead>
                  <TableHead>Precio Unitario</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleSelect(product.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.priceType === "per_person" ? "Por Persona" : "Tarifa Fija"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {product.unitPrice.toLocaleString("es-CL")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.active ? "default" : "secondary"}>
                          {product.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No hay productos registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog para crear/editar producto */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </DialogTitle>
              <DialogDescription>
                Completa la información del producto corporativo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
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
                      setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })
                    }
                    required
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
                  <Label htmlFor="includes">Incluye</Label>
                  <Textarea
                    id="includes"
                    value={formData.includes}
                    onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                    rows={2}
                    placeholder="Ej: Toallas, bata, gorro de baño"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingProduct ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog para preview de importación */}
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Vista Previa de Importación</DialogTitle>
              <DialogDescription>
                Se importarán {csvData.length} producto(s). Revisa los datos antes de confirmar.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.unitPrice.toLocaleString("es-CL")}</TableCell>
                      <TableCell>
                        {product.priceType === "per_person" ? "Por Persona" : "Tarifa Fija"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsImportDialogOpen(false);
                  setCsvData([]);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleImport} disabled={importMutation.isPending}>
                Importar {csvData.length} Producto(s)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
