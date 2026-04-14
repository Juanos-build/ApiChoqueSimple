"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROPS_KEY = void 0;
exports.Property = Property;
exports.Field = Field;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
exports.PROPS_KEY = Symbol('props');
function Property() {
    return (target, propertyKey) => {
        const props = Reflect.getMetadata(exports.PROPS_KEY, target.constructor) || [];
        props.push(propertyKey);
        Reflect.defineMetadata(exports.PROPS_KEY, props, target.constructor);
    };
}
function Field(options) {
    return (0, common_1.applyDecorators)(Property(), options?.required ? (0, class_validator_1.IsNotEmpty)() : (0, class_validator_1.IsOptional)());
}
//# sourceMappingURL=field.decorator.js.map