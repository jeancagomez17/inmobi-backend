import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { DepartmentCreateDto, DepartmentUpdateDto } from './dto/department.dto';
import { Department } from './entity/department.entities';

@Injectable()
export class DepartamentService {
  constructor(
    @InjectRepository(Department)
    private readonly repositoryDepart: Repository<Department>,
    private readonly countryService: CountryService,
  ) {}

  private async existDepart(name_department: string) {
    //metohd for verify that the department exists
    const data = await this.repositoryDepart.findOneBy({ name_department });
    return data;
  }

  private async existCountry(id: number) {
    const data = await this.countryService.getOneById(id);
    return data;
  }

  async getAll(): Promise<Department[] | {}> {
    const department = await this.repositoryDepart.find();
    return department;
  }

  async getByName(name: string): Promise<Department[] | {}> {
    const nameToUpperCase = name.toUpperCase();
    console.log(nameToUpperCase);
    const departament = await this.existDepart(name);
    return departament;
  }

  async create(data: DepartmentCreateDto) {
    try {
      const exist = await this.existDepart(data.name_department);
      const { countryId } = data; // destructure for verify the country
      const existCountry = await this.countryService.existCountry(countryId);

      if (!exist) {
        if (existCountry) {
          const newDepartment = await this.repositoryDepart.create({
            ...data,
            country: { id: countryId }, //submit second parameter with the id of the country
          });
          await this.repositoryDepart.save(newDepartment);
          return { msg: `Create new department -> ${data.name_department}` };
        }
        return {msg:`the id ${countryId} country not exist`}
      }
      return { msg: `Department already exists -> ${data.name_department}` };
    } catch (error) {
      return { msg: 'Error creating department ' + error.message };
    }
  }
}
