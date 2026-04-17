import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from 'src/infrastructure/dao/transaction.service';
import { TokenService } from './token.service';
import { UsuarioExtend } from 'src/infrastructure/entities/usuario.entity';
import {
  UsuarioLogin,
  LoginRequest,
} from 'src/infrastructure/entities/usuario.login.entity';
import { AppRequest, AppResponse } from 'src/common/models/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async autenticar(
    request: AppRequest<LoginRequest>,
    user: UsuarioExtend, // ya validado (email + clave OK)
    ip: string,
    res: Response,
  ): Promise<AppResponse<Partial<UsuarioExtend>>> {
    // 1. Traer refresh tokens activos del usuario
    const tokensActivos = await this.transactionService.obtenerUsuarioLogin(
      Object.assign(new UsuarioLogin(), { codeLogin: user.email }),
    );

    // 2. Buscar el más reciente no expirado
    const tokenToRefresh =
      tokensActivos
        ?.filter((t) => !t.isExpired)
        .sort(
          (a, b) =>
            new Date(b.expires!).getTime() - new Date(a.expires!).getTime(),
        )[0] ?? null;

    // 3. Rotar o crear — equivale a tu lógica ternaria
    const newRefreshToken = tokenToRefresh
      ? this.tokenService.rotateRefreshToken(tokenToRefresh, ip)
      : this.tokenService.createRefreshToken(ip);

    newRefreshToken.codeLogin = user.email;
    user.refreshTokens.push(newRefreshToken);

    // 4. Cleanup — elimina viejos antes de persistir
    this.tokenService.cleanupRefreshTokens(user);

    // 5. Persistir
    const loginList = user.refreshTokens.map((rt) => {
      const ul = new UsuarioLogin();
      ul.codeLogin = rt.codeLogin;
      ul.token = rt.token;
      ul.expires = rt.expires;
      ul.created = rt.created;
      ul.createdByIp = rt.createdByIp;
      ul.revoked = rt.revoked;
      ul.revokedByIp = rt.revokedByIp;
      ul.replacedByToken = rt.replacedByToken;
      ul.reasonRevoked = rt.reasonRevoked;
      ul.tokenRefresh = rt.tokenRefresh;
      return ul;
    });

    await this.transactionService.registrarUsuarioLogin(loginList);

    // 6. Generar access token JWT
    user.token = this.tokenService.createAccessToken(
      user,
      request.idAplicacion,
    );

    // 7. Enviar refresh token en HTTP-only cookie — equivale a _authCookieService.SetRefreshAndCsrf()
    const refreshDays = this.configService.get<number>(
      'auth.refreshExpirationDays',
      7,
    );
    res.cookie('refreshToken', newRefreshToken.tokenRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000),
    });

    // 8. Limpiar clave antes de retornar
    user.clave = undefined;
    // refreshToken y refreshTokens están @Exclude() — no salen en la serialización

    return {
      statusCode: 1,
      statusMessage: 'OK',
      result: user,
    };
  }
}
