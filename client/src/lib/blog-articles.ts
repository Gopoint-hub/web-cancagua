export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  seoDescription: string;
  keywords: string[];
  image?: string;
  date: string;
  dateISO: string;
  author: string;
  readTime: string;
  category: string;
  status: string;
  content: string;
}

type FrontmatterValue = string | string[];
type Frontmatter = Record<string, FrontmatterValue>;

const DEFAULT_BLOG_IMAGE =
  "https://res.cloudinary.com/dhuln9b1n/image/upload/v1769960664/cancagua/images/logo-cancagua-white.webp";

const markdownFiles = import.meta.glob("../../../blog-articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(markdown: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: markdown.trim() };
  }

  const frontmatter: Frontmatter = {};
  const [, rawFrontmatter, content] = match;

  rawFrontmatter.split("\n").forEach(line => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    if (!key) return;

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      frontmatter[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map(item => stripQuotes(item.trim()))
        .filter(Boolean);
      return;
    }

    frontmatter[key] = stripQuotes(rawValue);
  });

  return { frontmatter, content: content.trim() };
}

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function asString(value: FrontmatterValue | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.length > 0) return [value];
  return [];
}

function getSlugFromFilePath(filePath: string): string {
  const fileName = filePath.split("/").pop()?.replace(/\.md$/, "") ?? "";
  return fileName.replace(/-\d{4}-\d{2}-\d{2}$/, "");
}

function formatDate(dateISO: string): string {
  const [year, month, day] = dateISO.split("-").map(Number);
  if (!year || !month || !day) return dateISO;

  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

function buildExcerpt(content: string): string {
  const plainText = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 165
    ? `${plainText.slice(0, 162).trim()}...`
    : plainText;
}

const parsedArticles = Object.entries(markdownFiles).map(
  ([filePath, rawMarkdown]) => {
    const { frontmatter, content } = parseFrontmatter(rawMarkdown);
    const slug = asString(frontmatter.slug, getSlugFromFilePath(filePath));
    const title = asString(frontmatter.title, slug);
    const dateISO = asString(frontmatter.date);
    const metaDescription = asString(
      frontmatter.metaDescription,
      buildExcerpt(content)
    );

    return {
      slug,
      title,
      seoTitle: `${title} | Cancagua`,
      excerpt: metaDescription,
      seoDescription: metaDescription,
      keywords: asArray(frontmatter.keywords),
      image: asString(frontmatter.image, DEFAULT_BLOG_IMAGE),
      date: formatDate(dateISO),
      dateISO,
      author: asString(frontmatter.author, "Cancagua"),
      readTime: estimateReadTime(content),
      category: asString(frontmatter.category, "Bienestar"),
      status: asString(frontmatter.status, "draft"),
      content,
    } satisfies BlogArticle;
  }
);

export const blogArticles: BlogArticle[] = parsedArticles
  .filter(article => article.status === "published")
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO));

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogArticles.map(article => article.slug);
}
