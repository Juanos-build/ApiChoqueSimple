import { DbResult } from 'src/common/models/response.interface';
import {
  UsuarioLogin,
  UsuarioLoginExtended,
} from 'src/infrastructure/entities/usuario.login.entity';

export interface ILoginDao {
  // trae los refresh tokens del usuario
  obtenerUsuarioLogin(
    request: UsuarioLogin,
  ): Promise<DbResult<UsuarioLoginExtended[] | null>>;

  // persiste refresh tokens rotados
  registrarUsuarioLogin(request: UsuarioLogin[]): Promise<DbResult<number>>;
}
