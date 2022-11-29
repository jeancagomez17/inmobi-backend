import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from './entities/perm.entity';
import { CreatePermDto, UpdatePermDto } from './dtos/perm.dto';



@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permissions) private permRepository:Repository<Permissions>){}

    async findAll():Promise<Permissions[] | {}>{
        const data =  await this.permRepository.find();
        if(data.length === 0){
            return {msg:"Sin datos"}
        }
        return data
    }

    async findById(id:number):Promise<Permissions | {}>{
        const data = await this.permRepository.findOneBy({id})
        if(data === null) return {msg:"No existe ese rol"}
        return data
    }

    async createPerm(perm:CreatePermDto):Promise<CreatePermDto | {}>{
        const data = this.permRepository.create(perm)
        await this.permRepository.save(data)
        return {msg:`Create Perm -> ${perm?.name}`}
    }


}
