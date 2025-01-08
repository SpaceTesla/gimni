import { Pool } from 'pg';
import config from './config';

const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: Number(config.port),
  ssl: {
    rejectUnauthorized: true,
  },
  max: 10, // Equivalent to `connectionLimit`
  idleTimeoutMillis: 10000, // Timeout for idle connections
});

const connection = await pool.connect();

if (connection) {
  console.log('Database connected');
  connection.release(); // Release the connection back to the pool
} else {
  console.error('Database connection failed');
}

export default pool;
