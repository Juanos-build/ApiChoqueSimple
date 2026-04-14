import { TransactionService } from '../../infrastructure/dao/transaction.service';
import { IUsuarioService } from '../interfaces/usuario.service.interface';
import { Response } from '../../common/response.interface';
import { UsuarioExtend, Usuario } from '../../infrastructure/entities/usuario.entity';
export declare class UsuarioService implements IUsuarioService {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    obtenerUsuario(request: Usuario): Promise<Response<UsuarioExtend>>;
}
