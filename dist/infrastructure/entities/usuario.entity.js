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
exports.UsuarioExtend = exports.Usuario = void 0;
const field_decorator_1 = require("../../common/decorators/field.decorator");
const class_transformer_1 = require("class-transformer");
class Usuario {
    idUsuario;
    clave;
    nombre;
    apellido;
    codigoTipoPersona;
    codigoTipoIdentificacion;
    numeroIdentificacion;
    telefono;
    celular;
    codigoGenero;
    codigoNivelEducativo;
    codigoNacionalidad;
    fechaVencimientoDocumento;
    fechaNacimiento;
    email;
    codigoEstadoCivil;
    direccion;
    codigoPais;
    codigoProvincia;
    codigoIngresoMensual;
    codigoDistrito;
    codigoCanton;
    codigoCliente;
}
exports.Usuario = Usuario;
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuario", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "clave", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoTipoPersona", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoTipoIdentificacion", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "numeroIdentificacion", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "celular", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoGenero", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoNivelEducativo", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoNacionalidad", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "fechaVencimientoDocumento", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, field_decorator_1.Field)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoEstadoCivil", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "direccion", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoPais", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoProvincia", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoIngresoMensual", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoDistrito", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoCanton", void 0);
__decorate([
    (0, field_decorator_1.Field)(),
    __metadata("design:type", String)
], Usuario.prototype, "codigoCliente", void 0);
class UsuarioExtend extends Usuario {
    rol;
    fechaCreacion;
}
exports.UsuarioExtend = UsuarioExtend;
//# sourceMappingURL=usuario.entity.js.map