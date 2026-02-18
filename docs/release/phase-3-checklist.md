# Fase 3 — Publicable (siguiente iteración)

## 1) CI pipeline

- [ ] Workflow activo en `.github/workflows/ci.yml`.
- [ ] Validación obligatoria en PR: `npm run check`.
- [ ] Política de merge: bloquear merge si CI falla.

## 2) Crash / Analytics

Base implementada:
- `apps/mobile/services/telemetry.ts` (bootstrap + `trackScreen` + `trackEvent` + `trackError`).
- Integración de tracking de pantallas en `apps/mobile/app/_layout.tsx`.

Pendiente productivo:
- [ ] Conectar proveedor real (Sentry o Crashlytics + analytics).
- [ ] Enviar `trackError` a backend/proveedor.
- [ ] Definir eventos mínimos de producto:
  - [ ] `mission_opened`
  - [ ] `quiz_started`
  - [ ] `quiz_answer_reviewed`
  - [ ] `quiz_completed`
  - [ ] `progress_reset`

## 3) Release store prep

- [ ] Iconografía final (app icon + adaptive icon + splash).
- [ ] Metadata tienda ES/EN:
  - [ ] Nombre corto
  - [ ] Descripción corta
  - [ ] Descripción larga
  - [ ] Keywords / categoría
  - [ ] Política de privacidad URL
- [ ] Screenshots de store (teléfonos pequeños/medianos/grandes).
- [ ] Configurar `eas.json` para builds `preview` y `production`.
- [ ] Definir estrategia de versionado:
  - [ ] `expo.version` semántico
  - [ ] `android.versionCode` / `ios.buildNumber` autoincremental

## 4) QA matrix mínima

| Área | Caso | Estado |
|---|---|---|
| Navegación | Home → Mission → Quiz → Result | ☐ |
| Quiz | selección / revisión / siguiente | ☐ |
| Scoring | 0%, parcial, 100% | ☐ |
| Persistencia | progreso persiste al reiniciar app | ☐ |
| Reset | borrar progreso y refresco de UI | ☐ |
| Robustez | score inválido en ruta result | ☐ |
| Robustez | mission id inválido en rutas | ☐ |
| UX | contraste básico y legibilidad | ☐ |

## 5) Gate de salida a publicación

- [ ] CI verde en `main`.
- [ ] QA matrix sin bloqueantes.
- [ ] Crash-free rate aceptable en beta interna.
- [ ] Build firmada y validada en dispositivos reales (Android+iOS).
