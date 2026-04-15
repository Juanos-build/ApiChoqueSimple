import { Injectable } from '@nestjs/common';
import { Response } from '../models/response.interface';
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

@Injectable()
export class ResponseHelper {
  private readonly errorCode: number = -1;

  constructor(private readonly logger: LoggerService) {}

  error<T>(
    response: Response<T>,
    ex: ResultException | BusinessException | DataAccessException,
    request?: unknown,
  ): Response<T> {
    response.statusMessage = ex.message;
    response.statusCode = ex.errorCode ?? this.errorCode;

    this.logger.error(ex.message, {
      eventType: ex.constructor.name,
      errorCode: ex.errorCode,
      innerException: ex.innerException?.message,
      request,
    });

    return response;
  }

  exception<T>(
    response: Response<T>,
    ex: UnexpectedException | TechnicalException | AppException | Error,
    request?: unknown,
  ): Response<T> {
    response.statusMessage = ex.message;
    response.statusCode =
      ex instanceof AppException ? ex.errorCode : this.errorCode;

    this.logger.error(ex.message, {
      eventType: 'UnexpectedException',
      innerException:
        ex instanceof AppException ? ex.innerException?.message : undefined,
      request,
    });

    return response;
  }

  success<T>(response: Response<T>, request?: unknown): Response<T> {
    response.statusCode = response.statusCode ?? 1;
    response.statusMessage = response.statusMessage ?? 'OK';

    this.logger.info(response.statusMessage, {
      eventType: 'Success',
      request,
      response,
    });

    return response;
  }

  validationError(errors: string): ResponseProblem {
    const problem = new ResponseProblem();
    problem.title = 'One or more validation errors occurred';
    problem.statusCode = this.errorCode;
    problem.statusMessage = errors;
    return problem;
  }
}
