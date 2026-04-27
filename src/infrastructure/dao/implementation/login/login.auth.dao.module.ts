import { Module } from '@nestjs/common';
import { LoginDao } from './login.auth.dao';

@Module({
  providers: [LoginDao],
  exports: [LoginDao],
})
export class LoginDaoModule {}
