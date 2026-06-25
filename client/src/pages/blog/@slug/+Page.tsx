import { Calendar, Clock, Phone, User } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";
import { Button } from "@/components/ui/button";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getArticleBySlug } from "@/lib/blog-articles";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="relative min-h-[460px] overflow-hidden bg-[#2d3e2f] pt-24">
        {article.image && (
          <img
            src={article.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a1c] via-[#1a2a1c]/70 to-[#1a2a1c]/30" />

        <div className="container relative z-10 flex min-h-[360px] max-w-5xl flex-col justify-end px-4 pb-12">
          <a
            href="/blog"
            className="mb-6 text-sm font-medium text-white/80 hover:text-white"
          >
            Volver al blog
          </a>
          <span className="mb-4 inline-block w-fit rounded-full bg-[#c4a86b] px-3 py-1 text-sm font-medium text-white">
            {article.category}
          </span>
          <h1 className="max-w-4xl text-3xl font-serif font-bold leading-tight text-white md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime} de lectura
            </span>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-12">
        <p className="mb-10 border-l-4 border-[#c4a86b] pl-6 text-xl font-light italic leading-relaxed text-gray-600">
          {article.excerpt}
        </p>

        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2d3e2f] prose-headings:mt-12 prose-headings:mb-6 prose-p:text-gray-700 prose-p:leading-[1.9] prose-p:mb-7 prose-a:text-[#9f8247] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2d3e2f] prose-li:marker:text-[#c4a86b] prose-li:mb-3 prose-ul:my-7">
          <MarkdownContent content={article.content} />
        </article>

        <section className="mt-12 rounded-lg bg-gradient-to-br from-[#2d3e2f] to-[#1a2a1c] p-8 text-white">
          <h2 className="mb-3 text-2xl font-serif font-bold">
            ¿Listo para vivir la experiencia Cancagua?
          </h2>
          <p className="mb-6 text-white/80">
            Reserva tu visita a las primeras biopiscinas geotermales del mundo y
            descubre una nueva forma de bienestar.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20reservar%20una%20visita%20a%20Cancagua"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#c4a86b] text-white hover:bg-[#b39a5c]">
                <Phone className="mr-2 h-4 w-4" />
                Reservar por WhatsApp
              </Button>
            </a>
            <a href="/servicios">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Ver Servicios
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
