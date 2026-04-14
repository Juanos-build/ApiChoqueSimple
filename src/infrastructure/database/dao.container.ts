import { Injectable } from '@nestjs/common';
import { UsuarioDao } from '../dao/implementation/usuario.dao';

@Injectable()
export class DaoContainer {
  constructor(public readonly usuarioDao: UsuarioDao) {}
}
