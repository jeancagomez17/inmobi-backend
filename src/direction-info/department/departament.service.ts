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

  private async exist(name_department: string) {
    //metohd for verify that the department exists
    const data = await this.repositoryDepart.findOneBy({ name_department });
    return data;
  }
  private async existDepart(id:number){
    try {
      const data = await this.repositoryDepart.findOneBy({id})
      return data
    } catch (error) {
      return error.message
    } 
  }

  async getAll(): Promise<Department[] | {}> {
    const department = await this.repositoryDepart.find();
    return department;
  }

  async getOneByName(name: string): Promise<Department[] | {}> {
    const departament = await this.exist(name);
    return departament;
  }

  async getOneById(id:number): Promise<Department[] | {}> {
    const exist = await this.existDepart(id)
    if(!exist) return {msg:"The department does not exists"}
    return exist
  }

  async create(data: DepartmentCreateDto) {

    try {
      const exist = await this.exist(data.name_department);
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

  async updated(id:number, data:DepartmentUpdateDto){
      const exist = await this.existDepart(id)
      if(exist) {
         await this.repositoryDepart.update(id, data);
         return {msg:`Department updated ${data.name_department}`}
      }
      return { msg: `The department ${id} does not exist`}
    
  }
}
