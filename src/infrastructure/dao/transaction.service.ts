import { Injectable } from '@nestjs/common';
import { DbResult } from '../../common/models/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';
import { DatabaseService } from '../database/database.service';
import {
  BusinessException,
  DataAccessException,
  TechnicalException,
} from 'src/common/exceptions/app.exceptions';

@Injectable()
export class TransactionService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usuarioDao: UsuarioDao,
  ) {}

  private async execute<T>(action: () => Promise<DbResult<T>>): Promise<T> {
    const dbResult = await this.db.executeInTransaction(action);

    if (dbResult.statusCode === 0) {
      throw new BusinessException(dbResult.statusMessage);
    }

    if (dbResult.statusCode < 0) {
      throw new DataAccessException(dbResult.statusMessage);
    }

    if (!dbResult.data) {
      throw new TechnicalException('Data undefined');
    }

    return dbResult.data as T;
  }

  // Equivale a: ObtenerUsuario en TransactionDao.cs
  async obtenerUsuario(request: Usuario): Promise<UsuarioExtend | null> {
    return this.execute(() => this.usuarioDao.obtenerUsuario(request));
  }
}
