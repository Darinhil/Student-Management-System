import { Pool } from 'pg';
import type { QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

export const db = {
  query: <T extends QueryResultRow = any>(
    text: string,
    params?: readonly unknown[],
  ): Promise<QueryResult<T>> => pool.query(text, params as any[]),
};

export default pool;
