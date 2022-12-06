import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CountryCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_country: string;
}

export class CountryUpdateDto extends PartialType(CountryCreateDto) {}
