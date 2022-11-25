import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterAuthDto, LoginAuthDto } from './dto/register-auth.dto';
import { UserSchema } from 'src/user/schema/user.schema';
import { User } from 'src/user/entities/user.entity';
import {hash, compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtContains } from './jwt-contains';

@Injectable()
export class AuthService {

  async validateUser(email: string, password: string) {

    const findUser = await this.userSchema.findOneBy({email})
    if(!findUser) return new HttpException('USER_NOT_FOUND', 404)
    const checkPassword = await compare(password, findUser?.password)
    if(!checkPassword) return new HttpException('PASSWORD_INCORRECT', 403)
    const payload = {email:findUser?.email, password:findUser?.password}
    return payload

  }
  constructor(@InjectRepository(UserSchema) private readonly userSchema: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(createAuthDto: RegisterAuthDto) {
    const { password } = createAuthDto
    const plainToHash = await hash(password, 10)
    createAuthDto = {...createAuthDto, password:plainToHash}
    const data =  this.userSchema.create(createAuthDto);
    return await this.userSchema.save(data)
  }

  async login(user:any){
    const {email, password} = user
    // const {email, password} = userLogin
    // const findUser = await this.userSchema.findOneBy({email})
    // if(!findUser) return new HttpException('USER_NOT_FOUND', 404)
    // const checkPassword = await compare(password, findUser?.password)
    // if(!checkPassword) return new HttpException('PASSWORD_INCORRECT', 403)
    const findUser = await this.userSchema.findOneBy({email})
    if(!findUser) return new HttpException('USER_NOT_FOUND', 404)
    const checkPassword = await compare(password, findUser?.password)
    if(!checkPassword) return new HttpException('PASSWORD_INCORRECT', 403)
    const payload = {email:findUser?.email, password:findUser?.password}
    //return payload
    const token = this.jwtService.sign(payload)
    console.log(token)
    return {user:payload, token}
    

    // const payload = {email:findUser?.email, name:findUser?.password}
    // const prueba = await this.validateUser(user.email, user.password)
    //const payload = {email: user.email, password: user.password}
    //const token = this.jwtService.sign(payload)
  
    //const data = {user:payload, token}
    //console.log(data)
    //return data.token
  }

  
}
