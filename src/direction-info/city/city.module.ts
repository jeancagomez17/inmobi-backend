import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../department/entity/entity/city.entities';

@Module({
  imports:[TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
  exports:[TypeOrmModule]
})
export class CityModule {}
