export default function Head() {
  const seoData = {
    title: "Resultado del Pago | Cancagua Spa",
    description: "Resultado de tu compra de gift card en Cancagua Spa",
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}
