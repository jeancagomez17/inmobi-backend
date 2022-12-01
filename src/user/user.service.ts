import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, email:string, rolId:number) {
    const prueba = await this.usersRepository.find({where: {email}})
    
    if(prueba.length === 0){
      const data = this.usersRepository.create({...createUserDto, rol:{id:rolId}})
      await this.usersRepository.save(data)
      return data
       
    }
    return {msg:"Ya existe ese correo registrado"}
  }

  async findAll(): Promise<User[] | {}> {
    return await this.usersRepository.find({relations:['rol']});
  }

  findOne(id: number): Promise<any> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async update(id:number, data:UpdateUserDto){
    const newdata = await this.usersRepository.update(id, data); 
    
    return newdata; 
  }
}
