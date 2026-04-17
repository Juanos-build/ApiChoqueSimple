import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { UsuarioLoginExtended } from 'src/infrastructure/entities/usuario.login.entity';
import { UsuarioExtend } from 'src/infrastructure/entities/usuario.entity';
import { StringValue } from 'ms';

export interface AppJwtPayload {
  idUsuario: number;
  email: string;
  idAplicacion?: number;
}

interface AuthConfig {
  jwtSecret: string;
  accessExpiration: StringValue;
  issuer: string;
  audience: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Recibe el usuario y arma los claims
  createAccessToken(user: UsuarioExtend, idAplicacion?: number): string {
    const payload: AppJwtPayload = {
      idUsuario: user.idUsuario!,
      email: user.email!,
      idAplicacion,
    };

    const authConfig = this.configService.get<AuthConfig>('auth');

    if (!authConfig?.jwtSecret || !authConfig?.accessExpiration) {
      throw new Error('Configuración JWT incompleta');
    }

    return this.jwtService.sign(payload, {
      secret: authConfig.jwtSecret,
      expiresIn: authConfig.accessExpiration,
      issuer: authConfig.issuer,
      audience: authConfig.audience,
    });
  }

  createRefreshToken(ip: string): UsuarioLoginExtended {
    const token = new UsuarioLoginExtended();
    token.token = randomBytes(64).toString('hex');
    token.tokenRefresh = randomBytes(64).toString('hex');
    token.createdByIp = ip;
    token.created = new Date().toISOString();

    const expires = new Date();
    expires.setDate(
      expires.getDate() +
        this.configService.get<number>('auth.refreshExpirationDays', 7),
    );
    token.expires = expires.toISOString();

    return token;
  }

  rotateRefreshToken(
    old: UsuarioLoginExtended,
    ip: string,
  ): UsuarioLoginExtended {
    const next = this.createRefreshToken(ip);
    next.replacedByToken = old.token; // marca cuál reemplazó
    return next;
  }

  // Elimina tokens viejos inactivos de la lista en memoria antes de persistir
  cleanupRefreshTokens(user: UsuarioExtend): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 2); // elimina los de más de 2 días inactivos

    user.refreshTokens = user.refreshTokens?.filter(
      (t) => t.isActive || new Date(t.created!) > cutoff,
    );
  }
}
