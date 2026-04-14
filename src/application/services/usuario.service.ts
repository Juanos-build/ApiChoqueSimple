import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../infrastructure/dao/transaction.service';
import { IUsuarioService } from '../interfaces/usuario.service.interface';
import { Response } from '../../common/response.interface';
import {
  UsuarioExtend,
  Usuario,
} from '../../infrastructure/entities/usuario.entity';

@Injectable()
export class UsuarioService implements IUsuarioService {
  // Equivale a inyectar ITransactionDao en el servicio .NET
  constructor(private readonly transactionService: TransactionService) {}

  async obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>> {
    return this.transactionService.obtenerUsuario(request);
  }
}
