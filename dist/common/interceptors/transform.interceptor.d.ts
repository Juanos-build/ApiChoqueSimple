import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown>;
    private static toCamelCaseDeep;
}
export declare function pascalToCamelCase(obj: unknown): unknown;
