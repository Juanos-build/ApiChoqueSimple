// Clase base — equivale a tu AppException
export class AppException extends Error {
  constructor(
    public readonly errorCode: number,
    message: string,
    public readonly innerException?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Equivale a ResultException
export class ResultException extends AppException {}

// Equivale a BusinessException
export class BusinessException extends AppException {}

// Equivale a DataAccessException
export class DataAccessException extends AppException {}

// Equivale a UnexpectedException
export class UnexpectedException extends AppException {}

// Equivale a TechnicalException
export class TechnicalException extends AppException {}
