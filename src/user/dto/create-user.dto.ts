import { IsString, IsNotEmpty, IsEmail, Length, MinLength, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @ApiProperty()
  readonly password: string;

  @IsNumber()
  @ApiProperty({name:'Rol', description:'id rol'})
  readonly Rol:number

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}