import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../infrastructure/dao/transaction.service';
import { AppResponse } from '../../common/models/response.interface';
import {
  Usuario,
  UsuarioExtend,
} from '../../infrastructure/entities/usuario.entity';
import { mapToClass } from 'src/common/helpers/mapper.helper';
import { AppRequest } from '../../common/models/response.interface';

@Injectable()
export class UsuarioService {
  // Equivale a inyectar ITransactionDao en el servicio .NET
  constructor(private readonly transactionService: TransactionService) {}

  async obtenerUsuario(
    request: AppRequest<UsuarioExtend>,
  ): Promise<AppResponse<UsuarioExtend | null>> {
    const usuario = mapToClass(Usuario, request.data ?? {});
    const response = await this.transactionService.obtenerUsuario(usuario);

    return {
      statusCode: 1,
      statusMessage: 'OK',
      result: response,
    };
  }
}
