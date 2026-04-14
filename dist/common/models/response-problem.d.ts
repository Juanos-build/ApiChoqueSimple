export declare class ResponseProblem {
    title: string;
    statusCode: number;
    statusMessage: string;
    detail?: string;
    status?: number;
    bad(result?: {
        statusCode?: number;
        statusMessage?: string;
    }): ResponseProblem;
}
