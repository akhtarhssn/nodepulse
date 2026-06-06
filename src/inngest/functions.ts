import prisma from "@/lib/db";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    // fetching the video
    await step.sleep("fetching-video", "5s");

    // Transforming the video
    await step.sleep("transforming-video", "5s");

    // Sending the video to AI
    await step.sleep("sending-to-ai", "5s");

    await step.run("creating-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: `Workflow for task ${event.data.id}`,
          description: `Workflow created for task ${event.data.id}`,
        },
      });
    });

    return { message: `Task ${event.data.id} complete`, result };
  },
);
