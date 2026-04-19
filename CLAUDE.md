# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oskinar is a static personal portfolio website for a WordPress & AI developer. It is plain HTML5 + CSS3 with no build system, package manager, or JavaScript framework.

- **Language of content**: Spanish (es-ES)
- **External dependency**: Google Fonts (Plus Jakarta Sans)

## Development

No build or install step required. Open `index.html` directly in a browser or serve it with any static file server:

```bash
# Quick local server (Python)
python -m http.server 8080

# Quick local server (Node, if available)
npx serve .
```

## Architecture

The entire site lives in two files:

- `index.html` — single-page layout with sections: navbar, hero, projects, tech stack, footer/contact
- `style.css` — all styling; uses CSS custom properties defined in `:root`

### CSS design tokens (`:root`)

| Variable | Purpose |
|---|---|
| `--bg-left`, `--bg-right` | Dark gunmetal background colors |
| `--accent-color` / `--accent-gradient` | Coral orange (`#FF5757`) accent |
| `--text-main`, `--text-muted` | White and gray text |
| `--container-width` | 1200px max-width |
| `--nav-height` | 90px fixed navbar |

### Layout grid

- **Hero**: 2-column 50/50 grid → stacks at `max-width: 992px`
- **Projects**: `auto-fit, minmax(350px, 1fr)`
- **Tech stack**: `auto-fill, minmax(140px, 1fr)`

### Key visual features

- Fixed vertical center line (decorative, CSS `::before` on `.center-line`)
- Pulsing ambient glow (`pulseGlow` keyframe, 10 s)
- Floating code card (`floatCard` keyframe, 8 s)
- Glass-morphism code snippet with custom syntax-highlight CSS variables
