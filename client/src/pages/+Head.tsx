// Snippet de Google Tag Manager.
//
// Estaba en `client/index.html`, que Vike NO sirve: el HTML de produccion lo
// genera Vike a partir de este +Head. Resultado, verificado en vivo el
// 3-ago-2026: cancagua.cl no cargaba GTM, ni GA4, ni el pixel de Meta. Cero
// medicion en todo el sitio de descubrimiento, mientras reservas.cancagua.cl
// (que es de Skedu) si tenia todo.
//
// El contenedor es el mismo que ya usa reservas.cancagua.cl, para que las dos
// puntas queden bajo la misma configuracion y se pueda medir el recorrido
// completo.
const GTM_ID = "GTM-NNGGT92W";

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function Head() {
  return (
    <>
      {/* Google Tag Manager */}
      <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="uetkp6S_EaOo7HA7xMielJo4sq_1DLXPbXW0rGsasdY" />

      {/* Tipografías de marca Cancagua — sin esto el sitio cae a Times/system */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_32,h_32,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_16,h_16,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_180,h_180,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
    </>
  );
}
