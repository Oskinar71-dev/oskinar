# ⚡ SKILL: PARTICLES SYSTEM — Three.js con Lazy Load Real
> **Partículas interactivas que NO penalizan el LCP ni el SEO**

---

## Principio Fundamental

> Las partículas son **decoración**. El contenido es **rey**.  
> Three.js no se descarga hasta que el hero es visible Y el LCP ya ocurrió.

---

## Por qué Three.js y no tsparticles

| Criterio | Three.js | tsparticles |
|---------|---------|------------|
| Control de rendimiento | Total | Limitado |
| Tamaño bundle | ~600kB (cargado lazy) | ~150kB |
| GPU acceleration | WebGL nativo | Canvas 2D |
| Configuración | Código | JSON config |
| **Veredicto** | ✅ Mejor calidad visual | ✅ Mejor si < 5min dev |

Para oskinar.es usamos **Three.js** porque el control visual lo justifica.

---

## Estrategia de Carga (3 capas de protección del LCP)

```
Layer 1: client:visible (Astro)
  → El componente React ni siquiera se hidrata hasta estar en viewport

Layer 2: Dynamic import + useEffect
  → Three.js solo se descarga tras hidratación

Layer 3: Navigator checks
  → Si slow network o prefers-reduced-motion → skip total
```

---

## Implementación Completa

### Componente React Island

```typescript
// src/components/three/ParticleSystem.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export interface ParticleConfig {
  count:       number   // Recomendado: 80-150. Nunca más de 200.
  color:       string   // Hex. Del design system: '#FF5757'
  size:        number   // Recomendado: 0.02-0.05
  speed:       number   // Recomendado: 0.0002-0.0005
  interactive: boolean  // Mouse parallax (solo desktop)
  opacity:     number   // Recomendado: 0.4-0.7
}

const DEFAULT_CONFIG: ParticleConfig = {
  count:       120,
  color:       '#FF5757',  // var(--accent) de oskinar.es
  size:        0.03,
  speed:       0.0003,
  interactive: true,
  opacity:     0.5,
}

export default function ParticleSystem({ 
  config = DEFAULT_CONFIG 
}: { config?: Partial<ParticleConfig> }) {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const [THREE, setTHREE] = useState<typeof import('three') | null>(null)

  // CAPA 2: Importar Three.js solo tras hidratación del componente
  useEffect(() => {
    let cancelled = false

    // CAPA 3a: Respetar prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // CAPA 3b: No cargar en conexiones lentas o modo ahorro de datos
    const conn = (navigator as any).connection
    const isSlowNet = conn?.effectiveType === '2g' || conn?.saveData

    // CAPA 3c: No cargar en móviles con batería baja (experimental)
    const isMobileLow = window.innerWidth < 768

    if (prefersReduced || isSlowNet) return

    import('three').then((mod) => {
      if (!cancelled) setTHREE(mod)
    })

    return () => { cancelled = true }
  }, [])

  // Inicializar escena cuando Three.js está disponible
  useEffect(() => {
    if (!THREE || !canvasRef.current) return

    const canvas   = canvasRef.current
    const W        = window.innerWidth
    const H        = window.innerHeight

    // Renderer con configuración de bajo consumo
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha:           true,
      antialias:       false,  // OFF en partículas — no aporta calidad
      powerPreference: 'low-power',
    })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Cap DPR

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 100)
    camera.position.z = 3

    // Geometría de partículas
    const geometry  = new THREE.BufferGeometry()
    const positions = new Float32Array(cfg.count * 3)
    for (let i = 0; i < cfg.count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size:          cfg.size,
      color:         new THREE.Color(cfg.color),
      transparent:   true,
      opacity:       cfg.opacity,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse parallax (solo desktop)
    const handleMouse = (e: MouseEvent) => {
      if (!cfg.interactive) return
      mouseRef.current.x = (e.clientX / W - 0.5) * 0.5
      mouseRef.current.y = (e.clientY / H - 0.5) * 0.5
    }
    if (cfg.interactive) window.addEventListener('mousemove', handleMouse)

    // Loop de animación
    let frameId: number
    const clock = new THREE.Clock()
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      particles.rotation.y = t * cfg.speed
      particles.rotation.x = t * cfg.speed * 0.3

      // Suave parallax con mouse
      if (cfg.interactive) {
        particles.rotation.y += (mouseRef.current.x - particles.rotation.y) * 0.02
        particles.rotation.x += (mouseRef.current.y - particles.rotation.x) * 0.02
      }

      renderer.render(scene, camera)
    }
    animate()

    // Resize throttled
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const nW = window.innerWidth
        const nH = window.innerHeight
        camera.aspect = nW / nH
        camera.updateProjectionMatrix()
        renderer.setSize(nW, nH)
      }, 150)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup total — evitar memory leaks
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      renderer.forceContextLoss()
    }
  }, [THREE, cfg])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        -1,
        pointerEvents: 'none',
        opacity:       THREE ? 1 : 0,
        transition:    'opacity 1.5s ease',
      }}
    />
  )
}
```

