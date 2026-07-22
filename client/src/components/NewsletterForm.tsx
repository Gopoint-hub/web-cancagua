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
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white/20 rounded-full">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className={`text-xl font-light tracking-wide mb-2 ${variant === "dark" ? "text-[#222221]" : "text-[#222221]"}`}>
              ¡Gracias por suscribirte!
            </h3>
            <p className={`${variant === "dark" ? "text-[#222221]/70" : "text-[#827D78]"}`}>
              Pronto recibirás nuestras novedades en tu correo
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubscribed(false)}
            className={variant === "dark" ? "border-[#222221]/30 text-[#222221] hover:bg-[#222221]/10" : "border-[#4B5872] text-[#222221]"}
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
          className="flex-1 border-[#4B5872]/30 focus:border-[#4B5872]"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51]"
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
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="flex-1 bg-white text-[#222221] border-0 h-12"
            disabled={subscribeMutation.isPending}
          />
          <Button
            type="submit"
            size="lg"
            className="sm:w-auto bg-[#222221] text-white hover:bg-[#222221] h-12 px-8 tracking-wider uppercase text-sm"
            disabled={subscribeMutation.isPending}
          >
            {subscribeMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
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
          className="sm:w-40 border-[#4B5872]/30 focus:border-[#4B5872]"
          disabled={subscribeMutation.isPending}
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="flex-1 border-[#4B5872]/30 focus:border-[#4B5872]"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] tracking-wider"
        >
          {subscribeMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Suscribirme
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-[#827D78] text-center">
        Al suscribirte aceptas recibir correos de Cancagua. Puedes darte de baja en cualquier momento.
      </p>
    </form>
  );
}
