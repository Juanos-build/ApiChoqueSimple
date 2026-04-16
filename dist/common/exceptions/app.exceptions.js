"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicalException = exports.UnexpectedException = exports.DataAccessException = exports.BusinessException = exports.ResultException = exports.AppException = void 0;
class AppException extends Error {
    errorCode;
    innerException;
    constructor(errorCode = -1, message = 'Error', innerException) {
        super(message);
        this.errorCode = errorCode;
        this.innerException = innerException;
        this.name = this.constructor.name;
    }
}
exports.AppException = AppException;
class ResultException extends AppException {
}
exports.ResultException = ResultException;
class BusinessException extends AppException {
    constructor(message, innerException) {
        super(-200, message, innerException);
    }
}
exports.BusinessException = BusinessException;
class DataAccessException extends AppException {
    constructor(message, innerException) {
        super(-100, message, innerException);
    }
}
exports.DataAccessException = DataAccessException;
class UnexpectedException extends AppException {
    constructor(message, innerException) {
        super(-999, message, innerException);
    }
}
exports.UnexpectedException = UnexpectedException;
class TechnicalException extends AppException {
    constructor(message, innerException) {
        super(-300, message, innerException);
    }
}
exports.TechnicalException = TechnicalException;
//# sourceMappingURL=app.exceptions.js.map