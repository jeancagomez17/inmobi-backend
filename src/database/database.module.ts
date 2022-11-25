import { Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import config from 'config';
import { DataSource } from 'typeorm';


@Module({
    providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production',
    }],
    imports:[
        TypeOrmModule.forRootAsync({
            inject:[config.KEY],
            useFactory: (configService:ConfigType<typeof config>) => {
                const {name} = configService.database
                return {
                    type: 'mysql',
                    url: name,
                    synchronize: true, 
                    autoLoadEntities: true //cargue automaticamente las entidades
                }
            }
        })
    ],
    exports:[TypeOrmModule]
})


export class DatabaseModule {
    constructor(private dataSource: DataSource) {}
}
