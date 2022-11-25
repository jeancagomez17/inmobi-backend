import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtContains } from './jwt-contains';
import { Strategy, ExtractJwt } from "passport-jwt";
import { LoginAuthDto } from './dto/register-auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey:jwtContains.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload:any): Promise<any | {}> {
    //console.log(payload)
    const user:any = await this.authService.login(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {userId: payload};
  }
}