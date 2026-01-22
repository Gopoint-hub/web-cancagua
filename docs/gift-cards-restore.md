# Documentación para Restaurar Gift Cards

Este documento contiene todas las ubicaciones donde se ocultaron enlaces, botones y secciones de Gift Cards.
Cuando se quiera reactivar la funcionalidad, seguir las instrucciones de cada sección.

## Fecha de ocultamiento: 22 Enero 2026

---

## Resumen de Cambios

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `client/src/App.tsx` | Importación | Import de GiftCards comentado |
| `client/src/App.tsx` | Ruta | Route `/tienda-regalos-preview` comentada |
| `client/src/pages/Home.tsx` | Sección | Sección "Regala Cancagua" comentada |
| `client/src/components/WhatsAppButton.tsx` | Condición | Mensaje contextual para gift cards comentado |

---

## 1. App.tsx - Importación y Ruta

**Archivo:** `client/src/App.tsx`

### Importación (línea ~37)
**Buscar:**
```tsx
// OCULTO - GIFT CARDS - RESTAURAR: import GiftCards from "./pages/GiftCards";
```

**Reemplazar por:**
```tsx
import GiftCards from "./pages/GiftCards";
```

### Ruta (línea ~78)
**Buscar:**
```tsx
{/* OCULTO - GIFT CARDS - RESTAURAR: <Route path={"/tienda-regalos-preview"} component={GiftCards} /> */}
```

**Reemplazar por:**
```tsx
<Route path={"/tienda-regalos-preview"} component={GiftCards} />
```

---

## 2. Home.tsx - Sección Gift Cards

**Archivo:** `client/src/pages/Home.tsx`

### Sección completa (líneas ~231-258)
**Buscar:**
```tsx
{/* OCULTO - GIFT CARDS - RESTAURAR:
<section className="py-20 md:py-28 bg-white">
  ...
</section>
FIN OCULTO GIFT CARDS */}
```

**Reemplazar por:**
```tsx
{/* Sección Gift Cards */}
<section className="py-20 md:py-28 bg-white">
  <div className="container">
    <div className="max-w-4xl mx-auto text-center">
      <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
        Regala Bienestar
      </span>
      <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
        Regala Cancagua
      </h2>
      <p className="text-lg text-[#8C8C8C] mb-10 max-w-2xl mx-auto leading-relaxed">
        Tarjeta de regalo Cancagua es una excelente opción para que
        elijan lo que quieran y cuando quieran. Es la mejor alternativa
        para regalar a tus seres queridos un regalo con sentido.
      </p>
      <Button 
        size="lg" 
        className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] px-10 tracking-wider"
        asChild
      >
        <Link href="/tienda-regalos-preview">
          Comprar Gift Card
        </Link>
      </Button>
    </div>
  </div>
</section>
```

---

## 3. WhatsAppButton.tsx - Mensaje contextual

**Archivo:** `client/src/components/WhatsAppButton.tsx`

### Condición para mensaje (línea ~28-31)
**Buscar:**
```tsx
/* OCULTO - GIFT CARDS - RESTAURAR:
} else if (location === "/tienda-regalos-preview") {
  return "Hola, quiero comprar una gift card";
FIN OCULTO GIFT CARDS */
```

**Reemplazar por:**
```tsx
} else if (location === "/tienda-regalos-preview") {
  return "Hola, quiero comprar una gift card";
```

---

## 4. Página GiftCards.tsx

**Archivo:** `client/src/pages/GiftCards.tsx`

La página completa permanece intacta pero inaccesible.
No se necesita modificar este archivo para restaurar.

---

## Instrucciones de Restauración Rápida

Para restaurar Gift Cards, buscar y reemplazar en todo el proyecto:

1. **Buscar:** `// OCULTO - GIFT CARDS - RESTAURAR:`
   **Reemplazar por:** (eliminar el comentario y dejar solo el código)

2. **Buscar:** `{/* OCULTO - GIFT CARDS - RESTAURAR:`
   **Reemplazar por:** (eliminar el comentario de apertura)

3. **Buscar:** `FIN OCULTO GIFT CARDS */}`
   **Reemplazar por:** (eliminar el comentario de cierre)

---

## Opcional - Cambiar slug a /gift-cards

Si se quiere usar `/gift-cards` en lugar de `/tienda-regalos-preview`:

1. En `App.tsx`: Cambiar `"/tienda-regalos-preview"` a `"/gift-cards"`
2. En `Home.tsx`: Cambiar `href="/tienda-regalos-preview"` a `href="/gift-cards"`
3. En `WhatsAppButton.tsx`: Cambiar `"/tienda-regalos-preview"` a `"/gift-cards"`
4. En `GiftCards.tsx`: Cambiar `canonical: "/tienda-regalos-preview"` a `canonical: "/gift-cards"`

---

## Notas Adicionales

- La página GiftCards.tsx tiene `noindex: true` en SEO para que Google no la indexe
- El sistema de backend (tRPC) para gift cards sigue funcionando
- Las imágenes de fondo de gift cards están en S3
- El menú de navegación (Navbar) y Footer NO tenían enlaces a Gift Cards
