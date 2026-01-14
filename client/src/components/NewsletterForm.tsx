import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, CheckCircle, Mail } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "compact" | "dark";
  className?: string;
}

export function NewsletterForm({ variant = "default", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribeMutation = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      setIsSubscribed(true);
      setEmail("");
      setName("");
      toast.success("¡Te has suscrito exitosamente!");
    },
    onError: (error) => {
      if (error.message.includes("already subscribed") || error.message.includes("ya está suscrito")) {
        toast.info("Este correo ya está suscrito a nuestro newsletter");
      } else {
        toast.error(error.message || "Error al suscribirse. Intenta de nuevo.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Por favor ingresa tu correo electrónico");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }

    subscribeMutation.mutate({ 
      email: email.trim(),
      name: name.trim() || undefined 
    });
  };

  if (isSubscribed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-1 ${variant === "dark" ? "text-white" : "text-gray-900"}`}>
              ¡Gracias por suscribirte!
            </h3>
            <p className={`${variant === "dark" ? "text-white/80" : "text-gray-600"}`}>
              Pronto recibirás nuestras novedades en tu correo
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubscribed(false)}
            className={variant === "dark" ? "border-white/30 text-white hover:bg-white/10" : ""}
          >
            Suscribir otro correo
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="flex-1"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
        </Button>
      </form>
    );
  }

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className={`${className}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="flex-1 bg-white text-foreground"
            disabled={subscribeMutation.isPending}
          />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="sm:w-auto"
            disabled={subscribeMutation.isPending}
          >
            {subscribeMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Suscribiendo...
              </>
            ) : (
              "Suscribirme"
            )}
          </Button>
        </div>
      </form>
    );
  }

  // Default variant
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre (opcional)"
          className="sm:w-40"
          disabled={subscribeMutation.isPending}
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="flex-1"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-[#44580E] hover:bg-[#3a4c0c]"
        >
          {subscribeMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Suscribiendo...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Suscribirme
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Al suscribirte aceptas recibir correos de Cancagua. Puedes darte de baja en cualquier momento.
      </p>
    </form>
  );
}
