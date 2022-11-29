import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';
import { AuthGuard } from '@nestjs/passport';
@ApiBearerAuth()
@ApiTags('users')
//@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Body() body:any) {
    const {Rol, email} = createUserDto
    const data =   await this.userService.create(createUserDto, email, Rol);
    return { msg: "Created New User", data}
  }
  
  @Get()
  @ApiOperation({ summary: 'Lista de usuarios' })
  async findAll() {
    return await this.userService.findAll();  

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data:UpdateUserDto ){
    this.userService.update(+id, data);
    return { msg: "Updated User " + id}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
     await this.userService.remove(+id);
     return { msg: 'Deleted user ' + id };
  }
}
