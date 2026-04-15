/* eslint-disable */
import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import 'reflect-metadata';

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

export function Field(options?: { required?: boolean; example?: any }) {
  return applyDecorators(
    Property(),
    options?.required ? IsNotEmpty() : IsOptional(),
    ApiProperty({
      required: options?.required ?? false,
      example: options?.example,
    }),
  );
}
