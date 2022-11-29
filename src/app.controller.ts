import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() sesion: Record<string,any>): string {
    //console.log(sesion?.id)
    return this.appService.getHello();
  }
}
