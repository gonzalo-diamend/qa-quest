# QA Quest

App mobile (Expo + React Native) para aprender QA con misiones, lecciones y quizzes.

## Estado actual

La app ya incluye:

- Navegación con `expo-router`.
- Misiones data-driven desde `packages/content`.
- Flujo funcional: Home → Mission → Quiz → Result.
- Feedback por pregunta antes de avanzar.
- Persistencia local de progreso con AsyncStorage + Zustand.
- Pantalla de progreso acumulado.
- Cálculo de score en `packages/shared`.
- Tests unitarios para scoring y validación básica de contenido.

## Estructura del monorepo

- `apps/mobile`: app Expo.
- `packages/content`: contenido de misiones.
- `packages/shared`: tipos y lógica compartida.

## Requisitos

- Node.js 20+ (recomendado).
- pnpm 9.

## Instalación

```bash
pnpm install
```

## Ejecutar app

```bash
pnpm start
```

O directo en mobile:

```bash
pnpm --filter qa-quest-mobile start
```

## Scripts útiles

Desde la raíz:

- `pnpm start`
- `pnpm android`
- `pnpm ios`
- `pnpm typecheck`
- `pnpm test`

Desde `apps/mobile`:

- `pnpm start`
- `pnpm android`
- `pnpm ios`
- `pnpm typecheck`

## Roadmap sugerido (siguiente iteración)

- Gamificación (streak diaria, badges, niveles).
- Banco de preguntas más amplio por misión.
- Sincronización remota de progreso (backend).
- E2E de flujo completo (home → quiz → result → progress).

## Notas Expo/Web

Actualmente `apps/mobile/app.json` define plataformas `ios` y `android` únicamente. Si querés correr en web, agregar `"web"` a `platforms` y configurar paquetes web necesarios.
