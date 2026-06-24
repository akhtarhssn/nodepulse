import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { checkout, polar, portal } from "@polar-sh/better-auth";

import prisma from "@/lib/db";
import { polarClient } from "@/lib/polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true, autoSignIn: true },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "e3803f18-776f-46d2-80cc-3b7106712d64",
              slug: "pro",
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000",
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
  user: {
    modelName: "User",
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
});
