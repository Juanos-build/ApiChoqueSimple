export declare class AppException extends Error {
    readonly errorCode: number;
    readonly innerException?: Error | undefined;
    constructor(errorCode: number, message: string, innerException?: Error | undefined);
}
export declare class ResultException extends AppException {
}
export declare class BusinessException extends AppException {
}
export declare class DataAccessException extends AppException {
}
export declare class UnexpectedException extends AppException {
}
export declare class TechnicalException extends AppException {
}
