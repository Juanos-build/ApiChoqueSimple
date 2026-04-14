import { UsuarioService } from '../../application/services/usuario.service';
import { Usuario } from '../../infrastructure/entities/usuario.entity';
import { ResponseHelper } from "../../common/helpers/response.helper";
export declare class UsuarioController {
    private readonly usuarioService;
    private readonly responseHelper;
    constructor(usuarioService: UsuarioService, responseHelper: ResponseHelper);
    obtenerUsuario(request: Usuario): Promise<import("../../common/response.interface").Response<import("../../infrastructure/entities/usuario.entity").UsuarioExtend>>;
}
