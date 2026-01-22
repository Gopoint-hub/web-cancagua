import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, MapPin, Phone, Star, Sparkles, Heart, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    id: 'relajacion',
    name: {
      es: 'Masaje de Relajación',
      en: 'Relaxation Massage',
      pt: 'Massagem de Relaxamento',
      fr: 'Massage de Relaxation',
      de: 'Entspannungsmassage'
    },
    description: {
      es: 'Masaje de cuerpo completo con movimientos suaves que calman la mente, mejoran la circulación y generan una profunda sensación de descanso y bienestar.',
      en: 'Full body massage with gentle movements that calm the mind, improve circulation and generate a deep sense of rest and well-being.',
      pt: 'Massagem de corpo inteiro com movimentos suaves que acalmam a mente, melhoram a circulação e geram uma profunda sensação de descanso e bem-estar.',
      fr: 'Massage du corps entier avec des mouvements doux qui calment l\'esprit, améliorent la circulation et génèrent une profonde sensation de repos et de bien-être.',
      de: 'Ganzkörpermassage mit sanften Bewegungen, die den Geist beruhigen, die Durchblutung verbessern und ein tiefes Gefühl von Ruhe und Wohlbefinden erzeugen.'
    },
    price: 'Desde $45.000',
    duration: '30-50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/masaje-relajacion.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/5bd26b48-2104-4a2b-b560-911cbeeb736e',
    icon: Sparkles
  },
  {
    id: 'descontracturante',
    name: {
      es: 'Masaje Descontracturante',
      en: 'Deep Tissue Massage',
      pt: 'Massagem Descontracturante',
      fr: 'Massage Décontracturant',
      de: 'Tiefengewebsmassage'
    },
    description: {
      es: 'Masaje de presión profunda enfocado en liberar tensiones musculares, aliviar molestias y devolver movilidad y energía al cuerpo.',
      en: 'Deep pressure massage focused on releasing muscle tension, relieving discomfort and restoring mobility and energy to the body.',
      pt: 'Massagem de pressão profunda focada em liberar tensões musculares, aliviar desconfortos e devolver mobilidade e energia ao corpo.',
      fr: 'Massage à pression profonde axé sur la libération des tensions musculaires, le soulagement des inconforts et la restauration de la mobilité et de l\'énergie du corps.',
      de: 'Tiefdruckmassage zur Lösung von Muskelverspannungen, Linderung von Beschwerden und Wiederherstellung von Mobilität und Energie im Körper.'
    },
    price: '$65.000',
    duration: '50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/masaje-descontracturante.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/792047c7-04ef-4094-b946-b7debae22798',
    icon: Sparkles
  },
  {
    id: 'mixto',
    name: {
      es: 'Masaje Mixto',
      en: 'Mixed Massage',
      pt: 'Massagem Mista',
      fr: 'Massage Mixte',
      de: 'Kombinierte Massage'
    },
    description: {
      es: 'Combinación equilibrada de técnicas de relajación y descontracturantes que permite descansar la mente y recuperar el cuerpo en una misma sesión.',
      en: 'Balanced combination of relaxation and deep tissue techniques that allows you to rest your mind and recover your body in the same session.',
      pt: 'Combinação equilibrada de técnicas de relaxamento e descontracturantes que permite descansar a mente e recuperar o corpo na mesma sessão.',
      fr: 'Combinaison équilibrée de techniques de relaxation et de décontraction qui permet de reposer l\'esprit et de récupérer le corps en une seule séance.',
      de: 'Ausgewogene Kombination aus Entspannungs- und Tiefengewebstechniken, die es ermöglicht, Geist und Körper in einer Sitzung zu erholen.'
    },
    price: '$60.000',
    duration: '50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/masaje-mixto.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/ac76988e-98b3-4f8e-aa34-d9b604bf70d2',
    icon: Sparkles
  },
  {
    id: 'drenaje',
    name: {
      es: 'Drenaje Linfático',
      en: 'Lymphatic Drainage',
      pt: 'Drenagem Linfática',
      fr: 'Drainage Lymphatique',
      de: 'Lymphdrainage'
    },
    description: {
      es: 'Experiencia rejuvenecedora que combina técnicas especializadas para promover la circulación linfática, reducir la retención de líquidos y aliviar la tensión muscular.',
      en: 'Rejuvenating experience that combines specialized techniques to promote lymphatic circulation, reduce fluid retention and relieve muscle tension.',
      pt: 'Experiência rejuvenescedora que combina técnicas especializadas para promover a circulação linfática, reduzir a retenção de líquidos e aliviar a tensão muscular.',
      fr: 'Expérience rajeunissante qui combine des techniques spécialisées pour favoriser la circulation lymphatique, réduire la rétention d\'eau et soulager les tensions musculaires.',
      de: 'Verjüngende Erfahrung, die spezialisierte Techniken kombiniert, um die Lymphzirkulation zu fördern, Wassereinlagerungen zu reduzieren und Muskelverspannungen zu lösen.'
    },
    price: '$50.000',
    duration: '50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/drenaje-linfatico.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/20c2499c-afc2-478e-81ee-4c5fee9ab8ed',
    icon: Leaf
  },
  {
    id: 'piedras',
    name: {
      es: 'Piedras Calientes',
      en: 'Hot Stones',
      pt: 'Pedras Quentes',
      fr: 'Pierres Chaudes',
      de: 'Heiße Steine'
    },
    description: {
      es: 'Masaje que utiliza el calor de piedras volcánicas para relajar profundamente los músculos, aliviar tensiones y disminuir el estrés.',
      en: 'Massage that uses the heat of volcanic stones to deeply relax muscles, relieve tension and reduce stress.',
      pt: 'Massagem que utiliza o calor de pedras vulcânicas para relaxar profundamente os músculos, aliviar tensões e diminuir o estresse.',
      fr: 'Massage qui utilise la chaleur des pierres volcaniques pour détendre profondément les muscles, soulager les tensions et réduire le stress.',
      de: 'Massage, der die Wärme von Vulkansteinen nutzt, um die Muskeln tief zu entspannen, Verspannungen zu lösen und Stress abzubauen.'
    },
    price: '$58.000',
    duration: '50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/piedras-calientes.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/5b2356cb-9422-4d0d-9cd5-a2ea56b7608a',
    icon: Sparkles
  },
  {
    id: 'reflexologia',
    name: {
      es: 'Reflexología',
      en: 'Reflexology',
      pt: 'Reflexologia',
      fr: 'Réflexologie',
      de: 'Reflexologie'
    },
    description: {
      es: 'Terapia que estimula puntos de reflejo en pies, manos u otras zonas del cuerpo, favoreciendo el equilibrio natural de los sistemas internos y promoviendo el bienestar físico y mental.',
      en: 'Therapy that stimulates reflex points on feet, hands or other areas of the body, promoting the natural balance of internal systems and physical and mental well-being.',
      pt: 'Terapia que estimula pontos de reflexo nos pés, mãos ou outras áreas do corpo, favorecendo o equilíbrio natural dos sistemas internos e promovendo o bem-estar físico e mental.',
      fr: 'Thérapie qui stimule les points réflexes des pieds, des mains ou d\'autres zones du corps, favorisant l\'équilibre naturel des systèmes internes et le bien-être physique et mental.',
      de: 'Therapie, die Reflexpunkte an Füßen, Händen oder anderen Körperbereichen stimuliert und das natürliche Gleichgewicht der inneren Systeme sowie das körperliche und geistige Wohlbefinden fördert.'
    },
    price: '$48.000',
    duration: '40 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/reflexologia.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/dbeddcc3-aa28-42ce-b127-d9cb55f1c63a',
    icon: Sparkles
  },
  {
    id: 'prenatal',
    name: {
      es: 'Masaje Prenatal',
      en: 'Prenatal Massage',
      pt: 'Massagem Pré-natal',
      fr: 'Massage Prénatal',
      de: 'Schwangerschaftsmassage'
    },
    description: {
      es: 'Masaje suave para mujeres embarazadas desde la novena semana, que ayuda a aliviar la tensión lumbar, la retención de líquidos y promueve el descanso.',
      en: 'Gentle massage for pregnant women from the ninth week, which helps relieve lower back tension, fluid retention and promotes rest.',
      pt: 'Massagem suave para mulheres grávidas a partir da nona semana, que ajuda a aliviar a tensão lombar, a retenção de líquidos e promove o descanso.',
      fr: 'Massage doux pour les femmes enceintes à partir de la neuvième semaine, qui aide à soulager les tensions lombaires, la rétention d\'eau et favorise le repos.',
      de: 'Sanfte Massage für Schwangere ab der neunten Woche, die hilft, Rückenverspannungen und Wassereinlagerungen zu lindern und die Erholung fördert.'
    },
    price: '$60.000',
    duration: '50 min',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/prenatal.webp',
    bookingUrl: 'https://hcdl.cancagua.cl/hcdl/s/ae2d86b0-0415-4ca1-8128-b56370e2545e',
    icon: Heart
  }
];

