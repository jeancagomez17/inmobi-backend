import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AnyNaptrRecord } from 'dns';
import { DepartamentService } from './departament.service';
import { DepartmentCreateDto } from './dto/department.dto';

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Get()
  async getAllDepartments() {
    const departaments = await this.departamentService.getAll();
    return departaments;
  }

  @Get('country')
  async getDepartamentByName(@Query('name') name:string){
    const data = this.departamentService.getByName(name)
    return data
  }

  @Post('/create')
  async createDepart(@Body() data: DepartmentCreateDto) {
    const newDepartment = await this.departamentService.create(data);
    return newDepartment;
  }
}
