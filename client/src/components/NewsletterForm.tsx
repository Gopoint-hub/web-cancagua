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
            <h3 className={`text-xl font-light tracking-wide mb-2 ${variant === "dark" ? "text-[#3a3a3a]" : "text-[#3a3a3a]"}`}>
              ¡Gracias por suscribirte!
            </h3>
            <p className={`${variant === "dark" ? "text-[#3a3a3a]/70" : "text-[#8C8C8C]"}`}>
              Pronto recibirás nuestras novedades en tu correo
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubscribed(false)}
            className={variant === "dark" ? "border-[#3a3a3a]/30 text-[#3a3a3a] hover:bg-[#3a3a3a]/10" : "border-[#D3BC8D] text-[#3a3a3a]"}
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
          className="flex-1 border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976]"
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
            className="flex-1 bg-white text-[#3a3a3a] border-0 h-12"
            disabled={subscribeMutation.isPending}
          />
          <Button
            type="submit"
            size="lg"
            className="sm:w-auto bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] h-12 px-8 tracking-wider uppercase text-sm"
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
          className="sm:w-40 border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
          disabled={subscribeMutation.isPending}
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="flex-1 border-[#D3BC8D]/30 focus:border-[#D3BC8D]"
          disabled={subscribeMutation.isPending}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider"
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
      <p className="text-sm text-[#8C8C8C] text-center">
        Al suscribirte aceptas recibir correos de Cancagua. Puedes darte de baja en cualquier momento.
      </p>
    </form>
  );
}
