"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDao = void 0;
class BaseDao {
    async safeExecute(action) {
        try {
            return await action();
        }
        catch (ex) {
            const message = ex instanceof Error ? ex.message : String(ex);
            return {
                statusCode: -1,
                statusMessage: `Error DAO: ${message}`,
            };
        }
    }
}
exports.BaseDao = BaseDao;
//# sourceMappingURL=base.dao.js.map