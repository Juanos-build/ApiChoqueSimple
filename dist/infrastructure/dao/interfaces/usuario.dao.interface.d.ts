import { Response } from '../../../common/models/response.interface';
import { UsuarioExtend, Usuario } from '../../entities/usuario.entity';
export interface IUsuarioDao {
    obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend | null>>;
}
