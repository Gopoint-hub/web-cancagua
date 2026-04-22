import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Moon, Coffee, UtensilsCrossed, Leaf, Droplets, CheckCircle2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -skew-y-3 transform origin-top-left -z-10" />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Experiencia de Bienestar</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                Reset: Una Pausa Consciente
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                Comienza o finaliza tu día con una pausa consciente en medio de la naturaleza. 🌿 Disfruta de alimentación nutritiva, seguido de un momento de relajación en nuestras Biopiscinas Geotermales.
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform"
                onClick={() => window.open("https://reservas.cancagua.cl/cancaguaspa/s/9dafaba2-53b4-4eb3-838f-39b2168827fa", "_blank")}
              >
                Reservar mi Pausa Consciente
              </Button>
            </div>
            <div className="flex-1 w-full max-w-md mx-auto md:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
                <img 
                  src="https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/d7fb8a3878714e9091e5a2e33f69e292.jpeg" 
                  alt="Biopiscinas Geotermales - Experiencia Reset" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Options Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4">Elige tu Momento</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Selecciona cómo deseas vivir tu experiencia de bienestar.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Morning Option */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-orange-50 to-amber-50/50 overflow-hidden group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sun className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">Morning Reset</h3>
                <p className="text-orange-600 font-medium mb-6">Horarios: 10:00 o 11:00 hrs</p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">Biopiscina Geotermal (2 horas)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Coffee className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">Desayuno nutritivo</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-70">
                    <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">+ Opcional: Masaje 30 minutos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sunset Option */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-50 to-blue-50/50 overflow-hidden group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Moon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2">Sunset Reset</h3>
                <p className="text-indigo-600 font-medium mb-6">Horarios: 18:00 o 19:00 hrs</p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Droplets className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">Biopiscina Geotermal (2 horas)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">Cena reparadora</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-70">
                    <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">+ Opcional: Masaje 30 minutos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 md:py-24 bg-stone-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4">Nuestra Alimentación</h2>
            <p className="text-slate-600">Opciones nutritivas pensadas para complementar tu experiencia.</p>
          </div>

          <div className="space-y-12">
            {/* Breakfast Menu */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Coffee className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-serif text-slate-900">Opciones de Desayuno</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/60">
                <ul className="space-y-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <span className="text-slate-700 text-lg">Tostadas integrales con huevo revuelto, tomates cherry y palta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <span className="text-slate-700 text-lg">Huevos revueltos con pastrami, palta y tostadas integrales.</span>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <p className="text-sm text-slate-500 italic">
                    * Ambas opciones incluyen frutas de la estación y café a elección (americano, latte o cortado).
                  </p>
                </div>
              </div>
            </div>

            {/* Dinner Menu */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="w-6 h-6 text-indigo-600" />
                <h3 className="text-2xl font-serif text-slate-900">Opciones de Cena</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200/60">
                <ul className="space-y-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <span className="text-slate-700 text-lg">Sopa de zapallo con caldo de hueso + tostadas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <span className="text-slate-700 text-lg">Sopa de verduras o sopas del día + tostadas.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-slate-900 mb-8">¿Listo para tu pausa consciente?</h2>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform"
            onClick={() => window.open("https://reservas.cancagua.cl/cancaguaspa/s/9dafaba2-53b4-4eb3-838f-39b2168827fa", "_blank")}
          >
            Reservar Experiencia Reset
          </Button>
        </div>
      </section>
    </div>
  );
}
