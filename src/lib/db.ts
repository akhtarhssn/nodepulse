import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Ensure the connection string exists before passing it
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

// Pass the configuration object directly into the PrismaNeon adapter
const neonAdapter = new PrismaNeon({ connectionString });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter: neonAdapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
