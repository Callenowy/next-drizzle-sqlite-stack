import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import SQLite from 'better-sqlite3';

const sqlite = new SQLite(`${process.env.DB_PATH}/db.sqlite`);
export const db = drizzle(sqlite);
