import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { DatabaseService } from "../../infrastructure/database/database.service";
export declare class TransactionalInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly db;
    constructor(reflector: Reflector, db: DatabaseService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
