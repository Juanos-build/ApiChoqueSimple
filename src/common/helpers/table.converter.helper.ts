import * as sql from 'mssql';
import { COLUMN_TYPE_KEY, PROPS_KEY } from '../decorators/field.decorator';

type SqlValue = string | number | boolean | Date | Buffer | null | undefined;

export class TableConverter {
  static toTvp<T extends object>(
    entity: Partial<T>,
    type: new () => T,
  ): sql.Table {
    const tvp = new sql.Table();

    const props = getAllProps(type);

    // columnas
    for (const key of props) {
      tvp.columns.add(
        key,
        getSqlType(
          type,
          key,
          (entity as Record<string, unknown>)[key] as SqlValue,
        ),
      );
    }

    // fila
    const row: SqlValue[] = props.map((key) => {
      const value = (entity as Record<string, unknown>)[key];
      return (value ?? null) as SqlValue;
    });

    tvp.rows.add(...row);

    return tvp;
  }

  /**
   * Equivale a ConvertToDataTable<T>(T entity)
   */
  static convertToTvp<T extends object>(entity: T): sql.Table {
    const obj = entity ?? ({} as T);
    const tvp = new sql.Table();
    const entries = Object.entries(obj);

    for (const [key, value] of entries) {
      tvp.columns.add(key, TableConverter.inferSqlType(value as SqlValue));
    }

    tvp.rows.add(...entries.map(([, value]) => (value ?? null) as SqlValue));

    return tvp;
  }

  static listToTvp<T extends object>(items: T[], type: new () => T): sql.Table {
    const list = items ?? [];
    const tvp = new sql.Table();

    if (list.length === 0) return tvp;

    const props = getAllProps(type);

    // columnas
    for (const key of props) {
      tvp.columns.add(
        key,
        getSqlType(
          type,
          key,
          (list[0] as Record<string, unknown>)?.[key] as SqlValue,
        ),
      );
    }

    // filas
    for (const item of list) {
      const row: SqlValue[] = props.map((key) => {
        const value = (item as Record<string, unknown>)[key];
        return (value ?? null) as SqlValue;
      });

      tvp.rows.add(...row);
    }

    return tvp;
  }

  static toTvpList<T extends object>(items: T[], type: new () => T): sql.Table {
    const list = items ?? [];
    const tvp = new sql.Table();

    if (list.length === 0) return tvp;

    const props = getAllProps(type);

    // columnas (igual que toTvp)
    for (const key of props) {
      tvp.columns.add(
        key,
        getSqlType(
          type,
          key,
          (list[0] as Record<string, unknown>)?.[key] as SqlValue,
        ),
      );
    }

    // filas
    for (const item of list) {
      const row: SqlValue[] = props.map((key) => {
        const value = (item as Record<string, unknown>)[key];
        return (value ?? null) as SqlValue;
      });

      tvp.rows.add(...row);
    }

    return tvp;
  }

  static toTvpAuto<T extends object>(
    data: T | T[],
    type: new () => T,
  ): sql.Table {
    if (Array.isArray(data)) {
      return TableConverter.toTvpList(data, type);
    }

    return TableConverter.toTvp(data, type);
  }

  /**
   * Infiere el tipo SQL según el tipo JS del valor
   */
  protected static inferSqlType(
    value?: SqlValue,
  ): sql.ISqlType | (() => sql.ISqlType) {
    if (value === null || value === undefined) return sql.NVarChar(sql.MAX);

    switch (typeof value) {
      case 'number':
        return Number.isInteger(value) ? sql.Int : sql.Decimal(18, 2);
      case 'boolean':
        return sql.Bit;
      case 'string':
        return sql.NVarChar(sql.MAX);
      case 'object':
        if (value instanceof Date) return sql.DateTime;
        return sql.NVarChar(sql.MAX);
      default:
        return sql.NVarChar(sql.MAX);
    }
  }

  static resolveSqlType(value?: SqlValue): sql.ISqlType | (() => sql.ISqlType) {
    return this.inferSqlType(value);
  }
}

function getAllProps(target: object): string[] {
  const props = (Reflect.getOwnMetadata(PROPS_KEY, target) as string[]) || [];

  return [...new Set(props)];
}

function getSqlType<T extends object>(
  target: new () => T,
  key: string,
  sampleValue?: SqlValue,
): sql.ISqlType | (() => sql.ISqlType) {
  const metadata = Reflect.getOwnMetadata(COLUMN_TYPE_KEY, target as object) as
    | Record<string, sql.ISqlType | (() => sql.ISqlType)>
    | undefined;

  const configuredType = metadata?.[key];

  if (configuredType) return configuredType;

  // fallback a inferencia actual (no rompe nada)
  return TableConverter.resolveSqlType(sampleValue);
}
