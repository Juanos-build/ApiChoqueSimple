export declare class LoggerService {
    private readonly logger;
    constructor();
    error(message: string, properties?: Record<string, unknown>): void;
    info(message: string, properties?: Record<string, unknown>): void;
    warn(message: string, properties?: Record<string, unknown>): void;
}
