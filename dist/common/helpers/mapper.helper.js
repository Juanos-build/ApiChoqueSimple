"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToClass = mapToClass;
exports.mapFromDb = mapFromDb;
const class_transformer_1 = require("class-transformer");
const transform_interceptor_1 = require("../interceptors/transform.interceptor");
function mapToClass(cls, data) {
    return (0, class_transformer_1.plainToInstance)(cls, data, {
        excludeExtraneousValues: false,
    });
}
function mapFromDb(cls, data) {
    const normalized = (0, transform_interceptor_1.pascalToCamelCase)(data);
    return (0, class_transformer_1.plainToInstance)(cls, normalized);
}
//# sourceMappingURL=mapper.helper.js.map