import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePermDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name:string;
}

export class UpdatePermDto extends PartialType(CreatePermDto) {}