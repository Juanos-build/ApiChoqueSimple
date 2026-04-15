"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const response_problem_1 = require("../models/response.problem");
const logger_service_1 = require("../helpers/logger.service");
const app_exceptions_1 = require("../exceptions/app.exceptions");
let AllExceptionsFilter = class AllExceptionsFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const { problem, statusCode } = this.mapException(exception);
        this.logger.error(problem.statusMessage, {
            eventType: 'GlobalException',
            title: problem.title,
            statusCode: problem.statusCode,
            request: request,
        });
        response.status(statusCode).json(problem);
    }
    mapException(ex) {
        const problem = new response_problem_1.ResponseProblem();
        if (ex instanceof app_exceptions_1.ResultException || ex instanceof app_exceptions_1.BusinessException) {
            problem.title = 'Error de resultado';
            problem.statusCode = ex.errorCode ?? -1;
            problem.statusMessage = ex.message;
            problem.detail = ex.innerException?.message;
            return { problem, statusCode: common_1.HttpStatus.BAD_REQUEST };
        }
        if (ex instanceof app_exceptions_1.DataAccessException) {
            problem.title = 'Error de acceso a datos';
            problem.statusCode = ex.errorCode ?? -1;
            problem.statusMessage = ex.message;
            problem.detail = ex.innerException?.message;
            return { problem, statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR };
        }
        if (ex instanceof app_exceptions_1.UnexpectedException || ex instanceof app_exceptions_1.TechnicalException) {
            problem.title = 'Error inesperado';
            problem.statusCode = ex.errorCode ?? -1;
            problem.statusMessage = ex.message;
            problem.detail = ex.innerException?.message;
            return { problem, statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR };
        }
        if (ex instanceof common_1.HttpException) {
            problem.title = 'Error HTTP';
            problem.statusCode = ex.getStatus();
            problem.statusMessage = ex.message;
            return { problem, statusCode: ex.getStatus() };
        }
        const message = ex instanceof Error ? ex.message : 'Error interno';
        problem.title = 'Error interno';
        problem.statusCode = -1;
        problem.statusMessage = message;
        return { problem, statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR };
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], AllExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map