import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.COCKROACH_DB_PORT,
  user: process.env.COCKROACH_DB_USER,
  password: process.env.COCKROACH_DB_PASSWORD,
  database: process.env.COCKROACH_DB_DATABASE,
  host: process.env.COCKROACH_DB_HOST,
  admin_username: process.env.ADMIN_USERNAME,
  admin_password: process.env.ADMIN_PASSWORD,
};
