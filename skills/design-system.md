# 🎨 SKILL: DESIGN SYSTEM — oskinar.es
> **Fuente de verdad visual del proyecto. Leer ANTES de escribir cualquier CSS o componente.**

---

## Identidad Visual

**Tema**: Split Dark Gunmetal + Orange Coral  
**Personalidad**: Tech, preciso, oscuro, con energía naranja  
**Fuente**: Plus Jakarta Sans (400 / 500 / 700 / 800)  
**Código**: Courier New monospace  

---

## Paleta Completa

```
FONDOS (de oscuro a claro):
  #15161A  →  bg-footer (más profundo)
  #1E1F26  →  bg-left   (fondo base / lado izquierdo del split)
  #252630  →  bg-right  (tarjetas / lado derecho del split)
  #2A2C36  →  bg-glass  (glass card del hero)

ACENTO NARANJA CORAL:
  #FF5757  →  accent principal (botones, dots, badges)
  #FF8A65  →  accent soft (final de gradiente)
  #FF4040  →  accent hover (botón primario en hover)

TEXTO:
  #FFFFFF  →  text-main
  #9DA0B0  →  text-muted (gris azulado medio)

SYNTAX COLORS (para code snippets):
  #FF5757  →  keywords    (mismo que accent — coherencia)
  #69F0AE  →  strings     (Mint Green)
  #7C4DFF  →  functions   (Violet)
  #FFD740  →  variables   (Amber Yellow)
  #5C6070  →  comments    (gris desaturado)
```

---

## Reglas de Uso de Color

### ✅ CORRECTO

```css
/* Siempre usar Custom Properties */
.card { background: var(--bg-right); }
.accent-text { color: var(--accent); }
.btn-primary { background: var(--accent); box-shadow: var(--shadow-btn); }
```

### ❌ INCORRECTO

```css
/* NUNCA hardcodear colores */
.card { background: #252630; }  /* Rompe el theming */
.accent-text { color: orange; } /* No es el naranja del brand */
```

---

## Tipografía

### Jerarquía

| Elemento | Tamaño | Peso | Letter-spacing |
|----------|--------|------|----------------|
| H1 Hero | `clamp(3rem, 5vw, 5rem)` | 800 | -1px |
| H2 Sección | `3rem` | 800 | normal |
| H3 Tarjeta | `1.5rem` | 600 | normal |
| Body grande | `1.1rem` | 400 | normal |
| Body normal | `1rem` | 400 | normal |
| Body pequeño | `0.95rem` | 400/500 | normal |
| Badge/Tag | `0.75rem` | 700 | 1.5px (uppercase) |
| Navegación | `0.95rem` | 500 | normal |
| Logo | `1.5rem` | 800 | normal |

### Implementación en Astro/React

```astro
<!-- Preload de fuente crítica en <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link 
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=optional"
  rel="stylesheet"
>
```

**Nota**: Usar `display=optional` en lugar de `swap` evita FOUT y mejora CLS.

---

## Componentes UI Canónicos

### Badge (Etiqueta de sección)

```css
/* Patrón exacto del original */
.badge {
  display: inline-block;
  padding: 6px 12px;
  background: var(--accent-tint-md);  /* rgba(255,87,87,0.10) */
  color: var(--accent-soft);          /* #FF8A65 */
  border-radius: var(--radius-badge); /* 4px */
  font-size: var(--text-badge);       /* 0.75rem */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 2rem;
}
```

```html
<span class="badge">Casos de Éxito</span>
```

### Botón Primario

```css
.btn-primary {
  display: inline-block;
  padding: 12px 32px;
  border-radius: var(--radius);
  background: var(--accent);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.3px;
  border: 1px solid transparent;
  text-decoration: none;
  box-shadow: var(--shadow-btn);
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-btn-hover);
}
```

### Botón Outline

```css
.btn-outline {
  display: inline-block;
  padding: 12px 32px;
  border-radius: var(--radius);
  background: transparent;
  border: 1px solid var(--border-btn);
  color: var(--text-main);
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(255, 87, 87, 0.05);
}
```

### Tarjeta de Proyecto

```css
.project-card {
  background: var(--bg-right);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-hover);
}
```

### Glass Card (Hero visual)

