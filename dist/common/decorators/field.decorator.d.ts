import 'reflect-metadata';
export declare const PROPS_KEY: unique symbol;
export declare function Property(): (target: any, propertyKey: string) => void;
export declare function Field(options?: {
    required?: boolean;
    example?: any;
}): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
