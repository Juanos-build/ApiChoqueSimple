import { TransactionService } from '../../infrastructure/dao/transaction.service';
import { IUsuarioService } from '../interfaces/usuario.service.interface';
import { Response } from '../../common/models/response.interface';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';
import { Request } from '../../common/models/response.interface';
export declare class UsuarioService implements IUsuarioService {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    obtenerUsuario(request: Request<UsuarioExtend>): Promise<Response<UsuarioExtend | null>>;
}
