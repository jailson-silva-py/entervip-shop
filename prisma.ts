import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const adapter = new PrismaLibSQL({

    url: process.env.LIBSQL_DATABASE_URL!,
    authToken: process.env.LIBSQL_DATABASE_TOKEN!,

})

export const prisma =
  globalForPrisma.prisma || new PrismaClient({adapter}).$extends(withAccelerate())
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma