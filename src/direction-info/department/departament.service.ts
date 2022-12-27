import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CountryService } from '../country/country.service';
import { DepartmentCreateDto, DepartmentUpdateDto } from './dto/department.dto';
import { Department } from './entity/department.entities';
import { PaginationDto } from 'src/dtos-global/pagination.dto';

@Injectable()
export class DepartamentService {
  constructor(
    @InjectRepository(Department)
    private readonly repositoryDepart: Repository<Department>,
    private readonly countryService: CountryService,
  ) {}

   async existName(name_department: string) {
    //metohd for verify that the department exists
    const data = await this.repositoryDepart.findOneBy({ name_department: Like(`%${name_department}%`) });
    return data;
  }
   async existDepart(id: number) {
    try {
      const data = await this.repositoryDepart.findOneBy({ id });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async getAll({limit, offset}:PaginationDto): Promise<Department[] | {}> {
    const cont = 0
    const department = await this.repositoryDepart.find({
      take: limit,
      // order: {
      //   name_department: 'ASC'
      // },
      skip:offset,
      relations:['country']
    });
    return department;
  }


  async getAllPag(pag:number): Promise<Department[] | {}> {
    let cont = 0
    cont = pag + 5
    const department = await this.repositoryDepart.find({
      take: 5,
      // order: {
      //   name_department: 'ASC'
      // },
      skip:cont,
      relations:['country']
    });
    return department;
  }

  async getOneByName(name: string): Promise<Department[] | {}> {
    const departament = await this.existName(name)
    return departament;
  }

  async getOneById(id: number): Promise<Department[] | {}> {
    const exist = await this.existDepart(id);
    if (!exist) return { msg: 'The department does not exists' };
    return exist;
  }

  async create(data: DepartmentCreateDto) {
    try {
      const exist = await this.existName(data.name_department);
      const { countryId } = data; // destructure for verify the country
      const existCountry = await this.countryService.existCountry(countryId);

      if (existCountry) {
        if (!exist) {
          const newDepartment = await this.repositoryDepart.create({
            ...data,
            country: { id: countryId }, //submit second parameter with the id of the country
          });
          await this.repositoryDepart.save(newDepartment);
          return { msg: `Create new department -> ${data.name_department}` };
        }

        return { msg: `the id ${countryId} country not exist` };
      }

      return { msg: `Department already exists -> ${data.name_department}` };
    } catch (error) {
      return { msg: 'Error creating department ' + error.message };
    }
  }

  async updated(id: number, data: DepartmentUpdateDto) {
    const exist = await this.existDepart(id);
    if (exist) {
      await this.repositoryDepart.update(id, data);
      return { msg: `Department updated ${data.name_department}` };
    }
    return { msg: `The department ${id} does not exist` };
  }

  async deleted(id: number) {
    const exist = await this.existDepart(id);
    if (exist) {
      this.repositoryDepart.delete(id);
      return { msg: `Department deleted ${exist.name_department}` };
    }
    return { msg: `The department ${id} does not exist` };
  }
}
