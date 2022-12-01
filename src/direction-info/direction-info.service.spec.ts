import { Test, TestingModule } from '@nestjs/testing';
import { DirectionInfoService } from './direction-info.service';

describe('DirectionInfoService', () => {
  let service: DirectionInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectionInfoService],
    }).compile();

    service = module.get<DirectionInfoService>(DirectionInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
