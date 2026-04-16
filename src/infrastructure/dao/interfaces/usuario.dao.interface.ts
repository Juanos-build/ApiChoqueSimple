import { DbResult } from 'src/common/models/response.interface';
import { UsuarioExtend, Usuario } from '../../entities/usuario.entity';

// Equivale a tu IUsuarioDao.cs
export interface IUsuarioDao {
  obtenerUsuario(request: Usuario): Promise<DbResult<UsuarioExtend | null>>;
}
