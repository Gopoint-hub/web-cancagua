import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Calendar, Loader2, Users } from "lucide-react";

interface BookingFormProps {
  serviceType: string;
  triggerButton?: React.ReactNode;
}

export function BookingForm({ serviceType, triggerButton }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    numberOfPeople: 1,
    message: "",
  });

  const createBookingMutation = trpc.bookings.create.useMutation({
    onSuccess: () => {
      toast.success("¡Reserva enviada exitosamente! Te contactaremos pronto para confirmar.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        numberOfPeople: 1,
        message: "",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar reserva. Inténtalo nuevamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    createBookingMutation.mutate({
      ...formData,
      serviceType,
    });
  };

  // Fecha mínima: mañana
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button size="lg" className="w-full">
            Reservar Ahora
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Solicitud de Reserva</DialogTitle>
          <DialogDescription>
            {serviceType} - Completa el formulario y te contactaremos para confirmar tu reserva
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+56 9 1234 5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="numberOfPeople">Número de Personas *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="numberOfPeople"
                  type="number"
                  min="1"
                  max="20"
                  className="pl-10"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="preferredDate">Fecha y Hora Preferida *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="preferredDate"
                type="datetime-local"
                min={minDate}
                className="pl-10"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Te recomendamos reservar con al menos 48 horas de anticipación
            </p>
          </div>

          <div>
            <Label htmlFor="message">Mensaje Adicional (opcional)</Label>
            <Textarea
              id="message"
              placeholder="Comentarios, solicitudes especiales, etc."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={createBookingMutation.isPending} className="flex-1">
              {createBookingMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
