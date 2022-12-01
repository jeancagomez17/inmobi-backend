import { Module } from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DepartamentController } from './departament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entity/department.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Department])],
  controllers: [DepartamentController],
  providers: [DepartamentService],
  exports: [TypeOrmModule]
})
export class DepartamentModule {}
