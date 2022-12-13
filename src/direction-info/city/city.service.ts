import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityCreateDto, CityUpdateDto } from './dto/city.dto';
import { City } from './entity/city.entities';
import { DepartamentService } from '../department/departament.service';
@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly repositoryCity: Repository<City>,
    private readonly departamentService: DepartamentService,
  ) {}

  private async existById(id: number) {
    try {
      const data = await this.repositoryCity.findOneBy({ id });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  private async existByName(name_city: string) {
    try {
      const data = await this.repositoryCity.findOneBy({ name_city });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async getAll(): Promise<City[] | {}> {
    const data = await this.repositoryCity.find();
    return data;
  }

  async getOneById(id: number): Promise<City | {}> {
    const exist = await this.existById(id);
    if (!exist) return { msg: 'no existe la ciudad' };
    return exist;
  }

  async create(data: CityCreateDto) {
    try {
      const exist = await this.existByName(data.name_city);
      const { departmentId } = data;
      const existDeparment = await this.departamentService.existDepart(
        departmentId,
      );
      if (existDeparment) {
        if (!exist) {
          const newCity = this.repositoryCity.create(data);
          this.repositoryCity.save(newCity);
          return { msg: `Create new city -> ${data.name_city}` };
        }
        return { msg: `The name ${data.name_city} already exists` };
      }
      return { msg: `The ${departmentId} not exist` };
    } catch (error) {
        return error.message
    }
  }
}
