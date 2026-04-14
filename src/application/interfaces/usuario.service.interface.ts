import { Response } from '../../common/response.interface';
import {
  UsuarioExtend,
  Usuario,
} from '../../infrastructure/entities/usuario.entity';

export interface IUsuarioService {
  obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
