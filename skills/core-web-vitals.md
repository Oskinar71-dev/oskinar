# ⚡ SKILL: CORE WEB VITALS — Guía de Optimización
> **Objetivos: LCP < 1.2s | INP < 100ms | CLS = 0 | Lighthouse ≥ 95**

---

## Los 3 Enemigos del Rendimiento en oskinar.es

```
1. RENDER-BLOCKING RESOURCES
   → Fuentes web sin display=optional
   → CSS de terceros en <head>
   → JS no-deferred en <head>

2. LAYOUT SHIFTS (CLS)
   → Imágenes sin dimensiones definidas
   → Fuentes con display=swap (FOUT)
   → Elementos que aparecen encima de otros tras JS

3. LONG TASKS (INP)
   → Three.js cargado en el hilo principal
   → Event listeners pesados sin debounce
   → Imágenes decodificadas síncronamente
```

---

## Checklist LCP

El LCP candidate de oskinar.es es el **H1 del hero** (texto, no imagen).

```astro
<!-- ✅ El H1 no tiene animaciones de entrada que retrasen su pintado -->
<h1 class="hero-title">
  Desarrollo WordPress a medida,
  <span class="text-gradient">potenciado por IA.</span>
</h1>

<!-- ✅ Fuente preconectada y cargada con display=optional -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="...Plus+Jakarta+Sans...&display=optional" rel="stylesheet">

<!-- ✅ CSS crítico inline en <head> (max 14kB) -->
<style>
  /* Solo lo necesario para el above-the-fold */
  :root { --bg-left: #1E1F26; --accent: #FF5757; }
  body { background: var(--bg-left); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; }
  .hero { min-height: 100vh; display: flex; align-items: center; }
  /* ... */
</style>
```

---

## Checklist CLS

```astro
<!-- ✅ Imágenes SIEMPRE con width y height definidos -->
<Image src={img} alt={alt} width={800} height={600} />

<!-- ✅ aspect-ratio en contenedores de imagen -->
<div style="aspect-ratio: 16/9; overflow: hidden;">
  <img ... />
</div>

<!-- ✅ La glass-card del hero tiene dimensiones fijas -->
<div class="glass-card" style="width: 100%; max-width: 450px;">
  <!-- height se define por el contenido — estable -->
</div>

<!-- ❌ NUNCA cargar elementos que empujen el contenido -->
<!-- ❌ NUNCA usar display=swap en fuentes above-the-fold -->
```

---

## Checklist INP

```typescript
// ✅ Event listeners con throttle/debounce
const handleScroll = throttle(() => {
  // lógica
}, 100)

// ✅ Animaciones con CSS en lugar de JS cuando sea posible
// CSS transitions corren en el compositor — no bloquean main thread

// ✅ Imágenes con decoding async
<img decoding="async" ... />

// ✅ Three.js en worker si la escena es compleja
// Para oskinar.es la escena es simple — no necesario
```

---

## Configuración Astro para Performance Máxima

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compressor from 'astro-compressor'

export default defineConfig({
  site: 'https://oskinar.es',
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    compressor({ gzip: true, brotli: true }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    domains: ['cdn.sanity.io'],
  },
  build: {
    inlineStylesheets: 'auto', // CSS < 4kB va inline automáticamente
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'], // Chunk separado para lazy load
          }
        }
      }
    },
    ssr: {
      noExternal: ['@fontsource/*'],
    }
  }
})
```

---

*Skill: core-web-vitals | v1.0.0*
