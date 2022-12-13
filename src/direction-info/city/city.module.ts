import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entities';
import { DepartamentModule } from '../department/departament.module';

@Module({
  imports:[TypeOrmModule.forFeature([City]), DepartamentModule],
  controllers: [CityController],
  providers: [CityService],
  exports:[TypeOrmModule]
})
export class CityModule {}
