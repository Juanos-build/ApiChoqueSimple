import { Injectable } from '@nestjs/common';
import { AppResponse } from '../models/response.interface';
import { ResponseProblem } from '../models/response.problem';
import { LoggerService } from './logger.service';
import {
  ResultException,
  BusinessException,
  DataAccessException,
  UnexpectedException,
  TechnicalException,
  AppException,
} from '../exceptions/app.exceptions';

function sanitize(data?: Record<string, unknown>) {
  if (!data) return data;

  const clone = { ...data };

  delete clone.password;
  delete clone.clave;
  delete clone.token;

  return clone;
}

@Injectable()
export class ResponseHelper {
  private readonly errorCode: number = -1;

  constructor(private readonly logger: LoggerService) {}

  error<T>(
    response: AppResponse<T>,
    ex: ResultException | BusinessException | DataAccessException,
    request?: Record<string, unknown>,
  ): AppResponse<T> {
    response.statusMessage = ex.message;
    response.statusCode = ex.errorCode ?? this.errorCode;

    this.logger.error('BUSINESS_ERROR', {
      traceId: request?.traceId,
      eventType: ex.constructor.name,
      errorCode: ex.errorCode,
      message: ex.message,
      innerException: ex.innerException?.message,

      // auditoría controlada
      request: sanitize(request),
    });

    return response;
  }

  exception<T>(
    response: AppResponse<T>,
    ex: UnexpectedException | TechnicalException | AppException | Error,
    request?: Record<string, unknown>,
  ): AppResponse<T> {
    response.statusMessage = ex.message;
    response.statusCode =
      ex instanceof AppException ? ex.errorCode : this.errorCode;

    this.logger.error('SYSTEM_ERROR', {
      traceId: request?.traceId,
      message: ex.message,
      stack: ex instanceof Error ? ex.stack : undefined,

      request: sanitize(request),
    });

    return response;
  }

  success<T>(data: T | AppResponse<T>): AppResponse<T> {
    if (this.isWrappedResponse(data)) {
      return data;
    }

    return {
      statusCode: 1,
      statusMessage: 'OK',
      result: data,
    };
  }

  private isWrappedResponse(obj: unknown): obj is AppResponse<unknown> {
    if (typeof obj !== 'object' || obj === null) return false;

    const maybe = obj as Record<string, unknown>;

    return 'statusCode' in maybe && 'statusMessage' in maybe;
  }

  validationError(errors: string): ResponseProblem {
    const problem = new ResponseProblem();
    problem.title = 'One or more validation errors occurred';
    problem.statusCode = this.errorCode;
    problem.statusMessage = errors;
    return problem;
  }
}
