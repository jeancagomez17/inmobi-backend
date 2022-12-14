import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CityCreateDto, CityUpdateDto } from './dto/city.dto';


@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities(){
    const data = this.cityService.getAll()
    return data
  }

  @Post('create')
  async createCity(@Body() city:CityCreateDto){
    const newCity = await this.cityService.create(city)
    return newCity
  }
}
