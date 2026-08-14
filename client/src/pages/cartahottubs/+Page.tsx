import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Check, ChevronLeft, Loader2, Minus, Plus } from "lucide-react";
import "./hotTubMenu.css";

type IdentificationMode = "hot_tub" | "key_fob";

type CatalogItem = {
  key: string;
  menuItemId: number;
  name: string;
  subtitle?: string;
  description?: string;
  priceClp: number;
  preparationArea: "cafe" | "reception";
  inStock: boolean;
};

type CatalogSection = {
  key: string;
  title: string;
  note?: string;
  preparationArea: "cafe" | "reception";
  items: CatalogItem[];
};

type CartLine = CatalogItem & { quantity: number };

const HOT_TUBS = [
  { code: "1001", name: "Colibrí" },
  { code: "1002", name: "Loica" },
  { code: "1003", name: "Pitío" },
  { code: "1004", name: "Chirihue" },
  { code: "1005", name: "Chucao" },
  { code: "1006", name: "Fío Fío" },
] as const;

const money = (amount: number) =>
  "$" +
  new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(amount);

export default function CartaHotTubs() {
  const menuApi = (trpc as any).menu;
  const catalog = menuApi.getHotTubCatalog.useQuery();
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [mode, setMode] = useState<IdentificationMode>("hot_tub");
  const [hotTubCode, setHotTubCode] = useState("");
  const [keyFobNumber, setKeyFobNumber] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);
  const [completedWhatsAppUrl, setCompletedWhatsAppUrl] = useState<
    string | null
  >(null);

  useEffect(() => {
    document.documentElement.classList.add("hot-tub-order-page");
    return () =>
      document.documentElement.classList.remove("hot-tub-order-page");
  }, []);

  const sections = (catalog.data ?? []) as CatalogSection[];
  const lines = Object.values(cart);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.priceClp * line.quantity,
    0
  );
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const identificationReady =
    mode === "hot_tub" ? Boolean(hotTubCode) : Boolean(keyFobNumber.trim());

  const orderMutation = menuApi.submitHotTubOrder.useMutation({
    onSuccess: (data: {
      orderNumber: string;
      subtotal: number;
      whatsappUrl: string;
    }) => {
      setReviewOpen(false);
      setCompletedOrder(data.orderNumber);
      setCompletedWhatsAppUrl(data.whatsappUrl);
      setCart({});
      window.location.assign(data.whatsappUrl);
    },
    onError: (error: { message?: string }) =>
      toast.error(
        error.message || "No pudimos registrar tu pedido. Inténtalo nuevamente."
      ),
  });

  const changeQuantity = (item: CatalogItem, change: number) => {
    setCart(current => {
      const quantity = (current[item.key]?.quantity || 0) + change;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[item.key];
        return next;
      }
      return {
        ...current,
        [item.key]: { ...item, quantity: Math.min(quantity, 20) },
      };
    });
  };

  const openReview = () => {
    if (!identificationReady) {
      document.getElementById("identificacion")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return toast.error(
        mode === "hot_tub"
          ? "Primero elige tu Hot Tub."
          : "Primero escribe el número de tu llavero."
      );
    }
    setReviewOpen(true);
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    orderMutation.mutate({
      customerName: String(form.get("customerName")),
      customerPhone: String(form.get("customerPhone")),
      identificationType: mode,
      hotTubCode: mode === "hot_tub" ? hotTubCode : undefined,
      keyFobNumber: mode === "key_fob" ? keyFobNumber.trim() : undefined,
      serviceDate: String(form.get("serviceDate") || "") || undefined,
      notes: String(form.get("notes") || "") || undefined,
      source:
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("origen") === "checkout"
          ? "checkout"
          : "menu",
      items: lines.map(line => ({
        catalogKey: line.key,
        quantity: line.quantity,
      })),
    });
  };

  return (
    <div className="hot-tub-menu-shell">
      <header className="hot-tub-menu-header">
        <img
          src="/brand/logos/cancagua-lockup-medium-black.png"
          alt="Cancagua · Restore Spa & Nature"
        />
        <p>Carta del Hot Tub</p>
      </header>

      <div className="hot-tub-menu-content">
        <section id="identificacion" className="hot-tub-identification">
          <h1>¿Cómo te identificamos?</h1>
          <p>
            Elige una opción para llevar tu pedido al lugar correcto y cargarlo
            a tu cuenta.
          </p>

          <div className="hot-tub-mode" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "hot_tub"}
              onClick={() => setMode("hot_tub")}
            >
              Por Hot Tub
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "key_fob"}
              onClick={() => setMode("key_fob")}
            >
              Por llavero
            </button>
          </div>

          {mode === "hot_tub" ? (
            <div>
              <span className="hot-tub-field-label">Tu Hot Tub</span>
              <div className="hot-tub-selector">
                {HOT_TUBS.map(tub => (
                  <button
                    key={tub.code}
                    type="button"
                    aria-pressed={hotTubCode === tub.code}
                    onClick={() => setHotTubCode(tub.code)}
                  >
                    <strong>{tub.code}</strong>
                    <span>{tub.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="keyFobNumber" className="hot-tub-field-label">
                Número de tu llavero
              </Label>
              <Input
                id="keyFobNumber"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                placeholder="Ej: 14"
                value={keyFobNumber}
                onChange={event =>
                  setKeyFobNumber(
                    event.target.value.replace(/\D/g, "").slice(0, 3)
                  )
                }
                className="hot-tub-key-input"
              />
            </div>
          )}
        </section>

        {catalog.isLoading && (
          <div className="hot-tub-loading">
            <Loader2 className="animate-spin" /> Cargando carta…
          </div>
        )}
        {catalog.isError && (
          <div className="hot-tub-error">
            <p>No pudimos cargar la carta.</p>
            <button type="button" onClick={() => catalog.refetch()}>
              Volver a intentar
            </button>
          </div>
        )}

        {sections.length > 0 && (
          <nav
            className="hot-tub-section-nav"
            aria-label="Secciones de la carta"
          >
            <div>
              {sections.map(section => (
                <button
                  key={section.key}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(`menu-${section.key}`)
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }
                >
                  {section.title}
                </button>
              ))}
            </div>
          </nav>
        )}

        {sections.length > 0 && (
          <p className="hot-tub-stock-note">Productos sujetos a stock</p>
        )}

        <main>
          {sections.map(section => (
            <section
              key={section.key}
              id={`menu-${section.key}`}
              className={`hot-tub-section hot-tub-section-${section.preparationArea}`}
            >
              <h2>{section.title}</h2>
              <p className="hot-tub-section-note">
                {section.note ? `${section.note} · ` : ""}
                {section.preparationArea === "cafe"
                  ? "Va a Café Cancagua"
                  : "Va a Recepción"}
              </p>

              <div>
                {section.items.map(item => {
                  const quantity = cart[item.key]?.quantity || 0;
                  return (
                    <article
                      key={item.key}
                      className={`hot-tub-menu-item ${item.inStock ? "" : "is-unavailable"}`}
                    >
                      <div className="hot-tub-item-copy">
                        <h3>
                          {item.name}
                          {item.subtitle && <span>{item.subtitle}</span>}
                        </h3>
                        {item.description && <p>{item.description}</p>}
                        <strong>{money(item.priceClp)}</strong>
                        {!item.inStock && (
                          <small>Momentáneamente agotado</small>
                        )}
                      </div>

                      {quantity > 0 ? (
                        <div className="hot-tub-quantity">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item, -1)}
                            aria-label={`Quitar ${item.name}`}
                          >
                            <Minus />
                          </button>
                          <b aria-live="polite">{quantity}</b>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item, 1)}
                            disabled={quantity >= 20}
                            aria-label={`Agregar otro ${item.name}`}
                          >
                            <Plus />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="hot-tub-add"
                          disabled={!item.inStock}
                          onClick={() => changeQuantity(item, 1)}
                          aria-label={`Agregar ${item.name}`}
                        >
                          <Plus />
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      </div>

      <div className="hot-tub-order-bar">
        <div>
          <span>
            {itemCount === 0
              ? "Tu pedido está vacío"
              : `${itemCount} producto${itemCount === 1 ? "" : "s"}`}
          </span>
          <strong>{money(subtotal)}</strong>
        </div>
        <button
          type="button"
          disabled={!itemCount}
          onClick={openReview}
          aria-label="Revisar pedido"
        >
          <span className="hot-tub-review-label-full">Revisar pedido</span>
          <span className="hot-tub-review-label-short" aria-hidden="true">
            Revisar
          </span>
        </button>
      </div>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="hot-tub-review-dialog max-h-[96vh] max-w-xl overflow-y-auto">
          <button
            type="button"
            className="hot-tub-review-back"
            onClick={() => setReviewOpen(false)}
          >
            <ChevronLeft /> Volver a la carta
          </button>
          <DialogHeader>
            <DialogTitle>Tu pedido</DialogTitle>
            <DialogDescription>
              Lo llevaremos a tu {mode === "hot_tub" ? "Hot Tub" : "llavero"} y
              lo pagarás en recepción al finalizar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitOrder} className="hot-tub-review-form">
            <div className="hot-tub-review-form-body">
              <div className="hot-tub-review-lines">
                {lines.map(line => (
                  <div key={line.key}>
                    <span>
                      <b>{line.quantity}×</b> {line.name}
                      {line.subtitle ? ` · ${line.subtitle}` : ""}
                    </span>
                    <strong>{money(line.priceClp * line.quantity)}</strong>
                  </div>
                ))}
                <div className="hot-tub-review-total">
                  <span>Total</span>
                  <strong>{money(subtotal)}</strong>
                </div>
              </div>

              <div className="hot-tub-review-identification">
                {mode === "hot_tub"
                  ? (() => {
                      const tub = HOT_TUBS.find(
                        entry => entry.code === hotTubCode
                      );
                      return `Hot Tub ${tub?.code} — ${tub?.name}`;
                    })()
                  : `Llavero ${keyFobNumber}`}
              </div>

              <p className="hot-tub-form-instructions">
                Completa los campos marcados como obligatorios para enviar tu
                pedido.
              </p>

              <div className="hot-tub-form-grid">
                <div className="full">
                  <Label htmlFor="customerName">Nombre · obligatorio</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    required
                    minLength={2}
                    placeholder="Escribe tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">WhatsApp · obligatorio</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    required
                    minLength={8}
                    placeholder="+56 9 1234 5678"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceDate">Fecha · opcional</Label>
                  <Input
                    id="serviceDate"
                    name="serviceDate"
                    type="date"
                    min={minDate}
                  />
                </div>
                <div className="full">
                  <Label htmlFor="notes">Notas o alergias · opcional</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    maxLength={500}
                    rows={3}
                    placeholder="Cuéntanos si tienes alguna alergia o indicación especial"
                  />
                </div>
              </div>

              <div className="hot-tub-order-notice">
                <p>
                  <Check /> El pedido se carga a tu cuenta y se paga al salir.
                </p>
                <p>
                  <Check /> Se abrirá el WhatsApp de Cancagua +56 9 4007 3999;
                  debes presionar Enviar para avisar a recepción.
                </p>
              </div>
            </div>

            <Button type="submit" disabled={orderMutation.isPending}>
              {orderMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Registrando…
                </>
              ) : (
                "Enviar pedido por WhatsApp"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(completedOrder)}
        onOpenChange={open => {
          if (!open) {
            setCompletedOrder(null);
            setCompletedWhatsAppUrl(null);
          }
        }}
      >
        <DialogContent className="hot-tub-completed-dialog">
          <DialogHeader>
            <DialogTitle>Pedido registrado</DialogTitle>
            <DialogDescription>
              Tu número es {completedOrder}. Presiona el botón para enviar el
              detalle al WhatsApp de Cancagua.
            </DialogDescription>
          </DialogHeader>
          {completedWhatsAppUrl && (
            <Button asChild>
              <a href={completedWhatsAppUrl}>Abrir WhatsApp de Cancagua</a>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
