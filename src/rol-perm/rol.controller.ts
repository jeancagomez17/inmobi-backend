import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto, UpdateRolDto } from './dtos/rol.dto';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService){}

    @Get()
    async getAll(){
        return await this.rolService.findAll()
    }
    @Get(':id')
    async getById(@Param('id') idRol:string){
        return await this.rolService.findOne(+idRol)
    }

    @Post('create')
    async createRol(@Body() nameRol:CreateRolDto){
        return await this.rolService.create(nameRol)
    }
}
