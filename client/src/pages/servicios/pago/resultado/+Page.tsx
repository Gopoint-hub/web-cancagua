import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, Clock3, Home, RotateCcw, ShieldAlert, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useServiceCart } from "@/components/ServiceCart";

const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function ServicePaymentResult() {
  const [orderToken, setOrderToken] = useState<string | null>(null);
  const { clear } = useServiceCart();
  useEffect(() => setOrderToken(new URLSearchParams(window.location.search).get("order") || ""), []);
  const payment = trpc.serviceCart.public.paymentStatus.useQuery({ orderToken: orderToken || "" }, {
    enabled: Boolean(orderToken && orderToken.length >= 20),
    refetchInterval: (query: any) => ["initiating", "payment_pending"].includes(query.state.data?.status) ? 2_500 : false,
    retry: 2,
  });
  const result = payment.data as { status: string; totalClp: number; clientEmail: string; items: Array<{ id: number; module: string; itemName: string; bookingDate: string; startTime: string; endTime: string; guests: number; bookingCode: string | null }> } | undefined;
  useEffect(() => { if (result?.status === "paid") clear(); }, [clear, result?.status]);

  if (orderToken === null || payment.isLoading) return <ResultShell icon={<Clock3 className="h-14 w-14 text-[#4B5872]" />} title="Confirmando tu pago" description="Estamos verificando la respuesta de Transbank y confirmando todos tus cupos." />;
  if (orderToken.length < 20) return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="No pudimos identificar la compra" description="Vuelve a los servicios para iniciar una nueva reserva." />;
  if (payment.isError || !result) return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="No pudimos consultar la compra" description="Contáctanos si realizaste el pago y aún no recibes la confirmación." />;
  if (result.status === "paid") return <ResultShell icon={<CheckCircle2 className="h-14 w-14 text-green-700" />} title="¡Tus reservas están confirmadas!" description={`Enviamos los comprobantes y detalles de cada servicio a ${result.clientEmail}.`}>
    <div className="mt-7 space-y-3 text-left">{result.items.map(item => <article key={item.id} className="rounded-2xl bg-[#F4F2ED] p-5"><p className="font-cg-mono text-[10px] uppercase tracking-[0.16em] text-[#4B5872]">{item.module === "biopools" ? "Biopiscinas" : "Sauna"}</p><div className="mt-2 flex flex-col justify-between gap-2 sm:flex-row"><div><h2 className="font-cg-serif text-2xl">{item.itemName}</h2><p className="mt-1 font-cg-soft text-sm text-[#635E5A]">{String(item.bookingDate).slice(0, 10)} · {item.startTime}–{item.endTime} · {item.guests} persona{item.guests === 1 ? "" : "s"}</p></div><div className="sm:text-right"><p className="font-cg-soft text-xs uppercase text-[#827D78]">Código</p><strong className="font-cg-mono text-sm">{item.bookingCode || "Confirmada"}</strong></div></div></article>)}</div>
    <div className="mt-4 flex justify-between border-t border-[#D7D4D1] pt-4"><span className="font-cg-soft text-[#635E5A]">Total pagado</span><strong className="font-cg-serif text-3xl font-light">{formatPrice(result.totalClp)}</strong></div>
  </ResultShell>;
  if (["initiating", "payment_pending"].includes(result.status)) return <ResultShell icon={<Clock3 className="h-14 w-14 text-amber-700" />} title="Pago en verificación" description="Transbank todavía está procesando la respuesta. Esta página se actualizará automáticamente." />;
  if (result.status === "manual_review") return <ResultShell icon={<ShieldAlert className="h-14 w-14 text-amber-700" />} title="Estamos conciliando tu compra" description="El pago fue recibido, pero una de las reservas requiere revisión. No vuelvas a pagar: nuestro equipo confirmará el resultado contigo." />;
  if (result.status === "refunded") return <ResultShell icon={<RotateCcw className="h-14 w-14 text-[#4B5872]" />} title="El pago fue reembolsado" description="No fue posible confirmar todos los cupos del carrito y solicitamos automáticamente la devolución a Transbank." />;
  return <ResultShell icon={<XCircle className="h-14 w-14 text-red-700" />} title="El pago no fue completado" description="No se confirmó ningún cargo. Tus selecciones siguen en el carrito para que puedas revisar los horarios e intentarlo nuevamente." />;
}

function ResultShell({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children?: ReactNode }) {
  return <main className="flex min-h-[75vh] items-center justify-center bg-[#F4F2ED] px-4 py-16"><section className="w-full max-w-2xl rounded-3xl border border-[#D7D4D1] bg-white p-8 text-center shadow-xl md:p-12"><div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F4F2ED]">{icon}</div><p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#4B5872]">Servicios Cancagua</p><h1 className="mt-3 font-cg-serif text-4xl text-[#222221]">{title}</h1><p className="mx-auto mt-4 max-w-xl font-cg-soft text-[#635E5A]">{description}</p>{children}<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="/servicios/biopiscinas"><Button className="w-full rounded-full bg-[#4B5872] sm:w-auto"><RotateCcw className="mr-2 h-4 w-4" />Ver servicios</Button></a><a href="/"><Button variant="outline" className="w-full rounded-full sm:w-auto"><Home className="mr-2 h-4 w-4" />Ir al inicio</Button></a></div></section></main>;
}
