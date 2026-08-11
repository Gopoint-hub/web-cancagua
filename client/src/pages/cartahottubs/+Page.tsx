import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, ChevronRight, Clock3, Leaf, Loader2, Minus, Plus, ShoppingBag, Wheat, Flame } from "lucide-react";

type PriceKey = "default" | "for_2" | "for_4" | "for_6";
type CartLine = {
  key: string;
  menuItemId: number;
  name: string;
  priceKey: PriceKey;
  priceLabel: string;
  unitPrice: number;
  quantity: number;
};

const HOT_TUBS = [
  { code: "1006", name: "Fío Fío" },
  { code: "1005", name: "Chucao" },
  { code: "1004", name: "Chirihue" },
  { code: "1003", name: "Pitío" },
  { code: "1002", name: "Loica" },
  { code: "1001", name: "Colibrí" },
] as const;

const PRICE_LABELS: Record<PriceKey, string> = {
  default: "",
  for_2: "Para 2",
  for_4: "Para 4",
  for_6: "Para 6",
};

const money = (amount: number) => new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
}).format(amount);

function getPriceOptions(prices: Record<string, number>): Array<{ key: PriceKey; label: string; price: number }> {
  return (["default", "for_2", "for_4", "for_6"] as PriceKey[])
    .filter(key => Number.isInteger(prices?.[key]))
    .map(key => ({ key, label: PRICE_LABELS[key], price: prices[key] }));
}

