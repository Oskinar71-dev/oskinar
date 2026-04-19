---
title: "Core Web Vitals en 2026: la guía que nadie te da"
description: LCP, INP y CLS explicados con ejemplos reales y fixes concretos. Sin teoría vacía, directo al código.
publishedAt: 2026-03-15
tags: [Performance, SEO, Core Web Vitals]
---

Google lleva años diciendo que la velocidad importa para el SEO. En 2026, con la competencia que hay, un Lighthouse por debajo de 90 ya no es solo un problema técnico: es un problema de negocio.

## LCP — Lo que más duele (y más se ignora)

El Largest Contentful Paint mide cuánto tarda en aparecer el elemento más grande del viewport. En la mayoría de portfolios y landing pages, ese elemento es una imagen o el H1.

**El fix más impactante**: `fetchpriority="high"` en la imagen hero.

```html
<img src="/hero.webp" fetchpriority="high" alt="..." />
```

Una línea. Mejoras medibles de 300-800ms en LCP.

## INP — El nuevo FID

Interaction to Next Paint reemplazó a FID en 2024. Mide el tiempo desde que el usuario interactúa hasta que la página responde visualmente.

El enemigo del INP es el hilo principal bloqueado. La solución: no bloquear el hilo principal.

- Mueve lógica pesada a Web Workers
- Usa `scheduler.yield()` para tareas largas
- Carga Three.js y librerías pesadas con `client:visible`

## CLS — El más fácil de evitar

Cumulative Layout Shift se previene con una sola regla: **define siempre las dimensiones de tus imágenes**.

```html
<img src="..." width="800" height="600" alt="..." />
```

Y usa `font-display: optional` en lugar de `swap`. El swap provoca FOUT (Flash of Unstyled Text) que dispara el CLS.

## Objetivo real

- LCP < 1.2s
- INP < 100ms  
- CLS = 0

No es magia. Es no bloquear el render, dimensionar bien los recursos y no cargar lo que no se necesita.
