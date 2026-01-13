import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Función para generar slug desde nombre
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Datos de la carta extraídos del PDF
const menuData = {
  categories: [
    {
      name: 'Tablas',
      description: 'Tablas para compartir con opciones veganas y sin gluten',
      displayOrder: 1
    },
    {
      name: 'Bebestibles',
      description: 'Bebidas naturales y saludables',
      displayOrder: 2
    },
    {
      name: 'Postres',
      description: 'Postres artesanales y opciones keto',
      displayOrder: 3
    }
  ],
  items: [
    // TABLAS
    {
      categoryName: 'Tablas',
      name: 'Tabla de Otoño',
      description: '3 Tipos de salsas y/o hummus (hummus de garbanzos, salsa de alcachofa, salsa de espárragos, salsa de pimiento), Frutos secos (plátano deshidratado, maíz cancha, haba), Ensaladas de Quinoa, Aceitunas aliñadas y pepinillos, Papas fritas golobo (versión camote, nativas o rústicas) y galletas horneadas Sacapitas',
      prices: { for_2: 22000, for_4: 28000, for_6: 34000 },
      dietaryTags: ['vegan', 'gluten_free'],
      specialNotes: 'Solicitar con 48 hrs de anticipación',
      displayOrder: 1
    },
    {
      categoryName: 'Tablas',
      name: 'Tabla de Charcutería & Quesos',
      description: '4 tipos de embutidos producidos por empresa regional: Salame, Lomo curado, Bresaola, Coppa. 3 o 4 tipos de quesos (según tabla) hechos por productores local: alcatra al vino, alcatra turrón, acompañados de: salsa bruschetta de pimiento grujillo, alcachofa o espárragos, yogurt ciboulette, papas regionales ajolio (nativas o camote), galletas de sal de mar o romero, fruta de la estación, aceitunas y chocolate de café',
      prices: { for_2_4: 25000, for_4_6: 36050 },
      dietaryTags: [],
      specialNotes: 'Precio para 2-4 personas: $25.000, para 4-6 personas: $36.050',
      displayOrder: 2
    },
    {
      categoryName: 'Tablas',
      name: 'Tabla de Niños',
      description: 'Incluye Salame italiano, Queso mantecoso de Vaca (frutillar), Tapas-fritas artesanales (ololoi nativas y camote), Palomitas (Pur-Pop), Fruta de la estación, Galletitas, canelita salada, habas deshidratadas, pocillo de mermelada, pepinillos dill y tomates cherries',
      prices: { default: 20000 },
      dietaryTags: [],
      specialNotes: 'Para 2 a 4 personas',
      displayOrder: 3
    },
    // BEBESTIBLES
    {
      categoryName: 'Bebestibles',
      name: 'Agua Mineral',
      description: 'Con o sin gas',
      prices: { default: 2000 },
      dietaryTags: ['vegan', 'gluten_free', 'keto'],
      specialNotes: null,
      displayOrder: 1
    },
    {
      categoryName: 'Bebestibles',
      name: 'Jugo AMA 100% Fruta',
      description: 'Manzana / Manzana Pera / Manzana Ciruela / Manzana Mango / Manzana Arándano',
      prices: { default: 2000 },
      dietaryTags: ['vegan', 'gluten_free'],
      specialNotes: null,
      displayOrder: 2
    },
    {
      categoryName: 'Bebestibles',
      name: 'Kombucha La IDA',
      description: 'Maqui hops / Berries-Menta / Lemon fresh / Maracuyá Cardamomo / Experimentales',
      prices: { default: 2400 },
      dietaryTags: ['vegan', 'gluten_free'],
      specialNotes: null,
      displayOrder: 3
    },
    // POSTRES
    {
      categoryName: 'Postres',
      name: 'Helados Pucia',
      description: 'Frutos del Bosque / Chocolate 80% / Manjar Playa Venado / Limón, menta y jengibre / Frambuesa',
      prices: { default: 6000 },
      dietaryTags: [],
      specialNotes: null,
      displayOrder: 1
    },
    {
      categoryName: 'Postres',
      name: 'Cheesecake de Chocolate',
      description: 'Cheesecake artesanal de chocolate',
      prices: { default: 5500 },
      dietaryTags: [],
      specialNotes: null,
      displayOrder: 2
    },
    {
      categoryName: 'Postres',
      name: 'Postres Keto',
      description: 'Opciones de postres keto',
      prices: { default: 5500 },
      dietaryTags: ['keto'],
      specialNotes: null,
      displayOrder: 3
    },
    {
      categoryName: 'Postres',
      name: 'Postres Fraguitos',
      description: 'Postres artesanales fraguitos',
      prices: { default: 5000 },
      dietaryTags: [],
      specialNotes: null,
      displayOrder: 4
    }
  ]
};

async function populateMenu() {
  try {
    console.log('🚀 Iniciando población de la carta...\n');

    // Insertar categorías
    console.log('📁 Creando categorías...');
    const categoryIds = {};
    
    for (const category of menuData.categories) {
      const slug = generateSlug(category.name);
      const [result] = await connection.execute(
        `INSERT INTO menu_categories (name, slug, description, display_order, active, created_at, updated_at) 
         VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
        [category.name, slug, category.description, category.displayOrder]
      );
      categoryIds[category.name] = result.insertId;
      console.log(`  ✅ ${category.name} (ID: ${result.insertId})`);
    }

    console.log('\n🍽️  Creando items del menú...');
    
    // Insertar items
    for (const item of menuData.items) {
      const categoryId = categoryIds[item.categoryName];
      const pricesJson = JSON.stringify(item.prices);
      const dietaryTagsJson = JSON.stringify(item.dietaryTags);
      
      await connection.execute(
        `INSERT INTO menu_items 
         (category_id, name, description, prices, dietary_tags, special_notes, display_order, active, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [
          categoryId,
          item.name,
          item.description,
          pricesJson,
          dietaryTagsJson,
          item.specialNotes,
          item.displayOrder
        ]
      );
      console.log(`  ✅ ${item.name} (${item.categoryName})`);
    }

    console.log('\n✨ ¡Carta poblada exitosamente!');
    console.log(`\n📊 Resumen:`);
    console.log(`   - ${menuData.categories.length} categorías creadas`);
    console.log(`   - ${menuData.items.length} items agregados`);
    console.log(`\n🌐 Visita /carta para ver la carta pública`);
    console.log(`🔧 Visita /cms/carta para gestionar el menú\n`);

  } catch (error) {
    console.error('❌ Error al poblar la carta:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

populateMenu();
