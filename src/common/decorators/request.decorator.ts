import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, getSchemaPath } from '@nestjs/swagger';

export function ApiRequestWrapper<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          data: { $ref: getSchemaPath(model) },
          idVersion: { type: 'number', example: 0 },
          idAplicacion: { type: 'number', example: 0 },
          version: { type: 'string', example: '1.0' },
          language: { type: 'string', example: 'es' },
          platform: { type: 'string', example: 'web' },
        },
      },
    }),
  );
}
