"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.transactionContext = void 0;
exports.getCurrentTransaction = getCurrentTransaction;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sql = __importStar(require("mssql"));
const async_hooks_1 = require("async_hooks");
exports.transactionContext = new async_hooks_1.AsyncLocalStorage();
let DatabaseService = class DatabaseService {
    configService;
    pool;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        const server = this.configService.get('database.server');
        const database = this.configService.get('database.database');
        const user = this.configService.get('database.user');
        const password = this.configService.get('database.password');
        const encrypt = this.configService.get('database.encrypt') ?? false;
        this.pool = await new sql.ConnectionPool({
            server: server,
            database: database,
            user: user,
            password: password,
            options: {
                encrypt: encrypt,
                trustServerCertificate: true,
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000,
            },
        }).connect();
        console.log('✅ Conexión a SQL Server establecida');
    }
    async onModuleDestroy() {
        await this.pool.close();
    }
    getPool() {
        return this.pool;
    }
    async executeStoreProcedureParams(transaction, procedure, inputs) {
        try {
            const request = new sql.Request(transaction);
            for (const input of inputs) {
                request.input(input.name, input.type, input.value);
            }
            request.output('MENSAJE', sql.VarChar(400));
            const result = await request.execute(procedure);
            return {
                statusCode: result.returnValue,
                statusMessage: result.output['MENSAJE'],
                result: result.rowsAffected[0],
            };
        }
        catch (ex) {
            const message = ex instanceof Error ? ex.message : String(ex);
            return {
                statusCode: -1,
                statusMessage: `Error ejecutando SP: ${message}`,
            };
        }
    }
    async executeStoreProcedureData(transaction, procedure, inputs, readerFunc) {
        try {
            const request = new sql.Request(transaction);
            for (const input of inputs) {
                request.input(input.name, input.type, input.value);
            }
            request.output('MENSAJE', sql.VarChar(400));
            const result = await request.execute(procedure);
            const recordsets = result.recordsets;
            const data = readerFunc ? readerFunc(recordsets) : null;
            return {
                statusCode: result.returnValue,
                statusMessage: result.output['MENSAJE'],
                result: data ?? undefined,
            };
        }
        catch (ex) {
            const message = ex instanceof Error ? ex.message : String(ex);
            return {
                statusCode: -1,
                statusMessage: `Error ejecutando SP: ${message}`,
                result: undefined,
            };
        }
    }
    async executeInTransaction(action) {
        const transaction = new sql.Transaction(this.pool);
        try {
            await transaction.begin();
            return await exports.transactionContext.run(transaction, async () => {
                const result = await action();
                if (result.statusCode === 1 || result.statusCode === 2) {
                    await transaction.commit();
                    return result;
                }
                else {
                    await transaction.rollback();
                    return result;
                }
            });
        }
        catch (ex) {
            await transaction.rollback();
            const message = ex instanceof Error ? ex.message : String(ex);
            return {
                statusCode: -1,
                statusMessage: `Error en transacción: ${message}`,
            };
        }
    }
    async executeInTransactionRaw(action) {
        const transaction = new sql.Transaction(this.pool);
        try {
            await transaction.begin();
            return await exports.transactionContext.run(transaction, async () => {
                const result = await action();
                await transaction.commit();
                return result;
            });
        }
        catch (ex) {
            await transaction.rollback();
            throw ex;
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
function getCurrentTransaction() {
    const tx = exports.transactionContext.getStore();
    if (!tx) {
        throw new Error('No active transaction');
    }
    return tx;
}
//# sourceMappingURL=database.service.js.map