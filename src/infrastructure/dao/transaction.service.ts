import { Injectable } from '@nestjs/common';
import { Response } from '../../common/models/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';

@Injectable()
export class TransactionService {
  constructor(private readonly usuarioDao: UsuarioDao) {}

  // Equivale a: ObtenerUsuario en TransactionDao.cs
  obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend | null>> {
    return this.usuarioDao.obtenerUsuario(request);
  }
}
