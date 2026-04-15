"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_config_1 = __importDefault(require("./database.config"));
const database_service_1 = require("./database.service");
const transaction_service_1 = require("../dao/transaction.service");
const transaction_interceptor_1 = require("../../common/interceptors/transaction.interceptor");
const usuario_dao_module_1 = require("../dao/implementation/usuario/usuario.dao.module");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(database_config_1.default),
            usuario_dao_module_1.UsuarioDaoModule,
        ],
        providers: [
            database_service_1.DatabaseService,
            transaction_service_1.TransactionService,
            transaction_interceptor_1.TransactionalInterceptor,
        ],
        exports: [database_service_1.DatabaseService, transaction_service_1.TransactionService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map