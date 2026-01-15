import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, BookOpen } from "lucide-react";

interface ClassOption {
  name: string;
  subtitle: string;
}

interface ReservaClasesFormProps {
  classes: ClassOption[];
}

export function ReservaClasesForm({ classes }: ReservaClasesFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    clase: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar a WhatsApp
      const selectedClass = classes.find(
        (c) => `${c.name} ${c.subtitle}` === formData.clase
      );
      const message = `Hola, me gustaría reservar una clase:\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nClase: ${formData.clase}`;
      const whatsappUrl = `https://wa.me/56940073999?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      setSubmitStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", clase: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#3a3a3a] to-[#4a4a4a] text-white">
        <CardTitle className="font-['Josefin_Sans'] text-2xl tracking-wide flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          Reserva tu Clase
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block font-['Fira_Sans'] text-sm font-medium text-[#3a3a3a] mb-2">
              <User className="inline h-4 w-4 mr-2" />
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#D3BC8D] rounded-lg font-['Fira_Sans'] focus:outline-none focus:ring-2 focus:ring-[#D3BC8D]"
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-['Fira_Sans'] text-sm font-medium text-[#3a3a3a] mb-2">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#D3BC8D] rounded-lg font-['Fira_Sans'] focus:outline-none focus:ring-2 focus:ring-[#D3BC8D]"
              placeholder="tu@email.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-['Fira_Sans'] text-sm font-medium text-[#3a3a3a] mb-2">
              <Phone className="inline h-4 w-4 mr-2" />
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#D3BC8D] rounded-lg font-['Fira_Sans'] focus:outline-none focus:ring-2 focus:ring-[#D3BC8D]"
              placeholder="+56 9 XXXX XXXX"
            />
          </div>

          {/* Clase */}
          <div>
            <label className="block font-['Fira_Sans'] text-sm font-medium text-[#3a3a3a] mb-2">
              <BookOpen className="inline h-4 w-4 mr-2" />
              Selecciona una clase
            </label>
            <select
              name="clase"
              value={formData.clase}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#D3BC8D] rounded-lg font-['Fira_Sans'] focus:outline-none focus:ring-2 focus:ring-[#D3BC8D]"
            >
              <option value="">-- Elige una clase --</option>
              {classes.map((classItem) => (
                <option key={`${classItem.name}-${classItem.subtitle}`} value={`${classItem.name} ${classItem.subtitle}`}>
                  {classItem.name} - {classItem.subtitle}
                </option>
              ))}
            </select>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-['Fira_Sans'] text-green-700 text-sm">
                ✓ Redirigiendo a WhatsApp... Se abrirá una ventana con tu reserva.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-['Fira_Sans'] text-red-700 text-sm">
                ✗ Hubo un error. Por favor intenta de nuevo.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider py-3 text-lg"
          >
            {isSubmitting ? "Procesando..." : "RESERVAR AHORA"}
          </Button>

          <p className="text-center font-['Fira_Sans'] text-xs text-[#999]">
            Se abrirá WhatsApp para confirmar tu reserva
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
