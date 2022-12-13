import { Module } from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DepartamentController } from './departament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entity/department.entities';
import { CountryModule } from '../country/country.module';


@Module({
  imports:[TypeOrmModule.forFeature([Department]), CountryModule],
  controllers: [DepartamentController],
  providers: [DepartamentService],
  exports: [TypeOrmModule, DepartamentService]
})
export class DepartamentModule {}
