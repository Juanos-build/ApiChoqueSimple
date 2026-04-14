import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggerService } from './common/helpers/logger.service';
import { ResponseHelper } from './common/helpers/response.helper';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsuarioModule,
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
