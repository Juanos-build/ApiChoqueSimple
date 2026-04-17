import { pascalToCamelCase } from 'src/common/interceptors/transform.interceptor';
import { PROPS_KEY } from 'src/common/decorators/field.decorator';
import 'reflect-metadata';

function getProps(target: object): string[] {
  const props = Reflect.getMetadata(PROPS_KEY, target) as string[] | undefined;
  return props ?? [];
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
