import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { renderPage } from "vike/server";

let viteDevServer: ViteDevServer | undefined;

export async function setupVite(app: Express, server: Server) {
  // Importar viteConfig solo en desarrollo para evitar cargar el plugin de Vike en producción
  const { default: viteConfig } = await import("../../vite.config");

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  viteDevServer = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(viteDevServer.middlewares);

  // Vike SSR handler - se ejecuta después de tRPC y OAuth
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Renderizar página con Vike
      const pageContextInit = {
        urlOriginal: url,
        headersOriginal: req.headers,
      };

      const pageContext = await renderPage(pageContextInit);

      if (!pageContext.httpResponse) {
        // No hay respuesta SSR, pasar al siguiente handler
        return next();
      }

      const { statusCode, headers, body } = pageContext.httpResponse;

      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode).send(body);
    } catch (e) {
      viteDevServer!.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Servir archivos estáticos (CSS, JS, imágenes)
  app.use(express.static(distPath));

  // Vike SSR handler para producción
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const pageContextInit = {
        urlOriginal: url,
        headersOriginal: req.headers,
      };

      const pageContext = await renderPage(pageContextInit);

      if (!pageContext.httpResponse) {
        return next();
      }

      const { statusCode, headers, body } = pageContext.httpResponse;

      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode).send(body);
    } catch (e) {
      console.error('SSR Error:', e);
      next(e);
    }
  });
}
