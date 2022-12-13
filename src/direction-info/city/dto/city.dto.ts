import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CityCreateDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name_city: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    departmentId:number
}

export class CityUpdateDto extends PartialType(CityCreateDto) {}