import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

// Equivale a PropertyNamingPolicy = CamelCase + WhenWritingNull en .NET
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const plain = instanceToPlain(data, {
          exposeUnsetFields: false, // elimina undefined
        });

        return TransformInterceptor.toCamelCaseDeep(plain);
      }),
    );
  }

  // Recursivo — convierte todas las claves a camelCase y elimina nulls
  private static toCamelCaseDeep(obj: unknown): unknown {
    if (Array.isArray(obj))
      return obj.map((item) => TransformInterceptor.toCamelCaseDeep(item));

    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [
          k.charAt(0).toLowerCase() + k.slice(1),
          TransformInterceptor.toCamelCaseDeep(v),
        ]),
    );
  }
}

export function pascalToCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(pascalToCamelCase);
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.charAt(0).toLowerCase() + key.slice(1),
        pascalToCamelCase(value),
      ]),
    );
  }

  return obj;
}
