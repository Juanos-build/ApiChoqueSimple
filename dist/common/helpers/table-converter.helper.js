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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableConverter = void 0;
const sql = __importStar(require("mssql"));
const field_decorator_1 = require("../decorators/field.decorator");
class TableConverter {
    static toTvp(entity, type) {
        const tvp = new sql.Table();
        const props = getAllProps(type);
        for (const key of props) {
            tvp.columns.add(key, sql.NVarChar(sql.MAX));
        }
        const row = props.map((key) => {
            const value = entity[key];
            return (value ?? null);
        });
        tvp.rows.add(...row);
        return tvp;
    }
    static convertToTvp(entity) {
        const obj = entity ?? {};
        const tvp = new sql.Table();
        const entries = Object.entries(obj);
        for (const [key, value] of entries) {
            tvp.columns.add(key, TableConverter.inferSqlType(value));
        }
        tvp.rows.add(...entries.map(([, value]) => (value ?? null)));
        return tvp;
    }
    static listToTvp(items) {
        const list = items ?? [];
        const tvp = new sql.Table();
        if (list.length === 0)
            return tvp;
        const entries = Object.entries(list[0]);
        for (const [key, value] of entries) {
            tvp.columns.add(key, TableConverter.inferSqlType(value));
        }
        for (const item of list) {
            tvp.rows.add(...Object.values(item).map((v) => (v ?? null)));
        }
        return tvp;
    }
    static inferSqlType(value) {
        if (value === null || value === undefined)
            return sql.NVarChar(sql.MAX);
        switch (typeof value) {
            case 'number':
                return Number.isInteger(value) ? sql.Int : sql.Decimal(18, 2);
            case 'boolean':
                return sql.Bit;
            case 'string':
                return sql.NVarChar(sql.MAX);
            case 'object':
                if (value instanceof Date)
                    return sql.DateTime;
                return sql.NVarChar(sql.MAX);
            default:
                return sql.NVarChar(sql.MAX);
        }
    }
}
exports.TableConverter = TableConverter;
function getAllProps(target) {
    const props = Reflect.getOwnMetadata(field_decorator_1.PROPS_KEY, target) || [];
    return [...new Set(props)];
}
//# sourceMappingURL=table-converter.helper.js.map