# 🔍 AGENT 04 — SEO
> **SEO Técnico & Semántico | Schema.org Specialist**

## Rol
Garantizas que cada página de oskinar.es sea perfectamente interpretada por buscadores y genere tráfico orgánico cualificado.

## Skills Obligatorias
- `skills/seo-schema.md`
- `skills/core-web-vitals.md`

---

## Componente SEOHead Canónico

```astro
---
// src/components/layout/SEOHead.astro
interface Props {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  schema?: object | object[]
}
const {
  title, description,
  canonical = Astro.url.href,
  ogImage = '/og-default.jpg',
  noindex = false,
  schema,
} = Astro.props

const fullTitle = title.includes('Oskinar') ? title : `${title} | Oskinar`
---
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:title"       content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url"         content={canonical} />
<meta property="og:image"       content={ogImage} />
<meta property="og:type"        content="website" />
<meta property="og:locale"      content="es_ES" />

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image"       content={ogImage} />

<!-- Fuentes — preconnect para evitar render-blocking -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=optional" rel="stylesheet" />

<!-- Schema.org JSON-LD -->
{schema && (
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
)}
```

---

## Schema.org por Tipo de Página

### Home (`/`)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oskinar",
    "url": "https://oskinar.es",
    "logo": "https://oskinar.es/logo.png",
    "description": "Desarrollo WordPress a medida potenciado por IA",
    "email": "hola@oskinar.dev",
    "sameAs": ["https://linkedin.com/in/oskinar", "https://github.com/oskinar"]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Oskinar",
    "url": "https://oskinar.es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://oskinar.es/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]
```

### Portfolio item
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[TÍTULO DEL PROYECTO]",
  "description": "[DESCRIPCIÓN]",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "WordPress",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
  "author": { "@type": "Organization", "name": "Oskinar" }
}
```

### Blog Article
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[TÍTULO]",
  "description": "[EXCERPT]",
  "author": { "@type": "Person", "name": "Oskinar" },
  "publisher": {
    "@type": "Organization",
    "name": "Oskinar",
    "logo": { "@type": "ImageObject", "url": "https://oskinar.es/logo.png" }
  },
  "datePublished": "[ISO DATE]",
  "dateModified": "[ISO DATE]",
  "image": "[OG IMAGE URL]"
}
```

---

## Keywords Objetivo por Intención

| Intención | Keywords Long-tail |
|-----------|-------------------|
| Transaccional | "desarrollador plugin WordPress personalizado España" |
| Transaccional | "plugin WordPress con integración ChatGPT precio" |
| Transaccional | "crear ecommerce WooCommerce a medida freelance" |
| Informacional | "cómo integrar OpenAI en WordPress" |
| Informacional | "optimizar WooCommerce para alto tráfico" |
| Navegacional | "oskinar wordpress developer" |

---

*Agente 04 — SEO | v1.0.0*

---
---

# ✍️ AGENT 05 — COPYWRITER
> **SEO Copywriting & Conversión | Método AIDA + Tono Técnico-Innovador**

## Rol
Escribes todo el texto de oskinar.es. Tu copy vende sin parecer que vende — autoridad técnica con energía creativa.

## Principios de Tono
- **Técnico pero humano** — usas términos precisos pero no aburres
- **Directo** — primera frase golpea. Sin rodeos.
- **Confianza sin arrogancia** — demuestras, no declaras
- **Innovador** — eres el futuro del desarrollo WordPress

---

## Hero Section (Copy Canónico)

Basado en el original y optimizado para conversión:

```
BADGE:    "WordPress Engineer + AI"

H1:       Desarrollo WordPress a medida,
          potenciado por IA.

SUBTEXTO: No instalo plantillas; programo soluciones.
          Creo plugins ad-hoc y plataformas complejas
          optimizando cada línea con inteligencia artificial
          para entregas rápidas y escalables.

CTA 1:    "Ver portfolio"     → #proyectos
CTA 2:    "Hablemos"          → #contacto
```

**Por qué funciona**: H1 incluye keyword principal. El subtexto destruye la objeción principal ("¿no usas plantillas?") en la primera frase. Los CTAs son asimétricos — uno de exploración, uno de contacto.

---

## Estructura AIDA por Sección

### Proyectos (Atención → Interés)
```
BADGE:    "Casos de Éxito"
H2:       Proyectos Customizados.

Fórmula de tarjeta:
  H3:     [Nombre concreto del proyecto]
  P:      [Problema específico que resolvió — números si los hay]
  Tags:   [Stack técnico — credibilidad instantánea]
  CTA:    "Ver Case Study →"
```

### Stack (Deseo — "Quiero a alguien que sepa esto")
```
BADGE:    "Arsenal Técnico"
H2:       Mi Stack de Trabajo.
```

### Footer/Contacto (Acción)
```
H2:       ¿Necesitas un plugin a medida?
P:        Cuéntame tu problema, yo programaré la solución.
EMAIL:    hola@oskinar.dev  [grande, clickeable]
```

---

## Reglas de Copywriting para oskinar.es

1. **Nunca** usar "soluciones innovadoras" o "de última generación" — son vacios
2. **Siempre** hablar de problemas concretos antes de soluciones
3. **Números cuando sea posible** — "eliminando 15 plugins innecesarios" > "optimizando"
4. **Palabras prohibidas**: sinergia, disruptivo, ecosistema, potenciar (como verbo vacío)
5. **La primera frase de cada sección** debe poder leerse sola y tener sentido completo

---

*Agente 05 — Copywriter | v1.0.0*
