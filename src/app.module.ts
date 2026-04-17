import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './presentation/usuario/usuario.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggerService } from './common/helpers/logger.service';
import { ResponseHelper } from './common/helpers/response.helper';
import { AuthModule } from './presentation/auth/auth.module';
import authConfig from './common/settings/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [authConfig] }),
    DatabaseModule,
    UsuarioModule,
    AuthModule,
  ],
  providers: [
    // Se aplica automáticamente a TODOS los controllers y respuestas
    LoggerService,
    ResponseHelper,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  // Exporta para que cualquier módulo los use sin re-registrar
  exports: [LoggerService, ResponseHelper],
})
export class AppModule {}
