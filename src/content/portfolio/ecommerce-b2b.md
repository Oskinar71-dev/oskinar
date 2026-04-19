---
title: E-commerce B2B de Alto Tráfico
description: Plataforma de comercio B2B con checkout personalizado y sincronización bidireccional con ERP externo vía REST API.
publishedAt: 2024-08-15
tags: [Node.js, REST API, Redis Cache]
metric:
  label: Uptime garantizado
  value: "99.9%"
---

## El problema

El cliente operaba con un eCommerce estándar que no soportaba flujos B2B: precios por cliente, pedidos mínimos, aprobaciones internas y sincronización con su ERP SAP.

## La solución

Reconstruí el checkout desde cero con lógica de negocio específica para B2B e integré una capa de sincronización bidireccional con el ERP mediante REST API.

- **Checkout personalizado** con reglas de precio por segmento de cliente
- **Sistema de aprobaciones** con flujo de notificaciones interno
- **Redis Cache** para catálogos de 50k+ productos sin latencia
- **Webhook bidireccional** con SAP para stock en tiempo real

## Resultado

La plataforma procesa actualmente 3.000 pedidos mensuales con un uptime del 99.9% y un tiempo de respuesta medio de 180ms.
