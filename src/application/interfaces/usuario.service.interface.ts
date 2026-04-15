import { Response, Request } from '../../common/models/response.interface';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';

export interface IUsuarioService {
  obtenerUsuario(
    request: Request<UsuarioExtend>,
  ): Promise<Response<UsuarioExtend | null>>;
}
