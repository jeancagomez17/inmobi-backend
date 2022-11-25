import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRolDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name:string;
}

export class UpdateRolDto extends PartialType(CreateRolDto) {}