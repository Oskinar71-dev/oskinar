# ⚡ AGENTS.md — Referencia Rápida del Sistema Multi-Agente
> **oskinar.es | Para leer antes de cualquier sesión de trabajo con IA**

---

## TL;DR — ¿Qué agente activo?

```
Nueva feature / decisión técnica     → 01-architect
Componente UI / CSS / animaciones    → 02-frontend  
API / CMS / Edge Functions           → 03-backend
Metadatos / Schema.org / sitemap     → 04-seo
Textos / copy / CTAs                 → 05-copywriter
Lighthouse / vitals / imágenes       → 06-performance
Headers / seguridad / sanitización   → 07-security
Blog / portfolio cases / prompts     → 08-content
Coordinar varios agentes             → 00-orchestrator
```

---

## Orden de Ejecución por Tipo de Tarea

```
PÁGINA NUEVA:      01 → 05 → 02 → 04 → 06 → 07 → 👤 HUMAN
COMPONENTE UI:     02 → 06 → 04 → 👤 HUMAN
ARTÍCULO BLOG:     08 → 04 → 👤 HUMAN → PUBLISH
INTEGRACIÓN API:   01 → 03 → 07 → 06 → 👤 HUMAN
DEPLOY PROD:       06 → 07 → 👤 APPROVAL → 🚀
```

---

## Design System — Recordatorio Rápido

```css
/* COLORES */
--bg-left:    #1E1F26   /* Fondo base */
--bg-right:   #252630   /* Tarjetas */
--bg-glass:   #2A2C36   /* Hero card */
--accent:     #FF5757   /* Naranja Coral */
--accent-soft:#FF8A65   /* Naranja suave */
--text-main:  #FFFFFF
--text-muted: #9DA0B0

/* FUENTE */
'Plus Jakarta Sans' — weights: 400, 500, 700, 800

/* RADIOS */
--radius: 6px           /* Tech/cuadrado — nunca pill */

/* EFECTO FIRMA */
Split 50/50: bg-left | bg-right  (solo en hero, desaparece en mobile)
Glow ambiental: radial naranja, fixed, z-index:-1
Glass card: flotante con animación floatCard 8s
```

---

## Reglas No Negociables

| # | Regla | Consecuencia de incumplir |
|---|-------|--------------------------|
| 1 | Lighthouse ≥ 95 en cada deploy | PR bloqueado |
| 2 | CLS = 0 en componentes nuevos | PR bloqueado |
| 3 | API keys nunca en variables `PUBLIC_` | Brecha de seguridad |
| 4 | Contenido IA sin revisión humana | No se publica |
| 5 | Imágenes sin `alt` descriptivo | WCAG fail |
| 6 | Colores hardcodeados (sin var()) | Design system roto |
| 7 | Three.js sin `client:visible` | LCP penalizado |
| 8 | Prompts sin versionar en `/prompts` | Knowledge leak |

---

## Archivos Clave

```
README.md                      ← Documentación completa del proyecto
AGENTS.md                      ← Este archivo (referencia rápida)
design-system/tokens.json      ← Fuente de verdad de diseño
design-system/tokens.css       ← CSS Custom Properties
agents/00-orchestrator.md      ← Coordinación de agentes
agents/01-architect.md         ← Decisiones de stack
agents/02-frontend.md          ← UI + Three.js
agents/04-05-seo-copy.md       ← SEO + Copywriting
agents/06-07-08-perf-sec-content.md ← Performance + Security + Content
skills/design-system.md        ← Componentes y tokens detallados
skills/particles-system.md     ← Three.js lazy load
skills/core-web-vitals.md      ← Optimización de rendimiento
skills/prompt-ops.md           ← Gobernanza de IA
```

---

*AGENTS.md | oskinar.es | v1.0.0 | 2026-04-19*
