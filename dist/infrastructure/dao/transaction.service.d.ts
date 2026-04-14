import { Response } from '../../common/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';
export declare class TransactionService {
    private readonly usuarioDao;
    constructor(usuarioDao: UsuarioDao);
    obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
