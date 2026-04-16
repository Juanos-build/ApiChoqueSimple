export declare class AppException extends Error {
    readonly errorCode: number;
    readonly innerException?: Error | undefined;
    constructor(errorCode?: number, message?: string, innerException?: Error | undefined);
}
export declare class ResultException extends AppException {
}
export declare class BusinessException extends AppException {
    constructor(message: string, innerException?: Error);
}
export declare class DataAccessException extends AppException {
    constructor(message: string, innerException?: Error);
}
export declare class UnexpectedException extends AppException {
    constructor(message: string, innerException?: Error);
}
export declare class TechnicalException extends AppException {
    constructor(message: string, innerException?: Error);
}
