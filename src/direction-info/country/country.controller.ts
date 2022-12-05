import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountry() {
    const data = await this.countryService.getAll()
    return data
  }

  @Get(':id')
  async getCountryById(@Param('id') id: number){
    const data = await this.countryService.getOneById(id)
    return data
  }

  @Post('create')
  async createCountry(@Body() data:any){
    const country = await this.countryService.create(data)
    return country
  }

}
