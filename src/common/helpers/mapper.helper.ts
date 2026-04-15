// import { plainToInstance } from 'class-transformer';
import { pascalToCamelCase } from 'src/common/interceptors/transform.interceptor';

import 'reflect-metadata';
import { PROPS_KEY } from 'src/common/decorators/field.decorator';

// export function mapToClass<T, V>(cls: new () => T, data: V): T {
//   return plainToInstance(cls, data, {
//     excludeExtraneousValues: false,
//   });
// }

// export function mapFromDb<T, V>(cls: new () => T, data: V): T {
//   const normalized = pascalToCamelCase(data);

//   return plainToInstance(cls, normalized);
// }

function getProps(target: object): string[] {
  const props = Reflect.getMetadata(PROPS_KEY, target) as unknown;

  return Array.isArray(props) ? (props as string[]) : [];
}

function getAllProps(target: unknown): string[] {
  let props: string[] = [];

  let current = target;

  while (current && current !== Function.prototype) {
    const currentProps = getProps(current);
    props = [...props, ...currentProps];

    current = Object.getPrototypeOf(current);
  }

  return [...new Set(props)];
}

export function mapToClass<T extends object, V extends object>(
  cls: new () => T,
  data: V,
): T {
  const instance = new cls();
  const props = getAllProps(cls);

  for (const key of props) {
    if (key in data) {
      (instance as Record<string, unknown>)[key] = (
        data as Record<string, unknown>
      )[key];
    }
  }

  return instance;
}

export function mapFromDb<T extends object, V extends object>(
  cls: new () => T,
  data: V | null | undefined,
): T | null {
  if (!data) return null;

  const normalized = pascalToCamelCase(data) as Record<string, unknown>;

  return mapToClass(cls, normalized);
}
