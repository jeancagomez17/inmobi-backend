import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class DepartmentCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name_department:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    countryId:number
}


export class DepartmentUpdateDto extends PartialType(DepartmentCreateDto) {}