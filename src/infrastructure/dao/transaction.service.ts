import { Injectable } from '@nestjs/common';
import { DbResult } from '../../common/models/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';
import {
  BusinessException,
  DataAccessException,
  TechnicalException,
} from 'src/common/exceptions/app.exceptions';
import { LoginDao } from './implementation/login/login.auth.dao';
import {
  UsuarioLogin,
  UsuarioLoginExtended,
} from '../entities/usuario.login.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly usuarioDao: UsuarioDao,
    private readonly loginDao: LoginDao,
  ) {}

  private async execute<T>(action: () => Promise<DbResult<T>>): Promise<T> {
    const dbResult = await action();

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

  async obtenerUsuario(request: Usuario): Promise<UsuarioExtend | null> {
    return this.execute(() => this.usuarioDao.obtenerUsuario(request));
  }

  async obtenerUsuarioLogin(
    request: UsuarioLogin,
  ): Promise<UsuarioLoginExtended[] | null> {
    return this.execute(() => this.loginDao.obtenerUsuarioLogin(request));
  }

  async registrarUsuarioLogin(
    request: UsuarioLogin[],
  ): Promise<UsuarioLogin | null> {
    return this.execute(() => this.loginDao.registrarUsuarioLogin(request));
  }
}
