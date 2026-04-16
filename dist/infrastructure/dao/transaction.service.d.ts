import { UsuarioExtend, Usuario } from '../entities/usuario.entity';
import { UsuarioDao } from './implementation/usuario/usuario.dao';
import { DatabaseService } from '../database/database.service';
export declare class TransactionService {
    private readonly db;
    private readonly usuarioDao;
    constructor(db: DatabaseService, usuarioDao: UsuarioDao);
    private execute;
    obtenerUsuario(request: Usuario): Promise<UsuarioExtend | null>;
}
