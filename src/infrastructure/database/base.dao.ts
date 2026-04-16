import { DbResult } from 'src/common/models/response.interface';

export abstract class BaseDao {
  protected async safeExecute<T>(
    action: () => Promise<DbResult<T>>,
  ): Promise<DbResult<T>> {
    try {
      return await action();
    } catch (ex: unknown) {
      const message = ex instanceof Error ? ex.message : String(ex);

      return {
        statusCode: -1,
        statusMessage: `Error DAO: ${message}`,
      };
    }
  }
}
