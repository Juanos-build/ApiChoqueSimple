import { registerAs } from '@nestjs/config';

// Equivale a appSettings.Connection — centraliza la config de BD
export default registerAs('database', () => ({
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  encrypt: process.env.DB_ENCRYPT === 'true',
}));
