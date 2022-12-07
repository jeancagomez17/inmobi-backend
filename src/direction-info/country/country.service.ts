import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryCreateDto, CountryUpdateDto } from './dto/country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}
  
    async existCountry(id:number){
      const exist = await this.countryRepository.findOneBy({id})
      return exist
    }

  async getAll():Promise<Country[] | {}> {
    const data = await this.countryRepository.find();
    return data;
  }

  async getOneById(id:number): Promise<Country | {}> {
    const data = await this.countryRepository.findOneBy({id})
    if(!data)return {msg:"the country does not exist"}
    return data
  }

  async create(data: CountryCreateDto) {
    const exist = await this.countryRepository.findOneBy({
      name_country: data?.name_country,
    });
    if (!exist) {
        const newCountry = await this.countryRepository.create(data);
        await this.countryRepository.save(newCountry);
        return newCountry;
    }
    return { msg: `Country already exists ${data?.name_country}` };
    
  }

  async deleted(id:number){
    const exist = await this.existCountry(id)
    if(exist) {
      await this.countryRepository.delete(id)
      return {msg: `Country deleted ${id}`}
    }
    return {msg: `The country ${id} not exists`}
  }

  async updated(id:number, data:CountryUpdateDto) {
    const exist = await this.existCountry(id)
    if(exist) {
      await this.countryRepository.update(id,data)
      return {msg: `Country updated from ${exist.name_country} to ${data.name_country}` }
    }
    return {msg: `The country ${id} not exists`}
  }
}
