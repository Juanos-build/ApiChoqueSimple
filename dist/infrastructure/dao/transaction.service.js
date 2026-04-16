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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const usuario_dao_1 = require("./implementation/usuario/usuario.dao");
const database_service_1 = require("../database/database.service");
const app_exceptions_1 = require("../../common/exceptions/app.exceptions");
let TransactionService = class TransactionService {
    db;
    usuarioDao;
    constructor(db, usuarioDao) {
        this.db = db;
        this.usuarioDao = usuarioDao;
    }
    async execute(action) {
        const dbResult = await this.db.executeInTransaction(action);
        if (dbResult.statusCode === 0) {
            throw new app_exceptions_1.BusinessException(dbResult.statusMessage);
        }
        if (dbResult.statusCode < 0) {
            throw new app_exceptions_1.DataAccessException(dbResult.statusMessage);
        }
        if (!dbResult.data) {
            throw new app_exceptions_1.TechnicalException('Data undefined');
        }
        return dbResult.data;
    }
    async obtenerUsuario(request) {
        return this.execute(() => this.usuarioDao.obtenerUsuario(request));
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        usuario_dao_1.UsuarioDao])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map