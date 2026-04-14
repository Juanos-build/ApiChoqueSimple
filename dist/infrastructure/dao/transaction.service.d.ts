import { Response } from '../../common/response.interface';
import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { DaoContainer } from '../database/dao.container';
export declare class TransactionService {
    private readonly dao;
    constructor(dao: DaoContainer);
    obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
