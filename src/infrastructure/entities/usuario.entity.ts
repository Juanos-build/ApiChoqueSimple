import { Field } from 'src/common/decorators/field.decorator';
import { Exclude } from 'class-transformer';
import { UsuarioLoginExtended } from './usuario.login.entity';

// Equivale a tu clase Usuario.cs y UsuarioExtend.cs
export class Usuario {
  @Field()
  idUsuario?: number;
  @Exclude({ toPlainOnly: true })
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
  @Field()
  rol?: string;

  @Field({ example: '2024-01-01T00:00:00' })
  fechaCreacion?: Date;

  @Field()
  token?: string;

  @Field()
  idAplicacion?: number;

  @Field()
  clienteExiste?: number;

  @Exclude({ toPlainOnly: true }) // Equivale a [JsonIgnore]
  refreshToken?: string;

  @Exclude({ toPlainOnly: true }) // Equivale a [JsonIgnore]
  refreshTokens: UsuarioLoginExtended[] = [];
}
