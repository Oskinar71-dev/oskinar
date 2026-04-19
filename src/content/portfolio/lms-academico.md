---
title: Plataforma Académica (LMS)
description: LMS a medida que reemplazó LearnDash eliminando 15 plugins innecesarios. Carga 3× más rápida y mantenimiento simplificado.
publishedAt: 2024-05-20
tags: [Astro, Sanity CMS, Optimización]
metric:
  label: Mejora de velocidad de carga
  value: "3×"
---

## El problema

La plataforma educativa del cliente acumulaba 23 plugins activos, un tiempo de carga de 8 segundos y una puntuación Lighthouse de 34. Imposible de mantener.

## La solución

Migré a una arquitectura headless con Astro como frontend y Sanity como CMS, reemplazando todos los plugins con código a medida.

- **Sistema de cursos** con progreso persistido en localStorage + API propia
- **Control de acceso** por nivel de suscripción sin plugin de membresía
- **Reproductor de vídeo** propio con protección de contenido
- **Buscador estático** con Pagefind, sin servidor

## Resultado

Tiempo de carga: de 8s a 2.6s. Lighthouse: de 34 a 96. Plugins activos: de 23 a 0.
