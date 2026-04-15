"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROPS_KEY = void 0;
exports.Property = Property;
exports.Field = Field;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
require("reflect-metadata");
exports.PROPS_KEY = Symbol('props');
function Property() {
    return (target, propertyKey) => {
        const existing = Reflect.getOwnMetadata(exports.PROPS_KEY, target.constructor) || [];
        if (!existing.includes(propertyKey)) {
            Reflect.defineMetadata(exports.PROPS_KEY, [...existing, propertyKey], target.constructor);
        }
    };
}
function Field(options) {
    return (0, common_1.applyDecorators)(Property(), options?.required ? (0, class_validator_1.IsNotEmpty)() : (0, class_validator_1.IsOptional)(), (0, swagger_1.ApiProperty)({
        required: options?.required ?? false,
        example: options?.example,
    }));
}
//# sourceMappingURL=field.decorator.js.map