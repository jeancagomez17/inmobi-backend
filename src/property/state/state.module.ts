import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entites/state.entity';

@Module({
  imports:[TypeOrmModule.forFeature([State])],
  controllers: [StateController],
  providers: [StateService],
  exports:[TypeOrmModule]
})
export class StateModule {}