const translations = {
  es: {
    heroTitle: 'SPA Hotel Cabañas del Lago',
    heroSubtitle: 'Masajes y bienestar para reconectar cuerpo y alma',
    heroLocation: 'Puerto Varas, Chile',
    bookNow: 'Reservar Ahora',
    servicesTitle: 'Nuestros Servicios',
    servicesSubtitle: 'Descubre nuestra variedad de tratamientos diseñados para tu bienestar',
    duration: 'Duración',
    price: 'Precio',
    book: 'Reservar',
    locationTitle: 'Ubicación',
    locationAddress: 'Hotel Cabañas del Lago, Puerto Varas',
    locationDesc: 'Ubicado en el corazón de Puerto Varas, con vistas al Lago Llanquihue y los volcanes Osorno y Calbuco.',
    contactTitle: 'Contacto',
    contactPhone: '+56 9 1234 5678',
    hoursTitle: 'Horario',
    hoursText: 'Lunes a Domingo: 14:00 - 20:00',
    ctaTitle: '¿Listo para relajarte?',
    ctaSubtitle: 'Reserva tu sesión de masaje y vive una experiencia única de bienestar',
    ctaButton: 'Ver Disponibilidad'
  },
  en: {
    heroTitle: 'SPA Hotel Cabañas del Lago',
    heroSubtitle: 'Massages and wellness to reconnect body and soul',
    heroLocation: 'Puerto Varas, Chile',
    bookNow: 'Book Now',
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Discover our variety of treatments designed for your well-being',
    duration: 'Duration',
    price: 'Price',
    book: 'Book',
    locationTitle: 'Location',
    locationAddress: 'Hotel Cabañas del Lago, Puerto Varas',
    locationDesc: 'Located in the heart of Puerto Varas, with views of Lake Llanquihue and the Osorno and Calbuco volcanoes.',
    contactTitle: 'Contact',
    contactPhone: '+56 9 1234 5678',
    hoursTitle: 'Hours',
    hoursText: 'Monday to Sunday: 2:00 PM - 8:00 PM',
    ctaTitle: 'Ready to relax?',
    ctaSubtitle: 'Book your massage session and live a unique wellness experience',
    ctaButton: 'Check Availability'
  },
  pt: {
    heroTitle: 'SPA Hotel Cabañas del Lago',
    heroSubtitle: 'Massagens e bem-estar para reconectar corpo e alma',
    heroLocation: 'Puerto Varas, Chile',
    bookNow: 'Reservar Agora',
    servicesTitle: 'Nossos Serviços',
    servicesSubtitle: 'Descubra nossa variedade de tratamentos projetados para o seu bem-estar',
    duration: 'Duração',
    price: 'Preço',
    book: 'Reservar',
    locationTitle: 'Localização',
    locationAddress: 'Hotel Cabañas del Lago, Puerto Varas',
    locationDesc: 'Localizado no coração de Puerto Varas, com vista para o Lago Llanquihue e os vulcões Osorno e Calbuco.',
    contactTitle: 'Contato',
    contactPhone: '+56 9 1234 5678',
    hoursTitle: 'Horário',
    hoursText: 'Segunda a Domingo: 14:00 - 20:00',
    ctaTitle: 'Pronto para relaxar?',
    ctaSubtitle: 'Reserve sua sessão de massagem e viva uma experiência única de bem-estar',
    ctaButton: 'Ver Disponibilidade'
  },
  fr: {
    heroTitle: 'SPA Hotel Cabañas del Lago',
    heroSubtitle: 'Massages et bien-être pour reconnecter corps et âme',
    heroLocation: 'Puerto Varas, Chili',
    bookNow: 'Réserver Maintenant',
    servicesTitle: 'Nos Services',
    servicesSubtitle: 'Découvrez notre variété de soins conçus pour votre bien-être',
    duration: 'Durée',
    price: 'Prix',
    book: 'Réserver',
    locationTitle: 'Emplacement',
    locationAddress: 'Hotel Cabañas del Lago, Puerto Varas',
    locationDesc: 'Situé au cœur de Puerto Varas, avec vue sur le lac Llanquihue et les volcans Osorno et Calbuco.',
    contactTitle: 'Contact',
    contactPhone: '+56 9 1234 5678',
    hoursTitle: 'Horaires',
    hoursText: 'Lundi au Dimanche: 14h00 - 20h00',
    ctaTitle: 'Prêt à vous détendre?',
    ctaSubtitle: 'Réservez votre séance de massage et vivez une expérience unique de bien-être',
    ctaButton: 'Voir Disponibilité'
  },
  de: {
    heroTitle: 'SPA Hotel Cabañas del Lago',
    heroSubtitle: 'Massagen und Wellness zur Wiederverbindung von Körper und Seele',
    heroLocation: 'Puerto Varas, Chile',
    bookNow: 'Jetzt Buchen',
    servicesTitle: 'Unsere Dienstleistungen',
    servicesSubtitle: 'Entdecken Sie unsere Vielfalt an Behandlungen für Ihr Wohlbefinden',
    duration: 'Dauer',
    price: 'Preis',
    book: 'Buchen',
    locationTitle: 'Standort',
    locationAddress: 'Hotel Cabañas del Lago, Puerto Varas',
    locationDesc: 'Im Herzen von Puerto Varas gelegen, mit Blick auf den Llanquihue-See und die Vulkane Osorno und Calbuco.',
    contactTitle: 'Kontakt',
    contactPhone: '+56 9 1234 5678',
    hoursTitle: 'Öffnungszeiten',
    hoursText: 'Montag bis Sonntag: 14:00 - 20:00',
    ctaTitle: 'Bereit zum Entspannen?',
    ctaSubtitle: 'Buchen Sie Ihre Massagesitzung und erleben Sie ein einzigartiges Wellness-Erlebnis',
    ctaButton: 'Verfügbarkeit Prüfen'
  }
};

