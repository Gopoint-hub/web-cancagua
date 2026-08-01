/**
 * Carta exclusiva de Hot Tubs — cancagua.cl/cartahottubs
 *
 * Pedida por Mario el 1-ago-2026: es la carta que se le manda al cliente
 * cuando reserva un hot tub, para que pida desde la tinaja con el telefono.
 *
 * Los productos se contrastan con FUDO, pero permanecen en un archivo local
 * para que esta página pública no dependa de credenciales ni de la API del POS.
 */
import { formatCLP, MENU_SECTIONS } from "./menuData";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F4F2ED]">
      <header className="bg-[#4A4F35] text-white px-5 py-10 text-center">
        <p className="text-xs tracking-[0.35em] uppercase opacity-80 mb-3">
          Cancagua
        </p>
        <h1 className="font-cg-serif text-3xl md:text-5xl font-light">
          Menú exclusivo Hot Tubs
        </h1>
        <div className="w-16 h-px bg-white/50 mx-auto my-5" />
        <p className="text-sm md:text-base opacity-90 max-w-md mx-auto">
          Pídelo sin salir de la tinaja: avísale al garzón del sector o en
          recepción.
        </p>
      </header>

      <main className="px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2 md:gap-10">
          {MENU_SECTIONS.map(seccion => (
            <section
              key={seccion.titulo}
              className="bg-white rounded-lg p-5 md:p-6 shadow-sm"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-[#899169]/40 pb-2 mb-4">
                <h2 className="text-sm tracking-[0.18em] uppercase text-[#4A4F35] font-semibold">
                  {seccion.titulo}
                </h2>
              </div>

              <ul className="space-y-4">
                {seccion.items.map(item => (
                  <li
                    key={item.nombre}
                    className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-gray-900">{item.nombre}</span>
                      <span className="text-gray-900 font-medium whitespace-nowrap">
                        {formatCLP(item.precio)}
                      </span>
                    </div>
                    {item.descripcion && (
                      <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                        {item.descripcion}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 italic mt-10 max-w-md mx-auto">
          Para una mayor oferta gastronómica, visita nuestra Cafetería en la
          playa.
        </p>
      </main>
    </div>
  );
}
