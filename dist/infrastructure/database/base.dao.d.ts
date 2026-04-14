import { Response } from "../../common/response.interface";
export declare abstract class BaseDao {
    protected safeExecute<T>(action: () => Promise<Response<T>>): Promise<Response<T>>;
}
