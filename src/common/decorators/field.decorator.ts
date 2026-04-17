/* eslint-disable */
import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import 'reflect-metadata';
import * as sql from 'mssql';

export const COLUMN_TYPE_KEY = Symbol('column_type');

export const PROPS_KEY = Symbol('props');

export function Property() {
  return (target: any, propertyKey: string) => {
    // solo metadata PROPIA de la clase (no heredada)
    const existing: string[] =
      Reflect.getOwnMetadata(PROPS_KEY, target.constructor) || [];

    if (!existing.includes(propertyKey)) {
      Reflect.defineMetadata(
        PROPS_KEY,
        [...existing, propertyKey],
        target.constructor,
      );
    }
  };
}

export function Field(options?: {
  required?: boolean;
  example?: any;
  sqlType?: sql.ISqlType | (() => sql.ISqlType);
}) {
  return applyDecorators(
    (target: any, propertyKey: string) => {
      Property()(target, propertyKey);

      if (options?.sqlType) {
        const existing =
          Reflect.getOwnMetadata(COLUMN_TYPE_KEY, target.constructor) || {};

        existing[propertyKey] = options.sqlType;

        Reflect.defineMetadata(COLUMN_TYPE_KEY, existing, target.constructor);
      }
    },
    options?.required ? IsNotEmpty() : IsOptional(),
    ApiProperty({
      required: options?.required ?? false,
      example: options?.example,
    }),
  );
}
