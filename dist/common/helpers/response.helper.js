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
exports.ResponseHelper = void 0;
const common_1 = require("@nestjs/common");
const response_problem_1 = require("../models/response.problem");
const logger_service_1 = require("./logger.service");
const app_exceptions_1 = require("../exceptions/app.exceptions");
let ResponseHelper = class ResponseHelper {
    logger;
    errorCode = -1;
    constructor(logger) {
        this.logger = logger;
    }
    error(response, ex, request) {
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
    exception(response, ex, request) {
        response.statusMessage = ex.message;
        response.statusCode =
            ex instanceof app_exceptions_1.AppException ? ex.errorCode : this.errorCode;
        this.logger.error(ex.message, {
            eventType: 'UnexpectedException',
            innerException: ex instanceof app_exceptions_1.AppException ? ex.innerException?.message : undefined,
            request,
        });
        return response;
    }
    success(response, request) {
        response.statusCode = response.statusCode ?? 1;
        response.statusMessage = response.statusMessage ?? 'OK';
        this.logger.info(response.statusMessage, {
            eventType: 'Success',
            request,
            response,
        });
        return response;
    }
    validationError(errors) {
        const problem = new response_problem_1.ResponseProblem();
        problem.title = 'One or more validation errors occurred';
        problem.statusCode = this.errorCode;
        problem.statusMessage = errors;
        return problem;
    }
};
exports.ResponseHelper = ResponseHelper;
exports.ResponseHelper = ResponseHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], ResponseHelper);
//# sourceMappingURL=response.helper.js.map