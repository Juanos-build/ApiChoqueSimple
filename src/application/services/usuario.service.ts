import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../infrastructure/dao/transaction.service';
import { IUsuarioService } from '../interfaces/usuario.service.interface';
import { Response } from '../../common/models/response.interface';
import {
  Usuario,
  UsuarioExtend,
} from '../../infrastructure/entities/usuario.entity';
import { mapToClass } from 'src/common/helpers/mapper.helper';
import { Request } from '../../common/models/response.interface';

@Injectable()
export class UsuarioService implements IUsuarioService {
  // Equivale a inyectar ITransactionDao en el servicio .NET
  constructor(private readonly transactionService: TransactionService) {}

  async obtenerUsuario(
    request: Request<UsuarioExtend>,
  ): Promise<Response<UsuarioExtend | null>> {
    const usuario = mapToClass(Usuario, request.data);
    return this.transactionService.obtenerUsuario(usuario);
  }
}
