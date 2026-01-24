/**
 * Script para crear los usuarios super admin iniciales
 * Ejecutar con: npx tsx scripts/init-super-admins.ts
 */

import { connect } from "@tidbcloud/serverless";
import { drizzle } from "drizzle-orm/tidb-serverless";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL no está configurada");
  process.exit(1);
}

const client = connect({ url: DATABASE_URL });
const db = drizzle(client);

// Super admins a crear
const superAdmins = [
  {
    email: "sebastian@gopointagency.com",
    name: "Sebastián",
  },
  {
    email: "hermosillamario@gmail.com",
    name: "Mario Hermosilla",
  },
];

async function generateOpenId(): Promise<string> {
  return crypto.randomBytes(16).toString("hex");
}

async function generateToken(): Promise<string> {
  return crypto.randomBytes(32).toString("hex");
}

async function main() {
  console.log("🚀 Iniciando creación de super admins...\n");

  for (const admin of superAdmins) {
    try {
      // Verificar si el usuario ya existe
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, admin.email))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⚠️  Usuario ${admin.email} ya existe. Actualizando a super_admin...`);
        await db
          .update(users)
          .set({ role: "super_admin" })
          .where(eq(users.email, admin.email));
        console.log(`✅ ${admin.email} actualizado a super_admin\n`);
        continue;
      }

      // Crear nuevo usuario
      const openId = await generateOpenId();
      const invitationToken = await generateToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 días para activar

      await db.insert(users).values({
        openId,
        email: admin.email,
        name: admin.name,
        role: "super_admin",
        status: "pending",
        invitationToken,
        invitationExpiresAt: expiresAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✅ Super admin creado: ${admin.email}`);
      console.log(`   Nombre: ${admin.name}`);
      console.log(`   Token de invitación: ${invitationToken}`);
      console.log(`   URL de activación: https://cancagua-web.onrender.com/cms/activar-cuenta?token=${invitationToken}`);
      console.log("");
    } catch (error) {
      console.error(`❌ Error al crear ${admin.email}:`, error);
    }
  }

  console.log("\n🎉 Proceso completado!");
  console.log("\nPróximos pasos:");
  console.log("1. Configura RESEND_API_KEY en las variables de entorno de Render");
  console.log("2. Los usuarios recibirán un email para activar su cuenta");
  console.log("3. O pueden usar las URLs de activación mostradas arriba");
}

main().catch(console.error);
