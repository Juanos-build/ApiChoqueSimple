import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { Transactional } from 'src/common/decorators/transaction.decorator';
import { ApiResponseWrapper } from 'src/common/decorators/response.decorator';
import { ApiRequestWrapper } from 'src/common/decorators/request.decorator';
import { TypedBody } from 'src/common/decorators/body.decorator';
import * as responseInterface from 'src/common/models/response.interface';

@ApiTags('Usuario')
@ApiExtraModels(UsuarioExtend)
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  // Equivale a tu [HttpPost("obtener")]
  @Post('obtener')
  @ApiRequestWrapper(UsuarioExtend)
  @ApiResponseWrapper(UsuarioExtend)
  @ApiOperation({ summary: 'Obtener usuario por filtros' })
  @Transactional()
  async obtenerUsuario(
    @TypedBody() request: responseInterface.Request<UsuarioExtend>,
  ) {
    const result = await this.usuarioService.obtenerUsuario(request);
    this.responseHelper.success(result, request); // log de éxito
    return result;
  }
}
