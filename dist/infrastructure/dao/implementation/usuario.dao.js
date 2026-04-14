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
exports.UsuarioDao = void 0;
const sql = __importStar(require("mssql"));
const usuario_entity_1 = require("../../entities/usuario.entity");
const database_service_1 = require("../../database/database.service");
const table_converter_helper_1 = require("../../../common/helpers/table-converter.helper");
const mapper_helper_1 = require("../../../common/helpers/mapper.helper");
const base_dao_1 = require("../../database/base.dao");
const class_decorator_1 = require("../../../common/decorators/class.decorator");
let UsuarioDao = class UsuarioDao extends base_dao_1.BaseDao {
    db;
    constructor(db) {
        super();
        this.db = db;
    }
    async obtenerUsuario(request) {
        return this.safeExecute(async () => {
            const transaction = (0, database_service_1.getCurrentTransaction)();
            const inputs = [
                {
                    name: 'OBJ_USUARIO',
                    type: sql.TVP,
                    value: table_converter_helper_1.TableConverter.toTvp(request, usuario_entity_1.Usuario),
                },
            ];
            const dt = await this.db.executeStoreProcedureData(transaction, 'SP_OBTENER_USUARIO', inputs, (recordsets) => recordsets[0]?.[0] ?? null);
            return {
                statusCode: dt.statusCode,
                statusMessage: dt.statusMessage,
                result: dt.statusCode === 1
                    ? (0, mapper_helper_1.mapFromDb)(usuario_entity_1.UsuarioExtend, dt.result)
                    : new usuario_entity_1.UsuarioExtend(),
            };
        });
    }
};
exports.UsuarioDao = UsuarioDao;
exports.UsuarioDao = UsuarioDao = __decorate([
    (0, class_decorator_1.Dao)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsuarioDao);
//# sourceMappingURL=usuario.dao.js.map