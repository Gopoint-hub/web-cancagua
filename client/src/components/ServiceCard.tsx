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
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-bold">
          {title}
        </h3>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={href}>
          <Button className="w-full">Ver Detalles</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
