import { Injectable } from '@nestjs/common';
import { Response } from '../../common/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';

@Injectable()
export class TransactionService {
  constructor(private readonly usuarioDao: UsuarioDao) {}

  // Equivale a: ObtenerUsuario en TransactionDao.cs
  obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>> {
    return this.usuarioDao.obtenerUsuario(request);
  }
}
