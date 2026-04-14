"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO_KEY = void 0;
exports.Dao = Dao;
const common_1 = require("@nestjs/common");
exports.DAO_KEY = 'dao';
function Dao() {
    return (target) => {
        (0, common_1.Injectable)()(target);
        (0, common_1.SetMetadata)(exports.DAO_KEY, true)(target);
    };
}
//# sourceMappingURL=class.decorator.js.map