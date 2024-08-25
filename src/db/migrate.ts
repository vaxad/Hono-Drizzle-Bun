// src/migrate.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

// if (!process.env.DATABASE_URL) throw new Error('No database url provided')
const sql = neon("postgresql://hono-test_owner:nbXzB0o7VywL@ep-sweet-bonus-a1dcrjkn.ap-southeast-1.aws.neon.tech/hono-test?sslmode=require");
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('Migration completed');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
};

main();