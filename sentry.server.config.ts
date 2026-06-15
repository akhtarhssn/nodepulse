// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0ca4f794529c1aa9672eb0f9bbed98d4@o4511545945030656.ingest.us.sentry.io/4511545959579648",

  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true, // Whether to record the inputs to the AI function. Defaults to false.
      recordOutputs: true, // Whether to record the outputs of the AI function. Defaults to false.
    }),
    Sentry.consoleLoggingIntegration({levels: ['log', 'warn', 'error']})
  ],
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  streamGenAiSpans: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  debug: false,
});
