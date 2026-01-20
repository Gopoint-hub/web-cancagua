import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
}

export function ServiceCard({
  title,
  description,
  image,
  href,
  badge,
}: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white h-full flex flex-col">
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-[#D3BC8D] text-[#3a3a3a] px-4 py-1.5 text-xs tracking-wider uppercase">
            {badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-light tracking-wide">
          {title}
        </h3>
      </div>
      <CardContent className="p-6 bg-white flex flex-col flex-1">
        <p className="text-[#8C8C8C] mb-5 text-sm leading-relaxed flex-1">{description}</p>
        <Button 
          className="w-full bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider text-sm mt-auto" 
          asChild
        >
          <Link href={href}>Ver Detalles</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
