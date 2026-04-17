import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../../application/services/usuario.service';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { LoggerService } from 'src/common/helpers/logger.service';

// Equivale al registro de dependencias en Program.cs
// builder.Services.AddScoped<IUsuarioService, UsuarioService>()
@Module({
  controllers: [UsuarioController],
  providers: [LoggerService, UsuarioService, ResponseHelper],
})
export class UsuarioModule {}