```css
.glass-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: var(--glass-p);
  box-shadow: var(--shadow-card);
  animation: floatCard 8s ease-in-out infinite;
}
```

### Stack Item

```css
.stack-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
  font-weight: 600;
  color: var(--text-muted);
  transition: all var(--transition);
}

.stack-item:hover,
.stack-item.active {
  background: var(--accent-tint-md);
  border-color: var(--accent);
  color: var(--text-main);
  transform: translateY(-5px);
}
```

### Tech Tag (dentro de tarjeta)

```css
.tech-tag {
  font-size: var(--text-tag);
  font-family: var(--font-mono);
  color: var(--accent-soft);
  background: var(--accent-tint);
  padding: 4px 8px;
  border-radius: var(--radius-tag);
}
```

### Link con Flecha

```css
.link-arrow {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color var(--transition-fast);
}

.link-arrow:hover { color: var(--accent); }
.link-arrow span  { transition: transform var(--transition-fast); }
.link-arrow:hover span { transform: translateX(5px); }
```

---

## Layout del Hero (Split Design)

El efecto split es la firma visual más importante de oskinar.es.

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: var(--nav-height);

  /* SPLIT: izquierda oscura, derecha levemente más clara */
  background: linear-gradient(
    90deg,
    var(--bg-left)  0%,
    var(--bg-left)  50%,
    var(--bg-right) 50%,
    var(--bg-right) 100%
  );
}

/* Sombra sutil en la división central */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0));
  pointer-events: none;
}

/* Grid 50/50 */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: var(--container-width);
}
```

**⚠️ REGLA**: En mobile (< 992px), el split se elimina y el fondo vuelve a `var(--bg-left)` puro.

---

## Efectos Ambientales

### Glow de Fondo

El resplandor naranja ambiental debe estar siempre presente. No afecta al LCP porque usa `position: fixed` y `z-index: -1`.

```css
.glow-bg {
  position: fixed;
  top: -20%;
  left: -10%;
  width: 60vw;
  height: 60vw;
  background: var(--gradient-glow);
  filter: blur(100px);
  opacity: 0.5;
  z-index: -1;
  pointer-events: none;
  animation: pulseGlow 10s infinite alternate;
}
```

### Línea Guía Central

Efecto arquitectónico sutil que refuerza la composición split.

```css
.center-guide {
  position: fixed;
  top: 0; left: 50%;
  width: 1px; height: 100%;
  background: rgba(255, 255, 255, 0.03);
  z-index: 0;
  pointer-events: none;
}
```

---

## Secciones Estándar

```css
.section {
  padding: var(--section-py) 0;  /* 120px arriba y abajo */
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: var(--section-header-mb);  /* 80px */
  max-width: 600px;
}

.section-header h2 {
  font-size: var(--text-h2);   /* 3rem */
  font-weight: 800;
  line-height: 1.1;
  margin-top: 1rem;            /* Espacio tras el badge */
}
```

---

## Footer

```css
.footer {
  padding: 100px 0 40px 0;
  background: var(--gradient-footer);
  text-align: center;
  border-top: 1px solid var(--border-subtle);
}

.big-email {
  display: block;
  font-size: var(--text-big-email);
  font-weight: 800;
  color: var(--text-muted);
  text-decoration: none;
  margin: 3rem 0;
  transition: color var(--transition);
}

.big-email:hover {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 4px;
}
```

---

## Checklist antes de Publicar cualquier UI

- [ ] ¿Usa `var(--...)` del design system? ¿0 valores hardcodeados?
- [ ] ¿El contraste texto/fondo cumple WCAG AA (4.5:1 mínimo)?
- [ ] ¿Las animaciones tienen `@media (prefers-reduced-motion)` desactivándolas?
- [ ] ¿Las imágenes tienen `alt` descriptivo?
- [ ] ¿Los botones tienen texto descriptivo o `aria-label`?
- [ ] ¿El CLS es 0? (imágenes con dimensiones definidas, fonts con `display=optional`)
- [ ] ¿Funciona a 320px de ancho mínimo?
- [ ] ¿El split del hero desaparece correctamente en mobile (< 992px)?

---

*Skill: design-system | v1.0.0 | Basado en style.css original de oskinar.es*
