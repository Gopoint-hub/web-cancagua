/**
 * Servidor SSR mínimo para cancagua.cl (Frontend Only)
 *
 * Este servidor solo se encarga de:
 * 1. Redirecciones 301 (SEO - migración WordPress)
 * 2. Sitemap.xml dinámico
 * 3. Servir archivos estáticos
 * 4. Server-Side Rendering (SSR) con Vike
 *
 * Toda la lógica de negocio (API, BD, WebPay, emails, etc.)
 * vive en el CMS: https://cms.cancagua.cl
 */

import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { registerRedirects } from "./redirects";
import { registerSitemapRoute } from "./sitemap";
import { setupVite, serveStatic } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Redirecciones 301 para URLs antiguas del WordPress (debe ir primero)
  registerRedirects(app);

  // Sitemap.xml dinámico
  registerSitemapRoute(app);

  // En desarrollo: Vite dev server con HMR
  // En producción: archivos estáticos + SSR
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    await serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`[Frontend SSR] Server running on http://localhost:${port}/`);
    console.log(`[Frontend SSR] API calls proxied to CMS: ${process.env.VITE_API_BASE_URL || "https://cms.cancagua.cl"}`);
  });
}

startServer().catch(console.error);
