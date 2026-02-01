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

export async function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public", "client");

  console.log(`[Production] Serving static files from: ${distPath}`);

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Importar el build de Vike en producción
  // Esto es necesario cuando usamos un bundler custom como esbuild
  const serverPath = path.resolve(import.meta.dirname, "public", "server");
  if (fs.existsSync(path.join(serverPath, "entry.mjs"))) {
    await import(path.join(serverPath, "entry.mjs"));
  }

  // Servir archivos estáticos (CSS, JS, imágenes) desde dist/public/client
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
