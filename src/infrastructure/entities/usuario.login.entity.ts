// src/infrastructure/entities/auth.entity.ts
import { Field } from 'src/common/decorators/field.decorator';

// Equivale a UsuarioLogin.cs
export class UsuarioLogin {
  @Field()
  codeLogin?: string;

  @Field()
  token?: string;

  @Field()
  expires?: string;

  @Field()
  created?: string;

  @Field()
  createdByIp?: string;

  @Field()
  revoked?: string;

  @Field()
  revokedByIp?: string;

  @Field()
  replacedByToken?: string;

  @Field()
  reasonRevoked?: string;

  @Field()
  tokenRefresh?: string;
}

export class UsuarioLoginExtended extends UsuarioLogin {
  get expiresAt(): Date {
    return new Date(this.expires!);
  }

  get createdAt(): Date {
    return new Date(this.created!);
  }

  get revokedAt(): Date | null {
    return this.revoked ? new Date(this.revoked) : null;
  }

  get isExpired(): boolean {
    return new Date() >= this.expiresAt;
  }

  get isRevoked(): boolean {
    return this.revokedAt !== null;
  }

  get isActive(): boolean {
    return !this.isExpired && !this.isRevoked;
  }

  getStatus(): RefreshTokenStatus {
    if (this.isRevoked) {
      return this.replacedByToken
        ? RefreshTokenStatus.Reused
        : RefreshTokenStatus.Revoked;
    }
    if (this.isExpired) return RefreshTokenStatus.Expired;
    return RefreshTokenStatus.Active;
  }
}

export enum RefreshTokenStatus {
  Active = 'Active',
  Expired = 'Expired',
  Revoked = 'Revoked',
  Reused = 'Reused',
}

export class LoginRequest {
  @Field({ required: true })
  email: string;

  @Field({ required: true })
  clave: string; // texto plano, se compara contra hash en BD o en servicio
}
