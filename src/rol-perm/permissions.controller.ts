import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermDto, UpdatePermDto } from './dtos/perm.dto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permService: PermissionsService){}

    @Get()
    async getPermissions(){
        return this.permService.findAll()
    }
    @Get(':id')
    async getById(@Param('id') id: number){
        return this.permService.findById(+id)
    }
    @Post('create')
    async createPerm(@Body() perm:CreatePermDto){
        return this.permService.createPerm(perm)
    }


}
