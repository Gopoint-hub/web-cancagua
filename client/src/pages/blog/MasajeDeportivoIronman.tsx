import React from 'react';
import BlogLayout from '@/components/BlogLayout';

export default function MasajeDeportivoIronman() {
  return (
    <BlogLayout
      title="Promoción de Abril: Masaje Deportivo (Especial Ironman Puerto Varas 2026)"
      date="8 Abril 2026"
      readTime="5 min"
      author="Cancagua Spa"
      category="Promociones"
    >
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          El <strong>Ironman Puerto Varas 2026</strong> es uno de los desafíos físicos más exigentes de la temporada. Sabemos que tanto la preparación previa como la recuperación muscular son fundamentales para lograr tu mejor rendimiento y evitar lesiones. Por eso, en Cancagua hemos activado un programa especial durante todo este mes.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Potencia tu entrenamiento y acelera tu recuperación</h2>
        <p>
          Durante todo el mes de abril, ven a Cancagua y potencia tu entrenamiento o toma una sesión de descanso y recuperación profunda después de una jornada de gran desgaste físico. Nuestro <strong>masaje deportivo</strong> está enfocado en aliviar la tensión, mejorar la flexibilidad y acelerar la recuperación de los grupos musculares más exigidos.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Valores y Promoción del Mes</h2>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Masaje Deportivo (30 minutos):</strong> $35.000</li>
          <li><strong>Masaje Deportivo (30 min) + 1 hora de Sauna Compartido:</strong> $50.000</li>
        </ul>

        <p className="italic text-gray-600 mb-6">
          <strong>Recomendación:</strong> Complementar el masaje con el calor de nuestro sauna compartido es ideal para relajar el sistema nervioso, mejorar la circulación y acelerar la eliminación de toxinas generadas durante la carrera.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">¿Cómo reservar?</h2>
        <p className="mb-6">
          No dejes tu recuperación para el último minuto. Asegura tu cupo y dale a tu cuerpo el descanso que merece.
        </p>

        <div className="my-8">
          <a 
            href="https://reservas.cancagua.cl/cancaguaspa/s/dec44241-6cd4-4f56-8299-6f45829100d2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded hover:bg-primary-700 transition-colors"
            style={{ backgroundColor: '#1d4ed8' }} /* Tailwind blue-700 as fallback */
          >
            Reserva tu Masaje Deportivo aquí
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          <em>Promoción válida solo hasta el 30 de abril de 2026.</em>
        </p>
      </div>
    </BlogLayout>
  );
}
