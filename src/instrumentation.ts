import * as Sentry from "@sentry/nextjs";

/**
 * Loads Sentry configuration appropriate for the current runtime environment.
 *
 * Imports the Node.js server configuration when running in a Node.js runtime,
 * or the Edge configuration when running in an Edge runtime.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
