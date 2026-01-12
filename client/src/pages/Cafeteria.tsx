import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Leaf, MapPin } from "lucide-react";
import { useState } from "react";

export default function Cafeteria() {
  const [filtroActivo, setFiltroActivo] = useState<string>("todos");

  const menuItems = [
    {
      id: 1,
      nombre: "Bowl de Açaí",
      descripcion:
        "Açaí orgánico con granola casera, frutas frescas, coco rallado y miel",
      precio: "$8.500",
      categoria: "brunch",
      dietas: ["vegano", "sin-gluten", "sin-lacteos"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 2,
      nombre: "Tostadas de Palta",
      descripcion:
        "Pan masa madre, palta, tomate cherry, semillas y aceite de oliva",
      precio: "$7.000",
      categoria: "brunch",
      dietas: ["vegano", "vegetariano"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 3,
      nombre: "Ensalada Cancagua",
      descripcion:
        "Mix de hojas verdes, quínoa, vegetales asados, nueces y aderezo de tahini",
      precio: "$9.500",
      categoria: "almuerzo",
      dietas: ["vegano", "vegetariano", "sin-gluten"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 4,
      nombre: "Wrap Vegetal",
      descripcion:
        "Tortilla integral con hummus, vegetales frescos y germinados",
      precio: "$8.000",
      categoria: "almuerzo",
      dietas: ["vegano", "vegetariano"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 5,
      nombre: "Smoothie Verde",
      descripcion: "Espinaca, plátano, mango, leche de almendras y espirulina",
      precio: "$5.500",
      categoria: "bebidas",
      dietas: ["vegano", "sin-gluten", "sin-lacteos"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 6,
      nombre: "Café Latte con Leche de Avena",
      descripcion: "Espresso doble con leche de avena artesanal",
      precio: "$4.000",
      categoria: "bebidas",
      dietas: ["vegano", "sin-lacteos"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 7,
      nombre: "Bowl Keto",
      descripcion:
        "Aguacate, huevo pochado, salmón ahumado, espinaca y semillas",
      precio: "$10.500",
      categoria: "brunch",
      dietas: ["keto", "sin-gluten"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
    {
      id: 8,
      nombre: "Panqueques Sin Gluten",
      descripcion:
        "Panqueques de harina de almendras con frutas y miel de maple",
      precio: "$7.500",
      categoria: "brunch",
      dietas: ["vegetariano", "sin-gluten"],
      imagen: "/images/08_cafeteria-interior.jpg",
    },
  ];

  const filtros = [
    { id: "todos", nombre: "Todos" },
    { id: "vegano", nombre: "Vegano" },
    { id: "vegetariano", nombre: "Vegetariano" },
    { id: "keto", nombre: "Keto" },
    { id: "sin-gluten", nombre: "Sin Gluten" },
    { id: "sin-lacteos", nombre: "Sin Lácteos" },
  ];

  const itemsFiltrados =
    filtroActivo === "todos"
      ? menuItems
      : menuItems.filter((item) => item.dietas.includes(filtroActivo));

  const getDietaBadges = (dietas: string[]) => {
    const dietaLabels: Record<string, string> = {
      vegano: "Vegano",
      vegetariano: "Vegetariano",
      keto: "Keto",
      "sin-gluten": "Sin Gluten",
      "sin-lacteos": "Sin Lácteos",
    };

    return dietas.map((dieta) => (
      <Badge key={dieta} variant="secondary" className="text-xs">
        {dietaLabels[dieta]}
      </Badge>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/06_cafeteria-hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cafetería Saludable
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Alimentación consciente con productos locales y opciones para
              todas las dietas
            </p>
          </div>
        </section>

        {/* Información */}
        <section className="py-12 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Horarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Martes a Domingo
                    <br />
                    10:00 - 18:00
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Productos Locales</h3>
                  <p className="text-sm text-muted-foreground">
                    Ingredientes frescos
                    <br />y de temporada
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Vista al Lago</h3>
                  <p className="text-sm text-muted-foreground">
                    Disfruta con vista
                    <br />
                    panorámica
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comida Consciente
              </h2>
              <p className="text-lg text-muted-foreground">
                Nuestra cafetería ofrece brunch todo el día con opciones
                saludables y deliciosas. Trabajamos con productores locales para
                traerte ingredientes frescos y de temporada. Tenemos opciones
                para todas las dietas: veganas, vegetarianas, keto, sin gluten y
                sin lácteos.
              </p>
            </div>
          </div>
        </section>

        {/* Menú */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Nuestro Menú
            </h2>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {filtros.map((filtro) => (
                <Button
                  key={filtro.id}
                  variant={filtroActivo === filtro.id ? "default" : "outline"}
                  onClick={() => setFiltroActivo(filtro.id)}
                  size="sm"
                >
                  {filtro.nombre}
                </Button>
              ))}
            </div>

            {/* Tabs por categoría */}
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="brunch">Brunch</TabsTrigger>
                <TabsTrigger value="almuerzo">Almuerzo</TabsTrigger>
                <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
              </TabsList>

              <TabsContent value="todos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemsFiltrados.map((item) => (
                    <Card key={item.id}>
                      <div className="relative h-48">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{item.nombre}</h3>
                          <span className="text-lg font-bold text-primary">
                            {item.precio}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.descripcion}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getDietaBadges(item.dietas)}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {["brunch", "almuerzo", "bebidas"].map((categoria) => (
                <TabsContent key={categoria} value={categoria}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itemsFiltrados
                      .filter((item) => item.categoria === categoria)
                      .map((item) => (
                        <Card key={item.id}>
                          <div className="relative h-48">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="w-full h-full object-cover rounded-t-lg"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">
                                {item.nombre}
                              </h3>
                              <span className="text-lg font-bold text-primary">
                                {item.precio}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {getDietaBadges(item.dietas)}
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {itemsFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No hay items que coincidan con este filtro
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Reserva */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Reserva tu Mesa
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Especialmente en fines de semana y días festivos, te recomendamos
              reservar con anticipación
            </p>
            <Button size="lg">Reservar Mesa por WhatsApp</Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
