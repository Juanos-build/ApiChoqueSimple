// Clase base — equivale a tu AppException
export class AppException extends Error {
  constructor(
    public readonly errorCode: number = -1,
    message: string = 'Error',
    public readonly innerException?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Equivale a ResultException
export class ResultException extends AppException {}

// Equivale a BusinessException
export class BusinessException extends AppException {
  constructor(message: string, innerException?: Error) {
    super(-200, message, innerException);
  }
}

// Equivale a DataAccessException
export class DataAccessException extends AppException {
  constructor(message: string, innerException?: Error) {
    super(-100, message, innerException);
  }
}

export class UnexpectedException extends AppException {
  constructor(message: string, innerException?: Error) {
    super(-999, message, innerException);
  }
}

export class TechnicalException extends AppException {
  constructor(message: string, innerException?: Error) {
    super(-300, message, innerException);
  }
}
