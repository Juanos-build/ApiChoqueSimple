import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiExtraModels,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';
import { Transactional } from 'src/common/decorators/transaction.decorator';
import { ApiResponseWrapper } from 'src/common/decorators/response.decorator';
import {
  ApiRequestWrapper,
  PostOk,
} from 'src/common/decorators/request.decorator';
import { TypedBody } from 'src/common/decorators/body.decorator';
import * as responseInterface from 'src/common/models/response.interface';
import { AuditInterceptor } from 'src/common/interceptors/auditoria.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@UseInterceptors(AuditInterceptor)
@ApiTags('Usuario')
@ApiExtraModels(UsuarioExtend)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @PostOk('obtener')
  @ApiRequestWrapper(UsuarioExtend)
  @ApiResponseWrapper(UsuarioExtend)
  @ApiOperation({ summary: 'Obtener usuario por filtros' })
  @Transactional()
  async obtenerUsuario(
    @TypedBody() request: responseInterface.AppRequest<UsuarioExtend>,
  ) {
    return await this.usuarioService.obtenerUsuario(request);
  }
}
