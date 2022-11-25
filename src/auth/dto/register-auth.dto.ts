import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Length, MinLength, MaxLength, IsNumber } from 'class-validator';
export class  LoginAuthDto {
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    @ApiProperty()
    password:string;
}


export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string

    @IsNumber()
    @ApiProperty()
    Rol:string
}
