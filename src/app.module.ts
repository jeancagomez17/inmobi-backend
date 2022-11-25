import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { enviroments } from 'enviroments';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import config from 'config';
import { RolPermModule } from './rol-perm/rol_perm.module';

require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      // Configura las variables de entorno, verifica si cumple los requisitos, tanto en el name, key o port de una bd
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', //
      isGlobal: true,
      load: [config]
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RolPermModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
