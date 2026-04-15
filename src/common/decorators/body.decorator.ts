import { Body, ValidationPipe } from '@nestjs/common';

export function TypedBody() {
  return Body(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}
