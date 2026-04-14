import * as sql from 'mssql';
export declare class TableConverter {
    static toTvp<T>(entity: Partial<T>, type: new () => T): sql.Table;
    static convertToTvp<T extends object>(entity: T): sql.Table;
    static listToTvp<T extends object>(items: T[]): sql.Table;
    private static inferSqlType;
}
