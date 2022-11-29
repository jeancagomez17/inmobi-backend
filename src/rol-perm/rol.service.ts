import { Injectable } from '@nestjs/common';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto, UpdateRolDto } from './dtos/rol.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async findAll():Promise<Rol[]>{
    return await this.rolRepository.find()
  }
  async create(nameRol:CreateRolDto):Promise<CreateRolDto | {}>{
    const exist = await this.rolRepository.count({where:{name:nameRol?.name}})
    const data =  this.rolRepository.create(nameRol)
    if(exist === 1) return  {msg: `El rol ${nameRol?.name} ya existe`}
    return await this.rolRepository.save(data)
  }
  async findOne(idRol:number):Promise<Rol | {}>{
    const data = await this.rolRepository.findOneBy({id:idRol})
    if(data === null) return {msg:"No existe ese rol"}
    return data
  }

}   
