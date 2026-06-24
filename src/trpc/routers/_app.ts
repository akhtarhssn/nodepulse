import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    // throw new TRPCError({
    //   code: "BAD_REQUEST",
    //   message: "This is a test error from the testAi mutation",
    // });
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "AI test initiated" };
  }),

  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "app/task.created",
      data: {
        id: "123",
        email: "user@example.com",
      },
    });
    return { success: true, message: "Workflow creation initiated" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
