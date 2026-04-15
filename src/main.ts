import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { LoggerService } from './common/helpers/logger.service';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { ResponseProblem } from './common/models/response.problem';
import { TransactionalInterceptor } from './common/interceptors/transaction.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // NestJS usa por defecto el serializador de Node — lo reemplazamos con configuración explícita
  const { json } = await import('express');
  app.use(json());

  // Validación global + respuesta de error personalizada
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const messages = errors
          .map((e) => Object.values(e.constraints ?? {}).join('|'))
          .join('|');
        const problem = new ResponseProblem();
        problem.title = 'One or more request errors occurred';
        problem.statusCode = -1;
        problem.statusMessage = messages;
        problem.status = 400;
        return new BadRequestException(problem);
      },
    }),
  );

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    app.get(TransactionalInterceptor),
  );

  app.enableCors();

  const logger = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('ApiChoqueNest')
    .setDescription('API de gestión de choques')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Swagger en http://localhost:3000/swagger');
}

void bootstrap();
