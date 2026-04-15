import { UsuarioService } from '../../application/services/usuario.service';
import { UsuarioExtend } from '../../infrastructure/entities/usuario.entity';
import { ResponseHelper } from "../../common/helpers/response.helper";
import * as responseInterface from "../../common/models/response.interface";
export declare class UsuarioController {
    private readonly usuarioService;
    private readonly responseHelper;
    constructor(usuarioService: UsuarioService, responseHelper: ResponseHelper);
    obtenerUsuario(request: responseInterface.Request<UsuarioExtend>): Promise<responseInterface.Response<UsuarioExtend | null>>;
}
