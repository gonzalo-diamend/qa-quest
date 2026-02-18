const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : false;

type TelemetryEvent = {
  name: string;
  params?: Record<string, string | number | boolean | null | undefined>;
};

let initialized = false;

export function initializeTelemetry() {
  if (initialized) {
    return;
  }
  initialized = true;

  // Placeholder for crash SDK bootstrap (e.g., Sentry/Firebase Crashlytics).
  if (isDev) {
    console.log("[telemetry] initialized");
  }
}

export function trackScreen(screenName: string) {
  trackEvent({ name: "screen_view", params: { screen_name: screenName } });
}

export function trackEvent(event: TelemetryEvent) {
  // Placeholder for analytics provider call.
  if (isDev) {
    console.log("[telemetry] event", event);
  }
}

export function trackError(error: unknown, context?: string) {
  // Placeholder for crash reporting provider call.
  if (isDev) {
    console.error("[telemetry] error", context ?? "unknown_context", error);
  }
}
