// src/config/auth.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  accessExpiration: process.env.JWT_ACCESS_EXPIRATION ?? '15m',
  refreshExpirationDays: parseInt(
    process.env.JWT_REFRESH_EXPIRATION ?? '7',
    10,
  ),
  issuer: process.env.JWT_ISSUER ?? 'tu-api',
  audience: process.env.JWT_AUDIENCE ?? 'tu-frontend',
  basicUser: process.env.BASIC_AUTH_USER,
  basicPass: process.env.BASIC_AUTH_PASS,
}));
