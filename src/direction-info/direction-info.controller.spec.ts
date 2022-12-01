import { Test, TestingModule } from '@nestjs/testing';
import { DirectionInfoController } from './direction-info.controller';
import { DirectionInfoService } from './direction-info.service';

describe('DirectionInfoController', () => {
  let controller: DirectionInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectionInfoController],
      providers: [DirectionInfoService],
    }).compile();

    controller = module.get<DirectionInfoController>(DirectionInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
