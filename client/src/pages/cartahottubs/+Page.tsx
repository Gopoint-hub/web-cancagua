/**
 * Carta exclusiva de Hot Tubs — cancagua.cl/cartahottubs
 *
 * Pedida por Mario el 1-ago-2026: es la carta que se le manda al cliente
 * cuando reserva un hot tub, para que pida desde la tinaja con el telefono.
 *
 * Los precios van en este archivo a proposito, NO desde `menu_items`: esa tabla
 * es la carta general de cafeteria y tiene valores de enero-2026 que ya no se
 * cobran. Cuando exista la carta digital en Fudo, esto se reemplaza por ahi.
 * Fuente: carta enviada por Mario (assets/cartas/menu-hot-tubs-2026-08.jpg).
 */

type Item = { nombre: string; detalle?: string; precio?: string };
type Seccion = {
  titulo: string;
  precio?: string;
  bajada?: string;
  descripcion?: string;
  items: Item[];
};

const SECCIONES: Seccion[] = [
  {
    titulo: "Tablas",
    items: [
      {
        nombre: "Charcutería & Quesos",
        detalle: "para 2 a 3 personas",
        precio: "$28.000",
      },
      {
        nombre: "Charcutería & Quesos",
        detalle: "para 4 a 6 personas",
        precio: "$38.000",
      },
      {
        nombre: "Tabla de Niños",
        detalle: "para 3 personas",
        precio: "$28.000",
      },
      {
        nombre: "Tabla Otoño (vegana)",
        detalle: "para 2 a 3 personas",
        precio: "$28.000",
      },
      {
        nombre: "Tabla Otoño (vegana)",
        detalle: "para 4 a 6 personas",
        precio: "$38.000",
      },
    ],
  },
  {
    titulo: "Vinos y espumante",
    items: [
      { nombre: "Espumante Berla Extra Brut", detalle: "botella 750 cc", precio: "$13.000" },
      { nombre: "Vino Berla Chardonnay Moscatel", detalle: "botella 750 cc", precio: "$12.000" },
      { nombre: "Vino Berla Cinsault", detalle: "botella 750 cc", precio: "$12.000" },
    ],
  },
  {
    titulo: "Cervezas Chester",
    precio: "$4.000",
    bajada: "473 cc",
    items: [
      { nombre: "Dos Kombis", detalle: "Summer Ale" },
      { nombre: "Rustic 99", detalle: "Chilean Pale Ale" },
      { nombre: "Obama's Redemption", detalle: "Stout" },
      { nombre: "Che's IPA", detalle: "India Pale Ale" },
    ],
  },
  {
    titulo: "Cervezas Tropera",
    precio: "$4.000",
    bajada: "473 cc",
    items: [
      { nombre: "Crazy Juan", detalle: "Brown Ale" },
      { nombre: "Strong #47", detalle: "Strong Ale" },
      { nombre: "Don Manu", detalle: "Classic IPA" },
      { nombre: "Guadalina", detalle: "Blonde Ale" },
      { nombre: "Blanché", detalle: "bota sucia" },
    ],
  },
  {
    titulo: "Jugos Rubén Avilés",
    precio: "$4.000",
    bajada: "100 % natural · 300 cc",
    items: [
      { nombre: "Manzana - Maqui" },
      { nombre: "Manzana - Naranja" },
      { nombre: "Manzana - Cranberry" },
      { nombre: "Manzana" },
    ],
  },
  {
    titulo: "Kombucha La IDA",
    precio: "$4.000",
    bajada: "355 cc",
    items: [
      { nombre: "Maracuyá Cardamomo" },
      { nombre: "Maqui Hops" },
      { nombre: "Lemon Fresh" },
      { nombre: "Té verde y lúpulo" },
      { nombre: "Piña Albahaca" },
    ],
  },
  {
    titulo: "Sour Catedral",
    precio: "$7.900",
    bajada: "330 cc",
    items: [{ nombre: "Menta jengibre" }, { nombre: "Murta" }],
  },
  {
    titulo: "Aguas Puyehue",
    precio: "$3.000",
    bajada: "330 cc",
    items: [{ nombre: "Agua con gas" }, { nombre: "Agua sin gas" }],
  },
];

const DESCRIPCIONES: Record<string, string> = {
  "Charcutería & Quesos":
    "Quesos de Los Bajos, charcutería Nueva Braun, 3 tipos de salsa untable, galletitas sacapita, papitas Gololo, fruta de la estación y aceitunas.",
  "Tabla de Niños":
    "Queso de Los Bajos, salame, pepinillos dill, tomates cherry, fruta de la estación, pocillo de mermelada, galletas bañadas en chocolate, galletas saladas, papitas Gololo, palomitas y frutos secos.",
  "Tabla Otoño (vegana)":
    "Quesos veganos Pepilú, pepinillos dill, tomates cherry, fruta de la estación, salsas untables veganas, papitas Gololo, galletitas sacapita y frutos secos.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F4F2ED]">
      <header className="bg-[#4A4F35] text-white px-5 py-10 text-center">
        <p className="text-xs tracking-[0.35em] uppercase opacity-80 mb-3">Cancagua</p>
        <h1 className="font-cg-serif text-3xl md:text-5xl font-light">
          Menú exclusivo Hot Tubs
        </h1>
        <div className="w-16 h-px bg-white/50 mx-auto my-5" />
        <p className="text-sm md:text-base opacity-90 max-w-md mx-auto">
          Pídelo sin salir de la tinaja: avísale al garzón del sector o en recepción.
        </p>
      </header>

      <main className="px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2 md:gap-10">
          {SECCIONES.map((seccion) => (
            <section
              key={`${seccion.titulo}-${seccion.bajada ?? ""}`}
              className="bg-white rounded-lg p-5 md:p-6 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-[#899169]/40 pb-2 mb-4">
                <h2 className="text-sm tracking-[0.18em] uppercase text-[#4A4F35] font-semibold">
                  {seccion.titulo}
                </h2>
                {seccion.precio && (
                  <span className="text-base font-semibold text-[#4A4F35] whitespace-nowrap">
                    {seccion.precio}
                  </span>
                )}
              </div>

              {seccion.bajada && (
                <p className="text-xs uppercase tracking-wider text-gray-500 -mt-2 mb-4">
                  {seccion.bajada}
                </p>
              )}

              <ul className="space-y-3">
                {seccion.items.map((item, i) => (
                  <li
                    key={`${item.nombre}-${item.detalle ?? i}`}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span>
                      <span className="text-gray-900">{item.nombre}</span>
                      {item.detalle && (
                        <span className="block text-sm text-gray-500 italic">
                          {item.detalle}
                        </span>
                      )}
                    </span>
                    {item.precio && (
                      <span className="text-gray-900 font-medium whitespace-nowrap">
                        {item.precio}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {seccion.titulo === "Tablas" && (
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                  {Object.entries(DESCRIPCIONES).map(([nombre, texto]) => (
                    <p key={nombre} className="text-xs text-gray-500 leading-relaxed">
                      <span className="font-medium text-gray-700">{nombre}: </span>
                      {texto}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 italic mt-10 max-w-md mx-auto">
          Para una mayor oferta gastronómica, visita nuestra Cafetería en la playa.
        </p>
      </main>
    </div>
  );
}
