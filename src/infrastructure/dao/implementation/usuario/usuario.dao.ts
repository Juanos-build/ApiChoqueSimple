import * as sql from 'mssql';
import { Response } from '../../../../common/models/response.interface';
import { IUsuarioDao } from '../../interfaces/usuario.dao.interface';
import { UsuarioExtend, Usuario } from '../../../entities/usuario.entity';
import {
  DatabaseService,
  getCurrentTransaction,
} from '../../../database/database.service';
import { TableConverter } from '../../../../common/helpers/table-converter.helper';
import { mapFromDb } from 'src/common/helpers/mapper.helper';
import { BaseDao } from 'src/infrastructure/database/base.dao';
import { Dao } from 'src/common/decorators/class.decorator';

@Dao()
export class UsuarioDao extends BaseDao implements IUsuarioDao {
  constructor(private readonly db: DatabaseService) {
    super();
  }

  async obtenerUsuario(
    request: Usuario,
  ): Promise<Response<UsuarioExtend | null>> {
    return this.safeExecute(async () => {
      const transaction = getCurrentTransaction();
      const inputs = [
        {
          name: 'OBJ_USUARIO',
          type: sql.TVP,
          value: TableConverter.toTvp(request, Usuario),
        },
      ];

      // Equivale a ExecuteStoreProcedureDataAsync con gr.Read<UsuarioExtend>().FirstOrDefault()
      const dt = await this.db.executeStoreProcedureData<UsuarioExtend>(
        transaction,
        'SP_OBTENER_USUARIO',
        inputs,
        (recordsets) =>
          (recordsets[0]?.[0] as unknown as UsuarioExtend) ?? null, // FirstOrDefault()
      );

      return {
        statusCode: dt.statusCode,
        statusMessage: dt.statusMessage,
        result:
          dt.statusCode === 1
            ? mapFromDb(UsuarioExtend, dt.result)
            : new UsuarioExtend(),
      };
    });
  }
}
