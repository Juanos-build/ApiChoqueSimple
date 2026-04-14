export declare class Usuario {
    idUsuario?: number;
    clave?: string;
    nombre?: string;
    apellido?: string;
    codigoTipoPersona?: string;
    codigoTipoIdentificacion?: string;
    numeroIdentificacion?: string;
    telefono?: string;
    celular?: string;
    codigoGenero?: string;
    codigoNivelEducativo?: string;
    codigoNacionalidad?: string;
    fechaVencimientoDocumento?: string;
    fechaNacimiento?: string;
    email?: string;
    codigoEstadoCivil?: string;
    direccion?: string;
    codigoPais?: string;
    codigoProvincia?: string;
    codigoIngresoMensual?: string;
    codigoDistrito?: string;
    codigoCanton?: string;
    codigoCliente?: string;
}
export declare class UsuarioExtend extends Usuario {
    rol?: string;
    fechaCreacion?: Date;
}
