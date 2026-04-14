import { Response } from '../../../common/response.interface';
import { UsuarioExtend, Usuario } from '../../entities/usuario.entity';

// Equivale a tu IUsuarioDao.cs
export interface IUsuarioDao {
  obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
