import dotenv from 'dotenv';

dotenv.config();

console.log('Environment Variables:', {
  port: process.env.COCKROACH_DB_PORT,
  user: process.env.COCKROACH_DB_USER,
  password: process.env.COCKROACH_DB_PASSWORD,
  database: process.env.COCKROACH_DB_DATABASES,
  host: process.env.COCKROACH_DB_HOST,
});

export default {
  port: process.env.COCKROACH_DB_PORT,
  user: process.env.COCKROACH_DB_USER,
  password: process.env.COCKROACH_DB_PASSWORD,
  database: process.env.COCKROACH_DB_DATABASE,
  host: process.env.COCKROACH_DB_HOST,
};
