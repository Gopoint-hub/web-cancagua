import type { Express, Request, Response } from "express";

type InstagramReel = {
  id: string;
  permalink: string;
  caption?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  timestamp?: string;
};

type CacheEntry = {
  expiresAt: number;
  data: InstagramReel[];
};

const CACHE_TTL_MS = 15 * 60 * 1000;
let reelsCache: CacheEntry | null = null;
let igUserIdCache: string | null = process.env.INSTAGRAM_USER_ID || null;

function jsonError(message: string, status = 503) {
  return { error: message, reels: [], status };
}

async function graphGet<T>(path: string, params: Record<string, string>, accessToken: string): Promise<T> {
  const url = new URL(`https://graph.facebook.com/v21.0/${path.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url);
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = payload?.error?.message || `Meta Graph respondió HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

async function resolveInstagramUserId(accessToken: string): Promise<string> {
  if (igUserIdCache) return igUserIdCache;

  const pages = await graphGet<{ data?: Array<{ instagram_business_account?: { id: string } }> }>(
    "/me/accounts",
    { fields: "instagram_business_account{id,username}" },
    accessToken,
  );

  const igAccount = pages.data?.find((page) => page.instagram_business_account?.id)?.instagram_business_account;
  if (!igAccount?.id) {
    throw new Error("No encontré una cuenta Instagram Business conectada al token Meta.");
  }

  igUserIdCache = igAccount.id;
  return igUserIdCache;
}

async function fetchLatestReels(): Promise<InstagramReel[]> {
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("META_ACCESS_TOKEN no está configurado.");
  }

  const igUserId = await resolveInstagramUserId(accessToken);
  const media = await graphGet<{
    data?: Array<{
      id: string;
      caption?: string;
      media_type?: string;
      media_product_type?: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink?: string;
      timestamp?: string;
    }>;
  }>(
    `/${igUserId}/media`,
    {
      fields: "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
      limit: "12",
    },
    accessToken,
  );

  return (media.data || [])
    .filter((item) => item.permalink && (item.media_product_type === "REELS" || item.media_type === "VIDEO"))
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      permalink: item.permalink!,
      caption: item.caption,
      thumbnailUrl: item.thumbnail_url || item.media_url,
      mediaUrl: item.media_url,
      timestamp: item.timestamp,
    }));
}

export function registerInstagramRoutes(app: Express) {
  app.get("/api/instagram/reels", async (_req: Request, res: Response) => {
    try {
      if (reelsCache && reelsCache.expiresAt > Date.now()) {
        return res.json({ reels: reelsCache.data, cached: true });
      }

      const reels = await fetchLatestReels();
      reelsCache = { data: reels, expiresAt: Date.now() + CACHE_TTL_MS };

      res.setHeader("Cache-Control", "public, max-age=300, s-maxage=900");
      return res.json({ reels, cached: false });
    } catch (error: any) {
      console.error("[Instagram] No se pudieron cargar los últimos reels:", error?.message || error);

      if (reelsCache?.data?.length) {
        return res.json({ reels: reelsCache.data, cached: true, warning: "using-stale-cache" });
      }

      return res.status(503).json(jsonError(error?.message || "No se pudieron cargar los reels de Instagram"));
    }
  });
}
