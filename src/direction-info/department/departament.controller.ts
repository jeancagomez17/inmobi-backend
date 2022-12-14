import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { PaginationDto } from 'src/dtos-global/pagination.dto';
import { DepartamentService } from './departament.service';
import { DepartmentCreateDto } from './dto/department.dto';

@Controller('department')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Get()
  async getAllDepartments(@Query() pagination:PaginationDto) {
    const departaments = await this.departamentService.getAll(pagination);
    return departaments;
  }

  @Get('searchName')
  async getDepartamentByName(@Query('name') name:string){
    const data = this.departamentService.getOneByName(name)
    return data
  }

  @Post('/create')
  async createDepart(@Body() data: DepartmentCreateDto) {
    const newDepartment = await this.departamentService.create(data);
    return newDepartment;
  }
}