export default function SpaHCDL() {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/hcdl/masaje-relajacion.webp)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{t.heroLocation}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 tracking-wide">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-white/90">
            {t.heroSubtitle}
          </p>
          <a 
            href="https://hcdl.cancagua.cl/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-[#8B7355] hover:bg-[#6B5A45] text-white px-8 py-6 text-lg rounded-full"
            >
              {t.bookNow}
            </Button>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E2D] mb-4">
              {t.servicesTitle}
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name[language as keyof typeof service.name] || service.name.es}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {service.name[language as keyof typeof service.name] || service.name.es}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </span>
                        <span className="font-semibold">{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                      {service.description[language as keyof typeof service.description] || service.description.es}
                    </p>
                    <a 
                      href={service.bookingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        className="w-full bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white"
                      >
                        {t.book}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-[#2C3E2D] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-10 h-10 mx-auto mb-4 text-[#C4A77D]" />
              <h3 className="text-xl font-semibold mb-2">{t.locationTitle}</h3>
              <p className="text-white/80">{t.locationAddress}</p>
            </div>
            <div>
              <Phone className="w-10 h-10 mx-auto mb-4 text-[#C4A77D]" />
              <h3 className="text-xl font-semibold mb-2">{t.contactTitle}</h3>
              <p className="text-white/80">{t.contactPhone}</p>
            </div>
            <div>
              <Clock className="w-10 h-10 mx-auto mb-4 text-[#C4A77D]" />
              <h3 className="text-xl font-semibold mb-2">{t.hoursTitle}</h3>
              <p className="text-white/80">{t.hoursText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-12 h-12 mx-auto mb-6 text-[#C4A77D]" />
          <h2 className="text-3xl md:text-4xl font-serif text-[#2C3E2D] mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            {t.ctaSubtitle}
          </p>
          <a 
            href="https://hcdl.cancagua.cl/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-[#8B7355] hover:bg-[#6B5A45] text-white px-10 py-6 text-lg rounded-full"
            >
              {t.ctaButton}
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
