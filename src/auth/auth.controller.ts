import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterAuthDto, LoginAuthDto } from './dto/register-auth.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
   register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  login(@Body() loginUser:LoginAuthDto ){
    console.log('login controller')
    return this.authService.login(loginUser);
  }

 
}
