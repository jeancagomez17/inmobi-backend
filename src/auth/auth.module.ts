import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtContains } from './jwt-contains';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[UserModule, JwtModule.register({
    secret:jwtContains.secret,
    signOptions:{expiresIn:'3600s'}
  }), PassportModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [
    PassportModule, 
    JwtModule
]
})
export class AuthModule {}
