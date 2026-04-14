/* eslint-disable */
import * as sql from 'mssql';
import { PROPS_KEY } from '../decorators/field.decorator'

type SqlValue = string | number | boolean | Date | Buffer | null | undefined;

export class TableConverter {
  static toTvp<T>(entity: Partial<T>, type: new () => T): sql.Table {
    const tvp = new sql.Table();

    const props: string[] = Reflect.getMetadata(PROPS_KEY, type) || [];

    // columnas
    for (const key of props) {
      tvp.columns.add(key, sql.NVarChar(sql.MAX));
    }

    // fila
    const row = props.map((key) => (entity as any)?.[key] ?? null);

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

  /**
   * Equivale a ToDataTable<T>(List<T> items)
   */
  static listToTvp<T extends object>(items: T[]): sql.Table {
    const list = items ?? [];
    const tvp = new sql.Table();

    if (list.length === 0) return tvp;

    const entries = Object.entries(list[0]);

    for (const [key, value] of entries) {
      tvp.columns.add(key, TableConverter.inferSqlType(value as SqlValue));
    }

    for (const item of list) {
      tvp.rows.add(...Object.values(item).map((v) => (v ?? null) as SqlValue));
    }

    return tvp;
  }

  /**
   * Infiere el tipo SQL según el tipo JS del valor
   */
  private static inferSqlType(
    value: SqlValue,
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
}
