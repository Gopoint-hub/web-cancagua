export type MenuItem = {
  nombre: string;
  precio: number;
  descripcion?: string;
  aptoVegano?: boolean;
};

export type MenuSection = {
  titulo: string;
  items: MenuItem[];
};

const charcuteria =
  "Quesos de Los Bajos, charcutería Nueva Braun, 3 tipos de salsa untable, galletitas sacapita, papitas Gololo, fruta de la estación y aceitunas.";
const vegana =
  "Quesos veganos Pepilú, pepinillos dill, tomates cherry, fruta de la estación, salsas untables veganas, papitas Gololo, galletitas sacapita y frutos secos.";

// Copia estática para SEO de la carta aprobada. La interfaz y el pedido obtienen
// este mismo catálogo desde el CMS para respetar disponibilidad en tiempo real.
export const MENU_SECTIONS: MenuSection[] = [
  {
    titulo: "Tablas",
    items: [
      { nombre: "Charcutería & Quesos para 2 a 3 personas", precio: 28000, descripcion: charcuteria },
      { nombre: "Charcutería & Quesos para 4 a 6 personas", precio: 38000, descripcion: charcuteria },
      {
        nombre: "Tabla de Niños para 3 personas",
        precio: 28000,
        descripcion:
          "Queso de Los Bajos, salame, pepinillos dill, tomates cherry, fruta de la estación, pocillo de mermelada, galletas bañadas en chocolate, galletas saladas, papitas Gololo, palomitas y frutos secos.",
      },
      { nombre: "Tabla Otoño (vegana) para 2 a 3 personas", precio: 28000, descripcion: vegana, aptoVegano: true },
      { nombre: "Tabla Otoño (vegana) para 4 a 6 personas", precio: 38000, descripcion: vegana, aptoVegano: true },
    ],
  },
  {
    titulo: "Vinos y espumante",
    items: [
      { nombre: "Espumante Berla Extra Brut · botella 750 cc", precio: 13000 },
      { nombre: "Vino Berla Chardonnay Moscatel · botella 750 cc", precio: 12000 },
      { nombre: "Vino Berla Cinsault · botella 750 cc", precio: 12000 },
    ],
  },
  {
    titulo: "Jugos Rubén Avilés",
    items: ["Manzana - Maqui", "Manzana - Naranja", "Manzana - Cranberry", "Manzana"].map(nombre => ({ nombre, precio: 4000 })),
  },
  {
    titulo: "Kombucha La Ida",
    items: ["Maracuyá Cardamomo", "Maqui Hops", "Lemon Fresh", "Té verde y lúpulo", "Piña Albahaca"].map(nombre => ({ nombre, precio: 4000 })),
  },
  {
    titulo: "Aguas Puyehue",
    items: ["Agua con gas", "Agua sin gas"].map(nombre => ({ nombre, precio: 3000 })),
  },
  {
    titulo: "Cervezas Tropera",
    items: ["Crazy Juan · Brown Ale", "Strong #47 · Strong Ale", "Don Manu · Classic IPA", "Guadalina · Blonde Ale", "Blanché · bota sucia"].map(nombre => ({ nombre, precio: 4000 })),
  },
  {
    titulo: "Cervezas Chester",
    items: ["Dos Kombis · Summer Ale", "Rustic 99 · Chilean Pale Ale", "Obama´s Redemption · Stout", "Che´s IPA · India Pale Ale"].map(nombre => ({ nombre, precio: 4000 })),
  },
  {
    titulo: "Sour Catedral",
    items: ["Menta jengibre", "Murta"].map(nombre => ({ nombre, precio: 7900 })),
  },
  {
    titulo: "Postres",
    items: [
      { nombre: "Helados Pucía", precio: 6000 },
      { nombre: "Cheesecake de Chocolate", precio: 5500 },
      { nombre: "Postres Keto", precio: 5500 },
      { nombre: "Postres Fraguitos", precio: 5000 },
    ],
  },
];

export function formatCLP(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}
