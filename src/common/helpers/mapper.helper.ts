import { plainToInstance } from 'class-transformer';
import { pascalToCamelCase } from 'src/common/interceptors/transform.interceptor';

export function mapToClass<T, V>(cls: new () => T, data: V): T {
  return plainToInstance(cls, data, {
    excludeExtraneousValues: false,
  });
}

export function mapFromDb<T, V>(cls: new () => T, data: V): T {
  const normalized = pascalToCamelCase(data);

  return plainToInstance(cls, normalized);
}
