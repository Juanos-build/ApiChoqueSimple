import { DbResult } from 'src/common/models/response.interface';
import { UsuarioExtend, Usuario } from '../../entities/usuario.entity';

export interface IUsuarioDao {
  obtenerUsuario(request: Usuario): Promise<DbResult<UsuarioExtend | null>>;
}
