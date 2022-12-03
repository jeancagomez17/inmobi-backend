import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { StateModule } from './state/state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';


@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  imports: [StateModule, TypeOrmModule.forFeature([Property])],
  exports:[TypeOrmModule]

})
export class PropertyModule {}
