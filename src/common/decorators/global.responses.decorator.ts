import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export function ApiResponseWrapper<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOkResponse({
      description: 'OK',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: 'number', example: 1 },
              statusMessage: { type: 'string', example: 'OK' },
            },
          },
          {
            properties: {
              result: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),

    ApiBadRequestResponse({
      description: 'Error de validación o negocio',
      schema: {
        example: {
          title: 'Validation Error',
          statusCode: 400,
          statusMessage: 'Error de validación',
        },
      },
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado',
      schema: {
        example: {
          title: 'Internal Server Error',
          statusCode: 500,
          statusMessage: 'Error inesperado',
        },
      },
    }),
  );
}
