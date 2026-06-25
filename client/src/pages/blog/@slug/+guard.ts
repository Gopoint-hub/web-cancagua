import { render } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { getArticleBySlug } from "@/lib/blog-articles";

export const guard: GuardAsync = async pageContext => {
  const slug = pageContext.routeParams?.slug as string | undefined;

  if (!slug || !getArticleBySlug(slug)) {
    throw render(404, "Artículo no encontrado");
  }
};
