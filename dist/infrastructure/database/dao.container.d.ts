import { UsuarioDao } from '../dao/implementation/usuario.dao';
export declare class DaoContainer {
    readonly usuarioDao: UsuarioDao;
    constructor(usuarioDao: UsuarioDao);
}
