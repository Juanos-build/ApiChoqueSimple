import { Body, ValidationPipe } from '@nestjs/common';

export function TypedBody() {
  return Body(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validateCustomDecorators: true,
    }),
  );
}
