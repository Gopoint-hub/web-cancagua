import { describe, it, expect, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { redirectMiddleware } from "./_core/redirects";

// Mock de Express Request, Response y NextFunction
function createMockReq(path: string, originalUrl?: string): Partial<Request> {
  return {
    path,
    originalUrl: originalUrl || path,
  };
}

function createMockRes(): Partial<Response> {
  const res: Partial<Response> = {
    redirect: vi.fn().mockReturnThis(),
  };
  return res;
}

describe("Redirect Middleware - WordPress to New Site", () => {
  it("should redirect /articulos to /blog with 301", () => {
    const req = createMockReq("/articulos");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect /articulos/ (with trailing slash) to /blog with 301", () => {
    const req = createMockReq("/articulos/");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect /eventos-empresas to /eventos/empresas with 301", () => {
    const req = createMockReq("/eventos-empresas");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/eventos/empresas");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect /giftcards to /tienda-regalos-preview with 301", () => {
    const req = createMockReq("/giftcards");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/tienda-regalos-preview");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect blog article /mejores-termas-sur-chile-2026 to /blog/mejores-termas-sur-chile-2026", () => {
    const req = createMockReq("/mejores-termas-sur-chile-2026");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog/mejores-termas-sur-chile-2026");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect /termas-del-sur-de-chile-con-ninos-guia-para-familias to /blog/termas-con-ninos", () => {
    const req = createMockReq("/termas-del-sur-de-chile-con-ninos-guia-para-familias");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog/termas-con-ninos");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect /tecnicas-manejo-estres-laboral to /blog/manejo-estres-laboral", () => {
    const req = createMockReq("/tecnicas-manejo-estres-laboral");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog/manejo-estres-laboral");
    expect(next).not.toHaveBeenCalled();
  });

  it("should redirect service pages like /biopiscinas to /servicios/biopiscinas", () => {
    const req = createMockReq("/biopiscinas");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/servicios/biopiscinas");
    expect(next).not.toHaveBeenCalled();
  });

  it("should preserve query strings during redirect", () => {
    const req = createMockReq("/articulos", "/articulos?page=2&sort=date");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog?page=2&sort=date");
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() for non-redirected URLs", () => {
    const req = createMockReq("/some-other-page");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should handle uppercase URLs by converting to lowercase", () => {
    const req = createMockReq("/ARTICULOS");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).toHaveBeenCalledWith(301, "/blog");
    expect(next).not.toHaveBeenCalled();
  });

  it("should not redirect the home page", () => {
    const req = createMockReq("/");
    const res = createMockRes();
    const next = vi.fn();

    redirectMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
