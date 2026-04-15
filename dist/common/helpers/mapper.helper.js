"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToClass = mapToClass;
exports.mapFromDb = mapFromDb;
const transform_interceptor_1 = require("../interceptors/transform.interceptor");
require("reflect-metadata");
const field_decorator_1 = require("../decorators/field.decorator");
function getProps(target) {
    const props = Reflect.getMetadata(field_decorator_1.PROPS_KEY, target);
    return Array.isArray(props) ? props : [];
}
function getAllProps(target) {
    let props = [];
    let current = target;
    while (current && current !== Function.prototype) {
        const currentProps = getProps(current);
        props = [...props, ...currentProps];
        current = Object.getPrototypeOf(current);
    }
    return [...new Set(props)];
}
function mapToClass(cls, data) {
    const instance = new cls();
    const props = getAllProps(cls);
    for (const key of props) {
        if (key in data) {
            instance[key] = data[key];
        }
    }
    return instance;
}
function mapFromDb(cls, data) {
    if (!data)
        return null;
    const normalized = (0, transform_interceptor_1.pascalToCamelCase)(data);
    return mapToClass(cls, normalized);
}
//# sourceMappingURL=mapper.helper.js.map