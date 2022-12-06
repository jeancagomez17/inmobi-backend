import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getAll() {
    const data = await this.countryRepository.find();
    return data;
  }

  async getOneById(id:number){
    const data = await this.countryRepository.findOneBy({id})
    if(!data)return {msg:"the country does not exist"}
    return data
  }

  async create(data: any) {
    const exist = await this.countryRepository.findOneBy({
      name_country: data?.name_country,
    });
    if (!exist) {
        const newCountry = await this.countryRepository.create(data);
        await this.countryRepository.save(newCountry);
        return newCountry;
    }
    return { msg: 'Country already exists' };
    
  }
}
