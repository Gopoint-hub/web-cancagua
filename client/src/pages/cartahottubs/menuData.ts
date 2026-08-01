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

// Datos contrastados con los productos activos de FUDO el 1 de agosto de 2026.
// Esta carta conserva los productos que ya estaban publicados y agrega únicamente
// Ulmo Sour Catedral, según lo solicitado por Operaciones.
export const MENU_SECTIONS: MenuSection[] = [
  {
    titulo: "Tablas",
    items: [
      {
        nombre: "Tabla Charcuteria y Quesos 2 a 3 personas",
        precio: 28000,
        descripcion:
          "Quesos DCabra y DVaca, de Los Bajos; charcutería La Vikinga Puerto Varas; salame; jamón curado; salsas untables; galletitas Sacapita de sal de mar y/o romero; papitas Gololo nativas y camote; y fruta de la estación.",
      },
      {
        nombre: "Tabla Charcutería y Quesos 4 a 6 personas",
        precio: 38000,
        descripcion:
          "Quesos DCabra y DVaca, de Los Bajos; charcutería La Vikinga Puerto Varas; salame; jamón curado; salsas untables; galletitas Sacapita de sal de mar y/o romero; papitas Gololo nativas y camote; y fruta de la estación.",
      },
      {
        nombre: "Tabla de Niños 2 a 4 personas",
        precio: 28000,
        descripcion:
          "Queso DVaca Los Bajos, salame, pepinillos dill, tomates cherry, fruta de la estación, mermelada, galletas bañadas en chocolate, galletas saladas, papitas regionales Gololo nativas y camote, palomitas y frutos secos (plátano, habas o choclo deshidratado).",
      },
      {
        nombre: "Tabla Otoño (Vegana) 2 a 3 personas",
        precio: 28000,
        aptoVegano: true,
        descripcion:
          "Tres tipos de salsas y/o hummus (hummus de garbanzo de la casa, pesto de pimiento piquillo, salsa de aceitunas o alcachofa), frutos secos, pepinillo dill, tomate cherry, fruta de la estación, aceitunas aliñadas, papas Gololo y galletas horneadas Sacapitas.",
      },
      {
        nombre: "Tabla Otoño (Vegana) 4 a 6 personas",
        precio: 38000,
        aptoVegano: true,
        descripcion:
          "Tres tipos de salsas y/o hummus (hummus de garbanzo de la casa, pesto de pimiento piquillo, salsa de aceitunas o alcachofa), frutos secos, pepinillo dill, tomate cherry, fruta de la estación, aceitunas aliñadas, papas Gololo y galletas horneadas Sacapitas.",
      },
    ],
  },
  {
    titulo: "Vinos y espumante",
    items: [
      { nombre: "Espumante Berta Extra Brut", precio: 15900 },
      { nombre: "Vino - Chardonnay Moscatel", precio: 15000 },
      { nombre: "Vino - Cinsault", precio: 15000 },
    ],
  },
  {
    titulo: "Cervezas Chester",
    items: [
      {
        nombre: "Chester Summer Ale",
        precio: 4000,
        descripcion:
          '"Dos Kombis". Ligera, fresca y recomendable para consumir con alimentos frescos. 4,8° gl / IBU 21.',
      },
      {
        nombre: "Chester Chilean Pale Ale",
        precio: 4000,
        descripcion:
          '"Rustic 99". Clásica, con amargor floral y complejo, cuerpo maltoso y notas caramelizadas. Debido a su balance, es posible consumirla con todo tipo de alimentos. 5,2° gl / IBU 26.',
      },
      {
        nombre: "Chester Stout",
        precio: 4000,
        descripcion:
          '"Obama’s Redemption". Cerveza negra con suaves notas a café tostado y cacao amargo. Blando amargor y dulzor seco, ideal para consumir a una temperatura ligeramente fría. 5,5° gl / IBU 28.',
      },
      {
        nombre: "Chester Indian Pale Ale",
        precio: 4000,
        descripcion:
          '"Che’s IPA". Cerveza amarga floral con notas y aromas a lúpulos. Recomendable para disfrutar lentamente. 6,8° gl / IBU 55.',
      },
    ],
  },
  {
    titulo: "Cervezas Tropera",
    items: [
      { nombre: "Cerveza Tropera Crazy Juan", precio: 4000 },
      { nombre: "Cerveza Tropera Strong", precio: 4000 },
      { nombre: "Cerveza Tropera Don Manu", precio: 4000 },
      { nombre: "Cerveza Tropera Guadalina", precio: 4000 },
      { nombre: "Cerveza Tropera Bota Sucia", precio: 4000 },
    ],
  },
  {
    titulo: "Jugos Rubén Avilés",
    items: [
      { nombre: "Jugo 100% natural Rubén Avilés Manzana-Maqui", precio: 4000 },
      {
        nombre: "Jugo 100% natural Rubén Avilés Manzana Naranja",
        precio: 4000,
      },
      {
        nombre: "Jugo 100% natural Ruben Aviles Manzana-Cranberry",
        precio: 4000,
      },
      { nombre: "Jugo 100% natural Rubén Avilés Manzana", precio: 4000 },
    ],
  },
  {
    titulo: "Kombucha La IDA",
    items: [
      { nombre: "Kombucha La IDA - Maracuyá Cardamomo", precio: 4000 },
      { nombre: "Kombucha La IDA - Maqui Lupulo", precio: 4000 },
      { nombre: "Kombucha La IDA - Lemon Fresh", precio: 4000 },
      { nombre: "Kombucha La IDA Te verde", precio: 4000 },
      { nombre: "Kombucha LA IDA - Piña Albahaca", precio: 4000 },
    ],
  },
  {
    titulo: "Sour Catedral",
    items: [
      { nombre: "Menta jengibre sour Catedral", precio: 7900 },
      { nombre: "Murta Sour Catedral", precio: 7900 },
      { nombre: "Ulmo Sour Catedral", precio: 7900 },
    ],
  },
  {
    titulo: "Aguas minerales",
    items: [
      { nombre: "Agua mineral con gas", precio: 3000 },
      { nombre: "Agua mineral sin gas", precio: 3000 },
    ],
  },
];

export function formatCLP(value: number) {
  return `$${new Intl.NumberFormat("es-CL").format(value)}`;
}
