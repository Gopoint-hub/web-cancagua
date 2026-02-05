import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { AutoTranslateProvider, T } from '@/components/AutoTranslate';
import { blogArticles } from '@/lib/blog-articles';

// Use centralized blog articles configuration
const articles = blogArticles;

export default function Page() {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <AutoTranslateProvider pageId="blog">
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-[#2d3e2f] to-[#1a2a1c]">
          <div className="container max-w-6xl px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                <T>Blog de Bienestar</T>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                <T>Guías, consejos y experiencias sobre termas, bienestar y vida consciente en el sur de Chile.</T>
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12">
          <div className="container max-w-6xl px-4">
            <Link href={`/blog/${featuredArticle.slug}`}>
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-white">
                    <span className="inline-block px-3 py-1 bg-[#c4a86b]/10 text-[#c4a86b] text-sm font-medium rounded-full w-fit mb-4">
                      <T>{featuredArticle.category}</T>
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2d3e2f] mb-4 group-hover:text-[#c4a86b] transition-colors">
                      <T>{featuredArticle.title}</T>
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      <T>{featuredArticle.excerpt}</T>
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredArticle.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <Button className="w-fit bg-[#2d3e2f] hover:bg-[#1a2a1c] text-white">
                      <T>Leer artículo</T>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Other Articles */}
        <section className="py-12 bg-white">
          <div className="container max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2d3e2f] mb-8">
              <T>Más Artículos</T>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <span className="text-xs text-[#c4a86b] font-medium uppercase tracking-wider">
                        <T>{article.category}</T>
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#2d3e2f] mt-2 mb-3 group-hover:text-[#c4a86b] transition-colors line-clamp-2">
                        <T>{article.title}</T>
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        <T>{article.excerpt}</T>
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#c4a86b] to-[#a08550]">
          <div className="container max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              <T>¿Listo para vivir la experiencia?</T>
            </h2>
            <p className="text-xl text-white/90 mb-8">
              <T>Reserva tu visita a las primeras biopiscinas geotermales del mundo.</T>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20reservar%20una%20visita%20a%20Cancagua"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-[#2d3e2f] hover:bg-gray-100">
                  <T>Reservar por WhatsApp</T>
                </Button>
              </a>
              <Link href="/servicios">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <T>Ver Servicios</T>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AutoTranslateProvider>
  );
}
