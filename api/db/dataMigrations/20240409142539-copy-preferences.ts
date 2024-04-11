import type { PrismaClient } from '@prisma/client';

export default async ({ db }: { db: PrismaClient }) => {
  console.log('db', db);
  // Migration here...
};
