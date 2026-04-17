import * as sql from 'mssql';
import {
  DatabaseService,
  getCurrentTransaction,
} from '../../../database/database.service';
import { TableConverter } from '../../../../common/helpers/table.converter.helper';
import { mapFromDb } from 'src/common/helpers/mapper.helper';
import { BaseDao } from 'src/infrastructure/database/base.dao';
import { Dao } from 'src/common/decorators/class.decorator';
import { DbResult } from 'src/common/models/response.interface';
import { ILoginDao } from '../../interfaces/login.auth.interface';
import {
  UsuarioLogin,
  UsuarioLoginExtended,
} from 'src/infrastructure/entities/usuario.login.entity';

@Dao()
export class LoginDao extends BaseDao implements ILoginDao {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async obtenerUsuarioLogin(
    request: UsuarioLogin,
  ): Promise<DbResult<UsuarioLoginExtended[] | null>> {
    return this.safeExecute(async () => {
      const transaction = getCurrentTransaction();

      const inputs = [
        {
          name: 'OBJ_USUARIO_LOGIN',
          type: sql.TVP,
          value: TableConverter.toTvpAuto(request, UsuarioLogin),
        },
      ];

      const dt = await this.db.executeStoreProcedureData<
        UsuarioLoginExtended[]
      >(
        transaction,
        'SP_GET_USUARIO_LOGIN',
        inputs,
        (recordsets) =>
          (recordsets[0] as unknown as UsuarioLoginExtended[]) ?? [],
      );

      return {
        statusCode: dt.statusCode,
        statusMessage: dt.statusMessage,
        data:
          dt.statusCode === 1
            ? (dt.data ?? [])
                .map((row) => mapFromDb(UsuarioLoginExtended, row))
                .filter((x): x is UsuarioLoginExtended => x !== null)
            : null,
      };
    });
  }

  async registrarUsuarioLogin(
    request: UsuarioLogin[],
  ): Promise<DbResult<UsuarioLogin | null>> {
    return this.safeExecute(async () => {
      const transaction = getCurrentTransaction();

      const inputs = [
        {
          name: 'OBJ_USUARIO_LOGIN',
          type: sql.TVP,
          // TableConverter soporta array
          value: TableConverter.toTvpAuto(request, UsuarioLogin),
        },
      ];

      const dt = await this.db.executeStoreProcedureData<UsuarioLogin | null>(
        transaction,
        'SP_SET_USUARIO_LOGIN',
        inputs,
        (recordsets) => (recordsets[0]?.[0] as unknown as UsuarioLogin) ?? null,
      );

      return {
        statusCode: dt.statusCode,
        statusMessage: dt.statusMessage,
        data:
          dt.statusCode === 1 && dt.data
            ? mapFromDb(UsuarioLogin, dt.data)
            : null,
      };
    });
  }
}