export default function CartaHotTubs() {
  // El frontend consume el router publicado por el CMS (tipado dinámicamente
  // en este repositorio hasta que el tipo AppRouter se extraiga a un paquete).
  const menuApi = (trpc as any).menu;
  const { data: menuData, isLoading, isError, refetch } = menuApi.getFullMenu.useQuery();
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [priceSelections, setPriceSelections] = useState<Record<number, PriceKey>>({});
  const [reviewOpen, setReviewOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ orderNumber: string; subtotal: number } | null>(null);

  const orderMutation = menuApi.submitHotTubOrder.useMutation({
    onSuccess: (data: { orderNumber: string; subtotal: number; whatsappUrl: string }) => {
      setReviewOpen(false);
      setCompletedOrder({ orderNumber: data.orderNumber, subtotal: data.subtotal });
      setCart({});
      window.location.href = data.whatsappUrl;
    },
    onError: (error: { message?: string }) => toast.error(error.message || "No pudimos registrar tu pedido. Inténtalo nuevamente."),
  });

  const lines = Object.values(cart);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const changeQuantity = (line: Omit<CartLine, "quantity">, change: number) => {
    setCart(current => {
      const quantity = (current[line.key]?.quantity || 0) + change;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[line.key];
        return next;
      }
      return { ...current, [line.key]: { ...line, quantity: Math.min(quantity, 20) } };
    });
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lines.length) return toast.error("Agrega al menos un producto.");
    const form = new FormData(event.currentTarget);
    orderMutation.mutate({
      customerName: String(form.get("customerName")),
      customerPhone: String(form.get("customerPhone")),
      hotTubCode: String(form.get("hotTubCode")) as typeof HOT_TUBS[number]["code"],
      serviceDate: String(form.get("serviceDate") || "") || undefined,
      desiredTime: String(form.get("desiredTime") || "") || undefined,
      notes: String(form.get("notes") || "") || undefined,
      source: typeof window !== "undefined" && new URLSearchParams(window.location.search).get("origen") === "checkout" ? "checkout" : "menu",
      items: lines.map(line => ({ menuItemId: line.menuItemId, priceKey: line.priceKey, quantity: line.quantity })),
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F2ED] pb-28 text-[#292d24]">
      <section className="bg-[#4A4F35] px-5 py-10 text-white sm:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/80">Cancagua</p>
          <h1 className="font-cg-serif text-3xl font-light md:text-5xl">Menú exclusivo Hot Tubs</h1>
          <div className="mx-auto my-5 h-px w-16 bg-white/50" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Elige con anticipación y tendremos tu pedido coordinado para que aproveches cada minuto de descanso.
          </p>
          <div className="mx-auto mt-7 flex max-w-xl items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-left text-sm backdrop-blur-sm">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#ead6a8]" />
            <p><strong>Esto es una preorden.</strong> No pagarás en esta página; todo tu consumo se paga en recepción al finalizar.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#ddd1bc] bg-[#f1e7d9] px-5 py-4">
        <p className="mx-auto max-w-4xl text-center text-sm text-[#5b554b]">
          Te recordamos que no está permitido ingresar alimentos ni bebestibles del exterior.
        </p>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        {isLoading && <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-[#44580e]" /></div>}
        {isError && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="mb-4">No pudimos cargar la carta.</p>
            <Button onClick={() => refetch()}>Volver a intentar</Button>
          </div>
        )}
        {!isLoading && !isError && menuData?.length === 0 && <p className="py-20 text-center text-[#6d685f]">La carta estará disponible próximamente.</p>}

        {menuData?.map((category: any) => (
          <section key={category.id} className="mb-14">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9d7f45]">Carta Cancagua</p>
              <h2 className="mt-1 font-serif text-3xl text-[#34450d] sm:text-4xl">{category.name}</h2>
              {category.description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6d685f]">{category.description}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {category.items.map((item: any) => {
                const options = getPriceOptions(item.prices || {});
                const selectedKey = priceSelections[item.id] || options[0]?.key || "default";
                const selected = options.find(option => option.key === selectedKey) || options[0];
                const lineKey = `${item.id}:${selected?.key}`;
                const quantity = cart[lineKey]?.quantity || 0;
                const available = item.inStock === 1 && Boolean(selected);
                return (
                  <article key={item.id} className={`overflow-hidden rounded-2xl border bg-white shadow-[0_8px_30px_rgba(71,61,43,0.06)] ${available ? "border-[#e5dccd]" : "border-[#d6d1c9] opacity-70"}`}>
                    {item.imageUrl && <img src={item.imageUrl} alt={item.name} className={`h-44 w-full object-cover ${available ? "" : "grayscale"}`} />}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className={`font-serif text-2xl leading-tight ${available ? "text-[#313828]" : "text-[#77736d] line-through"}`}>{item.name}</h3>
                          {!available && <Badge variant="secondary" className="mt-2 bg-[#ece8e1] text-[#625e58]">Sin stock</Badge>}
                        </div>
                        {selected && <span className="shrink-0 text-lg font-semibold text-[#44580e]">{money(selected.price)}</span>}
                      </div>
                      {item.description && <p className="mt-3 text-sm leading-relaxed text-[#69665f]">{item.description}</p>}
                      {item.dietaryTags?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.dietaryTags.map((tag: string) => <Badge key={tag} variant="outline" className="border-[#d6dfbe] bg-[#f5f8ee] text-[#526529]">{tag === "vegan" ? <><Leaf /> Vegano</> : tag === "gluten_free" ? <><Wheat /> Sin gluten</> : <><Flame /> Keto</>}</Badge>)}
                        </div>
                      )}
                      {item.specialNotes && <p className="mt-3 rounded-lg bg-[#fff7e3] px-3 py-2 text-xs text-[#80682e]">{item.specialNotes}</p>}

                      {options.length > 1 && (
                        <div className="mt-4">
                          <Label htmlFor={`price-${item.id}`} className="text-xs text-[#6d685f]">Tamaño</Label>
                          <select id={`price-${item.id}`} value={selectedKey} onChange={event => setPriceSelections(current => ({ ...current, [item.id]: event.target.value as PriceKey }))} disabled={!available} className="mt-1 h-10 w-full rounded-lg border border-[#d8cfbf] bg-white px-3 text-sm">
                            {options.map(option => <option key={option.key} value={option.key}>{option.label} · {money(option.price)}</option>)}
                          </select>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wide text-[#8a857c]">Cantidad</span>
                        <div className="flex items-center gap-3">
                          <Button type="button" size="icon" variant="outline" aria-label={`Quitar ${item.name}`} disabled={!quantity} onClick={() => selected && changeQuantity({ key: lineKey, menuItemId: item.id, name: item.name, priceKey: selected.key, priceLabel: selected.label, unitPrice: selected.price }, -1)}><Minus /></Button>
                          <span className="w-6 text-center font-semibold" aria-live="polite">{quantity}</span>
                          <Button type="button" size="icon" aria-label={`Agregar ${item.name}`} disabled={!available || quantity >= 20} className="bg-[#44580e] text-white hover:bg-[#34450d]" onClick={() => selected && changeQuantity({ key: lineKey, menuItemId: item.id, name: item.name, priceKey: selected.key, priceLabel: selected.label, unitPrice: selected.price }, 1)}><Plus /></Button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ddd1bc] bg-[#fffdf9]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(40,35,25,0.12)] backdrop-blur md:bottom-4 md:left-1/2 md:right-auto md:w-[min(720px,calc(100%-2rem))] md:-translate-x-1/2 md:rounded-2xl md:border">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <div><p className="text-xs text-[#777168]">{itemCount} producto{itemCount === 1 ? "" : "s"}</p><p className="text-lg font-semibold">{money(subtotal)}</p></div>
            <Button size="lg" onClick={() => setReviewOpen(true)} className="bg-[#44580e] px-5 text-white hover:bg-[#34450d]"><ShoppingBag /> Revisar pedido <ChevronRight /></Button>
          </div>
        </div>
      )}

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto p-0">
          <div className="bg-[#34450d] px-6 py-5 text-white">
            <DialogHeader><DialogTitle className="font-serif text-2xl">Revisa tu preorden</DialogTitle><DialogDescription className="text-white/75">La registraremos y luego abrirás WhatsApp para enviarla a recepción.</DialogDescription></DialogHeader>
          </div>
          <form onSubmit={submitOrder} className="space-y-5 px-6 pb-6 pt-5">
            <div className="space-y-2 rounded-xl bg-[#f8f4ec] p-4">
              {lines.map(line => <div key={line.key} className="flex justify-between gap-3 text-sm"><span><strong>{line.quantity}×</strong> {line.name}{line.priceLabel ? ` · ${line.priceLabel}` : ""}</span><span>{money(line.unitPrice * line.quantity)}</span></div>)}
              <div className="mt-3 flex justify-between border-t border-[#ddd1bc] pt-3 font-semibold"><span>Total</span><span>{money(subtotal)}</span></div>
              <p className="text-xs text-[#756e63]">Este monto se paga en recepción al finalizar tu experiencia.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label htmlFor="customerName">Nombre de quien reservó *</Label><Input id="customerName" name="customerName" autoComplete="name" required minLength={2} className="mt-1" /></div>
              <div><Label htmlFor="customerPhone">WhatsApp *</Label><Input id="customerPhone" name="customerPhone" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" required minLength={8} className="mt-1" /></div>
              <div><Label htmlFor="hotTubCode">Tu Hot Tub *</Label><select id="hotTubCode" name="hotTubCode" required defaultValue="" className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option value="" disabled>Selecciona</option>{HOT_TUBS.map(tub => <option key={tub.code} value={tub.code}>{tub.code} — {tub.name}</option>)}</select></div>
              <div><Label htmlFor="serviceDate">Fecha de visita</Label><Input id="serviceDate" name="serviceDate" type="date" min={minDate} className="mt-1" /></div>
              <div><Label htmlFor="desiredTime">Hora deseada</Label><Input id="desiredTime" name="desiredTime" type="time" className="mt-1" /></div>
              <div className="sm:col-span-2"><Label htmlFor="notes">Notas para tu pedido</Label><Textarea id="notes" name="notes" maxLength={500} rows={3} placeholder="Alergias u otra información importante" className="mt-1" /></div>
            </div>

            <div className="rounded-xl border border-[#ded3bf] bg-[#fffaf0] p-4 text-sm text-[#655a45]">
              <p className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#58701c]" /> Al continuar se registra la hora exacta de solicitud.</p>
              <p className="mt-2 flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#58701c]" /> Después debes presionar “Enviar” dentro de WhatsApp para avisar a recepción.</p>
            </div>
            <Button type="submit" size="lg" disabled={orderMutation.isPending} className="w-full bg-[#44580e] text-white hover:bg-[#34450d]">{orderMutation.isPending ? <><Loader2 className="animate-spin" /> Registrando…</> : <>Ingresar pedido y abrir WhatsApp <ChevronRight /></>}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(completedOrder)} onOpenChange={open => !open && setCompletedOrder(null)}>
        <DialogContent><DialogHeader><DialogTitle>Pedido registrado</DialogTitle><DialogDescription>Tu número es {completedOrder?.orderNumber}. Si WhatsApp no se abrió, vuelve atrás e inténtalo nuevamente.</DialogDescription></DialogHeader></DialogContent>
      </Dialog>
    </div>
  );
}
