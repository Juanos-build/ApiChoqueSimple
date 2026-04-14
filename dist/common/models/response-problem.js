"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseProblem = void 0;
class ResponseProblem {
    title;
    statusCode;
    statusMessage;
    detail;
    status;
    bad(result) {
        this.statusCode = result?.statusCode ?? -1;
        this.statusMessage = result?.statusMessage ?? 'Error';
        return this;
    }
}
exports.ResponseProblem = ResponseProblem;
//# sourceMappingURL=response-problem.js.map