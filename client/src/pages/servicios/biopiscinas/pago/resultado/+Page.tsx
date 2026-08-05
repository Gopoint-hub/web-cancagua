import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, Clock3, Home, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);

export default function BiopoolPaymentResult() {
  const [orderToken, setOrderToken] = useState<string | null>(null);
  useEffect(() => {
    setOrderToken(new URLSearchParams(window.location.search).get("order") || "");
  }, []);

  const payment = trpc.biopools.public.paymentStatus.useQuery(
    { orderToken: orderToken || "" },
    {
      enabled: Boolean(orderToken && orderToken.length >= 20),
      refetchInterval: (query: any) => {
        const status = query.state.data?.status;
        return status === "initiating" || status === "payment_pending" ? 2_500 : false;
      },
      retry: 2,
    },
  );

  if (orderToken === null || payment.isLoading) {
    return <ResultShell icon={<Clock3 className="h-14 w-14 text-[#4B5872]" />} title="Confirmando tu pago" description="Estamos verificando la respuesta de Transbank. No cierres esta página." />;
  }

  if (orderToken.length < 20) {
    return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="No pudimos identificar la compra" description="Vuelve a Biopiscinas para iniciar una nueva reserva o contáctanos si necesitas ayuda." />;
  }

  if (payment.isError) {
    return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="No pudimos consultar la compra" description="Vuelve a Biopiscinas o contáctanos si realizaste el pago y aún no recibes la confirmación." />;
  }

  const result = payment.data as {
    status: string;
    bookingCode: string | null;
    date: string;
    startTime: string;
    totalClp: number;
    clientEmail: string;
  };

  if (result.status === "paid") {
    return (
      <ResultShell
        icon={<CheckCircle2 className="h-14 w-14 text-green-700" />}
        title="¡Reserva confirmada!"
        description={`Enviamos el comprobante y los detalles de tu visita a ${result.clientEmail}.`}
      >
        <div className="mt-7 grid gap-3 rounded-2xl bg-[#F4F2ED] p-5 text-left font-cg-sans sm:grid-cols-2">
          <div><p className="text-xs uppercase tracking-wider text-[#827D78]">Código de reserva</p><p className="mt-1 font-semibold">{result.bookingCode || "Confirmada"}</p></div>
          <div><p className="text-xs uppercase tracking-wider text-[#827D78]">Fecha y hora</p><p className="mt-1 font-semibold">{result.date} · {result.startTime}</p></div>
          <div className="sm:col-span-2"><p className="text-xs uppercase tracking-wider text-[#827D78]">Total pagado</p><p className="mt-1 font-cg-serif text-2xl">{formatPrice(result.totalClp)}</p></div>
        </div>
      </ResultShell>
    );
  }

  if (result.status === "initiating" || result.status === "payment_pending") {
    return <ResultShell icon={<Clock3 className="h-14 w-14 text-amber-700" />} title="Pago en verificación" description="Transbank todavía está procesando la respuesta. Esta página se actualizará automáticamente." />;
  }

  return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="El pago no fue completado" description="No se realizó ningún cargo confirmado. Puedes volver a elegir fecha y horario e intentarlo nuevamente." />;
}

function ResultShell({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children?: ReactNode }) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F4F2ED] px-4 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-[#D7D4D1] bg-white p-8 text-center shadow-xl md:p-12">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F4F2ED]">{icon}</div>
        <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#4B5872]">Biopiscinas Cancagua</p>
        <h1 className="mt-3 font-cg-serif text-4xl text-[#222221]">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl font-cg-sans text-[#635E5A]">{description}</p>
        {children}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/servicios/biopiscinas#reservar"><Button className="w-full rounded-full bg-[#4B5872] sm:w-auto"><RotateCcw className="mr-2 h-4 w-4" />Volver a Biopiscinas</Button></a>
          <a href="/"><Button variant="outline" className="w-full rounded-full sm:w-auto"><Home className="mr-2 h-4 w-4" />Ir al inicio</Button></a>
        </div>
      </section>
    </main>
  );
}
