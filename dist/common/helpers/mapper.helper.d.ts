import 'reflect-metadata';
export declare function mapToClass<T extends object, V extends object>(cls: new () => T, data: V): T;
export declare function mapFromDb<T extends object, V extends object>(cls: new () => T, data: V | null | undefined): T | null;
