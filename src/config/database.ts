import { Pool } from 'pg';
import type { PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  statement_timeout: 30000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export const db = {
  query: (text: string, params?: any[]): Promise<QueryResult<any>> => {
    return pool.query(text, params);
  },

  getClient: (): Promise<PoolClient> => {
    return pool.connect();
  },

  healthCheck: async (): Promise<boolean> => {
    try {
      await pool.query('SELECT NOW()');
      console.log('Database connection verified');
      return true;
    } catch (err) {
      console.error('Database health check failed', err);
      return false;
    }
  },

  close: async (): Promise<void> => {
    await pool.end();
  },
};

export default pool;
