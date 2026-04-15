import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ResponseProblem } from '../models/response.problem';
import { LoggerService } from '../helpers/logger.service';
import {
  ResultException,
  BusinessException,
  DataAccessException,
  UnexpectedException,
  TechnicalException,
} from '../exceptions/app.exceptions';

// Equivale a ErrorHandler + ExceptionToProblemMapper juntos
@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<{ body: unknown }>();

    const { problem, statusCode } = this.mapException(exception);

    this.logger.error(problem.statusMessage, {
      eventType: 'GlobalException',
      title: problem.title,
      statusCode: problem.statusCode,
      request: request,
    });

    response.status(statusCode).json(problem);
  }

  // Equivale exactamente al Dictionary<Type, handler> de ExceptionToProblemMapper
  private mapException(ex: unknown): {
    problem: ResponseProblem;
    statusCode: number;
  } {
    const problem = new ResponseProblem();

    if (ex instanceof ResultException || ex instanceof BusinessException) {
      problem.title = 'Error de resultado';
      problem.statusCode = ex.errorCode ?? -1;
      problem.statusMessage = ex.message;
      problem.detail = ex.innerException?.message;
      return { problem, statusCode: HttpStatus.BAD_REQUEST };
    }

    if (ex instanceof DataAccessException) {
      problem.title = 'Error de acceso a datos';
      problem.statusCode = ex.errorCode ?? -1;
      problem.statusMessage = ex.message;
      problem.detail = ex.innerException?.message;
      return { problem, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
    }

    if (ex instanceof UnexpectedException || ex instanceof TechnicalException) {
      problem.title = 'Error inesperado';
      problem.statusCode = ex.errorCode ?? -1;
      problem.statusMessage = ex.message;
      problem.detail = ex.innerException?.message;
      return { problem, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
    }

    if (ex instanceof HttpException) {
      // Errores de NestJS como 401, 403, 404
      problem.title = 'Error HTTP';
      problem.statusCode = ex.getStatus();
      problem.statusMessage = ex.message;
      return { problem, statusCode: ex.getStatus() };
    }

    // Fallback genérico — equivale a tu bloque final en ExceptionToProblemMapper
    const message = ex instanceof Error ? ex.message : 'Error interno';
    problem.title = 'Error interno';
    problem.statusCode = -1;
    problem.statusMessage = message;
    return { problem, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
  }
}
