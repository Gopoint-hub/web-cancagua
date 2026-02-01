import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ChevronRight, Facebook, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  relatedArticles?: BlogArticle[];
}

const defaultRelatedArticles: BlogArticle[] = [
  {
    slug: 'mejores-termas-sur-chile-2026',
    title: 'Las 10 mejores termas del sur de Chile 2026',
    excerpt: 'Guía completa para elegir la experiencia termal perfecta según tu perfil.',
    image: '/images/blog/termas-geometricas-hero.webp',
    date: '19 Enero 2026',
    author: 'Mario Hermosilla',
    readTime: '12 min',
    category: 'Guías'
  },
  {
    slug: 'termas-del-sur-de-chile-con-ninos-guia-para-familias',
    title: 'Termas del Sur de Chile con Niños: Guía para Familias',
    excerpt: 'Todo lo que necesitas saber para planificar unas vacaciones termales con niños.',
    image: '/images/blog/termas-ninos-familias-hero.webp',
    date: '6 Enero 2026',
    author: 'Mario Hermosilla',
    readTime: '10 min',
    category: 'Familias'
  },
  {
    slug: 'tecnicas-manejo-estres-laboral',
    title: 'Manejo del Estrés Laboral: Técnicas Probadas por la Ciencia',
    excerpt: 'Estrategias científicamente validadas para manejar el estrés en el trabajo.',
    image: '/images/blog/manejo-estres-laboral-hero.webp',
    date: '12 Noviembre 2025',
    author: 'Mario Hermosilla',
    readTime: '15 min',
    category: 'Bienestar'
  },
  {
    slug: 'termas-del-sur-vs-experiencia-natural',
    title: 'Termas Tradicionales vs Experiencia Natural',
    excerpt: 'Comparativa completa entre termas volcánicas y biopiscinas naturales.',
    image: '/images/blog/termas-vs-experiencia-natural-hero.avif',
    date: '29 Octubre 2025',
    author: 'Mario Hermosilla',
    readTime: '11 min',
    category: 'Comparativas'
  }
];

export function BlogLayout({
  children,
  title,
  excerpt,
  image,
  date,
  author,
  readTime,
  category,
  relatedArticles = defaultRelatedArticles
}: BlogLayoutProps) {
  const currentSlug = window.location.pathname.split('/').pop();
  const filteredArticles = relatedArticles.filter(a => a.slug !== currentSlug).slice(0, 3);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container max-w-5xl">
            <span className="inline-block px-3 py-1 bg-[#c4a86b] text-white text-sm font-medium rounded-full mb-4">
              {category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} de lectura
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-6xl py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light italic border-l-4 border-[#c4a86b] pl-6">
              {excerpt}
            </p>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2d3e2f] prose-headings:mt-12 prose-headings:mb-8 prose-p:text-gray-700 prose-p:leading-[1.9] prose-p:mb-8 prose-a:text-[#c4a86b] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2d3e2f] prose-blockquote:border-l-[#c4a86b] prose-blockquote:bg-[#f5f0e8] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-10 prose-li:marker:text-[#c4a86b] prose-li:mb-4 prose-ul:my-8 prose-ol:my-8 [&>h2]:mt-14 [&>h3]:mt-10">
              {children}
            </div>

            {/* CTA Box */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#2d3e2f] to-[#1a2a1c] rounded-2xl text-white">
              <h3 className="text-2xl font-serif font-bold mb-3">
                ¿Listo para vivir la experiencia Cancagua?
              </h3>
              <p className="text-white/80 mb-6">
                Reserva tu visita a las primeras biopiscinas geotermales del mundo y descubre una nueva forma de bienestar.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20reservar%20una%20visita%20a%20Cancagua"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#c4a86b] hover:bg-[#b39a5c] text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Reservar por WhatsApp
                  </Button>
                </a>
                <Link href="/servicios">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Ver Servicios
                  </Button>
                </Link>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Compartir este artículo
              </h4>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1877f2] text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1da1f2] text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0077b5] text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
                  className="p-3 bg-gray-600 text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Sticky Container */}
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* CTA Card */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="h-32 bg-gradient-to-br from-[#c4a86b] to-[#a08550] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/images/logo-cancagua-white.png"
                      alt="Cancagua"
                      className="h-16 opacity-90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#2d3e2f] mb-2">
                    Visita Cancagua
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Biopiscinas geotermales, hot tubs, masajes y más. A orillas del Lago Llanquihue.
                  </p>
                  <a
                    href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20información%20sobre%20Cancagua"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-[#2d3e2f] hover:bg-[#1a2a1c]">
                      Reservar Ahora
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2d3e2f] mb-4">
                  Artículos Relacionados
                </h3>
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`}>
                      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-3 flex flex-col justify-center">
                            <h4 className="font-medium text-sm text-[#2d3e2f] line-clamp-2 leading-tight">
                              {article.title}
                            </h4>
                            <span className="text-xs text-gray-500 mt-1">
                              {article.readTime} de lectura
                            </span>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <Card className="border-0 shadow-lg bg-[#f5f0e8]">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-bold text-[#2d3e2f] mb-2">
                    Suscríbete al Newsletter
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Recibe consejos de bienestar y ofertas exclusivas.
                  </p>
                  <Link href="/#newsletter">
                    <Button variant="outline" className="w-full border-[#c4a86b] text-[#c4a86b] hover:bg-[#c4a86b] hover:text-white">
                      Suscribirme
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="text-center text-sm text-gray-500">
                <p className="mb-2">¿Tienes preguntas?</p>
                <a
                  href="tel:+56940073999"
                  className="text-[#c4a86b] hover:underline font-medium"
                >
                  +56 9 4007 3999
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* More Articles Section */}
      <div className="bg-white py-16">
        <div className="container max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2d3e2f]">
              Más Artículos
            </h2>
            <Link href="/blog">
              <Button variant="ghost" className="text-[#c4a86b] hover:text-[#b39a5c]">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group h-full">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <span className="text-xs text-[#c4a86b] font-medium">
                      {article.category}
                    </span>
                    <h3 className="font-serif font-bold text-[#2d3e2f] mt-1 line-clamp-2 group-hover:text-[#c4a86b] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {article.readTime} de lectura
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogLayout;
