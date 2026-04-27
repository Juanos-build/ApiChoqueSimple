import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  idUsuario: number;
  email: string;
  idAplicacion: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('auth.jwtSecret');
    if (!secret) {
      throw new Error('JWT_SECRET no está definido');
    }

    super({
      // Extrae el token del header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      issuer: configService.get<string>('auth.issuer'),
      audience: configService.get<string>('auth.audience'),
    });
  }

  validate(payload: JwtPayload) {
    // Lo que retornes aquí queda disponible en request.user
    return {
      idUsuario: payload.idUsuario,
      email: payload.email,
      idAplicacion: payload.idAplicacion,
    };
  }
}
