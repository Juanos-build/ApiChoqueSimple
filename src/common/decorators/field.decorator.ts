/* eslint-disable */
import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

export const PROPS_KEY = Symbol('props');

export function Property() {
  return (target: any, propertyKey: string) => {
    const props = Reflect.getMetadata(PROPS_KEY, target.constructor) || [];

    props.push(propertyKey);

    Reflect.defineMetadata(PROPS_KEY, props, target.constructor);
  };
}

export function Field(options?: { required?: boolean }) {
  return applyDecorators(
    Property(),
    options?.required ? IsNotEmpty() : IsOptional(),
  );
}
