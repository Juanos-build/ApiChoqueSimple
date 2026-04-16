import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';
import { DbResult } from '../../common/models/response.interface';
import { AsyncLocalStorage } from 'async_hooks';
export declare const transactionContext: AsyncLocalStorage<sql.Transaction>;
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private pool;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getPool(): sql.ConnectionPool;
    executeStoreProcedureParams(transaction: sql.Transaction, procedure: string, inputs: {
        name: string;
        type: sql.ISqlType | (() => sql.ISqlType);
        value: unknown;
    }[]): Promise<DbResult<number>>;
    executeStoreProcedureData<T>(transaction: sql.Transaction, procedure: string, inputs: {
        name: string;
        type: sql.ISqlType | (() => sql.ISqlType);
        value: unknown;
    }[], readerFunc: (recordsets: sql.IRecordSet<Record<string, unknown>>[]) => T): Promise<DbResult<T>>;
    executeInTransaction<T>(action: () => Promise<DbResult<T>>): Promise<DbResult<T>>;
    executeInTransactionRaw<T>(action: () => Promise<T>): Promise<T>;
}
export declare function getCurrentTransaction(): sql.Transaction;
