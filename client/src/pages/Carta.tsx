import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderPrices = (prices: any) => {
    if (!prices) return null;
    
    // Si tiene múltiples precios (para 2, 4, 6)
    if (prices.for_2 || prices.for_4 || prices.for_6) {
      return (
        <div className="space-y-1">
          {prices.for_2 && (
            <p className="text-sm text-gray-700">Para 2: {formatPrice(prices.for_2)}</p>
          )}
          {prices.for_4 && (
            <p className="text-sm text-gray-700">Para 4: {formatPrice(prices.for_4)}</p>
          )}
          {prices.for_6 && (
            <p className="text-sm text-gray-700">Para 6: {formatPrice(prices.for_6)}</p>
          )}
        </div>
      );
    }
    
    // Precio único
    if (prices.default) {
      return <p className="text-lg font-semibold text-[#44580E]">{formatPrice(prices.default)}</p>;
    }
    
    return null;
  };

  const filterItems = (items: any[]) => {
    if (!selectedDietaryFilter) return items;
    return items.filter((item) => 
      item.dietaryTags && item.dietaryTags.includes(selectedDietaryFilter)
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Navbar />
      <WhatsAppButton />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#44580E] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Nuestra Carta</h1>
            <div className="w-24 h-1 bg-[#8BC4B8] mx-auto mb-6"></div>
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
              <button
                onClick={() => setSelectedDietaryFilter(null)}
                className={`px-4 py-2 rounded-full border-2 transition-colors ${
                  !selectedDietaryFilter
                    ? "bg-[#44580E] text-white border-[#44580E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#44580E]"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedDietaryFilter("vegan")}
                className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${
                  selectedDietaryFilter === "vegan"
                    ? "bg-[#44580E] text-white border-[#44580E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#44580E]"
                }`}
              >
                <Leaf className="w-4 h-4" />
                Vegano
              </button>
              <button
                onClick={() => setSelectedDietaryFilter("gluten_free")}
                className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${
                  selectedDietaryFilter === "gluten_free"
                    ? "bg-[#44580E] text-white border-[#44580E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#44580E]"
                }`}
              >
                <Wheat className="w-4 h-4" />
                Sin Gluten
              </button>
              <button
                onClick={() => setSelectedDietaryFilter("keto")}
                className={`px-4 py-2 rounded-full border-2 transition-colors flex items-center gap-2 ${
                  selectedDietaryFilter === "keto"
                    ? "bg-[#44580E] text-white border-[#44580E]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#44580E]"
                }`}
              >
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
                <Loader2 className="w-8 h-8 animate-spin text-[#44580E]" />
              </div>
            )}

            {!isLoading && menuData && menuData.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600">La carta estará disponible próximamente.</p>
              </div>
            )}

            {!isLoading && menuData && menuData.map((category: any) => {
              const filteredItems = filterItems(category.items);
              if (filteredItems.length === 0) return null;

              return (
                <div key={category.id} className="mb-16">
                  {/* Categoría */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-[#44580E] mb-2">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        {category.description}
                      </p>
                    )}
                    <div className="w-16 h-1 bg-[#8BC4B8] mx-auto mt-4"></div>
                  </div>

                  {/* Items */}
                  <div className="space-y-8">
                    {filteredItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Imagen (si existe) */}
                          {item.imageUrl && (
                            <div className="md:w-32 md:h-32 w-full h-48 flex-shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}

                          {/* Contenido */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              {renderPrices(item.prices)}
                            </div>

                            {item.description && (
                              <p className="text-gray-600 mb-3 leading-relaxed">
                                {item.description}
                              </p>
                            )}

                            {/* Etiquetas dietéticas */}
                            {item.dietaryTags && item.dietaryTags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.dietaryTags.map((tag: string) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    {dietaryIcons[tag]}
                                    <span className="ml-1">{dietaryLabels[tag]}</span>
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Notas especiales */}
                            {item.specialNotes && (
                              <p className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-200">
                                {item.specialNotes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
