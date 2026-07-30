import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS, FAQ_CATEGORIES, getFaqsByCategory } from "@/lib/faqs";

export default function Page() {
  return (
    <div className="font-cg-sans min-h-screen bg-[#F4F2ED] text-[#222221]">
      <header className="bg-[#1B212D] pt-32 pb-16 text-[#FCF9F9]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#CCD1DB]">CANCAGUA</p>
          <h1 className="font-cg-serif mt-5 text-4xl font-light leading-tight tracking-[-0.025em] md:text-6xl">
            Preguntas frecuentes
          </h1>
          <p className="font-cg-soft mt-6 max-w-2xl text-lg text-[#D7D4D1]">
            Lo que más nos preguntan sobre valores, horarios, reservas y cómo funciona el lugar.
            Si no encuentras tu respuesta, escríbenos por WhatsApp al +56 9 4007 3999.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {FAQ_CATEGORIES.map(category => (
          <section key={category} className="mb-14">
            <h2 className="font-cg-mono mb-6 text-xs uppercase tracking-[0.18em] text-[#333D51]">
              {category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {getFaqsByCategory(category).map((faq, i) => (
                <AccordionItem key={faq.question} value={`${category}-${i}`}>
                  <AccordionTrigger className="text-left font-cg-sans text-lg font-normal">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-cg-soft text-base leading-relaxed text-[#4A4A48]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}

        <section className="mt-20 rounded-[20px] bg-[#333D51] p-8 text-[#FCF9F9] md:p-12">
          <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#CCD1DB]">¿TE QUEDÓ UNA DUDA?</p>
          <h2 className="font-cg-sans mt-5 text-3xl font-light leading-tight md:text-4xl">
            Escríbenos y te respondemos.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/56940073999"
              className="rounded-full bg-[#FCF9F9] px-7 py-3 text-sm font-medium text-[#1B212D] transition hover:bg-white"
            >
              WhatsApp
            </a>
            <a
              href="https://reservas.cancagua.cl"
              className="rounded-full border border-[#FCF9F9]/50 px-7 py-3 text-sm font-medium text-[#FCF9F9] transition hover:bg-white/10"
            >
              Reservar
            </a>
          </div>
        </section>

        <p className="font-cg-mono mt-10 text-center text-xs uppercase tracking-[0.14em] text-[#8A8A88]">
          {FAQS.length} preguntas · actualizado en julio de 2026
        </p>
      </main>
    </div>
  );
}