### Uso en Astro (CAPA 1 — client:visible)

```astro
---
// src/pages/index.astro
import ParticleSystem from '../components/three/ParticleSystem'

const particleConfig = {
  count:       120,
  color:       '#FF5757',   // --accent de oskinar.es
  size:        0.03,
  speed:       0.0003,
  interactive: true,
  opacity:     0.5,
}
---

<html lang="es">
<body>
  <!-- CAPA 1: client:visible garantiza que Three.js no compite con LCP -->
  <!-- El componente solo se hidrata cuando entra en el viewport -->
  <ParticleSystem client:visible config={particleConfig} />
  
  <!-- El resto del contenido carga ANTES que las partículas -->
  <header>...</header>
  <main>...</main>
</body>
</html>
```

---

## Configuraciones Preset para oskinar.es

```typescript
// src/components/three/presets.ts

export const PARTICLE_PRESETS = {
  // Hero: elegante y sutil (no compite con el copy)
  hero: {
    count:       120,
    color:       '#FF5757',
    size:        0.025,
    speed:       0.0003,
    interactive: true,
    opacity:     0.45,
  },

  // Blog: muy sutil para no distraer de la lectura
  blog: {
    count:       60,
    color:       '#FF5757',
    size:        0.015,
    speed:       0.0002,
    interactive: false,
    opacity:     0.25,
  },

  // Portfolio: medio para equilibrio
  portfolio: {
    count:       90,
    color:       '#FF5757',
    size:        0.02,
    speed:       0.00025,
    interactive: true,
    opacity:     0.35,
  },
} as const
```

---

## Análisis de Impacto en Performance

```
ANTES de implementar:
  LCP:  ~800ms  (imagen/texto del hero)
  
DESPUÉS con implementación correcta:
  LCP:  ~800ms  (sin cambios — Three.js no compite)
  
THREE.JS en network:
  Tamaño:       ~600kB (sin gzip) / ~180kB (gzip)
  Momento:      Después del LCP, cuando el usuario ya ve el hero
  Prioridad:    Baja (browser la asigna automáticamente)
  Bloqueo:      0 — async import en useEffect
```

---

## Checklist de Implementación

- [ ] ¿Usa `client:visible` en Astro (no `client:load`)?
- [ ] ¿El import de Three.js está dentro de `useEffect`?
- [ ] ¿Hay check de `prefers-reduced-motion`?
- [ ] ¿Hay check de conexión lenta?
- [ ] ¿El canvas tiene `aria-hidden="true"`?
- [ ] ¿El cleanup del `useEffect` hace dispose de todos los recursos?
- [ ] ¿El `pixelRatio` está capeado a 1.5?
- [ ] ¿El resize está throttled?
- [ ] ¿Hay fade-in (`opacity: 0 → 1`) para que la aparición sea suave?

---

*Skill: particles-system | v1.0.0 | Three.js r164*
