import {
  Controller,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { AppRequest } from 'src/common/models/response.interface';
import { BasicAuthGuard } from 'src/auth/guards/basic.auth.guard';
import { AuthService } from 'src/application/services/auth.service';
import { LoginRequest } from 'src/infrastructure/entities/usuario.login.entity';
import { UsuarioExtend } from 'src/infrastructure/entities/usuario.entity';
import { UsuarioService } from 'src/application/services/usuario.service';
import { PostOk } from 'src/common/decorators/request.decorator';
import { TypedBody } from 'src/common/decorators/body.decorator';
import { Transactional } from 'src/common/decorators/transaction.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService, // para validar email+clave
  ) {}

  // Equivale a [HttpPost("Autenticar")] [Authorize(Policy = "BasicOnly")]
  @PostOk('autenticar')
  @UseGuards(BasicAuthGuard)
  @Transactional()
  async autenticar(
    @TypedBody() body: AppRequest<LoginRequest>,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Extraer IP — equivale a _security.GetClientIp()
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
      req.socket.remoteAddress ??
      '0.0.0.0';

    // Validar usuario (email + clave)
    const request: AppRequest<UsuarioExtend> = {
      data: {
        email: body.data.email,
        clave: body.data.clave,
        refreshTokens: [],
      },
      idAplicacion: body.idAplicacion,
    };

    const user = await this.usuarioService.obtenerUsuario(request);

    if (!user.result || user.statusCode !== 1) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.autenticar(body, user.result, ip, res);
  }
}
