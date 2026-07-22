import { Calendar, Clock, User } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getArticleBySlug } from "@/lib/blog-articles";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) return null;

  return (
    <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
      <header className="relative min-h-[620px] overflow-hidden bg-[#1B212D] pt-24 text-[#FCF9F9]">
        <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#1B212D]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B212D] via-[#1B212D]/35 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-6xl flex-col justify-end px-6 pb-16 md:pb-20">
          <a href="/blog" className="font-cg-mono mb-10 text-xs uppercase tracking-[0.18em] text-[#D7D4D1] hover:text-white">← VOLVER AL BLOG</a>
          <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">{article.category} · CANCAGUA</p>
          <h1 className="font-cg-serif mt-6 max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.025em] md:text-6xl lg:text-7xl">{article.title}</h1>
          <div className="font-cg-soft mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/25 pt-6 text-sm text-[#D7D4D1]">
            <span className="flex items-center gap-2"><User className="h-4 w-4" />{article.author}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{article.date}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{article.readTime} de lectura</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="font-cg-serif mb-16 border-y border-black/15 py-10 text-2xl font-normal italic leading-relaxed text-[#333D51] md:text-3xl">{article.excerpt}</p>
        <article className="cg-blog-prose"><MarkdownContent content={article.content} /></article>

        <section className="mt-20 rounded-[20px] bg-[#333D51] p-8 text-[#FCF9F9] md:p-12">
          <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#CCD1DB]">RESTORE · SPA & NATURE</p>
          <h2 className="font-cg-sans mt-5 text-3xl font-light leading-tight md:text-4xl">El cuerpo también reconoce el camino de vuelta.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#D7D4D1]">Descubre experiencias creadas para recuperar calma, claridad y equilibrio en Frutillar.</p>
          <a href="/servicios" className="font-cg-mono mt-8 inline-flex rounded-full bg-[#FCF9F9] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#333D51]">DESCUBRIR EXPERIENCIAS →</a>
        </section>
      </main>
    </div>
  );
}
