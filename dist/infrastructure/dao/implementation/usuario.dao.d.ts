import { Response } from '../../../common/response.interface';
import { IUsuarioDao } from '../interfaces/usuario.dao.interface';
import { UsuarioExtend, Usuario } from '../../entities/usuario.entity';
import { DatabaseService } from '../../database/database.service';
import { BaseDao } from "../../database/base.dao";
export declare class UsuarioDao extends BaseDao implements IUsuarioDao {
    private readonly db;
    constructor(db: DatabaseService);
    obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
