import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CountryCreateDto, CountryUpdateDto } from './dto/country.dto';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountry() {
    const data = await this.countryService.getAll()
    return data
  }

  @Get('searchId/:id')
  async getCountryById(@Param('id') id: number){
    const data = await this.countryService.getOneById(id)
    return data
  }

  @Get('searchName')
  async getCountryByName(@Query('name_country') name:string){
    const data = await this.countryService.getOneByName(name)
    return data
  }

  @Post('create')
  async createCountry(@Body() data:CountryCreateDto){
    const country = await this.countryService.create(data)
    return country
  }

  @Delete('delete/:id')
  async deleteCountry(@Param('id') id:number){
    const country = await this.countryService.deleted(id)
    return country
  }

  @Put('update/:id')
  async updateCountry(@Param('id') id:number, @Body() data:CountryUpdateDto){
    const country = await this.countryService.updated(id, data)
    return country
  }


}
