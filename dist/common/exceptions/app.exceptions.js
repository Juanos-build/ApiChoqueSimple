"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicalException = exports.UnexpectedException = exports.DataAccessException = exports.BusinessException = exports.ResultException = exports.AppException = void 0;
class AppException extends Error {
    errorCode;
    innerException;
    constructor(errorCode, message, innerException) {
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
}
exports.BusinessException = BusinessException;
class DataAccessException extends AppException {
}
exports.DataAccessException = DataAccessException;
class UnexpectedException extends AppException {
}
exports.UnexpectedException = UnexpectedException;
class TechnicalException extends AppException {
}
exports.TechnicalException = TechnicalException;
//# sourceMappingURL=app.exceptions.js.map