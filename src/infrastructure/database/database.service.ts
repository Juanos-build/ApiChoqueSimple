import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sql from 'mssql';
import { Response } from '../../common/models/response.interface';
import { AsyncLocalStorage } from 'async_hooks';

export const transactionContext = new AsyncLocalStorage<sql.Transaction>();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: sql.ConnectionPool;

  constructor(private configService: ConfigService) {}

  // Se ejecuta al iniciar el módulo — equivale a cuando .NET abre la conexión
  async onModuleInit() {
    // Lee desde el namespace 'database' — equivale a appSettings.Connection
    const server = this.configService.get<string>('database.server')!;
    const database = this.configService.get<string>('database.database')!;
    const user = this.configService.get<string>('database.user')!;
    const password = this.configService.get<string>('database.password')!;
    const encrypt =
      this.configService.get<boolean>('database.encrypt') ?? false;

    this.pool = await new sql.ConnectionPool({
      server: server,
      database: database,
      user: user,
      password: password,
      options: {
        encrypt: encrypt, // true si es Azure SQL
        trustServerCertificate: true,
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    }).connect();

    console.log('✅ Conexión a SQL Server establecida');
  }

  // Se ejecuta al apagar — cierra el pool limpiamente
  async onModuleDestroy() {
    await this.pool.close();
  }

  // Expone el pool para que los DAOs lo usen
  // Equivale a IConnectionFactory.GetConnection()
  getPool(): sql.ConnectionPool {
    return this.pool;
  }

  // ─────────────────────────────────────────────
  // MÉTODOS ESTÁTICOS — Equivalen a los de AccessDaoFactory
  // ─────────────────────────────────────────────

  /**
   * Ejecuta SP que solo devuelve CODIGO/MENSAJE
   * Equivale a ExecuteStoreProcedureParamsAsync
   */
  async executeStoreProcedureParams(
    transaction: sql.Transaction,
    procedure: string,
    inputs: {
      name: string;
      type: sql.ISqlType | (() => sql.ISqlType);
      value: unknown;
    }[],
  ): Promise<Response<number>> {
    try {
      const request = new sql.Request(transaction);

      // Agrega los parámetros de entrada — equivale a DynamicParameters.Add()
      for (const input of inputs) {
        request.input(input.name, input.type, input.value);
      }

      // Parámetros de salida estándar — equivale a CODIGO ReturnValue + MENSAJE Output
      request.output('MENSAJE', sql.VarChar(400));

      const result = await request.execute(procedure);

      return {
        statusCode: result.returnValue as number, // CODIGO (RETURN VALUE del SP)
        statusMessage: result.output['MENSAJE'] as string, // MENSAJE (OUTPUT del SP)
        result: result.rowsAffected[0],
      };
    } catch (ex: unknown) {
      const message = ex instanceof Error ? ex.message : String(ex);
      return {
        statusCode: -1,
        statusMessage: `Error ejecutando SP: ${message}`,
      };
    }
  }

  /**
   * Ejecuta SP que devuelve datos (recordsets)
   * Equivale a ExecuteStoreProcedureDataAsync<T>
   */
  async executeStoreProcedureData<T>(
    transaction: sql.Transaction,
    procedure: string,
    inputs: {
      name: string;
      type: sql.ISqlType | (() => sql.ISqlType);
      value: unknown;
    }[],
    readerFunc: (recordsets: sql.IRecordSet<Record<string, unknown>>[]) => T,
  ): Promise<Response<T>> {
    try {
      const request = new sql.Request(transaction);

      for (const input of inputs) {
        request.input(input.name, input.type, input.value);
      }

      request.output('MENSAJE', sql.VarChar(400));

      const result = await request.execute(procedure);

      const recordsets = result.recordsets as sql.IRecordSet<
        Record<string, unknown>
      >[];
      const data = readerFunc ? readerFunc(recordsets) : null;

      return {
        statusCode: result.returnValue as number,
        statusMessage: result.output['MENSAJE'] as string,
        result: data ?? undefined,
      };
    } catch (ex: unknown) {
      const message = ex instanceof Error ? ex.message : String(ex);
      return {
        statusCode: -1,
        statusMessage: `Error ejecutando SP: ${message}`,
        result: undefined,
      };
    }
  }

  /**
   * Manejo de transacción completa
   * Equivale exactamente a TransactionHelper.ExecuteInTransactionAsync
   */
  async executeInTransaction<T>(
    action: () => Promise<Response<T>>,
  ): Promise<Response<T>> {
    const transaction = new sql.Transaction(this.pool);

    try {
      await transaction.begin();
      return await transactionContext.run(transaction, async () => {
        const result = await action();

        if (result.statusCode === 1 || result.statusCode === 2) {
          await transaction.commit();
          return result;
        } else {
          // Igual que tu ResultException — rollback si el SP devuelve código != 1 o 2
          await transaction.rollback();
          return result;
        }
      });
    } catch (ex: unknown) {
      await transaction.rollback();
      const message = ex instanceof Error ? ex.message : String(ex);
      return {
        statusCode: -1,
        statusMessage: `Error en transacción: ${message}`,
      };
    }
  }

  async executeInTransactionRaw<T>(action: () => Promise<T>): Promise<T> {
    const transaction = new sql.Transaction(this.pool);

    try {
      await transaction.begin();

      return await transactionContext.run(transaction, async () => {
        const result = await action();

        await transaction.commit();
        return result;
      });
    } catch (ex) {
      await transaction.rollback();
      throw ex;
    }
  }
}

export function getCurrentTransaction(): sql.Transaction {
  const tx = transactionContext.getStore();

  if (!tx) {
    throw new Error('No active transaction');
  }

  return tx;
}
