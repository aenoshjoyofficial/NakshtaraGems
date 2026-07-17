import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

declare global {
  // Allow global var to persist across hot-reloads in dev
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl) {
    const adapter = new PrismaBetterSqlite3({ url: envUrl });
    return new PrismaClient({ adapter });
  }
  const dbPath = `file:${path.join(process.cwd(), '../../prisma/dev.db')}`;
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  return new PrismaClient({ adapter });
}

let prisma: PrismaClient;

if (!global.__prisma) {
  global.__prisma = createPrismaClient();
}
prisma = global.__prisma;

export { prisma };
export default prisma;
