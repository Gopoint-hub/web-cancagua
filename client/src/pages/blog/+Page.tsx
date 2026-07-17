import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
import { blogArticles } from "@/lib/blog-articles";

export default function Page() {
  const featuredArticle = blogArticles[0];
  const otherArticles = blogArticles.slice(1);

  return (
    <AutoTranslateProvider pageId="blog">
      <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
        <header className="border-b border-white/20 bg-[#1B212D] px-6 pb-20 pt-32 text-[#FCF9F9] md:pb-28">
          <div className="mx-auto max-w-6xl">
            <p className="font-cg-mono mb-8 text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">
              CANCAGUA · CUERPO, MÉTODO Y NATURALEZA
            </p>
            <div className="max-w-4xl">
              <h1 className="font-cg-serif text-5xl font-normal leading-[1.05] tracking-[-0.02em] md:text-7xl">
                <T>Historias para volver al cuerpo.</T>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#D7D4D1] md:text-xl">
                <T>Conocimiento, experiencias y preguntas sobre bienestar en el sur de Chile.</T>
              </p>
            </div>
          </div>
        </header>

        {featuredArticle ? (
          <main>
            <section className="px-6 py-16 md:py-24">
              <a
                href={`/blog/${featuredArticle.slug}`}
                className="group mx-auto grid max-w-6xl overflow-hidden rounded-[20px] border border-black/10 bg-[#FCF9F9] transition-transform duration-300 hover:-translate-y-1 md:grid-cols-2"
              >
                <div className="min-h-[320px] overflow-hidden md:min-h-[560px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-col justify-between p-8 md:p-14">
                  <div>
                    <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#696F4D]">
                      {featuredArticle.category} · NUEVO
                    </p>
                    <h2 className="font-cg-serif mt-8 text-4xl font-normal leading-[1.12] tracking-[-0.02em] text-[#222221] md:text-5xl">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-7 text-base leading-relaxed text-[#635E5A] md:text-lg">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="mt-12">
                    <div className="font-cg-soft flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-6 text-sm text-[#827D78]">
                      <span className="flex items-center gap-2"><User className="h-4 w-4" />{featuredArticle.author}</span>
                      <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{featuredArticle.date}</span>
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{featuredArticle.readTime}</span>
                    </div>
                    <span className="font-cg-mono mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-[#333D51]">
                      LEER ARTÍCULO <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </section>

            {otherArticles.length > 0 && (
              <section className="border-t border-black/10 bg-[#FCF9F9] px-6 py-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                  <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#696F4D]">ARCHIVO EDITORIAL</p>
                  <h2 className="font-cg-serif mt-5 text-4xl font-normal text-[#222221] md:text-5xl">Más historias</h2>
                  <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {otherArticles.map(article => (
                      <a key={article.slug} href={`/blog/${article.slug}`} className="group overflow-hidden rounded-[20px] border border-black/10 bg-white">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                        </div>
                        <div className="p-7">
                          <p className="font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#696F4D]">{article.category}</p>
                          <h3 className="font-cg-serif mt-4 text-2xl font-normal leading-tight text-[#222221]">{article.title}</h3>
                          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#635E5A]">{article.excerpt}</p>
                          <div className="font-cg-soft mt-7 flex justify-between border-t border-black/10 pt-5 text-xs text-[#827D78]">
                            <span>{article.date}</span><span>{article.readTime}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        ) : (
          <section className="px-6 py-24 text-center">
            <h2 className="font-cg-serif text-4xl font-normal"><T>Estamos preparando nuevas historias.</T></h2>
          </section>
        )}

        <section className="bg-[#333D51] px-6 py-20 text-[#FCF9F9]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">EL MUNDO CANCAGUA</p>
            <h2 className="font-cg-serif mt-6 text-4xl font-normal leading-tight md:text-5xl"><T>Una pausa también puede ser un comienzo.</T></h2>
            <a href="/servicios" className="font-cg-mono mt-10 inline-flex rounded-full bg-[#FCF9F9] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#333D51]">
              <T>DESCUBRIR EXPERIENCIAS →</T>
            </a>
          </div>
        </section>
      </div>
    </AutoTranslateProvider>
  );
}
