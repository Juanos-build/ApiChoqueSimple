import { Injectable } from '@nestjs/common';
import { Response } from '../../common/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { DaoContainer } from '../database/dao.container';

@Injectable()
export class TransactionService {
  constructor(private readonly dao: DaoContainer) {}

  // Equivale a: ObtenerUsuario en TransactionDao.cs
  obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>> {
    return this.dao.usuarioDao.obtenerUsuario(request);
  }
}
