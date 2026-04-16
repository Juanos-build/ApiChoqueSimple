import { DbResult } from "../../common/models/response.interface";
export declare abstract class BaseDao {
    protected safeExecute<T>(action: () => Promise<DbResult<T>>): Promise<DbResult<T>>;
}
