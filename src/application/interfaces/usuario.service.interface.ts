import {
  AppResponse,
  AppRequest,
} from '../../common/models/response.interface';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';

export interface IUsuarioService {
  obtenerUsuario(
    request: AppRequest<UsuarioExtend>,
  ): Promise<AppResponse<UsuarioExtend | null>>;
}
