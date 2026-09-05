import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env';

import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
  sql: ReturnType<typeof postgres> | undefined;
};

const sql = globalForDb.sql ?? postgres(env.DATABASE_URL);

export const db = globalForDb.db ?? drizzle(sql, { schema });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
  globalForDb.sql = sql;
}
