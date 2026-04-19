# 🚀 oskinar.es — Sistema de Desarrollo Web de Nivel Élite

> **Arquitectura multi-agente para desarrollo web profesional con IA**  
> Stack: Astro 4 · TypeScript · Tailwind · Three.js · Sanity CMS · Vercel Edge

---

## 📋 Tabla de Contenidos

1. [Visión del Proyecto](#visión-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura del Sistema de Agentes](#arquitectura-del-sistema-de-agentes)
4. [Estructura de Directorios](#estructura-de-directorios)
5. [Design System & Tokens](#design-system--tokens)
6. [Skills Disponibles](#skills-disponibles)
7. [Flujo de Trabajo (Git Flow)](#flujo-de-trabajo-git-flow)
8. [Core Web Vitals — Objetivos](#core-web-vitals--objetivos)
9. [SEO & Schema.org](#seo--schemaorg)
10. [PromptOps — Gobernanza de IA](#promptops--gobernanza-de-ia)
11. [Seguridad](#seguridad)
12. [Scripts Disponibles](#scripts-disponibles)
13. [Variables de Entorno](#variables-de-entorno)
14. [Reglas para Agentes IA](#reglas-para-agentes-ia)

---

## Visión del Proyecto

`oskinar.es` es el portfolio y sitio corporativo de referencia para servicios de:

- **Desarrollo de Plugins WordPress con IA**
- **eCommerce escalable** (WooCommerce, Shopify headless)
- **Apps móviles multiplataforma** (React Native / Flutter)
- **Soluciones IA a medida** (integración OpenAI, Anthropic, modelos locales)

### Principios de Diseño

| Principio | Descripción |
|-----------|-------------|
| **Performance First** | LCP < 1.2s, INP < 100ms, CLS = 0 |
| **SEO Semántico** | Schema.org en cada entidad de contenido |
| **Accesibilidad** | WCAG 2.2 AA mínimo, AA+ objetivo |
| **Progressive Enhancement** | Funcional sin JS, mejorado con él |
| **Privacy by Design** | Sin cookies de terceros innecesarias |

---

## Stack Tecnológico

### Frontend

| Capa | Tecnología | Versión | Justificación |
|------|-----------|---------|---------------|
| Framework | **Astro** | 4.x | 0 JS por defecto, islas de React, rendimiento máximo |
| UI Components | **React** | 18.x | Islas interactivas (partículas, formularios, blog) |
| Estilos | **Tailwind CSS** | 3.x | Design tokens centralizados, purge automático |
| Animaciones | **Framer Motion** | 11.x | Spring physics, reduced-motion aware |
| Partículas | **Three.js** | r164 | Control total, carga diferida real |
| Iconos | **Lucide React** | latest | Ligero, tree-shakeable, accesible |
| Tipado | **TypeScript** | 5.x | Strict mode activado |

### Backend & CMS

| Capa | Tecnología | Versión | Justificación |
|------|-----------|---------|---------------|
| CMS Headless | **Sanity.io** | v3 | GROQ, real-time, imagen CDN integrado |
| Edge Functions | **Vercel Edge Runtime** | — | <50ms TTFB global |
| API Contact | **Resend** | latest | Emails transaccionales fiables |
| Analytics | **Plausible** | self-hosted | Sin cookies, GDPR compliant |
| Search | **Pagefind** | latest | Búsqueda estática, 0 servidor |

### DevOps & Tooling

| Capa | Tecnología |
|------|-----------|
| Hosting | Vercel (Pro) |
| CDN | Vercel Edge Network |
| CI/CD | GitHub Actions |
| Monitoring | Vercel Analytics + Speed Insights |
| Error Tracking | Sentry (edge-compatible) |
| Tests | Vitest + Playwright |
| Linting | ESLint + Prettier + Biome |

---

## Arquitectura del Sistema de Agentes

El proyecto utiliza un **sistema multi-agente especializado**. Cada agente tiene un rol único, restricciones claras y entregables definidos.

```
┌─────────────────────────────────────────────────────────┐
│                  ORCHESTRATOR AGENT                      │
│           agents/00-orchestrator.md                      │
│  Coordina, valida y aprueba entre subagentes             │
└──────────┬──────────────────────────────────────────────┘
           │
    ┌──────┴───────────────────────────────────┐
    │                                          │
┌───▼──────────┐  ┌──────────────┐  ┌─────────▼──────────┐
│  ARCHITECT   │  │  FRONTEND    │  │     BACKEND         │
│  agent 01    │  │  agent 02    │  │     agent 03        │
│  Estructura  │  │  UI/UX/Code  │  │  API/CMS/Edge       │
└──────────────┘  └──────────────┘  └────────────────────┘
┌──────────────┐  ┌──────────────┐  ┌────────────────────┐
│    SEO       │  │ COPYWRITER   │  │   PERFORMANCE      │
│  agent 04    │  │  agent 05    │  │     agent 06        │
│  Schema/Meta │  │  Copy/AIDA   │  │  Vitals/Lighthouse  │
└──────────────┘  └──────────────┘  └────────────────────┘
┌──────────────┐  ┌──────────────┐
│   SECURITY   │  │   CONTENT    │
│  agent 07    │  │   agent 08   │
│  OWASP/CSP   │  │  Blog/PromptOps│
└──────────────┘  └──────────────┘
```

### Protocolo de Comunicación entre Agentes

Cada agente produce un **artefacto JSON estructurado** que el orquestador valida antes de pasar al siguiente agente:

```json
{
  "agent_id": "frontend-02",
  "task_id": "hero-section-v1",
  "status": "completed",
  "artifacts": ["src/components/Hero.astro"],
  "vitals_impact": { "LCP": "+0ms", "CLS": "0" },
  "human_review_required": true,
  "next_agent": "seo-04"
}
```

---

## Estructura de Directorios

```
oskinar.es/
├── README.md                    ← Este archivo
├── AGENTS.md                    ← Referencia rápida de todos los agentes
├── .env.example                 ← Variables de entorno documentadas
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               ← Tests + Lighthouse CI
│   │   ├── deploy-preview.yml   ← Preview en cada PR
│   │   └── deploy-prod.yml      ← Deploy en merge a main
│   └── PULL_REQUEST_TEMPLATE.md
│
├── agents/                      ← Sistema multi-agente IA
│   ├── 00-orchestrator.md
│   ├── 01-architect.md
│   ├── 02-frontend.md
│   ├── 03-backend.md
│   ├── 04-seo.md
│   ├── 05-copywriter.md
│   ├── 06-performance.md
│   ├── 07-security.md
│   └── 08-content.md
│
├── skills/                      ← Skills reutilizables por agentes
│   ├── particles-system.md      ← Three.js lazy load
│   ├── core-web-vitals.md       ← Guía de optimización
│   ├── seo-schema.md            ← Schema.org templates
│   ├── prompt-ops.md            ← Gobernanza de prompts
│   ├── design-system.md         ← Tokens y componentes
│   ├── accessibility.md         ← WCAG checklist
│   └── security-hardening.md   ← OWASP + CSP
│
├── prompts/                     ← Repositorio de prompts versionados
│   ├── blog-article.json
│   ├── portfolio-case.json
│   ├── seo-audit.json
│   └── code-review.json
│
├── design-system/               ← Tokens de diseño centralizados
│   ├── tokens.json              ← Colores, fuentes, espaciado
│   ├── typography.css
│   └── components.md            ← Librería de componentes documentada
│
├── docs/                        ← Documentación técnica
│   ├── architecture.md
│   ├── content-schema.md
│   ├── api-contracts.md
│   └── deployment.md
│
└── src/                         ← Código fuente Astro
    ├── components/
    │   ├── layout/
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   └── SEOHead.astro
    │   ├── sections/
    │   │   ├── Hero.astro
    │   │   ├── Services.astro
    │   │   ├── Portfolio.astro
    │   │   ├── Blog.astro
    │   │   ├── Testimonials.astro
    │   │   └── Contact.astro
    │   ├── ui/
    │   │   ├── Button.astro
    │   │   ├── Card.astro
    │   │   ├── Badge.astro
    │   │   └── AnimatedText.tsx  ← React island
    │   └── three/
    │       ├── ParticleSystem.tsx ← React island, lazy
    │       └── scene-config.ts
    ├── layouts/
    │   ├── BaseLayout.astro
    │   ├── BlogLayout.astro
    │   └── PortfolioLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── servicios/
    │   ├── portfolio/
    │   ├── blog/
    │   └── contacto.astro
    ├── content/                  ← Colecciones de contenido tipadas
    │   ├── config.ts
    │   ├── portfolio/
    │   └── blog/
    ├── lib/
    │   ├── sanity.ts
    │   ├── seo.ts
    │   └── analytics.ts
    └── styles/
        ├── global.css
        └── tokens.css           ← CSS Custom Properties del design system
```

---

## Design System & Tokens

> ⚠️ **PENDIENTE**: Subir archivos de la web original para extraer tokens exactos.  
> Los valores siguientes son base de trabajo — se actualizarán con los colores y fuentes reales.

### Tokens Base (`design-system/tokens.json`)

```json
{
  "$schema": "https://design-tokens.org/schemas/design-tokens-community-group/1.0",
  "color": {
    "primary": {
      "50": { "$value": "#PLACEHOLDER" },
      "100": { "$value": "#PLACEHOLDER" },
      "500": { "$value": "#PLACEHOLDER" },
      "900": { "$value": "#PLACEHOLDER" }
    },
    "accent": {
      "500": { "$value": "#PLACEHOLDER" }
    },
    "neutral": {
      "50":  { "$value": "#FAFAFA" },
      "900": { "$value": "#0A0A0A" }
    },
    "semantic": {
      "background": { "$value": "{color.neutral.900}" },
      "surface":    { "$value": "#111111" },
      "text":       { "$value": "#F5F5F5" },
      "text-muted": { "$value": "#A0A0A0" }
    }
  },
  "typography": {
    "font-display": { "$value": "PLACEHOLDER_DISPLAY_FONT" },
    "font-body":    { "$value": "PLACEHOLDER_BODY_FONT" },
    "font-mono":    { "$value": "JetBrains Mono, monospace" }
  },
  "spacing": {
    "section": { "$value": "clamp(4rem, 8vw, 8rem)" },
    "gap":     { "$value": "clamp(1.5rem, 3vw, 2.5rem)" }
  },
  "radius": {
    "sm":  { "$value": "0.375rem" },
    "md":  { "$value": "0.75rem" },
    "lg":  { "$value": "1.5rem" },
    "pill":{ "$value": "9999px" }
  },
  "shadow": {
    "glow-primary": { "$value": "0 0 40px 0 rgba(PLACEHOLDER, 0.3)" }
  }
}
```

---

## Skills Disponibles

| Skill | Descripción | Agentes que la usan |
|-------|-------------|---------------------|
| `particles-system` | Three.js con carga diferida real | 02-frontend, 06-performance |
| `core-web-vitals` | Checklist LCP/INP/CLS + fixes | 06-performance, 01-architect |
| `seo-schema` | Templates Schema.org por tipo de página | 04-seo |
| `prompt-ops` | Sistema de versionado de prompts | 08-content |
| `design-system` | Tokens, componentes, uso correcto | 02-frontend, 05-copywriter |
| `accessibility` | WCAG 2.2 checklist por componente | 02-frontend, 06-performance |
| `security-hardening` | CSP, sanitización, OWASP Top 10 | 07-security |

---

## Flujo de Trabajo (Git Flow)

```
main ←── release/* ←── develop ←── feature/[agent]-[task]
                                ←── fix/[issue]
                                ←── content/[article-slug]
```

### Convención de Commits

```
feat(frontend): hero section con partículas Three.js
fix(seo): schema JSON-LD en página portfolio
perf(vitals): lazy load crítico de fuentes web
content(blog): artículo plugins WordPress IA
agent(copywriter): hero copy v2 con AIDA
```

---

## Core Web Vitals — Objetivos

| Métrica | Objetivo | Crítico si > |
|---------|----------|--------------|
| **LCP** | < 1.2s | 2.5s |
| **INP** | < 100ms | 200ms |
| **CLS** | 0 | 0.1 |
| **FCP** | < 0.8s | 1.8s |
| **TTFB** | < 200ms | 800ms |
| **Lighthouse Score** | > 95 | < 90 |

### Estrategias Implementadas

1. **Fuentes**: `font-display: optional` + preload de subset crítico
2. **Imágenes**: Astro `<Image>` con WebP/AVIF automático + lazy loading
3. **JavaScript**: 0 JS en rutas estáticas, islas de React solo donde se necesiten
4. **Partículas**: `IntersectionObserver` + dynamic import, no bloquean LCP
5. **CSS**: Critical CSS inline, resto diferido
6. **Edge**: Deploy en Vercel Edge, < 50ms TTFB global

---

## SEO & Schema.org

Cada tipo de página tiene su Schema.org correspondiente:

| Página | Schema | Prioridad |
|--------|--------|-----------|
| Home | `Organization` + `WebSite` + `SearchAction` | Alta |
| Portfolio item | `SoftwareApplication` o `CreativeWork` | Alta |
| Blog article | `Article` + `BreadcrumbList` | Alta |
| Servicio | `Service` + `Offer` | Media |
| Contacto | `ContactPage` + `LocalBusiness` | Media |

---

## PromptOps — Gobernanza de IA

Todos los prompts del proyecto se tratan como **Propiedad Intelectual Algorítmica**.

### Sistema de Versionado

```
prompts/
├── blog-article/
│   ├── v1.0.0.json   ← Deprecated
│   ├── v1.1.0.json   ← Deprecated  
│   └── v2.0.0.json   ← Current
└── CHANGELOG.md
```

### Estructura Estándar de Prompt

```json
{
  "id": "blog-article",
  "version": "2.0.0",
  "last_tested_model": "claude-sonnet-4-6",
  "last_tested_date": "2026-04-19",
  "performance_score": 0.94,
  "task": "Generación de artículo técnico para blog",
  "role": "Arquitecto de Soluciones IA",
  "format": "Markdown con Frontmatter SEO",
  "constraints": [
    "No usar introducciones genéricas",
    "Incluir fragmentos de código optimizados",
    "Enlazar internamente a servicios de oskinar.es",
    "Máximo 2000 palabras",
    "Incluir Schema.org Article en frontmatter"
  ],
  "reasoning_style": "step-by-step",
  "human_review_required": true,
  "anti_hallucination": true
}
```

---

## Seguridad

### Checklist de Seguridad por Deploy

- [ ] CSP headers configurados (sin `unsafe-inline` en producción)
- [ ] Rate limiting en Edge Functions de contacto
- [ ] Sanitización de inputs antes de enviar a API de IA
- [ ] Variables de entorno fuera del bundle cliente
- [ ] CORS configurado restrictivamente
- [ ] Dependencias auditadas (`pnpm audit`)
- [ ] Headers de seguridad en `vercel.json`

### Headers de Seguridad (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

## Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo (localhost:4321)
pnpm build        # Build de producción
pnpm preview      # Preview del build
pnpm test         # Tests unitarios (Vitest)
pnpm test:e2e     # Tests end-to-end (Playwright)
pnpm lint         # ESLint + Biome
pnpm format       # Prettier
pnpm lighthouse   # Lighthouse CI local
pnpm sanity       # Studio Sanity local
pnpm analyze      # Bundle analyzer
```

---

## Variables de Entorno

```bash
# .env.example — Copia a .env.local (NUNCA commitear .env.local)

# Sanity CMS
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # Solo en servidor, nunca PUBLIC_

# Email (Resend)
RESEND_API_KEY=

# Analytics (Plausible self-hosted)
PUBLIC_PLAUSIBLE_DOMAIN=oskinar.es
PUBLIC_PLAUSIBLE_API=https://plausible.io

# IA (para generación de contenido — solo servidor)
ANTHROPIC_API_KEY=

# Sentry
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

---

## Reglas para Agentes IA

> **CRÍTICO**: Todo agente que modifique este proyecto DEBE leer esta sección.

### Reglas Absolutas

1. **NUNCA** generar código que bloquee el hilo principal en el primer render
2. **NUNCA** añadir dependencias npm sin justificar tamaño de bundle en el commit
3. **NUNCA** hardcodear strings de texto — usar el sistema de i18n o variables
4. **NUNCA** omitir atributos `alt` en imágenes o `aria-label` en iconos interactivos
5. **NUNCA** commitear variables de entorno, claves API o secretos
6. **NUNCA** publicar contenido de IA sin paso de revisión humana

### Reglas de Calidad

7. Todo componente nuevo debe pasar el checklist de `skills/accessibility.md`
8. Todo deploy debe mantener Lighthouse Score > 95
9. Los prompts se versionan en `prompts/` antes de usarse en producción
10. El CLS debe ser 0 en cualquier componente nuevo — usar `aspect-ratio` en imágenes

### Formato de Entregables de Agente

Cada agente reporta en este formato antes de marcar una tarea como completada:

```markdown
## Tarea Completada: [nombre]

- **Agente**: [id]
- **Archivos modificados**: [lista]
- **Tests pasados**: ✅ / ❌
- **Lighthouse delta**: [antes] → [después]  
- **Revisión humana requerida**: Sí / No
- **Próximo agente**: [id]
```

---

*Última actualización: 2026-04-19 | Versión arquitectura: 1.0.0*
