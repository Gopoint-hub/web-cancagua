import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, MapPin, Calendar, Heart, Sparkles, Check, AlertCircle,
  Globe, User, Award, ExternalLink
} from "lucide-react";


export default function HeartCoherenceWorkshop() {
  const benefits = [
    "Cultivate inner calm and clarity amidst stress and overwhelm",
    "Strengthen the heart–mind connection for deeper intuition and self-trust",
    "Balance the nervous system through breath, rhythm, and somatic awareness"
  ];

  const practices = [
    {
      title: "Somatic Movement",
      description: "Reconnect with your body's innate intelligence through mindful movement"
    },
    {
      title: "Conscious Breathwork",
      description: "Support emotional regulation and nervous system balance"
    },
    {
      title: "Mantra Practices",
      description: "Create internal conditions for natural alignment to emerge"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2099')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container pb-16 text-white">
          <div className="max-w-4xl space-y-6">
            {/* Language Alert */}
            <div className="inline-flex items-center gap-3 bg-rose-600/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">Sesión dictada en INGLÉS // This session will be held in English</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-josefin font-bold tracking-tight">
              Heart Coherence Workshop
            </h1>
            <p className="text-3xl text-white/90 font-light">
              Align Your Heart, Mind & Emotions
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Viernes 16 de Enero</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">10:00 - 12:00</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Cancagua Spa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Heart Coherence */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
              <Heart className="h-8 w-8 text-rose-600" />
            </div>
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              What is Heart Coherence?
            </h2>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                Heart coherence is a <strong>measurable state of physiological and emotional alignment</strong> in which the rhythms of the heart, nervous system, and brain come into harmony. In this state, the body shifts out of stress-driven survival patterns and into regulation, clarity, and resilience.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                This immersive 2-hour experiential workshop is an invitation to <strong>move beyond theory and into direct embodied experience</strong>. Through somatic movement, conscious breathwork, and mantra practices, you will be guided to reconnect with your body's innate intelligence and the deeper wisdom of the heart.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Practices */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-4xl font-josefin font-bold text-stone-800">
                Workshop Practices
              </h2>
              <p className="text-lg text-stone-600">
                Designed to support emotional regulation, nervous system balance, and a felt sense of inner coherence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {practices.map((practice, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-josefin font-bold text-stone-800">
                      {practice.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      {practice.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-4">
              <Heart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-semibold text-blue-900">A Natural Approach</p>
                <p className="text-blue-800">
                  Rather than "fixing" or forcing change, this session creates the internal conditions for alignment to naturally emerge. As the heart, mind, and emotions come into rhythm, many participants experience greater clarity, emotional ease, and a renewed sense of connection—to themselves and to others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              Benefits
            </h2>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-lg text-stone-700 leading-relaxed pt-2">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-96 md:h-auto">
                  <img
                    src="/images/sonja-bloder.png"
                    alt="Sonja Bloder"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full w-fit">
                    <User className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-900">Facilitadora / Facilitator</span>
                  </div>

                  <h3 className="text-3xl font-josefin font-bold text-stone-800">
                    Sonja Bloder
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-stone-800">Certified Somatic Coach</p>
                        <p className="text-sm text-stone-600">(trauma-informed)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                      <p className="font-semibold text-stone-800">Breathwork Practitioner</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                      <p className="font-semibold text-stone-800">Yoga Teacher</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                      <p className="font-semibold text-stone-800">Retreat Host</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <a 
                      href="https://www.sonjaandyoga.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <Globe className="h-4 w-4" />
                      www.sonjaandyoga.com
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a 
                      href="https://instagram.com/somatic.embodiment.sonja" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <Globe className="h-4 w-4" />
                      @somatic.embodiment.sonja
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-rose-600 to-purple-700 p-12 text-center text-white space-y-6">
              <Heart className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-4xl font-josefin font-bold">
                Reserve Your Space
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join us for this transformative 2-hour journey into heart coherence and embodied alignment
              </p>
              <div className="flex flex-col items-center gap-2 text-white/90 pt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">Friday, January 16 | 10:00–12:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Cancagua Spa & Retreat Center</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a 
                  href="https://reservas.cancagua.cl/cancaguaspa/s/17d02af1-495c-426e-b42b-981495b85b77"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-rose-600 hover:bg-stone-100 font-semibold">
                    Book Now / Reservar Ahora
                  </Button>
                </a>
                <a href="https://wa.me/56940073999" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us / Contáctanos
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
