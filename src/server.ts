import 'dotenv/config';

import app from './app.js';
import pool from './config/database.js';

const PORT = Number.parseInt(process.env.PORT ?? '3000', 10);
const HOST = process.env.HOST ?? 'localhost';

const startServer = async () => {
  try {
    const result = await pool.query<{ now: string }>('SELECT NOW() as now');
    console.log(`Database connected: ${result.rows[0]?.now ?? 'unknown'}`);

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server is running at http://${HOST}:${PORT}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}, shutting down...`);
      await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      await pool.end();
    };

    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
  }
};

void startServer();
