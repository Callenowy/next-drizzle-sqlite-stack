import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  driver: 'better-sqlite',
  schema: `./src/db/schema/*`,
  out: `./src/db/drizzle`,
  dbCredentials: {
    // url: `${process.env.DB_PATH}/db.sqlite`,
    url: `./src/db/db.sqlite`,
  },
} satisfies Config;
