"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = exports.TRANSACTIONAL_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.TRANSACTIONAL_KEY = 'transactional';
const Transactional = () => (0, common_1.SetMetadata)(exports.TRANSACTIONAL_KEY, true);
exports.Transactional = Transactional;
//# sourceMappingURL=transaction.decorator.js.map