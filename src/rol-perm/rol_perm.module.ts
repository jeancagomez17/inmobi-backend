import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './entities/perm.entity';
import { Rol } from './entities/rol.entity';
import { PermissionsController } from './permissions.controller';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { PermissionsService } from './permissions.service';





@Module({
  imports:[TypeOrmModule.forFeature([Rol, Permissions])],
  controllers: [PermissionsController, RolController],
  providers: [RolService, PermissionsService],
  exports: [TypeOrmModule]
})
export class RolPermModule {}
