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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const path_1 = require("path");
let LoggerService = class LoggerService {
    logger;
    constructor() {
        const logFolder = process.env.LOG_FOLDER ?? 'logs';
        const logName = process.env.LOG_NAME ?? 'app';
        const date = new Date().toISOString().split('T')[0];
        const basePath = (0, path_1.join)(logFolder, date);
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                new winston_1.transports.File({
                    filename: (0, path_1.join)(basePath, `${logName}_error.log`),
                    level: 'error',
                }),
                new winston_1.transports.File({
                    filename: (0, path_1.join)(basePath, `${logName}_success.log`),
                    level: 'info',
                }),
            ],
        });
    }
    error(message, properties) {
        this.logger.error(message, { eventType: 'Error', ...properties });
    }
    info(message, properties) {
        this.logger.info(message, { eventType: 'Info', ...properties });
    }
    warn(message, properties) {
        this.logger.warn(message, { eventType: 'BusinessError', ...properties });
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map