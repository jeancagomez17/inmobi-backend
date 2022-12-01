import { Controller } from '@nestjs/common';
import { DirectionInfoService } from './direction-info.service';

@Controller('direction-info')
export class DirectionInfoController {
  constructor(private readonly directionInfoService: DirectionInfoService) {}
}
