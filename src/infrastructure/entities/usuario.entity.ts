import { Field } from 'src/common/decorators/field.decorator';
import { Exclude } from 'class-transformer';

// Equivale a tu clase Usuario.cs y UsuarioExtend.cs
export class Usuario {
  @Field()
  idUsuario?: number;
  @Exclude()
  @Field()
  clave?: string;
  @Field()
  nombre?: string;
  @Field()
  apellido?: string;
  @Field()
  codigoTipoPersona?: string;
  @Field()
  codigoTipoIdentificacion?: string;
  @Field()
  numeroIdentificacion?: string;
  @Field()
  telefono?: string;
  @Field()
  celular?: string;
  @Field()
  codigoGenero?: string;
  @Field()
  codigoNivelEducativo?: string;
  @Field()
  codigoNacionalidad?: string;
  @Field()
  fechaVencimientoDocumento?: string;
  @Field()
  fechaNacimiento?: string;
  @Field({ required: true })
  email?: string;
  @Field()
  codigoEstadoCivil?: string;
  @Field()
  direccion?: string;
  @Field()
  codigoPais?: string;
  @Field()
  codigoProvincia?: string;
  @Field()
  codigoIngresoMensual?: string;
  @Field()
  codigoDistrito?: string;
  @Field()
  codigoCanton?: string;
  @Field()
  codigoCliente?: string;
}

export class UsuarioExtend extends Usuario {
  rol?: string;
  fechaCreacion?: Date;
}
