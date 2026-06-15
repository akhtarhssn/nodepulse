import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import * as Sentry from "@sentry/nextjs";

import prisma from "@/lib/db";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai", triggers: { event: "execute/ai" } },
  async ({ event, step }) => {

    await step.sleep("pretend", "5s");

    Sentry.logger.warn("Something Went wrong inside the function!", {log_source: "sentry_test"});
    Sentry.logger.error("This is an error I want to track in Sentry!", {log_source: "sentry_test2"});

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-3.5-flash"),
        system: "You are a helpful assistant for generating recipes.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-3.5-turbo"),
        system: "You are a helpful assistant for generating recipes.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-0"),
        system: "You are a helpful assistant for generating recipes.",
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      },
    );
    // return { message: `Task ${event.data.id} complete`, result };
    return { geminiSteps, openaiSteps, anthropicSteps };
  },
);
