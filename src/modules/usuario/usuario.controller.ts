import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsuarioService } from '../../application/services/usuario.service';
import {
  Usuario,
  UsuarioExtend,
} from '../../infrastructure/entities/usuario.entity';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { Transactional } from 'src/common/decorators/transaction.decorator';
import { ApiResponseWrapper } from 'src/common/decorators/global.responses.decorator';

@ApiResponseWrapper(UsuarioExtend)
@ApiTags('Usuario') // Equivale a [ApiController] + [Route("api/usuario")]
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  // Equivale a tu [HttpPost("obtener")]
  @Post('obtener')
  @ApiOperation({ summary: 'Obtener usuario por filtros' })
  @Transactional()
  async obtenerUsuario(@Body() request: Usuario) {
    const result = await this.usuarioService.obtenerUsuario(request);
    this.responseHelper.success(result, request); // log de éxito
    return result;
  }
}
