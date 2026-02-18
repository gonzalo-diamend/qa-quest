# QA Quest

App mobile (Expo + React Native) para aprender QA con misiones, lecciones y quizzes.

## Estado actual

La base de la app ya incluye:

- Navegación con `expo-router`.
- Misión de ejemplo (`qa-001`) centralizada en `packages/content`.
- Flujo funcional: Home → Mission → Quiz → Result.
- Cálculo de score en `packages/shared`.

## Qué faltaba para dejarla funcional

Estos eran los puntos que bloqueaban o debilitaban el funcionamiento real:

1. **Dependencias de workspace faltantes en mobile**
   - La app importaba `@qa-quest/content` y `@qa-quest/shared`, pero no estaban declaradas como dependencies del paquete mobile.
   - Se agregaron como `workspace:*` para que el bundler resuelva correctamente en entorno monorepo.

2. **Tipado débil en el scoring compartido**
   - `scoreQuiz` usaba `any` y no contemplaba quizzes vacíos.
   - Se tipó con `Activity` y se agregó fallback seguro (`score: 0`) cuando no hay preguntas.

3. **Falta de guía operativa para levantar el proyecto**
   - No había README raíz con pasos de ejecución, estructura y próximos pasos.
   - Se documentó setup, scripts, arquitectura y roadmap.

## Estructura del monorepo

- `apps/mobile`: app Expo.
- `packages/content`: contenido de misiones (data-driven).
- `packages/shared`: tipos y lógica compartida (ej. scoring).

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

Desde `apps/mobile`:

- `pnpm start`
- `pnpm android`
- `pnpm ios`
- `pnpm typecheck`


## Checklist de aceptación MVP (Fase 1)

Para cerrar el MVP demo hoy, validar manualmente en Android/iOS:

- [ ] La app abre y renderiza Home sin errores.
- [ ] Se visualizan al menos 2 misiones en Home.
- [ ] Se puede entrar a una misión y ver bloques de lección.
- [ ] Se puede iniciar quiz y responder preguntas.
- [ ] Al finalizar, el score mostrado coincide con respuestas correctas.
- [ ] El intento queda persistido y aparece en `Progreso`.
- [ ] Al reiniciar la app, el progreso sigue presente (persistencia local).
- [ ] La acción `Borrar progreso` limpia los datos y la vista se actualiza.

Criterio de salida de Fase 1: todos los checks en verde + sin crashes durante el recorrido completo de 2 misiones.

## Roadmap sugerido (siguiente iteración)

- Persistencia de progreso local (AsyncStorage + store global).
- Pantalla de listado de resultados/progreso acumulado.
- Múltiples misiones en `packages/content`.
- Feedback por pregunta (mostrar explicación antes de avanzar).
- Tests unitarios para `scoreQuiz` y validación de contenido de misiones.

## Publicación (Fase 3)

Ver checklist detallado en `docs/release/phase-3-checklist.md`.

## Notas Expo/Web

Actualmente `apps/mobile/app.json` define plataformas `ios` y `android` únicamente. Si querés correr en web, agregar `"web"` a `platforms` y configurar los paquetes web necesarios.
