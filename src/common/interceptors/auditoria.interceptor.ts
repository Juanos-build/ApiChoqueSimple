import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { LoggerService } from '../helpers/logger.service';
import { AppRequest, RequestWithUser } from '../models/response.interface';

function sanitize(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;

  const sensitiveKeys = ['password', 'clave', 'token'];

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const sanitized: Record<string, unknown> = {};

  for (const key of Object.keys(data)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      continue;
    }

    sanitized[key] = sanitize(data[key]);
  }

  return sanitized;
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();

    const request = http.getRequest<RequestWithUser>();
    const response = http.getResponse<Response>();
    const body = request.body as AppRequest<any>;

    const start = Date.now();

    const traceId = String(request.headers['x-trace-id'] ?? '');

    return next.handle().pipe(
      tap((responseBody) => {
        const duration = Date.now() - start;

        this.logger.info('HTTP_SUCCESS', {
          traceId,
          method: request.method,
          url: request.originalUrl,
          statusCode: response.statusCode,
          duration,

          request: sanitize({
            body: body,
            params: request.params,
            query: request.query,
          }),

          response: sanitize(responseBody as Record<string, unknown>),

          // opcional (si tienes auth luego)
          user: request.user ?? null,
        });
      }),
    );
  }
}
