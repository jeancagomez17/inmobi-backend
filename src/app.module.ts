import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { enviroments } from 'enviroments';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

import config from 'config';
import { RolPermModule } from './rol-perm/rol_perm.module';
import { DirectionInfoModule } from './direction-info/direction-info.module';
import { OwnerModule } from './owner/owner.module';
import { CustomerModule } from './customer/customer.module';

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
    RolPermModule,
    DirectionInfoModule,
    OwnerModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
