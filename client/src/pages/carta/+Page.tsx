import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Leaf, Wheat, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Carta() {
  const { data: menuData, isLoading } = trpc.menu.getFullMenu.useQuery();
  const [selectedDietaryFilter, setSelectedDietaryFilter] = useState<string | null>(null);

  const dietaryIcons: Record<string, React.ReactNode> = {
    vegan: <Leaf className="w-4 h-4" />,
    gluten_free: <Wheat className="w-4 h-4" />,
    keto: <Flame className="w-4 h-4" />,
  };

  const dietaryLabels: Record<string, string> = {
    vegan: "Vegano",
    gluten_free: "Sin Gluten",
    keto: "Keto",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(price);
  };

  // El CMS entrega `dietaryTags` y `prices` como TEXTO JSON, no como array/objeto.
  // Por eso `dietaryTags.map(...)` lanzaba "map is not a function" y React
  // desmontaba la pagina entera: la carta se veia completamente en blanco.
  // Aceptamos las dos formas para no depender de como responda el CMS.
  const parseTags = (value: any): string[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const parsePrices = (value: any): Record<string, number> => {
    if (value && typeof value === "object") return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch {
        return {};
      }
    }
    return {};
  };

  const priceLabels: Record<string, string> = {
    for_2: "Para 2",
    for_4: "Para 4",
    for_6: "Para 6",
    for_2_4: "Para 2-4",
    for_4_6: "Para 4-6",
  };

  // Generico a proposito: la Tabla de Charcuteria usa `for_2_4`/`for_4_6`, que la
  // version anterior no contemplaba y dejaba sin precio a la vista.
  const priceLabel = (key: string) =>
    priceLabels[key] ?? `Para ${key.replace(/^for_/, "").replace(/_/g, "-")}`;

  const renderPrices = (rawPrices: any) => {
    const prices = parsePrices(rawPrices);
    const entries = Object.entries(prices).filter(
      ([, value]) => typeof value === "number" && value > 0
    );
    if (entries.length === 0) return null;

    if (entries.length === 1 && entries[0][0] === "default") {
      return (
        <p className="text-lg font-semibold text-[#4A4F35] whitespace-nowrap">
          {formatPrice(entries[0][1])}
        </p>
      );
    }

    return (
      <div className="space-y-1">
        {entries.map(([key, value]) => (
          <p key={key} className="text-sm text-gray-700 whitespace-nowrap">
            {key === "default" ? formatPrice(value) : `${priceLabel(key)}: ${formatPrice(value)}`}
          </p>
        ))}
      </div>
    );
  };

  const filterItems = (items: any[]) => {
    if (!selectedDietaryFilter) return items;
    return items.filter((item) => parseTags(item.dietaryTags).includes(selectedDietaryFilter));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2ED]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#4A4F35] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Nuestra Carta</h1>
            <div className="w-24 h-1 bg-[#899169] mx-auto mb-6"></div>
            <p className="text-lg max-w-2xl mx-auto">
              Comida sana, consciente y local de la zona donde posible.
              <br />
              Siempre incluyendo opciones veganas y sin gluten.
            </p>
            <p className="text-sm mt-4 opacity-80">
              SUJETO A CAMBIOS SEGÚN DISPONIBILIDAD DE PRODUCTOS
            </p>
          </div>
        </section>

        {/* Filtros Dietéticos */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => setSelectedDietaryFilter(null)} className={`px-4 py-2 rounded-full border-2 transition-colors ${!selectedDietaryFilter ? "bg-[#4A4F35] text-white border-[#4A4F35]" : "bg-white text-gray-700 border-gray-300 hover:border-[#4A4F35]"}`}>
                Todos
              </button>
              <button onClick={() => setSelectedDietaryFilter("vegan")} className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${selectedDietaryFilter === "vegan" ? "bg-[#4A4F35] text-white border-[#4A4F35]" : "bg-white text-gray-700 border-gray-300 hover:border-[#4A4F35]"}`}>
                <Leaf className="w-4 h-4" />
                Vegano
              </button>
              <button onClick={() => setSelectedDietaryFilter("gluten_free")} className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${selectedDietaryFilter === "gluten_free" ? "bg-[#4A4F35] text-white border-[#4A4F35]" : "bg-white text-gray-700 border-gray-300 hover:border-[#4A4F35]"}`}>
                <Wheat className="w-4 h-4" />
                Sin Gluten
              </button>
              <button onClick={() => setSelectedDietaryFilter("keto")} className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${selectedDietaryFilter === "keto" ? "bg-[#4A4F35] text-white border-[#4A4F35]" : "bg-white text-gray-700 border-gray-300 hover:border-[#4A4F35]"}`}>
                <Flame className="w-4 h-4" />
                Keto
              </button>
            </div>
          </div>
        </section>

        {/* Menú */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#4A4F35]" />
              </div>
            )}

            {!isLoading && menuData && menuData.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600">La carta estará disponible próximamente.</p>
              </div>
            )}

            {!isLoading && menuData && menuData.map((category: any) => {
              const filteredItems = filterItems(category.items ?? []);
              if (filteredItems.length === 0) return null;

              return (
                <div key={category.id} className="mb-16">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl text-[#4A4F35] mb-2">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        {category.description}
                      </p>
                    )}
                    <div className="w-16 h-1 bg-[#899169] mx-auto mt-4"></div>
                  </div>

                  <div className="space-y-8">
                    {filteredItems.map((item: any) => {
                      const tags = parseTags(item.dietaryTags);
                      return (
                      <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4">
                          {item.imageUrl && (
                            <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                              <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                              {renderPrices(item.prices)}
                            </div>
                            {item.description && (
                              <p className="text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                            )}
                            {tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag: string) => (
                                  <Badge key={tag} variant="outline" className="bg-sage-100 text-sage-700 border-sage-300">
                                    {dietaryIcons[tag]}
                                    <span className="ml-1">{dietaryLabels[tag] ?? tag}</span>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {item.specialNotes && (
                              <p className="text-sm text-clay-700 bg-clay-100 px-3 py-2 rounded border border-clay-200">
                                {item.specialNotes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
