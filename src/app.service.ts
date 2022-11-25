import { Inject, Injectable } from '@nestjs/common';
import config from 'config';

import {ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService
  ) {}
  getHello(): string {
    
    return 'Hello World!' + this.config.get('NOMBREP');
  }
}
