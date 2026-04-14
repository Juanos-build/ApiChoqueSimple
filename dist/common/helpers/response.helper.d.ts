import { Response } from '../response.interface';
import { ResponseProblem } from '../models/response-problem';
import { LoggerService } from './logger.service';
import { ResultException, BusinessException, DataAccessException, UnexpectedException, TechnicalException, AppException } from '../exceptions/app.exceptions';
export declare class ResponseHelper {
    private readonly logger;
    private readonly errorCode;
    constructor(logger: LoggerService);
    error<T>(response: Response<T>, ex: ResultException | BusinessException | DataAccessException, request?: unknown): Response<T>;
    exception<T>(response: Response<T>, ex: UnexpectedException | TechnicalException | AppException | Error, request?: unknown): Response<T>;
    success<T>(response: Response<T>, request?: unknown): Response<T>;
    validationError(errors: string): ResponseProblem;
}
