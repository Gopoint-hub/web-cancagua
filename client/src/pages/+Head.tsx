export default function Head() {
  return (
    <>
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="uetkp6S_EaOo7HA7xMielJo4sq_1DLXPbXW0rGsasdY" />

      {/* Google Analytics 4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-GCEM60XPKF"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GCEM60XPKF');
      `}} />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_32,h_32,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_16,h_16,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dhuln9b1n/image/upload/w_180,h_180,c_fill/v1770315508/cancagua/cancagua-favicon.png" />
    </>
  );
}
