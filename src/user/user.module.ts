import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSchema } from './schema/user.schema';


@Module({
  imports:[TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule]
})
export class UserModule {}
