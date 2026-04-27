import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/application/services/auth.service';
import { AuthController } from 'src/presentation/auth/auth.controller';
import { TokenService } from 'src/application/services/token.service';
import { BasicStrategy } from '../../auth/strategies/basic.strategy';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { StringValue } from 'ms';
import { UsuarioService } from 'src/application/services/usuario.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('auth.jwtSecret');
        const expiresIn = config.get<string>('auth.accessExpiration');

        if (!secret || !expiresIn) {
          throw new Error('JWT config incompleta');
        }

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as StringValue,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    BasicStrategy,
    JwtStrategy,
    UsuarioService,
  ],
  exports: [TokenService, JwtModule],
})
export class AuthModule {}
