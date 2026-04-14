"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TransformInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
exports.pascalToCamelCase = pascalToCamelCase;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
let TransformInterceptor = TransformInterceptor_1 = class TransformInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const plain = (0, class_transformer_1.instanceToPlain)(data, {
                exposeUnsetFields: false,
            });
            return TransformInterceptor_1.toCamelCaseDeep(plain);
        }));
    }
    static toCamelCaseDeep(obj) {
        if (Array.isArray(obj))
            return obj.map((item) => TransformInterceptor_1.toCamelCaseDeep(item));
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        return Object.fromEntries(Object.entries(obj)
            .filter(([, v]) => v !== null && v !== undefined)
            .map(([k, v]) => [
            k.charAt(0).toLowerCase() + k.slice(1),
            TransformInterceptor_1.toCamelCaseDeep(v),
        ]));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = TransformInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
function pascalToCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(pascalToCamelCase);
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            key.charAt(0).toLowerCase() + key.slice(1),
            pascalToCamelCase(value),
        ]));
    }
    return obj;
}
//# sourceMappingURL=transform.interceptor.js.map