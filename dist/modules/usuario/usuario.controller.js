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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuario_service_1 = require("../../application/services/usuario.service");
const usuario_entity_1 = require("../../infrastructure/entities/usuario.entity");
const response_helper_1 = require("../../common/helpers/response.helper");
const transaction_decorator_1 = require("../../common/decorators/transaction.decorator");
let UsuarioController = class UsuarioController {
    usuarioService;
    responseHelper;
    constructor(usuarioService, responseHelper) {
        this.usuarioService = usuarioService;
        this.responseHelper = responseHelper;
    }
    async obtenerUsuario(request) {
        const result = await this.usuarioService.obtenerUsuario(request);
        this.responseHelper.success(result, request);
        return result;
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)('obtener'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener usuario por filtros' }),
    (0, transaction_decorator_1.Transactional)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "obtenerUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('Usuario'),
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        response_helper_1.ResponseHelper])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map