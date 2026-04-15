import { Module } from '@nestjs/common';
import { UsuarioDao } from './usuario.dao';

@Module({
  providers: [UsuarioDao],
  exports: [UsuarioDao],
})
export class UsuarioDaoModule {}
