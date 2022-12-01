import { Controller } from '@nestjs/common';
import { DepartamentService } from './departament.service';

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}
}
