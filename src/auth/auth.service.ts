import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterAuthDto, LoginAuthDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtContains } from './jwt-contains';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  
  async validateUser(email: string, password: string) {
    const findUser = await this.userRepository.findOneBy({ email });
    if (!findUser) return new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, findUser?.password);
    if (!checkPassword) return new HttpException('PASSWORD_INCORRECT', 403);
    const payload = { email: findUser?.email, password: findUser?.password };
    return payload;
  }

  async register(createAuthDto: RegisterAuthDto) {
    const { password } = createAuthDto;
    const plainToHash = await hash(password, 10);
    createAuthDto = { ...createAuthDto, password: plainToHash };
    const data = this.userRepository.create({...createAuthDto, rol:{id:2}});
    return await this.userRepository.save(data);
  }

  async login(user: any) {
    const { email, password } = user;
    const findUser = await this.userRepository.findOneBy({ email });
    if (!findUser) return new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, findUser?.password);
    if (!checkPassword) return new HttpException('PASSWORD_INCORRECT', 403);
    const payload = { email: findUser?.email, password: findUser?.password };
    //return payload
    const token = this.jwtService.sign(payload);
    console.log(token);
    return { user: payload, token };
  }
}
