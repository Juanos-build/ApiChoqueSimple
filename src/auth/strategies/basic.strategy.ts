import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private configService: ConfigService) {
    super({ passReqToCallback: false });
  }

  validate(username: string, password: string): boolean {
    const validUser = this.configService.get<string>('auth.basicUser');
    const validPass = this.configService.get<string>('auth.basicPass');

    if (username === validUser && password === validPass) {
      return true;
    }

    throw new UnauthorizedException('Credenciales básicas inválidas');
  }
}
