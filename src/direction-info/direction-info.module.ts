import { Module } from '@nestjs/common';
import { DirectionInfoService } from './direction-info.service';
import { DirectionInfoController } from './direction-info.controller';
import { CountryModule } from './country/country.module';
import { DepartamentModule } from './department/departament.module';
import { CityModule } from './city/city.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  controllers: [DirectionInfoController],
  providers: [DirectionInfoService],
  imports: [CountryModule, DepartamentModule, CityModule, PhoneModule]
})
export class DirectionInfoModule {}
